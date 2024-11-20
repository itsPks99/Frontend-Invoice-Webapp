import React, { useState } from "react";

const CreateInvoicePage = ({ userDetails, productDetails,  customerDetails}) => {
  console.log("customerDetails:", customerDetails);
  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([
    { description: "", quantity: 1, price: 0 },
  ]);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [paymentDue, setPaymentDue] = useState("");
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
        <h1 className="text-2xl font-bold">New Invoice</h1>
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
            Address: {" "}
            {userDetails.companyFullAddress || "N/A"},<br/>
            {userDetails.city || "N/A"},{" "} {userDetails.pincode || ""},{" "} {userDetails.country || "N/A"}
          </p>
          <p>
            Ph: {userDetails.phone || "N/A"}
          </p>
          
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
    {customerDetails.map((customer) => (
      <option key={customer.id} value={customer.firstName + " " +customer.lastName + " " + customer.lastName}>
        {customer.firstName + " " + customer.lastName } {" "}
        { customer.companyName}
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
        <div>
          <label className="block font-semibold mb-2">Payment Due</label>
          <input
            type="date"
            value={paymentDue}
            onChange={(e) => setPaymentDue(e.target.value)}
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
      <th className="border px-4 py-2 text-left w-2/5">Item</th> {/* Set Item column width */}
      <th className="border px-4 py-2 text-left w-1/5">Quantity</th>
      <th className="border px-4 py-2 text-left w-1/5">Price</th>
      <th className="border px-4 py-2 text-right w-1/5">Amount</th>
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
              handleItemChange(index, "quantity", Number(e.target.value))
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
            readOnly // Make this field read-only since it is auto-populated
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40"
          />
        </td>
        <td className="border px-4 py-2 text-right">
          {(item.quantity * item.price).toFixed(2)}
        </td>
      </tr>
    ))}
  </tbody>
</table>

        <button onClick={addItem} className="mt-2 text-blue-500 underline">
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
