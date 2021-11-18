import { mapActions } from 'vuex'

export default {
  data() {
    return {
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' },
      ],
      right: null,
      mini: true
    }
  },
  methods: {
    ...mapActions('authModule', ['removeCredentials']),
    logout () {
      this.removeCredentials()
      this.$router.push({ name: 'Login' })
    }
  }
}