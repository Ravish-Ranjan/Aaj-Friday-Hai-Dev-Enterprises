<?php
    include "initial.php";
    include "hash.php";
    include "priority_calc.php";
    include "note.php";
    include "task.php";
    include "todo.php";
    include "admin.php";
?>
<?php
    $queries = array();
    // Fetching raw POST object body because content-type is causing parsing issues
    // parse_str($_SERVER['QUERY_STRING'], $queries);
    $details = file_get_contents("../data/Details.json");
    $details = json_decode($details, true);
    signUp($queries);
    signIn($details);
    allowAdmin($details);
    $details = json_encode($details);
    file_put_contents("../data/Details.json", $details);

?>
<html>
<head>
    <title>Main Page</title>

    <!-- stylesheets -->
    <link rel="stylesheet" href="../Stylesheets/message.css">
    <link rel="stylesheet" href="../Stylesheets/main.css">
    <link rel="stylesheet" href="../Stylesheets/admin.css">
    <link rel="stylesheet" href="../Stylesheets/compose.css">

    <!-- favicon -->
    <link rel="shortcut icon" href="../media/logo5mix.png" type="image/x-icon">

    <!-- scripts -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script src="../Script/compose.js"></script>
    <script src="../Script/main.js"></script>
    <script src="../Script/message.js"></script>
</head>
<body onload="pos()">
    <div class="main-parent-wrapper">
        <!-- admin panel -->
        <div class="admin-panel">
            <div id="unlock-images">
                <img src="../media/arrowImg.png" id="arrow-image">
                <img src="../media/quillPenBlack.png" id="quill-black">
            </div>
            <?php 
                $orgs = file_get_contents("../data/Organizations.json");
                $orgs = json_decode($orgs,true);
                $orgs1 = json_encode($orgs);
                file_put_contents("../data/Organizations.json",$orgs1);
            ?>
            <div id="admin-control-panel">
                <div id="button-info-container">
                    <button id="unlock-button" onclick="switchAdmin()">Unlock</button>
                    <p id="unlock-text-1">You haven't unlocked the create feature as of now!</p>
                    <p id="unlock-text-2">Do you wish to activate admin privileges?</p>
                </div>
                <div id="top-container">
                    <img src="../media/logoredq.png" id="user-admin-logo">
                    <button id="admin-nav-button-1" onclick="revealWorkspacePanel()">Workspaces</button>
                    <button id="admin-nav-button-2" onclick="revealToDoPanel()">To-Do's</button>
                </div>
                <div id="todo-admin-panel">
                    <h1>To-Do'sss</h1>
                    <!-- this div will show the to-do's assigned & needs to complete in other workspaces-->
                </div>
                <div id="admin-workspace-panel">
                    <h1>workspacesss</h1>
                    <div class="class"><div class="backg"><h2>ClassName</h2></div><div class="options"><button>opt1</button><button>opt2</button></div></div>
                    <!-- this div will show workpaces the user made & joined other -->
                </div>
                <div class = "compose" onclick="class_compose('','','','')">+</div>
            </div>
        </div>
        <!-- user panel -->
        <div class="user-panel" id="wrapper">
            <div class="top" id="dashboard">
                <label id="logo">Your Workstation</label>
                <div id="prof">
                    <img src="../media/logoredq.png" onclick="showmenu()"
                        style="cursor:pointer;margin-right:30;margin-top:30;" alt="prof" height="75">
                    <?php
                    if(!isset($_COOKIE['user_number'])){
                        // echo "<script>window.location.href = 'index.php'</script>";
                    } 
                    else{
                        echo "<div  id='sidepanel' >
                            <div class='panel-user' >
                                <img src='../media/logoredq.png' height=80 width=80 alt='logo' style='margin-left: 20;filter:drop-shadow(2px 2px 5px black);'>
                                <label style='text-decoration:none;color:black;'>Hi, " . getUser() . " !</label>
                            </div>
                            <ul>
                                <li><a href='../HTML/chart.html' style='text-decoration:none;'>Dashboard</a><br></li>
                                <li><a href='index.php' style='text-decoration: none;'>Home</a></li>
                                <li><a style='text-decoration: none;cursor:pointer;' onclick='hidemenu()'>Back</a></li>
                                <li><a  id='logout' onclick='clearCookies()' style='text-decoration: none;cursor:pointer'>Log Out</a></li>
                            </ul>
                            </div>";
                        }
                    ?>
                </div>
            </div>
            <div class="tab">
                <button class="tbs" onclick="openTab(event, '0')"><img src="../media/notesWidget.png" id="noteWidgetImage"></button>
                <button class="tbs" onclick="openTab(event, '1')"><img src="../media/taskWidget.png" id="taskWidgetImage"></button>
                <button class="tbs" onclick="openTab(event, '2')"><img src="../media/todoWidget.png" id="bbtWidgetImage"></button>
            </div>
            <div class="main" id="0">
                <div class="scat" id="divi1">
                    <?php
                        $details = file_get_contents("../data/Details.json");
                        $details = json_decode($details, true);
                        $details = json_encode($details);
                        file_put_contents("../data/Details.json", $details);
                        //$user = 0;
                        $alternate = file_get_contents("../data/Data.json");
                        $alternate = json_decode($alternate, true);
                        Delete_Note($alternate);
                        $user = fetch_store($alternate);
                        display($alternate, $user);
                    ?>
                </div>
                <!-- this div is to let user create more notes -->
                <div class="menu" id="comp1" onclick="note_compose('','','','')" style="background-color:#f2f2f2;">
                    <a id="btn1">
                        <img src="../media/quillpen.png" id="note-compose-button" alt="compose">
                    </a>
                </div>
            </div>
            <?php updateNote($alternate) ?>
            <div class="main" id="1">
                <div class="scat" style="background-image:url('../media/background_1.png');background-size:110%;" id="divi2">
                    <?php
                        $alternate = json_encode($alternate);
                        file_put_contents("../data/Data.json", $alternate);
                        $alternate = file_get_contents("../data/Data.json");
                        $alternate = json_decode($alternate, true);
                        $u = task_compose($alternate);
                        Delete_task($alternate);
                        display_task($alternate, $u);
                        $alternate = json_encode($alternate);
                        file_put_contents("../Data/Data.json",$alternate);
                    ?>
                </div>
            </div>
            <!-- this div is for user to create more tasks -->
            <div class="menu" id="comp2" onclick = "task_compose('','','','','')" style="background-color:#f2f2f2;">
                <a id="btn1">
                    <img src="../media/goldenperi.png"id="task-compose-button" alt="compose">
                </a>
            </div>
            <?php
                $alternate = file_get_contents("../Data/Data.json");
                $alternate = json_decode($alternate, true);
                updateTask($alternate);
                $alternate = json_encode($alternate);
                file_put_contents("../data/Data.json", $alternate);
                ?>

            <div class="main" id="2">
                <div class="scat" style="background-image:url('../media/background_4.png');background-size:110%;" id='divi3'>
                    <?php
                        $alternate = file_get_contents("../data/Data.json");
                        $alternate = json_decode($alternate, true);
                        $u = getUserNumber();
                        display_todo($alternate, $u);
                        complete($alternate);
                        $alternate = json_encode($alternate);
                        file_put_contents("../data/Data.json", $alternate);
                    ?>
                </div>
            </div>
        </div>
    </div>
    </body>
<script src="../Script/note.js"></script>
<script src="../Script/tasks.js"></script>

</html>