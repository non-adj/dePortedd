# Provider Configuration
provider "aws" {
  region = "us-east-1" # ACM certificates for CloudFront must be in us-east-1
}

# Route 53 Zone for Domain
resource "aws_route53_zone" "deflock_me" {
  name = var.domain_name
}

# S3 Bucket for Static Site Hosting
resource "aws_s3_bucket" "vue_app" {
  bucket = var.bucket_name

  tags = {
    Name = "Vue App Static Site Bucket"
  }
}

resource "aws_s3_bucket_acl" "vue_app_acl" {
  bucket = aws_s3_bucket.vue_app.id
  acl = "private"
}

resource "aws_s3_bucket_website_configuration" "vue_app" {
  bucket = aws_s3_bucket.vue_app.id
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_policy" "s3_access_policy" {
  bucket = aws_s3_bucket.vue_app.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowPublic"
        Effect = "Allow"
        Principal = "*"
        Action = "s3:GetObject"
        Resource = "${aws_s3_bucket.vue_app.arn}/*"
      },
    ]
  })
}

# ACM Certificate for HTTPS
resource "aws_acm_certificate" "deflock_me_cert" {
  domain_name       = var.domain_name
  validation_method = "DNS"
  subject_alternative_names = [
    "www.${var.domain_name}"
  ]

  lifecycle {
    create_before_destroy = true
  }
}

# DNS Validation Records for ACM Certificate
resource "aws_route53_record" "deflock_me_cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.deflock_me_cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      value  = dvo.resource_record_value
      zone_id = aws_route53_zone.deflock_me.zone_id
    }
  }

  zone_id = each.value.zone_id
  name    = each.value.name
  type    = each.value.type
  ttl     = 60
  records = [each.value.value]
}

# ACM Certificate Validation Completion
resource "aws_acm_certificate_validation" "deflock_me_cert_validation" {
  certificate_arn         = aws_acm_certificate.deflock_me_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.deflock_me_cert_validation : record.fqdn]
}

# CloudFront Distribution for CDN and HTTPS
resource "aws_cloudfront_distribution" "vue_app_cdn" {
  origin {
    domain_name = aws_s3_bucket.vue_app.website_endpoint
    origin_id   = "S3-VueApp"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "CDN for ${var.domain_name}"
  default_root_object = "index.html"

  aliases = ["${var.domain_name}", "www.${var.domain_name}"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-VueApp"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate_validation.deflock_me_cert_validation.certificate_arn
    ssl_support_method  = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  tags = {
    Name = "CloudFront Vue App CDN"
  }
}

# Route 53 Records for Domain
resource "aws_route53_record" "deflock_me_root" {
  zone_id = aws_route53_zone.deflock_me.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.vue_app_cdn.domain_name
    zone_id                = aws_cloudfront_distribution.vue_app_cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "deflock_me_www" {
  zone_id = aws_route53_zone.deflock_me.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.vue_app_cdn.domain_name
    zone_id                = aws_cloudfront_distribution.vue_app_cdn.hosted_zone_id
    evaluate_target_health = false
  }
}
