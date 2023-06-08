let label = [];
var graph_data = [];
var graph_data1 = [];
var pol1_data;
var pol2_data;
function activity5() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    pp.showtitle('Vapour Liquid Equilibrium', 3);
    pp.showdescription('Ratio of Area vs Ratio of Mass', 3);
    //pp.addcanvas('myChart');
    draw_chart();
    let text_boxes = `
    <div>

    <div>
        <label for="">Enter X1 value</label>
        <input class="form-control" type="text" name="" id="x1-inp">
    </div>

    <br>

    <div>
        <label for="">Enter X2 value</label>
        <input class="form-control" type="text" name="" id="x2-inp">
    </div>

    <br>

    <div>
        <label for="">Enter y1 value</label>
        <input class="form-control" type="text" name="" id="y1-inp">
    </div>

    <br>

    <div>
        <label for="">Enter y2 value</label>
        <input class="form-control" type="text" name="" id="y2-inp">
    </div>

    <br>

    <div>
        <label for="">Enter Slope Value</label>
        <input class="form-control" type="text" name="" id="slope-inp">
    </div>

    <br>

    <div>
    <button class="btn btn-primary" onclick="slope_verify();">Verify</button>
    </div>
    </div>

    `;
    pp.showdescription(text_boxes, 3);
}
function draw_chart() {
    //document.getElementById('hide_panel3').click();
    pp.clearleftpannel();
    pp.addcanvas('myChart');
    // if(document.getElementById('panel1_btn')) {
    //     document.getElementById("panel1_btn").remove();
    // }
    //pp.addButtonToRightPanel("hello", print_hello, 3);
    label = [];
    graph_data = [];
    for (let i = 0; i < table2.length; i++) {
        label.push(table2[i][0]);
        graph_data.push(table2[i][2]);
    }
    calculate_y_datapoints();
    var ctx = document.getElementById('myChart');
    ctx.style.backgroundColor = "white";
    ctx.style.marginTop = "5px";
    ctx.style.marginLeft = "10%";
    ctx.style.padding = "10px";
    ctx.style.borderRadius = "8px";
    if (typeof chart != 'undefined') {
        chart.destroy();
    }
    // let labels = [0.004, 0.007, 0.010, 0.014, 0.020, 0.029, 0.039];
    // let data1=[82.28,96.86,104.07,108.28,112.48,117.68,125.35];//hi_expt
    // let data2=[146.90,183.50,204.11,230.09,256.89,290.83,323.49];//hi_st
    var chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: label,
            datasets: [
                {
                    label: 'Experimental',
                    data: graph_data,
                    fill: false,
                    borderColor: 'blue',
                    tension: 0.5,
                    showLine: false,
                    // yAxisID: 'A',
                    // borderWidth: 1,
                    // borderColor: "green",
                    // backgroundColor: "rgba(34, 139, 34, 0.5)",
                },
                {
                    label: 'Best Fit y = mx + c',
                    data: graph_data1,
                    fill: false,
                    borderColor: 'red',
                    tension: 0.5,
                    showLine: true
                    // yAxisID: 'A',
                    // borderWidth: 1,
                    // borderColor: "red",
                    // backgroundColor: "rgba(255, 0, 0, 0.5)",
                },
            ]
        },
        options: {
            maintainAspectRatio: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Area (Comp 1 / External Std)',
                        font: { size: 14, weight: 'bold' }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Mass (Comp 1 / External Std.)',
                        font: { size: 14, weight: 'bold' }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `${selected_name}, Composition: ${composition[selected_index]} Ratio of Area vs Ratio of Mass`,
                    font: { size: 18 },
                },
                legend: { labels: { font: { size: 14, weight: 'bold' } } }
            },
        }
    });
}
function calculate_y_datapoints() {
    pol1_data = regression_linear(label, graph_data);
    graph_data1 = [];
    // console.log(pol);
    for (let i = 0; i < label.length; i++) {
        graph_data1.push(pol1_data[0] * label[i] + pol1_data[1]);
    }
}
function slope_verify() {
    let val1 = document.getElementById("slope-inp");
    console.log(parseFloat(val1.value));
    // console.log(Q.value, To.value, Ti.value, ti.value, to.value);
    if (!verify_values(parseFloat(val1.value), slope1)) {
        console.log("please correct the slope value");
        return;
    }
    alert('Entered Slope values is Correct!!');
    draw_second_graph();
}
function draw_second_graph() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    pp.showtitle('Vapour Liquid Equilibrium', 3);
    draw_chart_2();
    let text_boxes = `
    <div>

    <div>
        <label for="">Enter X1 value</label>
        <input class="form-control" type="text" name="" id="x1-inp">
    </div>

    <br>

    <div>
        <label for="">Enter X2 value</label>
        <input class="form-control" type="text" name="" id="x2-inp">
    </div>

    <br>

    <div>
        <label for="">Enter y1 value</label>
        <input class="form-control" type="text" name="" id="y1-inp">
    </div>

    <br>

    <div>
        <label for="">Enter y2 value</label>
        <input class="form-control" type="text" name="" id="y2-inp">
    </div>

    <br>

    <div>
        <label for="">Enter Slope Value</label>
        <input class="form-control" type="text" name="" id="slope-inp">
    </div>

    <br>

    <div>
    <button class="btn btn-primary" onclick="slope2_verify();">Verify</button>
    </div>
    </div>

    `;
    pp.showdescription(text_boxes, 3);
}
function draw_chart_2() {
    //document.getElementById('hide_panel3').click();
    pp.clearleftpannel();
    pp.addcanvas('myChart');
    // if(document.getElementById('panel1_btn')) {
    //     document.getElementById("panel1_btn").remove();
    // }
    //pp.addButtonToRightPanel("hello", print_hello, 3);
    label = [];
    graph_data = [];
    for (let i = 0; i < table2.length; i++) {
        label.push(table2[i][1]);
        graph_data.push(table2[i][3]);
    }
    calculate_y_datapoints();
    var ctx = document.getElementById('myChart');
    ctx.style.backgroundColor = "white";
    ctx.style.marginTop = "5px";
    ctx.style.marginLeft = "10%";
    ctx.style.padding = "10px";
    ctx.style.borderRadius = "8px";
    if (typeof chart != 'undefined') {
        chart.destroy();
    }
    // let labels = [0.004, 0.007, 0.010, 0.014, 0.020, 0.029, 0.039];
    // let data1=[82.28,96.86,104.07,108.28,112.48,117.68,125.35];//hi_expt
    // let data2=[146.90,183.50,204.11,230.09,256.89,290.83,323.49];//hi_st
    var chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: label,
            datasets: [
                {
                    label: 'Experimental',
                    data: graph_data,
                    fill: false,
                    borderColor: 'blue',
                    tension: 0.5,
                    showLine: false,
                    // yAxisID: 'A',
                    // borderWidth: 1,
                    // borderColor: "green",
                    // backgroundColor: "rgba(34, 139, 34, 0.5)",
                },
                {
                    label: 'Best Fit y = mx + c',
                    data: graph_data1,
                    fill: false,
                    borderColor: 'red',
                    tension: 0.5,
                    showLine: true
                    // yAxisID: 'A',
                    // borderWidth: 1,
                    // borderColor: "red",
                    // backgroundColor: "rgba(255, 0, 0, 0.5)",
                },
            ]
        },
        options: {
            maintainAspectRatio: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Area (Comp 2 / External Std.)',
                        font: { size: 14, weight: 'bold' }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Mass (Comp 2 / External Std)',
                        font: { size: 14, weight: 'bold' }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `${selected_name}, Composition: ${composition[selected_index]} Ratio of Area vs Ratio of Mass`,
                    font: { size: 18 },
                },
                legend: { labels: { font: { size: 14, weight: 'bold' } } }
            },
        }
    });
}
function slope2_verify() {
    let val1 = document.getElementById("slope-inp");
    // console.log(parseFloat(val1.value));
    // console.log(Q.value, To.value, Ti.value, ti.value, to.value);
    if (!verify_values(parseFloat(val1.value), slope2)) {
        console.log("please correct the slope value");
        return;
    }
    alert('Entered Slope values is Correct!!');
    activity6();
}
//# sourceMappingURL=activity5.js.map