let dimmer_stat_reading = 81;
let selected_index = 3;
let X1;
let Y1;
let T;
let MW1;
let MW2;
let A1;
let A2;
let B1;
let B2;
let C1;
let C2;
let P;
let table1 = [];
let table2 = [];
let table3 = [];
let slope1;
let slope2;
let pol1, pol2;
let Ma;
let Mc;
let AA;
let AB;
let AC = Math.round(random(200, 350));
let mass_comp1;
let mass_comp2;
let moles_comp1;
let moles_comp2;
let moles_fraction_comp1;
let moles_fraction_comp2;
let XX, YY, TT;
let calculated_table = [];
let composition = [];
let data = [
    {
        "name": "Cumene-phenol",
        "P": 760,
        "composition": [
            "0.1 - 0.9",
            "0.2 - 0.8",
            "0.3 - 0.7",
            "0.4 - 0.6",
            "0.5 - 0.5",
            "0.6 - 0.4",
            "0.7 - 0.3",
            "0.8 - 0.2",
            "0.9 - 0.1"
        ],
        "X1": [0.0932, 0.2209, 0.3444, 0.4514, 0.5178, 0.6159, 0.7049, 0.8282, 0.9036],
        "Y1": [0.3326, 0.5429, 0.6339, 0.7048, 0.7319, 0.7739, 0.8133, 0.8763, 0.9245],
        "T": [170.65, 162.80, 159.10, 156.90, 155.80, 154.55, 153.75, 152.75, 152.45],
        "MW1": 120.19,
        "MW2": 94.11,
        "A1": 7.10691,
        "A2": 7.54098,
        "B1": 1577.97,
        "B2": 1801.28,
        "C1": 220.977,
        "C2": 204.687,
        "table1": [
            [1.002, 4.002, 0.999, 122.972, 1388.915, 332.985],
            [1.999, 3.001, 1.002, 302.299, 1163.667, 372.054],
            [3.001, 1.998, 1, 473.951, 758.585, 372.316],
            [3.998, 0.999, 0.998, 896.793, 515.062, 538.198]
        ],
        "table3": [
            ["0.1-0.9", "S_L1", "S_V1", 5.005, 4.998, 1.001, 0.998],
            ["0.2-0.8", "S_L2", "S_V2", 5.002, 5.002, 1.001, 1.001],
            ["0.3-0.7", "S_L3", "S_V3", 4.999, 5.002, 0.998, 0.998],
            ["0.4-0.6", "S_L4", "S_V4", 4.995, 4.995, 0.999, 1.004],
            ["0.5-0.5", "S_L5", "S_V5", 4.998, 5.002, 0.997, 0.998],
            ["0.6-0.4", "S_L6", "S_V6", 5.003, 5.003, 1.001, 1.001],
            ["0.7-0.3", "S_L7", "S_V7", 5.003, 5.005, 1.000, 0.999],
            ["0.8-0.2", "S_L8", "S_V8", 5.002, 5.001, 1.001, 0.998],
            ["0.9-0.1", "S_L9", "S_V9", 5.002, 5.005, 1.004, 0.998]
        ]
    }
];
let selected_name = "Cumene-phenol";
let selected_composition;
function set_data(selected_name, selected_index) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].name == selected_name) {
            selected_composition = data[i].composition[selected_index];
            X1 = data[i].X1[selected_index];
            XX = data[i].X1;
            Y1 = data[i].Y1[selected_index];
            YY = data[i].Y1;
            MW1 = data[i].MW1;
            MW2 = data[i].MW2;
            T = data[i].T[selected_index];
            TT = data[i].T;
            A1 = data[i].A1;
            B1 = data[i].B1;
            C1 = data[i].C1;
            A2 = data[i].A2;
            B2 = data[i].B2;
            C2 = data[i].C2;
            P = data[i].P;
            composition = data[i].composition;
            console.log(selected_name, selected_composition, X1, Y1, T, MW1, MW2, A1, A2, B1, B2, C1, C2, P);
            table1 = data[i].table1;
            table3 = data[i].table3;
            break;
        }
    }
}
set_data(selected_name, selected_index);
function calculate_table2() {
    for (let i = 0; i < table1.length; i++) {
        table2[i] = [];
        table2[i][0] = table1[i][0] / table1[i][2];
        table2[i][1] = table1[i][1] / table1[i][2];
        table2[i][2] = table1[i][3] / table1[i][5];
        table2[i][3] = table1[i][4] / table1[i][5];
    }
}
function calculate_regression() {
    let x = [];
    let y = [];
    for (let i = 0; i < table2.length; i++) {
        x.push(table2[i][0]);
        y.push(table2[i][2]);
    }
    pol1 = regression_linear(x, y);
    console.log(pol1);
    slope1 = pol1[0];
    x = [];
    y = [];
    for (let i = 0; i < table2.length; i++) {
        x.push(table2[i][1]);
        y.push(table2[i][3]);
    }
    pol2 = regression_linear(x, y);
    slope2 = pol2[0];
    console.log(slope1, slope2);
}
function mass_calculation() {
    // AC = 300;
    Ma = table3[selected_index][3];
    Mc = table3[selected_index][5];
    AA = Ma * MW1 * X1 * slope1 * AC / (MW1 * X1 + MW2 * (1 - X1));
    AA = AA / Mc;
    AB = Ma * MW2 * (1 - X1) * slope2 * AC / (MW1 * X1 + MW2 * (1 - X1));
    AB = AB / Mc;
    console.log(AA, AB);
    mass_comp1 = AA / (AC * slope1);
    mass_comp2 = AB / (AC * slope2);
    moles_comp1 = mass_comp1 / MW1;
    moles_comp2 = mass_comp2 / MW2;
    moles_fraction_comp1 = moles_comp1 / (moles_comp1 + moles_comp2);
    moles_fraction_comp2 = moles_comp2 / (moles_comp1 + moles_comp2);
    console.log(mass_comp1, mass_comp2, moles_comp1, moles_comp2, moles_fraction_comp1, moles_fraction_comp2);
}
function calculate_last_table() {
    for (let i = 0; i < XX.length; i++) {
        calculated_table[i] = [];
        calculated_table[i][0] = TT[i];
        calculated_table[i][1] = XX[i];
        calculated_table[i][2] = YY[i];
        let Pi = Math.pow(10, (A1 - B1 / (C1 + TT[i])));
        calculated_table[i][3] = XX[i] * Pi / (YY[i] * P);
        let P1i = Math.pow(10, (A2 - B2 / (C2 + TT[i])));
        calculated_table[i][4] = (1 - XX[i]) * P1i / ((1 - YY[i]) * P);
        calculated_table[i][5] = XX[i] * Math.log(calculated_table[i][3]) + (1 - XX[i]) * Math.log(calculated_table[i][4]);
        calculated_table[i][6] = calculated_table[i][5] / (XX[i] * (1 - XX[i]));
    }
    console.log(calculated_table);
}
//# sourceMappingURL=data.js.map