"use client";

import React, { useState, useRef, useEffect } from 'react';

interface Drink {
  id: string;
  name: string;
  price: number;
  image_url: string;
  like: number;
  is_new: boolean;
  category: string;
}

// Class 1: DrinkAdder - Responsible for adding new drinks
class DrinkAdder {
  addDrink(drinks: Drink[], drinkData: Omit<Drink, 'id'>): Drink[] {
    const newDrink: Drink = {
      id: this.generateId(),
      ...drinkData
    };
    
    return [...drinks, newDrink];
  }
  
  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}

// Class 2: DrinkUpdater - Responsible for updating existing drinks
class DrinkUpdater {
  updateDrink(drinks: Drink[], id: string, updatedData: Partial<Omit<Drink, 'id'>>): Drink[] {
    return drinks.map(drink => {
      if (drink.id === id) {
        return { ...drink, ...updatedData };
      }
      return drink;
    });
  }
  
  incrementLikes(drinks: Drink[], id: string): Drink[] {
    return this.updateDrink(drinks, id, { like: this.getDrinkById(drinks, id).like + 1 });
  }
  
  toggleNewStatus(drinks: Drink[], id: string): Drink[] {
    const drink = this.getDrinkById(drinks, id);
    return this.updateDrink(drinks, id, { is_new: !drink.is_new });
  }
  
  private getDrinkById(drinks: Drink[], id: string): Drink {
    const drink = drinks.find(d => d.id === id);
    if (!drink) {
      throw new Error(`Drink with id ${id} not found`);
    }
    return drink;
  }
}

// Class 3: DrinkDeleter - Responsible for removing drinks
class DrinkDeleter {
  deleteDrink(drinks: Drink[], id: string): Drink[] {
    return drinks.filter(drink => drink.id !== id);
  }
  
  deleteDrinksByCategory(drinks: Drink[], category: string): Drink[] {
    return drinks.filter(drink => drink.category !== category);
  }
  
  deleteAllNewDrinks(drinks: Drink[]): Drink[] {
    return drinks.filter(drink => !drink.is_new);
  }
}

