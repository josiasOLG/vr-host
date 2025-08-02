declare module "header/App" {
  const App: React.ComponentType;
  export default App;
}

declare module "card/App" {
  const App: React.ComponentType;
  export default App;
}

declare module "footer/App" {
  const App: React.ComponentType;
  export default App;
}

declare module "host/useCart" {
  export const useCart: () => {
    items: any[];
    isOpen: boolean;
    total: number;
    itemCount: number;
    addToCart: (product: any) => void;
    removeItem: (id: number) => void;
    updateItemQuantity: (id: number, quantity: number) => void;
    clearAllItems: () => void;
    toggleCartModal: () => void;
    openCartModal: () => void;
    closeCartModal: () => void;
  };
  export default useCart;
}

declare module "host/store" {
  export const store: any;
  export const useAppDispatch: () => any;
  export const useAppSelector: any;
  export type RootState = any;
  export type AppDispatch = any;
}
