import jsPDF from "jspdf";
import React, { useState } from "react";
import html2canvas from "html2canvas";
import ReactDOMServer from "react-dom/server";
import ReactDOM from "react-dom";
import Invoice from "../components/InvoiceTemplates/InvoiceTemplate1";
import Invoice2 from "../components/InvoiceTemplates/InvoiceTemplate2";
import Invoice3 from "../components/InvoiceTemplates/InvoiceTemplate3";

class ReusableFunctions {
  // Function to format numbers into words
  static numberToWords(num) {
    const a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const g = ["", "Thousand", "Million", "Billion"];

    if (typeof num !== "number" || num < 0) return "Invalid number";
    if (num === 0) return "Zero Rupees";

    let str = "";
    let chunkCount = 0;

    while (num > 0) {
      let chunk = num % 1000;
      if (chunk > 0) {
        str =
          ReusableFunctions.chunkToWords(chunk, a, b) +
          " " +
          g[chunkCount] +
          " " +
          str;
      }
      num = Math.floor(num / 1000);
      chunkCount++;
    }

    return str.trim() + " Rupees";
  }

  static chunkToWords(chunk, a, b) {
    let str = "";
    if (chunk > 99) {
      str += a[Math.floor(chunk / 100)] + " Hundred ";
      chunk %= 100;
    }
    if (chunk > 19) {
      str += b[Math.floor(chunk / 10)] + " ";
      chunk %= 10;
    }
    if (chunk > 0) {
      str += a[chunk] + " ";
    }
    return str.trim();
  }

  // Function to format dates
  static formatDate(date, format = "DD/MM/YYYY") {
    const inputDate = new Date(date);
    if (isNaN(inputDate.getTime())) {
      throw new Error("Invalid date provided");
    }

    const day = String(inputDate.getDate()).padStart(2, "0");
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const year = inputDate.getFullYear();

    return format.replace(/DD/, day).replace(/MM/, month).replace(/YYYY/, year);
  }

  // static downloadInvoice = async (invoiceData, userData) => {
  //   console.log("invoiceData",invoiceData);
  //   console.log("userData",userData);
  //   try {
  //     // Create an off-screen element to render the invoice template
  //     const invoiceHtml = ReactDOMServer.renderToString(
  //       <Invoice2 invoiceData={invoiceData} userData={userData} />
  //     );
  //     const tempDiv = document.createElement("div");
  //     tempDiv.style.position = "absolute";
  //     tempDiv.style.top = "-9999px";
  //     tempDiv.style.left = "0";
  //     tempDiv.style.width = "1000px"; // Set fixed width to resemble A4 proportions
  //     // tempDiv.style.padding = "10px";
  //     tempDiv.style.paddingTop = "20px";
  //     tempDiv.style.backgroundColor = "white"; // Ensure background is white
  //     tempDiv.innerHTML = invoiceHtml;
  //     document.body.appendChild(tempDiv);
  
  //     // Set the dimensions for the A4 page (210mm x 297mm)
  //     const a4Width = 210; // A4 width in mm
  //     const a4Height = 297; // A4 height in mm
  
  //     // Generate canvas from the rendered invoice
  //     const canvas = await html2canvas(tempDiv, {
  //       scale: 3, // Higher scale for better quality
        
  //     });
  //     const imgData = canvas.toDataURL("image/png");
  
  //     // Create PDF
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();
  
  //     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //     pdf.save(`Invoice_${invoiceData.invoiceNumber}.pdf`);
  
  //     // Cleanup
  //     document.body.removeChild(tempDiv);
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //   }
  // };

  //------------------------------------------------------------------
  static downloadInvoice = async (invoiceData, userData) => {
    console.log("invoiceData", invoiceData);
    console.log("userData", userData);
  
    try {
      // Render the invoice template
      const invoiceHtml = ReactDOMServer.renderToString(
        <Invoice invoiceData={invoiceData} userData={userData} />
      );
  
      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.top = "-9999px";
      tempDiv.style.left = "0";
      tempDiv.style.width = "1000px"; // Set fixed width to resemble A4 proportions
      // tempDiv.style.padding = "10px";
      tempDiv.style.paddingTop = "10px";
      tempDiv.style.backgroundColor = "white"; // Ensure background is white
      tempDiv.innerHTML = invoiceHtml;
      document.body.appendChild(tempDiv);
  
      // Generate canvas using html2canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2, // Higher scale for better resolution
        // useCORS: true, // Ensure cross-origin compatibility
        logging: true,
      });
  
      const imgData = canvas.toDataURL("image/png");
      const contentHeight = canvas.height; // Height of the rendered content

      //     // A4 dimensions in pixels (at 96 DPI, 1mm = 3.78px)
      const a4WidthPx = 210 * 9.50;
      const a4HeightPx = 297 * 9.50;
  
      // Create PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const totalPages = Math.ceil(contentHeight / a4HeightPx);
  
      for (let i = 0; i < totalPages; i++) {
        const yOffset = i * a4HeightPx;
  
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = a4WidthPx;
        pageCanvas.height = a4HeightPx;
  
        const pageContext = pageCanvas.getContext("2d");
        pageContext.drawImage(
          canvas,
          0,
          yOffset,
          a4WidthPx,
          a4HeightPx,
          0,
          0,
          a4WidthPx,
          a4HeightPx
        );
  
        const pageImgData = pageCanvas.toDataURL("image/png");
  
        if (i > 0) {
          pdf.addPage();
        }
        pdf.addImage(
          pageImgData,
          "PNG",
          0,
          0,
          pdf.internal.pageSize.getWidth(),
          pdf.internal.pageSize.getHeight()
        );
      }
      
  
      pdf.save(`Invoice_${invoiceData.invoiceNumber}.pdf`);
  
