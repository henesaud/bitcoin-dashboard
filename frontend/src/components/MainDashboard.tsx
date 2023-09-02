import React from "react"
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart, { ChartType } from "./Chart";
import { Button, CardContent, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import isResponseOk from "../utils/auth/Api";
import numberFormatter from "../utils/Format";

type BtcMetrics = {
    total_volume: number,
    market_cap: number

}

const MainDashboard: React.FC = () => {
    const [currency, setCurrency] = React.useState<string>('USD')
    const [days, setDays] = React.useState<number>(100)
    const [filterModalOpened, setFilterModalOpened] = React.useState<boolean>(false)
    const [chartDataUrl, setChartDataUrl] = React.useState<string>('http://localhost:8000/api/btc/metrics?days=100')
    const setNewChartUrl = (days: number, currency: string) => {
        setChartDataUrl(`http://localhost:8000/api/btc/metrics?days=${days}&currency=${currency}`)
    }
    const [chartData, setChartData] = React.useState<ChartType>([])
    const [btcMetrics, setBtcMetrics] = React.useState<BtcMetrics>({ total_volume: 0, market_cap: 0 })

    function createData(time: string, amount?: number) {
        return { time, amount };
    }
    React.useEffect(() => {
        const fecthChart = async () => {
            const response = await fetch(chartDataUrl).then(isResponseOk)
            const chart: ChartType = []
            if (response) {
                response.prices.forEach((element: Array<any>) => {
                    chart.push(createData(element[0], element[1]))
                });
                setChartData(chart)
                setBtcMetrics(
                    { total_volume: response.total_volume, market_cap: response.market_cap }
                )
            }
        }
        try {
            fecthChart()
        } catch (error: any) {
            console.log(error)
        }

    }, [chartDataUrl])

    const generateCurrencyForm = (currencyOptions: Array<string>) => {
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
                {generateCurrencyForm(['USD', 'BRL'])}
                {
                    <Button variant="contained" onClick={() => {
                        setNewChartUrl(days, currency);
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
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            {<Button variant="contained" onClick={() => { setFilterModalOpened(true) }}>Chart Filters</Button>}
                        </Grid>

                        <Grid item xs={12} md={8} lg={9}>
                            <Paper
                                sx={{
                                    p: 2,
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

                        <Grid item xs={12} md={4} lg={3}>
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
                                        Last 24h Metrics
                                    </Typography>
                                    <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                        Market Cap: {numberFormatter(btcMetrics.market_cap)}
                                    </Typography>
                                    <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                        Total Volume: {numberFormatter(btcMetrics.total_volume)}
                                    </Typography>
                                </CardContent>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                                {/* <comonent here /> */}
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>

    </>
}

export default MainDashboard