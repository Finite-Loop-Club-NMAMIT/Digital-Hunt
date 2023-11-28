import { type FunctionComponent, useState, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Swipe from "react-easy-swipe";
import BlurImage from "../blurImage";

interface ImageSliderProps {
  propsImages: string[];
}

const ImageSlider: FunctionComponent<ImageSliderProps> = ({ propsImages }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagestate, setImageState] = useState<string[]>([]);
  
  useEffect(() => {
    if (propsImages && propsImages.length > 0) {
      setImageState(propsImages);
    }
  }, [propsImages]);

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
