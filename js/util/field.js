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
			el.next().click();
		}
		data = [];
		val = '';
	}
	el.wrap('<div></div>').after(' <input type="button" class="control" value="+">')	
	el.next().click(onAddField)
	if (data.length > 0)
		this.addValues(data)
	
	function onAddField()
	{
		if (index <= max)
		{
			var div = $(this).parent();
			el.parent().clone(true).insertAfter(div)
			div.next().find('input:text, input:email, input:url').val(el.val() || val).attr('name',name).end().find('input:button').val('-').unbind('click',onAddField).bind('click',onDelField);
			el.val('').focus();
			index++;
		}
		if (index == max+1)
			el.parent().hide('slow');
	}
	function onDelField()
	{
		if (index > 1)
		{
			$(this).parent().remove();
			index--;
		}
		if (index <= max)
			el.parent().show('slow');
	}
}
