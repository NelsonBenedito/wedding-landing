import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Trash2, Plus, CheckCircle, Clock, Pencil } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

export default function Dashboard() {
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

    if (loading) return <div className="p-10 text-center font-serif text-xl">Carregando dados...</div>

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif text-text-dark">Painel de Controle</h1>
                <div className="flex gap-4">
                    <button onClick={handleHome} className="text-text-muted hover:text-champagne-gold transition-colors text-sm font-medium">Site do Casamento</button>
                    <button onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded-sm text-sm font-bold hover:bg-red-600 transition-colors shadow-sm">Sair</button>
                </div>
            </div>

            {/* Tab Switcher */}
            <div className="flex border-b border-gray-100 mb-8">
                <button
                    onClick={() => setActiveTab('presence')}
                    className={`px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'presence' ? 'text-champagne-gold' : 'text-text-muted hover:text-text-dark'}`}
                >
                    Presença
                    {activeTab === 'presence' && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-champagne-gold" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('finance')}
                    className={`px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'finance' ? 'text-champagne-gold' : 'text-text-muted hover:text-text-dark'}`}
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
                    >
                        {/* Stats Section (RSVP & Capacity) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {/* Chart */}
                            <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex flex-col items-center">
                                <h3 className="text-lg font-serif mb-4 text-text-dark">Status dos Convites</h3>
                                <div className="w-full h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={[
                                                    { name: 'Confirmados', value: rsvps.filter(r => r.attendance === 'yes').length },
                                                    { name: 'Recusados', value: rsvps.filter(r => r.attendance === 'no').length },
                                                    { name: 'Pendentes', value: Math.max(0, 200 - rsvps.filter(r => r.attendance === 'yes').length) }
                                                ]}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                <Cell key="cell-yes" fill="#4ade80" />
                                                <Cell key="cell-no" fill="#f87171" />
                                                <Cell key="cell-pending" fill="#e5e7eb" />
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Numbers */}
                            <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 flex flex-col justify-center space-y-4">
                                <h3 className="text-lg font-serif mb-2 text-text-dark border-b pb-2">Capacidade (200 Pessoas)</h3>
                                <div className="flex justify-between items-center p-4 bg-green-50 rounded-sm border border-green-100">
                                    <span className="text-green-800 font-medium">Confirmados (Sim)</span>
                                    <span className="text-2xl font-serif text-green-600">{rsvps.filter(r => r.attendance === 'yes').length}</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-red-50 rounded-sm border border-red-100">
                                    <span className="text-red-800 font-medium">Recusados (Não)</span>
                                    <span className="text-2xl font-serif text-red-600">{rsvps.filter(r => r.attendance === 'no').length}</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-sm border border-gray-100">
                                    <span className="text-gray-600 font-medium">Vagas Restantes</span>
                                    <span className={`text-2xl font-serif ${rsvps.filter(r => r.attendance === 'yes').length > 200 ? 'text-red-600' : 'text-gray-400'}`}>
                                        {Math.max(0, 200 - rsvps.filter(r => r.attendance === 'yes').length)}
                                    </span>
                                </div>

                                {rsvps.filter(r => r.attendance === 'yes').length > 200 && (
                                    <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
                                        <p className="font-bold">Atenção: Capacidade Excedida!</p>
                                        <p>Você tem {rsvps.filter(r => r.attendance === 'yes').length - 200} convidados confirmados além do limite.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-serif text-text-dark">Lista de Convidados</h2>
                        </div>

                        {/* Mobile View (Cards) */}
                        <div className="md:hidden space-y-4 mb-8">
                            {rsvps.map((rsvp) => (
                                <div key={rsvp.id} className="bg-white p-5 rounded-sm shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-bold text-lg text-gray-800">{rsvp.name}</h3>
                                        <span
                                            className={`px-3 py-1 text-xs font-semibold rounded-full ${rsvp.attendance === 'yes'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {rsvp.attendance === 'yes' ? 'Confirmado' : 'Rejeitado'}
                                        </span>
                                    </div>

                                    {rsvp.message && (
                                        <div className="bg-gray-50 p-3 rounded text-sm text-gray-600 mb-3 italic">
                                            "{rsvp.message}"
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center mt-3 border-t pt-3">
                                        <div className="text-xs text-gray-400">
                                            {new Date(rsvp.created_at).toLocaleDateString('pt-BR', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                        <button
                                            onClick={() => handleDeleteRsvp(rsvp.id)}
                                            className="text-red-400 hover:text-red-700 p-2 transition-colors"
                                            title="Excluir"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {rsvps.length === 0 && (
                                <div className="text-center py-10 text-gray-500 italic">
                                    Ainda não há respostas.
                                </div>
                            )}
                        </div>

                        {/* Desktop View (Table) */}
                        <div className="hidden md:block bg-white shadow-sm rounded-sm border border-gray-100 overflow-hidden mb-8">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-4 border-b border-gray-200 bg-gray-50 text-left text-[10px] uppercase tracking-widest font-semibold text-text-muted">
                                            Nome
                                        </th>
                                        <th className="px-6 py-4 border-b border-gray-200 bg-gray-50 text-left text-[10px] uppercase tracking-widest font-semibold text-text-muted">
                                            Presença
                                        </th>
                                        <th className="px-6 py-4 border-b border-gray-200 bg-gray-50 text-left text-[10px] uppercase tracking-widest font-semibold text-text-muted">
                                            Mensagem
                                        </th>
                                        <th className="px-6 py-4 border-b border-gray-200 bg-gray-50 text-left text-[10px] uppercase tracking-widest font-semibold text-text-muted">
                                            Data
                                        </th>
                                        <th className="px-6 py-4 border-b border-gray-200 bg-gray-50 text-center text-[10px] uppercase tracking-widest font-semibold text-text-muted">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {rsvps.map((rsvp) => (
                                        <tr key={rsvp.id}>
                                            <td className="px-6 py-4 text-sm">
                                                <p className="text-text-dark font-medium">{rsvp.name}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span
                                                    className={`inline-block px-3 py-1 text-xs font-bold uppercase rounded-full ${rsvp.attendance === 'yes' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                                                >
                                                    {rsvp.attendance === 'yes' ? 'Confirmado' : 'Rejeitado'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <p className="text-text-muted italic max-w-xs truncate" title={rsvp.message}>{rsvp.message || '-'}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-text-muted">
                                                {new Date(rsvp.created_at).toLocaleDateString('pt-BR')}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => handleDeleteRsvp(rsvp.id)}
                                                    className="text-red-400 hover:text-red-700 transition-colors"
                                                    title="Excluir Convidado"
                                                >
                                                    <Trash2 size={18} className="mx-auto" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {rsvps.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-10 text-center text-text-muted italic">Nenhuma resposta recebida.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
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
                            <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex flex-col items-center">
                                <span className="text-xs uppercase tracking-widest text-text-muted mb-2">Total em Presentes</span>
                                <span className="text-3xl font-serif text-green-600">R$ {totalGifts.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex flex-col items-center">
                                <span className="text-xs uppercase tracking-widest text-text-muted mb-2">Total de Gastos</span>
                                <span className="text-3xl font-serif text-red-600">R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className={`bg-white p-6 rounded-sm shadow-sm border border-gray-100 flex flex-col items-center ${balance >= 0 ? 'border-b-4 border-b-green-500' : 'border-b-4 border-b-red-500'}`}>
                                <span className="text-xs uppercase tracking-widest text-text-muted mb-2">Saldo Atual</span>
                                <span className={`text-3xl font-serif ${balance >= 0 ? 'text-text-dark' : 'text-red-700'}`}>R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                        </div>

                        {/* Financial Sections */}
                        <div className="grid grid-cols-1 gap-12 mb-8">
                            {/* Gifts Section */}
                            <section>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-serif text-text-dark">Presentes Recebidos</h2>
                                </div>

                                <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
                                    <form onSubmit={handleAddGift} className="p-6 bg-champagne-gold/5 border-b border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-text-muted mb-1">Doador</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Ex: Tio João"
                                                className="w-full text-sm p-2 border border-gray-200 focus:outline-none focus:border-champagne-gold"
                                                value={newGift.donor_name}
                                                onChange={(e) => setNewGift({ ...newGift, donor_name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-text-muted mb-1">Valor (R$)</label>
                                            <input
                                                type="number"
                                                required
                                                placeholder="0.00"
                                                className="w-full text-sm p-2 border border-gray-200 focus:outline-none focus:border-champagne-gold"
                                                value={newGift.amount}
                                                onChange={(e) => setNewGift({ ...newGift, amount: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-text-muted mb-1">Mensagem (Opcional)</label>
                                            <input
                                                type="text"
                                                className="w-full text-sm p-2 border border-gray-200 focus:outline-none focus:border-champagne-gold"
                                                value={newGift.message}
                                                onChange={(e) => setNewGift({ ...newGift, message: e.target.value })}
                                            />
                                        </div>
                                        <button type="submit" className="bg-champagne-gold text-white p-2 flex items-center justify-center gap-2 font-bold hover:bg-[#B8860B] transition-colors">
                                            <Plus size={18} /> Adicionar Presente
                                        </button>
                                    </form>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50 uppercase text-[10px] tracking-widest text-text-muted">
                                                <tr>
                                                    <th className="px-6 py-4 text-left">Doador</th>
                                                    <th className="px-6 py-4 text-left">Valor</th>
                                                    <th className="px-6 py-4 text-left">Mensagem</th>
                                                    <th className="px-6 py-4 text-center w-20">Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-100 text-sm">
                                                {gifts.map((gift) => (
                                                    <tr key={gift.id}>
                                                        <td className="px-6 py-4 font-medium text-text-dark">{gift.donor_name}</td>
                                                        <td className="px-6 py-4 text-green-600 font-bold">R$ {Number(gift.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                                        <td className="px-6 py-4 text-text-muted italic max-w-xs truncate" title={gift.message}>{gift.message || "-"}</td>
                                                        <td className="px-6 py-4 text-center">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <button onClick={() => setEditingGift(gift)} className="text-champagne-gold hover:text-[#B8860B] transition-colors" title="Editar">
                                                                    <Pencil size={18} />
                                                                </button>
                                                                <button onClick={() => handleDeleteGift(gift.id)} className="text-red-400 hover:text-red-700 transition-colors" title="Excluir">
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {gifts.length === 0 && (
                                                    <tr>
                                                        <td colSpan="4" className="px-6 py-10 text-center text-text-muted italic">Nenhum presente registrado ainda.</td>
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
                                    <h2 className="text-2xl font-serif text-text-dark">Despesas do Casamento</h2>
                                </div>

                                <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
                                    <form onSubmit={handleAddExpense} className="p-6 bg-red-50/20 border-b border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-text-muted mb-1">Descrição</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Ex: Buffet, Local, Vestido"
                                                className="w-full text-sm p-2 border border-gray-200 focus:outline-none focus:border-champagne-gold"
                                                value={newExpense.description}
                                                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-text-muted mb-1">Valor (R$)</label>
                                            <input
                                                type="number"
                                                required
                                                placeholder="0.00"
                                                className="w-full text-sm p-2 border border-gray-200 focus:outline-none focus:border-champagne-gold"
                                                value={newExpense.amount}
                                                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-text-muted mb-1">Categoria</label>
                                            <select
                                                className="w-full text-sm p-2 border border-gray-200 focus:outline-none focus:border-champagne-gold"
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
                                        <button type="submit" className="bg-red-800 text-white p-2 flex items-center justify-center gap-2 font-bold hover:bg-red-900 transition-colors">
                                            <Plus size={18} /> Adicionar Despesa
                                        </button>
                                    </form>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50 uppercase text-[10px] tracking-widest text-text-muted">
                                                <tr>
                                                    <th className="px-6 py-4 text-left">Descrição</th>
                                                    <th className="px-6 py-4 text-left">Valor</th>
                                                    <th className="px-6 py-4 text-left">Categoria</th>
                                                    <th className="px-6 py-4 text-center">Status</th>
                                                    <th className="px-6 py-4 text-center w-20">Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-100 text-sm">
                                                {expenses.map((expense) => (
                                                    <tr key={expense.id} className={expense.status === 'paid' ? 'bg-gray-50/50' : ''}>
                                                        <td className="px-6 py-4">
                                                            <p className={`font-medium ${expense.status === 'paid' ? 'text-text-muted line-through' : 'text-text-dark'}`}>{expense.description}</p>
                                                        </td>
                                                        <td className="px-6 py-4 text-red-600 font-bold">R$ {Number(expense.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                                        <td className="px-6 py-4 text-text-muted text-xs uppercase tracking-wider">{expense.category || "Outros"}</td>
                                                        <td className="px-6 py-4 text-center">
                                                            <button
                                                                onClick={() => handleToggleExpenseStatus(expense)}
                                                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${expense.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}
                                                            >
                                                                {expense.status === 'paid' ? <><CheckCircle size={12} /> Pago</> : <><Clock size={12} /> Pendente</>}
                                                            </button>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <button onClick={() => setEditingExpense(expense)} className="text-champagne-gold hover:text-[#B8860B] transition-colors" title="Editar">
                                                                    <Pencil size={18} />
                                                                </button>
                                                                <button onClick={() => handleDeleteExpense(expense.id)} className="text-red-400 hover:text-red-700 transition-colors" title="Excluir">
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {expenses.length === 0 && (
                                                    <tr>
                                                        <td colSpan="5" className="px-6 py-10 text-center text-text-muted italic">Nenhuma despesa registrada.</td>
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
