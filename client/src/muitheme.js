import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const baseTheme = {
  typography: {
    useNextVariants: true,
    button: {
      fontWeight: 600
    }
  }
};

export const MUI_LIGHT_THEME = responsiveFontSizes(
  createMuiTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      primary: {
        // main: '#80cbc4'
        main: '#AC0C79'
      },
      secondary: { main: '#0cac3f' },
      type: 'light',
      background: {
        default: '#f4f4f4'
      }
    }
  })
);

export const MUI_DARK_THEME = responsiveFontSizes(
  createMuiTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      primary: {
        main: '#a7ffeb'
      },
      secondary: {
        main: '#ffa7bc'
      },
      type: 'dark',
      background: {
        default: '#212121',
        paper: '#333'
      }
    }
  })
);
