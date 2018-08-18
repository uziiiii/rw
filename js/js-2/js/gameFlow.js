//结束游戏按钮，清除所有数据直接跳转到玩家配比页面
function over() {
    var gameOver = confirm("确认结束游戏吗？")
    if (gameOver == true) {
        sessionStorage.clear()
        window.location.href = '../html/player-ratio.html'
    }

}
//获取对象数组
var obj = JSON.parse(sessionStorage.getItem("obj"))
// var click = sessionStorage.getItem("click")
var deathObj = JSON.parse(sessionStorage.getItem("deathObj"))
var voteObj = JSON.parse(sessionStorage.getItem("voteObj"))
console.log(deathObj)
console.log(voteObj)
var clickKill = JSON.parse(sessionStorage.getItem("clickKill"))
var clickVote = JSON.parse(sessionStorage.getItem("clickVote"))
//获取天数
var day = sessionStorage.getItem('day');
//for循环遍历出流程
for (i = 1; i <= day; i++) {
    $('.process').append('<button class="btnDay"></button><div class="flow"><div class="triangle"></div><p class="killing">杀手杀人</p><p class="deathKill"></p><p class="speaking">亡灵发表遗言</p><p class="discuss">玩家依次发言</p><p class="vote">全民投票</p><p class="deathVote"></p></div>')
    $('.btnDay').eq(i - 1).append('第' + i + '天');
    $('.flow').hide();
    $('.flow').eq(i - 1).show();
    // console.log(day)
}
if (JSON.parse(sessionStorage.getItem('deathObj'))) {
    for (var i = 0; i < clickKill; i++) {
        $('.deathKill').eq(i).append(deathObj[i].number + "号被杀死，他的真实身份是" + deathObj[i].name)
    }
}
if (JSON.parse(sessionStorage.getItem('voteObj'))) {
    for (var i = 0; i < clickVote; i++) {
        $('.deathVote').eq(i).append(voteObj[i].number + "号被放逐，他的真实身份是" + voteObj[i].name)
    }
}
//for循环遍历，改变前一天的背景色
for (var i = 1; i < day; i++) {
    $('.killing').eq(i - 1).css("background-color", "gray")
    $('.speaking').eq(i - 1).css("background-color", "gray")
    $('.discuss').eq(i - 1).css("background-color", "gray")
    $('.vote').eq(i - 1).css("background-color", "gray")
}
//点击隐藏显示流程
$('.btnDay').click(function () {
    var dayClick = $('.btnDay').index(this)
    $('.flow').eq(dayClick).toggle()
})
//判断是否存在kilclick，用于改变杀手杀人选项的背景色
if (JSON.parse(sessionStorage.getItem('kilClick'))) {
    kilClick = JSON.parse(sessionStorage.getItem('kilClick'))
} else {
    kilClick = 2
    // console.log(kilClick)
}
// console.log( JSON.parse(sessionStorage.getItem('kilClick')))
//判断是否改变杀手杀人选项背景色
if (kilClick == 1) {
    for (var i = 0; i < day; i++) {
        $('.killing').eq(i).css("background-color", "gray")
    }
}
//
if (JSON.parse(sessionStorage.getItem('flow'))) {
    flow = JSON.parse(sessionStorage.getItem('flow'))
} else {
    flow = 0
}

$('.killing').eq(day - 1).click(function () {
    var killing = 1
    sessionStorage.setItem("killing", killing)
    if (flow == 0) {
        flow = 0
        sessionStorage.setItem('flow', flow)
        window.location.href = '../html/killing.html'
    } else {
        alert(' 请按顺序点击')
    }
})
$('.speaking').eq(day - 1).click(function () {
    if (JSON.parse(sessionStorage.getItem('flow')) == 1) {
        flow = 2
        sessionStorage.setItem('flow', flow)
        alert('请亡灵发表遗言')
        $('.speaking').css("background-color", "gray")
    } else {
        alert('请按顺序点击')
    }
})
$('.discuss').eq(day - 1).click(function () {
    if (JSON.parse(sessionStorage.getItem('flow')) == 2) {
        flow = 3
        sessionStorage.setItem('flow', flow)
        alert('请玩家依次发言')
        $('.discuss').css("background-color", "gray")
    } else {
        alert('请按顺序点击')
    }
})
$('.vote').eq(day - 1).click(function () {
    sessionStorage.removeItem('killing')
    if (JSON.parse(sessionStorage.getItem('flow')) == 3) {
        flow = 0
        sessionStorage.setItem('flow', flow)
        var vote = 1
        sessionStorage.setItem("vote", vote)
        sessionStorage.setItem("day", day)
        window.location.href = '../html/killing.html'
    } else {
        alert('请按顺序点击')
    }
})