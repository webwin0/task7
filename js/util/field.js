function Field (sel, config)
{
	var el = $(sel),
		max = config.max || 5,
		data = config.data || [],
		index = 1,
		name = config.name,
		val = '';
	this.addValues = function(data)
	{
		//del old values
		while(el.parent().next().is('div'))
		{
			el.parent().next().remove();
			index--;
		}
		//add new values
		for (var i in data)
		{
			val = data[i];
			if (i==0)
				el.val(val)
			else
				el.next().click();
		}
		data = [];
		val = '';
	}
	el.wrap('<div></div>').after(' <input type="button" class="control" value="+">');
	el.parent().wrap('<span></span>');	
	el.next().click(onAddField)
	if (data.length > 0)
		this.addValues(data)
	
	function onAddField()
	{
		if (index < max)
		{
			var div = $(this).parent(),
				globalDiv = $(this).parent().parent();
			el.parent().clone(true).appendTo(globalDiv)
			$('div',globalDiv).last().find('input:text, input:email, input:url').val(val || '').attr({'name':name, id:sel+index}).focus().end().find('input:button').val('-').unbind('click',onAddField).bind('click',onDelField);
			//el.val('').focus();
			index++;
		}
	}
	function onDelField()
	{
		if (index > 1)
		{
			$(this).parent().remove();
			index--;
		}
	}
}
