<?php
    require("common.php");
    
    $username = filter_input(INPUT_POST, "username");
    //print"$username<br>";
    
    try{
    //Just grab everything from play session table
    if($username == "*")
    {
        $data = $con->query("SELECT playsession.patientID, playsession.dateTaken, playsession.startTime, playsession.endTime, game.gameName, playsession.preScore, playsession.preBits, playsession.postScore, playsession.postBits, playsession.a1c FROM playsession, game WHERE playsession.gameID = game.gameID AND deleted=0");
    } else {
        $data = $con->query("SELECT playsession.patientID, playsession.dateTaken, playsession.startTime, playsession.endTime, game.gameName, playsession.preScore, playsession.preBits, playsession.postScore, playsession.postBits, playsession.a1c FROM playsession, game WHERE playsession.gameID = game.gameID AND deleted=0");
    }
    
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
    //$data = $con->query("SELECT * FROM playsession");
    if($username == "*")
    {
        $all = true;
        $data = $con->query("SELECT playsession.patientID, playsession.dateTaken, playsession.startTime, playsession.endTime, game.gameName, playsession.preScore, playsession.preBits, playsession.postScore, playsession.postBits, playsession.a1c FROM playsession, game WHERE playsession.gameID = game.gameID AND deleted=0");
    } else {
        $all = false;
        $data = $con->query("SELECT playsession.patientID, playsession.dateTaken, playsession.startTime, playsession.endTime, game.gameName, playsession.preScore, playsession.preBits, playsession.postScore, playsession.postBits, playsession.a1c FROM playsession, game WHERE playsession.gameID = game.gameID AND deleted=0");
    }
    
    $data->setFetchMode(PDO::FETCH_ASSOC);
    
    } catch(PDOException $e){
        echo"Error: " . $e->getMessage();
    }
    
    //each table entry
    foreach($data as $row)
    {
        if($row['patientID'] == $username || $all)
        {
            print"<tr> \n";
            //each field first
            foreach($row as $field=>$value)
            {
                print"<td>$value</td> \n";
            }
            print"</tr>";
        }
    }
    
    print"</table></div> \n";
    
    //END TABLE
?>