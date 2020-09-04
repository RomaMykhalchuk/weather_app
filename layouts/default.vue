<template>
  <v-app>
    <Navbar />
    <main>
      <nuxt/>
    </main>
</v-app>
</template>

<script>
import Navbar from '../components/Navbar';

export default {
  components: {
    Navbar,
  },
}
</script>
