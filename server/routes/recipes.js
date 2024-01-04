import express from "express";
import mongoose from "mongoose";
import { GlobalRecipeModel } from "../models/GlobalRecipes.js";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
const router=express.Router();
router.get("/",async(req,res)=>{
    try{
      const response =await RecipeModel.find({})  
      res.json(response);
    }catch(err){
        res.json(err);
    }
})
router.get("/id", async (req, res) => {
    try {
      const { userID } = req.query; // Extract userID from query parameters
      const query = userID ? { userOwner: userID } : {}; // Create a query object based on userID existence
  
      const response = await RecipeModel.find(query)
      console.log(response)
      res.json(response);
    } catch (err) {
      res.json(err);
    }
  });
  router.get("/search", async (req, res) => {
    try {
        const { keywords } = req.query;
        let query = {};

        if (keywords) {
            // Adjust the regex pattern to search for words starting with the entered letters
            const regex = new RegExp(`^${keywords}`, 'i');
            query = {
                $or: [
                    { name: { $regex: regex } }, // Search by name
                    { description: { $regex: regex } }, // Search by description
                    // Add other fields to search here...
                ],
            };
        }

        const response = await RecipeModel.find(query);
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});
router.post("/",async(req,res)=>{
    const recipe =new RecipeModel(req.body);
    try{
      const response =await recipe.save(); 
      res.json(response);
    }catch(err){
        res.json(err);
    }
})
router.put("/",async(req,res)=>{
    try{
    const recipe =await RecipeModel.findById(req.body.recipeID);
    const user=await UserModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save(); 
      res.json({savedRecipes:user.savedRecipes});
    }catch(err){
        res.json(err);
    }
})
router.get("/savedRecipes/ids",async(req,res)=>{
    try{
      const user =await UserModel.findById(req.body.userID)  
      res.json({savedRecipes:user?.savedRecipes});
    }catch(err){
        res.json(err);
    }
})
router.get("/savedRecipes",async(req,res)=>{
    try{
      const user =await UserModel.findById(req.body.userID)  
      const savedRecipes=await RecipeModel.find({
        _id:{$in:user.savedRecipes},
      })
      res.json({savedRecipes:savedRecipes});
    }catch(err){
        res.json(err);
    }
})


export {router as recipesRouter}