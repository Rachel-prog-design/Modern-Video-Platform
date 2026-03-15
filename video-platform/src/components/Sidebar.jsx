import { categories } from "../utils/categories";

function Sidebar({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="sidebar">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;