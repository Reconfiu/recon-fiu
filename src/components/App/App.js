import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import '../../App.css';
import { logout } from './../../shared/communications';
import {Link, browserHistory} from "react-router";
import Sidenav from '../Sidenav/Sidenav';
import {styles} from './styles';
import _ from "lodash"

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {open: true, docked: false, searchHistory:[], courseHistory: [] };
        this.updateSearchHistory = this.updateSearchHistory.bind(this)   
        this.updateCourseHistory = this.updateCourseHistory.bind(this)
        this.getChildren = this.getChildren.bind(this)
    }
    getChildren(){
        let children  = _.clone(this.props.children)
        let props = _.clone(children.props)
        props.updateSearchHistory = this.updateSearchHistory
        props.updateCourseHistory = this.updateCourseHistory
        children.props = props
        return children
    }
    toggle() {
        this.setState({open: !this.state.open});
        this.updateSidenav(!this.state.open);
    }
    /**
     * Add event listener
     */
    componentDidMount() {
        this.updateSidenav(this.state.open);
        window.addEventListener("resize", this.updateSidenav.bind(this));
    }
    /**
     * Remove event listener
     */
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateSidenav.bind(this));
    }
    /**
     * Make Sidenav responsive
     */
    updateSidenav(isStateOpen) {
        let belowLimits = window.innerWidth < 1024;
        let isOpen = false;

        if (belowLimits) {
            isOpen = !this.state.docked ? isStateOpen : false;
            this.setState({open: isOpen, docked: !belowLimits, style: this.getStyle(false)});
        } else {
            isOpen = !this.state.docked ? true : isStateOpen;
            this.setState({open: isOpen, docked: !belowLimits, style: this.getStyle(isOpen)});
        }
    }
    getStyle(isOpen) {
        let style = isOpen ?
            {width: 'calc(100% - 256px)', marginLeft: '256px',color:"#B6862C", backgroundColor: this.state.color } :
            {width: 'calc(100%)', marginLeft: 'initial',color:"#B6862C",backgroundColor: this.state.color };
        return Object.assign(styles.root, style);
    }

    handleLogout(){
      
        logout().then(resp => {
            console.log(resp)
            let { status } = resp
            browserHistory.push("/login")   
            window.sessionStorage.clear()   
            window.localStorage.clear()          
        }).catch(e=>{
            console.log(e)
        });
    }
    
    updateSearchHistory(criteria){
        let { searchHistory }= this.state
        if (!_.find(searchHistory, criteria)){
            searchHistory.push(criteria)
            this.setState({
                searchHistory
            })
        }
    }

    updateCourseHistory(course){
        let { courseHistory } = this.state
        if (!_.find(courseHistory, ({ _id: { $oid } }) =>  $oid === course._id.$oid  )) {
            courseHistory.push(course)
            this.setState({
                courseHistory
            })        
        }
    }

    render() {
        return (
            <div className="App">
                <AppBar
                    style={{position: 'fixed', backgroundColor: "#081E3F"}} title="ReconFIU"
                    onLeftIconButtonTouchTap={this.toggle.bind(this)}
                    iconElementRight={<Link to="login"><FlatButton onClick={this.handleLogout} labelStyle={{color:"#DDDDDD"}} label="Logout" /></Link>}
                />
                <Sidenav open={this.state.open} searchHistory={this.state.searchHistory} courseHistory={this.state.courseHistory} docked={this.state.docked} onToggle={this.toggle.bind(this)}/>
                <div style={this.state.style}>{this.getChildren()}</div>
            </div>
        );
    }
}

export default App;
