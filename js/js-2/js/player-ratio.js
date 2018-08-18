function clear() {
    sessionStorage.clear()
}
clear();
//跳转到玩家配比页面
var inputNumber = document.getElementById("input-num");
var rangeNumber = document.getElementById("range-num");
var a = 0;
//玩家人数输入框与滚动条同步
function getName() {
    if (inputNumber.value >= 4 && inputNumber.value <= 18) {
        rangeNumber.value = inputNumber.value;
    } else if (inputNumber.value < 4) {
        inputNumber.value = 4;
        alert("玩家人数过少");
    } else {
        inputNumber.value = 18;
        alert("玩家人数过多");
    }
}
//滚动条改变玩家人数
function change() {
    inputNumber.value = rangeNumber.value;
    a = 1;
}
//减号按钮与滚动条同步
function left_btn() {
    rangeNumber.value--;
    if (inputNumber.value <= 4) {
        alert("人数不足，叫上你的小伙伴一起来玩吧！");
    } else {
        inputNumber.value = rangeNumber.value;
    }
}
//加号按钮与滚动条同步
function right_btn() {
    rangeNumber.value++;
    if (inputNumber.value >= 18) {
        alert("哎呀！人数过多,请分组玩吧!")
    } else {
        inputNumber.value = rangeNumber.value;
    }
}
//生成div内的玩家数
function addPlayer() {
    var ratioAll = document.getElementById("ratio");
    var kill = document.getElementsByClassName("killerCss");
    var citizen = document.getElementsByClassName("peopleCss");
    for (var y = 0; y < kill.length; x++) {
        ratioAll.removeChild(kill[y]);
    }
    for (var y = 0; y < citizen.length; x++) {
        ratioAll.removeChild(citizen[y]);
    }
    var x = inputNumber.value;
    var people;
    var killer;
    if (x >= 4 && x <= 5) {
        killer = 1;
        people = x - 1;
    } else if (x >= 6 && x <= 8) {
        killer = 2;
        people = x - 2;
    } else if (x >= 9 && x <= 11) {
        killer = 3;
        people = x - 3;
    } else if (x >= 12 && x <= 15) {
        killer = 4;
        people = x - 4;
    } else {
        killer = 5;
        people = x - 5;
    }

    var allArr = [];
    for (var y = 0; y < killer; y++) {
        // allArr.push(0);
        allArr.push("杀手");
    }

    for (var y = 0; y < people; y++) {
        // allArr.push(2);
        allArr.push("平民");
    }
    sessionStorage.setItem("all", JSON.stringify(allArr));
    for (var y = 0; y < allArr.length; y++) {
        if (allArr[y] == "杀手") {
            var para = document.createElement("span");
            para.classList.add("killerCss");
            para.innerHTML = "杀&nbsp;&nbsp;&nbsp;&nbsp;手&nbsp;&nbsp;1&nbsp;&nbsp;人"
            var element = document.getElementById("ratio");
            element.appendChild(para);

        } else {
            var para = document.createElement("span");
            para.classList.add("peopleCss");
            para.innerHTML = "平&nbsp;&nbsp;&nbsp;&nbsp;民&nbsp;&nbsp;1&nbsp;&nbsp;人"
            var element = document.getElementById("ratio");
            element.appendChild(para);
        }
    }
    a = 0
}
 var all = sessionStorage.getItem('all')
$('.go').click(function () {
    if (sessionStorage.getItem('all')) {
        if (a == 0) {
            window.location.href = "../html/passon-1.html";
        } else {
            alert("请设置正确的玩家人数")
        }
    }else{
        alert('请输入玩家人数')
    }
})