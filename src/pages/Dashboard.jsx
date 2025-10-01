"use client"

import { useState } from "react"
import Swal from "sweetalert2"
import PreviewPage from "../components/PreviewPage"
import ReusableFunctions from "../components/ReusableFunctions"
import { useEffect, useCallback, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import CreateInvoicePage from "../components/CreateInvoicePage"
import { useClickAway } from "react-use"
import PickState from "../components/PickState"
import { HexColorPicker } from "react-colorful"
import StatementTab from "../components/StatementTab"
import InvoiceList from "../components/InvoicePage"
import CustomerStatements from "../components/CustomerStatement"
import CustomerList from "../components/CustomerPage"
import VendorPage from "../components/VendorPage"
import AddNewCustomerForm from "../components/Addcustomer"
import ProductsAndServices from "../components/ProductandService"
import AddProductServiceForm from "../components/Addproduct"
import TemplatePage from "../components/TemplatePage"
import AddNewVendorForm from "../components/Addvendor"
import VendorStatements from "../components/VendorStatement"
import BillList from "../components/BillPage"
import CreateBillPage from "../components/RecordBillPage"
import EstimateList from "../components/EstimatePage"
import CreateEstimatePage from "../components/CreateEstimatePage"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import InvoiceBarChart from "../components/InvoiceBarChart"
import InvoicePieChart from "../components/InvoicePieChart"
import IncomeExpenseCard from "../components/IncomeExpenseCard"
import EstimateChart from "../components/EstimateChart"
// import { format } from "date-fns"


import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Badge } from "../components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { Separator } from "../components/ui/separator"
import { Skeleton } from "../components/ui/skeleton"
import { cn } from "../lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../components/ui/collapsible"

import {
  Home,
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
  Plus,
  Edit,
  ShoppingBag,
  ReceiptIndianRupee,
  FileText,
  Wallet,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const MetricCard = ({ title, value, percentage, isPositive }) => (
  <Card className="hover:shadow-md transform hover:scale-101 transition-transform duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
)

const SidebarButton = ({ icon, children, isActive, onClick }) => (
  <Button
    variant={isActive ? "secondary" : "ghost"}
    className={`flex items-center gap-2 w-full justify-start ${isActive ? "bg-secondary text-secondary-foreground" : ""
      }`}
    onClick={onClick}
  >
    {icon}
    <span>{children}</span>
  </Button>
)

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}



const invoiceChartData = [
  {
    month: "Jan",
    paid: 12,
    paidAmount: 50000,
    partial: 5,
    partialAmount: 15000,
    unpaid: 3,
    unpaidAmount: 8000,
  },
  {
    month: "Feb",
    paid: 18,
    paidAmount: 72000,
    partial: 4,
    partialAmount: 10000,
    unpaid: 6,
    unpaidAmount: 12000,
  },
  {
    month: "Mar",
    paid: 20,
    paidAmount: 85000,
    partial: 6,
    partialAmount: 18000,
    unpaid: 5,
    unpaidAmount: 14000,
  },
  {
    month: "Apr",
    paid: 15,
    paidAmount: 64000,
    partial: 7,
    partialAmount: 20000,
    unpaid: 4,
    unpaidAmount: 9000,
  },
  {
    month: "May",
    paid: 22,
    paidAmount: 94000,
    partial: 6,
    partialAmount: 17000,
    unpaid: 7,
    unpaidAmount: 15000,
  },
  {
    month: "Jun",
    paid: 19,
    paidAmount: 88000,
    partial: 5,
    partialAmount: 12000,
    unpaid: 6,
    unpaidAmount: 13000,
  },
  {
    month: "Jul",
    paid: 25,
    paidAmount: 105000,
    partial: 8,
    partialAmount: 22000,
    unpaid: 5,
    unpaidAmount: 11000,
  },
  {
    month: "Aug",
    paid: 21,
    paidAmount: 97000,
    partial: 7,
    partialAmount: 19000,
    unpaid: 6,
    unpaidAmount: 14000,
  },
  {
    month: "Sep",
    paid: 23,
    paidAmount: 102000,
    partial: 5,
    partialAmount: 15000,
    unpaid: 4,
    unpaidAmount: 10000,
  },
  {
    month: "Oct",
    paid: 20,
    paidAmount: 89000,
    partial: 6,
    partialAmount: 16000,
    unpaid: 7,
    unpaidAmount: 17000,
  },
  {
    month: "Nov",
    paid: 26,
    paidAmount: 112000,
    partial: 8,
    partialAmount: 23000,
    unpaid: 6,
    unpaidAmount: 15000,
  },
  {
    month: "Dec",
    paid: 30,
    paidAmount: 125000,
    partial: 10,
    partialAmount: 28000,
    unpaid: 8,
    unpaidAmount: 20000,
  },
]

const pieChartData = [
  { name: "Paid", value: 30 },
  { name: "Partial", value: 12 },
  { name: "Unpaid", value: 8 },
]

