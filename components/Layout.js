import { hot } from 'react-hot-loader'
import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import MenuIcon from '@material-ui/icons/Menu'
import Link from './Link'
import withRoot from '../utils/withRoot'
import { mailFolderListItems, otherMailFolderListItems } from './tileData'

const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1,
    // height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items
  toolbarIe11: {
    display: 'flex',
  },
  toolbar: {
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing.unit * 3,
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  anchor: {
    color: theme.palette.text.secondary,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  title: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing.unit / 2,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  content: {
  flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
})

class Layout extends React.Component {
  state = {
    mobileOpen: false,
  }

  handleDrawerOpen = () => {
    this.setState({ mobileOpen: true })
  }

  handleDrawerClose = () => {
    this.setState({ mobileOpen: false })
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  render() {
    const { classes, theme, title, headTitle } = this.props

    const drawer = (
      <div className={classes.nav}>
        <div className={classes.toolbarIe11}>
          <div className={classes.toolbar}>
            <Link className={classes.title} href='/' onClick={this.handleDrawerClose}>
              <Typography variant='title' color='inherit'>
                App Name
              </Typography>
            </Link>
            <Typography variant='caption'>v1.0.0</Typography>
          </div>
        </div>
        <Divider />
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </div>
    )

    return (
      <div className={classes.root}>
        <Head>
          <title>{headTitle || 'Title'}</title>
        </Head>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='title' color='inherit' noWrap>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation='css'>
          <Drawer
            variant='permanent'
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
        </main>
      </div>
    )
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  headTitle: PropTypes.string,
}

export default withRoot(withStyles(styles, { withTheme: true })(Layout))
