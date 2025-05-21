import CardItem from "@/components/ui/card-item/card-item";
import { useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
function Slider({
  data,
  onClick,
  title,
  className,
}: {
  data: {
    id: string;
    title: string;
    imageSrc: string;
    supportingText: string;
    type: string;
  }[];
  onClick: ({ type, id }: { type: string; id: string }) => void;
  title: string;
  className?: string;
}) {
  const rightRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const [swiper, setSwiper] = useState<any>(null);

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="relative">
        <Swiper
          slidesPerView="auto"
          pagination={{
            clickable: true,
          }}
          modules={[Navigation]}
          navigation={{
            nextEl: rightRef.current,
            prevEl: leftRef.current,
            enabled: true,
          }}
          onBeforeInit={(swiper) => {
            setSwiper(swiper);
          }}
          className="mt-6 grid grid-cols-[repeat(auto-fit,_minmax(7rem,_13rem))] "
        >
          {data.map((item, index) => (
            <SwiperSlide key={index} className="!h-full max-w-[13rem] w-full">
              <CardItem
                onCLick={() => onClick({ id: item.id, type: item.type })}
                variant={item.type} 
                item={{
                  imageSrc: item.imageSrc,
                  name: item.title,
                  subText: item.supportingText,
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="custom-swiper-button-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer select-none rounded-full bg-black p-2 text-white transition-all duration-300 ease-in-out hover:bg-gray-800"
          ref={leftRef}
          onClick={() => swiper.slidePrev()}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          className="custom-swiper-button-next absolute right-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer select-none rounded-full bg-black p-2 text-white transition-all duration-300 ease-in-out hover:bg-gray-800"
          ref={rightRef}
          onClick={() => swiper.slideNext()}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Slider;
