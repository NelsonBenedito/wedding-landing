import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-200 text-text-primary focus:outline-none"
            title={theme === 'light' ? 'Ativar Modo Escuro' : 'Ativar Modo Claro'}
        >
            {theme === 'light' ? (
                <Moon size={20} className="text-text-secondary" />
            ) : (
                <Sun size={20} className="text-champagne-gold" />
            )}
        </motion.button>
    );
};

export default ThemeToggle;
