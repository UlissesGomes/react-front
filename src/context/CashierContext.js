import React from "react";

const CashierContext = React.createContext({});

export const CashierProvider = CashierContext.Provider;
export const CashierConsumer = CashierContext.Consumer;
