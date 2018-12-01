(function($){
	
	function renderDate(monthDate, showYear, showMonth){
		var html = '',
				date = new Date(),
				_year = date.getFullYear(),
				_month = date.getMonth()+1,
				_date = date.getDate();
		console.log(_year, _month, _date, showYear, showMonth)
		$(monthDate).each( function(v, i){

			if(showMonth <= _month && showYear <= _year){
				if(i.date < _date){
					html+='<li class="time disabled"><b>&nbsp;</b><em>'+i.showDate+'</em><p>￥200</p></li>'
				} else if( showMonth < _month || showYear < _year) {
					html+='<li class="time disabled"><b>&nbsp;</b><em>'+i.showDate+'</em><p>￥200</p></li>'
				} else {
					html+='<li class="time"><b>&nbsp;</b><em>'+i.showDate+'</em><p>￥200</p></li>'
				}
			} else {
				html+='<li class="time"><b>&nbsp;</b><em>'+i.showDate+'</em><p>￥200</p></li>'
			}

			$('.datepicker-body ul').html(html)
		})
	}

	function renderMonthAndYear(month, year){
		$(".datepicker-head .month").text(month < 10 ? '0'+month: month)
		$(".datepicker-head .year").text(year < 10 ? '0'+year: year)
	}

	$(document).ready( function(){


		var monthDate = window.datepicker.getMonthData(2017, 12);
		var showMonth = parseInt($(".datepicker-head .month").text()),
				showYear  = parseInt($(".datepicker-head .year").text());

		renderDate(monthDate, showYear, showMonth);

		$('.left').on('click', function(){
			if(showMonth == 1){
				showMonth = 12;
				showYear--;
			} else {
				showMonth--;
			}
			renderDate(window.datepicker.getMonthData(showYear, showMonth), showYear, showMonth)
			renderMonthAndYear(showMonth, showYear)
		})

		$('.right').on('click', function(){
			if(showMonth==12){
				showMonth = 1;
				showYear++
			} else {
				showMonth++;
			}
			renderDate(window.datepicker.getMonthData(showYear, showMonth), showYear, showMonth)
			renderMonthAndYear(showMonth, showYear)
		})
	})
	
	var clicked = 0;
	var firstIndex, lastIndex;
	$(".datepicker-body").on('click', '.time', function(){

		if($(this).hasClass("disabled")) return ;

		if(clicked == 0){
			firstIndex = $(this).index()
		} else {
			lastIndex = $(this).index();
		}
		if(lastIndex < firstIndex){

			tips.alert('请选择合理的入驻时间')
			lastIndex=0;
			return
		}
		var cls = $(this).hasClass("selected")

		if(cls){
			$(this).removeClass("selected")
		} else {
			$(this).addClass("selected")
			$(this).find('b').text(clicked == 0 ? '入住' : '离店')
			if(clicked >= 1){
				clicked=0
			} else {
				clicked++
			}	


			if(lastIndex != undefined){
				var line = lastIndex - firstIndex;
			
				$(".datepicker-body ul .time").each( function(){
					if($(this).index() <= lastIndex && $(this).index() >= firstIndex){
						$(this).addClass('inline')
					} else {
						console.log('b')
					}
				})
				
			}
		}
	})

	$(".close").on('click', () => {
		tips.close()
	})
})(jQuery)