<template>
  <SettingsSection class="thankYou">
    <h5>Powered by:</h5>
    <p>
      <a href="https://unsplash.com/" target="_blank" rel="noopener">
        Unsplash
      </a>
      <br />
      <a href="https://openweathermap.org/" target="_blank" rel="noopener">
        OpenWeatherMap
      </a>
      <br />
      <a href="https://todoist.com/" target="_blank" rel="noopener">
        Todoist
      </a>
    </p>
    <p>Thank you for your service. Stay awesome!</p>
    <p>•</p>
    <p>And thank YOU for using this product.<br />May it serves you well!</p>
  </SettingsSection>
</template>

<script>
import SettingsSection from "../section/SettingsSection";

export default {
  components: { SettingsSection }
};
</script>

<style>
.thankYou {
  text-align: center;
}
</style>
