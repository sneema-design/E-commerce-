import { useGetProductById } from "@/service/product/useProductService";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "./CartContext";
import { Spinner } from "./ui/spinner";
export default function CartItem({
  productId,
  quantity,
}: {
  productId: number;
  quantity: number;
}) {
  const {
    data: product,
    isPending,
    isError,
  } = useGetProductById({
    id: productId,
  });

  const { addToCart, decreaseQuantity, removeFromCart } = useCart();

  if (isPending)
    return (
      <p className="flex items-center justify-center">
        <Spinner />
      </p>
    );

  if (isError) {
    return <p className="text-red-500">Error while fetching product</p>;
  }

  if (!product) return null;

  return (
    <Card>
      <CardContent className="flex gap-4 p-4 items-center">
        {/* Image */}
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="h-20 w-20 rounded object-cover border"
        />

        {/* Info */}
        <div className="flex-1 space-y-1">
          <h3 className="font-medium">{product.title}</h3>

          <p className="text-sm text-muted-foreground">
            ${product.price.toLocaleString()} × {quantity}
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2 mt-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => decreaseQuantity(productId)}
            >
              −
            </Button>

            <span className="w-6 text-center">{quantity}</span>

            <Button
              size="icon"
              variant="outline"
              onClick={() => addToCart(productId)}
            >
              +
            </Button>
          </div>
        </div>

        {/* Price + Remove */}
        <div className="flex flex-col items-end gap-2">
          <p className="font-semibold">
            ${(product.price * quantity).toLocaleString()}
          </p>

          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-600"
            onClick={() => removeFromCart(productId)}
          >
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
