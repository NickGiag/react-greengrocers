import './styles/reset.css'
import './styles/index.css'

import initialStoreItems from './store-items'
import Store from './components/Store'
import Cart from './components/Cart'
import { useEffect, useState } from 'react'

/*
Here's what a store item should look like
{
  id: '001-beetroot',
  name: 'beetroot',
  price: 0.35
}

What should a cart item look like? 🤔
*/
const initialCartItems = []

const fruitsList = ['apple', 'apricot', 'avocado', 'bananas', 'berry', 'blueberry'] 

const veggiesInitial = []
const fruitsInitial = []

initialStoreItems.forEach(item => {
  if (fruitsList.includes(item.name)) {
    fruitsInitial.push(item)
  } else {
    veggiesInitial.push(item)
  }
})

console.log(veggiesInitial);
// console.log(initialStoreItems)

export default function App() {
  // Setup state here...
  const [storeItems, setStoreItems] = useState(initialStoreItems)
  const [vegetables , setVegetables] = useState(veggiesInitial)
  const [fruits, setFruits] = useState(fruitsInitial)
  const [check1, setCheck1] = useState(false)
  const [check2, setCheck2] = useState(false)

  const [cartItems, setCartItems] = useState(initialCartItems)
  const [price, setPrice] = useState(0)

  const addItem = (item) => {
    const found = false
    cartItems.map(cartItem => {
      if (cartItem === item) {
        addQuantity(item)
        found = true
      }
      return
    })

    if (!found) {
      const newItem = item
      newItem.quantity = 1
      setCartItems([...cartItems, newItem])
    }
  }

  const addQuantity = (item) => {
    const addedQuantity = cartItems.map(cartItem => {
      if (cartItem === item) {
        cartItem.quantity++
      }
      return cartItem
    })
    setCartItems(addedQuantity)
  }

  const removeOneItem = (item) => {
    if (item.quantity > 1) {
      const removedQuantityItems = cartItems.map(cartItem => {
        if (cartItem === item) {
          cartItem.quantity--
        }
        return cartItem
      })
      setCartItems(removedQuantityItems)
    } else {
      const removedItems = cartItems.filter(cartItem => cartItem.id !== item.id)
      setCartItems(removedItems)
    }
  }

  const priceCalc = () => {
    let sum = 0
    cartItems.forEach(item => {
      sum = sum + item.quantity * item.price
    })
    setPrice(sum)
  }

  

  const handleFruits = (event) => {
    if (event.target.checked) {
      setStoreItems(fruits)
    } else {
      setStoreItems(initialStoreItems)
    }
  }

  const handleVeggies = (event) => {
    if (event.target.checked) {
      setStoreItems(vegetables)
    } else {
      setStoreItems(initialStoreItems)
    }
  }

  
  useEffect (() => {
    priceCalc()
  }, [cartItems])

  return (
    <>
      <header id="store">
        <h1>Greengrocers</h1>
        <div className='filters'>
          <label>Select for fruits</label>
          <input onChange={handleFruits} type='checkbox'></input>
          <input onChange={handleVeggies} className='margin-left' type='checkbox'></input>
          <label>Select for vegetables</label>
        </div>
        <ul className="item-list store--item-list">
          {
            storeItems.map(item => {
              return (
                <Store 
                item={item} 
                addItem={addItem}
                key={item.id}
                />
              )
            })
          }
        </ul>
      </header>
      <main id="cart">
        <h2>Your Cart</h2>
        <div className="cart--item-list-container">
          <ul className="item-list cart--item-list">
          {
            cartItems.map(item => {
              return (
                <Cart 
                item={item}
                addQuantity={addQuantity}
                removeOneItem={removeOneItem}
                key={item.id} 
                />
              )
            })
          }
          </ul>
        </div>
        <div className="total-section">
          <div>
            <h3>Total</h3>
          </div>
          <div>
            <span className="total-number">{`£${price.toFixed(2)}`}</span>
          </div>
        </div>
      </main>
      <div>
        Icons made by
        <a
          href="https://www.flaticon.com/authors/icongeek26"
          title="Icongeek26"
        >
          Icongeek26
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </>
  )
}
