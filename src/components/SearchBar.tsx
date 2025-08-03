"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
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

export function SearchBar({ placeholder = "Tìm kiếm tài liệu...", showSuggestions = true, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState<typeof mockDocuments>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredResults([]);
      if (onSearch) {
        onSearch("");
      }
      return;
    }

    const filtered = mockDocuments.filter(doc =>
      doc.title.toLowerCase().includes(query.toLowerCase()) ||
      doc.category.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredResults(filtered);

    // Debounced search
    const timeoutId = setTimeout(() => {
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
    if (query.trim()) {
      // Navigate to search results page
      window.location.href = `/documents?search=${encodeURIComponent(query)}`;
    }
  };

  const clearSearch = () => {
    setQuery("");
    setFilteredResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-lg">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            placeholder={placeholder}
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && showSuggestions && (query.trim() !== "" || filteredResults.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {filteredResults.length > 0 ? (
            <>
              <div className="p-3 border-b border-gray-100">
                <p className="text-sm text-gray-600">
                  Tìm thấy {filteredResults.length} kết quả cho "{query}"
                </p>
              </div>
              {filteredResults.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/documents/${doc.id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 transition"
                >
                  <img
                    src={doc.image}
                    alt={doc.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                      {doc.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {doc.category}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        ${doc.price}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
              {filteredResults.length > 3 && (
                <div className="p-3 border-t border-gray-100">
                  <Link
                    href={`/documents?search=${encodeURIComponent(query)}`}
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Xem tất cả {filteredResults.length} kết quả →
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="p-6 text-center">
              <div className="text-gray-400 mb-2">
                <Search size={32} className="mx-auto" />
              </div>
              <p className="text-gray-600">
                Không tìm thấy kết quả cho "{query}"
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Thử tìm kiếm với từ khóa khác
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}