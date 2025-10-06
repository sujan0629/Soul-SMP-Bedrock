/**
 * Soul SMP - Buff System
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

import { world, system } from "@minecraft/server";
import { CONFIG } from "../config.js";
import { applyEffect, removeEffect } from "../utils/effectHelper.js";
import { getBuffType } from "../utils/itemHelper.js";

// Track active buffs for each player
const activeBuffs = new Map();

/**
 * Apply a buff effect to a player
 * @param {Player} player - The player entity
 * @param {string} buffType - Buff type key (e.g., "strength_1")
 */
export function applyBuffEffect(player, buffType) {
  const buffConfig = CONFIG.BUFF_EFFECTS[buffType];
  if (!buffConfig) return;
  
  const { effect, amplifier } = buffConfig;
  applyEffect(player, effect, 1000000, amplifier, true);
}

/**
 * Remove a buff effect from a player
 * @param {Player} player - The player entity
 * @param {string} buffType - Buff type key
 */
export function removeBuffEffect(player, buffType) {
  const buffConfig = CONFIG.BUFF_EFFECTS[buffType];
  if (!buffConfig) return;
  
  removeEffect(player, buffConfig.effect);
}

/**
 * Update player's buff based on offhand item
 * @param {Player} player - The player entity
 * @param {ItemStack|undefined} offhandItem - Current offhand item
 */
export function updatePlayerBuff(player, offhandItem) {
  const playerId = player.id;
  const previousBuff = activeBuffs.get(playerId);
  
  // Check if offhand item is a buff
  let currentBuffType = null;
  if (offhandItem) {
    currentBuffType = getBuffType(offhandItem.typeId);
  }
  
  // If buff changed
  if (currentBuffType !== previousBuff) {
    // Remove previous buff
    if (previousBuff) {
      removeBuffEffect(player, previousBuff);
    }
    
    // Apply new buff
    if (currentBuffType) {
      applyBuffEffect(player, currentBuffType);
      
      const buffName = getBuffDisplayName(currentBuffType);
      player.onScreenDisplay.setActionBar(`${CONFIG.COLORS.SUCCESS}Active: ${buffName}`);
    }
    
    // Update tracking
    if (currentBuffType) {
      activeBuffs.set(playerId, currentBuffType);
    } else {
      activeBuffs.delete(playerId);
    }
  }
}

/**
 * Get display name for buff type
 * @param {string} buffType - Buff type
 * @returns {string} Display name
 */
function getBuffDisplayName(buffType) {
  const parts = buffType.split('_');
  const name = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  const tier = parts[1];
  const tierRoman = ['I', 'II', 'III'][parseInt(tier) - 1];
  
  return `${name} ${tierRoman}`;
}

/**
 * Clear all buffs for a player
 * @param {Player} player - The player entity
 */
export function clearPlayerBuffs(player) {
  const playerId = player.id;
  const buff = activeBuffs.get(playerId);
  
  if (buff) {
    removeBuffEffect(player, buff);
    activeBuffs.delete(playerId);
  }
}

/**
 * Get active buff for a player
 * @param {Player} player - The player entity
 * @returns {string|null} Active buff type or null
 */
export function getActiveBuff(player) {
  return activeBuffs.get(player.id) || null;
}

/**
 * Cleanup when player leaves
 * @param {string} playerId - Player ID
 */
export function cleanupPlayerBuff(playerId) {
  activeBuffs.delete(playerId);
}

/**
 * Setup buff cleanup on player leave
 */
export function setupBuffCleanup() {
  world.afterEvents.playerLeave.subscribe((event) => {
    cleanupPlayerBuff(event.playerId);
  });
}
