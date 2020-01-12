<?php
    if($_SESSION['admin'] != 1)
    {
        header("Location: patientViewGames.php");
        die("You do not have permission to view this page");
    }