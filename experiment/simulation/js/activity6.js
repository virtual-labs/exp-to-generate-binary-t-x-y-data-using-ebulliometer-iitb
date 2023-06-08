function activity6() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    let right_panel_text = `
    <div>

    <div>
        <p style="font-weight: bold; font-size: calc(0.7vw + 6px); background-color: black; color: white; padding-left: 2%;">Mass</p>
        <label for="">Mass of mixture A</label>
        <input disabled value='${Ma}' class='form-control' type="text" id='ma-val' />
        <br>
        <label for="">Mass of External Std. C</label>
        <input disabled value='${Mc}' class='form-control' type="text" id='mc-val' />
    </div>

    <br>

    <div>
        <p style="font-weight: bold; font-size: calc(0.7vw + 6px); background-color: black; color: white; padding-left: 2%;">Molecular Weight</p>
        <label for="">Molecular Weight M1</label>
        <input disabled value='${MW1}' class='form-control' type="text" id='mw1-val' />
        <br>
        <label for="">Molecular Weight M2</label>
        <input disabled value='${MW2}' class='form-control' type="text" id='mw2-val' />
    </div>

    <br>

    <div>
        <p style="font-weight: bold; font-size: calc(0.7vw + 6px); background-color: black; color: white; padding-left: 2%;">GC Area</p>
        <label for="">Area of Comp1, AA</label>
        <input disabled value='${AA}' class='form-control' type="text" id='aa-val' />
        <br>
        <label for="">Area of Comp2, AB</label>
        <input disabled value='${AB}' class='form-control' type="text" id='ab-val' />
        <br>
        <label for="">Area of External Std, AC</label>
        <input disabled value='${AC}' class='form-control' type="text" id='ac-val' />
    </div>

    <br>

    <div>
        <p style="font-weight: bold; font-size: calc(0.7vw + 6px); background-color: black; color: white; padding-left: 2%;">Slope Values</p>
        <label for="">Slope 1</label>
        <input disabled value='${slope1}' class='form-control' type="text" id='slope1-val' />
        <br>
        <label for="">Slope 2</label>
        <input disabled value='${slope2}' class='form-control' type="text" id='slope2-val' />
    </div>

    </div>
    `;
    pp.addtorightpannel(right_panel_text, 3);
    // first table
    let activity6_table_heading1 = ["Comp", "Mass", "Calculation Formula"];
    let verification_row_1 = [
        [`Comp 1`, `<input type='text' class='form-control' id='mass-inp-1' />`, `AA / (AC * slope1)`],
        [`Comp 2`, `<input type='text' class='form-control' id='mass-inp-2' />`, 'AB / (AC * slope2)']
    ];
    let act6_tb1 = new Table2(activity6_table_heading1, verification_row_1, "h-1", "b-1", "Mass");
    //seond table
    let activity6_table_heading2 = ["Comp", "Moles", "Calculation Formula"];
    let verification_row_2 = [
        [`Comp 1`, `<input type='text' class='form-control' id='moles-inp-1' />`, 'mass_comp_1 / M1'],
        [`Comp 2`, `<input type='text' class='form-control' id='moles-inp-2' />`, 'mass_comp_2 / M2']
    ];
    let act6_tb2 = new Table2(activity6_table_heading2, verification_row_2, "h-2", "b-2", "Moles");
    //third table
    let activity6_table_heading3 = ["Comp", "Mole Fraction", "Calculation Formula"];
    let verification_row_3 = [
        [`Comp 1`, `<input type='text' class='form-control' id='moles-fraction-inp-1' />`, 'moles_comp_1 / (moles_comp_1 + moles_comp_2)'],
        [`Comp 2`, `<input type='text' class='form-control' id='moles-fraction-inp-2' />`, '1 - moles_comp_1']
    ];
    let act6_tb3 = new Table2(activity6_table_heading3, verification_row_3, "h-3", "b-3", "Mole Fraction");
    pp.addtoleftpannel(act6_tb1.template);
    pp.addtoleftpannel(act6_tb2.template);
    pp.addtoleftpannel(act6_tb3.template);
    act6_tb1.draw();
    act6_tb2.draw();
    act6_tb3.draw();
    let next_btn = `<button id="next_btn" class="btn btn-primary" style="text-align: center; margin-left: 45%;" onclick="verify_act6_inputs();">Verify</button>`;
    pp.addtoleftpannel(next_btn);
    console.log(mass_comp1, mass_comp2, moles_comp1, moles_comp2, moles_fraction_comp1, moles_fraction_comp2);
}
function verify_act6_inputs() {
    let val1 = document.getElementById(`mass-inp-1`);
    let val2 = document.getElementById(`mass-inp-2`);
    let val3 = document.getElementById(`moles-inp-1`);
    let val4 = document.getElementById(`moles-inp-2`);
    let val5 = document.getElementById(`moles-fraction-inp-1`);
    let val6 = document.getElementById(`moles-fraction-inp-2`);
    if (!verify_values(parseFloat(val1.value), mass_comp1)) {
        alert(`please check first Comp 1 value`);
        return;
    }
    if (!verify_values(parseFloat(val2.value), mass_comp2)) {
        alert(`please check first Comp 2 value`);
        return;
    }
    if (!verify_values(parseFloat(val3.value), moles_comp1)) {
        alert(`please check first Enternal Std value`);
        return;
    }
    if (!verify_values(parseFloat(val4.value), moles_comp2)) {
        alert(`please check Second Comp 1 value`);
        return;
    }
    if (!verify_values(parseFloat(val5.value), moles_fraction_comp1)) {
        alert(`please check Second Comp 2 value`);
        return;
    }
    if (!verify_values(parseFloat(val6.value), moles_fraction_comp2)) {
        alert(`please check Second External Std value`);
        return;
    }
    alert("all values are right!!");
    activity7();
}
//# sourceMappingURL=activity6.js.map