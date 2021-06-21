import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

function WeatherCardContent(props) {
	return (
		<CardContent>
			<Grid container justify="space-between" alignItems="center">
				<Grid item>
					<Typography variant="h5">{props.city}</Typography>
					<Typography variant="h3">{props.weather.temp.day} °C</Typography>
					<Typography>{props.weather.weather[0].description}</Typography>
					<Typography>Wind: {props.weather.wind_speed} m/s</Typography>
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
					<Typography>UV: {props.weather.uvi}</Typography>
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
