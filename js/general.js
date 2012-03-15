var utils = {
		//add class to element
		addClass:function (elem, clazz) {
			var c = elem.className.split(' ');
			for(var i=0; i<c.length; i++) {
				if (c[i] == clazz ) return;
			}
			if (elem.className == '') 
				elem.className = clazz;
			else 
				elem.className += ' ' + clazz;
		},
		//remove class from element
		removeClass: function(elem, clazz) {
			var c = elem.className.split(' ');
			for(var i=0; i<c.length; i++) {
				if (c[i] == clazz) 
					c.splice(i--, 1)
			}
			elem.className = c.join(' ');
			return this;
		},
		//find absolute element position
		findAbsPositon: function(obj) {
			var curleft = curtop = 0;
			if (obj.offsetParent) {
				do {
					curleft += obj.offsetLeft;
					curtop += obj.offsetTop;
				} while (obj = obj.offsetParent);
				return {left:curleft,top:curtop};
			}
		},
		//get scroll offset
		getScrollOffsets: function (w) {
			w = w || window;
			if (w.pageXOffset != null) 
				return {left: w.pageXOffset, top:w.pageYOffset};
			var d = w.document;
			if (document.compatMode == "CSS1Compat")
				return {left:d.documentElement.scrollLeft, top:d.documentElement.scrollTop};
			return { left: d.body.scrollLeft, top: d.body.scrollTop };
		},
		// add event listener
		addEvent: function (target, type, handler) {
	        if (target.addEventListener)
	            target.addEventListener(type, handler, false);
	        else
	            target.attachEvent("on" + type, function(event) {
		                                        	return handler.call(target, event);
		                                         });
	    },
	    getAge: function(d, m, y) 
		{
			var date = new Date(),			
				currentDay = date.getDate(),
				currentMonth = date.getMonth(),
				currentYear = date.getFullYear();
			if (arguments.length == 1)
			{
				d = d.split('.');
				m = Number(d[1]) -1;
				y = d[2];
				d = d[0]
			}
			if(m > currentMonth || m == currentMonth && d > currentDay)
				return (currentYear - y - 1);
			else
				return (currentYear - y);
		},
		numberFormat: function ( number, decimals, dec_point, thousands_sep ) {	// Format a number with grouped thousands
			// 
			// +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
			// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// +	 bugfix by: Michael White (http://crestidg.com)
		
			var i, j, kw, kd, km;
		
			// input sanitation & defaults
			if( isNaN(decimals = Math.abs(decimals)) ){
				decimals = 2;
			}
			if( dec_point == undefined ){
				dec_point = ",";
			}
			if( thousands_sep == undefined ){
				thousands_sep = ".";
			}
		
			i = parseInt(number = (+number || 0).toFixed(decimals)) + "";
		
			if( (j = i.length) > 3 ){
				j = j % 3;
			} else{
				j = 0;
			}
		
			km = (j ? i.substr(0, j) + thousands_sep : "");
			kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
			//kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
			kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");
		
			return km + kw + kd;
		},
		less10: function(number){
	       return number < 10 ? "0" + number : number;
	    },
	    testDate: function(year, month, day) {
	        var date = new Date(year, month, day)
	        return date instanceof Date && isFinite(date) && month >= 0 && month <= 11 && day >=1 && day <=31;
	    },
	    vidminok: function(number,titles,x)
		{
		     var x = x || 0;
		     var cases = new Array(2, 0, 1, 1, 1, 2);
		     return ((!x)? number+" ":'')+titles[ (number%100>4 && number%100<20)? 2 : cases[Math.min(number%10, 5)] ];
		},
		strip_tags: function( str ){	// Strip HTML and PHP tags from a string
			// 
			// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
				return str.replace(/<\/?[^>]+>/gi, '');
		}
	}	
