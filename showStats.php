<?php
    header('Content-Type: application/json');
    require("common.php");
    
    $gameID = filter_input(INPUT_GET, "gameID");
    $username = filter_input(INPUT_GET, "username");
    
    //there's probably a better way to do these but i'm tired putting the variable directly in wasn't working
    if($gameID == "*") {
        $sql = "SELECT * FROM playsession WHERE patientID='$username' AND deleted=0";
    }
    
    if ($username == "*") {
        $sql = "SELECT * FROM playsession WHERE gameID='$gameID' AND deleted=0";
    }
    
    if($gameID != "*" && $username != "*"){
        $sql = "SELECT * FROM playsession WHERE gameID='$gameID' AND patientID='$username' AND deleted=0";
    }
    
    if($gameID == "*" && $username == "*"){
        $sql = "SELECT * FROM playsession WHERE gameID=* AND patientID=* AND deleted=0";
    }
    
    try{
        $data = $con->query($sql);
        $data->setFetchMode(PDO::FETCH_ASSOC);
    } catch(PDOException $e){
        echo"Error: " . $e->getMessage();
    }
    
    $data_points = array();
    
    $preTotal = 0;
    $postTotal = 0;
    $records = 0;
    
    foreach($data as $row)
    {
        $records++;
        $preTotal += $row[preScore];
        $postTotal += $row[postScore];
    }
    
    $preAve = round($preTotal/$records, 2);
    $postAve = round($postTotal/$records, 2);
    
    //two data points
    
    $prePoint = array("label" => "PreScore", "y" => $preAve);
    array_push($data_points, $prePoint);
    
    $postPoint = array("label" => "PostScore", "y" => $postAve);
    array_push($data_points, $postPoint);
    
    //print"PreAve: $preAve, PostAve: $postAve";
    
    echo json_encode($data_points, JSON_NUMERIC_CHECK);
?>