import React from 'react';
import ReusableFunctions from "../ReusableFunctions";


const CreativeInvoiceTemplate = ({invoiceData, userData}) => {


  // console.log("invoiceData:",invoiceData);
  // console.log("userData:",userData);
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white border border-gray-300 shadow-lg rounded-xl">
      {/* Header Section */}
      <div className="bg-gray-800 text-white p-6 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-wide">INVOICE</h1>
            <p className="text-sm mt-1">Invoice #: <span className="font-semibold">{ userData.invoice_Prefix+invoiceData.invoiceNumber}</span></p>
            <p className="text-sm">Date: <span className="font-semibold">{ReusableFunctions.formatDate(invoiceData.invoiceDate)}</span></p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold">{userData.companyName}</h2>
            <p className="text-sm">{userData.companyFullAddress}, {userData.city}</p>
            <p className="text-sm">{userData.pincode}, {userData.country}</p>
            <p className="text-sm">PH: {userData.phone}</p>
            <p className="text-sm">GST: {userData.GST}</p>
          </div>
        </div>
      </div>

      {/* Customer & Invoice Details */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* Bill To */}
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50  text-gray-600">
          <h3 className="text-lg font-bold text-gray-800">Bill To</h3>
          <p className="mt-2 font-medium">{invoiceData.billTo.customerName} ({invoiceData.billTo.companyName})</p>
        <p>Address: {invoiceData.billTo.address}, {invoiceData.billTo.city},<br/>{invoiceData.billTo.pincode}</p>
        <p>Email: {invoiceData.billTo.email}</p>
        <p>Phone: {invoiceData.billTo.phone}</p>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50  text-gray-600">
          <h3 className="text-lg font-bold text-gray-800">Ship To</h3>
          <p className="mt-2 ">Address: {invoiceData.shipTo.address}, {invoiceData.shipTo.city},<br/>{invoiceData.shipTo.pincode}</p>

        </div>
        {/* Payment Info */}
        
      </div>

      {/* Items Section */}
      <div className="mt-6">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200 text-center">
            <tr>
              <th className="border border-gray-300 px-2 py-2 text-sm font-semibold">Item</th>
              <th className="border border-gray-300 px-2 py-2 text-sm font-semibold">HSN/SAC</th>
              <th className="border border-gray-300 px-2 py-2 text-sm font-semibold">Quantity</th>
              <th className="border border-gray-300 px-2 py-2 text-sm font-semibold">Unit Price</th>
              <th className="border border-gray-300 px-2 py-2 text-sm font-semibold">Tax<span className="text-[10px] "> (%)</span></th>
              <th className="border border-gray-300 px-2 py-2 text-sm font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
          {invoiceData.products.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100 text-center">
              <td className="border border-gray-300 px-2 py-2">{item.name}</td>
              <td className="border border-gray-300 px-2 py-2">{item.hsnCode}</td>
              <td className="border border-gray-300 px-2 py-2 ">{item.quantity}</td>
              <td className="border border-gray-300 px-2 py-2 ">₹{item.price}</td>
              <td className="border border-gray-300 px-2 py-2 ">{item.tax.igst}</td>
              <td className="border border-gray-300 px-2 py-2 ">₹{item.price}</td>
            </tr>
          ))}
            
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
  {/* Payment Info - Left Column */}
  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
    <h3 className="text-lg font-bold text-gray-700">Payment Info</h3>
    <p className="mt-2 text-gray-600">
      Payment Due: <span className="font-semibold">January 20, 2024</span>
    </p>
    <p className="text-gray-600">
      Account: <span className="font-semibold">123456789</span>
    </p>
    <p className="text-gray-600">
      IFSC: <span className="font-semibold">ABC123456</span>
    </p>
    <p className="text-gray-600">
      Bank: <span className="font-semibold">Creative Bank</span>
    </p>
  </div>

  {/* Total Section - Right Column */}
  <div className="flex justify-end">
    <div className="w-full bg-gray-50 border border-gray-300 p-4 rounded-lg">
      <div className="flex justify-between py-2">
        <span className="text-gray-600 font-semibold">Subtotal:</span>
        <span className="text-gray-700 font-bold">₹ {invoiceData.payment.grandTotal - invoiceData.payment.tax -invoiceData.payment.discount||0}</span>
      </div>
      <div className="flex justify-between py-2">
        <span className="text-gray-600 font-semibold">Discount:</span>
        <span className="text-gray-700 font-bold">₹ (-{invoiceData.payment.discount||0})</span>
      </div>
      <div className="flex justify-between py-2">
        <span className="text-gray-600 font-semibold">Tax (18%):</span>
        <span className="text-gray-700 font-bold">₹ {invoiceData.payment.tax||0}</span>
      </div>
      <div className="flex justify-between pt-2 border-t border-gray-300 mt-2">
        <span className="text-gray-800 font-bold text-lg">Total:</span>
        <span className="text-gray-800 font-bold text-lg">₹{invoiceData.payment.grandTotal||0}</span>
      </div>
      <span className="text-gray-800 font-bold text-[12px]">In Words: ({ReusableFunctions.numberToWords(invoiceData.payment.grandTotal)})</span>
    </div>
  </div>
</div>


      {/* Notes Section */}
      <div className="mt-10">
        <h3 className="text-lg font-bold text-gray-700">Terms & Notes</h3>
        <ul className="list-disc list-inside text-gray-600 mt-2">
          <li>{invoiceData.termsAndCondition}</li>
          <li>{invoiceData.customerInvoiceNote}</li>
          
        </ul>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-800 text-white text-center py-4 rounded-b-lg mt-6">
        <p className="text-sm">For inquiries, contact us at {userData.email}</p>
        <p className="text-sm">Phone: {userData.phone}</p>
      </div>
    </div>
  );
};

export default CreativeInvoiceTemplate;
