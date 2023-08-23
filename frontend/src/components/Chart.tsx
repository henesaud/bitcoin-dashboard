import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts";
import Title from "./Title";
import isResponseOk from "../utils/auth/Api";
import numberFormatter from "../utils/Format";


type ChartType = {
    time: string,
    amount?: number
}[]

type ChartProps = {
    chartDataUrl: string,
    header: string
}

function createData(time: string, amount?: number) {
    return { time, amount };
}

const Chart: React.FC<ChartProps> = ({ chartDataUrl, header }) => {
    const theme = useTheme();
    const [chartData, setChartData] = React.useState<ChartType>([])

    React.useEffect(() => {
        const fecthChart = async () => {
            const response = await fetch(chartDataUrl).then(isResponseOk)
            const chart: ChartType = []
            if (response) {
                response.forEach((element: Array<any>) => {
                    chart.push(createData(element[0], element[1]))
                });
                setChartData(chart)
            }
        }
        try {
            fecthChart()
        } catch (error: any) {
            console.log(error)
        }

    }, [chartDataUrl])

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