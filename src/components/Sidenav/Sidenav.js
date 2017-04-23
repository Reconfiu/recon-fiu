import React from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/chevron-left';
import './Sidenav.css';

class Sidenav extends React.Component {
    render() {
        return (
            <Drawer
                open={this.props.open} docked={this.props.docked}
                onRequestChange={(open) => this.setState({open})}>
                <AppBar
                    className={'SidenavBar'} title="Recon"
                    style={{backgroundColor: "#081E3F"}}
                    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                    onLeftIconButtonTouchTap={this.props.onToggle}
                />
                <MenuItem><Link to={'/courselist'}>Course List</Link></MenuItem>
                <MenuItem><Link to={'/coursedetail'}>Course Detail</Link></MenuItem>
            </Drawer>
        );
    }
}

export default Sidenav;