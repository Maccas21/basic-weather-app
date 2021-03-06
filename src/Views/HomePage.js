import React from "react";
import { Component } from "react";
import firebase, { database} from "../Common/firebase";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from "@material-ui/core/Typography";

import WeatherCard from "../Components/WeatherCard";

class Home extends Component {
	constructor() {
		super();
		this.state = {
			user: JSON.parse(localStorage.getItem("user")),
			cities: {
				Tokyo: 		{ cLat: 35.6895, 	cLong: 139.6917 	},
				Yokohama: 	{ cLat: 35.4478, 	cLong: 139.6425 	},
				Jakarta: 	{ cLat: -6.2146, 	cLong: 106.8451 	},
				Delhi: 		{ cLat: 28.6667, 	cLong: 77.2167 		},
				Manila: 	{ cLat: 14.6042, 	cLong: 120.9822 	},
				Seoul: 		{ cLat: 37.5683, 	cLong: 126.9778 	},
				Incheon: 	{ cLat: 37.45, 		cLong: 126.4161 	},
				Shanghai: 	{ cLat: 31.2222, 	cLong: 121.4581 	},
				Karachi: 	{ cLat: 24.9056, 	cLong: 67.0822 		},
				Beijing: 	{ cLat: 39.9075, 	cLong: 116.3972 	},
				NewYork: 	{ cLat: 40.7143, 	cLong: -74.006 		},
				SaoPaulo: 	{ cLat: -23.5475, 	cLong: -46.6361 	},
				MexicoCity: { cLat: 19.4285, 	cLong: -99.1277 	},
				Mumbai: 	{ cLat: 19.0144, 	cLong: 72.8479 		},
				Osaka: 		{ cLat: 34.6937, 	cLong: 135.5022 	},
				Kobe: 		{ cLat: 34.6913, 	cLong: 135.183 		},
				Kyoto: 		{ cLat: 35.0211, 	cLong: 135.7538 	},
				Moscow: 	{ cLat: 55.7522, 	cLong: 37.6156 		},
				Dhaka: 		{ cLat: 23.7104, 	cLong: 90.4074 		},
				Cairo: 		{ cLat: 30.0626, 	cLong: 31.2497 		},
				LosAngeles: { cLat: 34.0522, 	cLong: -118.2437	},
				Bangkok: 	{ cLat: 13.75, 		cLong: 100.5167 	},
				London: 	{ cLat: 51.5085, 	cLong: -0.1257 		},
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
			weather: [
				//{Name: "",
				//weather: [],
				//LastUpdate: new Date(),},
			],
			cardWeatherNames: ["Tokyo", "Tokyo", "Tokyo", "Tokyo"],
			hasData: false,
			tabValue: 0,
		};
	}

	componentDidMount = async () => {
		//get cities from db
		if(this.state.user!= null) 
			this.getCityFromDB();
		
		//get weather from api
		for(let i = 0; i < this.state.cardWeatherNames.length; i++)
			this.getWeather(this.state.cardWeatherNames[i], i);
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
		const url = this.getAPIURL(City.replace(" ", ""));
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
					timeZone: data.timezone,
				};

				CityWeather.weather.push(data.daily[0]); //today
				CityWeather.weather.push(data.daily[1]); //tomorrow
				CityWeather.weather.push(data.daily[2]); //day after
				
				let weathers = this.state.weather;
				weathers[weatherIndex] = CityWeather;
				this.setState({weather: weathers});
				this.setState({ hasData: true });
			});
	};

	getCityFromDB(){
		const cityRef = database()
			.ref("cities/" + this.state.user.uid + "/");

		cityRef.on("value", (snapshot) => {
			try {
				let cities = snapshot.val();
				let stateCities = this.state.cardWeatherNames;
				
				for(let i=0; i < cities.length; i++) {stateCities[i+1] = cities[i];}
				
				this.setState({cardWeatherNames: stateCities});
			}
			catch(e) {
				console.log(e);
			}
		});
	}

	signInOut = (event) => {
		if (this.state.user != null) firebase.auth().signOut();
        else this.props.history.push("/login");
	};

	weatherCardComponent = (index) => {
		if(this.state.weather[index] != null){
			return (
				<>
					<Autocomplete
						id={"txt_city_names"+index}
						value={this.state.cardWeatherNames[index]}
						defaultValue={this.state.cardWeatherNames[index]}
						disableClearable
						onChange={(event, newValue) =>
							this.autoCompleteOnChange(event, index, newValue)
						}
						options={this.state.cityNames}
						style={{ width: 300 }}
						renderInput={(params) => (
							<TextField {...params} label="Cities" variant="outlined" />
						)}
						justify="center"
					/>
					<WeatherCard
						weather={this.state.weather[index]}
						lastUpdate={this.state.weather[index].LastUpdate}
						city={this.state.cardWeatherNames[index]}
						timeZone={this.state.weather[index].timeZone}
					/>
				</>
			);
		}
	}

	autoCompleteOnChange = async(event, index, newValue) => {
		let dropDownVals = this.state.cardWeatherNames;
		dropDownVals[index] = newValue;
		this.setState({cardWeatherNames: dropDownVals});

		this.getWeather(newValue.replace(" ", ""), index);

		//change database city if saved locations
		if(this.state.user != null && index > 0){
			await database().ref("cities/" + this.state.user.uid + "/" + (index-1) + "/").set(newValue)
			.catch((error) => console.log(error));
		}
	}

	render() {
		if (this.state.hasData) {

			var loggedInCards = [];

			if (this.state.user != null) {
				try{
					for (let i = 1; i < 4; i++)
						loggedInCards[i-1] = this.weatherCardComponent(i);
				} catch(e){
					console.log(e);
				}
			}

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
							{this.weatherCardComponent(0)}
						</Grid>
						<Grid item xs />
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs>
							{this.state.user != null? <Typography variant="h6">Saved Locations:</Typography> : <div/>}
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs>
							{loggedInCards[0]}
						</Grid>
						<Grid item xs>
							{loggedInCards[1]}
						</Grid>
						<Grid item xs>
							{loggedInCards[2]}
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