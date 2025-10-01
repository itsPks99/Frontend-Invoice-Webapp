import React, { useEffect, useState, useRef } from "react";
import { MoreHorizontal, Trash, Eye } from "lucide-react";
import { Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReusableFunctions from "./ReusableFunctions";
import Swal from "sweetalert2";
import EstimatePreview from "./EstimatePreview"; // ✅ import the new preview

const EstimateList = ({ setActiveTab }) => {
  const [allEstimateData, setAllEstimateData] = useState([]);
  const [allUserInfo, setAllUserInfo] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [selectedEstimate, setSelectedEstimate] = useState(null);

  const dropdownRefs = useRef([]);
  const navigate = useNavigate();

  // ===== Fetch Estimates =====
  const fetchEstimates = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:3000/api/estimate/getAllEstimates", {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const resData = await response.json();
        setAllEstimateData(resData.data);
        setFilteredData(resData.data);
      }
    } catch (error) {
      console.error("Error fetching estimates:", error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:3000/api/auth/user-profile", {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setAllUserInfo(data.user);
      }
    } catch (error) {
      console.error("Error fetching user info:", error.message);
    }
  };

  useEffect(() => {
    fetchEstimates();
    fetchUserInfo();
  }, []);

  // ===== Filter Logic =====
  useEffect(() => {
    const filtered = allEstimateData.filter((estimate) => {
      const estimateId = `${allUserInfo.estimate_Prefix}${estimate.estimateNumber}`.toLowerCase();
      const total = estimate.payment.grandTotal.toString();
      const customerName = estimate.billTo.customerName?.toLowerCase() || "";
      const paymentStatus = estimate.paymentStatus?.toLowerCase() || "";
      const estimateDate = new Date(estimate.estimateDate);

      return (
        (searchTerm === "" ||
          estimateId.includes(searchTerm.toLowerCase()) ||
          total.includes(searchTerm) ||
          customerName.includes(searchTerm)) &&
        (statusFilter === "" || paymentStatus === statusFilter.toLowerCase()) &&
        (fromDate === "" || estimateDate >= new Date(fromDate)) &&
        (toDate === "" || estimateDate <= new Date(toDate))
      );
    });
    setFilteredData(filtered);
  }, [searchTerm, statusFilter, fromDate, toDate, allEstimateData]);

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setFromDate("");
    setToDate("");
    setFilteredData(allEstimateData);
  };

  // ===== Delete Handler =====
  const handleDelete = async (estimateId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:3000/api/estimate/deleteEstimate/${estimateId}`,
        { method: "DELETE", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
      );
      if (response.ok) {
        Swal.fire("Deleted!", "Estimate deleted.", "success");
        fetchEstimates();
        setDropdownIndex(null);
        setSelectedEstimate(null);
      }
    } catch (error) {
      console.error("Error deleting estimate:", error);
    }
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    navigate(`/dashboard/${newTab}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {selectedEstimate ? (
        <div className="flex w-full">
          {/* LEFT Panel */}
          <div className="w-1/3 flex flex-col bg-white rounded-lg shadow-sm p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-semibold text-gray-800">Estimates</h1>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <input
                type="text"
                placeholder="Search by ID, Total or Customer Name"
                className="p-2 border rounded-lg text-gray-700 bg-white w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full md:w-auto px-4 py-2 border rounded-lg text-gray-700 bg-white"
              >
                <option value="">All ({allEstimateData.length})</option>
                <option value="paid">Paid ({allEstimateData.filter((e) => e.paymentStatus === "paid").length})</option>
                <option value="partially paid">Partially Paid ({allEstimateData.filter((e) => e.paymentStatus === "partially paid").length})</option>
                <option value="unpaid">Unpaid ({allEstimateData.filter((e) => e.paymentStatus === "unpaid").length})</option>
              </select>
            </div>

            {/* Table */}
            <table className="w-full text-left border-collapse border-y border-gray-400">
              <tbody>
                {[...filteredData].reverse().map((estimate, index) => (
                  <tr
                    key={index}
                    tabIndex={-1}
                    className={`hover:bg-gray-50 cursor-pointer border-b ${selectedEstimate?._id === estimate._id ? "bg-blue-50" : ""}`}
                    onClick={() => setSelectedEstimate(estimate)}
                  >
                    <td className="px-3 py-3">
                      <div className="flex justify-between items-center">
                        <div className="font-medium text-gray-900" style={{ textTransform: "capitalize" }}>
                          {estimate.billTo.customerName}
                        </div>
                        <span className="text-gray-800 font-semibold">₹{estimate.payment.grandTotal}</span>
                      </div>
                      <div className="mt-1 text-sm text-gray-600 flex flex-wrap items-center">
                        <span className="text-blue-700 font-medium">
                          {allUserInfo.estimate_Prefix}
                          {estimate.estimateNumber}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{new Date(estimate.estimateDate).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span
                          style={{ textTransform: "uppercase" }}
                          className={`font-medium ${estimate.paymentStatus === "paid"
                            ? "text-green-600"
                            : estimate.paymentStatus === "partially paid"
                              ? "text-yellow-600"
                              : "text-red-600"
                            }`}
                        >
                          {estimate.paymentStatus}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RIGHT Panel */}
          <div className="w-2/3 border-l bg-white relative">
            <EstimatePreview
              estimateData={selectedEstimate}
              userData={allUserInfo}
              onClose={() => setSelectedEstimate(null)}
            />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-800">Estimates</h1>
            <button
              onClick={() => handleTabChange("createestimates")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              Create an Estimate
            </button>
          </div>

          {/* Summary */}
          {/* <div className="grid grid-cols-3 gap-6 bg-gray-100 p-4 rounded-lg mb-6">
            <div>
              <h2 className="text-gray-600 text-sm">Total due</h2>
              <p className="text-xl font-bold text-red-600">₹{allUserInfo.total_estimate_balance || 0}</p>
            </div>
            <div>
              <h2 className="text-gray-600 text-sm">Total Paid</h2>
              <p className="text-xl font-bold text-gray-800">₹{allUserInfo.total_estimate_paid_amount || 0}</p>
            </div>
            <div>
              <h2 className="text-gray-600 text-sm">Total Estimate Generated</h2>
              <p className="text-xl font-bold text-gray-800">₹{allUserInfo.total_estimate_amount || 0}</p>
            </div>
          </div> */}

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by ID, Total, or Customer Name"
              className="p-2 border rounded-lg text-gray-700 bg-white w-full md:w-1/2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="date"
              className="p-2 border rounded-lg text-gray-700 bg-white"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <input
              type="date"
              className="p-2 border rounded-lg text-gray-700 bg-white"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
            <button
              onClick={resetFilters}
              className="p-2 border rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Reset
            </button>
          </div>

          {/* Table */}
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-blue-100 text-center">
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Estimate ID</th>
                <th className="px-4 py-2">Customer Name</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Qty</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...filteredData].reverse().map((estimate, index) => (
                <tr
                  key={index}
                  onClick={() => setSelectedEstimate(estimate)}
                  className={`hover:bg-gray-100 cursor-pointer ${selectedEstimate?._id === estimate._id ? "bg-blue-50" : ""} text-center`}
                >
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs ${estimate.paymentStatus === "paid"
                        ? "bg-green-100 text-green-600"
                        : estimate.paymentStatus === "partially paid"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                        }`}
                    >
                      {estimate.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {allUserInfo.estimate_Prefix}
                    {estimate.estimateNumber}
                  </td>
                  <td className="px-4 py-2">{estimate.billTo.customerName}</td>
                  <td className="px-4 py-2">
                    {new Date(estimate.estimateDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{estimate.products.length}</td>
                  <td className="px-4 py-2">₹{estimate.payment.grandTotal}</td>
                  <td className="px-4 py-2 relative" onClick={(e) => e.stopPropagation()}>
                    <div className="relative inline-block text-left" ref={(el) => (dropdownRefs.current[index] = el)}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDropdownIndex(dropdownIndex === index ? null : index);
                        }}
                        className="flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
                      >
                        <MoreHorizontal className="w-6 h-6 text-gray-700" />
                      </button>
                      {dropdownIndex === index && (
                        <div className="absolute right-0 w-48 bg-white border rounded-lg shadow-lg z-[1000]">
                          <ul className="py-1">
                            <li
                              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => setSelectedEstimate(estimate)}
                            >
                              <Eye className="w-5 h-5 text-blue-500" />
                              <span className="ml-2">View</span>
                            </li>
                            <li
                              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => ReusableFunctions.downloadEstimate(estimate, allUserInfo)}
                            >
                              <Download className="h-5 w-5" />
                              <span className="ml-2">Download</span>
                            </li>
                            <li
                              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleDelete(estimate._id)}
                            >
                              <Trash className="w-5 h-5 text-red-500" />
                              <span className="ml-2">Delete</span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EstimateList;














// import React, { useEffect, useState, useRef } from "react";
// import { MoreHorizontal, Trash, Eye, Download, Plus } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import ReusableFunctions from "./ReusableFunctions";
// import Swal from "sweetalert2";
// import EstimatePreview from "./EstimatePreview";

// // shadcn/ui components
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const EstimateList = ({ setActiveTab }) => {
//   const [allEstimateData, setAllEstimateData] = useState([]);
//   const [allUserInfo, setAllUserInfo] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [statusFilter, setStatusFilter] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [selectedEstimate, setSelectedEstimate] = useState(null);

//   const navigate = useNavigate();

//   // ===== Fetch Estimates =====
//   const fetchEstimates = async () => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const response = await fetch("http://localhost:3000/api/estimate/getAllEstimates", {
//         method: "GET",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//       });
//       if (response.ok) {
//         const resData = await response.json();
//         setAllEstimateData(resData.data);
//         setFilteredData(resData.data);
//       }
//     } catch (error) {
//       console.error("Error fetching estimates:", error);
//     }
//   };

//   const fetchUserInfo = async () => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const response = await fetch("http://localhost:3000/api/auth/user-profile", {
//         method: "GET",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setAllUserInfo(data.user);
//       }
//     } catch (error) {
//       console.error("Error fetching user info:", error.message);
//     }
//   };

//   useEffect(() => {
//     fetchEstimates();
//     fetchUserInfo();
//   }, []);

//   // ===== Filter Logic =====
//   useEffect(() => {
//     const filtered = allEstimateData.filter((estimate) => {
//       const estimateId = `${allUserInfo.estimate_Prefix}${estimate.estimateNumber}`.toLowerCase();
//       const total = estimate.payment.grandTotal.toString();
//       const customerName = estimate.billTo.customerName?.toLowerCase() || "";
//       const paymentStatus = estimate.paymentStatus?.toLowerCase() || "";
//       const estimateDate = new Date(estimate.estimateDate);

//       return (
//         (searchTerm === "" ||
//           estimateId.includes(searchTerm.toLowerCase()) ||
//           total.includes(searchTerm) ||
//           customerName.includes(searchTerm)) &&
//         (statusFilter === "" || paymentStatus === statusFilter.toLowerCase()) &&
//         (fromDate === "" || estimateDate >= new Date(fromDate)) &&
//         (toDate === "" || estimateDate <= new Date(toDate))
//       );
//     });
//     setFilteredData(filtered);
//   }, [searchTerm, statusFilter, fromDate, toDate, allEstimateData]);

//   const resetFilters = () => {
//     setSearchTerm("");
//     setStatusFilter("");
//     setFromDate("");
//     setToDate("");
//     setFilteredData(allEstimateData);
//   };

//   // ===== Delete Handler =====
//   const handleDelete = async (estimateId) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     });
//     if (!result.isConfirmed) return;

//     try {
//       const token = localStorage.getItem("authToken");
//       const response = await fetch(
//         `http://localhost:3000/api/estimate/deleteEstimate/${estimateId}`,
//         { method: "DELETE", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
//       );
//       if (response.ok) {
//         Swal.fire("Deleted!", "Estimate deleted.", "success");
//         fetchEstimates();
//         setSelectedEstimate(null);
//       }
//     } catch (error) {
//       console.error("Error deleting estimate:", error);
//     }
//   };

//   const handleTabChange = (newTab) => {
//     setActiveTab(newTab);
//     navigate(`/dashboard/${newTab}`);
//     window.scrollTo(0, 0);
//   };

//   const getStatusBadgeVariant = (status) => {
//     switch (status) {
//       case "paid":
//         return "default"; // Green
//       case "partially paid":
//         return "secondary"; // Yellow
//       case "unpaid":
//         return "destructive"; // Red
//       default:
//         return "outline";
//     }
//   };

//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case "paid":
//         return "bg-green-100 text-green-800 hover:bg-green-100";
//       case "partially paid":
//         return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
//       case "unpaid":
//         return "bg-red-100 text-red-800 hover:bg-red-100";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {selectedEstimate ? (
//         <div className="flex w-full">
//           {/* LEFT Panel */}
//           <Card className="w-1/3 m-0 rounded-none border-r">
//             <CardHeader>
//               <CardTitle className="text-3xl">Estimates</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* Filters */}
//               <div className="space-y-4">
//                 <Input
//                   placeholder="Search by ID, Total or Customer Name"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <Select value={statusFilter} onValueChange={setStatusFilter}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Filter by status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="">All ({allEstimateData.length})</SelectItem>
//                     <SelectItem value="paid">Paid ({allEstimateData.filter((e) => e.paymentStatus === "paid").length})</SelectItem>
//                     <SelectItem value="partially paid">Partially Paid ({allEstimateData.filter((e) => e.paymentStatus === "partially paid").length})</SelectItem>
//                     <SelectItem value="unpaid">Unpaid ({allEstimateData.filter((e) => e.paymentStatus === "unpaid").length})</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Estimate List */}
//               <div className="space-y-2">
//                 {[...filteredData].reverse().map((estimate, index) => (
//                   <Card
//                     key={index}
//                     className={`cursor-pointer transition-colors hover:bg-gray-50 ${selectedEstimate?._id === estimate._id ? "border-blue-500 bg-blue-50" : ""}`}
//                     onClick={() => setSelectedEstimate(estimate)}
//                   >
//                     <CardContent className="p-4">
//                       <div className="flex justify-between items-start">
//                         <div className="flex-1">
//                           <h4 className="font-medium capitalize">{estimate.billTo.customerName}</h4>
//                           <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
//                             <span className="text-blue-600 font-medium">
//                               {allUserInfo.estimate_Prefix}
//                               {estimate.estimateNumber}
//                             </span>
//                             <span>•</span>
//                             <span>{new Date(estimate.estimateDate).toLocaleDateString()}</span>
//                           </div>
//                           <Badge className={`mt-2 ${getStatusBadgeClass(estimate.paymentStatus)}`}>
//                             {estimate.paymentStatus.toUpperCase()}
//                           </Badge>
//                         </div>
//                         <div className="text-right">
//                           <span className="font-semibold">₹{estimate.payment.grandTotal}</span>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* RIGHT Panel */}
//           <div className="w-2/3 bg-white">
//             <EstimatePreview
//               estimateData={selectedEstimate}
//               userData={allUserInfo}
//               onClose={() => setSelectedEstimate(null)}
//             />
//           </div>
//         </div>
//       ) : (
//         <Card className="m-6">
//           <CardHeader>
//             <div className="flex justify-between items-center">
//               <CardTitle className="text-3xl">Estimates</CardTitle>
//               <Button onClick={() => handleTabChange("createestimates")}>
//                 <Plus className="w-4 h-4 mr-2" />
//                 Create an Estimate
//               </Button>
//             </div>
//           </CardHeader>

//           <CardContent className="space-y-6">
//             {/* Filters */}
//             <div className="flex flex-wrap gap-4">
//               <Input
//                 placeholder="Search by ID, Total, or Customer Name"
//                 className="flex-1 min-w-[300px]"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <Input
//                 type="date"
//                 value={fromDate}
//                 onChange={(e) => setFromDate(e.target.value)}
//               />
//               <Input
//                 type="date"
//                 value={toDate}
//                 onChange={(e) => setToDate(e.target.value)}
//               />
//               <Button variant="outline" onClick={resetFilters}>
//                 Reset
//               </Button>
//             </div>

//             {/* Table */}
//             <div className="rounded-md border">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead className="text-center">Status</TableHead>
//                     <TableHead className="text-center">Estimate ID</TableHead>
//                     <TableHead className="text-center">Customer Name</TableHead>
//                     <TableHead className="text-center">Date</TableHead>
//                     <TableHead className="text-center">Qty</TableHead>
//                     <TableHead className="text-center">Total</TableHead>
//                     <TableHead className="text-center">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {[...filteredData].reverse().map((estimate, index) => (
//                     <TableRow
//                       key={index}
//                       className={`cursor-pointer ${selectedEstimate?._id === estimate._id ? "bg-blue-50" : ""}`}
//                       onClick={() => setSelectedEstimate(estimate)}
//                     >
//                       <TableCell className="text-center">
//                         <Badge className={getStatusBadgeClass(estimate.paymentStatus)}>
//                           {estimate.paymentStatus}
//                         </Badge>
//                       </TableCell>
//                       <TableCell className="text-center">
//                         {allUserInfo.estimate_Prefix}
//                         {estimate.estimateNumber}
//                       </TableCell>
//                       <TableCell className="text-center">{estimate.billTo.customerName}</TableCell>
//                       <TableCell className="text-center">
//                         {new Date(estimate.estimateDate).toLocaleDateString()}
//                       </TableCell>
//                       <TableCell className="text-center">{estimate.products.length}</TableCell>
//                       <TableCell className="text-center">₹{estimate.payment.grandTotal}</TableCell>
//                       <TableCell className="text-center">
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
//                             <Button variant="ghost" className="h-8 w-8 p-0">
//                               <MoreHorizontal className="h-4 w-4" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent align="end">
//                             <DropdownMenuItem onClick={() => setSelectedEstimate(estimate)}>
//                               <Eye className="mr-2 h-4 w-4" />
//                               View
//                             </DropdownMenuItem>
//                             <DropdownMenuItem onClick={() => ReusableFunctions.downloadEstimate(estimate, allUserInfo)}>
//                               <Download className="mr-2 h-4 w-4" />
//                               Download
//                             </DropdownMenuItem>
//                             <DropdownMenuItem 
//                               onClick={() => handleDelete(estimate._id)}
//                               className="text-red-600"
//                             >
//                               <Trash className="mr-2 h-4 w-4" />
//                               Delete
//                             </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default EstimateList;