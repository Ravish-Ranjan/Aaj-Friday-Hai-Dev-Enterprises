if ( window.history.replaceState ) { // this function changes the state of a page
    window.history.replaceState( null, null, window.location.href );
}

function clearCookies(){ // this function is used to clear the cookies of user to log him out
    let decodedCookie = decodeURIComponent(document.cookie);
    decodedCookie = decodedCookie.split(";");
    for (i = 0; i < decodedCookie.length; i++){
        let temp = decodedCookie[i].split("=");
        if (temp[0].trim() == "user") {
            console.log(temp[1]);
            document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = '../php/index.php';
        }
        if (temp[0].trim() == "user_number") {
            console.log(temp[1]);
            document.cookie = "user_number=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = '../php/index.php';
        }
    }
}
function setCookie(tabname){
    const d = new Date();
    d.setTime(d.getTime() + (24*60*60*1000));
    document.cookie = "name="+tabname+";expires="+ d.toUTCString()+";path=/";
}
function chan(at){
    for (let i = 0; i < 3; i++) {                  
        document.getElementsByClassName("main")[i].style.display="none";
    }
    document.getElementById(at-1).style.display="block";
    setCookie(at);
}
function getRandomArbitrary(min, max) { //this function gets random value in given range
    return Math.random() * (max - min) + min;
}
async function pos() { // this function styles the notes/tasks to be displayed in scattered/random manner
    window.scrollTo(window.innerWidth,0);
    var cadmin = await checkAdmin();
    if(cadmin!=1){
        hideAdmin();
    }
    decodedCookie = decodeURIComponent(document.cookie);
    decodedCookie = decodedCookie.split(";");
    flag = false;
    for (j = 0; j < decodedCookie.length; j++){
        if (decodedCookie[j].split("=")[0].trim() == "name") {
            chan(decodedCookie[j].split("=")[1]);
            flag = true;
        }
    }
    if (!flag)
        chan(1);
    var count = $(".divi").length;
    for (let i = 0; i < count; i++){
        var styles ={
            "top":getRandomArbitrary(40,0),
            "right":getRandomArbitrary(-90,0),
            "rotate":getRandomArbitrary(-13,13)+"deg"
        };
        var obj = document.getElementsByClassName("divi");
        Object.assign(obj[i].style,styles);
    }
}
function openTab(evt, tabname) { // this function is used to move arround the tabs in the main page
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("main");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tbs");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    
    document.getElementById(tabname).style.display = "block";
    evt.currentTarget.className += " active";

    Array.from(tablinks).map((ele)=>{
        if(!(ele.className.includes('active'))){
            ele.style.opacity = "0.5";
        }
        else{
            ele.style.opacity = "1";
        }
    });
    divs = document.getElementsByClassName("main")
    for (let i = 0; i < divs.length-1; i++) {
        if (divs[i].style.display=="block") {
            document.getElementById("comp"+String(i+1)).style.display="block" ;
        }        
        else{
            document.getElementById("comp"+String(i+1)).style.display="none" ;
        }
    }
    chan(parseInt(tabname) + 1);
}
function showmenu(){
    document.getElementById("sidepanel").style.display = "block";
    document.getElementById("logo").style.filter = "blur(10px)";
    for (i = 1; i < document.getElementById("wrapper").childElementCount; i++){
        document.getElementById("wrapper").children[i].style.filter = "blur(10px)";
    }
}
function hidemenu(){
    document.getElementById("logo").style.filter = "blur(0px)";
    for (i = 1; i < document.getElementById("wrapper").childElementCount; i++){
        document.getElementById("wrapper").children[i].style.filter = "blur(0px)";
    }
    document.getElementById("sidepanel").style.display= "none";
}
function showAdminMenu(){
    document.getElementById("sidepanel-admin").style.display = "block";
    document.getElementById("admin-workspace-panel").style.filter = "blur(10px)";
    document.getElementById("admin-nav-button-1").style.filter = "blur(10px)";
    document.getElementById("admin-nav-button-2").style.filter = "blur(10px)";
}
function hideAdminMenu(){
    document.getElementById("logo").style.filter = "blur(0px)";
    document.getElementById("admin-workspace-panel").style.filter = "blur(0px)";
    document.getElementById("admin-nav-button-1").style.filter = "blur(0px)";
    document.getElementById("admin-nav-button-2").style.filter = "blur(0px)";
    document.getElementById("sidepanel-admin").style.display= "none";
}
function signUp() {
    window.location.href = "../HTML/signUp.html";
}
function revealAdmin(){
    document.getElementById("top-container").style.opacity = "1";
    document.getElementById("admin-workspace-panel").style.opacity = "1";
    document.getElementById("button-info-container").style.display = "none";
    document.getElementById("unlock-images").style.display = "none";
}
function revealWorkspacePanel(){
if(document.getElementById("admin-nav-button-1").click){
    document.getElementById("admin-workspace-panel").style.display = "flex";
    document.getElementById("todo-admin-panel").style.display = "none";
}
}

