<!DOCTYPE HTML>
<?php session_start(); ?>
<html lang="en-US">
    <head>
        <meta charset = "UTF-8">
            <meta name = "apple-mobile-web-app-capable" content = "yes" />
            <title>Reset Password: Riley Games</title>
            <link rel="stylesheet" href="pure-min.css">
            <link rel="stylesheet" href="style.css">
            <script type="text/javascript" src="stay_standalone.js"></script>
    </head>
<?php
    require("loginAuth.php");
    require("adminAuth.php");
    require("common.php");
    include("pageHeader.php");


    $username = filter_input(INPUT_POST, "username");
    $password = filter_input(INPUT_POST, "password");
    $confirmPassword = filter_input(INPUT_POST, "confirmPassword");
    
    $_POST['username'] = $username; //don't know why i put this here but it might be important idk i think i put it here late at night
    
    if($password != $confirmPassword)
    {
        die("The passwords do not match");
    }
    else if($password == $confirmPassword)
    {
        $sql = "UPDATE users SET password=? , salt=? WHERE username='$username'";
        
        //generate new salt
        $size = mcrypt_get_iv_size(MCRYPT_CAST_256, MCRYPT_MODE_CFB);
        $salt = mcrypt_create_iv($size, MCRYPT_DEV_RANDOM);
        
        //hash with password
        $password = hash('sha256', $password . $salt);
        
        //perform update
        $update = $con->prepare($sql);
        $update->execute(array($password,$salt));
        
        print"<h2>Password Changed</h2><br>";
        header("Location: viewUsers.php");
    }

?>
</html>