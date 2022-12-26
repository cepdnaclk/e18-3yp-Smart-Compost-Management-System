const getBinData = async function(url){
    var response =  await fetch(url);
    var binData =  await response.json();

    // var day = binData.day;
    // var quarter = binData.quarter;
    // var temperature = binData.temperature;
    // var humidity = binData.humidity;
    // var methaneOutput = binData.methaneOutput;
    // var compostStatus = binData.compostStatus;

    // await new Promise(resolve => setTimeout(resolve, 1000));

    return data = {
        "day"  : binData.day,
        "quarter" : binData.quarter,
        "temperature" : binData.temperature,
        "humidity" : binData.humidity,
        "methaneOutput" : binData.methaneOutput,
        "compostStatus" : binData.compostStatus
    }
}



const getBins = async function(){
    const url = "/api/bins";

    try{
        const response = await fetch(url);
        const bins = await response.json();

        if (bins.length <1){
            return document.querySelector("#card-wrapper").innerHTML = "<p>No Bins found!</p>";
        }

        // var binsData = [];
        var binsHTML = "";
        bins.forEach(  (bin) => {
            // var binNum = bin.binNumber;
            // var url = "/api/bindata/" + binNum;

            binsHTML += generateBinCard(bin); 
        });

        
        document.querySelector("#card-wrapper").innerHTML = binsHTML;
        

    }  catch(error){
        console.log(error);
    }
    
}

const createBin = async function(){
    const url1 = "/api/bins";
    const url2 = "/api/bindata";

    const bin ={
        binNumber : document.querySelector("#binNumber").value,
        binLocation : document.querySelector("#binLocation").value,
        compostStatus : document.querySelector("#compostStatus").value
    }
    
    const data ={
        binNumber :  document.querySelector("#binNumber").value,
        compostStatus : document.querySelector("#compostStatus").value
    }

    try{
        const response1 = await fetch(url1, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(bin)
        })

        const response2 = await fetch(url2, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const newBin = await response1.json();
        const newData = await response2.json();

    
        if(!newBin){
            return console.log("Unable to add Bin.");
        }

        if(!newData){
            return console.log("Unable to add Data.");
        }
    
        const binCard = generateBinCard(newBin);
    
        const binList = document.querySelector("#card-wrapper");
        binList.innerHTML += binCard ;
    
        hideModal("BinCreateModal");
        showSuccess("Bin successfully added!");
        

    } catch(e){
        console.log(e);
        showError("Something went wrong");
    }
}

getBins();

// -------------------------------- UTILITY FUNCTIONS -------------------------

const showModal = (id, data) => {
    $('#' + id).modal();
}

const hideModal = (id, data) => {
    $('#' + id).modal("hide");
}

const showSuccess = (message, options) => {
    toastr.success(message);
}

const showError = (message, options) => {
    toastr.error(message);
}


const createForm = $("#create-bin-form");

createForm.validate({
    rules:{
        binNumber: {
            required: true
        },
        binLocation: {
            required: true
        },
        compostStatus:{
            required: true
        }
    }
})

createForm.on("submit", function(e){
    e.preventDefault();

    if(createForm.valid()){
        createBin();
        createForm[0].reset();
    }

})


const generateBinCard = function(bin){
    return `
    <div class="col">
        <div class="card h-100 bg-dark border-2 text-center border-success">
            <div class="card-header border-dark text-white"><h5>BIN ${bin.binNumber} COMPOST</h5></div>
            <img src="https://raw.githubusercontent.com/cepdnaclk/e18-3yp-Smart-Compost-Management-System/main/docs/images/frontend/bin.png" class="card-img-top" alt="...">		
            <div class="card-body text-white">
                <table class="table table-sm table-dark">
                <tbody>
                    <tr>
                    <td colspan="2">Will be ready in 5 days</td>
                    </tr>				  
                    <tr>
                    <td scope="row">Temperature</td>
                    <td scope="row"> 91 °F</td>
                    </tr>
                    <tr>
                    <td scope="row">Humidity</td>
                    <td scope="row"> 50  %</td>
                    </tr>
                    <tr>
                    <td scope="row">Methane</td>
                    <td scope="row"> 18 ppm</td>
                    </tr>
                    <tr>
                    <td scope="row">Compost Status</td>
                    <td scope="row"> No </td>
                    </tr>
                </tbody>
                </table>			
            </div>
            
            <div class="text-center"><a class="btn btn-success w-75 buttonBottomMargin" href="bindata/bin1/">More Details</a></div>
            <div class="card-footer border-dark">
                <small class="text-muted">Last updated 3 mins ago</small>
            </div>
            <div class="crud-buttons">
            <button class="btn btn-primary"><i class="fa-solid fa-trash-can"></i></button>
            <button class="btn btn-primary"><i class="fa-solid fa-pen-to-square"></i></button>
        </div>
        </div>
    </div>
    `
}

