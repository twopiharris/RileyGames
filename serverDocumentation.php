<!DOCTYPE HTML>
<?php session_start(); ?>
<html lang="en-US">
<head>
<meta charset="UTF-8">
<meta name = "apple-mobile-web-app-capable" content = "yes" />
<title>Riley Diabetes Server Documentation</title>
<link rel="stylesheet" href="pure-min.css">
<script type="text/javascript" src="stay_standalone.js"></script>

<?php
    require("loginAuth.php");
    require("adminAuth.php");
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
        width: 800px;
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
    
    #all{
        margin-left: auto;
        margin-right: auto;
        border: 3px solid white;
    }
</style>

</head>

<body>
<div class="div" id="all">

<h1 align="center">Riley Diabetes Server Documentation</h1>

<div class="div" >
    <h2>Contents</h2>
    <ul>
        <li>
            <a href="#code">Coding Notes</a>
            <ul>
                <li><a href="#libraries">External Libraries</a></li>
                <li><a href="#tables">Tables</a></li>
                <li><a href="#common">Common Code</a></li>
            </ul>
        </li>
    </ul>
</div>
<br>

<h1 id="code" align="center">Programmer's Notes</h1>

<div class="div" id="libraries">
    <h2>Notes about iPad</h2>
    <ul>
        <li>iPad kept redirecting away from the "app" view we made using a home screen icon whenever a link was clicked. "stay_standalone.js" fixes that.</li>
        <li>iPad does not support html5 or jquery form validation. Some custom JS validation has been added, some forms still need it.</li>
        <li>iPad puts a lil header at the top of the screen. It displays the time and gets in the way of clicking on header button on the site. So I moved our header down.</li>
    </ul>
    
    <h2>External Libraries</h2>
    <ul>
        <li>CSS modules: <a href="http://purecss.io">Pure CSS</a></li>
        <li>Form validation: <a href="http://jqueryvalidation.org/">Jquery Validation</a></li>
        <li>Graphs: <a href="http://canvasjs.com/">Canvas JS</a>
            <ul>
                <li>for using server data in canvasjs:
                    <a href="http://canvasjs.com/forums/topic/how-can-i-use-php-mysql-dynamic-data/">here</a>
                </li>
                <li>for the graph with two sets of data:
                    <a href="http://canvasjs.com/editor/?id=http://canvasjs.com/example/gallery/column/dual_axis/">here</a>
                </li>
            </ul>
        </li>
    </ul>
</div>
<br>
    
<div class="div" id="tables">
    <h2>Tables</h2>
    <ul>
        <li>
            game
            <ul>
                <li>Represents both the game and the quizzes</li>
                <li>URL is relative. When a game is ready to put up that link may need to be changed</li>
            </ul>
        </li>
        <li>
            problem
            <ul>
                <li>All quiz questions, pre and post</li>
                <li>Linked to game by gameID</li>
            </ul>
        </li>
        
        <li>
            playsession
            <ul>
                <li>Record of most anything we need to know about a play session (start of pre-quiz until submission of post-quiz)</li>
                <li>Pre-quiz data is stored early along with other few bits of info because kids keep logging out or not finishing the post quiz and we were losing data.</li>
            </ul>
        </li>
        
        <li>
            users
            <ul>
                <li>All users in same table</li>
                <li>"admin" bit = 1 for a nurse</li>
            </ul>
        </li>
        
        <li>
            userLog
            <ul>
                <li>Records login and logout timestamps</li>
                <li>Saves login time immediately upon login to avoid data loss</li>
            </ul>
        </li>
        
        <li>
            knowledgeAssessment
            <ul>
                <li>Should just be a one-time quiz</li>
                <li>Storing all answer choices in a string</li>
            </ul>
        </li>
    </ul>
</div>
<br>
    
<div class="div" id="common">
    <h2>Common Code</h2>
    <h3>Include these at the top of pages that need them</h3>
    <ul>
        <li>loginAuth.php: login authentication for all pages. Allows both admin and patient accounts in</li>
        <li>adminAuth.php: additional authentication for admin pages</li>
        <li>common.php: connection to server</li>
        <li>pageHeader.php: header for admin pages</li>
        <li>patientHeader.php: header for patient pages</li>
    </ul>
</div>
<br>
    
<div class="div" id="login">
    <h2>Login junk</h2>
    
    <ul>
        <li>
            index.html
            <ul>
                <li>Originally the login page was "login.html" but I switched it to "index.html" but that messed stuff up on the iPads so "login.html" directs to "index.html". Oops</li>
                <li>related: login.php</li>
            </ul>
        </li>
        
        <li>
            login.php
            <ul>
                <li>Checks login credentials and sets the appropriate SESSION variables for the user</li>
                <li>Should have more informative feedback for login errors</li>
            </ul>
        </li>
        
        <li>
            logout.php
            <ul>
                <li>Completes userLog entry with logout timestamp</li>
                <li>Destroys session</li>
            </ul>
        </li>
    </ul>
    
</div>
<br>
    
