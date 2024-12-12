import React, { useState } from "react";
import Swal from "sweetalert2";


const ProductForm = ({
  onClose,
  fetchPro
//   onSubmit,
//   formData,
//   inputChange,
}) => {

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
      const inputChange = (e) => {
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
            onClose(false);
            clearProductFormData();
            fetchPro();
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
        <form
    onSubmit={producutHandleFormSubmit}
    className="w-full max-w-xl space-y-4 bg-white px-5 pb-3 rounded-lg shadow-lg mx-auto transform transition-all duration-500 ease-out opacity-0 translate-y-4"
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
    <div className="flex justify-between items-center px-0 py-2">
      <h3 className="text-lg font-bold">Add New Product</h3>
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

    {/* Form fields */}
    {[
      {
        id: "productName",
        label: "Product Name",
        placeholder: "Enter product name",
      },
      {
        id: "price",
        label: "Price",
        placeholder: "Enter price",
        type: "number",
      },
      {
        id: "description",
        label: "Description",
        placeholder: "Enter description",
      },
      { id: "hsnCode", label: "HSN Code", placeholder: "Enter HSN code" },
      { id: "cgst", label: "CGST", placeholder: "Enter CGST", type: "number" },
      { id: "sgst", label: "SGST", placeholder: "Enter SGST", type: "number" },
      { id: "igst", label: "IGST", placeholder: "Enter IGST", type: "number" },
    ].map(({ id, label, placeholder, type = "text" }) => (
      <div key={id} className="relative">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-101"
        >
          {label}
        </label>
        <input
          id={id}
          name={id}
          type={type}
          value={productFormData[id]}
          onChange={inputChange}
          className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
          placeholder={placeholder}
        />
      </div>
    ))}

    {/* Submit button */}
    <button
      type="submit"
      className="w-full px-4 py-2 mt-4 font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-indigo-500 hover:to-blue-500 transition-transform duration-300 transform hover:scale-101 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Add Product
    </button>
  </form>
    )

};





export default ProductForm;
