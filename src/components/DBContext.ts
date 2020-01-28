import { createContext } from 'react';

const DBContext = createContext({});

export const DBProvider = DBContext.Provider;

export default DBContext;
