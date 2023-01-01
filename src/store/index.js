import { createContext, useContext } from 'react'
import CartStore from './cartStore';

export default class RootStore {
  constructor () {
    this.cartStore = new CartStore();
  }
}

const rootStoreContext = createContext();

export const RootStoreProvider = ({ store, children }) => {
  return (
    <rootStoreContext.Provider value={store}>
      {children}
    </rootStoreContext.Provider>
  )
}

export const useRootStore = () => useContext(rootStoreContext)