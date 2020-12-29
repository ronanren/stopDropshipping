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
    sites = document.getElementsByClassName('site');
    search = document.getElementById("inputSearch").value.toUpperCase(); 
    for (let i = 0; i < sites.length; i++){
        if (sites[i].children[1].innerHTML.toUpperCase().indexOf(search) > -1) {
            sites[i].style.display = "";
        } else {
            sites[i].style.display = "none";
        }
    }
}