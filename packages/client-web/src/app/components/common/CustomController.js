// packages block
import React from 'react';
import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
// styles, constants, utils and interfaces block


/**
 * It takes multiple params to show a customized input field which can have multiple types.
 *
 * @param {boolean} isDisabled - used for disabling custom field (multiple filed types e.g. password, text, email)
 * @param {string} controllerName - used for adding ID and name
 * @param {string} controllerLabel - used for adding label on textfield
 * @param {string} fieldType - used for showing selected options in select field
 * @param {isMultiLine} isMultiLine - used for showing text area
 * @returns JSX Element
 */

export const CustomController = ({ controllerName, controllerLabel, fieldType, isDisabled, isMultiLine, maxLength, rowsLength, readOnly }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={controllerName}
      control={control}
      render={({ field, fieldState: { invalid, error: { message } = {} } }) => (
        <TextField
          type={fieldType}
          margin='dense'
          error={invalid}
          label={controllerLabel}
          disabled={isDisabled}
          rows={isMultiLine ? rowsLength : undefined}
          fullWidth
          {...field}
          helperText={message}
          multiline={isMultiLine}
          variant="outlined"
          inputProps={{
            maxLength: maxLength || undefined,
            readOnly: readOnly ? true : false,
          }}
        />
      )}
    />
  );
};