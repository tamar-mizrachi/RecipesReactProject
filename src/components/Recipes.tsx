import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import AllRecipes from './AllRecipes';


const Recipes: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header style={headerStyle}>
        <h1 style={welcomeStyle}>TAMARTASTE🧁</h1>
        <nav style={navStyle}>
          <Button style={buttonStyle} onClick={() => navigate('by-category')}>חיפוש לפי קטגוריה📚</Button>
          <Button style={buttonStyle} onClick={() => navigate('by-duration')}>חיפוש לפי משך זמן⏱️</Button>
          <Button style={buttonStyle} onClick={() => navigate('by-difficulty')}>חיפוש לפי רמת קושי📶</Button>
          <Button style={buttonStyle} onClick={() => navigate('all-recipes')}>מתכונים📖</Button>
          <Button style={buttonStyle} onClick={() => navigate('/')}>יציאה➡️</Button>
           <Button style={buttonStyle} onClick={() => navigate('/home-recipes')}>אחורה➡️</Button>
        </nav>
     

      </header>
 
      <main style={{ marginTop: '160px' }}>
         <Outlet /> 
         <AllRecipes />
      </main>
    </div>
  );
};

const headerStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '150px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  padding: '0 20px',
  backgroundColor: 'rgb(56, 5, 5)',
  color: 'white',
  zIndex: 1000,
};

const welcomeStyle: React.CSSProperties = {
  margin: 45,
  fontSize: '50px',
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  marginBottom: '10px',
  marginRight: '100px',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 15px',
  fontSize: '16px',
  color: 'white',
};

export default Recipes;
