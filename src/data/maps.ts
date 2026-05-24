export type MapName = "Chernarus" | "Livonia" | "Sakhal";

export interface SpawnZone {
  id: string;
  name: string;
  type: "Military" | "Police" | "Medical" | "Industrial" | "Residential" | "Hunting" | "Crash";
  // Coordinates as percentage of map image (0-100)
  x: number;
  y: number;
  radius: number; // display radius in px
  spawnTags: string[]; // matches Item.spawns values
  description: string;
}

export interface MapData {
  name: MapName;
  description: string;
  bgColor: string;
  accentColor: string;
  zones: SpawnZone[];
}

export const MAPS: Record<MapName, MapData> = {
  Chernarus: {
    name: "Chernarus",
    description: "The original DayZ map. 225 km² of post-Soviet landscape. Densely populated with military installations in the northwest.",
    bgColor: "#0d1a0d",
    accentColor: "#22c55e",
    zones: [
      { id: "ch-tisy", name: "Tisy Military Base", type: "Military", x: 8, y: 18, radius: 32, spawnTags: ["Military", "Tisy", "Tisy Military"], description: "Highest tier military loot. AKM, M4, VSS, NVGs. Most dangerous area on map." },
      { id: "ch-nwaf", name: "NWAF", type: "Military", x: 22, y: 28, radius: 40, spawnTags: ["Military", "NWAF"], description: "Northwest Airfield. Large military compound. Rifles, vests, military gear." },
      { id: "ch-pavlovo", name: "Pavlovo Military", type: "Military", x: 18, y: 72, radius: 24, spawnTags: ["Military"], description: "Southwest military base. Good military loot, less contested than NWAF." },
      { id: "ch-zelenogorsk", name: "Zelenogorsk", type: "Military", x: 24, y: 60, radius: 20, spawnTags: ["Military", "Police"], description: "Military tents and police station. Good mid-tier loot." },
      { id: "ch-kamensk", name: "Kamensk Military", type: "Military", x: 72, y: 12, radius: 22, spawnTags: ["Military"], description: "Northeast military base. AK spawns, military clothing." },
      { id: "ch-crash", name: "Helicopter Crashes", type: "Crash", x: 45, y: 40, radius: 18, spawnTags: ["Helicopter Crash"], description: "Random crash sites across the map. VSS, M4, NVGs, rare military loot." },
      { id: "ch-cherno", name: "Chernogorsk", type: "Residential", x: 50, y: 88, radius: 28, spawnTags: ["Town", "Houses", "Supermarkets", "Police"], description: "Largest city. Police station, supermarkets, residential loot." },
      { id: "ch-elektro", name: "Elektrozavodsk", type: "Industrial", x: 68, y: 88, radius: 24, spawnTags: ["Industrial", "Town", "Houses"], description: "Industrial city on the coast. Factory loot, residential spawns." },
      { id: "ch-berezino", name: "Berezino", type: "Medical", x: 88, y: 58, radius: 22, spawnTags: ["Medical", "Hospitals", "Town"], description: "East coast city with hospital. Best medical loot on the coast." },
      { id: "ch-gorka", name: "Gorka", type: "Medical", x: 74, y: 38, radius: 18, spawnTags: ["Medical", "Hospitals"], description: "Inland town with medical clinic. Good medical supply runs." },
      { id: "ch-factory", name: "Factories / Industrial", type: "Industrial", x: 36, y: 78, radius: 20, spawnTags: ["Industrial", "Chemical Plants"], description: "Industrial zones. NBC suits, tools, mechanical items." },
      { id: "ch-hunting", name: "Hunting Stands", type: "Hunting", x: 55, y: 30, radius: 16, spawnTags: ["Hunting Stands", "Hunting"], description: "Scattered across forests. Mosin, CR-527, hunting jackets, backpacks." },
      { id: "ch-police", name: "Police Stations", type: "Police", x: 42, y: 65, radius: 16, spawnTags: ["Police", "Police Stations"], description: "Found in most towns. Glock, MP5, stab vests, handcuffs." },
    ],
  },

  Livonia: {
    name: "Livonia",
    description: "163 km² DLC map set in Eastern Europe. Dense forests, dynamic weather, and unique industrial zones. More compact and intense than Chernarus.",
    bgColor: "#0d130d",
    accentColor: "#3b82f6",
    zones: [
      { id: "lv-lukow", name: "Lukow Airfield", type: "Military", x: 30, y: 25, radius: 34, spawnTags: ["Military", "NWAF"], description: "Main military airfield. Highest tier loot on Livonia. Heavily contested." },
      { id: "lv-nadbor", name: "Nadbor", type: "Residential", x: 55, y: 35, radius: 22, spawnTags: ["Town", "Houses", "Supermarkets"], description: "Largest town on Livonia. Good residential and police loot." },
      { id: "lv-police", name: "Police Stations", type: "Police", x: 65, y: 55, radius: 16, spawnTags: ["Police", "Police Stations"], description: "Scattered across towns. Pistols, SMGs, police gear." },
      { id: "lv-hospital", name: "Hospitals / Clinics", type: "Medical", x: 40, y: 60, radius: 18, spawnTags: ["Medical", "Hospitals", "Clinics"], description: "Medical facilities across the map. Morphine, epinephrine, blood bags." },
      { id: "lv-industrial", name: "Industrial Zones", type: "Industrial", x: 72, y: 30, radius: 22, spawnTags: ["Industrial", "Chemical Plants"], description: "Factories and chemical plants. NBC suits, gas masks, tools." },
      { id: "lv-crash", name: "Helicopter Crashes", type: "Crash", x: 50, y: 50, radius: 16, spawnTags: ["Helicopter Crash"], description: "Random crash sites. Rare military loot — M4, VSS, NVGs." },
      { id: "lv-hunting", name: "Hunting Stands", type: "Hunting", x: 20, y: 70, radius: 16, spawnTags: ["Hunting Stands", "Hunting"], description: "Dense forest hunting stands. Rifles, hunting gear, backpacks." },
      { id: "lv-military", name: "Military Checkpoints", type: "Military", x: 80, y: 45, radius: 20, spawnTags: ["Military"], description: "Military roadblocks and bases. AK rifles, military clothing and vests." },
      { id: "lv-villages", name: "Villages", type: "Residential", x: 25, y: 82, radius: 18, spawnTags: ["Houses", "Farm"], description: "Rural villages and farms. Civilian loot, food, basic clothing." },
    ],
  },

  Sakhal: {
    name: "Sakhal",
    description: "83 km² volcanic island map. Extreme cold, geothermal hazards, and unique survival challenges. Dense with military content despite smaller size.",
    bgColor: "#0d0f14",
    accentColor: "#ef4444",
    zones: [
      { id: "sk-military-north", name: "Northern Military Base", type: "Military", x: 45, y: 15, radius: 30, spawnTags: ["Military", "Tisy Military"], description: "Primary military installation. Highest tier loot on Sakhal." },
      { id: "sk-military-east", name: "Eastern Garrison", type: "Military", x: 78, y: 42, radius: 22, spawnTags: ["Military", "NWAF"], description: "Eastern military complex. Good rifle and vest spawns." },
      { id: "sk-geothermal", name: "Geothermal Plant", type: "Industrial", x: 35, y: 55, radius: 24, spawnTags: ["Industrial", "Chemical Plants"], description: "Hazardous industrial zone. NBC gear, tools, industrial loot." },
      { id: "sk-port", name: "Port Town", type: "Residential", x: 60, y: 78, radius: 22, spawnTags: ["Town", "Houses", "Supermarkets"], description: "Main coastal settlement. Residential loot, police station, food." },
      { id: "sk-medical", name: "Medical Facilities", type: "Medical", x: 25, y: 70, radius: 18, spawnTags: ["Medical", "Hospitals"], description: "Hospitals and clinics. Critical medical supplies." },
      { id: "sk-police", name: "Police Stations", type: "Police", x: 55, y: 60, radius: 14, spawnTags: ["Police", "Police Stations"], description: "Town police stations. Sidearms, SMGs, police vests." },
      { id: "sk-hunting", name: "Hunting Stands", type: "Hunting", x: 18, y: 35, radius: 14, spawnTags: ["Hunting Stands", "Hunting"], description: "Forest hunting platforms. Rifles, warm clothing, backpacks." },
      { id: "sk-villages", name: "Villages / Farms", type: "Residential", x: 72, y: 22, radius: 16, spawnTags: ["Houses", "Farm"], description: "Remote villages. Food, civilian clothing, basic tools." },
      { id: "sk-crash", name: "Helicopter Crashes", type: "Crash", x: 50, y: 40, radius: 14, spawnTags: ["Helicopter Crash"], description: "Random crash sites. Rare military loot spawns." },
    ],
  },
};

export const ZONE_TYPE_COLORS: Record<SpawnZone["type"], { fill: string; stroke: string; label: string }> = {
  Military: { fill: "rgba(34,197,94,0.18)", stroke: "#22c55e", label: "#22c55e" },
  Police:   { fill: "rgba(168,85,247,0.18)", stroke: "#a855f7", label: "#a855f7" },
  Medical:  { fill: "rgba(59,130,246,0.18)", stroke: "#3b82f6", label: "#3b82f6" },
  Industrial: { fill: "rgba(239,68,68,0.18)", stroke: "#ef4444", label: "#ef4444" },
  Residential: { fill: "rgba(156,163,175,0.18)", stroke: "#9ca3af", label: "#9ca3af" },
  Hunting:  { fill: "rgba(245,158,11,0.18)", stroke: "#f59e0b", label: "#f59e0b" },
  Crash:    { fill: "rgba(251,191,36,0.18)", stroke: "#fbbf24", label: "#fbbf24" },
};
