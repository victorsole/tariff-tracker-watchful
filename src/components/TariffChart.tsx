import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { month: 'Jan', us: 12.5, china: 8.3, eu: 4.2, mexico: 6.1 },
  { month: 'Feb', us: 13.2, china: 9.1, eu: 4.5, mexico: 6.3 },
  { month: 'Mar', us: 15.8, china: 12.4, eu: 5.1, mexico: 7.2 },
  { month: 'Apr', us: 18.3, china: 15.7, eu: 5.8, mexico: 8.1 },
  { month: 'May', us: 21.2, china: 18.9, eu: 6.2, mexico: 8.9 },
  { month: 'Jun', us: 23.1, china: 22.3, eu: 7.1, mexico: 9.5 },
  { month: 'Jul', us: 24.8, china: 25.1, eu: 7.8, mexico: 10.2 },
  { month: 'Aug', us: 25.5, china: 26.8, eu: 8.3, mexico: 10.8 },
  { month: 'Sep', us: 26.2, china: 28.1, eu: 8.9, mexico: 11.3 },
  { month: 'Oct', us: 25.8, china: 27.5, eu: 9.2, mexico: 11.1 },
  { month: 'Nov', us: 24.9, china: 26.8, eu: 9.0, mexico: 10.9 },
  { month: 'Dec', us: 24.2, china: 25.9, eu: 8.7, mexico: 10.5 },
];

export const TariffChart = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="month" 
            className="text-xs"
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            className="text-xs"
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.08)'
            }}
            formatter={(value: any) => [`${value}%`, '']}
          />
          <Line 
            type="monotone" 
            dataKey="us" 
            stroke="#1e3a8a" 
            strokeWidth={3}
            dot={{ fill: '#1e3a8a', strokeWidth: 2, r: 4 }}
            name="United States"
          />
          <Line 
            type="monotone" 
            dataKey="china" 
            stroke="#dc2626" 
            strokeWidth={3}
            dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
            name="China"
          />
          <Line 
            type="monotone" 
            dataKey="eu" 
            stroke="#059669" 
            strokeWidth={3}
            dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
            name="European Union"
          />
          <Line 
            type="monotone" 
            dataKey="mexico" 
            stroke="#d97706" 
            strokeWidth={3}
            dot={{ fill: '#d97706', strokeWidth: 2, r: 4 }}
            name="Mexico"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};