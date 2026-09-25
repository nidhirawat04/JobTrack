const addApplication = document.getElementById("add-application");
const applicationOpen = document.getElementById("application-open");
const stats = document.getElementById("stats");
const applicationSection = document.getElementById("application-section");

addApplication.addEventListener("click", ()=>
{
    applicationOpen.style.display= "block";
    stats.style.display= "none";
    applicationSection.style.display= "none";
});

const closeForm= document.getElementById("close-form");

closeForm.addEventListener("click", ()=>
{
    applicationOpen.style.display= "none";
    stats.style.display= "flex";
    applicationSection.style.display= "block";
});

const companyName=  document.getElementById("company-name");
const jobRole=  document.getElementById("job-role");
const applicationStatus=  document.getElementById("status");
const date=  document.getElementById("date");
const url=  document.getElementById("url");
const notes =  document.getElementById("notes");

const saveButton = document.getElementById("save-application");
const applicationList=document.getElementById("application-list");


const errorMsg = document.getElementById("error-msg");

let applicationArray=[];

saveButton.addEventListener("click", () => {

    if(companyName.value.trim() === "" ||
    jobRole.value.trim() === "" ||
    applicationStatus.value === "" ||
    date.value === "")
    {
        errorMsg.style.display = "block";
        errorMsg.textContent = "Warning: Please fill in all required fields.";
        return;
    }

    errorMsg.textContent ="";
    errorMsg.style.display = "none";

    applicationOpen.style.display= "none";
    stats.style.display= "flex";
    applicationSection.style.display= "block";

    let applicationObj={
    id:Date.now(),
    company:companyName.value,
    role:jobRole.value,
    status:applicationStatus.value,
    date:date.value,
    url:url.value,
    notes:notes.value
    };

    applicationArray.push(applicationObj);

    saveToLocalStorage();

    renderApplication(applicationObj);

    updateStats();

    companyName.value ="";
    jobRole.value="";
    applicationStatus.value="";
    date.value="";
    url.value="";
    notes.value="";
});

function saveToLocalStorage() {
    const applicationStringList = JSON.stringify(applicationArray);
    localStorage.setItem("application", applicationStringList);
}

function loadApplications() {
    const retrievedList = localStorage.getItem("application")
    if(retrievedList!== null){
    applicationArray = JSON.parse(retrievedList);
    }
    applicationArray.forEach(function(application){
        renderApplication(application);
    });

    updateStats();
}



const applicationCountElement = document.getElementById("application-count");
const interviewCountElement = document.getElementById("interview-count");
const offerCountElement = document.getElementById("offer-count");

function updateStats(){
    let applicationCount= applicationArray.length;

    let interviewArray= applicationArray.filter(function(application){
        return application.status==="interview";
    });

    let interviewCount = interviewArray.length;

    let offerArray = applicationArray.filter( application =>
    {
        return application.status==="offer";
    });

    let offerCount = offerArray.length;

    applicationCountElement.textContent = applicationCount;
    interviewCountElement.textContent= interviewCount;
    offerCountElement.textContent=offerCount;

}

applicationList.addEventListener("click", (event)=>
{
    if(event.target.classList.contains("delete-button")){
        const id = Number(event.target.dataset.id);
        const index= applicationArray.findIndex(function(application) {
            return application.id === id;
        });

        if(index !== -1){
        applicationArray.splice(index,1);

        saveToLocalStorage();

        event.target.closest("tr").remove();
        
        updateStats();
        }
    }
});

function renderApplication(applicationObj){
    let row= document.createElement("tr");

    let companyCell= document.createElement("td");
    companyCell.textContent=applicationObj.company;
    row.appendChild(companyCell);

    let roleCell= document.createElement("td");
    roleCell.textContent=applicationObj.role;
    row.appendChild(roleCell);

    let statusCell = document.createElement("td");
    statusCell.textContent= applicationObj.status;
    row.appendChild(statusCell);

    let dateCell = document.createElement("td");
    dateCell.textContent= applicationObj.date;
    row.appendChild(dateCell);

    let urlCell = document.createElement("td");
    urlCell.textContent= applicationObj.url;
    row.appendChild(urlCell);

    let notesCell = document.createElement("td");
    notesCell.textContent= applicationObj.notes;
    row.appendChild(notesCell);

    let deleteButton = document.createElement("button");
    deleteButton.textContent="Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.dataset.id=applicationObj.id;

    let actionCell = document.createElement("td");
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);

    applicationList.appendChild(row);

}

loadApplications();

  
const searchInput= document.getElementById("search-input");
const statusFilter = document.getElementById("status-filter");

function filterApplications() {
    const searchItem = searchInput.value.toLowerCase();
    const statusItem = statusFilter.value.toLowerCase();
    
    const filteredApplications = applicationArray.filter(function(application){
        return (
            (application.role.toLowerCase().includes(searchItem) || 
            application.company.toLowerCase().includes(searchItem)) 
            && 
            (statusItem === "all" || application.status.toLowerCase() === statusItem)
        );
    });

    applicationList.innerHTML = "";
    filteredApplications.forEach( function(application){
        renderApplication(application);

    });
}  

    searchInput.addEventListener("input", filterApplications);

    statusFilter.addEventListener("change", filterApplications);


const editButton = document.getElementById("edit-btn");

editButton.addEventListener("click", function() {
    console.log("Edit clicked");
});