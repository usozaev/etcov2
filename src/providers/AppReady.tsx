import { createContext, useContext } from 'react';

/** true, когда прелоадер ушёл и можно запускать вступительные анимации */
export const AppReadyContext = createContext(false);
export const useAppReady = () => useContext(AppReadyContext);
