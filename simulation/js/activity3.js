let random_temp = random(70, 95);
function activity3() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    pp.showtitle('Vapour Liquid Equilibrium', 3);
    let dd_text = `
    <div>
    <label for="">Select the System</label>
    <select id="name-dd" onchange="load_compositions();" class="form-select" name="" id="">
        <option value="">--Select--</option>
    </select>

    <br>

    <label for="">Select the Composition</label>
    <select id="composition-dd" onchange="set_values();" class="form-select" name="" id="">
        <option value="">--Select--</option>
    </select>

    <br>

    <label for="">Dimmer Stat Reading</label>
    <input onchange="show_temp_reading();" oninput="show_temp_reading();" id="dimmer-inp" type="range" min="0" max="100" step="1" value="0">
    <label id="show-dimmer-reading"></label>

    <br>

    <button id="dd-submit-btn" disabled class="btn btn-primary" onclick="activity4();">Submit</button>


    </div>

    `;
    pp.addtoleftpannel(dd_text);
    load_options();
}
function load_options() {
    let sel = document.getElementById('name-dd');
    for (let i = 0; i < data.length; i++) {
        sel.innerHTML += `<option>${data[i].name}</option>`;
    }
}
function load_compositions() {
    let sel0 = document.getElementById('name-dd');
    let sel = document.getElementById('composition-dd');
    sel.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        if (data[i].name == sel0.value) {
            for (let j = 0; j < data[i].composition.length; j++) {
                sel.innerHTML += `<option value="${j}">${data[i].composition[j]}</option>`;
            }
            break;
        }
    }
}
function set_values() {
    let sel0 = document.getElementById('name-dd');
    let sel = document.getElementById('composition-dd');
    selected_name = sel0.value;
    selected_index = parseInt(sel.value);
    set_data(selected_name, selected_index);
    add_std_deviation();
}
function show_temp_reading() {
    let dimmer = document.getElementById('dimmer-inp');
    let dimmer_reading = parseInt(dimmer.value);
    if (dimmer_reading < random_temp) {
        var temp = T * dimmer_reading / random_temp;
    }
    else {
        var temp = T;
    }
    let label = document.getElementById('show-dimmer-reading');
    let btn = document.getElementById("dd-submit-btn");
    if (temp == T) {
        //enable submit button, turn label to green
        label.style.backgroundColor = 'green';
        btn.disabled = false;
    }
    else {
        label.style.backgroundColor = 'white';
        btn.disabled = true;
    }
    // label value = temp
    label.innerHTML = temp.toFixed(2);
}
function add_std_deviation() {
    console.log(XX.length);
    for (let i = 0; i < XX.length; i++) {
        XX[i] = std_deviation(XX[i]);
        YY[i] = std_deviation(YY[i]);
        TT[i] = std_deviation(TT[i]);
    }
    for (let i = 0; i < table1.length; i++) {
        for (let j = 0; j < table1[i].length; j++) {
            table1[i][j] = std_deviation(table1[i][j]);
        }
    }
    T = TT[selected_index];
    X1 = XX[selected_index];
    Y1 = YY[selected_index];
}
//# sourceMappingURL=activity3.js.map