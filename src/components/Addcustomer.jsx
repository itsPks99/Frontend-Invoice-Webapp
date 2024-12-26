import React, { useState } from "react";
import Swal from "sweetalert2";
import PickState from "./PickState";
import { useNavigate } from "react-router-dom";
import { validateGSTNumber } from "../apiServices";

const AddNewCustomerForm = ({ setActiveTab }) => {
  const [copyShipping, setCopyShipping] = useState(false);
  const [isGstValid, setIsGstValid] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [tradeName, settradeName] = useState("");
  const navigate = useNavigate();

  const [customerFormData, setcustomerFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    gstNumber: "",
    billingAddress: {
      country: "India",
      address1: "",
      city: "",
      state: "",
      pincode: "",
    },
    shippingAddress: {
      country: "India",
      address1: "",
      city: "",
      state: "",
      pincode: "",
    },
  });
  const clearcustomerFormData = () => {
    setcustomerFormData({
      firstName: "",
      lastName: "",
      companyName: "",
      email: "",
      phone: "",
      gstNumber: "",
      billingAddress: {
        country: "India",
        address1: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
      },
      shippingAddress: {
        country: "India",
        address1: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
      },
    });
  };

  const customerHandleFormSubmit = async (e) => {
    e.preventDefault();

    // if(isGstValid){
    //     const requestData = {
    //         firstName: customerFormData.firstName,
    //         lastName: customerFormData.lastName,
    //         companyName: customerFormData.companyName,
    //         email: customerFormData.email,
    //         phone: Number(customerFormData.phone),
    //         gstNumber: customerFormData.gstNumber,
    //         billingAddress: {
    //           country: customerFormData.billingAddress.country,
    //           address1: customerFormData.billingAddress.address1,
    //           city: customerFormData.billingAddress.city,
    //           state: customerFormData.billingAddress.state,
    //           pincode: customerFormData.billingAddress.pincode,
    //         },
    //         shippingAddress: {
    //           country: customerFormData.shippingAddress.country,
    //           address1: customerFormData.shippingAddress.address1,
    //           city: customerFormData.shippingAddress.city,
    //           state: customerFormData.shippingAddress.state,
    //           pincode: customerFormData.shippingAddress.pincode,
    //         },
    //       };

    //       // console.log("requestData", requestData);

    //       try {
    //         const token = localStorage.getItem("authToken");
    //         const response = await fetch(
    //           "http://localhost:3000/api/customers/createCustomer",
    //           {
    //             method: "POST",
    //             headers: {
    //               "Content-Type": "application/json",
    //               Authorization: `Bearer ${token}`,
    //             },
    //             body: JSON.stringify(requestData),
    //           }
    //         );

    //         const result = await response.json();
    //         // console.log("result:", result);
    //         if (response.ok) {
    //           // console.log("Customer added successfully:", result);
    //           Swal.fire({
    //             icon: "success",
    //             title: "Customer added successfully!",
    //             text: "Your Customer has been added.",
    //             confirmButtonText: "OK",
    //             confirmButtonColor: "#2563EB",
    //             // timer: 3000, // Auto close after 3 seconds
    //           });
    //           // fetchCustomers();
    //           // setShowCustomerForm(false);
    //           // handleclose(false);
    //           onClose();
    //           fetchCust();
    //           clearcustomerFormData();
    //         } else {
    //           Swal.fire({
    //             icon: "error",
    //             title: "Error occured",
    //             text: "Error adding customer: " + result.message,
    //             confirmButtonText: "OK",
    //             confirmButtonColor: "#2563EB",
    //             // timer: 3000, // Auto close after 3 seconds
    //           });

    //         }
    //       } catch (error) {
    //         console.error("Error:", error);

    //       //   alert("Failed to add customer.");
    //       }
    // }
    // else{
    //     Swal.fire({
    //         icon: "error",
    //         title: "Invalid Information",
    //         text: "Please recheck and enter valid information",
    //         confirmButtonText: "OK",
    //         confirmButtonColor: "#2563EB",
    //         // timer: 3000, // Auto close after 3 seconds
    //       });
    // }
    // Prepare the data structure for the API call

    const requestData = {
      firstName: customerFormData.firstName,
      lastName: customerFormData.lastName,
      companyName: customerFormData.companyName,
      email: customerFormData.email,
      phone: Number(customerFormData.phone),
      gstNumber: customerFormData.gstNumber,
      billingAddress: {
        country: customerFormData.billingAddress.country,
        address1: customerFormData.billingAddress.address1,
        city: customerFormData.billingAddress.city,
        state: customerFormData.billingAddress.state,
        pincode: customerFormData.billingAddress.pincode,
      },
      shippingAddress: {
        country: customerFormData.shippingAddress.country,
        address1: customerFormData.shippingAddress.address1,
        city: customerFormData.shippingAddress.city,
        state: customerFormData.shippingAddress.state,
        pincode: customerFormData.shippingAddress.pincode,
      },
    };

    // console.log("requestData", requestData);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "http://localhost:3000/api/customers/createCustomer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();
      // console.log("result:", result);
      if (response.ok) {
        // console.log("Customer added successfully:", result);
        Swal.fire({
          icon: "success",
          title: "Customer added successfully!",
          text: "Your Customer has been added.",
          confirmButtonText: "OK",
          confirmButtonColor: "#2563EB",
          // timer: 3000, // Auto close after 3 seconds
        });
        // fetchCustomers();
        // setShowCustomerForm(false);
        // handleclose(false);
        navigate(-1);
        window.scrollTo(0, 0);
        // fetchCust();
        clearcustomerFormData();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error occured",
          text: "Error adding customer: " + result.message,
          confirmButtonText: "OK",
          confirmButtonColor: "#2563EB",
          // timer: 3000, // Auto close after 3 seconds
        });
      }
    } catch (error) {
      console.error("Error:", error);

      //   alert("Failed to add customer.");
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setcustomerFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleInputChange2 = (e) => {
    const { id, value } = e.target;
    const [section, field] = id.split(".");

    setcustomerFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));

    // // If "Copy to Shipping Address" is enabled, update shippingAddress too
    // if (copyShipping && section === "billingAddress") {
    //   setcustomerFormData((prevData) => ({
    //     ...prevData,
    //     shippingAddress: {
    //       ...prevData.shippingAddress,
    //       [field]: value,
    //     },
    //   }));
    // }
  };

  const checkboxChange = (e) => {
    const isChecked = e.target.checked;
    setCopyShipping(isChecked);

    if (isChecked) {
      setcustomerFormData((prevData) => ({
        ...prevData,
        shippingAddress: { ...prevData.billingAddress }, // Copy billing to shipping
      }));
    }
  };

