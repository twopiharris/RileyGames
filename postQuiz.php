<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en-US">
    <!-----------------------------------------------------------------------
            postQuiz.php
        -page a game will return to after it is done
        -after submission, the playsession ID for the prequiz is found from the server and the post
            quiz grade is added
    ------------------------------------------------------------------------>
    <?php
        require("loginAuth.php");
        require("common.php");
        include("patientHeader.php");
    ?>
            
    <head>
        <meta charset = "UTF-8">
            <meta name = "apple-mobile-web-app-capable" content = "yes" />
        <title>PostQuiz: Riley Games</title>
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="pure-min.css">
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
        <script src="jquery-validation-1.12.0/dist/jquery.validate.js"></script>
        <script src="jquery-validation-1.12.0/dist/additional-methods.js"></script>
        <script type="text/javascript" src="stay_standalone.js"></script>
        <script type="text/javascript" src="formValidation.js"></script>
    </head>
    
    <script>
        //require all questions to be answered
        $("#postQuiz").validate();
    </script>
    
    <body id="all">
        <?php
            //find out what quiz
            $gameID = $_SESSION[gameID]; //filter_input(INPUT_POST, "gameID");
            $gameName = $_SESSION[gameName]; //filter_input(INPUT_POST, "gameName");
            $URL = $_SESSION[URL]; //filter_input(INPUT_POST, "URL");
            
	    //if a nurse is playing then skip to the game
	    if($_SESSION[admin] == 1)
	    {
		header("Location: patientViewGames.php");
	    }
            
            print <<<HERE
                <h1>Post Quiz: $gameName</h1>
HERE;
    
            try
            {
                //get data, all problems from the quiz
                $data = $con->query("SELECT * FROM problem WHERE gameID='$gameID' AND deleted=0");
                $data->setFetchMode(PDO::FETCH_ASSOC);
                
                print <<<HERE
                    <form id="postQuiz" action="submitPostQuiz.php" method="post">
                    <fieldset>
                    <input type="hidden" name="gameID" value="$gameID">
                    <input type="hidden" name="gameName" value="$gameName">
                    <input type="hidden" name="URL" value="$URL">
HERE;
                
                //in case i need a counter later
                $counter = 0;
                foreach($data as $row)
                {
                    $counter++;
                    
                    print <<<HERE
                        <!--<h2>Question $counter</h2>-->
                        <p id="question">$counter: $row[question]</p>
                        <input id="A$counter" class="css-checkbox" type="radio" name="answer$counter" value="A" required />
                        <label class="css-label" for="A$counter">$row[foilA]</label><br>
                        <input id="B$counter" class="css-checkbox" type="radio" name="answer$counter" value="B" required />
                        <label class="css-label" for="B$counter">$row[foilB]</label><br>
HERE;
                    //we are allowing for C and D to be null
                    //if they don't exist, skip the radio button
                    if("$row[foilC]" != "")
                    {
                        print"<input id=\"C$counter\" class=\"css-checkbox\" type=\"radio\" name=\"answer$counter\" value=\"C\" required />
                        <label class=\"css-label\" for=\"C$counter\">$row[foilC]</label><br>";
                    }
                    if("$row[foilD]" != "")
                    {
                        print"<input id=\"D$counter\" class=\"css-checkbox\" type=\"radio\" name=\"answer$counter\" value=\"D\" required />
                        <label class=\"css-label\" for=\"D$counter\">$row[foilD]</label><br>";
                    }
                    print"<br><hr>";
                } //end printing of all questions
                
                print <<<HERE
                    <button class = "pure-button pure-button-primary button-xlarge" type="button" onclick="validate('postQuiz')" >Done!</button>
                    <input type="hidden" name="numQuestions" value="$counter">
                    <input type="hidden" name="gameID" value="$gameID">
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