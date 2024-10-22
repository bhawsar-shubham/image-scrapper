import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { images } from "../../constant";

const Carousel = () => {

  return (
    <div>
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}  // Add Autoplay module
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            style={{ width: "100%", height: "400px", objectFit: "cover" }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  );
};

export default Carousel;
