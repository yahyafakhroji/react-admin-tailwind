import React, { createContext } from 'react';

// Menu Item

const MenuContext = React.createContext<any>(null);

export const MenuContextProvider = MenuContext.Provider;

// Collapse

const CollapseContext = createContext(false);

export const CollapseContextProvider = CollapseContext.Provider;

export const CollapseContextConsumer = CollapseContext.Consumer;

// Group
const GroupContext = createContext({});

export const GroupContextProvider = GroupContext.Provider;

export const GroupContextConsumer = GroupContext.Consumer;

export { MenuContext, CollapseContext, GroupContext };
