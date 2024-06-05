import React from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const NameDisplay: React.FC = () => {
    const names = useSelector((state: RootState) => state.names.names);
    
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Typography variant="h5">Generated Names</Typography>
            <Box mt={2}>
                <List>
                    {names.map((name, index) => (
                        <ListItem key={index} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.1 }}>
                            <ListItemText primary={name} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </motion.div>
    );
};

export default NameDisplay;