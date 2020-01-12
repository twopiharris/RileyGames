<?php
    require("common.php");
    
    $username = filter_input(INPUT_POST, "username");
    //print"$username<br>";
    
    //first put the correct answers in an array
    $gameID = "12";
    //grab all the answers
    try{
        $sql = "SELECT correctFoil FROM problem WHERE gameID=$gameID";
        $data = $con->query($sql);
        $data->setFetchMode(PDO::FETCH_ASSOC);
    } catch(PDOException $e){
        echo"Error: " . $e->getMessage();
    }
    
    $correctAnswers = array();
    $counter = 0;
    foreach($data as $row){
        $correctAnswers[$counter] = $row['correctFoil'];
        $counter++;
    }
    
    //now get the assessment report(s) for to display
    
    try{
        //grab everything from table
        $data = $con->query("SELECT * FROM knowledgeAssessment");
        
        $data->setFetchMode(PDO::FETCH_ASSOC);
        
    } catch(PDOException $e){
        echo"Error: " . $e->getMessage();
    }
        
        print"<div style=\"padding: 1%\">";
        
        foreach($data as $row)
        {
            if($row['username'] == $username)
            {
                print"User:$row[username],<br>
                Date: $row[dateTaken],<br>
                Score: $row[score],<br>";
                
                $answers = str_split($row['answers']);
                
                for($i = 0; $i < $counter; $i++)
                {
                    print"Answer given: $answers[$i], Correct Answer: $correctAnswers[$i]<br>";
                }
                
                print"<br><hr><br>";
            }
        }
    
        print"</div>";
        
        //END TABLE
?>