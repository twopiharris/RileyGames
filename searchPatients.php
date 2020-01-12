<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en-US">
    <!------------------------------------------------------
            searchPatients.php
        -search form
        -can be activated by the viewUsers page as well
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
            
            
            if(!empty($_POST))
            {
                if(empty($_POST['username']))
                {
                    $_SESSION['errMess'] = "Username field was blank";
                }
                else
                {
                    $username = filter_input(INPUT_POST, "username");
                    $_SESSION['errMess'] = "";
                    
                    try{
                        $username = "%$username%";
                        
                        $stmt = $con->prepare("SELECT * FROM users WHERE username LIKE ?");
                        $stmt->execute(array($username));
                        
                        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                        
                    } catch(PDOException $e){
                        echo'ERROR: '. $e.getMessage();
                    }
                    
                    if(empty($result))
                    {
                        print"No matches found";
                    } else {
                        foreach($result as $row)
                        {
			print<<<HERE
			<div style="border: 1px solid black; padding: 1%">
			    <form action="editPatient.php" method="post" class="pure-form">
				<fieldset>
				    <strong>$row[username]</strong><br>
				    Birth Year: $row[birthYear]<br>
				    <input type="hidden" name="username" value="$row[username]">
				    <button type="submit" class="pure-button button-border">Edit</button>
				</fieldset>
			    </form>
				    <hr>
				    <div>
				    <form action="userReport.php" method="post">
					<input type="hidden" name="username" value="$row[username]">
					<button type="submit" class="pure-button button-border">View User</button>
				    </form><br>
					
				    <button type="button" class="pure-button button-error button-border" onclick="deleteUser($row[id])">Delete user</button>
				    </div>
				</fieldset>
			    </form>
			    </div><br>
HERE;
                        }
                    }
                }
            }
            
            //print"$_SESSION['errMess']";
        ?>
        
        <!--adding a patient username search utility-->
	<form action="searchPatients.php" method="post" class="pure-form">
	    <fieldset>
		<label>Search for patient username:</label>
		<input type="text" name="username" id="username" required/>
		<button type="submit" style="font-size: 80%" class="pure-button button-border">Go!</button>
	    </fieldset>
	</form>
	<hr>
    </body>
</html>