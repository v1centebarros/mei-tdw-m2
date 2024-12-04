"use client";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { autoCompleteOptions } from "@/hooks/useCards";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLUListElement>(null);
  const router = useRouter();
  const {
    data: results = [],
    error,
    isLoading,
    isError,
  } = useQuery(autoCompleteOptions(query));

  useEffect(() => {
    if (query.length > 0) {
      setShowResults(true);
      setSelectedIndex(-1);
    } else {
      setShowResults(false);
    }
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      setQuery(results[selectedIndex]);
      setShowResults(false);
      router.push(`/cards?name=${results[selectedIndex]}`);
    }
  };

  const handleResultClick = (result: string) => {
    setQuery("");
    setShowResults(false);
    inputRef.current?.focus();
    router.push(`/cards?name=${result}`);
  };

  useEffect(() => {
    if (resultsRef.current && selectedIndex > -1) {
      const selectedElement = resultsRef.current.children[
        selectedIndex
      ] as HTMLElement;
      selectedElement.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="w-full rounded-md border px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-activedescendant={
            selectedIndex > -1 ? `result-${selectedIndex}` : undefined
          }
        />
        <Search
          className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"
          size={20}
        />
      </div>
      {showResults && (
        <ul
          ref={resultsRef}
          id="search-results"
          className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-white shadow-lg"
        >
          {isLoading && <Spinner />}
          {isError && (
            <li className="px-4 py-2 text-red-500">
              Error:{" "}
              {error instanceof Error ? error.message : "An error occurred"}
            </li>
          )}
          {!isLoading && !isError && results.length === 0 && (
            <li className="px-4 py-2 text-gray-500">No results found</li>
          )}
          {!isLoading &&
            !isError &&
            results.map((result, index) => (
              <li
                key={result}
                id={`result-${index}`}
                onClick={() => handleResultClick(result)}
                className={`cursor-pointer px-4 py-2 ${
                  index === selectedIndex ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
                role="option"
                aria-selected={index === selectedIndex}
              >
                {result}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
