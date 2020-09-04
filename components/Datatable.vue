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
        <v-toolbar flat color="white mb-2">
          <v-btn color="warning dark mr-5" @click="addToTable"
            >Add to the table</v-btn
          >
          <v-btn color="warning dark mr-5" @click="addToStorage">
            Save to the storage
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.tableDelete="{ item }">
        <v-icon class="mr-2" color="red" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:item.storageDelete="{ item }">
        <v-icon class="mr-2" color="black" @click="removeFromStorage(item)">
          mdi-delete
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
      { text: 'Temparature, Celsius', value: 'main.temp' },
      { text: 'Humidity, %', value: 'main.humidity' },
      { text: 'Pressure, hPa', value: 'main.pressure' },
      {
        text: 'Actions (delete locally)',
        value: 'tableDelete',
        sortable: false,
      },
      {
        text: 'Actions (delete from the storage)',
        value: 'storageDelete',
        sortable: false,
      },
    ],
  }),
  mounted() {
    const locations = localStorage.getItem('locations')
      ? JSON.parse(localStorage.getItem('locations'))
      : [];
    this.locations = locations;
  },
  methods: {
    addToTable() {
      if (this.locations.some((item) => item.name === this.location.name)) {
        alert('This location has been already added');
        return;
      }
      this.locations.push(this.location);
    },

    addToStorage() {
      const locations = localStorage.getItem('locations')
        ? JSON.parse(localStorage.getItem('locations'))
        : [];
      if (locations.some((item) => item.name === this.location.name)) {
        alert('This location has been already added');
        return;
      }
      locations.push(this.location);
      localStorage.locations = JSON.stringify(locations);
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
        (currentItem) => currentItem.name === item.name
      );
      confirm('Are you sure you want to delete this item?') &&
        locations.splice(currentIndex, 1);
      localStorage.locations = JSON.stringify(locations);
      this.locations.splice(currentIndex, 1);
    },
  },
};
</script>
