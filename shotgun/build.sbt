import Dependencies._

ThisBuild / scalaVersion     := "2.12.8"
ThisBuild / version          := "0.1.0-SNAPSHOT"
ThisBuild / organization     := "me.deflock"
ThisBuild / organizationName := "DeFlock"

lazy val root = (project in file("."))
  .settings(
    name := "shotgun",
    libraryDependencies += scalaTest % Test,
  )

val PekkoVersion = "1.0.3"
val PekkoHttpVersion = "1.0.1"
libraryDependencies ++= Seq(
  "org.apache.pekko" %% "pekko-actor-typed" % PekkoVersion,
  "org.apache.pekko" %% "pekko-stream" % PekkoVersion,
  "org.apache.pekko" %% "pekko-http" % PekkoHttpVersion
)
