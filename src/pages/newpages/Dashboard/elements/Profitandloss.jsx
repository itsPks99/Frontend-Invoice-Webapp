import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { FiMaximize2 } from "react-icons/fi";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
  
  datasets: [
    {
      label: "Income",
      data: [40000, 80000, 60000, 20000, 50000, 70000, 90000, 30000, 10000, 80000, 90000, 60000],
      backgroundColor: "#B99EE5",
      borderRadius: 5,
      barThickness: 10, 
      maxBarThickness: 25,
    },
    {
      label: "Expense",
      data: [20000, 60000, 40000, 10000, 30000, 60000, 80000, 20000, 8000, 70000, 80000, 50000],
      backgroundColor: "#6B41AF",
      borderRadius: 5,
      barThickness: 10, 
      maxBarThickness: 25,
    },
  ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        
        labels: {
          color: "#4B4B4B",
          boxWidth: 12,
          boxHeight: 12,
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₹${value.toLocaleString()}`,
          color: "#4B4B4B",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "#E5E5E5",
          borderDash: [5, 5],
        },
      },
      x: {
        ticks: {
          color: "#4B4B4B",
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
        // Adjust bar width
        barPercentage: 0.5, // Adjusts the width of the bars (0.5 = 50% width)
        categoryPercentage: 0.8, // Adjusts spacing between categories
      },
    },
  };



const ProfitAndLossChart = () => {

    const tabs = ["Week", "Month", "Year"];
    const [activeTab, setActiveTab] = useState("Week"); 
  return (
    <div
      className="bg-purple-100 rounded-xl shadow-lg p-6 relative"
      style={{
        height: "400px",
        padding: "20px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {/* Tabs */}
        <div className="flex space-x-2">
        <div
      className="flex bg-[#CFC0E7] rounded-full p-1 w-max mx-auto"
      style={{ padding: "4px" }}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-1 text-sm font-medium rounded-full transition-all duration-200 ${
            activeTab === tab
              ? "bg-black text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          style={{ minWidth: "80px", textAlign: "center" }}
        >
          {tab}
        </button>
      ))}
    </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-black text-white px-4 py-1 rounded-full text-sm">Inflow</button>
          <FiMaximize2 className="text-black w-6 h-6 cursor-pointer" />
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: "300px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ProfitAndLossChart;