// import { Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth";
// import Auth from "./components/Auth";
import Layout from "./pages/Layout";
// import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="auth/login" element={<Auth />} />
          <Route path="auth/signup" element={<Auth />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
