import CartItem from '../CartItem/CartItem'

// Styles 
import {Wrapper} from './Cart.styles'

// Types
import {CartItemType} from '../App'

type Props = {
  cartItems: CartItemType[],
  addToCart: (product: CartItemType) => void,
  removeFromCart: (id: number) => void,
  deleteItem: (id: number) => void
}

const Cart: React.FC<Props> = ({cartItems, addToCart, removeFromCart, deleteItem}) => {


  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in your cart.</p>: null }

      {cartItems.map(item => (
        <CartItem 
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          deleteItem={deleteItem}
        />
      ))}

      <h2>Total: ${cartItems.reduce((acc: number, item) => acc + (item.amount * item.price), 0).toFixed(2)}</h2>
    </Wrapper>
  )
}

export default Cart