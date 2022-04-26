window.addEventListener('load',function(){
    //! 鼠标跟踪功能
    var logo = document.querySelector('.Follow')
    document.addEventListener("mousemove",function(e){
        var x = e.pageX
        var y = e.pageY
        logo.style.top = y + 15 + 'px'
        logo.style.left = x + 15 +'px'
    })

    //! 点击关闭图片跟随(隐藏图片)
    var btn = document.querySelector('#closeLogo')
    btn.addEventListener('click', function(){
        logo.style.display = 'none'
    })
})