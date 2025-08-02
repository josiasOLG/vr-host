import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  id: number
  title: string
  price: number
  discountPercentage?: number
  thumbnail: string
  category: string
  quantity: number
  rating: number
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
  total: number
  itemCount: number
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  total: 0,
  itemCount: 0,
}

const calculateTotals = (items: CartItem[]) => {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const total = items.reduce((sum, item) => {
    const price = item.discountPercentage 
      ? item.price * (1 - item.discountPercentage / 100)
      : item.price
    return sum + (price * item.quantity)
  }, 0)
  
  return { itemCount, total: Number(total.toFixed(2)) }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      
      const totals = calculateTotals(state.items)
      state.total = totals.total
      state.itemCount = totals.itemCount
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      
      const totals = calculateTotals(state.items)
      state.total = totals.total
      state.itemCount = totals.itemCount
    },

    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== action.payload.id)
        } else {
          item.quantity = action.payload.quantity
        }
      }
      
      const totals = calculateTotals(state.items)
      state.total = totals.total
      state.itemCount = totals.itemCount
    },

    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.itemCount = 0
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },

    openCart: (state) => {
      state.isOpen = true
    },

    closeCart: (state) => {
      state.isOpen = false
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
} = cartSlice.actions

export default cartSlice.reducer
