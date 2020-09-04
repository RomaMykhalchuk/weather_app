<template>
  <div class="mt-5 px-5">
    <v-text-field
      prepend-icon="search"
      label="Search"
      v-model="value"
      :rules="rules"
      hide-details="auto"
    ></v-text-field>
    <v-btn text class="success mx-0 ml-3 mt-5" @click="openLocation"
      >Search</v-btn
    >
  </div>
</template>

<script>
export default {
  data: () => ({
    value: '',
    rules: [(value) => !!value || 'Required.'],
  }),
  methods: {
    openLocation() {
      this.$router.push(`/${this.value}`);
    },
  },
};
</script>
