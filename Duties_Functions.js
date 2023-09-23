function curr_date(){
    var tmr = new Date();
    tmr.setDate(tmr.getDate()+1);

    let tmr_string = tmr.toString();
    tmr_string = tmr_string.slice(4,15);
    document.title = "Duty for " + tmr_string;

    document.getElementById('date_time').textContent = "Duty for " + tmr_string;

}

function ttl_duty_personnel(){
    var cbts = document.getElementById("cbts").value
    var svc = document.getElementById("svc").value
    var med_appt = document.getElementById("med_appt").value
    var med_leave = document.getElementById("med_leave").value
    var leave_off = document.getElementById("leave_off").value

    const types = ["cbts", "svc", "med_appt", "med_leave", "leave_off"];

    var ttl_ppl; 

    for(let j = 0; j < types.length; j++){
        var cbt_array = cbts.split(/\n/);
        ttl_ppl = ttl_ppl + cbt_array.length;

        var duties_class = document.querySelectorAll(".duties");

        if(duties_class.length>0){
            if(duties_class[0].innerText==""){

            }
            else{
                for(let x = 0; x < duties_class.length; x++){
                    document.getElementById(duties_class[x].innerText).remove();
                }
            }
        }

        for (let i = 0; i < cbt_array.length; i++) {
            if(cbts!=""){
                const row = document.createElement("tr");
                row.setAttribute("id", cbt_array[i]);
                row.setAttribute("class", "duties"); 
                row.textContent = cbt_array[i];

                duty_tbl = document.getElementById("duty_tbl");
                duty_tbl.appendChild(row);
            }
            
        }
    }

}