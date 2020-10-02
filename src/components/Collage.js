import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import capitalize from "capitalize";
import Loader from "react-loader-advanced";

import fetchPhotos from "../services/fetchPhotos";
import Photos from "./Photos";
import SearchBox from "./SearchBox";
import "./Collage.scss";

const Collage = (props) => {
  const { useState, useEffect, useRef } = React;
  const { defaultQuery } = props || props.location.aboutProps;
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState(defaultQuery);
  const [currentSearch, setcurrentSearch] = useState(defaultQuery);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [hasMore, setHasMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [isCategorySearch, setIsCategorySearch] = useState(false);

  useEffect(() => {
    async function fetchAPI() {
      setLoading(true);
      let photos = await fetchPhotos(query, pageNumber);
      setPhotos((prevPhotos) => {
        return [...new Set([...prevPhotos, ...photos])];
      });
      setLoading(false);
      setHasMore(photos.length > 0);
    }
    fetchAPI();
  }, [pageNumber, query]);

  useEffect(() => {
    setPhotos([]);
  }, [query]);

  const observer = useRef();
  const lastPhotoElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const searchPhotos = (e, queryInput) => {
    e.preventDefault();
    setPageNumber(1);
    setQuery(queryInput.current.value);
    setcurrentSearch(queryInput.current.value);
    history.push(`/`);
  };

  const categorySearch = (query) => {
    setIsCategorySearch(true);
    setPageNumber(1);
    setQuery(query);
    setcurrentSearch(query);
    history.push(`/${query}`);
  };

  return (
    <div className="box">
      <h2 style={{ textAlign: "center" }}> {capitalize(currentSearch)} </h2>
      <SearchBox
        searchPhotos={searchPhotos}
        isCategorySearch={isCategorySearch}
      />
      <div className="button-area-line">
        <div onClick={() => categorySearch("sports")}>Sports</div>
        <div onClick={() => categorySearch("mountains")}>Mountain</div>
        <div onClick={() => categorySearch("forest")}>Forest</div>
      </div>
      <Loader
        foregroundStyle={{ color: "black" }}
        backgroundStyle={{ backdropFilter: "blur(6px)" }}
        show={loading}
        message={"loading..."}
      >
        <Photos photos={photos} lastPhotoElementRef={lastPhotoElementRef} />
      </Loader>
    </div>
  );
};

export default Collage;
