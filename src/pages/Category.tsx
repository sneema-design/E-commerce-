import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Category } from "@/types/category";
import CreateCategoryDialog from "@/components/CreateCategoryDialog";
import CategoryTable from "@/components/CategoryTable";

export default function Category() {
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

  return (
    <>
      {/* HEADER */}
      <div className="p-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Category</h1>
        <Button onClick={handleCreate}>Create Category</Button>
      </div>

      {/* TABLE */}
      <CategoryTable onUpdate={handleUpdate} />

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
