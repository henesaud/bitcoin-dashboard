import React, { useState } from "react"
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import isResponseOk from "../utils/auth/Api";
import Dict from "../utils/types";
import Swal from "sweetalert2";
import copyTextToClipboard from "../utils/others";


const Conversions: React.FC = () => {
    const [conversionFormData, setConversionFormData] = useState<Dict>({
        targetPrefix: 'xpub',
        publicKey: '',
        convertedKey: ''
    })
    const [targetKeyTypes, setTargetKeyTypes] = useState<Array<string>>([])

    React.useEffect(() => {
        const fetchKeyTypes = async () => {
            const url = `http://localhost:8000/api/tools/pk_types`
            const response = await fetch(url).then()
            const result = await isResponseOk(response)
            if (result) {
                setTargetKeyTypes(result)
            }
        }
        fetchKeyTypes()
    }, [])

    const fetchData = async (conversionFormData: Dict) => {
        if (conversionFormData.targetPrefix && conversionFormData.publicKey) {
            const url = `http://localhost:8000/api/tools/pk_converter?target_prefix=${conversionFormData.targetPrefix}&key=${conversionFormData.publicKey}`
            const response = await fetch(url).then()
            const result = await isResponseOk(response)
            if (result) {
                setConversionFormData({
                    ...conversionFormData,
                    convertedKey: result
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Please, fill all the fields.'
            })
        }
    }

    const handleChange = (e: any) => {
        setConversionFormData((prev: Dict) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    return <>
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
                <Container  >
                    <Grid container spacing={1}>
                        <Grid item xs={20} >
                            <Paper
                                sx={{
                                    p: 5,
                                    display: "flex",
                                    flexDirection: "column",
                                    height: 400,
                                }}
                            >
                                <FormControl
                                    margin="normal" variant="standard">
                                    <InputLabel id="id-select-label">Target Key Type</InputLabel>
                                    <Select
                                        id="id-key-select"
                                        name='targetPrefix'
                                        value={conversionFormData.targetPrefix}
                                        onChange={handleChange}
                                        variant="standard"
                                    >
                                        {
                                            targetKeyTypes.map((element: any) => {
                                                return <MenuItem value={element}>{element}</MenuItem>
                                            })
                                        }
                                    </Select>
                                    <TextField
                                        id="id-key-field"
                                        name="publicKey"
                                        label="Public Key"
                                        value={conversionFormData.publicKey}
                                        onChange={handleChange}
                                        variant="standard"
                                        type="text"
                                    />
                                    <Button
                                        variant="contained"
                                        sx={{ marginY: 4, marginX: 52 }}
                                        onClick={() => { fetchData(conversionFormData) }}>Convert Key
                                    </Button>
                                    <TextField
                                        id="id-converted-field"
                                        name="convertedKey"
                                        label="Converted Key"
                                        value={conversionFormData.convertedKey}
                                        variant="standard"
                                        type="text"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                    <Button
                                        variant="outlined"
                                        sx={{ marginY: 4, marginX: 52 }}
                                        onClick={() => {
                                            copyTextToClipboard(conversionFormData.convertedKey.toString())
                                        }}>
                                        Copy key
                                    </Button>
                                </FormControl>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    </>
}

export default Conversions