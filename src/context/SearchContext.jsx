import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useLocation } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const location = useLocation();

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search query
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Update isSearching state based on debounced query
  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      setIsSearching(true);
      // Set a short delay to show loading state
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [debouncedSearchQuery]);

  // Clear search when navigating between dashboard pages
  useEffect(() => {
    // List of dashboard pages where search should be cleared
    const dashboardPages = [
      "/dashboard",
      "/live-auctions",
      "/won-auctions",
      "/new-customers",
      "/appointments",
      "/my-bids",
      "/highest-bids",
      "/active-customers",
      "/dealerships",
      "/reports",
      "/profile",
    ];

    // Check if current path is a dashboard page
    const isDashboardPage = dashboardPages.some((page) =>
      location.pathname.startsWith(page)
    );

    if (isDashboardPage) {
      // Clear search when navigating to any dashboard page
      setSearchQuery("");
      setIsSearching(false);
    }
  }, [location.pathname]);

  // Clear search function
  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setIsSearching(false);
  }, []);

  const value = {
    // Search state
    searchQuery,
    setSearchQuery,
    isSearching,
    debouncedSearchQuery,
    clearSearch,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchContext;
