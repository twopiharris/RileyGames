<!DOCTYPE html>
<?php session_start(); ?>
    <html lang="en-US">
	<head>
	    <meta name = "apple-mobile-web-app-capable" content = "yes" />
	    <link rel="stylesheet" href="pure-min.css">
            <link rel="stylesheet" href="style.css">
            <script type="text/javascript" src="canvasjs-1.4.0/canvasjs.min.js"></script>
            <script type="text/javascript" src="stay_standalone.js"></script>
	</head>
        
        <!----------------------------------------------------------------
            stats.php
        -prototype for viewing the stats of play sessions
        -organize by quiz, patient, or overall
        -show scores in table and chart
        ------------------------------------------------------------------>
<body id="all">        
    <?php    
        require("loginAuth.php");
        require("adminAuth.php");
        require("common.php");
        include("pageHeader.php");
        
        try{
         //Just grab everything from play session table
         $data = $con->query("SELECT * FROM playsession");
         $data->setFetchMode(PDO::FETCH_ASSOC);
        } catch(PDOException $e){
            echo"Error: " . $e->getMessage();
        }
        
        print"<div style=\"padding: 1%\"><table> \n";
        
        $row = $data->fetch(PDO::FETCH_ASSOC);
        
        print"<tr> \n";
        //headers
        foreach($row as $field=>$value)
        {
            print"<th>$field</th> \n"; 
        }
        print"</tr>";
        
        try{
         //Just grab everything from play session table
         $data = $con->query("SELECT * FROM playsession");
         $data->setFetchMode(PDO::FETCH_ASSOC);
        } catch(PDOException $e){
            echo"Error: " . $e->getMessage();
        }
        
        //each table entry
        foreach($data as $row)
        {
            print"<tr> \n";
                //each field first
                foreach($row as $field=>$value)
                {
                    print"<td>$value</td> \n";
                }
                print"</tr>";
        }
        
        print"</table></div> \n";
        
        //END TABLE
        
        //CHART AREA

        //AVERAGE OF EACH GAME
print<<<HERE
    <script type="text/javascript">
        window.onload = function () {
                var chart1 = new CanvasJS.Chart("chart1", {
                      theme: "theme2",//theme1
                      title:{
                          text: "Averages: All Prescores and Postscores"              
                     },
                      data: [              
                      {
                          // Change type to "bar", "splineArea", "area", "spline", "pie",etc.
                          type: "column",
                          dataPoints: [
HERE;
    try{
         //Just grab everything from play session table
         $data = $con->query("SELECT * FROM playsession");
         $data->setFetchMode(PDO::FETCH_ASSOC);
        } catch(PDOException $e){
            echo"Error: " . $e->getMessage();
        }

    $preTotal = 0;
    $postTotal = 0;
    $records = 0;
    foreach($data as $row)
    {
        $records++;
        $preTotal += $row[preScore];
        $postTotal += $row[postScore];
        //print"{label: \"$row[patientID]\", y: $row[preScore]},";
    }
    $preAve = $preTotal/$records;
    $postAve = $postTotal/$records;
    print"{label: \"Average PreScore\", y: $preAve},{label: \"Average PostScore\", y: $postAve}";
    
print<<<HERE
                          ]
                      }
                      ]
                });
      
                chart1.render();
		//chart1 = {};
        }
  </script>
HERE;

//AVERAGE OF ANGRY MONITOR
/*
    $gameName = "What Do These Numbers Mean?";
    $gameID = 1;
print<<<HERE
    <script type="text/javascript">
        window.onload = function () {
                var chart2 = new CanvasJS.Chart("chart2", {
                      theme: "theme2",//theme1
                      title:{
                          text: "$gameName"              
                     },
                      data: [              
                      {
                          // Change type to "bar", "splineArea", "area", "spline", "pie",etc.
                          type: "column",
                          dataPoints: [
HERE;
    try{
         //Just grab everything from play session table
         $data = $con->query("SELECT * FROM playsession WHERE gameID=$gameID");
         $data->setFetchMode(PDO::FETCH_ASSOC);
        } catch(PDOException $e){
            echo"Error: " . $e->getMessage();
        }

    $preTotal = 0;
    $postTotal = 0;
    $records = 0;
    foreach($data as $row)
    {
        $records++;
        $preTotal += $row[preScore];
        $postTotal += $row[postScore];
        //print"{label: \"$row[patientID]\", y: $row[preScore]},";
    }
    $preAve = $preTotal/$records;
    $postAve = $postTotal/$records;
    print"{label: \"Average PreScore\", y: $preAve},{label: \"Average PostScore\", y: $postAve}";
    
print<<<HERE
                          ]
                      }
                      ]
                });
		
                chart2.render();
		//chart2 = {};
        }
  </script>
HERE;

//AVERAGE OF BUBBLE POP
    $gameName = "We All Have Sick Days";
    $gameID = 2;
print<<<HERE
    <script type="text/javascript">
        window.onload = function () {
                var chart3 = new CanvasJS.Chart("chart3", {
                      theme: "theme2",//theme1
                      title:{
                          text: "$gameName"              
                     },
                      data: [              
                      {
                          // Change type to "bar", "splineArea", "area", "spline", "pie",etc.
                          type: "column",
                          dataPoints: [
HERE;
    try{
         //Just grab everything from play session table
         $data = $con->query("SELECT * FROM playsession WHERE gameID=$gameID");
         $data->setFetchMode(PDO::FETCH_ASSOC);
        } catch(PDOException $e){
            echo"Error: " . $e->getMessage();
        }

    $preTotal = 0;
    $postTotal = 0;
    $records = 0;
    foreach($data as $row)
    {
        $records++;
        $preTotal += $row[preScore];
        $postTotal += $row[postScore];
        //print"{label: \"$row[patientID]\", y: $row[preScore]},";
    }
    $preAve = $preTotal/$records;
    $postAve = $postTotal/$records;
    print"{label: \"Average PreScore\", y: $preAve},{label: \"Average PostScore\", y: $postAve}";
    
print<<<HERE
                          ]
                      }
                      ]
                });
		
                chart3.render();
		//chart3 = {};
        }
  </script>
HERE;
*/

?>
    
    <div id="chart1" style="width: 80%; height:400px; background-color: #ccc"></div>

</body>
    </html>