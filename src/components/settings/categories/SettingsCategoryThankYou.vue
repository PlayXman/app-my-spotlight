<template>
  <SettingsSection class="thankYou">
    <h5>Project and issues</h5>
    <p>
      All the source files can be found on
      <SimpleLink href="https://github.com/PlayXman/app-my-spotlight" external
        >Github</SimpleLink
      >. Any ideas for new features or bugs file in the
      <SimpleLink
        href="https://github.com/PlayXman/app-my-spotlight/issues"
        external
        >Issues on Github</SimpleLink
      >.
    </p>
    <h5>Powered by:</h5>
    <p>
      <SimpleLink href="https://unsplash.com/" external>Unsplash</SimpleLink>
      <br />
      <SimpleLink href="https://openweathermap.org/" external
        >OpenWeatherMap</SimpleLink
      >
      <br />
      <SimpleLink href="https://todoist.com/" external>Todoist</SimpleLink>
    </p>
    <p>Thank you for your service. Stay awesome!</p>
    <p>•</p>
    <p>And thank YOU for using this product.<br />May it serves you well!</p>
  </SettingsSection>
</template>

<script>
import SettingsSection from "../section/SettingsSection";
import SimpleLink from "../../SimpleLink";

export default {
  components: { SimpleLink, SettingsSection }
};
</script>

<style>
.thankYou {
  text-align: center;
}
</style>
