import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
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
  
  const [stock, setStock] = useState<Stock[]>([])
  
  const [cart, setCart] = useState<Product[]>(() => {
    
    const storagedCart = localStorage.getItem("@RocketShoes:cart")
    
    if (storagedCart) {
      return JSON.parse(storagedCart);
    }
    return [];
  });
  
  useEffect(() => {
    api.get(`/stock/`)
      .then((response) => setStock(response.data))
  })
  
  useEffect(() => {
    localStorage.setItem('@RocketShoes:cart', JSON.stringify(cart))
  }, [cart])

  const addProduct = async (productId: number) => {
    try {
      // TODO função que vai add product
      let repetido = false
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

    } catch {
      // TODO
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      setCart(cart.filter(p => p.id !== productId))

    } catch (error) {
      // TODO
      toast.error('Erro na remoção do produto');
    }
  };
  
  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    if (amount < 1) {
      toast.error('valor invalido')
      return
    } 

    const checkStock = stock.filter(item => item.id === productId)

    if (checkStock[0].amount < amount) {

      toast.error('Quantidade solicitada fora de estoque');

    } else {

      const newCart = cart.map(product => product.id !== productId ? product : {
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