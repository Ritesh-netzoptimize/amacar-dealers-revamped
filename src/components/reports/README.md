# Interactive Reports System

This implementation provides a scalable, clean React solution for interactive KPI cards that dynamically update charts and insights based on API responses.

## Architecture Overview

### Core Components

1. **ReportDataProvider** - Context provider for managing chart data state
2. **useReportData** - Custom hook for API data management
3. **InteractiveStatsCard** - Clickable KPI cards with loading states
4. **DynamicPieChartContainer** - Chart that updates based on selected KPI
5. **DynamicSmartInsights** - Insights that generate based on selected data

### Key Features

- ✅ **Interactive KPI Cards**: Click to trigger specific API calls
- ✅ **Dynamic Chart Updates**: Only relevant charts update based on selection
- ✅ **Loading States**: Smooth loading animations and states
- ✅ **Clean Separation**: API logic isolated in custom hooks
- ✅ **TailwindCSS Styling**: Consistent design system
- ✅ **Framer Motion**: Smooth animations and transitions
- ✅ **Scalable Architecture**: Easy to add new KPIs and charts

## File Structure

```
src/
├── context/
│   ├── ReportDataContext.js          # Context definition
│   └── ReportDataProvider.jsx        # Context provider component
├── hooks/
│   ├── useReportData.js              # Main data management hook
│   └── useReportDataContext.js       # Context hook
├── components/
│   ├── common/StatsCard/
│   │   └── InteractiveStatsCard.jsx  # Interactive KPI card
│   └── reports/
│       ├── ReportStats.jsx           # Updated stats container
│       ├── DynamicPieChartContainer.jsx  # Dynamic pie chart
│       └── DynamicSmartInsights.jsx  # Dynamic insights
└── pages/dashboard/
    └── Reports.jsx                   # Main reports page
```

## Usage

### 1. Basic Implementation

```jsx
import { ReportDataProvider } from '@/context/ReportDataProvider';
import ReportStats from '@/components/reports/ReportStats';

function App() {
  return (
    <ReportDataProvider>
      <ReportStats 
        startDate="2024-01-01"
        endDate="2024-12-31"
        onKPIClick={(kpi) => console.log('KPI clicked:', kpi)}
      />
    </ReportDataProvider>
  );
}
```

### 2. Adding New KPIs

Update the API mapping in `useReportData.js`:

```javascript
const API_MAPPING = {
  'New KPI': {
    api: 'getNewAPI',
    dataKey: 'newData',
    chartTypes: ['pie', 'line', 'bar', 'insights']
  }
};
```

### 3. Custom Chart Components

Create new dynamic chart components that use the context:

```jsx
import { useReportDataContext } from '@/hooks/useReportDataContext';

const MyDynamicChart = () => {
  const { chartData, isChartLoading, activeKPI } = useReportDataContext();
  
  // Use chartData.myChart for your chart data
  // Use isChartLoading for loading states
  // Use activeKPI for context-aware rendering
};
```

## API Integration

### Current API Mapping

| KPI | API Function | Data Key | Chart Types |
|-----|-------------|----------|-------------|
| Total Sales | getSummaryReport | sales | pie, line, bar, insights |
| Vehicles Sold | getSummaryReport | sales | pie, line, bar, insights |
| Average Sale | getSummaryReport | sales | line, bar, insights |
| Total Bids | getSummaryReport | bids | pie, line, bar, insights |
| Win Rate | getSummaryReport | bids | pie, line, bar, insights |
| Total Customers | getCustomersReport | customers | pie, line, bar, insights |

### Adding New APIs

1. Add API function to `API_FUNCTIONS` in `useReportData.js`
2. Add mapping to `API_MAPPING`
3. Update chart components to handle new data structure

## State Management

### Context State

```javascript
{
  chartData: {
    pie: null,        // Pie chart data
    line: null,       // Line chart data
    bar: null,        // Bar chart data
    insights: null    // Insights data
  },
  isChartLoading: false,
  activeKPI: null,
  error: null
}
```

### Available Actions

- `updateChartData(newData)` - Update specific chart data
- `setLoading(boolean)` - Set loading state
- `setActiveKPIData(kpi)` - Set active KPI
- `setErrorData(error)` - Set error state
- `resetChartData()` - Reset all chart data

## Styling

### Interactive States

- **Default**: White background, neutral colors
- **Hover**: Scale up, shadow increase
- **Active**: Primary colors, ring indicator
- **Loading**: Spinner animation, disabled state

### Animation Variants

```javascript
// Card hover animation
whileHover={{ 
  scale: 1.02,
  transition: { duration: 0.2 }
}}

// Loading animation
animate={{ rotate: 360 }}
transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
```

## Error Handling

- API errors are caught and displayed
- Fallback data provided for failed requests
- Loading states prevent multiple simultaneous requests
- Error boundaries can be added for additional safety

## Performance Considerations

- `useCallback` used for expensive functions
- Context only updates when necessary
- Charts only re-render when data changes
- Loading states prevent unnecessary API calls

## Future Enhancements

1. **Caching**: Add data caching for better performance
2. **Real-time Updates**: WebSocket integration for live data
3. **Export Features**: PDF/Excel export functionality
4. **Custom Filters**: Advanced filtering options
5. **Drill-down**: Click charts to drill into details
6. **Comparison Mode**: Compare multiple KPIs side by side

## Troubleshooting

### Common Issues

1. **Charts not updating**: Check if `chartData` is properly set in context
2. **Loading states stuck**: Ensure `setLoading(false)` is called in all code paths
3. **API errors**: Check API mapping and function names
4. **Styling issues**: Verify TailwindCSS classes are correct

### Debug Mode

Add this to see context state:

```jsx
const { chartData, activeKPI } = useReportDataContext();
console.log('Context state:', { chartData, activeKPI });
```
