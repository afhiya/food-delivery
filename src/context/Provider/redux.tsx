"use client"

import { Provider } from "react-redux";
import { store } from "@/hooks/redux/store";

const ProviderRedux = ({ children }: {
  children : React.ReactNode; 
}) => {
  return <Provider store={store}>{children}</Provider>;
};
export default ProviderRedux;
