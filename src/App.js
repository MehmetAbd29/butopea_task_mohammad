import React, { useState, useEffect } from "react";
import Banner from "./components/Banner";
import axios from "axios";

// global
// note: we don't actually need to specifiy RECTANGLE, because we only have two modes. we could have used truthy or false valeus for just SQUARE but let's assume here we in the future we may want more modes? So they global consts can be specified here.
export const SQUARE = "sqaure";
export const RECTANGLE = "rectangle";

// this is the main function app which takes all components and spits them to the root div inside the html (like widgets in Vue i think)
function App() {
  // I believe useState is something that exists in Vue, so I'll pass on explaining
  const [items, setItems] = useState([]);

  // useHook is a hook that allows functional components to "mimick" the behavoir of mounting/dismounting components in React
  // here, we're using the hook to load up the images for the "General case SQUARE"
  // this items was for testing purposes, but I don't want to delete it.
  // const items = [
  //   {
  //     type: "image",
  //     aspectRatio: "square",
  //     src: "https://picsum.photos/400",
  //     link: "https://example.com/link1",
  //   },
  //   {
  //     type: "image",
  //     aspectRatio: "square",
  //     src: "https://picsum.photos/400",
  //     link: "https://example.com/link2",
  //   },
  //   {
  //     type: "cta",
  //     title: "CTA Title",
  //     button: "CTA Button",
  //     link: "https://example.com/link4",
  //   },
  //   {
  //     type: "image",
  //     aspectRatio: "square",
  //     src: "https://picsum.photos/400",
  //     link: "https://example.com/link3",
  //   },
  // ];

  // now, since we want the images to also take to somelink. In reality, the API will give us the image + the link where to should lead, at least a good written API would do that. notice that I used the same fake link + image in the "items" example above this comment. But now since I want to implement some fetching, I will assume that these info https://picsum.photos/seed/picsum/info, where the image url is the link where we want to go.

  // for fetching, we use the useEffect hook, it will render only once at the initial component mounting:
  // quick note, I would usually use async/await for fetching requests as I think under the hood, it's better than using .then
  // but because we only have one thing we're fetchin, async/await will just make the coder longer. I wrote down a commented code for it, if you're curious:
  useEffect(() => {
    axios
      .get("https://picsum.photos/v2/list?limit=5")
      .then((res) => setItems(res.data));
  }, []);

  // useEffect(() => {
  //   async function fetchImages() {
  //     const res = await axios.get('https://picsum.photos/v2/list?limit=5');
  //     setItems(res.data);
  //   }

  //   fetchImages();
  // }, []);

  // alright, we have our data. If we console.log, we see:
  // console.log("from App", items);

  // important thing: download_url not the url itself. This is the only info we want and we'll use it as a link for anchors and a src for img.
  // okay, we have the images, but we also need the CTA, and you want the CTA location to be random inside the grid.
  // just to make reading these comments more easy, I will mutate both the items list and CTA HERE INSIDE APP and then Pass the mutated list to the component. Originally, I would have tried to perform mutation somewhere else, but I've already made the entire code and kept the fetching as a last task, so I don't think there's time to go back and edit.

  // here's the CTA component we want:
  const ctaContent = {
    type: "cta",
    title: "CTA Title",
    button: "CTA Button",
    link: "https://example.com/link4",
  };

  // let's create a collection now:
  // I don't want to mutate the original fetched content since it's a state, so we'll copy it
  const collection = [...items];
  const randomIndex = Math.floor(Math.random() * (collection.length + 1));
  // now we have an array where the CTA is placed at random, regardless of the length of the array
  collection.splice(randomIndex, 0, ctaContent);
  console.log("from App", collection);

  // now two side cases (Rectangle and grid with 3 elements), we'll give it a hardcoded list instead of mutating the fetched list.

  // rectnagle only need 1 image with a phone type / desktop type + a CTA btn
  const rectangleItems = [
    {
      type: "image",
      aspectRatio: "square",
      src: "https://picsum.photos/1500/800",
      mobileSrc: "https://picsum.photos/300",
      link: "https://example.com/link1",
    },
    {
      type: "cta",
      title: "CTA Title",
      button: "CTA Button",
      link: "https://example.com/link4",
    },
  ];

  // the 2 images, 1 cta square grid will take the following: (we can make the location of CTA random like we did for the fetched list, but as we're only interested in the implementation of the grid without a carousel, we won't repeat ourselves)
  const simpleItems = [
    {
      type: "image",
      aspectRatio: "square",
      download_url: "https://picsum.photos/400",
    },
    {
      type: "image",
      aspectRatio: "square",
      download_url: "https://picsum.photos/400",
    },
    {
      type: "cta",
      title: "CTA Title",
      button: "CTA Button",
      link: "https://example.com/link4",
    },
  ];

  // quick note, in an actual project, I would have moved carouselOnMobile prop to the sqaure component in Banner because Sqaure and Rectangle are so different in design, they're separate, and it's a bad practice to give a component too many props that it may not pass to some children.
  // but for this implementation it's okay.

  return (
    <>
      <p>
        First Banner, mode: Square, takes only 3 elements which are 2 images and
        a btn. the carouselOnMobile is false
      </p>
      <Banner
        mode={SQUARE}
        items={simpleItems}
        carouselOnMobile={false}
      ></Banner>
      <hr></hr>
      <p>
        This is the actual usge case for the banner with the mode: sqaure, and
        it takes fetched items using axios, this component has the
        carouselOnMobile on (true) because we have too many images inside the
        grid!
      </p>
      <p>
        One problem I've faced implementing the carousel is trying to show the
        cta div inside the scroll widget, the reason is that, this carousel
        library only takes images as slides. It displays any type of element but
        fr the widgets only images can be shown.
      </p>
      <Banner mode={SQUARE} items={collection} carouselOnMobile={true}></Banner>
      <hr></hr>
      <p>
        This is the rectangle usge case for the banner with the mode: rectangle,
        it doesn't take the fetched elements, but rather for this case I just
        gave it a hardcoded list of an image (with two variations for mobile &
        desktop) and a CTA button. Also, this component uses different classes
        than the grid.
      </p>
      <Banner mode={RECTANGLE} items={rectangleItems}></Banner>
    </>
  );
}

export default App;
