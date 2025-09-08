import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FiSearch, FiBell, FiArrowRight } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import DynamicSideBarButton from "../../../components/DynamicSideBarButton";
import dashboard from "../../../assets/navIcons/ic_outline-dashboard.svg";
import sales from "../../../assets/navIcons/ic_outline-payment.svg";
import purchases from "../../../assets/navIcons/ic_outline-shopping-cart.svg";
import accounting from "../../../assets/navIcons/uil_files-landscapes-alt.svg";
import inventory from "../../../assets/navIcons/material-symbols_inventory.svg";
import payments from "../../../assets/navIcons/ic_outline-payments.svg";
import reports from "../../../assets/navIcons/ic_sharp-pie-chart-outline.svg";
import insights from "../../../assets/navIcons/si_insights-fill.svg";
import help from "../../../assets/navIcons/tdesign_help-circle.svg";
import settings from "../../../assets/navIcons/material-symbols_settings-outline-rounded.svg";
import PayableAndOwings from "../Dashboard/elements/PayableAndOwings";
import CashFlow from "../Dashboard/elements/CashFlow";
import Constants from "../../../components/Constants";
import ProfitAndLossChart from "../Dashboard/elements/Profitandloss";
import ExpenseBreakdown from "../Dashboard/elements/ExpenseBreakdown";
import InvoiceTab from "../Sales/Invoice";
import { useNavigate, useLocation } from "react-router-dom";


