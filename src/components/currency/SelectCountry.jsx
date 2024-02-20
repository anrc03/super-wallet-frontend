import { Autocomplete, Grid, Skeleton, TextField } from "@mui/material";
import useAxios from "../../hooks/useAxios";

const SelectCountry = (props) => {
  const { value, setValue, label } = props;

  const [data, loaded, error] = useAxios(
    import.meta.env.VITE_REST_COUNTRIES_API_URL
  );

  if (loaded) {
    return (
      <Grid item xs={12} md={3}>
        <Skeleton variant="rounded" height={60} />  
      </Grid>
    );
  }

  if (error) {
    return "Something went wrong";
  }

  const dataFilter = data.filter((item) => "currencies" in item);
  const dataCountries = dataFilter.map((item) => {
    let currencyKey = Object.keys(item.currencies)[0];
    let symbol = item.currencies[currencyKey].symbol;

    return `${item.flag} ${currencyKey} - ${item.name.common} (${symbol})`;
  });


  return (
    <Grid item xs={12} md={3}>
      <Autocomplete
        options={dataCountries}
        disableClearable
        renderInput={(params) => <TextField {...params} label={label} />}
        value={value ?? ""}
        onChange={(event, newValue) => {
          setValue(newValue ?? "");
        }}
      />
    </Grid>
  );
};

export default SelectCountry;
