import React, { useState } from "react";
import Swal from "sweetalert2";
import CustomerForm from "../components/CustomerForm";
import ProductForm from "../components/ProductForm";
import Invoice from "../components/InvoiceTemplates/InvoiceTemplate1";
import Invoice2 from "../components/InvoiceTemplates/InvoiceTemplate2";
import Invoice3 from "../components/InvoiceTemplates/InvoiceTemplate3";
import PreviewPage from "../components/PreviewPage";
import ReusableFunctions from "../components/ReusableFunctions";

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
  MoreHorizontal,
  Eye,
  Printer,
  NotebookTabs,
  Plus,
  Edit,
  Trash,
  ShoppingBag,
  ReceiptIndianRupee,
  ScanBarcode,
  BookUser,
  
  FileText,
  Wallet,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CreateInvoicePage from "../components/CreateInvoicePage";
import { useClickAway } from "react-use";
import PickState from "../components/PickState";
import { HexColorPicker } from "react-colorful";
import StatementTab from "../components/StatementTab";
import InvoiceList from "../components/InvoicePage";
import CustomerStatements from "../components/CustomerStatement";
import CustomerList from "../components/CustomerPage";
import AddNewCustomerForm from "../components/Addcustomer";
import ProductsAndServices from "../components/ProductandService";
import AddProductServiceForm from "../components/Addproduct";
import TemplatePage from "../components/TemplatePage";

