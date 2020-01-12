<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en-US">
    <!-----------------------------------------------------------------------
            quiz.php
        -this will be the start of a playsession
        -grade for this quiz is sent to server immediately to avoid data loss
    ------------------------------------------------------------------------>
    <?php
        require("loginAuth.php");
        require("common.php");
	include("patientHeader.php");
    ?>
            
    <head>
        <meta charset = "UTF-8">
	    <meta name = "apple-mobile-web-app-capable" content = "yes" />
            <title>PreQuiz: Riley Games</title>
            <link rel="stylesheet" href="style.css">
            <link rel="stylesheet" href="pure-min.css">
            <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
            <script type="text/javascript" src="stay_standalone.js"></script>
	    <script type="text/javascript" src="formValidation.js"></script>
    </head>
    
    <body id="all">
        <?php
            //find out what quiz
            $gameID = filter_input(INPUT_POST, "gameID");
            $gameName = filter_input(INPUT_POST, "gameName");
            $URL = filter_input(INPUT_POST, "URL");
            
            //this will be needed when returned from game
            $_SESSION['gameID'] = $gameID;
            $_SESSION['gameName'] = $gameName;
            $_SESSION['url'] = $URL;
	    
	    //if a nurse is playing then skip to the game
	    if($_SESSION[admin] == 1)
	    {
		header("Location: $URL");
	    }
            
            //save start time of quiz
            $time = localtime();
	    $timeFormatted = $time[2].":".$time[1].":".$time[0];
            $_SESSION['startTime'] = $timeFormatted;
            
            print <<<HERE
                <h1>Pre Quiz: $gameName</h1>
               
HERE;
    
            try
            {
                //get data, all problems from the quiz
                $data = $con->query("SELECT * FROM problem WHERE gameID='$gameID' AND deleted=0");
                $data->setFetchMode(PDO::FETCH_ASSOC);
                
                print <<<HERE
                    <form id="preQuiz" action="submitQuiz.php" method="post">
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
                        <input id="B$counter" class="css-checkbox" type="radio" name="answer$counter" value="B">
                        <label class="css-label" for="B$counter">$row[foilB]</label><br>
HERE;
                    //we are allowing for C and D to be null
                    //if they don't exist, skip the radio button
                    if("$row[foilC]" != "")
                    {
                        print"<input id=\"C$counter\" class=\"css-checkbox\" type=\"radio\" name=\"answer$counter\" value=\"C\">
                        <label class=\"css-label\" for=\"C$counter\">$row[foilC]</label><br>";
                    }
                    if("$row[foilD]" != "")
                    {
                        print"<input id=\"D$counter\" class=\"css-checkbox\" type=\"radio\" name=\"answer$counter\" value=\"D\">
                        <label class=\"css-label\" for=\"D$counter\">$row[foilD]</label><br>";
                    }
                    print"<br><hr>";
                } //end printing of all questions
                
                print <<<HERE
                    <button class = "pure-button pure-button-primary button-xlarge" type="button" onclick="validate('preQuiz')">Done!</button>
                    <input type="hidden" name="numQuestions" id="numQuestions" value="$counter">
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