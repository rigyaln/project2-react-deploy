const proxyBase = "https://solace.ist.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/"
//const proxyBase = "https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/"
//endpoint to be something like 'about/' or 'degrees'
import 'bootstrap/dist/css/bootstrap.min.css';
async function getData(endpoint){
    const res = await fetch(`${proxyBase}${endpoint}`);
    //fetch{proxyBase + "" + endpoint};
    return await res.json();
}
export default getData;