import '../styles/Cart.css'

function Cart({item, addQuantity, removeOneItem}) {

    const handleAddItem = () => {
        addQuantity(item)
    }

    const handleremoveItem = () => {
        removeOneItem(item)
    }

    return (
        <li>
            <img
                className="cart--item-icon"
                src={`/assets/icons/${item.id}.svg`}
                alt={item.name}
            />
            <p>{item.name}</p>
            <button onClick={handleremoveItem} className="quantity-btn remove-btn center">-</button>
            <span className="quantity-text center">{item.quantity}</span>
            <button onClick={handleAddItem} className="quantity-btn add-btn center">+</button>
        </li>
    )
}

export default Cart