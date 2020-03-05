var markers=Array();
function loadConse(){
	$.ajax({
		url: "http://suzukimotos.cl/wp-json/wp/v2/concesionarios",
		dataType: "json"
	}).done(function( data ) {
		//console.log(data);
		$.each( data, function( key, value ) {
			var mapdata=value['cn-map'];
			$('#mapa .list-group').append('<li class="list-group-item"><label><input type="checkbox" data-id="'+key+'"><span>'+value.title.rendered+'</span></label></li>');			
			
			var pos = {lat: parseFloat(mapdata.lat), lng: parseFloat(mapdata.lng)};
			var infowindow = new google.maps.InfoWindow({
				content: '<h4>'+value.title.rendered+'</h4>'+mapdata.address+'<br><a href="'+value.link+'">'+value.link+'</a>'
			});

			var marker = new google.maps.Marker({position: pos});
			marker.addListener('click', function() {
				infowindow.open(map, marker);
			});
			markers[key]=marker;
		});
		//Agregar marcas al mapa
		$('#mapa .list-group-item input[type="checkbox"]').click(function(){
			var id=$(this).data('id');
			var marker = markers[id]
			if($(this).is(":checked")){
				marker.setMap(map);
				map.panTo(marker.getPosition());
			}else if($(this).is(":not(:checked)")){
				marker.setMap(null);
			}
		});
		$('#load').fadeOut(function(){$('#load').remove()});
	});
	
};