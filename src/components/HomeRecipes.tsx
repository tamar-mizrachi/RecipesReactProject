import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Alert, Button } from '@mui/material';
import MyRecipeCard from './MyRecipeCard';

const HomeRecipes: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header style={headerStyle}>
        <h1 style={welcomeStyle}>TAMARTASTE🧁</h1>
        <nav style={navStyle}>
           <Button style={buttonStyle} onClick={() => navigate('my-recipes')}>המתכונים שלי🍴</Button>
          <Button style={buttonStyle} onClick={() => navigate('recipes')}>מתכונים📖</Button>
          <Button style={buttonStyle} onClick={() => navigate('add-recipe')}>הוספת מתכון👨‍🍳</Button>
          <Button style={buttonStyle} onClick={()=>alert("האתר בבניה נסו מאוחר יותר,עמכם הסליחה.")}>קצת עלינוℹ️</Button>
          <Button style={buttonStyle} onClick={()=>alert("האתר בבניה נסו מאוחר יותר,עמכם הסליחה.")}>יצירת קשר📞</Button>
          <Button style={buttonStyle} onClick={() => navigate('/')}>יציאה➡️</Button>
          <Button style={buttonStyle} onClick={() => navigate('/')}>אחורה➡️</Button>
        </nav>
      </header>

      <main style={{ marginTop: '160px' }}>
        <Outlet />
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
  margin: 30,
  fontSize: '50px',
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  marginBottom: '10px',
  marginRight: '100px',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: '16px',
  color: 'white',
};

export default HomeRecipes;
