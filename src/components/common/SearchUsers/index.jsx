import React, { useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./index.scss";
const SearchUsers = (props) => {
  const {
    inputRef,
    setSearchInputValue,
    searchInputValue,
    handleFocus,
    handleBlur,
  } = props;
  const handleInputChange = (e) => {
    setSearchInputValue(e.target.value);
  };
  const handleClearInput = () => {
    setSearchInputValue("");
  };

  useEffect(() => {
    // When the user clicks outside of the search input element, it will unvisible the search input and search results.
    const handleClickOutside = (event) => {
      // If the user has clicked the SVG element - the X icon, the input should not be unvisible.
      const isSVGElement = event.target instanceof SVGElement;

      if (event.target !== inputRef.current && !isSVGElement) {
        // Using setTimeout because if the user pressed someone in the search result, I need to wait.
        setTimeout(() => {
          handleBlur();
        }, 100);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="searchbar-container">
      <input
        onChange={handleInputChange}
        value={searchInputValue}
        ref={inputRef}
        onFocus={handleFocus}
        placeholder="Search"
        className="search-users-input"
      />
      {searchInputValue && (
        <AiOutlineCloseCircle
          onClick={handleClearInput}
          size={20}
          className="search-users-input-clear"
        />
      )}
    </div>
  );
};

export default SearchUsers;