//   const handleTabChange = (newTab) => {
//     setActiveTab(newTab); // Update the activeTab in the Dashboard
//     navigate(`/dashboard/${newTab}`);
//     window.scrollTo(0, 0);
//   };

  // Handler for validation button click
  const handleValidationClick = () => {
    if (customerFormData.gstNumber) {
      setIsChecking(true);

      validateGSTNumber(customerFormData.gstNumber)
        .then((gstData) => {
          if (gstData) {
            setIsGstValid(true);
            console.log("GST number is valid:", gstData);
            settradeName(gstData.result.source_output.trade_name);
          } else {
            setIsGstValid(false);
            console.log("GST number is not valid:", gstData);
          }
        })
        .catch((error) => {
          console.error("Error validating GST number:", error);
          setIsGstValid(false); // Set to false in case of error
        })
        .finally(() => {
          setIsChecking(false);
        });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Missing GST Number",
        text: "Please enter a GST number before verifying.",
        confirmButtonText: "OK",
        confirmButtonColor: "#2563EB", // Adjust color to match your theme
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">New Customer</h1>
      <form onSubmit={customerHandleFormSubmit} className="space-y-8">
        {/* Basic Information */}
        <section className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">
                Business Information
              </label>
              <input
                id="companyName"
                value={customerFormData.companyName}
                type="text"
                placeholder="Name of business or person"
                className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
                onChange={handleInputChange}
                required
              />

              <input
                id="gstNumber"
                value={customerFormData.gstNumber}
                onChange={handleInputChange}
                className={`mt-2 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101 ${
                  isGstValid === null
                    ? ""
                    : isGstValid
                    ? "focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40"
                    : "border-red-500 focus:border-red-500 focus:ring focus:ring-red-100 focus:ring-opacity-40"
                }`}
                placeholder="Enter GST number"
              />
              <div className="relative flex gap-4">
                <p
                  onClick={() => {
                    if (isGstValid !== true) {
                      handleValidationClick();
                    }
                  }}
                  className={`text-blue-500 px-2 py-1 focus:outline-none cursor-pointer ${
                    isChecking ? "cursor-not-allowed text-gray-400" : ""
                  }`}
                >
                  {isChecking ? (
                    "Checking..."
                  ) : isGstValid === true ? (
                    <span className="text-gray-400">Verified</span>
                  ) : (
                    "Verify"
                  )}
                </p>

                {isGstValid !== null && (
                  <>
                    {isGstValid === false ? (
                      <p className="text-red-600 py-1 text-sm mt-1">
                        Invalid GST Number
                      </p>
                    ) : (
                      <p className="text-green-600 py-1 text-sm mt-1">
                        Valid GST Number (Trade Name: {tradeName})
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
            {/* Primary Contact */}
            <div>
              <label className="block text-gray-600">Primary contact</label>
              <div className="flex gap-2">
                <input
                  id="firstName"
                  value={customerFormData.firstName}
                  type="text"
                  placeholder="First name"
                  className="mt-2 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
                  onChange={handleInputChange}
                  required
                />
                <input
                  id="lastName"
                  value={customerFormData.lastName}
                  type="text"
                  placeholder="Last name"
                  className="mt-2 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <input
                id="email"
                value={customerFormData.email}
                type="email"
                placeholder="Email"
                className="mt-2 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
                onChange={handleInputChange}
                required
              />
              <input
                id="phone"
                value={customerFormData.phone}
                type="tel"
                placeholder="Phone"
                className="mt-2 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </section>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Billing Section */}
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Billing
              </h2>
              <div>
                <label className="block text-gray-600">Billing Address</label>
                <input
                  type="text"
                  placeholder="Address "
                  className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm"
                  id="billingAddress.address1"
                  value={customerFormData.billingAddress.address1}
                  onChange={handleInputChange2}
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  className="mt-2 w-full p-3 rounded-md border border-gray-300 shadow-sm"
                  id="billingAddress.city"
                  value={customerFormData.billingAddress.city}
                  onChange={handleInputChange2}
                  required
                />
                <select
                  id="billingAddress.state" // Maintain consistent structure for id
                  value={customerFormData.billingAddress.state} // Bind to the current state value
                  onChange={(e) => {
                    // Find the selected state object based on the selected value
                    const selectedState = PickState.find(
                      (state) => state.name === e.target.value
                    );

                    // Update the nested billingAddress structure correctly
                    setcustomerFormData((prevData) => ({
                      ...prevData,
                      billingAddress: {
                        ...prevData.billingAddress,
                        state: selectedState ? selectedState.name : "", // Update the state field
                      },
                    }));

                    // Optional: Debugging logs
                    // console.log("Selected State:", selectedState);
                  }}
                  className="mt-2 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-40 transition-all duration-300 ease-in-out hover:shadow-md"
                >
                  {PickState.map((state) => (
                    <option key={state.code} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Postal"
                    className="w-full p-3 rounded-md border border-gray-300 shadow-sm"
                    id="billingAddress.pincode"
                    value={customerFormData.billingAddress.pincode}
                    onChange={handleInputChange2}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Postal"
                    className="w-full p-3 rounded-md border text-gray-400 border-gray-300 shadow-sm"
                    id="billingAddress.country"
                    value={customerFormData.billingAddress.country}
                    onChange={handleInputChange2}
                    disabled
                  />
                </div>
              </div>
            </section>

            {/* Shipping Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  Shipping
                </h2>
                <label className="flex items-center text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={(e) => checkboxChange(e)}
                    checked={copyShipping}
                  />
                  Same as Billing Address
                </label>
              </div>
              <div>
                <label className="block text-gray-600">Ship to</label>
                <input
                  type="text"
                  placeholder="Address "
                  className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm"
                  id="billingAddress.address1"
                  value={customerFormData.shippingAddress.address1}
                  onChange={handleInputChange2}
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  className="mt-2 w-full p-3 rounded-md border border-gray-300 shadow-sm"
                  id="billingAddress.city"
                  value={customerFormData.shippingAddress.city}
                  onChange={handleInputChange2}
                  required
                />
                <select
                  id="shippingAddress.state" // Maintain consistent structure for id
                  value={customerFormData.shippingAddress.state} // Bind to the current state value
                  onChange={(e) => {
                    // Find the selected state object based on the selected value
                    const selectedState = PickState.find(
                      (state) => state.name === e.target.value
                    );

                    // Update the nested billingAddress structure correctly
                    setcustomerFormData((prevData) => ({
                      ...prevData,
                      shippingAddress: {
                        ...prevData.shippingAddress,
                        state: selectedState ? selectedState.name : "", // Update the state field
                      },
                    }));

                    // Optional: Debugging logs
                    // console.log("Selected State:", selectedState);
                  }}
                  className="mt-2 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-40 transition-all duration-300 ease-in-out hover:shadow-md"
                >
                  {PickState.map((state) => (
                    <option
                      className={
                        state.name === "Select state"
                          ? "text-gray-500"
                          : "text-red-500"
                      }
                    >
                      {state.name}
                    </option>
                  ))}
                </select>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Postal"
                    className="w-full p-3 rounded-md border border-gray-300 shadow-sm"
                    id="shippingAddress.pincode"
                    value={customerFormData.shippingAddress.pincode}
                    onChange={handleInputChange2}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Postal"
                    className="w-full p-3 rounded-md border text-gray-400 border-gray-300 shadow-sm"
                    id="shippingAddress.country"
                    value={customerFormData.shippingAddress.country}
                    onChange={handleInputChange2}
                    disabled
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => {
              navigate(-1);
              window.scrollTo(0, 0);
            }}
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py- bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewCustomerForm;
