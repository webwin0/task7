function Table(conf)
{
	conf = conf || {};
	var config = { 
		sortField : conf.sortField || '',
		sortOrder : conf.sortOrder || '',
		city : conf.city || '',
		recordId : conf.recordId || '',
		q : conf.q || ''},
		tableHead = document.getElementsByClassName('head')[0];
	
	this.setCity = function(city)
	{
		config.city = city;
		updateTable();
	}
	this.setQuery = function(q)
	{
		config.q = q.toLowerCase();
		updateTable();
	}
	this.sortByField = function(field)
	{
		config.sortField = field;
		config.sortOrder = config.sortOrder == 'asc' ? 'desc' : 'asc';
		var c = tableHead.childNodes
		for ( var i = 0; i < c.length; i++ ) 
		{
			if ( c[i].nodeType == 1 )
			{
				utils.removeClass(c[i],'sort').removeClass(c[i],'asc').removeClass(c[i],'desc');
				if (c[i].getAttribute('data-field')==field)
				{
					utils.addClass(c[i],'sort');
					utils.addClass(c[i],config.sortOrder);
				}
			}
		}
		switch (config.sortField)
		{
			case 'name': data.sort(sortByName) 
				break;
			case 'age': data.sort(sortByAge) 
				break;
			case 'salary': data.sort(sortBySalary) 
				break;
			case 'city': data.sort(sortByCity) 
				break;
		}
		function sortByAge(a, b){
		  	return b.age - a.age;
		}
		function sortBySalary(a, b){
		  	return b.salary - a.salary;
		}
		function sortByName(a, b){
			var aName = a.name.toLowerCase();
		  	var bName = b.name.toLowerCase(); 
		  	return ((bName < aName) ? -1 : ((bName > aName) ? 1 : 0));
		}
		function sortByCity(a, b){
			return b.city - a.city;
		}
		if (config.sortOrder == 'desc')
			data.reverse();
		updateTable();
	}
	this.fillCities = function(sel,data)
  	{
  		var cities = [];
  		for(var i in data)
  		{
  			if ($.inArray(data[i].city,cities)==-1)
  				cities[i] = data[i].city;
  		}
  		cities.sort(sortByName)
  		for (i in cities)
  		{
  			$(sel).append('<option value="'+cities[i]+'">'+dataConfig.cities[cities[i]]+'</option>');
  		}
  		function sortByName(a, b){
		  	return a - b;
		}
  	}
	this.editRecord = function(id)
	{
		var row;
			FillForm.init({titleId:'#form_title',buttonId:'#form_btn',titleText:'Редактировать пользователя',buttonText:'Редактировать'})
		for (var i in data)
		{
			if (data[i].id == id)
			{
				FillForm.fillData(data[i]);
				break;
			}
		}
	}
	this.addRecord = function()
	{
		FillForm.init({titleId:'#form_title',buttonId:'#form_btn',titleText:'Добавить пользователя',buttonText:'Добавить'})
		FillForm.fillData({id:'',name:'',age:'',salary:'',city:'1',phones:[],emails:[],sites:[],birthday:'',description:''});
	}
	
	
	this.saveRecord = function()
	{
		var field, row = {}, name;
		$('#f_birthday').val($('#f_birthday').attr('src_value'));
		var form_data = $('#data_form').serializeArray();
		for (var i in form_data)
		{
			field = form_data[i];
			if (field.name.indexOf('[]')==-1)
				row[field.name] = field.value;
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
				row[name][len] = field.value
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
	utils.addEvent(document,'keyup',modalDialog.hideModalDialog);
	utils.addEvent(window,'popstate',function(event){
		if (event.state) { 
			config = event.state; 
			table = new Table(config);
		}
		else 
		{
			table = new Table(config);
			history.replaceState(config, "", location.protocol + '//' + location.host + location.pathname + table.prepareParams());
		}
	});
	utils.addEvent(window,'scroll',function(){
  		var scrollPos = utils.getScrollOffsets();
  		var tableHead = document.getElementsByClassName('head')[0]
  		var elementPos = utils.findAbsPositon(tableHead);
  		if (elementPos.y > 0 )
  			tableHead.setAttribute('data-y',elementPos.y)
  		if (scrollPos.y > elementPos.y)
  			tableHead.setAttribute('style','position:fixed;top:0px;');
  		if (scrollPos.y < tableHead.getAttribute('data-y'))
  			tableHead.setAttribute('style','');
  	});
}