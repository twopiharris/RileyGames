<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en-US">
    <!------------------------------------------------------
            viewPatients.php
        -Just displays the users and allows you to edit them
        -Maybe add search function eventually
    -------------------------------------------------------->
    <?php
	require("loginAuth.php");
	    require("adminAuth.php");
            require("common.php");
	    include("pageHeader.php");
    ?>
    
    <head>
        <meta charset = "UTF-8">
	    <meta name = "apple-mobile-web-app-capable" content = "yes" />
            <title>View Users: Riley Games</title>
            <link rel="stylesheet" href="pure-min.css">
            <link rel="stylesheet" href="style.css">
            <script type="text/javascript" src="stay_standalone.js"></script>
    </head>
    
    <body id="all">
	<script>
	    function deleteUser(userID)
	    {
		if(confirm("Are you sure you want to delete this user?"))
		{
		    window.location.href = "deleteUser.php?uID=" + userID;
		}
	    }
	</script>
	
	<br>
	<a href="userLog.php" class="pure-button button-border">User Log</a>
	
    <h2 align="center">User Accounts View/Edit</h2><hr>
    <div style="width: 800px;">
	<!--display PATIENTS-->
        <div style="width: 45%; margin: 0 auto; padding: 1%; float: left">
	    <a href="addPatient.php" class="pure-button pure-button-primary">Add Patient</a>
	    <hr>
	
	<!--adding a patient username search utility-->
	<form action="searchPatients.php" method="post" class="pure-form">
	    <fieldset>
		<label>Search for patient username:</label>
		<input type="text" name="username" id="username" required/>
		<button type="submit" style="font-size: 80%" class="pure-button button-border">Go!</button>
	    </fieldset>
	</form>
	<hr>
	
        <?php
            try{                
                $data = $con->query("SELECT * FROM users WHERE deleted=0");
                $data->setFetchMode(PDO::FETCH_ASSOC);
                
                $counter = 1;
                foreach($data as $row)
                {
                    $counter++;
		    if($row[admin] == 0)
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
		    } //end if
                } //end patient for loop
        print"</div>";
    
            } catch(PDOException $e)
                {
                    echo 'ERROR: ' . $e->getMessage();
                }
        ?>
	    
	<!--display ADMIN accounts-->
	<div style="width: 45%; padding: 1%; margin-left: 50%">
            <a href="addNurse.php" class="pure-button pure-button-primary">Add Nurse</a>
	    <hr>
        <?php
            try{                
                $data = $con->query("SELECT * FROM users WHERE deleted=0");
                $data->setFetchMode(PDO::FETCH_ASSOC);
		
		$counter = 1;
		foreach($data as $row)
		{
		    $counter++;
		    if($row[admin] == 1)
		    {
			print<<<HERE
			    <form action="editNurse.php" method="post" class="pure-form">
				<fieldset style="border: 1px solid black; padding: 1%">
				    <strong>$row[username]</strong><br><br>
				    <input type="hidden" name="username" value="$row[username]">
				    <button type="submit" class="pure-button button-border">Edit</button>
				    <hr><div>
					<button type="button" class="pure-button button-error button-border" onclick="deleteUser($row[id])">Delete User</button>
				    </div>
				</fieldset>
			    </form><br>
HERE;
		    }
		}
	print"</div>";
	
	    } catch(PDOException $e)
	    {
		echo 'Error: ' . $e->getMessage();
	    }
    ?>
	</div>
    </body>
</html>