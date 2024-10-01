<template>
  <v-container>
    <h2>How to Report an ALPR</h2>
    <p>
      If you've spotted an ALPR in your area, you can help us track it by reporting it to our database. Here's how you can do it:
    </p>

    <h3>Coming Soon</h3>
    <p>
      We're working on a way for you to report ALPRs directly from this site. Check back soon for updates!
    </p>
    <p>
      Until then, you can report them on OpenStreetMap. <a href="https://wiki.openstreetmap.org/wiki/Tag:man_made%3Dsurveillance" target="_blank">Learn how to add ALPRs to OpenStreetMap</a>.
    </p>

    <!-- <p>
      If you can do so safely, take a picture of the ALPR camera. Make sure the camera is visible in the image, and try to capture any identifying information, such as the brand name or any logos.
    </p>

    <h3>Step 2: Note the Location</h3>
    <p>
      Record the location of the ALPR camera. You can use your phone's GPS to get the coordinates, or note the nearest address or intersection.
    </p>

    <h3>Step 3: Submit the Report</h3>
    <p>
      Click the "Report" button below to submit your report. You'll be asked to upload the picture you took and provide the location information. Your report will help us build a more comprehensive database of ALPRs in the United States.
    </p> -->
  </v-container>
</template>

<style scoped>
/* TODO: put this all in one place, also in what-is view */
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

a {
  color: var(--v-primary-base);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

a:visited {
  color: var(--v-primary-base);
}
</style>
