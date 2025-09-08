import React, { useState } from "react";
import { Doughnut,Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseBreakdown = () => {
  const tabs = ["Week", "Month", "Year"];
    const [activeTab, setActiveTab] = useState("Week"); 

  const data = {
    labels: [
      "Rent Expense",
      "Repair and Maintenance",
      "Meals and entertainment",
      "Vehicle: Repairs and Maintenance",
      "Vehicle: Fuel",
      "Other",
    ],
    datasets: [
      {
        data: [30000, 20000, 15000, 10000, 8000, 7000],
        backgroundColor: [
          "#B2F2FF",
          "#FFC9F1",
          "#C6B8FF",
          "#5AC3FF",
          "#7B61FF",
          "#5CC4C2",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Disable the built-in legend
      },
    },
    cutout: "40%", // Creates a donut-like appearance
    maintainAspectRatio: false,
    responsive: true,
  };

  
  return (
    <div className="flex flex-col bg-gray-100 rounded-2xl p-6 shadow-md">
     {/* Tabs */}
     <div className="flex space-x-2">
        <div
      className="flex bg-[#D2D2D2] rounded-full p-1 w-max mx-auto"
      style={{ padding: "6px", marginBottom: "30px" }}
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

      {/* Chart and Legend */}
      <div className="flex flex-col md:flex-row justify-between items-center">

      <div className="w-[250px] h-[250px] flex justify-center items-center">
        </div>
        {/* Pie Chart */}
        <div className="w-[250px] h-[250px] flex justify-center items-center">
          <Pie data={data} options={options} />
        </div>

        {/* Legend */}
        <div className="flex flex-col space-y-2 ml-4 ">
          {data.labels.map((label, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: data.datasets[0].backgroundColor[index],
                }}
              />
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
      </div>
  );
};

export default ExpenseBreakdown;