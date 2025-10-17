import React from "react";
import { ReportDataProvider } from "@/context/ReportDataProvider";
import ReportsContent from "./ReportsContent";



// Main Reports component with context provider
const Reports = () => {
  return (
    <ReportDataProvider>
      <ReportsContent />
    </ReportDataProvider>
  );
};

export default Reports;
