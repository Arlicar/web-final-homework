window.addEventListener('load', function () {
    var btnLeft = document.querySelector('.left')
    var btnRight = document.querySelector('.right')
    var content = document.querySelector('.content')
    var contentWidth = content.clientWidth
    // 引文有边框,所以用clientWidth,没边框的话用offsetWidth
    //隐藏显示左右图标
    content.addEventListener('mouseenter', function () {
        btnLeft.style.display = 'block'
        btnRight.style.display = 'block'
        //鼠标经过停止定时器
        clearInterval(timer)
        timer = null //清除定时器变量
    })
    content.addEventListener('mouseleave', function () {
        btnLeft.style.display = 'none'
        btnRight.style.display = 'none'
        timer = setInterval(function () {
            // 手动调用点击事件
            btnRight.click()
        }, 2000)
    })


    //动态生成小圆圈
    var ul = content.querySelector('ul')
    var ol = content.querySelector('ol')
    var number = ul.children.length
    for (let i = 0; i < number; i++) {
        //创建小li
        var li = document.createElement('li')
        ol.appendChild(li)
        // 设置li的自定义属性
        li.setAttribute('index', i)
        // 绑定小圆圈的点击事件
        li.addEventListener('click', function () {
            for (let i = 0; i < number; i++) {
                ol.children[i].className = ''
            }
            this.className = 'current'
            var index = this.getAttribute('index')
            num = index
            circle = index
            animate(ul, -index * contentWidth)
        })
    }
    var num = 0
    // 因为克隆写在生成小圆圈的下面,所以不会多生成一个小圆圈
    ol.children[0].className = 'current'
    // 克隆第一个图片(li)放到ul最后面
    var first = ul.children[0].cloneNode(true)
    ul.appendChild(first)
    var circle = 0
    //circle控制小圆点的播放
    btnRight.addEventListener('click', function () {
        if (num == ul.children.length - 1) {
            ul.style.left = 0
            num = 0
        }
        num++
        animate(ul, -num * contentWidth)
        circle++
        if (circle == ol.children.length) {
            circle = 0
        }
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }
        ol.children[circle].className = 'current'
    })
    btnLeft.addEventListener('click', function () {
        if (num == 0) {
            ul.style.left = -(ul.children.length - 1) * contentWidth + 'px'
            num = ul.children.length - 1
        }
        num--
        animate(ul, -num * contentWidth)
        circle--
        if (circle < 0) {
            circle = ol.children.length - 1
        }
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }
        ol.children[circle].className = 'current'
    })

    // 自动播放功能
    var timer = setInterval(function () {
        // 手动调用点击事件
        btnRight.click()
    }, 2000)
})