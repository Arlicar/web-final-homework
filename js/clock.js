window.onload = function () {
    var hour = document.getElementsByClassName("hour")[0];
    var min = document.getElementsByClassName("min")[0];
    var sec = document.getElementsByClassName("sec")[0];

    setInterval(function () {
        var time = new Date();
        var h = time.getHours();
        var m = time.getMinutes();
        var s = time.getSeconds();
        hour.style.transform = `rotate(${h * 30 + (m/60)*30 + (s/60/60)*30}deg)`;
        min.style.transform = `rotate(${m*6 + (s/60)*6}deg)`;
        sec.style.transform = `rotate(${s*6}deg)`;
    }, 1000)
}