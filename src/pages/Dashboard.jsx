import React, { useState } from "react";
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  Download,
  Home,
  IndianRupee,
  LogOut,
  Mail,
  NotebookIcon,
  NotepadText,
  Package,
  Printer,
  Search,
  Settings,
  ShoppingCart,
  Users,
  Wallet,
  Plus,
  Edit,
  Trash,
} from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CountryDropdown from "../components/CountryDropdown";

const MetricCard = ({ title, value, percentage, isPositive }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="flex flex-col sm:flex-row sm:justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-xl font-bold mt-1">{value}</h3>
      </div>
      <div
        className={`mt-2 sm:mt-0 ${
          isPositive ? "text-green-500" : "text-red-500"
        }`}
      >
        {percentage}% {isPositive ? "↑" : "↓"}
      </div>
    </div>
    <div className="mt-4 h-2 w-full bg-gray-200 rounded">
      <div
        className={`h-full rounded ${
          isPositive ? "bg-green-500" : "bg-red-500"
        }`}
        style={{ width: `${Math.abs(percentage)}%` }}
      ></div>
    </div>
  </div>
);

const SidebarButton = ({ icon, children, isActive, onClick }) => (
  <button
    className={`flex items-center gap-2 w-full px-4 py-2 text-left rounded-lg ${
      isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    {icon}
    <span>{children}</span>
  </button>
);

const ProductForm = ({ onClose, onSubmit, formData, inputChange }) => (
  <form
  onSubmit={onSubmit}
  className="w-full max-w-xl space-y-4 bg-white px-5 pb-3 rounded-lg shadow-lg mx-auto transform transition-all duration-500 ease-out opacity-0 translate-y-4"
  style={{ animation: "fadeSlideUp 0.6s forwards" }}
>
  <style>
    {`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}
  </style>
  <div className="flex justify-between items-center px-0 py-2">
    <h3 className="text-lg font-bold">Add New Product</h3>
    <button
      onClick={onClose}
      className="text-gray-500 hover:text-gray-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>

  {/* Form fields */}
  {[
    {
      id: "productName",
      label: "Product Name",
      placeholder: "Enter product name",
    },
    {
      id: "price",
      label: "Price",
      placeholder: "Enter price",
      type: "number",
    },
    {
      id: "description",
      label: "Description",
      placeholder: "Enter description",
    },
    { id: "hsnCode", label: "HSN Code", placeholder: "Enter HSN code" },
    { id: "cgst", label: "CGST", placeholder: "Enter CGST", type: "number" },
    { id: "sgst", label: "SGST", placeholder: "Enter SGST", type: "number" },
    { id: "igst", label: "IGST", placeholder: "Enter IGST", type: "number" },
  ].map(({ id, label, placeholder, type = "text" }) => (
    <div key={id} className="relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-105"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={formData[id]}
        onChange={inputChange}
        className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-105"
        placeholder={placeholder}
      />
    </div>
  ))}

  {/* Submit button */}
  <button
    type="submit"
    className="w-full px-4 py-2 mt-4 font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-indigo-500 hover:to-blue-500 transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
  >
    Add Product
  </button>
</form>

);

