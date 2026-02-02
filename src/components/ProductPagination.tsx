import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "./ui/pagination";

interface Props {
  page: number;
  onPagechange: (page: number) => void;
  hasNextPage: boolean;
}

export default function ProductPagination({
  page,
  onPagechange,
  hasNextPage,
}: Props) {
  // Show a window of 5 pages around the current page
  const startPage = Math.max(page - 2, 1);
  const pages = Array.from({ length: 5 }, (_, i) => startPage + i);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => page > 1 && onPagechange(page - 1)}
            aria-disabled={page === 1}
          />
        </PaginationItem>

        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              isActive={p === page}
              onClick={() => p !== page && onPagechange(p)}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => hasNextPage && onPagechange(page + 1)}
            aria-disabled={!hasNextPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
