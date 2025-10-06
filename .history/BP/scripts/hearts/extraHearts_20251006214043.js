/**
 * Soul SMP - Extra Hearts System
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

import { world, system } from "@minecraft/server";
import { CONFIG } from "../config.js";
import { getScore, setScore, addScore } from "../utils/scoreboardHelper.js";
import { applyHealthBoost } from "../utils/effectHelper.js";
import { countItemInInventory, removeItemFromInventory } from "../utils/itemHelper.js";

/**
 * Get player's extra hearts count
 * @param {Player} player - The player entity
 * @returns {number} Number of extra hearts
 */
export function getExtraHearts(player) {
  return getScore(player, CONFIG.OBJECTIVES.EXTRA_HEARTS);
}

/**
 * Set player's extra hearts (exported for death handler)
 * @param {Player} player - The player entity
 * @param {number} hearts - Number of extra hearts
 */
export { setExtraHearts };

/**
 * Set player's extra hearts
 * @param {Player} player - The player entity
 * @param {number} hearts - Number of extra hearts
 */
export function setExtraHearts(player, hearts) {
  const clamped = Math.max(0, Math.min(CONFIG.MAX_EXTRA_HEARTS, hearts));
  setScore(player, CONFIG.OBJECTIVES.EXTRA_HEARTS, clamped);
  applyHealthBoost(player, clamped);
}

/**
 * Add extra hearts to a player
 * @param {Player} player - The player entity
 * @param {number} amount - Number of hearts to add
 * @returns {number} New extra hearts count
 */
export function addExtraHearts(player, amount) {
  const current = getExtraHearts(player);
  const newAmount = Math.max(0, Math.min(CONFIG.MAX_EXTRA_HEARTS, current + amount));
  setExtraHearts(player, newAmount);
  return newAmount;
}

/**
 * Purchase extra hearts for a player
 * @param {Player} player - The player entity
 * @returns {boolean} Success status
 */
export function purchaseExtraHeart(player) {
  const currentHearts = getExtraHearts(player);
  
  // Check if at maximum
  if (currentHearts >= CONFIG.MAX_EXTRA_HEARTS) {
    player.sendMessage(`${CONFIG.COLORS.ERROR}You already have the maximum extra hearts (${CONFIG.MAX_EXTRA_HEARTS})!`);
    return false;
  }
  
  // Check if player has enough orbs
  const orbCount = countItemInInventory(player, CONFIG.ITEMS.SOUL_ORB);
  const cost = CONFIG.ORBS_PER_HEART;
  
  if (orbCount < cost) {
    player.sendMessage(`${CONFIG.COLORS.ERROR}Not enough Soul Orbs! Need ${cost}, have ${orbCount}.`);
    return false;
  }
  
  // Remove orbs
  if (!removeItemFromInventory(player, CONFIG.ITEMS.SOUL_ORB, cost)) {
    player.sendMessage(`${CONFIG.COLORS.ERROR}Failed to remove orbs!`);
    return false;
  }
  
  // Add extra heart
  const newHearts = addExtraHearts(player, 1);
  
  player.sendMessage(`${CONFIG.COLORS.SUCCESS}+1 Extra Heart! (${newHearts}/${CONFIG.MAX_EXTRA_HEARTS})`);
  player.sendMessage(`${CONFIG.COLORS.GRAY}You now have ${20 + (newHearts * 2)} max health.`);
  player.runCommand('playsound random.levelup @s ~ ~ ~ 1.0 1.0');
  
  // Heal player to show the new heart
  system.runTimeout(() => {
    try {
      const health = player.getComponent("health");
      if (health) {
        health.setCurrentValue(health.effectiveMax);
      }
    } catch (e) {
      // Ignore heal errors
    }
  }, 5);
  
  return true;
}

/**
 * Remove all extra hearts from a player (on death)
 * @param {Player} player - The player entity
 */
export function removeAllExtraHearts(player) {
  setExtraHearts(player, 0);
}

/**
 * Restore extra hearts effect after respawn
 * @param {Player} player - The player entity
 */
export function restoreExtraHearts(player) {
  const hearts = getExtraHearts(player);
  if (hearts > 0) {
    applyHealthBoost(player, hearts);
  }
}

/**
 * Setup extra hearts system
 */
export function setupExtraHearts() {
  // Ensure health boost is always applied
  system.runInterval(() => {
    world.getAllPlayers().forEach(player => {
      const hearts = getExtraHearts(player);
      if (hearts > 0) {
        applyHealthBoost(player, hearts);
      }
    });
  }, 100); // Every 5 seconds
}
