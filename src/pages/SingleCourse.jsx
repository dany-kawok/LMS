import { useLocation, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useAddToCartMutation,
  useGetUserCartQuery,
} from "../redux/features/sCart/sCartSlice";
import { useGetCoursesOfTheUserQuery } from "../redux/features/courses/coursesSlice";
import { Toaster, toast } from "react-hot-toast";
import "./css/SingleCourse.css";
import { FaArrowLeft } from "react-icons/fa";

const SingleCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;
  const [addToCart] = useAddToCartMutation();
  const { data: cartItems = [], refetch: refetchCart } = useGetUserCartQuery();
  const { data: userCourses = [], refetch: refetchCourses } =
    useGetCoursesOfTheUserQuery();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const handleAddToCart = async () => {
    if (!cartItems.some((item) => item.courseId === course._id)) {
      await addToCart(course._id);
      refetchCart();
      refetchCourses();
      toast.success("Course added to cart");
    } else {
      toast("Course already in cart", { icon: "ℹ️" });
    }
  };

  const handleLoginRedirect = () => {
    navigate("/auth/login", {
      state: { from: location, course: course },
    });
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

  const isCourseInUserCourses = userCourses.some(
    (userCourse) => userCourse._id === course._id
  );
  const isCourseInCart = cartItems.some((item) => item.courseId === course._id);

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
              {isAuthenticated ? (
                isCourseInUserCourses ? (
                  <Link to="/dashboard">
                    <button className="go-to-courses-button">
                      Go to Courses
                    </button>
                  </Link>
                ) : isCourseInCart ? (
                  <button
                    className="course-in-cart-button"
                    onClick={handleAddToCart}
                  >
                    Checkout to Access the Course
                  </button>
                ) : (
                  <button
                    className="add-to-cart-button"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                )
              ) : (
                <button
                  className="login-to-purchase-button"
                  onClick={handleLoginRedirect}
                >
                  Login to Purchase This Course
                </button>
              )}
            </div>
            <div className="back-div">
              <Link to="/categories">
                <span className="back-button">
                  <FaArrowLeft />
                </span>
              </Link>
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
