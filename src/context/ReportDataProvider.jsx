import React, { useState, useCallback } from 'react';
import { ReportDataContext } from './ReportDataContext';

export const ReportDataProvider = ({ children }) => {
  const [chartData, setChartData] = useState({
    pie: null,
    line: null,
    bar: null,
    insights: null
  });
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [activeKPI, setActiveKPI] = useState(null);
  const [error, setError] = useState(null);

  const updateChartData = useCallback((newData) => {
    setChartData(prev => ({
      ...prev,
      ...newData
    }));
  }, []);

  const setLoading = useCallback((loading) => {
    setIsChartLoading(loading);
  }, []);

  const setActiveKPIData = useCallback((kpi) => {
    setActiveKPI(kpi);
  }, []);

  const setErrorData = useCallback((error) => {
    setError(error);
  }, []);

  const resetChartData = useCallback(() => {
    setChartData({
      pie: null,
      line: null,
      bar: null,
      insights: null
    });
    setActiveKPI(null);
    setError(null);
  }, []);

  const value = {
    chartData,
    isChartLoading,
    activeKPI,
    error,
    updateChartData,
    setLoading,
    setActiveKPIData,
    setErrorData,
    resetChartData
  };

  return (
    <ReportDataContext.Provider value={value}>
      {children}
    </ReportDataContext.Provider>
  );
};
