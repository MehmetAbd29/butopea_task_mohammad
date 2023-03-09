import React from "react";
import useIsMobile from "../customHooks/useIsMobile";
import "./Rectangle.css";

// okay, if you're comming from Banner, I may have tricked you when I said go to Rectnagle... you actually need to go to useIsMobile inside customHooks, this is a custom hook which is basically the logic that will detect if the screen changed sized to 768 and based on it, will either display the phone component or the desktop component
// like I said, when I design, I try to make the responsviness depend on css alone
// but this task structure resposinvess depends on using logic to render the correct component on the screen.
// we of course could have used the CSS proeprty display, and decided which component to show based on the screen size, but in this case we're not actually using React for its purpose, which is "rendering only important things" so, we're going with the logic approach.

// okay once you go to useIsMobile, come back here.

// you're back? okay let's continue:

export default function Rectangle({ items }) {
  // here's the isMobile like we said.
  const isMobile = useIsMobile();
  // and because I hardcoded items in App for Rectangle (line 91 in APP) I can just deconstruct my values and use them
  const [image, cta] = items;

  // I also took out the CTA wrapper into its own element, they style changes based on the screensize (one breaking point)
  const ctaDiv = (
    <div className="cta-box">
      <h1>{cta.title}</h1>
      <a href={cta.link}>
        <button className="cta">{cta.button}</button>
      </a>
    </div>
  );

  // alright here comes the logic. We have two types of HTML (or rather JSX) structure that will be displayed:
  // dekstop: is a div that has an anchor and the ctaDiv. ctaDiv style inscures it will be displayed to the right with the correct color
  // phone: is a div and under it is a the cta div.

  if (isMobile) {
    return (
      <>
        <div className="banner__mobile">
          <a href={image.link}>
            <img
              className="hardcoded-image"
              src={image.mobileSrc}
              alt="placeholder"
            />
          </a>
        </div>
        {ctaDiv}
      </>
    );
  }

  return (
    <div
      className="banner__desktop"
      style={{
        backgroundImage: `url(${image.src})`,
      }}
    >
      <a href={image.link}>
        <div style={{ height: `${100}%`, width: `${100}%` }}></div>
      </a>
      {ctaDiv}
    </div>
  );
}