      // Cleanup
      document.body.removeChild(tempDiv);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  
  
  
  
  static convertImageToBase64 = async (imageUrl) => {
    try {
      if (!imageUrl) {
        console.error("Image URL is invalid or empty");
        return ""; // Return an empty string if no URL is provided
      }
  
      const corsProxy = "https://cors-anywhere.herokuapp.com/"; // Use a CORS proxy
      const proxiedUrl = corsProxy + imageUrl;
  
      const response = await fetch(proxiedUrl, { mode: "cors" }); // Attempt to fetch the image
      if (!response.ok) {
        console.error(`Failed to fetch image: ${response.statusText}`);
        return "";
      }
  
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result); // Resolve with base64 string
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting image to base64:", error);
      return ""; // Return empty string in case of an error
    }
  };
  
  
  
  static handlePrintInvoice = (invoiceData, userData) => {
    const printWindow = window.open("", "_blank", "width=800,height=900");
  
    if (printWindow) {
      // Render the invoice component to an HTML string
      const htmlContent = ReactDOMServer.renderToString(
        <Invoice invoiceData={invoiceData} userData={userData} />
      );
  
      // Tailwind stylesheet link
      const tailwindStylesheet = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
      `;
  
      // Write the content into the new window
      printWindow.document.open();
      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            
            ${tailwindStylesheet}
            <style>
              /* General reset for print */
              body, html {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
              }
              @page {
                size: A4; /* Define A4 size */
                margin: 0mm; /* Set margins */
              }
              @media print {
                body {
                  -webkit-print-color-adjust: exact; /* Ensure colors are printed correctly */
                }
              }
              .invoice-container {
                width: 210mm; /* A4 width */
                height: auto; /* Adjust height based on content */
                margin: auto;
                padding: 0mm; /* Padding inside the container */
                box-sizing: border-box;
                background-color: white; /* Ensure white background for print */
                overflow: hidden;
              }
            </style>
          </head>
          <body>
            <div class="invoice-container">
              ${htmlContent}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
  
      // Trigger the print functionality after the window has loaded
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    } else {
      console.error("Failed to open a new window for printing.");
    }
  };
  

  // static handlePrintInvoice = (invoiceData, userData) => {
  //   const printWindow = window.open("", "_blank", "width=800,height=900");
  
  //   if (printWindow) {
  //     // Render the invoice component to an HTML string
  //     const htmlContent = ReactDOMServer.renderToString(
  //       <Invoice3 invoiceData={invoiceData} userData={userData} />
  //     );
  
  //     // Tailwind stylesheet link
  //     const tailwindStylesheet = `
  //       <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
  //     `;
  
  //     // Write the content into the new window
  //     printWindow.document.open();
  //     printWindow.document.write(`
  //       <!DOCTYPE html>
  //       <html lang="en">
  //         <head>
  //           <meta charset="UTF-8">
  //           <meta name="viewport" content="width=device-width, initial-scale=0.5">
           
  //           ${tailwindStylesheet}
  //           <style>
  //             /* General reset for print */
  //             body, html {
  //               margin: 0;
  //               padding: 0;
  //               font-family: Arial, sans-serif;
  //             }
  //             @page {
  //               size: A4;
  //               margin: 0mm; /* Adjust margins if necessary */
  //             }
  //             @media print {
  //               body {
  //                 -webkit-print-color-adjust: exact; /* Ensure colors are printed correctly */
  //               }
  //             }
  //             .invoice-container {
  //               width: 210mm;
  //               max-height: 297mm;
  //               margin: auto;
  //               overflow: hidden;
  //               padding: 0;
  //               box-sizing: border-box;
  //               transform: scale(0.9); /* Scale down to fit the content */
  //               transform-origin: top center; /* Adjust scaling origin */
  //             }
  //           </style>
  //         </head>
  //         <body>
  //           <div class="invoice-container">
  //             ${htmlContent}
  //           </div>
  //         </body>
  //       </html>
  //     `);
  //     printWindow.document.close();
  
  //     // Trigger the print functionality after the window has loaded
  //     printWindow.onload = () => {
  //       printWindow.print();
  //       printWindow.close();
  //     };
  //   } else {
  //     console.error("Failed to open a new window for printing.");
  //   }
  // };
  
  static getTaxType = (userState, customerState) => {
    // console.log('userState',userState);
    // console.log('customerState',customerState);
    if (userState === customerState) {
      // console.log('userState === customerState',userState === customerState);
      return  true ;
    }else{
      // console.log('userState === customerState',userState === customerState);
      return false;
    }
   
  };

  static calculateTaxPercentage = (payment) => {
    const { tax, grandTotal, discount } = payment;
  
    if (grandTotal - discount === 0) {
      return 0; // Avoid division by zero
    }
  
    const taxableAmount = grandTotal - discount - tax; // Adjust for discounts
    console.log('taxableAmount',taxableAmount);
    const taxPercentage = (tax / taxableAmount) * 100;
    console.log('taxPercentage',taxPercentage);
    return Math.round(taxPercentage * 100) / 100; // Round to 2 decimal places
  };
  
  
  
}

export default ReusableFunctions;
