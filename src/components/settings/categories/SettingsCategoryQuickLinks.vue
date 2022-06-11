<template>
  <SettingsSection title="Quick Links" :onsubmit="handleSubmit">
    <SettingsInputSwitch
      :id="ids.mail.switch"
      label="Show email quick link"
      :disabled="loading"
      :checked="mail.enabled"
    />
    <SettingsInputText
      v-if="mail.enabled"
      :id="ids.mail.url"
      label="Email url"
      :disabled="loading"
      :value="mail.url"
      placeholder="https://mail.google.com/"
    />

    <SettingsInputSwitch
      :id="ids.calendar.switch"
      label="Show calendar quick link"
      :disabled="loading"
      :checked="calendar.enabled"
    />
    <SettingsInputText
      v-if="calendar.enabled"
      :id="ids.calendar.url"
      label="Calendar url"
      :disabled="loading"
      :value="calendar.url"
      placeholder="https://calendar.google.com/"
    />

    <SettingsInputSwitch
      :id="ids.disk.switch"
      label="Show disk quick link"
      :disabled="loading"
      :checked="disk.enabled"
    />
    <SettingsInputText
      v-if="disk.enabled"
      :id="ids.disk.url"
      label="Disk url"
      :disabled="loading"
      :value="disk.url"
      placeholder="https://drive.google.com/"
    />

    <SettingsInputSwitch
      :id="ids.notes.switch"
      label="Show notes quick link"
      :disabled="loading"
      :checked="notes.enabled"
    />
    <SettingsInputText
      v-if="notes.enabled"
      :id="ids.notes.url"
      label="Notes url"
      :disabled="loading"
      :value="notes.url"
      placeholder="https://keep.google.com/"
    />
    <SettingsSectionHint>
      All quick links redirect to <em>Google services</em> like Gmail or Drive.
      If you want to use other services, just paste their URL into one of the
      text fields. If you want to reset quick link settings, just delete a URL
      from the field, and Google services will be automatically used.
    </SettingsSectionHint>
  </SettingsSection>
</template>

<script>
import SettingsSection from "../section/SettingsSection";
import SettingsInputSwitch from "../../settings/inputs/SettingsInputSwitch";
import SettingsSectionHint from "../section/SettingsSectionHint";
import QuickLinksSettings from "../../../models/settings/QuickLinksSettings";
import SettingsInputText from "../../settings/inputs/SettingsInputText";

export default {
  components: {
    SettingsInputText,
    SettingsInputSwitch,
    SettingsSection,
    SettingsSectionHint
  },
  data() {
    return {
      mail: {
        enabled: false,
        url: ""
      },
      calendar: {
        enabled: false,
        url: ""
      },
      disk: {
        enabled: false,
        url: ""
      },
      notes: {
        enabled: false,
        url: ""
      },
      loading: true
    };
  },
  computed: {
    ids: function() {
      const prefix = "quickLink";

      return {
        mail: {
          switch: `${prefix}_mail_switch`,
          url: `${prefix}_mail_url`
        },
        calendar: {
          switch: `${prefix}_calendar_switch`,
          url: `${prefix}_calendar_url`
        },
        disk: {
          switch: `${prefix}_disk_switch`,
          url: `${prefix}_disk_url`
        },
        notes: {
          switch: `${prefix}_notes_switch`,
          url: `${prefix}_notes_url`
        }
      };
    }
  },
  methods: {
    /**
     * @param {FormData} data
     */
    handleSubmit(data) {
      this.loading = true;
      const old = [];

      this.forAllData(category => {
        old.push(this[category]);
        this[category] = QuickLinksSettings.quickLink(
          data.get(this.ids[category].switch) === "1",
          data.get(this.ids[category].url) || ""
        );
      });
      QuickLinksSettings.handleDataChange(
        this.mail,
        this.calendar,
        this.disk,
        this.notes
      )
        .catch(() => {
          this.forAllData(category => {
            this[category] = old[category];
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * @param {function(string)} cb
     */
    forAllData(cb) {
      Object.keys(this.ids).forEach(cb);
    }
  },
  mounted() {
    QuickLinksSettings.getSettings()
      .then(data => {
        if (data) {
          this.forAllData(category => {
            this[category] = data[category];
          });
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>

<style></style>
