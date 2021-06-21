import React from "react";
import WeatherCardContent from "./WeatherCardContent";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import PropTypes from "prop-types";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function WeatherCard(props) {
	const [tabValue, setTabValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setTabValue(newValue);
	};

	return (
		<div>
			<Card>
				<TabPanel value={tabValue} index={0}>
					<WeatherCardContent weather={props.weather.weather[0]} lastUpdate={props.lastUpdate} city={props.city} timeZone={props.timeZone}/>
				</TabPanel>
				<TabPanel value={tabValue} index={1}>
					<WeatherCardContent weather={props.weather.weather[1]} lastUpdate={props.lastUpdate} city={props.city} timeZone={props.timeZone}/>
				</TabPanel>
				<TabPanel value={tabValue} index={2}>
					<WeatherCardContent weather={props.weather.weather[2]} lastUpdate={props.lastUpdate} city={props.city} timeZone={props.timeZone}/>
				</TabPanel>
				<AppBar position="static">
					<Tabs
						value={tabValue}
						onChange={handleChange}
                        centered
                        variant="fullWidth"
					>
                            <Tab label="Today"/>
                            <Tab label="Tomorrow"/>
                            <Tab label="Later"/>
					</Tabs>
				</AppBar>
			</Card>
		</div>
	);
}

export default WeatherCard;
