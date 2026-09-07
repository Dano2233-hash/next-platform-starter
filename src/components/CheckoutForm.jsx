import React, { useState } from 'react'
import { PAYMENT_METHODS } from '../data/categories'
import { PaymentMethodCard } from './PaymentMethodCard'
import { User, Phone, MapPin, FileText, AlertCircle } from 'lucide-react'

export function CheckoutForm({ onSubmitOrder }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    note: ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleSelectPayment = (id) => {
    setFormData(prev => ({ ...prev, paymentMethod: id }))
    if (errors.paymentMethod) {
      setErrors(prev => ({ ...prev, paymentMethod: null }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.'
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone number.'
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required.'
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSubmitOrder(formData)
    }
  }

  const iraqiCities = [
    'Erbil', 'Sulaymaniyah', 'Duhok', 'Baghdad', 'Kirkuk',
    'Basra', 'Mosul', 'Halabja', 'Najaf', 'Karbala', 'Anbar', 'Diyala', 'Other City'
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information Box */}
      <div className="bg-[#070b15] p-5 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <User className="w-5 h-5 text-cyan-400" />
          <span>Customer Information</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Lawa Kurdistan"
                className={`w-full bg-[#0d1326] border ${
                  errors.name ? 'border-red-500' : 'border-slate-800'
                } text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-cyan-500`}
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            {errors.name && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Phone / WhatsApp Number <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0750 XXX XXXX"
                className={`w-full bg-[#0d1326] border ${
                  errors.phone ? 'border-red-500' : 'border-slate-800'
                } text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-cyan-500`}
              />
              <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* City Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            City <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full bg-[#0d1326] border ${
                errors.city ? 'border-red-500' : 'border-slate-800'
              } text-slate-100 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-cyan-500`}
            >
              {iraqiCities.map(city => (
                <option key={city} value={city} className="bg-slate-900 text-slate-100">
                  {city}
                </option>
              ))}
            </select>
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          {errors.city && (
            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.city}
            </p>
          )}
        </div>

        {/* Order Note */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Order Note / Player ID (Optional)
          </label>
          <div className="relative">
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows="2"
              placeholder="e.g. Player ID for PUBG UC: 512345678 or special instructions"
              className="w-full bg-[#0d1326] border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-cyan-500"
            />
            <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>
        </div>
      </div>

      {/* Payment Selection Box */}
      <div className="bg-[#070b15] p-5 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-100">
          Select Manual Payment Method <span className="text-red-400">*</span>
        </h3>
        {errors.paymentMethod && (
          <p className="text-red-400 text-xs flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.paymentMethod}
          </p>
        )}

        <div className="space-y-3">
          {PAYMENT_METHODS.map(method => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              isSelected={formData.paymentMethod === method.id}
              onSelect={() => handleSelectPayment(method.id)}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
      >
        <span>Confirm & Create Order</span>
      </button>
    </form>
  )
}
