var first_btn = `<button id="panel1_btn" class="btn btn-primary" onclick="activity5();" style=" position: absolute; bottom: 8vh; width: 85%;">Plot</button>`;

let calib_sim: HTMLDivElement;
let table1_all_data = [];

function activity4() {
    pp.clearleftpannel();

    let t1_heading = ["Comp 1", "Comp 2", "External Std", "Comp 1", "Comp 2", "External Std", "Check"];

    let table1_data = data[main_ind].table1;

    table1_all_data = table1_data;

    let row_data = [[`${table1_data[0][0]}`, `${table1_data[0][1]}`, `${table1_data[0][2]}`, `<input type="text" id="inp-4" disabled>`, `<input type="text" disabled  id="inp-5">`, `<input type="text" disabled  id="inp-6">`, `<input type="submit" class="btn btn-primary" onclick="verify_act4();" value='Calibrate'>`]];


    // let verify_row = [[`<input type="text" id="inp-1">`, `<input type="text" id="inp-2">`, `<input type="text" id="inp-3">`, `<input type="text" id="inp-4">`, `<input type="text" id="inp-5">`, `<input type="text"  id="inp-6">`, `<input type="submit" class="btn btn-primary" onclick="verify_act4();">`]]; 


    let table1_element = new Table1(t1_heading, row_data, "heading-1", "body-1");

    pp.addtoleftpannel(table1_element.template);

    table1_element.draw();

    let tab_ele = <HTMLTableElement> document.getElementsByClassName('tab-4')[0];
    tab_ele.style.height = "10vw";
    tab_ele.style.overflow = 'auto';

    calculate_table2();

    console.log(table2);

    calculate_regression();

    mass_calculation();

    calculate_last_table();

     //add calibration video
     create_calib_sim_setup();
}

function verify_act4() {
    let val4: HTMLInputElement = <HTMLInputElement> document.getElementById(`inp-4`);
    let val5: HTMLInputElement = <HTMLInputElement> document.getElementById(`inp-5`);
    let val6: HTMLInputElement = <HTMLInputElement> document.getElementById(`inp-6`);

    console.log(table1[0][0], table1[0][1], table1[0][2], table1[0][3], table1[0][4], table1[0][5]);


    // if(!verify_values(parseFloat(val4.value), table1[0][3])) {
    //     alert(`please check Second Comp 1 value`);
    //     return;
    // }

    // if(!verify_values(parseFloat(val5.value), table1[0][4])) {
    //     alert(`please check Second Comp 2 value`);
    //     return;
    // }

    // if(!verify_values(parseFloat(val6.value), table1[0][5])) {
    //     alert(`please check Second External Std value`);
    //     return;
    // }

   

    alert("all values are right!!");

    // pp.clearleftpannel();

    // let t1_heading = ["Comp 1", "Comp 2", "External Std", "Comp 1", "Comp 2", "External Std"];

    // let temp_table = [];

    // for(let i=0; i<table1.length; i++) {
    //     temp_table[i] = [];
    //     for(let j=0; j<table1[i].length; j++) {
    //         temp_table[i][j] = table1[i][j].toFixed(4);
    //     }
    // }

    // let t1_ele = new Table1(t1_heading, temp_table, "heading-1", "body-1");

    // pp.addtoleftpannel(t1_ele.template);

    // t1_ele.draw();

    // let tab_ele = <HTMLTableElement> document.getElementById('tab-4');
    // tab_ele.style.height = "20vw";
    // tab_ele.style.overflow = 'auto';
    // tab_ele.style.fontSize = '1.3vw';

    let show_spinner = document.getElementById('show-spinner');
    show_spinner.style.display = 'block';
    

   

    //run calibration video
    let setup_vid = <HTMLVideoElement> document.getElementById('setup-vid');
    setup_vid.play();
    setTimeout(() => {
        show_spinner.style.display = 'none';
        let show_graph = document.getElementById('m-t-graph');
        show_graph.style.display = 'block';
        val4.value = table1_all_data[0][3];
        val5.value = table1_all_data[0][4];
        val6.value = table1_all_data[0][5];
        let comp_btn = document.getElementById('compelete-btn');
        comp_btn.style.display = 'block';
    }, 7000);



    // let t2_heading = ["Comp 1/External Std", "Comp 2/External Std", "Comp 1/External Std", "Comp 2/External Std", "Check"];

    // let verify_row = [[`<input type="text" id="inp-1">`, `<input type="text" id="inp-2">`, `<input type="text" id="inp-3">`, `<input type="text" id="inp-4">`, `<input type="submit" class="btn btn-primary" onclick="verify_t2();">`]]; 


    // let t2_ele = new Table1(t2_heading, verify_row, "heading-2", "body-2");

    // pp.addtoleftpannel(t2_ele.template);

    // t2_ele.draw();
}

