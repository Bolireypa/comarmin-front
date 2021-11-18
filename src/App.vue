<template>
  <v-app>
    <div>
      <router-view/>
    </div>
    <!-- <v-main>
    </v-main> -->
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods: {
    homeButton () {
      this.$router.push({ name: 'Home' })
    },
    aboutButton () {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
