import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Recipes from './components/Recipes';
import AddRecipe from './components/AddRecipe.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import { Box } from '@mui/material';
import HomeRecipes from './components/HomeRecipes.tsx';
import EditRecipe from './components/EditRecipe.tsx';
import DeleteRecipe from './components/DeleteRecipe.tsx';
import FilterByCategory from './components/FilterByCategory.tsx';
import FilterByDuration from './components/FilterByDuration.tsx';
import FilterByDifficulty from './components/FilterByDiffulty.tsx';
import AllRecipes from './components/AllRecipes.tsx';
import MyRecipes from './components/MyRecipes.tsx';
import { AuthProvider } from './components/authcontext.tsx';
import { RecipeProvider } from './components/recipeContext.tsx';

function App() {
  return (
    <AuthProvider>
      <RecipeProvider>
        <Box>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="/home-recipes" element={<HomeRecipes />}>
              <Route path="recipes" element={<Recipes />}>
                <Route path="all-recipes" element={<AllRecipes />}/>
                  <Route path="by-category" element={<FilterByCategory />} />
                  <Route path="by-duration" element={<FilterByDuration />} />
                  <Route path="by-difficulty" element={<FilterByDifficulty />} />
              </Route>

              <Route path="add-recipe" element={<AddRecipe />} />

              <Route path="my-recipes" element={<MyRecipes />}>
                <Route path="edit-recipe/:id" element={<EditRecipe />} />
                <Route path="delete-recipe/:id" element={<DeleteRecipe />} />
              </Route>
              </Route>
          </Routes>
        </Box>
      </RecipeProvider>
    </AuthProvider>
  );
}

export default App;
