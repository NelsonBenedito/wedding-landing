import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Header = ({ theme, toggleTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Nossa História', href: '#story' },
        { label: 'Cerimônia', href: '#ceremony' },
        { label: 'RSVP', href: '#rsvp' },
        { label: 'Lista de Presentes', href: '#registry' },
    ];

    return (
        <header
            className={cn(
                "sticky md:fixed md:left-0 top-0 right-0 z-50 transition-all duration-300",
                isScrolled ? "bg-[var(--header-bg)] backdrop-blur-md shadow-sm py-4 border-b border-gray-100 dark:border-white/5" : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <a href="#" className="font-serif text-2xl font-semibold dark:text-gray-100 text-text-dark tracking-wide">
                    Sarah <span className="text-champagne-gold">&</span> Nelson
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-sm uppercase tracking-widest hover:text-champagne-gold transition-colors duration-200 text-text-primary"
                        >
                            {link.label}
                        </a>
                    ))}
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                    <a href="#rsvp" className="bg-champagne-gold text-white px-6 py-2 rounded-full hover:bg-[#B8860B] transition-colors duration-300 shadow-md">
                        Confirmar Presença
                    </a>
                </nav>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 md:hidden">
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                    <button
                        className="text-text-primary"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[var(--card-bg)] border-t border-gray-100 dark:border-white/5 overflow-hidden"
                    >
                        <nav className="flex flex-col p-4 space-y-4 items-center mb-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-text-dark font-medium hover:text-champagne-gold"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
