import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Ceremony = () => {
    return (
        <section id="ceremony" className="min-h-screen flex items-center py-20 bg-wedding-white relative">
            <div className="absolute inset-0 opacity-20 pointer-events-none"></div>

            <div className="container mx-auto px-4 text-center z-10 relative">
                <h2
                    className="font-serif text-4xl md:text-5xl mb-12 text-text-dark"
                >
                    A Cerimônia e Recepção
                </h2>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div
                        className="bg-white p-10 shadow-sm border border-champagne-gold/20"
                    >
                        <div className="w-16 h-16 bg-champagne-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-champagne-gold">
                            <Clock size={32} />
                        </div>
                        <h3 className="font-serif text-2xl mb-4">Quando</h3>
                        <p className="text-text-dark font-medium">22 de Agosto de 2026</p>
                        <p className="text-text-muted mt-2">Cerimônia: 11:00</p>
                        <p className="text-text-muted">Recepção a seguir</p>
                    </div>

                    <a href="https://maps.app.goo.gl/83CpDWFnYuHJ6FwZ6" target="_blank" className="inline-block mt-4 text-sm text-champagne-gold border-champagne-gold hover:text-text-dark transition-colors">
                        <div
                            className="bg-white p-10 shadow-sm border border-champagne-gold/20"
                        >
                            <div className="w-16 h-16 bg-champagne-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-champagne-gold">
                                <MapPin size={32} />
                            </div>
                            <h3 className="font-serif text-2xl mb-4">Onde</h3>
                            <p className="text-text-dark font-medium">Sítio Só no Céu</p>
                            <p className="text-text-muted mt-2">Rodovia Valdir Loureiro de Almeida, Km 65 5 s/n Caldeirão</p>
                            <p className="text-text-muted">Serra dos Pregos, Santa Teresa - ES</p>
                            <p>Ver Mapa</p>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Ceremony;
