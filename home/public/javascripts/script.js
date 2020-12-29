window.onload = function(){
    document.getElementById('search').onclick = function() {
        window.location.href = "product/" + encodeURIComponent(document.getElementById('input').value);
        return false;
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