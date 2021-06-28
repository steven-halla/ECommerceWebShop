import React, {useEffect, useState} from 'react'
import {commerce} from "./lib/commerce";
import { Products, Cart, Navbar, Checkout} from './components';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(null);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async () => {
    console.log("fetch products");
    const response = await commerce.products.list();
    console.log(response);
    const {data} = response;
    setProducts(data);
  }

  const fetchCart = async () => {
    console.log("fetch cart");
    const response = await commerce.cart.retrieve();
    console.log(response);
    setCart(response);
  }

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);

    setCart(cart);
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, {quantity});

    setCart(cart);
  }

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  }

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart)
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  }


  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart);

  const getCartTotalItems = (cart) => {
    if (!cart || !cart.total_items) {
      return 0;
    }
    return cart.total_items;
  }

  const totalItem = getCartTotalItems(cart);

  return (
    <Router>
      <div>
        <Navbar totalItems={totalItem}/>
        <Switch>

          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>

          <Route exact path="/cart">
            <Cart
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>

          <Route exact path="/checkout">
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          </Route>
          {/* below equivalent to if cart != null then render Cart */}
        </Switch>
      </div>
    </Router>

  )
}

export default App;