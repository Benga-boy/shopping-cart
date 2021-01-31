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
import {Wrapper} from './App.styles'
import Item from "./Item/Item"

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

  const {data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts)
  
  console.log(data)

  // ! Function to get total number of items added to cart
  const getTotalItems = () => null

  // ! Function to add Item to cart
  const handleAddToCart = (product: CartItemType) => null

  const handleDeleteFromCart = () => null

  // ! Return loading bar whilst fetching data
  if (isLoading) return <LinearProgress />
  if (error) return <div>Something Went wrong</div>


  return (
    <Wrapper>
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

