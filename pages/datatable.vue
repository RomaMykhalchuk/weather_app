<template>
  <v-data-table
    dense
    :headers="headers"
    :items="locations"
    item-key="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <!-- <v-btn color="primary" dark class="mb-2" @click="addToTable"
          >Add to the table</v-btn
        > -->
        <!-- <v-btn color="pink" class="mb-2" @click="deleteItem">Delete</v-btn> -->
      </v-toolbar>

    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  // props: ['location'],
  
  data: () => ({
    locations: [],
    headers: [
      { text: 'Location', value: 'name' },
      { text: 'Country', value: 'sys.country' },
      { text: 'Temparature', value: 'main.temp' },
      { text: 'Humidity', value: 'main.humidity' },
      { text: 'Pressure', value: 'main.pressure' },
      { text: 'Actions', value: 'actions' },
    ],
  }),
  mounted() {
    const locations = localStorage.getItem('locations')
      ? JSON.parse(localStorage.getItem('locations'))
      : [];
    console.log(locations);
    this.locations = this.locations.concat(locations,[1,2,3]);
  },
  methods: {
    // addToTable() {
    //   this.locations.push(this.location)
    // },

    deleteItem(item) {
      const index = this.locations.findIndex(
        (currentItem) => currentItem === item
      )
      confirm('Are you sure you want to delete this item?') &&
        this.locations.splice(index, 1)
    },
  },
}
</script>
