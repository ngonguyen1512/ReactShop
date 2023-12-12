import React, { Component } from 'react';
import Swal from 'sweetalert2';

export const CartContext = React.createContext();

export class CartProvider extends Component {
    constructor(props) {
        super(props);
        this.state = { cartItems: [] };
        this.addToCart = this.addToCart.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.removeAllFromCart = this.removeAllFromCart.bind(this);
    }
    addToCart(product, idColor, idSize) {
        const existingProductIndex = this.state.cartItems.findIndex(item =>
            item.id === product.id &&
            item.idColor === idColor &&
            item.idSize === idSize
        );
        if (existingProductIndex >= 0) {
            const updatedCartItems = [...this.state.cartItems];
            updatedCartItems[existingProductIndex].quantity++;
            this.setState({
                cartItems: updatedCartItems
            });
        } else {
            this.setState({
                cartItems: [...this.state.cartItems, { ...product, quantity: 1, idColor: idColor, idSize: idSize }]
            });
        }
        Swal.fire({
            title: 'Success!', text: 'Add product successfully.',
            icon: 'success', timer: 1000,
            showConfirmButton: false
        });
    }
    updateQuantity(product, newQuantity) {
        if (newQuantity < 1) return;
        const updatedCartItems = this.state.cartItems.map((item) => {
            if (item.id === product.id && item.idColor === product.idColor && item.idSize === product.idSize)
                return { ...item, quantity: newQuantity };
            return item;
        });
        this.setState({
            cartItems: updatedCartItems
        });
    }
    removeFromCart(idProduct, idSize, idColor) {
        const updatedCartItems = this.state.cartItems.filter(
            (item) => !(item.id === idProduct && item.idSize === idSize && item.idColor === idColor)
        );
        this.setState({ cartItems: updatedCartItems });
    }
    removeAllFromCart() {
        this.setState({ cartItems: [] });
    }
    render() {
        return (
            <CartContext.Provider
                value={{
                    cartItems: this.state.cartItems,
                    addToCart: this.addToCart,
                    updateQuantity: this.updateQuantity,
                    removeFromCart: this.removeFromCart,
                    removeAllFromCart: this.removeAllFromCart
                }}
            >
                {this.props.children}
            </CartContext.Provider>
        );
    }
}
