import { createStore } from 'vuex'

export default createStore({
  state: {
    products: [],
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
  },
  actions: {
    fetchProducts({commit}) {
      fetch('products.json')
      .then(response => response.json())
      .then(res=> {
        commit('setProducts',res);
      })
      .catch(err => console.log(err))
    },
  },
  getters:{
    allProducts: state => {
      return state.products;
    }
  }

})
