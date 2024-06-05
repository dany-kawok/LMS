import "./App.css";
import Auth from "./components/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Courses from "./pages/Courses";
import Layout from "./pages/Layout";
import { Route, Routes } from "react-router-dom";
import SingleCourse from "./pages/SingleCourse";
import CoursesSearchResults from "./pages/CoursesSearchResults";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="auth/*" element={<Auth />} />
        <Route path="categories" element={<Categories />} />
        <Route path="courses" element={<Courses />} />
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
