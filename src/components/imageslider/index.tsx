import { type FunctionComponent, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Swipe from "react-easy-swipe";
import BlurImage from "../blurImage";


const ImageSlider: FunctionComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagestate, setImagestate] = useState(["1.png", "2.png", "3.png", "4.png", "5.png",
                                                "6.png", "7.png", "8.png", "9.png", "10.png",
                                                "11.png", "12.png", "13.png", "14.png"]);
                                                // "15.png", "16.png", "17.png", "18.png", "19.png", "20.png",
                                                // "21.png", "22.png", "23.png"]);

  const handleNextSlide = () => {
    const newSlide = currentSlide === imagestate.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const handlePrevSlide = () => {
    const newSlide = currentSlide === 0 ? imagestate.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };


  return (
    <div className="relative border ">
      {imagestate.length > 1 && (
        <AiOutlineLeft
          onClick={handlePrevSlide}
          className="absolute inset-y-1/2 left-0 z-20 m-auto cursor-pointer text-5xl text-gray-400"
        />
      )}
      <div className="relative m-auto flex h-[350px] w-full overflow-hidden">
        <Swipe
          onSwipeLeft={handleNextSlide}
          onSwipeRight={handlePrevSlide}
          className="relative z-10 flex h-full w-full"
        >
          {imagestate.map((image, index) => {
              if (index === currentSlide) {
                return (
                  <BlurImage
                    alt="event images"
                    key={index}
                    src={"/assets/oneSlides/"+image?.toString() || ""}
                    className="max-h-[550px] w-full rounded-xl"
                    style={{ objectFit: "contain" }}
                    height={500}
                    width={500}
                  />
                );
              }
            })}
        </Swipe>
      </div>
      {imagestate.length > 1 && (
        <AiOutlineRight
          onClick={handleNextSlide}
          className="absolute inset-y-1/2 right-0 z-20 m-auto cursor-pointer text-5xl text-gray-400"
        />
      )}
    </div>
  );
};

export default ImageSlider;
