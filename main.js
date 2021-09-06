let modalBBtn = document.getElementById("modalBBtn");
let createTeam = document.getElementById("createTeam");
let selectCategory = document.getElementById("selectCategory");
let teamName = document.getElementById("teamName");
let memberEmail = document.getElementById("memberEmail");
let teamsDiv = document.getElementById("teamsDiv");
let deleteTeam = document.getElementById("deleteTeam");
let addMoreBtn = document.getElementById("addMoreBtn");
let addMoreInp = document.getElementById("addMoreInp");
let logoutBtn = document.getElementById("logoutBtn");
let team;
let index;
let createdObj;
let membersArr = "";
let addMemberIndex;


//local storage
let getUserFromLocal = localStorage.getItem("userObjLoginLocal");
getUserFromLocal = JSON.parse(getUserFromLocal);
// console.log(getUserFromLocal)
if (getUserFromLocal) {
    console.log(getUserFromLocal)
} else {
    window.location = 'index.html'
}



function refresh() {
    setTimeout(function () {
        location.reload()
    }, 100);
}
// getting data from user input
let takeUserInput = () => {
    let selectedCategory = selectCategory.options[selectCategory.selectedIndex].value;
    let team = {
        admin: getUserFromLocal.email,
        teamName: teamName.value,
        category: selectedCategory,
        members: [memberEmail.value]
    }
    refresh()

    // pushhing data to an array
    let userL1 = localStorage.getItem("userObjLocal");
    userL1 = JSON.parse(userL1);
    for (let i = 0; i < userL1.length; i++) {
        if (userL1[i].name === getUserFromLocal.name) {
            arr2 = userL1[i].createdTeam;
        }
    }

    if (arr2 === undefined) {
        var arr = []
    } else {
        var arr = arr2;
    }
    arr.push(team)

    // getting main user's object from local storage and setting team object to user's main object and setting back to local storage
    let userL = localStorage.getItem("userObjLocal");
    userL = JSON.parse(userL);
    for (let i = 0; i < userL.length; i++) {
        if (userL[i].name === getUserFromLocal.name) {
            userL[i].createdTeam = arr;
        }
    }
    localStorage.setItem("userObjLocal", JSON.stringify(userL));
    displayFunc()

}
createTeam.addEventListener('click', takeUserInput)


let displayFunc = () => {
   
    teamsDiv.innerHTML = ""
    let userL = localStorage.getItem("userObjLocal");
    userL = JSON.parse(userL);
    for (let i = 0; i < userL.length; i++) {
        if (userL[i].name === getUserFromLocal.name) {
            index = i;
            createdObj = userL[i].createdTeam;
        }
    }
    // console.log(createdObj)
    for (let i = 0; i < createdObj.length; i++) {
        membersArr = ""
        for (let w = 0; w < createdObj[i].members.length; w++) {

            membersArr += `  ${createdObj[i].members[w]} `
        }

       
        teamsDiv.innerHTML += `
        <div class="card-body">
            <h5>${createdObj[i].teamName}</h5>
            <h6 >members : <span>${membersArr}</span></h6>
            <button type="button" id="${i}" onclick="deleteTeamFunc(this.id)" class="btn btn-dark">
            Delete Team
            </button>
        </div>`
    }
    
    teamName.value = "";
    memberEmail.value = "";
    selectCategory.selectedIndex = 0;
    
}

// location.reload();
displayFunc()

let deleteTeamFunc = (e) => {
    // getting index from id and deleting from object
    createdObj.splice(e, 1)
    // getting user's object from local storage
    let userL = localStorage.getItem("userObjLocal");
    userL = JSON.parse(userL);
    // setting deleted item from object and setting it to main object
    userL[index].createdTeam = createdObj;
    // setting main object to local storage
    localStorage.setItem("userObjLocal", JSON.stringify(userL));

    // updating display function to update elemnts after deleting
    displayFunc()
}

let addMoreFunc = (e) => {
    addMemberIndex = e;

}

let addNewMemFunc = () => {
    createdObj[addMemberIndex].members.push(addMoreInp.value)
   
    let userL3 = localStorage.getItem("userObjLocal");
    userL3 = JSON.parse(userL3);
    
    userL3[index].createdTeam = createdObj;
    
    localStorage.setItem("userObjLocal", JSON.stringify(userL3));
   
    addMoreInp.value = "";
    
    displayFunc()
}


// logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem("userObjLoginLocal");
    window.location = 'index.html'
})
           