import React from 'react';
import {Card} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import {BASE_URL} from '../../shared/constants';
import {browserHistory} from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import './CourseList.css';

export default class CourseList extends React.Component {
    constructor(props) {
        super(props);


        this.styles = {
            propContainer: {
                width: 200,
                overflow: 'hidden',
                margin: '20px auto 0',
            }
        };

        this.state = {
            criteriaCourseNumber: 'ACG2021',
            criteriaInstructorName: '',
            criteriaTermName: 'Fall 2016',
            data: [],
            loading: false,
            height: '300px',
        };

        this.populateSearch = this.populateSearch.bind(this);
        this.courseNumberOnChange = this.courseNumberOnChange.bind(this);
        this.instructorNameOnChange = this.instructorNameOnChange.bind(this);
        this.termNameOnChange = this.termNameOnChange.bind(this);
        this.getCourseDetails = this.getCourseDetails.bind(this);
    }

    populateSearch() {
        this.getData({
            term: this.state.criteriaTermName,
            course: this.state.criteriaCourseNumber,
            prof: this.state.criteriaInstructorName
        });
    }

    /**
     * Gets data from service and populate state
     * @param query
     */
    getData(query) {
        this.setState({loading: true});
        axios.post(`${BASE_URL}/api/searchby`, {query: query})
            .then(resp => {
                if (resp.data.data) {
                    let result = [];
                    // Take first 50 records. Todo: add pagination
                    for (let i = 0; i < resp.data.data.length && i < 50; i++) {
                        result.push(JSON.parse(resp.data.data[i]));
                    }
                    window.courses = result; //todo: remove window access when moving to redux
                    this.setState({data: result, loading: false});
                }
            });
    }

    componentWillMount() {
        let user = JSON.parse(window.localStorage.getItem("user"));
        console.log(user);
        if (!user)
            browserHistory.push("/login");
        else
            this.getData({term: this.state.criteriaTermName, course: this.state.criteriaCourseNumber});
    }

    termNameOnChange(event, index, value) {
        this.setState({criteriaTermName: value});
    }

    courseNumberOnChange(event) {
        this.setState({criteriaCourseNumber: event.target.value});
    }

    instructorNameOnChange(event) {
        this.setState({criteriaInstructorName: event.target.value});
    }

    getCourseDetails(rowNumber) {
        browserHistory.push('/courses/' + rowNumber);
    }


    render() {
        const containerStyle = {
            height: '100%'
        };

        return (
            <Card style={containerStyle}>
                <form className="row">
                    <div className="col-xs-12">
                        <div className="col-xs-4">
                            <TextField
                                hintText="Ex. CEN4010"
                                floatingLabelText="SEARCH BY COURSE NUMBER"
                                floatingLabelFixed={true}
                                value={this.state.criteriaCourseNumber}
                                onChange={this.courseNumberOnChange}
                            />
                        </div>
                        <div className="col-xs-4">
                            <TextField
                                hintText="Ex. Monique Ross"
                                floatingLabelText="SEARCH BY PROFESSOR"
                                floatingLabelFixed={true}
                                value={this.state.criteriaInstructorName}
                                onChange={this.instructorNameOnChange}
                            />
                        </div>
                        <div className="col-xs-4">
                            <SelectField
                                floatingLabelText="SEARCH BY TERM"
                                value={this.state.criteriaTermName}
                                onChange={this.termNameOnChange}>
                                <MenuItem value={"Fall 2016"} primaryText="Fall 2016"/>
                                <MenuItem value={"Summer 2016"} primaryText="Summer 2016"/>
                                <MenuItem value={"Spring 2016"} primaryText="Spring 2016"/>
                                <MenuItem value={"Fall 2015"} primaryText="Fall 2015"/>
                                <MenuItem value={"Summer 2015"} primaryText="Summer 2015"/>
                                <MenuItem value={"Spring 2015"} primaryText="Spring 2015"/>
                                <MenuItem value={"Fall 2014"} primaryText="Fall 2014"/>
                                <MenuItem value={"Summer 2014"} primaryText="Summer 2014"/>
                                <MenuItem value={"Spring 2014"} primaryText="Spring 2014"/>
                                <MenuItem value={"Fall 2013"} primaryText="Fall 2013"/>
                                <MenuItem value={"Summer 2013"} primaryText="Summer 2013"/>
                                <MenuItem value={"Spring 2013"} primaryText="Spring 2013"/>
                                <MenuItem value={"Fall 2012"} primaryText="Fall 2012"/>
                                <MenuItem value={"Summer 2012"} primaryText="Summer 2012"/>
                                <MenuItem value={"Spring 2012"} primaryText="Spring 2012"/>
                                <MenuItem value={"Fall 2011"} primaryText="Fall 2011"/>
                                <MenuItem value={"Summer 2011"} primaryText="Summer 2011"/>
                                <MenuItem value={"Spring 2011"} primaryText="Spring 2011"/>
                                <MenuItem value={"Fall 2010"} primaryText="Fall 2010"/>
                                <MenuItem value={"Summer 2010"} primaryText="Summer 2010"/>
                                <MenuItem value={"Spring 2010"} primaryText="Spring 2010"/>
                                <MenuItem value={"Fall 2009"} primaryText="Fall 2009"/>
                                <MenuItem value={"Summer 2009"} primaryText="Summer 2009"/>
                                <MenuItem value={"Spring 2009"} primaryText="Spring 2009"/>
                                <MenuItem value={"Fall 2008"} primaryText="Fall 2008"/>
                                <MenuItem value={"Summer 2008"} primaryText="Summer 2008"/>
                                <MenuItem value={"Spring 2008"} primaryText="Spring 2008"/>
                                <MenuItem value={"Fall 2007"} primaryText="Fall 2007"/>
                                <MenuItem value={"Summer 2007"} primaryText="Summer 2007"/>
                                <MenuItem value={"Spring 2007"} primaryText="Spring 2007"/>
                                <MenuItem value={"Fall 2006"} primaryText="Fall 2006"/>
                                <MenuItem value={"Summer 2006"} primaryText="Summer 2006"/>
                                <MenuItem value={"Spring 2006"} primaryText="Spring 2006"/>
                                <MenuItem value={"Fall 2005"} primaryText="Fall 2005"/>
                                <MenuItem value={"Summer 2005"} primaryText="Summer 2005"/>
                                <MenuItem value={"Spring 2005"} primaryText="Spring 2005"/>
                                <MenuItem value={"Fall 2004"} primaryText="Fall 2004"/>
                                <MenuItem value={"Summer 2004"} primaryText="Summer 2004"/>
                                <MenuItem value={"Spring 2004"} primaryText="Spring 2004"/>
                                <MenuItem value={"Fall 2003"} primaryText="Fall 2003"/>
                            </SelectField>
                        </div>
                    </div>
                    <RaisedButton onClick={this.populateSearch} label="SEARCH" primary={true}/>
                </form>
                {
                    this.state.loading ? <CircularProgress /> : <Table
                            height={this.state.height} onCellClick={(rowNumber) => this.getCourseDetails(rowNumber)}>
                            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn tooltip="Course Term">Term</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Course Number">Course</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Professor Name">Instructor</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                {this.state.data.map((row, index) => (
                                    <TableRow key={index} selected={row.selected}>
                                        <TableRowColumn>{(row.term && row.term.term ) || "N/A"}</TableRowColumn>
                                        <TableRowColumn>{(row.course && row.course.number ) || "N/A"}</TableRowColumn>
                                        <TableRowColumn>{(row.instructor && row.instructor.name) || "N/A"}</TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                }
            </Card>
        );
    }
}