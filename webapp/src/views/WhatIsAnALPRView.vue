<template>
  <v-container>
    <p>
      <v-img max-height="350" width="100%" cover src="/flock-camera.jpeg" />
    </p>

    <h2>What is an ALPR</h2>
    <p>
      An Automated License Plate Reader (ALPR) is a technology that uses cameras and image processing to automatically read vehicle license plates. These cameras can be mounted on police cars, fixed on utility poles, or even positioned on private properties, capturing images of passing vehicles. ALPR systems extract plate numbers, record the time and location of the vehicle, and often cross-reference that information with databases for law enforcement or private monitoring purposes. This data can be used for a range of reasons, from catching stolen vehicles to tracking the movement of specific cars.
    </p>
    <p>
      The primary use of ALPRs is surveillance—they gather data that can help create a detailed record of where a vehicle has been over time. This has raised privacy concerns since the vast majority of drivers are not involved in any crime, yet their movements are being documented.
    </p>

    <h2>What is NOT an ALPR</h2>
    <p>
      Not all cameras near roads are ALPRs. Many people mistakenly assume that every traffic camera or intersection camera is an ALPR, but that's not true. Here are some things ALPRs are not:
    </p>

    <h3>Traffic Cameras</h3>
    <div class="flex-image">
      <v-img rounded cover aspect-ratio="4/3" width="180" src="/traffic-camera.jpg" />
      <p>Standard traffic cameras typically capture live video or images of intersections to monitor traffic flow and manage signals. They do not specifically focus on reading license plates or storing data long-term.</p>
    </div>

    <h3>Red Light Cameras/Speed Cameras</h3>
    <div class="flex-image">
      <v-img rounded cover aspect-ratio="4/3" width="180" src="/redlight-camera.jpg" />
      <p>These cameras are set up to capture violations, such as running a red light or speeding. They may record plate numbers when a violation is detected, but they do not perform continuous surveillance or collect location data over time.</p>
    </div>

    <h3>Security Cameras</h3>
    <div class="flex-image">
      <v-img rounded cover aspect-ratio="4/3" width="180" src="/security-camera.jpg" />
      <p>Cameras used by businesses or homeowners for security purposes may capture vehicles incidentally, but they are not specifically designed to automatically read and record license plates.</p>
    </div>
  </v-container>
</template>

<style scoped>
h2 {
  margin-top: 2rem;
}

h3 {
  margin-top: 1.25rem;
}

p {
  margin-top: 0.5rem;
}

.flex-image {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 0.5rem;
}
</style>
