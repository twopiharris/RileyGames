<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en-US">
    <!---------------------------------------------------------------
            saveQuestion.php
        -stores question stuff into server
        -redirects back to edit quiz
    ---------------------------------------------------------------->
    <?php
        require("loginAuth.php");
        require("adminAuth.php");
        require("common.php");
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
            try{
                //get the data
                $gameID = filter_input(INPUT_POST, "gameID");
                $question = filter_input(INPUT_POST, "question");
                $foilA = filter_input(INPUT_POST, "foilA");
                $foilB = filter_input(INPUT_POST, "foilB");
                $foilC = filter_input(INPUT_POST, "foilC");
                $foilD = filter_input(INPUT_POST, "foilD");
                $correctFoil = $_POST["correct"];
                
                /*print"
                    Question just saved:<br>
                    Game ID: $gameID <br>
                    Question: $question <br>
                    1: $foilA <br>
                    2: $foilB <br>
                    3: $foilC <br>
                    4: $foilD <br>
                    Correct: $correctFoil <br>
                ";
                
                echo"saving";*/
                
                //stop being a nerd ehhe hehehhehe eh e
                
                //prepare sql statement
                $sql = "INSERT INTO problem (gameID,question,foilA,foilB,foilC,foilD,correctFoil) VALUES (:id, :q, :a, :b, :c, :d, :correct)";
                
                //update record
                $update = $con->prepare($sql);
                $update->bindParam(':id',$gameID);
                $update->bindParam(':q',$question);
                $update->bindParam(':a',$foilA);
                $update->bindParam(':b',$foilB);
                $update->bindParam(':c',$foilC);
                $update->bindParam(':d',$foilD);
                $update->bindParam(':correct',$correctFoil);
                $update->execute();
                
                //this form will direct user back to quiz w/ new q added
                print<<<HERE
                    <form id="redirect" action="editQuiz.php" method="post">
                        <input type="hidden" name="choose" value="$gameID">
                    </form>
HERE;
                
            } catch(PDOException $e)
                {
                    echo 'ERROR: ' . $e->getMessage();
                }
    ?>
    
    <script>
        //auto-submit script for redirect form
        document.getElementById("redirect").submit();
    </script>
    
    </body>

</html>