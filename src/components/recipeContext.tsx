import React, { createContext, useContext, useState, useEffect } from 'react';

const RecipeContext = createContext<any>(null);

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
  const [recipes, setRecipes] = useState<any[]>([]);

  const fetchRecipes = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/recipe');
      const data = await res.json();
      setRecipes(data);
    } catch (error) {
      console.error('שגיאה בטעינת מתכונים:', error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes, fetchRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => useContext(RecipeContext);
