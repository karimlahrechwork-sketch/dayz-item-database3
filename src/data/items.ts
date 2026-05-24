export type Category = "weapons" | "gear" | "medical" | "food" | "tools";
export type Map = "Chernarus" | "Livonia" | "Sakhal";
export type Tier = 1 | 2 | 3 | 4;

export interface Item {
  id: number;
  name: string;
  type: string;
  cat: Category;
  icon: string;
  damage?: number;
  weight: number;
  slots: number;
  protection?: number;
  calories?: number;
  water?: number;
  effect?: string;
  use?: string;
  ammo?: string;
  tier: Tier;
  rarity: string;
  maps: Map[];
  spawns: string[];
  desc: string;
  attachments?: string[];
}

export const ITEMS: Item[] = [
  // ─── WEAPONS ───────────────────────────────────────────────────────────────
  { id: 1, name: "AKM", type: "Assault Rifle", cat: "weapons", icon: "⚔️", damage: 95, weight: 3.8, slots: 6, ammo: "7.62x39mm", tier: 3, rarity: "Military", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Military", "NWAF", "Tisy"], desc: "Iconic Soviet assault rifle. High damage, moderate recoil. Found exclusively in military zones.", attachments: ["AK Suppressor", "PU Scope", "AKM 30Rnd Mag"] },
  { id: 2, name: "M4-A1", type: "Assault Rifle", cat: "weapons", icon: "⚔️", damage: 88, weight: 3.2, slots: 6, ammo: "5.56x45mm", tier: 4, rarity: "Rare Military", maps: ["Chernarus", "Livonia"], spawns: ["Tisy Military", "Helicopter Crash"], desc: "US military rifle with high rate of fire. Extremely rare on console official servers.", attachments: ["M4 Suppressor", "ACOG Scope", "STANAG 30Rnd Mag"] },
  { id: 3, name: "Mosin 91/30", type: "Bolt Action", cat: "weapons", icon: "⚔️", damage: 100, weight: 4.0, slots: 5, ammo: "7.62x54mmR", tier: 2, rarity: "Residential", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Houses", "Hunting Stands", "Military"], desc: "Powerful bolt-action rifle. One-shot potential at range. Common in residential areas.", attachments: ["PU Scope", "Bayonet", "Compensator"] },
  { id: 4, name: "SKS", type: "Semi-Auto Rifle", cat: "weapons", icon: "⚔️", damage: 85, weight: 3.5, slots: 5, ammo: "7.62x39mm", tier: 2, rarity: "Residential / Military", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Houses", "Military", "Police"], desc: "Reliable semi-automatic rifle. Good balance of damage and fire rate. Shares ammo with AKM.", attachments: ["PU Scope", "SKS 10Rnd Mag"] },
  { id: 5, name: "Glock 19", type: "Pistol", cat: "weapons", icon: "🔫", damage: 40, weight: 0.9, slots: 3, ammo: "9x19mm Parabellum", tier: 1, rarity: "Common", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Police", "Military", "Town"], desc: "Common 9mm pistol. Reliable sidearm with widely available ammunition.", attachments: ["Glock Suppressor", "Glock 15Rnd Mag"] },
  { id: 6, name: "MP5-K", type: "SMG", cat: "weapons", icon: "⚔️", damage: 45, weight: 1.8, slots: 5, ammo: "9x19mm Parabellum", tier: 3, rarity: "Military", maps: ["Chernarus", "Livonia"], spawns: ["Military", "Police", "Tisy"], desc: "Compact submachine gun. High rate of fire, ideal for close quarters. Suppressor compatible.", attachments: ["MP5 Suppressor", "MP5 30Rnd Mag"] },
  { id: 7, name: "CR-527", type: "Bolt Action", cat: "weapons", icon: "⚔️", damage: 78, weight: 3.0, slots: 4, ammo: "7.62x39mm", tier: 1, rarity: "Common", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Hunting Stands", "Houses"], desc: "Hunting bolt-action rifle. Good starter long gun. Shares ammo with AKM and SKS.", attachments: ["Hunting Scope"] },
  { id: 8, name: "IZH-43 Shotgun", type: "Shotgun", cat: "weapons", icon: "⚔️", damage: 92, weight: 2.8, slots: 4, ammo: "12ga", tier: 1, rarity: "Common", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Houses", "Hunting Stands", "Farm"], desc: "Double-barrel shotgun. Devastating at close range. Very common in residential areas.", attachments: [] },
  { id: 9, name: "Sawed-off IZH-43", type: "Shotgun", cat: "weapons", icon: "⚔️", damage: 90, weight: 2.0, slots: 3, ammo: "12ga", tier: 1, rarity: "Crafted", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Crafted with Hacksaw"], desc: "Sawed-off shotgun variant. Concealable in smaller bags. Wider spread.", attachments: [] },
  { id: 10, name: "VSS Vintorez", type: "DMR", cat: "weapons", icon: "⚔️", damage: 88, weight: 2.7, slots: 5, ammo: "9x39mm SP-5", tier: 4, rarity: "Rare Military", maps: ["Chernarus"], spawns: ["Helicopter Crash", "Tisy Military"], desc: "Integrally suppressed marksman rifle. Extremely rare and highly valued.", attachments: ["PSO-1 Scope", "VSS 10Rnd Mag", "VSS 20Rnd Mag"] },
  { id: 11, name: "Blaze 95", type: "Double Rifle", cat: "weapons", icon: "⚔️", damage: 98, weight: 3.4, slots: 5, ammo: ".308 WIN", tier: 2, rarity: "Hunting", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Hunting Stands", "Houses"], desc: "High-powered double rifle. Two fast shots of .308. Excellent damage.", attachments: ["Hunting Scope"] },
  { id: 12, name: "Repeater Carbine", type: "Lever Action", cat: "weapons", icon: "⚔️", damage: 65, weight: 2.5, slots: 4, ammo: ".357 Magnum", tier: 1, rarity: "Residential", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Houses", "Hunting Stands"], desc: "Classic lever-action rifle chambered in .357. Reliable and easy to find ammo for.", attachments: [] },
  { id: 13, name: "Derringer", type: "Pistol", cat: "weapons", icon: "🔫", damage: 58, weight: 0.2, slots: 1, ammo: ".357 Magnum", tier: 1, rarity: "Residential", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Houses"], desc: "Tiny two-shot derringer. High damage per shot but extremely limited capacity.", attachments: [] },
  { id: 14, name: "CR-61 Skorpion", type: "SMG", cat: "weapons", icon: "⚔️", damage: 35, weight: 1.2, slots: 3, ammo: ".32 ACP", tier: 1, rarity: "Police", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Police Stations", "Town"], desc: "Compact machine pistol. Low damage but high rate of fire. Good early game weapon.", attachments: [] },
  { id: 15, name: "Crossbow", type: "Crossbow", cat: "weapons", icon: "⚔️", damage: 70, weight: 2.5, slots: 5, ammo: "Bolts", tier: 1, rarity: "Hunting", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Hunting Stands", "Houses"], desc: "Silent ranged weapon. Bolts are retrievable. Perfect for stealth playstyle.", attachments: ["Crossbow Scope"] },

  // ─── GEAR ──────────────────────────────────────────────────────────────────
  { id: 16, name: "Plate Carrier", type: "Vest", cat: "gear", icon: "🛡️", weight: 5.5, slots: 12, protection: 90, tier: 4, rarity: "Military", maps: ["Chernarus", "Livonia"], spawns: ["Military", "Tisy", "NWAF"], desc: "Best-in-slot ballistic protection. Highest slot count of any vest. Rare military spawn.", attachments: [] },
  { id: 17, name: "Press Vest", type: "Vest", cat: "gear", icon: "🛡️", weight: 3.2, slots: 8, protection: 60, tier: 2, rarity: "Military / Police", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Police", "Military"], desc: "Press journalist vest. Moderate protection and decent storage capacity.", attachments: [] },
  { id: 18, name: "Stab Vest", type: "Vest", cat: "gear", icon: "🛡️", weight: 4.0, slots: 6, protection: 70, tier: 2, rarity: "Police", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Police Stations"], desc: "Police stab vest. Good protection against melee. Police station spawn.", attachments: [] },
  { id: 19, name: "Tactical Helmet", type: "Helmet", cat: "gear", icon: "⛑️", weight: 1.2, slots: 2, protection: 80, tier: 3, rarity: "Military", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Military", "NWAF", "Tisy"], desc: "Military ballistic helmet. High head protection. Can attach NVG bracket.", attachments: ["NVG Bracket", "Visor"] },
  { id: 20, name: "Moto Helmet", type: "Helmet", cat: "gear", icon: "⛑️", weight: 0.9, slots: 0, protection: 50, tier: 1, rarity: "Common", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Houses", "Industrial", "Town"], desc: "Motorcycle helmet. Decent head protection. Commonly found in towns.", attachments: [] },
  { id: 21, name: "Mountain Backpack", type: "Backpack", cat: "gear", icon: "🎒", weight: 2.5, slots: 63, protection: 0, tier: 3, rarity: "Military / Hunting", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Military", "Hunting Stands"], desc: "Highest capacity backpack in the game. 63 inventory slots. Rare.", attachments: [] },
  { id: 22, name: "SPOSN Tortilla", type: "Backpack", cat: "gear", icon: "🎒", weight: 2.8, slots: 49, protection: 0, tier: 3, rarity: "Military", maps: ["Chernarus", "Livonia"], spawns: ["Military", "NWAF"], desc: "Military backpack with 49 slots. Common in geared player encounters.", attachments: [] },
  { id: 23, name: "Field Backpack", type: "Backpack", cat: "gear", icon: "🎒", weight: 1.8, slots: 42, protection: 0, tier: 2, rarity: "Military", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Military", "Police"], desc: "Standard military field backpack. 42 slots of storage. Widely available in military areas.", attachments: [] },
  { id: 24, name: "NBC Suit", type: "Clothing", cat: "gear", icon: "🧥", weight: 3.0, slots: 0, protection: 95, tier: 4, rarity: "Industrial", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Industrial", "Chemical Plants", "Hospitals"], desc: "Full NBC protection. Required for contaminated zones and gas areas.", attachments: [] },
  { id: 25, name: "Gorka Jacket", type: "Clothing", cat: "gear", icon: "🧥", weight: 1.5, slots: 4, protection: 20, tier: 2, rarity: "Military", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Military", "Police"], desc: "Russian military jacket. Great camouflage, decent insulation and storage.", attachments: [] },
  { id: 26, name: "Hunting Jacket", type: "Clothing", cat: "gear", icon: "🧥", weight: 1.2, slots: 4, protection: 15, tier: 1, rarity: "Common", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Houses", "Hunting Stands"], desc: "Warm hunting jacket. Good insulation for cold environments.", attachments: [] },
  { id: 27, name: "NVG", type: "Equipment", cat: "gear", icon: "🥽", weight: 0.5, slots: 1, protection: 0, tier: 4, rarity: "Rare Military", maps: ["Chernarus", "Livonia"], spawns: ["Helicopter Crash", "Tisy Military"], desc: "Night vision goggles. Game-changing night advantage. Extremely rare.", attachments: [] },
  { id: 28, name: "Gas Mask", type: "Equipment", cat: "gear", icon: "😷", weight: 1.0, slots: 0, protection: 85, tier: 3, rarity: "Military / Industrial", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Military", "Industrial", "Hospitals"], desc: "NBC protection for the face. Required alongside NBC suit in contaminated zones.", attachments: ["NBC Filter"] },

  // ─── MEDICAL ───────────────────────────────────────────────────────────────
  { id: 29, name: "Morphine Auto-Injector", type: "Medical", cat: "medical", icon: "💉", weight: 0.1, slots: 1, effect: "Heals Fractures", tier: 2, rarity: "Medical", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Hospitals", "Clinics", "Medical"], desc: "Heals fractures instantly. Essential item. Always carry at least one.", attachments: [] },
  { id: 30, name: "Epinephrine Auto-Injector", type: "Medical", cat: "medical", icon: "💉", weight: 0.1, slots: 1, effect: "Revives Unconscious", tier: 3, rarity: "Medical", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Hospitals", "Medical"], desc: "Revives unconscious survivors. Critical emergency item. Very rare.", attachments: [] },
  { id: 31, name: "Blood Bag Kit", type: "Medical", cat: "medical", icon: "🩸", weight: 0.4, slots: 2, effect: "Restores Blood +1000ml", tier: 2, rarity: "Medical", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Hospitals", "Medical"], desc: "Transfuses blood to restore blood volume. Requires matching blood type. 1000ml.", attachments: [] },
  { id: 32, name: "Saline Bag IV", type: "Medical", cat: "medical", icon: "🩸", weight: 0.5, slots: 2, effect: "Restores Blood +500ml", tier: 3, rarity: "Medical", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Hospitals", "Medical"], desc: "IV saline solution. Restores blood volume without type matching. 500ml.", attachments: [] },
  { id: 33, name: "Tetracycline Pills", type: "Medical", cat: "medical", icon: "💊", weight: 0.05, slots: 1, effect: "Cures Infection / Cholera", tier: 2, rarity: "Medical / Residential", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Hospitals", "Houses", "Schools"], desc: "Antibiotic that cures bacterial infections and cholera. Carry several.", attachments: [] },
  { id: 34, name: "Charcoal Tablets", type: "Medical", cat: "medical", icon: "💊", weight: 0.05, slots: 1, effect: "Cures Chemical Poisoning", tier: 2, rarity: "Medical", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Hospitals", "Houses", "Medical"], desc: "Treats chemical poisoning from rotten food or contaminated water.", attachments: [] },
  { id: 35, name: "Iodine Tincture", type: "Medical", cat: "medical", icon: "🧴", weight: 0.05, slots: 1, effect: "Disinfects Wounds", tier: 1, rarity: "Common", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Houses", "Hospitals", "Medical"], desc: "Disinfects wounds to prevent infection. Always use after stitching.", attachments: [] },
  { id: 36, name: "Splint", type: "Medical", cat: "medical", icon: "🩹", weight: 0.2, slots: 1, effect: "Splints Fractures", tier: 1, rarity: "Common / Craftable", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Hospitals", "Houses", "Industrial"], desc: "Temporarily splints fractures. Craft with 2 sticks + bandage. Slows movement.", attachments: [] },
  { id: 37, name: "Wound Dressing Kit", type: "Medical", cat: "medical", icon: "🩹", weight: 0.1, slots: 1, effect: "Stops Bleeding", tier: 1, rarity: "Common", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Houses", "Hospitals", "Medical", "Military"], desc: "Standard bandage for stopping bleeding. Most common medical item.", attachments: [] },
  { id: 38, name: "Suture Needle", type: "Medical", cat: "medical", icon: "🩺", weight: 0.05, slots: 1, effect: "Stitches Deep Wounds", tier: 2, rarity: "Medical", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Hospitals", "Medical"], desc: "Stitches deep wounds to prevent re-bleeding. More durable than bandages.", attachments: [] },
  { id: 39, name: "Multivitamin Pills", type: "Medical", cat: "medical", icon: "💊", weight: 0.05, slots: 1, effect: "Boosts Immunity", tier: 1, rarity: "Common", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Houses", "Hospitals", "Supermarkets"], desc: "Boosts immune system. Reduces chance of getting sick. Take preventatively.", attachments: [] },

  // ─── FOOD & WATER ──────────────────────────────────────────────────────────
  { id: 40, name: "Canned Beans", type: "Food", cat: "food", icon: "🥫", weight: 0.8, slots: 1, calories: 213, water: 0, tier: 1, rarity: "Common", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Houses", "Supermarkets", "Gas Stations"], desc: "Reliable calorie source. Requires can opener or blunt force to open.", attachments: [] },
  { id: 41, name: "Canned Sardines", type: "Food", cat: "food", icon: "🥫", weight: 0.6, slots: 1, calories: 191, water: 0, tier: 1, rarity: "Common", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Houses", "Supermarkets"], desc: "High protein canned fish. Good caloric value for its small size.", attachments: [] },
  { id: 42, name: "Canned Spaghetti", type: "Food", cat: "food", icon: "🥫", weight: 0.8, slots: 1, calories: 176, water: 100, tier: 1, rarity: "Common", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Houses", "Supermarkets"], desc: "Ready-to-eat canned spaghetti. Provides both calories and some hydration.", attachments: [] },
  { id: 43, name: "Rice", type: "Food", cat: "food", icon: "🍚", weight: 1.0, slots: 1, calories: 365, water: 0, tier: 1, rarity: "Common", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Houses", "Supermarkets"], desc: "Raw rice. Must be cooked. Highest calorie density of base foods.", attachments: [] },
  { id: 44, name: "Tactical Bacon", type: "Food", cat: "food", icon: "🥩", weight: 0.5, slots: 1, calories: 382, water: 0, tier: 2, rarity: "Military", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Military", "NWAF", "Tisy"], desc: "Military MRE ration. Ready to eat, no cooking needed. High calories.", attachments: [] },
  { id: 45, name: "Water Bottle", type: "Drink", cat: "food", icon: "🍶", weight: 0.5, slots: 1, calories: 0, water: 500, tier: 1, rarity: "Common", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Houses", "Gas Stations", "Supermarkets"], desc: "Portable 500ml water container. Refill at pumps, wells, or ponds.", attachments: [] },
  { id: 46, name: "Canteen", type: "Drink", cat: "food", icon: "🪣", weight: 0.4, slots: 1, calories: 0, water: 800, tier: 2, rarity: "Military", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Military", "Police"], desc: "Military 800ml canteen. More capacity than standard water bottle.", attachments: [] },
  { id: 47, name: "Soda Can (Pipsi)", type: "Drink", cat: "food", icon: "🥤", weight: 0.3, slots: 1, calories: 120, water: 330, tier: 1, rarity: "Common", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Gas Stations", "Supermarkets", "Houses"], desc: "Fizzy drink. Provides calories and hydration. Great early game find.", attachments: [] },
  { id: 48, name: "Powdered Milk", type: "Food", cat: "food", icon: "🥛", weight: 0.5, slots: 1, calories: 496, water: 0, tier: 1, rarity: "Common", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Houses", "Supermarkets"], desc: "Dry powdered milk. Very high caloric density. Good for stocking bases.", attachments: [] },

  // ─── TOOLS ─────────────────────────────────────────────────────────────────
  { id: 49, name: "Hacksaw", type: "Tool", cat: "tools", icon: "🔧", damage: 20, weight: 0.6, slots: 2, use: "Crafting / Weapon Mod", tier: 1, rarity: "Common", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Houses", "Industrial", "Farm"], desc: "Cuts shotgun barrels, wire, and used in many crafting recipes.", attachments: [] },
  { id: 50, name: "Knife", type: "Tool", cat: "tools", icon: "🔪", damage: 25, weight: 0.1, slots: 1, use: "Crafting / Melee / Skinning", tier: 1, rarity: "Common", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Houses", "Kitchen", "Hunting Stands"], desc: "Essential multi-tool. Skin animals, craft items, and use as melee weapon.", attachments: [] },
  { id: 51, name: "Compass", type: "Navigation", cat: "tools", icon: "🧭", damage: 0, weight: 0.1, slots: 1, use: "Navigation", tier: 1, rarity: "Common", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Houses", "Military", "Hunting Stands"], desc: "Magnetic compass. Essential for navigation and dead reckoning.", attachments: [] },
  { id: 52, name: "Map (Chernarus)", type: "Navigation", cat: "tools", icon: "🗺️", damage: 0, weight: 0.1, slots: 1, use: "Navigation", tier: 1, rarity: "Common", maps: ["Chernarus"], spawns: ["Houses", "Gas Stations", "Offices"], desc: "Topographic map of Chernarus. Combine with compass for precise navigation.", attachments: [] },
  { id: 53, name: "Map (Livonia)", type: "Navigation", cat: "tools", icon: "🗺️", damage: 0, weight: 0.1, slots: 1, use: "Navigation", tier: 1, rarity: "Common", maps: ["Livonia"], spawns: ["Houses", "Gas Stations", "Offices"], desc: "Topographic map of Livonia. Combine with compass for precise navigation.", attachments: [] },
  { id: 54, name: "Binoculars", type: "Equipment", cat: "tools", icon: "🔭", damage: 0, weight: 0.5, slots: 2, use: "Reconnaissance", tier: 2, rarity: "Military / Hunting", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Military", "Hunting Stands", "Offices"], desc: "High magnification optics. Spot survivors and loot from a safe distance.", attachments: [] },
  { id: 55, name: "Sewing Kit", type: "Tool", cat: "tools", icon: "🧵", damage: 0, weight: 0.1, slots: 1, use: "Repair Clothing", tier: 1, rarity: "Common", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Houses", "Supermarkets"], desc: "Repairs damaged clothing back to pristine condition. Carry one always.", attachments: [] },
  { id: 56, name: "Duct Tape", type: "Tool", cat: "tools", icon: "🔧", damage: 0, weight: 0.2, slots: 1, use: "Repair / Crafting / Restraint", tier: 1, rarity: "Common", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Houses", "Industrial", "Gas Stations"], desc: "Multi-purpose repair and crafting material. Can also restrain players.", attachments: [] },
  { id: 57, name: "Firefighter Axe", type: "Melee", cat: "tools", icon: "🪓", damage: 40, weight: 2.0, slots: 4, use: "Melee / Breaking Doors", tier: 1, rarity: "Firefighter", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Fire Stations", "Industrial"], desc: "Heavy fire axe. High melee damage and can break down barricades.", attachments: [] },
  { id: 58, name: "Knife (Stone)", type: "Tool", cat: "tools", icon: "🔪", damage: 15, weight: 0.1, slots: 1, use: "Crafting / Melee / Skinning", tier: 1, rarity: "Craftable", maps: ["Chernarus", "Livonia", "Sakhal"], spawns: ["Crafted from Stones"], desc: "Primitive stone knife. Craft from two stones. Good backup if no knife found.", attachments: [] },
];

export const CATEGORIES = [
  { id: "all" as const, label: "All Items", count: ITEMS.length },
  { id: "weapons" as const, label: "Weapons", count: ITEMS.filter(i => i.cat === "weapons").length },
  { id: "gear" as const, label: "Gear", count: ITEMS.filter(i => i.cat === "gear").length },
  { id: "medical" as const, label: "Medical", count: ITEMS.filter(i => i.cat === "medical").length },
  { id: "food" as const, label: "Food & Water", count: ITEMS.filter(i => i.cat === "food").length },
  { id: "tools" as const, label: "Tools", count: ITEMS.filter(i => i.cat === "tools").length },
];

export const TIER_LABELS: Record<Tier, string> = { 1: "T1", 2: "T2", 3: "T3", 4: "T4" };
export const TIER_COLORS: Record<Tier, string> = {
  1: "bg-green-900/40 text-green-400",
  2: "bg-amber-900/40 text-amber-400",
  3: "bg-orange-900/40 text-orange-400",
  4: "bg-purple-900/40 text-purple-400",
};
export const MAP_COLORS: Record<string, string> = {
  Chernarus: "#22c55e",
  Livonia: "#3b82f6",
  Sakhal: "#ef4444",
};