function revealToDoPanel(){
if(document.getElementById("admin-nav-button-2").click){
    document.getElementById("admin-workspace-panel").style.display = "none";
    document.getElementById("todo-admin-panel").style.display = "flex";
}
}
function switchAdmin(){
    let decoded = decodeURIComponent(document.cookie);
    let vals = decoded.split(';');
    for(let u = 0;u < vals.length;u++){
        let key_val = vals[u].split('=');
        if(key_val[0].trim()=="user_number"){
            var loc = window.location.href.split('/php')[0];
            fetch(loc+"/php/main.php?"+(new URLSearchParams({'op':'chadmin'})),{
            method:"POST",mode:"cors",header:'Content-Type:application/json;charset=utf-8'
            }).then((dat)=>dat.json()).then((jsond)=>{
            if(jsond['Message']=="admin success"){
                //Unlock panel here
                window.location.reload();
                return 1;
            }else if(jsond['Message']=="admin present"){
                message("you are already any admin");return 2;
            }
            else{
                message("can't connect to the server right now");
                return -1;
            }
    });
        }
    }
}
async function checkAdmin(){
    let decoded = decodeURIComponent(document.cookie);
    let vals = decoded.split(';');
    for(let u = 0;u < vals.length;u++){
        let key_val = vals[u].split('=');
        if(key_val[0].trim()=="user_number"){
            var loc = window.location.href.split('/php')[0];
            var res = await fetch(loc+"/php/main.php?"+(new URLSearchParams({'op':'checkadmin'})),{
            method:"POST",mode:"cors",header:'Content-Type:application/json;charset=utf-8'
            });
            var js = await res.json();
            switch(js["Message"]){
                case 'admin true':
                    return 1;
                case 'admin false':
                    return 0;
                default:
                    return -1;
            }
        }
    }
}
function hideAdmin() {
    document.getElementById("top-container").style.opacity = "0";
    document.getElementById("admin-workspace-panel").style.opacity = "0";
    document.getElementById("button-info-container").style.display = "block";
    document.getElementById("unlock-images").style.display = "block";
}
function revealWorkspacePanel() {
    if (document.getElementById("admin-nav-button-1").click) {
        document.getElementById("admin-workspace-panel").style.display = "block";
        document.getElementById("todo-admin-panel").style.display = "none";
    }
}

