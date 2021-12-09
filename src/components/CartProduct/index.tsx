import {
    MdDelete,
    MdAddCircleOutline,
    MdRemoveCircleOutline,
} from 'react-icons/md';
import { Product } from '../../types';


interface CartProductproduct {
    id: number;
    title: string;
    price: number;
    image: string;
    amount: number;
    handleDelete: (id: number) => void;
    incrementeProduct: (product: Product) => void;
    decrementProduct:(product: Product) => void;
}

export function CartProduct({
    id,
    title,
    price,
    image,
    amount,
    handleDelete,
    incrementeProduct,
    decrementProduct
}: CartProductproduct) {

    return (
        <tr data-testid="product" key={id}>
            <td>
                <img src={image} alt="produto" />
            </td>
            <td>
                <strong>{title}</strong>
                <span>R$ {price}</span>
            </td>
            <td>
                <div>
                    <button
                        type="button"
                        data-testid="decrement-product"
                        // disabled={amount <= 1}
                        onClick={() => decrementProduct({ id, title, price, image, amount })}
                    >
                        <MdRemoveCircleOutline size={20} />
                    </button>
                    <input
                        type="text"
                        data-testid="product-amount"
                        readOnly
                        value={amount}
                    />
                    <button
                        type="button"
                        data-testid="increment-product"
                        onClick={() => incrementeProduct({ id, title, price, image, amount })}
                    >
                        <MdAddCircleOutline size={20} />
                    </button>
                </div>
            </td>
            <td>
                <strong>R$ {amount * price}</strong>
            </td>
            <td>
                <button
                    type="button"
                    data-testid="remove-product"
                    onClick={() => handleDelete(id)}
                >
                    <MdDelete size={20} />
                </button>
            </td>
        </tr>
    )
}