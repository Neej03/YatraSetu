export type TempleId = 'somnath' | 'dwarka' | 'ambaji' | 'pavagadh';

export type CrowdLevel = 'low' | 'moderate' | 'high' | 'critical';

export type UserRole = 'pilgrim' | 'authority' | 'police' | 'medical' | 'volunteer' | 'admin';

export type LanguageCode = 'en' | 'hi' | 'gu' | 'mr' | 'ta' | 'te' | 'kn' | 'bn';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export interface Temple {
  id: TempleId;
  name: string;
  location: string;
  state: string;
  image: string;
  totalCapacity: number;
  currentCrowd: number;
  avgWaitMinutes: number;
  riskLevel: CrowdLevel;
  activeAlertsCount: number;
  description: string;
}

export interface Zone {
  id: string;
  templeId: TempleId;
  name: string;
  category: 'entrance' | 'queue' | 'shrine' | 'parking' | 'food' | 'exit' | 'emergency';
  currentCount: number;
  maxCapacity: number;
  densityPercentage: number;
  riskLevel: CrowdLevel;
  avgWaitMinutes: number;
  recommendedAction: string;
  coordinates: { x: number; y: number }; // percentage coords on map canvas
}

export interface CCTVCamera {
  id: string;
  templeId: TempleId;
  zoneId: string;
  name: string;
  peopleCount: number;
  density: CrowdLevel;
  aiStatus: 'Active' | 'Calibrating' | 'Surge Alert';
  confidence: number;
  fps: number;
  streamUrl?: string;
  videoType: 'main_entrance' | 'queue_hall' | 'shrine_exit' | 'parking_bay' | 'corridor';
}

export interface DarshanSlot {
  id: string;
  templeId: TempleId;
  timeWindow: string; // e.g. "05:30 PM - 06:00 PM"
  predictedCrowd: CrowdLevel;
  occupancyPercent: number;
  isAiRecommended: boolean;
  availableSeats: number;
  reasoning?: string;
}

export interface BookingPass {
  bookingId: string;
  templeName: string;
  date: string;
  timeSlot: string;
  visitorCount: number;
  primaryVisitorName: string;
  assignedGate: string;
  qrData: string;
  status: 'Confirmed' | 'Checked In' | 'Cancelled';
  createdAt: string;
}

export interface RouteOption {
  id: string;
  name: string; // e.g. "Route B - North Corridor"
  type: 'fastest' | 'safest' | 'least_crowded';
  distanceMeters: number;
  estimatedMinutes: number;
  crowdLevel: CrowdLevel;
  isAiRecommended: boolean;
  accessibilityFriendly: boolean;
  aiReasoning: string;
  steps: string[];
}

export interface PredictionData {
  timeLabel: string;
  currentCrowd: number;
  predictedCrowd: number;
  capacityLimit: number;
  surgeRisk: number; // 0-100%
}

export interface Alert {
  id: string;
  templeId: TempleId;
  zoneName: string;
  severity: 'info' | 'moderate' | 'high' | 'critical';
  title: string;
  message: string;
  recommendedAction: string;
  timestamp: string;
  isAcknowledged: boolean;
}

export interface ResourceAllocation {
  zoneId: string;
  zoneName: string;
  policeCount: number;
  medicalCount: number;
  volunteerCount: number;
  barricades: number;
  ambulances: number;
  waterStations: number;
  aiSuggestedVolunteers: number;
  aiSuggestedPolice: number;
}

export interface EmergencyIncident {
  id: string;
  templeId: TempleId;
  zoneName: string;
  type: 'Crowd Surge' | 'Medical Distress' | 'Bottleneck Risk' | 'Lost Child' | 'Barricade Overrun';
  riskScore: number;
  status: 'Detected' | 'Responding' | 'Contained' | 'Resolved';
  reportedAt: string;
  assignedTeam: string;
  emergencyRouteOpened: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  actionPayload?: {
    type: 'slot_booking' | 'route_view' | 'map_navigate' | 'weather_view';
    data?: any;
  };
}

export type WeatherCondition = 'clear' | 'partly_cloudy' | 'cloudy' | 'rain' | 'thunderstorm' | 'breeze' | 'heatwave';

export interface HourlyWeather {
  time: string; // e.g. "04:00 PM"
  temp: number; // in Celsius
  feelsLike: number;
  rainChance: number; // 0-100%
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number; // km/h
  crowdHeatImpact: 'comfortable' | 'moderate_heat' | 'high_heat' | 'rain_risk';
}

export interface DailyWeather {
  day: string; // e.g. "Wed"
  date: string; // e.g. "Aug 20"
  tempMax: number;
  tempMin: number;
  condition: WeatherCondition;
  rainChance: number;
  humidity: number;
  summary: string;
  advisory: string;
}

export interface TempleWeather {
  templeId: TempleId;
  templeName: string;
  currentTemp: number;
  feelsLike: number;
  condition: WeatherCondition;
  conditionText: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  uvIndex: number;
  aqi: number;
  aqiLevel: 'Good' | 'Moderate' | 'Poor';
  thermalComfort: 'Ideal' | 'Moderate Heat' | 'High Heat Stress';
  mistingStatus: 'Active' | 'Standby' | 'Full Power';
  rainProbability: number;
  weatherAlert?: string;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
}