function create_calib_sim_setup() {

    let calib_text = `
        <div class='row' style='width: 100%; height: 23vw;'>
        <div class='col-6' style='position: relative;'>

            <div><button class='btn btn-primary' onclick='complete_table();' style='display: none;' id='compelete-btn' >Get values for rest of the rows</button></div>

            <video style=' position: relative; left: 20%; height: 30vw;' id='setup-vid'>
            <source src='./images/old_Assembly/Calibration.mp4'>
            </video>
        </div>

        <div class='col-6' style='position: relative;'>
          
            <div class="spinner-border" role="status" style='position: absolute; right: 43%; top: 9vw; display: none;' id='show-spinner' >
                <span class="visually-hidden">Loading...</span>
            </div>


            <img style='height: 16vw; position: absolute; right: 15%; top: 3vw; display: none;' src='./images/old_Assembly/display_m.webp' id='m-t-graph' >


            <img style='position:relative; left: 15%; height: 25vw;' src='./images/old_Assembly/Computer.webp'>
        </div>
    
        </div>
    `;

    pp.addtoleftpannel(calib_text);
}


function verify_t2() {
    let val1: HTMLInputElement = <HTMLInputElement> document.getElementById(`inp-1`);
    let val2: HTMLInputElement = <HTMLInputElement> document.getElementById(`inp-2`);
    let val3: HTMLInputElement = <HTMLInputElement> document.getElementById(`inp-3`);
    let val4: HTMLInputElement = <HTMLInputElement> document.getElementById(`inp-4`);

    add_std_deviation();

    console.log(table2[0][0], table2[0][1], table2[0][2], table2[0][3]);
    

    if(!verify_values(parseFloat(val1.value), table2[0][0])) {
        alert(`please check first Comp 1/External Std value`);
        return;
    }

    if(!verify_values(parseFloat(val2.value), table2[0][1])) {
        alert(`please check first Comp 2/External Std  value`);
        return;
    }

    if(!verify_values(parseFloat(val3.value), table2[0][2])) {
        alert(`please check Second Comp 1/External Std value`);
        return;
    }

    if(!verify_values(parseFloat(val4.value), table2[0][3])) {
        alert(`please check Second Comp 2/External Std value`);
        return;
    }

    alert("All Values are correct!!");

    pp.clearleftpannel();

    let t2_heading = ["Comp 1/External Std", "Comp 2/External Std", "Comp 1/External Std", "Comp 2/External Std"];

    let temp_t2 = [];

    for(let i=0; i<table2.length; i++) {
        temp_t2[i] = [];
        for(let j=0; j<table2[i].length; j++) {
            temp_t2[i][j] = table2[i][j].toFixed(4);

        }
    }

    let t2_ele = new Table1(t2_heading, temp_t2, "heading-2", "body-2");

    pp.addtoleftpannel(t2_ele.template);

    t2_ele.draw();

    pp.showdescription("Click Next button to see graph", 3);

    
    pp.addtorightpannel(first_btn, 3);

    let tab2 = <HTMLTableElement> document.getElementsByClassName('tab-4')[0];
    tab2.style.height = "35vw";
    tab2.style.overflow = 'auto';
    tab2.style.fontSize = '1.3vw';

}

function complete_table() {
    pp.clearleftpannel();

    let t1_heading = ["Comp 1", "Comp 2", "External Std", "Comp 1", "Comp 2", "External Std"];

    let temp_table = [];

    for(let i=0; i<table1.length; i++) {
        temp_table[i] = [];
        for(let j=0; j<table1[i].length; j++) {
            temp_table[i][j] = table1[i][j].toFixed(4);
        }
    }

    let t1_ele = new Table1(t1_heading, temp_table, "heading-1", "body-1");

    pp.addtoleftpannel(t1_ele.template);

    t1_ele.draw();

   
    let tab_ele = <HTMLTableElement> document.getElementsByClassName('tab-4')[0];
    tab_ele.style.height = "20vw";
    tab_ele.style.overflow = 'auto';
    tab_ele.style.fontSize = '1.3vw';

    //next table
    let t2_heading = ["Comp 1/External Std", "Comp 2/External Std", "Comp 1/External Std", "Comp 2/External Std", "Check"];

    let verify_row = [[`<input type="text" id="inp-1">`, `<input type="text" id="inp-2">`, `<input type="text" id="inp-3">`, `<input type="text" id="inp-4">`, `<input type="submit" class="btn btn-primary" onclick="verify_t2();">`]]; 


    let t2_ele = new Table1(t2_heading, verify_row, "heading-2", "body-2");

    pp.addtoleftpannel(t2_ele.template);

    t2_ele.draw();

    let tab2 = <HTMLTableElement> document.getElementsByClassName('tab-4')[1];
    tab2.style.height = "20vw";
    tab2.style.overflow = 'auto';
    tab2.style.fontSize = '1.3vw';


}

