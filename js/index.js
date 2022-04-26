window.addEventListener('load', function () {
    //! 固定右侧导航区功能
    var introduce = document.querySelector('.introduce')
    var introduceRight = document.querySelector('.right')
    // console.log(introduceRight.offsetLeft)
    var introduceTop = introduce.offsetTop
    var returnTop = document.querySelector('.returnTop')
    // console.log(introduce, introduceTop);
    document.addEventListener('scroll', function () {
        if (window.pageYOffset >= introduceTop + 275) {
            introduce.style.position = "fixed"
            introduce.style.top = '40px'
            introduce.style.left = introduceRight.offsetLeft + 'px'
            console.log(introduceRight.offsetLeft)

            $(function () {
                $(".returnTop").fadeIn(500)
            })
        } else {
            introduce.style.position = "absolute"
            introduce.style.top = 10 + 'px'
            introduce.style.left = '0px'
            $(function () {
                $(".returnTop").fadeOut(500)
            })
        }
    })


    //!下拉菜单功能
    $(function () {
        $(".daohang>li").mouseover(function () {
            $(this).children("ul").stop().slideDown(200)
        })
        $(".daohang>li").mouseleave(function () {
            $(this).children("ul").stop().slideUp(200)
        })
    })


    //! 头像旋转功能
    /*获取图片实例*/
    var img = document.querySelector('.introduce-top-img');
    /*定义位置变量*/
    /*给图片赋予鼠标聚焦事件*/
    img.onmouseover = function () {
        var current = 0;
        var flag = 0;

        /*开启定时执行function函数*/
        var temTemp = setInterval(function () {

            if (flag != 90) {
                current = (current + 4) % 360;
                flag++;

                img.onmouseout = function () {
                    clearInterval(temTemp);
                    setInterval(function () {
                        if (flag != 0) {
                            current = (current - 4) % 360;
                            flag--;
                        } else {
                            current = 0;
                            return;
                        }

                        img.style.transform = 'rotate(' + current + 'deg)';
                    }, 1);
                }
            } else {
                current = 0;
                return;
            }

            img.style.transform = 'rotate(' + current + 'deg)';
            window.console.log(current);
        }, 2);
    };

    //!返回顶部
    $(function () {
        $(".returnTop").click(function () {
            animate(window, 0)
        })
    })

    //! 鼠标点击特效
    var body = document.querySelector('body')
    body.addEventListener('click', e => {
        var x = e.pageX + 'px'
        var y = e.pageY + 'px'
        let section = document.createElement('section')
        section.style.left = x
        section.style.top = y
        body.appendChild(section)

        setTimeout(function () {
            section.remove()
        }, 1000)
        console.log(x, y)
    })
})