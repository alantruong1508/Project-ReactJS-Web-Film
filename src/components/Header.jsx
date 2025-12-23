import { useState } from "react";

export default function Header({ onSearch }) {
  // tạo useState để lưu trữ những giá trị search
  const [textSearch, setSearch] = useState("");
  return (
    // Thẻ Header
    <header className="p-4 bg-black flex items-center justify-between">
      {/* thẻ nav chứa home, about, contact */}
      <div className="flex items-center space-x-4">
        <h1 className="text-[30px] uppercase font-bold text-red-700">Movie</h1>
        <nav className="flex items-center space-x-4"></nav>
        <a href="#" className="text-white">
          Home
        </a>
        <a href="#" className="text-white">
          About
        </a>
        <a href="#" className="text-white">
          Contact
        </a>
      </div>
      {/* thẻ nav chứa thanh search và nút search */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          className="p-3 text-black bg-white"
          onChange={(e) => setSearch(e.target.value)}
          value={textSearch}
        />
        <button
          className="p-2 text-white bg-red-600 cursor-pointer"
          onClick={() => onSearch(textSearch)}
        >
          Search
        </button>
      </div>
    </header>
  );
}
