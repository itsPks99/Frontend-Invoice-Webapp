import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";
import { IoIosSettings } from "react-icons/io";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const CashFlow = () => {
  const [activeTab, setActiveTab] = useState("Week");
  const [flowType, setFlowType] = useState("Inflow");

  const tabs = ["Week", "Month", "Year"];

  const data = {
    labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
    datasets: [
      {
        label: flowType,
        data: [20000, 40000, 60000, 100000, 50000, 0, 0],
        backgroundColor: "#96B1D7",
        borderRadius: 10,
        hoverBackgroundColor: "#7389a8", // Add hover effect
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₹ ${value.toLocaleString()}`,
        },
        grid: {
          color: "#e0e0e0", // Color of grid lines
          borderDash: [5, 5], // Dashed grid lines
          borderDashOffset: 2, // Optional: Adjust the dash offset
        },
      },
      x: {
        grid: {
          display: false, // No grid lines for x-axis
        },
      },
    },
  };

  return (
    <div className="bg-[#E8F0FB] p-6 rounded-lg shadow-sm relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Cash Flow</h2>
        <IoIosSettings className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors" />
      </div>
      <div className="flex justify-between items-center mb-4">
        {/* Tabs */}
        <div className="flex space-x-2">
          <div className="flex bg-[#B7C8DF] rounded-full p-1 w-max mx-auto" style={{ padding: "6px" }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeTab === tab ? "bg-black text-white" : "text-gray-700 hover:bg-gray-200"
                }`}
                style={{ minWidth: "80px", textAlign: "center" }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        {/* Dropdown */}
        <div className="relative">
          <select
            className="px-4 py-2 bg-black text-white rounded-full cursor-pointer hover:bg-gray-800 transition-colors"
            value={flowType}
            onChange={(e) => setFlowType(e.target.value)}
          >
            <option value="Inflow">Inflow</option>
            <option value="Outflow">Outflow</option>
          </select>
        </div>
      </div>
      {/* Chart */}
      <div className="h-[250px] ">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default CashFlow;
