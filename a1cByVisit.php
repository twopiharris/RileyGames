<?php
    header('Content-Type: application/json');
    include("common.php");
    
    try {
        $data = $con->query("SELECT * FROM playsession WHERE deleted=0");
        $data->setFetchMode(PDO::FETCH_ASSOC);
        
        //store the usernames of patients with play sessions
        $patients = array();
        
        //find usernames of patients, store only once
        foreach($data as $row)
        {
            $duplicate = false;
            $length = count($patients);
            for($i = 0; $i < $length; $i++)
            {
                if($row['patientID'] == $patients[$i])
                {
                    $duplicate = true;
                }
            }
            
            if(!$duplicate)
            {
                array_push($patients, $row['patientID']);
            }
        }
        
        /*$length = count($patients);
        for($i = 0; $i < $length; $i++)
        {
            print"$patients[$i]<br>";
        }*/
        
        //datapoints is a 2d array of all the a1c data
        //data is anonymous as this is just an aggregate average
        $dataPoints[0][0] = "good";//array(array());
        array_pop($dataPoints);
        
        $length = count($patients);
        //run through all patients and assign the visits that patient has made to datapoints
        for($i = 0; $i < $length; $i++)
        {
            //grab the playsessions for this patient
            $data = $con->query("SELECT * FROM playsession WHERE deleted=0");
            $data->setFetchMode(PDO::FETCH_ASSOC);
            
            $visitCount = 0;
            $dateOfLastVisit = "";
            foreach($data as $row)
            {
                if($row['patientID'] == $patients[$i] && $row['dateTaken'] != $dateOfLastVisit)
                {
                    $dateOfLastVisit = $row['dateTaken'];
                    $dataPoints[$i][$visitCount] = $row['a1c'];
                    $visitCount++;
                }
            }
        }
        
        //var_dump($dataPoints);
        
        //this will store the averages for each visit for all patients
        $averages = array();
        
        //calculate averages
        $numVisits = 0;
        $visit = 0;
        $total = 0;
        $visitsLeft = true;
        //go through each visit and check each patient
        while($visitsLeft)
        {
            $visitsLeft = false;
            $patientsThisVisit = 0;
            //run through patients, adding the a1c to total
            for($i = 0; $i < $length; $i++)
            {
                //some patients will have made more visits so ignore when null and stop when all null
                if($dataPoints[$i][$visit] != null)
                {
                    $visitsLeft = true;
                    //keep track of how many patients have actually made this visit
                    $patientsThisVisit++;
                }
                
                $total += $dataPoints[$i][$visit];
            }
            
            //Don't bother showing an average for a visit no one has made
            if($visitsLeft)
            {
                //$averages[$visit] = round($total/$length,2);
                array_push($averages, round($total/$patientsThisVisit,2));
                //print"Visit #: $visit <br> Patients this visit: $patientsThisVisit <br> Total: $total <br> Average: $averages[$visit] <br><hr>";
                $visitPlusOne = $visit + 1;
                //print"Visit #: $visitPlusOne <br> Num patients that have made this visit: $patientsThisVisit <br> Average A1c: $averages[$visit] <br><hr>";
                $visit++;
            }
            
            $total = 0;
        }
        
        $data_points = array();
        
        $length = count($averages);
        for($i = 0; $i < $length; $i++)
        {
            $plusOne = $i + 1;
            $point = array("label" => "Visit " . $plusOne, "y" => $averages[$i]);
            array_push($data_points, $point);
        }
        
        echo json_encode($data_points, JSON_NUMERIC_CHECK);
        
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
?>