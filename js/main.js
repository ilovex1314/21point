//解决对象浅拷贝问题
Object.clone = function(sObj){   
    if(typeof sObj !== "object"){   
        return sObj;   
    }   
    var s = {};   
    if(sObj.constructor == Array){   
        s = [];   
    }   
    for(var i in sObj){   
        s[i] = Object.clone(sObj[i]);   
    }   
    return s;   
} 

var imgSrc = [];
for(var i = 0; i < 53; i ++ ){
	str = "../img/" + i + ".jpg";
	imgSrc.push(str);
}
//玩家计数对象
var indexs = {};
indexs.totle = [];
indexs.remain = Object.clone(imgSrc);
indexs.sum = 0;
indexs.k = 0;
//电脑计数对象
var com = {};
com.totle = [];
com.remain = indexs.remain;
com.sum = 0;
com.k = 0;
com.flag = true;


var init = function(){
	var str = '';
	var j = 2;//从第3张牌开始
	var c = 2;//电脑
	
	var start = $('#start');
	var playImg = $('.mine .imgBox');
	var comImg = $('.computer .imgBox');
	var show = $('.showResult').eq(0);
	var mine = $('#mine');
	var computer = $('#computer');
	var holdon = $('#holdon');
	var end = $('#end');
	var finall = $('#finall');
	var showc = $('#showc');

	

	start.on('click', function(){

		starter();
	  	
	});
	holdon.on('click', function(){

		holdoner(mine, j++, show, indexs);

		//处理电脑是否要牌
		if(com.flag){
			//玩家没有爆牌的情况下，电脑可进行要牌选择，否则电脑获胜
		  	if(show.text() != '爆掉了'){
		  		//判断是否有价值要牌，超过50%胜率就要牌
		  		//电脑可见你的第2张牌到最后一张牌，已知自己所有牌
		  		if(willWin(indexs.sum - result(indexs.totle[0]), com.sum)){
		  			holdoner(computer, c++, showc, com);
		  		}else{
		  			showc.text('电脑放弃要牌');
		  			//放弃后不能再次要牌
		  			com.flag = false;
		  		}
		  	}else{
		  		finall.text('您输了，请重新开始');
		  	}
		}
	  	

	});
	end.on('click', function(){

		//电脑仍有可能会继续要牌
		while(com.flag && showc.text() != '爆掉了'){
			console.log('in');
			if(willWin(indexs.sum - result(indexs.totle[0]), com.sum)){
				holdoner(computer, c++, showc, com);
			}else{
				showc.text('电脑放弃要牌');
				showc.css('display', 'block');
	  			//放弃后不能再次要牌
	  			com.flag = false;
			}
		}

		ender();

	})

	var starter = function(){
		if(start.html() == '开始'){

			//玩家方初始化
			rand(indexs, playImg.eq(0));
			rand(indexs, playImg.eq(1));
		  	holdon.css('display', 'inline-block');
		  	start.html('重新开始');
		  	indexs.totle.forEach(function(value){
		  		indexs.sum += result(value);
		  	})
		  	hasAnum(indexs, 1);
		  	isOut(indexs);
		  	show.text(indexs.sum);



		  	//电脑方初始化
		  	rand(com, comImg.eq(0));
		  	rand(com, comImg.eq(1));
		  	comImg.eq(0).css('backgroundImage', 'url("../img/0.jpg")');
		  	com.totle.forEach(function(value){
		  		com.sum += result(value);
		  	})
		  	hasAnum(com, 1);
		  	isOut(com);
		  	showc.text(com.sum);


		}else{
			window.location.reload();
		}
	}

	var holdoner = function(ele, j, rs, index){
		var img = '<div class="imgBox"></div>';
		var aa = ele.append(img).children().last();

		rand(index, aa);
		index.sum += result(index.totle[j]);
		hasAnum(index, j);
	  	if(isOut(index)){
	  		rs.text('爆掉了');
	  	}else{
	  		rs.text(index.sum);
	  	}

	  	
	  	
	}

	var ender = function(){
		if(show.text() == '爆掉了'){
			finall.text('您输了，请重新开始');
		}else{
			if(showc.text() == '爆掉了'){
				finall.text('您赢了');
			}else{
				if(indexs.sum > com.sum){
					finall.text('您赢了');
				}else{
					finall.text('您输了，请重新开始');
				}
			}
		}
		showc.css('display', 'block');
		finall.css('display', 'block');
		comImg.eq(0).css('backgroundImage', 'url("../img/' + com.totle[0] + '.jpg")');
	}

}



//计算牌的点数
var result = function(num){
	var rs = 0
	switch(num%13){
	case 1: 
		rs = 11;
		break;
	case 2:
		rs = 2;
		break;
	case 3:
		rs = 3;
		break;
	case 4:
		rs = 4;
		break;
	case 5:
		rs = 5;
		break;
	case 6:
		rs = 6;
		break;
	case 7:
		rs = 7;
		break;
	case 8:
		rs = 8;
		break;
	case 9:
		rs = 9;
		break;
	default:
		rs = 10;
		break;
	}
	return rs;
}
//为本题实现的随机函数
var rand = function(index, ele){
	var data = index.remain;
	var num = Math.round(Math.random()*51) + 1;
	while(data[num] == null){
		num = Math.round(Math.random()*51) + 1;
	}

	var imgSc = "url('../img/" + data[num] + "')";
  	data[num] = null;
  	index.totle.push(num);
  	ele.css('backgroundImage', imgSc);
}


//检测是否超出21点(检查A的特异性取1或11)
//检测还剩下几个A没有处理
var hasAnum = function(index, j){
	if(j == 1){
		index.totle.forEach(function(value){
			if(value%13 == 1){
				index.k++;
			}
		})
	}else{
		if(index.totle[j]%13 == 1){
			index.k ++;
		}
	}
}
//判断手牌是否爆掉
var isOut = function(index){
	if(index.sum <= 21){
		return false;
	}else{
		if(index.k == 0){
			return true;
		}else{
			index.sum -= 10;
			index.k --;
			return isOut(index);
		}
	}
}

//电脑判断是否有价值要牌
//电脑要估计玩家那张暗牌的可能值
var willWin = function(player, computer){
	var key = 0;
	//取出牌库中的牌
	var lessImg = indexs.remain;
	//估计那张暗牌的值，取100次随机数取平均
	var sum = 0
	for(var i = 0; i < 10; i ++ ){
		var num = Math.round(Math.random()*51) + 1;
		while(lessImg[num] == null){
			num = Math.round(Math.random()*51) + 1;
		}
		sum += result(num);
	}
	player += Math.round(sum/10);
	var bigger = player - computer;
	if(bigger < 0){
		//目前就比玩家大，要牌价值减少
		key -= 30;
	}else{
		//从中取100次随机数，若超过bigger的次数k++
		for(var i = 0; i < 100; i ++ ){
			var num = Math.round(Math.random()*51) + 1;
			while(lessImg[num] == null){
				num = Math.round(Math.random()*51) + 1;
			}
			if(result(num) > bigger){
				key++;
			}
		}
	}
	if(computer + Math.round(sum/100) < 21){
		//不会爆牌
		key += 60;
	}else{
		key -= 50;
	}

	
	
	return key > 50 ? true : false;
}



init();
