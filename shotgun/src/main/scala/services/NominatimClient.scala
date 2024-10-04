package services

import org.apache.pekko
import org.apache.pekko.actor.ActorSystem
import pekko.http.scaladsl.Http
import pekko.http.scaladsl.model._
import pekko.http.scaladsl.unmarshalling.Unmarshal
import spray.json._
import scala.concurrent.{ExecutionContextExecutor, Future}

class NominatimClient(implicit val system: ActorSystem, implicit val executionContext: ExecutionContextExecutor) {
  val baseUrl = "https://nominatim.openstreetmap.org/search"

  def geocodePhrase(query: String): Future[JsValue] = {
    val request = HttpRequest(
      uri = s"$baseUrl?q=$query&format=json",
      headers = List(headers.`User-Agent`("DeFlock/1.0"))
    )

    Http().singleRequest(request).flatMap { response =>
      response.status match {
        case StatusCodes.OK =>
          Unmarshal(response.entity).to[String].map { jsonString =>
            jsonString.parseJson
          }
        case _ =>
          response.discardEntityBytes()
          Future.failed(new Exception(s"Failed to geocode phrase: ${response.status}"))
      }
    }
  }
}
