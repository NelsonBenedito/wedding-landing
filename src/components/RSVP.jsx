import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
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
        <section id="rsvp" className="min-h-screen flex items-center py-20 bg-champagne-gold/5">
            <div className="container mx-auto px-4 max-w-2xl">
                <div
                    className="bg-white p-8 md:p-12 shadow-md rounded-sm border-t-4 border-champagne-gold"
                >
                    <div className="text-center mb-10">
                        <h2 className="font-serif text-3xl md:text-4xl mb-4 text-text-dark">RSVP</h2>
                        <p className="text-text-muted">Por favor, responda até 1º de Julho de 2026</p>
                        {!supabase && (
                            <p className="text-red-500 text-sm mt-4 bg-red-50 p-2 rounded">
                                RSVP temporariamente indisponível (Chaves de API faltando).
                            </p>
                        )}
                    </div>

                    {isSuccess ? (
                        <div
                            className="text-center py-10"
                        >
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                                <Check size={40} />
                            </div>
                            <h3 className="font-serif text-2xl mb-2">Obrigado!</h3>
                            <p className="text-text-muted">Sua resposta foi recebida.</p>
                            <button
                                onClick={() => { setIsSuccess(false); setFormData({ name: '', attendance: '', message: '' }); }}
                                className="mt-8 text-sm text-champagne-gold hover:underline"
                            >
                                Enviar outra resposta
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-2">Nome Completo <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:border-champagne-gold transition-colors bg-wedding-white`}
                                    placeholder="Nome(s) do(s) Convidado(s)"
                                />
                                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-2">Você poderá comparecer? <span className="text-red-500">*</span></label>
                                <div className="flex gap-4">
                                    <label className="flex-1 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="attendance"
                                            value="yes"
                                            checked={formData.attendance === 'yes'}
                                            onChange={handleChange}
                                            className="peer sr-only"
                                        />
                                        <div className="p-3 text-center border border-gray-200 peer-checked:border-champagne-gold peer-checked:bg-champagne-gold peer-checked:text-white transition-all hover:bg-gray-50">
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
                                        <div className="p-3 text-center border border-gray-200 peer-checked:border-text-muted peer-checked:bg-text-muted peer-checked:text-white transition-all hover:bg-gray-50">
                                            Infelizmente Não
                                        </div>
                                    </label>
                                </div>
                                {errors.attendance && <p className="text-xs text-red-500 mt-1">{errors.attendance}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-2">Mensagem <span className="text-gray-400 font-normal">(Opcional)</span></label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full p-3 border border-gray-200 focus:outline-none focus:border-champagne-gold transition-colors bg-wedding-white resize-none"
                                    placeholder="Nos avise se tiver alguma alergia..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-champagne-gold text-white py-4 font-medium uppercase tracking-widest hover:bg-[#B8860B] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} /> Enviando...
                                    </>
                                ) : "Enviar Resposta"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default RSVP;
