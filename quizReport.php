<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en">
<head>
    <title>Quiz Reports: Riley Games</title>
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
        $("#report").html("");
        
        username = $("#patientList").val();
        sessionID = $("#quizList").val();
        
        if (username != -1 && sessionID != null)
        {
            var data = {username: username, sessionID: sessionID};
            $("#report").load("printQuizReport.php", data);
        }
    }
    
    function populateQuizSelector()
    {
        username = $("#patientList").val();
        console.log(username + " selected");
        
        var data = {username: username};
        $("#quizList").load("loadQuizzes.php", data);
        
        showReport();
    }
    
    
    </script>
</script>

<body id="all">
    <?php    
        require("loginAuth.php");
        require("adminAuth.php");
        require("common.php");
        include("pageHeader.php");
    ?>
    
    <h1>Choose patient to see quiz reports</h1>
        <form class="pure-form">
            <fieldset>
                <h2></h2>
                <label><strong>Choose a Patient:</strong></label>
                <select name="patientList" id="patientList" onchange="populateQuizSelector()">
                    
                </select>
                
                <label><strong>Choose a specific play session:</strong></label>
                
                <select name="quizList" id="quizList" onchange="">
                    
                </select>
                <button type="button" onclick="showReport()" class="pure-button pure-button-primary button-border">Show Report</button>
                <hr>
                <div name="report" id="report" style="width: 100%; height:500px; background-color: #ccc; overflow-y: auto"></div>
                
            </fieldset>
        </form>
</body>