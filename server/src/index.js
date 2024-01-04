import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import { userRouter } from "../routes/users.js";
import { recipesRouter } from "../routes/recipes.js";
import { globalrecipesRouter } from "../routes/global_recipes.js";
const app=express();
app.use(cors());
app.use(express.json());
app.use("/auth",userRouter);
app.use("/recipes",recipesRouter);
app.use("/globalrecipes",globalrecipesRouter)
mongoose.connect("mongodb+srv://pghosh2002:welcome1818@cluster0.8duauap.mongodb.net/recipe_app");
app.listen(3001,()=>console.log("server started"));