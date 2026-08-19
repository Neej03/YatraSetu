import { Temple, Zone, CCTVCamera, DarshanSlot, RouteOption, PredictionData, Alert, ResourceAllocation, EmergencyIncident, TempleWeather, TempleId } from '../types';


export const MOCK_TEMPLES: Temple[] = [
  {
    id: 'somnath',
    name: 'Somnath Mahadev Temple',
    location: 'Prabhas Patan, Veraval',
    state: 'Gujarat',
    image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=1000&auto=format&fit=crop',
    totalCapacity: 15000,
    currentCrowd: 8420,
    avgWaitMinutes: 28,
    riskLevel: 'moderate',
    activeAlertsCount: 3,
    description: 'First among the 12 Jyotirlinga shrines of Lord Shiva, located on the western coast of Gujarat.'
  },
  {
    id: 'dwarka',
    name: 'Dwarkadhish Temple',
    location: 'Dwarka',
    state: 'Gujarat',
    image: 'https://images.unsplash.com/photo-1596767073289-4e5cb4d515a4?q=80&w=1000&auto=format&fit=crop',
    totalCapacity: 12000,
    currentCrowd: 5800,
    avgWaitMinutes: 18,
    riskLevel: 'low',
    activeAlertsCount: 1,
    description: 'Sacred temple dedicated to Lord Krishna, known as the Jagat Mandir in ancient Dwarka.'
  },
  {
    id: 'ambaji',
    name: 'Ambaji Temple',
    location: 'Banaskantha',
    state: 'Gujarat',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop',
    totalCapacity: 18000,
    currentCrowd: 14200,
    avgWaitMinutes: 45,
    riskLevel: 'high',
    activeAlertsCount: 5,
    description: 'Major Shakti Peeth shrine situated on the Gabbar Hilltop in Aravalli Range.'
  },
  {
    id: 'pavagadh',
    name: 'Kalika Mata Temple',
    location: 'Pavagadh Hill',
    state: 'Gujarat',
    image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=1000&auto=format&fit=crop',
    totalCapacity: 10000,
    currentCrowd: 4100,
    avgWaitMinutes: 15,
    riskLevel: 'low',
    activeAlertsCount: 0,
    description: 'Historic hilltop temple complex accessed via ropeway and steps near Champaner.'
  }
];

export const INITIAL_ZONES: Record<string, Zone[]> = {
  somnath: [
    {
      id: 'som-z1',
      templeId: 'somnath',
      name: 'Main Gate 1 & Security Plaza',
      category: 'entrance',
      currentCount: 1420,
      maxCapacity: 1500,
      densityPercentage: 94,
      riskLevel: 'critical',
      avgWaitMinutes: 24,
      recommendedAction: 'Restrict Gate 1 access; redirect incoming crowd to Gate 3 North Entrance.',
      coordinates: { x: 22, y: 48 }
    },
    {
      id: 'som-z2',
      templeId: 'somnath',
      name: 'Main Queue Complex (Hall A)',
      category: 'queue',
      currentCount: 2890,
      maxCapacity: 3000,
      densityPercentage: 96,
      riskLevel: 'critical',
      avgWaitMinutes: 38,
      recommendedAction: 'Deploy 4 additional volunteers to manage queue zigzag turnstiles.',
      coordinates: { x: 42, y: 45 }
    },
    {
      id: 'som-z3',
      templeId: 'somnath',
      name: 'Garbhagriha Inner Shrine',
      category: 'shrine',
      currentCount: 1120,
      maxCapacity: 1500,
      densityPercentage: 74,
      riskLevel: 'high',
      avgWaitMinutes: 15,
      recommendedAction: 'Maintain steady 120 pilgrims/min throughput speed.',
      coordinates: { x: 62, y: 40 }
    },
    {
      id: 'som-z4',
      templeId: 'somnath',
      name: 'Prasad & Food Court Plaza',
      category: 'food',
      currentCount: 950,
      maxCapacity: 2000,
      densityPercentage: 47,
      riskLevel: 'moderate',
      avgWaitMinutes: 8,
      recommendedAction: 'Crowd flow normal. Keep water misting fans active.',
      coordinates: { x: 50, y: 72 }
    },
    {
      id: 'som-z5',
      templeId: 'somnath',
      name: 'North Parking & Bus Terminal',
      category: 'parking',
      currentCount: 1200,
      maxCapacity: 3000,
      densityPercentage: 40,
      riskLevel: 'low',
      avgWaitMinutes: 5,
      recommendedAction: 'Parking capacity available. Guide electric shuttles to Zone 2.',
      coordinates: { x: 15, y: 20 }
    },
    {
      id: 'som-z6',
      templeId: 'somnath',
      name: 'Seafront Exit & Promenade',
      category: 'exit',
      currentCount: 730,
      maxCapacity: 2500,
      densityPercentage: 29,
      riskLevel: 'low',
      avgWaitMinutes: 2,
      recommendedAction: 'Clear exit pathway. Recommend for outgoing pilgrims.',
      coordinates: { x: 80, y: 55 }
    },
    {
      id: 'som-z7',
      templeId: 'somnath',
      name: 'Emergency Medical Corridor West',
      category: 'emergency',
      currentCount: 110,
      maxCapacity: 1000,
      densityPercentage: 11,
      riskLevel: 'low',
      avgWaitMinutes: 0,
      recommendedAction: 'Emergency lane clear and ready for ambulance movement.',
      coordinates: { x: 40, y: 82 }
    }
  ]
};

