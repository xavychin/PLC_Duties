function curr_date(){
    var tmr = new Date();
    tmr.setDate(tmr.getDate()+1);

    let tmr_string = tmr.toString();
    tmr_string = tmr_string.slice(4,15);
    document.title = "Duty for " + tmr_string;

    document.getElementById('date_time').textContent = "Duty for " + tmr_string;

}

var ttl_ppl_name = [];
var off_duty;
var off_reasons_array = ["(MC)", "(MA)", "(LEAVE)", "(OFF)"];
let rng_num;

var morning_checkedBoxes;  
var morning_checkedBoxes_id = [];
  

var afternoon_checkedBoxes;  
var afternoon_checkedBoxes_id = [];


function ttl_duty_personnel(){
    var cbts = document.getElementById("cbts").value
    var svc = document.getElementById("svc").value

    var duty_array = [cbts, svc];

    var duties_class = document.querySelectorAll(".duties");

    if(duties_class.length>0){
        if(duties_class[0].innerText==""){

        }
        else{
            const elements = document.getElementsByClassName("duties");
            while(elements.length > 0){
                elements[0].parentNode.removeChild(elements[0]);
                ttl_ppl_name.length = 0;
            }
        }
    }

    for (let j = 0; j < duty_array.length; j++){
        if(duty_array[j]!=""){
            insert_personnel(duty_array[j]);
        }
    }

}

function insert_personnel(personnel){
    var personnel_array = personnel.split(/\n/);

    for (let i = 0; i < personnel_array.length; i++) {
        if(personnel!=""){
            const row = document.createElement("tr");

            if(personnel_array[i].includes("(")){
                let pos_of = personnel_array[i].indexOf("(");
                let off_personnel = personnel_array[i].substr(0, pos_of);
                let off_reasons = personnel_array[i].substr(pos_of+1, personnel_array[i].length-3);

                row.setAttribute("id", off_personnel);
                row.setAttribute("class", "duties"); 
                row.textContent = off_personnel;

                const data_1 = document.createElement("td");
                data_1.setAttribute("class", "duty_data");
                data_1.setAttribute("style","background-color:grey");
                data_1.setAttribute("colspan","12");
                data_1.textContent = off_reasons;
                row.appendChild(data_1);

                const data_2 = document.createElement("td");
                data_2.setAttribute("style","background-color:orange");
                data_2.textContent = "0";
                row.appendChild(data_2);

            }
            else{
                row.setAttribute("id", personnel_array[i]);
                row.setAttribute("class", "duties");

                const morning_checkbox_td = document.createElement("td");
                row.appendChild(morning_checkbox_td);

                const morning_checkbox = document.createElement("input");
                morning_checkbox.setAttribute("type", "checkbox");
                morning_checkbox.setAttribute("checked", "checked");
                morning_checkbox.setAttribute("name", "morning_checkbox");
                morning_checkbox_td.appendChild(morning_checkbox);

                const afternoon_checkbox_td = document.createElement("td");
                row.appendChild(afternoon_checkbox_td);

                const afternoon_checkbox = document.createElement("input");
                afternoon_checkbox.setAttribute("type", "checkbox");
                afternoon_checkbox.setAttribute("checked", "checked");
                afternoon_checkbox.setAttribute("name", "afternoon_checkbox");
                afternoon_checkbox_td.appendChild(afternoon_checkbox);

                const name_td = document.createElement("td");
                name_td.textContent = personnel_array[i];
                row.appendChild(name_td);

                ttl_ppl_name.push(personnel_array[i]);
            }

            duty_tbl = document.getElementById("duty_tbl");
            duty_tbl.appendChild(row);
        }
        
    }
}

function getColumn(table_id, col) {
    var tab = document.getElementById(table_id);
    var n = tab.rows.length;
    var i, tr, td;
    var arr = [];

    if (col < 0) {
        return null;
    }

    for (i = 2; i < n; i++) {
        tr = tab.rows[i];
        if (tr.cells.length > col) { 
            td = tr.cells[col];      
            arr.push(tab.rows[i].cells[col].innerText);
        } 
          
    }
    return arr;
}

function insert_break(checkedboxes, avg_hrs){

    if(checkedboxes.length != 0){
        for(i=0; i<checkedboxes.length; i++){
            let break_personnel = document.getElementById(checkedboxes[i]);

            for(j=0; j<(12-avg_hrs); j++){
                const Duty = document.createElement("td");
                Duty.setAttribute("class", "duty_data");
                Duty.setAttribute("colspan","1");
                break_personnel.appendChild(Duty);
            }
        }
    }
}

