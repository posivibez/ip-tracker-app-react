
import React from 'react';

class SearchBar extends React.Component {
    state = {
        term: '',
    }

    render() {
        return(
        <div className="topbar">
            <h2>IP Address Tracker</h2>

            <form className="searchBar" onSubmit={(e) => {
                e.preventDefault();
                this.props.submitIP(this.state.term);
            }}>
                <input 
                    type="text" 
                    placeholder="Search for any IP address or domain" 
                    value={this.state.term}
                    onChange={(event) => this.setState({ term: event.target.value})}
                />
                <button>&rarr;</button>
            </form>

            <div className="result-container">

                <div className="result">

                    <div className="result-box">
                        <p className="result-box-header">IP Adress</p>
                        <p className="result-box-details" id="ip">
                            {this.props.ip}
                        </p>
                    </div>

                    <div className="result-box">
                        <p className="result-box-header">Location</p>
                        <p className="result-box-details" id="location">
                            {this.props.location}
                        </p>
                    </div>

                    <div className="result-box">
                        <p className="result-box-header">Timezone</p>
                        <p className="result-box-details" id="timezone">
                            {this.props.timezone}
                        </p>
                    </div>

                    <div className="result-box">
                        <p className="result-box-header">ISP</p>
                        <p className="result-box-details" id="isp">
                            {this.props.isp}
                        </p>
                    </div>

                </div>
            </div>
        </div>
        );
    }
}

export default SearchBar;