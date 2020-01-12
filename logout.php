<?php session_start();
    include("common.php");
    /*-----------------------------------------------------------------------
        logout.php
            -logout
            -destroy session and redirect
    ------------------------------------------------------------------------*/
  
    //log new user session
    $username = $_SESSION['username'];
    $loginTime = $_SESSION['loginTime'];
    $a1c = $_SESSION['a1c'];
    
    //additional variables for userRecords
    $preScore = $_SESSION['preScore'];
    $preBits = $_SESSION['preBits'];
    $postScore = $_SESSION['postScore'];
    $postBits = $_SESSION['postBits'];
    $gameID = $_SESSION['gameID'];
    
    //finish logging user login
    try{
        $logData = $con->query('SELECT * FROM userLog');
        $logData->setFetchMode(PDO::FETCH_ASSOC);
        
        foreach($logData as $row)
        {
            if($row['username'] == $username && $row["login"] == $loginTime)
            {
                $logID = $row['logID'];
                print"$logID";
            }
        }
        
        //$sql = "INSERT INTO userLog (username, logout, a1c) VALUES (:username, :logout, :a1c)";
        $logout = date('Y-m-d H:i:s');
        
        //finish the userLog entry
        $sql = "UPDATE userLog SET logout=?, a1c=? WHERE logID=?";
        
        $update = $con->prepare($sql);
        $update->execute(array($logout, $a1c, $logID));
        
    } catch(PDOException $e){
        echo"Error: " . $e.getMessage();
    }
    
    
    
    //Remove user's data
    print"<br>Destroying current session";
    session_destroy();
    print"<br>Session destroyed";
    
    //Redirect back to login page
    header("Location: index.html");
    //die("Logging out");
?>