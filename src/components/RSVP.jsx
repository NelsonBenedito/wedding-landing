import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

const RSVP = () => {
    const [formData, setFormData] = useState({
        name: '',
        attendance: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validate = () => {
        let tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = "Nome é obrigatório";
        if (!formData.attendance) tempErrors.attendance = "Por favor, confirme sua presença";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);

            try {
                if (!supabase) {
                    throw new Error('Supabase client not initialized');
                }
                const { error } = await supabase
                    .from('rsvps')
                    .insert([
                        { name: formData.name, attendance: formData.attendance, message: formData.message }
                    ]);

                if (error) throw error;

                setIsSuccess(true);
            } catch (error) {
                console.error('Error submitting RSVP:', error);
                alert('Erro ao enviar resposta. Por favor, tente novamente.');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: null });
    };

    return (
        <section id="rsvp" className="min-h-screen flex items-center py-24 bg-[var(--background)] transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[var(--card-bg)] p-8 md:p-12 shadow-2xl dark:shadow-none rounded-sm border-t-4 border-champagne-gold transition-colors duration-300"
                >
                    <div className="text-center mb-10">
                        <h2 className="font-serif text-3xl md:text-5xl mb-4 text-text-primary">RSVP</h2>
                        <p className="text-text-secondary italic font-serif">Por favor, responda até 1º de Julho de 2026</p>
                        {!supabase && (
                            <p className="text-red-500 text-xs mt-6 bg-red-500/10 p-3 rounded-sm border border-red-500/20">
                                RSVP temporariamente indisponível.
                            </p>
                        )}
                    </div>

                    {isSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-10"
                        >
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
                                <Check size={40} />
                            </div>
                            <h3 className="font-serif text-3xl text-text-primary mb-2">Obrigado!</h3>
                            <p className="text-text-secondary">Sua resposta foi recebida com carinho.</p>
                            <button
                                onClick={() => { setIsSuccess(false); setFormData({ name: '', attendance: '', message: '' }); }}
                                className="mt-8 text-xs font-bold uppercase tracking-widest text-champagne-gold hover:text-[#B8860B] transition-colors"
                            >
                                Enviar outra resposta
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold text-text-secondary mb-3">Nome Completo <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full p-4 bg-transparent border ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} focus:outline-none focus:border-champagne-gold transition-colors text-text-primary text-sm rounded-sm`}
                                    placeholder="Nome(s) do(s) Convidado(s)"
                                />
                                {errors.name && <p className="text-[10px] text-red-500 mt-2 font-bold uppercase tracking-wider">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold text-text-secondary mb-3">Você poderá comparecer? <span className="text-red-500">*</span></label>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <label className="flex-1 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="attendance"
                                            value="yes"
                                            checked={formData.attendance === 'yes'}
                                            onChange={handleChange}
                                            className="peer sr-only"
                                        />
                                        <div className="p-4 text-center border border-gray-200 dark:border-white/10 peer-checked:border-champagne-gold peer-checked:bg-champagne-gold peer-checked:text-white transition-all hover:bg-gray-50 dark:hover:bg-white/5 text-sm font-bold uppercase tracking-widest text-text-secondary rounded-sm">
                                            Com Certeza!
                                        </div>
                                    </label>
                                    <label className="flex-1 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="attendance"
                                            value="no"
                                            checked={formData.attendance === 'no'}
                                            onChange={handleChange}
                                            className="peer sr-only"
                                        />
                                        <div className="p-4 text-center border border-gray-200 dark:border-white/10 peer-checked:border-gray-500 dark:peer-checked:border-gray-400 peer-checked:bg-gray-500 dark:peer-checked:bg-gray-400 peer-checked:text-white transition-all hover:bg-gray-50 dark:hover:bg-white/5 text-sm font-bold uppercase tracking-widest text-text-secondary rounded-sm">
                                            Infelizmente Não
                                        </div>
                                    </label>
                                </div>
                                {errors.attendance && <p className="text-[10px] text-red-500 mt-2 font-bold uppercase tracking-wider">{errors.attendance}</p>}
                            </div>

                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold text-text-secondary mb-3">Mensagem <span className="text-text-secondary/50 font-normal lowercase italic">(Opcional)</span></label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full p-4 bg-transparent border border-gray-200 dark:border-white/10 focus:outline-none focus:border-champagne-gold transition-colors text-text-primary text-sm resize-none rounded-sm"
                                    placeholder="Nos avise se tiver alguma restrição alimentar ou apenas deixe um recado..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-champagne-gold text-white py-5 font-bold uppercase tracking-[0.2em] hover:bg-[#B8860B] transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-champagne-gold/20 text-xs rounded-sm"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" size={18} /> Enviando...
                                    </>
                                ) : "Confirmar Presença"}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default RSVP;
