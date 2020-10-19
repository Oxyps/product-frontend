import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
	primary: { main: '#4F3456', contrastText: '#FFFF' },
	secondary: { main: '#71677C', contrastText: '#FAFAFA' }
};

const themeName = 'Original';

export default createMuiTheme({ palette, themeName });