import { useState, useRef, useEffect } from "react";

interface SearchableSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export default function SearchableSelect({ options, value, onChange, placeholder, error }: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  ).sort();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 border rounded-xl text-sm transition-all cursor-pointer flex items-center justify-between bg-white ${
          error ? "border-red-300 bg-red-50" : isOpen ? "border-[#E8501A] ring-2 ring-orange-100" : "border-gray-200"
        }`}
      >
        <span className={`${!value ? "text-gray-300" : "text-[#1A1A2E] font-medium"}`}>
          {value || placeholder || "Selecciona uma opção"}
        </span>
        <i className={`ri-arrow-down-s-line transition-transform duration-300 ${isOpen ? "rotate-180 text-[#E8501A]" : "text-gray-400"}`}></i>
      </div>

      {isOpen && (
        <div className="absolute z-[100] mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="p-3 border-b border-gray-50 bg-gray-50/50">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar curso..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-xs focus:outline-none focus:border-[#E8501A] transition-all"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className={`px-4 py-2.5 text-xs cursor-pointer transition-colors flex items-center justify-between ${
                    value === opt ? "bg-orange-50 text-[#E8501A] font-bold" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {opt}
                  {value === opt && <i className="ri-check-line"></i>}
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center">
                <i className="ri-search-2-line text-gray-200 text-2xl mb-2 block"></i>
                <p className="text-[10px] text-gray-400 font-medium">Nenhum curso encontrado</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