const CustomerForm = ({ onClose, onSubmit, formData, inputChange,inputChange2}) => (
  <form
    onSubmit={onSubmit}
    className="space-y-4 bg-white px-5 pb-3 rounded-lg shadow-lg max-w-2xl mx-auto transform transition-all duration-500 ease-out opacity-0 translate-y-4"
    style={{ animation: "fadeSlideUp 0.6s forwards" }}
  >
    <style>
      {`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
    </style>
    <div className="flex justify-between items-center px-0 p-2">
                    <h3 className="text-lg font-bold">Add New Customer</h3>
                    <button
                      onClick={onClose}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
    {/* Personal Info */}
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-105"
        >
          First Name
        </label>
        <input
          id="firstName"
          value={formData.firstName}
          onChange={inputChange}
          className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-105"
          placeholder="Enter first name"
        />
      </div>

      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-105"
        >
          Last Name
        </label>
        <input
          id="lastName"
          value={formData.lastName}
          onChange={inputChange}
          className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-105"
          placeholder="Enter last name"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label
          htmlFor="companyName"
          className="block text-sm font-medium text-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-105"
        >
          {" "}
          Company Name
        </label>
        <input
          id="companyName"
          value={formData.companyName}
          onChange={inputChange}
          className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-105"
          placeholder="Enter company name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-105"
        >
          {" "}
          Email
        </label>
        <input
          id="email"
          value={formData.email}
          onChange={inputChange}
          className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-105"
          placeholder="Enter email"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-105"
        >
          {" "}
          Phone
        </label>
        <input
          id="phone"
          value={formData.phone}
          onChange={inputChange}
          className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-105"
          placeholder="Enter phone number"
        />
      </div>

      <div>
        <label
          htmlFor="gstNumber"
          className="block text-sm font-medium text-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-105"
        >
          {" "}
          GST Number
        </label>
        <input
          id="gstNumber"
          value={formData.gstNumber}
          onChange={inputChange}
          className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-105"
          placeholder="Enter GST number"
        />
      </div>
    </div>

    {/* Billing and Shipping Address - Two Column Layout */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        
        <label 
        htmlFor="billingAddress"
        className="block text-sm font-medium text-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-105">
          {" "}
          Billing Address
        </label>
        <input
          id="billingAddress.country"
          value={formData.billingAddress.country}
          onChange={inputChange2}
          placeholder="Country"
          className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-105"
        />
        <input
          id="billingAddress.address1"
          value={formData.billingAddress.address1}
          onChange={inputChange2}
          placeholder="Address"
          className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-105"
        />
        <input
          id="billingAddress.city"
          value={formData.billingAddress.city}
          onChange={inputChange2}
          placeholder="City"
          className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-105"
        />
        <input
          id="billingAddress.state"
          value={formData.billingAddress.state}
          onChange={inputChange2}
          placeholder="State"
          className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-105"
        />
        <input
          id="billingAddress.pincode"
          value={formData.billingAddress.pincode}
          onChange={inputChange2}
          placeholder="Pincode"
          className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-105"
        />
        <input
          id="billingAddress.phone"
          value={formData.billingAddress.phone}
          onChange={inputChange2}
          placeholder="Phone"
          className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-105"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-105">
          {" "}
          Shipping Address
        </label>
        <input
          id="shippingAddress.country"
          value={formData.shippingAddress.country}
          onChange={inputChange2}
          placeholder="Country"
          className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-105"
        />
        <input
          id="shippingAddress.address1"
          value={formData.shippingAddress.address1}
          onChange={inputChange2}
          placeholder="Address"
          className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-105"
        />
        <input
          id="shippingAddress.city"
          value={formData.shippingAddress.city}
          onChange={inputChange2}
          placeholder="City"
          className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-105"
        />
        <input
          id="shippingAddress.state"
          value={formData.shippingAddress.state}
          onChange={inputChange2}
          placeholder="State"
          className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-105"
        />
        <input
          id="shippingAddress.pincode"
          value={formData.shippingAddress.pincode}
          onChange={inputChange2}
          placeholder="Pincode"
          className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-105"
        />
        <input
          id="shippingAddress.phone"
          value={formData.shippingAddress.phone}
          onChange={inputChange2}
          placeholder="Phone"
          className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-105"
        />
      </div>
    </div>

    <div className="text-center">
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        Submit
      </button>
    </div>
  </form>
);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [isShimmer, setisShimmer] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);

  const navigate = useNavigate();
  const { userData } = location.state || {};

  // useEffect to check if userData is present
  useEffect(() => {
    // console.log("condition:", userData.first_name!="");
    if (activeTab === "home") {
      console.log("userData:", userData);
      if (
        userData.first_name == "" ||
        userData.last_name == "" ||
        userData.phone == ""
      ) {
        setShowForm(true); // Show the form if userData is missing
      } else {
        setShowForm(false);
        setisShimmer(false);
      }
    }  else if (activeTab === "products") {
      fetchProducts();
    } else if(activeTab === "customers"){
      fetchCustomers();
    }
  }, [activeTab]);

  const Shimmer = () => (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-300 rounded mb-4"></div>
      <div className="h-8 bg-gray-300 rounded mb-4"></div>
      <div className="h-8 bg-gray-300 rounded mb-4"></div>
    </div>
  );

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    companyName: "",
    companyFullAddress: "",
    GST: "",
    country: "India",
    city: "",
    pincode: "",
    phone: "",
  });

  const [productFormData, setProductFormData] = useState({
    productName: "",
    price: "",
    description: "",
    hsnCode: "",
    cgst: "",
    sgst: "",
    igst: "",
  });

  const clearProductFormData = () => {
    setProductFormData({
      productName: "",
      price: "",
      description: "",
      hsnCode: "",
      cgst: "",
      sgst: "",
      igst: "",
    });
  };

  const [customerFormData, setCustomerFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    gstNumber: "",
    billingAddress: {
      country: "India",
      address1: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
    },
    shippingAddress: {
      country: "India",
      address1: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
    },
  });

  const clearCustomerFormData = () => {
    setCustomerFormData({
      firstName: "",
      lastName: "",
      companyName: "",
      email: "",
      phone: "",
      gstNumber: "",
      billingAddress: {
        country: "India",
        address1: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
      },
      shippingAddress: {
        country: "India",
        address1: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
      },
    });
  };
 

  // Handle product form submission
  const producutHandleFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data structure for the API call
    const requestData = {
      productName: productFormData.productName,
      price: Number(productFormData.price),
      description: productFormData.description,
      hsnCode: productFormData.hsnCode,
      tax: {
        cgst: `${Number(productFormData.cgst)}%`,
        sgst: `${Number(productFormData.sgst)}%`,
        igst: `${Number(productFormData.igst)}%`,
      },
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "http://localhost:3000/api/products/addProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("Product added successfully:", result);
        alert("Product added successfully!");
        setShowProductForm(false);
        clearProductFormData();
        fetchProducts();
      } else {
        alert("Error adding product: " + result.message);
        setShowProductForm(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add product.");
      setShowProductForm(false);
    }
  };

  const customerHandleFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data structure for the API call
    const requestData = {
      firstName: customerFormData.firstName,
      lastName: customerFormData.lastName,
      companyName: customerFormData.companyName,
      email: customerFormData.email,
      phone: Number(customerFormData.phone),
      gstNumber: customerFormData.email,
      billingAddress: {
        country: customerFormData.billingAddress.country,
        address1: customerFormData.billingAddress.address1,
        city: customerFormData.billingAddress.city,
        state: customerFormData.billingAddress.state,
        pincode: customerFormData.billingAddress.pincode,
        phone: customerFormData.billingAddress.phone,
      },
      shippingAddress: {
        country: customerFormData.shippingAddress.country,
        address1: customerFormData.shippingAddress.address1,
        city: customerFormData.shippingAddress.city,
        state: customerFormData.shippingAddress.state,
        pincode: customerFormData.shippingAddress.pincode,
        phone: customerFormData.shippingAddress.phone,
      },
    };

    console.log('requestData', requestData);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "http://localhost:3000/api/customers/createCustomer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();
      console.log('result:',result);
      if (response.ok) {
        console.log("Customer added successfully:", result);
        alert("Customer added successfully!");
        setShowCustomerForm(false);
        clearCustomerFormData();
      } else {
        alert("Error adding customer: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add customer.");
    }
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "http://localhost:3000/api/products/fetchProducts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("data.products:", data.products);
        setAllProducts(data.products);
      } else {
        console.error("Failed to fetch products:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "http://localhost:3000/api/customers/fetchAllCustomer",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("data.customers:", data);
        setAllCustomers(data.customer);
        // fetchCustomers();
      } else {
        console.error("Failed to fetch products:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

 
  // Handle form input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };
  // Handle form input change
  const productHandleInputChange = (e) => {
    const { id, value } = e.target;
    setProductFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const customerHandleInputChange = (e) => {
    const { id, value } = e.target;
    setCustomerFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const customerHandleInputChange2 = (e) => {
    const { id, value } = e.target;
  const [section, field] = id.split('.');
  
  setCustomerFormData((prevData) => ({
    ...prevData,
    [section]: {
      ...prevData[section],
      [field]: value,
    },
  }));
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authToken"); // Check if the user is logged in
    if (!isAuthenticated) {
      navigate("/signin"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear the auth token from localStorage
    localStorage.removeItem("authToken");

    // Redirect the user to the login page
    navigate("/");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <>
            {/* Metrics */}
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {isShimmer ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-20 bg-gray-200 rounded-lg animate-pulse"
                  ></div>
                ))
              ) : (
                <>
                  <MetricCard
                    title="Total Customers"
                    value="₹329.50"
                    percentage="50.43"
                    isPositive={true}
                  />
                  <MetricCard
                    title="Total Revenue"
                    value="₹200.00"
                    percentage="12.32"
                    isPositive={true}
                  />
                  <MetricCard
                    title="Total Invoice Generated"
                    value="₹200.00"
                    percentage="10.89"
                    isPositive={false}
                  />
                  <MetricCard
                    title="Product Count"
                    value="₹200.00"
                    percentage="20.92"
                    isPositive={true}
                  />
                </>
              )}
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
                {isShimmer ? (
                  <div className="p-4">
                    <Shimmer />
                  </div>
                ) : (
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
                            <Download className="h-5 w-5 inline-block mr-1" />{" "}
                            Download
                          </button>
                          <button className="px-2 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600">
                            <Printer className="h-5 w-5 inline-block mr-1" />{" "}
                            Print
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
                )}
              </div>
            </div>
          </>
        );
      case "products":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Products</h2>
              <button
                onClick={() => setShowProductForm(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
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
                    <th className="px-4 py-2 text-left">CGST</th>
                    <th className="px-4 py-2 text-left">SGST</th>
                    <th className="px-4 py-2 text-left">IGST</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allProducts.map((product) => (
                    <tr key={product._id} className="border-t">
                      <td className="px-4 py-2">{product.productName}</td>
                      <td className="px-4 py-2">₹{product.price}</td>
                      <td className="px-4 py-2">{product.hsnCode}</td>
                      <td className="px-4 py-2">{product.tax.cgst}</td>
                      <td className="px-4 py-2">{product.tax.sgst}</td>
                      <td className="px-4 py-2">{product.tax.igst}</td>
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
                  ))}
                </tbody>
              </table>
            </div>
            {showProductForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-0">
                <ProductForm
                onClose={()=>setShowProductForm(false)}
                    onSubmit={producutHandleFormSubmit}
                    formData={productFormData}
                    inputChange={productHandleInputChange}
                  />
              </div>
            )}
          </div>
        );
      case "customers":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Customers</h2>
              <button
                onClick={() => setShowCustomerForm(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
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
                  {allCustomers.map((customer) => (
                    <tr key={customer._id} className="border-t">
                      <td className="px-4 py-2">{customer.firstName  + " " + customer.lastName }</td>
                      <td className="px-4 py-2">{customer.companyName || 'N/A'} </td>
                      <td className="px-4 py-2">{customer.email || 'N/A'}</td>
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
                  ))}
                </tbody>
              </table>
            </div>
            {showCustomerForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-0">
               <CustomerForm
                    onClose={() => setShowCustomerForm(false)}
                    onSubmit={customerHandleFormSubmit}
                    formData={customerFormData}
                    inputChange={customerHandleInputChange}
                    inputChange2={customerHandleInputChange2}
                  />
              </div>
            )}
          </div>
        );
      case "invoices":
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
        );
      case "purchase-orders":
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
        );
      default:
        return null;
    }
  };

  // Handle form submit
  const handleFormSubmitUserDetails = async (e) => {
    console.log("formData", formData);
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken"); // Replace this with your actual token, or retrieve it dynamically (e.g., from localStorage, context, etc.)
      console.log("request data", JSON.stringify(formData));
      const response = await fetch(
        "http://localhost:3000/api/auth/updatePofile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Adding token to Authorization header
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        // console.log("result",result);
        alert("Profile updated successfully!");
        setShowForm(false);
        setisShimmer(false);
      } else {
        alert("Error updating profile: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update profile.");
    }
  };

 
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
          <span className="text-xl font-bold">Raseed.io</span>
        </div>

        <nav className="space-y-2">
          {/* Sidebar buttons */}
          <SidebarButton
            icon={<Home className="h-5 w-5" />}
            isActive={activeTab === "home"}
            onClick={() => setActiveTab("home")}
          >
            Home
          </SidebarButton>
          <SidebarButton
            icon={<Package className="h-5 w-5" />}
            isActive={activeTab === "products"}
            onClick={() => setActiveTab("products")}
          >
            Products
          </SidebarButton>
          <SidebarButton
            icon={<Users className="h-5 w-5" />}
            isActive={activeTab === "customers"}
            onClick={() => setActiveTab("customers")}
          >
            Customers
          </SidebarButton>
          <SidebarButton
            icon={<NotebookIcon className="h-5 w-5" />}
            isActive={activeTab === "invoices"}
            onClick={() => setActiveTab("invoices")}
          >
            Invoices
          </SidebarButton>
          <SidebarButton
            icon={<NotepadText className="h-5 w-5" />}
            isActive={activeTab === "templates"}
            onClick={() => setActiveTab("templates")}
          >
            Templates
          </SidebarButton>
          <SidebarButton
            icon={<IndianRupee className="h-5 w-5" />}
            isActive={activeTab === "purchase-orders"}
            onClick={() => setActiveTab("purchase-orders")}
          >
            Purchase Orders
          </SidebarButton>
        </nav>

        <div className="absolute bottom-4 space-y-2">
          <SidebarButton icon={<Settings className="h-5 w-5" />}>
            Settings
          </SidebarButton>
          <SidebarButton
            icon={<LogOut className="h-5 w-5" />}
            onClick={handleLogout}
          >
            Log out
          </SidebarButton>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button className="p-2 hover:bg-gray-500 rounded-full border-4">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="pt-5">
              {isShimmer ? (
                <div className="h-8 w-40 bg-gray-200 rounded-md animate-pulse"></div>
              ) : (
                <h1 className="text-2xl font-bold">
                  Hello{" "}
                  {userData.first_name != ""
                    ? capitalizeFirstLetter(userData.first_name)
                    : "User"}
                  !
                </h1>
              )}
            </div>
            <p className="text-gray-500">Welcome back to dashboard.</p>
          </div>
          <div className="flex items-center gap-4 pt-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                className="w-full md:w-80 pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
              />
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

      {showForm && (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
       <div
         className="bg-white p-5 rounded-lg shadow-lg w-2/3 max-w-2xl mx-auto transform transition-all duration-500 ease-out opacity-0 translate-y-4"
         style={{ animation: "fadeSlideUp 0.6s forwards", maxHeight: "90vh", overflowY: "auto" }}
       >
         <style>
           {`
             @keyframes fadeSlideUp {
               from { opacity: 0; transform: translateY(10px); }
               to { opacity: 1; transform: translateY(0); }
             }
           `}
         </style>
     
         <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
           Enter Your Details
         </h2>
     
         <form onSubmit={handleFormSubmitUserDetails} className="space-y-4">
           <div className="relative">
             <label
               htmlFor="first_name"
               className="block text-sm font-medium text-gray-600"
             >
               First Name
             </label>
             <input
               type="text"
               id="first_name"
               value={formData.first_name}
               onChange={handleInputChange}
               className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-40 transition-all duration-300 ease-in-out hover:shadow-md"
               required
             />
           </div>
     
           <div className="relative">
             <label
               htmlFor="last_name"
               className="block text-sm font-medium text-gray-600"
             >
               Last Name
             </label>
             <input
               type="text"
               id="last_name"
               value={formData.last_name}
               onChange={handleInputChange}
               className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-40 transition-all duration-300 ease-in-out hover:shadow-md"
               required
             />
           </div>
     
           <div className="relative">
             <label
               htmlFor="phone"
               className="block text-sm font-medium text-gray-600"
             >
               Phone
             </label>
             <input
               type="text"
               id="phone"
               value={formData.phone}
               onChange={handleInputChange}
               className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-40 transition-all duration-300 ease-in-out hover:shadow-md"
               required
             />
           </div>
     
           <div className="relative">
             <label
               htmlFor="companyName"
               className="block text-sm font-medium text-gray-600"
             >
               Company Name
             </label>
             <input
               type="text"
               id="companyName"
               value={formData.companyName}
               onChange={handleInputChange}
               className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-40 transition-all duration-300 ease-in-out hover:shadow-md"
               required
             />
           </div>
     
           <div className="relative">
             <label
               htmlFor="companyFullAddress"
               className="block text-sm font-medium text-gray-600"
             >
               Company Address
             </label>
             <input
               type="text"
               id="companyFullAddress"
               value={formData.companyFullAddress}
               onChange={handleInputChange}
               className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-40 transition-all duration-300 ease-in-out hover:shadow-md"
               required
             />
           </div>
     
           <div className="relative">
             <label
               htmlFor="GST"
               className="block text-sm font-medium text-gray-600"
             >
               GST
             </label>
             <input
               type="text"
               id="GST"
               value={formData.GST}
               onChange={handleInputChange}
               className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-40 transition-all duration-300 ease-in-out hover:shadow-md"
               required
             />
           </div>
     
           <div className="relative">
             <label
               htmlFor="country"
               className="block text-sm font-medium text-gray-600"
             >
               Country
             </label>
             <input
               type="text"
               id="country"
               value={formData.country}
               onChange={handleInputChange}
               className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-40 transition-all duration-300 ease-in-out hover:shadow-md"
               required
             />
           </div>
     
           <div className="relative">
             <label
               htmlFor="city"
               className="block text-sm font-medium text-gray-600"
             >
               City
             </label>
             <input
               type="text"
               id="city"
               value={formData.city}
               onChange={handleInputChange}
               className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-40 transition-all duration-300 ease-in-out hover:shadow-md"
               required
             />
           </div>
     
           <div className="relative">
             <label
               htmlFor="pincode"
               className="block text-sm font-medium text-gray-600"
             >
               Pincode
             </label>
             <input
               type="text"
               id="pincode"
               value={formData.pincode}
               onChange={handleInputChange}
               className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-40 transition-all duration-300 ease-in-out hover:shadow-md"
               required
             />
           </div>
     
           <button
             type="submit"
             className="w-full px-4 py-2 mt-4 font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
           >
             Submit
           </button>
         </form>
       </div>
     </div>
     
      )}
    </div>
  );
}
