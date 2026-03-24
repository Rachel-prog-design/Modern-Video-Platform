import { categories } from "../utils/categories";

function Sidebar({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer
            ${selectedCategory === category
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;