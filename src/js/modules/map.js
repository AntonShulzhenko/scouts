var map;
var mapMarker;
var mapContainer = document.getElementById('map');

function initMap() {
  if (!mapContainer) return;

  map = new google.maps.Map(mapContainer, {
    center: {
      lat: 48.462119,
      lng: 35.049060
    },
    zoom: 13,
    scrollwheel: false,
    disableDefaultUI: true,
    styles: [{'featureType':'administrative','elementType':'labels.text.fill','stylers':[{'color':'#444444'}]},{'featureType':'landscape','elementType':'all','stylers':[{'color':'#f2f2f2'}]},{'featureType':'poi','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'road','elementType':'all','stylers':[{'saturation':-100},{'lightness':45}]},{'featureType':'road.highway','elementType':'all','stylers':[{'visibility':'simplified'}]},{'featureType':'road.arterial','elementType':'labels.icon','stylers':[{'visibility':'off'}]},{'featureType':'transit','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'water','elementType':'all','stylers':[{'color':'#46bcec'},{'visibility':'on'}]}]
  });

  mapMarker = new google.maps.Marker({
    position: {
      lat: 48.462119,
      lng: 35.049060
    },
    map: map,
    title: 'г. Днепропетровск, ул. Артема 1'
  });
}
