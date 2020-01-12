<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en-US">
    <!------------------------------------------------------
            submitPatient.php
        -not for creation of new user
        -Saves patient info when edited
        -Redirects to patient page after submission
    -------------------------------------------------------->
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
        <?php
            try{
                //have two patient ID fields in case the patient ID was changed
                //  this way, you can update the existing field instead of checking
                //  if the ID already existed
                $username = filter_input(INPUT_POST, "username");
                $newUsername = filter_input(INPUT_POST, "newUsername");
                $birthYear = filter_input(INPUT_POST, "birthYear");
                $admin = filter_input(INPUT_POST, "admin");
                
                //Check if username is already in use
                $query = "SELECT 1 FROM users WHERE username = :username";
                
                $query_params = array(':username' => $newUsername);
                
                try
                {
                    $stmt = $con->prepare($query);
                    $data = $stmt->execute($query_params);
                }
                catch(PDOException $e)
                {
                    die("Failed to run comparison query");
                }
                
                //Fetch any data that is returned
                //If username hasn't been used, it should return false
                $row = $stmt->fetch();
                
                if($row)
                {
                    //Change to display the username is already used
                    //die("Username already exists!");
                    $_SESSION['errMess'] = "Username already exists";
                    
                    //Redirect back to the appropriate edit page using the admin bit associated with the account that is being edited
                    //  Using more auto-submit forms but dangit if I don't know another way to do it
                    if($admin == 1)
                    {
                        print<<<HERE
                            <form id="nurseRedirect" method="post" action="editNurse.php">
                                <input type="hidden" name="username" value="$username">
                            </form>
HERE;

                        ?>
                            
                            <script>
                                //auto-submit script for redirect form
                                document.getElementById("nurseRedirect").submit();
                            </script>
                <?php
                    }
                    else if($admin == 0)
                    {
                        print<<<HERE
                            <form id="patientRedirect" method="post" action="editPatient.php">
                                <input type="hidden" name="username" value="$username">
                            </form>
HERE;

                        ?>
                            
                            <script>
                              //auto-submit script for redirect form
                              document.getElementById("patientRedirect").submit();
                            </script>
                <?php
                    } else {
                        die("An error occurred");
                    }
                }
                
                //username checks out, update patient
                $sql = "UPDATE users SET username=?, birthYear=? WHERE username='$username'";
                
                //update record
                $update = $con->prepare($sql);
                $update->execute(array($newUsername,$birthYear));
            
            } catch(PDOException $e)
                {
                    echo 'ERROR: ' . $e->getMessage();
                }
                
            print<<<HERE
            <form id="redirect" action="viewUsers.php" method="post">
            </form>
HERE;
        ?>
    
            <script>
                //auto-submit script for redirect form
                document.getElementById("redirect").submit();
            </script>
    
    </body>
    
</html>