import { createContext } from 'react';

import DEFAULT_CONTEXT from '../constants/default-context';

const Context = createContext<ContextType>(DEFAULT_CONTEXT);

export default Context;
