import { createContext, useContext } from "react";

import { type Store } from "../model/store.type";

const StoresContext = createContext<Store>({} as Store);

export const useStore = () => useContext(StoresContext);

export const StoreProvider: React.FC<React.PropsWithChildren<{ stores: Store }>> = ({ stores, children }) => {
  return <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>;
};
