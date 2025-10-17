import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle, 
  Info,
  Loader2
} from "lucide-react";
import { useReportDataContext } from "@/hooks/useReportDataContext";

const DynamicSmartInsights = ({ startDate, endDate }) => {
  const { chartData, isChartLoading, activeKPI } = useReportDataContext();
  const [insights, setInsights] = useState([]);

  const generateInsights = useCallback((data, kpi) => {
    const insights = [];
    
    if (!data) return insights;

    // Generate insights based on the data type and KPI
    if (Array.isArray(data)) {
      // Process array data
      const total = data.reduce((sum, item) => sum + (item.count || item.value || 0), 0);
      const maxItem = data.reduce((max, item) => 
        (item.count || item.value || 0) > (max.count || max.value || 0) ? item : max
      , data[0] || {});

      if (total > 0) {
        insights.push({
          type: "success",
          icon: CheckCircle,
          title: "Data Analysis Complete",
          description: `Total count: ${total.toLocaleString()}`,
          trend: "positive"
        });

        if (maxItem && maxItem.category) {
          insights.push({
            type: "info",
            icon: Info,
            title: "Top Performer",
            description: `${maxItem.category} leads with ${maxItem.count || maxItem.value} items`,
            trend: "neutral"
          });
        }
      }
    } else if (typeof data === 'object') {
      // Process object data
      const entries = Object.entries(data);
      const total = entries.reduce((sum, [key, value]) => sum + (typeof value === 'number' ? value : 0), 0);
      
      if (total > 0) {
        insights.push({
          type: "success",
          icon: CheckCircle,
          title: "Data Available",
          description: `Total value: ${total.toLocaleString()}`,
          trend: "positive"
        });

        const topEntry = entries.reduce((max, [key, value]) => 
          (typeof value === 'number' ? value : 0) > (typeof max[1] === 'number' ? max[1] : 0) ? [key, value] : max
        , entries[0] || []);

        if (topEntry[0]) {
          insights.push({
            type: "info",
            icon: Info,
            title: "Highest Value",
            description: `${topEntry[0].replace(/_/g, ' ')}: ${topEntry[1]}`,
            trend: "neutral"
          });
        }
      }
    }

    // Add KPI-specific insights
    if (activeKPI) {
      insights.push({
        type: "info",
        icon: Info,
        title: "KPI Analysis",
        description: `Currently analyzing: ${activeKPI}`,
        trend: "neutral"
      });
    }

    return insights;
  }, [activeKPI]);

  useEffect(() => {
    if (chartData.insights) {
      const processedInsights = generateInsights(chartData.insights, activeKPI);
      setInsights(processedInsights);
    }
  }, [chartData.insights, activeKPI, generateInsights]);

  const getInsightStyles = (type) => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          icon: "text-green-600",
          title: "text-green-800",
          description: "text-green-700"
        };
      case "warning":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          icon: "text-yellow-600",
          title: "text-yellow-800",
          description: "text-yellow-700"
        };
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          icon: "text-red-600",
          title: "text-red-800",
          description: "text-red-700"
        };
      default:
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          icon: "text-blue-600",
          title: "text-blue-800",
          description: "text-blue-700"
        };
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "positive":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "negative":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  if (isChartLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
            <p className="text-neutral-600">Generating insights...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!chartData.insights || insights.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Smart Insights</h3>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Info className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600">Click a KPI card to generate insights</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-neutral-800">Smart Insights</h3>
        {activeKPI && (
          <div className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
            {activeKPI}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => {
          const styles = getInsightStyles(insight.type);
          const Icon = insight.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`${styles.bg} ${styles.border} border rounded-lg p-4`}
            >
              <div className="flex items-start space-x-3">
                <div className={`${styles.icon} flex-shrink-0 mt-0.5`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`${styles.title} font-medium text-sm mb-1`}>
                    {insight.title}
                  </h4>
                  <p className={`${styles.description} text-sm`}>
                    {insight.description}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  {getTrendIcon(insight.trend)}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {activeKPI && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="mt-6 pt-4 border-t border-neutral-200"
        >
          <p className="text-xs text-neutral-500 text-center">
            Insights generated for {activeKPI} • {new Date().toLocaleTimeString()}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default DynamicSmartInsights;
