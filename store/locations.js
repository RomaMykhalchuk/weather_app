export const state = () => ({
  locations: [],
})

export const mutations = {
  saveLocation(state, locality) {
    state.locations = [...state.locations, locality];
  }
};

export const actions = {
  // async fetch({commit}) {
  //   const locality = await this.$axios.$get('https://jsonplaceholder.typicode.com/users')
  //   commit('setUsers', users);
  // }
  addLocation(locality, {commit}) {
    commit('saveLocation', locality);
  }
};

export const getters = {
  locations: state => state.tableLocations,
};
