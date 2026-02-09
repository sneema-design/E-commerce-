import CartItem from "@/components/CartItem";
import { useCart } from "@/components/CartContext";
import PaymentComponent from "@/components/RazorPay";
import { ShoppingCart } from "lucide-react";

export default function Cart() {
  const { items, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <ShoppingCart className="mb-4 h-12 w-12 text-muted-foreground" />
        <p className="text-lg text-muted-foreground">
          Your cart is empty
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Looks like you haven’t added anything yet 🛒
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-4xl px-4">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Your Cart
        </h1>
        <span className="text-sm text-muted-foreground">
          {totalItems} item{totalItems > 1 ? "s" : ""}
        </span>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 rounded-lg border bg-background p-4 shadow-sm">
        {items.map((item) => (
          <CartItem
            key={item.productId}
            productId={item.productId}
            quantity={item.quantity}
          />
        ))}
      </div>

      {/* Summary / Checkout */}
      <div className="mt-6 flex flex-col items-end gap-4 rounded-lg border bg-muted/30 p-4">
        <div className="flex w-full items-center justify-between text-sm">
          <span className="text-muted-foreground">Total items</span>
          <span className="font-medium">{totalItems}</span>
        </div>

      </div>
    </div>
  );
}
