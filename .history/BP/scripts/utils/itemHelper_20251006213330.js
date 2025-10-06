/**
 * Soul SMP - Item Helper
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

import { ItemStack, world } from "@minecraft/server";
import { CONFIG } from "../config.js";

/**
 * Count items of a specific type in player's inventory
 * @param {Player} player - The player entity
 * @param {string} itemId - Item type ID
 * @returns {number} Total count of items
 */
export function countItemInInventory(player, itemId) {
  const inventory = player.getComponent("inventory");
  if (!inventory) return 0;
  
  const container = inventory.container;
  let count = 0;
  
  for (let i = 0; i < container.size; i++) {
    const item = container.getItem(i);
    if (item && item.typeId === itemId) {
      count += item.amount;
    }
  }
  
  return count;
}

/**
 * Remove a specific amount of items from player's inventory
 * @param {Player} player - The player entity
 * @param {string} itemId - Item type ID
 * @param {number} amount - Amount to remove
 * @returns {boolean} True if successfully removed
 */
export function removeItemFromInventory(player, itemId, amount) {
  const inventory = player.getComponent("inventory");
  if (!inventory) return false;
  
  const container = inventory.container;
  let remaining = amount;
  
  for (let i = 0; i < container.size && remaining > 0; i++) {
    const item = container.getItem(i);
    if (item && item.typeId === itemId) {
      if (item.amount <= remaining) {
        remaining -= item.amount;
        container.setItem(i, undefined);
      } else {
        item.amount -= remaining;
        container.setItem(i, item);
        remaining = 0;
      }
    }
  }
  
  return remaining === 0;
}

/**
 * Give an item to a player
 * @param {Player} player - The player entity
 * @param {string} itemId - Item type ID
 * @param {number} amount - Amount to give
 * @param {string} nameTag - Optional custom name for the item
 * @returns {boolean} True if successfully given
 */
export function giveItem(player, itemId, amount = 1, nameTag = null) {
  try {
    const inventory = player.getComponent("inventory");
    if (!inventory) return false;
    
    const container = inventory.container;
    const item = new ItemStack(itemId, amount);
    
    if (nameTag) {
      item.nameTag = nameTag;
    }
    
    container.addItem(item);
    return true;
  } catch (e) {
    console.warn(`Failed to give item ${itemId} to ${player.name}: ${e}`);
    return false;
  }
}

/**
 * Get the item in player's offhand slot
 * @param {Player} player - The player entity
 * @returns {ItemStack|undefined} The offhand item, or undefined
 */
export function getOffhandItem(player) {
  try {
    const inventory = player.getComponent("inventory");
    if (!inventory) return undefined;
    
    const container = inventory.container;
    // Offhand is typically slot 40 in bedrock, but we use equipment component
    const equipment = player.getComponent("equippable");
    if (equipment) {
      return equipment.getEquipment("Offhand");
    }
    
    return undefined;
  } catch (e) {
    return undefined;
  }
}

/**
 * Check if an item is a buff item
 * @param {string} itemId - Item type ID
 * @returns {boolean} True if it's a buff item
 */
export function isBuffItem(itemId) {
  const buffItems = [
    CONFIG.ITEMS.STRENGTH_1, CONFIG.ITEMS.STRENGTH_2, CONFIG.ITEMS.STRENGTH_3,
    CONFIG.ITEMS.RESISTANCE_1, CONFIG.ITEMS.RESISTANCE_2, CONFIG.ITEMS.RESISTANCE_3,
    CONFIG.ITEMS.REGENERATION_1, CONFIG.ITEMS.REGENERATION_2, CONFIG.ITEMS.REGENERATION_3
  ];
  
  return buffItems.includes(itemId);
}

/**
 * Get buff type from item ID
 * @param {string} itemId - Item type ID (e.g., "soul:strength_1")
 * @returns {string|null} Buff type key (e.g., "strength_1") or null
 */
export function getBuffType(itemId) {
  if (!itemId || !itemId.startsWith("soul:")) return null;
  
  const buffType = itemId.replace("soul:", "");
  return CONFIG.BUFF_EFFECTS[buffType] ? buffType : null;
}

/**
 * Get buff tier from item ID
 * @param {string} itemId - Item type ID
 * @returns {number} Tier (1, 2, or 3), or 0 if not a buff
 */
export function getBuffTier(itemId) {
  if (!isBuffItem(itemId)) return 0;
  
  const lastChar = itemId.charAt(itemId.length - 1);
  return parseInt(lastChar) || 0;
}

/**
 * Get buff base type (strength, resistance, regeneration)
 * @param {string} itemId - Item type ID
 * @returns {string|null} Base type or null
 */
export function getBuffBaseType(itemId) {
  const buffType = getBuffType(itemId);
  if (!buffType) return null;
  
  return buffType.replace(/_[123]$/, "");
}

/**
 * Check if two buffs can be combined
 * @param {string} item1Id - First item ID
 * @param {string} item2Id - Second item ID
 * @returns {boolean} True if they can be combined
 */
export function canCombineBuffs(item1Id, item2Id) {
  if (!isBuffItem(item1Id) || !isBuffItem(item2Id)) return false;
  
  const base1 = getBuffBaseType(item1Id);
  const base2 = getBuffBaseType(item2Id);
  const tier1 = getBuffTier(item1Id);
  const tier2 = getBuffTier(item2Id);
  
  // Same type and tier, and not max tier
  return base1 === base2 && tier1 === tier2 && tier1 < 3;
}

/**
 * Get the combined buff item ID
 * @param {string} item1Id - First item ID
 * @param {string} item2Id - Second item ID
 * @returns {string|null} Combined item ID or null
 */
export function getCombinedBuff(item1Id, item2Id) {
  if (!canCombineBuffs(item1Id, item2Id)) return null;
  
  const baseType = getBuffBaseType(item1Id);
  const currentTier = getBuffTier(item1Id);
  const newTier = currentTier + 1;
  
  return `soul:${baseType}_${newTier}`;
}

/**
 * Drop an item at a location
 * @param {Vector3} location - Location to drop item
 * @param {string} itemId - Item type ID
 * @param {number} amount - Amount to drop
 * @param {Dimension} dimension - Dimension to drop in
 */
export function dropItem(location, itemId, amount, dimension) {
  try {
    const item = new ItemStack(itemId, amount);
    dimension.spawnItem(item, location);
  } catch (e) {
    console.warn(`Failed to drop item ${itemId}: ${e}`);
  }
}

/**
 * Clear all buff items from player's inventory
 * @param {Player} player - The player entity
 */
export function clearAllBuffItems(player) {
  const buffItems = [
    CONFIG.ITEMS.STRENGTH_1, CONFIG.ITEMS.STRENGTH_2, CONFIG.ITEMS.STRENGTH_3,
    CONFIG.ITEMS.RESISTANCE_1, CONFIG.ITEMS.RESISTANCE_2, CONFIG.ITEMS.RESISTANCE_3,
    CONFIG.ITEMS.REGENERATION_1, CONFIG.ITEMS.REGENERATION_2, CONFIG.ITEMS.REGENERATION_3
  ];
  
  buffItems.forEach(itemId => {
    const count = countItemInInventory(player, itemId);
    if (count > 0) {
      removeItemFromInventory(player, itemId, count);
    }
  });
}