var storage = window.localStorage || (window.UserDataStorage && new UserDataStorage());
var defaultData = [{id:'1',name:"Андрей Иванов",salary:'24000',city:'19',phones:['063 039 44 39','093 236 18 23'],emails:['ivanov@facebook.com','ivanov@gmail.com'],sites:['http://www.facebook.com/profile.php?id=1629974224','http://www.vk.com/ivanov'],birthday:'25.01.1984',description:'Клевый чувак'},  	
  	{id:'2',name:"Тарас Шевчук",salary:'22000',city:'3',phones:['093 190 27 15'],emails:['taras.shevshk@gmail.com'],sites:['http://www.facebook.com/taras.shevshuk'],birthday:'13.02.1974',description:'Отличный доктор'},
  	{id:'3',name:"Татьяна Ищенко",salary:'18000',city:'3',phones:['093 415 39 29', '098 232 18 15'],emails:['tanya1990@mail.ru'],sites:['http://www.vk.com/id32432452'],birthday:'01.09.1990',description:'Спортсменка и красавица'},	
  	{id:'4',name:"Вова Мазур",salary:'24000',city:'1',phones:['063 039 44 39','093 236 18 23'],emails:['ivanov@facebook.com','ivanov@gmail.com'],sites:['http://www.facebook.com/profile.php?id=1629974224','http://www.vk.com/ivanov'],birthday:'25.01.1984',description:'Клевый чувак'},
  	{id:'5',name:"Виталий Снигур",salary:'24000',city:'1',phones:['063 039 44 39','093 236 18 23'],emails:['ivanov@facebook.com','ivanov@gmail.com'],sites:['http://www.facebook.com/profile.php?id=1629974224','http://www.vk.com/ivanov'],birthday:'25.01.1984',description:'Клевый чувак'},
  	{id:'6',name:"Ирина Бойко",salary:'24000',city:'1',phones:['063 039 44 39','093 236 18 23'],emails:['ivanov@facebook.com','ivanov@gmail.com'],sites:['http://www.facebook.com/profile.php?id=1629974224','http://www.vk.com/ivanov'],birthday:'25.01.1984',description:'Студентка'},
  	{id:'7',name:"Сергей Куленко",salary:'24000',city:'1',phones:['063 039 44 39','093 236 18 23'],emails:['ivanov@facebook.com','ivanov@gmail.com'],sites:['http://www.facebook.com/profile.php?id=1629974224','http://www.vk.com/ivanov'],birthday:'25.01.1984',description:'Клевый чувак'},
  	{id:'8',name:"Ирина Петляк",salary:'24000',city:'4',phones:['063 039 44 39','093 236 18 23'],emails:['ivanov@facebook.com','ivanov@gmail.com'],sites:['http://www.facebook.com/profile.php?id=1629974224','http://www.vk.com/ivanov'],birthday:'25.01.1984',description:'Преподаватель'},
  	{id:'9',name:"Ольга Валова",salary:'24000',city:'5',phones:['063 039 44 39','093 236 18 23'],emails:['ivanov@facebook.com','ivanov@gmail.com'],sites:['http://www.facebook.com/profile.php?id=1629974224','http://www.vk.com/ivanov'],birthday:'25.01.1984',description:'Бизнес-тренер'},
  	{id:'10',name:"Анастасия Муляр",salary:'24000',city:'1',phones:['063 039 44 39','093 236 18 23'],emails:['ivanov@facebook.com','ivanov@gmail.com'],sites:['http://www.facebook.com/profile.php?id=1629974224','http://www.vk.com/ivanov'],birthday:'25.01.1984',description:'Активист'}
  	];
var dataConfig = {
	lastId:10,
	maxLength:19,
	format: {salary:'number',
			age:'number',
			sites:'url',
			birthday:'date',
			city:'city'},
	months: 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(','),
	fields: 'name,age,salary,city,phones,emails,sites,birthday,description'.split(','),
	cities: []
}
var data,
	fields = {},
	vipadalka,
	table = null;
$(function(){
	if (storage.getItem('data') != null )
			data = JSON.parse(storage.getItem('data'));
  	else
  		data = defaultData;
  	if (storage.getItem('dataConfig') != null )
  		dataConfig = JSON.parse(storage.getItem('dataConfig'));
  	else
  		storage.setItem('dataConfig',JSON.stringify(dataConfig));
	$('#f_city option').each(function(){
		dataConfig.cities[$(this).val()] = $(this).text();
	});
	$('.td_slider').hover(function(){
		$(this).find('div[class^=slider]').show()
	},function(){
		$(this).find('div[class^=slider]').hide()
	})
	new Calendar({selector:'.date',months:dataConfig.months})
	table = new Table();
	table.fillCities('#select-choice',data);
	var renderTable = new RenderTable('#users_data',data, dataConfig);
	fields.phone = new Field('#f_phone',{name:'phones[]', max:5, data:[] });
	fields.email = new Field('#f_email',{name:'emails[]',max:5, data:[] });
	fields.site = new Field('#f_site',{name:'sites[]',max:5, data:[] });
	vipadalka = new Vipadalka({element:'#f_city',itemsLimit:7})
	new Range('#f_age',{min:16, max:70, width:40, leftTip:true, rightTip:true, callback: function () {
										var val = $('#f_age').val();
										$('#f_age').next().text(utils.vidminok(val,['полный год','полных года','полных лет'],true));
									}
	});
	new Range('#f_salary',{min:0, max:24000, step:200, width:60, css:{input: 'range', slider: 'slider_salary', progress: 'progress', handle: 'handle' }});	
})