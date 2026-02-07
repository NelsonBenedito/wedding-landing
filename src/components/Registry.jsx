import React, { useState } from 'react';
import GiftModal from './GiftModal';
import { Gift } from 'lucide-react';

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
        <section id="registry" className="min-h-screen flex items-center py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl mb-4 text-text-dark">Lista de Presentes</h2>
                    <p className="text-text-muted max-w-2xl mx-auto">
                        Sua presença é o maior presente, mas se quiser nos presentear para o início da nossa vida a dois, criamos algumas cotas simbólicas.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {giftItems.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedGift(item)}
                            className="bg-wedding-white p-8 text-center border border-gray-100 hover:border-champagne-gold/50 cursor-pointer transition-all shadow-sm hover:shadow-md group"
                        >
                            <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">
                                {item.icon}
                            </div>
                            <h3 className="font-serif text-xl mb-2 text-text-dark">{item.title}</h3>
                            <p className="text-champagne-gold font-medium mb-4">{item.price ? `R$${item.price}` : 'Valor à sua escolha'}</p>
                            <button className="text-xs uppercase tracking-widest border-b border-gray-300 group-hover:border-champagne-gold pb-1 transition-colors">
                                Presentear
                            </button>
                        </div>
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
