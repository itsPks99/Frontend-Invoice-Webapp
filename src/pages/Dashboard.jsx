import React, { useState } from "react";
import Swal from "sweetalert2";
import CustomerForm from "../components/CustomerForm";
import ProductForm from "../components/ProductForm";
import Invoice from "../components/InvoiceTemplates/InvoiceTemplate1";
import Invoice2 from "../components/InvoiceTemplates/InvoiceTemplate2";
import Invoice3 from "../components/InvoiceTemplates/InvoiceTemplate3";
import PreviewPage from "../components/PreviewPage";
import {
  Home,
  Package,
  Users,
  NotebookIcon,
  NotepadText,
  IndianRupee,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Download,
  Mail,
  Printer,
  NotebookTabs,
  Plus,
  Edit,
  Trash,
} from "lucide-react";
import { useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CreateInvoicePage from "../components/CreateInvoicePage";
import { useClickAway } from "react-use";
import PickState from "../components/PickState";
import { HexColorPicker } from "react-colorful";
import StatementTab from "../components/StatementTab";

const MetricCard = ({ title, value, percentage, isPositive }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="flex flex-col sm:flex-row sm:justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-xl font-bold mt-1">{value}</h3>
      </div>
      {/* <div
        className={`mt-2 sm:mt-0 ${
          isPositive ? "text-green-500" : "text-red-500"
        }`}
      >
        {percentage}% {isPositive ? "↑" : "↓"}
      </div> */}
    </div>
    {/* <div className="mt-4 h-2 w-full bg-gray-200 rounded">
      <div
        className={`h-full rounded ${
          isPositive ? "bg-green-500" : "bg-red-500"
        }`}
        style={{ width: `${Math.abs(percentage)}%` }}
      ></div>
    </div> */}
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

// const ProductForm = ({ onClose, onSubmit, formData, inputChange }) => (
//   <form
//     onSubmit={onSubmit}
//     className="w-full max-w-xl space-y-4 bg-white px-5 pb-3 rounded-lg shadow-lg mx-auto transform transition-all duration-500 ease-out opacity-0 translate-y-4"
//     style={{ animation: "fadeSlideUp 0.6s forwards" }}
//   >
//     <style>
//       {`
//         @keyframes fadeSlideUp {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//       `}
//     </style>
//     <div className="flex justify-between items-center px-0 py-2">
//       <h3 className="text-lg font-bold">Add New Product</h3>
//       <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M6 18L18 6M6 6l12 12"
//           />
//         </svg>
//       </button>
//     </div>

//     {/* Form fields */}
//     {[
//       {
//         id: "productName",
//         label: "Product Name",
//         placeholder: "Enter product name",
//       },
//       {
//         id: "price",
//         label: "Price",
//         placeholder: "Enter price",
//         type: "number",
//       },
//       {
//         id: "description",
//         label: "Description",
//         placeholder: "Enter description",
//       },
//       { id: "hsnCode", label: "HSN Code", placeholder: "Enter HSN code" },
//       { id: "cgst", label: "CGST", placeholder: "Enter CGST", type: "number" },
//       { id: "sgst", label: "SGST", placeholder: "Enter SGST", type: "number" },
//       { id: "igst", label: "IGST", placeholder: "Enter IGST", type: "number" },
//     ].map(({ id, label, placeholder, type = "text" }) => (
//       <div key={id} className="relative">
//         <label
//           htmlFor={id}
//           className="block text-sm font-medium text-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-101"
//         >
//           {label}
//         </label>
//         <input
//           id={id}
//           name={id}
//           type={type}
//           value={formData[id]}
//           onChange={inputChange}
//           className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
//           placeholder={placeholder}
//         />
//       </div>
//     ))}

//     {/* Submit button */}
//     <button
//       type="submit"
//       className="w-full px-4 py-2 mt-4 font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-indigo-500 hover:to-blue-500 transition-transform duration-300 transform hover:scale-101 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//     >
//       Add Product
//     </button>
//   </form>
// );

// const CustomerForm = ({
//   onClose,
//   onSubmit,
//   formData,
//   inputChange,
//   inputChange2,
//   copyShipping,
//   checkboxChange
// }) => (
//   <form
//     onSubmit={onSubmit}
//     className="space-y-4 bg-white px-5 pb-3 rounded-lg shadow-lg max-w-4xl mx-auto transform transition-all duration-500 ease-out opacity-0 translate-y-4"
//     style={{ animation: "fadeSlideUp 0.6s forwards" }}
//   >
//     <style>
//       {`
//           @keyframes fadeSlideUp {
//             from { opacity: 0; transform: translateY(10px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//         `}
//     </style>
//     <div className="flex justify-between items-center px-0 p-2">
//       <h3 className="text-lg font-bold">Add New Customer</h3>
//       <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M6 18L18 6M6 6l12 12"
//           />
//         </svg>
//       </button>
//     </div>
//     {/* Personal Info */}
//     <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
//       <div>
//         <label
//           htmlFor="firstName"
//           className="block text-sm font-medium text-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-101"
//         >
//           First Name
//         </label>
//         <input
//           id="firstName"
//           value={formData.firstName}
//           onChange={inputChange}
//           className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
//           placeholder="Enter first name"
//         />
//       </div>

//       <div>
//         <label
//           htmlFor="lastName"
//           className="block text-sm font-medium text-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-100"
//         >
//           Last Name
//         </label>
//         <input
//           id="lastName"
//           value={formData.lastName}
//           onChange={inputChange}
//           className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
//           placeholder="Enter last name"
//         />
//       </div>
//     </div>

//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//       <div>
//         <label
//           htmlFor="companyName"
//           className="block text-sm font-medium text-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-101"
//         >
//           {" "}
//           Company Name
//         </label>
//         <input
//           id="companyName"
//           value={formData.companyName}
//           onChange={inputChange}
//           className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
//           placeholder="Enter company name"
//         />
//       </div>

//       <div>
//         <label
//           htmlFor="email"
//           className="block text-sm font-medium text-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-101"
//         >
//           {" "}
//           Email
//         </label>
//         <input
//           id="email"
//           value={formData.email}
//           onChange={inputChange}
//           className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
//           placeholder="Enter email"
//         />
//       </div>
//     </div>

//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//       <div>
//         <label
//           htmlFor="phone"
//           className="block text-sm font-medium text-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-101"
//         >
//           {" "}
//           Phone
//         </label>
//         <input
//           id="phone"
//           value={formData.phone}
//           onChange={inputChange}
//           className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
//           placeholder="Enter phone number"
//         />
//       </div>

//       <div>
//         <label
//           htmlFor="gstNumber"
//           className="block text-sm font-medium text-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-101"
//         >
//           {" "}
//           GST Number
//         </label>
//         <input
//           id="gstNumber"
//           value={formData.gstNumber}
//           onChange={inputChange}
//           className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
//           placeholder="Enter GST number"
//         />
//       </div>
//     </div>

//     {/* Billing and Shipping Address - Two Column Layout */}
//     <div>
//       <div className="mb-4">
//         <label className="inline-flex items-center">
//           <input
//             type="checkbox"
//             className="form-checkbox"
//             checked={copyShipping}
//             onChange={checkboxChange}
//           />
//           <span className="ml-2">Same as Billing Address</span>
//         </label>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {/* Billing Address */}
//         <div>
//           <label
//             htmlFor="billingAddress"
//             className="block text-sm font-medium text-gray-600"
//           >
//             Billing Address
//           </label>
//           <input
//             id="billingAddress.country"
//             value={formData.billingAddress.country}
//             onChange={inputChange2}
//             placeholder="Country"
//             className="mt-1 w-full p-3 rounded-md border border-gray-300"
//           />
//           <input
//             id="billingAddress.address1"
//             value={formData.billingAddress.address1}
//             onChange={inputChange2}
//             placeholder="Address"
//             className="mt-1 w-full p-3 rounded-md border border-gray-300"
//           />
//           <input
//             id="billingAddress.city"
//             value={formData.billingAddress.city}
//             onChange={inputChange2}
//             placeholder="City"
//             className="mt-1 w-full p-3 rounded-md border border-gray-300"
//           />
//           <input
//             id="billingAddress.state"
//             value={formData.billingAddress.state}
//             onChange={inputChange2}
//             placeholder="State"
//             className="mt-1 w-full p-3 rounded-md border border-gray-300"
//           />
//           <input
//             id="billingAddress.pincode"
//             value={formData.billingAddress.pincode}
//             onChange={inputChange2}
//             placeholder="Pincode"
//             className="mt-1 w-full p-3 rounded-md border border-gray-300"
//           />
//         </div>

//         {/* Shipping Address */}
//         <div>
//           <label
//             htmlFor="shippingAddress"
//             className="block text-sm font-medium text-gray-600"
//           >
//             Shipping Address
//           </label>
//           <input
//             id="shippingAddress.country"
//             value={formData.shippingAddress.country}
//             onChange={inputChange2}
//             placeholder="Country"
//             className="mt-1 w-full p-3 rounded-md border border-gray-300"
//             disabled={copyShipping} // Disable if checkbox is checked
//           />
//           <input
//             id="shippingAddress.address1"
//             value={formData.shippingAddress.address1}
//             onChange={inputChange2}
//             placeholder="Address"
//             className="mt-1 w-full p-3 rounded-md border border-gray-300"
//             disabled={copyShipping}
//           />
//           <input
//             id="shippingAddress.city"
//             value={formData.shippingAddress.city}
//             onChange={inputChange2}
//             placeholder="City"
//             className="mt-1 w-full p-3 rounded-md border border-gray-300"
//             disabled={copyShipping}
//           />
//           <input
//             id="shippingAddress.state"
//             value={formData.shippingAddress.state}
//             onChange={inputChange2}
//             placeholder="State"
//             className="mt-1 w-full p-3 rounded-md border border-gray-300"
//             disabled={copyShipping}
//           />
//           <input
//             id="shippingAddress.pincode"
//             value={formData.shippingAddress.pincode}
//             onChange={inputChange2}
//             placeholder="Pincode"
//             className="mt-1 w-full p-3 rounded-md border border-gray-300"
//             disabled={copyShipping}
//           />
//         </div>
//       </div>
//     </div>

//     <div className="text-center">
//       <button
//         type="submit"
//         className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
//       >
//         Submit
//       </button>
//     </div>
//   </form>
// );

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [isShimmer, setisShimmer] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  // const [showAlert, setShowAlert] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { userData } = location.state || {};
  const [showSetting, setShowSettings] = useState(false);
  const [allUserInfo, setAllUserInfo] = useState(userData);
  const [image, setImage] = useState(null);
  const [color, setColor] = useState("#4F46E5");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef(null);
  const [totalInvoicesRaised, settotalInvoicesRaised] = useState(0);

  const [totalBalanceDue, settotalBalanceDue] = useState(0);

  // console.log('allUserInfo', allUserInfo);
  // useEffect to check if userData is present
  useEffect(() => {
    const handleTabChange = async () => {
      try {
        await fetchUserInfo(); // Ensure user data is fetched before proceeding

        if (activeTab === "home") {
          if (
            allUserInfo?.first_name === "" ||
            allUserInfo?.last_name === "" ||
            allUserInfo?.phone === ""
          ) {
            setShowSettings(true);
            setActiveTab("settings"); // Show the form if user data is missing
          } else {
            setShowSettings(false);
            setisShimmer(false);
            await fetchInvoices(); // Fetch invoices for the home tab
          }
        } else if (activeTab === "products") {
          await fetchProducts();
        } else if (activeTab === "customers") {
          await fetchCustomers();
        } else if (activeTab === "invoices") {
          await Promise.all([
            fetchCustomers(),
            fetchProducts(),
            fetchInvoices(),
          ]);
        }
      } catch (error) {
        console.error("Error in handleTabChange:", error);
      }
    };

    handleTabChange(); // Call the async function inside useEffect
  }, [activeTab]); // Dependency array

  const Shimmer = () => (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-300 rounded mb-4"></div>
      <div className="h-8 bg-gray-300 rounded mb-4"></div>
      <div className="h-8 bg-gray-300 rounded mb-4"></div>
    </div>
  );

  // const [productFormData, setProductFormData] = useState({
  //   productName: "",
  //   price: "",
  //   description: "",
  //   hsnCode: "",
  //   cgst: "",
  //   sgst: "",
  //   igst: "",
  // });

  // const clearProductFormData = () => {
  //   setProductFormData({
  //     productName: "",
  //     price: "",
  //     description: "",
  //     hsnCode: "",
  //     cgst: "",
  //     sgst: "",
  //     igst: "",
  //   });
  // };

  // const [customerFormData, setCustomerFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   companyName: "",
  //   email: "",
  //   phone: "",
  //   gstNumber: "",
  //   billingAddress: {
  //     country: "India",
  //     address1: "",
  //     city: "",
  //     state: "",
  //     pincode: "",
  //   },
  //   shippingAddress: {
  //     country: "India",
  //     address1: "",
  //     city: "",
  //     state: "",
  //     pincode: "",
  //   },
  // });

  // const clearCustomerFormData = () => {
  //   setCustomerFormData({
  //     firstName: "",
  //     lastName: "",
  //     companyName: "",
  //     email: "",
  //     phone: "",
  //     gstNumber: "",
  //     billingAddress: {
  //       country: "India",
  //       address1: "",
  //       city: "",
  //       state: "",
  //       pincode: "",
  //       phone: "",
  //     },
  //     shippingAddress: {
  //       country: "India",
  //       address1: "",
  //       city: "",
  //       state: "",
  //       pincode: "",
  //       phone: "",
  //     },
  //   });
  // };

  // Handle product form submission
  // const producutHandleFormSubmit = async (e) => {
  //   e.preventDefault();

  //   // Prepare the data structure for the API call
  //   const requestData = {
  //     productName: productFormData.productName,
  //     price: Number(productFormData.price),
  //     description: productFormData.description,
  //     hsnCode: productFormData.hsnCode,
  //     tax: {
  //       cgst: `${Number(productFormData.cgst)}`,
  //       sgst: `${Number(productFormData.sgst)}`,
  //       igst: `${Number(productFormData.igst)}`,
  //     },
  //   };

  //   try {
  //     const token = localStorage.getItem("authToken");
  //     const response = await fetch(
  //       "http://localhost:3000/api/products/addProduct",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(requestData),
  //       }
  //     );

  //     const result = await response.json();
  //     if (response.ok) {
  //       // console.log("Product added successfully:", result);
  //       Swal.fire({
  //         icon: "success",
  //         title: "Product added successfully!",
  //         text: "Your product has been added.",
  //         confirmButtonText: "OK",
  //         confirmButtonColor: "#2563EB",
  //         // timer: 3000, // Auto close after 3 seconds
  //       });
  //       // alert("Product added successfully!");
  //       // setShowAlert(true);
  //       setShowProductForm(false);
  //       clearProductFormData();
  //       fetchProducts();
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error occured",
  //         text: "Error adding product: " + result.message,
  //         confirmButtonText: "OK",
  //         confirmButtonColor: "#2563EB",
  //         // timer: 3000, // Auto close after 3 seconds
  //       });
  //       // alert("Error adding product: " + result.message);
  //       setShowProductForm(false);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Failed",
  //       text: "Failed to add product: " + result.message,
  //       confirmButtonText: "OK",
  //       confirmButtonColor: "#2563EB",
  //       // timer: 3000, // Auto close after 3 seconds
  //     });
  //     // alert("Failed to add product.");
  //     setShowProductForm(false);
  //   }
  // };

  // const customerHandleFormSubmit = async (e) => {
  //   e.preventDefault();

  //   // Prepare the data structure for the API call
  //   const requestData = {
  //     firstName: customerFormData.firstName,
  //     lastName: customerFormData.lastName,
  //     companyName: customerFormData.companyName,
  //     email: customerFormData.email,
  //     phone: Number(customerFormData.phone),
  //     gstNumber: customerFormData.gstNumber,
  //     billingAddress: {
  //       country: customerFormData.billingAddress.country,
  //       address1: customerFormData.billingAddress.address1,
  //       city: customerFormData.billingAddress.city,
  //       state: customerFormData.billingAddress.state,
  //       pincode: customerFormData.billingAddress.pincode,
  //     },
  //     shippingAddress: {
  //       country: customerFormData.shippingAddress.country,
  //       address1: customerFormData.shippingAddress.address1,
  //       city: customerFormData.shippingAddress.city,
  //       state: customerFormData.shippingAddress.state,
  //       pincode: customerFormData.shippingAddress.pincode,
  //     },
  //   };

  //   // console.log("requestData", requestData);

  //   try {
  //     const token = localStorage.getItem("authToken");
  //     const response = await fetch(
  //       "http://localhost:3000/api/customers/createCustomer",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(requestData),
  //       }
  //     );

  //     const result = await response.json();
  //     // console.log("result:", result);
  //     if (response.ok) {
  //       // console.log("Customer added successfully:", result);
  //       Swal.fire({
  //         icon: "success",
  //         title: "Customer added successfully!",
  //         text: "Your Customer has been added.",
  //         confirmButtonText: "OK",
  //         confirmButtonColor: "#2563EB",
  //         // timer: 3000, // Auto close after 3 seconds
  //       });
  //       // alert("Customer added successfully!");
  //       // setShowAlert(true);
  //       fetchCustomers();
  //       setShowCustomerForm(false);
  //       clearCustomerFormData();
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error occured",
  //         text: "Error adding customer: " + result.message,
  //         confirmButtonText: "OK",
  //         confirmButtonColor: "#2563EB",
  //         // timer: 3000, // Auto close after 3 seconds
  //       });
  //       // alert("Error adding customer: " + result.message);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);

  //     alert("Failed to add customer.");
  //   }
  // };

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
        // console.log("data.products:", data.products);
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
        // console.log("data.customers:", data);
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

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No auth token found in localStorage.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:3000/api/auth/user-profile",
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
        // console.log("User data fetched:--", data.user);

        setAllUserInfo(data.user);
        setisShimmer(false);
        setLoading(false);
        // Uncomment if needed
        // fetchCustomers();
        // console.log("allUserInfo.first_name:", allUserInfo.first_name);
      } else {
        console.error(
          `Failed to fetch user info: ${response.status} - ${response.statusText}`
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user info:", error.message);
    } finally {
      setLoading(false); // Ensure the loading state is cleared
    }
  };

  const handleDelete = async (productId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!userConfirmed) {
      // User clicked "No"
      return;
    }

    try {
      const token = localStorage.getItem("authToken"); // Fetch token from localStorage

      if (!token) {
        alert("Unauthorized: Token is missing");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Proper string interpolation for token
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Product deleted successfully"); // Show success alert
        fetchProducts(); // Optionally refresh product list
      } else {
        alert(
          data.message || "Failed to delete the product. Please try again."
        );
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  // // Handle form input change
  // const productHandleInputChange = (e) => {
  //   const { id, value } = e.target;
  //   setProductFormData((prevData) => ({ ...prevData, [id]: value }));
  // };

  // const customerHandleInputChange = (e) => {
  //   const { id, value } = e.target;
  //   setCustomerFormData((prevData) => ({ ...prevData, [id]: value }));
  // };

  // const [copyShipping, setCopyShipping] = useState(false);

  // const customerHandleInputChange2 = (e) => {
  //   const { id, value } = e.target;
  //   const [section, field] = id.split(".");

  //   setCustomerFormData((prevData) => ({
  //     ...prevData,
  //     [section]: {
  //       ...prevData[section],
  //       [field]: value,
  //     },
  //   }));

  //   // If "Copy to Shipping Address" is enabled, update shippingAddress too
  //   if (copyShipping && section === "billingAddress") {
  //     setCustomerFormData((prevData) => ({
  //       ...prevData,
  //       shippingAddress: {
  //         ...prevData.shippingAddress,
  //         [field]: value,
  //       },
  //     }));
  //   }
  // };

  // const handleCheckboxChange = (e) => {
  //   const isChecked = e.target.checked;
  //   setCopyShipping(isChecked);

  //   if (isChecked) {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       shippingAddress: { ...prevData.billingAddress }, // Copy billing to shipping
  //     }));
  //   }
  // };

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
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    title="Total Invoice Amount"
                    value={`₹ ${allUserInfo.total_invoice_amount || 0}`}
                    // percentage={
                    //   (Math.round(allUserInfo.total_invoice_balance) /
                    //     Math.round(allUserInfo.total_invoice_amount)) *
                    //   100
                    // }
                    // isPositive={true}
                  />
                  <MetricCard
                    title="Total Balance Amount"
                    value={`₹ ${allUserInfo.total_invoice_balance || 0}`}
                    // percentage={
                    //   (Math.round(allUserInfo.total_invoice_balance) /
                    //     Math.round(allUserInfo.total_invoice_amount)) *
                    //   100
                    // }
                    // isPositive={
                    //   allUserInfo.total_invoice_balance === "0" ? true : false
                    // }
                  />
                  <MetricCard
                    title="Total Paid Amount"
                    value={`₹ ${allUserInfo.total_invoice_paid_amount || 0}`}
                    // percentage="10.89"
                    // isPositive={false}
                  />
                  {/* <MetricCard
                    title="Product Count"
                    value={`₹ ${allProducts.length || 0}`}
                    // percentage="20.92"
                    isPositive={true}
                  /> */}
                </>
              )}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex items-center justify-between p-5">
                <h3 className="text-lg font-medium">Recent Invoices</h3>
                {/* <select className="p-2 border rounded">
                  <option>This Weekly</option>
                  <option>This Monthly</option>
                  <option>This Yearly</option>
                </select> */}
              </div>
              <div className="overflow-x-auto">
                {isShimmer ? (
                  <div className="p-4">
                    <Shimmer />
                  </div>
                ) : (
                  <table className="w-full whitespace-nowrap">
                    <thead>
                      <tr className="bg-gray-50 text-center">
                        <th className="px-4 py-2 ">Invoice ID</th>
                        <th className="px-4 py-2 ">Biller Name</th>
                        <th className="px-4 py-2 ">Bill Date</th>
                        <th className="px-4 py-2 ">Status</th>
                        <th className="px-4 py-2 ">Qty</th>
                        <th className="px-4 py-2 ">Total</th>
                        <th className="px-4 py-2 ">Actions</th>
                        <th className="px-4 py-2 ">Send To User</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allInvoiceData.length > 0 ? (
                        allInvoiceData
                          .slice(-10) // Take the last 10 items
                          .reverse() // Reverse to maintain the order of the latest first
                          .map((invoice, index) => (
                            <tr
                              key={index}
                              className="h-9 border-t hover:bg-slate-100 cursor-pointer text-center"
                            >
                              <td className="px-4 py-2 text-blue-500 hover:underline">
                                {invoice.invoiceNumber}
                              </td>

                              <td className="px-4 py-2">
                                {invoice.billTo.customerName}
                              </td>

                              <td className="px-4 py-2">
                                {new Date(
                                  invoice.invoiceDate
                                ).toLocaleDateString()}
                              </td>

                              <td className="px-4 py-2">
                                <span
                                  className={`inline-block rounded-full px-2 py-1 text-xs ${
                                    invoice.paymentStatus === "paid"
                                      ? "bg-green-100 text-green-600"
                                      : invoice.paymentStatus ===
                                        "partially paid"
                                      ? "bg-yellow-100 text-yellow-600"
                                      : "bg-red-100 text-red-600"
                                  }`}
                                >
                                  {invoice.paymentStatus}
                                </span>
                              </td>

                              <td className="px-4 py-2 ">
                                {invoice.products.length}
                              </td>

                              <td className="px-4 py-2 ">
                                ₹{invoice.payment.grandTotal}
                              </td>

                              <td className="px-4 py-2">
                                <div className="flex justify-center space-x-2">
                                  <button className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                                    <Download className="h-5 w-5" />
                                  </button>
                                  <button className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200">
                                    <Mail className="h-5 w-5" />
                                  </button>
                                  <button
                                    className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                                    onClick={() => window.print()} // Triggers the browser's print functionality
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                    >
                                      <path d="M6 9V4a1 1 0 011-1h10a1 1 0 011 1v5h2a2 2 0 012 2v6a2 2 0 01-2 2h-3v2a1 1 0 01-1 1H8a1 1 0 01-1-1v-2H4a2 2 0 01-2-2v-6a2 2 0 012-2h2zm2 0h8V5H8v4zm8 2H8v6h8v-6zm-8 8h8v-1H8v1zm10-2h2v-6h-2v6zm-12-6H4v6h2v-6z" />
                                    </svg>
                                  </button>
                                </div>
                              </td>

                              <td className="px-4 py-2">
                                <span className="inline-block rounded-full px-3 py-1 text-xs bg-green-100 text-green-600">
                                  Sent
                                </span>
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td
                            colSpan="8" // Ensure it spans the correct number of columns (including the last "Sent" column)
                            className="px-4 py-6 text-center text-gray-500"
                          >
                            No Invoice available.
                          </td>
                        </tr>
                      )}
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
                  {allProducts.length > 0 ? (
                    allProducts.map((product) => (
                      <tr key={product._id} className="border-t">
                        <td className="px-4 py-2">{product.productName}</td>
                        <td className="px-4 py-2">₹{product.price}</td>
                        <td className="px-4 py-2">{product.hsnCode}</td>
                        <td className="px-4 py-2">{product.tax.cgst}%</td>
                        <td className="px-4 py-2">{product.tax.sgst}%</td>
                        <td className="px-4 py-2">{product.tax.igst}%</td>
                        <td className="px-4 py-2">
                          <div className="flex space-x-2">
                            <button className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              className="bg-red-500 text-white p-1 rounded hover:bg-red-400"
                              onClick={() => handleDelete(product._id)}
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-4 py-6 text-center text-gray-500"
                      >
                        No products available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* {showAlert && (
              <Alert
                message="Product added successfully!"
                type="success"
                onClose={() => setShowAlert(false)}
              />
            )} */}
            {showProductForm && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                <ProductForm
                  onClose={() => setShowProductForm(false)}
                  // onSubmit={producutHandleFormSubmit}
                  fetchPro={() => fetchProducts()}
                  // formData={productFormData}
                  // inputChange={productHandleInputChange}
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
                  {allCustomers.length > 0 ? (
                    [...allCustomers] // Create a shallow copy of the array
                      .reverse() // Reverse the copied array
                      .map((customer) => (
                        <tr key={customer._id} className="border-t">
                          <td className="px-4 py-2">
                            {customer.firstName + " " + customer.lastName}
                          </td>
                          <td className="px-4 py-2">
                            {customer.companyName || "N/A"}
                          </td>
                          <td className="px-4 py-2">
                            {customer.email || "N/A"}
                          </td>
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
                      ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-4 py-6 text-center text-gray-500"
                      >
                        No customers available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* {showAlert && (
              <Alert
                message="Customer added successfully!"
                type="success"
                onClose={() => setShowAlert(false)}
              />
            )} */}
            {showCustomerForm && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                <CustomerForm
                  onClose={() => setShowCustomerForm(false)}
                  fetchCust={() => fetchCustomers()}
                  // onSubmit={customerHandleFormSubmit}
                  // formData={customerFormData}
                  // inputChange={customerHandleInputChange}
                  // inputChange2={customerHandleInputChange2}
                  // copyShipping={copyShipping}
                  // checkboxChange={handleCheckboxChange}
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
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setActiveTab("createinvoices")}
              >
                <Plus className="h-4 w-4 inline-block mr-2" />
                Create Invoice
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50 text-center">
                    <th className="px-4 py-2 ">Invoice ID</th>
                    <th className="px-4 py-2 ">Customer</th>
                    <th className="px-4 py-2 ">Company</th>
                    <th className="px-4 py-2 ">Date</th>
                    <th className="px-4 py-2 ">Quantity</th>
                    <th className="px-4 py-2 ">
                      Invoice
                      <br />
                      Amount
                    </th>
                    <th className="px-4 py-2 ">Status</th>
                    <th className="px-4 py-2 ">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allInvoiceData.length > 0 ? (
                    allInvoiceData
                      .map((invoice, index) => (
                        <tr
                          key={index}
                          className="h-9 border-t hover:bg-slate-100 cursor-pointer text-center"
                        >
                          <td className="px-4 py-2 text-blue-500 hover:underline">
                            {invoice.invoiceNumber}
                          </td>

                          <td className="px-4 py-2">
                            {invoice.billTo.customerName}
                          </td>
                          <td className="px-4 py-2">
                            {invoice.billTo.companyName}
                          </td>

                          <td className="px-4 py-2">
                            {new Date(invoice.invoiceDate).toLocaleDateString()}
                          </td>

                          <td className="px-4 py-2 text-center">
                            {invoice.products.length}
                          </td>
                          <td className="px-4 py-2">
                            ₹{invoice.payment.grandTotal}
                          </td>

                          <td className="px-4 py-2">
                            <span
                              className={`inline-block rounded-full px-2 py-1 text-xs ${
                                invoice.paymentStatus === "paid"
                                  ? "bg-green-100 text-green-600"
                                  : invoice.paymentStatus === "partially paid"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {invoice.paymentStatus}
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex space-x-2">
                              <button className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                                <Download className="h-5 w-5" />
                              </button>
                              <button className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200">
                                <Mail className="h-5 w-5" />
                              </button>
                              <button
                                className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                                onClick={() => window.print()} // Triggers the browser's print functionality
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M6 9V4a1 1 0 011-1h10a1 1 0 011 1v5h2a2 2 0 012 2v6a2 2 0 01-2 2h-3v2a1 1 0 01-1 1H8a1 1 0 01-1-1v-2H4a2 2 0 01-2-2v-6a2 2 0 012-2h2zm2 0h8V5H8v4zm8 2H8v6h8v-6zm-8 8h8v-1H8v1zm10-2h2v-6h-2v6zm-12-6H4v6h2v-6z" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                      .reverse()
                  ) : (
                    <tr>
                      <td
                        colSpan="8" // Ensure it spans the correct number of columns (including the last "Sent" column)
                        className="px-4 py-6 text-center text-gray-500"
                      >
                        No Invoice available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "createinvoices":
        return (
          <CreateInvoicePage
            // userDetails={allUserInfo}
            // productDetails={allProducts}
            // customerDetails={allCustomers}
            setActiveTab1={setActiveTab}
          />
          
        );
      case "purchase-orders":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Estimates</h2>
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
      case "preview-page":
          return(
<PreviewPage setActiveTab={setActiveTab}/>
          );
      case "settings":
        return (
          <div
            className="bg-white p-5 rounded-lg shadow-lg  max-w-6xl mx-auto transform transition-all duration-500 ease-out opacity-0 translate-y-4"
            style={{
              animation: "fadeSlideUp 0.6s forwards",
              maxHeight: "120vh",
              overflowY: "auto",
            }}
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
              Enter Your Organization Details
            </h2>

            <form onSubmit={handleFormSubmitUserDetails} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-600"
                  >
                    First Name <span className="text-red-500">*</span>
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
                    Last Name <span className="text-red-500">*</span>
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
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Phone <span className="text-red-500">*</span>
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
                  />
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor="companyFullAddress"
                  className="block text-sm font-medium text-gray-600"
                >
                  Full Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  type="textarea"
                  id="companyFullAddress"
                  value={formData.companyFullAddress}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-40 transition-all duration-300 ease-in-out hover:shadow-md"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-600"
                  >
                    City <span className="text-red-500">*</span>
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
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-600"
                  >
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="state"
                    value={formData.state} // This will bind the state from formData
                    onChange={(e) => {
                      // Find the selected state object based on the selected value (code)
                      const selectedState = PickState.find(
                        (state) => state.name === e.target.value
                      );
                      // Set the state name into formData
                      setFormData({
                        ...formData,
                        state: selectedState ? selectedState.name : "", // Set the state name
                      });
                      // console.log('PickState.find(state => state.name === e.target.value)', PickState.find(state => state.name === e.target.value));
                      // console.log('selectedState.name',selectedState.name);
                      // console.log('e.target.value',e.target.value);
                    }} // Update formData on state selection
                    className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-40 transition-all duration-300 ease-in-out hover:shadow-md"
                  >
                    {PickState.map((state) => (
                      <option key={state.name} value={state.name}>
                        {state.name}{" "}
                        {/* This will show the state name in the dropdown */}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="country"
                    value={formData.country}
                    disabled
                    onChange={handleInputChange}
                    className="mt-1 w-full p-3 rounded-md border  text-gray-400 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-40 transition-all duration-300 ease-in-out hover:shadow-md"
                    required
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Pincode <span className="text-red-500">*</span>
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
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative">
                  <label
                    htmlFor="invoice_Prefix"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Invoice Prefix <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="invoice_Prefix"
                    value={formData.invoice_Prefix}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-40 transition-all duration-300 ease-in-out hover:shadow-md"
                    required
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="invoice_Number"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Invoice Number{" "}
                    <span className="text-gray-400">(start from) </span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="invoice_Number"
                    value={formData.invoice_Number}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-40 transition-all duration-300 ease-in-out hover:shadow-md"
                    required
                  />
                </div>
                {/* Color Picker Section */}
                <div ref={colorPickerRef} className="align">
                  <label className="block text-sm font-medium text-gray-600">
                    Brand Color
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={color}
                      onChange={handleColorInput}
                      onFocus={() => setShowColorPicker(true)}
                      className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-40 transition-all duration-300 ease-in-out hover:shadow-md"
                      placeholder="Enter or paste color code"
                      aria-label="Color code input"
                    />
                    <button
                      className="absolute mt-0.5 right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full border-2 border-white"
                      style={{ backgroundColor: color }}
                      onClick={() => setShowColorPicker(!showColorPicker)}
                      aria-label="Toggle color picker"
                    />
                  </div>
                  {showColorPicker && (
                    <div className="ab mt-2 z-10 w-72">
                      {" "}
                      {/* Set a fixed width using Tailwind */}
                      <HexColorPicker
                        color={color}
                        onChange={handleColorChange}
                      />
                    </div>
                  )}
                </div>
              </div>
              <p className="text-[13px] ml-2 text-gray-400">
                Note: Your invoice number will be look like this: (
                {formData.invoice_Prefix + formData.invoice_Number})
              </p>

              {/* Image Upload Section */}
              <div className="mb-20">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Company Logo
                </label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-50"
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  {image ? (
                    <div className="relative flex justify-center">
                      <img
                        src={image}
                        alt="Uploaded"
                        className=" h-40 object-contain rounded-lg shadow-md "
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage();
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        aria-label="Remove image"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-32">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mt-2 text-xs text-gray-600">
                        Drag and drop an image here, or click to select a file
                      </p>
                    </div>
                  )}
                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files[0])}
                    accept="image/*"
                  />
                </div>
              </div>

              <div className="submit flex justify-end my-20">
                <button
                  type="submit"
                  className="w-60 h-14  font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  {loading ? (
                    <div className="w-60 h-14 flex justify-center items-center">
                      {/* Spinner (you can replace it with your preferred spinner */}
                      <div className="w-60 h-14 flex justify-center items-center">
                        <div className="w-7 h-7 border-2 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
                      </div>
                    </div>
                  ) : (
                    <p> Update Profile </p>
                  )}
                </button>
              </div>
            </form>
          </div>
        );
      case "statements":
        return (
          <StatementTab />
        )
        default:
        return null;
    }
  };

  const [allInvoiceData, setallInvoiceData] = useState([]);

  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        "http://localhost:3000/api/invoice/fetchAllInvoice",

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

        // console.log("Raw data :", data)

        setallInvoiceData(data.invoices);

        // console.log('allInvoiceData',allInvoiceData);

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

  useEffect(() => {
    if (allInvoiceData.length > 0) {
      const totalRaised = allInvoiceData.reduce(
        (acc, invoice) => acc + (invoice.payment?.subtotal || 0),

        0
      );

      const totalDue = allInvoiceData.reduce(
        (acc, invoice) => acc + (invoice.payment?.balanceDue || 0),

        0
      );

      settotalInvoicesRaised(totalRaised);

      settotalBalanceDue(totalDue);

      // Move logs into a separate effect to log the updated values

      // console.log("Total Balance Due: ", totalDue);

      // console.log("Total Invoices Raised: ", totalRaised);
    }
  }, [allInvoiceData]); // Run when allInvoiceData changes

  useClickAway(colorPickerRef, () => {
    setShowColorPicker(false);
  });

  useEffect(() => {
    // console.log("condition:", userData.first_name!="");
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (allUserInfo) {
      // console.log("Updated allUserInfo:", allUserInfo.first_name);
      // Perform additional actions when allUserInfo updates
      setFormData({
        first_name: allUserInfo.first_name || "",
        last_name: allUserInfo.last_name || "",
        companyName: allUserInfo.companyName || "",
        companyFullAddress: allUserInfo.companyFullAddress || "",
        GST: allUserInfo.GST || "",
        country: allUserInfo.country || "India",
        city: allUserInfo.city || "",
        state: allUserInfo.state || "",
        pincode: allUserInfo.pincode || "",
        phone: allUserInfo.phone || "",
        invoice_Prefix: allUserInfo.invoice_Prefix || "INV",
        invoice_Number: allUserInfo.invoice_Number || "",
        total_invoice_amount: allUserInfo.total_invoice_amount || "0",
        total_invoice_balance: allUserInfo.total_invoice_balance || "0",
        total_invoice_paid_amount: allUserInfo.total_invoice_paid_amount || "0",
        brandColor: color,
      });
    }
  }, [allUserInfo]);

  const [formData, setFormData] = useState({
    first_name: "aaaa",
    last_name: "",
    companyName: "",
    companyFullAddress: "",
    GST: "",
    country: "India",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    invoice_Prefix: "INV",
    invoice_Number: "",
    total_invoice_amount: "0",
    total_invoice_balance: "0",
    total_invoice_paid_amount: "0",
    brandColor: color,
  });

  const removeImage = () => {
    if (image) {
      URL.revokeObjectURL(image);
    }
    setImage(null);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  const handleColorInput = (e) => {
    const inputColor = e.target.value;
    if (inputColor.startsWith("#")) {
      setColor(inputColor);
      if (/^#[0-9A-F]{6}$/i.test(inputColor)) {
        setShowColorPicker(false);
      }
    }
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleFile = (file) => {
    if (file && file.type.substr(0, 5) === "image") {
      if (image) {
        URL.revokeObjectURL(image);
      }
      setImage(URL.createObjectURL(file));
    } else {
      alert("Please upload an image file");
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFormSubmitUserDetails = async (e) => {
    // console.log("formData", formData);
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken"); // Replace this with your actual token, or retrieve it dynamically (e.g., from localStorage, context, etc.)
      // console.log("request data", JSON.stringify(formData));
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
        Swal.fire({
          icon: "success",
          title: "Profile updated successfully!",
          text: "Your profile has been updated.",
          confirmButtonText: "OK",
          confirmButtonColor: "#2563EB",
          // timer: 3000, // Auto close after 3 seconds
        });

        setShowSettings(false);
        fetchUserInfo();
        setActiveTab("home");
        setisShimmer(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error occured",
          text: "Your profile has been failed.",
          confirmButtonText: "OK",
          confirmButtonColor: "#2563EB",
          // timer: 3000, // Auto close after 3 seconds
        });
        alert("Error updating profile: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update profile.");
    }
  };

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show top bar only if scrolled down
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const handleTabChange = (newTab) => {
  //   if (activeTab === "createinvoices") {
  //     // Show confirmation alert when leaving "createinvoices"
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "You have unsaved changes. Do you want to leave this page?",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonText: "Leave",
  //       cancelButtonText: "Stay",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         setActiveTab(newTab); // Switch to the new tab
  //       }
  //       // If "Stay" is clicked, do nothing (alert closes automatically)
  //     });
  //   } else {
  //     setActiveTab(newTab); // Switch to the new tab directly
  //   }
  // };
  const handleTabChange = (newTab) => {
    if (activeTab === "createinvoices") {
      // Show confirmation alert when leaving "createinvoices"
      Swal.fire({
        title: "Are you sure?",
        text: "You have unsaved changes. Do you want to leave this page?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Leave",
        cancelButtonText: "Stay",
      }).then((result) => {
        if (result.isConfirmed) {
          setActiveTab(newTab); // Update activeTab state
          navigate(`/dashboard/${newTab}`); // Navigate to the new route
        }
        // If "Stay" is clicked, the alert closes automatically and no action is taken
      });
    } else {
      setActiveTab(newTab); // Update activeTab state
      navigate(`/dashboard/${newTab}`); // Navigate to the new route
    }
  };

  useEffect(() => {
    // Sync the activeTab with the URL when the pathname changes
    const currentTab = location.pathname.split("/")[2];
    if (currentTab !== activeTab) {
      setActiveTab(currentTab || "home");
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      {/* Top Bar - Visible after scrolling and hidden when the sidebar is open */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        {/* Hamburger or Close icon based on sidebar state */}

        <button
          className="text-2xl"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>
      {!isSidebarOpen && hasScrolled && (
        <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 md:hidden transition-transform">
          <div className="flex items-center justify-between p-4">
            <div className="rounded-full bg-blue-500 p-2">
              <img
                alt="Logo"
                src="/placeholder.svg?height=24&width=24"
                className="h-6 w-6"
              />
            </div>
            <span className="text-xl font-bold">Workzy</span>

            {/* Hamburger Menu */}
            <button
              className="text-2xl"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      )}

      <aside
        className={`${
          isSidebarOpen ? "transform-none" : "-translate-x-full"
        } fixed top-0 left-0 w-full md:w-64 bg-white p-4 h-screen overflow-y-auto transition-transform md:sticky  md:transform-none z-40`}
      >
        <div className="flex items-center gap-2 pb-8">
          <div className="rounded-full bg-blue-500 p-2">
            <img
              alt="Logo"
              src="/placeholder.svg?height=24&width=24"
              className="h-6 w-6"
            />
          </div>
          <span className="text-xl font-bold">Workzy</span>
        </div>

        <nav className="space-y-2">
          <SidebarButton
            icon={<Home className="h-5 w-5" />}
            isActive={activeTab === "home"}
            onClick={() => {
              if (showSetting !== true) {
                handleTabChange("home");
                setIsSidebarOpen(false); // Close the sidebar
              }
            }}
          >
            Home
          </SidebarButton>
          <SidebarButton
            icon={<Package className="h-5 w-5" />}
            isActive={activeTab === "products"}
            onClick={() => {
              if (showSetting !== true) {
                handleTabChange("products");
                setIsSidebarOpen(false); // Close the sidebar
              }
            }}
          >
            Products
          </SidebarButton>
          <SidebarButton
            icon={<Users className="h-5 w-5" />}
            isActive={activeTab === "customers"}
            onClick={() => {
              if (showSetting !== true) {
                handleTabChange("customers");
                setIsSidebarOpen(false); // Close the sidebar
              }
            }}
          >
            Customers
          </SidebarButton>
          <SidebarButton
            icon={<NotebookIcon className="h-5 w-5" />}
            isActive={
              activeTab === "invoices" || activeTab === "create-invoice"
            }
            onClick={() => {
              if (showSetting !== true) {
                handleTabChange("invoices");
                setIsSidebarOpen(false); // Close the sidebar
              }
            }}
          >
            <div className="flex justify-around items-end">
              <span>Invoices</span>
            </div>
          </SidebarButton>
          {activeTab === "invoices" && (
            <div className="ml-8 mt-2 space-y-2">
              <button
                onClick={() => {
                  if (showSetting !== true) {
                    handleTabChange("createinvoices");
                    setIsSidebarOpen(false); // Close the sidebar
                  }
                }}
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                 + Create Invoice
              </button>
            </div>
          )}
          <SidebarButton
            icon={<NotepadText className="h-5 w-5" />}
            isActive={activeTab === "templates"}
            disabled
            onClick={() => {
              if (showSetting !== true) {
                // setActiveTab("templates");
                // setActiveTab("preview-page");
                setIsSidebarOpen(false); // Close the sidebar
              }
            }}
          >
            Templates
          </SidebarButton>
          <SidebarButton
            icon={<NotebookTabs className="h-5 w-5" />}
            isActive={activeTab === "statements"}
            onClick={() => {
              if (showSetting !== true) {
                handleTabChange("statements");
                setIsSidebarOpen(false); // Close the sidebar
              }
            }}
          >
            Statements
          </SidebarButton>
          <SidebarButton
            icon={<IndianRupee className="h-5 w-5" />}
            isActive={activeTab === "purchase-orders"}
            onClick={() => {
              if (showSetting !== true) {
                // setActiveTab("purchase-orders");
                setIsSidebarOpen(false); // Close the sidebar
              }
            }}
          >
            Estimates
          </SidebarButton>
        </nav>

        <div className="absolute bottom-4 left-4 space-y-2 w-full md:w-auto mb-20 ">
          <SidebarButton
            icon={<Settings className="h-5 w-5" />}
            isActive={activeTab === "settings"}
            onClick={() => {
              handleTabChange("settings");
              setIsSidebarOpen(false); // Close the sidebar
            }}
          >
            Settings
          </SidebarButton>
          <SidebarButton
            icon={<LogOut className="h-5 w-5" />}
            onClick={() => {
              handleLogout();
              setIsSidebarOpen(false); // Close the sidebar
            }}
          >
            Log out
          </SidebarButton>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="pt-10">
              {isShimmer ? (
                <div>
                  {showSetting === false ? (
                    <div className="h-8 w-40 bg-gray-200 rounded-md animate-pulse"></div>
                  ) : (
                    <h1 className="text-2xl font-bold mt-7 md:mt-0">
                      Hello{" "}
                      <span className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">{allUserInfo.first_name
                        ? capitalizeFirstLetter(allUserInfo.first_name)
                        : "User"}!
                      </span>
                    </h1>
                  )}
                </div>
              ) : (
                <h1 className="text-2xl font-bold mt-7 md:mt-0">
                  Hello{" "}
                  <span className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {allUserInfo.first_name
                    ? capitalizeFirstLetter(allUserInfo.first_name)
                    : "User"}!
                  </span>
                  
                  
                </h1>
              )}
            </div>
            {activeTab === "home" && (
              <p className="text-gray-500">Welcome to dashboard.</p>
            )}
          </div>
          <div className="flex items-center gap-4 pt-10">
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
  );
}
