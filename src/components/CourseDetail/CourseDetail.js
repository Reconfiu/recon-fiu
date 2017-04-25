import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    BarChart,
    Bar,
    AreaChart,
    Area
} from 'recharts';
import _ from 'lodash'
import {
    FlatButton,
    RaisedButton,
    Divider,
    Dialog,
    CardHeader,
    IconButton
} from 'material-ui';
import AutoRenew from 'material-ui/svg-icons/action/autorenew'
import TextField from 'material-ui/TextField';
import './courseDetail.css';
import { add_comment } from './../../shared/communications';
import CircularProgress from 'material-ui/CircularProgress';
import { browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#e50000', '#1d799b']

const legend = {
    E: 'Excellent',
    F: 'Fair',
    G: 'Good',
    NR: 'No Response',
    P: 'Poor',
    VG: 'Very Good'
};
let charts = [(data) =>
        <BarChart width={400} height={300} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="percent" fill="#8884d8" />
        </BarChart>,
    (data) =>
        <PieChart width={500} height={300}>
            <Pie
                data={data}
                cx={'50%'}
                cy={'40%'}
                outerRadius={60}
                fill='#8884d8'
                valueKey='percent'
                label={({ percent }) => `${(percent).toFixed(0)}%`}>
                {data.map((entry, index) => <Cell key={index} fill={colors[index % colors.length]} />)}
            </Pie>
            <Legend verticalAlign='bottom' align='left' height={36} />
            <Tooltip />
        </PieChart>,
    (data) => 
        <LineChart width={400} height={300} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="percent" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>,
    (data) => 
        <AreaChart width={400} height={300} data={data}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Area type='monotone' dataKey='percent' stroke='#8884d8' fill='#1d799b' />
      </AreaChart>]


export default class CourseDetail extends React.Component {
    constructor(props) {
        super(props);
        let user = JSON.parse(window.sessionStorage.getItem('user'))

        if (!user) {
            browserHistory.push('/login')
        }
        else {
            let courses = window.courses || JSON.parse(window.localStorage.getItem('data'))
            let courseData = _.result(courses, this.props.params.id)
            let comments = courseData.comments || []
            let i = 0
            let overall = _.map(_.omit(_.get(courseData, 'data.OAOI'), 'question'), (y, x) => ({ name: legend[x], percent: parseInt(y.replace('%', ''), 10), fill: colors[++i % colors.length] }))
            let chartData = _.mapValues(_.omit(courseData.data, 'OAOI'), (obj => ({
                chartName: obj.question,
                data: _.map(_.omit(obj, 'question'), ((y, x) => ({ name: legend[x], value: parseInt(y.replace('%', ''), 10) })))
            })));
            this.state = {
                open: false,
                loading: false,
                current: 0,
                chartData,
                courseData,
                overall,
                newCommentText: '',
                user,
                comments,
                height: '68vh',
                overflow: 'scroll',
                margin: '20px auto 0'
            };
        }



        this.handleNewCommentTextChange = this.handleNewCommentTextChange.bind(this);
        this.addComment = this.addComment.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.switchChart = this.switchChart.bind(this)
        this.autoSwitch = this.autoSwitch.bind(this)
        this.autoSwitch()
    }

    handleNewCommentTextChange(event) {
        this.setState({ newCommentText: event.target.value });
    }

    autoSwitch() {
        this.timeout = window.setTimeout(()=>{
            this.switchChart()
            this.autoSwitch()
        }, 1000*12)
    } 

    componentWillUnmount(){
        window.clearTimeout(this.timeout)
    }

    addComment() {
        let { courseData, newCommentText } = this.state
        if (newCommentText) {
            let { comments } = this.state
            let body = {
                body: newCommentText,
                id: _.result(courseData, '_id.$oid'),
            };
            this.setState({ loading: true });
            add_comment(body).then((resp) => {
                let { status } = resp
                if (status === 200) {
                    comments.push(body);
                    this.setState({ comments, newCommentText: '', loading: false });
                    this.handleClose();
                }
            }).catch(e => {
                console.log(e)
            });
        }
    }

    handleOpen() {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false });
    }

    switchChart() {
        this.setState({
            current: (this.state.current+1) % charts.length
        })
    }

    

    render() {
        let { courseData, chartData } = this.state
        if (!courseData)
            return null
        const LoginButton = {
            backgroundColor: '#B6862C',
            color: '#DDDDDD'
        };
        return (
            <Paper style={{ height: '90vh', margin: '0 0px 0px', overflowY: 'scroll' }} zDepth={2} className='course-detail-container row'>
                <div className='col-xs-12'>
                    <div className='col-xs-6 course-info'>
                        <h3>{`${courseData.course.number || ''} - ${courseData.course.title || ''}`}</h3>
                        <Divider className='col-xs-6' />
                        <div className='course-info-line'>
                            <i>Instructor name: </i>
                            <b>{courseData.instructor.name || ''}</b>
                        </div>
                        <Divider className='col-xs-6' />
                        <div className='course-info-line'>
                            <i>Term: </i>
                            <b>{courseData.term.term || ''}</b>
                        </div>
                        <Divider className='col-xs-6' />
                        <div className='course-info-line'>
                            <i>Number of enrolled students: </i>
                            <b>{courseData.meta.enrolled || ''}</b>
                        </div>
                        <Divider className='col-xs-6' />
                        <div className='course-info-line'>
                            <i>Section: </i>
                            <b>{courseData.course.section || ''}</b>
                        </div>
                        <Divider className='col-xs-6' />
                    </div>
                    <div className='col-xs-6 assesment-charts'>
                        <h4>Overal Assesment <IconButton onClick={this.switchChart} labelStyle={{ color: "#081e3f" }} tooltip="Switch Graph"><AutoRenew /></IconButton> </h4>
                        {charts[this.state.current](this.state.overall)}
                    </div>
                    {_.map(chartData, ({ chartName, data }) => (
                        <div key={chartName} className='col-xs-4'>
                            <CardHeader title={chartName} />
                            <PieChart width={400} height={250}>
                                <Pie
                                    data={data}
                                    cx={'50%'}
                                    cy={'40%'}
                                    outerRadius={60}
                                    fill='#8884d8'
                                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`} >
                                    { data.map((entry, index) => <Cell key={index} fill={colors[index % colors.length]} />) }
                                </Pie>
                                <Legend verticalAlign='top' align='left' layout='vertical' height={36} />
                                <Tooltip />
                            </PieChart>
                        </div>
                    ))}
                </div>
                <div className='col-xs-12 comment-container'>
                    <h4>User Comments: </h4>
                    <Divider />
                    {
                        this.state.comments.map(({ username, body }, i) => (
                            <div key={i} className='comment'>
                                <div className='comment-text'>
                                    <span><b>{username || 'Anonymous'}</b> wrote: <i>'{body}'</i></span>
                                </div>
                                <Divider />
                            </div>
                        ))
                    }
                </div>
                <div className='pull-right add-comment-btn'>
                    <RaisedButton buttonStyle={LoginButton} label='Add Comment' primary={true} onTouchTap={this.handleOpen} />
                </div>
                <Dialog
                    title='Add Comment'
                    actions={[
                        <FlatButton buttonStyle={LoginButton} label='Cancel' onTouchTap={this.handleClose} />,
                        <FlatButton buttonStyle={LoginButton} label='Submit' primary={true} keyboardFocused={true} onTouchTap={this.addComment} />,
                    ]}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    {
                        this.state.loading ? <CircularProgress /> : <TextField
                            hintText='ex. Great course, totally recommend it...'
                            floatingLabelText='Please add a comment'
                            multiLine={true} rows={4}
                            fullWidth={true}
                            value={this.state.newCommentText}
                            onChange={this.handleNewCommentTextChange}
                        />
                    }
                </Dialog>
            </Paper>
        )
    }
}



