import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

function WeatherCardContent(props) {
	return (
		<CardContent style={{color:"White"}}>
			<Grid container justify="space-between" alignItems="center">
				<Grid item>
					<Typography variant="h5">{props.city}</Typography>
					<Typography variant="h3">{Math.round(props.weather.temp.max*10)/10} °C</Typography>
					<Typography style={{textTransform: "capitalize"}}>{props.weather.weather[0].description}</Typography>
					<Typography>Wind: {Math.round(props.weather.wind_speed*10)/10} m/s</Typography>
					<Typography>Pressure: {props.weather.pressure} hPa</Typography>
					<Typography>Humidity: {props.weather.humidity} %</Typography>
					<Typography>
						Sunrise:{" "}
						{(new Date(props.weather.sunrise * 1000)).toLocaleString("en-AU", {hour:"2-digit", minute:"2-digit", hour12:false, timeZone:props.timeZone})}
					</Typography>
					<Typography>
						Sunset:{" "}
						{(new Date(props.weather.sunset * 1000)).toLocaleString("en-AU", {hour:"2-digit", minute:"2-digit", hour12:false, timeZone:props.timeZone})}
					</Typography>
					<Typography>UV Index: {props.weather.uvi}</Typography>
				</Grid>
				<Grid item>
					<CardMedia
						component="img"
						image={
							"http://openweathermap.org/img/wn/" +
							props.weather.weather[0].icon +
							"@2x.png"
						}
					/>
					<Typography align="right">Last Update:</Typography>
					<Typography align="right">
						{props.lastUpdate.toTimeString().slice(0,5)}
					</Typography>
				</Grid>
			</Grid>
		</CardContent>
	);
}

export default WeatherCardContent;
