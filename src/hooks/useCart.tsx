import { Console, error } from 'console';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { classicNameResolver } from 'typescript';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  id: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ id, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {

  useEffect(() => {
    api.get(`/stock/`)
      .then((response) => setStock(response.data))
  })

  const [cart, setCart] = useState<Product[]>(() => {

    const storagedCart = localStorage.getItem("@RocketShoes:cart")

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('@RocketShoes:cart', JSON.stringify(cart))
    console.log(cart)
  }, [cart])

  const addProduct = async (productId: number) => {
    try {
      let repetido = false
      // TODO função que vai add product
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {          
          repetido = true;
        }
      }

      if (repetido) {
        toast.error('item já adicionado');

      } else {
        api.get(`/products/${productId}`)
          .then(response => {
            response.data.amount = 1
            setCart([...cart, response.data])
          });
      }
      repetido = false

    } catch (error) {
      // TODO
      console.log(error);
    }
  };

  const removeProduct = (productId: number) => {
    try {
      setCart(cart.filter(p => p.id !== productId))

    } catch (error) {
      // TODO
      console.log(error);
    }
  };
  const [stock, setStock] = useState<Stock[]>([])
  const updateProductAmount = async ({
    id,
    amount,
  }: UpdateProductAmount) => {

    const checkStock = stock.filter(item => item.id === id)

    if (checkStock[0].amount < amount) {

      toast.error(`Temos apenas ${checkStock[0].amount} unidades desse item`)

    } else if (amount < 1) {

      toast.error('valor invalido')

    } else {

      const newCart = cart.map(product => product.id !== id ? product : {
        ...product,
        amount,
      })
      setCart(newCart)
    }

  }
  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};



export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}