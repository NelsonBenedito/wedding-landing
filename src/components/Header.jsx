import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

const Header = () => {
    /* const [isScrolled, setIsScrolled] = useState(false); */
    /*     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); */

    /* useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []); */

    /*  const navLinks = [
         { label: 'Nossa História', href: '#story' },
         { label: 'Cerimônia', href: '#ceremony' },
         { label: 'RSVP', href: '#rsvp' },
         { label: 'Lista de Presentes', href: '#registry' },
     ]; */

    return (
        <header
            className={"fixed top-0 left-0 right-0 z-50"}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <a href="#" className="font-serif text-2xl font-semibold text-text-dark tracking-wide">
                    Sarah <span className="text-champagne-gold">&</span> Nelson
                </a>

                {/* Desktop Nav */}
                {/* <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-sm uppercase tracking-widest hover:text-champagne-gold transition-colors duration-200"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a href="#rsvp" className="bg-champagne-gold text-white px-6 py-2 rounded-full hover:bg-[#B8860B] transition-colors duration-300 shadow-md">
                        Confirmar Presença
                    </a>
                </nav> */}

                {/* Mobile Menu Button */}
                {/* <button
                    className="md:hidden text-text-dark"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button> */}
            </div>

            {/* Mobile Nav */}
            {/* {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 overflow-hidden">
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
                </div>
            )} */}
        </header>
    );
};

export default Header;
