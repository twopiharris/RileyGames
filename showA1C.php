<?php
    header('Content-Type: application/json');
    require("common.php");
    
    $username = filter_input(INPUT_GET, "username");
    
    if($username == "*")
    {
        $sql = "SELECT * FROM playsession";
    } else {
        $sql = "SELECT * FROM playsession WHERE patientID='$username'";
    }
    
    try{
        $result = $con->query($sql);
        $result->setFetchMode(PDO::FETCH_ASSOC);
        
        $data_points = array();
        $numPoints = 0;
        
        foreach($result as $row)
        {
            $point = array("x" => "$numPoints" , "y" => $row['a1c']);
            $numPoints++;
            array_push($data_points, $point);
            
            //print"Date: $row[dateTaken], A1c: $row[a1c]<br>";
        }
        
        echo json_encode($data_points, JSON_NUMERIC_CHECK);
        
        
        /*
        print"<table><tr><th>Date</th><th>A1C</th></tr>";
        
        foreach($result as $row)
        {
            print"<tr><td>$row[dateTaken]</td><td>$row[a1c]</td></tr>";
        }
        
        print"</table>";
        */
    } catch(PDOException $e){
        echo"Error: " . $e->getMessage();
    }
?>