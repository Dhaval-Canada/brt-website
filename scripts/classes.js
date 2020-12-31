let url = "json/members.json";
let memberData = undefined;

$.getJSON(url, function(data){
    memberData = data;
    console.log(memberData);
});

document.getElementById("btnLogin").addEventListener('click', function()
{
    //alert`login clicked`;
    let fn = document.getElementById("mfName").value;
    let ln = document.getElementById("mlName").value;
    let act = document.getElementById("activity").value;
    let today = new Date;
    
    let output = document.getElementById("output"); 
    let nameString = "";
    output.innerHTML = ""; 

    for(m of memberData)
    //verify name
    if ((m.fname == fn.toLowerCase()) && (m.lname == ln.toLowerCase())){
            //verifying activity
            //console.log(m.activity, act.toLowerCase());
            if (m.activity == act.toLowerCase()) {
                //verify day
                console.log(today.getHours());
                console.log(m.stime[0]);
                if (m.day == today.getDay()){
                    //verify hour
                    if (m.stime[0] <= today.getHours() && m.etime[0] >= today.getHours()){
                        //verify mins
                        if (m.stime[1] <= today.getMinutes() && m.etime[1] >= today.getMinutes()){
                            output.innerHTML =  "To join " + act + " Group : " + m.group + "<br>" + groupLink(m.group);
                            return true;
                        }
                        else{
                            if(m.stime[0] >= today.getMinutes()){
                                output.innerHTML = fn.toUpperCase() + " ! You might want to wait for the class to begin";    
                                return false;
                            }
                            //alert`if activity is not correct`;
                            else if (m.stime[0] <= today.getMinutes()){
                                output.innerHTML = fn.toUpperCase() + ", Oops! too late for class today";
                                return false;
                            }
                        }
                    }
                    else{
                        if(m.stime[0] >= today.getHours()){
                            output.innerHTML = fn.toUpperCase() + " ! You might want to wait for the class to begin";    
                            return false;
                        }
                        //alert`if activity is not correct`;
                        else if (m.stime[0] <= today.getHours()){
                            output.innerHTML = fn.toUpperCase() + ", Oops! too late for class today";
                            return false;
                        }
                    }
                }
                else{
                    output.innerHTML = fn.toUpperCase() + " !" + act + ' class for you is not today <br>Click on <a href="write_us.html">Write us</a> to connect with us for other activities';
                    return false
                }
            }
            
            else {
                if(act.toLowerCase() == ""){
                    output.innerHTML = fn.toUpperCase() + " ! Please choose an activity";    
                    return false;
                }
                //alert`if activity is not correct`;
                else if (m.activity != act.toLowerCase()){
                    output.innerHTML = fn.toUpperCase() + ' ! You have not enrolled in this activity <br>Click on <a href="write_us.html">Write us</a> to connect with us for <br>' +act.toUpperCase();
                    return false;
                }
            }
    }
    else if((m.fname != fn.toLowerCase()) 
            //verify last naame
            || (m.lname != ln.toLowerCase())
            ){output.innerHTML = 'Entered name does not seem to be in our list of members. <br>If you are, Please contact Instructor. <br>Click on <a href="write_us.html">Write us</a> to connect with us'};
});

function groupLink(n){
    switch(n){
        case(1):
            nameString ='<a href="https://www.w3schools.com/jsref/jsref_tolowercase.asp"target="blank" <!--style="text-decoration: none"--> CLICK HERE </a>';
            break;
        case(2):
            nameString ='<a href="https://www.w3schools.com/jsref/jsref_tolowercase.asp" target="blank" <!--style="text-decoration: none"--> CLICK HERE </a>';
            break;
        case(3):
            nameString ='<a href="https://www.w3schools.com/jsref/jsref_tolowercase.asp" target="blank" <!--style="text-decoration: none"--> CLICK HERE </a>';
            break;
        case(4):
            nameString ='<a href="https://www.w3schools.com/jsref/jsref_tolowercase.asp" target="blank" <!--style="text-decoration: none"--> CLICK HERE </a>';
            break;
    }
    return nameString;
}

function clearAll(){
    document.getElementById("mfName").value = null;
    document.getElementById("mlName").value = null;
    document.getElementById("activity").value="";
}

function clearAct(){
    document.getElementById("activity").value="";
}

