<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en-US">
    <!-----------------------------------------------------------------------
            postQuiz.php
        -page a game will return to after it is done
    ------------------------------------------------------------------------>
    <?php
        require("loginAuth.php");
        require("common.php");
        include("patientHeader.php");
    ?>
            
    <head>
        <meta charset = "UTF-8">
        <meta name = "apple-mobile-web-app-capable" content = "yes" />
        <title>Done: Riley Games</title>
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="pure-min.css">
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
        <script src="jquery-validation-1.12.0/dist/jquery.validate.js"></script>
        <script src="jquery-validation-1.12.0/dist/additional-methods.js"></script>
        <script type="text/javascript" src="stay_standalone.js"></script>
    </head>
    
<body id="all">
    <?php
        //find out what quiz
        $gameID = $_SESSION[gameID];
        $gameName = $_SESSION[gameName];
        $URL = $_SESSION[URL];
        $answers = $_SESSION[answers];
        
        print <<<HERE
            <h1>Quiz Results: $gameName</h1>
HERE;

        try
        {
            //get data, all problems from the quiz
            $data = $con->query("SELECT * FROM problem WHERE gameID='$gameID'");
            $data->setFetchMode(PDO::FETCH_ASSOC);
            
            print <<<HERE
                <form id="postQuiz" action="logout.php" method="post">
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
                
                switch($row[correctFoil])
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
                        <p id="question">$counter: $row[question]</p>
                        <input id="A$counter" class="css-checkbox" type="radio" name="answer$counter" value="A" $selected[0] $disabled required>
                        <label $highlight[0] class="css-label" for="A$counter">$row[foilA]</label><br>
                        <input id="B$counter" class="css-checkbox" type="radio" name="answer$counter" value="B" $selected[1] $disabled>
                        <label $highlight[1] class="css-label" for="B$counter">$row[foilB]</label><br>
HERE;
                    //we are allowing for C and D to be null
                    //if they don't exist, skip the radio button
                    if("$row[foilC]" != "")
                    {
                        print"<input id=\"C$counter\" class=\"css-checkbox\" type=\"radio\" name=\"answer$counter\" value=\"C\" $selected[2] $disabled>
                        <label $highlight[2] class=\"css-label\" for=\"C$counter\">$row[foilC]</label><br>";
                    }
                    if("$row[foilD]" != "")
                    {
                        print"<input id=\"D$counter\" class=\"css-checkbox\" type=\"radio\" name=\"answer$counter\" value=\"D\" $selected[3] $disabled>
                        <label $highlight[3] class=\"css-label\" for=\"D$counter\">$row[foilD]</label><br>";
                    }
                    print"<br><hr>";
                } //end printing of all questions
            
            print <<<HERE
				<div align="center">
					<h2>Done!</h2>
					<p>Give your iPad to a nurse</p>
					<form action="logout.php" method="post">
						<button class="pure-button pure-button-primary button-border" type="submit">Finish</button>
					</form>
				</div>
                <input type="hidden" name="numQuestions" value="$counter">
                <input type="hidden" name="gameID" value="$gameID">
                </fieldset>
                </form>
HERE;
        }catch(PDOException $e)
        {
            echo 'ERROR: ' . $e->getMessage();
        }
    ?>
</body>