export default function Page() {
  const drinkAdder = new DrinkAdder();
  const drinkUpdater = new DrinkUpdater();
  const drinkDeleter = new DrinkDeleter();
  
  // Add state to control showing/hiding the Add Drink form
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [drinks, setDrinks] = useState<Drink[]>([
    {
      id: "1",
      name: "Espresso",
      price: 3.50,
      image_url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd",
      like: 42,
      is_new: false,
      category: "Coffee"
    },
    {
      id: "2",
      name: "Matcha Latte",
      price: 4.75,
      image_url: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7",
      like: 38,
      is_new: true,
      category: "Tea"
    },
    {
      id: "3",
      name: "Fresh Orange Juice",
      price: 4.25,
      image_url: "https://images.unsplash.com/photo-1613478223719-2ab802602423",
      like: 29,
      is_new: false,
      category: "Juice"
    },
    {
      id: "4",
      name: "Strawberry Smoothie",
      price: 5.50,
      image_url: "https://images.unsplash.com/photo-1553530666-ba11a7da3888",
      like: 35,
      is_new: true,
      category: "Smoothie"
    },
    {
      id: "5",
      name: "Iced Americano",
      price: 3.75,
      image_url: "https://images.unsplash.com/photo-1517701604599-bb29b565090c",
      like: 33,
      is_new: false,
      category: "Coffee"
    },
    {
      id: "6",
      name: "Mango Lassi",
      price: 4.50,
      image_url: "https://www.yellowthyme.com/wp-content/uploads/2023/03/Mango-Lassi-08589.jpg",
      like: 27,
      is_new: true,
      category: "Smoothie"
    },
    {
      id: "7",
      name: "Earl Grey Tea",
      price: 3.25,
      image_url: "https://images.unsplash.com/photo-1576092768241-dec231879fc3",
      like: 22,
      is_new: false,
      category: "Tea"
    },
    {
      id: "8",
      name: "Mojito",
      price: 6.75,
      image_url: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a",
      like: 48,
      is_new: false,
      category: "Cocktail"
    },
    {
      id: "9",
      name: "Watermelon Cooler",
      price: 5.25,
      image_url: "https://themerrythought.com/wp-content/uploads/WatermelonCooler1-707x1024.jpg",
      like: 31,
      is_new: true,
      category: "Juice"
    },
    {
      id: "10",
      name: "Caramel Macchiato",
      price: 4.95,
      image_url: "https://images.unsplash.com/photo-1572442388796-11668a67e53d",
      like: 44,
      is_new: false,
      category: "Coffee"
    }
  ]);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image_url: '',
    category: '',
    is_new: false
  });
  
  // Example usage of the classes
  const handleAddDrink = (e: React.FormEvent) => {
    e.preventDefault();
    const newDrinks = drinkAdder.addDrink(drinks, {
      name: formData.name,
      price: parseFloat(formData.price),
      image_url: formData.image_url,
      like: 0,
      is_new: formData.is_new,
      category: formData.category
    });
    setDrinks(newDrinks);
    // Reset form
    setFormData({
      name: '',
      price: '',
      image_url: '',
      category: '',
      is_new: false
    });
    // Hide form after adding
    setShowAddForm(false);
  };
  
  const handleLike = (id: string) => {
    setDrinks(drinkUpdater.incrementLikes(drinks, id));
  };
  
  const handleDelete = (id: string) => {
    setDrinks(drinkDeleter.deleteDrink(drinks, id));
  };
  
  const handleToggleNew = (id: string) => {
    setDrinks(drinkUpdater.toggleNewStatus(drinks, id));
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Add button ref and click outside handler to close form
  const formRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setShowAddForm(false);
      }
    }
    
    if (showAddForm) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAddForm]);

  return (
    <div className="min-h-screen p-8 bg-blue-50 font-sans">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Drink Store</h1>
      
      {/* Add Drink Button */}
      <div className="max-w-6xl mx-auto mb-8 flex justify-end">
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <span className="text-2xl">+</span>
        </button>
      </div>
      
      {/* Add Drink Form with Blur Background (conditionally rendered) */}
      {showAddForm && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(255, 255, 255, 0.4)'
          }}
        >
          <div 
            ref={formRef} 
            className="max-w-md w-full bg-white p-6 rounded-lg shadow-xl animate-fadeIn"
            style={{
              animation: 'fadeIn 0.3s ease-out'
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-800">Add New Drink</h2>
              <button 
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleAddDrink}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="image_url">Image URL:</label>
                <input
                  type="text"
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="category">Category:</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  required
                />
              </div>
              
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="is_new"
                  name="is_new"
                  checked={formData.is_new}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="is_new" className="text-gray-700">Mark as New</label>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="py-2 px-4 border border-gray-300 rounded hover:bg-gray-100 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                >
                  Add Drink
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Drinks Grid */}
      <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
        {drinks.map((drink) => (
          <DrinkItem 
            key={drink.id} 
            drink={drink} 
            onLike={handleLike}
            onDelete={handleDelete}
            onToggleNew={handleToggleNew}
          />
        ))}
      </div>
      
      {/* Add animation keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

interface DrinkItemProps {
  drink: Drink;
  onLike: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleNew: (id: string) => void;
}

const DrinkItem: React.FC<DrinkItemProps> = ({ drink, onLike, onDelete, onToggleNew }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md w-64 overflow-hidden cursor-pointer transition-transform duration-300"
      style={{
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={drink.image_url} 
          alt={drink.name}
          className="w-full h-full object-cover transition-transform duration-300"
          style={{
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        />
        {drink.is_new && (
          <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold z-10">
            New
          </span>
        )}
        
        {/* Menu button */}
        <div className="absolute top-2 right-2 z-20" ref={menuRef}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-md"
          >
            <span className="text-gray-700">⋮</span>
          </button>
          
          {/* Dropdown menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-30">
              <div className="py-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLike(drink.id);
                    setMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <span className="mr-2">❤️</span>
                  <span>Like ({drink.like})</span>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleNew(drink.id);
                    setMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <span className="mr-2">🔄</span>
                  <span>{drink.is_new ? "Remove New Tag" : "Mark as New"}</span>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(drink.id);
                    setMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <span className="mr-2">🗑️</span>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          )}
        </div>
        
        <span className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs z-10">
          {drink.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-3 text-gray-800">{drink.name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold text-blue-600">${drink.price.toFixed(2)}</span>
          <div className="flex items-center gap-1">
            <span className="text-red-500">❤️</span>
            <span>{drink.like}</span>
          </div>
        </div>
      </div>
    </div>
  );
};