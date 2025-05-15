
import { Box, Container } from '@mui/system';
import { useRecipeContext } from './recipeContext';
import { useUserContext } from './UserContext';
import { Typography } from '@mui/material';
import MyRecipeCard from './MyRecipeCard';
import { Outlet } from 'react-router-dom';

const MyRecipes = () => {
  const { recipes } = useRecipeContext();

  const userId = localStorage.getItem('userId');


  const myRecipes = recipes.filter((recipe: any) => recipe.UserId == userId);
  return (
    <div>
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        המתכונים שלי 👉
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={2} >
        {myRecipes.map((recipe:any) => (
          <Box key={recipe.Id} width={{ xs: '100%', sm: '100%', md: '100%' }} mb={4} mr={4}>

            <MyRecipeCard recipe={recipe} />
           
          </Box>
        ))}
      </Box>
      
    </Container>
     <Outlet />
    </div>
  );
};
export default MyRecipes;
