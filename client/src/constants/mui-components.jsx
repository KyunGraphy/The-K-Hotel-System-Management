import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export { default as AppBar } from '@mui/material/AppBar';
export { default as Autocomplete } from '@mui/material/Autocomplete';
export { default as Badge } from '@mui/material/Badge';
export { default as Box } from '@mui/material/Box';
export { default as Button } from '@mui/material/Button';
export { default as ButtonGroup } from '@mui/material/ButtonGroup';
export { default as Checkbox } from '@mui/material/Checkbox';
export { default as CircularProgress } from '@mui/material/CircularProgress';
export { default as Collapse } from '@mui/material/Collapse';
export { default as Drawer } from '@mui/material/Drawer';
export { default as Dialog } from '@mui/material/Dialog';
export { default as DialogActions } from '@mui/material/DialogActions';
export { default as DialogContent } from '@mui/material/DialogContent';
export { default as DialogTitle } from '@mui/material/DialogTitle';
export { default as Divider } from '@mui/material/Divider';
export { default as Fade } from '@mui/material/Fade';
export { default as FormControl } from '@mui/material/FormControl';
export { default as FormControlLabel } from '@mui/material/FormControlLabel';
export { default as FormGroup } from '@mui/material/FormGroup';
export { default as FormHelperText } from '@mui/material/FormHelperText';
export { default as Grid } from '@mui/material/Grid';
export { default as IconButton } from '@mui/material/IconButton';
export { default as InputAdornment } from '@mui/material/InputAdornment';
export { default as InputLabel } from '@mui/material/InputLabel';
export { default as List } from '@mui/material/List';
export { default as ListItem } from '@mui/material/ListItem';
export { default as ListItemButton } from '@mui/material/ListItemButton';
export { default as ListItemText } from '@mui/material/ListItemText';
export { default as MenuItem } from '@mui/material/MenuItem';
export { default as Paper } from '@mui/material/Paper';
export { default as Select } from '@mui/material/Select';
export { default as Table } from '@mui/material/Table';
export { default as TableBody } from '@mui/material/TableBody';
export { default as TableCell } from '@mui/material/TableCell';
export { default as TableContainer } from '@mui/material/TableContainer';
export { default as TableHead } from '@mui/material/TableHead';
export { default as TableRow } from '@mui/material/TableRow';
export { default as TableSortLabel } from '@mui/material/TableSortLabel';
export { default as TextField } from '@mui/material/TextField';
export { default as Tooltip } from '@mui/material/Tooltip';
export { default as Toolbar } from '@mui/material/Toolbar';
export { default as Typography } from '@mui/material/Typography';
export { default as styled } from '@mui/material/styles/styled';
export { default as useTheme } from '@mui/material/styles/useTheme';
// export { default as makeStyles } from '@mui/styles/makeStyles';

// DemoPaper Component
export const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));