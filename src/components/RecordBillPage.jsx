import React, { useEffect, useState } from "react";
import { Trash, Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import CustomerForm from "./CustomerForm";
import ReusableFunctions from "./ReusableFunctions";
// import Bill from "../components/BillTemplates/BillTemplate1";
// import Bill2 from "../components/BillTemplates/BillTemplate2";
// import Bill3 from "../components/BillTemplates/BillTemplate3";
import PreviewPage from "./PreviewPage";
import ProductForm from "./ProductForm";


const CreateBillPage = ({
  setActiveTab1,
}) => {
 

  //--------------------------------------------------------------------------------------------

  // Variables
  const [vendor, setVendor] = useState("");
  const [total, setTotal] = useState(0); // Initial total value
  const [balance, setBalance] = useState(0); // Initial balance amount
  const [loading, setLoading] = useState(false);
  const [totalDiscount, setTotalDiscount] = useState("");
  const [isPaymentReceived, setIsPaymentReceived] = useState(false);
  const [amountReceived, setAmountReceived] = useState(""); // Initial amount
  const [BillNumber, setBillNumber] = useState("");
  const [posoNumber, setPosoNumber] = useState("");
  const [productDetails, setProductDetails] = useState([]);
  const [vendorDetails, setVendorDetails] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [termsAndCondition, setTermsAndCondition] = useState(
    "Please check the bill and make the payment before 30 days."
  );
  const [vendorNote, setVendorNote] = useState(
    "Thank you for shopping with us."
  );
  const [paymentDueOptions, setPaymentDueOptions] = useState();
  const [logo, setLogo] = useState(null);
  const [selectedVendorId, setSelectedVendorId] = useState(""); // Store selected vendor ID
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Cash");
  const [selected, setSelected] = useState("rupee");
  const [showPreview, setshowPreview] = useState();
  const [showVendorForm, setShowVendorForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const navigate = useNavigate();
  const [billDate, setBillDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  });
  const [paymentDue, setPaymentDue] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  });
  const [items, setItems] = useState([
    {
      productName: "",
      description: "",
      quantity: 1,
      price: 0,
      cgst: "0",
      sgst: "0",
      igst: "0",
      hsnCode: "",
    },
  ]);
  const [BillData, setBillData] = useState({
    userId: "",
    brandLogoUrl: "",
    billNumber: "",
    billDate: "",
    billDueDate: "",
    companyName: "",
    country: "",
    gstNumber: "",
    poNumber: "",
    companyFullAddress: "",
    city: "",
    state: "",
    pincode: "",

    billTo: {
      vendorName: "",
      companyName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      gstNumber: "",
      state: "",
      country: "",
      pincode: "",
      placeOfSupply: "",
    },
    shipTo: {
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    products: [
      {
        name: "",
        hsnCode: "",
        quantity: "",
        price: "",
        tax: {
          cgst: "",
          sgst: "",
          igst: "",
        },
        subTotalAmount: "",
      },
    ],
    payment: {
      modeOfPayment: "",
      discount: "",
      tax: "",
      paymentMade: "",
      balanceDue: "",
      grandTotal: "",
    },
    paymentStatus: "",
    vendorBillNote: "",
    termsAndCondition: "",
  });

  // Additional funtions for Variable
  const addItem = () => {
    setItems([
      ...items,
      {
        productName: "",
        description: "",
        quantity: 1,
        price: 0,
        cgst: "0",
        sgst: "0",
        igst: "0",
        hsnCode: "",
      },
    ]);
  };

  const resetFields = () => {
    setBillData({
      userId: "",
      brandLogoUrl: "",
      billNumber: "",
      billDate: "",
      billDueDate: "",
      companyName: "",
      country: "",
      gstNumber: "",
      poNumber: "",
      companyFullAddress: "",
      city: "",
      state: "",
      pincode: "",
      billTo: {
        vendorName: "",
        companyName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        gstNumber: "",
        state: "",
        country: "",
        pincode: "",
        placeOfSupply: "",
      },
      shipTo: {
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
      },
      products: [
        {
          name: "",
          hsnCode: "",
          quantity: "",
          price: "",
          tax: {
            cgst: "",
            sgst: "",
            igst: "",
          },
          subTotalAmount: "",
        },
      ],
      payment: {
        modeOfPayment: "",
        discount: "",
        tax: "",
        paymentMade: "",
        balanceDue: "",
        grandTotal: "",
      },
      paymentStatus: "",
      vendorBillNote: "",
      termsAndCondition: "",
    });
  };

  const clearAllFields = () => {
    setVendor("");
    setTotal(0);
    setBalance(0);
    setLoading(false);
    setTotalDiscount(0);
    setIsPaymentReceived(false);
    setAmountReceived("");
    setBillNumber( "");
    setPosoNumber("");
    setTermsAndCondition(
      "Please check the bill and make the payment before 30 days."
    );
    setVendorNote("Thank you for shopping with us.");
    setPaymentDueOptions();
    // setLogo(null);
    setSelectedVendorId("");
    setSelectedPaymentMethod("Cash");
    setBillDate(() => {
      const today = new Date();
      return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    });
    setPaymentDue(() => {
      const today = new Date();
      return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    });
    setItems([
      {
        productName: "",
        description: "",
        quantity: 1,
        price: 0,
        cgst: "0",
        sgst: "0",
        igst: "0",
        hsnCode: "",
      },
    ]);
    setBillData({
      userId: "",
      brandLogoUrl: "",
      billNumber: "",
      billDate: "",
      billDueDate: "",
      companyName: "",
      country: "",
      gstNumber: "",
      poNumber: "",
      companyFullAddress: "",
      city: "",
      state: "",
      pincode: "",
      billTo: {
        vendorName: "",
        companyName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        gstNumber: "",
        state: "",
        country: "",
        pincode: "",
        placeOfSupply: "",
      },
      shipTo: {
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
      },
      products: [
        {
          name: "",
          hsnCode: "",
          quantity: "",
          price: "",
          tax: {
            cgst: "",
            sgst: "",
            igst: "",
          },
          subTotalAmount: "",
        },
      ],
      payment: {
        modeOfPayment: "",
        discount: "",
        tax: "",
        paymentMade: "",
        balanceDue: "",
        grandTotal: "",
      },
      paymentStatus: "",
      vendorBillNote: "",
      termsAndCondition: "",
    });
  };


  const removeItem = (index) => {
    if (items.length > 1) {
      setItems((prevItems) => prevItems.filter((_, itemIndex) => itemIndex !== index));
    } else {
      Swal.fire({
        icon: "warning",
        title: "Cannot Remove Item",
        text: "You cannot remove the last item.",
        confirmButtonColor: "#2563EB",
        confirmButtonText: "OK",
      });
    }
  };


  // Find selected vendor from data
  const selectedVendor = vendorDetails.find(
    (vendor) => vendor._id === selectedVendorId
  );
  

  const [userState, setUserState] = useState("");

  const vendorState =
    vendorDetails.find((c) => c._id === selectedVendorId)?.billingAddress
      ?.state || "";
  

  //--------------------------------------------------------------------------------------------

  //Handlers
  const [billHandler, setBillHandler] = useState(
    parseInt(userDetails.bill_Number, 10)
  );

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target.result); // Set the uploaded logo as a base64
        // setBillData((prevData) => ({
        //   ...prevData,
        //   brandLogoUrl: e.target.result, // Set the uploaded logo as a base64 string
        // }));
      };
      reader.readAsDataURL(file);
    }
    // console.log("BillData.brandLogoUrl", BillData.brandLogoUrl);
  };

 

  const handleTotalDiscountChange = (e) => {
    const discountValue = parseInt(e.target.value, 10); // Convert string to integer
  
    const totalAmount = calculateTotal(); // Total amount (including tax)
    const totalTax = calculateTotalTax(); // Total tax amount
  
    const taxableAmount = totalAmount - totalTax; // Subtract tax to get taxable amount
  
    let newDiscount = 0;
  
    if (selected === "percentage") {
      // Apply percentage-based discount on taxable amount
      newDiscount = isNaN(discountValue)
        ? 0
        : Math.round((taxableAmount * discountValue) / 100);
    } else {
      // Apply flat discount
      newDiscount = isNaN(discountValue) ? 0 : Math.min(discountValue, taxableAmount);
    }
  
    setTotalDiscount(newDiscount); // Update the state
  
    // console.log("Taxable Amount:", taxableAmount);
    // console.log("Discount Applied:", newDiscount);
  };
  
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleTermsChange = (e) => {
    setTermsAndCondition(e.target.value);
  };

  const handleVendorNoteChange = (e) => {
    setVendorNote(e.target.value);
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

  // Handle Amount Change
  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value); // Handle empty input as 0
    setAmountReceived(value);
    calculateBalance(value); // Recalculate balance
    // setTotalAmount(totalAmount - amountReceived);
  };

  const handleChange = (event) => {
    setSelectedPaymentMethod(event.target.value); // Update the state with the selected value
    // console.log("Selected Payment Method:", event.target.value); // Log the selected value
  };

  const handleTabChange = (newTab) => {
    setActiveTab1(newTab); // Update the activeTab in the Dashboard
    window.scrollTo(0, 0);
  };


  //--------------------------------------------------------------------------------------------

  // API Funtions

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "http://localhost:3000/api/products/fetchProducts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProductDetails(data.products); // Save to state
        // console.log("Product Details:", data.products);
      } else {
        console.error("Failed to fetch products:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  

  const fetchVendors = async () => {
    
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
        console.log('data', data.vendor);
        setVendorDetails(data.vendor);
        
      } else {
        console.error("Failed to fetch vendors:", response.statusText);
        
      }
    } catch (error) {
      console.error("Error fetching vendors:", error);
      
    }
  };

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No auth token found in localStorage.");
        return;
      }

      const response = await fetch(
        "http://localhost:3000/api/auth/user-profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserDetails(data.user); // Save to state
        setUserState(data.user.state);
        setLogo(data.user.brandLogoUrl);
        // console.log("User Details:", data.user);
      } else {
        console.error(
          `Failed to fetch user info: ${response.status} - ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error fetching user info:", error.message);
    }
  };

  const callCreateAPI = async (userData) => {

    // console.log('selectedVendor data', selectedVendor.firstName + " " + selectedVendor.lastName || "");

    if (selectedVendor) {
      if (items[0].hsnCode !== "" || items[0].price !== 0) {
        setLoading(true); // Start loading
        setBillData((prevData) => {
          const paymentStatus = (() => {
            const total = Math.round(calculateTotal());
            const discount = Math.round(totalDiscount);
            const received = Math.round(amountReceived);
            const due = total - discount - received;

            if (due === 0 && isPaymentReceived) {
              return "paid";
            } else if (!isPaymentReceived || due === total) {
              return "unpaid";
            } else if (received < total && received !== 0) {
              return "partially paid";
            } else {
              return "unpaid";
            }
          })();

          const updatedData = {
            ...prevData,
            userId: userDetails.id || "",
            brandLogoUrl: logo || "",
            billNumber: BillNumber || "N/A",
            billDate: billDate || "N/A",
            billDueDate: paymentDue || "N/A",
            companyName: userDetails.companyName || "N/A",
            country: userDetails.country || "N/A",
            gstNumber: userDetails.GST || "N/A",
            poNumber: posoNumber || "",
            companyFullAddress: userDetails.companyFullAddress || "N/A",
            city: userDetails.city || "N/A",
            state: userDetails.state || "N/A",
            pincode: userDetails.pincode || "N/A",
            vendorId:selectedVendor._id,
            billTo: {
              vendorName:
                selectedVendor.firstName + " " + selectedVendor.lastName ||
                "",
              companyName: selectedVendor.companyName || "N/A",
              phone: selectedVendor.phone || "N/A",
              email: selectedVendor.email || "N/A",
              address: selectedVendor.billingAddress.address1 || "N/A",
              city: selectedVendor.billingAddress.city || "N/A",
              gstNumber: selectedVendor.gstNumber || "N/A",
              state: selectedVendor.billingAddress.state || "N/A",
              country: selectedVendor.billingAddress.country || "N/A",
              pincode: selectedVendor.billingAddress.pincode || "N/A",
              placeOfSupply: selectedVendor.billingAddress.state || "N/A",
            },
            shipTo: {
              address: selectedVendor.shippingAddress.address1 || "N/A",
              city: selectedVendor.shippingAddress.city || "N/A",
              state: selectedVendor.shippingAddress.state || "N/A",
              country: selectedVendor.shippingAddress.country || "N/A",
              pincode: selectedVendor.shippingAddress.pincode || "N/A",
            },
            products: items.map((item) => ({
              name: item.productName,
              hsnCode: item.hsnCode,
              quantity: item.quantity,
              price: item.price,
              tax: {
                cgst: item.cgst,
                sgst: item.sgst,
                igst: item.igst,
              },
              subTotalAmount:
              ReusableFunctions.getTaxType(userState, vendorState) === false
                  ? Math.round(
                      item.quantity * item.price +
                        (item.price * item.igst || 0) / 100
                    )
                  : Math.round(
                      item.quantity * item.price +
                        (item.price * item.sgst || 0) / 100 +
                        (item.price * item.cgst || 0) / 100
                    ),
            })),
            payment: {
              modeOfPayment: selectedPaymentMethod || "N/A",
              discount: Math.round(totalDiscount) || 0,
              tax: Math.round(calculateTotalTax()) || 0,
              paymentMade: Math.round(amountReceived) || 0,
              balanceDue: Math.round(
                calculateTotal() - Number(totalDiscount) - Number(amountReceived)
              ),
              grandTotal:
                Math.round(calculateTotal() - Number(totalDiscount)) || 0,
            },

            paymentStatus,
            vendorBillNote: vendorNote,
            termsAndCondition: termsAndCondition,
          };

          console.log("Updated BillData: ", updatedData);
          return updatedData;
        });

        // Simulate API call and stop loader after delay
        // callCreateAPI(BillData, userDetails);
        setTimeout(() => {
          if (BillData.userId === "") {
            // BillData is empty, show an alert or handle the case where it's empty
            setLoading(false);
            // console.log("BillData is empty!", BillData);
            // callCreateAPI(userData);
          } else {
            // BillData is not empty, proceed with the API call
            createBillApi(BillData, userData);
          }
        }, 1500);
      } else {
        Swal.fire({
          icon: "error",
          title: "No product selected!",
          text: "Please select a product.",
          confirmButtonText: "OK",
          confirmButtonColor: "#2563EB",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "No vendor selected!",
        text: "Please select a vendor.",
        confirmButtonText: "OK",
        confirmButtonColor: "#2563EB",
      });
    }
  };

  const createBillApi = async (billData, userData) => {
    // console.log("billData:", billData);
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No auth token found in localStorage.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:3000/api/bill/generateBill",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(billData), // Pass billData as the request body
          redirect: "follow",
        }
      );
      // console.log("response",response);

      if (response.ok) {
        const data = await response.json(); // Parse the JSON response if needed

      

        const totalBillAmt =
          Number(userData.total_bill_amount) +
            data.bill.payment.grandTotal || "0";
        const totalBalanceAmt =
          Number(userData.total_bill_balance) +
            data.bill.payment.balanceDue || "0";
        const totalPaidAmt =
          Number(userData.total_bill_paid_amount || "0") +
            data.bill.payment.paymentMade || "0";
        // console.log("invNumber", invNumber);
        // console.log("totalBillAmt", totalBillAmt);
        // console.log("totalBalanceAmt", totalBalanceAmt);
        // console.log("totalPaidAmt", totalPaidAmt);

        // updateProfileApi({ 
        //   bill_Number: invNumber,
        //   // bill_Prefix: ,
        //   total_bill_amount: totalBillAmt,
        //   total_bill_balance: totalBalanceAmt,
        //   total_bill_paid_amount: totalPaidAmt,
        // });
        Swal.fire({
          icon: "success",
          title: "Bill created successfully!",
          text: "Your bill has been generated and saved.",
          confirmButtonText: "OK",
          confirmButtonColor: "#2563EB",
          // timer: 3000, // Auto close after 3 seconds
        });
        console.log("Bill created successfully:", data);
        handleTabChange("preview-page");
        navigate(`/dashboard/${"preview-page"}`,
          {state: { billData: data.bill, userData :userDetails} , replace: true}
        );
        resetFields();
      } else {
        setLoading(false);

        console.error(
          `Failed to create bill: ${response.status} - ${response.statusText}`
        );
      }
    } catch (error) {
      setLoading(false);

      console.error("Error creating bill:", error.message);
    } finally {
      setLoading(false); // Ensure the loading state is cleared
    }
  };

  const updateProfileApi = async (profileData) => {
    // console.log("profileData:", profileData);
    clearAllFields();
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No auth token found in localStorage.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:3000/api/auth/updatePaymentFields",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profileData), // Pass billData as the request body
        }
      );

      if (response.ok) {
        const data = await response.json(); // Parse the JSON response if needed

        // console.log("Profile update successfully:", data);
        setLoading(false);
      } else {
        setLoading(false);
        console.error(
          `Failed to Profile update: ${response.status} - ${response.statusText}`
        );
      }
    } catch (error) {
      setLoading(false);
      console.error("Error Profile update:", error.message);
    } finally {
      setLoading(false); // Ensure the loading state is cleared
    }
  };

  //--------------------------------------------------------------------------------------------

  // UseEffets

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([fetchProducts(), fetchVendors(), fetchUserInfo()]);
      } catch (error) {
        console.error("Error in fetching data:", error);
      } finally {
        setLoading(false); // Ensure loading state is updated after all fetches
      }
    };

    fetchData();
  }, []);

  

  useEffect(() => {
    if (!isPaymentReceived) {
      setSelectedPaymentMethod("Cash");
      setAmountReceived("");
    }
  }, [isPaymentReceived]);

 

  // Reset totalDiscount when selected changes
  useEffect(() => {
    setTotalDiscount(0); // Reset to 0 whenever selected changes
  }, [selected]);

  //--------------------------------------------------------------------------------------------

  // Calculation Funtions

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      let itemTotal = item.quantity * item.price;

      if (
        // getTaxType(userState, vendorState) === "SGST" ||
        ReusableFunctions.getTaxType(userState, vendorState) === true
      ) {
        itemTotal +=
          (item.price * item.sgst) / 100 + (item.price * item.cgst) / 100;
        // console.log('itemTotal - I:', itemTotal);
      }

      if (ReusableFunctions.getTaxType(userState, vendorState) === false) {
        itemTotal += (item.price * item.igst) / 100;
        // console.log('itemTotal - C S:', itemTotal);
      }

      return total + itemTotal || 0;
    }, 0); // Return a number
  };

  const calculateSubTotal = () => {
    return items.reduce((total, item) => {
      let itemTotal = item.quantity * item.price;

      return total + itemTotal || 0;
    }, 0); // Return a number
  };

  const calculateTotalTax = () => {
    return items.reduce((total, item) => {
      let itemTotalTax = 0;

      // Check if SGST or CGST
      if (
        // getTaxType(userState, vendorState) === "SGST" ||
        ReusableFunctions.getTaxType(userState, vendorState) === true
      ) {
        const totalTaxRate =
          (Number(item.sgst) || 0) + (Number(item.cgst) || 0); // Sum SGST and CGST, default to 0 if undefined
        // console.log('totalTaxRate',totalTaxRate);
        itemTotalTax += (item.price * totalTaxRate) / 100;
      }

      // Check if IGST
      if (ReusableFunctions.getTaxType(userState, vendorState) === false) {
        itemTotalTax += (item.price * Number(item.igst || 0)) / 100; // Default to 0 if IGST is not set
        // console.log('totalTaxRate',itemTotalTax);
      }

      return total + itemTotalTax || 0;
    }, 0); // Return a number
  };

  const calculateEachTax = (userState, vendorState, items) => {

    let totalCGST = 0;
    let totalSGST = 0;
    let totalIGST = 0;
  
    // console.log('items',items);
    
    items.forEach((item) => {
  if (userState === vendorState) {
        // Intra-state: Calculate CGST and SGST
        totalCGST += (Number(item.price) * (Number(item.cgst) || 0)) / 100;
        totalSGST += (Number(item.price) * (Number(item.sgst) || 0)) / 100;
      } else {
        // Inter-state: Calculate IGST
        totalIGST += (Number(item.price) * (Number(item.igst) || 0)) / 100;
      }
    });  
    return {
      totalCGST: totalCGST,
      totalSGST: totalSGST,  
      totalIGST: totalIGST       
    };
  };

  const taxBreakdown = calculateEachTax(userState, vendorState, items);
  

  

  const calculateDiscount = () => {
    const itemDiscount = totalDiscount || 0; // Assume each item has a `discount` property
    return Number(itemDiscount);
  };

  // Function to calculate future date
  const calculateDueDate = (days) => {
    const today = new Date();
    today.setDate(today.getDate() + days);
    return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  
  

  // Calculate Balance Amount
  const calculateBalance = (received) => {
    const calculatedBalance = total - received;
    setBalance(calculatedBalance);
  };

  

  return (

    
      
      <div className="p-6 mx-auto bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="mb-10 flex items-center justify-between">
      <div className="flex justify-between items-center w-full">
  {/* Left: Bill Title */}
  <div className="flex-1 text-left">
    <h1 className="text-2xl font-bold">BILL</h1>
  </div>

  {/* Right: Logo */}
  <div className="flex-shrink-0">
  {logo &&(<img
              className="h-14 rounded-md border border-blue-500"
              src={logo}
              alt=""
            />)}
  </div>
</div>


        
      </div>

      {/* Business Info */}
      <div className="mb-6 flex items-start justify-between">
        {/* Left Section - Company Details */}
        <div>
          <h2 className="text-xl font-bold">
            {userDetails.companyName || "N/A"}
          </h2>
          <p>
            Address: {userDetails.companyFullAddress || "N/A"},<br />
            {userDetails.city || "N/A"}, {userDetails.pincode || ""},{" "}
            {userDetails.country || "N/A"}
          </p>
          <p>Ph: {userDetails.phone || "N/A"}</p>
          <p>GST: {userDetails.GST || "N/A"}</p>
        </div>

        {/* Right Section - Place of Supply */}
        {selectedVendor?.billingAddress ? (
          <div className="text-right">
            <p className="text-lg font-semibold">Place of Supply</p>
            <>
              <p className="text-lg ">
                {selectedVendor.billingAddress.state}
              </p>
            </>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="py-2">
        {/* Vendor Dropdown */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Vendor</label>
          <select
            id="vendors"
            value={selectedVendorId}
            onChange={(e) => setSelectedVendorId(e.target.value)}
            className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
          >
            <option value="" disabled>
              Select a vendor
            </option>
            {vendorDetails.map((vendor) => (
              <option
                key={
                  vendor._id ||
                  vendor.id ||
                  `${vendor.firstName}-${vendor.lastName}`
                } // Use a unique key
                value={vendor._id || vendor.id} // Use the unique identifier as the value
              >
                {vendor.firstName} {vendor.lastName} - (
                {vendor.companyName})
              </option>
            ))}
          </select>
          <span
            className="flex items-center text-blue-600 cursor-pointer hover:text-blue-800 transition-colors py-2 mx-2 my-1"
            onClick={() => setShowVendorForm(true)}
          >
            <Plus className="h-5 w-5 mr-1" /> {/* Lucide Plus icon */}
            Add Vendor
          </span>
        </div>

        {/* Address Section */}
        <div className="grid grid-cols-2 gap-4">
          {/* Billing Address */}
          <div>
            <label className="block font-semibold mb-2">Billing Address</label>
            <div className="p-3 rounded-md border border-gray-300 shadow-sm bg-gray-50">
              {selectedVendor?.billingAddress ? (
                <>
                  <p>{selectedVendor.billingAddress.address1}</p>
                  {selectedVendor.billingAddress.address2 && (
                    <p>{selectedVendor.billingAddress.address2}</p>
                  )}
                  <p>
                    {selectedVendor.billingAddress.city}
                    {", "}
                    {selectedVendor.billingAddress.state}
                    {", "}
                    {selectedVendor.billingAddress.pincode}
                  </p>
                  <p>GST: {selectedVendor.gstNumber}</p>
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
              {selectedVendor?.shippingAddress ? (
                <>
                  <p>{selectedVendor.shippingAddress.address1}</p>
                  <p>
                    {selectedVendor.shippingAddress.city}
                    {", "}
                    {selectedVendor.shippingAddress.state}
                    {", "}
                    {selectedVendor.shippingAddress.pincode}
                   <p>‎ </p>
                  </p>
                </>
              ) : (
                <p className="text-gray-500">No address</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bill Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-semibold mb-2">Bill Number</label>
          <input
            type="text"
            placeholder="Bill number"
            value={BillNumber}
            onChange={(e) => setBillNumber(e.target.value)}
            className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Bill Date</label>
          <input
            type="date"
            value={billDate}
            onChange={(e) => setBillDate(e.target.value)}
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
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {/* Date input field for manual override */}
            <div className="relative w-full sm:flex-1">
              <input
                type="date"
                value={paymentDue}
                disabled={paymentDueOptions !== "Custom"}
                onChange={(e) => setPaymentDue(e.target.value)}
                className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
              />
            </div>

            {/* Select field */}
            <div className="relative w-full sm:flex-1">
              <select
                value={paymentDueOptions}
                onChange={handleDueDateChange} // Make sure this is updating `paymentDue` correctly
                className="mt-1 w-full p-3.5 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101"
              >
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
          <label className="block font-semibold mb-2">
            P.O. / S.O. Number{" "}
            <span className="ml-1  text-gray-400">(optional)</span>
          </label>
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
        <div className="overflow-x-auto">
          <table className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2 text-center w-4/12 ">Item</th>
                <th className="border px-3 py-2 text-center w-2/12">
                  HSN/
                  <br />
                  SAC
                </th>
                <th className="border px-3 py-2 text-center w-1/12">
                  Qty
                </th>
                <th className="border px-3 py-2 text-center w-2/12">Price</th>
                
                <th className="border px-3 py-2 text-center w-1/12">
                    TAX(%)
                  </th>
                <th className="border px-3 py-2 text-center w-1/12">
                  Amount with tax
                </th>
                <th className="border px-3 py-2 text-center w-1/12">Remove</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-2 py-2">
                    <select
                      id="products"
                      value={item.productName}
                      onChange={(e) => {
                        const selectedProduct = productDetails.find(
                          (product) => product.productName === e.target.value
                        );

                        handleItemChange(index, "description", e.target.value);
                        if (selectedProduct) {
                          handleItemChange(
                            index,
                            "productName",
                            selectedProduct.productName
                          );
                          handleItemChange(
                            index,
                            "price",
                            selectedProduct?.price?.sale?.sellingPrice
                          );
                          handleItemChange(
                            index,
                            "sgst",
                            selectedProduct?.defaultTaxRates?.intraStateRate / 2
                          );
                          handleItemChange(
                            index,
                            "cgst",
                            selectedProduct?.defaultTaxRates?.intraStateRate / 2
                          );
                          handleItemChange(
                            index,
                            "igst",
                            selectedProduct?.defaultTaxRates?.interStateRate
                          );
                          handleItemChange(
                            index,
                            "hsnCode",
                            selectedProduct.hsnAndSacCode
                          );
                        }
                      }}
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40"
                    >
                      <option value="" disabled>
                        Select a product
                      </option>
                      {productDetails
  .filter((product) => product.price?.purchase?.isEnabled) 
  .map((product, i) => (
    <option key={i} value={product.productName}>
      {product.productName}
    </option>
  ))}
                    </select>
                  </td>
                  <td className="border px-4 py-2 text-center">
                  <input
                    
                      value={item.hsnCode}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "hsnCode",
                         e.target.value
                        )
                      }
                      className="w-full text-left p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40"
                    />
                    {/* {item.hsnCode || "0"} */}
                  </td>
                  <td className="border px-2 py-2">
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
                      className="w-full text-center p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40"
                    />
                  </td>
                  <td className="border px-2 py-2 text-center">
                    <input
                      type="number"
                      min="1"
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(index, "price", Number(e.target.value))
                      }
                      className="w-full  text-center p-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40"
                    />
                  </td>
                 
                  {(
                    // getTaxType(userState, vendorState) === "SGST" ||
                    ReusableFunctions.getTaxType(userState, vendorState) === true) && (
                    <>
                      <td className="border px-4 py-2 text-center">
                        {Math.round(Number(item.sgst) + Number(item.cgst)) || "0"}
                      </td>
                      
                    </>
                  )}
                  {ReusableFunctions.getTaxType(userState, vendorState) === false && (
                    <td className="border px-4 py-2 text-center">
                      {item.igst || "0"}
                    </td>
                  )}
                  <td className="border px-4 py-2 text-center">
                    {Math.round(
                      item.quantity * item.price +
                        ((item.price * (item.sgst || 0)) / 100 +
                          (item.price * (item.cgst || 0)) / 100) ||
                        (item.price * (item.igst || 0)) / 100
                    )}
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
        </div>

        <button
          onClick={addItem}
          className="mt-3 inline-block px-4 py-2 text-blue-500 border border-blue-500 rounded-md font-medium text-sm hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out"
        >
          + Add Item
        </button>
        <button
          onClick={() => setShowProductForm(true)}
          className="mt-3 ml-5 inline-block px-4 py-2 text-blue-500 border border-blue-500 rounded-md font-medium text-sm hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out"
        >
          + Add Product
        </button>
      </div>

      <hr />

      <div className="flex flex-col md:flex-row justify-between mt-5 mb-10 gap-12 items-center">
  {/* Vendor Note */}
  <div className="w-full md:w-2/3 px-2">
    <label
      htmlFor="vendorNote"
      className="block text-sm font-semibold mb-2"
    >
      Vendor Note:
    </label>
    <textarea
      id="vendorNote"
      value={vendorNote}
      onChange={handleVendorNoteChange}
      className="w-full h-20 p-2 border border-gray-300 rounded-md resize-none"
      placeholder="Enter vendor note here..."
    ></textarea>
  </div>

  {/* Add Discount */}
  <div className="w-full md:w-1/3 flex flex-col md:flex-row justify-end items-end gap-4">
    <div className="text-right">
      <p className="text-sm font-semibold mb-1">
        Add Discount
        <br />
        <span className="text-gray-400">(optional)</span>
      </p>
    </div>

    <div className="flex items-center gap-2">
      <input
        type="number"
        min="0"
        max={selected === "percentage" ? "10" : "100000"}
        step="0.01"
        placeholder={selected === "percentage" ? "0%" : "0"}
        onChange={handleTotalDiscountChange}
        className="w-20 h-10 py-2 px-2 text-center border border-gray-300 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-40"
      />
      <div className="flex flex-col space-y-2">
        <label className="flex items-center">
          <input
            type="radio"
            name="option"
            value="rupee"
            className="form-radio text-blue-500"
            checked={selected === "rupee"}
            onChange={(e) => setSelected(e.target.value)}
          />
          <span className="ml-2">₹</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="option"
            value="percentage"
            className="form-radio text-blue-500"
            checked={selected === "percentage"}
            onChange={(e) => setSelected(e.target.value)}
          />
          <span className="ml-2">%</span>
        </label>
      </div>
    </div>
  </div>
</div>

      <hr />
      <div className="flex flex-col md:flex-row mt-5 mb-10">
        {/* Terms and Conditions Section */}
        <div className="w-full md:w-2/3 px-2">
          <label
            htmlFor="termsAndCondition"
            className="block text-sm font-semibold mb-2"
          >
            Terms and Conditions:
          </label>
          <textarea
            id="termsAndCondition"
            value={termsAndCondition}
            onChange={handleTermsChange}
            className="w-full h-20 p-2 border border-gray-300 rounded-md resize-none"
            placeholder="Enter terms and conditions here..."
          ></textarea>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto w-full md:w-2/3 max-w-[300px] mx-auto md:mr-0 md:ml-auto">
          <table className="w-full table-auto">
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2 text-left font-semibold">
                  Subtotal :
                </td>
                <td className="px-4 py-2 text-right">
                  ₹ {Math.round(calculateSubTotal())}
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 text-left font-semibold">
                  Discount :
                </td>
                <td className="px-4 py-2 text-right">
                  (- ₹ {Math.round(calculateDiscount() )})
                </td>
              </tr>
              {ReusableFunctions.getTaxType(userState, vendorState) === true && (
                <>
              <tr className="border-b">
                <td className="px-4 py-2 text-left text-[14px]">
                  CGST :
                </td>
                <td className="px-4 py-2 text-right">
                  ₹ {Math.round(taxBreakdown.totalCGST)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 text-left text-[14px]">
                  SGST :
                </td>
                <td className="px-4 py-2 text-right">
                  ₹ {Math.round(taxBreakdown.totalSGST)}
                </td>
              </tr>
              </>
              )}
              {ReusableFunctions.getTaxType(userState, vendorState) === false && (
                <>
              <tr className="border-b">
                <td className="px-4 py-2 text-left text-[14px]">
                  IGST :
                </td>
                <td className="px-4 py-2 text-right">
                  ₹ {Math.round(taxBreakdown.totalIGST)}
                </td>
              </tr>
              </>)}
              
              <tr className="border-b">
                <td className="px-4 py-2 text-left font-semibold">
                  Total Tax :
                </td>
                <td className="px-4 py-2 text-right">
                  ₹ {Math.round(calculateTotalTax())}
                </td>
              </tr>
              

              <tr>
                <td className="px-4 py-2 text-left font-semibold">
                  Total Amount :
                </td>
                <td className="px-4 py-2 text-right font-semibold">
                  ₹ {Math.round(calculateTotal() - Number(totalDiscount) || 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <hr />
      <div className="px-2 bg-white my-10">
        {/* Checkbox for Payment Confirmation */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="paymentReceived"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            checked={isPaymentReceived}
            onChange={() => {
              setIsPaymentReceived(!isPaymentReceived);
            }}
          />
          <label
            htmlFor="paymentReceived"
            className="ml-2 text-sm font-medium text-gray-700"
          >
            I have received the payment
          </label>
        </div>

        {/* Conditionally Render Table and Totals Section */}
        {isPaymentReceived && (
          <>
            {/* Payment Table */}
            <div className="overflow-x-auto">
              <table className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-101">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-300">
                      PAYMENT MODE
                    </th>
                    <th className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-300">
                      AMOUNT RECEIVED
                    </th>
                    <th className="px-4 py-2 text-sm font-semibold text-gray-600 text-right border border-gray-300">
                      TOTAL BILLABLE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300">
                    {/* Payment Mode Dropdown */}
                    <td className="px-4 py-2 border border-gray-300">
                      <select
                        className="w-full p-2 text-sm border rounded"
                        onChange={handleChange} // Attach the event handler
                        value={selectedPaymentMethod} // Bind the state to the dropdown
                      >
                        {/* <option value="">Select Payment Method</option> */}
                        <option value="Cash">Cash</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Cheque">Cheque</option>
                        <option value="UPI">UPI</option>
                      </select>
                    </td>

                    {/* Deposit To Dropdown */}
                    <td className="px-4 py-2 text-right border border-gray-300">
                    <input
  type="number"
  value={amountReceived}
  placeholder="Enter received amount"
  onChange={handleAmountChange}
  className="w-full p-2 text-sm border rounded text-right placeholder:text-left"
/>

                    </td>

                    {/* Amount Received */}
                    <td className="px-4 py-2 text-right border border-gray-300">
                      <input
                        type="number"
                        value={Math.round(
                          calculateTotal() - Number(totalDiscount) || 0
                        )}
                        disabled
                        className="w-full p-2 text-sm text-right border rounded"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Totals Section */}
            <div className="mt-4">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-gray-600">
                  Total (Rs.):
                </span>
                <span>{amountReceived || 0}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="font-semibold text-gray-600">
                  Balance Amount (Rs.):
                </span>
                <span className="text-red-600 font-medium">
                  {Math.round(
                    Number(calculateTotal() || 0) -
                      Number(totalDiscount || 0) -
                      Number(amountReceived || 0),
                    0 // Ensure no negative balance
                  )}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      <hr />

      {/* Save Button */}
     
      <div className="mt-6 flex justify-between items-center">
  {/* Save Button */}
  <button
    className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center ${
      loading ? "cursor-not-allowed opacity-70" : ""
    }`}
    onClick={() => {
      callCreateAPI(userDetails);
    }}
    disabled={loading} // Disable button while loading
  >
    {loading ? (
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
    ) : BillData.userId === "" ? (
      "Save and Continue"
    ) : (
      "Generate Bill"
    )}
  </button>

  {/* Reset Form Button */}
  <p
    onClick={() => {
      Swal.fire({
        title: "Are you sure?",
        text: "This will clear all the form fields.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, reset it!",
      }).then((result) => {
        if (result.isConfirmed) {
          resetFields(); // Add your reset logic here
          clearAllFields();
          window.scrollTo(0, 0);
        }
      });
    }}
    className="text-red-700 px-3 py-1 cursor-pointer border border-red-700 rounded-3xl hover:bg-red-700 hover:text-white transition-all duration-300 ease-out"
  >
    Reset Form
  </p>
</div>

     
      
      {showVendorForm && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                <CustomerForm
                  onClose={() => setShowVendorForm(false)}
                  fetchCust={() => fetchVendors()}
                  // onSubmit={vendorHandleFormSubmit}
                  // formData={vendorFormData}
                  // inputChange={vendorHandleInputChange}
                  // inputChange2={vendorHandleInputChange2}
                  // copyShipping={copyShipping}
                  // checkboxChange={handleCheckboxChange}
                />
              </div>
            )}
      {showProductForm && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                <ProductForm
                  onClose={() => setShowProductForm(false)}
                  fetchPro={() => fetchProducts()}
                  // onSubmit={vendorHandleFormSubmit}
                  // formData={vendorFormData}
                  // inputChange={vendorHandleInputChange}
                  // inputChange2={vendorHandleInputChange2}
                  // copyShipping={copyShipping}
                  // checkboxChange={handleCheckboxChange}
                />
              </div>
            )}
    </div>
   



  );
};

export default CreateBillPage;