const DashboardNew = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", logo: dashboard, dropdown: false, submenu: [] },
    {
      name: "Sales",
      logo: sales,
      dropdown: true,
      submenu: [
        { name: "Invoice", link: "invoices" },
        { name: "Customer", link: "customers" },
        { name: "Credit Notes", link: "" },
        { name: "Estimates", link: "" },
      ],
    },
    { name: "Purchases", logo: purchases, dropdown: true, submenu: [] },
    { name: "Accounting", logo: accounting, dropdown: true, submenu: [] },
    { name: "Inventory", logo: inventory, dropdown: false, submenu: [] },
    { name: "Payments", logo: payments, dropdown: true, submenu: [] },
    { name: "Reports", logo: reports, dropdown: false, submenu: [] },
    { name: "Insights", logo: insights, dropdown: false, submenu: [] },
    { name: "Help", logo: help, dropdown: true, submenu: [] },
    { name: "Settings", logo: settings, dropdown: true, submenu: [] },
  ];

  const toggleMenu = (menuName) => {
    console.log("menuName", menuName);
    
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div
            className="px-6 py-6 max-h-[90vh] overflow-y-auto"
            style={{
              scrollbarWidth: "none", // Hide scrollbar for Firefox
              msOverflowStyle: "none", // Hide scrollbar for IE/Edge
            }}
          >
            <style>
              {`
      /* Hide scrollbar for Webkit browsers (Chrome, Safari, etc.) */
      .px-6::-webkit-scrollbar {
        display: none;
      }
        `}
            </style>
            <div>
              <h1 className="text-5xl font-bold">
                Hello <span className="italic">Raqueeb,</span>
              </h1>
              <p className="text-gray-600 mb-6">What would you like to start with today?</p>
            </div>
            <div className="flex flex-row space-x-8 py-6">
              <div className="flex-1">
                <h1 className="text-3xl font-semibold px-2 mb-6">Payable & Owning</h1>
                <PayableAndOwings />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-semibold px-2 mb-6 invisible">Payable & Owning</h1>
                <PayableAndOwings bgColor="#DAF0F0" textColor="#000000" />
              </div>
            </div>

            <div className="flex flex-row space-x-8 py-6">
              {/* CashFlow Component */}
              <div className="flex-1 w-full mt-10">
                <h1 className="text-3xl font-semibold px-2 mb-6">Cash Flow</h1>
                <CashFlow />
              </div>
              <div className="flex-1 w-full mt-10">
                <h1 className="text-3xl font-semibold px-2 mb-6 invisible">Cash Flow</h1>
                <div
                  className="bg-black text-white rounded-xl p-6 shadow-lg"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {/* Header */}
                  <h2 className="text-xl font-semibold mb-4">Overdue Invoices and Bills</h2>

                  {/* List of Invoices */}
                  <div className="space-y-6 ">
                    {Constants.data.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-[19px] ">
                        <span>{item.name}</span>
                        <span className="text-blue-500">{item.amount}</span>
                      </div>
                    ))}
                  </div>

                  {/* View Button */}
                  <div className="mt-10">
                    <button className="flex items-center justify-between bg-white text-black w-full px-4 py-2 rounded-full hover:bg-gray-100 transition">
                      <span className="text-sm font-semibold">View</span>
                      <FiArrowRight className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Header */}
            <h1 className="text-3xl font-semibold px-2 mb-6 mt-10">Net Income</h1>
            <div className="bg-white rounded-xl shadow-md ">
              <table className="w-full text-left border-collapse text-[24px] ">
                <thead className="">
                  <tr>
                    <th className="px-10 py-3 font-semibold text-gray-700 w-2/3">Fiscal Year</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Previous</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Current</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t ">
                    <td className="px-10 py-3 text-gray-600 w-2/3">Income</td>
                    <td className="px-4 py-3 text-gray-800">₹3,43,935.66</td>
                    <td className="px-4 py-3 text-gray-800">₹3,434.54</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-10 py-3 text-gray-600 w-2/3">Expense</td>
                    <td className="px-4 py-3 text-gray-800">₹0.00</td>
                    <td className="px-4 py-3 text-gray-800">₹0.00</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-10 py-3 text-gray-600 w-2/3">Net Income</td>
                    <td className="px-4 py-3 text-gray-800">₹3,43,935.66</td>
                    <td className="px-4 py-3 text-gray-800">₹3,434.54</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h1 className="text-3xl font-semibold px-2  mt-20">Net Income</h1>
            <div className="w-full space-x-8 py-6">
              <ProfitAndLossChart />
            </div>

            <h1 className="text-3xl font-semibold px-2  mt-20">Expense Breakdown</h1>
            <div className="w-full space-x-8 py-6">
              <ExpenseBreakdown />
            </div>

            {/* -------------------------------------------- */}
            <div className="h-20"></div>
          </div>
        );
      case "invoices":
        return <InvoiceTab />;
      case "customers":
        return <></>;
      case "statements":
        return <></>;
      case "settings":
        return <></>;
      default:
        return <HomeTab />; // Default fallback
    }
  };

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
          navigate(`/dashboardnew/${newTab}`); // Navigate to the new route
          window.scrollTo(0,0);
        }
        if (
          activeTab !== "invoices" &&
          activeTab !== "customer-statements" &&
          activeTab !== "customers" &&
          activeTab !== "products"
        ) {
          // setIsSalesOpen(false);
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
        // setIsSalesOpen(false);
      }
      setActiveTab(newTab); // Update activeTab state
      navigate(`/dashboardnew/${newTab}`); // Navigate to the new route
      window.scrollTo(0,0);
    }
  };

  return (
    <div className="fixed flex h-screen w-full" style={{ backgroundColor: "#191919" }}>
      {/* Sidebar Navigation */}
      <div className="sticky w-56 text-white flex flex-col py-6 px-0">
        <div className="flex items-center px-6 py-4">
          <img alt="Logo" src="/src/assets/logos/Asset 3@4x.png " className="h-12 mb-5" />
        </div>
        <nav className="flex-1">
          {menuItems.map((item, index) => (
            <div key={index}>
              {/* Dynamic Side Bar Button */}
              <DynamicSideBarButton
                label={item.name}
                className="dashboardnew"
                showDropdown={item.dropdown}
                onClick={() => {
                  console.log("click");
                  if (item.dropdown) toggleMenu(item.name);
                }}
                icon={item.logo}
              />

              {/* Submenu */}
              {activeMenu === item.name && (
                <>
                  {item.submenu.map((submenuItem, subIndex) => (
                    <a
                      key={subIndex}
                      // href={submenuItem.link}
                      onClick={() => {
                        console.log('click')
                        handleTabChange(submenuItem.link)}}
                      className=" pl-16 block px-6 py-2 text-md text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      {submenuItem.name}
                    </a>
                  ))}
                </>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#F2F2F2] m-5 rounded-[40px] p-4 overflow-hidden ">
        {/* Header */}
        <div className="flex justify-end items-center space-x-6 m-3">
          <FiSearch className="w-7 h-7 text-gray-600" />
          <FiBell className="w-7 h-7 text-gray-600" />
          <div className="w-11 h-11 rounded-full bg-gray-200 p-1">
            <img alt="Logo" src="/src/assets/icons/person.png" />
          </div>
        </div>

        {/* Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default DashboardNew;
