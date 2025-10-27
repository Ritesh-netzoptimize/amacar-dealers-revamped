if (import.meta.env.VITE_ENV === "production") {
  console.log = () => { };
  console.error = () => { };
  console.debug = () => { };
  console.warn = () => { };
}

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { TooltipProvider } from "@/components/ui/tooltip";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
      <BrowserRouter>
        <TooltipProvider>
          <App />
        </TooltipProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
