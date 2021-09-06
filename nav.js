//处理首页导航部分 声明模块遵从AMD规范
define(["jquery"], function($) {
    function download() {
        $.ajax({
            type: "get",
            url: "../data/nav.json",
            success: function(result) {
                // alert(result);
                console.log(result);
                var bannerArr = result.banner;
                //通过循环把数据拿到页面上
                for (var i = 0; i < bannerArr.length; i++) {
                    // console.log(bannerArr[i].img);
                    $('<a href="' + bannerArr[i].url + '"><img class="swiper-lazy swiper-lazy-loaded" src="../images/banner/' + bannerArr[i].img + '" alt=""></a>')
                        .appendTo("#J_homeSwiper .swiper-slide");
                    var node = $('<a href="#" class = "swiper-pagination-bullet"></a>');
                    if (i == 0) {
                        node.addClass("swiper-pagination-bullet-active");
                    }
                    node.appendTo("#J_homeSwiper .swiper-pagination");
                }
            },
            error: function(msg) {
                // console.log(msg);
            }
        })
    }
    //实现轮播图的轮播效果
    function banner() {
        var iNow = 0; //当前显示的下标
        var aImgs = null; //记录图片
        var aBtns = null; //记录小圆圈   

        var timer = setInterval(function() {
            iNow++;
            tab();
        }, 2500);
        // 封装一个切换函数
        function tab() {
            if (!aImgs) {
                aImgs = $("#J_homeSwiper .swiper-slide").find("a");
            }
            if (!aBtns) {
                aBtns = $("#J_homeSwiper .swiper-pagination").find("a");
            }
            if (iNow == 5) { iNow = 0 };
            //图片切换
            aImgs.hide().css("opacity", 0.2).eq(iNow).show().animate({ opacity: 1 }, 500);
            //圆点切换
            aBtns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");

        }
        //鼠标移入轮播停止 移出继续
        $("#J_homeSwiper,.swiper-button-prev ,.swiper-button-next").mouseenter(function() {
                clearInterval(timer);
            }).mouseleave(function() {
                timer = setInterval(function() {
                    iNow++;
                    tab();
                }, 2500);
            })
            //点击小圆圈 可以完成切换对应的图片 事件委托
        $("#J_homeSwiper .swiper-pagination").on("click", "a", function() {
                iNow = $(this).index();
                tab();
                return false; //阻止a链接的默认行为
            })
            //左右箭头切换
        $(".swiper-button-prev ,.swiper-button-next").click(function() {
            if (this.className == "swiper-button-prev") {
                iNow--;
                if (iNow == -1) {
                    iNow = 4;
                }
            } else {
                iNow++;
            }
            tab();
        })

    }
    // 侧边导航栏数据的加载
    function leftNavDownload() {
        $.ajax({
            url: "../data/nav.json",
            success: function(result) {
                var sideArr = result.sideNav;
                for (var i = 0; i < sideArr.length; i++) {
                    var node = $(`<li class='category-item'>
                <a href="/index.html" class='title'>
                    ${sideArr[i].title}
                    <em class='iconfont-arrow-right-big'></em>
                </a>
                <div class="children clearfix children-col-4">                   
                </div>
            </li>`);
                    node.appendTo("#J_categoryList");
                    //取出当前这个选项对应的子节点
                    var childArr = sideArr[i].child;
                    //一共多少列,设置对应的class样式
                    var col = Math.ceil(childArr / 6);
                    node.find("div.children").addClass("children-col-" + col);
                    //通过循环创建右侧的子选项
                    for (var j = 0; j < childArr.length; j++) {
                        if (j % 6 == 0) {
                            var newUl = $(`<ul class="children-list children-list-col children-list-col-${parseInt(j/6)}">      
                    </ul>`);
                            newUl.appendTo(node.find("div.children"));
                        }
                        $(`<li>
                    <a href="http://www.mi.com/redminote8pro"data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2"
                        class="link clearfix" data-stat-id="d678e8386e9cb0fb"onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
                        <img src="${childArr[j].img}"width="40" height="40" alt="" class="thumb">
                        <span class="text">${childArr[j].title}</span>
                    </a>
                </li>`).appendTo(newUl);
                    }
                }

            },
            error: function(msg) {
                console.log(msg);
            }
        })
    }
    //给侧边导航添加移入切换效果 选项卡的切换效果
    function leftNavTab() {
        //通过事件委托
        $("#J_categoryList").on("mouseenter", ".category-item", function() {
            $(this).addClass("category-item-active");
        })
        $("#J_categoryList").on("mouseleave", ".category-item", function() {
            $(this).removeClass("category-item-active");
        })
    }
    //下载顶导航数据
    function topNavDownload() {
        $.ajax({
            url: "../data/nav.json",
            success: function(result) {
                //将顶部导航的数据取出
                var topNavArr = result.topNav;
                topNavArr.push({ title: "服务" }, {
                    title: "社区"
                })

            },

        })
    }

    return {
        download: download,
        banner: banner,
        leftNavDownload: leftNavDownload,
        leftNavTab: leftNavTab


    }
});