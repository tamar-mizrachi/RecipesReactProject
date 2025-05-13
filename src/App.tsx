import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import { AuthProvider } from './components/authcontext.tsx'
import { BrowserRouter } from 'react-router-dom';
import { RecipeProvider } from './components/recipeContext.tsx';
function App() {
  return (

    <Router> <AuthProvider>  <RecipeProvider>
      {/* <Home/> */}
      <Box>
        <Routes>
          <Route path="/" element={<Home />} >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          
          <Route path="/home-recipes" element={<HomeRecipes />}>
            {/* <Route path="recipes" element={<ProtectedRoute><Recipes /></ProtectedRoute>} />
            <Route path="add-recipe" element={<ProtectedRoute> <AddRecipe /></ProtectedRoute>} /> */}
            <Route path="recipes" element={<Recipes />} >
            <Route path="by-category" element={<FilterByCategory />} />
              <Route path="by-duration" element={<FilterByDuration />} />
              <Route path="by-difficulty" element={<FilterByDifficulty />} />
              <Route path="all-recipes" element={<AllRecipes />} />
              </Route>
              <Route path="add-recipe" element={<AddRecipe />} />
              
            
              <Route path="my-recipes" element={<MyRecipes />} >
              <Route path="edit/:id" element={<EditRecipe />} />
              <Route path="delete/:id" element={<DeleteRecipe />} />
              </Route>
            {/* </Route> */}
          </Route>
        </Routes>
      </Box>  </RecipeProvider>
    </AuthProvider>
    </Router>
  );
}

export default App;
