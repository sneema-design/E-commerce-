import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type CartItem = {
  productId: number;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  totalItems: number;
};

const CartContext = createContext<CartContextType | null>(null);

const CART_STORAGE_KEY = "cart_items";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (productId: number) => {
    let wasExisting = false;

    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      wasExisting = !!existing;

      if (existing) {
        return prev.map((i) =>
          i.productId === productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { productId, quantity: 1 }];
    });

    toast.success(
      wasExisting ? "Item quantity updated in cart" : "Item added to cart"
    );
  };

  const removeFromCart = (productId: number) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
    toast.info("Item removed from cart");
  };

  const decreaseQuantity = (productId: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.productId === productId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
};