/*function insert_duty(colspan, col){
    var duties_items = ["SCA", "IN", "OUT", "DESK", "XRAY", "PAC" , "SENTRY", "BREAK"];
    var duty_hrs = 66;
    let avg_hrs = Math.floor(duty_hrs/ttl_ppl_name.length);
    ttl_ppl_name = [];

    if(3<=col<=8){
        morning_checkedBoxes = document.getElementsByName('morning_checkbox');  
        for (var checkbox of morning_checkedBoxes) {  
            if (checkbox.checked){
                ttl_ppl_name.push(checkbox.parentNode.parentNode.id);
            }
        }
    }
    else if(9<=col<=13){
        afternoon_checkedBoxes = document.getElementsByName('afternoon_checkbox');  
        for (var checkbox of afternoon_checkedBoxes) {  
            if (checkbox.checked){
                ttl_ppl_name.push(checkbox.parentNode.parentNode.id);
            } 
        }
    }

    if(col == 3){
        afternoon_checkedBoxes = document.getElementsByName('afternoon_checkbox');  
        for (var checkbox of afternoon_checkedBoxes) {  
            if (checkbox.checked){
                afternoon_checkedBoxes_id.push(checkbox.parentNode.parentNode.id);
            } 
        }
        insert_break(afternoon_checkedBoxes_id, avg_hrs); 
    }
    else if(col == 9){
        morning_checkedBoxes = document.getElementsByName('morning_checkbox');
        for (var checkbox of morning_checkedBoxes) {  
            if (checkbox.checked){
                morning_checkedBoxes_id.push(checkbox.parentNode.parentNode.id);
            } 
        }
        insert_break(morning_checkedBoxes_id, avg_hrs);
    }

    if(col<13){
        let index_PAC = duties_items.indexOf("PAC");
        duties_items.splice(index_PAC, 1);
    }

    if(col>3){
        let index_SCA = duties_items.indexOf("SCA");
        duties_items.splice(index_SCA, 1);
    }

    while(ttl_ppl_name.length>0){
        const Duty = document.createElement("td");
        Duty.setAttribute("class", "duty_data");
        let rng_num_duty = Math.floor(Math.random()*duties_items.length);
        let duty_item = duties_items[rng_num_duty];


        if(!duties_items.includes("SENTRY")){
            switch(duty_item) {
                case "BREAK":
                    if(duties_items.length==1){
                        schedule_duty(duty_item, Duty, colspan);
                    }
                  
                    break;
                case "SCA":
                    schedule_duty(duty_item, Duty, colspan);
    
                    const Duty_extra = document.createElement("td");
                    Duty_extra.setAttribute("class", "duty_data");
                    schedule_duty(duty_item, Duty_extra, colspan);
    
                    duties_items.splice(rng_num_duty, 1);
                    break;
                default:
                    schedule_duty(duty_item, Duty, colspan);
                    duties_items.splice(rng_num_duty, 1);
                  
              }
        }
        else{
            schedule_duty("SENTRY", Duty);
            let index_Sentry = duties_items.indexOf("SENTRY");
            duties_items.splice(index_Sentry, 1);
        }

    }
}*/

/*function randomize_duty(){
    //var cloned_ttl_ppl_name = [...ttl_ppl_name];

    for(col=3; col<=13; col++){
        //ttl_ppl_name = [...cloned_ttl_ppl_name];

        switch(col){
            case 3:
                var colspan = 2;
                insert_duty(colspan, col);
    
                break;
            //case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
                var colspan = 1;
                insert_duty(colspan, col);

                break;
    
            case 13:
                var colspan = 2;
                insert_duty(colspan, col);

                break;
            default:
        }
        //var duty_column = getColumn('duty_tbl', col);
        //alert(duty_column);
    }
    

    //var cloned_ttl_ppl_name = [...ttl_ppl_name];
    //let random_personnel = ttl_ppl_name[rng_num];
    //let scheduling = document.getElementById(random_personnel);
    //rng_num = Math.floor(Math.random()*duties_items.length);
}*/

