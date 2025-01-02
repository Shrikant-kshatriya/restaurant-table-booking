'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const AdminPanel = () => {
  const [tables, setTables] = useState([]);
  const [formData, setFormData] = useState({ id: '', seats: '', floor: 'ground', _id: '' });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/tables`);
        setTables(response.data);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };
    fetchTables();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOrUpdate = async () => {
    try {
      if (editMode) {
        // Update table
        await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/tables/${formData._id}`, {
          id: formData.id,
          seats: formData.seats,
          floor: formData.floor,
        });
        setTables(
          tables.map((table) =>
            table._id === formData._id ? { ...table, ...formData } : table
          )
        );
      } else {
        // Add new table
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/tables`, {
          id: formData.id,
          seats: formData.seats,
          floor: formData.floor,
        });
        setTables([...tables, response.data]);
      }
      setFormData({ id: '', seats: '', floor: 'ground', _id: '' });
      setEditMode(false);
    } catch (error) {
      console.error('Error saving table:', error);
    }
  };

  const handleEdit = (table) => {
    setFormData(table);
    setEditMode(true);
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/tables/${_id}`);
      setTables(tables.filter((table) => table._id !== _id));
    } catch (error) {
      console.error('Error deleting table:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-white to-gray-50 min-h-screen rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6 text-center">Admin Panel - Manage Tables</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{editMode ? 'Edit Table' : 'Add Table'}</h2>
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="text"
            name="id"
            placeholder="Table ID (e.g., G1)"
            value={formData.id}
            onChange={handleInputChange}
            className="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="number"
            name="seats"
            placeholder="Number of Seats"
            value={formData.seats}
            onChange={handleInputChange}
            className="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <select
            name="floor"
            value={formData.floor}
            onChange={handleInputChange}
            className="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="ground">Ground Floor</option>
            <option value="first">First Floor</option>
          </select>
          <button
            onClick={handleAddOrUpdate}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
          >
            {editMode ? 'Update Table' : 'Add Table'}
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Tables</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Table ID</th>
                <th className="py-3 px-6 text-left">Seats</th>
                <th className="py-3 px-6 text-left">Floor</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table, index) => (
                <tr
                  key={table._id}
                  className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                >
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{table.id}</td>
                  <td className="py-3 px-6">{table.seats}</td>
                  <td className="py-3 px-6">{table.floor}</td>
                  <td className="py-3 px-6 text-right">
                    <button
                      onClick={() => handleEdit(table)}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                    >
                      <FiEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(table._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
