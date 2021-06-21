import React from "react";
import { Component } from "react";
import firebase, { auth } from "./firebase";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from '@material-ui/lab/Autocomplete';

import WeatherCard from "./WeatherCard";

class Home extends Component {
	constructor() {
		super();
		this.state = {
			user: JSON.parse(localStorage.getItem("user")),
			cities: {
				Tokyo: { cLat: 35.6895, cLong: 139.6917 },
				Yokohama: { cLat: 35.4478, cLong: 139.6425 },
				Jakarta: { cLat: -6.2146, cLong: 106.8451 },
				Delhi: { cLat: 28.6667, cLong: 77.2167 },
				Manila: { cLat: 14.6042, cLong: 120.9822 },
				Seoul: { cLat: 37.5683, cLong: 126.9778 },
				Incheon: { cLat: 37.45, cLong: 126.4161 },
				Shanghai: { cLat: 31.2222, cLong: 121.4581 },
				Karachi: { cLat: 24.9056, cLong: 67.0822 },
				Beijing: { cLat: 39.9075, cLong: 116.3972 },
				NewYork: { cLat: 40.7143, cLong: -74.006 },
				SaoPaulo: { cLat: -23.5475, cLong: -46.6361 },
				MexicoCity: { cLat: 19.4285, cLong: -99.1277 },
				Mumbai: { cLat: 19.0144, cLong: 72.8479 },
				Osaka: { cLat: 34.6937, cLong: 135.5022 },
				Kobe: { cLat: 34.6913, cLong: 135.183 },
				Kyoto: { cLat: 35.0211, cLong: 135.7538 },
				Moscow: { cLat: 55.7522, cLong: 37.6156 },
				Dhaka: { cLat: 23.7104, cLong: 90.4074 },
				Cairo: { cLat: 30.0626, cLong: 31.2497 },
				LosAngeles: { cLat: 34.0522, cLong: -18.2437 },
				Bangkok: { cLat: 13.75, cLong: 100.5167 },
				London: { cLat: 51.5085, cLong: -0.1257 },
			},
			cityNames: [
				"Tokyo",
				"Yokohama",
				"Jakarta",
				"Delhi",
				"Manila",
				"Seoul",
				"Incheon",
				"Shanghai",
				"Karachi",
				"Beijing",
				"New York",
				"Sao Paulo",
				"Mexico City",
				"Mumbai",
				"Osaka",
				"Kobe",
				"Kyoto",
				"Moscow",
				"Dhaka",
				"Cairo",
				"Los Angeles",
				"Bangkok",
				"London",
			],
			weather: [],
			cardWeatherNames: ["Tokyo","Tokyo","Tokyo","Tokyo"],
			hasData: false,
			tabValue: 0,
		};
	}

	componentDidMount = async () => {
		this.getWeather("Tokyo", 0);

		//get cities from db and get weather
		this.state.weather.push(this.state.weather[0]);
		this.state.weather.push(this.state.weather[0]);
		this.state.weather.push(this.state.weather[0]);
	};

	getAPIURL(CityName) {
		let thisLat = this.state.cities[CityName].cLat;
		let thisLong = this.state.cities[CityName].cLong;

		return (
			"https://api.openweathermap.org/data/2.5/onecall?" +
			"lat=" +
			thisLat +
			"&lon=" +
			thisLong +
			"&exclude=minutely,hourly" +
			"&units=metric" +
			"&appid=1be7ac891749c0e65cf0a0590bc1505f"
		);
	}

	getWeather(City, weatherIndex){
		const url = this.getAPIURL(City);
		const req = new Request(url);
		fetch(req)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				let CityWeather = {
					Name: City,
					weather: [],
					LastUpdate: new Date(),
				};

				CityWeather.weather.push(data.daily[0]); //today
				CityWeather.weather.push(data.daily[1]); //tomorrow
				CityWeather.weather.push(data.daily[2]); //day after
				
				let weathers = this.state.weather;
				weathers[weatherIndex] = CityWeather;
				this.setState({ hasData: true });
			});
	}

	signInOut = (event) => {
		if (this.state.user != null) firebase.auth().signOut();
        else this.props.history.push("/login");
	};

	autoCompleteOnChange = (event, index, newValue) => {
		let dropDownVals = this.state.cardWeatherNames;
		dropDownVals[index] = newValue;
		this.setState({cardWeatherNames: dropDownVals});

		this.getWeather(newValue.replace(" ", ""), index);
		console.log("Change: " + this.state.cardWeatherNames[index]);
		console.log("Index: " + index);
		console.log("newValue city name:" + newValue);
	}

	render() {
		if (this.state.user != null) {
			console.log("LOGGED IN");
		} else {
			console.log("NOT LOGGED IN");
		}

		if (this.state.hasData) {
			return (
				<div>
					<Grid container spacing={6} justify="flex-end">
						<Grid item xs></Grid>
						<Grid item xs></Grid>
						<Grid item xs>
							<Button
								variant="outlined"
								style={{ float: "right" }}
								onClick={this.signInOut}
							>
								{this.state.user != null ? "Sign Out" : "Sign In"}
							</Button>
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs />
						<Grid item xs>
							<Autocomplete
								id="txt_city_names_1"
								value={this.state.cardWeatherNames[0]}
								defaultValue={this.state.cardWeatherNames[0]}
								disableClearable
								onChange={(event, newValue) => this.autoCompleteOnChange(event, 0, newValue)}
								options={this.state.cityNames}
								style={{ width: 300 }}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Cities"
										variant="outlined"
									/>
								)}
								justify="center"
							/>
							<WeatherCard
								weather={this.state.weather[0]}
								lastUpdate={this.state.weather[0].LastUpdate}
								city={this.state.cardWeatherNames[0]}
							/>
						</Grid>
						<Grid item xs />
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs>
							<TextField disabled label="label" />
						</Grid>
						<Grid item xs>
							<TextField disabled label="label" />
						</Grid>
						<Grid item xs>
							<TextField disabled label="label" />
						</Grid>
					</Grid>
				</div>
			);
		} else {
			return null;
		}
	}
};

export default Home;