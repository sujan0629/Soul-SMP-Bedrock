/**
 * Soul SMP - Health Manager
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

import { world, system } from "@minecraft/server";
import { CONFIG } from "../config.js";
import { getExtraHearts } from "./extraHearts.js";

/**
 * Get player's max health
 * @param {Player} player - The player entity
 * @returns {number} Max health
 */
export function getMaxHealth(player) {
  const extraHearts = getExtraHearts(player);
  const baseHealth = 20;
  const bonusHealth = extraHearts * CONFIG.HEALTH_PER_HEART;
  return baseHealth + bonusHealth;
}

/**
 * Get player's current health
 * @param {Player} player - The player entity
 * @returns {number} Current health
 */
export function getCurrentHealth(player) {
  try {
    const health = player.getComponent("health");
    if (health) {
      return health.currentValue;
    }
  } catch (e) {
    // Ignore
  }
  return 20;
}

/**
 * Get health display string
 * @param {Player} player - The player entity
 * @returns {string} Formatted health display
 */
export function getHealthDisplay(player) {
  const current = getCurrentHealth(player);
  const max = getMaxHealth(player);
  const extraHearts = getExtraHearts(player);
  
  const currentHearts = Math.ceil(current / 2);
  const maxHearts = max / 2;
  
  let display = `§c❤ ${currentHearts}/${maxHearts}`;
  
  if (extraHearts > 0) {
    display += ` §6(+${extraHearts})`;
  }
  
  return display;
}

/**
 * Heal player to full health
 * @param {Player} player - The player entity
 */
export function healToFull(player) {
  try {
    const health = player.getComponent("health");
    if (health) {
      health.setCurrentValue(health.effectiveMax);
      player.sendMessage(`${CONFIG.COLORS.SUCCESS}Health fully restored!`);
      player.runCommand('playsound random.orb @s ~ ~ ~ 1.0 1.2');
    }
  } catch (e) {
    console.warn(`Failed to heal ${player.name}: ${e}`);
  }
}

/**
 * Damage player
 * @param {Player} player - The player entity
 * @param {number} amount - Damage amount
 */
export function damagePlayer(player, amount) {
  try {
    player.applyDamage(amount);
  } catch (e) {
    console.warn(`Failed to damage ${player.name}: ${e}`);
  }
}

/**
 * Check if player is at low health
 * @param {Player} player - The player entity
 * @param {number} threshold - Health threshold (default 6 = 3 hearts)
 * @returns {boolean} True if at low health
 */
export function isLowHealth(player, threshold = 6) {
  return getCurrentHealth(player) <= threshold;
}
