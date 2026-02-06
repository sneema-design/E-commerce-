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
import { UseDeleteCategory, UseGetAllCategories } from "@/service/category/useCategoryService";
import { useState } from "react";
import type { Category } from "@/types/product";
import CreateCategoryDialog from "@/components/CreateCategoryDialog";

export default function Category() {
  const { data: categories = [], isPending, isError } =
    UseGetAllCategories();

  const { mutateAsync: deleteCategory } = UseDeleteCategory();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "update">("create");
  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

  const handleCreate = () => {
    setMode("create");
    setSelectedCategory(null);
    setOpen(true);
  };

  const handleUpdate = (category: Category) => {
    setMode("update");
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteCategory({ id });
  };

  if (isPending) return <p>Loading categories...</p>;
  if (isError) return <p>Failed to load categories</p>;

  return (
    <>
      {/* HEADER */}
      <div className="p-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Category</h1>
        <Button onClick={handleCreate}>Create Category</Button>
      </div>

      {/* TABLE */}
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
                    onClick={() => handleUpdate(cat)}
                  >
                    Update
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(cat.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* DIALOG */}
      <CreateCategoryDialog
    
        open={open}
        onOpenChange={setOpen}
        mode={mode}
        defaultValues={selectedCategory}
      />
    </>
  );
}
