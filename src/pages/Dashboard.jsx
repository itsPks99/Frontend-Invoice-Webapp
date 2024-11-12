import React, { useState } from 'react'
import { Bell, ChevronDown, ChevronLeft, Download, Home, IndianRupee, LogOut, Mail, NotebookIcon, NotepadText, Package, Printer, Search, Settings, ShoppingCart, Users, Wallet, Plus, Edit, Trash } from "lucide-react"

import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const MetricCard = ({ title, value, percentage, isPositive }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="flex flex-col sm:flex-row sm:justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-xl font-bold mt-1">{value}</h3>
      </div>
      <div className={`mt-2 sm:mt-0 ${isPositive ? "text-green-500" : "text-red-500"}`}>
        {percentage}% {isPositive ? "↑" : "↓"}
      </div>
    </div>
    <div className="mt-4 h-2 w-full bg-gray-200 rounded">
      <div
        className={`h-full rounded ${isPositive ? "bg-green-500" : "bg-red-500"}`}
        style={{ width: `${Math.abs(percentage)}%` }}
      ></div>
    </div>
  </div>
)

const SidebarButton = ({ icon, children, isActive, onClick }) => (
  <button 
    className={`flex items-center gap-2 w-full px-4 py-2 text-left rounded-lg ${isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
    onClick={onClick}
  >
    {icon}
    <span>{children}</span>
  </button>
)

const ProductForm = ({ onClose }) => (
  <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="space-y-4">
    <div>
      <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
      <input id="productName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter product name" />
    </div>
    <div>
      <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
      <input id="price" type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter price" />
    </div>
    <div>
      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
      <input id="description" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter description" />
    </div>
    <div>
      <label htmlFor="hsnCode" className="block text-sm font-medium text-gray-700">HSN Code</label>
      <input id="hsnCode" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter HSN code" />
    </div>
    <div>
      <label htmlFor="cgst" className="block text-sm font-medium text-gray-700">CGST</label>
      <input id="cgst" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter CGST" />
    </div>
    <div>
      <label htmlFor="sgst" className="block text-sm font-medium text-gray-700">SGST</label>
      <input id="sgst" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter SGST" />
    </div>
    <div>
      <label htmlFor="igst" className="block text-sm font-medium text-gray-700">IGST</label>
      <input id="igst" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter IGST" />
    </div>
    <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Add Product</button>
  </form>
)

const CustomerForm = ({ onClose }) => (
  <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="space-y-4">
    <div>
      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
      <input id="firstName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter first name" />
    </div>
    <div>
      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
      <input id="lastName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter last name" />
    </div>
    <div>
      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
      <input id="companyName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter company name" />
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
      <input id="email" type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter email" />
    </div>
    <div>
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
      <input id="phone" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter phone number" />
    </div>
    <div>
      <label htmlFor="gstNumber" className="block text-sm font-medium text-gray-700">GST Number</label>
      <input id="gstNumber" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter GST number" />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Billing Address</label>
      <input placeholder="Country" className="mt-1 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      <input placeholder="Address" className="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      <input placeholder="City" className="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      <input placeholder="State" className="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      <input placeholder="Pincode" className="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      <input placeholder="Phone" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
      <input placeholder="Country" className="mt-1 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      <input placeholder="Address" className="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      <input placeholder="City" className="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      <input placeholder="State" className="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      <input placeholder="Pincode" className="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      <input placeholder="Phone" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    </div>
    <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Add Customer</button>
  </form>
)




export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home')
  const [showProductForm, setShowProductForm] = useState(false)
  const [showCustomerForm, setShowCustomerForm] = useState(false)


  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authToken'); // Check if the user is logged in
    if (!isAuthenticated) {
      navigate('/signin'); // Redirect to login if not authenticated
    }
  }, [navigate]);

const handleLogout = () => {
  // Clear the auth token from localStorage
  localStorage.removeItem('authToken');
  
  // Redirect the user to the login page
  navigate('/');
};

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            {/* Metrics */}
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard title="Total Customers" value="₹329.50" percentage="50.43" isPositive={true} />
              <MetricCard title="Total Revenue" value="₹200.00" percentage="12.32" isPositive={true} />
              <MetricCard title="Total Invoice Generated" value="₹200.00" percentage="10.89" isPositive={false} />
              <MetricCard title="Product Count" value="₹200.00" percentage="20.92" isPositive={true} />
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex items-center justify-between p-4">
                <h3 className="text-lg font-medium">Recent Invoices</h3>
                <select className="p-2 border rounded">
                  <option>This Weekly</option>
                  <option>This Monthly</option>
                  <option>This Yearly</option>
                </select>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left">Invoice ID</th>
                      <th className="px-4 py-2 text-left">Biller Name</th>
                      <th className="px-4 py-2 text-left">Bill Date</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Qty</th>
                      <th className="px-4 py-2 text-left">Total</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                      <th className="px-4 py-2 text-left">Send To User</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-2">#12345</td>
                      <td className="px-4 py-2">Product Name</td>
                      <td className="px-4 py-2">2024-01-20</td>
                      <td className="px-4 py-2">
                        <span className="inline-block rounded-full bg-green-100 px-2 py-1 text-xs text-green-600">
                          Completed
                        </span>
                      </td>
                      <td className="px-4 py-2">1</td>
                      <td className="px-4 py-2">$99.99</td>
                      <td className="px-4 py-2 flex space-x-2">
                        <button className="px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                          <Download className="h-5 w-5 inline-block mr-1" /> Download
                        </button>
                        <button className="px-2 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600">
                          <Printer className="h-5 w-5 inline-block mr-1" /> Print
                        </button>
                      </td>
                      <td className="px-4 py-2">
                        <button className="px-2 py-1 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600">
                          Send Email
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )
      case 'products':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Products</h2>
              <button onClick={() => setShowProductForm(true)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <Plus className="h-4 w-4 inline-block mr-2" />
                Add Product
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">Product Name</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">HSN Code</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2">Rings 2</td>
                    <td className="px-4 py-2">₹999</td>
                    <td className="px-4 py-2">129834</td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <button className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200">
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {showProductForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white p-6 rounded-lg w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Add New Product</h3>
                    <button onClick={() => setShowProductForm(false)} className="text-gray-500 hover:text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <ProductForm onClose={() => setShowProductForm(false)} />
                </div>
              </div>
            )}
          </div>
        )
      case 'customers':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Customers</h2>
              <button onClick={() => setShowCustomerForm(true)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <Plus className="h-4 w-4 inline-block mr-2" />
                Add Customer
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Company</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2">Soyal Khan</td>
                    <td className="px-4 py-2">SKS Enterprises</td>
                    <td className="px-4 py-2">Soyal@example.com</td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <button className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200">
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {showCustomerForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white p-6 rounded-lg w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Add New Customer</h3>
                    <button onClick={() => setShowCustomerForm(false)} className="text-gray-500 hover:text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <CustomerForm onClose={() => setShowCustomerForm(false)} />
                </div>
              </div>
            )}
          </div>
        )
      case 'invoices':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Invoices</h2>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <Plus className="h-4 w-4 inline-block mr-2" />
                Create Invoice
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">Invoice ID</th>
                    <th className="px-4 py-2 text-left">Customer</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2">#INV001</td>
                    <td className="px-4 py-2">Soyal Khan</td>
                    <td className="px-4 py-2">2024-01-25</td>
                    <td className="px-4 py-2">₹1,999</td>
                    <td className="px-4 py-2">
                      <span className="inline-block rounded-full bg-green-100 px-2 py-1 text-xs text-green-600">
                        Paid
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <button className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200">
                          <Mail className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      case 'purchase-orders':
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Purchase Orders</h2>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <Plus className="h-4 w-4 inline-block mr-2" />
                Create Purchase Order
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">PO Number</th>
                    <th className="px-4 py-2 text-left">Supplier</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Total Amount</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2">#PO001</td>
                    <td className="px-4 py-2">Supplier Inc.</td>
                    <td className="px-4 py-2">2024-01-26</td>
                    <td className="px-4 py-2">₹5,000</td>
                    <td className="px-4 py-2">
                      <span className="inline-block rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-600">
                        Pending
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <button className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white p-4 md:h-screen">
        <div className="flex items-center gap-2 pb-8">
          <div className="rounded-full bg-blue-500 p-2">
            <img
              alt="Logo"
              src="/placeholder.svg?height=24&width=24"
              className="h-6 w-6"
            />
          </div>
          <span className="text-xl font-bold">Infysales</span>
        </div>
        
        <nav className="space-y-2">
          <SidebarButton icon={<Home className="h-5 w-5" />} isActive={activeTab === 'home'} onClick={() => setActiveTab('home')}>Home</SidebarButton>
          <SidebarButton icon={<Package className="h-5 w-5" />} isActive={activeTab === 'products'} onClick={() => setActiveTab('products')}>Products</SidebarButton>
          <SidebarButton icon={<Users className="h-5 w-5" />} isActive={activeTab === 'customers'} onClick={() => setActiveTab('customers')}>Customers</SidebarButton>
          <SidebarButton icon={<NotebookIcon className="h-5 w-5" />} isActive={activeTab === 'invoices'} onClick={() => setActiveTab('invoices')}>Invoices</SidebarButton>
          <SidebarButton icon={<NotepadText className="h-5 w-5" />} isActive={activeTab === 'templates'} onClick={() => setActiveTab('templates')}>Templates</SidebarButton>
          <SidebarButton icon={<IndianRupee className="h-5 w-5" />} isActive={activeTab === 'purchase-orders'} onClick={() => setActiveTab('purchase-orders')}>Purchase Orders</SidebarButton>
        </nav>

        <div className="absolute bottom-4 space-y-2">
          <SidebarButton icon={<Settings className="h-5 w-5" />}>Settings</SidebarButton>
          <SidebarButton icon={<LogOut className="h-5 w-5" />}onClick={handleLogout}> Log out</SidebarButton>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button className="p-2 hover:bg-gray-500 rounded-full border-4">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold">Hello Soyal!</h1>
            <p className="text-gray-500">Welcome back to dashboard.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input className="w-full md:w-80 pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search..." />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Mail className="h-5 w-5" />
            </button>
          </div>
        </div>

        {renderTabContent()}
      </main>
    </div>
  )
}