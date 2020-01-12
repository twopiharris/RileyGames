<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
    <title>test</title>
    <script type="text/javascript" src="jquery.min.js"></script>
    <link rel="stylesheet" href="pure-min.css">
    <link rel="stylesheet" href="style.css">
    <script type="text/javascript" src="canvasjs-1.4.0/canvasjs.min.js"></script>

    
</head>
<body>
<?php
    include("common.php");
    
    $gameID = "1";
    $username = "bobbeh";
    
    $data = $con->query("SELECT * FROM playsession WHERE gameID='$gameID'AND patientID='$username'");
    $data->setFetchMode(PDO::FETCH_ASSOC);
    
    foreach($data as $row)
    {
        print"$row[sessionID]";
    }
?>

</body>
</html>