import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  UseDeleteCategory,
  UseGetAllCategories,
} from "@/service/category/useCategoryService";
import type { Category } from "@/types/category";
import { Spinner } from "./ui/spinner";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

type Props = {
  onUpdate: (category: Category) => void;
};

export default function CategoryTable({ onUpdate }: Props) {
  const { data: categories = [], isPending, isError } = UseGetAllCategories();
  const { mutateAsync: deleteCategory, isPending: isDeleting } = UseDeleteCategory();

  const handleDelete = async (id: number) => {
    await deleteCategory({ id });
  };

  if (isPending)
    return (
      <p className="flex items-center justify-center mt-16">
        <Spinner />
      </p>
    );

  if (isError)
    return (
      <p className="text-center text-red-500 mt-16">
        Failed to load categories
      </p>
    );

  return (
    <Table>
      <TableCaption>List of all categories</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Image</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {categories.map((cat) => (
          <TableRow key={cat.id}>
            <TableCell>{cat.id}</TableCell>
            <TableCell>{cat.name}</TableCell>
            <TableCell>{cat.slug}</TableCell>
            <TableCell>
              <img
                src={cat.image}
                alt={cat.name}
                className="h-12 w-20 rounded object-cover"
              />
            </TableCell>

            <TableCell className="text-center">
  <div className="flex justify-center gap-2">
    {/* Update Button */}
    <Button
      
      variant="outline"
      onClick={() => onUpdate(cat)}
      className="bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:text-white"
    >
      Update
    </Button>

    {/* Delete Button */}
    <DeleteConfirmDialog
      title="Delete category?"
      itemName={cat.name}
      onConfirm={() => handleDelete(cat.id)}
      isLoading={isDeleting}
      triggerLabel="Delete"
      triggerClassName="bg-red-500 border-red-500 text-white hover:bg-red-600 disabled:opacity-50"
    />
  </div>
</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
