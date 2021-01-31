import Button from '@material-ui/core/Button'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

// Types
import {CartItemType} from '../App'

// Styles
import {Wrapper} from './CartItem.styles'

type Props = {
  item: CartItemType,
  addToCart: (product: CartItemType) => void,
  removeFromCart: (id: number) => void,
  deleteItem: (id: number) => void
}

const CartItem: React.FC<Props> = ({item, addToCart, removeFromCart, deleteItem}) => {
  return(
    <Wrapper>
      <div>
        <h3>{item.title} </h3>
        <div className="information">
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>

        <div className="buttons">
          <Button
            size='small'
            disableElevation
            variant='contained'
            onClick={() => removeFromCart(item.id)}
          >-</Button>
          <p>{item.amount}</p>
          <Button
            size='small'
            disableElevation
            variant='contained'
            onClick={() => addToCart(item)}
          >+</Button>
        </div>
        <div className="delete">
          <DeleteForeverIcon style={{fontSize: 50}} onClick={() => deleteItem(item.id)} />
        </div>
      </div>
      <img src={item.image} alt={item.title} width="300" height="300" />
    </Wrapper>
  )
}

export default CartItem

