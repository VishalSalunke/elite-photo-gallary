import React from "react";

const Photos = ({ photos, lastPhotoElementRef }) => {
  return (
    <ul className="photo-grid">
      {photos.map((photo, index) => {
        if (photos.length === index + 1) {
          return (
            <li key={photo.id} ref={lastPhotoElementRef}>
              <img src={photo.urls.regular} alt={photo.alt_description} />
            </li>
          );
        } else {
          return (
            <li key={photo.id}>
              <img src={photo.urls.regular} alt={photo.alt_description} />
            </li>
          );
        }
      })}
    </ul>
  );
};

export default Photos;
