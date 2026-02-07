import React from 'react';
import { motion } from 'framer-motion';

const OurStory = () => {
    return (
        <section id="story" className="min-h-screen flex items-center py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 aspect-[4/5] bg-gray-100 relative overflow-hidden rounded-sm"
                    >
                        {/* Placeholder for Couple Photo */}
                        <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center text-text-muted">
                            <img src="/us.jpg" alt="Couple" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-champagne-gold/20 -z-10" />
                        <div className="absolute -top-4 -left-4 w-32 h-32 border border-champagne-gold/30 -z-10" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 text-center md:text-left"
                    >
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-text-dark">Nossa História</h2>
                        <p className="text-text-muted leading-relaxed mb-6 font-light">
                            Dizem que o tempo de Deus é perfeito, e a nossa história é a prova viva de que Ele cuida de cada detalhe, mesmo quando ainda não percebemos. Por anos, frequentamos o mesmo contexto, ouvimos as mesmas mensagens e compartilhamos os mesmos ambientes na igreja. Estávamos lá, nos mesmos eventos, talvez a poucos metros de distância, mas nossos olhos ainda não haviam se cruzado de verdade.
                            Tudo começou a mudar no início de 2023. Através de uma ajuda externa muito especial — uma amiga em comum que viu o que nós ainda não tínhamos enxergado — nossos nomes começaram a surgir nas conversas um do outro. A partir dali, o que antes era invisível tornou-se notável: passamos a nos reparar com um novo olhar e o coração mais atento.
                            O início dessa caminhada aconteceu de forma leve e despretensiosa. No dia 6 de agosto de 2023, a Sarah enviou uma mensagem comentando um story do Nelson, dando início a uma conversa que nunca mais terminou. O que nasceu como uma amizade sincera rapidamente revelou o cuidado de Deus, conduzindo nossos passos até o início do nosso namoro em 14 de outubro de 2023.
                        </p>
                        <p className="text-text-muted leading-relaxed font-light">
                            Hoje, ao olharmos para trás, não vemos uma sucessão de coincidências, mas o soberano agir de Deus orquestrando cada detalhe. Entendemos que Ele nos permitiu crescer no mesmo jardim para que, no tempo d'Ele, florescêssemos juntos. Nossa união não é fruto do acaso, mas o cumprimento de um propósito do Senhor, que nos preparou um para o outro para caminharmos sob a Sua bênção.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default OurStory;
