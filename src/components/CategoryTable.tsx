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
import { SplinePointer } from "lucide-react";
import { Spinner } from "./ui/spinner";

type Props = {
  onUpdate: (category: Category) => void;
};

export default function CategoryTable({ onUpdate }: Props) {
  const { data: categories = [], isPending, isError } = UseGetAllCategories();

  const { mutateAsync: deleteCategory } = UseDeleteCategory();

  const handleDelete = async (id: number) => {
    await deleteCategory({ id });
  };

 if (isPending)
  return (
    <p className="flex items-center justify-center">
      <Spinner/>
    </p>
  );

if (isError)
  return (
    <p className="text-center text-red-500">
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
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdate(cat)}
                  className="border-blue-500 bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                >
                  Update
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(cat.id)}
                  className="border-red-500 bg-red-500 text-white hover:bg-red-600 hover:text-white"
                >
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
