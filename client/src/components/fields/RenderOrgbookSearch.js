import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import fetch from "cross-fetch";
import { ErrorMessage } from "formik";
import React, { Fragment } from "react";
import { InputFieldError, InputFieldLabel } from "../generic";

export const RenderOrgbookSearch = ({ field, form, label, ...props }) => {
  const touched = form.touched[field.name];
  const error = form.errors[field.name];
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  async function searchOrgbook(value) {
    if (!value || value.length < 1) return;

    setOpen(true);

    const response = await fetch(
      `https://orgbook.gov.bc.ca/api/v2/search/autocomplete?q=${encodeURIComponent(
        value
      )}&inactive=false&latest=true&revoked=false`
    );

    const entries = await response.json();

    const mappedEntries = entries.results.map((entry) => {
      // there will only ever be 1 result in the names array
      return Object.assign({
        name: entry.names[0].text,
        value: entry.names[0].text,
      });
    });

    setOptions(mappedEntries);
  }

  return (
    <Fragment>
      {label && <InputFieldLabel label={label} />}
      <Autocomplete
        id="orgbook-search"
        fullWidth
        freeSolo
        autoComplete
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onChange={(event, value, reason) => {
          field.value = value.value;
        }}
        onInputChange={(event, value, reason) => {
          searchOrgbook(value);
        }}
        getOptionSelected={(option, value) => option.value === value.value}
        getOptionLabel={(option) => option.name || ""}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Start typing to search the OrgBook database"
            variant="filled"
            fullWidth
            error={touched && !!error}
            value={field.value || ""}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }}
            {...props}
          />
        )}
      />
      <InputFieldError error={<ErrorMessage name={field.name} />} />
    </Fragment>
  );
};
