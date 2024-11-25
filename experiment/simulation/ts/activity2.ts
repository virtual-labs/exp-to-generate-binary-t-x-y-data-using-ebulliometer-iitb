let seq_container = [];
let seq = 0;
let timer_text: Chemistry.Geo_Text;
let temp_text: Chemistry.Geo_Text;
let stop_watch: Chemistry.Custome_image;
let obs_table;
let collect_sample: Chemistry.Custome_image;
let main_ind: number = 0;

//button and states
let cp_btn_1: HTMLButtonElement;
let cp_btn_2: HTMLButtonElement;
let cp_btn_3: HTMLButtonElement;
let cp_btn_4: HTMLButtonElement;
let cp_btn_5: HTMLInputElement;
let state_btn_1: boolean = false;
let state_btn_2: boolean = false;
let state_btn_3: boolean = false;
let state_btn_4: boolean = false;
let db_1: HTMLSelectElement;
let db_2: HTMLSelectElement;
let anim_btn: HTMLButtonElement;
let drop_img: HTMLDivElement;
let smoke_img: HTMLDivElement;

let bottom_cp: HTMLDivElement;
let take_ls_reading: boolean = false;
let take_vs_reading: boolean = false;
let ts_div: HTMLDivElement;
let ls_btn: HTMLButtonElement;
let vs_btn: HTMLButtonElement;


//selected values
let system_val: string;
let composition_val: string;




function activity2() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    pp.addoffcanvas(4);

    let oc: HTMLButtonElement = <HTMLButtonElement> document.getElementsByClassName('offcanvasbtn')[1];
    oc.style.position = 'absolute';
    oc.style.top = '8vh';
    let oc2 = oc.children;
    oc2[0].setAttribute('class', 'bi bi-table');
    pp.showtitle('<p id="exp-title">Steps for perfoming Experiment</p>', 3);

    //resize offcanvas for table
    let ele: HTMLDivElement = <HTMLDivElement> document.getElementById('offcanvasRight4');
    ele.style.width = '70vw';


    //control panel for  experimental setup
    add_control_panel();



    // adding canvas
    pp.addcanvas('mycanvas');
    canvas = pp.canvas;
    context = canvas.getContext('2d');

     // add rect and scene
     canvas.style.cursor="crosshair";
     rect=canvas.getBoundingClientRect();
     scene=new Scene();

     let seq_img = new Chemistry.Custome_image(seq1_img, new Chemistry.Point(500, 450), 778, 871, canvas);
     seq_container.push(seq_img);

     // assign all images and elements
    assign_all_images_and_elements();
   
    window.onload = a2_windowresize;
    window.onresize = a2_windowresize;
    a2_windowresize();

    canvas.addEventListener('click', show_coordinates);
}

function a2_windowresize() {
     //canvas size
     a1_canvas_size();

     //canvas mapping
     a1_canvas_mapping();
 
    //draw scene
     scene.draw();

     draw_all_seq();
}

function a2_canvas_size() {
    canvas.width=window.innerWidth*0.91;
    canvas.height=canvas.width*1080.0/1920*0.85;
    lscale=canvas.width/1920.0;
    document.getElementById('leftpannel').style.height = (canvas.height + 5) + "px";
    document.getElementById('leftpannel').style.margin = '0';
}


function a2_canvas_mapping(){
    context.translate(0,canvas.height);
    context.scale(1,-1);
}

