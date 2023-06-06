import React, { useEffect, useRef } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./index.scss";
const SearchUsers = (props) => {
  const {
    setShowSearchBar,
    showSearchBar,
    setSearchInputValue,
    searchInputValue,
    handleFocus,
    handleBlur,
  } = props;
  const inputRef = useRef(null);
  const handleInputChange = (e) => {
    setSearchInputValue(e.target.value);
  };
  const handleClearInput = () => {
    setSearchInputValue("");
  };

  useEffect(() => {
    // When the user clicks outside of the search input, the search input will be unvisible.
    const handleClickOutside = (event) => {
      // If the user has clicked the SVG element - the X icon, the input should not be unvisible.
      const isSVGElement = event.target instanceof SVGElement;

      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        !isSVGElement
      ) {
        setShowSearchBar(false);
        setSearchInputValue("");
      }
    };
    if (showSearchBar) {
      // Using setTimeout to add the click event listener only when the search bar is visible and the component has been rendered.
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 0);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="searchbar-container">
      <input
        onChange={handleInputChange}
        value={searchInputValue}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
