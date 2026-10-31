"use client"

import React, { useState } from "react"
import Modal from "@/components/ui/Modal"
import { useRouter } from "next/navigation"

interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  price: number;
  propertyType: string;
  status: string;
}

export default function PropertyTable({ initialProperties }: { initialProperties: Property[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "APARTMENT",
    transactionType: "SALE",
    price: 0,
    location: "",
    city: "",
    bedrooms: 0,
    bathrooms: 0,
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setIsModalOpen(false)
        router.refresh()
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Add Property
        </button>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-semibold text-slate-700">Title</th>
              <th className="p-4 font-semibold text-slate-700">Location</th>
              <th className="p-4 font-semibold text-slate-700">Price</th>
              <th className="p-4 font-semibold text-slate-700">Type</th>
              <th className="p-4 font-semibold text-slate-700">Status</th>
              <th className="p-4 font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {initialProperties.map((prop) => (
              <tr key={prop.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 text-slate-900 font-medium">{prop.title}</td>
                <td className="p-4 text-slate-600">{prop.city}, {prop.location}</td>
                <td className="p-4 text-slate-900 font-semibold">{prop.price.toLocaleString()} TND</td>
                <td className="p-4 text-slate-600">{prop.propertyType}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    prop.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' :
                    prop.status === 'RESERVED' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {prop.status}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Property"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Title</label>
              <input
                type="text"
                required
                className="w-full p-2 border border-slate-200 rounded-lg"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Price (TND)</label>
              <input
                type="number"
                required
                className="w-full p-2 border border-slate-200 rounded-lg"
                value={formData.price}
                onChange={e => setFormData({...formData, price: Number(e.target.value)})}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">City</label>
              <input
                type="text"
                required
                className="w-full p-2 border border-slate-200 rounded-lg"
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Location</label>
              <input
                type="text"
                required
                className="w-full p-2 border border-slate-200 rounded-lg"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Description</label>
            <textarea
              required
              className="w-full p-2 border border-slate-200 rounded-lg h-24"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Type</label>
              <select
                className="w-full p-2 border border-slate-200 rounded-lg"
                value={formData.propertyType}
                onChange={e => setFormData({...formData, propertyType: e.target.value})}
              >
                <option value="APARTMENT">Apartment</option>
                <option value="VILLA">Villa</option>
                <option value="HOUSE">House</option>
                <option value="LAND">Land</option>
                <option value="OFFICE">Office</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Transaction</label>
              <select
                className="w-full p-2 border border-slate-200 rounded-lg"
                value={formData.transactionType}
                onChange={e => setFormData({...formData, transactionType: e.target.value})}
              >
                <option value="SALE">Sale</option>
                <option value="RENT">Rent</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            Save Property
          </button>
        </form>
      </Modal>
    </>
  )
}
