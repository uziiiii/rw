//获取对象数组
var obj = JSON.parse(sessionStorage.getItem('obj'))
// console.log(obj)
//获取天数
var deathObj = JSON.parse(sessionStorage.getItem('deathObj'))
var voteObj =JSON.parse(sessionStorage.getItem('voteObj'))
var day = JSON.parse(sessionStorage.getItem('day'))
// console.log(day)
//获取剩余存活杀手数量
var deathKill = JSON.parse(sessionStorage.getItem('deathKill'))
//获取剩余存活平民数量
var deathCivilian = JSON.parse(sessionStorage.getItem('deathCivilian'))
// console.log(deathKill)
// console.log(deathCivilian)
//获取平民数量
var people = 0;
$.each(obj,function(i){
    if(obj[i].name == "平民"){
        people++
    }
})
// console.log(people)
//获取杀手数量
var killer = 0;
$.each(obj,function(i){
    if(obj[i].name == "杀手"){
        killer++
    }
})
//页面上显示相应的杀手平民数量
$('#killerNum').html("杀手" + killer + "人")
$('#civNum').html("平民" + people + "人")
// console.log(killer)
//判断是否是杀手胜利条件，是的话添加相应文字
if(deathKill >= deathCivilian){
    $('#win').html("杀手胜利")
    $('.text-top').html("太棒了!你知道么?在杀人游戏中只有20%的杀手取得游戏最终的胜利哦!")
}
//判断是否是平民胜利条件，是的话添加相应文字
if(deathKill == 0){
    $('#win').html("平民胜利")
    $('.text-top').html("杀手已全部放逐，恭喜平民获得游戏胜利")
}
//for循环生成信息块
for(var i = 0; i < day; i++){
    $('main').append('<div class="text-down"><p><span class="day"></span></p><p class="night"></p><p class="daily"></p></div>')
    $('.day').eq(i).html("第" + (i + 1) + "天")
    $('.night').eq(i).html('晚上:' + deathObj[i].number + '号被杀死，他的身份是' + deathObj[i].name)
    $('.daily').eq(i).html('白天:' + voteObj[i].number + '号被放逐，他的身份是' + voteObj[i].name)
}
// $('.leftbtn').click(function(){
//     var gameOver = confirm("确认结束游戏吗？")
//     if (gameOver == true) {
//         sessionStorage.clear()
//         window.location.href = '../html/player-ratio.html'
//     }
// })
