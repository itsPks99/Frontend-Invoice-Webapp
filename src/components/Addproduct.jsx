import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddGoodServiceForm = () => {
  const navigate = useNavigate();
  const [allVendors, setAllVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formType, setFormType] = useState("goods");
  const unitOptions = [
    { value: "box", label: "Box (Box)" },
    { value: "cm", label: "Centimeter (cm)" },
    { value: "dz", label: "Dozen (dz)" },
    { value: "ft", label: "Feet (ft)" },
    { value: "g", label: "Gram (g)" },
    { value: "in", label: "Inch (in)" },
    { value: "kg", label: "Kilogram (kg)" },
    { value: "km", label: "Kilometer (km)" },
    { value: "lb", label: "Pound (lb)" },
    { value: "mg", label: "Milligram (mg)" },
    { value: "ml", label: "Milliliter (ml)" },
    { value: "m", label: "Meter (m)" },
    { value: "pcs", label: "Pieces (pcs)" },
  ];
  const [productFormData, setProductFormData] = useState({
    productName: "",
    typeOfProduct: "" || 'goods',
    unit: "",
    description: "",
    price: {
      sale: {
        sellingPrice: "",
        isEnabled: true ,
      },
      purchase: {
        costPrice: "",
        isEnabled: false,
        vendorDetails: {
          vendorId: "",
          vendorName: "",
          vendorCompanyName: "",
        },
      },
    },
    hsnAndSacCode: "",
    defaultTaxRates: {
      interStateRate: "",
      intraStateRate: "",
    },
  });

  const clearProductFormData = () => {
    setProductFormData({
      productName: "",
      typeOfProduct: "",
      unit: "",
      description: "",
      price: {
        sale: {
          sellingPrice: "",
          isEnabled: true,
        },
        purchase: {
          costPrice: "",
          isEnabled: false,
          vendorDetails: {
            vendorId: "",
            vendorName: "",
            vendorCompanyName: "",
          },
        },
      },
      hsnAndSacCode: "",
      defaultTaxRates: {
        interStateRate: "",
        intraStateRate: "",
      },
    });
  };

  // Handle form input change
  // const handleChange = (e) => {
  //   const { id, value } = e.target;
  //   setProductFormData((prevData) => ({ ...prevData, [id]: value }));
  //   console.log('goodFormData', productFormData);
  // };

  const handleVendorChange = (e) => {
    const selectedVendorId = e.target.value;

    // Ensure ID matches data type (convert to number if needed)
    const selectedVendor = allVendors.find((vendor) => vendor._id.toString() === selectedVendorId);

    if (selectedVendor) {
      setProductFormData((prevData) => ({
        ...prevData,
        price: {
          ...prevData?.price,
          purchase: {
            ...prevData?.price?.purchase,
            vendorDetails: {
              vendorId: selectedVendor._id,
              vendorName: `${selectedVendor.firstName} ${selectedVendor.lastName}`,
              vendorCompanyName: selectedVendor.companyName,
            },
          },
        },
      }));

      console.log("Updated Product Form Data:", productFormData);
      console.log("formType:", formType);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
  
    setProductFormData((prevData) => {
      let newValue = value;
  
      // Convert numerical values safely
      if (["sellingPrice", "costPrice", "interStateRate", "intraStateRate"].includes(id)) {
        newValue = value ? parseFloat(value) : "";
      }
  
      switch (id) {
        case "productName":
        case "typeOfProduct":
        case "unit":
        case "description":
        case "hsnAndSacCode":
          return { ...prevData, [id]: newValue };
  
        case "sellingPrice":
          return {
            ...prevData,
            price: {
              ...prevData.price,
              sale: {
                ...prevData.price.sale,
                sellingPrice: newValue, // ✅ Ensures selling price is a number
              },
            },
          };
  
        case "costPrice":
          return {
            ...prevData,
            price: {
              ...prevData.price,
              purchase: {
                ...prevData.price.purchase,
                costPrice: newValue, // ✅ Ensures cost price is a number
              },
            },
          };
  
        case "interStateRate":
        case "intraStateRate":
          return {
            ...prevData,
            defaultTaxRates: {
              ...prevData.defaultTaxRates,
              [id]: newValue, // ✅ Ensures tax rates are numbers
            },
          };
  
        default:
          return prevData;
      }
    });
  };
  
  
  useEffect(() => {
    console.log("Updated Product Form Data:", productFormData);
  }, [productFormData]);

  const fetchVendors = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:3000/api/vendor/fetchAllVendor", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data", data.vendor);
        setAllVendors(data.vendor);

        setIsLoading(false);
      } else {
        console.error("Failed to fetch vendors:", response.statusText);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching vendors:", error);
      setIsLoading(false);
    }
  };

  const producutHandleFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data structure for the API call
    // const requestData = {
    //   goodName: productFormData.goodName,
    //   price: Number(productFormData.price),
    //   description: productFormData.description,
    //   hsnCode: productFormData.hsnCode,
    //   tax: {
    //     cgst: `${Number(productFormData.cgst)}`,
    //     sgst: `${Number(productFormData.sgst)}`,
    //     igst: `${Number(productFormData.igst)}`,
    //   },
    // };
    const requestData = {
      productName: productFormData.productName || "",
      typeOfProduct: productFormData.typeOfProduct || "",
      unit: productFormData.unit || "",
      description: productFormData.description || "",
      price: {
        sale: {
          sellingPrice: productFormData.price.sale.sellingPrice || 0,
          isEnabled: productFormData.price.sale.isEnabled || true,
        },
        purchase: {
          costPrice: productFormData.price.purchase.costPrice || 0,
          isEnabled: productFormData.price.purchase.isEnabled || false,
          vendorDetails: {
            vendorId: productFormData.price.purchase.vendorDetails.vendorId || "",
            vendorName: productFormData.price.purchase.vendorDetails.vendorName || "",
            vendorCompanyName: productFormData.price.purchase.vendorDetails.vendorCompanyName || "",
          },
        },
      },
      hsnAndSacCode: productFormData.hsnAndSacCode || "",
      defaultTaxRates: {
        interStateRate: productFormData.defaultTaxRates.interStateRate || "",
        intraStateRate: productFormData.defaultTaxRates.intraStateRate || "",
      },
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:3000/api/products/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      if (response.ok) {
        // console.log("Good added successfully:", result);
        Swal.fire({
          icon: "success",
          title: "Good added successfully!",
          text: "Your good has been added.",
          confirmButtonText: "OK",
          confirmButtonColor: "#2563EB",
          // timer: 3000, // Auto close after 3 seconds
        });
        // alert("Good added successfully!");
        // setShowAlert(true);
        // onClose(false);
        clearProductFormData();
        // fetchPro();
        navigate(-1);
        window.scrollTo(0, 0);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error occured",
          text: "Error adding good: " + result.message,
          confirmButtonText: "OK",
          confirmButtonColor: "#2563EB",
          // timer: 3000, // Auto close after 3 seconds
        });
        // alert("Error adding good: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to add good: " + result.message,
        confirmButtonText: "OK",
        confirmButtonColor: "#2563EB",
        // timer: 3000, // Auto close after 3 seconds
      });
      // alert("Failed to add good.");
    }
  };

  const handleFormTypeChange = (value) => {
    console.log("object", value);
    setFormType(value);
    setProductFormData((prevData) => ({
      ...prevData,
      typeOfProduct: value,
    }));
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div className=" p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Add an item</h1>
      <p className="text-gray-600 mb-6">
        Goods and services that you sell to customers are used as items on Invoices to record those sales.
      </p>

      <div className="flex space-x-6 mb-6">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="formType"
            value="goods"
            checked={formType === "goods"}
            onChange={() => handleFormTypeChange("goods")}
            className="mr-2"
          />
          Goods
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="formType"
            value="services"
            checked={formType === "service"}
            onChange={() => handleFormTypeChange("service")}
            className="mr-2"
          />
          Services
        </label>
      </div>

      {/* Form */}
      <form onSubmit={producutHandleFormSubmit} className="space-y-5">
        {formType === "goods" ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="productName" className="block text-gray-700 font-medium mb-1">
                  Good Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="productName"
                  placeholder="Enter good name"
                  value={productFormData.productName}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
                  required
                />
              </div>
              {/* HSN Code */}
              <div>
                <label htmlFor="hsnAndSacCode" className="block text-gray-700 font-medium mb-1">
                  HSN code
                </label>
                <input
                  type="text"
                  id="hsnAndSacCode"
                  placeholder="Enter HSN code"
                  value={productFormData.hsnAndSacCode}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
                />
              </div>
            </div>

            <label htmlFor="unit" className="block text-gray-700 font-medium mb-1 mt-5">
              Select Unit <span className="text-red-500">*</span>
            </label>
            <select
              id="unit"
              value={productFormData.unit}
              onChange={handleChange}
              required
              className="mt-1 w-full p-3.5 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
            >
              <option value="">Select Unit</option>
              {unitOptions.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-gray-700 font-medium mb-1 mt-5">
                Description
              </label>
              <textarea
                id="description"
                value={productFormData.description}
                onChange={handleChange}
                placeholder="Enter description"
                rows="5"
                type="text"
                className="mt-1 w-full p-3 mb-10 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
              ></textarea>
            </div>

            <hr />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sell Information */}
              <div>
                {/* Checkbox for Sell Price */}
                <div className="flex items-center space-x-2 mb-2 mt-10">
                  <input
                    type="checkbox"
                    id="enableSell"
                    checked={productFormData.price.sale.isEnabled}
                    onChange={(e) =>
                      setProductFormData((prevData) => ({
                        ...prevData,
                        price: {
                          ...prevData.price,
                          sale: {
                            ...prevData.price.sale,
                            isEnabled: e.target.checked,
                          },
                        },
                      }))
                    }
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="enableSell" className="text-gray-700 font-medium">
                    Sales Information
                  </label>
                </div>

                <label htmlFor="sellingPrice" className="block text-gray-700 font-medium mb-1 mt-2">
                  Selling Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="sellingPrice"
                  value={productFormData.price.sale.sellingPrice}
                  placeholder="Enter sale price"
                  onChange={handleChange}
                  disabled={!productFormData.price.sale.isEnabled} // Disable input when checkbox is unchecked
                  className={`mt-1 w-full p-3 mb-6 rounded-md border ${
                    productFormData.price.sale.isEnabled
                      ? "border-gray-300"
                      : "border-gray-300 bg-gray-100 cursor-not-allowed"
                  } shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101`}
                  step="0.01"
                  required
                />
              </div>

              {/* Purchase Information */}
              <div>
                {/* Checkbox for Purchase Price */}
                <div className="flex items-center space-x-2 mb-2 mt-10">
                  <input
                    type="checkbox"
                    id="enablePurchase"
                    checked={productFormData.price.purchase.isEnabled}
                    onChange={(e) =>
                      setProductFormData((prevData) => ({
                        ...prevData,
                        price: {
                          ...prevData.price,
                          purchase: {
                            ...prevData.price.purchase,
                            isEnabled: e.target.checked,
                          },
                        },
                      }))
                    }
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="enablePurchase" className="text-gray-700 font-medium">
                    Purchase Information
                  </label>
                </div>

                <label htmlFor="costPrice" className="block text-gray-700 font-medium mb-1 mt-2">
                  Cost Price <span className="text-gray-400 text-sm">(optional)</span>
                </label>
                <input
                  type="number"
                  id="costPrice"
                  value={productFormData.price.purchase.costPrice}
                  placeholder="Enter purchase price"
                  onChange={handleChange}
                  disabled={!productFormData.price.purchase.isEnabled} // Disable input when checkbox is unchecked
                  className={`mt-1 w-full p-3 mb-5 rounded-md border ${
                    productFormData.price.purchase.isEnabled
                      ? "border-gray-300"
                      : "border-gray-300 bg-gray-100 cursor-not-allowed"
                  } shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101`}
                  step="0.01"
                />

                {/* Vendor Information */}
                <div>
                  <label htmlFor="vendorName" className="block text-gray-700 font-medium mb-1">
                    Vendor Preference <span className="text-gray-400 text-sm">(optional)</span>
                  </label>
                  <select
                    id="vendorId"
                    value={productFormData.price.purchase.vendorDetails.vendorId}
                    onChange={handleVendorChange}
                    disabled={!productFormData.price.purchase.isEnabled} // Disable input when checkbox is unchecked
                    className={`mt-1 w-full p-3.5 mb-10 rounded-md border ${
                      productFormData.price.purchase.isEnabled
                        ? "border-gray-300"
                        : "border-gray-300 bg-gray-100 cursor-not-allowed"
                    } shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101`}
                  >
                    <option value="">Select vendor</option>
                    {isLoading ? (
                      <option disabled>Loading vendors...</option>
                    ) : (
                      allVendors.map((vendor, index) => (
                        <option key={index} value={vendor._id}>
                          {vendor.firstName} {vendor.lastName} ({vendor.companyName})
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>
            </div>
            <hr />
            <label htmlFor="price" className="block text-gray-700 font-bold text-xl mb-1 mt-10">
              Default Tax Rates
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                {/* Tax Information */}
                <label htmlFor="intraStateRate" className="block text-gray-700 font-medium mb-1">
                  Intra State Tax Rate <span className="text-red-500">*</span>
                </label>
                <select
                  id="intraStateRate"
                  value={productFormData.defaultTaxRates.intraStateRate}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full p-3.5 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
                >
                  <option value="">Select Tax</option>
                  <option value="0">GST0 0%</option>
                  <option value="5">GST5 5%</option>
                  <option value="12">GST12 12%</option>
                  <option value="18">GST18 18%</option>
                  <option value="30">GST30 30%</option>
                </select>
              </div>
              <div>
                {/* Tax Information */}
                <label htmlFor="interStateRate" className="block text-gray-700 font-medium mb-1">
                  Inter State Tax Rate <span className="text-red-500">*</span>
                </label>
                <select
                  id="interStateRate"
                  value={productFormData.defaultTaxRates.interStateRate}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full p-3.5 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
                >
                  <option value="">Select Tax</option>
                  <option value="0">IGST0 0%</option>
                  <option value="5">IGST5 5%</option>
                  <option value="12">IGST12 12%</option>
                  <option value="18">IGST18 18%</option>
                  <option value="30">IGST30 30%</option>
                </select>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="productName" className="block text-gray-700 font-medium mb-1">
                  Service Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="productName"
                  placeholder="Enter service name"
                  value={productFormData.productName}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
                  required
                />
              </div>
              {/* SAC Code */}
              <div>
                <label htmlFor="hsnAndSacCode" className="block text-gray-700 font-medium mb-1">
                  SAC code
                </label>
                <input
                  type="text"
                  id="hsnAndSacCode"
                  placeholder="Enter SAC code"
                  value={productFormData.hsnAndSacCode}
                  onChange={handleChange}
                  className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-gray-700 font-medium mb-1 mt-5">
                Description
              </label>
              <textarea
                id="description"
                value={productFormData.description}
                onChange={handleChange}
                placeholder="Enter description"
                rows="5"
                type="text"
                className="mt-1 w-full p-3 mb-10 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
              ></textarea>
            </div>

            <hr />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sell Information */}
              <div>
                {/* Checkbox for Sell Price */}
                <div className="flex items-center space-x-2 mb-2 mt-10">
                  <input
                    type="checkbox"
                    id="enableSell"
                    checked={productFormData.price.sale.isEnabled}
                    onChange={(e) =>
                      setProductFormData((prevData) => ({
                        ...prevData,
                        price: {
                          ...prevData.price,
                          sale: {
                            ...prevData.price.sale,
                            isEnabled: e.target.checked,
                          },
                        },
                      }))
                    }
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="enableSell" className="text-gray-700 font-medium">
                    Sales Information
                  </label>
                </div>

                <label htmlFor="sellingPrice" className="block text-gray-700 font-medium mb-1 mt-2">
                  Selling Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="sellingPrice"
                  value={productFormData.price.sale.sellingPrice}
                  placeholder="Enter sale price"
                  onChange={handleChange}
                  disabled={!productFormData.price.sale.isEnabled} // Disable input when checkbox is unchecked
                  className={`mt-1 w-full p-3 mb-6 rounded-md border ${
                    productFormData.price.sale.isEnabled
                      ? "border-gray-300"
                      : "border-gray-300 bg-gray-100 cursor-not-allowed"
                  } shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101`}
                  step="0.01"
                  required
                />
              </div>

              {/* Purchase Information */}
              <div>
                {/* Checkbox for Purchase Price */}
                <div className="flex items-center space-x-2 mb-2 mt-10">
                  <input
                    type="checkbox"
                    id="enablePurchase"
                    checked={productFormData.price.purchase.isEnabled}
                    onChange={(e) =>
                      setProductFormData((prevData) => ({
                        ...prevData,
                        price: {
                          ...prevData.price,
                          purchase: {
                            ...prevData.price.purchase,
                            isEnabled: e.target.checked,
                          },
                        },
                      }))
                    }
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="enablePurchase" className="text-gray-700 font-medium">
                    Purchase Information
                  </label>
                </div>

                <label htmlFor="costPrice" className="block text-gray-700 font-medium mb-1 mt-2">
                  Cost Price <span className="text-gray-400 text-sm">(optional)</span>
                </label>
                <input
                  type="number"
                  id="costPrice"
                  value={productFormData.price.purchase.costPrice}
                  placeholder="Enter purchase price"
                  onChange={handleChange}
                  disabled={!productFormData.price.purchase.isEnabled} // Disable input when checkbox is unchecked
                  className={`mt-1 w-full p-3 mb-5 rounded-md border ${
                    productFormData.price.purchase.isEnabled
                      ? "border-gray-300"
                      : "border-gray-300 bg-gray-100 cursor-not-allowed"
                  } shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101`}
                  step="0.01"
                />

                {/* Vendor Information */}
                <div>
                  <label htmlFor="vendorName" className="block text-gray-700 font-medium mb-1">
                    Vendor Preference <span className="text-gray-400 text-sm">(optional)</span>
                  </label>
                  <select
                    id="vendorId"
                    value={productFormData.price.purchase.vendorDetails.vendorId}
                    onChange={handleVendorChange}
                    disabled={!productFormData.price.purchase.isEnabled} // Disable input when checkbox is unchecked
                    className={`mt-1 w-full p-3.5 mb-10 rounded-md border ${
                      productFormData.price.purchase.isEnabled
                        ? "border-gray-300"
                        : "border-gray-300 bg-gray-100 cursor-not-allowed"
                    } shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101`}
                  >
                    <option value="">Select vendor</option>
                    {isLoading ? (
                      <option disabled>Loading vendors...</option>
                    ) : (
                      allVendors.map((vendor, index) => (
                        <option key={index} value={vendor._id}>
                          {vendor.firstName} {vendor.lastName} ({vendor.companyName})
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>
            </div>
            <hr />

            <label htmlFor="price" className="block text-gray-700 font-bold text-xl mb-1 mt-10">
              Default Tax Rates
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                {/* Tax Information */}
                <label htmlFor="price" className="block text-gray-700 font-medium mb-1">
                  Intra State Tax Rate <span className="text-red-500">*</span>
                </label>
                <select
                  id="intraStateRate"
                  value={productFormData.defaultTaxRates.intraStateRate}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full p-3.5 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
                >
                  <option value="">Select Tax</option>
                  <option value="0">GST0 0%</option>
                  <option value="5">GST5 5%</option>
                  <option value="12">GST12 12%</option>
                  <option value="18">GST18 18%</option>
                  <option value="30">GST30 30%</option>
                </select>
              </div>
              <div>
                {/* Tax Information */}
                <label htmlFor="price" className="block text-gray-700 font-medium mb-1">
                  Inter State Tax Rate <span className="text-red-500">*</span>
                </label>
                <select
                  id="interStateRate"
                  value={productFormData.defaultTaxRates.interStateRate}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full p-3.5 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
                >
                  <option value="">Select Tax</option>
                  <option value="0">IGST0 0%</option>
                  <option value="5">IGST5 5%</option>
                  <option value="12">IGST12 12%</option>
                  <option value="18">IGST18 18%</option>
                  <option value="30">IGST30 30%</option>
                </select>
              </div>
            </div>
          </div>
        )}

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

export default AddGoodServiceForm;
