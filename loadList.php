<?php
    require("common.php");
    
    try{
        //Just grab everything from play session table
        $data = $con->query("SELECT * FROM game");
        $data->setFetchMode(PDO::FETCH_ASSOC);
        
        print"<option value=\"-1\">Select a game. . . </option>";
        
        foreach($data as $row){
            $id = $row["gameID"];
            $name = $row["gameName"];
            
            print<<<HERE
                <option value="$id">$name</option>
HERE;
        }
    } catch(PDOException $e){
        echo"Error: " . $e->getMessage();
    }
?>