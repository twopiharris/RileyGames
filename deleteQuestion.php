<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en-US">
    
    <!-----------------------------------------------------------------
            deleteQuestion.php
        -delete is already confirmed in last page
        -redirect to quiz page automatically
    ------------------------------------------------------------------>
    <?php
        require("loginAuth.php");
        require("adminAuth.php");
        require("common.php");
    ?>
    
    <head>
        <meta charset = "UTF-8">
        <meta name = "apple-mobile-web-app-capable" content = "yes" />
        <title>Riley Games</title>
        <link rel="stylesheet" href="pure-min.css">
        <link rel="stylesheet" href="style.css">
        <script type="text/javascript" src="stay_standalone.js"></script>
    </head>
    
    <body>
        <!--<h2>Delete a question</h2>-->
        <?php
            if(isset($_GET["pID"]) && isset($_GET["qID"]))
            {
                $problemID = $_GET["pID"];
                $quizID = $_GET["qID"];
            }
            else
            {
                die("error");
                header("Location: nurseHome.php");
                //exit;
            }
            
            /*$problemID = $_POST["pID"];
            $quizID = $_POST["qID"];*/
            
            //print"Delete: $problemID";
            try
            {
                
                $sql = "UPDATE problem SET deleted=1 WHERE problemID=:pID";
                
                $delete = $con->prepare($sql);
                $delete->bindParam(':pID',$problemID);
                $delete->execute();
            }
            catch(PDOException $e)
            {
                echo 'ERROR: ' . $e->getMessage();
            }
            
            //now redirect to the editQuiz.php page with auto-submit form
            print<<<HERE
                <form id="redirect" action="editQuiz.php" method="post">
                    <input type="hidden" name="choose" value="$quizID">
                </form>
HERE;
        ?>
        
        <script>
            //auto-submit script for redirect form
            document.getElementById("redirect").submit();
        </script>
        
    </body>
</html>