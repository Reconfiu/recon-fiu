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

    constructor(props){
        super(props)
        this.goToCourse = this.goToCourse.bind(this)
    }
    goToCourse(i, id){
        let course = this.props.courseHistory[i]
        window.localStorage.setItem('course', JSON.stringify(course))
        window.course = course
        browserHistory.push(`/courses/${id}`)
    }
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
                <hr className='margin-top-xs margin-bottom-xs'/>
                <MenuItem className='margin-top-xs' onClick={() => { this.props.updateSearch({course: '', prof: '', term: 'All'}); browserHistory.push('/coures')}}><Link className='a-no-decor mouse-hover'>New Search</Link></MenuItem>
                <hr className='margin-top-xs margin-bottom-xs'/>                
                <h4>Search History</h4>
                {_.map(this.props.searchHistory, ({course, prof, term}, i)=>
                    <MenuItem onClick={()=>{this.props.updateSearch({course, prof, term}); browserHistory.push('/courses')}} key={i}><Link className='a-no-decor mouse-hover'>{ `${_.upperCase(course) || 'Any'} - ${_.capitalize(prof) || 'Any'} - ${term}` }</Link></MenuItem>
                )}
                <hr/>                
                <h4>Course History</h4>
                {_.map(this.props.courseHistory, ({course, instructor, term, _id}, i)=>
                    <MenuItem onClick={()=>this.goToCourse(i, _id.$oid)}  key={i}><Link className='a-no-decor mouse-hover'>{ `${course.title} - ${term.term}` }</Link></MenuItem>
                )}
            </Drawer>
        );
    }
}

export default Sidenav;