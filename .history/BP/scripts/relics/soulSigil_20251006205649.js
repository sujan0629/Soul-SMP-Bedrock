/**
 * Soul SMP - Soul Sigil System
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

import { world, system } from "@minecraft/server";
import { CONFIG } from "../config.js";
import { increaseLives, canIncreaseLives, getLives } from "../core/lifeSystem.js";
import { countItemInInventory, removeItemFromInventory } from "../utils/itemHelper.js";

/**
 * Use Soul Sigil to increase lives
 * @param {Player} player - The player entity
 * @returns {boolean} Success status
 */
export function useSoulSigil(player) {
  // Check if player can increase lives
  if (!canIncreaseLives(player)) {
    player.sendMessage(`${CONFIG.COLORS.ERROR}You already have the maximum lives (${CONFIG.MAX_LIVES})!`);
    return false;
  }
  
  // Check if player has enough orbs
  const orbCount = countItemInInventory(player, CONFIG.ITEMS.SOUL_ORB);
  const cost = CONFIG.SOUL_SIGIL_COST;
  
  if (orbCount < cost) {
    player.sendMessage(`${CONFIG.COLORS.ERROR}Not enough Soul Orbs! Soul Sigil requires ${cost} orbs.`);
    player.sendMessage(`${CONFIG.COLORS.GRAY}You have ${orbCount} orbs.`);
    return false;
  }
  
  // Remove orbs
  if (!removeItemFromInventory(player, CONFIG.ITEMS.SOUL_ORB, cost)) {
    player.sendMessage(`${CONFIG.COLORS.ERROR}Failed to remove orbs!`);
    return false;
  }
  
  // Increase lives
  if (increaseLives(player)) {
    const newLives = getLives(player);
    
    // Dramatic announcement
    world.sendMessage(`${CONFIG.COLORS.GOLD}════════════════════════════════`);
    world.sendMessage(`${CONFIG.COLORS.GOLD}   ${player.name} used a Soul Sigil!`);
    world.sendMessage(`${CONFIG.COLORS.GOLD}   Lives: ${newLives}/${CONFIG.MAX_LIVES}`);
    world.sendMessage(`${CONFIG.COLORS.GOLD}════════════════════════════════`);
    
    // Effects
    player.runCommand('particle minecraft:totem_particle ~ ~1 ~ 1 1 1 0.1 50');
    player.runCommand('playsound mob.wither.spawn @a[r=20] ~ ~ ~ 0.5 2.0');
    
    return true;
  }
  
  return false;
}

/**
 * Check if player can use Soul Sigil
 * @param {Player} player - The player entity
 * @returns {boolean} True if can use
 */
export function canUseSoulSigil(player) {
  const canIncrease = canIncreaseLives(player);
  const hasEnoughOrbs = countItemInInventory(player, CONFIG.ITEMS.SOUL_ORB) >= CONFIG.SOUL_SIGIL_COST;
  
  return canIncrease && hasEnoughOrbs;
}

/**
 * Get Soul Sigil info text
 * @param {Player} player - The player entity
 * @returns {string} Info text
 */
export function getSoulSigilInfo(player) {
  const cost = CONFIG.SOUL_SIGIL_COST;
  const orbCount = countItemInInventory(player, CONFIG.ITEMS.SOUL_ORB);
  const currentLives = getLives(player);
  const maxLives = CONFIG.MAX_LIVES;
  
  let info = `${CONFIG.COLORS.PURPLE}╔═══════════════════════════════╗\n`;
  info += `${CONFIG.COLORS.PURPLE}║        SOUL SIGIL INFO       ║\n`;
  info += `${CONFIG.COLORS.PURPLE}╠═══════════════════════════════╣\n`;
  info += `${CONFIG.COLORS.WHITE}║ Cost: ${CONFIG.COLORS.GOLD}${cost} Soul Orbs             ${CONFIG.COLORS.WHITE}║\n`;
  info += `${CONFIG.COLORS.WHITE}║ Effect: ${CONFIG.COLORS.GREEN}+1 Permanent Life    ${CONFIG.COLORS.WHITE}║\n`;
  info += `${CONFIG.COLORS.WHITE}║ Your Orbs: ${orbCount >= cost ? CONFIG.COLORS.GREEN : CONFIG.COLORS.RED}${orbCount}                ${CONFIG.COLORS.WHITE}║\n`;
  info += `${CONFIG.COLORS.WHITE}║ Your Lives: ${CONFIG.COLORS.GOLD}${currentLives}/${maxLives}            ${CONFIG.COLORS.WHITE}║\n`;
  info += `${CONFIG.COLORS.PURPLE}╚═══════════════════════════════╝`;
  
  return info;
}

/**
 * Setup Soul Sigil item use detection
 */
export function setupSoulSigil() {
  // Listen for item use (right-click)
  world.afterEvents.itemUse.subscribe((event) => {
    const { source: player, itemStack } = event;
    
    if (itemStack && itemStack.typeId === CONFIG.ITEMS.SOUL_SIGIL) {
      // Player used Soul Sigil item
      system.run(() => {
        useSoulSigil(player);
      });
    }
  });
}