export const INITIAL_CCTV_CAMERAS: CCTVCamera[] = [
  {
    id: 'CAM-01',
    templeId: 'somnath',
    zoneId: 'som-z1',
    name: 'Main Security Gate Entrance',
    peopleCount: 1420,
    density: 'critical',
    aiStatus: 'Surge Alert',
    confidence: 97.4,
    fps: 30,
    videoType: 'main_entrance'
  },
  {
    id: 'CAM-02',
    templeId: 'somnath',
    zoneId: 'som-z2',
    name: 'Queue Hall A Camera North',
    peopleCount: 2890,
    density: 'critical',
    aiStatus: 'Surge Alert',
    confidence: 98.2,
    fps: 30,
    videoType: 'queue_hall'
  },
  {
    id: 'CAM-03',
    templeId: 'somnath',
    zoneId: 'som-z3',
    name: 'Garbhagriha Entry View',
    peopleCount: 1120,
    density: 'high',
    aiStatus: 'Active',
    confidence: 96.1,
    fps: 28,
    videoType: 'shrine_exit'
  },
  {
    id: 'CAM-04',
    templeId: 'somnath',
    zoneId: 'som-z5',
    name: 'Parking Bay B Overhead',
    peopleCount: 1200,
    density: 'low',
    aiStatus: 'Active',
    confidence: 94.5,
    fps: 30,
    videoType: 'parking_bay'
  },
  {
    id: 'CAM-05',
    templeId: 'somnath',
    zoneId: 'som-z7',
    name: 'Emergency West Corridor',
    peopleCount: 110,
    density: 'low',
    aiStatus: 'Active',
    confidence: 99.0,
    fps: 30,
    videoType: 'corridor'
  }
];

export const MOCK_DARSHAN_SLOTS: DarshanSlot[] = [
  {
    id: 'slot-1',
    templeId: 'somnath',
    timeWindow: '04:00 PM - 04:30 PM',
    predictedCrowd: 'critical',
    occupancyPercent: 95,
    isAiRecommended: false,
    availableSeats: 45,
    reasoning: 'Evening Aarti rush hour. High wait times.'
  },
  {
    id: 'slot-2',
    templeId: 'somnath',
    timeWindow: '04:30 PM - 05:00 PM',
    predictedCrowd: 'high',
    occupancyPercent: 82,
    isAiRecommended: false,
    availableSeats: 180,
    reasoning: 'Slight congestion expected near Gate 1.'
  },
  {
    id: 'slot-3',
    templeId: 'somnath',
    timeWindow: '05:30 PM - 06:00 PM',
    predictedCrowd: 'low',
    occupancyPercent: 34,
    isAiRecommended: true,
    availableSeats: 660,
    reasoning: 'Optimal window: 42% lower predicted crowd density, 12 min wait time, cooler ambient weather.'
  },
  {
    id: 'slot-4',
    templeId: 'somnath',
    timeWindow: '06:00 PM - 06:30 PM',
    predictedCrowd: 'moderate',
    occupancyPercent: 58,
    isAiRecommended: false,
    availableSeats: 420,
    reasoning: 'Moderate queue moving smoothly.'
  },
  {
    id: 'slot-5',
    templeId: 'somnath',
    timeWindow: '07:00 PM - 07:30 PM',
    predictedCrowd: 'high',
    occupancyPercent: 88,
    isAiRecommended: false,
    availableSeats: 120,
    reasoning: 'Peak evening light show surge.'
  }
];

