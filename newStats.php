<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en">
<head>
    <title>Stats: Riley Games</title>
    <meta charset="UTF-8">
    <meta name = "apple-mobile-web-app-capable" content = "yes" />
    <script type="text/javascript" src="jquery.min.js"></script>
    <link rel="stylesheet" href="pure-min.css">
    <link rel="stylesheet" href="style.css">
    <script type="text/javascript" src="canvasjs-1.4.0/canvasjs.min.js"></script>
    <script type="text/javascript" src="stay_standalone.js"></script>
    <!--------------------------------------------------------------------------------------------------
        This page got more cluttered than I intended. The names of things are not very helpful because
        I ended up needing to put in a lot more graphs than I originally thought. For anyone who has to
        mess with this in the future, each graph follows the same basic process. When the page loads,
        the drop down selectors are populated with usernames or whatever. Check the init function. When
        those drop downs are changed it calls a function associated with the graph. Be careful to make
        sure you are looking at the correct one. The graphs are created with javascript, so I wrote php
        files that pack up a JSON object with the correct data for the graph and return them. The data is
        contained in the "result" variable in all of them, I think.
        
        !!!!!!!!!!!!HELPFUL LINKS FOR ANYONE LOOKING AT THIS!!!!!!!!!!!!!!!!!!!!!!!
            //for using server data in canvasjs
                http://canvasjs.com/forums/topic/how-can-i-use-php-mysql-dynamic-data/
            //for the graph with two sets of data
                http://canvasjs.com/editor/?id=http://canvasjs.com/example/gallery/column/dual_axis/
    ---------------------------------------------------------------------------------------------------->
    <script>
        $(init);
        
        function init(){
            //load up list from db
            $("#gameList").load("loadList.php");
            $("#gameList2").load("loadList.php");
            $("#patientList").load("loadPatients.php");
            $("#patientList2").load("loadPatients.php");
            $("#patientList3").load("loadPatients.php");
            $("#patientList4").load("loadPatients.php");
        }
        
        function showA1C(){
            username = $("#patientList").val();
            
            
            //ignore the default choice
            if(username != -1)
            {
                var dataz = {username: username};
                
                $.getJSON("showA1C.php", dataz, function(result){
                    var chart3 = new CanvasJS.Chart("patientChart", {
                        theme: "theme2", //theme1
                        title: {text:""},
                        axisY:{maximum: 14, title: "A1c"},
                        axisX:{title: "date", valueFormatString: " "},
                        data: [{
                            type: "line",
                            dataPoints: result //[{"x": 0, "y": 7},{"x": 1, "y": 9}]
                        }]
                    });
                    
                    chart3.render();
                });
            }
        }
        
        function showStats(){
            //get gameID and create graph with data
            gameID = $("#gameList").val();
            username = $("#patientList2").val();
            //console.log("gameID: " + gameID);
            //console.log("username: " + username);
            
            //ignore the default choice
            if(gameID != -1 && username != -1)
            {
                //$("#chart1").load("buildChart.php", {"gameID": gameID});
                //console.log("Valid game value");
                
                var data = {gameID: gameID, username: username};
                
                $.getJSON("showStats.php", data, function(result){
                    
                    var chart1 = new CanvasJS.Chart("chart1", {
                        theme: "theme2",//theme1
                        title: {text:""},
                        axisY:{maximum: 100, title: "Score"},
                        data: [
                            {
                                type: "column",
                                dataPoints: result
                            }
                        ]
                    });
                    
                    console.log("Rendering chart");
                    chart1.render();
                });
            }
            
        }
        
        function showQuestions(){
            //get gameID and total up percentage for each question in that quiz
            gameID = $("#gameList2").val();
            username = $("#patientList3").val();
            
            //ignore the default choice
            if(gameID != -1 && username != -1)
            {
                //$("#questions").load("showQuestions.php", {"gameID": gameID});
                //console.log("Valid game choice");
                
                var datas = {gameID: gameID, username: username};
                
                //console.log("gameID: " + gameID);
                //console.log("username: " + username);
                
                $.getJSON("showQuestions.php", datas, function(result){
                    var chart2 = new CanvasJS.Chart("chart2", {
                        theme: "theme2", //theme1
                        title: {text:""},
                        axisY:{maximum: 100, title: "Score"},
                        axisX:{title: "Question #"},
                        legend: {verticalAlign: "top", horizontalAlign: "center"},
                        data: result
                    });
                    
                    console.log("rendering 2nd chart");
                    chart2.render()
                });
                
                ;
            }
        }
        
        
        //this has no drop down menu so i'm loading it upon loading the page
        window.onload = function(){
            $("#a1cByVisit").load("a1cByVisit.php");
            
            
            
            $.getJSON("a1cByVisit.php", function(result){
                var chart4 = new CanvasJS.Chart("a1cByVisit", {
                    theme: "theme2", //theme1
                    title: {text:""},
                    axisY: {maximum: 14, title: "Average A1c"},
                    data: [{
                        type: "column",
                        dataPoints: result
                    }]
                });
                
                chart4.render();
            });
        }
        
        function a1cChart(){
            username = $("#patientList4").val();
            
            //console.log(username);
            
            var data = {username: username};
            $("#a1cChart").load("a1cChart.php", data);
        }
    </script>
