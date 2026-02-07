
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

export default function Dashboard() {
    const [rsvps, setRsvps] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        getProfile()
        fetchRsvps()
    }, [])

    const getProfile = async () => {
        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
            navigate('/login')
        }
    }

    const fetchRsvps = async () => {
        try {
            setLoading(true)
            let { data, error } = await supabase
                .from('rsvps')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setRsvps(data)
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/login')
    }

    if (loading) return <div className="p-10 text-center">Loading...</div>

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold font-sans">RSVP Dashboard</h1>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                    <h3 className="text-lg font-bold mb-4 text-gray-700 font-sans">Status dos Convites</h3>
                    <div className="w-full h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Confirmados', value: rsvps.filter(r => r.attendance === 'yes').length },
                                        { name: 'Recusados', value: rsvps.filter(r => r.attendance === 'no').length },
                                        { name: 'Pendentes', value: Math.max(0, 200 - rsvps.length) }
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    <Cell key="cell-yes" fill="#4ade80" /> {/* Green */}
                                    <Cell key="cell-no" fill="#f87171" /> {/* Red */}
                                    <Cell key="cell-pending" fill="#e5e7eb" /> {/* Gray */}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Numbers */}
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center space-y-4">
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-100">
                        <span className="text-green-800 font-medium">Confirmados (Sim)</span>
                        <span className="text-2xl font-bold text-green-600">{rsvps.filter(r => r.attendance === 'yes').length}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border border-red-100">
                        <span className="text-red-800 font-medium">Recusados (Não)</span>
                        <span className="text-2xl font-bold text-red-600">{rsvps.filter(r => r.attendance === 'no').length}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <span className="text-gray-600 font-medium">Pendentes (Meta: 200)</span>
                        <span className="text-2xl font-bold text-gray-400">{Math.max(0, 200 - rsvps.length)}</span>
                    </div>

                    {rsvps.filter(r => r.attendance === 'yes').length > 200 && (
                        <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                            <p className="font-bold">Atenção: Capacidade Excedida!</p>
                            <p>Você tem {rsvps.filter(r => r.attendance === 'yes').length - 200} convidados confirmados além do limite de 200.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile View (Cards) */}
            <div className="md:hidden space-y-4">
                {rsvps.map((rsvp) => (
                    <div key={rsvp.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
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

                        <div className="text-xs text-gray-400 text-right">
                            {new Date(rsvp.created_at).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </div>
                ))}
                {rsvps.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        Ainda não há respostas.
                    </div>
                )}
            </div>

            {/* Desktop View (Table) */}
            <div className="hidden md:block bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Nome
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Presença
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Mensagem
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Data
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rsvps.map((rsvp) => (
                            <tr key={rsvp.id}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap font-medium">{rsvp.name}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span
                                        className={`relative inline-block px-3 py-1 font-semibold leading-tight ${rsvp.attendance === 'yes' ? 'text-green-900' : 'text-red-900'
                                            }`}
                                    >
                                        <span
                                            aria-hidden
                                            className={`absolute inset-0 opacity-50 rounded-full ${rsvp.attendance === 'yes' ? 'bg-green-200' : 'bg-red-200'
                                                }`}
                                        ></span>
                                        <span className="relative">{rsvp.attendance === 'yes' ? 'Confirmado' : 'Rejeitado'}</span>
                                    </span>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap max-w-xs truncate" title={rsvp.message}>{rsvp.message || '-'}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {new Date(rsvp.created_at).toLocaleDateString('pt-BR')}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
