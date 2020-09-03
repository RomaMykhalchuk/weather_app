<template>
  <section>
    <h1>surprise</h1>
    <input type="text" v-model="value" />
    <button @click="fetchData">click</button>
    <h1>{{ location.name }}</h1>
    <p>{{ location.base }}</p>
    <Datatable v-bind:location="location" />

  </section>
</template>

<script>
import Datatable from '../components/Datatable'

export default {
  components: {
    Datatable,
  },
  data: () => ({
    location: {},
    value: '',
  }),
  methods: {
    async fetchData() {
      const location = await this.$axios.$get(
        `http://api.openweathermap.org/data/2.5/weather?q=${this.value}&appid=269d45053fab4492a56e8e92e7805686`
      )
      this.location = location
    },
  },

  // methods: {
  //   openLocation() {
  //     this.$router.push(`/${this.value}`)
  //   },
  // },
}
</script>
