<!DOCTYPE html>
<html lang="en">

<head>
  <title>ABi Tool</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css">

  <link rel="stylesheet" href="dist/css/style.css?i=<?php echo date('His'); ?>">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
  <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
  <script src="https://cdn.datatables.net/buttons/1.6.1/js/dataTables.buttons.min.js"></script>
  <script src="https://cdn.datatables.net/buttons/1.6.1/js/buttons.flash.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
  <script src="https://cdn.datatables.net/buttons/1.6.1/js/buttons.html5.min.js"></script>
  <script src="https://cdn.datatables.net/buttons/1.6.1/js/buttons.print.min.js"></script>
  <script src="dist/js/script.js?i=<?php echo date('His'); ?>"></script>



</head>

<body>

  <div class="container">
    <div class="heading">
      <h1>ABi Tool</h1>
      <p>Aggregation Behavior Identification Tool</p>
    </div>

    <div id="step1">

      <div class="form-group">
        <label for="norows">Number of Rows</label>
        <input type="text" class="form-control" placeholder="Enter number" id="norows" value="4">
      </div>

      <button type="button" class="btn btn-primary" style="float: right;" onclick="generateCols()">Generate</button>

    </div>


    <div id="step2" style="display: none">

      <table class="table table-striped" id="first_table">
        <thead>
          <th>Cation</th>
          <th>Anion</th>
        </thead>
        <tbody>
        </tbody>
      </table>
      <div class="process_section">
        <div class="form-group">
          <label for="pwd">Operation:</label>
          <select class="form-control" id="operation">
            <option selected value="add">Addition</option>
            <option value="mul">Multiply</option>
            <option value="div">Division</option>
          </select>
        </div>

        <button type="button" class="btn btn-primary" style="float: right;" onclick="CombineProcess()">Process</button>
      </div>

    </div>

    <button type="button" class="btn btn-danger" style="float: right; display: none; margin-right: 10px;" id="resetBtn" onclick="reset()">Reset</button>
    <div class="result" style="display: none; padding-bottom: 58px;">


      <div class="combinations">
        <table class="table display nowrap" id="result_table" style="width:100%">
          <thead>
            <tr>
              <th>Combinations</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>

  </div>

<!--   <footer>
    <div>
      <p>ABi Tool <a href="mailto:dev.mohsinsiyal@gmail.com?subject=feedback" style="float: right;">email me</a></p>

    </div>

  </footer> -->
  <div class="margin-50"></div>
</body>

</html>