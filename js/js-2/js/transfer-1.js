//取出上个页面的玩家数据
var allpeople = JSON.parse(sessionStorage.getItem("all"));
//洗牌算法打乱玩家顺序
function rnd(allpeople) {
    var newArr = [];
    for (var i = 0, len = allpeople.length; i < len; i++) {
        var j = Math.floor(Math.random() * (len - i));
        newArr[i] = allpeople[j];
        allpeople.splice(j, 1);
    }
    return newArr;
}
//把打乱后的数组赋给allpeople
allpeople = rnd(allpeople);
//JSON存储打乱后的玩家数据
sessionStorage.setItem("all", JSON.stringify(allpeople));
//定义函数buttonOne 清空第一个 添加第二个
function buttonOne() {
    $("main").empty()
    $('<div id="content"></div>').appendTo($("main"))
    $('<span class="dath"></sapn>').appendTo($("#content"))
    $('<div class="tip"></div>').appendTo($("#content"))
    $('<img src="../image/avatar-2.png" alt="">').appendTo($(".tip"))
    $('<p class="playerId">角色:</p>').appendTo($(".tip"))
    $('<span class="role"></span>').appendTo($(".playerId"))
    $('<p class="word-group">词组:西伯利亚</p>').appendTo($(".tip"))
    $('<div class="tips-1"></div>').appendTo($("#content"))
    $('<p class="tips-2"> 想办法猜到人的词，同时还要注意不要暴露自己哦！</p>').appendTo($(".tips-1"))
}
//定义函数buttonTwo 清空第二个 添加第一个
function buttonTwo() {
    $("main").empty()
    $('<div id="content-box" class="dic"></div>').appendTo($("main"))
    $('<span class="dath"></sapn>').appendTo($("#content-box"))
    $('<img src="../image/avatar-1.png" alt="">').appendTo($("#content-box"))
}
//定义用到的变量 用于判断
var x = 0;
var y = 1;
var z = 2;
var q = 1;
var c = 0;
//点击事件函数
function btn() {
    //如果q小于allpeople数组长度 执行下面的if语句
    if (q < allpeople.length) {
        if (x == 0) {
            buttonOne();
            x = 1;
            $('.a')[0].innerHTML = '隐藏并传递给' + z + '号';
            $('.role')[0].innerHTML = allpeople[c];
            $('.dath')[0].innerHTML = y;
            q++;
            c++;
        } else {
            buttonTwo();
            x = 0;
            y++;
            $('.dath')[0].innerHTML = y;
            $('.a')[0].innerHTML = '查看' + z + '号身份';
            z++;
        }
        //不满足上面的条件 再判断 再执行下面的if语句
    } else if (q == allpeople.length) {
        if (x == 0) {
            buttonOne();
            x = 1;
            $('.role')[0].innerHTML = allpeople[c];
            $('.a')[0].innerHTML = '开始游戏';
            $('.dath')[0].innerHTML = y;
            q++;
        } else {
            buttonTwo();
            x = 0;
            y++;
            $('.dath')[0].innerHTML = y;
            $('.a')[0].innerHTML = '查看' + z + '号身份';
            z++;
        }
        //以上两个条件都不满足则跳转窗口
    } else {
        window.location.href = "../html/startPlay.html"
    }
}