</head>

    <body id="all">
        <?php    
            require("loginAuth.php");
            require("adminAuth.php");
            require("common.php");
            include("pageHeader.php");
        ?>
        
        <a href="assessmentReport.php"><h1>Knowledge Assessment Report</h1></a>
        
        <h1>A1C By Patient</h1>
        <form class="pure-form">
            <fieldset>
                <h2></h2>
                <label><strong>Choose a Patient:</strong></label>
                <select name="patientList" id="patientList" onchange="showA1C()">
                    
                </select>
                <hr>
                <div id="patientChart" style="width: 80%; height:400px; background-color: #ccc; overflow-y: auto"></div>
            </fieldset>
        </form>
        
        <h1>Average A1C By Visit</h1>
        <form class="pure-form">
            <fieldset>
                <hr>
                <div name="a1cByVisit" id="a1cByVisit" style="width: 80%; height:400px; background-color: #ccc"></div>
            </fieldset>
        </form>
        
        <h1>Aggregate Quiz Scores</h1>
        <form class="pure-form">
            <fieldset>
                <h2>Average Pre and Post Scores</h2>
                <label><strong>Choose game:</strong></label>
                <select name="gameList" id="gameList" onchange = "showStats()">
                    
                </select>
                
                <label><strong>Choose patient:</strong></label>
                <select name="patientList2" id="patientList2" onchange="showStats()">
                    
                </select>
                <hr>
                <div id="chart1" style="width: 80%; height:400px; background-color: #ccc"></div>
            </fieldset>
        </form>
        
        <h1>Individual Question Scores</h1>
        <form class="pure-form">
            <fieldset>
                <h2>Average Pre and Post Percentage</h2>
                <label><strong>Choose a game:</strong></label>
                <select name="gameList2" id="gameList2" onchange="showQuestions()">
                    
                </select>
                
                <label><strong>Choose a patient:</strong></label>
                <select name="patientList3" id="patientList3" onchange="showQuestions()">
                    
                </select>
                <hr>
                
                <div id="chart2" style="width: 80%; height:400px; background-color: #ccc"></div>
            </fieldset>
        </form>
        
        <h1>Table of all play sessions</h1>
        <form class="pure-form">
            <fieldset>
                <label><strong>Choose a patient:</strong></label>
                <select name="patientList4" id="patientList4" onchange="a1cChart()">
                    
                </select>
                <hr>
                
                <div id="a1cChart" style="width: 80%; height:400px; background-color: #ccc; overflow-y: auto"></div>
            </fieldset>
        </form>
    </body>
</html>