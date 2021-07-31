import cartApi from "@/services/cart.service";

// initial state
// shape: [{ id, quantity }]


const cartFromLocalStorage = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];

/*
    () => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    console.debug(cart);
    if (cart === undefined) {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        return cart;
    } else {
        return cart;
    }
}*/


const user = JSON.parse(localStorage.getItem('user'));

const state =
    () => ({
        items: cartFromLocalStorage
            ? cartFromLocalStorage
            : []
    })

// getters
const getters = {

    cartProducts: (state) => {

        if (state.items !== 'undefined' && state.items > 0) {
            return state.items;
        }

        try {
            state.items = JSON.parse(localStorage.getItem('cart'));
        } catch (e) {
            console.error(e);
            state.items = [];
            localStorage.setItem('cart', JSON.stringify(state.items));

        }
        return state.items;
    },

    cartTotalPrice: (state, getters) => {

        if (!getters.cartProducts || getters.cartProducts.length === 0) {
            return 0;
        }

        return getters.cartProducts.reduce((total, product) => {
            return total + product.price * product.quantity
        }, 0)
    },

    cartIsNotEmpty: (state) => {
        return state.items.length > 0;
    },
}


// actions
const actions = {

    loadCart({commit}) {
        cartApi.getCart()
            .then(data => {

                let serverCart, clientCart;

                try {
                    serverCart = data.cart;
                    console.debug('Cart from server: ', ...serverCart);
                } catch (e) {
                    console.error(e);
                    serverCart = [];
                }

                try {
                    clientCart = JSON.parse(localStorage.getItem('cart'));
                    console.debug('Cart from client: ', ...clientCart);
                } catch (e) {
                    console.error(e);
                    clientCart = [];
                }


                if (clientCart !== undefined && clientCart.length > 0) {
                    console.debug('Start pushing cart to server: ', clientCart)
                    cartApi.updateCart(clientCart)
                        .then(() => console.debug('Cart was pushed to server'));
                    return;
                } else if (serverCart !== undefined && serverCart.length > 0) {
                    commit('setCartItems', [...serverCart]);
                    localStorage.setItem('cart', JSON.stringify([...serverCart]));
                    console.debug('Saving cart to local storage: ', [...serverCart])
                }
            });
    },

    getCartFromLocalStorage() {
        const cart = JSON.parse(localStorage.getItem('cart'));
        console.debug(cart);
        if (cart === undefined) {
            return [];
        } else {
            return cart;
        }
    }
    ,

    update({commit}) {
        const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'));

        if (cartFromLocalStorage) {
            commit('setCartItems', cartFromLocalStorage);
        } else {
            commit('setCartItems', []);
        }
    }
    ,

    pushCartToServer: async function ({state}) {

        if (user) {
            console.debug('Saving cart to local storage: ', state.items)
            return await cartApi.updateCart(state.items);

        }
    }
    ,

    getCartFromServer({commit}) {
        cartApi.getCart()
            .then(
                function (result) {
                    commit('setCartItems', {
                        items: result
                    })
                }
            )
    }
    ,

    clearCart({commit}) {
        commit('setCartItems', []);
        console.debug('Store is empty');
        localStorage.setItem('cart', JSON.stringify([]));
        localStorage.removeItem('cart');
        console.debug('Local storage is empty')
    }
    ,

    incrementItemQuantity({commit, state}, id) {
        commit('incrementItemQuantity', id);
        localStorage.setItem('cart', JSON.stringify(state.items));
    }
    ,

    decrementItemQuantity({commit, state}, id) {
        commit('decrementItemQuantity', id);
        localStorage.setItem('cart', JSON.stringify(state.items));
    }
    ,

    removeItem({commit, state}, id) {
        commit('deleteCartItem', id);
        localStorage.setItem('cart', JSON.stringify(state.items));
    }
    ,

    addProductToCart({state, commit}, product) {

        if (!state.items) {
            state.items = [];
            localStorage.setItem('cart', JSON.stringify(state.items));
        }

        const cartItem = state.items.find(item => item.id === product.id)

        if (!cartItem) {
            commit('pushProductToCart', {id: product.id, name: product.name, price: product.price})
        } else {
            commit('incrementItemQuantity', cartItem)
        }

        localStorage.setItem('cart', JSON.stringify(state.items));

        if (user) {
            cartApi.updateCart(state.items)
                .then(() => console.debug('Cart was pushed to server'))
        }


    }
    ,

    setCart({commit}, cart) {
        commit('setCartItems', {
            items: cart
        });
        localStorage.setItem('cart', JSON.stringify(state.items));
        console.debug('Saving cart to local storage: ', cart)
    }
    ,
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
        console.debug('Push product to cart');
        console.debug('Items: ', state.items);
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

    setCartItems(state, items) {
        state.items = items
        console.debug('Saving cart to store: ', items)
    },


}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,

}

