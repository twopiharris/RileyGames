<!DOCTYPE HTML>
<?php session_start(); ?>
<html lang="en-US">
    
    <head>
        <meta charset="UTF-8">
        <title>Show All Games</title>

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
                header("Location: index.html");
                //die("Username or password incorrect");
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
                        header("Location: index.html");
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
                    
                    //Redirect to appropriate page depending on if patient or nurse account
                    if($row[admin] == 1)
                    {
                        $_SESSION['showAll'] = 1;
                        header("Location: patientViewGames.php");
                        die("Showing games...");
                    } else{
                        header("Location: gamesOverride.php");
                    }
                }
            }
        ?>
    </body>
</html>