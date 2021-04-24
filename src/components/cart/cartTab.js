import {memo} from 'react';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { GlobalState } from '../../context/globalState';



const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 0,
    // border: '2px solid grey',
    padding: '0 2px',
  },
}))(Badge);

const Cart = memo(() => {

    const { UI, cart} = GlobalState()
    
  return (
      <div >
        <IconButton aria-label="cart">
        <StyledBadge badgeContent={cart && cart.length > 0 ? cart.length : '0'} style= {{ color: UI.color }}>
            <ShoppingCartIcon style= {{ color: 'teal' }}/>
        </StyledBadge>
        </IconButton>
    </div>
  )
})

export default Cart
