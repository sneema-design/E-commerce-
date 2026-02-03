import CartItem from "@/components/CartItem";
import { useCart } from "@/components/CartContext";

export default function Cart() {
  const { items } = useCart();
  const {totalItems}=useCart()
  if (items.length === 0) {
    return (
      <p className="mt-16 text-center text-muted-foreground">
        Your cart is empty 🛒
      </p>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-3xl space-y-4 px-4">
      <h1 className="text-2xl font-semibold">Your Cart</h1>

      {items.map((item) => (
        <CartItem
          key={item.productId}
          productId={item.productId}
          quantity={item.quantity}
        />
      ))}
     <h1>Total Items in the cart {totalItems}</h1>
    </div>
  );
}
