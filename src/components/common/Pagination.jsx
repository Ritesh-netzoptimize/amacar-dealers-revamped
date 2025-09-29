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
      <PaginationContent className="flex items-center justify-center gap-1">
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevious}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:scale-105",
              currentPage === 1 && "pointer-events-none opacity-50"
            )}
            style={{ pointerEvents: currentPage === 1 ? 'none' : 'auto' }}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          <PaginationItem key={index}>
            {page === 'ellipsis' ? (
              <PaginationEllipsis className="text-neutral-400" />
            ) : (
              <PaginationLink
                onClick={() => handlePageClick(page)}
                isActive={page === currentPage}
                className={cn(
                  "cursor-pointer transition-all duration-200 hover:scale-105 min-w-[40px] h-10 flex items-center justify-center",
                  page === currentPage
                    ? "bg-[var(--brand-orange)] text-white border-[var(--brand-orange)] hover:bg-[var(--color-primary-600)] hover:border-[var(--color-primary-600)]"
                    : "hover:bg-neutral-100 hover:text-neutral-900"
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
              "cursor-pointer transition-all duration-200 hover:scale-105",
              currentPage === totalPages && "pointer-events-none opacity-50"
            )}
            style={{ pointerEvents: currentPage === totalPages ? 'none' : 'auto' }}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
};

export default Pagination;
