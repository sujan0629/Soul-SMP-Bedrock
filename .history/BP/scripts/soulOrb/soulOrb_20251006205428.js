/**
 * Soul SMP - Soul Orb System
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

import { ItemStack, EntityComponentTypes } from "@minecraft/server";
import { CONFIG } from "../config.js";

/**
 * Drop a soul orb at a location
 * @param {Vector3} location - Location to drop the orb
 * @param {Dimension} dimension - Dimension to drop in
 * @param {number} amount - Number of orbs to drop
 */
export function dropSoulOrb(location, dimension, amount = 1) {
  try {
    const soulOrb = new ItemStack(CONFIG.ITEMS.SOUL_ORB, amount);
    const itemEntity = dimension.spawnItem(soulOrb, location);
    
    // Add glow effect to make it visible
    if (itemEntity) {
      try {
        itemEntity.runCommand('effect @s glowing 300 0 true');
      } catch (e) {
        // Glowing effect may not work on items, ignore
      }
    }
    
    return itemEntity;
  } catch (e) {
    console.warn(`Failed to drop soul orb at ${location.x}, ${location.y}, ${location.z}: ${e}`);
    return null;
  }
}

/**
 * Give soul orbs to a player
 * @param {Player} player - The player entity
 * @param {number} amount - Number of orbs to give
 * @returns {boolean} Success status
 */
export function giveSoulOrbs(player, amount = 1) {
  try {
    const inventory = player.getComponent("inventory");
    if (!inventory) return false;
    
    const container = inventory.container;
    const soulOrb = new ItemStack(CONFIG.ITEMS.SOUL_ORB, amount);
    container.addItem(soulOrb);
    
    player.sendMessage(`${CONFIG.COLORS.SUCCESS}+${amount} Soul Orb${amount > 1 ? 's' : ''}!`);
    player.runCommand('playsound random.orb @s ~ ~ ~ 1.0 1.5');
    
    return true;
  } catch (e) {
    console.warn(`Failed to give soul orbs to ${player.name}: ${e}`);
    return false;
  }
}

/**
 * Create a Soul Orb item stack
 * @param {number} amount - Amount of orbs
 * @returns {ItemStack} The soul orb item stack
 */
export function createSoulOrbStack(amount = 1) {
  return new ItemStack(CONFIG.ITEMS.SOUL_ORB, amount);
}
