/* 
   Author: Mohsin Raza Siyal
   Version: 1.0.0
   File Description: Main JS file of the ABiTool
*/


let worker; //web worker variable to run process on background
document.addEventListener('DOMContentLoaded', init); // event when page is loaded

//Function to generate anion and cation rows
function generateCols() {
    norow = $('#norows').val(); //number of rows/collections to be considered
    if (!$.isNumeric(norow)) { alert("Invalid input"); return; } //check if the input is number
    $('#first_table tbody').html(''); //clean the table of step 1
    for (var i = 1; i <= norow; i++) { //generate cation and anion rows with random values
        row = `<tr>
  			<td>C${i} <input type="text" class="form-control" id="c_input_${i}" value="${Math.floor((Math.random() * 100) + 1)}"></td>
  			<td>A${i} <input type="text" class="form-control" id="a_input_${i}" value="${Math.floor((Math.random() * 100) + 1)}"></td>
  		</tr>`;
        $('#first_table tbody').append(row);
    }

    //hide and show sections
    $("#step2").show(500);
    $("#step1").hide(500);
    $("#resetBtn").show(500);
    $(".process_section").show(500);
}

//event at process button to start performing operations
function CombineProcess() {
    $("#process_loader").show();
    $("#process_btn").attr("disabled","")
    norow = $('#norows').val();
    if (!$.isNumeric(norow)) { alert("Invalid input"); return; }
    var C_array = [];
    var A_array = [];

    for (var i = 1; i <= norow; i++) {
        C_array.push($("#c_input_" + i).val()); //getting cation data from inputboxes
        A_array.push($("#a_input_" + i).val()); //getting anion data from inputboxes
    }

    worker.postMessage({ 'C_array': C_array, 'A_array': A_array, 'opr': $("#operation").val() }); //sending data to the worker
}

//initializing the worker
function init() {

    worker = new Worker('dist/js/power_set_worker.js?v=1.1'); //creating worker object
    worker.addEventListener('message', workerMessaged); // creating listner event to receive message from worker
    worker.addEventListener('error', workerError); // creating listner event to receive error message

}

//function is called when the worker is done processing and send back processed data
function workerMessaged(ev) {
    let data = ev.data;

    $('#result_table').DataTable({
        data: data,
        "columns": [
            { "data": "combination" },
            { "data": "value" },
        ],
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });

    $(".result").show(500);
    $(".process_section").hide(500);
    $("#process_loader").hide();
}

//worker through errors here
function workerError(err) {
    console.log(err.message, err.filename);
}

//reset button to go back where started
function reset() {
    if ($.fn.dataTable.isDataTable('#result_table'))
        $('#result_table').DataTable().clear().draw().destroy();
    $("#step2").hide(500);
    $(".result").hide(500);
    $("#resetBtn").hide(500);
    $("#step1").show(500);
    $("#process_btn").removeAttr("disabled")

}