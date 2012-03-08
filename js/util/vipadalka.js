function Vipadalka(params)
{
	var elements = $(params.element),
		defaultValue =  'Виберіть місто',
		defaultInputValue = 'або введіть інше',
		self = this;
		
	elements.each(function(){
		var itemsList = [],
			itemsLimit = params.itemsLimit || 7,
			element = $(this),
			selectedValue = element.find('option:selected').text() || defaultValue;
		element.find('option').each(function(i){
			itemsList[i] = {city:$(this).text().trim(), id:$(this).val()}
		})
		element.hide();
		
		var id = "vipadalka"+(new Date()).getTime();
		var str = '<div class="vipadayka" id="'+id+'">';
		str +='<div class="button"><div class="text">'+selectedValue+'</div></div>';
		str +='<div class="sep"></div>';
		str +='<ul class="list">';
		var itemClass = '';
		for (i in itemsList) 
		{
			if (i < itemsLimit) {
				itemClass = i <= 1 ? 'main': 'other';
				str += '<li class="'+itemClass+'" data-value="'+itemsList[i].id+'">'+itemsList[i].city+'</li>';
				if (i==1)
					str += '<li class="input"><input type="text" value="" placeholder="'+defaultInputValue+'" /></li>';
			}
		}
		str +='</ul>';
		str +='</div>';
		element.after(str);
		
		function hideVipadalka()
		{
			$('#'+id).removeClass('opened');
			$('#'+id+' .list').hide();
		}
		function showVipadalka()
		{
			$('#'+id).addClass('opened');
			$('#'+id+" .list").show();
		}
		function updateSelect(text, val)
		{
			var text = $('#'+id+' .selected').text().trim() || text,
				val =  $('#'+id+' .selected').attr('data-value') || val; 
			element.find('option').removeAttr('selected');	
			element.find('option[value='+val+']').attr('selected',true);
			$('#'+id+' .button .text').text(text);
		}
		function sortByName(a, b){
			var aName = a.city.toLowerCase();
		  	var bName = b.city.toLowerCase(); 
		  	return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
		}
		self.setVal = function(text, val)
		{
			updateSelect(text, val);
		}
		$('#'+id+" .button").click(function(){
			if ($('#'+id).hasClass('opened')) {
				hideVipadalka();
			}
			else {
				showVipadalka();
			}
		})
		$('#'+id+' li').live('click',function(){
			if (!$(this).hasClass('input')) {
				$('#'+id+' li').removeClass('selected');
				$(this).addClass('selected');
				updateSelect();
				hideVipadalka();
			}
		})
		$('#'+id+' input').live('focus',function(e) {
			if (defaultInputValue == $(this).val())
				$(this).val('')
		})
		
		
		$('#'+id+' input').live('keyup',function(e) {
			if (e.which != 40 && e.which != 38 && e.which != 13)	
			{
				$('#'+id+' .other').remove();
				itemsList.sort(sortByName);
	
				if ($(this).val().length > 0)
				{
					var enterValue = $(this).val().toLowerCase(),
						enterValueLength = $(this).val().length;
					$.each(itemsList, function(i,val){
						if (val.city.substring(0, enterValueLength).toLowerCase() == enterValue  && val.main != 1) {
							$('#'+id+' .list').append('<li class="other" data-value="'+val.id+'">'+val.city+'</li>')
						}
					})
					$('#'+id+' li').removeClass('selected');
					$('#'+id+' .other:first').addClass('selected');
				}
				else
				{
					$.each(itemsList, function(i,val){
						if (i < itemsLimit - 2 && val.main != 1)
							$('#'+id+' .list').append('<li class="other" data-value="'+val.id+'">'+val.city+'</li>')
					})
				}
			}
			if (e.which==13) { //enter
				if ($('#'+id+' .selected').length > 0) {
					updateSelect();
					hideVipadalka();
				}
			}
			else if (e.which==38) { //up
				var selectedItem = $('#'+id+' li.selected')
				if (selectedItem.prev().hasClass('other')) {
					selectedItem.removeClass('selected');
					selectedItem.prev().addClass('selected');
				}
			}
			else if (e.which==40) { //down
				var selectedItem = $('#'+id+' li.selected')
				if (selectedItem.next().hasClass('other')) {
					selectedItem.removeClass('selected');
					selectedItem.next().addClass('selected');
				}
			}
		})
		
		$(document).click(function(event){
			var event = event || window.event;
			event.target = event.target ||  event.srcElement || document;
			if ($(event.target).parents('.vipadayka').length == 0) {
				hideVipadalka();
			}
		})
	})
	
}
