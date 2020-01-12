<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en-US">
    <!-----------------------------------------------------------------------
            quiz.php
        -this will be the start of a playsession
        -present questions before and after user plays game
        -grading occurs on client, grades are sent to server after both quizzes
    ------------------------------------------------------------------------>
    <?php
        require("loginAuth.php");
        require("common.php");
	include("patientHeader.php");
    ?>
            
    <head>
        <meta charset = "UTF-8">
	    <meta name = "apple-mobile-web-app-capable" content = "yes" />
            <title>Knowledge Assessment: Riley Games</title>
            <link rel="stylesheet" href="style.css">
            <link rel="stylesheet" href="pure-min.css">
            <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
            <script src="jquery-validation-1.12.0/dist/jquery.validate.js"></script>
            <script src="jquery-validation-1.12.0/dist/additional-methods.js"></script>
            <script type="text/javascript" src="stay_standalone.js"></script>
    </head>
    
    <body id="all">
        <?php
            $gameID = "12";
	    //grab all the answers
	    try{
		$sql = "SELECT correctFoil FROM problem WHERE gameID=$gameID";
		$data = $con->query($sql);
		$data->setFetchMode(PDO::FETCH_ASSOC);
	    } catch(PDOException $e){
		echo"Error: " . $e->getMessage();
	    }
            
	    //put all the correct answers in an array
	    $correctAnswers = array();
	    $index = 0;
	    foreach($data as $row)
	    {
		$correctAnswers[$index] = $row['correctFoil'];
		$index++;
	    }
	    
            //get all the answer choices from user, store in array
	    //also store in string for use later
            $counter = filter_input(INPUT_POST, "numQuestions");
	    $userAnswers = "";
            
            for($i = 1; $i < $counter+1; $i++)
            {
               $answers[$i-1] = $_POST["answer$i"];
	       $userAnswers = $userAnswers . $answers[$i-1];
            }
	    
	    //check answers, count how many correct
	    $correct = 0;
	    for($i = 0; $i < $counter; $i++)
	    {
		if($answers[$i] == $correctAnswers[$i])
		{
		    $correct++;
		}
		print"Answered: $answers[$i], Correct: $correctAnswers[$i]<br>";
	    }
	    
	    //calculate score
	    $score = round($correct/$counter, 2);
	    $score = $score * 100;
	    
	    $username = $_SESSION['username'];
	    
	    //insert the assessment: username, score, userAnswers
	    $sql = "INSERT INTO knowledgeAssessment (username, score, answers) VALUES (:username, :score, :answers)";
	    $insert = $con->prepare($sql);
	    $insert->execute(array(':username'=>$username, ':score'=>$score, ':answers'=>$userAnswers));
	    
	    header("location: patientViewGames.php");
        ?>
    </body>

</html>