<?php
    require("common.php");
    
    $username = filter_input(INPUT_POST, "username");
    $sessionID = filter_input(INPUT_POST, "sessionID");
    
    $red = "style=\"background-color:red\"";
    $green = "style=\"background-color:green\"";

    //print"$username, $sessionID";
    
    try {
        $data = $con->query("SELECT * FROM playsession WHERE sessionID='$sessionID'");
        $data->setFetchMode(PDO::FETCH_ASSOC);
    } catch(PDOException $e)
    {
        echo 'ERROR: ' . $e->getMessage();
    }
    
    foreach($data as $row)
    {
        $preBits = explode("", $row['preBits']);
        $postBits = explode("", $row['postBits']);
        $gameID = $row['gameID'];
    }
    
    try {
        $data = $con->query("SELECT * FROM problem WHERE gameID='$gameID'");
        $data->setFetchMode(PDO::FETCH_ASSOC);
    } catch(PDOException $e)
    {
        echo 'ERROR: ' . $e->getMessage();
    }
    
    $counter = 0;
    foreach($data as $row)
    {
        print"$row[question]<br>";
        
        if($preBits[$counter] == 1)
        {
            $style = $green;
        } elseif($preBits[$counter] == 0)
        {
            $style = $red;
        }
        print"<p $style>Pre Quiz<p><br>";
        
        if($postBits[$counter] == 1)
        {
            $style = $green;
        } elseif($postBits[$counter] == 0)
        {
            $style = $red;
        }
        print"<p $style>Post Quiz</p><br>";
        
        
        $counter++;
    }
?>