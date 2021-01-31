import { useState } from "react"
import {useQuery} from 'react-query'
// import axios from 'axios'

// Components
import Drawer from '@material-ui/core/Drawer'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'

// Styles
import {Wrapper, StyledButton} from './App.styles'
import Item from "./Item/Item"
import Cart from "./Cart/Cart"

// Types
export type CartItemType = {
  id: number,
  category: string,
  description: string,
  image: string,
  price: number,
  title: string,
  amount: number
}

// ! Function to fetch my data from Fakestore API
const getProducts = async (): Promise<CartItemType[]> => await (await (await fetch('https://fakestoreapi.com/products')).json())


const App = () => {

  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])

  // Fetch the data
  const {data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts)

  // ! Function to get total number of items added to cart
  const getTotalItems = (items: CartItemType[]) => items.reduce((acc: number, item) => acc + item.amount, 0)

  // ! Function to add Item to cart
  const handleAddToCart = (product: CartItemType) => {

    setCartItems(prev => {
    // Check if item is already in the cart
    const itemExists = prev.find(item => item.id === product.id)
    if (itemExists) {
      return prev.map(item => item.id === product.id ? {...item, amount: item.amount + 1} : item)
    }

    // If first time item is being added to the cart
    return [...prev, {...product, amount: 1}]
  })
  }

  const handleDeleteFromCart = (id: number) => {
    setCartItems(prev => 
      prev.reduce((acc, item) => {
        // Check if item is in the cartItems array
        if (item.id === id) {
          // if item is found and the value of amount is 1, return acc, deleting the item!
          if (item.amount === 1) return acc
          // otherwise, decrement the item by 1
          return [...acc, {...item, amount: item.amount - 1}]
        } else {
          // if not item, then return the item as it is
          return [...acc, item]
        }
      }, [] as CartItemType[])
    )
  }

  // ! Function to delete item from cart entirely
  const handleDeleteItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  // ! Return loading bar whilst fetching data
  if (isLoading) return <LinearProgress />
  if (error) return <div>Something Went wrong</div>


  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(!cartOpen)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleDeleteFromCart} deleteItem={handleDeleteItem} />
      </Drawer>
      
      <StyledButton onClick={() => setCartOpen(!cartOpen)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>


      <Grid container spacing={3}>
        {data?.map(item => <Grid item key={item.id} xs={12} sm={4}>
          <Item item={item} handleAddToCart={handleAddToCart} />
        </Grid>
          
          )}
      </Grid>
    </Wrapper>
  )
}

export default App

