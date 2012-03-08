var modalDialog = {
		id : 'modal',
		show : function () {
			document.getElementById(this.id).style.display = 'block';
			document.getElementById(this.id).style.top = (utils.getScrollOffsets().y + 40)+'px';
		},
		hide : function () {
			document.getElementById(this.id).style.display = 'none';
		},
		hideModalDialog: function (e) {
			var e = e || window.event;
			if (e.which==27)
				modalDialog.hide();
		}
	}