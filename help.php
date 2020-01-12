<!DOCTYPE HTML>
<?php session_start(); ?>
<html lang="en-US">
<head>
<meta charset="UTF-8">
<meta name = "apple-mobile-web-app-capable" content = "yes" />
<title>Riley Diabetes Help Page</title>
<link rel="stylesheet" href="pure-min.css">
<link rel="stylesheet" href="style.css">
<script type="text/javascript" src="stay_standalone.js"></script>

<?php
    require("loginAuth.php");
    require("adminAuth.php");
    require("common.php");
    include("pageHeader.php");
?>

<style>
    .div{
        border: 3px solid black;
        width: 900px;
        padding: 1%;
    }
    
    .img{
        border: 1px solid black;
        height: 400px;
        width: 700px;
    }
    
    p{
        width: 600px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }
    
    .tallerImg{
        height: 700px;
    }
    
    #center{
        margin-left: auto;
        margin-right: auto;
        border: 3px solid white;
    }
</style>

</head>

<body id="all">
<div class="div" id="center">

<h1 align="center">Riley Diabetes Help With Using Site</h1>

<div class="div">
    <h2>If there is anything else you want added to this page, let us know!</h2>
</div>
<br>
    
<div class="div" >
    <h2>Contents</h2>
    <ul>
        <li><a href="#login">Login</a></li>
        <li>
            <a href="#patient">Patient Section</a>
            <ul>
                <li><a href="#a1c">A1c</a></li>
                <li><a href="#patientHome">Patient Home</a></li>
                <li><a href="#preQuiz">Pre-quiz</a></li>
                <li><a href="#game">Game</a></li>
                <li><a href="#postQuiz">Post-quiz</a></li>
                <li><a href="#done">Finish page</a></li>
            </ul>
        </li>
        <li>
            <a href="#nurse">Nurse Section</a>
            <ul>
                <li><a href="#nurseHome">Nurse Home</a></li>
                <li><a href="#editQuiz">Edit Quiz</a></li>
                <li><a href="#users">Users Page</a></li>
                <li><a href="#addUser">Add User</a></li>
                <li><a href="#deleteUser">Delete User</a></li>
                <li><a href="#editUser">Edit User</a></li>
                <li><a href="#stats">Statistics</a></li>
            </ul>
        </li>
    </ul>
</div>
<br>

<div class="div" id="login">
    <h2>Login</h2>
    <p>Login usernames and passwords can be created by a nurse(admin) account</p>
    <img class="img" src="serverScreenies/loginPage.png" alt="loginPage.png">
</div>
<br>
    
<h1 id="patient" align="center">Patient Stuff</h1>
    
<div class="div" id="a1c">
    <h2>A1c enter page</h2>
    <img class="img" src="serverScreenies/a1cPage.png" alt="a1cPage.png">
    <p>
        Test for A1c upon login. Number can be entered using the slider (it's ugly and somewhat hard to
        use on iPad) or by directly entering the number into the text field.
    </p>    
</div>
<br>
    
<div class="div" id="patientHome">
    <h2>Patient Home Page</h2>
    <img class="img" src="serverScreenies/patientHome.png" alt="patientHome.png">
    <p>Patients can select which game to play. They will be directed to the pre-quiz for the game.</p>
</div>
<br>
    
<div class="div" id="preQuiz">
    <h2>Pre-Quiz</h2>
    <img class="img" src="serverScreenies/preQuiz.png" alt="preQuiz.png">
    <p>
        Extra large radio buttons are there to select answers for the questions. Patients cannot continue
        without answering all questions. After answering all questions and hitting done, they are directed
        to the game that was selected.
    </p>
</div>
<br>
    
<div class="div" id="game">
    <h2>Game</h2>
    <img class="img" src="serverScreenies/game.png" alt="game.png">
    <p>
        The game will be full screen. Once the patient has completed all levels, they will be directed to
        the post quiz
    </p>
</div>
<br>
    
<div class="div" id="postQuiz">
    <h2>Post Quiz</h2>
    <img class="img" src="serverScreenies/postQuiz.png" alt="postQuiz.png">
    <p>Same story as the post quiz. Patients will be directed to one last page after playing.</p>
</div>
<br>
    
<div class="div" id="done">
    <h2>Finished</h2>
    <img class="img" src="serverScreenies/done.png" alt="done.png">
    <p>The page prompts the user to hand back the ipad. The finish button will log the patient out.</p>
</div>
<br>
    
<h1 id="nurse" align="center">Nurse Stuff</h1>

<div class="div" id="nurseHome">
    <h2>Nurse Home Page</h2>
    <img class="img" src="serverScreenies/nurseHome.png" alt="nurseHome.png">
    <p>
        The home page gives a few options. There is a drop down menu with which to select
        a quiz to edit. There are buttons to view all user accounts and to add accounts. The navigation
        menu at the top will be on every page and allows you to go anywhere on the site.
    </p>
</div>
<br>
    
<div class="div" id="editQuiz">
    <h2>Editing quizzes</h2>
    <img class="tallerImg img" src="serverScreenies/quizEdit.png" alt="quizEdit.png">
    <p>
        This page will allow the adding, deleting, and editing of questions. You are required to have at
        least two answer choices. Be careful to select the right bubble for the correct answer or all
        the data gathered for the quiz will be incorrect.
    </p>
</div>
<br>
    
<div class="div" id="users">
    <h2>Users Page</h2>
    <img class="img" src="serverScreenies/userPage.png" alt="userPage.png">
    <p>
        From here you can add or edit user accounts. The userlog button will take you to a page that
        displays records of every time a user has logged in and out.
    </p>
</div>
<br>
    
<div class="div" id="addUser">
    <h2>Add User</h2>
    <img class="img" src="serverScreenies/addUser.png" alt="addUser.png">
    <p>
        You can add both patient and admin accounts. Both types of accounts require a username and password.
        Patient accounts also require a birth year.
    </p>
</div>
<br>
    
<div class="div" id="deleteUser">
    <h2>Delete User</h2>
    <img class="img" src="serverScreenies/deleteUser.png" alt="deleteUser.png">
    <p>
        If you want to delete a user, click the button under the user's name. A popup will appear to ask for
        confirmation of the delete to help prevent accidental deletion.
    </p>
</div>
<br>

<div class="div" id="editUser">
    <h2>Edit User</h2>
    <img class="img" src="serverScreenies/editUser.png" alt="editUser.png">
    <p>
        Clicking the edit button will allow you to change the username, birth year, and password of an account.
    </p>
</div>
<br>

<div class="div" id="stats">
    <h2>Statistics</h2>
    <p>
        There are several graphs in the stats page. It is still in development.
    </p>
    <img class="img" src="serverScreenies/stats1.png" alt="stats1.png">
    <p>
        The first graph will display the progress of A1c numbers for patients over time. There is also a graph
        in development that will show the average A1c number by visit for all patients.
    </p>
    
    <img class="img" src="serverScreenies/stats2.png" alt="stats2.png">
    <p>
        This graph shows the average pre and post scores. With two drop down boxes you can choose different quizzes
        and patients.
    </p>
    <img class="img" src="serverScreenies/stats3.png" alt="stats3.png">
    <p>
        This graph shows score averages for individual questions within quizzes. It has the same drop down choices as
        the previous graph.
    </p>
</div>
<br>
    
</div>
</body>
</html>