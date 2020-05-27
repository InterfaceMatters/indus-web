import { createMuiTheme } from '@material-ui/core/styles';
import { colors } from './colors';
import { typography } from './typography';

const defaultTheme = createMuiTheme();

const muiTheme = createMuiTheme({
  palette: {
    ...colors
  },
  typography: {
    ...typography
  },
  shape: {
    borderRadius: 1
  },

  // Component style overrides

  overrides: {
    MuiAppBar: {
      root: {
        height: '56px',
        boxShadow: 'inset 0 -1px 0 0 #EEEEEE'
      },
      colorDefault: {
        backgroundColor: colors.common.white
      }
    },
    MuiBadge: {
      badge: {
        backgroundColor: colors.success.main
      }
    },
    MuiButton: {
      root: {
        textTransform: 'capitalize',
        backgroundColor: colors.grey[200],
        color: colors.grey[500]
      },
      containedPrimary: {
        color: colors.common.white
      },
      outlined: {
        backgroundColor: 'transparent',
        border: `solid 1px ${colors.grey[200]}`,
        color: colors.common.black
      },
      label: {
        height: '100%'
      },
      sizeSmall: {
        height: '28px'
      }
    },
    MuiChip: {
      root: {
        padding: '9px 9px',
        color: colors.grey[500],
        fontSize: '13px',
        backgroundColor: colors.grey[200]
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: colors.grey[200]
      }
    },
    MuiDialog: {
      paper: {
        width: '460px',
        height: '574px'
      }
    },
    MuiFormControl: {
      root: {
        '& > .MuiInput-underline::before': {
          borderBottom: 'none'
        }
      }
    },
    MuiInputBase: {
      root: {
        backgroundColor: colors.grey[100],
        paddingLeft: '12px',
        paddingRight: '12px',
        border: `solid 1px ${colors.grey[200]}`,
        borderRadius: '2px',
        fontSize: '14px',
        '&.MuiInputBase-multiline': {
          backgroundColor: 'transparent',
          border: 'none'
        },
        '&.MuiInput-underline:hover:not(.Mui-disabled):before': {
          borderBottom: 'none'
        },
        '&.MuiInput-underline.Mui-focused:after': {
          borderBottom: 'none'
        },
        '&.MuiInput-underline:after': {
          borderBottom: 'none'
        },
        '&.MuiInput-formControl': {
          marginTop: '12px'
        }
      },
      input: {
        paddingTop: '8px',
        paddingBottom: '8px'
      }
    },
    MuiMenu: {
      paper: {
        borderRadius: '2px',
        '@media (min-width: 1024px)': {
          minWidth: '240px'
        }
      }
    },
    MuiMenuItem: {
      root: {
        padding: defaultTheme.spacing(2, 4),
        paddingTop: defaultTheme.spacing(2),
        paddingBottom: defaultTheme.spacing(2)
      }
    },
    MuiPopover: {
      paper: {
        boxShadow: `inset 0 -1px 0 0 ${colors.grey[200]}, 0 0 2px 0 rgba(0, 0, 0, 0.1)`,
        borderRadius: '2px'
      }
    },
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: 'transparent'
        }
      }
    },
    MuiSwitch: {
      root: {
        width: 36,
        height: 22,
        padding: 0,
        '& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track': {
          backgroundColor: colors.primary.main,
          opacity: 1
        }
      },
      thumb: {
        backgroundColor: colors.common.white
      },
      switchBase: {
        padding: 1,
        height: '100%',
        '& + $track': {
          borderRadius: '40px'
        },
        '&$checked': {
          transform: 'translateX(14px)',
          '& + track': {
            backgroundColor: colors.primary.main,
            opacity: 1
          }
        }
      },
      track: {
        backgroundColor: '#e57373',
        opacity: 1
      }
    },
    MuiTab: {
      root: {
        textTransform: 'capitalize',
        fontSize: '14px',
        padding: '6px 12px 6px 6px',
        marginRight: `33px`,
        '@media (min-width: 600px)': {
          minWidth: '40px'
        }
      },
      textColorPrimary: {
        '&.Mui-selected': {
          color: colors.common.black
        }
      }
    },

    MuiTableCell: {
      root: {
        padding: '5px 0px',
        borderBottom: `solid 1px ${colors.grey[200]}`
      },
      body: {
        color: colors.common.black,
        fontSize: '15px'
      }
    },
    MuiTabs: {
      root: {
        height: '100%'
      },

      indicator: {
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        paddingLeft: '10px',
        marginLeft: '-10px',
        backgroundColor: 'transparent',
        '&::before': {
          zIndex: '99',
          content: '" "',
          position: 'absolute',
          display: 'block',

          bottom: '-10%',
          maxWidth: '40px',
          borderRadius: '20px',
          height: '4px',
          width: '100%',
          backgroundColor: colors.primary.main
        }
      },
      flexContainer: {
        height: '100%'
      }
    },
    MuiToolbar: {
      root: {
        height: '100%'
      },
      regular: {
        '@media (min-width: 600px)': {
          minWidth: '100%'
        }
      }
    }
  }
});

export default muiTheme;