const MetricCard = ({ title, value, percentage, isPositive }) => (
  <div className="bg-gradient-to-r from-white to-blue-50 p-6 rounded-xl shadow-sm hover:shadow-md transform hover:scale-101 transition-transform duration-300">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      {/* <div
        className={`flex items-center text-sm font-medium ${
          isPositive ? "text-green-500" : "text-red-500"
        }`}
      >
        {percentage !== undefined && (
          <>
            {isPositive ? (
              <span className="mr-1">▲</span>
            ) : (
              <span className="mr-1">▼</span>
            )}
            {percentage}%
          </>
        )}
      </div> */}
    </div>
    <div className="text-3xl  text-gray-800 mb-2">{value}</div>
    {/* <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`absolute top-0 left-0 h-full ${
          isPositive ? "bg-green-500" : "bg-red-500"
        }`}
        style={{ width: `${Math.abs(percentage || 0)}%` }}
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
  const [isSalesOpen, setIsSalesOpen] = useState(true);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const dropdownRefs = useRef([]);
  const [totalBalanceDue, settotalBalanceDue] = useState(0);
  const dropdownRef = useRef(null);

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

  // Toggle Dropdown
  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index); // Toggle the dropdown for the specific index
  };

  // Close dropdown if clicked outside
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const Shimmer = () => (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-300 rounded mb-4"></div>
      <div className="h-8 bg-gray-300 rounded mb-4"></div>
      <div className="h-8 bg-gray-300 rounded mb-4"></div>
    </div>
  );

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
        // setisShimmer(false);
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
    const userConfirmed = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this product? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!userConfirmed.isConfirmed) {
      return; // Exit if user cancels
    }

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "Token is missing. Please log in again.",
        });
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Product has been deleted successfully.",
          confirmButtonColor: "#3085d6",
        });
        fetchProducts(); // Refresh product list
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text:
            data.message || "Failed to delete the product. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  const handleImageDelete = async () => {
    const imageConfirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete the brand logo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!imageConfirmed.isConfirmed) {
      // User clicked "Cancel"
      return;
    }

    try {
      const token = localStorage.getItem("authToken"); // Fetch token from localStorage

      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "Authorization token is missing!",
        });
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/brand-logo/remove`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Token passed in header
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "Logo Removed!",
          text: "The brand logo has been successfully deleted.",
          confirmButtonColor: "#2563EB",
        });
        fetchUserInfo();
        setImage(null);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to remove the logo. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error deleting logo:", error);
      Swal.fire({
        icon: "error",
        title: "Unexpected Error",
        text: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authToken"); // Check if the user is logged in
    if (!isAuthenticated) {
      navigate("/signin"); // Redirect to login if not authenticated
    }
  }, [navigate]);

 

const handleLogout = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out of your account.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, log me out!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      // Clear the auth token from localStorage
      localStorage.removeItem("authToken");

      // Redirect the user to the login page
      navigate("/");
    }
  });
};


  const handleRowClick = (customer) => {
    console.log("Row clicked:", customer);
    // Example: Navigate to a customer details page
    setActiveTab("customer-statements");
    navigate(`/dashboard/customers/${customer._id}`);
  };

  const handleEditClick = (e, customer) => {
    e.stopPropagation(); // Prevent the row click event
    console.log("Edit clicked for:", customer);
    // Example: Open edit modal or navigate to edit page
  };

  const handleDeleteClick = (e, customerId) => {
    e.stopPropagation(); // Prevent the row click event
    console.log("Delete clicked for ID:", customerId);
    // Example: Trigger delete confirmation
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
                    percentage={Math.round(
                      (allUserInfo.total_invoice_balance /
                        (allUserInfo.total_invoice_amount || 1)) *
                        100
                    )}
                    isPositive={true}
                  />
                  <MetricCard
                    title="Total Balance Amount"
                    value={`₹ ${allUserInfo.total_invoice_balance || 0}`}
                    percentage={Math.round(
                      (allUserInfo.total_invoice_balance /
                        (allUserInfo.total_invoice_amount || 1)) *
                        100
                    )}
                    isPositive={allUserInfo.total_invoice_balance === "0"}
                  />
                  <MetricCard
                    title="Total Paid Amount"
                    value={`₹ ${allUserInfo.total_invoice_paid_amount || 0}`}
                    percentage={Math.round(
                      (allUserInfo.total_invoice_paid_amount /
                        (allUserInfo.total_invoice_amount || 1)) *
                        100
                    )} // Dynamically calculate percentage
                    isPositive={allUserInfo.total_invoice_paid_amount > 0}
                  />
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
                      <tr className="bg-gray-50 text-gray-600 text-center">
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Invoice ID</th>
                        <th className="px-4 py-2">Biller Name</th>
                        <th className="px-4 py-2">Bill Date</th>

                        <th className="px-4 py-2">Qty</th>
                        <th className="px-4 py-2">Total</th>
                        <th className="px-4 py-2">Actions</th>
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
                              className={`hover:bg-gray-100 ${
                                index % 2 === 0 ? "bg-white" : "bg-gray-50"
                              } text-center`}
                            >
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
                              <td className="px-4 py-2 text-blue-500 hover:underline">
                                {allUserInfo.invoice_Prefix}
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
                                {invoice.products.length}
                              </td>
                              <td className="px-4 py-2">
                                ₹{invoice.payment.grandTotal}
                              </td>

                              <td className="px-4 py-2 relative">
                                {/* Toggle Dropdown */}
                                <div
                                  className="relative inline-block text-left"
                                  ref={(el) =>
                                    (dropdownRefs.current[index] = el)
                                  }
                                >
                                  <button
                                    onClick={() => toggleDropdown(index)}
                                    className="flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded-full focus:outline-none"
                                  >
                                    <MoreHorizontal className="w-6 h-6 text-gray-700" />
                                  </button>

                                  {/* Dropdown Menu */}
                                  {dropdownIndex === index && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                                      <ul className="py-1">
                                        {[
                                          {
                                            label: "View Details",
                                            icon: (
                                              <Eye className="w-5 h-5 text-blue-500" />
                                            ),
                                            onClick: () =>
                                            {setActiveTab("preview-page");
                                              navigate(`/dashboard/${"preview-page"}`, 
                                                {state: { invoiceData: invoice, userData :allUserInfo}});
                                            }
                                          },
                                          {
                                            label: "Download",
                                            icon: (
                                              <Download className="h-5 w-5" />
                                            ),
                                            onClick: () => {
                                              ReusableFunctions.downloadInvoice(
                                                invoice,
                                                allUserInfo
                                              );
                                              setTimeout(
                                                () => setDropdownIndex(null),
                                                500
                                              ); // Close the dropdown
                                            },
                                          },
                                          {
                                            label: "Send Invoice",
                                            icon: (
                                              <Mail className="h-5 w-5 text-red-500" />
                                            ),
                                            onClick: () =>
                                              alert("Sending Invoice..."),
                                          },
                                          {
                                            label: "Print",
                                            icon: (
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-green-500"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                              >
                                                <path d="M6 9V4a1 1 0 011-1h10a1 1 0 011 1v5h2a2 2 0 012 2v6a2 2 0 01-2 2h-3v2a1 1 0 01-1 1H8a1 1 0 01-1-1v-2H4a2 2 0 01-2-2v-6a2 2 0 012-2h2zm2 0h8V5H8v4zm8 2H8v6h8v-6zm-8 8h8v-1H8v1zm10-2h2v-6h-2v6zm-12-6H4v6h2v-6z" />
                                              </svg>
                                            ),
                                            onClick: () => {
                                              ReusableFunctions.handlePrintInvoice(
                                                invoice,
                                                allUserInfo
                                              );
                                              setTimeout(
                                                () => setDropdownIndex(null),
                                                500
                                              );
                                            },
                                          },
                                          // {
                                          //   label: "Delete",
                                          //   icon: (
                                          //     <Trash className="w-5 h-5 text-red-500" />
                                          //   ),
                                          //   onClick: () => handleDelete(invoice._id),
                                          // },
                                        ].map((action, actionIndex) => (
                                          <li
                                            key={actionIndex}
                                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                            onClick={action.onClick}
                                          >
                                            {action.icon}
                                            <span className="ml-2">
                                              {action.label}
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
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
          // <div className="bg-white p-6 rounded-lg shadow">
          //   <div className="flex justify-between items-center mb-4">
          //     <h2 className="text-2xl font-bold">Products</h2>
          //     <button
          //       onClick={() => setShowProductForm(true)}
          //       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          //     >
          //       <Plus className="h-4 w-4 inline-block mr-2" />
          //       Add Product
          //     </button>
          //   </div>
          //   <div className="overflow-x-auto">
          //     <table className="w-full whitespace-nowrap">
          //       <thead>
          //         <tr className="bg-gray-50">
          //           <th className="px-4 py-2 text-left">Product Name</th>
          //           <th className="px-4 py-2 text-left">Price</th>
          //           <th className="px-4 py-2 text-left">HSN Code</th>
          //           <th className="px-4 py-2 text-left">CGST</th>
          //           <th className="px-4 py-2 text-left">SGST</th>
          //           <th className="px-4 py-2 text-left">IGST</th>
          //           <th className="px-4 py-2 text-left">Actions</th>
          //         </tr>
          //       </thead>
          //       <tbody>
          //         {allProducts.length > 0 ? (
          //           allProducts.map((product) => (
          //             <tr key={product._id} className="border-t">
          //               <td className="px-4 py-2">{product.productName}</td>
          //               <td className="px-4 py-2">₹{product.price}</td>
          //               <td className="px-4 py-2">{product.hsnCode}</td>
          //               <td className="px-4 py-2">{product.tax.cgst}%</td>
          //               <td className="px-4 py-2">{product.tax.sgst}%</td>
          //               <td className="px-4 py-2">{product.tax.igst}%</td>
          //               <td className="px-4 py-2">
          //                 <div className="flex space-x-2">
          //                   <button className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
          //                     <Edit className="h-4 w-4" />
          //                   </button>
          //                   <button
          //                     className="bg-red-500 text-white p-1 rounded hover:bg-red-400"
          //                     onClick={() => handleDelete(product._id)}
          //                   >
          //                     <Trash className="h-4 w-4" />
          //                   </button>
          //                 </div>
          //               </td>
          //             </tr>
          //           ))
          //         ) : (
          //           <tr>
          //             <td
          //               colSpan="7"
          //               className="px-4 py-6 text-center text-gray-500"
          //             >
          //               No products available.
          //             </td>
          //           </tr>
          //         )}
          //       </tbody>
          //     </table>
          //   </div>

          //   {showProductForm && (
          //     <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          //       <ProductForm
          //         onClose={() => setShowProductForm(false)}
          //         // onSubmit={producutHandleFormSubmit}
          //         fetchPro={() => fetchProducts()}
          //         // formData={productFormData}
          //         // inputChange={productHandleInputChange}
          //       />
          //     </div>
          //   )}
          // </div>
          <ProductsAndServices setActiveTab={setActiveTab} />
        );
      case "customers":
        return (
          // <div className="bg-white p-6 rounded-lg shadow">
          //   <div className="flex justify-between items-center mb-4">
          //     <h2 className="text-2xl font-bold">Customers</h2>
          //     <button
          //       onClick={() => setShowCustomerForm(true)}
          //       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          //     >
          //       <Plus className="h-4 w-4 inline-block mr-2" />
          //       Add Customer
          //     </button>
          //   </div>
          //   <div className="overflow-x-auto">
          //     <table className="w-full whitespace-nowrap">
          //       <thead>
          //         <tr className="bg-gray-50">
          //           <th className="px-4 py-2 text-left">Name</th>
          //           <th className="px-4 py-2 text-left">Company</th>
          //           <th className="px-4 py-2 text-left">Email</th>
          //           <th className="px-4 py-2 text-left">Actions</th>
          //         </tr>
          //       </thead>
          //       <tbody>
          //         {allCustomers.length > 0 ? (
          //           [...allCustomers] // Create a shallow copy of the array
          //             .reverse() // Reverse the copied array
          //             .map((customer) => (
          //               <tr
          //                 key={customer._id}
          //                 className="border-t hover:bg-gray-100 cursor-pointer"
          //                 onClick={() => handleRowClick(customer)}
          //               >
          //                 <td className="px-4 py-2">
          //                   {customer.firstName + " " + customer.lastName}
          //                 </td>
          //                 <td className="px-4 py-2">
          //                   {customer.companyName || "N/A"}
          //                 </td>
          //                 <td className="px-4 py-2">
          //                   {customer.email || "N/A"}
          //                 </td>
          //                 <td className="px-4 py-2">
          //                   <div className="flex space-x-2">
          //                     <button
          //                       className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
          //                       onClick={(e) => handleEditClick(e, customer)}
          //                     >
          //                       <Edit className="h-4 w-4" />
          //                     </button>
          //                     <button
          //                       className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
          //                       onClick={(e) =>
          //                         handleDeleteClick(e, customer._id)
          //                       }
          //                     >
          //                       <Trash className="h-4 w-4" />
          //                     </button>
          //                   </div>
          //                 </td>
          //               </tr>
          //             ))
          //         ) : (
          //           <tr>
          //             <td
          //               colSpan="4"
          //               className="px-4 py-6 text-center text-gray-500"
          //             >
          //               No customers available.
          //             </td>
          //           </tr>
          //         )}
          //       </tbody>
          //     </table>
          //   </div>

          //   {showCustomerForm && (
          //     <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          //       <CustomerForm
          //         onClose={() => setShowCustomerForm(false)}
          //         fetchCust={() => fetchCustomers()}
          //         // onSubmit={customerHandleFormSubmit}
          //         // formData={customerFormData}
          //         // inputChange={customerHandleInputChange}
          //         // inputChange2={customerHandleInputChange2}
          //         // copyShipping={copyShipping}
          //         // checkboxChange={handleCheckboxChange}
          //       />
          //     </div>
          //   )}
          // </div>
          <CustomerList setActiveTab={setActiveTab} />
        );
      case "invoices":
        return (
          // <div className="bg-white p-6 rounded-lg shadow">
          //   <div className="flex justify-between items-center mb-4">
          //     <h2 className="text-2xl font-bold">Invoices</h2>
          //     <button
          //       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          //       onClick={() => setActiveTab("createinvoices")}
          //     >
          //       <Plus className="h-4 w-4 inline-block mr-2" />
          //       Create Invoice
          //     </button>
          //   </div>
          //   <div className="overflow-x-auto">
          //     <table className="w-full whitespace-nowrap">
          //       <thead>
          //         <tr className="bg-gray-50 text-center">
          //           <th className="px-4 py-2 ">Invoice ID</th>
          //           <th className="px-4 py-2 ">Customer</th>
          //           <th className="px-4 py-2 ">Company</th>
          //           <th className="px-4 py-2 ">Date</th>
          //           <th className="px-4 py-2 ">Quantity</th>
          //           <th className="px-4 py-2 ">
          //             Invoice
          //             <br />
          //             Amount
          //           </th>
          //           <th className="px-4 py-2 ">Status</th>
          //           <th className="px-4 py-2 ">Actions</th>
          //         </tr>
          //       </thead>
          //       <tbody>
          //         {allInvoiceData.length > 0 ? (
          //           allInvoiceData
          //             .map((invoice, index) => (
          //               <tr
          //                 key={index}
          //                 className="h-9 border-t hover:bg-slate-100 cursor-pointer text-center"
          //               >
          //                 <td className="px-4 py-2 text-blue-500 hover:underline">
          //                   {invoice.invoiceNumber}
          //                 </td>

          //                 <td className="px-4 py-2">
          //                   {invoice.billTo.customerName}
          //                 </td>
          //                 <td className="px-4 py-2">
          //                   {invoice.billTo.companyName}
          //                 </td>

          //                 <td className="px-4 py-2">
          //                   {new Date(invoice.invoiceDate).toLocaleDateString()}
          //                 </td>

          //                 <td className="px-4 py-2 text-center">
          //                   {invoice.products.length}
          //                 </td>
          //                 <td className="px-4 py-2">
          //                   ₹{invoice.payment.grandTotal}
          //                 </td>

          //                 <td className="px-4 py-2">
          //                   <span
          //                     className={`inline-block rounded-full px-2 py-1 text-xs ${
          //                       invoice.paymentStatus === "paid"
          //                         ? "bg-green-100 text-green-600"
          //                         : invoice.paymentStatus === "partially paid"
          //                         ? "bg-yellow-100 text-yellow-600"
          //                         : "bg-red-100 text-red-600"
          //                     }`}
          //                   >
          //                     {invoice.paymentStatus}
          //                   </span>
          //                 </td>
          //                 <td className="px-4 py-2">
          //                   <div className="flex space-x-2">
          //                     <button className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
          //                       <Download className="h-5 w-5" />
          //                     </button>
          //                     <button className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200">
          //                       <Mail className="h-5 w-5" />
          //                     </button>
          //                     <button
          //                       className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
          //                       onClick={() => window.print()} // Triggers the browser's print functionality
          //                     >
          //                       <svg
          //                         xmlns="http://www.w3.org/2000/svg"
          //                         className="h-5 w-5"
          //                         viewBox="0 0 24 24"
          //                         fill="currentColor"
          //                       >
          //                         <path d="M6 9V4a1 1 0 011-1h10a1 1 0 011 1v5h2a2 2 0 012 2v6a2 2 0 01-2 2h-3v2a1 1 0 01-1 1H8a1 1 0 01-1-1v-2H4a2 2 0 01-2-2v-6a2 2 0 012-2h2zm2 0h8V5H8v4zm8 2H8v6h8v-6zm-8 8h8v-1H8v1zm10-2h2v-6h-2v6zm-12-6H4v6h2v-6z" />
          //                       </svg>
          //                     </button>
          //                   </div>
          //                 </td>
          //               </tr>
          //             ))
          //             .reverse()
          //         ) : (
          //           <tr>
          //             <td
          //               colSpan="8" // Ensure it spans the correct number of columns (including the last "Sent" column)
          //               className="px-4 py-6 text-center text-gray-500"
          //             >
          //               No Invoice available.
          //             </td>
          //           </tr>
          //         )}
          //       </tbody>
          //     </table>
          //   </div>
          // </div>
          <InvoiceList setActiveTab={setActiveTab} />
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
        return <PreviewPage setActiveTab={setActiveTab} />;
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

            <form
              onSubmit={(e) => handleFormSubmitUserDetails(e)}
              className="space-y-4"
            >
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
                    onChange={(e) => {
                      if (e.target.value.length <= 4) {
                        handleInputChange(e); // Ensure this updates the `formData` state
                      }
                    }}
                    maxLength={4} // Limits input to 3 characters
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
                      onChange={(e) => {
                        e.preventDefault(); // Prevent form submission
                        handleColorInput(e);
                      }}
                      onFocus={(e) => {
                        e.preventDefault(); // Prevent form submission
                        setShowColorPicker(true);
                      }}
                      className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-40 transition-all duration-300 ease-in-out hover:shadow-md"
                      placeholder="Enter or paste color code"
                      aria-label="Color code input"
                    />
                    <button
                      type="button" // Prevent default form submission
                      className="absolute mt-0.5 right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full border-2 border-white"
                      style={{ backgroundColor: color }}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent form submission
                        setShowColorPicker(!showColorPicker);
                      }}
                      aria-label="Toggle color picker"
                    />
                  </div>
                  {showColorPicker && (
                    <div className="ab mt-2 z-10 w-72">
                      <HexColorPicker
                        color={color}
                        onChange={(colorValue) => {
                          handleColorChange(colorValue);
                        }}
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
                        type="button" // Prevent default form submission
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault(); // Prevent form submission
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
        return <StatementTab />;
      case "customer-statements":
        return <CustomerStatements />;
      case "add-customer":
        return <AddNewCustomerForm setActiveTab={setActiveTab} />;
      case "add-product":
        return <AddProductServiceForm setActiveTab={setActiveTab} />;
      case "templates":
        return <TemplatePage />;
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
      // console.log("Updated allUserInfo:", allUserInfo.brandLogoUrl);
      // Perform additional actions when allUserInfo updates
      setFormData({
        first_name: allUserInfo.first_name || "",
        brand_LogoUrl: allUserInfo.brandLogoUrl || "",
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
        brandLogoUrl: allUserInfo.brandLogoUrl || "",
      });
      if (formData.brandLogoUrl) {
        setImage(allUserInfo.brandLogoUrl);
      }
    }
  }, [allUserInfo]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    brand_LogoUrl: "",
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
    brandLogoUrl: "",
  });

  const removeImage = () => {
    if (image) {
      URL.revokeObjectURL(image);
    }
    handleImageDelete();
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
      uploadBrandLogo(file);
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Please upload an image file (e.g., .jpg, .png, .gif).",
        confirmButtonText: "OK",
        confirmButtonColor: "#2563EB",
      });
    }
  };

  const uploadBrandLogo = async (file) => {
    console.log("file", file);
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No auth token found in localStorage.");
        return;
      }

      // Prepare FormData for file upload
      const formData = new FormData();
      formData.append("brandLogo", file); // The key "brandLogo" matches your backend API's expected field name

      const response = await fetch(
        "http://localhost:3000/api/brand-logo/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Do NOT set "Content-Type" header manually for FormData
          },
          body: formData, // Pass FormData as the body
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Image uploaded successfully:", data);
        Swal.fire("Success!", "Brand logo uploaded successfully!", "success");
        return data; // Return the response data for further use
      } else {
        console.error(
          `Failed to upload image: ${response.status} - ${response.statusText}`
        );
        Swal.fire("Error!", "Failed to upload brand logo.", "error");
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
      Swal.fire("Error!", "An unexpected error occurred.", "error");
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
        console.log("image", image);
        // uploadBrandLogo(image);
        Swal.fire({
          icon: "success",
          title: "Profile updated successfully!",
          text: "Your profile has been updated.",
          confirmButtonText: "OK",
          confirmButtonColor: "#2563EB",
          // timer: 3000, // Auto close after 3 seconds
        });

        // setShowSettings(false);
        fetchUserInfo();
        setActiveTab("home");
        navigate(`/dashboard/home`);
        setisShimmer(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error occurred",
          text: "Your profile update has failed: " + result.message,
          confirmButtonText: "OK",
          confirmButtonColor: "#2563EB",
          // timer: 3000, // Auto close after 3 seconds
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update profile. Please try again.",
        confirmButtonText: "OK",
        confirmButtonColor: "#2563EB",
        // timer: 3000, // Auto close after 3 seconds
      });
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
          window.scrollTo(0,0);
        }
        if (
          activeTab !== "invoices" &&
          activeTab !== "customer-statements" &&
          activeTab !== "customers" &&
          activeTab !== "products"
        ) {
          setIsSalesOpen(false);
        }
        // If "Stay" is clicked, the alert closes automatically and no action is taken
      });
    } else {
      if (
        activeTab !== "invoices" &&
        activeTab !== "customer-statements" &&
        activeTab !== "customers" &&
        activeTab !== "products"
      ) {
        setIsSalesOpen(false);
      }
      setActiveTab(newTab); // Update activeTab state
      navigate(`/dashboard/${newTab}`); // Navigate to the new route
      window.scrollTo(0,0);
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
            <div className="flex items-center justify-center">
              <div className="flex bg-blue-500 justify-center">
                <img
                  alt="Logo"
                  src="/src/assets/logos/Asset 2@4x-100.jpg"
                  className="h-7 "
                />
              </div>
            </div>

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

      {/* <aside
        className={`${
          isSidebarOpen ? "transform-none" : "-translate-x-full"
        } fixed top-0 left-0 w-full md:w-64 bg-white p-4 h-screen overflow-y-auto transition-transform md:sticky  md:transform-none z-40`}
      >
        <div className="flex items-center gap-2 pb-8">
        <div className="flex items-center justify-center">
          <div className="flex bg-blue-500 justify-center">
            <img
              alt="Logo"
              src="/src/assets/logos/Asset 2@4x-100.jpg"
              className="h-7 "
            />
          </div>
        </div>
          
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
              activeTab === "invoices" || activeTab === "createinvoices"
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
          {activeTab === "invoices" || activeTab === "createinvoices" && (
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
      </aside> */}
      <aside className="sticky top-0 left-0 w-full md:w-64 bg-white h-screen overflow-y-auto border-r transition-all duration-300 z-40">
        {/* Logo Section */}
        <div className="flex items-center px-6 py-4">
          <img
            alt="Logo"
            src="/src/assets/logos/Asset 3@4x-100.jpg "
            className="h-8 w-auto mb-5"
          />
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {/* Dashboard */}
          <button
            onClick={() => handleTabChange("home")}
            className={`flex items-center  px-6 py-2  w-full hover:bg-gray-100 ${
              activeTab === "home" ? "font-bold text-blue-600" : "text-gray-700"            }`}
          >
            <Home className="h-6 w-6 mr-2" />
            Home
          </button>

          {/* Sales & Payments Section */}
          {/* <div>
            <button
              onClick={() => setIsSalesOpen(!isSalesOpen)}
              className={`flex justify-between items-center px-6 py-2 w-full text-gray-700 hover:bg-gray-100 ${
                isSalesOpen ? "text-blue-600 font-bold" : ""
              }`}
            >
              <div className="flex items-center">
                <Wallet className="h-6 w-6 mr-2" />
                Sales & Payments
              </div>
              
            </button>

           
          </div> */}

          {/* <div className="">
                <button
                  onClick={() => handleTabChange("invoices")}
                  className={`block px-6 py-2 text-gray-700 w-full text-left hover:text-blue-600 ${
                    activeTab === "invoices" ? "font-bold" : ""
                  }`}
                >
                  <div className="flex items-center">
                <Wallet className="h-6 w-6 mr-2" />
                Invoices
              </div>
                  
                </button>
                <button
                  onClick={() => handleTabChange("customers")}
                  className={`block px-4 py-2 text-gray-600 w-full text-left hover:text-blue-600 ${
                    activeTab === "customers" ? "font-bold" : ""
                  }`}
                >
                  Customers
                </button>
                <button
                  onClick={() => handleTabChange("products")}
                  className={`block px-4 py-2 text-gray-600 w-full text-left hover:text-blue-600 ${
                    activeTab === "products" ? "font-bold" : ""
                  }`}
                >
                  Products & Services
                </button>
                <button
                  onClick={() => handleTabChange("customer-statements")}
                  className={`block px-4 py-2 text-gray-600 w-full text-left hover:text-blue-600 ${
                    activeTab === "customer-statements" ? "font-bold" : ""
                  }`}
                >
                  Customer Statements
                </button>

                <button
                  // onClick={() => handleTabChange("estimates")}
                  className={`block px-4 py-2 text-gray-600 w-full text-left hover:text-blue-600 ${
                    activeTab === "estimates" ? "font-bold" : ""
                  }`}
                >
                  Estimates
                </button>
              </div> */}
          {/* Purchases */}
          {/* <button
            // onClick={() => handleTabChange("purchases")}
            className={`flex items-center px-6 py-2 text-gray-700 w-full hover:bg-gray-100 ${
              activeTab === "purchases" ? "font-bold text-blue-600" : ""
            }`}
          >
            <ShoppingBag className="h-6 w-6 mr-2" />
            Purchases
          </button> */}

          {/* Accounting */}
          <button
            onClick={() => handleTabChange("invoices")}
            className={`flex items-center px-6 py-2  w-full hover:bg-gray-100 ${
              activeTab === "invoices" ? "font-bold text-blue-600" : "text-gray-700"            }`}
          >
            <ReceiptIndianRupee className="h-6 w-6 mr-2" />
            Invoices
          </button>
          {/* Accounting */}
          <button
            onClick={() => handleTabChange("customers")}
            className={`flex items-center px-6 py-2  w-full hover:bg-gray-100 ${
              activeTab === "customers" ? "font-bold text-blue-600" : "text-gray-700"            }`}
          >
            <Users className="h-6 w-6 mr-2" />
            Customers
          </button>
          {/* Accounting */}
          <button
            onClick={() => handleTabChange("products")}
            className={`flex items-center px-6 py-2  w-full hover:bg-gray-100 ${
              activeTab === "products" ? "font-bold text-blue-600" : "text-gray-700"
            }`}
          >
            <ScanBarcode className="h-6 w-6 mr-2" />
            Products & Services
          </button>
          {/* Accounting */}
          <button
            onClick={() => handleTabChange("customer-statements")}
            className={`flex items-center px-6 py-2 w-full hover:bg-gray-100 ${
              activeTab === "customer-statements" ? "font-bold text-blue-600" : "text-gray-700"
            }`}
          >
            <BookUser className={`h-6 w-6 mr-2 ${
              activeTab === "customer-statements" ? "font-bold text-blue-600" : "text-gray-700"   }`}/>
            Customer Statements
          </button>
          {/* Accounting */}
          <button
            // onClick={() => handleTabChange("estimates")}
            className={`flex items-center px-6 py-2  w-full hover:bg-gray-100 ${
              activeTab === "estimates" ? "font-bold text-blue-600" : "text-gray-700"            }`}
          >
            <IndianRupee className="h-6 w-6 mr-2" />
            Estimates
          </button>
          {/* Accounting */}
          <button
            onClick={() => handleTabChange("statements")}
            className={`flex items-center px-6 py-2  w-full hover:bg-gray-100 ${
              activeTab === "statements" ? "font-bold text-blue-600" : "text-gray-700"            }`}
          >
            <FileText className="h-6 w-6 mr-2" />
            Accounting
          </button>

          {/* Templates */}
          <button
            onClick={() => handleTabChange("templates")}
            className={`flex items-center px-6 py-2  w-full hover:bg-gray-100 ${
              activeTab === "templates" ? "font-bold text-blue-600" : "text-gray-700"            }`}
          >
            <NotepadText className="h-6 w-6 mr-2" />
            Templates
          </button>
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-14 left-0 w-full ">
          <div className=" p-2 flex rounded-lg font-semibold gap-2 items-center md:hidden">
            {formData.brand_LogoUrl !== undefined && (
              <img
                className="h-10 rounded-md border border-blue-500"
                src={formData.brand_LogoUrl}
                alt=""
              />
            )}
            {formData.companyName}
          </div>
          <button
            onClick={() => handleTabChange("settings")}
            className={`flex items-center px-6 py-2  w-full hover:bg-gray-100 ${
              activeTab === "settings" ? "font-bold text-blue-600" : "text-gray-700"            }`}
          >
            <Settings className="h-6 w-6 mr-2" />
            Settings
          </button>
          <button
            onClick={() => handleLogout()}
            className={`flex items-center px-6 py-2 "text-gray-700"  w-full hover:bg-gray-100 hover:text-red-600`}
          >
            <LogOut className="h-6 w-6 mr-2" />
            Log out
          </button>
          
        
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-7 overflow-auto">
        <div className="px-2  justify-end rounded-lg font-semibold gap-2 items-center hidden md:flex">
          {formData.brand_LogoUrl !== "" && (
            <img
              className="h-10 rounded-md border border-blue-500"
              src={formData.brand_LogoUrl}
              alt=""
            />
          )}
          {formData.companyName !== "" ? allUserInfo.companyName : ""}
        </div>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="pt-0">
              {isShimmer ? (
                <div>
                  {showSetting === false ? (
                    <div className="h-8 w-40 bg-gray-200 rounded-md animate-pulse"></div>
                  ) : (
                    <h1 className="text-2xl font-bold mt-7 md:mt-0">
                      Hello{" "}
                      <span className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        {allUserInfo.first_name
                          ? capitalizeFirstLetter(allUserInfo.first_name)
                          : "User"}
                        !
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
                      : "User"}
                    !
                  </span>
                </h1>
              )}
            </div>
            <p className="text-gray-500">Welcome to back.</p>
          </div>
          <div className="flex items-center gap-4 pt-3">
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
