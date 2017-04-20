import React from 'react';
import {PieChart} from 'component-kit';
import _ from 'lodash'
import axios from 'axios';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './courseDetail.css';
import {BASE_URL} from '../../shared/constants';
import CircularProgress from 'material-ui/CircularProgress';
import {browserHistory} from 'react-router';
import Paper from 'material-ui/Paper';
import { CardHeader,} from 'material-ui/Card';

  const legend = {
            E: "Excellent",
            F: "Fair",
            G: "Good",
            NR: "No Response",
            P: "Poor",
            VG: "Very Good"
        };

export default class CourseDetail extends React.Component {
    constructor(props) {
        super(props); 
        let user = JSON.parse(window.localStorage.getItem("user")) 
                    
        if (!user || !window.courses)
            browserHistory.push("/login")
        else {
            console.log(user)
            let courseData = _.result(window, 'courses.'+this.props.params.id);  //todo: remove window access when moving to redux
            let {comments} = courseData
            let chartData = _.mapValues(courseData.data, ((obj) => ({
                chartName: obj.question,
                data: _.map(obj, ((y, x) => ({x: legend[x], y: (y.replace("%", ""))}) ))
            })));
            this.state = {
            open: false,
            loading: false,
            chartData,
            courseData,
            newCommentText: '',
            user,
            comments
            };
        }
        

        this.getArrayAve = this.getArrayAve.bind(this);
        this.handleNewCommentTextChange = this.handleNewCommentTextChange.bind(this);
        this.addComment = this.addComment.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }
    componetDidMount(){   
        
        console.log(this.state)
        
        
    }
    handleNewCommentTextChange(event) {
        this.setState({newCommentText: event.target.value});
    }

    addComment() {
        let {courseData, newCommentText, user} = this.state
        console.log(courseData._id)
        if(newCommentText) {
            let {comments} = this.state
            let comment = {
                username: user.username ,
                body: newCommentText,
                id: _.result(courseData,'_id.$oid'),
                token: user.token
            };
            this.setState({loading: true});
            axios.post(`${BASE_URL}/api/addcomment`, {comment})
                .then((resp) => {
                    let {data}  = resp
                    console.log(data)
                    if (data.status === 200) {
                        comments.push(comment);
                        this.setState({comments, newCommentText: '', loading: false});
                        this.handleClose();
                    }
                });
        }
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    getArrayAve(arrayX) {
        let total = 0;
        for (let i = 0; i < arrayX.length; i++) {
            total += arrayX[i];
        }
        return total / arrayX.length;
    }

    render() {
        let {courseData, chartData} = this.state
        if (!courseData)
            return null
        return (
            <Paper zDepth={2} className="course-detail-container row">
                <div className="col-xs-12">
                    <div className="col-xs-6 course-info">
                        <h3>{`${courseData.course.number || ''} - ${courseData.course.title || ''}`}</h3>
                        <Divider />
                        <div className="course-info-line">
                            <i>Number of enrolled students: </i>
                            <b>{courseData.meta.enrolled || ''}</b>
                        </div>
                        <Divider />
                        <div className="course-info-line">
                            <i>Instructor name: </i>
                            <b>{courseData.instructor.name || ''}</b>
                        </div>
                        <Divider />
                        <div className="course-info-line">
                            <i>Term:</i>
                            <b>{courseData.term.term || ''}</b>
                        </div>
                        <Divider />
                    </div>
                    {_.map(chartData, ({chartName, data}) => (
                        <div key={chartName} className="col-xs-4">
                            <CardHeader title={chartName}/>
                            <PieChart
                                key={chartName}
                                width={250} height={250} radius={100}
                                data={data} dataKey='y' labelKey='x'
                            />
                        </div>
                    ))}
                </div>
                <div className="col-xs-12 comment-container">
                    <h4>User Comments: </h4>
                    <Divider/>
                    {
                        this.state.comments.map(({username, body, i}) => (
                            <div key={i} className="comment">
                                <div className="comment-text">
                                    <span><b>{username}</b> wrote: <i>"{body}"</i></span>
                                </div>
                                <Divider/>
                            </div>
                        ))
                    }
                </div>
                <div className="pull-right add-comment-btn">
                    <RaisedButton label="Add Comment" primary={true} onTouchTap={this.handleOpen}/>
                </div>
                <Dialog
                    title="Add Comment"
                    actions={[
                        <FlatButton label="Cancel" onTouchTap={this.handleClose}/>,
                        <FlatButton label="Submit" primary={true} keyboardFocused={true} onTouchTap={this.addComment}/>,
                    ]}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    {
                        this.state.loading ? <CircularProgress /> : <TextField
                            hintText="ex. Great course, totally recommend it..."
                            floatingLabelText="Please add a comment"
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



