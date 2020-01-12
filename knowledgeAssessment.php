<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en-US">
    <!--
        knowledgeAssessment.php
            -this is only taken once by each patient
    -->
    
    
    <head>
        <meta charset = "UTF-8">
        <title>Knowledge Assessment: Riley Diabetes</title>
        <script src="jquery.min.js"></script>
        <link rel="stylesheet" href="pure-min.css">
        <link rel="stylesheet" href="style.css">
        <meta name = "apple-mobile-web-app-capable" content = "yes" />
        <script type="text/javascript" src="stay_standalone.js"></script>
        <script type="text/javascript" src="formValidation.js"></script>
    </head>
    
    <body id="all">
    <?php
        include("common.php");
        require("loginAuth.php");
        include("patientHeader.php");
        
        //check to see if there are any playsessions for this user
        //if there are, they've already taken the knowledge assessment
        //and need to be directed to the games page
        $query = "SELECT 1 FROM knowledgeAssessment WHERE username = :username";
            
        $query_params = array(':username' => $_SESSION['username']);
        
        try
        {
            $stmt = $con->prepare($query);
            $data = $stmt->execute($query_params);
        }
        catch(PDOException $e)
        {
            die("Failed to run query");
        }
        
        //Fetch any data that is returned
        //If playsession is empty, it should return empty
        $row = $stmt->fetch();
        
        if($row)
        {
            header("Location: patientViewGames.php");
        }
    
        print"<h1>Since this is your first time playing, we are going to test your knowledge.</h1>";
        try
            {
                //get data, all problems from the quiz
                $data = $con->query("SELECT * FROM problem WHERE gameID='12'");
                $data->setFetchMode(PDO::FETCH_ASSOC);
                
                print <<<HERE
                    <form id="knowledgeAssessment" action="submitAssessment.php" method="post">
                    <fieldset>
                    <input type="hidden" name="gameID" value="12">
                    <input type="hidden" name="gameName" value="Knowledge Assessment">
                    <input type="hidden" name="URL" value="patientViewGames.php">
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
HERE;
                        if(strlen($row['foilA']) > 60)
                        {
                            print"<br><br>";
                        }
                    print <<<HERE
                        <input id="B$counter" class="css-checkbox" type="radio" name="answer$counter" value="B">
                        <label class="css-label" for="B$counter">$row[foilB]</label><br>
HERE;
                        if(strlen($row['foilB']) > 60)
                        {
                            print"<br><br>";
                        }
                    //we are allowing for C and D to be null
                    //if they don't exist, skip the radio button
                    if("$row[foilC]" != "")
                    {
                        print"<input id=\"C$counter\" class=\"css-checkbox\" type=\"radio\" name=\"answer$counter\" value=\"C\">
                        <label class=\"css-label\" for=\"C$counter\">$row[foilC]</label><br>";
                        if(strlen($row['foilC']) > 60)
                        {
                            print"<br><br>";
                        }
                    }
                    if("$row[foilD]" != "")
                    {
                        print"<input id=\"D$counter\" class=\"css-checkbox\" type=\"radio\" name=\"answer$counter\" value=\"D\">
                        <label class=\"css-label\" for=\"D$counter\">$row[foilD]</label><br>";
                        if(strlen($row['foilD']) > 60)
                        {
                            print"<br><br>";
                        }
                    }
                    print"<br><hr>";
                } //end printing of all questions
                
                print <<<HERE
                    <button class = "pure-button pure-button-primary button-xlarge" type="button" onclick="validate('knowledgeAssessment')">Done!</button>
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
    <br>
    </body>
</html>
