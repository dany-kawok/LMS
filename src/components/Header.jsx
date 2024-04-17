import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const SearchInputRef = useRef();
  const links = [
    { title: "Home", link: "/" },
    { title: "Genre", link: "/genre" },
    { title: "Tv Shows", link: "/tv-shows" },
    { title: "Movies", link: "/movies" },
    { title: "Contact", link: "/contact" },
  ];
  useEffect(() => {
    SearchInputRef.current?.focus();
  }, []);
  return (
    <>
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
            <Link to="/">
              Movies<span>.hd</span>
            </Link>
          </LogoItem>
        </LogoSection>
        <Nav open={openMenu}>
          <Menu>
            <MenuList>
              {links.map((link, i) => (
                <Link key={i} to={link.link}>
                  {link.title}
                </Link>
              ))}
            </MenuList>
          </Menu>
        </Nav>
        <AuthSection>
          <SearchContainer>
            <Form>
              <SearchInput
                type="text"
                required
                name="search"
                placeholder="Search Movie"
                ref={SearchInputRef}
              />
              <SearchBtn type="submit">
                <MagnifyingGlassIcon />
              </SearchBtn>
            </Form>
          </SearchContainer>
          <AuthBtn>
            <Link to="/auth/login">Sign In</Link>
          </AuthBtn>
        </AuthSection>
      </Container>
    </>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 30px 0px;
  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: column;
    gap: 15px;
    position: relative;
  }
`;
const LogoSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    font-family: "Monoton", sans-serif;
    font-size: 3rem;
    font-weight: 400;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: red;
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
`;
const AuthSection = styled.div`
  display: flex;
  position: relative;
  align-content: center;
  gap: 15px;
  @media (max-width: 568px) {
    flex-direction: column;
  }
`;
const BarsBtnContainer = styled.div`
  /* z-index: 101; */
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
      color: red;
      font-size: 2.3rem;
    }
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

  a {
    text-decoration: none;
    background-color: red;
    padding: 10px;
    border-radius: 10px;
    font-weight: bold;
    color: white;
    cursor: pointer;
  }
`;
export default Header;
