<template>
  <div v-if="!loading" class="quickLinks">
    <LayoutButton v-if="mail.enabled" :link="mailUrl">
      <GmailIcon />
    </LayoutButton>
    <LayoutButton v-if="calendar.enabled" :link="calendarUrl">
      <CalendarIcon />
    </LayoutButton>
    <LayoutButton v-if="disk.enabled" :link="diskUrl">
      <DriveIcon />
    </LayoutButton>
    <LayoutButton v-if="notes.enabled" :link="notesUrl">
      <KeepIcon />
    </LayoutButton>
  </div>
</template>

<script>
import LayoutButton from "./LayoutButton";
import GmailIcon from "./icons/GmailIcon";
import CalendarIcon from "./icons/CalendarIcon";
import DriveIcon from "./icons/DriveIcon";
import KeepIcon from "./icons/KeepIcon";
import QuickLinksSettings from "../models/settings/QuickLinksSettings";

export default {
  components: { LayoutButton, GmailIcon, CalendarIcon, DriveIcon, KeepIcon },
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
    mailUrl() {
      return this.mail.url || "https://mail.google.com/mail/u/0/";
    },
    calendarUrl() {
      return this.calendar.url || "https://calendar.google.com/calendar/r";
    },
    diskUrl() {
      return this.disk.url || "https://drive.google.com/drive/";
    },
    notesUrl() {
      return this.notes.url || "https://keep.google.com";
    }
  },
  methods: {
    init() {
      QuickLinksSettings.getSettings()
        .then(data => {
          if (data) {
            this.mail = data.mail;
            this.calendar = data.calendar;
            this.disk = data.disk;
            this.notes = data.notes;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    this.init();
    QuickLinksSettings.observeUpdate(this.init);
  },
  destroyed() {
    QuickLinksSettings.removeObserver(this.init);
  }
};
</script>

<style>
.quickLinks > *:not(:last-child) {
  margin-right: 0.5rem;
  vertical-align: middle;
}
</style>
