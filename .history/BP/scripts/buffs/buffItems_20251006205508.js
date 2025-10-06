/**
 * Soul SMP - Buff Items
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

import { ItemStack } from "@minecraft/server";
import { CONFIG } from "../config.js";
import { removeItemFromInventory, giveItem, countItemInInventory } from "../utils/itemHelper.js";

/**
 * Purchase a buff item for a player
 * @param {Player} player - The player entity
 * @param {string} buffType - Buff type (e.g., "strength_1")
 * @returns {boolean} Success status
 */
export function purchaseBuffItem(player, buffType) {
  const itemId = `soul:${buffType}`;
  
  // Check if valid buff type
  if (!CONFIG.BUFF_EFFECTS[buffType]) {
    player.sendMessage(`${CONFIG.COLORS.ERROR}Invalid buff type!`);
    return false;
  }
  
  // Determine cost
  const tier = parseInt(buffType.slice(-1));
  let cost = CONFIG.BUFF_TIER_1_COST;
  
  if (tier === 2) {
    cost = CONFIG.BUFF_TIER_2_COST;
  } else if (tier === 3) {
    cost = CONFIG.BUFF_TIER_3_COST;
  }
  
  // Check if player has enough orbs
  const orbCount = countItemInInventory(player, CONFIG.ITEMS.SOUL_ORB);
  
  if (orbCount < cost) {
    player.sendMessage(`${CONFIG.COLORS.ERROR}Not enough Soul Orbs! Need ${cost}, have ${orbCount}.`);
    return false;
  }
  
  // Remove orbs
  if (!removeItemFromInventory(player, CONFIG.ITEMS.SOUL_ORB, cost)) {
    player.sendMessage(`${CONFIG.COLORS.ERROR}Failed to remove orbs!`);
    return false;
  }
  
  // Give buff item
  if (giveItem(player, itemId, 1)) {
    const buffName = getBuffDisplayName(buffType);
    player.sendMessage(`${CONFIG.COLORS.SUCCESS}Purchased ${buffName}!`);
    player.sendMessage(`${CONFIG.COLORS.GRAY}Equip in offhand to activate.`);
    player.runCommand('playsound random.levelup @s ~ ~ ~ 1.0 1.0');
    return true;
  }
  
  return false;
}

/**
 * Get display name for a buff type
 * @param {string} buffType - Buff type (e.g., "strength_1")
 * @returns {string} Display name
 */
export function getBuffDisplayName(buffType) {
  const parts = buffType.split('_');
  const name = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  const tier = parts[1];
  const tierRoman = ['I', 'II', 'III'][parseInt(tier) - 1];
  
  return `${name} ${tierRoman}`;
}

/**
 * Get all available buff types
 * @returns {Array<string>} Array of buff type keys
 */
export function getAllBuffTypes() {
  return Object.keys(CONFIG.BUFF_EFFECTS);
}

/**
 * Get buff cost
 * @param {string} buffType - Buff type
 * @returns {number} Cost in soul orbs
 */
export function getBuffCost(buffType) {
  const tier = parseInt(buffType.slice(-1));
  
  if (tier === 1) return CONFIG.BUFF_TIER_1_COST;
  if (tier === 2) return CONFIG.BUFF_TIER_2_COST;
  if (tier === 3) return CONFIG.BUFF_TIER_3_COST;
  
  return 0;
}

/**
 * Get buff description
 * @param {string} buffType - Buff type
 * @returns {string} Description
 */
export function getBuffDescription(buffType) {
  const buffConfig = CONFIG.BUFF_EFFECTS[buffType];
  if (!buffConfig) return "Unknown buff";
  
  const effectName = buffConfig.effect.charAt(0).toUpperCase() + buffConfig.effect.slice(1);
  const level = buffConfig.amplifier + 1;
  const tierRoman = ['I', 'II', 'III'][level - 1];
  
  return `${effectName} ${tierRoman}`;
}

/**
 * Create a buff item stack
 * @param {string} buffType - Buff type
 * @param {number} amount - Amount
 * @returns {ItemStack|null} The item stack
 */
export function createBuffItemStack(buffType, amount = 1) {
  const itemId = `soul:${buffType}`;
  
  try {
    return new ItemStack(itemId, amount);
  } catch (e) {
    console.warn(`Failed to create buff item ${itemId}: ${e}`);
    return null;
  }
}
