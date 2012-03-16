function FillForm(config)
{
	var titleId = config.titleId,
		buttonId = config.buttonId,
		titleText = config.titleText,
		buttonText = config.buttonText,
		data = config.data || {},
		require = config.require || [],
		disabled = false;
	$(buttonId).val(buttonText);
	$(titleId).text(titleText);
	modalDialog.show();
	this.fillData =  function(row)
	{
		for (var field in row)
		{
			switch (field)
			{
				case 'name':
				case 'description':
				case 'id':
						$('#f_'+field).val(row[field])
					break;
				case 'age':
				case 'salary':
						$('#f_'+field).focus().val(row[field]).blur()
					break;
				case 'city':
						vipadalka.setVal(dataConfig.cities[row.city], row.city);
						//$('#f_city').next().find('li[data-value='+row.city+']').click();
					break;
				case 'phones':
						fields.phone.addValues(row.phones)
					break;
				case 'emails':
						fields.email.addValues(row.emails)
					break;
				case 'sites':
						fields.site.addValues(row.sites)
					break;
				case 'birthday':
						var months = dataConfig.months,
							birthdayParts = row.birthday.split('.');
						if (birthdayParts.length == 3)	
							$('#f_birthday').attr('src_value',row.birthday).val(Number(birthdayParts[0])+' '+months[Number(birthdayParts[1])-1]+' '+birthdayParts[2])
						else
							$('#f_birthday').attr('src_value','').val('');
					break;
			}
		}
		checkFields();
	}
	function checkFields()
	{
		if (require.length > 0)
		{
			for(var i in require)
			{
				$(require[i]).unbind('keyup');
				$(require[i]).bind('keyup',function(){
					var dis = false;
					for(var i in require)
					{
						if ($(require[i]).val()=='' && !dis)
						{
							dis = true;
						}
					}
					$(buttonId).attr({disabled:dis});
				})
			}
			$(require[0]).keyup();
		}
	}
}