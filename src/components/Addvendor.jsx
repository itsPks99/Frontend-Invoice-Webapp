import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import PickState from "./PickState";
import { useNavigate } from "react-router-dom";
import { validateGSTNumber } from "../apiServices";
import { use } from "react";
import e from "cors";

const AddNewVendorForm = () => {
  const [copyShipping, setCopyShipping] = useState(false);
  const [isGstValid, setIsGstValid] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [tradeName, settradeName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { vendorDetails, clickType } = location.state || {};

  const [vendorFormData, setvendorFormData] = useState({
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

  
  const clearvendorFormData = () => {
    setvendorFormData({
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

  useEffect(() => {
    console.log("vendorDetails", vendorDetails);
    console.log("clickType", clickType);
    if (vendorDetails && clickType === "update") {
      
      setvendorFormData({
        firstName: vendorDetails.firstName,
        lastName: vendorDetails.lastName,
        companyName: vendorDetails.companyName,
        email: vendorDetails.email,
        phone: vendorDetails.phone,
        gstNumber: vendorDetails.gstNumber,
        billingAddress: {
          country: vendorDetails.billingAddress.country,
          address1: vendorDetails.billingAddress.address1,
          city: vendorDetails.billingAddress.city,
          state: vendorDetails.billingAddress.state,
          pincode: vendorDetails.billingAddress.pincode,
        },
        shippingAddress: {
          country: vendorDetails.shippingAddress.country,
          address1: vendorDetails.shippingAddress.address1,
          city: vendorDetails.shippingAddress.city,
          state: vendorDetails.shippingAddress.state,
          pincode: vendorDetails.shippingAddress.pincode,
        },
      });
      setCopyShipping(true);
    }else{
     
    }
  }, [vendorDetails]);

  const vendorHandleFormSubmit = async (e) => {
    e.preventDefault();

    // if(isGstValid){
    //     const requestData = {
    //         firstName: vendorFormData.firstName,
    //         lastName: vendorFormData.lastName,
    //         companyName: vendorFormData.companyName,
    //         email: vendorFormData.email,
    //         phone: Number(vendorFormData.phone),
    //         gstNumber: vendorFormData.gstNumber,
    //         billingAddress: {
    //           country: vendorFormData.billingAddress.country,
    //           address1: vendorFormData.billingAddress.address1,
    //           city: vendorFormData.billingAddress.city,
    //           state: vendorFormData.billingAddress.state,
    //           pincode: vendorFormData.billingAddress.pincode,
    //         },
    //         shippingAddress: {
    //           country: vendorFormData.shippingAddress.country,
    //           address1: vendorFormData.shippingAddress.address1,
    //           city: vendorFormData.shippingAddress.city,
    //           state: vendorFormData.shippingAddress.state,
    //           pincode: vendorFormData.shippingAddress.pincode,
    //         },
    //       };

    //       // console.log("requestData", requestData);

    //       try {
    //         const token = localStorage.getItem("authToken");
    //         const response = await fetch(
    //           "http://localhost:3000/api/vendors/createVendor",
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
    //           // console.log("Vendor added successfully:", result);
    //           Swal.fire({
    //             icon: "success",
    //             title: "Vendor added successfully!",
    //             text: "Your Vendor has been added.",
    //             confirmButtonText: "OK",
    //             confirmButtonColor: "#2563EB",
    //             // timer: 3000, // Auto close after 3 seconds
    //           });
    //           // fetchVendors();
    //           // setShowVendorForm(false);
    //           // handleclose(false);
    //           onClose();
    //           fetchCust();
    //           clearvendorFormData();
    //         } else {
    //           Swal.fire({
    //             icon: "error",
    //             title: "Error occured",
    //             text: "Error adding vendor: " + result.message,
    //             confirmButtonText: "OK",
    //             confirmButtonColor: "#2563EB",
    //             // timer: 3000, // Auto close after 3 seconds
    //           });

    //         }
    //       } catch (error) {
    //         console.error("Error:", error);

    //       //   alert("Failed to add vendor.");
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
      firstName: vendorFormData.firstName,
      lastName: vendorFormData.lastName,
      companyName: vendorFormData.companyName,
      email: vendorFormData.email,
      phone: Number(vendorFormData.phone),
      gstNumber: vendorFormData.gstNumber,
      billingAddress: {
        country: vendorFormData.billingAddress.country,
        address1: vendorFormData.billingAddress.address1,
        city: vendorFormData.billingAddress.city,
        state: vendorFormData.billingAddress.state,
        pincode: vendorFormData.billingAddress.pincode,
      },
      shippingAddress: {
        country: vendorFormData.shippingAddress.country,
        address1: vendorFormData.shippingAddress.address1,
        city: vendorFormData.shippingAddress.city,
        state: vendorFormData.shippingAddress.state,
        pincode: vendorFormData.shippingAddress.pincode,
      },
    };

    console.log("requestData", requestData);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:3000/api/vendor/createVendor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      console.log("result:", result);
      if (response.ok) {
        console.log("Vendor added successfully:", result);
        Swal.fire({
          icon: "success",
          title: "Vendor added successfully!",
          text: "Your Vendor has been added.",
          confirmButtonText: "OK",
          confirmButtonColor: "#2563EB",
          // timer: 3000, // Auto close after 3 seconds
        });
        // fetchVendors();
        // setShowVendorForm(false);
        // handleclose(false);
        navigate(-1);
        window.scrollTo(0, 0);
        // fetchCust();
        clearvendorFormData();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error occured",
          text: "Error adding vendor: " + result.message,
          confirmButtonText: "OK",
          confirmButtonColor: "#2563EB",
          // timer: 3000, // Auto close after 3 seconds
        });
      }
    } catch (error) {
      console.error("Error:", error);

      //   alert("Failed to add vendor.");
    }
  };

  const vendorHandleFormUpdateSubmit = async (e,vendorId) => {
    e.preventDefault();

    const requestData = {
      firstName: vendorFormData.firstName,
      lastName: vendorFormData.lastName,
      companyName: vendorFormData.companyName,
      email: vendorFormData.email,
      phone: Number(vendorFormData.phone),
      gstNumber: vendorFormData.gstNumber,
      billingAddress: {
        country: vendorFormData.billingAddress.country,
        address1: vendorFormData.billingAddress.address1,
        city: vendorFormData.billingAddress.city,
        state: vendorFormData.billingAddress.state,
        pincode: vendorFormData.billingAddress.pincode,
      },
      shippingAddress: {
        country: vendorFormData.shippingAddress.country,
        address1: vendorFormData.shippingAddress.address1,
        city: vendorFormData.shippingAddress.city,
        state: vendorFormData.shippingAddress.state,
        pincode: vendorFormData.shippingAddress.pincode,
      },
    };

    console.log("requestData", requestData);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:3000/api/vendor/updateVendor/${vendorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      console.log("result:", result);
      if (response.ok) {
        console.log("Vendor added successfully:", result);
        Swal.fire({
          icon: "success",
          title: "Vendor added successfully!",
          text: "Your Vendor has been added.",
          confirmButtonText: "OK",
          confirmButtonColor: "#2563EB",
          // timer: 3000, // Auto close after 3 seconds
        });
        // fetchVendors();
        // setShowVendorForm(false);
        // handleclose(false);
        navigate(-1);
        window.scrollTo(0, 0);
        // fetchCust();
        clearvendorFormData();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error occured",
          text: "Error adding vendor: " + result.message,
          confirmButtonText: "OK",
          confirmButtonColor: "#2563EB",
          // timer: 3000, // Auto close after 3 seconds
        });
      }
    } catch (error) {
      console.error("Error:", error);

      //   alert("Failed to add vendor.");
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setvendorFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleInputChange2 = (e) => {
    const { id, value } = e.target;
    const [section, field] = id.split(".");

    setvendorFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));

    // // If "Copy to Shipping Address" is enabled, update shippingAddress too
    // if (copyShipping && section === "billingAddress") {
    //   setvendorFormData((prevData) => ({
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
      setvendorFormData((prevData) => ({
        ...prevData,
        shippingAddress: { ...prevData.billingAddress }, // Copy billing to shipping
      }));
    }
  };

  

  // Handler for validation button click
  const handleValidationClick = () => {
    if (vendorFormData.gstNumber) {
      setIsChecking(true);

      validateGSTNumber(vendorFormData.gstNumber)
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">New Vendor</h1>
      <form
  onSubmit={(e) => {
   
    e.stopPropagation(); // Stop the event from propagating further

    if (clickType === "create") {
      vendorHandleFormSubmit(e); // Call the create function
    } else if (vendorDetails && vendorDetails._id) {
      vendorHandleFormUpdateSubmit(e, vendorDetails._id); // Call the update function with ID
    } else {
      console.error("Invalid form state or missing ID for update");
    }
  }}
  className="space-y-8"
>
        {/* Basic Information */}
        <section className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Business Information</label>
              <input
                id="companyName"
                value={vendorFormData.companyName}
                type="text"
                placeholder="Name of business or person"
                className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 
                focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
                onChange={handleInputChange}
                required
              />

              <input
                id="gstNumber"
                value={vendorFormData.gstNumber}
                onChange={handleInputChange}
                className={`mt-2 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 transition-all 
                  duration-300 ease-in-out transform hover:shadow-md hover:scale-101 ${
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
                      <p className="text-red-600 py-1 text-sm mt-1">Invalid GST Number</p>
                    ) : (
                      <p className="text-green-600 py-1 text-sm mt-1">Valid GST Number (Trade Name: {tradeName})</p>
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
                  value={vendorFormData.firstName}
                  type="text"
                  placeholder="First name"
                  className="mt-2 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
                  onChange={handleInputChange}
                  required
                />
                <input
                  id="lastName"
                  value={vendorFormData.lastName}
                  type="text"
                  placeholder="Last name"
                  className="mt-2 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <input
                id="email"
                value={vendorFormData.email}
                type="email"
                placeholder="Email"
                className="mt-2 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
                onChange={handleInputChange}
                required
              />
              <input
                id="phone"
                value={vendorFormData.phone}
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
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Billing</h2>
              <div>
                <label className="block text-gray-600">Billing Address</label>
                <input
                  type="text"
                  placeholder="Address "
                  className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm"
                  id="billingAddress.address1"
                  value={vendorFormData.billingAddress.address1}
                  onChange={handleInputChange2}
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  className="mt-2 w-full p-3 rounded-md border border-gray-300 shadow-sm"
                  id="billingAddress.city"
                  value={vendorFormData.billingAddress.city}
                  onChange={handleInputChange2}
                  required
                />
                <select
                  id="billingAddress.state" // Maintain consistent structure for id
                  value={vendorFormData.billingAddress.state} // Bind to the current state value
                  onChange={(e) => {
                    // Find the selected state object based on the selected value
                    const selectedState = PickState.find((state) => state.name === e.target.value);

                    // Update the nested billingAddress structure correctly
                    setvendorFormData((prevData) => ({
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
                    value={vendorFormData.billingAddress.pincode}
                    onChange={handleInputChange2}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Postal"
                    className="w-full p-3 rounded-md border text-gray-400 border-gray-300 shadow-sm"
                    id="billingAddress.country"
                    value={vendorFormData.billingAddress.country}
                    onChange={handleInputChange2}
                    disabled={true}
                  />
                </div>
              </div>
            </section>

            {/* Shipping Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Shipping</h2>
                <label className="flex items-center text-sm text-gray-600">
                  <input type="checkbox" className="mr-2" onChange={(e) => checkboxChange(e)} checked={copyShipping} />
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
                  value={vendorFormData.shippingAddress.address1}
                  onChange={handleInputChange2}
                  required
                  disabled={copyShipping}
                />
                <input
                  type="text"
                  placeholder="City"
                  className="mt-2 w-full p-3 rounded-md border border-gray-300 shadow-sm"
                  id="billingAddress.city"
                  value={vendorFormData.shippingAddress.city}
                  onChange={handleInputChange2}
                  required
                  disabled={copyShipping}
                />
                {/* <select
                  id="shippingAddress.state" // Maintain consistent structure for id
                  value={vendorFormData.shippingAddress.state} // Bind to the current state value
                  disabled={copyShipping}
                  onChange={(e) => {
                    // Find the selected state object based on the selected value
                    const selectedState = PickState.find(
                      (state) => state.name === e.target.value
                    );

                    // Update the nested billingAddress structure correctly
                    setvendorFormData((prevData) => ({
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
                </select> */}
                <select
                  id="shippingAddress.state"
                  value={vendorFormData.shippingAddress.state}
                  disabled={copyShipping}
                  onChange={(e) => {
                    const selectedState = PickState.find((state) => state.name === e.target.value);

                    setvendorFormData((prevData) => ({
                      ...prevData,
                      shippingAddress: {
                        ...prevData.shippingAddress,
                        state: selectedState ? selectedState.name : "",
                      },
                    }));
                  }}
                  className="mt-2 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-40 transition-all duration-300 ease-in-out hover:shadow-md"
                >
                  {PickState.map((state, index) => (
                    <option
                      key={index} // Use the index or another unique identifier
                      className={state.name === "Select state" ? "text-gray-500" : "text-red-500"}
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
                    value={vendorFormData.shippingAddress.pincode}
                    onChange={handleInputChange2}
                    disabled={copyShipping}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Postal"
                    className="w-full p-3 rounded-md border text-gray-400 border-gray-300 shadow-sm"
                    id="shippingAddress.country"
                    value={vendorFormData.shippingAddress.country}
                    onChange={handleInputChange2}
                    disabled={true}
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
          <button type="submit" className="px-4 py- bg-blue-600 text-white rounded hover:bg-blue-700">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewVendorForm;
