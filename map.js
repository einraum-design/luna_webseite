function initMap(){
  var center_ort = {lat: 50.1209, lng: 9.9364313};
  var marker_ort = {lat: 50.1209, lng: 9.9364313};
  var map = new google.maps.Map(document.getElementById('map'),{zoom:7, center: center_ort, mapTypeControl: false});
  var marker = new google.maps.Marker({position: marker_ort, map: map, title:"CIRCUS LUNA"});
  var styles = [
    {
      "featureType": "administrative",
      "elementType": "labels.text",
      "stylers": [
        {
          "color": "#00264a"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#00264a"
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f3efe9"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#00264a"
        }
      ]
    }
  ];

  map.setOptions({styles: styles});
}
