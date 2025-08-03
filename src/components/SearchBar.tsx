"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, Clock, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

// Mock search results
const mockDocuments = [
  {
    id: "1",
    title: "Hướng dẫn xin giấy phép du học Canada",
    category: "Du học",
    price: 3.99,
    image: "/img/paul-duong-2.jpg"
  },
  {
    id: "2",
    title: "Bí quyết hội nhập thành công vào cuộc sống Canada",
    category: "Văn hóa",
    price: 4.99,
    image: "/img/paul-duong-3.jpg"
  },
  {
    id: "3",
    title: "Bidong, a novel",
    category: "Sách",
    price: 4.99,
    image: "/img/paul-duong-4.jpg"
  },
  {
    id: "4",
    title: "Thành lập và vận hành doanh nghiệp tại Canada",
    category: "Kinh doanh",
    price: 4.99,
    image: "/img/paul-duong-5.jpg"
  },
  {
    id: "5",
    title: "Cẩm nang định cư Canada diện tay nghề dành cho người Việt Nam",
    category: "Định cư",
    price: 4.99,
    image: "/img/paul-duong-6.jpg"
  }
];

interface SearchBarProps {
  placeholder?: string;
  showSuggestions?: boolean;
  onSearch?: (query: string) => void;
}

const popularSearches = [
  "định cư canada",
  "du học canada", 
  "kinh doanh canada",
  "visa canada",
  "bidong novel"
];

export function SearchBar({ placeholder = "Tìm kiếm tài liệu...", showSuggestions = true, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState<typeof mockDocuments>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load search history from localStorage
  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // Save to search history
  const saveToHistory = (searchTerm: string) => {
    if (searchTerm.trim() && !searchHistory.includes(searchTerm)) {
      const newHistory = [searchTerm, ...searchHistory.slice(0, 4)];
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
  };

  useEffect(() => {
    setSelectedIndex(-1);
    
    if (query.trim() === "") {
      setFilteredResults([]);
      setIsLoading(false);
      if (onSearch) {
        onSearch("");
      }
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    const timeoutId = setTimeout(() => {
      const filtered = mockDocuments.filter(doc =>
        doc.title.toLowerCase().includes(query.toLowerCase()) ||
        doc.category.toLowerCase().includes(query.toLowerCase())
      );
      
      setFilteredResults(filtered);
      setIsLoading(false);

      if (onSearch) {
        onSearch(query);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    let searchTerm = query.trim();
    
    // If user has selected an item with arrow keys
    if (selectedIndex >= 0) {
      if (selectedIndex < filteredResults.length) {
        window.location.href = `/documents/${filteredResults[selectedIndex].id}`;
        return;
      } else {
        // Selected from popular searches or history
        const allSuggestions = [...searchHistory, ...popularSearches];
        const suggestionIndex = selectedIndex - filteredResults.length;
        if (suggestionIndex >= 0 && suggestionIndex < allSuggestions.length) {
          searchTerm = allSuggestions[suggestionIndex];
          setQuery(searchTerm);
        }
      }
    }
    
    if (searchTerm) {
      saveToHistory(searchTerm);
      setIsOpen(false);
      window.location.href = `/documents?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    
    const totalItems = filteredResults.length + searchHistory.length + popularSearches.length;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => prev < totalItems - 1 ? prev + 1 : prev);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > -1 ? prev - 1 : prev);
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const clearSearch = () => {
    setQuery("");
    setFilteredResults([]);
    setSelectedIndex(-1);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            className="w-full pl-12 pr-12 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-gray-900/10 focus:border-gray-900 transition-all bg-white shadow-lg text-lg"
            placeholder={placeholder}
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={18} />
            </button>
          )}
          {isLoading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto backdrop-blur-sm">
          {query.trim() === "" ? (
            // Show search history and popular searches when no query
            <div className="p-4">
              {searchHistory.length > 0 && (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-500" />
                      <span className="text-sm font-semibold text-gray-700">Tìm kiếm gần đây</span>
                    </div>
                    <button
                      onClick={clearHistory}
                      className="text-xs text-gray-500 hover:text-gray-700 font-medium"
                    >
                      Xóa
                    </button>
                  </div>
                  {searchHistory.map((term, index) => (
                    <button
                      key={`history-${index}`}
                      onClick={() => {
                        setQuery(term);
                        handleSearch({ preventDefault: () => {} } as React.FormEvent);
                      }}
                      className={`w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                        selectedIndex === filteredResults.length + index ? 'bg-gray-100' : ''
                      }`}
                    >
                      <Clock size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-700">{term}</span>
                    </button>
                  ))}
                  <hr className="my-3 border-gray-200" />
                </>
              )}
              
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={16} className="text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">Tìm kiếm phổ biến</span>
              </div>
              {popularSearches.map((term, index) => (
                <button
                  key={`popular-${index}`}
                  onClick={() => {
                    setQuery(term);
                    handleSearch({ preventDefault: () => {} } as React.FormEvent);
                  }}
                  className={`w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                    selectedIndex === filteredResults.length + searchHistory.length + index ? 'bg-gray-100' : ''
                  }`}
                >
                  <TrendingUp size={14} className="text-orange-500" />
                  <span className="text-sm text-gray-700">{term}</span>
                </button>
              ))}
            </div>
          ) : filteredResults.length > 0 ? (
            <>
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <p className="text-sm font-medium text-gray-700">
                  Tìm thấy {filteredResults.length} kết quả cho "<span className="text-gray-900">{query}</span>"
                </p>
              </div>
              {filteredResults.slice(0, 5).map((doc, index) => (
                <Link
                  key={doc.id}
                  href={`/documents/${doc.id}`}
                  onClick={() => {
                    saveToHistory(query);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                    selectedIndex === index ? 'bg-gray-100' : ''
                  }`}
                >
                  <img
                    src={doc.image}
                    alt={doc.title}
                    className="w-14 h-14 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm line-clamp-1 mb-1">
                      {doc.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                        {doc.category}
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        ${doc.price}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-gray-400" />
                </Link>
              ))}
              {filteredResults.length > 5 && (
                <div className="p-4 bg-gray-50">
                  <Link
                    href={`/documents?search=${encodeURIComponent(query)}`}
                    onClick={() => {
                      saveToHistory(query);
                      setIsOpen(false);
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 w-fit"
                  >
                    Xem tất cả {filteredResults.length} kết quả
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </>
          ) : query.trim() !== "" && !isLoading ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Không tìm thấy kết quả
              </h3>
              <p className="text-gray-600 mb-4">
                Không tìm thấy kết quả cho "<span className="font-medium">{query}</span>"
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {popularSearches.slice(0, 3).map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                      handleSearch({ preventDefault: () => {} } as React.FormEvent);
                    }}
                    className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}