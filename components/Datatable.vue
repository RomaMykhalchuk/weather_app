<template>
  <section>
    <v-data-table
      dense
      :headers="headers"
      :items="locations"
      item-key="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-btn color="primary" dark class="mb-2" @click="addToTable"
            >Add to the table</v-btn
          >
          <v-btn text color="deep-purple accent-4" @click="addToStorage">
            Add to storage
          </v-btn>
          <v-btn text color="deep-purple accent-4" @click="removeFromStorage">
            Delete from storage
          </v-btn>
          <!-- <v-btn color="pink" class="mb-2" @click="deleteItem">Delete</v-btn> -->
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon large color="green darken-2" class="mr-2" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
        <v-icon small class="mr-2" @click="removeFromStorage(item)">
          mdi-circle
        </v-icon>
      </template>
    </v-data-table>
  </section>
</template>

<script>
export default {
  props: ['location'],

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
    this.locations = locations;
  },
  methods: {
    addToTable() {
      this.locations.push(this.location);
    },

    addToStorage() {
      const locations = localStorage.getItem('locations')
        ? JSON.parse(localStorage.getItem('locations'))
        : [];
      if (locations.some((item) => item.name === this.location.name)) {
        alert('This locality has been already added');
        this.$router.push('/');
        return;
      }
      locations.push(this.location);
      localStorage.locations = JSON.stringify(locations);
      // this.locations.push(this.location);
      this.addToTable();
    },

    deleteItem(item) {
      const index = this.locations.findIndex(
        (currentItem) => currentItem === item
      );
      confirm('Are you sure you want to delete this item?') &&
        this.locations.splice(index, 1);
    },

    removeFromStorage(item) {
      const locations = localStorage.getItem('locations')
        ? JSON.parse(localStorage.getItem('locations'))
        : [];
      const currentIndex = locations.findIndex(
        (currentItem) => currentItem.name === locations.name
      );
      confirm('Are you sure you want to delete this item?') &&
        locations.splice(currentIndex, 1);
      localStorage.locations = JSON.stringify(locations);
      this.locations.splice(currentIndex, 1);
    },
  },
};
</script>
