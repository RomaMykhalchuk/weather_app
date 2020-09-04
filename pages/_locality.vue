<template>
<section>
  <v-card class="mx-auto" max-width="400">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">{{locality.name}}</v-list-item-title>
        <v-list-item-subtitle>{{locality.dt}}, {{locality.weather[0].main}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-row align="center">
        <v-col class="display-3" cols="6">
          {{locality.main.temp}}&deg;C
        </v-col>
        <v-col cols="6">
          <v-img
            src= "http://openweathermap.org/img/w/" + icon + ".png"
            alt="Sunny image"
            width="92"
          ></v-img>
        </v-col>
      </v-row>
    </v-card-text>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-send</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>{{locality.wind.speed}} km/h</v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-cloud-download</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>{{locality.main.humidity}} %</v-list-item-subtitle>
    </v-list-item>
      <v-card-actions>
    
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
        <v-alert type="success">
      I'm a success alert.
    </v-alert>
  </v-card>
  <Datatable :location='locality'/>
</section>
</template>

<script>

import Datatable from '../components/Datatable';

export default {
  components: {
    Datatable,
  },
  async asyncData({ $axios, params }) {
    const key = '269d45053fab4492a56e8e92e7805686';
    const units = 'metric';

    const locality = await $axios.$get(
      `http://api.openweathermap.org/data/2.5/weather?q=${params.locality}&appid=${key}&units=${units}`
    );
    return { locality };
  },
  methods:{
    addToStorage() {
      const locations = localStorage.getItem('locations')
        ? JSON.parse(localStorage.getItem('locations'))
        : [];
      if (locations.some(item => item.name === this.locality.name)) {
        alert('This locality has been already added');
        this.$router.push('/');
        return;
      };
      locations.push(this.locality);
      localStorage.locations = JSON.stringify(locations);
    },
    removeFromStorage() {
      const locations = localStorage.getItem('locations')
        ? JSON.parse(localStorage.getItem('locations'))
        : [];
      const currentIndex = locations.findIndex(
        (currentItem) => currentItem.name === locations.name
      );
      confirm('Are you sure you want to delete this item?') &&
        locations.splice(currentIndex, 1);
      localStorage.locations = JSON.stringify(locations);
    }
  }
}
</script>
