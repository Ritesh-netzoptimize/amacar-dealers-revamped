import React from 'react';
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  siblingCount = 1,
}) => {
  // Don't render if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  // Calculate the range of pages to show
  const getPageNumbers = () => {
    const pages = [];
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    const shouldShowLeftEllipsis = leftSiblingIndex > 2;
    const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 2;

    // Always show first page
    pages.push(1);

    // Add left ellipsis if needed
    if (shouldShowLeftEllipsis) {
      pages.push('ellipsis');
    }

    // Add pages around current page
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    // Add right ellipsis if needed
    if (shouldShowRightEllipsis) {
      pages.push('ellipsis');
    }

    // Always show last page (if more than 1 page)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePageClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <PaginationRoot className={cn("w-full", className)}>
      <PaginationContent className="flex items-center justify-center gap-2">
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevious}
            className={cn(
              "h-10 px-4 rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 hover:border-neutral-300 transition-all duration-200 font-medium text-sm",
              currentPage === 1 && "pointer-events-none opacity-40 cursor-not-allowed"
            )}
            style={{ pointerEvents: currentPage === 1 ? 'none' : 'auto' }}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          <PaginationItem key={index}>
            {page === 'ellipsis' ? (
              <div className="h-10 w-10 flex items-center justify-center text-neutral-400 text-sm">
                ...
              </div>
            ) : (
              <PaginationLink
                onClick={() => handlePageClick(page)}
                isActive={page === currentPage}
                className={cn(
                  "h-10 w-10 rounded-lg border transition-all duration-200 font-medium text-sm flex items-center justify-center cursor-pointer",
                  page === currentPage
                    ? "bg-[var(--brand-orange)] text-white border-[var(--brand-orange)] shadow-sm"
                    : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900 hover:border-neutral-300"
                )}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            onClick={handleNext}
            className={cn(
              "h-10 px-4 rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 hover:border-neutral-300 transition-all duration-200 font-medium text-sm",
              currentPage === totalPages && "pointer-events-none opacity-40 cursor-not-allowed"
            )}
            style={{ pointerEvents: currentPage === totalPages ? 'none' : 'auto' }}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
};

export default Pagination;
