import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Area, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

const RadarChartC = ({ data, label, value, strokeColor, fillColor, gridColor, lineColor, contentBackground, contentColor, fontColor }) => {
  return (
      <ResponsiveContainer width="100%" height={350}>
          <RadarChart outerRadius="80%" data={data}>
              <PolarGrid strokeDasharray="3 3" stroke={gridColor} />
              <PolarAngleAxis stroke={lineColor} tick={{ fill: fontColor }} dataKey={label} />
              <Tooltip contentStyle={{ backgroundColor: contentBackground, color: contentColor }}
                  itemStyle={{ color: contentColor }} // Default color for items
                  formatter={(value, name) => (
                      <span style={{ color: contentColor, fontWeight: "bold" }}>{value}</span> // Custom color for values
                  )} />
              <Legend />
              <Radar name={label} dataKey={value} stroke={strokeColor} fill={fillColor} fillOpacity={0.6} />
          </RadarChart>
      </ResponsiveContainer>
  )
}

export default RadarChartC