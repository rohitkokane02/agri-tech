const PestAlert = require('../models/PestAlert');

const defaultAlerts = [
    {
        cropName: 'Wheat',
        pestOrDisease: 'Yellow Rust (Puccinia striiformis)',
        severity: 'High',
        symptoms: 'Yellow stripe-like spore pustules on leaves leading to premature leaf drying.',
        treatment: 'Spray Propiconazole 25% EC @ 1ml/L of water. Ensure proper spacing to prevent humidity build-up.',
        affectedRegion: 'North & Central Zones'
    },
    {
        cropName: 'Cotton',
        pestOrDisease: 'Pink Bollworm (Pectinophora gossypiella)',
        severity: 'Critical',
        symptoms: 'Rosette flowers, unopen damaged bolls with lint staining.',
        treatment: 'Deploy Pheromone traps @ 8 traps/acre. Spray Chlorantraniliprole 18.5% SC @ 0.3 ml/L.',
        affectedRegion: 'Western & Southern Belts'
    },
    {
        cropName: 'Rice / Paddy',
        pestOrDisease: 'Brown Plant Hopper (BPH)',
        severity: 'Medium',
        symptoms: 'Hopper burn patches in fields, yellowing of lower leaves.',
        treatment: 'Alternate wetting and drying of rice field. Apply Triflumezopyrim 10% SC @ 0.5 ml/L.',
        affectedRegion: 'River Basin Regions'
    },
    {
        cropName: 'Tomato / Potato',
        pestOrDisease: 'Late Blight (Phytophthora infestans)',
        severity: 'High',
        symptoms: 'Dark water-soaked lesions on leaf margins with white fungal growth underneath.',
        treatment: 'Apply Mancozeb 75% WP @ 2.5g/L or Cymoxanil + Mancozeb spray during high humidity periods.',
        affectedRegion: 'Hilly & High Moisture Areas'
    }
];


const getPestAlerts = async (req, res) => {
    try {
        let alerts = await PestAlert.find().sort({ dateReported: -1 });
        if (alerts.length === 0) {
            alerts = await PestAlert.insertMany(defaultAlerts);
        }
        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pest alerts', error: error.message });
    }
};

const createPestAlert = async (req, res) => {
    try {
        const { cropName, pestOrDisease, severity, symptoms, treatment, affectedRegion } = req.body;
        const alert = new PestAlert({ cropName, pestOrDisease, severity, symptoms, treatment, affectedRegion });
        await alert.save();
        res.status(201).json({ message: 'Pest alert logged', alert });
    } catch (error) {
        res.status(500).json({ message: 'Error creating pest alert', error: error.message });
    }
};

module.exports = { getPestAlerts, createPestAlert };
