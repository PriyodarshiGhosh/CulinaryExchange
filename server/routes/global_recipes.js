import express from "express";
import mongoose from "mongoose";
import { GlobalRecipeModel } from "../models/GlobalRecipes.js";
import { UserModel } from "../models/Users.js";
import { RecipeModel } from "../models/Recipes.js";
const router=express.Router();
router.get("/",async(req,res)=>{
    try{
      const response =await GlobalRecipeModel.find({})  
      res.json(response);
    }catch(err){
        res.json(err);
    }
})
router.post("/",async(req,res)=>{
    try {
        // Fetch the recipe by ID from RecipeModel
        const recipe = await RecipeModel.findById(req.body.recipeID);

        // Check if the recipe with the same ID exists in GlobalRecipeModel
        const existingGlobalRecipe = await GlobalRecipeModel.findOne({ userOwner: recipe.userOwner, name: recipe.name });

        if (existingGlobalRecipe) {
            // Recipe already exists in GlobalRecipeModel
            console.log("exist");
            return res.json({ message: "Recipe already exists in global recipes." });
        }

        // Create an instance of GlobalRecipeModel with the fetched recipe data
        const globalRecipe = new GlobalRecipeModel({
            // Map the fields from the RecipeModel to GlobalRecipeModel
            name: recipe.name,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            imageUrl: recipe.imageUrl,
            cookingTime: recipe.cookingTime,
            userOwner: recipe.userOwner,
        });

        // Save the global recipe
        const savedGlobalRecipe = await globalRecipe.save();

        console.log(savedGlobalRecipe);
        res.json(savedGlobalRecipe);
    } catch (err) {
        res.json(err);
    }
})




export {router as globalrecipesRouter}