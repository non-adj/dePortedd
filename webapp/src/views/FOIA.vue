<template>
<Hero
  imageUrl="/documents.jpg"
  title="How to FOIA" 
  description="Learn how simple it is to request ALPR data from your city"
  button-text="Get Started"
  button-href="#how-to"
/>

<v-container class="mb-12">
  <h2>Why File a FOIA Request</h2>
  <p>
    ALPRs are being installed across the country with little transparency. Public records requests allow us to track where these cameras are, ensuring that all installations are documented. By obtaining invoices, we can verify the number of cameras deployed in your area, and our mappers will work to add them all to the map.
  </p>
  <p>
    Your help is crucial. Filing a FOIA request is easy, and your contribution will help us build a complete map of these surveillance networks. We'll even give you a <a href="#how-to">template to use</a>.
  </p>

  <v-divider class="my-8" />

  <h2>FOIA Basics</h2>

  <h3>What is a FOIA request?</h3>
  <p>
    A Freedom of Information Act (FOIA) request is a formal way to ask government agencies for public records. Laws vary by state, but most allow residents to request documents such as contracts, emails, and invoices.
  </p>

  <h3>Who can file a FOIA request?</h3>
  <p>
    Most states allow anyone to file a FOIA request, while some restrict it to state residents.
  </p>

  <h3>What can be requested?</h3>
  <p>
    Invoices, contracts, emails, and other documents related to government spending and agreements with companies, including these surveillance companies.
  </p>

  <h3>What if my request is rejected?</h3>
  <p>
    Agencies may reject requests for various reasons, but you can often appeal. <a href="https://discord.gg/aV7v4R3sKT" target="_blank">Let us know</a> if you encounter issues, and we can help.
  </p>

  <h3>Can I remain anonymous?</h3>
  <p>
    Typically, yes. Many states allow you to submit FOIA requests anonymously or through an alias. If anonymity is important to you, consider using a disposable email address and avoiding personally identifying information in your request. If you're requesting records from a state that requires residency, you may need to provide an in-state address.
  </p>

  <v-divider class="my-8" />

  <h2 id="how-to">How to File a FOIA Request</h2>
  <ol class="serif">
    <li class="mb-4">
      Identify the agency that manages law enforcement contracts in your area. It's most often the <b>police department</b> or <b>sheriff's office</b>. When in doubt, you can always submit a request to multiple agencies, but use your best judgment.
    </li>
    <li class="mb-4">
      Locate their FOIA or public records request portal. If they don't have one, find the relevant contact email.
    </li>
    <li class="mb-4">
      Use <b>this template</b> to submit the request. Feel free to change parts of it to better suit your situation:
      <blockquote>
        Dear Public Records Officer,<br><br>

        Pursuant to [applicable state public records law], I am requesting copies of all invoices from Flock Safety for the period of [Start Date] to the present. Please ensure that all pages of each invoice are included, including any itemized lists detailing equipment, software, or services provided.<br><br>

        If available, I prefer to receive the records in electronic format via email. If any fees apply, please inform me before processing the request. Should any portion of this request be denied, please provide the specific legal basis for the denial.<br><br>

        Thank you for your time and assistance. I look forward to your response within the statutory timeframe.<br><br>

        Sincerely,<br>
        [Your Name]
      </blockquote>

      <p><b>If you need help tailoring this to your situation, appealing rejections, etc., ChatGPT is a great resource.</b></p>
    </li>
    <li class="mb-4">
      Once you receive the invoice, <router-link to="/contact">email it to us</router-link>, so that our mappers can map each of the ALPRs listed in the invoice.
    </li>
  </ol>

  <v-alert class="mt-8" type="info" variant="tonal">
    <b>Tip:</b> If you run into any issues while submitting the FOIA request, such as not being able to locate the records portal or find a contact email, you can use <a href="https://muckrock.com" target="_blank">Muckrock</a>, a nonprofit FOIA platform that will submit it to the agency on your behalf for a small fee.
  </v-alert>
  
</v-container>

<Footer />

</template>

<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue';
import Hero from '@/components/layout/Hero.vue';
import Footer from '@/components/layout/Footer.vue';

useSeoMeta({
  title: 'How to FOIA | DeFlock',
  description: 'Learn how simple it is to request ALPR data from your city.',

  ogTitle: 'How to FOIA Request ALPR Data',
  ogDescription: 'Learn how simple it is to request ALPR data from your city.',
  ogImage: 'https://deflock.me/documents.jpg',
});
</script>

<style lang="css" scoped>
@import url('@/assets/typography.css');

blockquote {
  margin: 1em 0;
  padding-left: 1em;
  border-left: 4px solid #ccc;
}
</style>
