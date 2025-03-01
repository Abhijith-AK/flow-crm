import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import React from 'react'

const LineChartC = ({ data, value, strokeColor, gridColor, lineColor, contentBackground, contentColor, fontColor }) => {
    return (
        // responsive container
        <ResponsiveContainer width="100%" height={300}>
            {/* Line Chart */}
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                {/* background grid */}
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                {/* Xaxis with names as labels */}
                <XAxis stroke={lineColor} tick={{ fill: fontColor }} dataKey="name" />
                {/* Yaxis */}
                <YAxis stroke={lineColor} tick={{ fill: fontColor }} />
                {/* shows details on hover */}
                <Tooltip contentStyle={{ backgroundColor: contentBackground, color: contentColor }}  />
                {/* Displays series names & colors */}
                <Legend  />
                {/*  Line Component */}
                {/* 
                    type="monotone" → Creates a smooth curve.
                    dataKey="values" → Plots values from values.
                    stroke="#8884d8" → Sets line color.
                    strokeWidth={2} → Defines line thickness. 
                */}
                <Line type="monotone" dataKey={value} stroke={strokeColor} strokeWidth={2} />

            </LineChart>
        </ResponsiveContainer>
    )
}

export default LineChartC