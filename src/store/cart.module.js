import cartApi from "@/services/cart.service";

// initial state
// shape: [{ id, quantity }]

const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'));

const state =
    () => ({
        items: cartFromLocalStorage ? cartFromLocalStorage : [],
        savedItems: []
    })

// getters
const getters = {

    cartProducts: (state) => {

        if (!state.items) {
            state.items = JSON.parse(localStorage.getItem('cart'))
            alert(state.items)
        }
        if (!state.items) {
            state.items = [];
        }

        return state.items;
    },

    cartTotalPrice: (state, getters) => {
        return getters.cartProducts.reduce((total, product) => {
            return total + product.price * product.quantity
        }, 0)
    },

    cartIsNotEmpty: (state) => {
        return state.items.length > 0;
    }
}

// actions
const actions = {

    update(
        {commit}
    ) {
        const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'));

        if (cartFromLocalStorage) {
            commit('setCartItems', cartFromLocalStorage);
        } else {
            commit('setCartItems', []);
        }
    },

    pushCartToServer({commit, state}) {
        commit('saveItems');
        commit('setCartItems', {items: []});
        cartApi.updateCart(state.items)
            .then(function (result) {
                console.log(result);
            });
    },

    clearCart({commit}) {
        commit('setCartItems', {items: []});
        localStorage.setItem('cart', JSON.stringify([]));
    },

    addProductToCart({state, commit}, product) {

        commit('setCheckoutStatus', null)

        const cartItem = state.items.find(item => item.id === product.id)
        if (!cartItem) {
            commit('pushProductToCart', {id: product.id, name: product.name, price: product.price})
        } else {
            commit('incrementItemQuantity', cartItem)
        }
        localStorage.setItem('cart', JSON.stringify(state.items));
    }
}

// mutations
const mutations = {
    pushProductToCart(state, {id, name, price}) {
        state.items.push({
            id,
            name,
            price,
            quantity: 1
        })
    },

    incrementItemQuantity(state, {id}) {
        const cartItem = state.items.find(item => item.id === id)
        cartItem.quantity++
    },

    setCartItems(state, {items}) {
        state.items = items
    },

    saveItems(state) {
        state.savedItems = [...state.items];
    },

    setCheckoutStatus(state, status) {
        state.checkoutStatus = status
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,

}

