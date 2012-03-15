function Table(conf)
{
	conf = conf || {};
	var config = { 
		sortField : conf.sortField || '',
		sortOrder : conf.sortOrder || '',
		city : conf.city || '',
		recordId : conf.recordId || '',
		q : conf.q || ''},
		tableHead = document.getElementsByClassName('head')[0],
		self = this	;
	
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
			case 'description': data.sort(sortByDescription) 
				break;
			case 'birthday': data.sort(sortByBirthday) 
				break;
			case 'emails': data.sort(sortByEmails) 
				break;
			case 'phones': data.sort(sortByPhones) 
				break;
			case 'sites': data.sort(sortBySites) 
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
		function sortByPhones(a, b){
			var aPhone = '',
				bPhone = '';
			if (a.phones !== undefined)
				aPhone = a.phones.join('');
		  	if (b.phones !== undefined)
		  		bPhone = b.phones.join(''); 
		  	return ((bPhone < aPhone) ? -1 : ((bPhone > aPhone) ? 1 : 0));
		}
		function sortByEmails(a, b){
			var aEmail = '',
				bEmail = '';
			if (a.emails !== undefined)
				aEmail = a.emails.join('');
		  	if (b.emails !== undefined)
		  		bEmail = b.emails.join(''); 
		  	return ((bEmail < aEmail) ? -1 : ((bEmail > aEmail) ? 1 : 0));
		}
		function sortBySites(a, b){
			var aSites = '',
				bSites = '';
			if (a.sites !== undefined)
				aSites = a.sites.join('');
		  	if (b.sites !== undefined)
		  		bSites = b.sites.join(''); 
		  	return ((bSites < aSites) ? -1 : ((bSites > aSites) ? 1 : 0));
		}
		function sortByBirthday(a, b){
			var aDate = a.birthday.split('.');
			if (aDate.length==3)
				aDate =  new Date(aDate[2], aDate[1]-1,aDate[0]);
			else
				aDate =  new Date(0)
		  	var bDate = b.birthday.split('.');
		  	if (bDate.length == 3)
				bDate =  new Date(bDate[2], bDate[1]-1,bDate[0]);
			else
				bDate =  new Date(0)
		  	return ((bDate < aDate) ? -1 : ((bDate > aDate) ? 1 : 0));
		}
		function sortByDescription(a, b){
			var aDescription = a.description.toLowerCase();
		  	var bDescription = b.description.toLowerCase(); 
		  	return ((bDescription < aDescription) ? -1 : ((bDescription > aDescription) ? 1 : 0));
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
		var url = location.protocol + '//' + location.host + location.pathname + self.prepareParams();
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
	this.prepareParams = function()
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
	$(window).scroll(function(){
  		var scrollPos = utils.getScrollOffsets(),
  		 	tableHead = $('.head'),
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