/*
import {
  Button,
  TextField,
  Grid,
  Typography,
  IconButton,
  MenuItem,
  Box
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Ingredient {
  Name: string;
  Count: string;
  Type: string;
}

interface Category {
  Id: string;
  Name: string;
  editing?: boolean;
  tempName?: string;
}

const AddRecipe = () => {
  const [form, setForm] = useState({
    Name: '',
    Img: '',
    Description: '',
    Instructions: [''],
    Difficulty: '',
    Duration: '',
    CategoryId: '',
    Ingrident: [{ Name: '', Count: '', Type: '' }],
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [duration, setDuration] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/category')
      .then(res => res.json())
      .then(data => setCategories(data.map((c: Category) => ({ ...c, editing: false, tempName: c.Name }))))
      .catch(err => console.error('שגיאה בקבלת קטגוריות:', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleInstructionChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updated = [...form.Instructions];
    updated[index] = e.target.value;
    setForm(prev => ({ ...prev, Instructions: updated }));
  };

  const handleIngredientChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) => {
    const updated = [...form.Ingrident];
    updated[index] = { ...updated[index], [field]: e.target.value };
    setForm(prev => ({ ...prev, Ingrident: updated }));
  };

  const addInstruction = () => {
    setForm(prev => ({ ...prev, Instructions: [...prev.Instructions, ''] }));
  };

  const removeInstruction = (index: number) => {
    const updated = form.Instructions.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, Instructions: updated }));
  };

  const addIngredient = () => {
    setForm(prev => ({
      ...prev,
      Ingrident: [...prev.Ingrident, { Name: '', Count: '', Type: '' }],
    }));
  };

  const removeIngredient = (index: number) => {
    const updated = form.Ingrident.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, Ingrident: updated }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    
    // הוספת מזהה מתכון
    const recipeId = crypto.randomUUID();
    
    const recipeData = {
      Id: recipeId,
      Name: form.Name,
      Instructions: form.Instructions,
      Difficulty: difficulty,
      Duration: duration,
      Description: form.Description,
      UserId: userId,
      CategoryId: form.CategoryId,
      Img: form.Img,
      Ingrident: form.Ingrident,
    };

    try {
      const res = await fetch('http://localhost:8080/api/recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData),
      });
      
      if (res.ok) {
        navigate('/recipes');
      } else {
        const errorData = await res.json();
        alert(`שגיאה בהוספת מתכון: ${errorData.message || 'שגיאה כללית'}`);
      }
    } catch (err) {
      console.error('שגיאה בהוספת מתכון:', err);
    }
  };

  const addCategory = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Id: crypto.randomUUID(), Name: newCategory }),
      });
      const newCat = await res.json();
      setCategories([...categories, { ...newCat, editing: false, tempName: newCat.Name }]);
      setNewCategory('');
    } catch (err) {
      console.error('שגיאה בהוספת קטגוריה:', err);
    }
  };

  const updateCategory = async (cat: Category) => {
    try {
      const res = await fetch('http://localhost:8080/api/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Id: cat.Id, Name: cat.tempName }),
      });
      const updated = await res.json();
      setCategories(categories.map(c => c.Id === cat.Id ? { ...updated, editing: false, tempName: updated.Name } : c));
    } catch (err) {
      console.error('שגיאה בעריכת קטגוריה:', err);
    }
  };

  const deleteCategory = async (catId: string) => {
    if (!window.confirm('האם אתה בטוח שברצונך למחוק את הקטגוריה?')) return;
    try {
      await fetch(`http://localhost:8080/api/category/${catId}`, { method: 'DELETE' });
      setCategories(categories.filter(c => c.Id !== catId));
    } catch (err) {
      console.error('שגיאה במחיקת קטגוריה:', err);
    }
  };

  return (
    <div style={{ marginTop: '200px', maxWidth: '600px', marginInline: '600px', marginBottom: '200px' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
        הוספת מתכון חדש
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <TextField label="שם המתכון" name="Name" value={form.Name} onChange={handleChange} fullWidth required />
          </Box>
          <Box>
            <TextField label="תיאור" name="Description" value={form.Description} onChange={handleChange} fullWidth required />
          </Box>
          <Box>
            <TextField label="תמונה (URL)" name="Img" value={form.Img} onChange={handleChange} fullWidth required />
          </Box>
          <Box>
            <label htmlFor="difficulty">רמת קושי:</label><br/>
            <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="קל">קל</option>
              <option value="בינוני">בינוני</option>
              <option value="קשה">קשה</option>
            </select>
          </Box>
          <Box>
            <label htmlFor="Duration">משך הזמן:</label><br/>
            <select id="duration" value={duration} onChange={(e) => setDuration(e.target.value)}>
              <option value="פחות מ30 דקות">פחות מ30 דק</option>
              <option value="30-60דק">30-60 דק</option>
              <option value="מעל 60דק">מעל 60דק</option>
            </select>
          </Box>

          {categories.map((cat) => (
            <Box key={cat.Id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                value={cat.editing ? cat.tempName : cat.Name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const updated = categories.map((c) =>
                    c.Id === cat.Id ? { ...c, tempName: e.target.value } : c
                  );
                  setCategories(updated);
                }}
                fullWidth
                disabled={!cat.editing}
              />
              <IconButton onClick={() => cat.editing ? updateCategory(cat) : setCategories(categories.map(c => c.Id === cat.Id ? { ...c, editing: true } : c))}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => deleteCategory(cat.Id)}>
                <DeleteIcon />
              </IconButton>
              <Button
                variant={form.CategoryId === cat.Id ? 'contained' : 'outlined'}
                onClick={() => setForm(prev => ({ ...prev, CategoryId: cat.Id }))}
              >
                בחר
              </Button>
            </Box>
          ))}

          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              label=" קטגוריה "
              value={newCategory}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCategory(e.target.value)}
              fullWidth
            />
            <Button onClick={addCategory}>הוסף</Button>
          </Box>

          <Typography>הוראות הכנה</Typography>
          {form.Instructions.map((inst, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                label={`שלב ${index + 1}`}
                value={inst}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInstructionChange(e, index)}
                fullWidth
                required
              />
              <IconButton onClick={() => removeInstruction(index)}><DeleteIcon /></IconButton>
            </Box>
          ))}
          <Button onClick={addInstruction}>הוסף שלב</Button>

          <Typography>מרכיבים</Typography>
          {form.Ingrident.map((ing, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                label="שם"
                value={ing.Name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleIngredientChange(e, index, 'Name')}
                fullWidth
                required
              />
              <TextField
                label="כמות"
                value={ing.Count}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleIngredientChange(e, index, 'Count')}
                fullWidth
                required
              />
              <TextField
                label="סוג כמות"
                value={ing.Type}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleIngredientChange(e, index, 'Type')}
                fullWidth
                required
              />
              <IconButton onClick={() => removeIngredient(index)}><DeleteIcon /></IconButton>
            </Box>
          ))}
          <Button onClick={addIngredient}>הוסף מרכיב</Button>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            הוסף מתכון
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddRecipe;
*/

