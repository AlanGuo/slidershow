'use strict';
/*util method*/
var createJudgeFunc = function(vendor) {
    return function(){
        var dummyStyle = document.createElement('div').style;
        var v = vendor.prefix.split(','),
            t,
            i = 0,
            l = v.length;

        for (; i < l; i++) {
            t = v[i] + vendor.words;
            if (t in dummyStyle) {
                return v[i].substr(0, v[i].length - 1);
            }
        }

        return false;
    };
};

var prefixCSS = function(style,judgeFunc) {
    var vendor = judgeFunc();
    if (vendor === '') {return style;}
    style = style.charAt(0) + style.substr(1);
    return vendor + style;
};


//开始动画
var startAnimation = function(lis,index){
    if(lis[index]){
        var elems = lis[index].querySelectorAll('.readytoanimate');
        for(var i=0;i<elems.length;i++){
            elems[i].className = elems[i].className.replace(' none','');
            elems[i].clientHeight = elems[i].clientHeight;
            elems[i].className += ' animate';
        }
    }
};
//停止动画
var stopAnimation = function(lis,index){
    if(lis[index]){
        var elems = lis[index].querySelectorAll('.animate');
        for(var i=0;i<elems.length;i++){
            elems[i].className = elems[i].className.replace(' animate','');
            elems[i].className += ' none';
        }
    }
};

var transformJudgeFunc =  createJudgeFunc({
    prefix:'t,-webkit-t,-moz-t,-ms-t,-o-t',
    words:'ransform'
});
var transformCSS = prefixCSS('transform',transformJudgeFunc);

/*util method*/

/**
 * SliderShow
 * @class
 * @param {Element|String} wrapper/id,元素对象或者元素id
 */
var SliderShow = function(ul,option){
	option = option || {};
	option.offset = option.offset || 30;
	option.direction = option.direction || 'vertical';
	option.slideTime = option.slideTime || 600;

	ul = ul.nodeName ? ul : document.getElementById(ul);
	var lis = ul.querySelectorAll('.slider-wrapper > .slider-item');
	var index = 0,
	clientHeight = document.documentElement.clientHeight,
	clientWidth = document.documentElement.clientWidth,
	length = lis.length;

    ul.className = '';
    ul.style.height = clientHeight*length + 'px';
    ul.style.width = clientWidth + 'px';

    //初始化视窗高度
    for(var i=0;i<lis.length;i++){
        lis[i].style.height = clientHeight + 'px';
        lis[i].style.width = clientWidth + 'px';
        lis[i].style.top = clientHeight*i + 'px';
    }

    lis[0].scrollIntoView();
	ul.style[transformCSS] = 'translateY(0px) translateZ(0)';
	startAnimation(lis,0);

	var isTouch = false;
	var startPos = {
	    x: 0,
	    y: 0
	};

	ul.addEventListener('touchstart',function(evt){
		isTouch = true;

		startPos = {
	        x: evt.changedTouches[0].clientX,
	        y: evt.changedTouches[0].clientY
	    };

	    evt.preventDefault();
	});

	ul.addEventListener('touchmove',function(evt){
	    evt.preventDefault();
	});

	ul.addEventListener('touchend',function(evt){
	    if(isTouch){
			isTouch = false;

			//var disX = evt.changedTouches[0].clientX - startPos.x;
	        var disY = evt.changedTouches[0].clientY - startPos.y;

	        if(Math.abs(disY) > option.offset){
	        	if(disY > 0){
	        		if(index > 0){
		        		//向上滑
		        		index --;
		        		ul.style[transformCSS] = 'translateY('+(-clientHeight*index)+'px) translateZ(0)';

	                    (function(i){
	                        setTimeout(function(){
	                            stopAnimation(lis,i+1);
	                            startAnimation(lis,i);
	                        },option.slideTime);
	                    })(index);
		        	}
	        	}
	        	else if(disY<0){
	        		if(index < length-1){
		        		//向下滑
		        		index ++;
		        		ul.style[transformCSS] = 'translateY('+(-clientHeight*index)+'px) translateZ(0)';
	                    (function(i){
	                        setTimeout(function(){
	                            stopAnimation(lis,i-1);
	                            startAnimation(lis,i);
	                        },option.slideTime);
	                    })(index);
		        	}
	        	}
	        }
	    }
	    evt.preventDefault();
	});
};