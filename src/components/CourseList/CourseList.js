import React from 'react';
import {Card} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';

export default class CourseList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectFieldValue: null,
            dataSource: []
        };
    }

    handleUpdateInput = (value) => {
        this.setState({
            dataSource: [
                value,
                value + value,
                value + value + value,
            ],
        });
    };

    render() {
        return (
            <Card>
                <AutoComplete
                    hintText="Type anything"
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput}
                />
                <AutoComplete
                    hintText="Type anything"
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput}
                />
                <SelectField
                    value={this.state.selectFieldValue}
                    onChange={this.handleChange.bind(this)}>
                    <MenuItem value={1} primaryText="Fall"/>
                    <MenuItem value={2} primaryText="Summer"/>
                    <MenuItem value={3} primaryText="Spring"/>
                </SelectField>
            </Card>
        );
    }

    handleChange(event, index, selectFieldValue) {
        this.setState({selectFieldValue});
    }
}