import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import CategoryIcon from '@mui/icons-material/Category';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import AddCategory from './AddCategory';
import Tables from './Table';
import ManagesuperM from './ManagesuperM';

import Logo from '../../assets/images/logo.png';
import Dashboard from './Dashboard';
import { useNavigate } from 'react-router-dom';

import ViewCategory from './ViewCategory';
import LogoutIcon from '@mui/icons-material/Logout';
import ViewFeedback from './ViewFeedback';

const drawerWidth = 240;

function dashboard() {
  return <Dashboard />;
}

function Addcategory() {
  return <AddCategory />;
}

function Viewcategory() {
  return <ViewCategory />;
}

function ManageUser() {
  return <Tables />;
}
function ManageFeedback() {
  return <ViewFeedback/>;
}
function ManageSuperM() {
  return <ManagesuperM />;
}

export default function ClippedDrawer() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [openItems, setOpenItems] = useState({});

  const [userToken, setUserToken] = useState(null);

  const handleLogout = async () => {
    alert("Logged out ");
    localStorage.removeItem("AdminToken");
    localStorage.removeItem("loggedAdmin");
    setUserToken(null);
    setTimeout(() => {
      navigate("/admin/adlogin");
    }, 1000);
  };

  const handleClick = (title) => {
    setOpenItems(prevOpenItems => ({
      ...prevOpenItems,
      [title]: !prevOpenItems[title]
    }));
  };

  useEffect(() => {
    if (localStorage.getItem("AdminToken") == null) {
      navigate("/admin/adlogin");
    }
  }, []);

  const sideBarList = [
    { title: 'Dashboard', path: 'Dashboard', icon: <DashboardCustomizeIcon /> },
    {
      title: 'Manage Category', path: 'managecategory', icon: <CategoryIcon />,
      children: [
        { title: 'Add Category', path: 'AddCategory' },
        { title: 'View Category', path: 'ViewCategory' },
      ]
    },
    { title: 'Manage User', path: 't', icon: <PeopleIcon /> },
    { title: 'Manage SuperMarket', path: 'ManagesuperM', icon: <PeopleIcon /> },
    { title: 'View Feedback', path: 'Vfeedback', icon: <MenuBookIcon /> },
  ];

  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <Dashboard />;
      case 'Add Category':
        return <Addcategory />;
      case 'View Category':
        return <ViewCategory />;
      case 'Manage User':
        return <ManageUser />;
      case 'Manage SuperMarket':
        return <ManagesuperM/>;
      case 'View Feedback':
        return <ViewFeedback/>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{backgroundColor:'white'}}>
      <Box sx={{ display: 'flex', marginTop: "10px" }} style={{ backgroundColor: '#f8f8ff' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: 'linear-gradient(to right, white, #3ab09e)' }}>
          <Toolbar>
            <img src={Logo} alt="Logo" style={{ width: '5%' }} />
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: 'black' }}>
              ADMIN
            </Typography>
            <LogoutIcon style={{ marginRight: 16, cursor: 'pointer' }} onClick={handleLogout} /> {/* Logout icon */}
          </Toolbar>
        </AppBar>
        
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#008080',
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'hidden' }} style={{ backgroundColor: '#008080' }}> {/* Set overflow to hidden */}
            <List>
              {sideBarList.map((item) => (
                <React.Fragment key={item.title}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={item.children ? () => handleClick(item.title) : () => setActiveItem(item.title)}
                      selected={activeItem === item.title}
                      sx={{
                        flexShrink: 0,
                        backgroundColor: 'transparent',
                        '&.Mui-selected': { backgroundColor: 'transparent' },
                        '&:hover': { backgroundColor: 'transparent' }
                      }}
                    >
                      <ListItemIcon sx={{ color: 'white' }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={<Typography noWrap style={{ color: 'white' }}>{item.title}</Typography>}
                      />
                      {item.children ? (openItems[item.title] ? <ExpandLess /> : <ExpandMore />) : null}
                    </ListItemButton>
                  </ListItem>
                  {item.children && (
                    <Collapse in={openItems[item.title]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.children.map((subItem) => (
                          <ListItem key={subItem.title} disablePadding>
                            <ListItemButton
                              sx={{
                                pl: 4,
                                backgroundColor: 'transparent',
                                '&.Mui-selected': { backgroundColor: 'transparent' },
                                '&:hover': { backgroundColor: 'transparent' }
                              }}
                              onClick={() => setActiveItem(subItem.title)}
                              selected={activeItem === subItem.title}
                            >
                              <ListItemText primary={<Typography noWrap style={{ color: 'white' }}>{subItem.title}</Typography>} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
          <Toolbar />
          {renderContent()}
        </Box>
      </Box>
    </div>
  );
}
