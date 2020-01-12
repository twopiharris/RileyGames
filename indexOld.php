<!DOCTYPE html>
    <html lang="en-US">
    <!-- added full-screen and icon code - ajh 6/18/14 -->
    <link rel = "apple-touch-icon" href = "riley.png" />
    <meta name = "apple-mobile-web-app-capable" content = "yes" />
    <script type="text/javascript" src="stay_standalone.js"></script>

        
        <head>
            <meta charset= "UTF-8">
                <title>Riley Games</title>
                
            <style type="text/css">
                
            </style>
        </head>
        
        <body>
	     <h1>Riley Games</h1>
  

  <h2>Overview</h2>

  <p>
    This project is a joint effort of Riley Children's Hospital and
    IUPUI School of science.  The goal is to create a series of mobile
    games used to teach youngsters skills for coping with a diagnosis
    of Type I Diabetes.  
  </p>

  <h2>Current Prototypes</h2>

            <?php

		  require("common.php");

                try
                {
                    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    
                    //query to pull all fields from Game
                    $query = "SELECT * FROM game";
                  
                    //make query
                    $data = $con->query($query);
                    $data->setFetchMode(PDO::FETCH_ASSOC);
                    
                    print "<div>";
                    //separate data into rows
                    foreach($data as $row)
                    {
                        print "
                            <div style=\"padding:1%;width:800px;\">
                                <div id=\"$row[gameID]\" style=\"background-color:#F50C0C;height:220px\">
                                    <div style=\"padding:1%;float:left;\">
                                        <img src=\"$row[pic]\" alt=\"$row[gameName] screenshot\" height=\"200\" width=\"300\">
                                    </div>
                                    
                                    <div>
                                        <a href=\"$row[URL]\">$row[gameName]</a>
                                    </div>
                                </div>
                            </div>
                        ";
                    }
                    print "</div>";
                    
                } catch(PDOException $e)
                    {
                        echo 'ERROR: ' . $e->getMessage();
                    }
            ?>
        </body>
    </html>