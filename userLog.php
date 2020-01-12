<!DOCTYPE html>
<?php session_start(); ?>
    <html lang="en-US">
	<head>
            <meta name = "apple-mobile-web-app-capable" content = "yes" />
	    <title>User Log: Riley Games</title>
	    <link rel="stylesheet" href="pure-min.css">
            <link rel="stylesheet" href="style.css">
            <script type="text/javascript" src="stay_standalone.js"></script>
	</head>
        <!----------------------------------------------------
                    userLog.php
                -displays content of user log
                -low priority
        ----------------------------------------------------->
        <?php    
            require("loginAuth.php");
	    require("adminAuth.php");
            require("common.php");
	    include("pageHeader.php");
	?>
        
        <body id="all">
        <?php
            try{
                //Just grab everything from play session table
                $data = $con->query("SELECT * FROM userLog");
                $data->setFetchMode(PDO::FETCH_ASSOC);
               } catch(PDOException $e){
                   echo"Error: " . $e->getMessage();
               }
               
               print"<div style=\"padding: 1%\"><table> \n";
               
               $row = $data->fetch(PDO::FETCH_ASSOC);
               
               print"<tr> \n";
               //headers
               foreach($row as $field=>$value)
               {
                   print"<th>$field</th> \n"; 
               }
               print"</tr>";
               
               try{
                //Just grab everything from play session table
                $data = $con->query("SELECT * FROM userLog");
                $data->setFetchMode(PDO::FETCH_ASSOC);
               } catch(PDOException $e){
                   echo"Error: " . $e->getMessage();
               }
               
               //each table entry
               foreach($data as $row)
               {
                   print"<tr> \n";
                       //each field first
                       foreach($row as $field=>$value)
                       {
                           print"<td>$value</td> \n";
                       }
                       print"</tr>";
               }
               
               print"</table></div> \n";
        ?>
        </body>
    </html>