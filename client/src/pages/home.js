import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { MY_IP } from "../constants";
export const Home = () => {
  const userID = useGetUserID();
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    console.log(userID)
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(MY_IP+`/recipes/id?userID=${userID}`);
        setRecipes(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

   fetchRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.post(MY_IP+"/globalrecipes", {
        recipeID,
        userID,
      });
      if (response.data && response.data.message === "Recipe already exists in global recipes.") {
        alert("Recipe already uploaded!");
      } else {
      
        alert("Recipe uploaded to publicly available list");
      }
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.length>0&&recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              
              <button
                onClick={() => saveRecipe(recipe._id)}
               
              >
                Upload
              </button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};