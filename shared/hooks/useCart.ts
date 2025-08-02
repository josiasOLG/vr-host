import { useAppDispatch, useAppSelector } from '../store'
import { 
  addToCart as addToCartAction, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  toggleCart, 
  openCart, 
  closeCart,
  CartItem 
} from '../store/slices/cartSlice'
import { Product } from '../../../vr-card/core/interfaces'

export const useCart = () => {
  const dispatch = useAppDispatch()
  const cart = useAppSelector(state => state.cart)

  const addToCart = (product: Product) => {
    const cartItem: Omit<CartItem, 'quantity'> = {
      id: product.id,
      title: product.title,
      price: product.price,
      discountPercentage: product.discountPercentage,
      thumbnail: product.thumbnail,
      category: product.category,
      rating: product.rating,
    }
    dispatch(addToCartAction(cartItem))
  }

  const removeItem = (id: number) => {
    dispatch(removeFromCart(id))
  }

  const updateItemQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }))
  }

  const clearAllItems = () => {
    dispatch(clearCart())
  }

  const toggleCartModal = () => {
    dispatch(toggleCart())
  }

  const openCartModal = () => {
    dispatch(openCart())
  }

  const closeCartModal = () => {
    dispatch(closeCart())
  }

  return {
    items: cart.items,
    isOpen: cart.isOpen,
    total: cart.total,
    itemCount: cart.itemCount,
    addToCart,
    removeItem,
    updateItemQuantity,
    clearAllItems,
    toggleCartModal,
    openCartModal,
    closeCartModal,
  }
}

export default useCart
