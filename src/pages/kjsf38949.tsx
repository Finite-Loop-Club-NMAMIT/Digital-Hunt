import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineArrowDown } from "react-icons/ai";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Scroll() {
  //scroll down infinite ads, scroll to go to login page with query parameter user=guest
  const [images, setImages] = useState<string[]>([]);
  let upScroll=3;

  const imagePaths = [
    "/assets/ads/1.jpeg",
    "/assets/ads/2.jpeg",
    "/assets/ads/3.jpeg",
    "/assets/ads/4.jpeg",
    "/assets/ads/5.jpeg",
    "/assets/ads/6.jpeg",
    "/assets/ads/7.jpeg",
    "/assets/ads/8.jpg",
    "/assets/ads/9.jpeg",
    "/assets/ads/10.jpeg",
  ];

  const router = useRouter();

  function getRandomImage() {
    if (imagePaths.length === 0) {
      return "";
    }
    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    return imagePaths[randomIndex];
  }

  function addRandomImage() {
    setImages(
      (prevImages) =>
        [...prevImages, getRandomImage()].filter(Boolean) as string[],
    );
  }

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      addRandomImage();
    }
  }, []);
  const handleScroll = useCallback(() => {
    if (window.scrollY === 0) {
      console.log(upScroll)
      if (upScroll === 0) router.push("/login2093?user=guest");
      else {
          upScroll-=1
        setImages(
          (prevImages) =>
            [
              getRandomImage(),
              getRandomImage(),
              getRandomImage(),
              getRandomImage(),
              getRandomImage(),
              ,
              ...prevImages,
            ].filter(Boolean) as string[],
        );
      }
    } else if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      for (let i = 0; i < 5; i++) {
        addRandomImage();
      }
    }
  },[router,upScroll])

  useEffect(() => {


    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [router]);
  const { status: status } = useSession();

  if (status === "unauthenticated") {
    router.push("/");
    return <></>;
  }
  if (status === "loading") {
    return <></>;
  }
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {images.map((image, index) => (
              <div key={index}>
                <Image
                  src={image}
                  alt={`Image ${index}`}
                  className="h-auto w-full"
                  height={300}
                  width={300}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 flex w-full justify-center space-x-10 bg-transparent px-4 py-2 text-center text-7xl">
        <AiOutlineArrowDown size="70" className="animate-bounce" />
        <p>Scroll Down</p>
        <AiOutlineArrowDown size="70" className="animate-bounce" />
      </div>
    </>
  );
}
