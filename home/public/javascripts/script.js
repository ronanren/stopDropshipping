window.onload = function(){
    document.getElementById('search').onclick = function() {
        url = document.getElementById('input').value;
        if (url.substr(0, 8) != "https://" && url.substr(0, 7) != "http://"){
            url = "https://" + url;
        }
        window.location.href = "product/" + encodeURIComponent(url);
        return false;
    } 
}

function checkEnterClick(e){
    if(e.keyCode == 13){
        url = document.getElementById('input').value;
        if (url.substr(0, 8) != "https://" && url.substr(0, 7) != "http://"){
            url = "https://" + url;
        }
        window.location.href = "product/" + encodeURIComponent(url);
    }
}

function searchSite(){
    sites = document.getElementById("table").getElementsByTagName("tr");
    search = document.getElementById("inputSearch").value.toUpperCase(); 
    for (let i = 1; i < sites.length; i++){
        if (sites[i].getElementsByTagName("td")[0].innerText.toUpperCase().indexOf(search) > -1) {
            sites[i].getElementsByTagName("td")[0].style.display = "";
        } else {
            sites[i].getElementsByTagName("td")[0].style.display = "none";
        }
    }
}