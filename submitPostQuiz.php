<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en-US">
    <!-----------------------------------------------------------------------
            submitPostQuiz.php
        -this will be where a playsession is submitted
        -present questions after user plays game
        -grading occurs on client, grades are sent to server after both quizzes are complete
    ------------------------------------------------------------------------>
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
        require("loginAuth.php");
        require("common.php");

        /********************************
        *  -Quiz is done, grade and redirect to game page
        *  -games have to signal to go to post quiz after done
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
            
            $_SESSION[answers] = $answers;
            
            //compare the answers to the correct answers
            $count = 0;
            
            //I'm going to store whether or not the answers are correct in a
            //  kind of binary array to preserve which questions were right or
            //  wrong in case we need it later
            $answerArray = array();
            
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
            
            //additional session variables for testing userRecord table (combine userLog and playSession)
            $_SESSION['postScore'] = $percentage;
            
            //make a new play session for this game and user
            $dateTaken = date("Y-m-d");
            //time for end of quiz
            $endTime = localtime();
            
            $gameID = $_SESSION['gameID'];
            $preScore = $_SESSION['preScore'];
            
            $patientID = $_SESSION['username'];
            
            //individual question data
            $preBits = $_SESSION['preBits'];
            $preBits = implode("", $preBits);
            $_SESSION['preBits'] = $preBits;
            
            $postBits = $answerArray;
            $postBits = implode("", $postBits);
            $_SESSION['postBits'] = $postBits;
            
            $postAnswers = implode("", $choiceLetters);
            
            $a1c = $_SESSION['a1c'];
            
            //bring in start time
            $startTime = $_SESSION['startTime'];
            
            //print"Patient: $patientID, Pre: $preScore, Post: $percentage, Game: $gameID";
            
            //$sql = "INSERT INTO playsession (dateTaken, startTime, preScore, preBits, endTime, postScore, postBits, gameID, patientID, a1c) VALUES (:dateTaken, :startTime, :preScore, :preBits, :endTime, :postScore, :postBits, :gameID, :patientID, :a1c)";
            //$insert = $con->prepare($sql);
            //$insert->execute(array(':dateTaken'=>$dateTaken, ':startTime'=>$startTime, ':preScore'=>$preScore, ':preBits'=>$preBits, ':endTime'=>$endTime, ':postScore'=>$percentage, ':postBits'=>$postBits, ':gameID'=>$gameID,':patientID'=>$patientID, ':a1c'=>$a1c));
            
            //finish the playsession
            try{
                $logData = $con->query('SELECT * FROM playsession');
                $logData->setFetchMode(PDO::FETCH_ASSOC);
                
                //i know this is a dumb way to do this but it wasn't working the other way
                foreach($logData as $row)
                {
                    if($row['patientID'] == $_SESSION['username'] && $row['startTime'] == $_SESSION['startTime'])
                    {
                        $sessionID = $row['sessionID'];
                        //print"$logID";
                    }
                }
                
                //$sql = "INSERT INTO userLog (username, logout, a1c) VALUES (:username, :logout, :a1c)";
                $endTime = date('Y-m-d H:i:s');
                
                //finish the userLog entry
                $sql = "UPDATE playsession SET endTime=?, postScore=?, postBits=?, postAnswers=? WHERE sessionID=?";
                
                $update = $con->prepare($sql);
                $update->execute(array($endTime, $percentage, $postBits, $postAnswers, $sessionID));
                
            } catch(PDOException $e){
                echo"Error: " . $e.getMessage();
            }
            
            //Direct to logout page
            header("Location: done.php");
        } catch(PDOException $e)
        {
            echo 'ERROR: ' . $e->getMessage();
        }
    ?>
    </body>
</html>