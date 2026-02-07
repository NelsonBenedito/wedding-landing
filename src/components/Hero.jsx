import React from 'react';

const Hero = () => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-wedding-white">
            {/* Background Decorative Circles */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] rounded-full bg-champagne-gold/5 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60vh] h-[60vh] rounded-full bg-champagne-gold/10 blur-[150px]" />

            <div className="container mx-auto px-4 z-10 text-center">
                <p
                    className="text-champagne-gold uppercase tracking-[0.3em] mb-4 text-sm md:text-base font-semibold"
                >
                    Nós Vamos Casar
                </p>

                <h1
                    className="font-serif text-6xl md:text-8xl lg:text-9xl text-text-dark mb-6 leading-tight"
                >
                    Sarah <span className="text-champagne-gold font-light">&</span> Nelson
                </h1>

                <div
                    className="flex flex-col items-center gap-4"
                >
                    <div className="h-px w-24 bg-champagne-gold/50 my-4" />
                    <p className="text-xl md:text-2xl text-text-muted font-light tracking-wide">
                        22 de Agosto de 2026 • Santa Teresa, Brasil
                    </p>
                    <div className="h-px w-24 bg-champagne-gold/50 my-4" />
                </div>

                <div
                    className="mt-12"
                >
                    <a href="#rsvp" className="inline-block border border-champagne-gold text-champagne-gold px-8 py-3 rounded-full hover:bg-champagne-gold hover:text-white transition-all duration-300 uppercase tracking-widest text-sm">
                        Junte-se à Nossa Celebração
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-champagne-gold/50"
            >
                <div className="w-px h-16 bg-gradient-to-b from-transparent to-champagne-gold/50" />
            </div>
        </section>
    );
};

export default Hero;
