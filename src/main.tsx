import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WebApp from "@twa-dev/sdk";

import { Counter } from "@/2entities/counter";

import { App } from "./App.tsx";
import { StoreProvider, type Store } from "./app/store/index.ts";

import "./index.css";

WebApp.ready();

const stores: Store = {
  counter: new Counter(),
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider stores={stores}>
      <App />
    </StoreProvider>
  </StrictMode>
);
