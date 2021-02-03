import React from 'react';
import SearchBar from './SearchBar';
import Map from './Map';
import { TIMEOUT_SEC, API_URL } from "./config";

class App extends React.Component {

    state = {
        ip: null,
        isp: '',
        lat: null,
        lng: null,
        location: '',
        timezone: '',
        key: 1,
    };

    componentDidMount() {
        this.getCurrentLocation();
      }
    
      //TIMEOUT FOR FETCH, so won't hang if not getting data
      timeout = (s) => {
        return new Promise(function (_, reject) {
          setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
          }, s * 1000);
        });
      };
    
      //
      getCurrentLocation = async (ip) => {
        try {
          let res;
    
          if (ip === undefined || ip === "") {
            //load users current location and ip
            res = await Promise.race([
              fetch(`${API_URL}${process.env.REACT_APP_API_KEY}`),
              this.timeout(TIMEOUT_SEC),
            ]);
          } else {
            const validateInput = ip.match(/[.]/g);
            //otherwise load the ip they entered into the form
    
            //make sure IP address is valid before even sending to API
            if (validateInput === null || validateInput.length !== 3)
              throw new Error("EROR HAPPENED");
    
            res = await Promise.race([
              fetch(`${API_URL}${process.env.REACT_APP_API_KEY}&ipAddress=${ip}`),
              this.timeout(TIMEOUT_SEC),
            ]);
          }
    
          const data = await res.json();
    
          if (!res.ok) throw new Error("Error happened");
    
          this.setState({
            ip: data.ip,
            location: `${data.location.city}, ${data.location.region}`,
            timezone: data.location.timezone,
            isp: data.isp,
            lat: data.location.lat,
            lng: data.location.lng,
            key: this.state.key++
          });
    
        } catch (err) {
          alert("Error: Please enter a valid IP address");
        }
      };

    componentDidUpdate() {
        console.log(this.state);
    }

    submitIP = (data) => {
        this.getCurrentLocation(data);

    }

    render() {
      return(
        <div className="grid">
            <SearchBar 
                ip={this.state.ip}
                location={this.state.location}
                timezone={this.state.timezone}
                isp={this.state.isp}
                submitIP={this.submitIP}
            />
            <Map 
                lat={this.state.lat} 
                lng={this.state.lng}
                key={this.state.key}
            />
        </div>
      );
    }  
};

export default App;