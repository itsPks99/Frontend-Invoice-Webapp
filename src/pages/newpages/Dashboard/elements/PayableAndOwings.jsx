import React from "react";

export const PayableAndOwings = ({bgColor, textColor}) => {
  return (
    <div
      style={{
        height: "auto",
        width: "100%",
        // maxWidth: "715px",
        borderRadius: "15px",
        backgroundColor: bgColor || "#000000",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Title */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "10px",
          borderBottom: "1px solid darkgray",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            color: textColor|| "#FFFFFF",
            fontFamily: "Inter-SemiBold, Helvetica",
            fontSize: "24px",
            fontWeight: "500",
          }}
        >
          Invoices payable to you
        </h2>
        <button
          style={{
            backgroundColor: "#FFFFFF",
            color: textColor || "#000000",
            borderRadius: "50%",
            border: "none",
            width: "42px",
            height: "42px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: "30px", fontWeight: "300" }}>↻</span>
        </button>
      </div>

      {/* Table Rows */}
      <div>
        {[
          { label: "Coming due", value: "₹0.00" },
          { label: "1-30 days overdue", value: "₹0.00" },
          { label: "31-60 days overdue", value: "₹6,180.00" },
          { label: "61-90 days overdue", value: "₹20,000.00" },
          { label: "> 90 days overdue", value: "₹4,42,674.10" },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: index !== 4 ? "1px solid #333333" : "none",
            }}
          >
            <span
              style={{
                color: textColor || "#E9E9E9",
                fontSize: "24px",
                fontWeight: "400",
                fontFamily: "Inter, Helvetica",
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                color: textColor || "#E9E9E9",
                fontSize: "24px",
                fontWeight: "400",
                fontFamily: "Inter, Helvetica",
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayableAndOwings;