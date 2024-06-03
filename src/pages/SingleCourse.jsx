import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  useAddToCartMutation,
  useGetUserCartQuery,
} from "../redux/features/sCart/sCartSlice";
import { Toaster, toast } from "react-hot-toast";
import "./css/SingleCourse.css";

const SingleCourse = () => {
  const location = useLocation();
  const course = location.state?.course;
  const [addToCart] = useAddToCartMutation();
  const { data: cartItems = [], refetch } = useGetUserCartQuery();
  const [isCourseAdded, setIsCourseAdded] = useState(false);

  const handleAddToCart = async () => {
    if (!cartItems.some((item) => item.courseId._id === course._id)) {
      await addToCart(course._id);
      refetch();
      toast.success("Course added to cart");
      setIsCourseAdded(true);
    } else {
      toast("Course already in cart", { icon: "ℹ️" });
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="star full-star">
          ★
        </span>
      );
    }
    if (halfStar) {
      stars.push(
        <span key="half" className="star half-star">
          ★
        </span>
      );
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty-star">
          ☆
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="course-container">
      <Toaster />
      {course ? (
        <div className="course-content">
          <img className="course-image" src={course.image} alt={course.title} />
          <div className="course-details">
            <h1 className="course-title">{course.title}</h1>
            <p>{course.description}</p>
            <div className="course-extra-details">
              <p className="course-price">Price: ${course.price}</p>
              <div className="course-rating">
                <span>Rating: </span>
                {renderStars(course.rating)}
                <span className="rating-label"> ({course.rating})</span>
              </div>
              {isCourseAdded ? (
                <Link to="/dashboard" className="go-to-courses-button">
                  Go to My Courses
                </Link>
              ) : (
                <button
                  className="add-to-cart-button"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>No course data available</p>
      )}
    </div>
  );
};

export default SingleCourse;
