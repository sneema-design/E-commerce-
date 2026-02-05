import { useGetAllProduct } from "@/service/product/useProductService";

export default function Products() {
  const { data: products=[], isPending, isError } = useGetAllProduct();

  if (isPending) return <p className="p-4">Loading products...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load products</p>;

  const handleUpdate = (product) => {
    console.log("Update:", product);
    // navigate or open modal
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      console.log("Delete ID:", id);
      // call delete API
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>

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
            {products?.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>

                <td className="px-6 py-4 font-medium text-gray-800">
                  {product.title}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {product.category.name}
                </td>

                <td className="px-6 py-4 font-semibold">
                  ${product.price}
                </td>

                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    onClick={() => handleUpdate(product)}
                    className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
