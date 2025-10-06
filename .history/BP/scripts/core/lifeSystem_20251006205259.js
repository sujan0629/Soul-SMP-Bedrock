/**
 * Soul SMP - Life System
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

import { world, system } from "@minecraft/server";
import { CONFIG } from "../config.js";
import { getScore, setScore, addScore } from "../utils/scoreboardHelper.js";

/**
 * Get a player's current lives
 * @param {Player} player - The player entity
 * @returns {number} Current lives
 */
export function getLives(player) {
  return getScore(player, CONFIG.OBJECTIVES.LIVES);
}

/**
 * Set a player's lives
 * @param {Player} player - The player entity
 * @param {number} lives - Number of lives to set
 * @returns {boolean} Success status
 */
export function setLives(player, lives) {
  // Clamp between min and max
  const clampedLives = Math.max(CONFIG.MIN_LIVES, Math.min(CONFIG.MAX_LIVES, lives));
  return setScore(player, CONFIG.OBJECTIVES.LIVES, clampedLives);
}

/**
 * Add lives to a player
 * @param {Player} player - The player entity
 * @param {number} amount - Amount to add (can be negative)
 * @returns {number} New lives count
 */
export function addLives(player, amount) {
  const currentLives = getLives(player);
  const newLives = Math.max(CONFIG.MIN_LIVES, Math.min(CONFIG.MAX_LIVES, currentLives + amount));
  setLives(player, newLives);
  return newLives;
}

/**
 * Remove one life from a player
 * @param {Player} player - The player entity
 * @returns {number} Remaining lives
 */
export function removeLife(player) {
  const currentLives = getLives(player);
  if (currentLives > 0) {
    const newLives = currentLives - 1;
    setLives(player, newLives);
    
    // Broadcast life loss
    if (newLives > 0) {
      world.sendMessage(`${CONFIG.COLORS.WARNING}${player.name} lost a life! (${newLives}/${CONFIG.MAX_LIVES} remaining)`);
    } else {
      world.sendMessage(`${CONFIG.COLORS.ERROR}${player.name} has lost all lives and is now in permadeath!`);
    }
    
    return newLives;
  }
  return 0;
}

/**
 * Check if a player can use Soul Sigil (increase max lives)
 * @param {Player} player - The player entity
 * @returns {boolean} True if player can increase lives
 */
export function canIncreaseLives(player) {
  const currentLives = getLives(player);
  return currentLives < CONFIG.MAX_LIVES;
}

/**
 * Increase a player's lives by 1 (Soul Sigil effect)
 * @param {Player} player - The player entity
 * @returns {boolean} Success status
 */
export function increaseLives(player) {
  if (!canIncreaseLives(player)) {
    player.sendMessage(`${CONFIG.COLORS.ERROR}You already have the maximum lives (${CONFIG.MAX_LIVES})!`);
    return false;
  }
  
  const newLives = addLives(player, 1);
  player.sendMessage(`${CONFIG.COLORS.SUCCESS}You gained a life! You now have ${newLives}/${CONFIG.MAX_LIVES} lives.`);
  
  // Play success sound
  player.runCommand('playsound random.orb @s');
  
  return true;
}

/**
 * Display lives in actionbar
 * @param {Player} player - The player entity
 */
export function displayLives(player) {
  const lives = getLives(player);
  const maxLives = CONFIG.MAX_LIVES;
  
  let heartsDisplay = "";
  const fullHearts = lives;
  const emptyHearts = maxLives - lives;
  
  // Build hearts string
  for (let i = 0; i < fullHearts; i++) {
    heartsDisplay += "❤";
  }
  for (let i = 0; i < emptyHearts; i++) {
    heartsDisplay += "§7♡§r";
  }
  
  return `§6Lives: ${heartsDisplay} §e${lives}/${maxLives}`;
}

/**
 * Check if player is in permadeath
 * @param {Player} player - The player entity
 * @returns {boolean} True if player has no lives
 */
export function isPermadeath(player) {
  return getLives(player) === 0;
}

/**
 * Get total deaths for a player
 * @param {Player} player - The player entity
 * @returns {number} Total deaths
 */
export function getTotalDeaths(player) {
  return getScore(player, CONFIG.OBJECTIVES.TOTAL_DEATHS);
}

/**
 * Increment death counter
 * @param {Player} player - The player entity
 * @returns {number} New death count
 */
export function incrementDeaths(player) {
  return addScore(player, CONFIG.OBJECTIVES.TOTAL_DEATHS, 1);
}