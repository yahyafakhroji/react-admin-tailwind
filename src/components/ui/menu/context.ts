import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MenuContext = React.createContext({ activeKey: '', onSelect: (values?: any, event?: any) => {} });

export const MenuContextProvider = MenuContext.Provider;

export default MenuContext;
