import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationItems,
  PaginationNext,
  PaginationPrevious,
} from "@/components";
import classNames from "classnames";
interface IChildrenPaginatorProps {
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
}

export function ChildrenPaginator({
  totalPages,
  page,
  setPage,
}: IChildrenPaginatorProps) {
  const classes = {
    previous: classNames({
      "pointer-events-none opacity-50": page === 1,
    }),
    next: classNames({
      "pointer-events-none opacity-50": page === totalPages,
    }),
  };

  const handlePrevious = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (page > 1) setPage(page - 1);
  };

  const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => handlePrevious(e)}
            className={classes.previous}
          />
        </PaginationItem>
        <PaginationItems
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => handleNext(e)}
            className={classes.next}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
