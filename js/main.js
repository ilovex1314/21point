var imgSrc = [];
for(var i = 0; i < 53; i ++ ){
	str = "../img/" + i + ".jpg";
	imgSrc.push(str);
}


var init = function(){
	var str = '',
		index,
		totle;
	
	var start = $('#start');
	var left = $('#left');
	var right = $('#right');
	var show = $('.showResult').eq(0);

	start.on('click', function(){

	  	index = rand(left, right);

	  	totle = result(index.indexLeft) + result(index.indexRight);
	  	show.text(totle);
	});
}
//计算2张牌的点数之和
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
var rand = function(ele1, ele2){
	var data = Object.clone(imgSrc);
	// console.log(imgSrc);
	var index = {};
	index.indexLeft = Math.round(Math.random()*51) + 1;
  	var imgSc = "url('../img/" + data[index.indexLeft] + "')";
  	data[index.indexLeft] = null;
  	ele1.css('backgroundImage', imgSc);

  	index.indexRight = Math.round(Math.random()*51) + 1;
  	while(data[index.indexRight] == null){
  		index.indexRight = Math.round(Math.random()*51) + 1;
  	}
  	imgSc = "url('../img/" + data[index.indexRight] + "')";
  	ele2.css('backgroundImage', imgSc);

  	return index;
}
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

init();
