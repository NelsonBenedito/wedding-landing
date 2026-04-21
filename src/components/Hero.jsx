import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black transition-colors duration-300">
            {/* Background Video */}
            <img
                className="absolute inset-0 w-full h-full object-cover object-[80%_75%]   md:object-center opacity-60 dark:opacity-40 transition-all duration-700"
                src="/Sarah&Nelson.jpg"
                alt="Sarah & Nelson"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-60" />

            <div className="container mx-auto px-4 z-10 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-white uppercase tracking-[0.3em] mb-4 text-sm md:text-base font-bold drop-shadow-md"
                >
                    Nós Vamos Casar
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="font-serif text-6xl md:text-8xl lg:text-9xl text-white mb-6 leading-tight drop-shadow-lg"
                >
                    Sarah <span className="text-seal-blue font-semibold drop-shadow-lg drop-shadow-white/20">&</span> Nelson
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="h-px w-24 bg-white/50 my-4" />
                    <p className="text-xl md:text-2xl text-gray-100 font-light tracking-widest italic font-serif drop-shadow-md">
                        22 de Agosto de 2026 • Santa Teresa, Brasil
                    </p>
                    <div className="h-px w-24 bg-white/50 my-4" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-12"
                >
                    <a href="#rsvp" className="inline-block bg-seal-blue text-white px-10 py-4 rounded-sm hover:bg-[#0A355A] transition-all duration-300 uppercase tracking-widest text-xs font-bold shadow-lg shadow-seal-blue/20">
                        Confirme sua presença
                    </a>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
            >
                <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/40" />
            </motion.div>
        </section>
    );
};

export default Hero;
