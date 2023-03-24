import { SxProps } from '@mui/system';
import { convertToColor } from './convertToColor';

export const convertToInitials = (name: string, styles?: SxProps) => {
  return {
    sx: {
      bgcolor: convertToColor(name),
      ...styles,
    },
    children: `${name.split('')[0].toUpperCase()}`,
  };
}
