import React from 'react'

const CartContext = React.createContext({
  username: '',
  password: '',
  closeNavBar: false,
  triggerCloseNavBar: () => {},
  triggerChangeUsername: () => {},
  triggerChangePassword: () => {},
  triggerLogout: () => {},
  searchInput: '',
  triggerSearchChange: () => {},
})

export default CartContext
