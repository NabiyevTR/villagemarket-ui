import cartApi from "@/services/cart.service";

// initial state
// shape: [{ id, quantity }]

const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'));
const user = JSON.parse(localStorage.getItem('user'));

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

    pushCartToServer: async function({state}) {
        if (user) {
           return await cartApi.updateCart(state.items);
        }
    },

    getCartFromServer({commit}) {
        cartApi.getCart()
            .then(
                function (result) {
                    commit('setCartItems', {
                        items: result
                    })
                }
            )
    },

    clearCart({commit}) {
        commit('setCartItems', {items: []});
        localStorage.setItem('cart', JSON.stringify([]));

    },

    incrementItemQuantity({commit, state}, id) {
        commit('incrementItemQuantity', id);
        localStorage.setItem('cart', JSON.stringify(state.items));
    },

    decrementItemQuantity({commit, state}, id) {
        commit('decrementItemQuantity', id);
        localStorage.setItem('cart', JSON.stringify(state.items));
    },

    removeItem({commit, state}, id) {
        commit('deleteCartItem', id);
        localStorage.setItem('cart', JSON.stringify(state.items));
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
        const cartItem = state.items.find(item => item.id === id);
        cartItem.quantity++;
    },

    decrementItemQuantity(state, {id}) {
        const cartItem = state.items.find(item => item.id === id);
        if (cartItem.quantity > 1) {
            cartItem.quantity--;
        }
    },

    deleteCartItem(state, {id}) {
        const cartItems = state.items;
        const index = cartItems.map(x => {
            return x.id;
        }).indexOf(id);

        cartItems.splice(index, 1);
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

