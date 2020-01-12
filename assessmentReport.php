<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en">
<head>
    <title>Knowledge Assessment Reports: Riley Games</title>
    <meta charset="UTF-8">
    <meta name = "apple-mobile-web-app-capable" content = "yes" />
    <script type="text/javascript" src="jquery.min.js"></script>
    <link rel="stylesheet" href="pure-min.css">
    <link rel="stylesheet" href="style.css">
    <script type="text/javascript" src="canvasjs-1.4.0/canvasjs.min.js"></script>
    <script type="text/javascript" src="stay_standalone.js"></script>
</head>
    <script>
        $(init);
        
        function init()
        {
            $("#patientList").load("loadPatientsNoAll.php");
        }
        
        function showReport()
        {
            username = $("#patientList").val();
            
            var data = {username: username};
            $("#report").load("printReportBeta.php", data);
        }
        
        
    </script>
<body id="all">
    <?php    
        require("loginAuth.php");
        require("adminAuth.php");
        require("common.php");
        include("pageHeader.php");
    ?>
    
    <h1>Choose patient to see report</h1>
        <form class="pure-form">
            <fieldset>
                <h2></h2>
                <label><strong>Choose a Patient:</strong></label>
                <select name="patientList" id="patientList" onchange="showReport()">
                    
                </select>
                <hr>
                <div id="report" style="width: 100%; height:500px; background-color: #ccc; overflow-y: auto"></div>
            </fieldset>
        </form>
</body>

</html>