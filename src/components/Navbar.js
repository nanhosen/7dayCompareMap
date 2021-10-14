import { styled } from '@mui/material/styles';
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import {Box, IconButton,Link} from '@mui/material';
import Slide from '@mui/material/Slide';
// import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import LinkIcon from '@mui/icons-material/Link';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { grey } from '@mui/material/colors';

//examle
// import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
// import ThreeDRotation from '@mui/icons-material/ThreeDRotation';


function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};


const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  },
}));

export default function HideAppBar(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
          <AppBar>
            <Box sx={{bgcolor: '#3C403D'}}>
              <Toolbar>
                <Typography variant="h6" component="div">
                  Predictive Services 7-Day Model Comparison
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <HtmlTooltip
                      title={
                        <>
                          <Typography color="inherit">About This Page</Typography>
                            {"The data displayed in this viewer comes directly from the"} <a href="http://www.wfas.net/nfmd/public/index.php" target="blank"> {'National Fuel Moisture Database'} </a> {"The map view can be altered by clicking on the 'Map Options' dropdown menu"}
                        </>
                      }
                    >
                      <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        {/*<HelpOutlineIcon />*/}
                      </IconButton>
                    </HtmlTooltip>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                      <Tooltip title="link to National Fuel Moisture Database">
                        <Link href="https://fsapps.nwcg.gov/psp/npsg/forecast#/outlooks?state=map" target="blank" color={grey[50]}>
                          <LinkIcon />
                        </Link>  
                      </Tooltip>  
                    </IconButton>
                    
                  </Box>
              </Toolbar>
            </Box>
          </AppBar>
      </HideOnScroll>
      <Toolbar />

    </React.Fragment>
  );
}
