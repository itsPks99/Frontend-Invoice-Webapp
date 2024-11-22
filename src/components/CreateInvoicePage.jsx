import React, { useEffect, useState } from "react";
import { Trash } from "lucide-react";

const CreateInvoicePage = ({
  userDetails,
  productDetails,
  customerDetails,
}) => {
  // console.log("userDetails:", userDetails);
  // console.log("productDetails:", productDetails);
  // console.log("customerDetails:", customerDetails );
  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([
    { description: "", quantity: 1, price: 0, cgst: "0", sgst: "0", igst: "0" },
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
  const [paymentDue, setPaymentDue] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  });
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

  // const calculateTotal = () =>
  //   items.reduce((total, item) => total + item.quantity * item.price, 0);
  const calculateTotal = () => {
    return items.reduce((total, item) => {
      let itemTotal = item.quantity * item.price;

      if (
        getTaxType(userState, customerState) === "SGST" ||
        getTaxType(userState, customerState) === "CGST"
      ) {
        itemTotal +=
          (item.price * item.sgst) / 100 + (item.price * item.cgst) / 100;
        // console.log('itemTotal - I:', itemTotal);
      }

      if (getTaxType(userState, customerState) === "IGST") {
        itemTotal += (item.price * item.igst) / 100;
        // console.log('itemTotal - C S:', itemTotal);
      }

      return total + itemTotal ||0;
    }, 0); // Return a number
  };

  const calculateTotalTax = () => {
    return items.reduce((total, item) => {
      let itemTotalTax = 0;

      // Check if SGST or CGST
      if (
        getTaxType(userState, customerState) === "SGST" ||
        getTaxType(userState, customerState) === "CGST"
      ) {
        const totalTaxRate =
          (Number(item.sgst) || 0) + (Number(item.cgst) || 0); // Sum SGST and CGST, default to 0 if undefined
        // console.log('totalTaxRate',totalTaxRate);
        itemTotalTax += (item.price * totalTaxRate) / 100;
      }

      // Check if IGST
      if (getTaxType(userState, customerState) === "IGST") {
        itemTotalTax += (item.price * Number(item.igst || 0)) / 100; // Default to 0 if IGST is not set
        // console.log('totalTaxRate',itemTotalTax);
      }

      return itemTotalTax;
    }, 0); // Return a number
  };

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
      const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
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
  const [selectedCustomerId, setSelectedCustomerId] = useState(""); // Store selected customer ID

  // Find selected customer from data
  const selectedCustomer = customerDetails.find(
    (customer) => customer.firstName === selectedCustomerId
  );

  console.log("selectedCustomerId", selectedCustomerId);
  console.log("selectedCustomers", selectedCustomer);

  const userState = "Delhi"; // Replace with dynamic user state
  console.log("userState", userState);

  const customerState =
    customerDetails.find((c) => c.firstName === selectedCustomerId)
      ?.billingAddress?.state || "";
  console.log("customerState", customerState);
  const getTaxType = (userState, customerState, taxtype) => {
    return userState === customerState
      ? taxtype === "C"
        ? "CGST"
        : "SGST"
      : "IGST";
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

      <div className="py-2">
        {/* Customer Dropdown */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Customer</label>
          <select
            id="customers"
            value={selectedCustomerId}
            onChange={(e) => setSelectedCustomerId(e.target.value)}
            className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
          >
            <option value="" disabled>
              Select a customer
            </option>
            {customerDetails.map((customer) => (
              <option key={customer.id} value={customer.firstName}>
                {customer.firstName} {customer.lastName} - (
                {customer.companyName})
              </option>
            ))}
          </select>
        </div>

        {/* Address Section */}
        <div className="grid grid-cols-2 gap-4">
          {/* Billing Address */}
          <div>
            <label className="block font-semibold mb-2">Billing Address</label>
            <div className="p-3 rounded-md border border-gray-300 shadow-sm bg-gray-50">
              {selectedCustomer?.billingAddress ? (
                <>
                  <p>{selectedCustomer.billingAddress.address1}</p>
                  {selectedCustomer.billingAddress.address2 && (
                    <p>{selectedCustomer.billingAddress.address2}</p>
                  )}
                  <p>
                    {selectedCustomer.billingAddress.city}
                    {", "}
                    {selectedCustomer.billingAddress.state}
                    {", "}
                    {selectedCustomer.billingAddress.pincode}
                  </p>
                </>
              ) : (
                <p className="text-gray-500">No address</p>
              )}
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <label className="block font-semibold mb-2">Shipping Address</label>
            <div className="p-3 rounded-md border border-gray-300 shadow-sm bg-gray-50">
              {selectedCustomer?.shippingAddress ? (
                <>
                  <p>{selectedCustomer.shippingAddress.address1}</p>
                  {selectedCustomer.shippingAddress.address2 && (
                    <p>{selectedCustomer.shippingAddress.address2}</p>
                  )}
                  <p>
                    {selectedCustomer.shippingAddress.city}
                    {", "}
                    {selectedCustomer.shippingAddress.state}
                    {", "}
                    {selectedCustomer.shippingAddress.pincode}
                  </p>
                </>
              ) : (
                <p className="text-gray-500">No address</p>
              )}
            </div>
          </div>
        </div>
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
                {/* <option value="" readOnly>
                  Select a due date
                </option> */}
                <option value="On receipt">On Receipt</option>
                <option value="15">15 Days</option>
                <option value="30">30 Days</option>
                <option value="45">45 Days</option>
                <option value="60">60 Days</option>

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
              <th className="border px-3 py-2 text-center w-2/7">Item</th>{" "}
              {/* Wider column */}
              <th className="border px-3 py-2 text-center w-1/12">Quantity</th>
              <th className="border px-3 py-2 text-center w-1/12">Price</th>
              {/* Conditional Tax Columns */}
              {getTaxType(userState, customerState) === "SGST" && (
                <>
                  <th className="border px-3 py-2 text-center w-1/12">
                    SGST
                    <br />
                    (%)
                  </th>
                  <th className="border px-3 py-2 text-center w-1/12">
                    CGST
                    <br />
                    (%)
                  </th>
                </>
              )}
              {getTaxType(userState, customerState) === "IGST" && (
                <th className="border px-3 py-2 text-center w-1/12">IGST(%)</th>
              )}
              <th className="border px-3 py-2 text-center w-1/12">Amount</th>
              <th className="border px-3 py-2 text-center w-1/12">Remove</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-2 py-2">
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
                        handleItemChange(
                          index,
                          "sgst",
                          selectedProduct.tax.sgst
                        );
                        handleItemChange(
                          index,
                          "cgst",
                          selectedProduct.tax.cgst
                        );
                        handleItemChange(
                          index,
                          "igst",
                          selectedProduct.tax.igst
                        );
                        // console.log('selectedProduct---', selectedProduct.tax.sgst + selectedProduct.productName);
                        // console.log('item.sgst---', item.sgst);
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
                <td className="border px-2 py-2 ">
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
                <td className="border px-2 py-2 text-center">
                {item.price
}                </td>
                {/* <td className="border px-4 py-2">
        <input
          type="number"
          min="0"
          step="0.01"
          value={item.tax}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40"
        />
      </td> */}

                {/* SGST and CGST */}
                {(getTaxType(userState, customerState) === "SGST" ||
                  getTaxType(userState, customerState) === "CGST") && (
                  <>
                    <td className="border px-4 py-2 text-center">
                      {item.sgst || "0"}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {item.cgst || "0"}
                    </td>
                  </>
                )}

                {/* Show IGST */}
                {getTaxType(userState, customerState) === "IGST" && (
                  <td className="border px-4 py-2 text-center">
                    {item.igst || "0"}
                  </td>
                )}
                {(getTaxType(userState, customerState) === "SGST" ||
                  getTaxType(userState, customerState) === "CGST") && (
                  <>
                    <td className="border px-4 py-2 text-right">
                      {(
                        item.quantity * item.price +
                        (item.price * item.sgst || 0) / 100 +
                        (item.price * item.cgst|| 0) / 100
                      ).toFixed(2)}
                    </td>
                  </>
                )}

                {getTaxType(userState, customerState) === "IGST" && (
                  <td className="border px-4 py-2 text-right">
                    {(
                      item.quantity * item.price +
                      (item.price * item.igst ||0) / 100
                    ).toFixed(2)}
                  </td>
                )}
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
          {console.log(
            "getTaxType(userState, customerState)",
            typeof getTaxType(userState, customerState)
          )}
        </table>

        <button
          onClick={addItem}
          className="mt-3 inline-block px-4 py-2 text-blue-500 border border-blue-500 rounded-md font-medium text-sm hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out"
        >
          + Add Item
        </button>
      </div>

          <hr />
          <div className="overflow-x-auto max-w-[300px] mx-auto md:mr-0 md:ml-auto mt-10 mb-10">
  <table className="w-full table-auto">
    <tbody>
      <tr className="border-b">
        <td className="px-4 py-2 text-left font-semibold">Subtotal :</td>
        <td className="px-4 py-2 text-right">₹{calculateTotalTax().toFixed(2)}</td>
      </tr>
      <tr className="border-b">
        <td className="px-4 py-2 text-left font-semibold">Discount :</td>
        <td className="px-4 py-2 text-right">₹{calculateTotalTax().toFixed(2)}</td>
      </tr>
      <tr className="border-b">
        <td className="px-4 py-2 text-left font-semibold">Shipping :</td>
        <td className="px-4 py-2 text-right">₹{calculateTotalTax().toFixed(2)}</td>
      </tr>
      <tr className="border-b">
        <td className="px-4 py-2 text-left font-semibold">Total Tax :</td>
        <td className="px-4 py-2 text-right">₹{calculateTotalTax().toFixed(2)}</td>
      </tr>
      <tr>
        <td className="px-4 py-2 text-left font-semibold">Total Amount :</td>
        <td className="px-4 py-2 text-right font-semibold">₹{calculateTotal().toFixed(2) }</td>
      </tr>
    </tbody>
  </table>
</div>
<hr />



      {/* Save Button */}
      <div className="mt-6 text-left">
        <button className="bg-blue-500 text-white px-4 py-2 mb-10 rounded hover:bg-blue-600 ">
          Save and Continue
        </button>
      </div>
    </div>
  );
};

export default CreateInvoicePage;
