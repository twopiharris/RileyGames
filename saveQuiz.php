<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en-US">
    
    <!--------------------------------------------------------
            saveQuiz.php
        -activated when a quiz is saved
        -redirect to another page (either home or quiz edit) after save
    --------------------------------------------------------->
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
            <script type="text/javascript" src="stay_standalone.js"></script>
    </head>
    
    <body>
        <?php
            //retrieve all the data from the form using a loop
            $gameID = filter_input(INPUT_POST, "gameID");
            //print"Quiz ID: $quizID<br>";
            
            $counter = filter_input(INPUT_POST, "counter");
            //print"Number of questions: $counter<br><br>";
            
            for($i = 1; $i < $counter+1; $i++)
            {
                //get the data
                $question = filter_input(INPUT_POST, "question$i");
                $foilA = filter_input(INPUT_POST, "foilA$i");
                $foilB = filter_input(INPUT_POST, "foilB$i");
                $foilC = filter_input(INPUT_POST, "foilC$i");
                $foilD = filter_input(INPUT_POST, "foilD$i");
                $correctFoil = $_POST["radio$i"];
                $problemID = filter_input(INPUT_POST, "problemID$i");
                
                //visual print out of what is being put into the table
                /*print <<<HERE
                    Question $i: $question<br>
                    Problem ID: $problemID<br>
                    Foils:$foilA,$foilB,$foilC,$foilD<br>
                    Correct Foil: $correctFoil<br><br>
HERE;*/
                
                //stop being a nerd ehhe hehehhehe eh e
                
                //prepare sql statement
                $sql = "UPDATE problem SET question=?, foilA=?, foilB=?, foilC=?, foilD=?, correctFoil=? WHERE problemID=?";
                
                try{
                    //update record
                    $update = $con->prepare($sql);
                    $update->execute(array($question,$foilA,$foilB,$foilC,$foilD,$correctFoil,$problemID));
                } catch(PDOException $e)
                {
                    echo 'ERROR: ' . $e->getMessage();
                }
            }
            
            print<<<HERE
                <form id="redirect" action="editQuiz.php" method="post">
                    <input type="hidden" name="choose" value="$gameID">
                </form>
HERE;
        ?>
    
    <script>
        //auto-submit script for redirect form
        document.getElementById("redirect").submit();
    </script>
    
    </body>
</html>