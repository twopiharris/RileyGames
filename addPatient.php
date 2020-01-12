<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en-US">
    <head>
        <meta charset = "UTF-8">
            <title>Add Patient Account: Riley Diabetes</title>
            <script src="http://code.jquery.com/jquery-latest.js"></script>
            <link rel="stylesheet" href="pure-min.css">
            <link rel="stylesheet" href="style.css">
            <script src="jquery-validation-1.12.0/dist/jquery.validate.js"></script>
            <script src="jquery-validation-1.12.0/dist/additional-methods.js"></script>
            <meta name = "apple-mobile-web-app-capable" content = "yes" />
            <script type="text/javascript" src="stay_standalone.js"></script>
    </head>
    
    <script type="text/javascript">
        function onSubmit() {
            var error = document.getElementById("error");
            var form = document.getElementById("addPatient");
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            var confirmPass = document.getElementById("confirmPass").value;
            var birthYear = document.getElementById("birthYear").value;
            
            /*console.log("Username: " + username);
            console.log("Password: " + password);
            console.log("Username: " + confirmPass);
            console.log(birthYear);*/
            
            if (username == "") {
                error.innerHTML = "Don't leave username field blank"
            }
            else if (password == "" || confirmPass == "") {
                error.innerHTML = "Enter your password in both fields.";
            }
            else if (password != confirmPass) {
                error.innerHTML = "Passwords do not match."
            }
            /*else if (birthYear == "") {
                error.innerHTML = "Select a birth year.";
            }*/
            else {
                error.innerHTML = "";
                form.submit();
            }
        }
    </script>
    
    <!------------------------------------------------------
            addPatient.php
        -Lets you add a new patient
        -Make sure new patientID isn't a duplicate
        -Redirects to patient page after submission
    -------------------------------------------------------->
    <?php
    
        require("loginAuth.php");
        require("adminAuth.php");
        require("common.php");
        include("pageHeader.php");
        
        //PATIENT ADD PHP
        if(!empty($_POST))
        {
            //echo "script type='text/javascript'>alert('" . $_POST['username'].'\n'.$_POST['password']. "');</script>";
            //Non-empty username
            if(empty($_POST['username']))
            {
                //Change to display error and let user try again
                $_SESSION['errMess'] = "Don't leave username field blank. ";
                //die("username not entered");
                header("Location: addPatient.php");
            }
            
            //Non-empty password
            if(empty($_POST['password']) || empty($_POST['confirmPass']))
            {
                $_SESSION['errMess'] = "Enter your password in both fields. ";
                //die("passwords not entered in both fields");
                header("Location: addPatient.php");
            }
            
            //Confirm passwords are the same
            $pass = $_POST['password'];
            $conf = $_POST['confirmPass'];
            if(!(strcmp($pass, $conf) == 0))
            {
                //Change this to display error and let user try again
                $_SESSION['errMess'] = "Passwords did not match. ";
                //die("passwords don't match");
                header("Location: addPatient.php");
            }
            
            //Check if username is already in use
            $query = "SELECT 1 FROM users WHERE username = :username";
            
            $query_params = array(':username' => $_POST['username']);
            
            try
            {
                $stmt = $con->prepare($query);
                $data = $stmt->execute($query_params);
            }
            catch(PDOException $e)
            {
                die("Failed to run comparison query");
            }
            
            //Fetch any data that is returned
            //If username hasn't been used, it should return false
            $row = $stmt->fetch();
            
            if($row)
            {
                //Say that the username is already used
                $_SESSION['errMess'] = "Username already exists. ";
                //die("Username already exists!");
                header("Location: addPatient.php");
            }
            
            //Ready to insert new user
            $admin = 0; //In this form, the user is not an admin
            
            $query = "INSERT INTO users (username,password,salt,admin,birthYear) VALUES (:username,:password,:salt,:admin,:birthYear)";
            
            //generate salt
            $size = mcrypt_get_iv_size(MCRYPT_CAST_256, MCRYPT_MODE_CFB);
            $salt = mcrypt_create_iv($size, MCRYPT_DEV_RANDOM);
            
            //Hit the password with dat hash
            $password = hash('sha256', $_POST['password'] . $salt);
            
            //Prepare the sql
            $query_params = array(':username' => $_POST['username'], ':password' => $password, ':salt' => $salt, ':admin' => $admin, ':birthYear' => $_POST['birthYear']);
            
            try
            {
                $stmt = $con->prepare($query);
                $result = $stmt->execute($query_params);
            }
            catch(PDOException $e)
            {
                die("Failed to run query to save new user" . $e->getMessage());
            }
            
            //Redirect to view patients
            header("Location: viewUsers.php");
        }
    ?>
    
    <body id="all">
        <script>
            /*$().ready(function(){
                $("#addPatient").validate({
                    rules: {
                        username: {
                            required: true,
                            maxlength: 15
                        },
                        password: {
                            required: true,
                            maxlength: 20
                        },
                        confirmPass: {
                            required: true,
                            maxlength: 20,
                            equalTo: "#password"
                        }
                    }
                });
            });*/
        </script>
        
        <h2>Add Patient</h2>
        
        <?php
            //This is for displaying errors, particularly when the submitted username already exists
            $errMess = $_SESSION['errMess'];
            $_SESSION['errMess'] = "";
            print"<h3 style=\"color:red;\">$errMess<h3>";
        ?>
        
        <h3 style="color: rgb(255, 0, 0);" id="error"></h3>
        
        <form action="addPatient.php" id="addPatient" method="post" class="pure-form" style="padding: 1%">
            <fieldset>
                <label for="username">Patient Username (15 characters limit):</label><br>
                <input type="text" id="username" name="username" value="" ><br>
                
                <label for="password">Password (20 character limit):</label><br>
                <input type="password" id="password" name="password" value="" ><br>
                
                <label for="confirmPass">Confirm Password:</label><br>
                <input type="password" id="confirmPass" name="confirmPass" value="" ><br>
                
                <label>Birth Year:</label><br>
                <select id="birthYear" name="birthYear" >
                    <option value="">Select...</option>
                    <?php
                        for($i = date("Y") ; $i > 1900; $i--)
                        {
                            print"<option value=\"$i\">$i</option>";
                        }
                    ?>
                </select><br>
                
                <br><button type="button" class="pure-button pure-button-primary" onclick="onSubmit()">Submit</button>
            </fieldset>
        </form>
    </body>
    
</html>