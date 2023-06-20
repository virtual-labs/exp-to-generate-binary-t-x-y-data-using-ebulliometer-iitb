var first_btn = `<button id="panel1_btn" class="btn btn-primary" onclick="activity5();" style=" position: absolute; bottom: 8vh; width: 85%;">Plot</button>`;
function activity4() {
    pp.clearleftpannel();
    let t1_heading = ["Comp 1", "Comp 2", "External Std", "Comp 1", "Comp 2", "External Std", "Check"];
    let verify_row = [[`<input type="text" id="inp-1">`, `<input type="text" id="inp-2">`, `<input type="text" id="inp-3">`, `<input type="text" id="inp-4">`, `<input type="text" id="inp-5">`, `<input type="text"  id="inp-6">`, `<input type="submit" class="btn btn-primary" onclick="verify_act4();">`]];
    let table1_element = new Table1(t1_heading, verify_row, "heading-1", "body-1");
    pp.addtoleftpannel(table1_element.template);
    table1_element.draw();
    calculate_table2();
    console.log(table2);
    calculate_regression();
    mass_calculation();
    calculate_last_table();
}
function verify_act4() {
    let val1 = document.getElementById(`inp-1`);
    let val2 = document.getElementById(`inp-2`);
    let val3 = document.getElementById(`inp-3`);
    let val4 = document.getElementById(`inp-4`);
    let val5 = document.getElementById(`inp-5`);
    let val6 = document.getElementById(`inp-6`);
    if (!verify_values(parseFloat(val1.value), table1[0][0])) {
        alert(`please check first Comp 1 value`);
        return;
    }
    if (!verify_values(parseFloat(val2.value), table1[0][1])) {
        alert(`please check first Comp 2 value`);
        return;
    }
    if (!verify_values(parseFloat(val3.value), table1[0][2])) {
        alert(`please check first Enternal Std value`);
        return;
    }
    if (!verify_values(parseFloat(val4.value), table1[0][3])) {
        alert(`please check Second Comp 1 value`);
        return;
    }
    if (!verify_values(parseFloat(val5.value), table1[0][4])) {
        alert(`please check Second Comp 2 value`);
        return;
    }
    if (!verify_values(parseFloat(val6.value), table1[0][5])) {
        alert(`please check Second External Std value`);
        return;
    }
    alert("all values are right!!");
    pp.clearleftpannel();
    let t1_heading = ["Comp 1", "Comp 2", "External Std", "Comp 1", "Comp 2", "External Std"];
    let temp_table = [];
    for (let i = 0; i < table1.length; i++) {
        temp_table[i] = [];
        for (let j = 0; j < table1[i].length; j++) {
            temp_table[i][j] = table1[i][j].toFixed(4);
        }
    }
    let t1_ele = new Table1(t1_heading, temp_table, "heading-1", "body-1");
    pp.addtoleftpannel(t1_ele.template);
    t1_ele.draw();
    let t2_heading = ["Comp 1/External Std", "Comp 2/External Std", "Comp 1/External Std", "Comp 2/External Std", "Check"];
    let verify_row = [[`<input type="text" id="inp-1">`, `<input type="text" id="inp-2">`, `<input type="text" id="inp-3">`, `<input type="text" id="inp-4">`, `<input type="submit" class="btn btn-primary" onclick="verify_t2();">`]];
    let t2_ele = new Table1(t2_heading, verify_row, "heading-2", "body-2");
    pp.addtoleftpannel(t2_ele.template);
    t2_ele.draw();
}
function verify_t2() {
    let val1 = document.getElementById(`inp-1`);
    let val2 = document.getElementById(`inp-2`);
    let val3 = document.getElementById(`inp-3`);
    let val4 = document.getElementById(`inp-4`);
    if (!verify_values(parseFloat(val1.value), table2[0][0])) {
        alert(`please check first Comp 1/External Std value`);
        return;
    }
    if (!verify_values(parseFloat(val2.value), table2[0][1])) {
        alert(`please check first Comp 2/External Std  value`);
        return;
    }
    if (!verify_values(parseFloat(val3.value), table2[0][2])) {
        alert(`please check Second Comp 1/External Std value`);
        return;
    }
    if (!verify_values(parseFloat(val4.value), table2[0][3])) {
        alert(`please check Second Comp 2/External Std value`);
        return;
    }
    alert("All Values are correct!!");
    pp.clearleftpannel();
    let t2_heading = ["Comp 1/External Std", "Comp 2/External Std", "Comp 1/External Std", "Comp 2/External Std"];
    let temp_t2 = [];
    for (let i = 0; i < table2.length; i++) {
        temp_t2[i] = [];
        for (let j = 0; j < table2[i].length; j++) {
            temp_t2[i][j] = table2[i][j].toFixed(4);
        }
    }
    let t2_ele = new Table1(t2_heading, temp_t2, "heading-2", "body-2");
    pp.addtoleftpannel(t2_ele.template);
    t2_ele.draw();
    pp.showdescription("Click Next button to see graph", 3);
    pp.addtorightpannel(first_btn, 3);
}
//# sourceMappingURL=activity4.js.map