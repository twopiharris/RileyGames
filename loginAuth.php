<?php
    //Login authentication code, will redirect if the user is not logged in
    //Must go at top of every file that needs to be protected
    if(empty($_SESSION['username'])) 
    { 
        //Redirect to login
        header("Location: login.html"); 
         
        //Ain't let no one see this without logging in so kill it
        die("Not logged in, redirecting to login"); 
    }