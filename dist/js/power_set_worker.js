self.addEventListener('message', (ev) => {
    let data = ev.data;
    C_array = data.C_array;
    A_array = data.A_array;
    opr = data.opr;
    result = [];
    ps_c = powerSet(C_array, "C", opr);
    ps_a = powerSet(A_array, "A", opr);

    for (var i = 0; i < ps_c.length; i++) {
        c_name = "";
        c_value = "";

        Object.entries(ps_c[i]).forEach(([key, value]) => {
            c_name = key;
            c_value = value;
        });

        for (var j = 0; j < ps_a.length; j++) {
            a_name = "";
            a_value = "";

            Object.entries(ps_a[j]).forEach(([key, value]) => {
                a_name = key;
                a_value = value;
            });

            ca_name = c_name + a_name;

            ca_value = 0;
            switch (opr) {
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

    self.postMessage(result);



})

//generates power set of the list
function powerSet(list, ch, opr) {
    var set = [],
        listSize = list.length,
        combinationsCount = (1 << listSize),
        combination;

    for (var i = 1; i < combinationsCount; i++) {

        var sum = 0;
        a_name = "";
        for (var j = 0; j < listSize; j++) {

            if ((i & (1 << j))) {

                switch (opr) {
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