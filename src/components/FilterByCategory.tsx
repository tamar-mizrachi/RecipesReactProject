

import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import RecipeCard from './RecipeCard';
import { getAllRecipes } from './GetAllRecipes';
import { useAuth } from './authcontext';

const FilterByCategory = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);

  // const { categoryid } = useAuth(); // קטגוריה של המשתמש המחובר
  // const [categoryid, setCategoryId] = useState<any>(null); // קטגוריה של המשתמש המחובר 
  // שליפת כל המתכונים
  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getAllRecipes();
      setRecipes(data);
      console.log("מתכונים שהתקבלו:", data); // הדפסת המתכונים שהתקבלו
      // אם יש categoryId מהמשתמש – מסננים לפיו כבר בהתחלה
      // if (categoryid) {
        const initialFiltered = data.filter(
          (recipe: any) => recipe.Categoryid == selectedCategoryId
        );
        setFilteredRecipes(initialFiltered);
       //setSelectedCategoryId(categoryid); // מציבים אותו כברירת מחדל בבחירה
      // } else {
      //   setFilteredRecipes(data);
      // }
    };
    fetchRecipes();
  }, [selectedCategoryId]);

  // שליפת קטגוריות
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/category');
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        } else {
          console.error('שגיאה בשליפת קטגוריות');
        }
      } catch (err) {
        console.error('שגיאה ברשת בעת שליפת קטגוריות', err);
      }
    };
    fetchCategories();
  }, []);

  // שינוי קטגוריה לפי בחירת המשתמש
  useEffect(() => {
    if (selectedCategoryId) {
      const filtered = recipes.filter(
        (recipe) => recipe.Categoryid == selectedCategoryId
      );
      setFilteredRecipes(filtered);
      console.log("מתכונים מסוננים:", filtered); // הדפסת המתכונים המסוננים
    } else {
      setFilteredRecipes(recipes);
    }
  }, [selectedCategoryId, recipes]);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        סינון לפי קטגוריה 🗂️
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="category-label">בחר קטגוריה</InputLabel>
        <Select
          labelId="category-label"
          value={selectedCategoryId}
          label="בחר קטגוריה"
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.Id} value={cat.Id}>
              {cat.Name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box display="flex" flexWrap="wrap" mt={2}>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <Box key={recipe.Id} width={{ xs: '100%', sm: '50%', md: '25%' }} p={1}>
              <RecipeCard recipe={recipe} />
            </Box>
          ))
        ) : (
          <Typography mt={2} color="text.secondary">
            לא נמצאו מתכונים לפי הסינון שנבחר.
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default FilterByCategory;
