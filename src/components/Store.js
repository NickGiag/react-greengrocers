import '../styles/Store.css'
function Store({item, addItem}) {

    const handleAddItem = () => {
        addItem(item)
    }

    return (
        <li>
            <div className="store--item-icon">
                <img src={`/assets/icons/${item.id}.svg`} alt={item.name} />
            </div>
            <button onClick={handleAddItem}>Add to cart</button>
        </li>

    )
}


export default Store
