import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { validateGSTNumber } from "../apiServices";
import PickState from "../components/PickState";

const CustomerForm = ({
  onClose,
  fetchCust,
  //   onSubmit,
  //   formData,
  //   inputChange,
  //   inputChange2,
  //   copyShipping,
  //   checkboxChange,
}) => {
  const [copyShipping, setCopyShipping] = useState(false);
  const [isGstValid, setIsGstValid] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [tradeName, settradeName] = useState("");
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

  //   const handleclose = (value) => {
  //     onClose(value); // Update the activeTab in the Dashboard
  //   };

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
        onClose();
        fetchCust();
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

  const inputChange = (e) => {
    const { id, value } = e.target;
    setcustomerFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const inputChange2 = (e) => {
    const { id, value } = e.target;
    const [section, field] = id.split(".");

    setcustomerFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));

    // If "Copy to Shipping Address" is enabled, update shippingAddress too
    if (copyShipping && section === "billingAddress") {
      setcustomerFormData((prevData) => ({
        ...prevData,
        shippingAddress: {
          ...prevData.shippingAddress,
          [field]: value,
        },
      }));
    }
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
  }
};


  //   useEffect(() => {
  //     const validateGst = async () => {
  //       if (customerFormData.gstNumber) {
  //         const isValid = await validateGSTNumber(customerFormData.gstNumber);
  //         setIsGstValid(isValid);
  //       }
  //     };

  //     validateGst();
  //   }, [customerFormData.gstNumber]);

  return (
    <form
      onSubmit={customerHandleFormSubmit}
      className="space-y-4 bg-white px-5 pb-3 rounded-lg shadow-lg max-w-4xl mx-auto transform transition-all duration-500 ease-out opacity-0 translate-y-4"
      style={{ animation: "fadeSlideUp 0.6s forwards" }}
    >
      <style>
        {`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      <div className="flex justify-between items-center px-0 p-2">
        <h3 className="text-lg font-bold underline">Add New Customer</h3>
        <div className="flex justify-between items-center px-4 py-2 ">
  {/* Reset Form Button */}
  <p
    onClick={() => {
      clearcustomerFormData(); // Add your reset logic here
    }}
    className="text-red-700 mr-5 px-3 py-1 cursor-pointer border border-red-700 rounded-3xl hover:bg-red-700 hover:text-white transition-all duration-300 ease-out"

  >
    Reset Form
  </p>

  {/* Close Button */}
  <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
</div>

      </div>
      {/* Personal Info */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-101"
          >
            First Name
          </label>
          <input
            id="firstName"
            value={customerFormData.firstName}
            onChange={inputChange}
            className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
            placeholder="Enter first name"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-101"
          >
            Last Name
          </label>
          <input
            id="lastName"
            value={customerFormData.lastName}
            onChange={inputChange}
            className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
            placeholder="Enter last name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-101"
          >
            Company Name
          </label>
          <input
            id="companyName"
            value={customerFormData.companyName}
            onChange={inputChange}
            className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-101"
          >
            Email
          </label>
          <input
            id="email"
            value={customerFormData.email}
            onChange={inputChange}
            className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
            placeholder="Enter email"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-101"
          >
            Phone
          </label>
          <input
            id="phone"
            value={customerFormData.phone}
            onChange={inputChange}
            className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label
            htmlFor="gstNumber"
            className="block text-sm font-medium text-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-101"
          >
            GST Number
          </label>
          <input
            id="gstNumber"
            value={customerFormData.gstNumber}
            onChange={inputChange}
            className={`mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101 ${
              isGstValid === null
                ? ""
                : isGstValid
                ? "focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40"
                : "border-red-500 focus:border-red-500 focus:ring focus:ring-red-100 focus:ring-opacity-40"
            }`}
            placeholder="Enter GST number"
          />
          <p
            onClick={() =>
            {if (isGstValid !== true) {
              handleValidationClick();
            }}
            }
            className="absolute right-3 transform text-blue-500 px-3 py-1 focus:outline-none cursor-pointer"
            disabled={isChecking} // Disable button while checking
          >
            {isChecking ? "Checking..." : isGstValid !== true ?"Verify" : <span className="text-gray-300">Verified</span> }
          </p>
          {isGstValid !== null ? (isGstValid === false ? (
            <p className="text-red-600 text-sm mt-1">Invalid GST Number</p>
          ): (
            <p className="text-green-600 text-sm mt-1">Valid GST Number (Trade Name: {tradeName})</p>
          )) : <p></p> }
        </div>
      </div>

      <div>


        <br />
        
        <hr />
        <br />
        <div className="mb-5 flex justify-between"><h3 className="text-lg font-bold ">Address Details</h3> 
        <label className="inline-flex items-center">
    <input
      type="checkbox"
      className="form-checkbox"
      checked={copyShipping}
      onChange={checkboxChange}
    />
    <span className="ml-2">Same as Billing Address</span>
  </label>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Billing Address
            </label>
            <input
              id="billingAddress.country"
              value={customerFormData.billingAddress.country}
              onChange={inputChange2}
              disabled
              placeholder="Country"
              className="mt-1 w-full p-3 rounded-md border  text-gray-400 border-gray-300"
            />
            <input
              id="billingAddress.address1"
              value={customerFormData.billingAddress.address1}
              onChange={inputChange2}
              placeholder="Address"
              className="mt-1 w-full p-3 rounded-md border border-gray-300"
            />
            <input
              id="billingAddress.city"
              value={customerFormData.billingAddress.city}
              onChange={inputChange2}
              placeholder="City"
              className="mt-1 w-full p-3 rounded-md border border-gray-300"
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
              className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-40 transition-all duration-300 ease-in-out hover:shadow-md"
            >
              {PickState.map((state) => (
                <option key={state.code} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>

            {/* <input
            id="billingAddress.state"
            value={customerFormData.billingAddress.state}
            onChange={inputChange2}
            placeholder="State"
            className="mt-1 w-full p-3 rounded-md border border-gray-300"
          /> */}
            <input
              id="billingAddress.pincode"
              value={customerFormData.billingAddress.pincode}
              onChange={inputChange2}
              placeholder="Pincode"
              className="mt-1 w-full p-3 rounded-md border border-gray-300"
            />
          
          </div>
          

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Shipping Address
            </label>
            <input
              id="shippingAddress.country"
              value={customerFormData.shippingAddress.country}
              onChange={inputChange2}
              placeholder="Country"
              className="mt-1 w-full p-3 text-gray-400 rounded-md border border-gray-300"
              disabled
            />
            <input
              id="shippingAddress.address1"
              value={customerFormData.shippingAddress.address1}
              onChange={inputChange2}
              placeholder="Address"
              className="mt-1 w-full p-3 rounded-md border border-gray-300"
              disabled={copyShipping}
            />
            <input
              id="shippingAddress.city"
              value={customerFormData.shippingAddress.city}
              onChange={inputChange2}
              placeholder="City"
              className="mt-1 w-full p-3 rounded-md border border-gray-300"
              disabled={copyShipping}
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
              className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-40 transition-all duration-300 ease-in-out hover:shadow-md"
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
            <input
              id="shippingAddress.pincode"
              value={customerFormData.shippingAddress.pincode}
              onChange={inputChange2}
              placeholder="Pincode"
              className="mt-1 w-full p-3 rounded-md border border-gray-300"
              disabled={copyShipping}
            />
          </div>
        </div>
      
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-3xl hover:bg-blue-600 hover:rounded-md transition-all duration-300 ease-in-out "
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
