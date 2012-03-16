var utils = {
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
		},
		fillCities: function(sel,data)
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
	}
var sortFunctions = {
		sortByage: function(a, b){
		  	return b.age - a.age;
		},
		sortBysalary: function (a, b){
		  	return b.salary - a.salary;
		},
		sortByname: function (a, b){
			var aName = a.name.toLowerCase();
		  	var bName = b.name.toLowerCase(); 
		  	return ((bName < aName) ? -1 : ((bName > aName) ? 1 : 0));
		},
		sortByphones: function (a, b){
			var aPhone = '',
				bPhone = '';
			if (a.phones !== undefined)
				aPhone = a.phones.join('');
		  	if (b.phones !== undefined)
		  		bPhone = b.phones.join(''); 
		  	return ((bPhone < aPhone) ? -1 : ((bPhone > aPhone) ? 1 : 0));
		},
		sortByemails: function (a, b){
			var aEmail = '',
				bEmail = '';
			if (a.emails !== undefined)
				aEmail = a.emails.join('');
		  	if (b.emails !== undefined)
		  		bEmail = b.emails.join(''); 
		  	return ((bEmail < aEmail) ? -1 : ((bEmail > aEmail) ? 1 : 0));
		},
		sortBysites: function (a, b){
			var aSites = '',
				bSites = '';
			if (a.sites !== undefined)
				aSites = a.sites.join('');
		  	if (b.sites !== undefined)
		  		bSites = b.sites.join(''); 
		  	return ((bSites < aSites) ? -1 : ((bSites > aSites) ? 1 : 0));
		},
		sortBybirthday: function (a, b){
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
		},
		sortBydescription: function (a, b){
			var aDescription = a.description.toLowerCase();
		  	var bDescription = b.description.toLowerCase(); 
		  	return ((bDescription < aDescription) ? -1 : ((bDescription > aDescription) ? 1 : 0));
		},
		sortBycity: function (a, b){
			return b.city - a.city;
		}
}