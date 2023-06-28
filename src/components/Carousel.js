import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import noImage from "../assets/images/noImage.png";
import "./Carousel.css";
import apiConfig from './../utilities/apiConfig';

const handleDragStart = (e) => e.preventDefault();
const Gallery = ({ id, media_type }) => {
  const [credits, setCredits] = useState([]);
  const items = credits?.map((c) => (
    <div className="carouselItem">
      <img
        src={c?.profile_path ? `${apiConfig.imgW500}/${c?.profile_path}` : noImage}
        alt={c?.name}
        onDragStart={handleDragStart}
        className="carouselItem__img "
      />
      <p className="carouselItem__txt">{c?.name.split(" ")[0]}</p>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const fetchCredits = async () => {
    fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=b438eb3479c6e4729b05c73cbe88e602&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setCredits(data.cast));
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
  );
};

export default Gallery;
