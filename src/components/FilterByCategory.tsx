import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import RecipeCard from './RecipeCard'; // כרטיס מתכון רגיל
import { getAllRecipes } from './GetAllRecipes' // פונקציה שמביאה את כל המתכונים

const FilterByCategory = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);

  const categories = ['עוגות', 'מרקים', 'סלטים', 'מאפים', 'עיקריות'];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllRecipes();
      setRecipes(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = recipes.filter(r => r.CategoryName === selectedCategory);
      setFilteredRecipes(filtered);
    }
  }, [selectedCategory, recipes]);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        סינון לפי קטגוריה🗂️
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="category-label">בחר קטגוריה</InputLabel>
        <Select
          labelId="category-label"
          value={selectedCategory}
          label="בחר קטגוריה"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box display="flex" flexWrap="wrap" mt={2} component="div">
        {filteredRecipes.map((recipe) => (
          <Box key={recipe.Id} width={{ xs: '100%', sm: '50%', md: '25%' }} p={1}>
            <RecipeCard recipe={recipe} />
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default FilterByCategory;
