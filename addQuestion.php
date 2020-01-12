<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en-US">
    <!------------------------------------------------------
            addQuestion.php
        -relatively simple form for adding a new question to a quiz
        -gameID variable is for some reason not making it here
    -------------------------------------------------------->
    <?php
        require("loginAuth.php");
        require("adminAuth.php");
        require("common.php");
        include("pageHeader.php");
    ?>
    
    <head>
        <meta charset = "UTF-8">
            <title>Riley Games</title>
            <link rel="stylesheet" href="pure-min.css">
            <link rel="stylesheet" href="style.css">
            <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
            <meta name = "apple-mobile-web-app-capable" content = "yes" />
            <script type="text/javascript" src="stay_standalone.js"></script>
    </head>
    
    <body id="all">

        <h2>New question </h2>
        <h4>***To add True/False question, submit question with one answer True, and the second False***</h4>
        <form action="saveQuestion.php"
            method="post"
            class="pure-form"
            style="padding: 1%">
            
            <?php
                //gather the gameID from the previous form to use when saving to database
                $gameID = filter_input(INPUT_POST, "gameID");
                
                print"
                    <!--<label>Game ID: $gameID</label>-->
                    <input type=\"hidden\" name=\"gameID\" value=\"$gameID\">
                ";
            ?>
            
            <fieldset>
                <button type="submit" class="pure-button pure-button-primary">Save</button><br><br>
                
                <div style="border: 1px solid black; padding: 1%">
                    <label>Question:<label><br>
                    <textarea rows="4" cols="50" name="question" required maxlength="500"></textarea><br>
                    
                    <label>Answer 1:</label><br>
                    <textarea rows="2" cols="50" name="foilA" required maxlength="500"></textarea><br>
                    
                    <label>Answer 2:</label><br>
                    <textarea rows="2" cols="50" name="foilB" required maxlength="500"></textarea><br>
                    
                    <label>Answer 3:</label><br>
                    <textarea rows="2" cols="50" name="foilC" maxlength="500"></textarea><br>
                    
                    <label>Answer 4:</label><br>
                    <textarea rows="2" cols="50" name="foilD" maxlength="500"></textarea><br>
                    
                    <label>Correct Answer:</label><br>
                    <input class="css-checkbox" type="radio" name="correct" id="A" value="A" required oninvalid="this.setCustomValidity('Select a correct answer')"><label class="css-label" for="A">A</label><br>
                    <input class="css-checkbox" type="radio" name="correct" id="B" value="B" required oninvalid="this.setCustomValidity('Select a correct answer')"><label class="css-label" for="B">B</label><br>
                    <input class="css-checkbox" type="radio" name="correct" id="C" value="C" required oninvalid="this.setCustomValidity('Select a correct answer')"><label class="css-label" for="C">C</label><br>
                    <input class="css-checkbox" type="radio" name="correct" id="D" value="D" required oninvalid="this.setCustomValidity('Select a correct answer')"><label class="css-label" for="D">D</label><br>
                </div>
                
                <br><button type="submit" class="pure-button pure-button-primary">Save</button><br>
            </fieldset>
        </form>
    </body>

</html>