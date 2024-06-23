import { Link } from "react-router-dom";

const Dropdown = ({ title, isOpen, toggleDropdown, links }) => {
  return (
    <div className="relative group">
      <button
        type="button"
        className="dropdown-toggle py-2 px-3 hover:bg-sky-800 flex items-center gap-2 rounded"
        onClick={toggleDropdown}
      >
        <span className="pointer-events-none select-none">{title}</span>
        <svg
          className="w-3 h-3 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div className={`dropdown-menu absolute ${isOpen ? '' : 'hidden'} bg-pink-700 text-white rounded-lg mt-2 py-2 w-48 z-10`}>
        {links?.map((link, index) => (
          <Link key={index} to={link.to} className="block px-4 py-2 hover:bg-sky-800">
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
