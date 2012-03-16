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
	table = new Table({headSelector:'.head',tableSelector:'.table'});
	utils.fillCities('#select_city',data);
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