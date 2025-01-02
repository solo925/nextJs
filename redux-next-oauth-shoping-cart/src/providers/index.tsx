'use client';

import Header from "@/components/header";
import store from "@/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";


interface ReduxProviderProps {
  children: ReactNode;
  getSession: any; 
}

export default function ReduxProvider({ children, getSession }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <Header getSession={getSession} />
      {children}
    </Provider>
  );
}
