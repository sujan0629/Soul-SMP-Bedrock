/**
 * Soul SMP - Orb Tracking System
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

import { world, system } from "@minecraft/server";
import { CONFIG } from "../config.js";
import { setScore } from "../utils/scoreboardHelper.js";
import { countItemInInventory } from "../utils/itemHelper.js";

/**
 * Count soul orbs in a player's inventory
 * @param {Player} player - The player entity
 * @returns {number} Number of soul orbs
 */
export function countSoulOrbs(player) {
  return countItemInInventory(player, CONFIG.ITEMS.SOUL_ORB);
}

/**
 * Update orb count scoreboard for a player
 * @param {Player} player - The player entity
 */
export function updateOrbCount(player) {
  const count = countSoulOrbs(player);
  setScore(player, CONFIG.OBJECTIVES.ORB_COUNT, count);
  return count;
}

/**
 * Update orb counts for all players
 */
export function updateAllOrbCounts() {
  const players = world.getAllPlayers();
  players.forEach(player => {
    updateOrbCount(player);
  });
}

/**
 * Setup orb tracking system
 */
export function setupOrbTracking() {
  // Update orb counts periodically
  system.runInterval(() => {
    updateAllOrbCounts();
  }, CONFIG.TICK_RATE.ORB_COUNT_UPDATE);
  
  // Also update when items are picked up
  world.afterEvents.itemCompleteUse.subscribe((event) => {
    system.runTimeout(() => {
      updateOrbCount(event.source);
    }, 1);
  });
}

/**
 * Get orb count display string
 * @param {number} orbCount - Number of orbs
 * @returns {string} Formatted string
 */
export function getOrbCountDisplay(orbCount) {
  let color = CONFIG.COLORS.PURPLE;
  
  if (orbCount >= CONFIG.CORRUPTION_TIER_3) {
    color = CONFIG.COLORS.ERROR;
  } else if (orbCount >= CONFIG.CORRUPTION_TIER_2) {
    color = CONFIG.COLORS.WARNING;
  } else if (orbCount >= CONFIG.CORRUPTION_TIER_1) {
    color = "§6"; // Orange
  }
  
  return `${color}⚫ Orbs: ${orbCount}`;
}
