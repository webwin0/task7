function Range(sel,config)
{
	var el = $(sel),
		step = config.step || 1,
		min = config.min || 0,
		max = config.max || 100,
		width = config.width || 1000,
		leftTip =  config.leftTip || false,
		rightTip =  config.rightTip || false,
		css = config.css || {input: 'range',slider: 'slider',progress: 'progress',handle: 'handle' },
		callback = config.callback || function(){};
	el.attr({step:step, min:min, max:max}).css({width:width});
	el.rangeinput({css:css});
	$(sel).bind('onSlide change',function(){
		setTimeout(callback, 200)
	})
	if (leftTip)
		$(sel).prev().append('<div class="left_tip">'+min+'</div>');
	if (rightTip)
		$(sel).prev().append('<div class="right_tip">'+max+'</div>');
}