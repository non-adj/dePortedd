package services

import org.apache.pekko
import pekko.actor.typed.ActorSystem
import pekko.actor.typed.scaladsl.Behaviors
import pekko.http.scaladsl.Http
import pekko.http.scaladsl.model._
import pekko.http.scaladsl.unmarshalling.Unmarshal
import io.circe._
import io.circe.parser._
import org.apache.pekko.http.scaladsl.client.RequestBuilding._

import scala.concurrent.duration.DurationInt
import scala.concurrent.{ExecutionContextExecutor, Future}
import scala.util.{Failure, Success}

case class BoundingBox(minLat: Double, minLng: Double, maxLat: Double, maxLng: Double)

class OverpassClient(implicit val system: ActorSystem[_], implicit val executionContext: ExecutionContextExecutor) {
  val baseUrl = "https://overpass-api.de/api/interpreter"

  def getALPRs(bBox: BoundingBox): Future[Json] = {
    val query = s"""[out:json][bbox:${bBox.minLat},${bBox.minLng},${bBox.maxLat},${bBox.maxLng}];node["man_made"="surveillance"]["surveillance:type"="ALPR"];out body;>;out skel qt;"""
    val formData = FormData("data" -> query).toEntity
    val request = HttpRequest(
      method = HttpMethods.POST,
      uri = baseUrl,
      entity = formData
    )

    Http().singleRequest(request).flatMap { response =>
      response.entity.toStrict(5.seconds).flatMap { entity =>
        Unmarshal(entity).to[String].map(parse(_).getOrElse(Json.Null))
      }
    }
  }

}
