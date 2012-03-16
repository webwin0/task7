function Calendar(calendarSelector)
{
    var id = (new Date()).getTime(),
    	 srcElement = null,
    	 now = new Date(),
    	 inputDate = [],
    	 selDate = (new Date()).getDate(),
    	 selMonth = (new Date()).getMonth(),
    	 selYear = (new Date()).getFullYear(),
    	 month = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентрябрь','Октябрь','Ноябрь','Декабрь'],
    	 lastDays = ['31','28','31','30','31','30','31','31','30','31','30','31'],
    	 lastDays1 = ['31','29','31','30','31','30','31','31','30','31','30','31'],
    	 wdays = ['П','В','С','Ч','П','С','В'],
    	months = calendarSelector.months;
    var $ = function(id)    {
            return document.getElementById(id);
    }
    // print calendar for prev month
    function prev(){
        selMonth = selMonth -1;
        if (selMonth < 0) {
            selMonth = 11;
            selYear = selYear-1;
        }
        printCalendar();
    }
    // print calendar for next month
    function next(){
        selMonth = selMonth +1;
        if (selMonth > 11) {
            selMonth = 0;
            selYear = selYear+1;
        }
        printCalendar();
    }
    // enter year from keybourd
    function enterYear(event) {
        var event = event || window.event;
        //press enter
        if (event.keyCode == 13 && event.type=='keypress' || event.type=='blur')
        {
            var val = parseInt(this.value);
            if (val >= 2100 || val <= 1900 || isNaN(val))
            {
                if(event.type=='keypress')
                    $('month_'+id).onblur = false;
                alert('Enter year from 1900 to 2100');
                return false
            }
            selYear = val;
            printCalendar();
        }
    }
    function changeMonth(){
        this.value = selMonth+1;
    }
    function enterMonth(event) {
        var event = event || window.event;
        //press enter
        var val = parseInt(this.value);
        if ( (event.keyCode == 13 && event.type=='keypress' || event.type=='blur') && val >= 1 && val <= 12)
        {   
            selMonth = val-1;
            printCalendar();
        }
    }
    // print date in input field
    function enterDate() {
        if(this.id !== undefined)
        {
            var dateParts = this.id.split('_');
            srcElement.setAttribute('src_value',utils.less10(dateParts[1])+'.'+utils.less10(parseInt(dateParts[2])+1)+'.'+dateParts[3]);
            srcElement.value = dateParts[1]+' '+months[dateParts[2]]+' '+dateParts[3];
            $('calend'+id).style.display = 'none';
        }
    }
    function attacheEvents(){
    	$('prev_'+id).onclick = prev;
        $('next_'+id).onclick = next;
        $('month_'+id).onclick = changeMonth;
        $('year_'+id).onkeypress = enterYear;
        $('month_'+id).onkeypress = enterMonth;
        var dateList = $('calend'+id).getElementsByTagName('td');
        for (var i=0, len=dateList.length; i<len; i++) {
            if(dateList[i].id !== undefined && dateList[i].id !=='') {
                dateList[i].onclick = enterDate;
            }
        }
    }
    function setStartWeekDay(){
    	 var sel_time = new Date();
        sel_time.setMonth(selMonth);
        sel_time.setYear(selYear);
        sel_time.setDate(1);
        return sel_time.getDay()==0?7:sel_time.getDay();
    }
    function printCalendar(){
        var str = '<div class="calendar" id="calend'+id+'">'
        str += '<div class="calendar_in">';
        str +='<div class="title">';
            str +='<div class="l_arr" id="prev_'+id+'"></div>';
            str +='<div class="r_arr" id="next_'+id+'"></div>';
            str +='<input class="month" id="month_'+id+'" value="'+month[selMonth]+'" />';
            str += '<input class="year" id="year_'+id+'" value="'+selYear+'" />';
            str +='</div>';
            str +='<table width="100%" cellpadding="0" cellspacing="0" border="0">';
            str +='<tr>';
            for (var i in wdays)
                str +='<td>'+wdays[i]+'</td>';
            str +='</tr>';
            var _lastDays = ((selYear % 4)==0)? lastDays1 : lastDays;
            var startWeekDay = setStartWeekDay();
            var currentDay = d-startWeekDay+1;
            
            if (selMonth==0)
                var prevMonth = new Date(selYear-1,11,selDate);
            else
                var prevMonth = new Date(selYear,selMonth-1,selDate);
             prevMonth.setDate(32);
             var prevMonthDay = 32 - prevMonth.getDate()-startWeekDay+2;
             
            var nextMonthDay = 0;
            var tdId,
                tdIdMonth,
                tdIdYear;
            for(var d=1;d<=42;d++)
            {
                if (d-1 % 7 ==0)
                    str +='<tr>';
                
                currentDay = d-startWeekDay+1;
                // current month days
                if ( (currentDay) > 0 && (d-startWeekDay)< _lastDays[selMonth])
                {
                    
                    tdId = 'date_'+currentDay+'_'+selMonth+'_'+selYear+'_'+id
                    if ( currentDay==inputDate[0] && selMonth==inputDate[1] && selYear==inputDate[2])
                        str +='<td class="current" id="'+tdId+'">';
                    else
                        str +='<td id="'+tdId+'">';
                    str += currentDay;
                    str +='</td>';
                    nextMonthDay = 1;
                }
                else // prev and next month days
                {
                    str +='<td class="other_month"';
                    if  (!nextMonthDay)
                    {
                        if(selMonth == 0)
                            tdIdYear = selYear - 1;
                        else
                            tdIdYear = selYear;
                        if(selMonth == 0)
                            tdIdMonth = 11;
                        else
                            tdIdMonth = selMonth-1;
                        tdId = 'date_'+prevMonthDay+'_'+tdIdMonth+'_'+tdIdYear+'_'+id;
                        str += ' id="'+tdId+'" ';
                        str +='>';
                        str += prevMonthDay;
                        prevMonthDay++;
                    }
                    else
                    {
                        if(selMonth == 11) {
                            tdIdYear = selYear + 1;
                            tdIdMonth = 0;
                        }
                        else {
                            tdIdYear = selYear;
                            tdIdMonth = selMonth+1;
                        }
                        tdId = 'date_'+nextMonthDay+'_'+tdIdMonth+'_'+tdIdYear+'_'+id;
                        str += ' id="'+tdId+'" ';
                        str +='>';
                        str += nextMonthDay;
                        nextMonthDay++;
                    }
                    str +='</td>';
                }
                
                if (d % 7 ==0)
                    str +='</tr>';
            }
            str +='</table>';
            str +='</div>';
            str +='</div>';  
            // attach calendar to document
            if (!$('calend_block'+id))
            {
                var wrapElement = document.createElement('div');
                wrapElement.id = 'calend_block'+id;
                document.body.appendChild(wrapElement);
                wrapElement.innerHTML = str;
            }
            else
            {
                 $('calend_block'+id).innerHTML = str;
            }  
        var pos = utils.findAbsPositon(srcElement);
        var calendCss = $('calend'+id).style;
        calendCss.left = pos.left+'px';
        calendCss.top = (pos.top+ srcElement.offsetHeight)+'px';
        calendCss.display= 'block';
        attacheEvents();
    }
    // for new browser
    if (document.querySelectorAll)
    {
        var inputs = document.querySelectorAll(calendarSelector.selector),
            inputElement;
        for (var i in inputs)
        {
            inputElement = inputs[i];
            if (typeof inputElement == 'object')
            {
                // put calendar on input
                inputElement.onclick = function() {
                    srcElement = this;
                    if (srcElement.tagName == 'INPUT')
                    {
                    	if (srcElement.getAttribute('src_value') )
                       		var dataParts = srcElement.getAttribute('src_value').match(/^(\d{2})\.(\d{2})\.(\d{4})$/)
                       	else
                        	var dataParts = srcElement.value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/)
                       	
                        // parse data from input
                        if (dataParts !== null && dataParts.length == 4 && utils.testDate(dataParts[3],Number(dataParts[2])-1,Number(dataParts[1])))
                        {
                            selDate = Number(dataParts[1]);
                            selMonth = Number(dataParts[2])-1;
                            selYear = Number(dataParts[3]);
                            inputDate = [selDate, selMonth, selYear];
                        }
                        else
                        {
                            selDate = now.getDate();
                            selMonth = now.getMonth();
                            selYear = now.getFullYear();
                            inputDate = [selDate, selMonth, selYear];
                        }
                        printCalendar();
                    }
                }
            }
        }
        
        // hide calendar if we click outer
        function hideCalendar(event) {
            var event = event || window.event;
            event.target = event.target ||  event.srcElement || document;
            var clickOuterCalendar = 1;
            var obj = event.target;
            var match_selector = calendarSelector.selector.substr(1);
            obj.classList = obj.className.split(' ');
            for (var i=0, len=obj.classList.length; i<len; i++)
            {
                if (obj.classList[i]==match_selector)
                    clickOuterCalendar = 0;
            }
            // find element with class calendar
            if (obj.parentNode )
            {
                do {
                    if (obj.className!==undefined && obj.className.match(/\bcalendar\b/) )
                    {
                        clickOuterCalendar = 0;
                        break;    
                    }
                } while (obj = obj.parentNode);
            }
            else 
            {
                clickOuterCalendar = 1;
            }
            if (clickOuterCalendar)
            {
                var other_calend = document.querySelectorAll('.calendar')
                for (var i=0, len = other_calend.length; i <len; i++)
                {
                    other_calend[i].style.display = 'none';
                }
            }
        }
        utils.addEvent(document.body, 'click', hideCalendar);
        utils.addEvent(document, 'click', hideCalendar)
    }
}