<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en-US">
    <!------------------------------------------------------
            editPatient.php
        -Lets you change patient info
        -Redirects to users page after submission
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
            <title>Edit Patient Info: Riley Games</title>
	    <script src="http://code.jquery.com/jquery-latest.js"></script>
            <link rel="stylesheet" href="pure-min.css">
            <link rel="stylesheet" href="style.css">
	    <script src="jquery-validation-1.12.0/dist/jquery.validate.js"></script>
            <script src="jquery-validation-1.12.0/dist/additional-methods.js"></script>
            <script type="text/javascript" src="stay_standalone.js"></script>
    </head>
    
    <body id="all">
	<script>
            /*$().ready(function(){
                $("#editPatient").validate({
                    rules: {
                        newUsername: {
                            required: true,
                            maxlength: 15
                        }
                    }
                });
		$('#resetPass').validate({
		   rules:{
			password: {
                            required: true,
                            maxlength: 20
                        },
                        confirmPassword: {
                            required: true,
                            maxlength: 20,
                            equalTo: "#password"
                        }
		    }
		});
            });*/
        </script>
	
	<h2>Edit Patient Info</h2>
	
	<?php
            //This is for displaying errors, particularly when the submitted username already exists
            $errMess = $_SESSION['errMess'];
            $_SESSION['errMess'] = "";
            print"$errMess";
	    
            try{
                $username = filter_input(INPUT_POST, "username");
                
                $data = $con->query("SELECT * FROM users WHERE username ='$username'");
                $data->setFetchMode(PDO::FETCH_ASSOC);
                
                foreach($data as $row)
                {
                    print<<<HERE
                        <form action="submitUser.php" id="editPatient" method="post" class="pure-form" style="padding:1%">
                            <fieldset>
                                <label for="newUsername">Change Username (15 character limit):</label><br>
                                <textarea rows="1" cols="20" id="newUsername" name="newUsername"  required maxlength="15">$row[username]</textarea><br><br>
                                
                                <label>Birth Year:</label><br>
                                <textarea rows="1" cols="10" name="birthYear" required maxlength="4">$row[birthYear]</textarea><br><br>
				
                                <input type="hidden" name="username" value="$row[username]">
				<input type="hidden" name="admin" value="$row[admin]">
                                <br><button type="submit" class="pure-button pure-button-primary">Save</button>
                            </fieldset>
                        </form>
			
			<form action="resetPassword.php" id="resetPass" method="post" class="pure-form" style="padding: 1%">
			    <fieldset>
				<label for="password">New Password (20 character limit):</label><br> 
				<input type="password" id="password" name="password" value="" required maxlength="20"><br><br>
				
				<label for="confirmPassword">Confirm Password:</label><br>
				<input type="password" id="confirmPassword" name="confirmPassword" value="" required maxlength="20"><br>
				<br>
				
				<input type="hidden" name="username" value="$row[username]">
				<button type="submit" class="pure-button pure-button-primary">Reset Password</button>
			    </fieldset>
			</form>
HERE;
                }
                
            } catch(PDOException $e)
                {
                    echo 'ERROR: ' . $e->getMessage();
                }
        ?>
    </body>
    
</html>