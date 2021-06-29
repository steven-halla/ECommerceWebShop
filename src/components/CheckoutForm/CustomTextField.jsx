import React from 'react';
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller} from "react-hook-form";

export const FormInput = ({ name, label }) => {
  const { control } = useFormContext();
  return (
    <Grid item xs={12} sm={6}>
      <Controller

        render={({ field }) => <TextField {...field} label={label} fullWidth   required/>}

        defaultValue=""

        control={control}
        name={name}
      />
    </Grid>
  );
}