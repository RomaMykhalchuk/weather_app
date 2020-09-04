<template>
  <section>
    <h1>surprise</h1>
    <input type="text" v-model="value" />
    <button @click="openLocation">click</button>
  </section>
</template>

<script>
export default {
  data: () => ({
    value: '',
  }),
  methods: {
    openLocation() {
      this.$router.push(`/${this.value}`);
    },
  },
};
</script>
