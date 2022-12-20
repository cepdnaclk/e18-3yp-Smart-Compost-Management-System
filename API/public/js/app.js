const getBins = async function(){
    const url = "/api/bins";

    try{
        const response = await fetch(url);
        const bins = await response.json();

        if (bins.length <1){
            return document.querySelector("#card-wrapper").innerHTML = "<p>No Bins found!</p>";
        }

        var binsHTML = "";
        bins.forEach((bin) => {
            binsHTML += generateBinCard(bin);
        });

        document.querySelector("#card-wrapper").innerHTML = binsHTML;
        

    }  catch(error){
        console.log(error);
    }
    
}

const createBin = async function(){
    const url = "/api/bins";

    const bin ={
        binNumber : document.querySelector("#binNumber").value,
        binLocation : document.querySelector("#binLocation").value,
        compostStatus : document.querySelector("#compostStatus").value
    }

    try{
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(bin)
        })
    
        const newBin = await response.json();
    
        if(!newBin){
            return console.log("Unable to add Bin.");
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
                    <td scope="row">91 °F</td>
                    </tr>
                    <tr>
                    <td scope="row">Humidity</td>
                    <td scope="row">50 %</td>
                    </tr>
                    <tr>
                    <td scope="row">Methane</td>
                    <td scope="row">18 ppm</td>
                    </tr>
                </tbody>
                </table>			
            </div>
            
            <div class="text-center"><a class="btn btn-success w-75 buttonBottomMargin" href="bindata/bin1/">More Details</a></div>
            <div class="card-footer border-dark">
                <small class="text-muted">Last updated 3 mins ago</small>
            </div>
        </div>
    </div>
    `
}