

import {
  Button,
  TextField,
  Typography,
  IconButton,
  Box,
  Select,
  MenuItem
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRecipeContext } from './recipeContext';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useAuth } from './authcontext';

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

interface FormData {
  Name: string;
  Img: string;
  Description: string;
  Instructions: { Name: string }[];
  Difficulty: string;
  Duration: string;
  Categoryid: string;
  Ingridents: Ingredents[];
}

const AddRecipe = () => {
  const { addRecipe } = useRecipeContext();
  const { fetchRecipes } = useRecipeContext();
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
//const [categoryid, setCategoryIdState] = useState('');  
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      Name: '',
      Img: '',
      Description: '',
      Instructions: [{ Name: '' }],
      Difficulty: '',
      Duration: '',
      Categoryid: '',
      Ingridents: [{ Name: '', Count: '', Type: '' }]
    }
  });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction
  } = useFieldArray({
    control,
    name: 'Instructions'
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient
  } = useFieldArray({
    control,
    name: 'Ingridents'
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userId') || '{}');
    if (user) {
      setUserId(user);
    }
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/api/category')
      .then(res => res.json())
      .then(data => setCategories(data.map((c: Category) => ({ ...c, editing: false, tempName: c.Name }))))
      .catch(err => console.error('שגיאה בקבלת קטגוריות:', err));
  }, []);

  const onSubmit = async (data: FormData) => {
    if (!userId) {
      alert("משתמש לא מזוהה. אנא התחבר שוב.");
      return;
    }

    const recipeData = {
      Id: crypto.randomUUID(),
      Name: data.Name,
      Img: data.Img,
      Description: data.Description,
      Difficulty: data.Difficulty,
      Duration: data.Duration,
      Categoryid: data.Categoryid,
      UserId: userId,
      Instructions: data.Instructions,
      Ingridents: data.Ingridents,
    };

    try {
      const res = await fetch('http://localhost:8080/api/recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData),
      });

      if (res.ok) {
        const newRecipe = await res.json();
        addRecipe(newRecipe);
        alert('המתכון נוסף בהצלחה');
        console.log('המתכון נוסף:', newRecipe);
        navigate('/home-recipes');
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="שם המתכון" {...register('Name', { required: true })} fullWidth />
          <TextField label="תיאור" {...register('Description', { required: true })} fullWidth />
          <TextField label="תמונה (URL)" {...register('Img', { required: true })} fullWidth />

          <Box>
            <label>רמת קושי:</label><br />
            <select {...register('Difficulty', { required: true })}>
              <option value="">בחר רמת קושי</option>
              <option value="קל">קל</option>
              <option value="בינוני">בינוני</option>
              <option value="קשה">קשה</option>
            </select>
          </Box>

          <Box>
            <label>משך הזמן:</label><br />
            <select {...register('Duration', { required: true })}>
              <option value="">בחר משך זמן</option>
              <option value="פחות מ30 דקות">פחות מ30 דק</option>
              <option value="30-60דק">30-60 דק</option>
              <option value="מעל 60דק">מעל 60דק</option>
            </select>
          </Box>
          <Controller
  control={control}
  name="Categoryid"
  rules={{ required: true }}
  render={({ field }) => (
    <Select
      {...field}
      fullWidth
      displayEmpty
    >
      <MenuItem value="">
        <em>בחר קטגוריה</em>
      </MenuItem>
      {categories.map((cat) => (
        <MenuItem key={cat.Id} value={cat.Id}>
          {cat.Name}
        </MenuItem>
      ))}
    </Select>
  )}
/>
{errors.Categoryid && (
  <span style={{ color: 'red' }}>יש לבחור קטגוריה</span>
)}

{/*           
           <Select
  label="קטגוריה"
  required
  value={categoryid}
  onChange={(e) => {
    const selected = e.target.value;
    setCategoryId(selected); // לעדכן סטייט מקומי
    setValue('Categoryid', selected);
 // לעדכן גם את React Hook Form
  }}
>
  {categories.map((cat) => (
    <MenuItem key={cat.Id} value={cat.Id}>
      {cat.Name}
    </MenuItem>
  ))}
</Select> */}


          {/* {categories.map((cat) => (
            
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
                variant={watch('Categoryid') === cat.Id ? 'contained' : 'outlined'}
                onClick={() => {
                  setValue('Categoryid', cat.Id);
                  setCategoryId(cat.Id); // עדכון דרך AuthContext
                }}
              >
                בחר
              </Button>  */}


            {/* </Box>
          ))} */}

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
          {instructionFields.map((field, index) => (
            <Box key={field.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Controller
                control={control}
                name={`Instructions.${index}.Name`}
                render={({ field }) => (
                  <TextField label={`שלב ${index + 1}`} {...field} fullWidth required />
                )}
              />
              <IconButton onClick={() => removeInstruction(index)}><DeleteIcon /></IconButton>
            </Box>
          ))}
          <Button onClick={() => appendInstruction({ Name: '' })}>הוסף שלב</Button>

          <Typography>מרכיבים</Typography>
          {ingredientFields.map((field, index) => (
            <Box key={field.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Controller
                control={control}
                name={`Ingridents.${index}.Name`}
                render={({ field }) => (
                  <TextField label="שם" {...field} fullWidth required />
                )}
              />
              <Controller
                control={control}
                name={`Ingridents.${index}.Count`}
                render={({ field }) => (
                  <TextField label="כמות" {...field} fullWidth required />
                )}
              />
              <Controller
                control={control}
                name={`Ingridents.${index}.Type`}
                render={({ field }) => (
                  <TextField label="סוג כמות" {...field} fullWidth required />
                )}
              />
              <IconButton onClick={() => removeIngredient(index)}><DeleteIcon /></IconButton>
            </Box>
          ))}
          <Button onClick={() => appendIngredient({ Name: '', Count: '', Type: '' })}>הוסף מרכיב</Button>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            הוסף מתכון
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddRecipe;
