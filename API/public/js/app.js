const getBinsData = async function(){
    const url = "/api/bindata";
    const response = await fetch(url);
    const binsData = await response.json();

    console.log(binsData);
}

getBinsData();