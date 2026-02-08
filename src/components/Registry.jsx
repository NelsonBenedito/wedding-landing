import React, { useState } from 'react';
import GiftModal from './GiftModal';
import { Gift } from 'lucide-react';
import { motion } from 'framer-motion';

const giftItems = [
    { id: 1, title: 'Lua de Mel', price: 100, icon: '✈️' },
    { id: 2, title: 'Jantar Romântico', price: 150, icon: '🍷' },
    { id: 3, title: 'Reforma da Casa Nova', price: 200, icon: '🏡' },
    { id: 4, title: 'Dia de Spa', price: 120, icon: '💆‍♀️' },
    { id: 5, title: 'Máquina de Café', price: 250, icon: '☕' },
    { id: 6, title: 'Jogo de Panelas', price: 300, icon: '🍳' },
    { id: 'custom', title: 'Outro Valor', price: null, icon: '✨' },
];

const Registry = () => {
    const [selectedGift, setSelectedGift] = useState(null);

    return (
        <section id="registry" className="min-h-screen flex items-center py-24 bg-[var(--background)] transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-text-primary">Lista de Presentes</h2>
                    <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-base italic font-serif">
                        Sua presença é o maior presente, mas se quiser nos presentear para o início da nossa vida a dois, criamos algumas cotas simbólicas.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {giftItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            onClick={() => setSelectedGift(item)}
                            className="bg-[var(--card-bg)] p-10 text-center border border-gray-100 dark:border-white/5 hover:border-champagne-gold/50 cursor-pointer transition-all shadow-sm hover:shadow-xl dark:shadow-none duration-300 group rounded-sm"
                        >
                            <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
                                {item.icon}
                            </div>
                            <h3 className="font-serif text-2xl mb-2 text-text-primary">{item.title}</h3>
                            <p className="text-champagne-gold font-bold mb-6 text-lg">{item.price ? `R$ ${item.price}` : 'Valor à sua escolha'}</p>
                            <button className="text-[10px] uppercase tracking-[0.2em] font-bold border-b border-gray-200 dark:border-white/10 group-hover:border-champagne-gold pb-1 transition-colors text-text-secondary group-hover:text-champagne-gold">
                                Presentear
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {selectedGift && (
                <GiftModal
                    gift={selectedGift}
                    onClose={() => setSelectedGift(null)}
                />
            )}
        </section>
    );
};

export default Registry;
