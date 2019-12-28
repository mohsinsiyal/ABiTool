function generateCols() {
    norow = $('#norows').val();
    if (!$.isNumeric(norow)) { alert("Invalid input"); return; }
    $('#first_table tbody').html('');
    for (var i = 1; i <= norow; i++) {
        row = `<tr>
  			<td>C${i} <input type="text" id="c_input_${i}" value="${Math.floor((Math.random() * 100) + 1)}"></td>
  			<td>A${i} <input type="text" id="a_input_${i}" value="${Math.floor((Math.random() * 100) + 1)}"></td>
  		</tr>`;
        $('#first_table tbody').append(row);
    }

    $("#step2").show();
    $("#step1").hide();
    $("#resetBtn").show();
    $(".process_section").show();
}

function CombineProcess() {
    norow = $('#norows').val();
    if (!$.isNumeric(norow)) { alert("Invalid input"); return; }
    var C_array = [];
    var A_array = [];

    for (var i = 1; i <= norow; i++) {
        C_array.push($("#c_input_" + i).val());
        A_array.push($("#a_input_" + i).val());
    }

    result = [];
    ps_c = powerSet(C_array, "C");
    ps_a = powerSet(A_array, "A");
    //result = ps_c;

    output_html = "";
    for (var i = 0; i < ps_c.length; i++) {
        c_name = "";
        c_value = "";
        $.each(ps_c[i], function(key, value) {
            c_name = key;
            c_value = value;
        });

        for (var j = 0; j < ps_a.length; j++) {
            a_name = "";
            a_value = "";
            $.each(ps_a[j], function(key, value) {
                a_name = key;
                a_value = value;
            });

            ca_name = c_name + a_name;

            ca_value = 0;
            switch ($("#operation").val()) {
                case "add":
                    ca_value = parseInt(c_value) + parseInt(a_value);
                    break;
                case "mul":
                    ca_value = parseInt(c_value) * parseInt(a_value);
                    break;
                case "div":
                    ca_value = parseFloat(c_value) / parseFloat(a_value);
                    break;
            }
            result.push({ combination: ca_name, value: ca_value });
        }

    }


    $('#result_table').DataTable({
        data: result,
        "columns": [
            { "data": "combination" },
            { "data": "value" },
        ],
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });

    $(".result").show();
    $(".process_section").hide();
}



function powerSet(list, ch) {
    var set = [],
        listSize = list.length,
        combinationsCount = (1 << listSize),
        combination;

    for (var i = 1; i < combinationsCount; i++) {

        var sum = 0;
        a_name = "";
        for (var j = 0; j < listSize; j++) {

            if ((i & (1 << j))) {

                switch ($("#operation").val()) {
                    case "add":
                        sum += parseInt(list[j]);
                        break;
                    case "mul":
                        sum += parseInt(list[j]);
                        break;
                    case "div":
                        sum += parseFloat(list[j]);
                        break;
                }
                a_name += ch + (j + 1);
            }
        }
        comb = {}
        comb[a_name] = sum
        set.push(comb);
    }
    return set;
}

function reset() {
    if ($.fn.dataTable.isDataTable('#result_table'))
        $('#result_table').DataTable().clear().draw().destroy();
    $("#step2").hide();
    $(".result").hide();
    $("#resetBtn").hide();
    $("#step1").show();

}