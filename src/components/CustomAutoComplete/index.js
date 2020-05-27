import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

function CustomAutoComplete({
  options,
  value,
  label,
  styleOverrides,
  handleChange,
  handleAddNewTag,
  id,
  multiple = false,
  placeholder
}) {
  const [text, setText] = useState('');

  return (
    <Autocomplete
      id={id}
      options={options}
      getOptionLabel={option => option || option.title}
      multiple={multiple}
      onChange={handleChange}
      value={value}
      noOptionsText="Not found, press enter to add."
      onKeyPress={evt => {
        if (evt.key === 'Enter') {
          handleAddNewTag(evt, text);
        }
      }}
      style={styleOverrides}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          onChange={evt => setText(evt.target.value)}
        />
      )}
    />
  );
}

export default CustomAutoComplete;
