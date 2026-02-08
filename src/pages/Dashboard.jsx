import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Trash2, Plus, CheckCircle, Clock, Pencil } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from '../components/ThemeToggle'

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="bg-white rounded-sm shadow-xl max-w-sm w-full overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <h3 className="text-xl font-serif text-text-dark mb-2">{title || 'Confirmar Exclusão'}</h3>
                            <p className="text-sm text-text-muted leading-relaxed">
                                {message || 'Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita.'}
                            </p>
                        </div>
                        <div className="flex border-t border-gray-100">
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-4 text-xs font-bold uppercase tracking-widest text-text-muted hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className="flex-1 px-4 py-4 text-xs font-bold uppercase tracking-widest text-white bg-red-500 hover:bg-red-600 transition-colors"
                            >
                                Confirmar
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

const EditGiftModal = ({ isOpen, onClose, onSave, gift }) => {
    const [formData, setFormData] = useState({ donor_name: '', amount: '', message: '' })

    useEffect(() => {
        if (gift) setFormData({ donor_name: gift.donor_name, amount: gift.amount, message: gift.message || '' })
    }, [gift])

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(gift.id, formData)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="bg-white rounded-sm shadow-xl max-w-md w-full overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="p-8">
                                <h3 className="text-2xl font-serif text-text-dark mb-6">Editar Presente</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-text-muted mb-1 font-bold">Doador</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full text-sm p-3 border border-gray-200 focus:outline-none focus:border-champagne-gold transition-colors"
                                            value={formData.donor_name}
                                            onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-text-muted mb-1 font-bold">Valor (R$)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            required
                                            className="w-full text-sm p-3 border border-gray-200 focus:outline-none focus:border-champagne-gold transition-colors"
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-text-muted mb-1 font-bold">Mensagem</label>
                                        <textarea
                                            className="w-full text-sm p-3 border border-gray-200 focus:outline-none focus:border-champagne-gold transition-colors h-24"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-4 py-5 text-xs font-bold uppercase tracking-widest text-text-muted hover:bg-gray-50 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-5 text-xs font-bold uppercase tracking-widest text-white bg-champagne-gold hover:bg-[#B8860B] transition-colors"
                                >
                                    Salvar Alterações
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

const EditExpenseModal = ({ isOpen, onClose, onSave, expense }) => {
    const [formData, setFormData] = useState({ description: '', amount: '', category: '', status: '' })

    useEffect(() => {
        if (expense) setFormData({
            description: expense.description,
            amount: expense.amount,
            category: expense.category || '',
            status: expense.status
        })
    }, [expense])

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(expense.id, formData)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="bg-white rounded-sm shadow-xl max-w-md w-full overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="p-8">
                                <h3 className="text-2xl font-serif text-text-dark mb-6">Editar Despesa</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-text-muted mb-1 font-bold">Descrição</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full text-sm p-3 border border-gray-200 focus:outline-none focus:border-champagne-gold transition-colors"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-text-muted mb-1 font-bold">Valor (R$)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            required
                                            className="w-full text-sm p-3 border border-gray-200 focus:outline-none focus:border-champagne-gold transition-colors"
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-text-muted mb-1 font-bold">Categoria</label>
                                        <select
                                            className="w-full text-sm p-3 border border-gray-200 focus:outline-none focus:border-champagne-gold transition-colors"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option value="">Selecione...</option>
                                            <option value="Buffet & Bebidas">Buffet & Bebidas</option>
                                            <option value="Local & Decoração">Local & Decoração</option>
                                            <option value="Foto & Vídeo">Foto & Vídeo</option>
                                            <option value="Trajes">Trajes</option>
                                            <option value="Papelaria">Papelaria</option>
                                            <option value="Música">Música</option>
                                            <option value="Outros">Outros</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-text-muted mb-1 font-bold">Status</label>
                                        <select
                                            className="w-full text-sm p-3 border border-gray-200 focus:outline-none focus:border-champagne-gold transition-colors"
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        >
                                            <option value="pending">Pendente</option>
                                            <option value="paid">Pago</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-4 py-5 text-xs font-bold uppercase tracking-widest text-text-muted hover:bg-gray-50 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-5 text-xs font-bold uppercase tracking-widest text-white bg-red-800 hover:bg-red-900 transition-colors"
                                >
                                    Salvar Alterações
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default function Dashboard({ theme, toggleTheme }) {
    const [rsvps, setRsvps] = useState([])
    const [gifts, setGifts] = useState([])
    const [expenses, setExpenses] = useState([])
    const [loading, setLoading] = useState(true)

    // Form states
    const [newGift, setNewGift] = useState({ donor_name: '', amount: '', message: '' })
    const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: '', status: 'pending' })

    // Modal state
    const [confirmData, setConfirmData] = useState({ isOpen: false, onConfirm: null, title: '', message: '' })
    const [editingGift, setEditingGift] = useState(null)
    const [editingExpense, setEditingExpense] = useState(null)

    // Tab state
    const [activeTab, setActiveTab] = useState('presence') // 'presence' or 'finance'

    const navigate = useNavigate()

    useEffect(() => {
        getProfile()
        fetchAllData()
    }, [])

    const fetchAllData = async () => {
        setLoading(true)
        await Promise.all([
            fetchRsvps(),
            fetchGifts(),
            fetchExpenses()
        ])
        setLoading(false)
    }

    const getProfile = async () => {
        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
            navigate('/login')
        }
    }

    const fetchRsvps = async () => {
        try {
            let { data, error } = await supabase
                .from('rsvps')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setRsvps(data || [])
        } catch (error) {
            console.error('Error fetching RSVPs:', error.message)
        }
    }

    const fetchGifts = async () => {
        try {
            let { data, error } = await supabase
                .from('gifts')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setGifts(data || [])
        } catch (error) {
            console.error('Error fetching gifts:', error.message)
        }
    }

    const fetchExpenses = async () => {
        try {
            let { data, error } = await supabase
                .from('expenses')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setExpenses(data || [])
        } catch (error) {
            console.error('Error fetching expenses:', error.message)
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/login')
    }
    const handleHome = () => {
        navigate('/')
    }

    const handleDeleteRsvp = async (id) => {
        setConfirmData({
            isOpen: true,
            title: 'Excluir Convidado',
            message: 'Tem certeza que deseja excluir este convidado da lista?',
            onConfirm: async () => {
                try {
                    const { error } = await supabase
                        .from('rsvps')
                        .delete()
                        .eq('id', id)

                    if (error) throw error
                    fetchRsvps()
                } catch (error) {
                    alert('Erro ao excluir convidado: ' + error.message)
                }
            }
        })
    }

    const handleAddGift = async (e) => {
        e.preventDefault()
        try {
            const { error } = await supabase.from('gifts').insert([newGift])
            if (error) throw error
            setNewGift({ donor_name: '', amount: '', message: '' })
            fetchGifts()
        } catch (error) {
            alert('Erro ao adicionar presente: ' + error.message)
        }
    }

    const handleDeleteGift = async (id) => {
        setConfirmData({
            isOpen: true,
            title: 'Excluir Presente',
            message: 'Deseja remover este registro de presente do sistema?',
            onConfirm: async () => {
                try {
                    const { error } = await supabase.from('gifts').delete().eq('id', id)
                    if (error) throw error
                    fetchGifts()
                } catch (error) {
                    alert('Erro ao excluir presente: ' + error.message)
                }
            }
        })
    }

    const handleUpdateGift = async (id, updatedData) => {
        try {
            const { error } = await supabase
                .from('gifts')
                .update(updatedData)
                .eq('id', id)
            if (error) throw error
            setEditingGift(null)
            fetchGifts()
        } catch (error) {
            alert('Erro ao atualizar presente: ' + error.message)
        }
    }

    const handleAddExpense = async (e) => {
        e.preventDefault()
        try {
            const { error } = await supabase.from('expenses').insert([newExpense])
            if (error) throw error
            setNewExpense({ description: '', amount: '', category: '', status: 'pending' })
            fetchExpenses()
        } catch (error) {
            alert('Erro ao adicionar despesa: ' + error.message)
        }
    }

    const handleDeleteExpense = async (id) => {
        setConfirmData({
            isOpen: true,
            title: 'Excluir Despesa',
            message: 'Esta despesa será removida permanentemente do controle financeiro.',
            onConfirm: async () => {
                try {
                    const { error } = await supabase.from('expenses').delete().eq('id', id)
                    if (error) throw error
                    fetchExpenses()
                } catch (error) {
                    alert('Erro ao excluir despesa: ' + error.message)
                }
            }
        })
    }

    const handleUpdateExpense = async (id, updatedData) => {
        try {
            const { error } = await supabase
                .from('expenses')
                .update(updatedData)
                .eq('id', id)
            if (error) throw error
            setEditingExpense(null)
            fetchExpenses()
        } catch (error) {
            alert('Erro ao atualizar despesa: ' + error.message)
        }
    }

    const handleToggleExpenseStatus = async (expense) => {
        const newStatus = expense.status === 'paid' ? 'pending' : 'paid'
        try {
            const { error } = await supabase
                .from('expenses')
                .update({ status: newStatus })
                .eq('id', expense.id)
            if (error) throw error
            fetchExpenses()
        } catch (error) {
            alert('Erro ao atualizar status: ' + error.message)
        }
    }

    const totalGifts = gifts.reduce((acc, g) => acc + Number(g.amount), 0)
    const totalExpenses = expenses.reduce((acc, e) => acc + Number(e.amount), 0)
    const balance = totalGifts - totalExpenses

    const confirmedGuests = rsvps.filter(r => r.attendance === 'yes').length
    const declinedGuests = rsvps.filter(r => r.attendance === 'no').length
    const pieData = [
        { name: 'Confirmados', value: confirmedGuests },
        { name: 'Recusados', value: declinedGuests }
    ]
    const COLORS = ['#D4AF37', '#6B7280'] // Gold and Gray
    const occupancyRate = (confirmedGuests / 200) * 100

    if (loading) return <div className="p-10 text-center font-serif text-xl">Carregando dados...</div>

    return (
        <div className="min-h-screen bg-[var(--background)] py-12 px-4 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-serif text-text-primary mb-2">Painel do Casamento</h1>
                        <p className="text-text-secondary uppercase tracking-widest text-sm">Controle de Convidados e Finanças</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                        <button
                            onClick={handleLogout}
                            className="bg-text-primary text-[var(--text-primary)] px-6 py-2 rounded-sm hover:opacity-90 transition-all text-sm font-bold uppercase tracking-widest"
                        >
                            Sair
                        </button>
                    </div>
                </div>

                {/* Tab Switcher */}
                <div className="flex border-b border-gray-100 dark:border-white/10 mb-8 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('presence')}
                        className={`px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all relative shrink-0 ${activeTab === 'presence' ? 'text-champagne-gold' : 'text-text-secondary hover:text-text-primary'}`}
                    >
                        Presença
                        {activeTab === 'presence' && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-champagne-gold" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('finance')}
                        className={`px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all relative shrink-0 ${activeTab === 'finance' ? 'text-champagne-gold' : 'text-text-secondary hover:text-text-primary'}`}
                    >
                        Finanças
                        {activeTab === 'finance' && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-champagne-gold" />
                        )}
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'presence' ? (
                        <motion.div
                            key="presence"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-8"
                        >
                            {/* Stats Cards */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-[var(--card-bg)] p-6 rounded-sm shadow-sm border border-gray-100 dark:border-white/5">
                                    <p className="text-[10px] uppercase tracking-widest text-text-secondary font-bold mb-1">Confirmados</p>
                                    <p className="text-3xl font-serif text-text-primary">{confirmedGuests}</p>
                                </div>
                                <div className="bg-[var(--card-bg)] p-6 rounded-sm shadow-sm border border-gray-100 dark:border-white/5">
                                    <p className="text-[10px] uppercase tracking-widest text-text-secondary font-bold mb-1">Recusados</p>
                                    <p className="text-3xl font-serif text-text-primary">{declinedGuests}</p>
                                </div>
                                <div className="bg-[var(--card-bg)] p-6 rounded-sm shadow-sm border border-gray-100 dark:border-white/5">
                                    <p className="text-[10px] uppercase tracking-widest text-text-secondary font-bold mb-1">Total Respostas</p>
                                    <p className="text-3xl font-serif text-text-primary">{rsvps.length}</p>
                                </div>
                                <div className="bg-[var(--card-bg)] p-6 rounded-sm shadow-sm border border-gray-100 dark:border-white/5">
                                    <p className="text-[10px] uppercase tracking-widest text-text-secondary font-bold mb-1">Capacidade</p>
                                    <p className="text-3xl font-serif text-text-primary">200</p>
                                </div>
                            </div>

                            {/* Chart & Summary */}
                            <div className="grid lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 bg-[var(--card-bg)] p-8 rounded-sm shadow-sm border border-gray-100 dark:border-white/5">
                                    <h3 className="text-xl font-serif text-text-primary mb-6">Status de Confirmação</h3>
                                    <div className="w-full h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={pieData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                    stroke="none"
                                                >
                                                    {pieData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
                                                        borderColor: theme === 'dark' ? '#2D2D2D' : '#F3F4F6',
                                                        color: theme === 'dark' ? '#F5F5F5' : '#333333'
                                                    }}
                                                    itemStyle={{ color: theme === 'dark' ? '#F5F5F5' : '#333333' }}
                                                />
                                                <Legend verticalAlign="bottom" height={36} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="bg-[var(--card-bg)] p-8 rounded-sm shadow-sm border border-gray-100 dark:border-white/5">
                                    <h3 className="text-xl font-serif text-text-primary mb-6">Capacidade</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs uppercase tracking-widest text-text-secondary font-bold">Ocupação</span>
                                                <span className="text-sm font-bold text-text-primary">{Math.round(occupancyRate)}%</span>
                                            </div>
                                            <div className="w-full bg-gray-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-1000 ${occupancyRate > 100 ? 'bg-red-500' : 'bg-champagne-gold'}`}
                                                    style={{ width: `${Math.min(occupancyRate, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                        <div className="pt-4 border-t border-gray-100 dark:border-white/5">
                                            <p className="text-xs text-text-secondary leading-relaxed italic">
                                                {occupancyRate > 100
                                                    ? "⚠️ Atenção: O número de confirmados excede a capacidade planejada de 200 convidados."
                                                    : "O número de confirmados está dentro da capacidade esperada para o evento."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Guest List */}
                            <div className="bg-[var(--card-bg)] rounded-sm shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
                                <div className="p-8 border-b border-gray-100 dark:border-white/5">
                                    <h3 className="text-xl font-serif text-text-primary">Lista de Convidados</h3>
                                </div>

                                {/* Mobile View */}
                                <div className="md:hidden divide-y divide-gray-100 dark:divide-white/5">
                                    {rsvps.map((rsvp) => (
                                        <div key={rsvp.id} className="p-4 bg-[var(--card-bg)]">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="font-serif text-lg text-text-primary">{rsvp.name}</p>
                                                    <p className="text-xs text-text-secondary">{rsvp.email}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteRsvp(rsvp.id)}
                                                    className="text-red-400 hover:text-red-700 p-2"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${rsvp.attendance === 'yes' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                    }`}>
                                                    {rsvp.attendance === 'yes' ? 'Confirmado' : 'Recusado'}
                                                </span>
                                                <span className="text-xs text-text-secondary">
                                                    {new Date(rsvp.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Desktop View */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-50 dark:bg-black/20">
                                                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-text-secondary font-bold">Nome</th>
                                                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-text-secondary font-bold">Email</th>
                                                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-text-secondary font-bold">Status</th>
                                                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-text-secondary font-bold">Data</th>
                                                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-text-secondary font-bold text-center">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                            {rsvps.map((rsvp) => (
                                                <tr key={rsvp.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                                    <td className="px-6 py-4 font-serif text-lg text-text-primary">{rsvp.name}</td>
                                                    <td className="px-6 py-4 text-sm text-text-secondary">{rsvp.email}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${rsvp.attendance === 'yes' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                            }`}>
                                                            {rsvp.attendance === 'yes' ? 'Confirmado' : 'Recusado'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-xs text-text-secondary">
                                                        {new Date(rsvp.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <button
                                                            onClick={() => handleDeleteRsvp(rsvp.id)}
                                                            className="text-red-400 hover:text-red-700 transition-colors"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {rsvps.length === 0 && (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-10 text-center text-text-secondary italic">Nenhuma resposta recebida.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="finance"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Financial Summary */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                <div className="bg-[var(--card-bg)] p-6 rounded-sm shadow-sm border border-gray-100 dark:border-white/5 flex flex-col items-center">
                                    <span className="text-xs uppercase tracking-widest text-text-secondary mb-2">Total em Presentes</span>
                                    <span className="text-3xl font-serif text-green-600">R$ {totalGifts.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="bg-[var(--card-bg)] p-6 rounded-sm shadow-sm border border-gray-100 dark:border-white/5 flex flex-col items-center">
                                    <span className="text-xs uppercase tracking-widest text-text-secondary mb-2">Total de Gastos</span>
                                    <span className="text-3xl font-serif text-red-600">R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className={`bg-[var(--card-bg)] p-6 rounded-sm shadow-sm border border-gray-100 dark:border-white/5 flex flex-col items-center ${balance >= 0 ? 'border-b-4 border-b-green-500' : 'border-b-4 border-b-red-500'}`}>
                                    <span className="text-xs uppercase tracking-widest text-text-secondary mb-2">Saldo Atual</span>
                                    <span className={`text-3xl font-serif ${balance >= 0 ? 'text-text-primary' : 'text-red-700'}`}>R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>

                            {/* Financial Sections */}
                            <div className="grid grid-cols-1 gap-12 mb-8">
                                {/* Gifts Section */}
                                <section>
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-serif text-text-primary">Presentes Recebidos</h2>
                                    </div>

                                    <div className="bg-[var(--card-bg)] rounded-sm shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
                                        <form onSubmit={handleAddGift} className="p-6 bg-champagne-gold/5 border-b border-gray-100 dark:border-white/5 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest text-text-secondary mb-1 font-bold">Doador</label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Ex: Tio João"
                                                    className="w-full text-sm p-3 bg-transparent border border-gray-200 dark:border-white/10 focus:outline-none focus:border-champagne-gold transition-colors text-text-primary"
                                                    value={newGift.donor_name}
                                                    onChange={(e) => setNewGift({ ...newGift, donor_name: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest text-text-secondary mb-1 font-bold">Valor (R$)</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    required
                                                    placeholder="0,00"
                                                    className="w-full text-sm p-3 bg-transparent border border-gray-200 dark:border-white/10 focus:outline-none focus:border-champagne-gold transition-colors text-text-primary"
                                                    value={newGift.amount}
                                                    onChange={(e) => setNewGift({ ...newGift, amount: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest text-text-secondary mb-1 font-bold">Mensagem (Opcional)</label>
                                                <input
                                                    type="text"
                                                    placeholder="Uma mensagem carinhosa..."
                                                    className="w-full text-sm p-3 bg-transparent border border-gray-200 dark:border-white/10 focus:outline-none focus:border-champagne-gold transition-colors text-text-primary"
                                                    value={newGift.message}
                                                    onChange={(e) => setNewGift({ ...newGift, message: e.target.value })}
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="bg-champagne-gold text-white p-3 flex items-center justify-center gap-2 font-bold hover:bg-[#B8860B] transition-colors shadow-sm uppercase tracking-widest text-[10px]"
                                            >
                                                <Plus size={16} /> Adicionar
                                            </button>
                                        </form>

                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="bg-gray-50 dark:bg-black/20">
                                                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-text-secondary font-bold">Doador</th>
                                                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-text-secondary font-bold">Valor</th>
                                                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-text-secondary font-bold">Mensagem</th>
                                                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-text-secondary font-bold text-center">Ações</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                                    {gifts.map((gift) => (
                                                        <tr key={gift.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                                            <td className="px-6 py-4 font-serif text-lg text-text-primary">{gift.donor_name}</td>
                                                            <td className="px-6 py-4 text-green-600 font-bold">
                                                                R$ {Number(gift.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-text-secondary italic max-w-xs truncate" title={gift.message}>
                                                                {gift.message || "-"}
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                <div className="flex items-center justify-center gap-2">
                                                                    <button
                                                                        onClick={() => setEditingGift(gift)}
                                                                        className="text-champagne-gold hover:text-[#B8860B] p-2 transition-colors"
                                                                    >
                                                                        <Pencil size={18} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteGift(gift.id)}
                                                                        className="text-red-400 hover:text-red-700 p-2 transition-colors"
                                                                    >
                                                                        <Trash2 size={18} />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {gifts.length === 0 && (
                                                        <tr>
                                                            <td colSpan="4" className="px-6 py-10 text-center text-text-secondary italic">Nenhum presente registrado.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </section>

                                {/* Expenses Section */}
                                <section>
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-serif text-text-primary">Despesas do Casamento</h2>
                                    </div>

                                    <div className="bg-[var(--card-bg)] rounded-sm shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
                                        <form onSubmit={handleAddExpense} className="p-6 bg-red-50/10 border-b border-gray-100 dark:border-white/5 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest text-text-secondary mb-1 font-bold">Descrição</label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Ex: Buffet, Local..."
                                                    className="w-full text-sm p-3 bg-transparent border border-gray-200 dark:border-white/10 focus:outline-none focus:border-champagne-gold transition-colors text-text-primary"
                                                    value={newExpense.description}
                                                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest text-text-secondary mb-1 font-bold">Valor (R$)</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    required
                                                    placeholder="0,00"
                                                    className="w-full text-sm p-3 bg-transparent border border-gray-200 dark:border-white/10 focus:outline-none focus:border-champagne-gold transition-colors text-text-primary"
                                                    value={newExpense.amount}
                                                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest text-text-secondary mb-1 font-bold">Categoria</label>
                                                <select
                                                    className="w-full text-sm p-3 bg-[var(--card-bg)] border border-gray-200 dark:border-white/10 focus:outline-none focus:border-champagne-gold transition-colors text-text-primary"
                                                    value={newExpense.category}
                                                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                                                >
                                                    <option value="">Selecione...</option>
                                                    <option value="Buffet & Bebidas">Buffet & Bebidas</option>
                                                    <option value="Local & Decoração">Local & Decoração</option>
                                                    <option value="Foto & Vídeo">Foto & Vídeo</option>
                                                    <option value="Trajes">Trajes</option>
                                                    <option value="Papelaria">Papelaria</option>
                                                    <option value="Música">Música</option>
                                                    <option value="Outros">Outros</option>
                                                </select>
                                            </div>
                                            <button
                                                type="submit"
                                                className="bg-red-800 text-white p-3 flex items-center justify-center gap-2 font-bold hover:bg-red-900 transition-colors shadow-sm uppercase tracking-widest text-[10px]"
                                            >
                                                <Plus size={16} /> Adicionar
                                            </button>
                                        </form>

                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="bg-gray-50 dark:bg-black/20">
                                                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-text-secondary font-bold">Descrição</th>
                                                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-text-secondary font-bold">Valor</th>
                                                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-text-secondary font-bold">Categoria</th>
                                                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-text-secondary font-bold text-center">Status</th>
                                                        <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-text-secondary font-bold text-center">Ações</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                                    {expenses.map((expense) => (
                                                        <tr key={expense.id} className={`hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${expense.status === 'paid' ? 'opacity-60' : ''}`}>
                                                            <td className="px-6 py-4">
                                                                <p className={`font-serif text-lg text-text-primary ${expense.status === 'paid' ? 'line-through' : ''}`}>{expense.description}</p>
                                                            </td>
                                                            <td className="px-6 py-4 text-red-600 font-bold">R$ {Number(expense.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                                            <td className="px-6 py-4 text-[10px] uppercase tracking-widest text-text-secondary font-bold">{expense.category || "Outros"}</td>
                                                            <td className="px-6 py-4 text-center">
                                                                <button
                                                                    onClick={() => handleToggleExpenseStatus(expense)}
                                                                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${expense.status === 'paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}
                                                                >
                                                                    {expense.status === 'paid' ? <><CheckCircle size={12} /> Pago</> : <><Clock size={12} /> Pendente</>}
                                                                </button>
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                <div className="flex items-center justify-center gap-2">
                                                                    <button
                                                                        onClick={() => setEditingExpense(expense)}
                                                                        className="text-champagne-gold hover:text-[#B8860B] p-2 transition-colors"
                                                                    >
                                                                        <Pencil size={18} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteExpense(expense.id)}
                                                                        className="text-red-400 hover:text-red-700 p-2 transition-colors"
                                                                    >
                                                                        <Trash2 size={18} />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {expenses.length === 0 && (
                                                        <tr>
                                                            <td colSpan="5" className="px-6 py-10 text-center text-text-secondary italic">Nenhuma despesa registrada.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <ConfirmModal
                isOpen={confirmData.isOpen}
                onClose={() => setConfirmData({ ...confirmData, isOpen: false })}
                onConfirm={confirmData.onConfirm}
                title={confirmData.title}
                message={confirmData.message}
            />

            <EditGiftModal
                isOpen={!!editingGift}
                onClose={() => setEditingGift(null)}
                onSave={handleUpdateGift}
                gift={editingGift}
            />

            <EditExpenseModal
                isOpen={!!editingExpense}
                onClose={() => setEditingExpense(null)}
                onSave={handleUpdateExpense}
                expense={editingExpense}
            />
        </div>
    )
}
