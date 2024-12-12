import React from 'react';

const InvoiceTemplate = ({invoiceData, userData}) => {
  

    // console.log("invoiceData:",invoiceData);
    // console.log("userData:",userData);

  return (
    <div className="max-w-4xl mx-auto p-4 shadow-lg">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 mb-8 rounded-t-md flex justify-between items-end">
  {/* Left Column */}
  <div>
    <h1 className="text-3xl font-bold">INVOICE</h1>
    <p className="text-2xl font-bold mt-1">
      {userData.invoice_Prefix}
      {invoiceData.invoiceNumber}
    </p>
  </div>

  {/* Right Column */}
  <div className="text-right text-2xl font-semibold self-end">
    Amount Due: ₹ {invoiceData.payment.grandTotal}
  </div>
</div>
      <div className="flex justify-between mb-8 ml-2">
        <div>
          <h2 className="text-xl font-bold ">Bill To:</h2>
          <p className="mt-2 font-medium text-gray-800">{invoiceData.billTo.customerName} ({invoiceData.billTo.companyName})</p>
        <p>Address: {invoiceData.billTo.address}, {invoiceData.billTo.city},<br/>{invoiceData.billTo.pincode}</p>
        <p>Email: {invoiceData.billTo.email}</p>
        <p>Phone: {invoiceData.billTo.phone}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold ">Ship To:</h2>
        <p>Address: {invoiceData.shipTo.address}, {invoiceData.shipTo.city},<br/>{invoiceData.shipTo.pincode}</p>
        
        </div>
        <div className="mr-2">
          <h2 className="text-xl font-bold">Invoice Details:</h2>
          <p>Invoice Date: {invoiceData.invoiceDate}</p>
          <p>Payment Due: {invoiceData.paymentDue}</p>
        </div>
      </div>

       <table className="min-w-full bg-white border-collapse border border-gray-300 ">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="border border-gray-300 px-2 py-2 ">Item Description</th>
            <th className="border border-gray-300 px-2 py-2 ">HSN/SAC</th>
            <th className="border border-gray-300 px-2 py-2">Quantity</th>
            <th className="border border-gray-300 px-2 py-2">Price</th>
            <th className="border border-gray-300 px-2 py-2">Tax<span className="text-[10px] "> (%)</span></th>
            <th className="border border-gray-300 px-2 py-2">Amount</th>
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

      <div className="mt-8 text-right text-1xl font-semibold mr-2">
       Sub Total: ₹ {invoiceData.payment.grandTotal - invoiceData.payment.tax -invoiceData.payment.discount||0}
      </div>
      
      <div className="mt-1 text-right text-1xl font-semibold mr-2">
        Discount: ₹ (-{invoiceData.payment.discount||0})
      </div>
     
      <div className="mt-1 text-right text-1xl font-semibold mr-2">
        Total Tax: ₹ {invoiceData.payment.tax||0}
      </div>
       
      <div className="mt-1 text-right text-[20px] font-bold mr-2">
        Total: ₹ {invoiceData.payment.grandTotal||0}
      </div>

      <div className="mt-8 p-4 border border-blue-300 rounded-md bg-blue-50">
        <h3 className="text-lg font-bold">Notes</h3>
        <p>{invoiceData.customerInvoiceNote}</p>
        <h3 className="text-lg font-bold">Terms & Conditions</h3>
        <p>{invoiceData.termsAndCondition}</p>
       
      </div>

      {/* <div className="mt-8 p-4 border border-gray-300 rounded-md">
        <h3 className="text-lg font-bold">Payment Details</h3>
        <p>Bank Name: {invoiceData.paymentDetails.bankName}</p>
        <p>Account Number: {invoiceData.paymentDetails.accountNumber}</p>
        <p>IFSC Code: {invoiceData.paymentDetails.ifscCode}</p>
      </div> */}

      <div className="mt-8 p-4 bg-gray-800 text-white rounded-md">
        <h3 className="text-lg font-bold">{userData.companyName}</h3>
        <p>{userData.companyFullAddress}, {userData.city}, {userData.pincode}, {userData.country}</p>
        <p>Phone: {userData.phone}</p>
        <p>Email: {userData.email}</p>
        <p>GST: {userData.GST}</p>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
