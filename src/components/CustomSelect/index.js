import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import { Select as MuiSelect } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import commonStyles from '../../theme/commonStyles';
import { marginGenerator } from '../../theme/utils';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(0, 2, 0, 0)
  },
  formLabel: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.common.white,
    paddingLeft: '1px',
    paddingRight: '1px'
  },
  select: {
    padding: theme.spacing(1, 2)
  },
  small: {
    paddingRight: 0
  }
}));

const CustomSelect = ({
  val = '' || [],
  handleChange,
  options,
  label,
  IconComponent,
  defaultValue,
  styleOverrides,
  selectOverrides,
  selectClassName,
  disabled = false,
  selectStyle,
  small = true,
  multiple = false
}) => {
  const classes = useStyles();
  const commonClasses = commonStyles();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl
      className={classes.formControl}
      disabled={disabled}
      style={styleOverrides}>
      <InputLabel
        ref={inputLabel}
        id={`select-${label}`}
        className={label ? classes.formLabel : ''}>
        {IconComponent && (
          <Icon
            component={() => (
              <IconComponent
                className={commonClasses.iconRegular}
                style={marginGenerator('mr-8')}
              />
            )}
          />
        )}
        <Typography variant={'subtitle2'} color={'textPrimary'}>
          {label}
        </Typography>
      </InputLabel>
      <MuiSelect
        labelId={`label-${label}`}
        id={`select-${label}`}
        value={val}
        defaultValue={defaultValue}
        multiple={multiple}
        className={selectClassName}
        style={selectOverrides}
        onChange={handleChange}
        classes={{
          outlined: selectStyle ? classes.select : '',
          select: small ? classes.small : ''
        }}
        labelWidth={labelWidth}>
        <MenuItem value="" disabled={multiple}>
          <em>None</em>
        </MenuItem>
        {options &&
          options.map((item, index) => (
            <MenuItem key={index} value={item.id || item}>
              {item.name || item}
            </MenuItem>
          ))}
      </MuiSelect>
    </FormControl>
  );
};

CustomSelect.prototypes = {
  val: PropTypes.any.isRequired,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  styleOverrides: PropTypes.object,
  disabled: PropTypes.bool,
  IconComponent: PropTypes.node.isRequired,
  selectStyle: PropTypes.bool,
  multiple: PropTypes.bool
};

export default CustomSelect;
