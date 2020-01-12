<?php
print<<<HERE
<br>
    <div style="background-color: #ccc; height: 55px" class="pure-menu pure-menu-open pure-menu-horizontal">
        <div style="float:left;"><img src="gameImages/RileyCatWagon.png" alt="RileyCatWagon.png" height="50px" width="50px"></div>
        <a href="nurseHome.php" class="pure-menu-heading"><strong>Logged in as: $_SESSION[username]</strong></a>
        <ul>
            <li><a href="nurseHome.php">Home</a></li>
            <li><a href="viewUsers.php">Users</a></li>
            <li><a href="newStats.php">Stats</a></li>
            <li><a href="patientViewGames.php">Games</a><li>
            <li><a href="help.php">Help</a><li>
            <li><a href="logout.php">Log out</a></li>
        </ul>
    </div>
HERE;
?>