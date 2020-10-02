import Unsplash, { toJson } from "unsplash-js";

const numberOfPhotos = process.env.REACT_APP_IMAGE_COUNT;
const unsplash = new Unsplash({ accessKey: process.env.REACT_APP_clientID });

const fetchPhotos = async (query, pageNumber = 1) => {
  return await unsplash.search
    .photos(query, pageNumber, numberOfPhotos)
    .then(toJson)
    .then((json) => {
      return json.results;
    });
};

export default fetchPhotos;