function assign_all_images_and_elements() {
     //set all button elements
     cp_btn_1 = <HTMLButtonElement> document.getElementById('cp-btn-1');
     cp_btn_2 = <HTMLButtonElement> document.getElementById('cp-btn-2');
     cp_btn_3 = <HTMLButtonElement> document.getElementById('cp-btn-3');
     cp_btn_4 = <HTMLButtonElement> document.getElementById('cp-btn-4');
     cp_btn_5 = <HTMLInputElement> document.getElementById('cp-btn-5');
     db_1 = <HTMLSelectElement> document.getElementById('db-1');
     db_2 = <HTMLSelectElement> document.getElementById('db-2');
     anim_btn = <HTMLButtonElement> document.getElementById('anim-btn');
     drop_img = <HTMLDivElement> document.getElementById('drop-img');
     smoke_img = <HTMLDivElement> document.getElementById('smoke-img');
     
     bottom_cp = <HTMLDivElement> document.getElementById('lower-cp');
     timer_text = new Chemistry.Geo_Text('', new Chemistry.Point(1490,133), canvas);
     timer_text.font = '40%';
     temp_text = new Chemistry.Geo_Text('', new Chemistry.Point(330, 600), canvas);
     temp_text.font = '22%';
     ts_div = <HTMLDivElement> document.getElementById('take-sample-buttons');
     ls_btn = <HTMLButtonElement> document.getElementById('ls-btn');
     vs_btn = <HTMLButtonElement> document.getElementById('vs-btn');
     collect_sample = new Chemistry.Custome_image(injector, new Chemistry.Point(100, 100), 39, 124, canvas)
     collect_sample.stang = -45;
}

function draw_all_seq() {

    scene.draw(); 

    for(let i=0; i<seq_container.length; i++) {
        if(seq_container[i] !== null) {
            seq_container[i].draw();
        }
    }

    if(seq == 0) {
        pp.showdescription('Open the Ebulliometer Outlet Valve after by clicking the button', 3);
        show_oc3();
    }

    if(seq == 1 && state_btn_2) {
        pp.showdescription('Purging started, wait for 30 seconds', 3);
        show_oc3();
        seq_container[0].img = seq2_img;
        smoke_img.style.display = 'block';

        setTimeout(() =>{
            pp.showdescription('Purging completed, outlet gas valve and n2 gas valves closed. Now Select System and Composition', 3);
            show_oc3();
            cp_btn_1.setAttribute('class', 'btn btn-light');
            cp_btn_3.setAttribute('class', 'btn btn-light');
            state_btn_1 = false;
            state_btn_2 = false;
            seq_container[0].img = seq1_img;
            db_1.disabled = false;
            db_2.disabled = false;
            smoke_img.style.display = 'none';
            draw_all_seq();
        }, 5000);


        seq = 2;
        draw_all_seq();
        
    }

    if(seq == 2 && db_1.value != '0' && db_2.value != '0') {
        seq_container[0].img = seq3_img;
        anim_btn.innerText = 'Start Pouring Animation';
        anim_btn.style.display = 'block';
        anim_btn.onclick = () => {
            console.log('starting pouring animation');
            drop_img.style.display = 'block';
            anim_btn.style.display = 'none';

            setTimeout(() => {
                drop_img.style.display = 'none';
                seq_container[0].img = seq4_img;
                pp.showdescription('Start the cold water pump by clicking on the button', 3);
                show_oc3();
                cp_btn_2.onclick = cold_pump_anim;
            }, 5000);
        }
        seq = 3;
        draw_all_seq();
    }

    // first vertical pipe animation
    if(seq == 3 && state_btn_3) {
        if(seq_container[1].l < seq_container[1].l_last) {
            console.log("I was here");
            window.requestAnimationFrame(draw_all_seq);
        } else if(seq_container[1].l >= seq_container[1].l_last) {
            seq = 4;

            let new_anim  = new Chemistry.anim_image_y_dir_down(seq6_img, new Chemistry.Point(500, 450),778, 871, canvas);
            new_anim.l = 130;
            new_anim.l_last = 600;
            new_anim.width = 0;
            seq_container.push(new_anim);
            draw_all_seq();
        }
    }

    // coil animation
    if(seq == 4) {
        if(seq_container[2].l < seq_container[2].l_last) {
            console.log("I was here 2");
            window.requestAnimationFrame(draw_all_seq);
        } else if(seq_container[2].l >= seq_container[2].l_last) {
            seq = 5;

            let new_anim  = new Chemistry.anim_image_x_rev_dir(seq8_img, new Chemistry.Point(500, 450), 778, 871, canvas);
            new_anim.l = 800;
            new_anim.width = 400;
            new_anim.width_last = 0;
            seq_container.push(new_anim);
            draw_all_seq();
        }
    }

    // horizontal pipe animation
    if(seq == 5) {
        if(seq_container[3].width > seq_container[3].width_last) {
            console.log("I was here 3");
            window.requestAnimationFrame(draw_all_seq);
        } else if(seq_container[3].width <= seq_container[3].width_last) {
            cp_btn_2.setAttribute('class', 'btn btn-light');
            pp.showdescription('Turn on Heating coil', 3);
            show_oc3();
            cp_btn_4.onclick = heater_on;
        }
    }

    //create start, stop, reset events
    if(seq == 6 && state_btn_4) {
        console.log('seq-6');
        canvas.addEventListener('click', timer_events);
        cp_btn_3.setAttribute('class', 'btn btn-light');
    }

    //take liquid sample reading
    if(seq == 7 && take_ls_reading) {
       
        timer_text.text = '';
       ts_div.style.display = 'flex';
       ls_btn.onclick= take_ls;
       pp.showdescription('Now click on "Take Liquid Sample" button', 3);
        show_oc3();
    }


    timer_text.draw();
    temp_text.draw();


}

