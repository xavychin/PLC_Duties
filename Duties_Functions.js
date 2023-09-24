function curr_date(){
    var tmr = new Date();
    tmr.setDate(tmr.getDate()+1);

    let tmr_string = tmr.toString();
    tmr_string = tmr_string.slice(4,15);
    document.title = "Duty for " + tmr_string;

    document.getElementById('date_time').textContent = "Duty for " + tmr_string;

}

var ttl_ppl;
var off_duty;
var off_reasons_array = ["(MC)", "(MA)", "(LEAVE)", "(OFF)"];

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
    ttl_ppl = ttl_ppl + personnel_array.length;

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
                row.textContent = personnel_array[i];
            }

            duty_tbl = document.getElementById("duty_tbl");
            duty_tbl.appendChild(row);
        }
        
    }
}