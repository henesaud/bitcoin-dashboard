import React from "react"
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart, { ChartType, createChartData } from "./Chart";
import { Button, CardContent, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import isResponseOk from "../utils/auth/Api";
import numberFormatter from "../utils/format";

type BtcMetrics = {
    total_volume: number,
    market_cap: number
    mayer_multiple: number
}

const MainDashboard: React.FC = () => {
    const [currency, setCurrency] = React.useState<string>('USD')
    const [days, setDays] = React.useState<number>(100)
    const [filterModalOpened, setFilterModalOpened] = React.useState<boolean>(false)
    const [chartData, setChartData] = React.useState<ChartType>([])
    const [btcMetrics, setBtcMetrics] = React.useState<BtcMetrics>({ total_volume: 0, market_cap: 0, mayer_multiple: 0 })

    const getNewMetricsUrl = (days: number = 100, currency: string = 'usd') => {
        return `http://localhost:8000/api/metrics/main_metrics?days=${days}&currency=${currency}`
    }

    const fetchMetricData = async (metricsUrl: string) => {
        try {
            const response = await fetch(metricsUrl).then()
            const result = await isResponseOk(response)
            if (result) {
                const chart: ChartType = []
                result.prices.forEach((element: Array<any>) => {
                    chart.push(createChartData(element[0], element[1]))
                })
                setChartData(chart)
                setBtcMetrics({
                    total_volume: result.total_volume,
                    market_cap: result.market_cap,
                    mayer_multiple: result.mayer_multiple
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const generateChartParamsForm = (currencyOptions: Array<string>) => {
        return (
            <FormControl fullWidth margin="normal" variant="standard">
                <InputLabel id="id-select-label">Currency</InputLabel>
                <Select
                    labelId="label-currency-select"
                    id="id-currency-select"
                    value={currency}
                    label="Currency"
                    onChange={(event: any) => { setCurrency(event.target.value) }}
                    variant="standard"
                >
                    {
                        currencyOptions.map((element: any) => {
                            return <MenuItem value={element}>{element}</MenuItem>
                        })
                    }
                </Select>

                <TextField
                    id="id-days-field"
                    label="Days"
                    value={days}
                    onChange={(event: any) => { setDays(event.target.value) }}
                    variant="standard"
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                />
            </FormControl>)
    }

    React.useEffect(() => {
        fetchMetricData(getNewMetricsUrl())
    }, [])


    return <>
        <Modal
            open={filterModalOpened}
            onClose={() => { setFilterModalOpened(false) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                borderRadius: "10px",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
            }}>
                {generateChartParamsForm(['USD', 'BRL'])}
                {
                    <Button variant="contained" onClick={() => {
                        const metricsUrl = getNewMetricsUrl(days, currency)
                        fetchMetricData(metricsUrl)
                        setFilterModalOpened(false)
                    }
                    }>Refesh Chart</Button>
                }
            </Box>
        </Modal>

        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                <Toolbar />
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {<Button variant="contained" onClick={() => { setFilterModalOpened(true) }}>Chart Filters</Button>}
                        </Grid>

                        <Grid item xs={8} >
                            <Paper
                                sx={{
                                    p: 5,
                                    display: "flex",
                                    flexDirection: "column",
                                    height: 400,
                                }}
                            >
                                <Chart
                                    chartData={chartData}
                                    header={`Bitcoin Price (${currency})`}
                                />
                            </Paper>
                        </Grid>

                        <Grid item xs={4} >
                            <Paper
                                sx={{
                                    p: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    height: 240,
                                }}
                            >
                                <CardContent>
                                    <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
                                        Metrics
                                    </Typography>
                                    <Typography sx={{ fontSize: 16 }} gutterBottom>
                                        Mayer Multiple: {numberFormatter(btcMetrics.mayer_multiple)}
                                    </Typography>
                                    <Typography sx={{ fontSize: 16 }} gutterBottom>
                                        Market Cap: {numberFormatter(btcMetrics.market_cap)}
                                    </Typography>
                                    <Typography sx={{ fontSize: 16 }} gutterBottom>
                                        Total Volume: {numberFormatter(btcMetrics.total_volume)}
                                    </Typography>
                                </CardContent>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>

    </>
}

export default MainDashboard