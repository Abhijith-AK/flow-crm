import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";


const BarChartC = ({ data, label, value, strokeColor, gridColor, lineColor, contentBackground, contentColor, fontColor }) => {
    return (
        <ResponsiveContainer width="100%" height={175}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis stroke={lineColor} tick={{ fill: fontColor }} dataKey={label} />
                <YAxis stroke={lineColor} tick={{ fill: fontColor }} />
                <Tooltip contentStyle={{ backgroundColor: contentBackground, color: contentColor }}
                    itemStyle={{ color: contentColor }} // Default color for items
                    formatter={(value, name) => (
                        <span style={{ color: contentColor, fontWeight: "bold" }}>{value}</span> // Custom color for values
                    )} />
                <Legend />
                <Bar dataKey={value} fill={strokeColor} />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default BarChartC