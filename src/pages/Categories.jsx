import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGetAllCategoriesQuery } from "../redux/features/categories/categoriesSlice";

const Categories = () => {
  const { data: categories } = useGetAllCategoriesQuery();

  return (
    <CategoriesContainer>
      {categories &&
        categories.map((el) => (
          <Link
            key={el._id}
            to={{ pathname: "/courses" }}
            state={{ categoryId: el._id, title: el.name }}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <CategoryCard>
              <CategoryImageContainer>
                <CategoryImage src={el.image} alt={el.name} />
              </CategoryImageContainer>
              <CategoryDetails>
                <CategoryName>{el.name}</CategoryName>
              </CategoryDetails>
            </CategoryCard>{" "}
          </Link>
        ))}
    </CategoriesContainer>
  );
};

const CategoriesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  color: white;
`;

const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #282828;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const CategoryImageContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;

const CategoryImage = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;
  transition: transform 0.2s;
  ${CategoryCard}:hover & {
    transform: scale(1.1);
  }
`;

const CategoryDetails = styled.div`
  padding: 15px;
  background-color: #333;
  height: 80px; /* Fixed height for the footer */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoryName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: #fff;
`;

export default Categories;
