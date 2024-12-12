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
    <div className="bg-white p-6 rounded-lg shadow">
      <div className=" items-center mb-4">
        <h2 className="text-2xl font-bold">
          Statements of {userDetails.companyName}
        </h2>
        <div>
          <div className="text-[20px] mt-5">
            <p>
            <span className="font-semibold">  Address:</span> {userDetails.companyFullAddress || "N/A"}, 
               {userDetails.city || "N/A"}, {userDetails.pincode || ""},{" "}
              {userDetails.country || "N/A"}
            </p>
            <p><span className="font-semibold">  Phone:</span>  {userDetails.phone || "N/A"}</p>
            <p><span className="font-semibold">  GST Number:</span>  {userDetails.GST || "N/A"}</p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto mt-10">
      <table className="w-full whitespace-nowrap">
  <thead>
    <tr className="bg-gray-800 text-center text-white">
      <th className="px-4 py-2">Invoice Type</th>
      <th className="px-4 py-2">Details</th>
      <th className="px-4 py-2">Invoice Amount</th>
      <th className="px-4 py-2">Payment Received</th>
      <th className="px-4 py-2">Balance Amount</th>
    </tr>
  </thead>
  <tbody>
    {allStatementData.length > 1 ? (
      allStatementData
        .map((statement, index) => (
          <tr
            key={index}
            className="h-9 border-t text-center odd:bg-white even:bg-gray-50 hover:bg-slate-100 cursor-pointer"
          >
            <td className="px-4 py-2 ">
              {statement.transactionType}
            </td>
            <td className="px-4 py-2">{statement.details}</td>
            <td className="px-4 py-2">₹ {statement.amount}</td>
            <td className="px-4 py-2">₹ {statement.paymentReceived}</td>
            <td className="px-4 py-2 text-center">₹ {statement.balance}</td>
          </tr>
        ))
    ) : (
      <tr>
        <td
          colSpan="5"
          className="px-4 py-6 text-center text-gray-500"
        >
          No Statement available.
        </td>
      </tr>
    )}
  </tbody>
</table>

        </div>
    </div>
  );
};

export default StatementTab;


 