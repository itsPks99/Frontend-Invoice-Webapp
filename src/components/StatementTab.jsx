import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const StatementTab = () => {
  const [userDetails, setUserDetails] = useState({});
  const [Loading, setLoading] = useState();
  const [allStatementData, setallStatementData] = useState([]);

  //   const fs = require("fs");
  // const { Parser } = require("json2csv");

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No auth token found in localStorage.");
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
        setUserDetails(data.user); // Save to state
        console.log("User Details:", data.user);
      } else {
        console.error(
          `Failed to fetch user info: ${response.status} - ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error fetching user info:", error.message);
    }
  };

  const fetchStatement = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No auth token found in localStorage.");
        return;
      }

      const response = await fetch(
        "http://localhost:3000/api/statement/get-statement-for-user",
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
        setallStatementData(data.statements); // Save to state
        console.log("User Statement:", data.statements);
      } else {
        console.error(
          `Failed to fetch user info: ${response.status} - ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error fetching user info:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        fetchUserInfo();
        fetchStatement();
      } catch (error) {
        console.error("Error in fetching data:", error);
      } finally {
        setLoading(false); // Ensure loading state is updated after all fetches
      }
    };

    fetchData();
  }, []);

  // const exportStatementToCSV = (data, filename = "statement.csv") => {
  //   try {
  //     if (!Array.isArray(data) || data.length === 0) {
  //       throw new Error("Data must be a non-empty array.");
  //     }

  //     // Define CSV fields
  //     const fields = Object.keys(data[0]); // Dynamically get keys from the first object

  //     // Create a parser
  //     const json2csvParser = new Parser({ fields });

  //     // Convert JSON data to CSV
  //     const csv = json2csvParser.parse(data);

  //     // Write CSV to a file
  //     fs.writeFileSync(filename, csv, "utf8");

  //     console.log(`CSV file "${filename}" has been successfully created.`);
  //   } catch (error) {
  //     console.error("Error exporting statement to CSV:", error.message);
  //   }
  // };

  // // Example Usage
  // const statementDetails = [
  //   { Date: "2024-12-01", Description: "Invoice Payment", Amount: 5000 },
  //   { Date: "2024-12-02", Description: "Service Charge", Amount: -200 },
  //   { Date: "2024-12-03", Description: "Refund", Amount: -500 },
  // ];

  // exportStatementToCSV(statementDetails, "statements.csv");

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 items-center">

      {/* Header Section */}
  <div className="mb-8">
    <h2 className="text-3xl font-extrabold text-blue-800">
      Statements of {userDetails.companyName}
    </h2>
    <div className="mt-4 space-y-2 text-gray-700">
      <p>
        <span className="font-bold">Address:</span>{" "}
        {userDetails.companyFullAddress || "N/A"},{" "}
        {userDetails.city || "N/A"}, {userDetails.pincode || "N/A"},{" "}
        {userDetails.country || "N/A"}
      </p>
      <p>
        <span className="font-bold">Phone:</span> {userDetails.phone || "N/A"}
      </p>
      <p>
        <span className="font-bold">GST Number:</span> {userDetails.GST || "N/A"}
      </p>
    </div>
  </div>

 {/* Summary Section */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
  {/* Total Amount */}
  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-md shadow flex flex-col items-center">
    <h3 className="text-xs font-bold uppercase tracking-wide">Total Amount</h3>
    <p className="text-lg font-extrabold mt-1">₹ {allStatementData.reduce((sum, s) => sum + s.amount, 0)}</p>
    <div className="mt-1 text-[10px]">
      <i className="fas fa-money-bill-wave"></i> Total invoices generated
    </div>
  </div>

  {/* Total Paid */}
  <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-3 rounded-md shadow flex flex-col items-center">
    <h3 className="text-xs font-bold uppercase tracking-wide">Total Paid</h3>
    <p className="text-lg font-extrabold mt-1">₹ {allStatementData.reduce((sum, s) => sum + s.paymentReceived, 0)}</p>
    <div className="mt-1 text-[10px]">
      <i className="fas fa-hand-holding-usd"></i> Payments received
    </div>
  </div>

  {/* Total Balance */}
  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-md shadow flex flex-col items-center">
    <h3 className="text-xs font-bold uppercase tracking-wide">Total Balance</h3>
    <p className="text-lg font-extrabold mt-1">₹ {allStatementData.length > 0 ? allStatementData[0].balance : 0}</p>
    <div className="mt-1 text-[10px]">
      <i className="fas fa-coins"></i> Outstanding balance
    </div>
  </div>

  {/* Invoice Summary */}
  <div className="bg-gray-50 p-3 rounded-md shadow flex flex-col items-center">
    <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide">Invoice Summary</h3>
    <div className="flex gap-2">
    <p className="text-[12px] font-medium text-gray-600 mt-1">
      <span className="text-lg font-extrabold text-blue-600">{allStatementData.filter(s => s.transactionType === "Invoice").length}</span>{" "}
      Invoices
    </p>
    <p className="text-[12px] font-medium text-gray-600 mt-1">
      <span className="text-lg font-extrabold text-green-500">{allStatementData.filter(s => s.transactionType === "Payment").length}</span>{" "}
      Payments
    </p></div>
  </div>
</div>

</div>


      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-600">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-6 py-4 text-left">Invoice Type</th>
              <th className="px-6 py-4 text-left">Details</th>
              <th className="px-6 py-4 text-right">Invoice Amount</th>
              <th className="px-6 py-4 text-right">Payment Received</th>
              <th className="px-6 py-4 text-right">Balance Amount</th>
            </tr>
          </thead>
          <tbody>
            {allStatementData.length > 1 ? (
              allStatementData.map((statement, index) => (
                <tr
                  key={index}
                  className={`h-12 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:scale-[1.01] hover:shadow-sm transition-all duration-200 ease-in-out`}
                >
                  <td className="px-6 py-4">{statement.transactionType}</td>
                  <td className="px-6 py-4">{statement.details}</td>
                  <td className="px-6 py-4 text-right">₹ {statement.amount}</td>
                  <td
                    className={`py-2 px-4 ${
                      statement.paymentReceived > 0
                        ? "font-semibold text-green-600 "
                        : "text-gray-600"
                    } `}
                  >
                    ₹ {statement.paymentReceived}
                  </td>

                  <td className={`px-6 py-4 text-right${
    statement.paymentReceived > 0 ? "font-semibold text-green-600 " : "text-red-600"
  }
                    font-bold`}>
                    ₹ {statement.balance}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-12 text-center text-gray-500 italic"
                >
                  No Statement available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

    //     <div className="bg-white p-6 rounded-lg shadow">
    //       <div className=" items-center mb-4">
    //         <h2 className="text-2xl font-bold">
    //           Statements of {userDetails.companyName}
    //         </h2>
    //         <div>
    //           <div className="text-[20px] mt-5">
    //             <p>
    //             <span className="font-semibold">  Address:</span> {userDetails.companyFullAddress || "N/A"},
    //                {userDetails.city || "N/A"}, {userDetails.pincode || ""},{" "}
    //               {userDetails.country || "N/A"}
    //             </p>
    //             <p><span className="font-semibold">  Phone:</span>  {userDetails.phone || "N/A"}</p>
    //             <p><span className="font-semibold">  GST Number:</span>  {userDetails.GST || "N/A"}</p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="overflow-x-auto mt-10">
    //       <table className="w-full whitespace-nowrap">
    //   <thead>
    //     <tr className="bg-gray-800 text-center text-white">
    //       <th className="px-4 py-2">Invoice Type</th>
    //       <th className="px-4 py-2">Details</th>
    //       <th className="px-4 py-2">Invoice Amount</th>
    //       <th className="px-4 py-2">Payment Received</th>
    //       <th className="px-4 py-2">Balance Amount</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {allStatementData.length > 1 ? (
    //       allStatementData
    //         .map((statement, index) => (
    //           <tr
    //             key={index}
    //             className="h-9 border-t text-center odd:bg-white even:bg-gray-50 hover:bg-slate-100 cursor-pointer"
    //           >
    //             <td className="px-4 py-2 ">
    //               {statement.transactionType}
    //             </td>
    //             <td className="px-4 py-2">{statement.details}</td>
    //             <td className="px-4 py-2">₹ {statement.amount}</td>
    //             <td className="px-4 py-2">₹ {statement.paymentReceived}</td>
    //             <td className="px-4 py-2 text-center">₹ {statement.balance}</td>
    //           </tr>
    //         ))
    //     ) : (
    //       <tr>
    //         <td
    //           colSpan="5"
    //           className="px-4 py-6 text-center text-gray-500"
    //         >
    //           No Statement available.
    //         </td>
    //       </tr>
    //     )}
    //   </tbody>
    // </table>

    //         </div>
    //     </div>
  );
};

export default StatementTab;
