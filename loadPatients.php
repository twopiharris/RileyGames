<?php
    require("common.php");
    
    try{
        //Just grab everything from play session table
        $data = $con->query("SELECT * FROM users WHERE admin='0'");
        $data->setFetchMode(PDO::FETCH_ASSOC);
        
        print"<option value=\"-1\">Select a patient. . . </option>
            <option value=\"*\">All Patients</option>";
        
        foreach($data as $row){
            $id = $row["username"];
            
            print<<<HERE
                <option value="$id">$id</option>
HERE;
        }
    } catch(PDOException $e){
        echo"Error: " . $e->getMessage();
    }
?>