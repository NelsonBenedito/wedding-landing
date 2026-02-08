import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Mail, Lock, ArrowLeft } from 'lucide-react'
import ThemeToggle from '../components/ThemeToggle'

export default function Login({ theme, toggleTheme }) {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleHome = () => {
        navigate('/')
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            alert(error.error_description || error.message)
        } else {
            navigate('/dashboard')
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-4 transition-colors duration-300">
            <div className="absolute top-8 right-8">
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-block p-4 bg-champagne-gold/10 rounded-full mb-4"
                    >
                        <Heart className="text-champagne-gold" size={32} fill="currentColor" />
                    </motion.div>
                    <h1 className="text-3xl font-serif text-text-primary mb-2">Painel de Controle</h1>
                    <p className="text-text-secondary text-sm uppercase tracking-widest">Acesso Restrito</p>
                </div>

                <div className="bg-[var(--card-bg)] shadow-xl rounded-sm overflow-hidden border border-gray-100 dark:border-white/5 transition-colors duration-300">
                    <form onSubmit={handleLogin} className="p-8 md:p-10">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-bold" htmlFor="email">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-200 dark:border-white/10 rounded-sm text-text-primary focus:outline-none focus:border-champagne-gold transition-colors text-sm"
                                        id="email"
                                        type="email"
                                        placeholder="seu@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-text-secondary mb-2 font-bold" htmlFor="password">
                                    Senha
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-200 dark:border-white/10 rounded-sm text-text-primary focus:outline-none focus:border-champagne-gold transition-colors text-sm"
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            className="w-full mt-10 bg-champagne-gold text-white font-bold py-4 rounded-sm hover:bg-[#B8860B] transition-colors duration-300 shadow-md uppercase tracking-widest text-xs disabled:opacity-50"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Acessando...' : 'Entrar no Painel'}
                        </button>
                    </form>

                    <div className="px-8 pb-8 text-center">
                        <button
                            onClick={handleHome}
                            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-text-secondary hover:text-champagne-gold transition-colors font-bold"
                        >
                            <ArrowLeft size={14} />
                            Voltar para o site
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
