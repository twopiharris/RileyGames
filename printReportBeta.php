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
                
                try
                {
                    //get data, all problems from the quiz
                    $quizData = $con->query("SELECT * FROM problem WHERE gameID='12'");
                    $quizData->setFetchMode(PDO::FETCH_ASSOC);
                    
                    print <<<HERE
                    <form id="postQuiz" action="" method="post">
                    <fieldset>
HERE;

                    //in case i need a counter later
                    $counter = 0;
                    foreach($quizData as $problem)
                    {
                        $counter++;
                        $green = "style='background-color: green;'";
                        $red = "style='background-color: red;'";
                        $checked = "checked='checked'";
                        $disabled = "disabled='disabled'";
                        
                        $highlight = array("","","","");
                        $selected = array("","","","");
                        
                        switch($answers[$counter-1])
                        {
                            case "A":
                                $highlight[0] = $red;
                                $selected[0] = $checked;
                                break;
                            case "B":
                                $highlight[1] = $red;
                                $selected[1] = $checked;
                                break;
                            case "C":
                                $highlight[2] = $red;
                                $selected[2] = $checked;
                                break;
                            case "D":
                                $highlight[3] = $red;
                                $selected[3] = $checked;
                                break;
                        }
                        
                        switch($problem[correctFoil])
                        {
                            case "A":
                                $highlight[0] = $green;
                                break;
                            case "B":
                                $highlight[1] = $green;
                                break;
                            case "C":
                                $highlight[2] = $green;
                                break;
                            case "D":
                                $highlight[3] = $green;
                                break;
                        }
                        
                        print <<<HERE
                                <!--<h2>Question $counter</h2>-->
                                <p id="question">$counter: $problem[question]</p>
                                <input id="A$counter" class="css-checkbox" type="radio" name="answer$counter" value="A" $selected[0] $disabled required>
                                <label $highlight[0] class="css-label" for="A$counter">$problem[foilA]</label><br>
HERE;
                                if(strlen($problem['foilA']) > 63)
                                {
                                    print"<br><br>";
                                }
                                print <<<HERE
                                <input id="B$counter" class="css-checkbox" type="radio" name="answer$counter" value="B" $selected[1] $disabled>
                                <label $highlight[1] class="css-label" for="B$counter">$problem[foilB]</label><br>
HERE;
                                if(strlen($problem['foilB']) > 63)
                                {
                                    print"<br><br>";
                                }
                            //we are allowing for C and D to be null
                            //if they don't exist, skip the radio button
                            if("$problem[foilC]" != "")
                            {
                                print"<input id=\"C$counter\" class=\"css-checkbox\" type=\"radio\" name=\"answer$counter\" value=\"C\" $selected[2] $disabled>
                                <label $highlight[2] class=\"css-label\" for=\"C$counter\">$problem[foilC]</label><br>";
                                
                                if(strlen($problem['foilC']) > 63)
                                {
                                    print"<br><br>";
                                }
                            }
                            if("$problem[foilD]" != "")
                            {
                                print"<input id=\"D$counter\" class=\"css-checkbox\" type=\"radio\" name=\"answer$counter\" value=\"D\" $selected[3] $disabled>
                                <label $highlight[3] class=\"css-label\" for=\"D$counter\">$problem[foilD]</label><br>";
                                
                                if(strlen($problem['foilD']) > 63)
                                {
                                    print"<br><br>";
                                }
                            }
                            print"<br><hr>";
                        } //end printing of all questions
                    
                    print <<<HERE
                        </fieldset>
                        </form>
HERE;
                }catch(PDOException $e)
                {
                    echo 'ERROR: ' . $e->getMessage();
                }
            }
        }
    
        print"</div>";
        
        //END TABLE
?>