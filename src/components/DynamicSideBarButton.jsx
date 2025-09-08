import React, { useState } from "react";
import PropTypes from "prop-types";
import iconParkOutlineDown from "../assets/navIcons/icon-park-outline_down.svg";

const DynamicSideBarButton = ({ label, icon, showDropdown = false, onClick}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center h-16 px-0 relative cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        backgroundColor:  "transparent", // Change background on hover
        borderRadius: "8px", // Rounded corners
      }}
    >
      {/* Blue Line */}
      {isHovered && (
        <div
          style={{
            backgroundColor: "#1e57d9",
            height: "100%",
            width: "5px",
            position: "absolute",
            left: 0,
            top: 0,
          }}
        ></div>
      )}

      {/* Icon */}
      <img
        src={icon}
        alt={`${label} Icon`}
        className="ml-3"
        style={{
          height: "30px",
          width: "30px",
        }}
      />

      {/* Label */}
      <span
        className="ml-4 text-white font-medium"
        style={{
          fontSize: "20px",
          color: isHovered ? "#ffffff" : "#f8f8f8", // Change text color on hover
        }}
      >
        {label}
      </span>

      {/* Dropdown Icon */}
      {showDropdown && (
        <img
          src={iconParkOutlineDown}
          alt="Dropdown Icon"
          style={{
            height: "30px",
            width: "30px",
            marginLeft: "auto",
            visibility: isHovered ? "visible" : "hidden", // Show on hover
            marginRight: "0px",
          }}
        />
      )}
    </div>
  );
};

DynamicSideBarButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  showDropdown: PropTypes.bool,
};

export default DynamicSideBarButton;