/*function schedule_duty(duty_item, Duty, colspan){
    let rng_num_ppl = Math.floor(Math.random()*ttl_ppl_name.length);
    let random_personnel = ttl_ppl_name[rng_num_ppl];
    let scheduling = document.getElementById(random_personnel);

    switch(duty_item){
        case "SCA":
            Duty.setAttribute("style","background-color:Fuchsia");
            Duty.setAttribute("colspan",colspan);
            Duty.textContent = "SCA";
            scheduling.appendChild(Duty);

            break;
        case "IN":
            Duty.setAttribute("style","background-color:yellow");
            Duty.setAttribute("colspan",colspan);
            Duty.textContent = "IN";
            scheduling.appendChild(Duty);

            break;
        case "OUT":
            Duty.setAttribute("style","background-color:orange");
            Duty.setAttribute("colspan",colspan);
            Duty.textContent = "OUT";
            scheduling.appendChild(Duty);

            break;
        case "DESK":
            Duty.setAttribute("style","background-color:green");
            Duty.setAttribute("colspan",colspan);
            Duty.textContent = "DESK";
            scheduling.appendChild(Duty);

            break;
        case "XRAY":
            Duty.setAttribute("style","background-color:lightblue");
            Duty.setAttribute("colspan",colspan);
            Duty.textContent = "XRAY";
            scheduling.appendChild(Duty);

            break;
        case "PAC":
            Duty.setAttribute("style","background-color:lightpink");
            Duty.setAttribute("colspan",colspan);
            Duty.textContent = "PAC";
            scheduling.appendChild(Duty);

            break;
        case "SENTRY":
            Duty.setAttribute("style","background-color:red");

            var cbts = document.getElementById("cbts").value;
            var ttl_cbts = cbts.split(/\n/);

            let rng_num_cbt = Math.floor(Math.random()*ttl_cbts.length);
            let random_cbt = ttl_cbts[rng_num_cbt];
            let scheduling_cbt = document.getElementById(random_cbt);

            let hrs = 12 % ttl_cbts.length;
            let avg_sentry_hrs;

            if(hrs==0){
                avg_sentry_hrs = Math.floor(12/ttl_cbts.length);
                Duty.setAttribute("colspan",avg_sentry_hrs);
                Duty.textContent = "SENTRY";
                scheduling_cbt.appendChild(Duty);
            }
            else{
                avg_sentry_hrs = Math.floor(12/ttl_cbts.length)+Math.floor(hrs/2);
                Duty.setAttribute("colspan",avg_sentry_hrs);
                Duty.textContent = "SENTRY";
                scheduling_cbt.appendChild(Duty);
            }

            ttl_ppl_name.splice(rng_num_cbt, 1);

            break;
        /*case "BREAK":
                for(i=0; i<colspan; i++){
                    Duty.setAttribute("colspan","1");
                    scheduling.appendChild(Duty);
                }
    
                break;
        default:

    }

    if(duty_item!="SENTRY"){
        ttl_ppl_name.splice(rng_num_ppl, 1);
    }

}*/

/*function schedule_duty(duty_item, Duty, personnel_shift, rng_num){
    let random_personnel = ttl_ppl_name[rng_num];
    let scheduling = document.getElementById(random_personnel);

    switch(duty_item){
        case "SCA":
            Duty.setAttribute("style","background-color:Fuchsia");
            Duty.setAttribute("colspan","2");
            Duty.textContent = "SCA";
            scheduling.appendChild(Duty);

            personnel_shift = personnel_shift+2;
            break;
        case "IN":
            Duty.setAttribute("style","background-color:yellow");
            Duty.setAttribute("colspan","1");
            Duty.textContent = "IN";
            scheduling.appendChild(Duty);

            personnel_shift = personnel_shift+1;
            break;
        case "OUT":
            Duty.setAttribute("style","background-color:orange");
            Duty.setAttribute("colspan","1");
            Duty.textContent = "OUT";
            scheduling.appendChild(Duty);

            personnel_shift = personnel_shift+1;
            break;
        case "DESK":
            Duty.setAttribute("style","background-color:green");
            Duty.setAttribute("colspan","1");
            Duty.textContent = "DESK";
            scheduling.appendChild(Duty);

            personnel_shift = personnel_shift+1;
            break;
        case "XRAY":
            Duty.setAttribute("style","background-color:lightblue");
            Duty.setAttribute("colspan","1");
            Duty.textContent = "XRAY";
            scheduling.appendChild(Duty);

            personnel_shift = personnel_shift+1;
            break;
        case "PAC":
            Duty.setAttribute("style","background-color:lightpink");
            Duty.setAttribute("colspan","2");
            Duty.textContent = "PAC";
            scheduling.appendChild(Duty);

            personnel_shift = personnel_shift+2;
            break;
        case "SENTRY":
            Duty.setAttribute("style","background-color:red");

            var cbts = document.getElementById("cbts").value;
            var ttl_cbts = cbts.split(/\n/);

            if(ttl_cbts.includes(random_personnel)){
                let hrs = 12 % ttl_cbts.length;
                let avg_sentry_hrs;
                if(hrs==0){
                    avg_sentry_hrs = Math.floor(12/ttl_cbts.length);
                    Duty.setAttribute("colspan",avg_sentry_hrs);
                    Duty.textContent = "SENTRY";
                    scheduling.appendChild(Duty);

                    personnel_shift = personnel_shift+avg_sentry_hrs;
                }
                else{
                    avg_sentry_hrs = Math.floor(12/ttl_cbts.length)+Math.floor(hrs/2);
                    Duty.setAttribute("colspan",avg_sentry_hrs);
                    Duty.textContent = "SENTRY";
                    scheduling.appendChild(Duty);

                    personnel_shift = personnel_shift+avg_sentry_hrs;
                }
            }

            personnel_shift = personnel_shift+2;

            break;
        default:

    }

    return personnel_shift;
}*/

