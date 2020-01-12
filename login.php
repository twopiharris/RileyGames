<!DOCTYPE HTML>
<?php session_start(); ?>
<html lang="en-US">
    <!-----------------------------------------------------------------------
        login.php
            -activated by login.html
            -ensures secure login and sets appropriate variables
    ------------------------------------------------------------------------>
    
    <head>
        <meta charset="UTF-8">
        <title>Login: Riley Games</title>

        <!-- added full-screen and icon code - ajh 6/18/14 -->
        <link rel = "apple-touch-icon" href = "riley.png" />
        <meta name = "apple-mobile-web-app-capable" content = "yes" />


        <link rel="stylesheet" href="pure-min.css">
        <link rel="stylesheet" href="style.css">
        <script type="text/javascript" src="stay_standalone.js"></script>
    </head>
    
    <body id="all">
        <?php
            require("common.php");
            
            $username = filter_input(INPUT_POST, "username");
            $password = filter_input(INPUT_POST, "password");
            //get the apparent ip address of user
            $ip = $_SERVER['REMOTE_ADDR'];
            
            /*
            try{
                //check if the ip address has been recorded before
                $result = $con->query("SELECT * FROM LoginAttempts WHERE IP='$ip'");
                $result->setFetchMode(PDO::FETCH_ASSOC);
                
                //if ip is new
                if(empty($result))
                {
                    $sql = "INSERT INTO LoginAttempts (IP, Attempts) VALUES (:ip, :attempts)";
                    $stmt = $con->prepare($sql);
                    $query_params = array(':ip'=>$ip, ':attempts'=>1);
                    $insert = $stmt->execute($query_params);
                }
                //if ip isn't new, reset login time
                else {
                    $sql = "UPDATE LoginAttempts SET IP='$ip' WHERE IP='$ip'";
                }
                
            } catch(PDOException $e){
                echo"Error: " . $e.getMessage();
            }
            */
            
            //Find out if username is in database
            try{
                //print"Attempting username check";
                $sql = "SELECT * FROM users WHERE username = ?";
                $stmt = $con->prepare($sql);
                $stmt->execute(array($username));
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                //print"<br>Result returned from username check<br>";
            } catch(PDOException $e){
                echo"Error: " . $e.getMessage();
            }
            
            if(empty($result))
            {
                //Username DNE
                header("Location: index.html?errMess=incorrect");
                die("Username or password incorrect");
            } else{
                //Username exists
                $login_good = false;
                
                foreach($result as $row)
                {
                    //hash entered password with salt from database
                    $check_password = hash('sha256', $password . $row[salt]);
                    
                    //print"Entered pass: $check_password, Server pass: $row[password]<br>";
                    if($check_password === $row[password])
                    {
                        //login is good thumbs up
                        $login_good = true;
                        //print"Login success<br>";
                    } else {
                        //password incorrect
                        header("Location: index.html?errMess=incorrect");
                        die("Username or password incorrect");
                    }
                    
                    //Login successful
                    //  store needed info in session
                    //  unset sensitive info that will no longer be needed
                    unset($password);
                    unset($username);
                    unset($row[salt]);
                    unset($row[password]);
                    unset($check_password);
                    
                    //SESSION VARIABLES
                    $_SESSION['username'] = $row[username];
                    $_SESSION['admin'] = $row[admin];
                    $_SESSION['birthYear'] = $row[birthYear];
                    
                    //save this as an incomplete userlog entry
                    //grab the "logID" and save that as a session variable
                    $_SESSION['loginTime'] = date('Y-m-d H:i:s');
                    
                    try{
                        $sql = "INSERT INTO userLog (username, login) VALUES (:username, :login)";
                        $insert = $con->prepare($sql);
                        $insert->execute(array(':username'=>$_SESSION['username'], ':login'=> $_SESSION['loginTime']));                        
                    } catch(PDOException $e){
                        echo"Error: " . $e.getMessage();
                    }
                    
                    //Redirect to appropriate page depending on if patient or nurse account
                    if($_SESSION['admin'] == 0)
                    {
                        //print"Logged in, ask for A1C";
                        header("Location: a1c.php");
                        die("Logging in user...");
                    } else if($_SESSION['admin'] == 1)
                    {
                        header("Location: nurseHome.php");
                        die("Logging in admin...");
                    } else {
                        header("Location: login.php");
                        die("You do not have permission to enter");
                    }
                }
            }
        ?>
    </body>
</html>