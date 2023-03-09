import React from "react";
import "./Square.css";
import useIsMobile from "../customHooks/useIsMobile";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// alright, final stop is the Square stop. Most of what I said inside Rectangle applies here, so I'm not gonna repeat myself too much.
// on problem though, the carousel doesn't display the wrapper for the cta inside the widget which is a library limitation.

export default function Square({ gridItems, carouselOnMobile }) {
  // console.log("from Square", gridItems);
  const isMobile = useIsMobile();

  // to render the Carousel on Mobile, we needed the isMobile to update the state and change the re-render.
  if (carouselOnMobile && isMobile) {
    // we iterate through the gridItems origina prop, and insert the new array inside renderedCarousel, we have a check if we're rendering a div for an image or a button.
    // I wrote two types of check using the conditional operator ? here, and below in the normal grid map I used an if statement
    const renderedCarousel = gridItems.map((item, index) => {
      return (
        <div key={index} className="carousel-slide">
          {item.type === "cta" ? (
            <div className="button-slide btn-div">
              <h1>{item.title}</h1>
              <a href={item.link}>
                <button>{item.button}</button>
              </a>
            </div>
          ) : (
            <img src={item.download_url} alt="carousel item" />
          )}
        </div>
      );
    });
    return <Carousel>{renderedCarousel}</Carousel>;
  }

  // now if we don't want a carousel (regardless of isMobile), we will have a grid with a css dependant behavoir
  const renderedGrid = gridItems.map((gridItem, index) => {
    if (gridItem.type === "cta") {
      return (
        <div key={index} className="grid-item btn-div">
          <h1>{gridItem.title}</h1>
          <a href={gridItem.link}>
            <button>{gridItem.button}</button>
          </a>
        </div>
      );
    } else {
      return (
        <a key={index} href={gridItem.download_url}>
          <div className="grid-item">
            <img src={gridItem.download_url} alt="grid item" />
          </div>
        </a>
      );
    }
  });

  return <div className="grid-container">{renderedGrid}</div>;
}
