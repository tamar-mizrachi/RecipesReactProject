/*
import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Typography, Grid, Box } from '@mui/material';
import RecipeCard from './RecipeCard'; // כרטיס מתכון רגיל
import { getAllRecipes } from './GetAllRecipes' // הפונקציה שמביאה את כל המתכונים

const FilterByDifficulty = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);

  const difficulties = ['קל', 'בינוני', 'קשה'];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllRecipes();
      setRecipes(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedDifficulty) {
      const filtered = recipes.filter(r => r.Difficulty === selectedDifficulty);
      setFilteredRecipes(filtered);
    }
  }, [selectedDifficulty, recipes]);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        סינון לפי רמת קושי📶
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="difficulty-label">בחר רמת קושי</InputLabel>
        <Select
          labelId="difficulty-label"
          value={selectedDifficulty}
          label="בחר רמת קושי"
          onChange={(e) => setSelectedDifficulty(e.target.value)}
        >
          {difficulties.map((diff) => (
            <MenuItem key={diff} value={diff}>{diff}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box display="flex" flexWrap="wrap" mt={2}>
        {filteredRecipes.map((recipe) => (
          <Box key={recipe.Id} width={{ xs: '100%', sm: '50%', md: '25%' }} p={2}>
            <RecipeCard recipe={recipe} />
          </Box>
        ))}
      </Box>

    </div>
  );
};

export default FilterByDifficulty;
*/

import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Typography, Box } from '@mui/material';
import RecipeCard from './RecipeCard';
import { getAllRecipes } from './GetAllRecipes';

const FilterByDifficulty = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);

  const difficulties = ['קל', 'בינוני', 'קשה'];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllRecipes();
      setRecipes(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedDifficulty) {
      const filtered = recipes.filter((r) => {
        const difficulty = r.Difficulty?.toString().trim();
        return difficulty === selectedDifficulty;
      });
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes([]);
    }
  }, [selectedDifficulty, recipes]);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        סינון לפי רמת קושי 📶
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="difficulty-label">בחר רמת קושי</InputLabel>
        <Select
          labelId="difficulty-label"
          value={selectedDifficulty}
          label="בחר רמת קושי"
          onChange={(e) => setSelectedDifficulty(e.target.value)}
        >
          {difficulties.map((diff) => (
            <MenuItem key={diff} value={diff}>
              {diff}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box display="flex" flexWrap="wrap" mt={2}>
        {filteredRecipes.map((recipe) => (
          <Box key={recipe.Id} width={{ xs: '100%', sm: '50%', md: '25%' }} p={2}>
            <RecipeCard recipe={recipe} />
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default FilterByDifficulty;