function open_ebu_valve() {
    if(!state_btn_1) {
        pp.showdescription('Ebulliometer Outlet Valve opened, Now Click on the N<sub>2</sub> Gas button to start the purging', 3);
        cp_btn_1.setAttribute('class', 'btn btn-info');
        state_btn_1 = true;
        seq = 1;
        show_oc3();
        draw_all_seq();
    } else {
        cp_btn_1.setAttribute('class', 'btn btn-light');
        state_btn_1 = false;
    }
}

function open_n2_valve() {
    if(seq == 1 && state_btn_1 && !state_btn_2) {
        state_btn_2 = true;
        cp_btn_3.setAttribute('class', 'btn btn-info');
        draw_all_seq();
    } else {
        state_btn_2 = false;
        cp_btn_3.setAttribute('class', 'btn btn-light');
        pp.showdescription('You need to open the Ebulliometer outlet valve first', 3);
        show_oc3();
    }
}

function set_db() {
    if(db_1.value != '0') {
        //set db 1 value
        system_val = db_1.value;
        selected_name = system_val;
    }

    if(db_2.value != '0') {
         //set db 1 value
         composition_val = db_2.value;
         selected_composition = composition_val;
    }

    if(db_1.value != '0' && db_2.value != '0') {
        draw_all_seq();
    }
}

function cold_pump_anim() {
    if(!state_btn_3) {
        state_btn_3 = true;
        cp_btn_2.setAttribute('class', 'btn btn-info');
        pp.showdescription('', 3);
        let new_anim  = new Chemistry.anim_image(seq5_img, new Chemistry.Point(500, 450), 778, 871, canvas);
        

        new_anim.l = 0;
        new_anim.l_last = 800;
        new_anim.width = 300;

        seq_container.push(new_anim);

        draw_all_seq();

    } else {
        cp_btn_2.setAttribute('class', 'btn btn-light');
        state_btn_3 = false;
    }
}

//for turning on the heater
function heater_on() {
    if(!state_btn_4) {
        state_btn_4 = true;
        cp_btn_4.setAttribute('class', 'btn btn-info');
        seq = 6;
        bottom_cp.style.display = 'none';
        if(stop_watch === undefined) {
            stop_watch = new Chemistry.Custome_image(timer_img, new Chemistry.Point(1550, 118), 290, 210, canvas);
            seq_container.push(stop_watch);
        }
        draw_all_seq();
        render_observation_table()


    } else if(state_btn_4) {
        state_btn_4 = true;
        cp_btn_4.setAttribute('class', 'btn btn-light');
        seq = 5;
        obs_table = '';
        pp.showdescription('', 3);
    }
}

