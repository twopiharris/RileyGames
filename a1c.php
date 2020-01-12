<!DOCTYPE HTML>
<?php session_start(); ?>
<html lang="en-US">
    <head>
        <meta charset="UTF-8">
        <title>A1C: Riley Games</title>
        <link rel="stylesheet" href="pure-min.css">
        <link rel="stylesheet" href="style.css">
        <link href="jquery-ui-1.10.4.custom/css/ui-lightness/jquery-ui-1.10.4.custom.css" rel="stylesheet">
	<script src="jquery-ui-1.10.4.custom/js/jquery-1.10.2.js"></script>
	<script src="jquery-ui-1.10.4.custom/js/jquery-ui-1.10.4.custom.js"></script>
        <!--<link rel="stylesheet" href="jquery.mobile-1.4.3/jquery.mobile-1.4.3.min.css">
        <script src="jquery.mobile-1.4.3/jquery.mobile-1.4.3.min.js"></script>-->
        <meta name = "apple-mobile-web-app-capable" content = "yes" />
        
        <style>
            input[type='range'] {
                    -webkit-appearance: none;
                    border-radius: 5px;
                    box-shadow: inset 0 0 5px #333;
                    background-color: #999;
                    height: 30px;
                    width: 400px; /*change length of track*/
                    vertical-align: middle;
            }
            input[type='range']::-moz-range-track {
                     -moz-appearance: none;
                     border-radius: 5px;
                     box-shadow: inset 0 0 5px #333;
                     background-color: #999;
                     height: 20px;
            }
            input[type='range']::-webkit-slider-thumb {
                     -webkit-appearance: none !important;
                     border-radius: 20px;
                     background-color: #FFF;
                     box-shadow:inset 0 0 10px rgba(000,000,000,0.5);
                     border: 1px solid #999;
                     height: 50px; /*change height of slider*/
                     width: 50px; /*change width of slider*/
            }
            input[type='range']::-moz-range-thumb {
                     -moz-appearance: none;
                     border-radius: 20px;
                     background-color: #FFF;
                     box-shadow:inset 0 0 10px rgba(000,000,000,0.5);
                     border: 1px solid #999;
                     height: 50px;
                     width: 50px;
            }
        </style>
        
        <script>
            
            function updateInputVal(val)
            {
                document.getElementById("display").value = val;
            }
            
            /*$(function() {
                var labels = new Array("5","6","7","8","9","10","11","12","13","14");
                
                $("#slider").slider({
                    max: 14,
                    min: 5,
                    step: .1,
                    slide: function(event, ui){
                        $("#display").val(ui.value);
                        $("#label").html(labels[ui.value]);
                    }
                });
                
                $("#display").val($("#slider").slider("value"));
                $("#label").html(labels[$( "#slider" ).slider( "value" )]);
            });*/
            
        </script>
	
        <script type="text/javascript" src="stay_standalone.js"></script>
    </head>
    
    <?php include("patientHeader.php"); ?>
    
    <body id="all">
        <?php
            require("common.php");
            require("loginAuth.php");
        ?>
        <div align="center">
            <form class="pure-form" id="a1c" method="post" action="a1cSubmit.php">
                <h2>Enter your A1C number</h2>
                <!--<input type="range" data-show-value="true" name="slider" id="slider" value="5" min="5" max="14" step=".1" />-->
                
                <input type="range" id="slider" min="5" max="14" step=".1" onchange="updateInputVal(this.value);"/>
                <!--<div style="margin: auto 0; width: 400px" id="slider"></div><br>-->
                <input name="a1c" type="number" id="display" min="5" max="14" step=".1" value="9.5"/>
                
                <button class="pure-button pure-button-primary button-border" type="submit">Ok!</button>
            </form>
        </div>
    </body>
</html>