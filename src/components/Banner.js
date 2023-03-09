import React from "react";
import Rectangle from "../UI/Rectangle";
import Square from "../UI/Square";
import { SQUARE } from "../App";

// this is the Banner component, it displays a different child component based on the mode prop.
// because we have only two types, I would have created just one type of prop that is false/truthy. But because the task requests two props to be written, we created the SQUARE and RECTNAGEL in App as was explained before you reached Banner. But we only need one prop for the logic here.

// for multiple modes (+3), a switch statement or if/elseif/else statements would have been better.

// there's not much to talk about here really. That's it. Just to keep the comment flow easy, go ahead and jump to Rectangle, then go to Sqaure.
export default function Banner({ mode, items, carouselOnMobile }) {
  return (
    <>
      {mode === SQUARE ? (
        <Square gridItems={items} carouselOnMobile={carouselOnMobile}></Square>
      ) : (
        <Rectangle items={items}> </Rectangle>
      )}
    </>
  );
}
