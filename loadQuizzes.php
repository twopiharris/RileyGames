<?php
    require("common.php");
    
    try{
        $username = filter_input(INPUT_POST, "username");
        
        //print"$username";
        
        $data = $con->query("SELECT * FROM playsession WHERE patientID='$username' AND deleted=0");
        $data->setFetchMode(PDO::FETCH_ASSOC);
        
        //print'<select name="quizList" id="quizList" onchange="showReport()">';
        
        foreach($data as $row){
            $date = $row['dateTaken'];
            $val = $row['sessionID'];
            
            print<<<HERE
                <option value="$val">$date</option>
HERE;
        }
        
        //print'</select>';
        
    } catch(PDOException $e){
        echo"Error: " . $e->getMessage();
    }
?>