import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const RadialPieChartC = ({ data, contentBackground, contentColor }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                {/* Tooltip for showing details when hovering over a segment */}
                <Tooltip
                    contentStyle={{ backgroundColor: contentBackground, color: contentColor }}
                    itemStyle={{ color: contentColor }}
                    formatter={(value) => (
                        <span style={{ fontWeight: "bold" }}>{value}</span>
                    )}
                />

                <Legend />

                {/* Pie chart with radial layout */}
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50} // Inner radius for radial effect
                    outerRadius={100} // Outer radius defining size
                    fill="#8884d8"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default RadialPieChartC;