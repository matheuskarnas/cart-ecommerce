import {
    MdDelete,
    MdAddCircleOutline,
    MdRemoveCircleOutline,
} from 'react-icons/md';


export interface CartShowerProps {
    id: number;
    title: string;
    price: number;
    image: string;
    amount: number;
    handleDelete: (id: number) => void;
}

export function CartShower({ price, image, title, id, amount, handleDelete }: CartShowerProps) {

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
                        //disabled={product.amount <= 1}
                        // onClick={handleDelete(id)}
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
                    // onClick={() => handleProductIncrement()}
                    >
                        <MdAddCircleOutline size={20} />
                    </button>
                </div>
            </td>
            <td>
                <strong>R$ 359,80</strong>
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