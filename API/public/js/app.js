const getBins = async function(){
    const url = "/api/bins";
    const response = await fetch(url);
    const bins = await response.json();

    var binsHTML = "";
    bins.forEach((bin) => {
        binsHTML += `<div class="col">
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
        </div>`
    });

    

    $("#card-wrapper").html(binsHTML);
}

getBins();