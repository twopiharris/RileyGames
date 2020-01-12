<!DOCTYPE HTML>
<?php session_start(); ?>
<html lang="en-US">
    <head>
        <meta charset="UTF-8">
        <title>A1C: Riley Games</title>
        <link rel="stylesheet" href="pure-min.css">
        <link rel="stylesheet" href="style.css">
        <meta name = "apple-mobile-web-app-capable" content = "yes" />
    </head>
    
    <body id="all">
        <?php
            require("common.php");
            require("loginAuth.php");
            
            $a1c = filter_input(INPUT_POST, "a1c");
            
            $_SESSION['a1c'] = $a1c;
            
            header("Location: knowledgeAssessment.php");
            //header("Location: patientViewGames.php");
        ?>
    </body>
</html>