import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/types/product";
import { Button } from "./ui/button";
import { useCart } from "./CartContext";
type props = {
  product: Product;
  onClick: () => void;
};
export const ImageCard = ({ product, onClick }: props) => {
  const { addToCart } = useCart();

  return (
    <Card className="w-full max-w-md overflow-hidden" onClick={onClick}>
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
        <CardDescription className="line-clamp-1">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <img
          alt={product.title}
          src={product.images?.[0]}
          className="h-56 w-full object-cover"
        />
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <p className="font-bold text-2xl">
          ${product.price.toLocaleString()}
        </p>

        <div className="flex gap-4">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product.id);
            }}
          >
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};