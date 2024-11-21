import React, { useEffect, useState } from "react";
import { Trash } from "lucide-react";

const CreateInvoicePage = ({
  userDetails,
  productDetails,
  customerDetails,
}) => {
  //   console.log("userDetails:", userDetails);
  //   console.log("productDetails:", productDetails);
  //   console.log("customerDetails:", customerDetails);
  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([
    { description: "", quantity: 1, price: 0, tax:0 },
  ]);
  const [invoiceHandler, setInvoiceHandler] = useState(
    parseInt(userDetails.invoice_Number, 10)
  );

  const [invoiceNumber, setInvoiceNumber] = useState(
    `${userDetails.invoice_Prefix}${userDetails.invoice_Number}`
  );
  const [posoNumber, setPosoNumber] = useState("");

  const handleIncrement = () => {
    setInvoiceHandler((prev) => prev + 1);
  };

  React.useEffect(() => {
    setInvoiceNumber(`${userDetails.invoice_Prefix}${invoiceHandler}`);
  }, [invoiceHandler, userDetails.invoice_Prefix]);

  const [invoiceDate, setInvoiceDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  });
  const [paymentDue, setPaymentDue] = useState();
  const [paymentDueOptions, setPaymentDueOptions] = useState();
  const [logo, setLogo] = useState(null); // State to store the uploaded logo

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target.result); // Set the uploaded logo as a base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  };

  const calculateTotal = () =>
    items.reduce((total, item) => total + item.quantity * item.price, 0);

  const removeItem = (index) => {
    // Only remove if there's more than one item in the list
    if (items.length > 1) {
      const updatedItems = items.filter((_, itemIndex) => itemIndex !== index);
      setItems(updatedItems);
    } else {
      alert("You cannot remove the last item.");
    }
  };

  const handleDueDateChange = (e) => {
    const selectedValue = e.target.value;
    
    // If user selects "On receipt", set the paymentDue to the current date
    if (selectedValue === "On receipt") {
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
      setPaymentDue(currentDate);
      setPaymentDueOptions(selectedValue);
    } else if (selectedValue === "Custom") {
      // If custom option is selected, keep paymentDue as is
      setPaymentDueOptions(selectedValue);
    } else {
      // Calculate future date based on the selected days
      const calculatedDueDate = calculateDueDate(Number(selectedValue));
      setPaymentDue(calculatedDueDate);
      setPaymentDueOptions(selectedValue);
    }
  };
  
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setPaymentDue(selectedDate);
    setPaymentDueOptions("Custom"); // Set to Custom if the user picks a manual date
  };
  
  // Function to calculate future date
  const calculateDueDate = (days) => {
    const today = new Date();
    today.setDate(today.getDate() + days);
    return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };
  

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="mb-6 flex items-center justify-between">
        <div>
          {logo ? (
            <img
              src={logo}
              alt="Invoice Logo"
              className="h-16 w-auto rounded-xl border"
            />
          ) : (
            // <div>
            <h1 className="text-2xl font-bold">Invoice</h1>
          )}
        </div>
        <div>
          <label
            htmlFor="logo-upload"
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
          >
            <span className="mr-2">Upload Logo</span>
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Business Info */}
      <div className="mb-6">
        <div>
          <h2 className="text-xl font-bold">
            {userDetails.companyName.toUpperCase() || "N/A"}
          </h2>
          <p>
            Address: {userDetails.companyFullAddress || "N/A"},<br />
            {userDetails.city || "N/A"}, {userDetails.pincode || ""},{" "}
            {userDetails.country || "N/A"}
          </p>
          <p>Ph: {userDetails.phone || "N/A"}</p>
        </div>
      </div>

      {/* Customer Info */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Customer</label>
        <select
          id="customers"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
        >
          <option value="" disabled>
            Select a customer
          </option>
          {customerDetails.map((customer, index) => (
            <option
              key={`${customer.id}-${index}`}
              value={`${customer.firstName} ${customer.lastName} ${customer.companyName}`}
            >
              {customer.firstName} {customer.lastName} ({customer.companyName})
            </option>
          ))}
        </select>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-semibold mb-2">Invoice Number</label>
          <input
            type="text"
            placeholder="Invoice number"
            value={invoiceNumber}
            disabled
            onChange={(e) => setInvoiceNumber(e.target.value)}
            className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Invoice Date</label>
          <input
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
          />
        </div>
        {/* <div>
          <label className="block font-semibold mb-2">Due Date</label>
          <input
            type="date"
            value={paymentDue}
            onChange={(e) => setPaymentDue(e.target.value)}
            className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
          />
        </div> */}
        <div>
          <label className="block font-semibold mb-2">Due Date</label>
          <div className="mb-6 flex items-center gap-2">
            <div className="relative flex-1">
              {/* Date input field for manual override */}
              <input
                type="date"
                value={paymentDue}
                disabled={paymentDueOptions !== "Custom"}
                onChange={(e) => setPaymentDue(e.target.value)}
                className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
              />
            </div>

            <div className="relative flex-1">
              <select
                value={paymentDueOptions}
                onChange={handleDueDateChange} // Make sure this is updating `paymentDue` correctly
                className="mt-1 w-full p-3.5 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
              >
                <option value="" disabled>
                  Select a due date
                </option>
                <option value="15">15 Days</option>
                <option value="30">30 Days</option>
                <option value="45">45 Days</option>
                <option value="60">60 Days</option>
                <option value="On receipt">On Receipt</option>
                <option value="Custom">Custom</option> 
              </select>
            </div>
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-2">P.O. / S.O. Number</label>
          <input
            type="text"
            placeholder="P.O. / S.O. Number"
            value={posoNumber}
            
            onChange={(e) => setPosoNumber(e.target.value)}
            className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
          />
        </div>
      </div>

      {/* Item Table */}
      <div className="mb-6">
        {/* <table className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Item</th>
              <th className="border px-4 py-2 text-left">Quantity</th>
              <th className="border px-4 py-2 text-left">Price</th>
              <th className="border px-4 py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">
                  <select
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40"
                  >
                    <option value="" disabled>
                      Select a product
                    </option>
                    {productDetails.map((product, i) => (
                      <option key={i} value={product.productName}>
                        {product.productName}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(index, "price", Number(e.target.value))
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40"
                  />
                </td>
                <td className="border px-4 py-2 text-right">
                  {(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <table className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left w-2/5">Item</th>
              <th className="border px-4 py-2 text-left w-1/5">Quantity</th>
              <th className="border px-4 py-2 text-left w-1/5">Price</th>
              <th className="border px-4 py-2 text-left w-1/5">Tax</th>
              <th className="border px-4 py-2 text-right w-1/5">Amount</th>
              <th className="border px-4 py-2 text-center w-1/12">
                Remove
              </th>{" "}
              {/* Added for delete button */}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">
                  <select
                    id="products"
                    value={item.description}
                    onChange={(e) => {
                      const selectedProduct = productDetails.find(
                        (product) => product.productName === e.target.value
                      );
                      handleItemChange(index, "description", e.target.value);
                      if (selectedProduct) {
                        handleItemChange(index, "price", selectedProduct.price);
                      }
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40"
                  >
                    <option value="" disabled>
                      Select a product
                    </option>
                    {productDetails.map((product, i) => (
                      <option key={i} value={product.productName}>
                        {product.productName}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.tax}
                    onChange={(e) =>
                        handleItemChange(
                          index,
                          "tax",
                          Number(e.target.value)
                        )
                      }
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40"
                  />
                </td>
                <td className="border px-4 py-2 text-right">
                  {(item.quantity * item.price).toFixed(2)}
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-400"
                    onClick={() => removeItem(index)}
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={addItem}
          className="mt-3 inline-block px-4 py-2 text-blue-500 border border-blue-500 rounded-md font-medium text-sm hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out"
        >
          + Add Item
        </button>
      </div>

      {/* Total */}
      <div className="text-right font-bold">
        <p>Total: ₹{calculateTotal().toFixed(2)}</p>
      </div>

      {/* Save Button */}
      <div className="mt-6 text-right">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Save and Continue
        </button>
      </div>
    </div>
  );
};

export default CreateInvoicePage;
