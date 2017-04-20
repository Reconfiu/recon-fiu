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

import Paper from 'material-ui/Paper';
import { CardHeader,} from 'material-ui/Card';

export default class CourseDetail extends React.Component {
    constructor(props) {
        super(props);

        this.courseData = window.courses[props.params.id];  //todo: remove window access when moving to redux
        const legend = {
            E: "Excellent",
            F: "Fair",
            G: "Good",
            NR: "No Response",
            P: "Poor",
            VG: "Very Good"
        };

        let charData = _.mapValues(this.courseData.data, ((obj) => ({
            chartName: obj.question,
            data: _.map(obj, ((y, x) => ({x: legend[x], y: (y.replace("%", ""))}) ))
        })));

        this.state = {
            open: false,
            loading: false,
            chartData: charData,
            newCommentText: '',
            comments: this.courseData.comments
        };

        this.getArrayAve = this.getArrayAve.bind(this);
        this.handleNewCommentTextChange = this.handleNewCommentTextChange.bind(this);
        this.addComment = this.addComment.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleNewCommentTextChange(event) {
        this.setState({newCommentText: event.target.value});
    }

    addComment() {
        if(this.state.newCommentText) {
            let comments = JSON.parse(JSON.stringify(this.state.comments));
            let comment = {
                username:  JSON.parse(localStorage.getItem("user")),
                body: this.state.newCommentText,
                id: this.courseData._id
            };
            this.setState({loading: true});
            axios.post(`${BASE_URL}/api/addcomment`, {comment})
                .then(() => {
                    comments.push(comment);
                    this.setState({comments, newCommentText: '', loading: false});
                    this.handleClose();
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
        return (
            <Paper zDepth={2} className="course-detail-container row">
                <div className="col-xs-12">
                    <div className="col-xs-6 course-info">
                        <h3>{`${this.courseData.course.number || ''} - ${this.courseData.course.title || ''}`}</h3>
                        <Divider />
                        <div className="course-info-line">
                            <i>Number of enrolled students: </i>
                            <b>{this.courseData.meta.enrolled || ''}</b>
                        </div>
                        <Divider />
                        <div className="course-info-line">
                            <i>Instructor name: </i>
                            <b>{this.courseData.instructor.name || ''}</b>
                        </div>
                        <Divider />
                        <div className="course-info-line">
                            <i>Term:</i>
                            <b>{this.courseData.term.term || ''}</b>
                        </div>
                        <Divider />
                    </div>
                    {_.map(this.state.chartData, ({chartName, data}) => (
                        <div className="col-xs-4">
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
                        this.state.comments.map(commentObject => (
                            <div className="comment">
                                <div className="comment-text">
                                    <span><b>{commentObject.username}</b> wrote: <i>"{commentObject.text}"</i></span>
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