export const MOCK_ROUTES: RouteOption[] = [
  {
    id: 'route-a',
    name: 'Route A - Direct Central Walkway',
    type: 'fastest',
    distanceMeters: 450,
    estimatedMinutes: 12,
    crowdLevel: 'critical',
    isAiRecommended: false,
    accessibilityFriendly: false,
    aiReasoning: 'Shortest distance but currently heavily congested at Gate 1 turnstiles.',
    steps: ['North Bus Bay', 'Central Pathway', 'Gate 1 Security', 'Queue Hall A']
  },
  {
    id: 'route-b',
    name: 'Route B - East Canopy Garden Way',
    type: 'safest',
    distanceMeters: 620,
    estimatedMinutes: 14,
    crowdLevel: 'low',
    isAiRecommended: true,
    accessibilityFriendly: true,
    aiReasoning: 'AI Recommended: Has 42% lower crowd density, shaded misting canopy, and wheelchair ramps.',
    steps: ['North Bus Bay', 'East Garden Ramp', 'Gate 3 Fast Pass Entry', 'Inner Courtyard']
  },
  {
    id: 'route-c',
    name: 'Route C - Promenade Coastal Bypass',
    type: 'least_crowded',
    distanceMeters: 780,
    estimatedMinutes: 16,
    crowdLevel: 'low',
    isAiRecommended: false,
    accessibilityFriendly: true,
    aiReasoning: 'Scenic coastal path with zero queue congestion.',
    steps: ['Parking Lot B', 'Seafront Promenade', 'South Gate Entrance', 'Inner Shrine']
  }
];

export const MOCK_PREDICTIONS: PredictionData[] = [
  { timeLabel: '12:00 PM', currentCrowd: 4200, predictedCrowd: 4500, capacityLimit: 15000, surgeRisk: 25 },
  { timeLabel: '02:00 PM', currentCrowd: 5800, predictedCrowd: 6100, capacityLimit: 15000, surgeRisk: 40 },
  { timeLabel: '04:00 PM', currentCrowd: 7900, predictedCrowd: 8300, capacityLimit: 15000, surgeRisk: 72 },
  { timeLabel: '06:00 PM', currentCrowd: 8420, predictedCrowd: 11200, capacityLimit: 15000, surgeRisk: 89 },
  { timeLabel: '08:00 PM', currentCrowd: 6100, predictedCrowd: 9500, capacityLimit: 15000, surgeRisk: 65 },
  { timeLabel: '10:00 PM', currentCrowd: 2900, predictedCrowd: 3200, capacityLimit: 15000, surgeRisk: 18 }
];

export const INITIAL_ALERTS: Alert[] = [
  {
    id: 'alt-101',
    templeId: 'somnath',
    zoneName: 'Main Queue Complex (Hall A)',
    severity: 'critical',
    title: 'CRITICAL CROWD DENSITY DETECTED',
    message: 'Queue Hall A has reached 96% of safe physical capacity (2,890 people). Risk of bottleneck buildup.',
    recommendedAction: 'Restrict Gate 1 entry turnstiles and activate East Promenade redirection signage.',
    timestamp: '2 mins ago',
    isAcknowledged: false
  },
  {
    id: 'alt-102',
    templeId: 'somnath',
    zoneName: 'Main Gate 1',
    severity: 'high',
    title: 'HIGH ENTRY SURGE PREDICTED',
    message: 'AI Computer Vision forecasts 31% influx surge between 06:00 PM and 07:00 PM due to Evening Aarti.',
    recommendedAction: 'Open Gate 3 auxiliary entry lane for pre-booked Darshan Pass holders.',
    timestamp: '8 mins ago',
    isAcknowledged: false
  },
  {
    id: 'alt-103',
    templeId: 'somnath',
    zoneName: 'Prasad Plaza',
    severity: 'moderate',
    title: 'MODERATE HEAT DENSITY',
    message: 'Ambient temp 33°C with 68% crowd occupancy. Heat discomfort index rising.',
    recommendedAction: 'Increase misting system spray rate in courtyard.',
    timestamp: '20 mins ago',
    isAcknowledged: true
  }
];

