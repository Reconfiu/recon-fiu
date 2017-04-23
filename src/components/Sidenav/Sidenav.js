import React from 'react';
import {Link, browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/chevron-left';
import './Sidenav.css';
import _ from 'lodash'

class Sidenav extends React.Component {
    render() {
        return (
            <Drawer
                open={this.props.open} docked={this.props.docked}
                onRequestChange={(open) => this.setState({open})}>
                <AppBar
                    className={'SidenavBar'} title='Recon'
                    style={{backgroundColor: '#081E3F'}}
                    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                    onLeftIconButtonTouchTap={this.props.onToggle}
                />
                <MenuItem className='margin-top-xs' onClick={() => browserHistory.goBack()}><Link className='a-no-decor mouse-hover'>Back</Link></MenuItem>
                <hr className='margin-top-xs'/>
                <h4>Search History</h4>
                {_.map(this.props.searchHistory, ({course, prof, term})=>
                    <MenuItem><Link className='a-no-decor mouse-hover'>{ `${_.upperCase(course) || 'Any'} - ${_.capitalize(prof) || 'Any'} - ${term}` }</Link></MenuItem>
                )}
                <hr/>                
                <h4>Course History</h4>
                {_.map(this.props.courseHistory, ({course, instructor, term})=>
                    <MenuItem><Link className='a-no-decor mouse-hover'>{ `${course.title} - ${term.term}` }</Link></MenuItem>
                )}
            </Drawer>
        );
    }
}

export default Sidenav;