<div class="div" id="patient">
    <h2>Patient Site Files</h2>
    
    <ul>
        <li>
            a1c.php
            <ul>
                <li>Displays the super large slider for input of the a1c number upon login of patient</li>
                <li>Be careful if you want to mess with all that CSS. It's from the internet and I broke it many times trying to resize the slider just right</li>
                <li>related: a1cSubmit.php</li>
            </ul>
        </li>
        
        <li>
            a1cSubmit.php
            <ul>
                <li>Just saves the a1c number to SESSION</li>
            </ul>
        </li>
        
        <li>
            knowledgeAssessment.php
            <ul>
                <li>Patients should only be prompted to take this once</li>
                <li>related: submitAssessment.php</li>
            </ul>
        </li>
        
        <li>
            submitAssessment.php
            <ul>
                <li>Grades knowledge assessment and enters it into knowledgeAssessment table</li>
            </ul>
        </li>
        
        <li>
            patientViewGames.php
            <ul>
                <li>Shows only unplayed games for patients (exceptions: admin accounts and bobbeh)</li>
                <li>General note: the patient nav bar only displays the logged in username to keep kids from logging out and losing data</li>
                <li>Related: gamesOverride.php, checkOverride.php</li>
            </ul>
        </li>
        
        <li>
            gamesOverride.php
            <ul>
                <li>Form that takes admin login credentials, currently commented out I think</li>
                <li>Once entered, it will show all games to this patient, even those already played</li>
                <li>Related: checkOverride.php</li>
            </ul>
        </li>
        
        <li>
            checkOverride.php
            <ul>
                <li>Makes sure admin credentials that were entered are correct</li>
                <li>Redirects back to patientViewGames.php</li>
            </ul>
        </li>
        
        <li>
            quiz.php
            <ul>
                <li>PRE-quiz form, has validation</li>
                <li>related: submitQuiz.php</li>
            </ul>
        </li>
        
        <li>
            submitQuiz.php
            <ul>
                <li>Beginning of "playsession"</li>
                <li>Adds incomplete entry to playsession table</li>
            </ul>
        </li>
        
        <li>
            postQuiz.php
            <ul>
                <li>POST-quiz form, validation included</li>
                <li>related: submitPostQuiz.php</li>
            </ul>
        </li>
        
        <li>
            submitPostQuiz.php
            <ul>
                <li>"End" of playsession</li>
                <li>Grades post-quiz and completes the playsession entry made earlier</li>
            </ul>
        </li>
        
        <li>
            done.php
            <ul>
                <li>Last page the user will see</li>
                <li>Gives visual feedback on post-quiz</li>
                <li>The "finish" button just logs the patients out (the only place patients have a logout button)</li>
            </ul>
        </li>
    </ul>
</div>
<br>
    
<div class="div" id="nurse">
    <h2>Nurse Site Files</h2>
    
    <ul>
        <li>
            nurseHome.php
            <ul>
                <li>First page nurses see upon login</li>
                <li>Quiz edit link</li>
                <li>Various user links, added username search recently</li>
            </ul>
        </li>
        
        <li>
            editQuiz.php
            <ul>
                <li>Shows all the questions and answers for a quiz in input fields</li>
                <li>Gives options to add and delete questions (questions just hidden, not deleted)</li>
                <li>Related: addQuestion.php, deleteQuestion.php, saveQuiz.php</li>
            </ul>
        </li>
        
        <li>
            saveQuiz.php
            <ul>
                <li>Updates all existing problems in a quiz</li>
            </ul>
        </li>
        
        <li>
            addQuestion.php
            <ul>
                <li>Form for adding a question to a quiz</li>
                <li>Never added validation for iPad</li>
                <li>Related: saveQuestion.php</li>
            </ul>
        </li>
        
        <li>
            saveQuestion.php
            <ul>
                <li>Adds new entry to problem table</li>
            </ul>
        </li>
        
        <li>
            deleteQuestion.php
            <ul>
                <li>Uses GET method unlike every other page because it was simpler.</li>
                <li>Doesn't delete, just ticks the deleted bit associated with this question.</li>
                <li>Little snippet of JS (function deleteProblem) in editQuiz.php directs the nurse to this page when a question is to be deleted.</li>
            </ul>
        </li>
        
        <li>
            viewUsers.php
            <ul>
                <li>Shows all users in two columns</li>
                <li>There are add, edit, and delete buttons</li>
                <li>Added a search bar for patient accounts as there are many now.</li>
                <li>Prototype "user" report option available for patient accounts. Will display everything that particular user has on the server.</li>
                <li>Related: addNurse.php, addPatient.php, editNurse.php, editPatient.php, deleteUser.php</li>
            </ul>
        </li>
        
        <li>
            addNurse.php, addPatient.php
            <ul>
                <li>Form adds a new user account</li>
                <li>Unlike all other pages, the php is in the same file as the form.</li>
                <li>'Admin' bit is 1 for nurses, 0 for patients (used in adminAuth.php)</li>
                <li>Could use some polishing (including validation), can't use helpful tools in html validation because of iPads.</li>
                <li>Related: submitUser.php</li>
            </ul>
        </li>
        
        <li>
            editNurse.php, editPatient.php
            <ul>
                <li>Form for changing a user's info</li>
                <li>Any admin account can change the password of any other account.</li>
                <li>Needs validation as well.</li>
                <li>Related: submitUser.php, resetPassword.php</li>
            </ul>
        </li>
        
        <li>
            submitUser.php
            <ul>
                <li>This is not used by any of the ADD user pages, only EDIT user pages</li>
            </ul>
        </li>
        
        <li>
            resetPassword.php
            <ul>
                <li>Changes the password to whatever.</li>
                <li>New salt and all that</li>
            </ul>
        </li>
        
        <li>
            deleteUser.php
            <ul>
                <li>Uses GET method to send a user's ID</li>
                <li>Changes the deleted bit of the user to 1</li>
            </ul>
        </li>
        
        <li>
            
        </li>
    </ul>
</div>
    
</div>
</body>
</html>