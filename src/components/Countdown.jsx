import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Countdown = () => {
    const targetDate = new Date('2026-08-22T00:00:00').getTime();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft(); // Run once immediately

        return () => clearInterval(timer);
    }, [targetDate]);

    const TimeUnit = ({ value, label }) => (
        <div className="flex flex-col items-center">
            <div className="bg-[var(--card-bg)] w-16 h-20 md:w-28 md:h-32 rounded-lg shadow-xl flex flex-col items-center justify-center border border-gray-100 dark:border-white/5 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl">
                <span className="font-serif text-2xl md:text-5xl text-[#0F4C81] mb-1">{value.toString().padStart(2, '0')}</span>
                <div className="h-px w-8 bg-[#0F4C81]/10 mb-2 hidden md:block" />
                <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-text-secondary">{label}</span>
            </div>
        </div>
    );

    return (
        <section className="py-24 bg-[var(--background)] transition-colors duration-300 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-serif text-3xl md:text-5xl mb-16 text-text-primary"
                    >
                        Contagem Regressiva
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-4 gap-3 md:gap-8 max-w-3xl mx-auto"
                    >
                        <TimeUnit value={timeLeft.days} label="Dias" />
                        <TimeUnit value={timeLeft.hours} label="Horas" />
                        <TimeUnit value={timeLeft.minutes} label="Minutos" />
                        <TimeUnit value={timeLeft.seconds} label="Segundos" />
                    </motion.div>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-16 text-text-secondary italic font-serif text-lg"
                    >
                        Mal podemos esperar para celebrar este dia!
                    </motion.p>
                </div>
            </div>
        </section>
    );
};

export default Countdown;
