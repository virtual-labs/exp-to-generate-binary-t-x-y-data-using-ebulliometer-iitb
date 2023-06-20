var move_to_act8_btn = `<button id="panel1_btn" class="btn btn-primary" onclick="activity8();" style=" position: absolute; bottom: 8vh; width: 85%;">Plot</button>`;
function activity7() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    let col_heading = ['Composition', "T (&#8451;)", "x1", "y1", "&gamma;1", "&gamma;2", "G<sup>E</sup>/RT", "(G<sup>E</sup>/RT)/(x1 * x2)", "Check"];
    let verification_row = [[composition[selected_index], calculated_table[selected_index][0].toFixed(2), calculated_table[selected_index][1].toFixed(4), calculated_table[selected_index][2].toFixed(4), `<input type='text' class='form-control' id='g1' />`, `<input type='text' class='form-control' id='g2' />`, `<input type='text' class='form-control' id='ge' />`, `<input type='text' class='form-control' id='ratio' />`, `<input type='button' value='Verify' class='btn btn-primary' onclick='verify_act7();' />`]];
    let tab_act7 = new Table(col_heading, verification_row);
    pp.addtoleftpannel(tab_act7.template);
    tab_act7.draw();
    let right_panel_text = `
    <div>

        <p>A1 = ${A1}, A2 = ${A2}</p>
        <p>B1 = ${B1}, B2 = ${B2}</p>
        <p>C1 = ${C1}, C2 = ${C2}</p>
        <p>P = ${P}</p>

        <p>log<sub>10</sub>(p<sub>i</sub><sup>set</sup>) = A<sub>i</sub> - B<sub>i</sub> / (C<sub>i</sub> + T)</p>

        <p>&gamma;<sub>i</sub> = x<sub>i</sub>*p<sub>i</sub><sup>set</sup>/ (y<sub>i</sub>*P)</p>

        <p>G<sup>E</sup>/RT = x<sub>1</sub>*ln(&gamma;<sub>1</sub>) + x<sub>2</sub>*ln(&gamma;<sub>2</sub>)</p>
    </div>
    `;
    pp.addtorightpannel(right_panel_text, 3);
}
function verify_act7() {
    let val1 = document.getElementById(`g1`);
    let val2 = document.getElementById(`g2`);
    let val3 = document.getElementById(`ge`);
    let val4 = document.getElementById(`ratio`);
    if (!verify_values(parseFloat(val1.value), calculated_table[selected_index][3])) {
        alert(`please check gamma 1 value`);
        return;
    }
    if (!verify_values(parseFloat(val2.value), calculated_table[selected_index][4])) {
        alert(`please check gamma 2 value`);
        return;
    }
    if (!verify_values(parseFloat(val3.value), calculated_table[selected_index][5])) {
        alert(`please check g^e/RT value`);
        return;
    }
    if (!verify_values(parseFloat(val4.value), calculated_table[selected_index][6])) {
        alert(`please check (g^e/RT) / (x1*x2) value`);
        return;
    }
    alert('All values are correct!!');
    draw_table_act7();
}
function draw_table_act7() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    let col_heading = ['Composition', "T (&#8451;)", "x1", "y1", "&gamma;1", "&gamma;2", "G<sup>E</sup>/RT", "(G<sup>E</sup>/RT)/(x1 * x2)"];
    let verification_row = [];
    for (let i = 0; i < calculated_table.length; i++) {
        verification_row[i] = [];
        verification_row[i][0] = composition[i];
        for (let j = 0; j < calculated_table[i].length; j++) {
            verification_row[i][j + 1] = calculated_table[i][j].toFixed(4);
        }
    }
    let tab_act7 = new Table(col_heading, verification_row);
    pp.addtoleftpannel(tab_act7.template);
    tab_act7.draw();
    let rows = document.getElementsByTagName('tr');
    rows[selected_index + 1].style.backgroundColor = 'yellow';
    pp.showdescription('Plot the graph', 3);
    pp.addtorightpannel(move_to_act8_btn, 3);
}
//# sourceMappingURL=activity7.js.map