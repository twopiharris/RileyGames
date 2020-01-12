<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en-US">
    <!-----------------------------------------------------------------------
            quiz.php
        -this will be the start of a playsession
        -present questions before and after user plays game
        -grading occurs on client, grades are sent to server after both quizzes
        -***CURRENTLY: only pre-quiz is done, find out some way to do post-quiz
    ------------------------------------------------------------------------>
<head>
    <meta charset = "UTF-8">
        <meta name = "apple-mobile-web-app-capable" content = "yes" />
        <title>Riley Games</title>
        <link rel="stylesheet" href="pure-min.css">
        <link rel="stylesheet" href="style.css">
        <script type="text/javascript" src="stay_standalone.js"></script>
</head>

    <body id="all">
    <?php
        require("loginAuth.php");
        require("common.php");

        /********************************
        *  -Quiz is done, grade and redirect to game page
        *  -games somehow have to signal to go to post quiz after done
        *******************************/
        try{            
            //get data again
            $gameID = filter_input(INPUT_POST, "gameID");
            $data = $con->query("SELECT * FROM problem WHERE gameID='$gameID'");
            $data->setFetchMode(PDO::FETCH_ASSOC);
            
            //get all the answers, store in array
            $counter = filter_input(INPUT_POST, "numQuestions");
            
            for($i = 1; $i < $counter+1; $i++)
            {
                $answers[$i-1] = $_POST["answer$i"];
            }
            
            //compare the answers to the correct answers
            $count = 0;
            
            //I'm going to store whether or not the answers are correct in a
            //  kind of binary array to preserve which questions were right or
            //  wrong in case we need it later
            $answerArray = array();
            $choiceLetters = array();
            
            foreach($data as $row)
            {
                $choiceLetters[$count] = $answers[$count];
                
                if("$answers[$count]" == "$row[correctFoil]")
                {
                    $answerArray[$count] = 1;
                }
                else
                {
                    $answerArray[$count] = 0;
                }
                
                $count++;
            }
            
            //test of answerArray
            /*for($i = 0; $i < sizeof($answerArray); $i++)
            {
                print"Q $i: $answerArray[$i] <br>";
            }*/
            
            //grade quiz
            $grade = round(array_sum($answerArray)/sizeof($answerArray),2);
            $percentage = $grade * 100;
            $right = array_sum($answerArray);
            $outOf = sizeof($answerArray);
            //print"Grade: $right out of $outOf<br>";
            //print"Percentage to be stored: $percentage%";
            
            
            //make a new play session for this game and user
            $dateTaken = date("Y-m-d");
            $gameID = filter_input(INPUT_POST, "gameID");
            //hold values
            $patientID = $_SESSION['username'];
            
            //Save stuff in SESSION so it can be used to save the post score after game is done
            $_SESSION['preScore'] = $percentage;
            $_SESSION['gameID'] = $gameID;
            $preAnswers = implode("", $choiceLetters);
            $preBits = implode("", $answerArray);
            $_SESSION['preBits'] = $preBits;
            $_SESSION['dateTaken'] = $dateTaken;
            $_SESSION['startTime'] = date('Y-m-d H:i:s');
            
            //insert the first half of the play session because kids won't complete the postquiz
            try{
                $sql = "INSERT INTO playsession (dateTaken, startTime, preScore, preBits, preAnswers, gameID, patientID, a1c) VALUES (:dateTaken, :startTime, :preScore, :preBits, :preAnswers, :gameID, :patientID, :a1c)";
                $insert = $con->prepare($sql);
                $insert->execute(array(':dateTaken'=>$dateTaken, ':startTime'=> $_SESSION['startTime'], ':preScore'=>$_SESSION['preScore'], ':preBits'=>$_SESSION['preBits'], ':preAnswers'=>$preAnswers, ':gameID'=>$gameID, ':patientID'=>$patientID, ':a1c'=>$_SESSION['a1c']));
            } catch(PDOException $e){
                echo"Error: " . $e.getMessage();
            }
    
            $URL = filter_input(INPUT_POST, "URL");
            header("Location: $URL");
            
        } catch(PDOException $e)
        {
            echo 'ERROR: ' . $e->getMessage();
        }
    ?>
    </body>
</html>