// for showing coordinates
function show_coordinates(e) {
    let x=Math.round((e.clientX-rect.x)/lscale);
    let y=Math.round((canvas.height- (e.clientY-rect.y))/lscale);

    console.log(x, y);
    
}

// timer events
function timer_events(e) {
    let x=Math.round((e.clientX-rect.x)/lscale);
    let y=Math.round((canvas.height- (e.clientY-rect.y))/lscale);

    //start button click
    if(x > 1422 && x < 1484) {
        if(y > 30 && y < 90) {
            console.log('start clicked');
            let tm = 9;
            let ts = 59;
            let val = 1;
            main_ind = 0;
            for(let i=0; i<data.length; i++) {
                if(data[i].name == system_val) {
                    main_ind = i;
                    selected_index = main_ind;
                }
            }

            let step = data[main_ind].T[data[main_ind].composition.indexOf(composition_val)]/100;
            step = Math.pow(Math.E, step);
            console.log(step);
            
            step = (step-1)/590;
            console.log(step);
            let temp = 1;

            cp_btn_5.value = '70';
            

            let count_down = setInterval(() => {
                
                if(tm >= 0) {
                    ts--;
                    timer_text.text = tm+":"+ts;
                    temp += step;
                    temp_text.text = (Math.log(temp)*100).toFixed(2);
                    if(ts == 0) {
                        tm--;
                        ts = 59;
                    }
                    draw_all_seq();
                } else {
                    clearInterval(count_down);
                    seq = 7;
                    seq_container[4] = null;
                    cp_btn_4.setAttribute('class', 'btn btn-light');
                    take_ls_reading = true;
                    draw_all_seq();
                    canvas.removeEventListener('click', timer_events);
                }
            }, 20);



        }
    }

    //reset button click
    if(x > 1515 && x < 1581) {
        if(y > 30 && y < 90) {
            console.log('reset clicked');
            
        }
    }

    //stop button click
    if(x > 1602 && x < 1677) {
        if(y > 30 && y < 90) {
            console.log('stop clicked');
            
        }
    }
}

//take ls
function take_ls() {
    collect_sample.stpt.x = 452;
    collect_sample.stpt.y = 455;
    take_ls_reading = false;
    ls_btn.onclick = null;
    ls_btn.disabled = true;
    collect_sample.stang = -45;
    let mag = 1;

    let interval = setInterval(() => {
        if(mag > 0.4) {
            collect_sample.dx = 39 * mag;
            collect_sample.dy = 124 * mag;
            draw_all_seq();
            collect_sample.draw();
            mag -= 0.1;
        } else if(mag <= 0.4) {
            clearInterval(interval);
            take_vs_reading = true;
            
            vs_btn.onclick = take_vs;
            pp.showdescription('Now click on "Take Vapour Sample" button', 3);
            show_oc3();
        }
    }, 300);

}

//take vs
function take_vs() {
    collect_sample.stpt.x = 545;
    collect_sample.stpt.y = 471;
    take_vs_reading = false;
    vs_btn.onclick = null;
    vs_btn.disabled = true;
    collect_sample.stang = 45;
    let mag = 1;

    let interval = setInterval(() => {
        if(mag > 0.4) {
            collect_sample.dx = 39 * mag;
            collect_sample.dy = 124 * mag;
            draw_all_seq();
            collect_sample.draw();
            mag -= 0.1;
        } else if(mag <= 0.4) {
            clearInterval(interval);
            take_vs_reading = true;
            ts_div.innerHTML = `<button class='btn btn-info' onclick='show_oc4();' style='width: 100%;'>Add Reading</button>`;
            pp.showdescription('Now click on "Take Vapour Sample" button', 3);
            show_oc3();
        }
    }, 300);

}


