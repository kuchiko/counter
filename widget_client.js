window.locWidget = {
	style: 'position: absolute; bottom:0; right:0; font-size:3em',
	init: function(){
		var socket = io.connect('http://localhost:8081/', {resource: 'loc'});
		var style = this.style; //thisの値を保持
		
		socket.on('connect', function(){
			var head = document.getElementsByTagName('head')[0];
			var body = document.getElementsByTagName('body')[0];
			var loc = document.getElementById('_lo_count');
			
			if(!loc){
				head.inneHTML = '<style>#_loc{' + style + '}</style>' + head.innerHTML;
				body.innerHTML += '<div id="_loc">' + 'オンライン: ' + '<span id="_lo_count">'+ '人'+'</span>';
				loc = document.getElementById('_lo_count');
			}
			
			socket.on('total', function(total){
				loc.innerHTML = total;
			});
		});
	}
}