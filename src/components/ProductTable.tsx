import {
  useDeleteProduct,
  useGetAllProduct,
} from "@/service/product/useProductService";
import type { Product } from "@/types/product";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

type Props = {
  onUpdate: (product: Product) => void;
};

export default function ProductTable({ onUpdate }: Props) {
  const { data: products = [], isPending, isError } = useGetAllProduct();
  const { mutateAsync: deleteProduct, isPending: deletePending } =
    useDeleteProduct();

  const handleDelete = async (id: number) => {
    await deleteProduct({ id });
  };

  if (isPending)
    return (
      <p className="flex items-center justify-center">
        <Spinner />
      </p>
    );

  if (isError)
    return <p className="p-4 text-red-500">Failed to load products</p>;

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="px-6 py-3 text-left">Image</th>
            <th className="px-6 py-3 text-left">Title</th>
            <th className="px-6 py-3 text-left">Category</th>
            <th className="px-6 py-3 text-left">Price</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  className="h-12 w-12 rounded object-cover"
                />
              </td>

              <td className="px-6 py-4 font-medium">
                {product.title}
              </td>

              <td className="px-6 py-4 text-gray-600">
                {product.category.name}
              </td>

              <td className="px-6 py-4 font-semibold">
                ${product.price}
              </td>

              <td className="px-6 py-4 text-center space-x-2">
                <Button
                  onClick={() => onUpdate(product)}
                  className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Update
                </Button>

                <DeleteConfirmDialog
                  title="Delete product?"
                  itemName={product.title}
                  onConfirm={() => handleDelete(product.id)}
                  isLoading={deletePending}
                  triggerClassName="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
