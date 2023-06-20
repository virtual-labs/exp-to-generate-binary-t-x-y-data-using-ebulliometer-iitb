function activity8() {
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    draw_chart_3();
}
function draw_chart_3() {
    //document.getElementById('hide_panel3').click();
    pp.clearleftpannel();
    pp.addcanvas('myChart');
    // if(document.getElementById('panel1_btn')) {
    //     document.getElementById("panel1_btn").remove();
    // }
    //pp.addButtonToRightPanel("hello", print_hello, 3);
    label = [];
    graph_data = [];
    for (let i = 0; i < calculated_table.length; i++) {
        label.push(calculated_table[i][1]);
        graph_data.push(Math.abs(calculated_table[i][6]));
    }
    calculate_y_datapoints_3();
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
                        text: '(G^(E) / RT) / (x1*x2)',
                        font: { size: 14, weight: 'bold' }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'x1',
                        font: { size: 14, weight: 'bold' }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `${selected_name}, Composition: ${composition[selected_index]} (G^(E) / RT) / (x1*x2) vs x1`,
                    font: { size: 18 },
                },
                legend: { labels: { font: { size: 14, weight: 'bold' } } }
            },
        }
    });
}
function calculate_y_datapoints_3() {
    pol1_data = regression_linear(label, graph_data);
    graph_data1 = [];
    // console.log(pol);
    for (let i = 0; i < label.length; i++) {
        graph_data1.push(pol1_data[0] * label[i] + pol1_data[1]);
    }
}
//# sourceMappingURL=activity8.js.map