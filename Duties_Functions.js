function curr_date(){
    var tmr = new Date();
    tmr.setDate(tmr.getDate()+1);

    let tmr_string = tmr.toString();
    tmr_string = tmr_string.slice(4,15);
    document.title = "Duty for " + tmr_string;

    document.getElementById('date_time').textContent = "Duty for " + tmr_string;

}

function ttl_duty_personnel(){
    var cbts = document.getElementById("cbts").textContent
    var svc = document.getElementById("svc").textContent
    var med_appt = document.getElementById("med_appt").textContent
    var med_leave = document.getElementById("med_leave").textContent
    var leave_off = document.getElementById("leave_off").textContent
}