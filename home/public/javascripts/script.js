
window.onload = function(){
    document.getElementById('search').onclick = function() {
        window.location.href = "product/" + encodeURIComponent(document.getElementById('input').value);
        return false;
    } 
}
