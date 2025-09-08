import React from "react";

const TemplatePage = () => {
  const templates = [
    {
      id: 1,
      title: "Spreadsheet Template",
      description: "A detailed and structured layout for professional invoices.",
      imgSrc: "https://saldoinvoice.com/wp-content/uploads/2022/11/corporate_invoice.webp",
    },
    {
      id: 2,
      title: "Spreadsheet - Lite",
      description: "A simplified, clean, and user-friendly invoice template.",
      imgSrc: "https://saldoinvoice.com/wp-content/uploads/2022/11/corporate_invoice.webp",
    },
    {
      id: 3,
      title: "Standard Template",
      description: "Minimal and modern design for quick and easy invoicing.",
      imgSrc: "https://saldoinvoice.com/wp-content/uploads/2022/11/corporate_invoice.webp",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Choose an Invoice Template
      </h1>
      <p className="text-center text-gray-600 mb-12">
        Select an invoice template that suits your business needs. Click "Select" to get started!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 lg:px-16">
        {templates.map((template) => (
          <div
            key={template.id}
           className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-[1.01] hover:shadow-lg transition-transform duration-300 ease-in-out"
          >
            <img
              src={template.imgSrc}
              alt={template.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800">{template.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{template.description}</p>
            </div>
            <div className="bg-gray-100 px-6 py-4 flex justify-between items-center">
              <button className="bg-blue-600 text-white text-sm px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Select
              </button>
              <button className="text-blue-600 text-sm hover:underline">
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatePage;