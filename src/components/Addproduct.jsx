import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddProductServiceForm = () => {

    const navigate = useNavigate();

  
  const [productFormData, setProductFormData] = useState({
    productName: "",
    price: "",
    description: "",
    hsnCode: "",
    cgst: "",
    sgst: "",
    igst: "",
  });

  const clearProductFormData = () => {
    setProductFormData({
      productName: "",
      price: "",
      description: "",
      hsnCode: "",
      cgst: "",
      sgst: "",
      igst: "",
    });
  };

 

  // Handle form input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProductFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const producutHandleFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data structure for the API call
    const requestData = {
      productName: productFormData.productName,
      price: Number(productFormData.price),
      description: productFormData.description,
      hsnCode: productFormData.hsnCode,
      tax: {
        cgst: `${Number(productFormData.cgst)}`,
        sgst: `${Number(productFormData.sgst)}`,
        igst: `${Number(productFormData.igst)}`,
      },
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "http://localhost:3000/api/products/addProduct",
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
      if (response.ok) {
        // console.log("Product added successfully:", result);
        Swal.fire({
          icon: "success",
          title: "Product added successfully!",
          text: "Your product has been added.",
          confirmButtonText: "OK",
          confirmButtonColor: "#2563EB",
          // timer: 3000, // Auto close after 3 seconds
        });
        // alert("Product added successfully!");
        // setShowAlert(true);
        // onClose(false);
        clearProductFormData();
        // fetchPro();
        navigate(-1)
        window.scrollTo(0, 0);

      } else {
        Swal.fire({
          icon: "error",
          title: "Error occured",
          text: "Error adding product: " + result.message,
          confirmButtonText: "OK",
          confirmButtonColor: "#2563EB",
          // timer: 3000, // Auto close after 3 seconds
        });
        // alert("Error adding product: " + result.message);
      
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to add product: " + result.message,
        confirmButtonText: "OK",
        confirmButtonColor: "#2563EB",
        // timer: 3000, // Auto close after 3 seconds
      });
      // alert("Failed to add product.");
    
    }
  };

  return (
    <div className=" p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Add a Product or Service
      </h1>
      <p className="text-gray-600 mb-6">
        Products and services  that you sell to customers
        are used as items on Invoices to record those sales.
      </p>

      {/* Form */}
      <form onSubmit={producutHandleFormSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="productName" className="block text-gray-700 font-medium mb-1">
            Product / Service Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="productName"
            placeholder= "Enter product / service name"
            value={productFormData.productName}
            onChange={handleChange}
            className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={productFormData.description}
            onChange={handleChange}
            placeholder= "Enter description"
            rows="5"
            type="text"
            className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
            ></textarea>
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-gray-700 font-medium mb-1">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="price"
            value={productFormData.price}
            placeholder= "Enter price"
            onChange={handleChange}
            className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
            step="0.01"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* HSN / SAC Code */}
  <div>
    <label htmlFor="hsnCode" className="block text-gray-700 font-medium mb-1">
      HSN / SAC code 
    </label>
    <input
      type="text"
      id="hsnCode"
      placeholder="Enter HSN / SAC code"
      value={productFormData.hsnCode}
      onChange={handleChange}
      className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
      
    />
  </div>

  {/* CGST */}
  <div>
    <label htmlFor="cgst" className="block text-gray-700 font-medium mb-1">
      CGST <span className="text-red-500">*</span>
    </label>
    <input
      type="number"
      id="cgst"
      placeholder="Enter CGST"
      value={productFormData.cgst}
      onChange={handleChange}
      className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
      step="0.01"
      required
    />
  </div>

  {/* SGST */}
  <div>
    <label htmlFor="sgst" className="block text-gray-700 font-medium mb-1">
      SGST <span className="text-red-500">*</span>
    </label>
    <input
      type="number"
      id="sgst"
      placeholder="Enter SGST"
      value={productFormData.sgst}
      onChange={handleChange}
      className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
      step="0.01"
      required
    />
  </div>

  {/* IGST */}
  <div>
    <label htmlFor="igst" className="block text-gray-700 font-medium mb-1">
      IGST <span className="text-red-500">*</span>
    </label>
    <input
      type="number"
      id="igst"
      placeholder="Enter IGST"
      value={productFormData.igst}
      onChange={handleChange}
      className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
      step="0.01"
      required
    />
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

export default AddProductServiceForm;
