// import console from 'console';
import React from 'react';
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';


import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from './styles';
import { Product } from '../../types'



const Cart = (): JSX.Element => {

  const { cart, removeProduct, updateProductAmount } = useCart();
  // const cartFormatted = cart.map(product => ({
  // TODO
  // }))
  // const total =
  //   formatPrice(
  //     cart.reduce((sumTotal, product) => {
  //       // TODO
  //     }, 0)
  //   )

  const totalPrice = () => {
    var total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].amount * cart[i].price
    }
    return formatPrice(total)
  }

  function handleProductIncrement({id, amount}: Product) {
    // TODO 
    amount++
    updateProductAmount({ id, amount })


  }

  function handleProductDecrement({ id, amount }: Product) {
    // TODO
    amount--
    updateProductAmount({ id, amount })

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
          {cart.map(product => {
            return (
              <tr data-testid="product" key={product.id}>
                <td>
                  <img src={product.image} alt="produto" />
                </td>
                <td>
                  <strong>{product.title}</strong>
                  <span>{formatPrice(product.price)}</span>
                </td>
                <td>
                  <div>
                    <button
                      type="button"
                      data-testid="decrement-product"
                      disabled={product.amount <= 1}
                      onClick={() => handleProductDecrement(product)}
                    >
                      <MdRemoveCircleOutline size={20} />
                    </button>
                    <input
                      type="text"
                      data-testid="product-amount"
                      readOnly
                      value={product.amount}
                    />
                    <button
                      type="button"
                      data-testid="increment-product"
                      onClick={() => handleProductIncrement(product)}
                    >
                      <MdAddCircleOutline size={20} />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{formatPrice(product.amount * product.price)}</strong>
                </td>
                <td>
                  <button
                    type="button"
                    data-testid="remove-product"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{totalPrice()}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;

/*<CartProduct
            id={product.id} 
            title={product.title} 
            price={product.price} 
            image={product.image} 
            amount={product.amount}
            handleDelete={handleRemoveProduct}
            incrementeProduct={handleProductIncrement}
            decrementProduct={handleProductDecrement}
          />*/