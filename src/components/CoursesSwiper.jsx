import { useEffect, useState } from "react";
import { useGetAllCoursesQuery } from "../redux/features/courses/coursesSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "swiper/css";
import "swiper/css/autoplay";
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton CSS
import { Autoplay } from "swiper/modules";

import "./css/coursesSwiper.css"; // Import your custom styles

const CoursesSwiper = () => {
  const { data = [], isLoading } = useGetAllCoursesQuery();
  const [randomCourses, setRandomCourses] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const shuffledCourses = [...data]
        .sort(() => Math.random() - 0.5)
        .slice(0, 8);
      setRandomCourses(shuffledCourses);
    }
  }, [data]);

  return (
    <div>
      {isLoading ? (
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides={true}
          className="courses-swiper"
          modules={[Autoplay]}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: {
              // screens 0px and up
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              // screens 640px and up
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              // screens 768px and up
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              // screens 1024px and up
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <SwiperSlide key={index}>
              <div className="course-card">
                <Skeleton height={200} />
                <Skeleton count={2} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        randomCourses.length > 0 && (
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            centeredSlides={true}
            loop={randomCourses.length > 3} // Ensure enough slides for loop mode
            className="courses-swiper"
            modules={[Autoplay]}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: {
                // screens 0px and up
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                // screens 640px and up
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                // screens 768px and up
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                // screens 1024px and up
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
          >
            {randomCourses.map((course, index) => (
              <SwiperSlide key={index}>
                <Link
                  to={{ pathname: "/singleCourse" }}
                  state={{ course }}
                  style={{ userSelect: "none" }}
                >
                  <div className="course-card">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="course-image"
                    />
                    <h2 className="swiper-course-title">{course.title}</h2>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )
      )}
      <div className="swiper-buttons">
        <Link to="categories">
          <button className="discover-button">Discover all Categories</button>
        </Link>
        <Link>
          <button className="become-tutor-button">Become tutor with us</button>
        </Link>
      </div>
    </div>
  );
};

export default CoursesSwiper;