function render_observation_table() {
   
    obs_table = `
    <div class='table-responsive' id='obs-table-container'>
    <table id='obs-table' class='table'>
        <thead>
            <tr class='table-dark'>
                <td>Composition</td>
                <td style='width: 150px;'>T(C)</td>
                <td>Liquid Sample</td>
                <td>Vapour Sample</td>
                <td>Check</td>
            </tr>
        </thead>

        <tbody id='obs-tbody'>

        </tbody>
    </table>

    <div style='text-align: center; display: none;' id='spinner-tb'>
        <div class="spinner-border" role="status">
           <span class="visually-hidden">Loading...</span>
        </div>
        <div>Generating Data for 8 more readings...</div>
    </div>
    </div>
    `;

    pp.showdescription(obs_table, 4);

    setTimeout(() => {
        let obs_body: HTMLTableElement = <HTMLTableElement> document.getElementById('obs-tbody');

        obs_body.innerHTML = `
        <tr>
            <td>${composition_val}</td>
            <td><input class='form-control' type='text' id='temp-inp'></td>
            <td>Collected</td>
            <td>Collected</td>
            <td><button class='btn btn-info' onclick='verify_temp();'>Verify</button></td>
        </tr>
        `;
        
    }, 1000);
}

//for verfying user input
function verify_temp() {
    let inp: HTMLInputElement = <HTMLInputElement> document.getElementById('temp-inp');
    let table_spinner: HTMLDivElement = <HTMLDivElement> document.getElementById('spinner-tb');


    if(!verify_values(parseFloat(inp.value), data[main_ind].T[data[main_ind].composition.indexOf(composition_val)])) {
        
        alert('Entered Temperature value is incorrect please check again');
        return;
    }

    alert('Enter value is correct');

    table_spinner.style.display = 'block';


    setTimeout(() => {
        load_full_table();
        table_spinner.style.display = 'none';
        pp.showdescription('Activity Completed, click on next', 3);
        ts_div.innerHTML = `<div class='btn btn-primary' style='width: 100%;' onclick='act2_done();'>Next</div>`;
    }, 3000)

}



