<?php
    header('Content-Type: application/json');
    require("common.php");
    
    $gameID = filter_input(INPUT_GET, "gameID");
    $username = filter_input(INPUT_GET, "username");
    
    //there's probably a better way to do these but i'm tired
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
       //Just grab everything from play session table
       //$data = $con->query("SELECT * FROM playsession WHERE gameID=$gameID");
       $data = $con->query($sql);
       $data->setFetchMode(PDO::FETCH_ASSOC);
    } catch(PDOException $e){
       echo"Error: " . $e->getMessage();
    }
    
    $preArray = array();
    $postArray = array();
    $numQuestions = 0;
    
    //cycle through each entry (two arrays of bits)
    foreach($data as $row)
    {
        $numQuestions++;
        
        //separate each bit and add it to the total
        
        //these are strings
        $thisPre = $row["preBits"];
        $thisPost = $row["postBits"];
        //print"$thisPre, $thisPost <br>";
        
        //this should be an array of bits
        $thisPre = str_split($thisPre);
        $thisPost = str_split($thisPost);
        
        //cycle through each question
        $arrLength = count($thisPre);
        for($i = 0; $i < $arrLength; $i++)
        {
            //add the current bit to the running total
            $preArray[$i] += $thisPre[$i];
            $postArray[$i] += $thisPost[$i];
        }
    }
    
    //number of entries in $numQuestions
    //divide all entries in $preArray and $postArray by $numQuestions to get average
    $arrLength = count($preArray);
    for($i = 0; $i < $arrLength; $i++)
    {
        $preArray[$i] = $preArray[$i]/$numQuestions;
        $postArray[$i] = $postArray[$i]/$numQuestions;
        
        //round to 2 decimals
        $preArray[$i] = round($preArray[$i], 2) * 100;
        $postArray[$i] = round($postArray[$i], 2) * 100;
    }
    
    //holds both sets of data
    //$data = array();
    
    $preDataPoints = array();
    $postDataPoints = array();
    
    for($i = 0; $i < $arrLength; $i++)
    {
        $j = $i + 1;
        $point = array("label" => $j, "y" => $preArray[$i]);
        array_push($preDataPoints, $point);
        
        $point = array("label" => $j, "y" => $postArray[$i]);
        array_push($postDataPoints, $point);
    }
    
    //Have two arrays that hold the "datapoints" for pre and post
    $pre = array("type" => "column", "name" => "PreQuiz", "legendText" => "PreQuiz", "showInLegend" => true, "dataPoints" => $preDataPoints);
    $post = array("type" => "column", "name" => "PreQuiz", "legendText" => "PostQuiz", "showInLegend" => true, "dataPoints" => $postDataPoints);

    $data = array($pre, $post);
    
    //echo json_encode($data_points, JSON_NUMERIC_CHECK);
    echo json_encode($data, JSON_NUMERIC_CHECK);
?>