import React, { useRef, useCallback} from "react"
import superagent from "superagent"
import { useHistory } from "react-router-dom"
import capitalize from "capitalize"
import Loader from "react-loader-advanced"

import "./Collage.scss"

const simpleGet = (options) => {
  superagent.get(options.url).then(function (res) {
    if (options.onSuccess) options.onSuccess(res)
  })
}

const Collage = (props) => {
  const { useState, useEffect, useRef } = React
  const { defaultQuery } = props || props.location.aboutProps
  let [photos, setPhotos] = useState([])
  let [query, setQuery] = useState(defaultQuery)
  let [currentSearch, setcurrentSearch] = useState(defaultQuery)
  let [loading, setLoading] = useState(false)
  const queryInput = useRef(null)
  const history = useHistory()
  const [hasMore, setHasMore] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)

  const numberOfPhotos = process.env.REACT_APP_IMAGE_COUNT
  console.log( process.env.REACT_APP_clientID)
  const url =
    "https://api.unsplash.com/photos/random/?count=" +
    numberOfPhotos +
    "&client_id=" +
    process.env.REACT_APP_clientID

  useEffect(() => {
    const photosUrl = query ? `${url}&query=${query}&page=${pageNumber}` : url
    setLoading(true)
    simpleGet({
      url: photosUrl,
      onSuccess: (res) => {
        // setPhotos(res.body)
        setPhotos(prevPhotos => {
          return [...new Set([...prevPhotos, ...res.body ])]})
        setLoading(false)
        setHasMore(res.body.length > 0)
      },
    })
  }, [pageNumber, query, url])

  useEffect(() => {
    setPhotos([])
  }, [query])

  const observer = useRef()
  const lastPhotoElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  const searchPhotos = (e) => {
    e.preventDefault()
    setPageNumber(1)
    setQuery(queryInput.current.value)
    setcurrentSearch(queryInput.current.value)
    history.push(`/`)
  }

  const categorySearch = (query) => {
    queryInput.current.value = ""
    setPageNumber(1)
    setQuery(query)
    setcurrentSearch(query)
    history.push(`/${query}`)
  }

  return (
    <div className="box">
      <h2 style={{ textAlign: "center" }}> {capitalize(currentSearch)} </h2>

      <form
        id="unsplash-search"
        className="unsplash-search form"
        onSubmit={searchPhotos}
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
        <ul className="photo-grid">
          {photos.map((photo, index) => {
              if(photos.length === index + 1){
               return( <li key={photo.id} ref={lastPhotoElementRef}>
                <img src={photo.urls.regular} alt={photo.alt_description} />
              </li>)
              }else{
                return(<li key={photo.id}>
                <img src={photo.urls.regular} alt={photo.alt_description} />
              </li>)
              }
          })}
        </ul>
      </Loader>
    </div>
  )
}

export default Collage
