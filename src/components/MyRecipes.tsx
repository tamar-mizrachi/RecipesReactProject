/*import React, { useEffect, useState } from 'react';

import { useUserContext } from './UserContext';
import MyRecipeCard from './MyRecipeCard';
import { Grid, Typography, Container, Box } from '@mui/material';

const MyRecipes: React.FC = () => {
  const { userId } = useUserContext();
  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/recipe');
        const data = await res.json();
        const myRecipes = data.filter((recipe: any) => recipe.UserId === userId);
        setRecipes(myRecipes);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      }
    };

    if (userId) fetchRecipes();
  }, [userId]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        המתכונים שלי 👉
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={2}>
        {recipes.map((recipe) => (
          <Box key={recipe.Id} width={{ xs: '100%', sm: '48%', md: '30%', lg: '22%' }}>
            <MyRecipeCard recipe={recipe} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default MyRecipes;
*/
import { Box, Container } from '@mui/system';
import { useRecipeContext } from './recipeContext';
import { useUserContext } from './UserContext';
import { Typography } from '@mui/material';
import MyRecipeCard from './MyRecipeCard';

const MyRecipes = () => {
  const { userId } = useUserContext();
  const { recipes } = useRecipeContext();

  const myRecipes = recipes.filter((r:any) => r.UserId === userId);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        המתכונים שלי 👉
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={2}>
        {myRecipes.map((recipe:any) => (
          <Box key={recipe.Id} width={{ xs: '100%', sm: '48%', md: '30%', lg: '22%' }}>
            <MyRecipeCard recipe={recipe} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};
export default MyRecipes;
