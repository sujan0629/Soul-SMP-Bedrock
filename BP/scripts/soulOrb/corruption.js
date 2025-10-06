/**
 * Soul SMP - Corruption System
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

import { world, system } from "@minecraft/server";
import { CONFIG } from "../config.js";
import { setScore, getScore } from "../utils/scoreboardHelper.js";
import { applyCorruptionEffects, clearCorruptionEffects } from "../utils/effectHelper.js";
import { countSoulOrbs } from "./orbTracking.js";

/**
 * Get corruption tier based on orb count
 * @param {number} orbCount - Number of soul orbs
 * @returns {number} Corruption tier (0-3)
 */
export function getCorruptionTier(orbCount) {
  if (orbCount >= CONFIG.CORRUPTION_TIER_3) return 3;
  if (orbCount >= CONFIG.CORRUPTION_TIER_2) return 2;
  if (orbCount >= CONFIG.CORRUPTION_TIER_1) return 1;
  return 0;
}

/**
 * Apply corruption effects to a player based on orb count
 * @param {Player} player - The player entity
 */
export function applyCorruption(player) {
  const orbCount = countSoulOrbs(player);
  const tier = getCorruptionTier(orbCount);
  const previousTier = getScore(player, CONFIG.OBJECTIVES.CORRUPTION_TIER);
  
  // Update tier in scoreboard
  setScore(player, CONFIG.OBJECTIVES.CORRUPTION_TIER, tier);
  
  if (tier === 0) {
    // No corruption
    clearCorruptionEffects(player);
    
    if (previousTier > 0) {
      player.sendMessage(`${CONFIG.COLORS.SUCCESS}✓ Corruption effects removed.`);
    }
  } else {
    // Apply corruption effects
    applyCorruptionEffects(player, tier);
    
    // Notify player of tier change
    if (tier !== previousTier) {
      player.sendMessage(`${CONFIG.COLORS.ERROR}⚠ CORRUPTION TIER ${tier} ACTIVE!`);
      player.runCommand('playsound mob.wither.ambient @s ~ ~ ~ 0.5 1.0');
      
      if (tier === 1) {
        player.sendMessage(`${CONFIG.COLORS.GRAY}Effects: Weakness II`);
      } else if (tier === 2) {
        player.sendMessage(`${CONFIG.COLORS.GRAY}Effects: Weakness II, Hostile Mobs`);
      } else if (tier === 3) {
        player.sendMessage(`${CONFIG.COLORS.GRAY}Effects: Weakness II, Slowness I, Hostile Mobs`);
      }
    }
  }
  
  // Handle mob aggression for tier 2+
  if (tier >= 2) {
    increaseMobAggression(player);
  }
}

/**
 * Increase mob aggression towards corrupted players
 * @param {Player} player - The player entity
 */
function increaseMobAggression(player) {
  try {
    // This is a simplified version - actual mob aggression would need
    // more complex entity behavior modification
    // For now, we apply a particle effect as visual indicator
    player.runCommand('particle minecraft:soul_particle ~ ~1 ~ 0.5 0.5 0.5 0.01 10');
  } catch (e) {
    // Ignore particle errors
  }
}

/**
 * Check corruption for all players
 */
export function checkCorruptionForAllPlayers() {
  const players = world.getAllPlayers();
  players.forEach(player => {
    applyCorruption(player);
  });
}

/**
 * Setup corruption system
 */
export function setupCorruption() {
  // Check corruption periodically
  system.runInterval(() => {
    checkCorruptionForAllPlayers();
  }, CONFIG.TICK_RATE.CORRUPTION_CHECK);
}

/**
 * Get corruption warning message
 * @param {number} orbCount - Number of orbs
 * @returns {string|null} Warning message or null
 */
export function getCorruptionWarning(orbCount) {
  const tier = getCorruptionTier(orbCount);
  
  if (tier === 0) return null;
  
  let warning = `${CONFIG.COLORS.ERROR}⚠ CORRUPTION`;
  
  if (tier === 1) {
    warning += ` §7[Tier 1]`;
  } else if (tier === 2) {
    warning += ` §c[Tier 2]`;
  } else if (tier === 3) {
    warning += ` §4[Tier 3]`;
  }
  
  return warning;
}

/**
 * Display corruption title warning
 * @param {Player} player - The player entity
 * @param {number} tier - Corruption tier
 */
export function displayCorruptionWarning(player, tier) {
  if (tier > 0) {
    try {
      player.onScreenDisplay.setTitle(`§4⚠ CORRUPTION ${tier}`, {
        stayDuration: 40,
        fadeInDuration: 5,
        fadeOutDuration: 5
      });
    } catch (e) {
      // Ignore if title display fails
    }
  }
}
