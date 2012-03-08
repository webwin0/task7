function RenderTable(sel, data, config)
{
	var el = $(sel),
		row,
		html,
		fields = config.fields;
	el.children().remove();
	for (var i in data)
	{
		row = data[i];
		if  (row.hidden == 1)
			continue;
		if (row.age === undefined)	
			row.age = utils.getAge(row.birthday);
		html = '<tr id="row'+row.id+'">'
		for (var j=0, len=fields.length; j < len; j++)
		{
			html += renderTd(fields[j], row[fields[j]]);
		}
		html +='<td nowrap class="last"><i class="edit edit_record hide" title="Редактировать" onclick="table.editRecord('+row.id+')"></i></td>'
		html += '</tr>';
		el.append(html)
	}
	function renderTd(field, val)
	{
		var html = '<td nowrap ',
			type = dataConfig.format[field];
		if (field==dataConfig.ignore)
			return '';
		if (type != undefined)
		{
			if (type == 'number' || type == 'date')
				html += ' align="right"'
		}
		html +=">";
		if (val !== undefined)
			val = _valFormat(val,type);
		else
			val = '';
		html += _trim(val);
		html += "</td>";
		return html
	}
	function _valFormat(val, type)
	{
		if (type == 'number')
			return utils.numberFormat(val,0,',',' ');
		if (type == 'url')
			return _urlFormat(val);
		if (type == 'date')
			return _dateFormat(val);
		if (type == 'city')
			return _dateCity(val);
		if (typeof (val) == 'object')
			return val.join(", ");
		else	
			return val;
	}
	function _trim(val)
	{
		var str = '',
			strip_val = '';
		if (val !== undefined)	
			strip_val = utils.strip_tags(val)	
		if (strip_val.length > dataConfig.maxLength)
		{
			str = val;
			val = '<div class="hint_parent"><span class="hint">'+strip_val.substring(0,dataConfig.maxLength-3) + '...</span><div class="hint_help">'+str+'</div></div>';
		}
		return val;
	}
	function _urlFormat(val)
	{
		var links = [];
		if (typeof val == 'string' )
			val = [val];
	 $.each(val,function(i, val){
		links[i] = '<a href="'+val+'" target="_blank">'+val.replace('http://','')+'</a>';
	});
	return links.join(", ");
	}
	function _dateFormat(val)
	{
		val = val.split('.');  
		if (val.length == 3)			
			return Number(val[0])+' '+dataConfig.months[val[1]-1]+' '+val[2];
		else
			return '';
	}
	function _dateCity(val)
	{
		return dataConfig.cities[val];
	}
	function onHintOver()
	{
		$(this).parents('td').addClass('show_all');
	}
	function onHintOut()
	{
		el.find('td').removeClass('show_all');
	}
	$('.hint').mouseenter(onHintOver)
	$('.hint_help').mouseleave(onHintOut)
}