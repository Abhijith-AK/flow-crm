import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";


const AreaChartC = ({ data, label, value, strokeColor, fillColor, gridColor, lineColor, contentBackground, contentColor, fontColor }) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis stroke={lineColor} tick={{ fill: fontColor }} dataKey={label} />
                <YAxis stroke={lineColor} tick={{ fill: fontColor }} />
                <Tooltip contentStyle={{ backgroundColor: contentBackground, color: contentColor }}
                    itemStyle={{ color: contentColor }} // Default color for items
                    formatter={(value, name) => (
                        <span style={{ color: contentColor, fontWeight: "bold" }}>{value}</span> // Custom color for values
                    )} />
                <Legend />
                <Area dataKey={value} stroke={strokeColor} fill={fillColor} />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default AreaChartC