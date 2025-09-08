import React, { useEffect, useState } from "react";
import { FiSearch,FiCalendar } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import default styles





const InvoiceTab = () => {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const tabs = ["All", "Paid", "Partially Paid", "Unpaid"];
    const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="px-6 py-6 max-h-[90vh] overflow-y-auto" style={{
        scrollbarWidth: "none", // Hide scrollbar for Firefox
        msOverflowStyle: "none", // Hide scrollbar for IE/Edge
      }}>
        <style>
              {`
      /* Hide scrollbar for Webkit browsers (Chrome, Safari, etc.) */
      .px-6::-webkit-scrollbar {
        display: none;
      }
        `}
            </style>
    {/* Header */}
    <div>
      <h1 className="text-5xl font-bold text-gray-800">Invoices</h1>
      <p className="text-[18px] text-gray-600 mt-2">Last updated just a moment ago.</p>
    </div>

    {/* Metrics */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-6">
      <div className="py-8 px-10 bg-[#CFC0E7] rounded-3xl text-left">
        <h3 className="text-xl  text-[#3B3B3B]">Total Due</h3>
        <p className="text-3xl font-semibold text-[#3B3B3B]">₹70789.30</p>
      </div>
      <div className="py-8 px-10  bg-[#B6E0DE] rounded-3xl text-left">
        <h3 className="text-xl  text-[#3B3B3B]">Total Paid</h3>
        <p className="text-3xl font-semibold text-[#3B3B3B]">₹20892.30</p>
      </div>
      <div className="py-8 px-10  bg-[#F6F0D8] rounded-3xl text-left">
        <h3 className="text-xl  text-[#3B3B3B]">
          Total Invoices Generated
        </h3>
        <p className="text-3xl font-semibold text-[#3B3B3B]">560</p>
      </div>
    </div>

    {/* Search and Filters */}
    <div className="flex flex-col md:flex-row items-center mt-10 gap-4 ">
    <div className="flex items-center bg-white  rounded-full shadow-sm overflow-hidden w-full max-w-lg ">
      <input
        type="text"
        placeholder="Search by #, Total or Customer Name"
        className="flex-1 px-10 py-3 text-gray-600 focus:outline-none rounded-l-full text-left"
      />
      <button className=" p-1 rounded-r-full transition border-l-2 border-gray-300">
        <FiSearch className="w-7 h-7 text-gray-600 mx-3" />
      </button>
    </div>
    <div className="flex items-center gap-4">
      {/* From Date */}
      <div className="relative flex items-center bg-white  rounded-full px-4 py-3 shadow-sm">
        <DatePicker
          selected={fromDate}
          onChange={(date) => setFromDate(date)}
          placeholderText="From"
          
          dateFormat="dd/MM/yyyy"
        //   disabled = {fromDate && toDate ? true :false}
          className="ml-2 bg-transparent text-gray-600 focus:outline-none w-full "
          popperClassName="rounded-lg border border-gray-300 shadow-lg bg-white p-2"
          calendarClassName="rounded-lg shadow-lg"
          dayClassName={(date) =>
            "text-gray-700 hover:bg-blue-500 hover:text-white rounded-full"
          }
          todayButton="Today"
        />
        <FiCalendar className="text-gray-500 w-5 h-5" />
      </div>

      {/* To Date */}
      <div className="relative flex items-center bg-white  rounded-full px-4 py-3 shadow-sm">
        <DatePicker
          selected={toDate}
          onChange={(date) => setToDate(date)}
          placeholderText="To"
          dateFormat="dd/MM/yyyy"
          className="ml-2 bg-transparent text-gray-600 focus:outline-none w-full"
          popperClassName="rounded-lg border border-gray-300 shadow-lg bg-white p-2"
          calendarClassName="rounded-lg shadow-lg"
          dayClassName={(date) =>
            "text-gray-700 hover:bg-blue-500 hover:text-white rounded-full"
          }
          todayButton="Today"
        />
        <FiCalendar className="text-gray-500 w-5 h-5" />
      </div>
    </div>
      {/* <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
        Create Invoice
      </button> */}
    </div>

    {/* Tabs */}
    <div className="flex items-center justify-between mt-6">
  {/* Tabs on the left */}
  <div className="flex bg-[#E4E4E4] rounded-full p-2 w-max">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-4  text-lg font-medium rounded-full transition-all ease-linear duration-200 ${
          activeTab === tab ? "bg-black text-white" : "text-gray-700 hover:bg-gray-200"
        }`}
        style={{ padding: "2px 26px", textAlign: "center" }}
      >
        {tab} {48}
      </button>
    ))}
  </div>
  


  {/* Create Invoice button on the right */}
  <button className="px-8 py-2 border border-blue-600 text-blue-600 rounded-3xl text-lg hover:bg-blue-600 hover:text-white">
    Create Invoice
  </button>
</div>

    {/* Table */}
    <div className="my-8 bg-white rounded-3xl shadow-md overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-white text-gray-600 text-xl text-center border border-gray-200">
          <tr>
            <th className="py-4 px-6">Status</th>
            <th className="py-4 px-4">Invoice ID</th>
            <th className="py-4 px-4">Customer</th>
            <th className="py-4 px-4">Date</th>
            <th className="py-4 px-4">Qty</th>
            <th className="py-4 px-4">Total</th>
            <th className="py-4 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 text-center text-lg">
          <tr className="border-t ">
            <td className="py-3 px-4">
              <span className="px-2 py-1 text-sm bg-[#FF5A5A4D] text-[#8B1616] rounded-full border border-[#8B1616]">
              Unpaid
              </span>
            </td>
            <td className="py-3 px-4 text-[#1E57D9] cursor-pointer">ARQ1051</td>
            <td className="py-3 px-4">Shivam Gaur</td>
            <td className="py-3 px-4">02/01/2025</td>
            <td className="py-3 px-4">2</td>
            <td className="py-3 px-4">₹20,000.00</td>
            <td className="py-3 px-4 ">
              <button className="text-[#3B3B3B] hover:text-gray-700">
              <BsThreeDots className="w-8 h-8" />
              </button>
            </td>
          </tr>
          <tr className="border-t ">
            <td className="py-3 px-4">
              <span className="px-2 py-1 text-sm bg-[#FF5A5A4D] text-[#8B1616] rounded-full border border-[#8B1616]">
                Unpaid
              </span>
            </td>
            <td className="py-3 px-4 text-[#1E57D9] cursor-pointer">ARQ1051</td>
            <td className="py-3 px-4">Shivam Gaur</td>
            <td className="py-3 px-4">02/01/2025</td>
            <td className="py-3 px-4">2</td>
            <td className="py-3 px-4">₹20,000.00</td>
            <td className="py-3 px-4 ">
              <button className="text-[#3B3B3B] hover:text-gray-700">
              <BsThreeDots className="w-8 h-8" />
              </button>
            </td>
          </tr>
          <tr className="border-t ">
            <td className="py-3 px-4">
              <span className="px-4 py-1 text-sm bg-[#63FF4A4D] text-[#268B16] rounded-full border border-[#268B16]">
                Paid
              </span>
            </td>
            <td className="py-3 px-4 text-[#1E57D9] cursor-pointer">ARQ1051</td>
            <td className="py-3 px-4">Shivam Gaur</td>
            <td className="py-3 px-4">02/01/2025</td>
            <td className="py-3 px-4">2</td>
            <td className="py-3 px-4">₹20,000.00</td>
            <td className="py-3 px-4 ">
              <button className="text-[#3B3B3B] hover:text-gray-700">
              <BsThreeDots className="w-8 h-8" />
              </button>
            </td>
          </tr>
          <tr className="border-t ">
            <td className="py-3 px-4">
              <span className="px-2 py-1 text-sm bg-[#FF5A5A4D] text-[#8B1616] rounded-full border border-[#8B1616]">
              Unpaid
              </span>
            </td>
            <td className="py-3 px-4 text-[#1E57D9] cursor-pointer">ARQ1051</td>
            <td className="py-3 px-4">Shivam Gaur</td>
            <td className="py-3 px-4">02/01/2025</td>
            <td className="py-3 px-4">2</td>
            <td className="py-3 px-4">₹20,000.00</td>
            <td className="py-3 px-4 ">
              <button className="text-[#3B3B3B] hover:text-gray-700">
              <BsThreeDots className="w-8 h-8" />
              </button>
            </td>
          </tr>
          <tr className="border-t ">
            <td className="py-3 px-4">
              <span className="px-2 py-1 text-sm bg-[#FF5A5A4D] text-[#8B1616] rounded-full border border-[#8B1616]">
              Unpaid
              </span>
            </td>
            <td className="py-3 px-4 text-[#1E57D9] cursor-pointer">ARQ1051</td>
            <td className="py-3 px-4">Shivam Gaur</td>
            <td className="py-3 px-4">02/01/2025</td>
            <td className="py-3 px-4">2</td>
            <td className="py-3 px-4">₹20,000.00</td>
            <td className="py-3 px-4 ">
              <button className="text-[#3B3B3B] hover:text-gray-700">
              <BsThreeDots className="w-8 h-8" />
              </button>
            </td>
          </tr>
          <tr className="border-t ">
            <td className="py-3 px-4">
              <span className="px-4 py-1 text-sm bg-[#63FF4A4D] text-[#268B16] rounded-full border border-[#268B16]">
                Paid
              </span>
            </td>
            <td className="py-3 px-4 text-[#1E57D9] cursor-pointer">ARQ1051</td>
            <td className="py-3 px-4">Shivam Gaur</td>
            <td className="py-3 px-4">02/01/2025</td>
            <td className="py-3 px-4">2</td>
            <td className="py-3 px-4">₹20,000.00</td>
            <td className="py-3 px-4 ">
              <button className="text-[#3B3B3B] hover:text-gray-700">
              <BsThreeDots className="w-8 h-8" />
              </button>
            </td>
          </tr>
          
        </tbody>
      </table>

      
    </div>

    <div className="h-10"></div>
  </div>
  );
};

export default InvoiceTab;
