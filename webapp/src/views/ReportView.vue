<template>
  <v-container class="mb-16">
    <h1 class="text-center mt-4">Report a New Student Visa Revocation / Deportation</h1>
    <p>
      Use this form to report a student visa revocation or deportation event. Your submission will be reviewed and, if verified, added to our public map and database. Please provide as much detail as possible. All submissions are confidential and will be manually reviewed to prevent duplicates and ensure accuracy.
    </p>
    <v-form @submit.prevent="submitForm" ref="formRef">
      <v-text-field
        v-model="form.school"
        label="School or College Name"
        required
        class="mb-4"
      />
      <v-text-field
        v-model="form.address"
        label="School or College Address"
        required
        class="mb-4"
      />
      <v-select
        v-model="form.revocationType"
        :items="revocationTypes"
        label="Type of Revocation"
        required
        class="mb-4"
      />
      <div class="mb-4">
        <label class="font-weight-bold mb-2">Was ICE Involved?</label>
        <v-radio-group v-model="form.iceInvolved" inline>
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
          <v-radio label="Unsure" value="Unknown" />
        </v-radio-group>
      </div>
      <div class="mb-4">
        <label class="font-weight-bold mb-2">Was Campus Security Involved?</label>
        <v-radio-group v-model="form.campusSecurity" inline>
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
          <v-radio label="Unsure" value="Unsure" />
        </v-radio-group>
      </div>
      <div class="mb-4">
        <label class="font-weight-bold mb-2">Was Homeland Security Involved?</label>
        <v-radio-group v-model="form.homelandSecurity" inline>
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
          <v-radio label="Unsure" value="Unsure" />
        </v-radio-group>
      </div>
      <div class="mb-4">
        <label class="font-weight-bold mb-2">Were Local Police Involved?</label>
        <v-radio-group v-model="form.localPolice" inline>
          <v-radio label="Yes" value="Yes" />
          <v-radio label="No" value="No" />
          <v-radio label="Unsure" value="Unsure" />
        </v-radio-group>
      </div>
      <v-textarea
        v-model="form.comments"
        label="Additional Comments (from school, student, or reporter)"
        rows="3"
        class="mb-4"
      />
      <div class="mb-4 text-center">
        <div class="g-recaptcha" data-sitekey="6LeUcBMpAAAAAABQw6Qw6Qw6Qw6Qw6Qw6Qw6Qw6Qw"></div> <!-- Replace with your actual site key if different -->
      </div>
      <div class="text-center">
        <v-btn color="primary" type="submit" :loading="submitting">Submit Report</v-btn>
      </div>
      <v-alert v-if="submitted" type="success" class="mt-6">Thank you for your submission! It will be reviewed by our team before being added to the map.</v-alert>
    </v-form>
  </v-container>
  <Footer />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Footer from '@/components/layout/Footer.vue';

const formRef = ref();
const submitting = ref(false);
const submitted = ref(false);
const form = ref({
  school: '',
  address: '',
  revocationType: '',
  iceInvolved: '',
  campusSecurity: '',
  homelandSecurity: '',
  localPolice: '',
  comments: '',
});
const revocationTypes = [
  'Crime',
  'Protest Activity',
  'Change in Protection Status',
  'Unknown',
];

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mblgeloq';

async function submitForm() {
  submitting.value = true;
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        school: form.value.school,
        address: form.value.address,
        revocationType: form.value.revocationType,
        iceInvolved: form.value.iceInvolved,
        campusSecurity: form.value.campusSecurity,
        homelandSecurity: form.value.homelandSecurity,
        localPolice: form.value.localPolice,
        comments: form.value.comments,
      }),
    });
    if (response.ok) {
      submitted.value = true;
      form.value = { school: '', address: '', revocationType: '', iceInvolved: '', campusSecurity: '', homelandSecurity: '', localPolice: '', comments: '' };
      if (formRef.value) formRef.value.resetValidation();
    } else {
      alert('Submission failed. Please try again.');
    }
  } catch (e) {
    alert('Submission failed. Please try again.');
  } finally {
    submitting.value = false;
  }
}
</script>
