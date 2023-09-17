import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts";
import Title from "./Title";
import numberFormatter from "../utils/format";


export type ChartType = {
    time: string,
    amount?: number
}[]

type ChartProps = {
    chartData: ChartType,
    header: string
}



const Chart: React.FC<ChartProps> = ({ chartData, header }) => {
    const theme = useTheme();
    return (
        <>
            <Title>{header}</Title>
            <ResponsiveContainer>
                <LineChart
                    data={chartData}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip
                        formatter={numberFormatter} />
                    <XAxis
                        dataKey="time"
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    />
                    <YAxis
                        tickCount={4}
                        tickFormatter={numberFormatter}
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                        domain={[(dataMin: number) => (dataMin * (0.95)), (dataMax: any) => (dataMax * (1.05))]}
                    >
                    </YAxis>
                    <Line
                        activeDot={{ r: 8 }}
                        isAnimationActive={true}
                        type="monotone"
                        dataKey="amount"
                        stroke={theme.palette.primary.main}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}

export default Chart