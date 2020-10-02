// STEP 1 - Include Dependencies
// Include react
import React from "react";
import ReactDOM from "react-dom";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import gantt from "fusioncharts/fusioncharts.gantt";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, gantt, FusionTheme);

// STEP 2 - Chart Data
const chartData = [
    {
        label: "Venezuela",
        value: "290"
    },
    {
        label: "Saudi",
        value: "260"
    },
    {
        label: "Canada",
        value: "180"
    },
    {
        label: "Iran",
        value: "140"
    },
    {
        label: "Russia",
        value: "115"
    },
    {
        label: "UAE",
        value: "100"
    },
    {
        label: "US",
        value: "30"
    },
    {
        label: "China",
        value: "30"
    }
];

// STEP 3 - Creating the JSON object to store the chart configurations
const chartConfigs = {
    type: "gantt", // The chart type
    width: "100%", // Width of the chart
    height: "300", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
        tasks: {
            showlabels: "1",
            color: "#5D62B5",
            task: [
                {
                    processid: "EMP120",
                    start: "07:00:00",
                    end: "14:00:00",
                    label: "Work",
                    color: "#6d9765",
                },
                {
                    processid: "EMP120",
                    start: "14:00:00",
                    end: "16:00:00",
                    label: "Break",
                    color: "#535353",
                },
                {
                    processid: "EMP120",
                    start: "16:00:00",
                    end: "16:30:00",
                    label: "Work",
                    color: "#6d9765",
                },
                {
                    processid: "EMP121",
                    start: "14:00:00",
                    end: "22:00:00",
                    label: "Afternoon Shift",
                    color: "#6d9765",
                },
                {
                    processid: "EMP122",
                    start: "14:00:00",
                    end: "18:30:00",
                    label: "Half Day",
                    color: "#535353",
                },
                {
                    processid: "EMP123",
                    start: "07:00:00",
                    end: "16:00:00",
                    label: "Morning Shift",
                    color: "#6d9765",
                }
            ]
        },
        processes: {
            fontsize: "12",
            isbold: "1",
            align: "Center",
            headertext: "Employee",
            headerfontsize: "14",
            headervalign: "middle",
            headeralign: "left",
            process: [
                {
                    label: "Betty",
                    id: "EMP120"
                },
                {
                    label: "William",
                    id: "EMP121"
                },
                {
                    label: "Emma",
                    id: "EMP122"
                },
                {
                    label: "Oliver",
                    id: "EMP123"
                }
            ]
        },
        categories: [
            {
                category: [
                    {
                        start: "00:00:00",
                        end: "23:59:59",
                        label: "Time"
                    }
                ]
            },
            {
                align: "center",
                category: [
                    {
                        start: "00:00:00",
                        end: "02:59:59",
                        label: "12-3 AM"
                    },
                    {
                        start: "03:00:00",
                        end: "05:59:59",
                        label: "3-6 AM"
                    },
                    {
                        start: "06:00:00",
                        end: "08:59:59",
                        label: "6-9 AM"
                    },
                    {
                        start: "09:00:00",
                        end: "11:59:59",
                        label: "9-12 AM"
                    },
                    {
                        start: "12:00:00",
                        end: "14:59:59",
                        label: "12-3 PM"
                    },
                    {
                        start: "15:00:00",
                        end: "17:59:59",
                        label: "3-6 PM"
                    },
                    {
                        start: "18:00:00",
                        end: "20:59:59",
                        label: "6-9 PM"
                    },
                    {
                        start: "21:00:00",
                        end: "23:59:59",
                        label: "9-12 PM"
                    },
                ]
            }
        ],
        chart: {
            dateformat: "dd/mm/yyyy",
            outputdateformat: "hh12:mn ampm",
            // caption: "Shift Roster for June",
            // subcaption: "Customer Success Team<br>Sensibill",
            ganttpaneduration: "22",
            ganttpanedurationunit: "h",
            scrolltodate: "09:00:00",
            useverticalscrolling: "0",
            theme: "fusion"
        }
    }
};

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component
class App extends React.Component {
    render() {
        return (<ReactFC {...chartConfigs} />);
    }
}

export default App;