import {
  Button,
  TextField,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRecipeContext } from './recipeContext'; // ודא שהנתיב נכון

interface Ingredents {
  Name: string;
  Count: string;
  Type: string;
}

interface Category {
  Id: string;
  Name: string;
  editing?: boolean;
  tempName?: string;
}

const AddRecipe = () => {
  const [form, setForm] = useState({
    Name: '',
    Img: '',
    Description: '',
    Instructions: [''],
    Difficulty: '',
    Duration: '',
    Categoryid: '',
    Ingridents: [{ Name: '', Count: '', Type: '' }],
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [duration, setDuration] = useState('');
  const [userId, setUserId] = useState('');

  const { fetchRecipes } = useRecipeContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user?.Id) {
      setUserId(user.Id);
    }
  }, []);
  

  useEffect(() => {
    fetch('http://localhost:8080/api/category')
      .then(res => res.json())
      .then(data => setCategories(data.map((c: Category) => ({ ...c, editing: false, tempName: c.Name }))))
      .catch(err => console.error('שגיאה בקבלת קטגוריות:', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleInstructionChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updated = [...form.Instructions];
    updated[index] = e.target.value;
    setForm(prev => ({ ...prev, Instructions: updated }));
  };

  const handleIngredientChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) => {
    const updated = [...form.Ingridents];
    updated[index] = { ...updated[index], [field]: e.target.value };
    setForm(prev => ({ ...prev, Ingridents: updated }));
  };

  const addInstruction = () => {
    setForm(prev => ({ ...prev, Instructions: [...prev.Instructions, ''] }));
  };

  const removeInstruction = (index: number) => {
    const updated = form.Instructions.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, Instructions: updated }));
  };

  const addIngredient = () => {
    setForm(prev => ({
      ...prev,
      Ingridents: [...prev.Ingridents, { Name: '', Count: '', Type: '' }],
    }));
  };

  const removeIngredient = (index: number) => {
    const updated = form.Ingridents.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, Ingridents: updated }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = Number(localStorage.getItem('userId'));
    const recipeId = crypto.randomUUID();

    const recipeData = {
      Id: recipeId,
      Name: form.Name,
      Instructions: form.Instructions,
      Difficulty: difficulty,
      Duration: duration,
      Description: form.Description,
      UserId: userId,
      Categoryid: form.Categoryid,
      Img: form.Img,
      Ingridents: form.Ingridents,
    };
    console.log('נשלח לשרת:', JSON.stringify(recipeData));

    try {
      const res = await fetch('http://localhost:8080/api/recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData),
      });

      if (res.ok) {
        console.log(recipeData)
        await fetchRecipes(); // מרענן את המתכונים בקונטקסט
        navigate('/recipes');
      } else {
        const errorText = await res.text();
        alert(`שגיאה בהוספת מתכון: ${errorText}`);
        
      }
    } catch (err) {
      console.error('שגיאה בהוספת מתכון:', err);
    }
  };

  const addCategory = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Id: crypto.randomUUID(), Name: newCategory }),
      });
      const newCat = await res.json();
      setCategories([...categories, { ...newCat, editing: false, tempName: newCat.Name }]);
      setNewCategory('');
    } catch (err) {
      console.error('שגיאה בהוספת קטגוריה:', err);
    }
  };



  return (
    <div style={{ marginTop: '200px', maxWidth: '600px', marginInline: '600px', marginBottom: '200px' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
        הוספת מתכון חדש
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="שם המתכון" name="Name" value={form.Name} onChange={handleChange} fullWidth required />
          <TextField label="תיאור" name="Description" value={form.Description} onChange={handleChange} fullWidth required />
          <TextField label="תמונה (URL)" name="Img" value={form.Img} onChange={handleChange} fullWidth required />

          <Box>
            <label htmlFor="difficulty">רמת קושי:</label><br />
            <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="">בחר רמת קושי</option>
              <option value="קל">קל</option>
              <option value="בינוני">בינוני</option>
              <option value="קשה">קשה</option>
            </select>
          </Box>

          <Box>
            <label htmlFor="Duration">משך הזמן:</label><br />
            <select id="duration" value={duration} onChange={(e) => setDuration(e.target.value)}>
              <option value="">בחר משך זמן</option>
              <option value="פחות מ30 דקות">פחות מ30 דק</option>
              <option value="30-60דק">30-60 דק</option>
              <option value="מעל 60דק">מעל 60דק</option>
            </select>
          </Box>

          {categories.map((cat) => (
            <Box key={cat.Id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                value={cat.editing ? cat.tempName : cat.Name}
                onChange={(e) => {
                  const updated = categories.map((c) =>
                    c.Id === cat.Id ? { ...c, tempName: e.target.value } : c
                  );
                  setCategories(updated);
                }}
                fullWidth
                disabled={!cat.editing}
              />

              <Button
                variant={form.Categoryid === cat.Id ? 'contained' : 'outlined'}
                onClick={() => setForm(prev => ({ ...prev, Categoryid: cat.Id }))}
              >
                בחר
              </Button>
            </Box>
          ))}

          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              label="קטגוריה חדשה"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              fullWidth
            />
            <Button onClick={addCategory}>הוסף</Button>
          </Box>

          <Typography>הוראות הכנה</Typography>
          {form.Instructions.map((inst, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                label={`שלב ${index + 1}`}
                value={inst}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInstructionChange(e, index)}
                fullWidth
                required
              />
              <IconButton onClick={() => removeInstruction(index)}><DeleteIcon /></IconButton>
            </Box>
          ))}
          <Button onClick={addInstruction}>הוסף שלב</Button>

          <Typography>מרכיבים</Typography>
          {form.Ingridents.map((ing, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                label="שם"
                value={ing.Name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleIngredientChange(e, index, 'Name')}
                fullWidth
                required
              />
              <TextField
                label="כמות"
                value={ing.Count}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleIngredientChange(e, index, 'Count')}
                fullWidth
                required
              />
              <TextField
                label="סוג כמות"
                value={ing.Type}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleIngredientChange(e, index, 'Type')}
                fullWidth
                required
              />
              <IconButton onClick={() => removeIngredient(index)}><DeleteIcon /></IconButton>
            </Box>
          ))}
          <Button onClick={addIngredient}>הוסף מרכיב</Button>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            הוסף מתכון
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddRecipe;
