const Weather = require('../models/Weather');


const addWeather = async (req, res) => {
    try {
        const { location, temperature, humidity, condition } = req.body;

        const newWeather = new Weather({
            location,
            temperature,
            humidity,
            condition,
            userId: req.user.id 
        });
        

        await newWeather.save();
        res.status(201).json({ message: 'Weather record added successfully!', newWeather });
    } catch (error) {
        res.status(500).json({ message: 'Error saving weather data', error: error.message });
    }
};

const getWeather = async (req, res) => {
    try {
        const weatherRecords = await Weather.find({ userId: req.user.id });
        res.status(200).json(weatherRecords);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching weather data', error: error.message });
    }
};

module.exports = { addWeather, getWeather };