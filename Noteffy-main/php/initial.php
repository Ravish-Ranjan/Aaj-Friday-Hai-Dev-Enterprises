<?php
    function getUser()
    { // this function fetches the user from the data
        if (isset($_COOKIE["user"])) {
            return $_COOKIE["user"];
        } else
            return " ";
    }
    // This function gives the index of the user in the json file
    function getUserNumber(){
        if (isset($_COOKIE['user_number']))
            return (int) ($_COOKIE['user_number']);
        echo "<cript>window.location.href='../HTML/error.html'</script>";
        }
    // removes html tags from data
    function sanitize(&$data)
    {
        $data = strip_tags($data);
    }
    // removes html from each element of an array
    function sanitize_array(&$arr){
        for($i=0;$i<count($arr);$i++){
            $arr[$i] = strip_tags($arr[$i]);
        }
    }
    function signUp($queries){
        if(isset($queries['signup'])=='true'){
            $raw = file_get_contents("php://input");
            $jsond = json_decode($raw,true) or die(123);
            if ($jsond['Password'] !== $jsond['Password1']) {
                    $data = array('Message'=>'failure');echo $data;
                } 
                else if ($jsond['Password'] === $jsond['Password1']) {
                    // details
                    $details = file_get_contents("../data/Details.json");
                    $details = json_decode($details, true);
                    
                    // alternate
                    $alternate = file_get_contents("../data/Data.json");
                    $alternate = json_decode($alternate, true);
                    header('Content-Type: application/json;charset=utf-8');
                    $users_count = count($details['Users']);
                    str_pad($jsond['Username'], 32, '#', STR_PAD_RIGHT);

                    $details['Users'][$users_count]['identifier'] = $users_count;
                    $details['Users'][$users_count]['User_Name'] = $jsond['Username'];
                    $details['Users'][$users_count]['Password'] = encrypt_data($jsond['Password'], str_pad($jsond["Username"], 32, '#', STR_PAD_RIGHT));
                    $details['Users'][$users_count]['Email'] = $jsond['Email'];
                    $details['Users'][$users_count]['Type'] = false;
                    $details['Users'][$users_count]['Organization_Code'] = array();
                    $alternate['User_Data'][$users_count]['identifier'] = $users_count;
                    $alternate['User_Data'][$users_count]['Notes'] = array();
                    $alternate['User_Data'][$users_count]['To-do'] = array();

                    $details = json_encode($details);
                    $alternate = json_encode($alternate);
                    file_put_contents("../data/Details.json", $details);
                    file_put_contents("../data/Data.json", $alternate);
                    $respdata = array('Message'=>'success');
                    $data = json_encode($respdata);
                    echo $data;
            }
            die();
        }
    }
    function signIn(&$jsonData)
    { //this function uses the saved data to verify and let the old user sign in
        if (isset($_POST['User_Name_']) && isset($_POST['Password_'])) {
            $users_count = count($jsonData["Users"]);
            $errc = "uid";
            $name = "";
            for ($i = 0; $i < $users_count; $i++) {
                // echo $i.'<br>';
                if ($jsonData["Users"][$i]["identifier"] == $i) {
                    if ($jsonData["Users"][$i]["Password"] === encrypt_data($_POST["Password_"], str_pad($_POST["User_Name_"], 32, '#', STR_PAD_RIGHT))) {
                        setcookie("user", $jsonData["Users"][$i]["User_Name"], 0, "/");
                        setcookie("user_number", $jsonData["Users"][$i]["identifier"], 0, "/");
                        echo "<script>window.location.href = window.location.href</script>";
                        return;
                    } else {
                        $name = $jsonData["Users"][$i]["User_Name"];
                        $errc = "upwd";
                    }
                }
            }
            echo '<script>window.location.href="../HTML/signUp.html?err=' . $errc . '&name=' . $name . '&activity=' . ($errc == 'uid' ? "signup" : "signin") . '";</script>';
            return;
        }
    }
?>