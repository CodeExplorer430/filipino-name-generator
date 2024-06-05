import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Box } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setNames } from '../redux/namesSlice';
import Tooltip from '@mui/material/Tooltip';
import { SelectChangeEvent } from '@mui/material/Select';

const NameGeneratorForm: React.FC = () => {
    const [formData, setFormData] = useState({
        gender: '',
        generation: '',
        nameType: '',
        suffix: false,
    });
    const dispatch = useDispatch();
    
    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleChangeSelect = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await axios.post('/api/generate', formData);
        dispatch(setNames(response.data));
    };
    
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <form onSubmit={handleSubmit}>
                <Tooltip title="Select the gender for the name" arrow>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Gender</InputLabel>
                        <Select name="gender" value={formData.gender} onChange={handleChangeSelect}>
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="any">Any</MenuItem>
                        </Select>
                    </FormControl>
                </Tooltip>
                <Tooltip title="Select the generation for the name" arrow>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Generation</InputLabel>
                        <Select name="generation" value={formData.generation} onChange={handleChangeSelect}>
                            <MenuItem value="milllenial">Millenial</MenuItem>
                            <MenuItem value="genz">Gen Z</MenuItem>
                        </Select>
                    </FormControl>
                </Tooltip>
                <Tooltip title="Specify the type of name" arrow>
                    <TextField
                        name="nameType"
                        label="Name Type"
                        value={formData.nameType}
                        onChange={handleChangeText}
                        fullWidth
                        margin="normal"
                    />
                </Tooltip>
                <FormControlLabel
                    control={<Checkbox checked={formData.suffix} onChange={handleChangeText} name="suffix" />}
                    label="Include Suffix"
                />
                <Box mt={2}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Generate
                    </Button>
                </Box>
            </form>
        </motion.div>
    );
};

export default NameGeneratorForm;