// const invoiceChartData = generateInvoiceChartData(allInvoiceData)
// function generateInvoiceChartData(allInvoiceData = []) {
//   // Start with empty data for 12 months
//   const months = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//   ]

//   const chartData = months.map(m => ({
//     month: m,
//     paid: 0,
//     paidAmount: 0,
//     partial: 0,
//     partialAmount: 0,
//     unpaid: 0,
//     unpaidAmount: 0,
//   }))

//   // Fill data from invoices
//   allInvoiceData.forEach(invoice => {
//     const monthIndex = new Date(invoice.invoiceDate).getMonth()
//     const status = invoice.paymentStatus?.toLowerCase()
//     const amount = Number(invoice.payment?.grandTotal || 0)

//     if (status === "paid") {
//       chartData[monthIndex].paid += 1
//       chartData[monthIndex].paidAmount += amount
//     } else if (status === "partial") {
//       chartData[monthIndex].partial += 1
//       chartData[monthIndex].partialAmount += amount
//     } else if (status === "unpaid") {
//       chartData[monthIndex].unpaid += 1
//       chartData[monthIndex].unpaidAmount += amount
//     }
//   })

//   return chartData
// }


const getStatusBadgeProps = (status) => {
  switch (status?.toLowerCase()) {
    case "paid":
      return {
        variant: "default",
        className: "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300",
      }
    case "partially paid":
      return {
        variant: "secondary",
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300",
      }
    case "unpaid":
    case "pending":
      return {
        variant: "destructive",
        className: "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300",
      }
    default:
      return {
        variant: "outline",
        className: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300",
      }
  }
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home")
  const [showProductForm, setShowProductForm] = useState(false)
  const [showCustomerForm, setShowCustomerForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const [isShimmer, setisShimmer] = useState(true)
  const [allProducts, setAllProducts] = useState([])
  const [allCustomers, setAllCustomers] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const { userData } = location.state || {}
  const [showSetting, setShowSettings] = useState(false)
  const [allUserInfo, setAllUserInfo] = useState(userData)
  const [image, setImage] = useState(null)
  const [color, setColor] = useState("#4F46E5")
  const [showColorPicker, setShowColorPicker] = useState(false)
  const colorPickerRef = useRef(null)
  const [totalInvoicesRaised, settotalInvoicesRaised] = useState(0)
  const [isSalesOpen, setIsSalesOpen] = useState(true)
  const [dropdownIndex, setDropdownIndex] = useState(null)
  const dropdownRefs = useRef([])
  const [totalBalanceDue, settotalBalanceDue] = useState(0)
  const dropdownRef = useRef(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isOpen, setIsOpen] = useState(false) // Added setIsOpen state

  // console.log('allUserInfo', allUserInfo);
  // useEffect to check if userData is present
  useEffect(() => {
    const handleTabChange = async () => {
      try {
        await fetchUserInfo() // Ensure user data is fetched before proceeding

        if (activeTab === "home") {
          if (allUserInfo?.first_name === "" || allUserInfo?.last_name === "" || allUserInfo?.phone === "") {
            setShowSettings(true)
            setActiveTab("settings") // Show the form if user data is missing
          } else {
            setShowSettings(false)
            setisShimmer(false)
            await fetchInvoices() // Fetch invoices for the home tab
          }
        } else if (activeTab === "products") {
          await fetchProducts()
        } else if (activeTab === "customers") {
          await fetchCustomers()
        } else if (activeTab === "invoices") {
          await Promise.all([fetchCustomers(), fetchProducts(), fetchInvoices()])
        }
      } catch (error) {
        console.error("Error in handleTabChange:", error)
      }
    }

    handleTabChange() // Call the async function inside useEffect
  }, [activeTab]) // Dependency array

  useEffect(() => {
    if (isCollapsed) {
      setDropdownIndex(null)
    }
  }, [isCollapsed])

  // Toggle Dropdown
  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index) // Toggle the dropdown for the specific index
  }

  // Close dropdown if clicked outside
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const Shimmer = () => (
    <div className="space-y-4">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  )

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch("http://localhost:3000/api/products/fetchProducts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        // console.log("data.products:", data.products);
        setAllProducts(data.products)
      } else {
        console.error("Failed to fetch products:", response.statusText)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch("http://localhost:3000/api/customers/fetchAllCustomer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        // console.log("data.customers:", data);
        setAllCustomers(data.customer)
        // fetchCustomers();
      } else {
        console.error("Failed to fetch products:", response.statusText)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("authToken")

      if (!token) {
        console.error("No auth token found in localStorage.")
        setLoading(false)
        return
      }

      const response = await fetch("http://localhost:3000/api/auth/user-profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        // console.log("User data fetched:--", data.user);

        setAllUserInfo(data.user)
        // setisShimmer(false);
        setLoading(false)
        // Uncomment if needed
        // fetchCustomers();
        // console.log("allUserInfo.first_name:", allUserInfo.first_name);
      } else {
        console.error(`Failed to fetch user info: ${response.status} - ${response.statusText}`)
        setLoading(false)
      }
    } catch (error) {
      console.error("Error fetching user info:", error.message)
    } finally {
      setLoading(false) // Ensure the loading state is cleared
    }
  }

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
    })

    if (!userConfirmed.isConfirmed) {
      return // Exit if user cancels
    }

    try {
      const token = localStorage.getItem("authToken")

      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "Token is missing. Please log in again.",
        })
        return
      }

      const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Product has been deleted successfully.",
          confirmButtonColor: "#3085d6",
        })
        fetchProducts() // Refresh product list
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Failed to delete the product. Please try again.",
        })
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An unexpected error occurred. Please try again later.",
      })
    }
  }

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
    })

    if (!imageConfirmed.isConfirmed) {
      // User clicked "Cancel"
      return
    }

    try {
      const token = localStorage.getItem("authToken") // Fetch token from localStorage

      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "Authorization token is missing!",
        })
        return
      }

      const response = await fetch(`http://localhost:3000/api/brand-logo/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Token passed in header
        },
      })

      const data = await response.json()

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "Logo Removed!",
          text: "The brand logo has been successfully deleted.",
          confirmButtonColor: "#2563EB",
        })
        fetchUserInfo()
        setImage(null)
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to remove the logo. Please try again.",
        })
      }
    } catch (error) {
      console.error("Error deleting logo:", error)
      Swal.fire({
        icon: "error",
        title: "Unexpected Error",
        text: "An unexpected error occurred. Please try again later.",
      })
    }
  }

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authToken") // Check if the user is logged in
    if (!isAuthenticated) {
      navigate("/signin") // Redirect to login if not authenticated
    }
  }, [navigate])

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
        localStorage.removeItem("authToken")

        // Redirect the user to the login page
        navigate("/")
      }
    })
  }

  // const handleRowClick = (customer) => {
  //   console.log("Row clicked:", customer);
  //   // Example: Navigate to a customer details page
  //   setActiveTab("customer-statements");
  //   navigate(`/dashboard/customers/${customer._id}`);
  // };

  // const handleEditClick = (e, customer) => {
  //   e.stopPropagation(); // Prevent the row click event
  //   console.log("Edit clicked for:", customer);
  //   // Example: Open edit modal or navigate to edit page
  // };

  // const handleDeleteClick = (e, customerId) => {
  //   e.stopPropagation(); // Prevent the row click event
  //   console.log("Delete clicked for ID:", customerId);
  //   // Example: Trigger delete confirmation
  // };

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <>
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {isShimmer ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-32 rounded-lg" />
                ))
              ) : (
                <>
                  {/* Card 1 */}
                  <Card className="rounded-xl shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Invoice Amount</p>
                          <h2 className="text-2xl font-bold mt-1">
                            ₹ {allUserInfo.total_invoice_amount || 0}
                          </h2>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                          <ArrowUpRight className="h-4 w-4" /> +12.5%
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm font-medium flex items-center gap-1">
                          Trending up this month <ArrowUpRight className="h-4 w-4" />
                        </p>
                        <p className="text-sm text-muted-foreground">Visitors for the last 6 months</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Card 2 */}
                  <Card className="rounded-xl shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Balance Amount</p>
                          <h2 className="text-2xl font-bold mt-1">
                            ₹ {allUserInfo.total_invoice_balance || 0}
                          </h2>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full bg-red-100 text-red-700">
                          <ArrowDownRight className="h-4 w-4" /> -20%
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm font-medium flex items-center gap-1">
                          Down 20% this period <ArrowDownRight className="h-4 w-4" />
                        </p>
                        <p className="text-sm text-muted-foreground">Acquisition needs attention</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Card 3 */}
                  <Card className="rounded-xl shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Paid Amount</p>
                          <h2 className="text-2xl font-bold mt-1">
                            ₹ {allUserInfo.total_invoice_paid_amount || 0}
                          </h2>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                          <ArrowUpRight className="h-4 w-4" /> +12.5%
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm font-medium flex items-center gap-1">
                          Strong user retention <ArrowUpRight className="h-4 w-4" />
                        </p>
                        <p className="text-sm text-muted-foreground">Engagement exceed targets</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Card 4 */}
                  <Card className="rounded-xl shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground">Growth Rate</p>
                          <h2 className="text-2xl font-bold mt-1">4.5%</h2>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                          <ArrowUpRight className="h-4 w-4" /> +4.5%
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm font-medium flex items-center gap-1">
                          Steady performance increase <ArrowUpRight className="h-4 w-4" />
                        </p>
                        <p className="text-sm text-muted-foreground">Meets growth projections</p>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-medium">Recent Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                {isShimmer ? (
                  <Shimmer />
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-center">Status</TableHead>
                          <TableHead className="text-center">Invoice ID</TableHead>
                          <TableHead className="text-center">Biller Name</TableHead>
                          <TableHead className="text-center">Bill Date</TableHead>
                          <TableHead className="text-center">Qty</TableHead>
                          <TableHead className="text-center">Total</TableHead>
                          <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allInvoiceData.length > 0 ? (
                          allInvoiceData
                            .slice(-10)
                            .reverse()
                            .map((invoice, index) => {
                              const statusProps = getStatusBadgeProps(invoice.paymentStatus)
                              return (
                                <TableRow
                                  key={index}
                                  className={`text-center ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-gray-100`}
                                >
                                  <TableCell>
                                    <Badge {...statusProps}>{invoice.paymentStatus}</Badge>
                                  </TableCell>
                                  <TableCell className="text-primary hover:underline">
                                    {allUserInfo.invoice_Prefix}
                                    {invoice.invoiceNumber}
                                  </TableCell>
                                  <TableCell>{invoice.billTo.customerName}</TableCell>
                                  <TableCell>{new Date(invoice.invoiceDate).toLocaleDateString()}</TableCell>
                                  <TableCell>{invoice.products.length}</TableCell>
                                  <TableCell>₹{invoice.payment.grandTotal}</TableCell>
                                  <TableCell>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                          <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end" className="w-48 z-[1000]">
                                        <DropdownMenuItem
                                          onClick={() => {
                                            setActiveTab("preview-page")
                                            navigate(`/dashboard/${"preview-page"}`, {
                                              state: { invoiceData: invoice, userData: allUserInfo },
                                            })
                                          }}
                                        >
                                          <Eye className="w-4 h-4 mr-2" /> View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => ReusableFunctions.downloadInvoice(invoice, allUserInfo)}
                                        >
                                          <Download className="w-4 h-4 mr-2" /> Download
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => alert("Sending Invoice...")}>
                                          <Mail className="w-4 h-4 mr-2" /> Send Invoice
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => ReusableFunctions.handlePrintInvoice(invoice, allUserInfo)}
                                        >
                                          <Printer className="w-4 h-4 mr-2" /> Print
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              )
                            })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-muted-foreground">
                              No Invoice available.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>

                    </Table>

                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardContent>
                <InvoiceBarChart data={invoiceChartData} />
              </CardContent>
            </Card>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
              <IncomeExpenseCard />
              <Card>
                <InvoicePieChart data={pieChartData} />
              </Card>
            </div>

            <div className="mt-8">
              <EstimateChart />
            </div>
          </>
        )
      case "products":
        return (
          // <div className="bg-white p-6 rounded-lg shadow">
          //   <div className="flex justify-between items-center mb-4">
          //     <h2 className="text-2xl font-bold">Products</h2>
          //     <Button
          //       onClick={() => setShowProductForm(true)}
          //       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          //     >
          //       <Plus className="h-4 w-4 inline-block mr-2" />
          //       Add Product
          //     </Button>
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
          //                   <Button className="p-1 bg-blue-100 text-[#041230] rounded hover:bg-blue-200">
          //                     <Edit className="h-4 w-4" />
          //                   </Button>
          //                   <Button
          //                     className="bg-red-500 text-white p-1 rounded hover:bg-red-400"
          //                     onClick={() => handleDelete(product._id)}
          //                   >
          //                     <Trash className="h-4 w-4" />
          //                   </Button>
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
        )
      case "customers":
        return (
          // <div className="bg-white p-6 rounded-lg shadow">
          //   <div className="flex justify-between items-center mb-4">
          //     <h2 className="text-2xl font-bold">Customers</h2>
          //     <Button
          //       onClick={() => setShowCustomerForm(true)}
          //       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          //     >
          //       <Plus className="h-4 w-4 inline-block mr-2" />
          //       Add Customer
          //     </Button>
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
          //                     <Button
          //                       className="p-1 bg-blue-100 text-[#041230] rounded hover:bg-blue-200"
          //                       onClick={(e) => handleEditClick(e, customer)}
          //                     >
          //                       <Edit className="h-4 w-4" />
          //                     </Button>
          //                     <Button
          //                       className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
          //                       onClick={(e) =>
          //                         handleDeleteClick(e, customer._id)
          //                       }
          //                     >
          //                       <Trash className="h-4 w-4" />
          //                     </Button>
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
        )
      case "vendors":
        return <VendorPage setActiveTab={setActiveTab} />
      case "invoices":
        return (
          // <div className="bg-white p-6 rounded-lg shadow">
          //   <div className="flex justify-between items-center mb-4">
          //     <h2 className="text-2xl font-bold">Invoices</h2>
          //     <Button
          //       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          //       onClick={() => setActiveTab("createinvoices")}
          //     >
          //       <Plus className="h-4 w-4 inline-block mr-2" />
          //       Create Invoice
          //     </Button>
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
          //               <TableRow key={index} className="h-9 border-t hover:bg-slate-100 cursor-pointer text-center">
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
          //                     <Button className="p-1 bg-blue-100 text-[#041230] rounded hover:bg-blue-200">
          //                       <Download className="h-5 w-5" />
          //                     </Button>
          //                     <Button className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200">
          //                       <Mail className="h-5 w-5" />
          //                     </Button>
          //                     <Button
          //                       className="p-1 bg-blue-100 text-[#041230] rounded hover:bg-blue-200"
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
          //                     </Button>
          //                   </div>
          //                 </td>
          //               </TableRow>
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
        )
      case "createinvoices":
        return (
          <CreateInvoicePage
            // userDetails={allUserInfo}
            // productDetails={allProducts}
            // customerDetails={allCustomers}
            setActiveTab1={setActiveTab}
          />
        )
      case "bills":
        return <BillList setActiveTab={setActiveTab} />
      case "estimates":
        return <EstimateList setActiveTab={setActiveTab} />
      case "createestimates":
        return (
          <CreateEstimatePage
            // userDetails={allUserInfo}
            // productDetails={allProducts}
            // customerDetails={allCustomers}
            setActiveTab1={setActiveTab}
          />
        )
      case "createbills":
        return <CreateBillPage setActiveTab1={setActiveTab} />
      case "purchase-orders":
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Estimates</CardTitle>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Purchase Order
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PO Number</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>#PO001</TableCell>
                    <TableCell>Supplier Inc.</TableCell>
                    <TableCell>2024-01-26</TableCell>
                    <TableCell>₹5,000</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Pending</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      case "preview-page":
        return <PreviewPage setActiveTab={setActiveTab} />
      case "settings":
        return (
          <Card className="max-w-6xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Enter Your Organization Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleFormSubmitUserDetails(e)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">
                      First Name <span className="text-destructive">*</span>
                    </Label>
                    <Input id="first_name" value={formData.first_name} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">
                      Last Name <span className="text-destructive">*</span>
                    </Label>
                    <Input id="last_name" value={formData.last_name} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone <span className="text-destructive">*</span>
                    </Label>
                    <Input id="phone" value={formData.phone} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" value={formData.companyName} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyFullAddress">
                    Full Address <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="companyFullAddress"
                    value={formData.companyFullAddress}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">
                      City <span className="text-destructive">*</span>
                    </Label>
                    <Input id="city" value={formData.city} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">
                      State <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) => {
                        setFormData({
                          ...formData,
                          state: value,
                        })
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                      <SelectContent>
                        {PickState.map((state) => (
                          <SelectItem key={state.name} value={state.name}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">
                      Country <span className="text-destructive">*</span>
                    </Label>
                    <Input id="country" value={formData.country} disabled className="text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">
                      Pincode <span className="text-destructive">*</span>
                    </Label>
                    <Input id="pincode" value={formData.pincode} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="GST">GST</Label>
                    <Input id="GST" value={formData.GST} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="invoice_Prefix">
                      Invoice Prefix <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="invoice_Prefix"
                      value={formData.invoice_Prefix}
                      onChange={(e) => {
                        if (e.target.value.length <= 4) {
                          handleInputChange(e)
                        }
                      }}
                      maxLength={4}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="invoice_Number">
                      Invoice Number <span className="text-muted-foreground">(start from)</span>{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input id="invoice_Number" value={formData.invoice_Number} onChange={handleInputChange} required />
                  </div>
                  <div ref={colorPickerRef} className="space-y-2">
                    <Label>Brand Color</Label>
                    <div className="relative">
                      <Input
                        value={color}
                        onChange={(e) => {
                          e.preventDefault()
                          handleColorInput(e)
                        }}
                        onFocus={(e) => {
                          e.preventDefault()
                          setShowColorPicker(true)
                        }}
                        placeholder="Enter or paste color code"
                      />
                      <Button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full border-2 border-white"
                        style={{ backgroundColor: color }}
                        onClick={(e) => {
                          e.preventDefault()
                          setShowColorPicker(!showColorPicker)
                        }}
                      />
                    </div>
                    {showColorPicker && (
                      <div className="mt-2 z-10 w-72">
                        <HexColorPicker
                          color={color}
                          onChange={(colorValue) => {
                            handleColorChange(colorValue)
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Note: Your invoice number will be look like this: ({formData.invoice_Prefix + formData.invoice_Number}
                  )
                </p>

                <div className="space-y-2">
                  <Label>Company Logo</Label>
                  <div
                    className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer transition-all duration-300 hover:border-primary hover:bg-accent"
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    {image ? (
                      <div className="relative flex justify-center">
                        <img
                          src={image || "/placeholder.svg"}
                          alt="Uploaded"
                          className="h-40 object-contain rounded-lg shadow-md"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 rounded-full p-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            removeImage()
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-32">
                        <svg
                          className="w-8 h-8 text-muted-foreground"
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
                        <p className="mt-2 text-sm text-muted-foreground">
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

                <div className="flex justify-end pt-6">
                  <Button type="submit" className="w-60 h-14" disabled={loading}>
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-7 h-7 border-2 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )
      case "statements":
        return <StatementTab />
      case "customer-statements":
        return <CustomerStatements />
      case "vendor-statements":
        return <VendorStatements />
      case "add-customer":
        return <AddNewCustomerForm setActiveTab={setActiveTab} />
      case "add-vendor":
        return <AddNewVendorForm setActiveTab={setActiveTab} />
      case "add-product":
        return <AddProductServiceForm setActiveTab={setActiveTab} />
      case "templates":
        return <TemplatePage />
      default:
        return null
    }
  }

  const [allInvoiceData, setallInvoiceData] = useState([])

  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem("authToken")

      const response = await fetch(
        "http://localhost:3000/api/invoice/fetchAllInvoice",

        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.ok) {
        const data = await response.json()

        // console.log("Raw data :", data)

        setallInvoiceData(data.invoices)

        // console.log('allInvoiceData',allInvoiceData);

        // fetchCustomers();
      } else {
        console.error("Failed to fetch products:", response.statusText)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (allInvoiceData.length > 0) {
      const totalRaised = allInvoiceData.reduce(
        (acc, invoice) => acc + (invoice.payment?.subtotal || 0),

        0,
      )

      const totalDue = allInvoiceData.reduce(
        (acc, invoice) => acc + (invoice.payment?.balanceDue || 0),

        0,
      )

      settotalInvoicesRaised(totalRaised)

      settotalBalanceDue(totalDue)

      // Move logs into a separate effect to log the updated values

      // console.log("Total Balance Due: ", totalDue);

      // console.log("Total Invoices Raised: ", totalRaised);
    }
  }, [allInvoiceData]) // Run when allInvoiceData changes

  useClickAway(colorPickerRef, () => {
    setShowColorPicker(false)
  })

  useEffect(() => {
    // console.log("condition:", userData.first_name!="");
    fetchUserInfo()
  }, [])

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
      })
      if (formData.brandLogoUrl) {
        setImage(allUserInfo.brandLogoUrl)
      }
    }
  }, [allUserInfo])

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    brand_LogoUrl: "",
    companyName: "",
    companyFullAddress: "",
    GST: "",
    country: "India",
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
  })

  const removeImage = () => {
    if (image) {
      URL.revokeObjectURL(image)
    }
    handleImageDelete()
  }

  const handleColorChange = (newColor) => {
    setColor(newColor)
  }

  const handleColorInput = (e) => {
    const inputColor = e.target.value
    if (inputColor.startsWith("#")) {
      setColor(inputColor)
      if (/^#[0-9A-F]{6}$/i.test(inputColor)) {
        setShowColorPicker(false)
      }
    }
  }

  const onDrop = useCallback((e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }, [])

  const onDragOver = useCallback((e) => {
    e.preventDefault()
  }, [])

  const handleFile = (file) => {
    if (file && file.type.substr(0, 5) === "image") {
      if (image) {
        URL.revokeObjectURL(image)
      }
      setImage(URL.createObjectURL(file))
      uploadBrandLogo(file)
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Please upload an image file (e.g., .jpg, .png, .gif).",
        confirmButtonText: "OK",
        confirmButtonColor: "#2563EB",
      })
    }
  }

  const uploadBrandLogo = async (file) => {
    console.log("file", file)
    try {
      const token = localStorage.getItem("authToken")

      if (!token) {
        console.error("No auth token found in localStorage.")
        return
      }

      // Prepare FormData for file upload
      const formData = new FormData()
      formData.append("brandLogo", file) // The key "brandLogo" matches your backend API's expected field name

      const response = await fetch("http://localhost:3000/api/brand-logo/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Do NOT set "Content-Type" header manually for FormData
        },
        body: formData, // Pass FormData as the body
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Image uploaded successfully:", data)
        Swal.fire("Success!", "Brand logo uploaded successfully!", "success")
        return data // Return the response data for further use
      } else {
        console.error(`Failed to upload image: ${response.status} - ${response.statusText}`)
        Swal.fire("Error!", "Failed to upload brand logo.", "error")
      }
    } catch (error) {
      console.error("Error uploading image:", error.message)
      Swal.fire("Error!", "An unexpected error occurred.", "error")
    }
  }

  // Handle form input change
  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({ ...prevData, [id]: value }))
  }

  const handleFormSubmitUserDetails = async (e) => {
    // console.log("formData", formData);
    e.preventDefault()

    try {
      const token = localStorage.getItem("authToken") // Replace this with your actual token, or retrieve it dynamically (e.g., from localStorage, context, etc.)
      // console.log("request data", JSON.stringify(formData));
      const response = await fetch("http://localhost:3000/api/auth/updatePofile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Adding token to Authorization header
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      if (response.ok) {
        console.log("image", image)
        // uploadBrandLogo(image);
        Swal.fire({
          icon: "success",
          title: "Profile updated successfully!",
          text: "Your profile has been updated.",
          confirmButtonText: "OK",
          confirmButtonColor: "#2563EB",
          // timer: 3000, // Auto close after 3 seconds
        })

        // setShowSettings(false);
        fetchUserInfo()
        setActiveTab("home")
        navigate(`/dashboard/home`)
        setisShimmer(false)
      } else {
        Swal.fire({
          icon: "error",
          title: "Error occurred",
          text: "Your profile update has failed: " + result.message,
          confirmButtonText: "OK",
          confirmButtonColor: "#2563EB",
          // timer: 3000, // Auto close after 3 seconds
        })
      }
    } catch (error) {
      console.error("Error:", error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update profile. Please try again.",
        confirmButtonText: "OK",
        confirmButtonColor: "#2563EB",
        // timer: 3000, // Auto close after 3 seconds
      })
    }
  }

  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show top bar only if scrolled down
      setHasScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

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
          setActiveTab(newTab) // Update activeTab state
          navigate(`/dashboard/${newTab}`) // Navigate to the new route
          window.scrollTo(0, 0)
        }
        if (
          activeTab !== "invoices" &&
          activeTab !== "customer-statements" &&
          activeTab !== "customers" &&
          activeTab !== "products"
        ) {
          setIsSalesOpen(false)
        }
        // If "Stay" is clicked, the alert closes automatically and no action is taken
      })
    } else {
      if (
        activeTab !== "invoices" &&
        activeTab !== "customer-statements" &&
        activeTab !== "customers" &&
        activeTab !== "products"
      ) {
        setIsSalesOpen(false)
      }
      setActiveTab(newTab) // Update activeTab state
      navigate(`/dashboard/${newTab}`) // Navigate to the new route
      window.scrollTo(0, 0)
    }
  }

  useEffect(() => {
    // Sync the activeTab with the URL when the pathname changes
    const currentTab = location.pathname.split("/")[2]
    if (currentTab !== activeTab) {
      setActiveTab(currentTab || "home")
    }
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shadow-lg bg-transparent">
              {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex items-center gap-2 p-4 border-b">
              <img alt="Logo" src="/src/assets/logos/Asset 2@4x-100.jpg" className="h-7" />
            </div>
            <nav className="space-y-2 p-4">
              <SidebarButton
                icon={<Home className="h-5 w-5" />}
                isActive={activeTab === "home"}
                onClick={() => {
                  if (showSetting !== true) {
                    handleTabChange("home")
                    setIsSidebarOpen(false)
                  }
                }}
              >
                Home
              </SidebarButton>
              {/* Add other mobile navigation items */}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <aside
        className={`hidden lg:flex relative sticky top-0 left-0 ${isCollapsed ? "w-16" : "w-64"
          } bg-card h-screen overflow-y-auto border-r z-40 flex-col transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b min-h-[60px]">
          {!isCollapsed && (
            <img
              alt="Logo"
              src="/src/assets/logos/Asset 3@4x-100.jpg"
              className="h-8 w-auto"
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="rounded-full hover:bg-accent flex-shrink-0"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>

        <nav className="flex-1 space-y-1 text-sm mt-2 p-2">
          {/* Dashboard */}
          <Button
            variant={activeTab === "home" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleTabChange("home")}
          >
            <Home className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="ml-3">Dashboard</span>}
          </Button>

          {/* Products (NEW) */}
          <Collapsible
            open={dropdownIndex === "products" && !isCollapsed}
            onOpenChange={(open) => setDropdownIndex(open ? "products" : null)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant={dropdownIndex === "products" ? "secondary" : "ghost"}
                className="w-full justify-between"
                onClick={() => isCollapsed && handleTabChange("products")}
              >
                <div className="flex items-center">
                  <ShoppingBag className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="ml-3">Products</span>}
                </div>
                {!isCollapsed &&
                  (dropdownIndex === "products" ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  ))}
              </Button>
            </CollapsibleTrigger>
            {!isCollapsed && (
              <CollapsibleContent className="space-y-1 ml-6 mt-2">
                <Button
                  variant={activeTab === "products" ? "secondary" : "ghost"}
                  className="w-full justify-start text-sm"
                  onClick={() => handleTabChange("products")}
                >
                  All Products
                </Button>
              </CollapsibleContent>
            )}
          </Collapsible>

          {/* Sales & Payments */}
          <Collapsible
            open={dropdownIndex === "sales" && !isCollapsed}
            onOpenChange={(open) => setDropdownIndex(open ? "sales" : null)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant={dropdownIndex === "sales" ? "secondary" : "ghost"}
                className="w-full justify-between"
                onClick={() => isCollapsed && handleTabChange("invoices")}
              >
                <div className="flex items-center">
                  <Wallet className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="ml-3">Sales & Payments</span>}
                </div>
                {!isCollapsed &&
                  (dropdownIndex === "sales" ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  ))}
              </Button>
            </CollapsibleTrigger>
            {!isCollapsed && (
              <CollapsibleContent className="space-y-1 ml-6 mt-2">
                {[
                  "estimates",
                  "invoices",
                  "recurring-invoices",
                  "customer-statements",
                  "customers",
                ].map((tab) => (
                  <Button
                    key={tab}
                    variant={activeTab === tab ? "secondary" : "ghost"}
                    className="w-full justify-start text-sm"
                    onClick={() => handleTabChange(tab)}
                  >
                    {tab === "recurring-invoices"
                      ? "Recurring Invoices"
                      : tab === "customer-statements"
                        ? "Customer Statements"
                        : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Button>
                ))}
              </CollapsibleContent>
            )}
          </Collapsible>

          {/* Purchases */}
          <Collapsible
            open={dropdownIndex === "purchases" && !isCollapsed}
            onOpenChange={(open) => setDropdownIndex(open ? "purchases" : null)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant={dropdownIndex === "purchases" ? "secondary" : "ghost"}
                className="w-full justify-between"
                onClick={() => isCollapsed && handleTabChange("bills")}
              >
                <div className="flex items-center">
                  <ShoppingBag className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="ml-3">Purchases</span>}
                </div>
                {!isCollapsed &&
                  (dropdownIndex === "purchases" ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  ))}
              </Button>
            </CollapsibleTrigger>
            {!isCollapsed && (
              <CollapsibleContent className="space-y-1 ml-6 mt-2">
                {["bills", "purchase-orders", "vendors", "vendor-statements"].map(
                  (tab) => (
                    <Button
                      key={tab}
                      variant={activeTab === tab ? "secondary" : "ghost"}
                      className="w-full justify-start text-sm"
                      onClick={() => handleTabChange(tab)}
                    >
                      {tab === "purchase-orders"
                        ? "Purchase Orders"
                        : tab === "vendor-statements"
                          ? "Vendor Statements"
                          : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Button>
                  )
                )}
              </CollapsibleContent>
            )}
          </Collapsible>

          {/* Accounting */}
          <Collapsible
            open={dropdownIndex === "accounting" && !isCollapsed}
            onOpenChange={(open) => setDropdownIndex(open ? "accounting" : null)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant={dropdownIndex === "accounting" ? "secondary" : "ghost"}
                className="w-full justify-between"
                onClick={() => isCollapsed && handleTabChange("statements")}
              >
                <div className="flex items-center">
                  <FileText className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="ml-3">Accounting</span>}
                </div>
                {!isCollapsed &&
                  (dropdownIndex === "accounting" ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  ))}
              </Button>
            </CollapsibleTrigger>
            {!isCollapsed && (
              <CollapsibleContent className="space-y-1 ml-6 mt-2">
                {["statements", "templates"].map((tab) => (
                  <Button
                    key={tab}
                    variant={activeTab === tab ? "secondary" : "ghost"}
                    className="w-full justify-start text-sm"
                    onClick={() => handleTabChange(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Button>
                ))}
              </CollapsibleContent>
            )}
          </Collapsible>

          {/* Banking */}
          <Collapsible
            open={dropdownIndex === "banking" && !isCollapsed}
            onOpenChange={(open) => setDropdownIndex(open ? "banking" : null)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant={dropdownIndex === "banking" ? "secondary" : "ghost"}
                className="w-full justify-between"
                onClick={() => isCollapsed && handleTabChange("banking")}
              >
                <div className="flex items-center">
                  <ReceiptIndianRupee className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="ml-3">Banking</span>}
                </div>
                {!isCollapsed &&
                  (dropdownIndex === "banking" ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  ))}
              </Button>
            </CollapsibleTrigger>
            {!isCollapsed && (
              <CollapsibleContent className="space-y-1 ml-6 mt-2">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Bank Accounts
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Reconciliation
                </Button>
              </CollapsibleContent>
            )}
          </Collapsible>


        </nav>

        <Separator />
        <div className="p-2 space-y-1">
          <Button
            variant={activeTab === "settings" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleTabChange("settings")}
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="ml-3">Settings</span>}
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="ml-3">Log out</span>}
          </Button>
        </div>
      </aside>


      <main className="flex-1 p-4 lg:p-7 overflow-auto">
        <div className="px-2 justify-end rounded-lg font-semibold gap-2 items-center hidden lg:flex mb-4">
          {formData.brand_LogoUrl !== "" && (
            <img
              className="h-10 rounded-md border border-primary"
              src={formData.brand_LogoUrl || "/placeholder.svg"}
              alt=""
            />
          )}
          {formData.companyName !== "" ? allUserInfo.companyName : ""}
        </div>

        <div className="mb-8 flex items-center justify-between pt-12 lg:pt-0">
          <div>
            <div className="pt-0">
              {isShimmer ? (
                <div>
                  {showSetting === false ? (
                    <Skeleton className="h-8 w-40" />
                  ) : (
                    <h1 className="text-sm  font-bold">
                      Hello{" "}
                      <span className="">
                        {allUserInfo.first_name ? capitalizeFirstLetter(allUserInfo.first_name) : "User"}!
                      </span>
                    </h1>
                  )}
                </div>
              ) : (
                <h1 className="text-sm  font-bold">
                  Hello{" "}
                  <span className="">
                    {allUserInfo.first_name ? capitalizeFirstLetter(allUserInfo.first_name) : "User"}!
                  </span>
                </h1>
              )}
            </div>
            <p className="text-muted-foreground text-sm lg:text-base">Welcome back.</p>
          </div>
          <div className="flex items-center gap-2 lg:gap-4 pt-3">
            <Button variant="ghost" size="icon" className="h-8 w-8 lg:h-10 lg:w-10">
              <Bell className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 lg:h-10 lg:w-10">
              <Mail className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>
          </div>
        </div>

        {renderTabContent()}
      </main>
    </div>
  )
}