function add_control_panel() {
    let exp_panel = `
    <div style="position: absolute; left: 60vw; top: 2vw; width: 30vw; padding: 1vw; border-radius: 10%; background: rgb(34,193,195);
   background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(200,45,253,1) 100%); height: 30vw;" >
    <div style="display: flex; flex-direction: column; justify-content: center; padding: 1vw; font-weight: 700; background-color: white; border-radius: 10px; z-index: 10; height: 28vw;">
        <div style="display: flex; flex-direction: row; text-align: center; width: 100%; font-size: 1.8vw;">
            <div style="width: 100%; border: 1px solid black;">
                <select disabled class="form-select" name="" id="db-1" style='font-size: 1.4vw; text-align: center; padding: 0.5vw; position: relative; z-index: 5;'  onchange='set_db()'>
                    <option default value="0">Select System</option>
                    <option value="Cumene-phenol">Cumene-Phenol</option>
                </select>
            </div>
        </div>

        <div  style="display: flex; flex-direction: column; justify-content: center; font-size: 1.8vw">
            <div  style="display: flex; flex-direction: row; text-align: center; width: 100%;">
                <div style="width: 100%; border: 1px solid black;">
                    <select disabled class="form-select" name="" id="db-2" style='font-size: 1.4vw; text-align: center; padding: 0.5vw;' onchange='set_db()'>
                        <option default value="0">Select Composition</option>
                        <option value="0.1 - 0.9">0.1 - 0.9</option>
                        <option value="0.2 - 0.8">0.2 - 0.8</option>
                        <option value="0.3 - 0.7">0.3 - 0.7</option>
                        <option value="0.4 - 0.6">0.4 - 0.6</option>
                        <option value="0.5 - 0.5">0.5 - 0.5</option>
                        <option value="0.6 - 0.4">0.6 - 0.4</option>
                        <option value="0.7 - 0.3">0.7 - 0.3</option>
                        <option value="0.8 - 0.2">0.8 - 0.2</option>
                        <option value="0.9 - 0.1">0.9 - 0.1</option>
                    </select>
                </div>
            </div>
        </div>

        <div style="display: flex; flex-direction: column; justify-content: center; margin: auto; padding: 0.5vw;">
            <button style="width: 22vw; font-size: 1.2vw; padding: 0.5vw;" onclick='open_ebu_valve();' id='cp-btn-1' class='btn btn-light' >Open the Outlet Valve</button>
        </div>

        <div style="display: flex; flex-direction: column; justify-content: center; margin: auto; padding: 0.5vw;">
            <button style="width: 22vw; font-size: 1.2vw; padding: 0.5vw;" class='btn btn-light' id='cp-btn-2' onclick='' >Cold water pump</button>
        </div>


        <div style="display: flex; flex-direction: column; justify-content: center; margin: auto; padding: 0.5vw;">
            <button style="width: 22vw; font-size: 1.2vw; padding: 0.5vw;" class='btn btn-light' id='cp-btn-3' onclick='open_n2_valve();' >N<sub>2</sub> Gas</button>
        </div>


        <div style="display: flex; flex-direction: column; justify-content: center; margin: auto; padding: 0.5vw;">
            <button style="width: 22vw; font-size: 1.2vw; padding: 0.5vw;" class='btn btn-light' id='cp-btn-4'  onclick='' >Heating Coil</button>
        </div>

        <div style="display: flex; flex-direction: column; justify-content: center; font-size: 1.3vw;">
            <input type="range" min="0" max="100", value="1" step="1" style='display: inline-block; padding: 0.5vw;' id='cp-btn-5'>
        </div>
    
        
    </div>
   </div>


   <div style="position: absolute; left: 60vw; top: 38vw; width: 30vw; padding: 1.8vw; border-radius: 10%;" id='lower-cp' >
   <button class='btn btn-primary' style='width: 100%; display: none;' id='anim-btn'></button>
   </div>

   <div style="position: absolute; width: 1.1vw; top: 16.5vw; right: 74.2vw; display: none;" id='drop-img' >
    <img style="width: 0.8vw;" src='./images/Assembly/drop_gif.webp'>
   </div>

   <div style="position: absolute; width: 5vw; top: 34.2vw; right: 71.68vw; transform: rotate(180deg) !important; display: none;" id='smoke-img' >
    <img style="width: 4vw;" style='transform: rotate(45deg) !important;' src='./images/Assembly/smoke.gif'>
   </div>

   <div style="position: absolute; left: 55vw; top: 35vw; width: 40vw; padding: 1.8vw; border-radius: 10%; display: none;" id='take-sample-buttons'> 
        <div class='col-6'>
            <button class='btn btn-primary' style='font-size: 1.3vw; padding: 5px;' id='ls-btn' >Take Liquid Sample</button>
        </div>

        <div class='col-6'>
            <button class='btn btn-primary' style='font-size: 1.3vw; padding: 5px;' id='vs-btn'>Take Vapour Sample</button>
        </div>
   </div>

    `;

    pp.addtoleftpannel(exp_panel);
}

function load_full_table() {
    let obs_body: HTMLTableElement = <HTMLTableElement> document.getElementById('obs-tbody');
    obs_body.innerHTML = ``;

    for(let i=0; i<data[main_ind].composition.length; i++) {
        let row = obs_body.insertRow(i);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);

        cell1.innerText = data[main_ind].composition[i];
        cell2.innerText = (data[main_ind].T[i]).toString();
        cell3.innerText = 'Collected';
        cell4.innerText = 'Collected';
        cell5.innerText = 'Checked';
    }

    side_table = obs_body.innerHTML;
}

function act2_done() {
    activity4();
}

//activity2();








