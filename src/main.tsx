import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import AppLayout from "./layout/AppLayout";
const queryClient = new QueryClient();


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <CartProvider>
      <AppLayout>
                     <App />

      </AppLayout>

      </CartProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
