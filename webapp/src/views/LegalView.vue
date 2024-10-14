<template>
  <v-container max-width="1000">
    <h1>Legal</h1>
    <h2>Attribution</h2>
    <p>
      This website uses data from <a href="https://openstreetmap.org" target="_blank">OpenStreetMap</a>. OpenStreetMap is open data, licensed under the <a href="https://opendatacommons.org/licenses/odbl/" target="_blank">Open Data Commons Open Database License (ODbL)</a>.
    </p>
    <p>
      Geocoding services are provided by <a href="https://nominatim.org/" target="_blank">Nominatim</a>, a project of OpenStreetMap.
    </p>

    <h2>Privacy Policy</h2>
    <h3>Plausible Analytics</h3>

    <p>
      We use Plausible Analytics to track anonymous usage data. Plausible does not use cookies or collect personally identifiable information. The data collected is used solely to understand how people are using the site and to improve user experience.
    </p>
    <p>
      No data is shared with third parties, and no personally identifiable information is stored or collected.
    </p>

    <h3>User Reports</h3>
    <p>
      At this time, DeFlock.me does not collect or store user-submitted reports. Users are directed to submit ALPR camera locations directly to OpenStreetMap via their editing platform, which has its own privacy policy and data practices.
    </p>

    <h2>Terms of Use</h2>

    <h3>Use of the Website</h3>
    <p>
      DeFlock.me provides a service to help users locate and report Automated License Plate Reader (ALPR) cameras through external services like OpenStreetMap. By using this site, you agree to use the tools and resources in a lawful and ethical manner.
    </p>

    <h3>Liability Disclaimer</h3>
    <p>
      DeFlock.me provides information and directs users to third-party services for ALPR reporting. We do not guarantee the accuracy or completeness of the data presented on the map.
    </p>
    <p>
      DeFlock.me and its operators are not liable for any direct or indirect damages arising from the use of the site, including reliance on third-party data or the submission of ALPR locations via OpenStreetMap.
    </p>

    <h2>User-Generated Content</h2>
    <p>
      DeFlock.me does not currently accept user-generated reports directly. All ALPR camera reports are directed to OpenStreetMap&apos;s editing platform. Users should follow OSM&apos;s guidelines and policies when submitting data.
    </p>
    <p>
      In the future, we may add the ability to report ALPR cameras directly on this site. At that time, additional policies will be introduced regarding the use and storage of user-generated content.
    </p>

    <h2>Copyright Notice</h2>
    <p>
      All original content, design, and features of DeFlock.me are © {{ thisYear }} DeFlock.me. All rights reserved. Reproduction, distribution, or use of site content without permission is prohibited.
    </p>
    <p>
      OpenStreetMap data is © OpenStreetMap contributors and is licensed under the Open Data Commons Open Database License (ODbL).
    </p>

  </v-container>
</template>

<script setup lang="ts">
const thisYear = new Date().getFullYear();
</script>

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

/* as you can see, this one is the most updated */
a {
  color: var(green);
  text-decoration: none;
}
</style>
