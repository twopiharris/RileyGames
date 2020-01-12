<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en-US">
    <!----------------------------------------------------
            editQuiz.php
        -displays all the questions in a particular quiz inside text areas
        -you can edit any existing questions here
        -there is a button to add a question
        -deleting just changes that entry's "deleted" to 1
    ----------------------------------------------------->
    <?php
        require("loginAuth.php");
        require("adminAuth.php");
        require("common.php");
        include("pageHeader.php");
    ?>
    
    <head>
        <meta charset = "UTF-8">
        <meta name = "apple-mobile-web-app-capable" content = "yes" />
            <title>Riley Games</title>

        <link rel="stylesheet" href="pure-min.css">
        <link rel="stylesheet" href="style.css">
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
        <script src="jquery-validation-1.12.0/dist/jquery.validate.js"></script>
        <script src="jquery-validation-1.12.0/dist/additional-methods.js"></script>
            <script type="text/javascript" src="stay_standalone.js"></script>
    </head>
    
    <body id="all">
        <h2>Quiz Editor</h2>
        
        <script>
            //DELETE QUESTION SHORT SCRIPT WASN'T WORKING IN SEPARATE FILE
            function deleteProblem(problemID,quizID)
            {
                if(confirm("Are you sure you want to delete this?"))
                {
                    window.location.href = "deleteQuestion.php?pID=" + problemID + "&qID=" + quizID;
                    
                    /*$.ajax({
                        url: 'deleteQuestion.php',
                        method: 'POST',
                        data: {"pId": problemID, "qID": quizID},
                        success: function(){
                            console.log("Deletion successful");
                        },
                        error: function() {
                           //error
                        }
                    });*/
                }
            }
            
            //validate the questions before submitting
            //$("#saveQuiz").validate();
            
            //gray out radio buttons if the corresponding textarea is empty
            /*$("#id").focusout(funtion(){
                $("#foil").attr("disabled", "disabled");
            });*/
        </script>
        
        <?php
        
            try{
                //determine the quiz that will be edited with input from the "form"
                $editThis = filter_input(INPUT_POST, "choose");
                
                //echo $editThis;
                //formulate query to get all question data where the gameID matches the one chosen to edit
                //$query = "SELECT * FROM problem WHERE gameID='$editThis'";
                
                $data = $con->query("SELECT * FROM problem WHERE gameID='$editThis' AND deleted=0");
                $data->setFetchMode(PDO::FETCH_ASSOC);
                
                //the first form is there so user can add a question
                print <<<HERE
                <form action="addQuestion.php" method="post" class="pure-form" style="padding:1%">
                    <button type="submit" class="pure-button">Add question</button>
                    <input type="hidden" name="gameID" value="$editThis">
                </form><br>
                
                <form action="saveQuiz.php" id="saveQuiz"
                    method="post"
                    class="pure-form"
                    style="padding:1%">
                    
                    <fieldset>
                    <button type="submit" class="pure-button pure-button-primary">Save Quiz</button><br><br>
                    <input type="hidden" name="gameID" value="$editThis">
HERE;
                
                //counter for numbering of questions
                $counter = 0;
                
                //each row is a question from th chosen quiz
                foreach($data as $row)
                {
                    $counter = $counter + 1; //counts number of questions
                    print <<<HERE
                    <div style="border: 1px solid black;padding:1%">
                        <label>Question $counter:<label>
                        
                        <div id="del" style="float:right">
                        <button type="button" class="pure-button button-error button-border" onclick="deleteProblem($row[problemID],$editThis)">Delete question $counter</button>
                        </div>
                        
                        <input type="hidden" name="problemID" value="$row[problemID]">
                        
                        <input type="hidden" name="problemID$counter" value="$row[problemID]"><br>
                        <textarea rows="4" cols="50" name="question$counter" maxlength="500" required>$row[question]</textarea><br>
                        
                        <label>Answer A:</label><br>
                        <textarea rows="2" cols="50" name="foilA$counter" maxlength="500" required>$row[foilA]</textarea><br>
                        
                        <label>Answer B:</label><br>
                        <textarea rows="2" cols="50" name="foilB$counter" maxlength="500" required>$row[foilB]</textarea><br>
                        
                        <label>Answer C:</label><br>
                        <textarea rows="2" cols="50" name="foilC$counter" maxlength="500">$row[foilC]</textarea><br>
                        
                        <label>Answer D:</label><br>
                        <textarea rows="2" cols="50" name="foilD$counter" maxlength="500">$row[foilD]</textarea><br>
                        
                        <label>Correct Answer:</label><br>
HERE;
                    
                    //radio buttons don't work
                    //make sure the correct foil is checked (answers with no
                    //  text are grayed out?)
                    for($i='A'; $i <= 'D'; $i++)
                    {
                        if($i == "$row[correctFoil]")
                        {
                            print"<input class=\"css-checkbox\" id=\"correct$counter\" type=\"radio\" name=\"radio$counter\" value=\"$i\" checked>
                            <label class=\"css-label\" for=\"correct$counter\">$i</label><br>";
                        }
                        else
                        {
                            print"<input class=\"css-checkbox\" id=\"radio$i$counter\" type=\"radio\" name=\"radio$counter\" value=\"$i\">
                            <label class=\"css-label\" for=\"radio$i$counter\">$i</label><br>";
                        }
                    }
                    
                    print"<br>
                        </div>
                        <br>
                    ";
                }
                print <<<HERE
                    <input type="hidden" name="counter" value="$counter">
                    <button type="submit" class="pure-button pure-button-primary">Save Quiz</button>
                    </fieldset>
                    </form>
HERE;
                
            } catch(PDOException $e)
                {
                    echo 'ERROR: ' . $e->getMessage();
                }
        ?>
    </body>
</html>