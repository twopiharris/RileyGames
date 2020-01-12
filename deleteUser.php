<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en-US">
    
    <!-----------------------------------------------------------------
            deleteUser.php
        -delete is already confirmed in last page
        -redirect to user page automatically
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
            if(isset($_GET["uID"]))
            {
                $id = $_GET["uID"];
                print"Deleting $id<br>";
            }
            else
            {
                die("error");
                header("Location: viewUsers.php");
                //exit;
            }
            
            try
            {
                $sql = "UPDATE users SET deleted=1 WHERE id=:id";
                
                $delete = $con->prepare($sql);
                $delete->bindParam(':id',$id);
                $delete->execute();
            }
            catch(PDOException $e)
            {
                echo 'ERROR: ' . $e->getMessage();
            }
            
            //now redirect to the user page
            header("Location: viewUsers.php");
        ?>
    </body>
</html>