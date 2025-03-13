import { Autocomplete, Box, TextField } from '@mui/material';
import React from 'react'

const CurrencySelect = ({currencies}) => {
  return (
   
    <Autocomplete
    id="currency-select-by-country"
    sx={{ width: 300 }}
    options={currencies}
    autoHighlight
    getOptionLabel={(option) => option?.name?.common}
    renderOption={(props, option) => {
      const { key, ...optionProps } = props;
      const symbol = option?.currencies && Object.values(option?.currencies);
      console.log(symbol)
      return (
        <Box
          key={key}
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...optionProps}
        >
          <img
            loading="lazy"
            width="20"
            srcSet={`https://flagcdn.com/w40/${option?.cca3?.toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w20/${option?.cca3?.toLowerCase()}.png`}
            alt=""
          />
          {option?.name?.common} 
          {/* + {symbol} */}
        </Box>
      );
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Choose a country"
        slotProps={{
          htmlInput: {
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          },
        }}
      />
    )}
  />

  )
}

export default CurrencySelect;

