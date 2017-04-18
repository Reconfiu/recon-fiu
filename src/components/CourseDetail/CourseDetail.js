import React from 'react';
import {PieChart} from 'component-kit';

export default class CourseDetail extends React.Component {
    constructor(props) {
        super(props);
        this.courseData = window.courses[props.params.id];  //todo: remove window access when moving to redux
        this.state = {
            chartData: this.getChartData(),
        };

        this.getArrayAve = this.getArrayAve.bind(this);
    }

    getArrayAve(arrayX) {
        let total = 0;
        for (let i = 0; i < arrayX.length; i++) {
            total += arrayX[i];
        }
        return total / arrayX.length;
    }

    getChartData() {
        let [arrayE, arrayF, arrayG, arrayNR, arrayP, arrayVG] = [[], [], [], [], [], []];

        for (let key in this.courseData.data) {
            if (this.courseData.data.hasOwnProperty(key)) {
                for (let childKey in this.courseData.data[key]) {
                    if (!this.courseData.data[key].hasOwnProperty(childKey)) {
                        break;
                    }
                    if (childKey === 'E') {
                        arrayE.push(parseFloat(this.courseData.data[key][childKey].replace("%", "")));
                    }
                    else if (childKey === 'F') {
                        arrayF.push(parseFloat(this.courseData.data[key][childKey].replace("%", "")))
                    }
                    else if (childKey === 'G') {
                        arrayG.push(parseFloat(this.courseData.data[key][childKey].replace("%", "")))
                    }
                    else if (childKey === 'NR') {
                        arrayNR.push(parseFloat(this.courseData.data[key][childKey].replace("%", "")))
                    }
                    else if (childKey === 'P') {
                        arrayP.push(parseFloat(this.courseData.data[key][childKey].replace("%", "")))
                    }
                    else if (childKey === 'VG') {
                        arrayVG.push(parseFloat(this.courseData.data[key][childKey].replace("%", "")))
                    }
                }
            }
        }

        return [
            {x: 'Excelent', y: this.getArrayAve(arrayE)},
            {x: 'Jon', y: this.getArrayAve(arrayF)},
            {x: 'David', y: this.getArrayAve(arrayG)},
            {x: 'hola', y: this.getArrayAve(arrayNR)},
            {x: 'Poor', y: this.getArrayAve(arrayP)},
            {x: 'VeryGood', y: this.getArrayAve(arrayVG)},
        ];
    }

    render() {
        return (
            <PieChart
                width={350}
                height={600}
                radius={150}
                data={this.state.chartData}
            />
        )
    }
}

