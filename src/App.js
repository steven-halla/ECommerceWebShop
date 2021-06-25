import React, {useEffect, useState} from 'react'
import {commerce} from "./lib/commerce";
import {Cart, Navbar} from './components';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(null);

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
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
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
    <div>
      <Navbar totalItems={totalItem}/>
      {/*<Products products={products} onAddToCart={handleAddToCart} />*/}
      {/* below equivalent to if cart != null then render Cart */}
      <Cart cart={cart}/>
    </div>
  )
}

export default App;