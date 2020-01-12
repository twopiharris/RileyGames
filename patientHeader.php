<?php
print<<<HERE
    <div style="background-color: #ccc;" class="pure-menu pure-menu-open pure-menu-horizontal">
        <div style="float:left;"><img src="gameImages/RileyCatWagon.png" alt="RileyCatWagon.png" height="35px" width="35px"></div>
        <a href="#" class="pure-menu-heading"><strong>Logged in as: $_SESSION[username]</strong></a>
    </div>
HERE;
/*        <ul>
            <li><a href="logout.php">Log out</a></li>
        </ul>
    </div>
HERE;
*/
?>