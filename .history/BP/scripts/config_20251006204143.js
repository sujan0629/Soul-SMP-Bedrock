/**
 * Soul SMP - Configuration
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

export const CONFIG = {
  // Life system
  DEFAULT_LIVES: 10,
  MAX_LIVES: 15,
  
  // Soul orbs
  ORBS_PER_DEATH: 1,
  
  // Corruption thresholds
  CORRUPTION_TIER_1: 7,  // Weakness II
  CORRUPTION_TIER_2: 9,  // + Mob aggression
  CORRUPTION_TIER_3: 12, // + Slowness I
  
  // Extra hearts
  ORBS_PER_HEART: 2,
  MAX_EXTRA_HEARTS: 5,
  
  // Soul Sigil
  SOUL_SIGIL_COST: 5,
  
  // Buff costs
  BUFF_TIER_1_COST: 2,
  BUFF_TIER_2_COST: 4,
  BUFF_TIER_3_COST: 6,
  
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
    TOTAL_DEATHS: "soul_total_deaths"
  }
};