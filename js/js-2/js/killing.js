//获取对象数组
var obj = JSON.parse(sessionStorage.getItem("obj"));
//定义变量num用于玩家号码牌
var num = 1
//获取到天数
var day = sessionStorage.getItem('day')
//定义deathkill用于表示存活的杀手数
var deathKill = 0;
//定义deathcivilian用于表示存活的平民数
var deathCivilian = 0;
//定义函数addplay用于循环出玩家div
function addPlay() {
    for (var i = 0; i < obj.length; i++) {
        $('<div class="box-content"></div>').appendTo($("main"))
        $('<div class="box-name"></div>').appendTo($(".box-content")[i])
        $('<div class="box-number"></div>').appendTo($(".box-content")[i])
        $('.box-name')[i].innerHTML = obj[i].name;
        $('.box-number')[i].innerHTML = num;
        num++;
    }
}
//运行函数addPlay
addPlay();
//定义变量days用于判断玩家是否可选
var days = 1;
//定义变量deathclick用于点击处
var deathClick;
//判断是否是杀人页面
if (JSON.parse(sessionStorage.getItem('killing'))) {
    // var deathObj = JSON.parse(sessionStorage.getItem('deathObj'))
    // console.log(obj)
    //for循环遍历对象数组，如果玩家状态为死亡添加相应样式
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].death == false) {
            $('.box-name').eq(i).css("background-color", "gray")
        }

    }
    //节点添加文字
    $('.headText').html('杀手杀人')
    //点击玩家div
    $('.box-content').click(function (e) {
        //定义变量cli为点击处
        var cli = $(e.target.parentNode).index();
        //deathclick变为点击处
        deathClick = cli;
        // console.log(obj[cli].name)
        //判断div是否可以点击，控制点击后的样式
        if (obj[cli].name == "平民" && obj[deathClick].death == true) {
            for (i = 0; i < obj.length; i++) {
                $('.box-content').css("border-color", "#fff")
                this.index = i;
                $(this).css("border-color", "red")
            }
            days = 2
        } else if (obj[cli].name == "杀手" && obj[deathClick].death == true) {
            $('.box-content').css("border-color", "#fff")
            alert('请不要自相残杀')
            days = 1
        } else {
            $('.box-content').css("border-color", "#fff")
            alert('请不要鞭尸')
        }
        // if (obj[deathClick].death == true) {
        //     for (i = 0; i < obj.length; i++) {
        //         $('.box-content').css("border-color", "#fff")
        //         this.index = i;
        //         $(this).css("border-color", "red")
        //     }
        //     select = 2
        // } 

    })
    //点击确认杀人
    var clickKill = JSON.parse(sessionStorage.getItem("clickKill"))
    $('.footBtn').click(function () {
        //判断有无选择，选择的是不是平民
        if (days == 2) {
            clickKill++
            sessionStorage.setItem("clickKill",clickKill)
            //定义变量kilclick用于判断流程页面杀手杀人按钮背景色是否改变
            var kilClick = 1;
            //定义变量flow用于判断流程页面的步骤
            var flow = 1;
            //点击确认投票，点击处对象状态变为死亡
            obj[deathClick].death = false;
            //存储flow
            sessionStorage.setItem('flow', JSON.stringify(flow))
            //存储kilclick
            sessionStorage.setItem('kilClick', JSON.stringify(kilClick))
            //存储杀完人后的对象数组
            sessionStorage.setItem('obj', JSON.stringify(obj))
            if (JSON.parse(sessionStorage.getItem('deathObj'))) {
                var deathObj = JSON.parse(sessionStorage.getItem('deathObj'))
            } else {
                var deathObj = []
            }
            console.log(deathObj)
            deathClick++
            var clickDeath = {
                number: deathClick,
                name: obj[deathClick - 1].name
            }
            deathObj.push(clickDeath)
            sessionStorage.setItem('deathObj', JSON.stringify(deathObj))
            //跳转到流程页面
            //for循环遍历对象数组，存在存活的杀手或平民就分别加1
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].death == true && obj[i].name == "杀手") {
                    deathKill++
                }
                if (obj[i].death == true && obj[i].name == "平民") {
                    deathCivilian++
                }
            }
            // console.log(deathKill)
            // console.log(deathCivilian)
            //把存活的杀手数和平民数存储起来
            sessionStorage.setItem('deathKill', JSON.stringify(deathKill))
            sessionStorage.setItem('deathCivilian', JSON.stringify(deathCivilian))
            //胜利条件，如果存活的杀手数为0，杀手胜利，如果存活的杀手数大于等于存活的平民数，则杀手胜利
            if (deathKill === 0) {
                alert('平民胜利')
                window.location.href = '../html/voctory.html'
            } else if (deathKill >= deathCivilian) {
                alert('杀手胜利')
                window.location.href = '../html/voctory.html'
            } else {
                window.location.href = '../html/gameFlow.html'
            }


        } else {
            alert("请杀人")
        }
    })

}
//判断是否是投票页面
if (JSON.parse(sessionStorage.getItem('vote'))) {
    //获取对象数组
    var obj = JSON.parse(sessionStorage.getItem('obj'))
    //for循环遍历对象数组，改变死亡状态玩家的div样式
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].death == false) {
            $('.box-name').eq(i).css("background-color", "gray")
        }

    }
    //添加投票页面的文字
    $('.headText').html('全民投票')
    $('.ensureBtn').html('投死')
    //声明变量select用于判断玩家是否可以点击
    var select;
    $('.box-content').click(function (e) {
        //获取点击处
        var vote = $(e.target.parentNode).index();
        //点击处赋给deathclick
        deathClick = vote;
        //判断点击处是否可以点击
        if (obj[deathClick].death == true) {
            for (i = 0; i < obj.length; i++) {
                $('.box-content').css("border-color", "#fff")
                this.index = i;
                $(this).css("border-color", "red")
            }
            select = 2
        } else {
            $('.box-content').css("border-color", "#fff")
            alert('请不要鞭尸')
            select = 1
        }
    })
    var clickVote = JSON.parse(sessionStorage.getItem("clickVote"))
    //投票点击事件
    $('.footBtn').click(function (e) {
        console.log(deathClick)
        //移除kilclick，以免第二天的杀手杀人选项背景色改变
        sessionStorage.removeItem('kilClick')
        //移除变量vote，以免杀人页面和投票页面混淆
        sessionStorage.removeItem('vote')
        // var vote = $(e.target.parentNode).index();
        // deathClick = vote;
        // console.log(vote)
        //判断有无选择投票对象
        if (select == 2) {
            clickVote++
            sessionStorage.setItem("clickVote",clickVote)
            //改变点击处对象状态变为死亡
            obj[deathClick].death = false
            //存储改变了的对象数组
            sessionStorage.setItem('obj', JSON.stringify(obj))
            if (JSON.parse(sessionStorage.getItem('voteObj'))) {
                var voteObj = JSON.parse(sessionStorage.getItem('voteObj'))
            } else {
                var voteObj = []
            }
            deathClick++
            var clickDeath = {
                number: deathClick,
                name: obj[deathClick - 1].name
            }
            voteObj.push(clickDeath)
            sessionStorage.setItem('voteObj', JSON.stringify(voteObj))
            //跳转到流程页面
            //for循环遍历对象数组，存在存活的杀手或平民就分别加1
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].death == true && obj[i].name == "杀手") {
                    deathKill++
                }
                if (obj[i].death == true && obj[i].name == "平民") {
                    deathCivilian++
                }
            }
            // console.log(deathKill)
            // console.log(deathCivilian)
            //把存活的杀手数和平民数存储起来
            sessionStorage.setItem('deathKill', JSON.stringify(deathKill))
            sessionStorage.setItem('deathCivilian', JSON.stringify(deathCivilian))
            //胜利条件，如果存活的杀手数为0，杀手胜利，如果存活的杀手数大于等于存活的平民数，则杀手胜利
            if (deathKill === 0) {
                alert('平民胜利')
                window.location.href = '../html/voctory.html'
            } else if (deathKill >= deathCivilian) {
                alert('杀手胜利')
                window.location.href = '../html/voctory.html'
            } else {
                //增加天数
                day++
                //存储天数
                sessionStorage.setItem('day', day)
                window.location.href = '../html/gameFlow.html'
            }

        } else {
            alert('请投票')
        }
    })
}
//对杀人和投票两者都生效的点击事件
// $('.footBtn').click(function () {
// })