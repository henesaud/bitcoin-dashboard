const numberFormatter: (value: number) => string = (value: number) => { return Intl.NumberFormat().format(value) }

export default  numberFormatter