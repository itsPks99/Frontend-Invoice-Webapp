import React, { useState, useEffect } from "react";
import { Edit, Trash, PlusCircle } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ProductsAndServices = ({ setActiveTab }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Static data for demonstration
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:3000/api/products/fetchProducts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data.products:", data.products);
        setAllProducts(data.products);
      } else {
        console.error("Failed to fetch products:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    const userConfirmed = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this product? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!userConfirmed.isConfirmed) {
      return; // Exit if user cancels
    }

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "Token is missing. Please log in again.",
        });
        return;
      }

      const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Product has been deleted successfully.",
          confirmButtonColor: "#3085d6",
        });

        fetchProducts(); // Refresh product list
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Failed to delete the product. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab); // Update the activeTab in the Dashboard
    navigate(`/dashboard/${newTab}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className=" mx-auto  bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">Products & Services</h1>
        <button
          onClick={() => handleTabChange("add-product")}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <PlusCircle className="w-5 h-5 mr-2" /> Add a product or service
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden border rounded-lg shadow-sm">
        <table className="w-full text-sm text-left text-gray-800">
          <thead className="bg-gray-100 text-gray-600 font-medium text-center">
            <tr>
              <th className="px-4 py-2 text-left">Product / Sevice Name</th>
              <th className="px-4 py-2 ">Sell Price</th>
              <th className="px-4 py-2 ">Purchase Price</th>
              <th className="px-4 py-2 ">HSN Code</th>
              <th className="px-4 py-2 ">CGST</th>
              <th className="px-4 py-2 ">SGST</th>
              <th className="px-4 py-2 ">IGST</th>
              <th className="px-4 py-2 ">Actions</th>
            </tr>
          </thead>
          {/* [...filteredCustomers].reverse() */}
          <tbody>
            {allProducts.length > 0 ? (
              [...allProducts].reverse().map((product, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } border-b hover:bg-blue-50 transition text-center text-[15px]`}
                >
                  <td className="px-4 py-5 text-left font-semibold">{product.productName}</td>
                  <td className="px-4 py-5">₹{product?.price?.sale?.sellingPrice || 0}</td>
                  <td className="px-4 py-5">₹{product?.price?.purchase?.costPrice || 0}</td>
                  <td className="px-4 py-5">{product.hsnAndSacCode}</td>
                  <td className="px-4 py-5">{Number(product.defaultTaxRates.intraStateRate)/2}%</td>
                  <td className="px-4 py-5">{Number(product.defaultTaxRates.intraStateRate)/2}%</td>
                  <td className="px-4 py-5">{Number(product.defaultTaxRates.interStateRate)}%</td>
                  <td className="px-4 py-5 text-center">
                    <div className="inline-flex space-x-2">
                      {/* <button className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
      <Edit className="h-4 w-4" />
    </button> */}
                      <button
                        className="bg-red-500 text-white p-1 rounded hover:bg-red-400"
                        onClick={() => handleDelete(product._id)}
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsAndServices;
