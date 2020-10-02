import React, { useRef } from "react";

const SearchBox = ({ searchPhotos, isCategorySearch }) => {
  let queryInput = useRef(null);
  if (isCategorySearch) queryInput.current.value = "";
  return (
    <form
      id="unsplash-search"
      className="unsplash-search form"
      onSubmit={(e) => searchPhotos(e, queryInput)}
    >
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Try 'nature' or 'dogs'! or anything you like ... then press enter"
          ref={queryInput}
        />
      </div>
    </form>
  );
};

export default SearchBox;