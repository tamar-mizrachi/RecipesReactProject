

import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Typography, Box } from '@mui/material';
import RecipeCard from './RecipeCard';
import { getAllRecipes } from './GetAllRecipes';

const FilterByDuration = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedDuration, setSelectedDuration] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);

  const durations = ['פחות מ-30 דקות', '30-60 דקות', 'מעל 60 דקות'];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllRecipes();
      setRecipes(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedDuration) {
      const filtered = recipes.filter(r => {
        const duration = r.Duration;
        if (selectedDuration === 'פחות מ-30 דקות') {
          return duration < 30;
        } else if (selectedDuration === '30-60 דקות') {
          return duration >= 30 && duration <= 60;
        } else if (selectedDuration === 'מעל 60 דקות') {
          return duration > 60;
        }
        return false;
      });
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes([]);
    }
  }, [selectedDuration, recipes]);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        סינון לפי משך זמן ⏱️
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="duration-label">בחר משך זמן</InputLabel>
        <Select
          labelId="duration-label"
          value={selectedDuration}
          label="בחר משך זמן"
          onChange={(e) => setSelectedDuration(e.target.value)}
        >
          {durations.map((dur) => (
            <MenuItem key={dur} value={dur}>
              {dur}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box display="flex" flexWrap="wrap" mt={2}>
        {filteredRecipes.map((recipe) => (
          <Box key={recipe.Id} width={{ xs: '100%', sm: '50%', md: '25%' }} p={1}>
            <RecipeCard recipe={recipe} />
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default FilterByDuration;

