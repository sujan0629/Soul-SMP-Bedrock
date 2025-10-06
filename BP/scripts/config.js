/**
 * Soul SMP - Configuration
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

export const CONFIG = {
  // Life system
  DEFAULT_LIVES: 10,
  MAX_LIVES: 15,
  MIN_LIVES: 0,
  
  // Soul orbs
  ORBS_PER_DEATH: 1,
  ORB_DESPAWN_TIME: 6000, // 5 minutes in ticks
  
  // Corruption thresholds
  CORRUPTION_TIER_1: 7,  // Weakness II
  CORRUPTION_TIER_2: 9,  // + Mob aggression
  CORRUPTION_TIER_3: 12, // + Slowness I
  
  // Extra hearts
  ORBS_PER_HEART: 2,
  MAX_EXTRA_HEARTS: 5,
  HEALTH_PER_HEART: 2, // Each heart = 2 health points
  
  // Soul Sigil
  SOUL_SIGIL_COST: 5,
  
  // Buff costs
  BUFF_TIER_1_COST: 2,
  BUFF_TIER_2_COST: 4,
  BUFF_TIER_3_COST: 6,
  
  // Buff combining
  MAX_COMBINABLE_TIER: 2,  // Can only combine up to Tier 2 (no Tier 3 combining)
  
  // Item IDs
  ITEMS: {
    SOUL_ORB: "soul:soul_orb",
    STRENGTH_1: "soul:strength_1",
    STRENGTH_2: "soul:strength_2",
    STRENGTH_3: "soul:strength_3",
    RESISTANCE_1: "soul:resistance_1",
    RESISTANCE_2: "soul:resistance_2",
    RESISTANCE_3: "soul:resistance_3",
    REGENERATION_1: "soul:regeneration_1",
    REGENERATION_2: "soul:regeneration_2",
    REGENERATION_3: "soul:regeneration_3",
    SOUL_SIGIL: "soul:soul_sigil"
  },
  
  // Scoreboard objectives
  OBJECTIVES: {
    LIVES: "soul_lives",
    ORB_COUNT: "soul_orb_count",
    EXTRA_HEARTS: "soul_extra_hearts",
    TOTAL_DEATHS: "soul_total_deaths",
    PERMADEATH: "soul_permadeath",
    CORRUPTION_TIER: "soul_corruption",
    ACTIVE_BUFF: "soul_active_buff"
  },
  
  // Effect IDs and amplifiers
  EFFECTS: {
    STRENGTH: "strength",
    RESISTANCE: "resistance",
    REGENERATION: "regeneration",
    WEAKNESS: "weakness",
    SLOWNESS: "slowness",
    HEALTH_BOOST: "health_boost"
  },
  
  // Buff type to effect mapping
  BUFF_EFFECTS: {
    "strength_1": { effect: "strength", amplifier: 0 },
    "strength_2": { effect: "strength", amplifier: 1 },
    "strength_3": { effect: "strength", amplifier: 2 },
    "resistance_1": { effect: "resistance", amplifier: 0 },
    "resistance_2": { effect: "resistance", amplifier: 1 },
    "resistance_3": { effect: "resistance", amplifier: 2 },
    "regeneration_1": { effect: "regeneration", amplifier: 0 },
    "regeneration_2": { effect: "regeneration", amplifier: 1 },
    "regeneration_3": { effect: "regeneration", amplifier: 2 }
  },
  
  // System settings
  TICK_RATE: {
    CORRUPTION_CHECK: 20,     // Check every second
    HUD_UPDATE: 10,            // Update HUD twice per second
    OFFHAND_CHECK: 1,          // Check offhand every tick
    ORB_COUNT_UPDATE: 5        // Update orb count every 5 ticks
  },
  
  // UI Colors
  COLORS: {
    SUCCESS: "§a",
    ERROR: "§c",
    WARNING: "§e",
    INFO: "§b",
    GOLD: "§6",
    PURPLE: "§5",
    GRAY: "§7",
    WHITE: "§f"
  }
};