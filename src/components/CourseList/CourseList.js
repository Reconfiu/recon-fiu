import React from 'react';
import {Card} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';

const styles = {
 propContainer: {
 width: 200,
 overflow: 'hidden',
 margin: '20px auto 0',
 },
 propToggleHeader: {
 margin: '20px auto 10px',
 },
 };

const tableData = [
    {
        Department: 'CS',
        Number: 'COP 2210',
        Section: 'Fall'
    },
    {
        Department: 'CS',
        Number: 'CAP 3310',
        Section: 'Spring'
    },
    {
        Department: 'CS',
        Number: 'COP 2210',
        Section:'Summer'
    },
    {
        Department: 'CS',
        Number: 'CDA 2110',
        Section: 'Fall'
    },
    {
        Department: 'CS',
        Number: 'ECS 3110',
        Section: 'Summer'
    },

];
export default class CourseList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectFieldValue: null,
            dataSource: [],
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: true,
            height: '300px'
        };
    }
    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    handleChange1 = (event) => {
        this.setState({height: event.target.value});
    };

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
                <AutoComplete containerStyle
                    hintText="Type anything"
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput}
                />
                <AutoComplete containerStyle
                    hintText="Type anything"
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput}
                />
                <SelectField containerStyle
                    value={this.state.selectFieldValue}
                    onChange={this.handleChange.bind(this)}>
                    <MenuItem value={1} primaryText="Fall"/>
                    <MenuItem value={2} primaryText="Summer"/>
                    <MenuItem value={3} primaryText="Spring"/>
                </SelectField>
                <div>
                    <Table
                        height={this.state.height}
                        fixedHeader={this.state.fixedHeader}
                        fixedFooter={this.state.fixedFooter}
                        selectable={this.state.selectable}
                        multiSelectable={this.state.multiSelectable}
                    >
                        <TableHeader
                            displaySelectAll={this.state.showCheckboxes}
                            adjustForCheckbox={this.state.showCheckboxes}
                            enableSelectAll={this.state.enableSelectAll}
                        >
                            <TableRow>
                                <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
                                    Super Header
                                </TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                <TableHeaderColumn tooltip="The Department">Department</TableHeaderColumn>
                                <TableHeaderColumn tooltip="The Number">Number</TableHeaderColumn>
                                <TableHeaderColumn tooltip="The Section">Section</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={this.state.showCheckboxes}
                            deselectOnClickaway={this.state.deselectOnClickaway}
                            showRowHover={this.state.showRowHover}
                            stripedRows={this.state.stripedRows}
                        >
                            {tableData.map( (row, index) => (
                                <TableRow key={index} selected={row.selected}>
                                    <TableRowColumn>{row.Department}</TableRowColumn>
                                    <TableRowColumn>{row.Number}</TableRowColumn>
                                    <TableRowColumn>{row.Section}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter
                            adjustForCheckbox={this.state.showCheckboxes}
                        >
                            <TableRow>
                                <TableRowColumn>department</TableRowColumn>
                                <TableRowColumn>number</TableRowColumn>
                                <TableRowColumn>section</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                                    Super Footer
                                </TableRowColumn>
                            </TableRow>
                        </TableFooter>
                    </Table>

                    <div style={styles.propContainer}>
                        <h3>Table Properties</h3>
                        <TextField
                            floatingLabelText="Table Body Height"
                            defaultValue={this.state.height}
                            onChange={this.handleChange1}
                        />
                        <Toggle
                            name="fixedHeader"
                            label="Fixed Header"
                            onToggle={this.handleToggle}
                            defaultToggled={this.state.fixedHeader}
                        />
                        <Toggle
                            name="fixedFooter"
                            label="Fixed Footer"
                            onToggle={this.handleToggle}
                            defaultToggled={this.state.fixedFooter}
                        />
                        <Toggle
                            name="selectable"
                            label="Selectable"
                            onToggle={this.handleToggle}
                            defaultToggled={this.state.selectable}
                        />
                        <Toggle
                            name="multiSelectable"
                            label="Multi-Selectable"
                            onToggle={this.handleToggle}
                            defaultToggled={this.state.multiSelectable}
                        />
                        <Toggle
                            name="enableSelectAll"
                            label="Enable Select All"
                            onToggle={this.handleToggle}
                            defaultToggled={this.state.enableSelectAll}
                        />
                        <h3 style={styles.propToggleHeader}>TableBody Properties</h3>
                        <Toggle
                            name="deselectOnClickaway"
                            label="Deselect On Clickaway"
                            onToggle={this.handleToggle}
                            defaultToggled={this.state.deselectOnClickaway}
                        />
                        <Toggle
                            name="stripedRows"
                            label="Stripe Rows"
                            onToggle={this.handleToggle}
                            defaultToggled={this.state.stripedRows}
                        />
                        <Toggle
                            name="showRowHover"
                            label="Show Row Hover"
                            onToggle={this.handleToggle}
                            defaultToggled={this.state.showRowHover}
                        />
                        <h3 style={styles.propToggleHeader}>Multiple Properties</h3>
                        <Toggle
                            name="showCheckboxes"
                            label="Show Checkboxes"
                            onToggle={this.handleToggle}
                            defaultToggled={this.state.showCheckboxes}
                        />
                    </div>
                </div>
            </Card>


        );
    }

    handleChange(event, index, selectFieldValue) {
        this.setState({selectFieldValue});
    }
}