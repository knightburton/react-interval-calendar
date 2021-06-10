import { createContext } from 'react';
import { ContextType } from '../types';
import DEFAULT_CONTEXT from '../constants/default-context';

const Context = createContext<ContextType>(DEFAULT_CONTEXT);

export default Context;
