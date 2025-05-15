
import { Box } from '@mui/system';
import { useRecipeContext } from './recipeContext';
import { Typography } from '@mui/material';
import RecipeCard from './RecipeCard';

const AllRecipes = () => {
  const { recipes } = useRecipeContext();

  return (
    <Box>
      <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>המתכונים שלנו 👉</Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        {recipes.map((recipe:any) => (
          <Box key={recipe.Id} width={{ xs: '100%', sm: '48%', md: '23%' }} mb={2} mr={2}>
            <RecipeCard recipe={recipe} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default AllRecipes;
