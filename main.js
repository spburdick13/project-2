$(document).ready(function(){
    const table = $('#dt-table').DataTable();
    const tableData = getTableData(table);
    createHighcharts(tableData);
    setTableEvents(table);
    });

function getTableData(table) {
const data = [],
Category = [],
y2018 = [],
x2019 = [];
table.rows({ search: "applied" }).every(function() {
const data = this.data();
Category.push(data[0]);
y2018.push(parseInt(data[1].replace(/\,/g, "")));
x2019.push(parseInt(data[2].replace(/\,/g, "")));
});
data.push(Category, y2018, x2019);
return data;
}

function createHighcharts(data){
Highcharts.chart("chart", {
chart: {
zoomType: 'xy'
},
title: {
text: "Crime in Wichita"
},
subtitle: {
text: "Crime Rates in Wichita"
},
xAxis: [
{
categories: data[0],
labels: {
rotation: -45
}
}
],
yAxis: [
{
title: {
text: "Value"
}
}
],
series: [
{
name: "2018",
type: "lollipop",
data: data[1],
color: "orange"
},
{
name: "2019",
type: "lollipop",
data: data[2],
color: "red"
}
],
tooltip: {
shared: true
},
legend: {
backgroundColor: "white",
shadow: true
},
credits: {
enabled: false
},
noData: {
style: {
fontSize: "16px"
}
}
});
}

let draw = false;
function setTableEvents(table) {
table.on("page", () => {
draw = true;
});
table.on("draw", () => {
if (draw) {
draw = false;
} else {
const tableData = getTableData(table);
createHighcharts(tableData);
}
});
}

