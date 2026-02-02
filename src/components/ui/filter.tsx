import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProductFilter } from "@/types/product";

interface Props {
  onChange: (filters: Partial<ProductFilter>) => void;
}

export function ProductsFilter({ onChange }: Props) {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  // 🔑 helper to emit filters safely
  const emitChange = (next: Partial<ProductFilter>) => {
    onChange({
      title: title || undefined,
      categoryId: categoryId ? Number(categoryId) : undefined,
      priceMin: priceMin ? Number(priceMin) : undefined,
      priceMax: priceMax ? Number(priceMax) : undefined,
      ...next,
    });
  };

  return (
    <div className="flex flex-wrap gap-3 rounded-lg border bg-background p-4 justify-center">
      {/* CATEGORY */}
      <Select
        value={categoryId}
        onValueChange={(value) => {
          setCategoryId(value);
          emitChange({ categoryId: value ? Number(value) : undefined });
        }}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Clothes</SelectItem>
          <SelectItem value="2">Electronics</SelectItem>
          <SelectItem value="3">Furniture</SelectItem>
          <SelectItem value="4">Shoes</SelectItem>
        </SelectContent>
      </Select>

      {/* MIN PRICE */}
      <Input
        type="number"
        placeholder="Min price"
        className="w-[120px]"
        value={priceMin}
        onChange={(e) => {
          setPriceMin(e.target.value);
          emitChange({
            priceMin: e.target.value ? Number(e.target.value) : undefined,
          });
        }}
      />

      {/* MAX PRICE */}
      <Input
        type="number"
        placeholder="Max price"
        className="w-[120px]"
        value={priceMax}
        onChange={(e) => {
          setPriceMax(e.target.value);
          emitChange({
            priceMax: e.target.value ? Number(e.target.value) : undefined,
          });
        }}
      />

      {/* SEARCH */}
      <Input
        placeholder="Search"
        className="w-[200px]"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          emitChange({ title: e.target.value || undefined });
        }}
      />

      {/* CLEAR */}
      <Button
        variant="ghost"
        onClick={() => {
          setTitle("");
          setCategoryId("");
          setPriceMin("");
          setPriceMax("");

          onChange({
            title: undefined,
            categoryId: undefined,
            priceMin: undefined,
            priceMax: undefined,
          });
        }}
      >
        Clear
      </Button>
    </div>
  );
}
