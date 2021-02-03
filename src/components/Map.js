import React from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAP_API_KEY;

let map;

class Map extends React.Component {
  state = {
    lat: null,
    lng: null,
  };

  componentDidUpdate() {
      console.log('map update triggered');

      if(this.state.lat !== this.props.lat) {
          this.setState({ lat: this.props.lat, lng: this.props.lng });
      }

    map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
      center: [this.state.lng, this.state.lat], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    new mapboxgl.Marker()
      .setLngLat([this.state.lng, this.state.lat])
      .setPopup(new mapboxgl.Popup().setHTML("<h1>Your location!</h1>"))
      .addTo(map);
  }

  render() {
    return (
            <div
                key={this.props.update}
                className="map mapContainer"
                ref={(el) => (this.mapContainer = el)}
            ></div>
    );
  }
}

export default Map;
