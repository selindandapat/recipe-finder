import React, { useState } from "react";
import "./App.css"
import img from './images/image.jpg'
import search from './images/search-icon.webp'
import back from './images/back.jpg'
import Axios from "axios";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

const APP_ID = "a52b4d43";
const APP_KEY = "e0e5c667605f5e91d8275c973531b80a";

const RecipeContainer = styled.div`
  display: flex;
  background-color:white;
  flex-direction: column;
  padding: 20px;
  width: 300px;
  border-radius:20px;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 200px;
  border-radius:16px;
`;
const RecipeName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SeeMoreText = styled.span`
  color:white;
  background-color: darkmagenta;
  font-size: 15px;
  text-align: center;
  border-radius: 3px;
  padding: 10px 15px;
  cursor: pointer;
  border-radius:16px
`;
const IngredientsText = styled(SeeMoreText)`
  color: white;
  margin-bottom: 12px;
  border-radius:16px
`;
const SeeNewTab = styled(SeeMoreText)`
  color: white;
  border: solid 1px green;
  border-radius:16px;
`;
const RecipeComponent = (props) => {
  const [show, setShow] = useState("");

  const { label, image, ingredients, url } = props.recipe;
  return (
    <RecipeContainer>
      <Dialog
        onClose={() => console.log("adsadad")}
        aria-labelledby="simple-dialog-title"
        open={!!show}
      >
        <DialogTitle>Ingredients</DialogTitle>
        <DialogContent>
          <RecipeName>{label}</RecipeName>
          <table>
            <thead>
              <th>Ingredient</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index} className="ingredient-list">
                  <td>{ingredient.text}</td>
                  <td>{ingredient.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <SeeNewTab onClick={() => window.open(url)}>See More</SeeNewTab>
          <SeeMoreText onClick={() => setShow("")}>Close</SeeMoreText>
        </DialogActions>
      </Dialog>
      <CoverImage src={image} alt={label} />
      <RecipeName>{label}</RecipeName>
      <IngredientsText onClick={() => setShow(!show)}>
        Ingredients
      </IngredientsText>
      <SeeMoreText onClick={() => window.open(url)}>
        See Complete Recipe
      </SeeMoreText>
    </RecipeContainer>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;

`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 37px;
  font-weight: bold;
  font-family: Georgia;
`;
const SearchBox = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  width: 500px;
  height: 50px;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(39, 4, 39, 0.952);
  border-radius: 20px;
  display: flex;
  padding: 10px 10px;
  margin-left: 20px;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 33px;
  height: 33px;
`;
const RecipeImage = styled.img`
  width: 39px;
  height: 39px;
  margin: 15px;
`;

const Placeholder = styled.img`
  width: 100%;
  height: 96%;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 17px;
  border: none;
  outline: none;
  margin-left: 13px;
`;
const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-evenly;
`;

const AppComponent = () => {
  const [searchQuery, updateSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`,
    );
    updateRecipeList(response.data.hits);
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container> 
      <Header>
        <AppName>
          <RecipeImage src={img}/>
          Foodie Crush
        </AppName>
        
      </Header>
      <RecipeListContainer>
        {recipeList?.length ? (
          recipeList.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe.recipe} />
          ))
        ) : (
          <div className="home">
          <Placeholder src={back} alt="" />
          <SearchBox>
            <SearchIcon src={search} alt="" />
          <SearchInput
            placeholder=" Search Recipe"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
          </div>
        )}
      </RecipeListContainer>
        <div className="card">
          <span className="card_title">Subscribe Us</span>
           <p class="card_content">Get fresh web design resources delivered straight to your inbox every week</p>
          <div className="card_form">
          <input placeholder="Your Email" type="text"/>
        <button class="sign-up"> Sign up</button>
          </div>
        </div>
      
    </Container>
  );
};

export default AppComponent;