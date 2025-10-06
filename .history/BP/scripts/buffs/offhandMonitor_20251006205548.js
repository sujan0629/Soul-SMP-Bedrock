/**
 * Soul SMP - Offhand Monitor
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

import { world, system } from "@minecraft/server";
import { CONFIG } from "../config.js";
import { updatePlayerBuff } from "./buffSystem.js";

// Track previous offhand items
const previousOffhandItems = new Map();

/**
 * Get player's offhand item
 * @param {Player} player - The player entity
 * @returns {ItemStack|undefined} Offhand item
 */
function getOffhandItem(player) {
  try {
    const equipment = player.getComponent("equippable");
    if (equipment) {
      return equipment.getEquipment("Offhand");
    }
  } catch (e) {
    // Ignore errors
  }
  return undefined;
}

/**
 * Check and update offhand for a player
 * @param {Player} player - The player entity
 */
export function checkOffhand(player) {
  const currentItem = getOffhandItem(player);
  const previousItem = previousOffhandItems.get(player.id);
  
  // Check if item changed
  const currentItemId = currentItem?.typeId || null;
  const previousItemId = previousItem?.typeId || null;
  
  if (currentItemId !== previousItemId) {
    // Offhand item changed, update buff
    updatePlayerBuff(player, currentItem);
    
    // Update tracking
    if (currentItem) {
      previousOffhandItems.set(player.id, { typeId: currentItem.typeId });
    } else {
      previousOffhandItems.delete(player.id);
    }
  }
}

/**
 * Check offhand for all players
 */
export function checkAllOffhands() {
  const players = world.getAllPlayers();
  players.forEach(player => {
    try {
      checkOffhand(player);
    } catch (e) {
      // Ignore individual player errors
    }
  });
}

/**
 * Setup offhand monitoring system
 */
export function setupOffhandMonitor() {
  // Check offhand every tick for responsive buff switching
  system.runInterval(() => {
    checkAllOffhands();
  }, CONFIG.TICK_RATE.OFFHAND_CHECK);
  
  // Cleanup on player leave
  world.afterEvents.playerLeave.subscribe((event) => {
    previousOffhandItems.delete(event.playerId);
  });
}
