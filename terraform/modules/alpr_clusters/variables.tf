variable "module_name" {
  description = "Name of the module"
}

variable "deflock_cdn_bucket" {
  description = "S3 bucket for the CDN"
}

variable "rate" {
  description = "Rate at which to run the Lambda function"
}
