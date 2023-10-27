

import { useState, useEffect,useRef } from 'react';

export default function Results() {
    const [clickhere,setClickhere] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Play failed:', error);
      });
    }
  };

    const [timeLeft, setTimeLeft] = useState(300);
    const [timerActive, setTimerActive] = useState(true);

    useEffect(() => {
        if (timeLeft === 3)
            setClickhere(true);

        if (timeLeft === 0) {
            setTimerActive(false);
            handlePlay();   
        }

        if (timerActive) {
            const intervalId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }
        
    }, [timeLeft, timerActive]);

    return (
        <>
            
            <div className="flex flex-col items-center justify-center h-screen">
                {timerActive && (
                    <div className="flex flex-col items-center justify-center w-full h-full gap-8 sm:gap-16">
                        <span className="text-2xl sm:text-3xl font-semibold  text-center tracking-widest px-2">
                            Results will be announced in:
                        </span>
                        {
                            clickhere && (
                                <h1>Click here now</h1>
                            )
                        }
                        <div className="flex justify-center gap-3 sm:gap-8">
                            <div className="flex flex-col gap-5 relative">
                                <div className="h-16 w-16 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex justify-between items-center bg-[#343650] rounded-lg">
                                    <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-white"></div>
                                    <span className="lg:text-7xl sm:text-6xl text-3xl font-semibold text-[#a5b4fc]">
                                        {Math.floor(timeLeft / 60)}
                                    </span>
                                    <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-white"></div>
                                </div>
                                <span className="text-[#8486A9] text-xs sm:text-2xl text-center capitalize">
                                    {Math.floor(timeLeft / 60) == 1 ? "Minute" : "Minutes"}
                                </span>
                            </div>
                            <div className="flex flex-col gap-5 relative">
                                <div className="h-16 w-16 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex justify-between items-center bg-[#343650] rounded-lg">
                                    <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-white"></div>
                                    <span className="lg:text-7xl sm:text-6xl text-3xl font-semibold text-[#a5b4fc]">
                                        {timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
                                    </span>
                                    <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-white"></div>
                                </div>
                                <span className="text-[#8486A9] text-xs sm:text-2xl text-center capitalize">
                                    Seconds
                                </span>
                            </div>
                        </div>
                    </div>
                )}
                {!timerActive && (
                    <video ref={videoRef} src="/assets/rroll.mp4" autoPlay={true} loop width="640" height="360" />
                )}
            </div>
            
        </>
    );
}