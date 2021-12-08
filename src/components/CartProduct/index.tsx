import {
    MdDelete,
    MdAddCircleOutline,
    MdRemoveCircleOutline,
} from 'react-icons/md';


export interface CartProductProps {
    id: number;
    title: string;
    price: number;
    image: string;
    amount: number;
    handleDelete: (id: number) => void;
    // incrementeProduct:(id: number) => void;
    // decrementProduct:(product: Product) => void;
}

export function CartProduct({ price, image, title, id, amount, handleDelete }: CartProductProps) {

    return (
        <tr data-testid="product" >
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
                        disabled={amount <= 1}
                        // onClick={() => handleDelete(id)}
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
                    // onClick={() => incrementeProduct(id)}
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