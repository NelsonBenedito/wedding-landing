import React from 'react';
import { MapPin, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Ceremony = () => {
    return (
        <section id="ceremony" className="min-h-screen flex items-center py-20 bg-[var(--background)] transition-colors duration-300 relative">
            <div className="absolute inset-0 opacity-20 pointer-events-none"></div>

            <div className="container mx-auto px-4 text-center z-10 relative">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-serif text-4xl md:text-5xl mb-12 text-[var(--text-primary)]"
                >
                    A Cerimônia e Recepção
                </motion.h2>

                <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Casamento%20Sarah%20%26%20Nelson&dates=20260822T140000Z/20260823T030000Z&details=Celebra%C3%A7%C3%A3o%20do%20nosso%20casamento!%20Esperamos%20voc%C3%AA%20para%20celebrar%20conosco.&location=S%C3%ADtio%20S%C3%B3%20no%20C%C3%A9u%20-%20Santa%20Teresa%2C%20ES"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-[var(--card-bg)] p-10 shadow-sm border border-champagne-gold/20 transition-colors duration-300"
                    >
                        <div className="w-16 h-16 bg-champagne-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-champagne-gold">
                            <Clock size={32} />
                        </div>
                        <h3 className="text-[var(--text-primary)] font-serif text-2xl mb-4">Quando</h3>
                        <p className="text-[var(--text-primary)] font-medium">22 de Agosto de 2026</p>
                        <p className="text-[var(--text-secondary)] mt-2">Cerimônia: 11:00</p>
                        <p className="text-[var(--text-secondary)]">Recepção a seguir</p>
                        <a
                            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Casamento%20Sarah%20%26%20Nelson&dates=20260822T140000Z/20260823T030000Z&details=Celebra%C3%A7%C3%A3o%20do%20nosso%20casamento!%20Esperamos%20voc%C3%AA%20para%20celebrar%20conosco.&location=S%C3%ADtio%20S%C3%B3%20no%20C%C3%A9u%20-%20Santa%20Teresa%2C%20ES"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center gap-2 text-champagne-gold hover:text-[var(--text-primary)] transition-colors font-medium border border-champagne-gold/30 px-4 py-2 rounded-sm text-sm"
                        >
                            <Calendar size={16} />
                            Adicionar à Agenda
                        </a>
                    </motion.div>

                    <a href="https://maps.app.goo.gl/83CpDWFnYuHJ6FwZ6" target="_blank" className="inline-block mt-4 text-sm text-champagne-gold border-champagne-gold hover:text-[var(--text-primary)] transition-colors">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-[var(--card-bg)] p-10 shadow-sm border border-champagne-gold/20 transition-colors duration-300"
                        >
                            <div className="w-16 h-16 bg-champagne-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-champagne-gold">
                                <MapPin size={32} />
                            </div>
                            <h3 className="text-[var(--text-primary)] font-serif text-2xl mb-4">Onde</h3>
                            <p className="text-[var(--text-primary)] font-medium">Sítio Só no Céu</p>
                            <p className="text-[var(--text-secondary)] mt-2">Rodovia Valdir Loureiro de Almeida, Km 65 5 s/n Caldeirão</p>
                            <p className="text-[var(--text-secondary)]">Serra dos Pregos, Santa Teresa - ES</p>
                            <div className="mt-4 inline-flex items-center gap-2 text-champagne-gold font-medium">
                                Ver Mapa
                            </div>
                        </motion.div>
                    </a>
                </a>
            </div>
        </section>
    );
};

export default Ceremony;
