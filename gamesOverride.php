<!DOCTYPE HTML>
<?php session_start(); ?>
<html lang="en-US">
    
    <?php
        require("loginAuth.php");
        require("common.php");
    ?>
    
    <head>
        <meta charset = "UTF-8">
            <title>Nurse Login</title>
            <link rel="stylesheet" href="pure-min.css">
            <link rel="stylesheet" href="style.css">

            <!-- added full-screen and icon code - ajh 6/18/14 -->
            <link rel = "apple-touch-icon" href = "riley.png" />
            <meta name = "apple-mobile-web-app-capable" content = "yes" />
            <script type="text/javascript" src="stay_standalone.js"></script>

    </head>
    
    <body id="all">
        <div style="background-color: #ccc;" class="pure-menu pure-menu-open pure-menu-horizontal">
           <a href="index.html" class="pure-menu-heading"><strong>Nurse Login</strong></a>
        </div>
        
        <div style="float: left; padding: 1%">
            <img src="RileyCatWagon.png" width="400px">
        </div>
        
        <div style="margin-left: 400px; padding: 1%">
            <h1>Nurse Login</h1> 

            <form action="checkOverride.php" method="post" class="pure-form" style="padding: 1%"> 
                Username:<br>
                <input type="text" id="username" name="username" value="" /> 
                <br><br> 
                Password:<br> 
                <input type="password" id="password" name="password" value="" /> 
                <br><br> 
                <button type="submit" class="pure-button pure-button-primary">Login</button>
                <button formaction="patientViewGames.php" class="pure-button pure-button-primary">Cancel</button>
            </form>
        </div>
    </body>

</html>
