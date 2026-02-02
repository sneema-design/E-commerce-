import CarouselPart from "@/components/Carousel-part";
import ProductPannel from "@/components/ProductPannel";
import { ProductsFilter } from "@/components/ui/filter";
import type { ProductFilter } from "@/types/product";
import { useState, useMemo } from "react";

const PAGE_SIZE = 9;

interface PageData extends ProductFilter {
  page: number;
  limit: number;
}

export default function Home() {
  // Single state combining filters + page
  const [pageData, setPageData] = useState<PageData>({
    page: 1,
    limit: PAGE_SIZE,
    title: "",
    categoryId: undefined,
    priceMin: undefined,
    priceMax: undefined,
  });

  // Compute final filter for API call
  const finalFilter: ProductFilter = useMemo(() => {
    const { page, limit, ...filters } = pageData;
    return {
      ...filters,
      limit,
      offset: (page - 1) * limit,
    };
  }, [pageData]);

  return (
    <>
      <CarouselPart />

      <ProductsFilter
        onChange={(filters) =>
          setPageData((prev) => ({
            ...prev,
            ...filters,
            page: 1, // reset to first page on filter change
          }))
        }
      />

      <ProductPannel
        filters={finalFilter}
        page={pageData.page}
        onPageChange={(page) =>
          setPageData((prev) => ({
            ...prev,
            page, // only update page
          }))
        }
        pageSize={PAGE_SIZE}
      />
    </>
  );
}