export const INITIAL_RESOURCES: ResourceAllocation[] = [
  {
    zoneId: 'som-z1',
    zoneName: 'Main Gate 1 & Plaza',
    policeCount: 14,
    medicalCount: 2,
    volunteerCount: 18,
    barricades: 12,
    ambulances: 1,
    waterStations: 3,
    aiSuggestedVolunteers: 24,
    aiSuggestedPolice: 18
  },
  {
    zoneId: 'som-z2',
    zoneName: 'Queue Complex Hall A',
    policeCount: 10,
    medicalCount: 3,
    volunteerCount: 22,
    barricades: 16,
    ambulances: 1,
    waterStations: 4,
    aiSuggestedVolunteers: 28,
    aiSuggestedPolice: 14
  },
  {
    zoneId: 'som-z3',
    zoneName: 'Garbhagriha Inner Shrine',
    policeCount: 12,
    medicalCount: 2,
    volunteerCount: 15,
    barricades: 8,
    ambulances: 0,
    waterStations: 2,
    aiSuggestedVolunteers: 18,
    aiSuggestedPolice: 12
  }
];

export const INITIAL_EMERGENCY_INCIDENTS: EmergencyIncident[] = [
  {
    id: 'inc-901',
    templeId: 'somnath',
    zoneName: 'Main Queue Complex (Hall A)',
    type: 'Crowd Surge',
    riskScore: 92,
    status: 'Responding',
    reportedAt: '18:04:12',
    assignedTeam: 'Rapid Police Response Team 2',
    emergencyRouteOpened: true
  }
];

