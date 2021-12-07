import { error } from 'console';
import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {

  const [cart, setCart] = useState<Product[]>(() => {

    // const storagedCart = Buscar dados do localStorage

    // if (storagedCart) {
    //   return JSON.parse(storagedCart);
    // }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      let repetido = false
      // TODO função que vai add product
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
          cart[i].amount =  1
          repetido = true;
        }
      }

      if (repetido) {
        console.log('item já adicionado')
      } else {
        api.get(`/products/${productId}`)
          .then(response => {
            response.data.amount = 1
            setCart([...cart, response.data])});
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

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // TODO
    } catch (error) {
      // TODO

    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
