<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en-US">
    <!------------------------------------------------------
            viewPatients.php
        -Just displays the users and allows you to edit them
        -Maybe add search function eventually
    -------------------------------------------------------->    
    <head>
        <meta charset = "UTF-8">
	    <meta name = "apple-mobile-web-app-capable" content = "yes" />
            <title>User Search: Riley Games</title>
            <link rel="stylesheet" href="pure-min.css">
            <link rel="stylesheet" href="style.css">
            <script type="text/javascript" src="stay_standalone.js"></script>
    </head>
    
    <body id="all">
        <?php
            require("loginAuth.php");
            require("adminAuth.php");
            require("common.php");
            include("pageHeader.php");
            
        ?>
        
        <div align="center">
            <?php
                $username = filter_input(INPUT_POST, "username");
                
                print"<h2>User report for: $username</h2>";
                
                print"<strong>user reports are in development</strong><br><hr>";
                
		try{
		    $data = $con->query("SELECT * FROM knowledgeAssessment WHERE username='$username' AND deleted=0");
		    $data->setFetchMode(PDO::FETCH_ASSOC);
		}catch(PDOException $e)
		    {
			echo 'ERROR: ' . $e->getMessage();
		    }
		    
		foreach($data as $row)
		{
		    $answers = str_split($row['answers'],1);
		    //var_dump($answers);
		    $date = explode(" ", $row['dateTaken']);
		    print<<<HERE
			Date: $date[0]<br>
			<div>
			    Score: $row[score]<br>
			    <strong>Answers:</strong><br>
HERE;
		    $index = 0;
		    foreach($answers as $poop)
		    {
			$index++;
			print"Question $index: $poop<br>";
		    }
		    
		    print"</div><hr>";
		}
		
                try
                {
                    $data = $con->query("SELECT * FROM playsession WHERE patientID='$username' AND deleted=0");
                    $data->setFetchMode(PDO::FETCH_ASSOC);
                }
                catch(PDOException $e)
		    {
			echo 'ERROR: ' . $e->getMessage();
		    }
                
                foreach($data as $row)
                {
		    if($row['gameID'] == "1")
		    {
			$gameName = "What Do These Numbers Mean?";
		    } elseif($row['gameID'] == "2"){
			$gameName = "We All Have Sick Days";
		    } elseif($row['gameID'] == "4"){
			$gameName = "Create a Plate: Nutrition 101";
		    } elseif ($row['gameID'] == "8"){
			$gameName = "Diabetes Isn't Fun!";
		    } elseif($row['gameID'] == "9"){
			$gameName = "Diabetes Self-Advocacy";
		    }
		    
                    print<<<HERE
		    Date: $row[dateTaken]<br>
		    <div>
			Game: $gameName<br>
			Pre-score: $row[preScore]<br>
			Post-score: $row[postScore]<br>
		    </div>
		    <hr>
HERE;
                }
            ?>
        </div>
        
    </body>
</html>