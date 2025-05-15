
import React, { createContext, useContext, useState, useEffect } from 'react';

const RecipeContext = createContext<any>(null);

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
  const [recipes, setRecipes] = useState<any[]>([]);

  // פונקציה שמביאה את כל המתכונים מהשרת
  const fetchRecipes = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/recipe');
      const data = await res.json();
      setRecipes(data);
    } catch (error) {
      console.error('שגיאה בטעינת מתכונים:', error);
    }
  };

  // פונקציה להוספת מתכון לקונטקסט
   const addRecipe = (newRecipe: any) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]); // מוסיף את המתכון החדש למערך המתכונים
  };
  const removeRecipe = (id: string) => {
    setRecipes((prev) => prev.filter((r) => r.Id !== id));
  };
  
  // טוען את המתכונים ברגע שהקומפוננטה נטענת
  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes, fetchRecipes, addRecipe, removeRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => useContext(RecipeContext);

