import React from 'react';

const ContextoToken = React.createContext();

export const ProviderToken = ContextoToken.Provider;
export const ConsumerToken = ContextoToken.Consumer;

export default ContextoToken;