/*function randomize_duty(){
    var duties_items = ["SCA", "IN", "OUT", "DESK", "XRAY", "PAC" , "SENTRY"];
    var duty_hrs = 66;

    var morning_checkedBoxes = document.getElementsByName('morning_checkbox');  
    var morning_checkedBoxes_id = [];
    for (var checkbox of morning_checkedBoxes) {  
        if (checkbox.checked){
            morning_checkedBoxes_id.push(checkbox.parentNode.parentNode.id);
        } 
    }  

    var afternoon_checkedBoxes = document.getElementsByName('afternoon_checkbox');  
    var afternoon_checkedBoxes_id = [];
    for (var checkbox of afternoon_checkedBoxes) {  
        if (checkbox.checked){
            afternoon_checkedBoxes_id.push(checkbox.parentNode.parentNode.id);
        } 
    }

    let remaining_hrs = duty_hrs % ttl_ppl_name.length;
    let avg_hrs = Math.floor(duty_hrs/ttl_ppl_name.length);
    let personnel_shift = 0;

    insert_break(afternoon_checkedBoxes_id, avg_hrs);

    if(remaining_hrs != 0){
        rng_num = Math.floor(Math.random()*ttl_ppl_name.length);
        while(personnel_shift < remaining_hrs){
            let duty_item = duties_items[Math.floor(Math.random()*duties_items.length)];
    
            const Duty = document.createElement("td");
            Duty.setAttribute("class", "duty_data");
    
            personnel_shift = schedule_duty(duty_item, Duty, personnel_shift, rng_num);
            var duty_column = getColumn('duty_tbl', personnel_shift);
            alert(duty_column);
            for(x=0; x<duty_column.length; x++){
                if(duties_items.includes(duty_column[x])){
                    duties_items.splice(duty_column[x], 1);
                }
            }
            alert(duties_items);
        }

        ttl_ppl_name.splice(rng_num, 1);
        personnel_shift = 0;
    }

    while (ttl_ppl_name.length>0){
        duties_items = ["SCA", "IN", "OUT", "DESK", "XRAY", "PAC" , "SENTRY"];
        rng_num = Math.floor(Math.random()*ttl_ppl_name.length);

        while(personnel_shift < avg_hrs){
            let duty_item = duties_items[Math.floor(Math.random()*duties_items.length)];
    
            const Duty = document.createElement("td");
            Duty.setAttribute("class", "duty_data");
    
            personnel_shift = schedule_duty(duty_item, Duty, personnel_shift, rng_num);
            var duty_column = getColumn('duty_tbl', personnel_shift);
            for(x=0; x<duty_column.length; x++){
                if(duties_items.includes(duty_column[x])){
                    duties_items.splice(duty_column[x], 1);
                }
            }
        }
        ttl_ppl_name.splice(rng_num, 1);
        personnel_shift = 0;
    }

    insert_break(morning_checkedBoxes_id, avg_hrs);
}*/

