import React from "react";

const TemplatePage = () => {
  const templates = [
    {
      id: 1,
      title: "Spreadsheet Template",
      description: "Detailed and structured",
      imgSrc: "/path-to-image/spreadsheet-template.png", // Replace with actual path
    },
    {
      id: 2,
      title: "Spreadsheet - Lite",
      description: "Simplified version",
      imgSrc: "/path-to-image/spreadsheet-lite.png", // Replace with actual path
    },
    {
      id: 3,
      title: "Standard Template",
      description: "Minimal and modern",
      imgSrc: "/path-to-image/standard-template.png", // Replace with actual path
    },
  ];

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Invoice Templates</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="border border-gray-300 rounded-lg shadow-md overflow-hidden bg-white"
          >
            <img
              src={template.imgSrc}
              alt={template.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">{template.title}</h2>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
            <div className="flex justify-between items-center px-4 py-3 bg-gray-100">
              <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition">
                Select
              </button>
              {/* <button className="bg-gray-200 text-gray-600 text-sm px-4 py-2 rounded hover:bg-gray-300 transition">
                Settings
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatePage;
