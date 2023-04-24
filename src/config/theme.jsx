import { createTheme } from '@mui/material';
import { forwardRef } from 'react';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import NavLinkBehavior from '../modules/common/components/NavLinkBehavior';

const LinkBehavior = forwardRef((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink ref={ref} to={href} {...other} />;
});


export const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } ,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});
