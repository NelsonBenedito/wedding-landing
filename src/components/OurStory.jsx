import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
    '/Sarah&Nelson2.webp',
    '/Sarah&Nelson3.webp',
    '/Sarah&Nelson4.webp',
    '/Sarah&Nelson5.webp',
    '/Sarah&Nelson7.webp',
    '/Sarah&Nelson8.webp',
    '/Sarah&Nelson9.webp',
    '/Sarah&Nelson10.webp',
    '/Sarah&Nelson11.webp',
    '/Sarah&Nelson12.webp',
    '/Sarah&Nelson13.webp',
    '/Sarah&Nelson14.webp',
    '/Sarah&Nelson15.webp',
    '/Sarah&Nelson16.webp',
];

const OurStory = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0
        })
    };

    return (
        <section id="story" className="min-h-screen flex items-center py-20 bg-background transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 w-full aspect-[4/5] relative overflow-hidden rounded-lg shadow-2xl group"
                    >
                        <AnimatePresence initial={false} custom={direction} mode="popLayout">
                            <motion.img
                                key={currentIndex}
                                src={images[currentIndex]}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.5 }
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={1}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = offset.x * velocity.x;
                                    const swipeThreshold = 10000;
                                    if (swipe < -swipeThreshold) {
                                        handleNext();
                                    } else if (swipe > swipeThreshold) {
                                        handlePrev();
                                    }
                                }}
                                className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing touch-pan-y"
                                loading="lazy"
                            />
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            <button
                                onClick={handlePrev}
                                className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={handleNext}
                                className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        {/* Pagination Dots */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setDirection(idx > currentIndex ? 1 : -1);
                                        setCurrentIndex(idx);
                                    }}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>

                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#0F4C81]/10 -z-10" />
                        <div className="absolute -top-4 -left-4 w-32 h-32 border border-[#0F4C81]/20 -z-10" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 text-center md:text-left"
                    >
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-text-primary">Nossa História</h2>
                        <div className="space-y-6">
                            <p className="text-text-secondary leading-relaxed font-light first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-[#0F4C81] dark:first-letter:text-seal-blue-light">
                                Dizem que o tempo de Deus é perfeito, e a nossa história é a prova viva de que Ele cuida de cada detalhe, mesmo quando ainda não percebemos. Por anos, frequentamos o mesmo contexto, ouvimos as mesmas mensagens e compartilhamos os mesmos ambientes na igreja. Estávamos lá, nos mesmos eventos, talvez a poucos metros de distância, mas nossos olhos ainda não haviam se cruzado de verdade.
                            </p>
                            <p className="text-text-secondary leading-relaxed font-light">
                                Tudo começou a mudar no início de 2023. Através de uma ajuda externa muito especial — uma amiga em comum que viu o que nós ainda não tínhamos enxergado — nossos nomes começaram a surgir nas conversas um do outro. A partir dali, o que antes era invisível tornou-se notável: passamos a nos reparar com um novo olhar e o coração mais atento.
                            </p>
                            <p className="text-text-secondary leading-relaxed font-light">
                                O início dessa caminhada aconteceu de forma leve e despretensiosa. No dia 6 de agosto de 2023, a Sarah enviou uma mensagem comentando um story do Nelson, dando início a uma conversa que nunca mais terminou. O que nasceu como uma amizade sincera rapidamente revelou o cuidado de Deus, conduzindo nossos passos até o início do nosso namoro em 14 de outubro de 2023.
                            </p>
                            <p className="text-text-secondary leading-relaxed font-light">
                                Hoje, ao olharmos para trás, não vemos uma sucessão de coincidências, mas o soberano agir de Deus orquestrando cada detalhe. Entendemos que Ele nos permitiu crescer no mesmo jardim para que, no tempo d'Ele, florescêssemos juntos. Nossa união não é fruto do acaso, mas o cumprimento de um propósito do Senhor, que nos preparou um para o outro para caminharmos sob a Sua bênção.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default OurStory;
