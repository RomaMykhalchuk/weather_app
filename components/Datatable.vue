<template>
  <v-data-table
    dense
    :headers="headers"
    :items="locations"
    show-select
    :single-select="singleSelect"
   v-model="selected"
    item-key="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-btn color="primary" dark class="mb-2" @click="addToTable"
          >Add to the table</v-btn
        >
        <v-btn color="pink" class="mb-2" @click="deleteItem"
          >Delete</v-btn
        >
      </v-toolbar>
          <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: ['location'],
  data: () => ({
    singleSelect: false,
    locations: [],
    selected:[],
    headers: [
      {text: 'Checks', value: 'selector'},
      { text: 'Location', value: 'name' },
      { text: 'Country', value: 'sys.country' },
      { text: 'Temparature', value: 'main.temp' },
      { text: 'Humidity', value: 'main.humidity' },
      { text: 'Pressure', value: 'main.pressure' },
      { text: 'Actions', value: 'actions' },
    ],
  }),

  methods: {
    addToTable() {
      console.log(this.location)
      this.locations.push(this.location)
    },
    deleteItem(item) {
      if (this.selected.length > 1) {
        this.locations = this.locations.filter(item => !this.selected.some(elem => elem.name === item.name))
      }
      const index = this.locations.findIndex(
        (currentItem) => currentItem === item
      )
      confirm('Are you sure you want to delete this item?') &&
        this.locations.splice(index, 1)
    },
  },
}
</script>
