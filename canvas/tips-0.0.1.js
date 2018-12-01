( function($){
	var tips = {

	}
	var	$tipMask = $('<div>').addClass('tips-mask fadeOut'),
			$tipContent = $('<div>').addClass('tips-content hide'),
			$tipHead    = $('<div>').addClass('tips-head'),
			$tipBody    = $('<div>').addClass('tips-body')
			$tipFoot    = $('<div>').addClass('tips-foot')

	tips.alert = function(msg, func){
		$tipHead.html('<h1 class="title">提示</h1><a href="javascript:void(0)" class="close"></a>')
		$tipBody.html('<div class="text">'+msg+'</div>');
		$tipFoot.html('<div class="tips-btn-group" ><button class="cancel">确定</button></div>')

		$tipContent.append($tipHead)
		$tipContent.append($tipBody)
		$tipContent.append($tipFoot)
		$tipMask.append($tipContent)

		$('body').append($tipMask);

		setTimeout( () => {
			$tipMask.removeClass('fadeOut')
			$tipContent.removeClass('hide')
		}, 40)
		
		$('body').on('click', '.tips-btn-group button', function(){
			$.isFunction(func) ? func(tips) :''
		})
	}
	$('body').on('click', '.close, .tips-btn-group button', () => {
		tips.close()
	})
	
	tips.close = function(){
		$('.tips-content').parent().fadeOut(50)
		setTimeout( () => {
			$('.tips-content').parent().remove()
		}, 200)
		$('.tips-content').addClass('hide').on('transitionend', function(){})
	}

	// setTimeout( () => {
	// 	tips.alert('请选择合理的时间')
	// } , 1000)


	window.tips = tips;
})(jQuery)