<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en-US">
    <!----------------------------------------------------
                patientViewGames.php
        -This page displays the games the patient hasn't played yet
        -Bobbeh is an exception as well as admin accounts
    ----------------------------------------------------->
    <?php
        require("loginAuth.php");
        require("common.php");
    ?>
    
    <head>
        <meta charset= "UTF-8">
            <meta name = "apple-mobile-web-app-capable" content = "yes" />
            <title>Riley Diabetes</title>
            <link rel="stylesheet" href="pure-min.css">
            <link rel="stylesheet" href="style.css">
            <script type="text/javascript" src="stay_standalone.js"></script>
    </head>
    
    <?php
        //display the right header for the current user
        if($_SESSION['admin'] == 1)
        {
            include("pageHeader.php");
        }
        else if($_SESSION['admin'] != 1)
        {
            include("patientHeader.php");
        }
        
        if($_SESSION['showAll'] == null)
        {
            $_SESSION['showAll'] = 0;
        }
    ?>
    
    <body id="all">
        <?php
            try
            {                
                //query to pull all fields from Game
                $query = "SELECT * FROM game WHERE gameID=1 OR gameID=2 OR gameID=4 OR gameID=9";
                //query to see what games the patient has played
                $querySession = "SELECT DISTINCT gameID FROM playsession WHERE patientID='" . $_SESSION[username] . "'";
              
                //make query
                $data = $con->query($query);
                $data->setFetchMode(PDO::FETCH_ASSOC);
                
                //query previous sessions
                $dataSession = $con->query($querySession);
                $dataSession->setFetchMode(PDO::FETCH_ASSOC);
                
                print "<br><div>";
                
                $count = 0;
                $played = 0;
                
                //separate data into rows
                foreach($data as $row)
                {
                    //check if the game has been played
                    foreach($dataSession as $session)
                    {
                        if($session['gameID'] == $row['gameID'])
                        {
                            $played = 1;
                        }
                    }
                    if($count < 4 && ($played == 0 || $_SESSION['admin'] == 1 || $_SESSION['showAll'] == 1 || $_SESSION['username'] == "bobbeh"))
                    {
                        print <<<HERE
                            <div style="padding:1%;width:770px;height:300px; border: 5px solid black">
                                <div id="$row[gameID]" style="height:220px">
                                    <div style="padding: 1%">
                                        <img src="gameImages/$row[pic]" alt="$row[gameName] screenshot" height="250" width="375">
                                        
                                        <div>
                                            <form action="quiz.php" method="post">
                                                <button style="border: 1px solid black" type="submit" class="pure-button button-large">Play "$row[gameName]"</button>
                                                <input type="hidden" name="gameID" value="$row[gameID]">
                                                <input type="hidden" name="gameName" value="$row[gameName]">
                                                <input type="hidden" name="URL" value="$row[URL]">
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div><br>
HERE;
                    }
                    
                    $played = 0;
                    $count++;
                }
                print "</div>";
                
                if($_SESSION['admin'] == 0 && $_SESSION['showAll'] == 0)
                {
                    //print"<a href='gamesOverride.php'><p align='right'>Show all games (Nurse login required)</p></a>";
                }
                
            } catch(PDOException $e)
                {
                    echo 'ERROR: ' . $e->getMessage();
                }
        ?>
    </body>
</html>