export const MOCK_WEATHER_DATA: Record<TempleId, TempleWeather> = {
  somnath: {
    templeId: 'somnath',
    templeName: 'Somnath Mahadev Temple',
    currentTemp: 29,
    feelsLike: 31,
    condition: 'breeze',
    conditionText: 'Pleasant Sea Breeze',
    humidity: 72,
    windSpeed: 18,
    windDirection: 'SW 215°',
    uvIndex: 4,
    aqi: 38,
    aqiLevel: 'Good',
    thermalComfort: 'Ideal',
    mistingStatus: 'Active',
    rainProbability: 10,
    weatherAlert: '🌊 Moderate coastal humidity. Misting canopies active on Route B.',
    hourly: [
      { time: '12:00 PM', temp: 32, feelsLike: 35, rainChance: 5, condition: 'clear', humidity: 65, windSpeed: 14, crowdHeatImpact: 'moderate_heat' },
      { time: '02:00 PM', temp: 33, feelsLike: 36, rainChance: 5, condition: 'clear', humidity: 62, windSpeed: 16, crowdHeatImpact: 'high_heat' },
      { time: '04:00 PM', temp: 31, feelsLike: 33, rainChance: 10, condition: 'breeze', humidity: 70, windSpeed: 18, crowdHeatImpact: 'comfortable' },
      { time: '06:00 PM', temp: 29, feelsLike: 30, rainChance: 10, condition: 'breeze', humidity: 74, windSpeed: 20, crowdHeatImpact: 'comfortable' },
      { time: '08:00 PM', temp: 27, feelsLike: 28, rainChance: 15, condition: 'partly_cloudy', humidity: 78, windSpeed: 17, crowdHeatImpact: 'comfortable' },
      { time: '10:00 PM', temp: 26, feelsLike: 27, rainChance: 10, condition: 'clear', humidity: 80, windSpeed: 15, crowdHeatImpact: 'comfortable' }
    ],
    daily: [
      { day: 'Today', date: 'Aug 19', tempMax: 33, tempMin: 25, condition: 'breeze', rainChance: 10, humidity: 72, summary: 'Pleasant evening coastal breeze with clear skies.', advisory: 'Best Darshan Window: 05:30 PM - 07:00 PM' },
      { day: 'Wed', date: 'Aug 20', tempMax: 32, tempMin: 26, condition: 'partly_cloudy', rainChance: 20, humidity: 75, summary: 'Scattered clouds, light sea breeze.', advisory: 'High misting fans recommended between 1 PM - 4 PM.' },
      { day: 'Thu', date: 'Aug 21', tempMax: 30, tempMin: 25, condition: 'rain', rainChance: 65, humidity: 85, summary: 'Coastal rain showers expected in afternoon.', advisory: 'Use covered Hall A queue complex during rains.' },
      { day: 'Fri', date: 'Aug 22', tempMax: 31, tempMin: 25, condition: 'partly_cloudy', rainChance: 30, humidity: 78, summary: 'Clearing skies post morning drizzle.', advisory: 'Good conditions for evening light show.' },
      { day: 'Sat', date: 'Aug 23', tempMax: 33, tempMin: 26, condition: 'heatwave', rainChance: 5, humidity: 68, summary: 'Warm sunny day with light coastal breeze.', advisory: 'Stay hydrated at Food Court water stations.' },
      { day: 'Sun', date: 'Aug 24', tempMax: 32, tempMin: 26, condition: 'breeze', rainChance: 15, humidity: 70, summary: 'Comfortable ocean breeze, moderate rush.', advisory: 'Optimal weekend Darshan slot: 04:30 PM.' },
      { day: 'Mon', date: 'Aug 25', tempMax: 31, tempMin: 25, condition: 'clear', rainChance: 10, humidity: 73, summary: 'Sunny skies with steady onshore breeze.', advisory: 'All queue corridors at pleasant thermal index.' }
    ]
  },
  dwarka: {
    templeId: 'dwarka',
    templeName: 'Dwarkadhish Temple',
    currentTemp: 31,
    feelsLike: 35,
    condition: 'breeze',
    conditionText: 'Strong Coastal Breeze',
    humidity: 78,
    windSpeed: 24,
    windDirection: 'WSW 240°',
    uvIndex: 7,
    aqi: 42,
    aqiLevel: 'Good',
    thermalComfort: 'Moderate Heat',
    mistingStatus: 'Full Power',
    rainProbability: 25,
    weatherAlert: '☀️ High UV Index (7). Drink plenty of water at Gate 2 refreshment kiosk.',
    hourly: [
      { time: '12:00 PM', temp: 33, feelsLike: 37, rainChance: 15, condition: 'clear', humidity: 72, windSpeed: 20, crowdHeatImpact: 'high_heat' },
      { time: '02:00 PM', temp: 34, feelsLike: 39, rainChance: 20, condition: 'heatwave', humidity: 70, windSpeed: 22, crowdHeatImpact: 'high_heat' },
      { time: '04:00 PM', temp: 32, feelsLike: 36, rainChance: 25, condition: 'breeze', humidity: 76, windSpeed: 25, crowdHeatImpact: 'moderate_heat' },
      { time: '06:00 PM', temp: 30, feelsLike: 33, rainChance: 20, condition: 'partly_cloudy', humidity: 80, windSpeed: 24, crowdHeatImpact: 'comfortable' },
      { time: '08:00 PM', temp: 28, feelsLike: 30, rainChance: 15, condition: 'clear', humidity: 82, windSpeed: 21, crowdHeatImpact: 'comfortable' },
      { time: '10:00 PM', temp: 27, feelsLike: 29, rainChance: 10, condition: 'clear', humidity: 84, windSpeed: 18, crowdHeatImpact: 'comfortable' }
    ],
    daily: [
      { day: 'Today', date: 'Aug 19', tempMax: 34, tempMin: 27, condition: 'breeze', rainChance: 25, humidity: 78, summary: 'Strong coastal wind cooling queue corridors.', advisory: 'Hydration counters open at all entry gates.' },
      { day: 'Wed', date: 'Aug 20', tempMax: 33, tempMin: 27, condition: 'partly_cloudy', rainChance: 30, humidity: 80, summary: 'Partly cloudy sky with humid ocean breeze.', advisory: 'Queue wait times lowest in early morning.' },
      { day: 'Thu', date: 'Aug 21', tempMax: 31, tempMin: 26, condition: 'rain', rainChance: 70, humidity: 88, summary: 'Monsoon squall showers expected near coast.', advisory: 'Covered canopy walkways activated.' },
      { day: 'Fri', date: 'Aug 22', tempMax: 32, tempMin: 26, condition: 'breeze', rainChance: 35, humidity: 82, summary: 'Breezy day with passing light drizzles.', advisory: 'Comfortable queue movement.' },
      { day: 'Sat', date: 'Aug 23', tempMax: 34, tempMin: 27, condition: 'clear', rainChance: 15, humidity: 75, summary: 'Sunny day with active sea wind.', advisory: 'Sunshade umbrellas distributed at Queue Gate 1.' },
      { day: 'Sun', date: 'Aug 24', tempMax: 33, tempMin: 27, condition: 'partly_cloudy', rainChance: 20, humidity: 77, summary: 'Warm afternoon, cool coastal dusk.', advisory: 'Evening Aarti crowd best served via East Ramp.' },
      { day: 'Mon', date: 'Aug 25', tempMax: 32, tempMin: 26, condition: 'clear', rainChance: 10, humidity: 76, summary: 'Clear blue sky with steady maritime breeze.', advisory: 'All queue parameters at normal levels.' }
    ]
  },
  ambaji: {
    templeId: 'ambaji',
    templeName: 'Ambaji Temple',
    currentTemp: 34,
    feelsLike: 38,
    condition: 'heatwave',
    conditionText: 'High Hilltop Sun & Heat',
    humidity: 58,
    windSpeed: 10,
    windDirection: 'NE 45°',
    uvIndex: 9,
    aqi: 45,
    aqiLevel: 'Good',
    thermalComfort: 'High Heat Stress',
    mistingStatus: 'Full Power',
    rainProbability: 5,
    weatherAlert: '🔥 HIGH HEAT WARNING: 34°C at Gabbar Hill stairs. High misting fans running.',
    hourly: [
      { time: '12:00 PM', temp: 35, feelsLike: 39, rainChance: 5, condition: 'heatwave', humidity: 52, windSpeed: 8, crowdHeatImpact: 'high_heat' },
      { time: '02:00 PM', temp: 36, feelsLike: 40, rainChance: 5, condition: 'heatwave', humidity: 50, windSpeed: 9, crowdHeatImpact: 'high_heat' },
      { time: '04:00 PM', temp: 34, feelsLike: 37, rainChance: 10, condition: 'partly_cloudy', humidity: 56, windSpeed: 12, crowdHeatImpact: 'high_heat' },
      { time: '06:00 PM', temp: 31, feelsLike: 33, rainChance: 15, condition: 'clear', humidity: 62, windSpeed: 14, crowdHeatImpact: 'moderate_heat' },
      { time: '08:00 PM', temp: 28, feelsLike: 29, rainChance: 10, condition: 'clear', humidity: 68, windSpeed: 11, crowdHeatImpact: 'comfortable' },
      { time: '10:00 PM', temp: 25, feelsLike: 26, rainChance: 5, condition: 'clear', humidity: 72, windSpeed: 9, crowdHeatImpact: 'comfortable' }
    ],
    daily: [
      { day: 'Today', date: 'Aug 19', tempMax: 36, tempMin: 24, condition: 'heatwave', rainChance: 5, humidity: 58, summary: 'Intense hilltop afternoon heat.', advisory: 'Recommend evening Darshan after 05:30 PM.' },
      { day: 'Wed', date: 'Aug 20', tempMax: 35, tempMin: 24, condition: 'partly_cloudy', rainChance: 15, humidity: 62, summary: 'Warm morning with afternoon cloud shade.', advisory: 'Gabbar ropeway operating at high frequency.' },
      { day: 'Thu', date: 'Aug 21', tempMax: 33, tempMin: 23, condition: 'thunderstorm', rainChance: 60, humidity: 75, summary: 'Hilltop thunderstorm forecast for late evening.', advisory: 'Avoid open hill steps during lightning alert.' },
      { day: 'Fri', date: 'Aug 22', tempMax: 31, tempMin: 22, condition: 'cloudy', rainChance: 40, humidity: 78, summary: 'Pleasant overcast sky with cool mountain breeze.', advisory: 'Ideal day for climbing Gabbar Hill.' },
      { day: 'Sat', date: 'Aug 23', tempMax: 33, tempMin: 23, condition: 'clear', rainChance: 10, humidity: 64, summary: 'Clear sunny sky, moderate temperature.', advisory: 'Misting stations active at main plaza.' },
      { day: 'Sun', date: 'Aug 24', tempMax: 34, tempMin: 24, condition: 'partly_cloudy', rainChance: 15, humidity: 60, summary: 'Warm weekend with light hilltop breeze.', advisory: 'Keep drinking ORS water at relief stalls.' },
      { day: 'Mon', date: 'Aug 25', tempMax: 33, tempMin: 23, condition: 'clear', rainChance: 5, humidity: 59, summary: 'Crisp mountain air, bright sunlight.', advisory: 'Normal queue speeds expected.' }
    ]
  },
  pavagadh: {
    templeId: 'pavagadh',
    templeName: 'Kalika Mata Temple',
    currentTemp: 27,
    feelsLike: 28,
    condition: 'partly_cloudy',
    conditionText: 'Cool Mountain Fog & Breeze',
    humidity: 68,
    windSpeed: 16,
    windDirection: 'E 90°',
    uvIndex: 5,
    aqi: 28,
    aqiLevel: 'Good',
    thermalComfort: 'Ideal',
    mistingStatus: 'Standby',
    rainProbability: 15,
    weatherAlert: '🏔️ Excellent weather at Pavagadh Peak! Ropeway operating with zero wind delays.',
    hourly: [
      { time: '12:00 PM', temp: 28, feelsLike: 30, rainChance: 15, condition: 'partly_cloudy', humidity: 65, windSpeed: 15, crowdHeatImpact: 'comfortable' },
      { time: '02:00 PM', temp: 29, feelsLike: 31, rainChance: 20, condition: 'partly_cloudy', humidity: 64, windSpeed: 17, crowdHeatImpact: 'comfortable' },
      { time: '04:00 PM', temp: 28, feelsLike: 29, rainChance: 15, condition: 'breeze', humidity: 68, windSpeed: 18, crowdHeatImpact: 'comfortable' },
      { time: '06:00 PM', temp: 26, feelsLike: 26, rainChance: 10, condition: 'clear', humidity: 72, windSpeed: 16, crowdHeatImpact: 'comfortable' },
      { time: '08:00 PM', temp: 23, feelsLike: 23, rainChance: 10, condition: 'clear', humidity: 76, windSpeed: 14, crowdHeatImpact: 'comfortable' },
      { time: '10:00 PM', temp: 21, feelsLike: 21, rainChance: 5, condition: 'clear', humidity: 80, windSpeed: 12, crowdHeatImpact: 'comfortable' }
    ],
    daily: [
      { day: 'Today', date: 'Aug 19', tempMax: 29, tempMin: 21, condition: 'partly_cloudy', rainChance: 15, humidity: 68, summary: 'Pleasant mountain climate with light cloud cover.', advisory: 'Perfect weather for ropeway & stairs climb.' },
      { day: 'Wed', date: 'Aug 20', tempMax: 28, tempMin: 21, condition: 'breeze', rainChance: 20, humidity: 70, summary: 'Breezy peak weather with gentle mist.', advisory: 'Ropeway queue wait time under 15 mins.' },
      { day: 'Thu', date: 'Aug 21', tempMax: 26, tempMin: 20, condition: 'rain', rainChance: 55, humidity: 84, summary: 'Mountain drizzle & fog expected on peak.', advisory: 'Climb carefully; use anti-skid step ramp.' },
      { day: 'Fri', date: 'Aug 22', tempMax: 27, tempMin: 20, condition: 'cloudy', rainChance: 30, humidity: 78, summary: 'Cool overcast morning, clear afternoon.', advisory: 'Great thermal comfort for pilgrims.' },
      { day: 'Sat', date: 'Aug 23', tempMax: 29, tempMin: 21, condition: 'clear', rainChance: 10, humidity: 66, summary: 'Sunny day with fresh mountain air.', advisory: 'Early morning Darshan recommended.' },
      { day: 'Sun', date: 'Aug 24', tempMax: 28, tempMin: 21, condition: 'partly_cloudy', rainChance: 15, humidity: 69, summary: 'Mild temperatures and light breeze.', advisory: 'Weekend shuttle services operating normally.' },
      { day: 'Mon', date: 'Aug 25', tempMax: 28, tempMin: 20, condition: 'clear', rainChance: 10, humidity: 65, summary: 'Crisp clear skies over Champaner hills.', advisory: 'All pilgrim facilities operating at 100% capacity.' }
    ]
  }
};

