import { Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";
import { authApiSlice } from "../redux/features/auth/authApiSlice";
import toast from "react-hot-toast";
import MemberNav from "./MemberNav"; // Import MemberNav

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const searchInputRef = useRef();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const links = [
    { title: "Home", link: "/" },
    { title: "Categories", link: "/categories" },
    { title: "Courses", link: "/courses" },
    { title: "Tutors", link: "/tutors" },
    { title: "Contact", link: "/contact" },
  ];

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchTerm = searchInputRef.current.value.trim();
    if (searchTerm) {
      navigate(
        `/coursesSearchResults?search=${encodeURIComponent(searchTerm)}`
      );
    }
  };

  return (
    <>
      <HeaderContainer>
        <Container className="container">
          <LogoSection>
            <BarsBtnContainer
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
            >
              <BarsBtn open={openMenu}></BarsBtn>
            </BarsBtnContainer>
            <LogoItem>
              <Link to="/">Fast.Skill.Academy</Link>
            </LogoItem>
          </LogoSection>
          <Nav open={openMenu} onClick={() => setOpenMenu(false)}>
            <Menu>
              <MenuList>
                {links.map((link, i) => (
                  <Link
                    key={i}
                    to={link.link}
                    onClick={() => {
                      setOpenMenu(!openMenu);
                    }}
                  >
                    {link.title}
                  </Link>
                ))}
              </MenuList>
            </Menu>
          </Nav>
          <AuthSection>
            <SearchContainer>
              <Form onSubmit={handleSearchSubmit}>
                <SearchInput
                  type="text"
                  required
                  name="courseSearchResults"
                  placeholder="Search Course"
                  ref={searchInputRef}
                />
                <SearchBtn type="submit">
                  <MagnifyingGlassIcon />
                </SearchBtn>
              </Form>
            </SearchContainer>
            {isAuthenticated ? (
              <AuthBtn
                onClick={async () => {
                  const logoutResult = await dispatch(
                    authApiSlice.endpoints.logoutAPI.initiate()
                  );

                  if (logoutResult.data) {
                    dispatch(logout());
                    toast.success("Signed out successfully!");

                    console.log("Logged out successfully");
                  } else {
                    console.error("Failed to log out");
                    toast.error("Failed to log out.");
                  }
                }}
              >
                <Link to="/">Sign Out</Link>
              </AuthBtn>
            ) : (
              <AuthBtn>
                <Link to="/auth/login">Sign In</Link>
              </AuthBtn>
            )}
          </AuthSection>
        </Container>
        {isAuthenticated && <MemberNav />}{" "}
        {/* Conditionally render MemberNav as a second header */}
      </HeaderContainer>
    </>
  );
};

// Styled Components
const HeaderContainer = styled.div`
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 0px;
  width: 100vw;

  @media (max-width: 768px) {
    justify-content: space-around;
    align-items: center;
    gap: 15px;
    position: relative;
  }
`;

const LogoSection = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 10;

  a {
    font-family: "Monoton", sans-serif;
    font-size: 3rem;
    font-weight: 400;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #fff;
    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }
`;

const AuthSection = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  align-content: center;
  gap: 15px;
  z-index: 10;

  @media (max-width: 568px) {
    flex-direction: column;
  }
`;

const BarsBtnContainer = styled.div`
  cursor: pointer;
  height: 40px;
  width: 40px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 201;
`;

const BarsBtn = styled.span`
  z-index: 100;
  width: 25px;
  height: 2px;
  display: block;
  position: relative;
  background-color: ${(props) => (props.open ? "transparent" : "white")};
  transition: background 0.2s ease-out;
  &::after,
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    display: block;
    background-color: white;
    transition: background 0.2s ease-out;
    top: -8px;
    ${(props) =>
      props.open &&
      css`
        transform: rotate(-45deg);
        top: 0;
      `};
  }
  &::before {
    top: 8px;
    ${(props) =>
      props.open &&
      css`
        transform: rotate(45deg);
        top: 0;
      `};
  }
`;

const LogoItem = styled.div``;

const SearchContainer = styled.div``;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0;
  z-index: -200;
  display: none;
  width: 100%;
  height: 100%;
  ${(props) =>
    props.open &&
    css`
      display: block;
      opacity: 0.7;
      z-index: 200;
    `};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-out;
`;

const Menu = styled.ul``;

const MenuList = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  a {
    font-family: "Monoton", sans-serif;
    color: white;
    font-size: 2rem;
    transition: all 0.3s ease-in;
    &:hover {
      color: #1f7fc4;
      font-size: 2.3rem;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  border-radius: 20px;
  height: 40px;
  background-color: black;
  padding: 3px 20px;
  color: white;
  &::placeholder {
    color: #ffffff5e;
  }
`;

const SearchBtn = styled.button`
  color: white;
  background-color: transparent;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  right: 20px;
`;

const AuthBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  a,
  button {
    text-decoration: none;
    background-color: #1f7fc4;
    padding: 10px;
    border-radius: 10px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    border: none;
  }
`;

export default Header;
