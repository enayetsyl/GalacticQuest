import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { dropdowns } from "../../constant/Index";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(null);

  const handleDropdownToggle = (index) => {
    setDropdownOpen((prevState) => (prevState === index ? null : index));
  };

  const handleMoreDropdownToggle = (index) => {
    setMoreDropdownOpen((prevState) => (prevState === index ? null : index));
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close dropdowns when clicking outside
  const handleOutsideClick = (e) => {
    if (
      !e.target.closest('.dropdown-menu') &&
      !e.target.matches('.dropdown-toggle')
    ) {
      setDropdownOpen(null);
      setMoreDropdownOpen(null);
    }
  };

  // Attach event listener for clicks outside the menu
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  // Extract the first 4 items and the rest for "More" dropdown
  const mainItems = dropdowns.slice(0, 4);
  const moreItems = dropdowns.slice(4);

  return (
    <nav className="bg-sky-600 text-white">
      <div className="container mx-auto px-4 md:flex items-center gap-6">
        {/* Logo and mobile menu */}
        <div className="flex items-center justify-between md:w-auto w-full">
          <Link to="/" className="py-5 px-2 text-white flex-1 font-bold">
            Webcrunch.com
          </Link>
          <div className="md:hidden flex items-center">
            <button
              onClick={handleMobileMenuToggle}
              type="button"
              className="mobile-menu-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Main navigation menu */}
        <div
          className={`md:flex md:flex-row flex-col items-center justify-start md:space-x-1 pb-3 md:pb-0 navigation-menu ${
            mobileMenuOpen ? '' : 'hidden'
          }`}
        >
          {/* Display first 4 main items */}
          {mainItems.map((dropdown, index) => (
            <Dropdown
              key={index}
              title={dropdown.title}
              isOpen={dropdownOpen === index + 1}
              toggleDropdown={() => handleDropdownToggle(index + 1)}
              links={dropdown.links}
            />
          ))}

          {/* "More" dropdown */}
          {moreItems.length > 0 && (
            <div className="relative group">
              <button
                onClick={() => handleDropdownToggle('more')}
                className="dropdown-toggle py-2 px-3 flex items-center gap-2 hover:bg-sky-800 rounded"
              >
                More
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
              <div
                className={`dropdown-menu ${dropdownOpen === 'more' ? '' : 'hidden'} bg-sky-700 text-white rounded-lg mt-2 py-2 w-48`}
              >
                {moreItems.map((dropdown, index) => (
                  <Dropdown
                    key={index + 4} // Use index + 4 to avoid key collision with main items
                    title={dropdown.title}
                    isOpen={moreDropdownOpen === index}
                    toggleDropdown={() => handleMoreDropdownToggle(index)}
                    links={dropdown.links}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
