<!DOCTYPE html>
<?php session_start(); ?>
    <html lang="en-US">
	<head>
	    <meta name = "apple-mobile-web-app-capable" content = "yes" />
	    <title>Nurse Home: Riley Games</title>
	    <link rel="stylesheet" href="pure-min.css">
            <link rel="stylesheet" href="style.css">
            <script type="text/javascript" src="stay_standalone.js"></script>
	</head>
        <!----------------------------------------------------
                    nurseHome.php
            -This page is what nurses will see after login
            -It displays a drop down where you can select which quiz to edit
            -It also will display links to the patient side of
                things, with options to mess with that
        ----------------------------------------------------->
        <?php    
            require("loginAuth.php");
	    require("adminAuth.php");
            require("common.php");
	    include("pageHeader.php");
	?>
        
        <body id="all">

            <h2>
                Home Page
            </h2><hr>
        <div id="contentContainer" style="width:600px">
            <?php
                try
                {
                    //query to pull all fields from Game
                    $query = "SELECT * FROM game";
                  
                    //make query
                    $data = $con->query($query);
                    $data->setFetchMode(PDO::FETCH_ASSOC);
                    
                    print <<<HERE
                    <div id="quizOptions" style="float:left; padding: 1%">
                        <h3>Choose  Quiz to edit<h3><hr>
                        
                        <form action = "editQuiz.php"
                                method = "post"
                                class="pure-form">
                                <fieldset>
                                <select name = "choose">
HERE;

                    //separate data into rows
                    foreach($data as $row)
                    {
                        print "
                            <option value =\"$row[gameID]\">$row[gameName]</option>
                        ";
                    }
                    print "</select>
                        <button type=\"submit\" class=\"pure-button pure-button-primary\">Edit</button>
                        </fieldset></form></div>";
                    
                } catch(PDOException $e)
                    {
                        echo 'ERROR: ' . $e->getMessage();
                    }
            ?>
            
            <div id="userOptions" style="padding: 1%; margin-left: 70%; width: 60%">
                <h3>Users</h3><hr>
                <a class="pure-button" href="viewUsers.php">View Users</a><br><br>
                <a class="pure-button" href="addPatient.php">Add a Patient Account</a><br><br>
		<a class="pure-button" href="addNurse.php">Add an Admin Account</a>
		
		<!--adding a patient username search utility--><hr>
		<h4>Quick Patient Search</h4>
		<form action="searchPatients.php" method="post" class="pure-form">
		    <fieldset>
			<label>Search for patient username:</label>
			<input type="text" name="username" id="username" required/>
			<button type="submit" style="font-size: 80%" class="pure-button button-border">Go!</button>
		    </fieldset>
		</form>
            </div>
        
        </div>
        </body>
    </html>