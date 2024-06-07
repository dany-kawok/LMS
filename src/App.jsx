import "./App.css";
import Auth from "./components/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Layout from "./pages/Layout";
import { Route, Routes } from "react-router-dom";
import SingleCourse from "./pages/SingleCourse";
import CoursesSearchResults from "./pages/CoursesSearchResults";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import ComingSoon from "./components/ComingSoon";
import AllCourses from "./pages/AllCourses";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="auth/*" element={<Auth />} />
        <Route path="categories" element={<Categories />} />
        <Route path="allCourses" element={<AllCourses />} />
        <Route path="tutors" element={<ComingSoon />} />
        <Route path="contact-us" element={<Contact />} />
        <Route path="singleCourse" element={<SingleCourse />} />
        <Route path="coursesSearchResults" element={<CoursesSearchResults />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
