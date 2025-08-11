import React from "react";
import { Chip } from "@mui/material";

export default function ChipPriority({ label, filter = () => {} }) {
  function handelPriortyBg(priorty) {
    switch (priorty) {
      case "High":
        return "#FECACA";
      case "Medium":
        return "#FEF3C7";
      case "Low":
        return "#D1FAE5";
      default:
        return "#ffffff";
    }
  }
  function handelPriortyTextColor(priorty) {
    switch (priorty) {
      case "High":
        return "#991B1B";
      case "Medium":
        return "#92400E";
      case "Low":
        return "#065F46";
      default:
        return "#000000";
    }
  }
  return (
    <>
      {" "}
      <Chip
        label={label}
        sx={{
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          backgroundColor: handelPriortyBg(label),
          color: handelPriortyTextColor(label),
          fontWeight: "bold",
          cursor: "pointer",
          marginLeft: "10px",
        }}
        onClick={filter}
      />
    </>
  );
}
