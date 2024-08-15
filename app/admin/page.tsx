'use client'

import React, { useState, useEffect } from 'react'
import { getCategories, createCategory, createCollection } from '@/app/lib/actions'
import { ColorPicker } from '@/app/ui/colorPicker'
import { IconPicker } from '@/app/ui/iconPicker'
import { getIconComponent } from '@/utils/iconMap'
import TestTable from './testUI/table'

export default function AdminPage() {
  const [categories, setCategories] = useState([])
  const [newCategoryName, setNewCategoryName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [newCollectionData, setNewCollectionData] = useState({
    title: '',
    description: '',
    color: 'gray',
    icon: 'help-circle',
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    const data = await getCategories()
    setCategories(data)
  }

  async function handleCreateCategory(e) {
    e.preventDefault()
    await createCategory(newCategoryName)
    setNewCategoryName('')
    fetchCategories()
  }

  async function handleCreateCollection(e) {
    e.preventDefault()
    await createCollection({ ...newCollectionData, categoryId: selectedCategory.id })
    setNewCollectionData({ title: '', description: '', color: 'gray', icon: 'help-circle' })
    fetchCategories()
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">CircleUp Admin</h1>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium leading-6 text-gray-900 mb-4">Create Category</h2>
                  <form onSubmit={handleCreateCategory} className="flex gap-2">
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Category Name"
                      className="flex-grow shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Create
                    </button>
                  </form>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium leading-6 text-gray-900 mb-4">Create Collection</h2>
                  <select
                    value={selectedCategory ? selectedCategory.id : ''}
                    onChange={(e) => setSelectedCategory(categories.find(c => c.id === parseInt(e.target.value)))}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select a Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {selectedCategory && (
                    <form onSubmit={handleCreateCollection} className="mt-4 space-y-4">
                      <input
                        type="text"
                        value={newCollectionData.title}
                        onChange={(e) => setNewCollectionData({...newCollectionData, title: e.target.value})}
                        placeholder="Collection Title"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      <textarea
                        value={newCollectionData.description}
                        onChange={(e) => setNewCollectionData({...newCollectionData, description: e.target.value})}
                        placeholder="Description"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      <ColorPicker
                        selectedColor={newCollectionData.color}
                        onColorSelect={(color) => setNewCollectionData({...newCollectionData, color})}
                      />
                      <IconPicker
                        selectedIcon={newCollectionData.icon}
                        onIconSelect={(icon) => setNewCollectionData({...newCollectionData, icon})}
                      />
                      <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Create Collection
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-medium leading-6 text-gray-900 mb-4">Categories and Collections</h2>
              <div className="bg-white shadow sm:rounded-md">
                <TestTable categories={categories}/>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}