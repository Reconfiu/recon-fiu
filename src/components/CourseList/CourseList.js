import React from 'react';
import { Card } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { searchBy } from '../../shared/communications';
import CircularProgress from 'material-ui/CircularProgress';
import { browserHistory } from 'react-router';
import _ from 'lodash'
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
        let user = JSON.parse(window.sessionStorage.getItem('user'));
        if (!user)
            browserHistory.push('/login');

        this.styles = {
            propContainer: {
                width: 200,
                overflow: 'hidden',
                margin: '20px auto 0'
            }
        };

        this.state = {
            criteriaCourseNumber: '',
            criteriaInstructorName: '',
            criteriaTermName: 'All',
            data: [],
            loading: false,
            height: '68vh',
            overflow: 'scroll',
            user
        };

        this.populateSearch = this.populateSearch.bind(this);
        this.courseNumberOnChange = this.courseNumberOnChange.bind(this);
        this.instructorNameOnChange = this.instructorNameOnChange.bind(this);
        this.termNameOnChange = this.termNameOnChange.bind(this);
        this.getCourseDetails = this.getCourseDetails.bind(this);
    }

    componentWillReceiveProps({query}){
        console.log(query)
        if (!query)
            query = JSON.parse(window.localStorage.getItem('query'))
        
        this.setState({
            criteriaCourseNumber: query.course,
            criteriaInstructorName: query.prof,
            criteriaTermName: query.term
        })
        this.getData(query)
    }

    populateSearch() {
        let criteria = {
            term: this.state.criteriaTermName,
            course: _.replace(this.state.criteriaCourseNumber, ' ', ''),
            prof: _.trim(this.state.criteriaInstructorName)
        }
        this.props.updateSearchHistory(criteria)
        this.getData(criteria);
    }

    /**
     * Gets data from service and populate state
     * @param query
     */
    getData(query) {
        this.setState({ loading: true });
        window.localStorage.setItem('query', JSON.stringify(query))
        searchBy(query).then(resp => {
            let { data, status } = resp
            if (status === 200) {
                // Take p-first 50 records. Todo: add pagination
                let result = _.map(data, JSON.parse)
                this.setState({ data: result, loading: false });
            }
        }).catch(e => {
            console.log(e)
        });
    }

    componentDidMount() {
        // load saved query
        let lastquery = JSON.parse(window.localStorage.getItem('query'))
        let { criteriaTermName, criteriaCourseNumber, criteriaInstructorName } = this.state
        let query = { term: criteriaTermName,  prof: criteriaInstructorName , course: criteriaCourseNumber, limit: 100 }
        if (lastquery) { 
            query = lastquery             
            this.setState({
                criteriaTermName: query.term || 'All',
                criteriaCourseNumber: query.course || '',
                criteriaInstructorName: query.prof || ''
            })       
        }
                
        window.setTimeout(() => {
            let user = JSON.parse(window.sessionStorage.getItem('user'))
            if (user)
                this.getData(query || {});
        }, 300)
    }

    termNameOnChange(event, index, value) {
        this.setState({ criteriaTermName: value });
    }

    courseNumberOnChange(event) {
        this.setState({ criteriaCourseNumber: event.target.value });
    }

    instructorNameOnChange(event) {
        this.setState({ criteriaInstructorName: event.target.value });
    }

    getCourseDetails(rowNumber) {
        let data = this.state.data[rowNumber]
        window.localStorage.setItem('course', JSON.stringify(data))
        this.props.updateCourseHistory(data)
        window.course = data
        browserHistory.push('/courses/' + data._id.$oid);
    }


    render() {
        const containerStyle = {
            height: '100%',
            width: '100%'
        };

        const LoginButton = {
            backgroundColor: '#B6862C',
            color: '#DDDDDD'
        };
        return (
            <Card style={containerStyle}>
                <form className='form' onSubmit={this.populateSearch}>
                    <div className='col-xs-12'>
                        <div className='col-xs-4'>
                            <TextField
                                hintText='Ex. CEN4010'
                                floatingLabelText='SEARCH BY COURSE NUMBER'
                                floatingLabelFixed={true}
                                value={this.state.criteriaCourseNumber}
                                onChange={this.courseNumberOnChange}
                            />
                        </div>
                        <div className='col-xs-4'>
                            <TextField
                                hintText='Ex. Monique Ross'
                                floatingLabelText='SEARCH BY PROFESSOR'
                                floatingLabelFixed={true}
                                value={this.state.criteriaInstructorName}
                                onChange={this.instructorNameOnChange}
                            />
                        </div>
                        <div className='col-xs-4'>
                            <SelectField
                                floatingLabelText='SEARCH BY TERM'
                                value={this.state.criteriaTermName}
                                onChange={this.termNameOnChange}>
                                <MenuItem value={'All'} primaryText='All Terms' />
                                <MenuItem value={'Fall 2016'} primaryText='Fall 2016' />
                                <MenuItem value={'Summer 2016'} primaryText='Summer 2016' />
                                <MenuItem value={'Spring 2016'} primaryText='Spring 2016' />
                                <MenuItem value={'Fall 2015'} primaryText='Fall 2015' />
                                <MenuItem value={'Summer 2015'} primaryText='Summer 2015' />
                                <MenuItem value={'Spring 2015'} primaryText='Spring 2015' />
                                <MenuItem value={'Fall 2014'} primaryText='Fall 2014' />
                                <MenuItem value={'Summer 2014'} primaryText='Summer 2014' />
                                <MenuItem value={'Spring 2014'} primaryText='Spring 2014' />
                                <MenuItem value={'Fall 2013'} primaryText='Fall 2013' />
                                <MenuItem value={'Summer 2013'} primaryText='Summer 2013' />
                                <MenuItem value={'Spring 2013'} primaryText='Spring 2013' />
                                <MenuItem value={'Fall 2012'} primaryText='Fall 2012' />
                                <MenuItem value={'Summer 2012'} primaryText='Summer 2012' />
                                <MenuItem value={'Spring 2012'} primaryText='Spring 2012' />
                                <MenuItem value={'Fall 2011'} primaryText='Fall 2011' />
                                <MenuItem value={'Summer 2011'} primaryText='Summer 2011' />
                                <MenuItem value={'Spring 2011'} primaryText='Spring 2011' />
                                <MenuItem value={'Fall 2010'} primaryText='Fall 2010' />
                                <MenuItem value={'Summer 2010'} primaryText='Summer 2010' />
                                <MenuItem value={'Spring 2010'} primaryText='Spring 2010' />
                                <MenuItem value={'Fall 2009'} primaryText='Fall 2009' />
                                <MenuItem value={'Summer 2009'} primaryText='Summer 2009' />
                                <MenuItem value={'Spring 2009'} primaryText='Spring 2009' />
                                <MenuItem value={'Fall 2008'} primaryText='Fall 2008' />
                                <MenuItem value={'Summer 2008'} primaryText='Summer 2008' />
                                <MenuItem value={'Spring 2008'} primaryText='Spring 2008' />
                                <MenuItem value={'Fall 2007'} primaryText='Fall 2007' />
                                <MenuItem value={'Summer 2007'} primaryText='Summer 2007' />
                                <MenuItem value={'Spring 2007'} primaryText='Spring 2007' />
                                <MenuItem value={'Fall 2006'} primaryText='Fall 2006' />
                                <MenuItem value={'Summer 2006'} primaryText='Summer 2006' />
                                <MenuItem value={'Spring 2006'} primaryText='Spring 2006' />
                                <MenuItem value={'Fall 2005'} primaryText='Fall 2005' />
                                <MenuItem value={'Summer 2005'} primaryText='Summer 2005' />
                                <MenuItem value={'Spring 2005'} primaryText='Spring 2005' />
                                <MenuItem value={'Fall 2004'} primaryText='Fall 2004' />
                                <MenuItem value={'Summer 2004'} primaryText='Summer 2004' />
                                <MenuItem value={'Spring 2004'} primaryText='Spring 2004' />
                                <MenuItem value={'Fall 2003'} primaryText='Fall 2003' />
                            </SelectField>
                        </div>
                    </div>
                    <RaisedButton className='margin-top-xs' buttonStyle={LoginButton} onClick={this.populateSearch} label='SEARCH' primary={true} />
                </form>
                {
                    this.state.loading ? <CircularProgress /> :
                        <Table className='table table-hover table-responsive' height={this.state.height} style={{ width: '90%', margin: '0 auto' }} onCellClick={(rowNumber) => this.getCourseDetails(rowNumber)}>
                            <TableHeader adjustForCheckbox={false} displaySelectAll={false} className='thead-default'>
                                <TableRow >
                                    <TableHeaderColumn style={{ fontSize: 20 }} tooltip='Course Term'>Term</TableHeaderColumn>
                                    <TableHeaderColumn style={{ fontSize: 20 }} tooltip='Course Number'>Course</TableHeaderColumn>
                                    <TableHeaderColumn style={{ fontSize: 20 }} tooltip='Professor Name'>Instructor</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false} showRowHover={true}>
                                {this.state.data.map(({ term, course, instructor, selected }, index) => (
                                    <TableRow key={index} selected={selected} className='mouse-hover'>
                                        <TableRowColumn>{(term && term.term) || 'N/A'}</TableRowColumn>
                                        <TableRowColumn>{(course && course.number) || 'N/A'}</TableRowColumn>
                                        <TableRowColumn>{(instructor && instructor.name) || 'N/A'}</TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                }
            </Card>
        );
    }
}