import { Autocomplete, Grid, Skeleton, TextField } from "@mui/material";
import UseAxios from "../../hooks/UseAxios";
import { VITE_REST_COUNTRIES_API_URL } from "../../constant/Endpoint";

const SelectCountry = (props) => {
  const { value, setValue, label } = props;

  const [data, loaded, error] = UseAxios(
    VITE_REST_COUNTRIES_API_URL
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
    return `${item.flag} ${Object.keys(item.currencies)[0]} - ${
      item.name.common
    }`;
  });

  return (
    <Grid item xs={12} md={3}>
      <Autocomplete
        options={dataCountries}
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
