import { createMuiTheme } from '@material-ui/core/styles';
import mainTheme from 'themes/mainTheme';

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: mainTheme.color.primary,
    },
    secondary: {
      main: mainTheme.color.secondary,
    },
    text: {
      primary: mainTheme.color.textPrimary,
      secondary: mainTheme.color.textSecondary,
    },
    background: {
      default: mainTheme.color.backPrimary,
      paper: mainTheme.color.backSecondary,
    }
  },
  typography: {
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeightRegular: mainTheme.fontWeight.normal,
    fontWeightMedium: mainTheme.fontWeight.bold,
    fontWeightBold: mainTheme.fontWeight.black,
  }
})

export default muiTheme;