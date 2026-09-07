import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Shield, Lock, User, AlertCircle, ArrowRight } from 'lucide-react'

export function AdminLogin() {
  const navigate = useNavigate()
  const { isAdmin, login } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAdmin) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const result = login(username, password)
    if (result.success) {
      navigate('/admin')
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="py-16 max-w-md mx-auto">
      <div className="bg-[#080d1a] p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/10">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Admin Authentication</h1>
          <p className="text-slate-400 text-xs">Enter administrative credentials to manage Dano Store.</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Admin username"
                className="w-full bg-[#0d1326] border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-cyan-500"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0d1326] border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-cyan-500"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all mt-2"
          >
            <span>Log In as Admin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-slate-500">
          Default Admin Login: <code className="text-cyan-400">dano.js</code> / <code className="text-cyan-400">lawa2233</code>
        </div>
      </div>
    </div>
  )
}
