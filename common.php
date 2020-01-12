<?php    
    $options = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');
    
    try {
        $con = new PDO('mysql:host = localhost.localdomain; dbname=riley_db',"rileydba","D@ng1tB0bb#h");
    } catch(PDOException $e) {
        die("Failed to connect to the database: " . $e->getMessage());
    }
    
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $con->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
    header('Content-Type: text/html; charset=utf-8');
    
    //session_start();