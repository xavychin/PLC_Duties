function curr_date(){
    var date = new Date();

    date = date.substring(4,15);
    document.title = "Duty for" + date;
}