function revealToDoPanel() {
    if (document.getElementById("admin-nav-button-2").click) {
        document.getElementById("admin-workspace-panel").style.display = "none";
        document.getElementById("todo-admin-panel").style.display = "block";
    }
}
function collapsetasks(ele){
    let todo = ele.parentElement;
    let tasks = ele.getAttribute("data-array");
    tasks = tasks.split(',');
    tasks = tasks.reverse();
    tasks.forEach((task)=>{
        let domtask = document.createElement("label");
        domtask.style.backgroundColor = ele.style.backgroundColor;
        domtask.style.opacity = '0.6';
        domtask.setAttribute('for','123');
        domtask.innerHTML = `${task}`;
        if(ele.nextSibling!=null){
            todo.insertBefore(domtask,ele.nextSibling);
        }
        else{
            todo.appendChild(domtask);
        }
    });
    ele.setAttribute("onclick","uncollapsetasks(this)");
}
function uncollapsetasks(ele){
    let todo = ele.parentElement;
    let task = ele.nextSibling;
    ele.setAttribute("onclick","collapsetasks(this)");
    while(task.getAttribute("for")=="123"){
        let curr = task;
        task = task.nextSibling;
        curr.remove();
        if(task==null)
            break;
    }
}
async function displayAdminTodo(ele){
    let adminlist = document.querySelector('#todo-admin-panel');
    let options = {
        method:'GET',
        mode:'cors'
    };
    let queries = {
        'admin':true,
        'todo':true
    };
    var loc = window.location.href.split('/php')[0];
    let resplist = await fetch(loc+"/php/admin.php?"+(new URLSearchParams(queries)),options);
    let jsonlist = await resplist.json();
    if(jsonlist['To-do']!=null){
        jsonlist['To-do'].forEach(ele => {
            const color = Math.floor(Math.random()*16777215).toString(16);
            
            //Classroom name
            let classgroup = document.createElement('div');
            classgroup.classList = ['classg'];classgroup.style.opacity = 0.8;
            ele['Tasks'].forEach((task)=>{
                let tasknode = document.createElement('label');
                let tasks = task.Tasks;
                tasknode.setAttribute("data-array",`${tasks})`);
                tasknode.setAttribute("onclick","collapsetasks(this)")
                tasknode.style.backgroundColor = color;
                tasknode.innerHTML = `${task.Title} Due: ${task.Time} on ${task.Date}`;
                classgroup.appendChild(tasknode);
            });
            adminlist.appendChild(classgroup);
        });
    }else{
        adminlist.innerHTML = `
        <h1>No tasks currently</h1>`;
    }
}
let searchBar = document.getElementById("search");
let divi1 = document.getElementById("divi1");
let originalMarkup = divi1.innerHTML;
searchBar.addEventListener("input", async (ele) => {
    if (document.getElementById("0").style.display == "block") {
        let markup = '';
        let loc = window.location.href.split("/main.php");
        let response = await fetch(loc[0] + "/search.php?" + (new URLSearchParams({ term: ele.target.value })), { method: "GET", mode: "cors" });
        response = await response.json();
        response['data'].forEach((ele) => {
            let random = Math.floor(Math.random() * 3) + 1;
            markup += `<div class="divi" style="background-image:url(../media/newNote${random}.png);" title='${ele["Title"]}'>
            <div class="topic">
                <img id="pin" src='../media/pin${random}.png' alt="pin">
                </div>
                <div class="data">
                    <div class="screen">
                        <p id='content${response['index_j']}'>${ele["Content"]}</p>
                    </div>
                    <div class="control">
                        <button onclick="">
                        <a href="../php/main.php?note_no=${response['index_j']}">
                            <img title='edit the note' src="../media/edit.png" alt="">
                    </a>
                        </button>
                        <button onclick="" id='clip'>
                            <img title='copy the note to clipboard' src="../media/share.png" alt="" onclick="getContent(${response['index_j']})">
                        </button>
                        <button onclick="">
                            <a href='../php/main.php?N_no=${response['index_j']}' style='text-decoration:none;'>
                                <img title='delete the note' src="../media/delete.png" alt="">
                            </a>
                        </button>
                    </div>
                </div>
            </div>`
        })
        divi1.innerHTML = markup;
    }
    else if(document.getElementById("1").style.display=="block"){
        let markup = '';
        let divi2 =  document.getElementById("divi2")
        originalMarkup =divi2.innerHTML;
        let loc = window.location.href.split("/main.php");
        let response = await fetch(loc[0] + "/search.php?" + (new URLSearchParams({ task_term: ele.target.value })), { method: "GET", mode: "cors" });
        response = await response.json();
        console.log(response['data']);
        response['data'].forEach((ele) => {
            let random = response['priority'];
            markup+= `<div class="divi" style="background-image:url(../media/newNote${random}.png);" title='title:$title'>
            <div class="topic">
                <img id="pin" src="../media/pin${random}.png" alt="pin">
            </div>
            <div class="data">
                <div class="screen" id='tasks$i'><ul style="list-style-type:none;">`
            ele['Tasks'].forEach((tks) => {
                markup += `<li>${tks}</li>`;
            })
            markup += `
            </ul></div>
            <div class="control">
                <button onclick="">
                <a href='main.php?task_no=${response['index_j']}'>
                    <img title='edit the task' src="../media/edit.png" alt="">
                </a>
                </button>
                <button onclick="getTasks(${response['index_j']})">
                    <img title='copy the task to clipboard' src="../media/share.png" alt="">
                </button>
                <button onclick="">
                    <a href='../php/main.php?T_no=${response['index_j']}' style='text-decoration:none;'>
                        <img title='delete the task' src="../media/delete.png" alt="">
                    </a>
                </button>
            </div>
        </div>
    </div>
            `
        })
        divi2.innerHTML = markup;
    }
})
displayAdminTodo(document.getElementById("todo-admin-panel"));