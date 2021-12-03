import {
    MdDelete,
    MdAddCircleOutline,
    MdRemoveCircleOutline,
} from 'react-icons/md';

interface CartShowerProps {
    price: number;
    image: string;
    title: string
    id: number;


}

export function CartShower({price, image, title, id}:CartShowerProps) {
    return (
        <tr data-testid="product" >
            <td>
                <img src={image} />
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
                    // disabled={product.amount <= 1}
                    // onClick={() => handleProductDecrement()}
                    >
                        <MdRemoveCircleOutline size={20} />
                    </button>
                    <input
                        type="text"
                        data-testid="product-amount"
                        readOnly
                        value={2}
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
                // onClick={() => handleRemoveProduct(product.id)}
                >
                    <MdDelete size={20} />
                </button>
            </td>
        </tr>
    )
}