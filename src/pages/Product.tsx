import {
  Carousel,
  CarouselItem,
  CarouselPrevious,
  CarouselContent,
  CarouselNext,
} from "@/components/ui/carousel";
import { useGetProductById } from "@/service/product/useProductService";
import { useParams } from "react-router-dom";

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  
  const { data: product, isLoading, isError, error } = useGetProductById({
    id: productId,
  
  });

  
  if (isNaN(productId)) {
    return (
      <p className="text-center mt-10 text-red-500">
        Invalid product ID.
      </p>
    );
  }

  if (isLoading) {
    return <p className="text-center mt-10">Loading product...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load product. {error?.message || ""}
      </p>
    );
  }

  if (!product) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Product not found.
      </p>
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          {product.images?.length > 0 ? (
            <Carousel className="w-full max-w-md mx-auto">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={image}
                      alt={`${product.title}-${index}`}
                      className="w-full h-80 object-cover rounded-lg"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        e.currentTarget.src = "/images/placeholder.png";
                      }}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {product.images.length > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          ) : (
            <img
              src="/images/placeholder.png"
              alt="No product images"
              className="w-full h-80 object-cover rounded-lg"
            />
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>

          <p className="mt-4 text-gray-600 line-clamp-5">
            {product.description}
          </p>

          <p className="mt-6 text-2xl font-semibold text-primary">
            ${product.price.toFixed(2)}
          </p>

          <div className="mt-6 flex gap-4">
            <button className="px-6 py-2 bg-primary text-white rounded-md hover:opacity-90">
              Buy Now
            </button>
            <button className="px-6 py-2 border border-primary text-primary rounded-md hover:bg-primary/10">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
