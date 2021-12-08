import React, { createContext, useContext, useReducer } from "react";

// To create Data Layer
export const StateContext = createContext();

// StateProvider enables our App to excess data from data layer by wrapping it
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Pull information from data layer
export const useStateValue = () => useContext(StateContext);
