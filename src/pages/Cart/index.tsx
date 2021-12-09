// import console from 'console';
import React from 'react';

import { CartProduct } from '../../components/CartProduct';

import { useCart } from '../../hooks/useCart';
// import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from './styles';
import { Product } from '../../types'



const Cart = (): JSX.Element => {
  
  const { cart, removeProduct, updateProductAmount } = useCart();
  // const cartFormatted = cart.map(product => ({
  //   // TODO
  // }))
  // const total =
  //   formatPrice(
  //     cart.reduce((sumTotal, product) => {
  //       // TODO
  //     }, 0)
  //   )

  const  totalPrice = () => {
    var total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].amount * cart[i].price
    }
    return total
  }

  function handleProductIncrement({id, amount}: Product) {
    // TODO 
    amount++
    updateProductAmount({id, amount})
    
    
  }

  function handleProductDecrement(product: Product) {
    // TODO

  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId)
  }
  // console.log(cart)
  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {cart.map(product => <CartProduct
            id={product.id} 
            title={product.title} 
            price={product.price} 
            image={product.image} 
            amount={product.amount}
            handleDelete={handleRemoveProduct}
            incrementeProduct={handleProductIncrement}
            // decrementProduct={handleProductDecrement}
          />)}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>R$ {totalPrice()}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;