import { useContext } from 'react';
import { ReportDataContext } from '@/context/ReportDataContext';

export const useReportDataContext = () => {
  const context = useContext(ReportDataContext);
  if (!context) {
    throw new Error('useReportDataContext must be used within a ReportDataProvider');
  }
  return context;
};
