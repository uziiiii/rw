//获取传递页面的数据
var player = JSON.parse(sessionStorage.getItem("all"));
//声明变量num，并赋值为1
console.log(player.length)
var num = 1;
var obj = []
function addPlay() {
    //遍历整个数组生成相应的div
     for (var i = 0; i < player.length; i++) {
        if (player[i] == "平民") {
            obj.push({
                name: "平民",
                death: true
            })
        } else {
            obj.push({
                name: "杀手",
                death: true
            })
        }

        $('<div class="box-content"></div>').appendTo($("main"))
        $('<div class="box-name"></div>').appendTo($(".box-content")[i])
        $('<div class="box-number"></div>').appendTo($(".box-content")[i])
        $('.box-name')[i].innerHTML = player[i];
        $('.box-number')[i].innerHTML = num;
        num++;
    }
}
    console.log(obj)
// 运行函数addPlay
addPlay();
function startGame() {
    window.location.href = '../html/gameFlow.html'
}
sessionStorage.setItem('obj',JSON.stringify(obj))
sessionStorage.setItem('day','1')
// sessionStorage.setItem('click','0')
var clickKill = 0
var clickVote = 0
sessionStorage.setItem('clickKill',clickKill)
sessionStorage.setItem('clickVote',clickVote)