function reset_duty(){
    var duties_class = document.querySelectorAll(".duty_data");

    if(duties_class.length>0){
        const elements = document.getElementsByClassName("duty_data");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
}

function insert_duty(colspan, col){

}

function randomize_array(array){
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function randomize_duty(){ //do for one person at a time before checking each column for the correct duties
    var duties_items = ["SCA", "IN", "OUT", "DESK", "XRAY", "PAC", "SENTRY"];
    var duty_hrs = 66;

    morning_checkedBoxes = document.getElementsByName('morning_checkbox');  
    //var morning_checkedBoxes_id = [];
    for (var checkbox of morning_checkedBoxes) {  
        if (checkbox.checked){
            morning_checkedBoxes_id.push(checkbox.parentNode.parentNode.id);
        } 
    }  

    afternoon_checkedBoxes = document.getElementsByName('afternoon_checkbox');  
    //var afternoon_checkedBoxes_id = [];
    for (var checkbox of afternoon_checkedBoxes) {  
        if (checkbox.checked){
            afternoon_checkedBoxes_id.push(checkbox.parentNode.parentNode.id);
        } 
    }

    let remaining_hrs = duty_hrs % ttl_ppl_name.length;
    let avg_hrs = Math.floor(duty_hrs/ttl_ppl_name.length);
    let personnel_shift = 0;

    var rng_num;
    var randomized_morning_checkedBoxes_id = randomize_array(morning_checkedBoxes_id);

    for(i=0; i<randomized_morning_checkedBoxes_id.length; i++){
        while(personnel_shift<avg_hrs){
            rng_num = Math.floor(Math.random()*morning_checkedBoxes_id.length);
            duty_item = duties_items[rng_num];

            const Duty = document.createElement("td");
            Duty.setAttribute("class", "duty_data");

            personnel_shift = schedule_duty(randomized_morning_checkedBoxes_id[i], duty_item, Duty);
        }
    }
    
    
}

function schedule_duty(duty_personnel, duty_item, Duty){
    let scheduling = document.getElementById(duty_personnel);

    switch(duty_item){
        case "SCA":
            Duty.setAttribute("style","background-color:Fuchsia");
            Duty.setAttribute("colspan","2");
            Duty.textContent = "SCA";
            scheduling.appendChild(Duty);

            personnel_shift = personnel_shift+2;
            break;
        case "IN":
            Duty.setAttribute("style","background-color:yellow");
            Duty.setAttribute("colspan","1");
            Duty.textContent = "IN";
            scheduling.appendChild(Duty);

            personnel_shift = personnel_shift+1;
            break;
        case "OUT":
            Duty.setAttribute("style","background-color:orange");
            Duty.setAttribute("colspan","1");
            Duty.textContent = "OUT";
            scheduling.appendChild(Duty);

            personnel_shift = personnel_shift+1;
            break;
        case "DESK":
            Duty.setAttribute("style","background-color:green");
            Duty.setAttribute("colspan","1");
            Duty.textContent = "DESK";
            scheduling.appendChild(Duty);

            personnel_shift = personnel_shift+1;
            break;
        case "XRAY":
            Duty.setAttribute("style","background-color:lightblue");
            Duty.setAttribute("colspan","1");
            Duty.textContent = "XRAY";
            scheduling.appendChild(Duty);

            personnel_shift = personnel_shift+1;
            break;
        case "PAC":
            Duty.setAttribute("style","background-color:lightpink");
            Duty.setAttribute("colspan","2");
            Duty.textContent = "PAC";
            scheduling.appendChild(Duty);

            personnel_shift = personnel_shift+2;
            break;
        case "SENTRY":
            Duty.setAttribute("style","background-color:red");

            var cbts = document.getElementById("cbts").value;
            var ttl_cbts = cbts.split(/\n/);

            if(ttl_cbts.includes(random_personnel)){
                let hrs = 12 % ttl_cbts.length;
                let avg_sentry_hrs;
                if(hrs==0){
                    avg_sentry_hrs = Math.floor(12/ttl_cbts.length);
                    Duty.setAttribute("colspan",avg_sentry_hrs);
                    Duty.textContent = "SENTRY";
                    scheduling.appendChild(Duty);

                    personnel_shift = personnel_shift+avg_sentry_hrs;
                }
                else{
                    avg_sentry_hrs = Math.floor(12/ttl_cbts.length)+Math.floor(hrs/2);
                    Duty.setAttribute("colspan",avg_sentry_hrs);
                    Duty.textContent = "SENTRY";
                    scheduling.appendChild(Duty);

                    personnel_shift = personnel_shift+avg_sentry_hrs;
                }
            }

            personnel_shift = personnel_shift+2;

            break;
        default:

    }

    return personnel_shift;
}