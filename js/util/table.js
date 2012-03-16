function Table(conf)
{
	conf = conf || {};
	var config = { 
		sortField : conf.sortField || '',
		sortOrder : conf.sortOrder || '',
		city : conf.city || '',
		recordId : conf.recordId || '',
		q : conf.q || ''},
		tableHead = $(conf.headSelector),
		tbl = $(conf.tableSelector),
		self = this	;
		
	$('#name').keyup(setQuery);
	$('#select_city').change(setCity);
	$('#add_record').click(addRecord);
	tableHead.find('th[data-field]').click(sortByField);
	$('.edit_record').live('click',editRecord);
	$('#form_btn').click(saveRecord)
	function setCity()
	{
		config.city = $(this).val();
		updateTable();
	}
	function setQuery()
	{
		config.q = $(this).val().toLowerCase();
		updateTable();
	}
	function sortByField()
	{
		var field = $(this).attr('data-field');
		config.sortField = field;
		config.sortOrder = config.sortOrder == 'asc' ? 'desc' : 'asc';
		tableHead.find('th').each(function(){
			$(this).removeClass('sort asc desc');
			if ($(this).attr('data-field')==field)
					$(this).addClass('sort '+config.sortOrder)
		})
		eval('data.sort(sortFunctions.sortBy'+config.sortField+')');
		
		if (config.sortOrder == 'desc')
			data.reverse();
		updateTable();
	}
	function editRecord()
	{
		var row,
			id = $(this).attr('row_id');
		var form = new FillForm({titleId:'#form_title',buttonId:'#form_btn',titleText:'Редактировать пользователя',buttonText:'Редактировать',require:['#f_name','#f_description']})
		for (var i in data)
		{
			if (data[i].id == id)
			{
				form.fillData(data[i]);
				break;
			}
		}
	}
	function addRecord()
	{
		var form = new FillForm({titleId:'#form_title',buttonId:'#form_btn',titleText:'Добавить пользователя',buttonText:'Добавить',require:['#f_name','#f_description']})
		form.fillData({id:'',name:'',age:'',salary:'',city:'1',phones:[],emails:[],sites:[],birthday:'',description:''});
	}
	function saveRecord()
	{
		var field, row = {}, name;
		$('#f_birthday').val($('#f_birthday').attr('src_value'));
		var form_data = $('#data_form').serializeArray();
		for (var i in form_data)
		{
			field = form_data[i];
			if (field.name.indexOf('[]')==-1)
				row[field.name] = utils.strip_tags(field.value);
			else
			{
				name = field.name.replace('[]','');
				if (row[name] !== undefined)
					len = row[name].length;
				else
				{
					row[name] = [];
					len = 0;
				}
				if (field.value != '')
					row[name][len] = utils.strip_tags(field.value);
			}
		}
		if (row.id == '')
		{
			row.id = ++dataConfig.lastId
			data.push(row);
		}
		else
		{
			for (var i=0, len=data.length; i < len; i++)
			{
				if (data[i].id ==row.id)
					data[i] = row;
			}
		}
		modalDialog.hide();
		updateTable();
		storage.setItem('data',JSON.stringify(data))
		storage.setItem('dataConfig',JSON.stringify(dataConfig))
	}
	function updateTable()
	{
		updateFilter();
		if (!history.pushState) 
			return;
		var url = location.protocol + '//' + location.host + location.pathname + prepareParams();
		history.pushState(config, "", url);
		var renderTable = new RenderTable('#users_data',data, dataConfig);
	}
	function updateFilter()
	{
		for (i in data)
		{
			if (checkCity(data[i].city) && checkQuery(data[i].name, data[i].description))
				data[i].hidden = 0;
			else
				data[i].hidden = 1;
		}
		function checkCity(val)
		{
			if (config.city == '' || val == config.city)
				return 1;
			else
				return 0;
		}
		function checkQuery(name,descripton)
		{
			if ( name.toLowerCase().indexOf(config.q) != -1 ||  descripton.toLowerCase().indexOf(config.q) != -1)
				return 1;
			else
				return 0;
		}
	}
	function prepareParams()
	{
		var params = []
		for (var i in config)
		{
			if (config[i] != '')
				params.push(i+'='+config[i])
		}
		return '?'+params.join('&');
	}
	$(document).keyup(modalDialog.hideModalDialog);
	utils.addEvent(window,'popstate',function(event){
		if (event.state) { 
			config = event.state; 
			table = new Table(config);
		}
		else 
		{
			table = new Table(config);
			history.replaceState(config, "", location.protocol + '//' + location.host + location.pathname + prepareParams());
		}
	});
	$(window).scroll(function(){
  		var scrollPos = utils.getScrollOffsets(),
  		 	elementPos = utils.findAbsPositon(tableHead.get(0));// tableHead.offset();
  		if (elementPos !== undefined && elementPos.top > 0 )
  			tableHead.attr('data-top',elementPos.top)
  		if (scrollPos.top > tableHead.attr('data-top'))
  		{
  			tableHead.width($('.table').width());
  			tableHead.addClass('fixed');
  			tableHead.find('th').each(function(i){
  				td_width = $('.table tbody td').eq(i).width()
  				th_width = $('.table thead th').eq(i).innerWidth(td_width)
  				if (td_width != th_width)
  					$('.table thead th').eq(i).width(td_width)
  			})
  		}
  		else
  		{
  			tableHead.removeClass('fixed');
  		}
  	});
}