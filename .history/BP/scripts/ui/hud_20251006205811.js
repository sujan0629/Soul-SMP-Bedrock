/**
 * Soul SMP - HUD System
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

import { world, system } from "@minecraft/server";
import { CONFIG } from "../config.js";
import { displayLives, getLives } from "../core/lifeSystem.js";
import { countSoulOrbs, getOrbCountDisplay } from "../soulOrb/orbTracking.js";
import { getCorruptionWarning } from "../soulOrb/corruption.js";
import { getActiveBuff } from "../buffs/buffSystem.js";
import { getExtraHearts } from "../hearts/extraHearts.js";

/**
 * Build HUD display for a player
 * @param {Player} player - The player entity
 * @returns {string} HUD display string
 */
export function buildHUD(player) {
  const lives = displayLives(player);
  const orbCount = countSoulOrbs(player);
  const orbs = getOrbCountDisplay(orbCount);
  const corruptionWarning = getCorruptionWarning(orbCount);
  const activeBuff = getActiveBuff(player);
  const extraHearts = getExtraHearts(player);
  
  let hud = `${lives}  ${orbs}`;
  
  // Add extra hearts indicator
  if (extraHearts > 0) {
    hud += `  ${CONFIG.COLORS.ERROR}+${extraHearts}❤`;
  }
  
  // Add corruption warning
  if (corruptionWarning) {
    hud += `\n${corruptionWarning}`;
  }
  
  // Add active buff indicator
  if (activeBuff) {
    const buffName = getBuffDisplayName(activeBuff);
    hud += `\n${CONFIG.COLORS.GREEN}⚔ ${buffName}`;
  }
  
  return hud;
}

/**
 * Get buff display name
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
 * Display HUD for a player
 * @param {Player} player - The player entity
 */
export function displayHUD(player) {
  const hud = buildHUD(player);
  player.onScreenDisplay.setActionBar(hud);
}

/**
 * Display HUD for all players
 */
export function displayHUDForAll() {
  const players = world.getAllPlayers();
  players.forEach(player => {
    try {
      displayHUD(player);
    } catch (e) {
      // Ignore individual player errors
    }
  });
}

/**
 * Setup HUD system
 */
export function setupHUD() {
  // Update HUD periodically
  system.runInterval(() => {
    displayHUDForAll();
  }, CONFIG.TICK_RATE.HUD_UPDATE);
}

/**
 * Display a temporary message to player
 * @param {Player} player - The player entity
 * @param {string} message - Message to display
 * @param {number} duration - Duration in ticks
 */
export function displayMessage(player, message, duration = 40) {
  try {
    player.onScreenDisplay.setTitle(message, {
      stayDuration: duration,
      fadeInDuration: 5,
      fadeOutDuration: 5
    });
  } catch (e) {
    // Fallback to chat message
    player.sendMessage(message);
  }
}

/**
 * Display death screen
 * @param {Player} player - The player entity
 * @param {number} remainingLives - Lives remaining
 */
export function displayDeathScreen(player, remainingLives) {
  const message = `${CONFIG.COLORS.ERROR}YOU DIED!\n${CONFIG.COLORS.WARNING}Lives: ${remainingLives}/${CONFIG.MAX_LIVES}`;
  displayMessage(player, message, 60);
}

/**
 * Display permadeath screen
 * @param {Player} player - The player entity
 */
export function displayPermaDeathScreen(player) {
  const message = `${CONFIG.COLORS.ERROR}PERMADEATH\n${CONFIG.COLORS.GRAY}No Lives Remaining`;
  displayMessage(player, message, 100);
}

/**
 * Display welcome message
 * @param {Player} player - The player entity
 */
export function displayWelcome(player) {
  const lives = getLives(player);
  
  player.sendMessage(`${CONFIG.COLORS.GOLD}╔═══════════════════════════════════╗`);
  player.sendMessage(`${CONFIG.COLORS.GOLD}║     Welcome to Soul SMP!        ║`);
  player.sendMessage(`${CONFIG.COLORS.GOLD}╠═══════════════════════════════════╣`);
  player.sendMessage(`${CONFIG.COLORS.WHITE}║ Lives: ${CONFIG.COLORS.GREEN}${lives}/${CONFIG.MAX_LIVES}${CONFIG.COLORS.WHITE}                      ║`);
  player.sendMessage(`${CONFIG.COLORS.WHITE}║ Collect Soul Orbs from deaths   ║`);
  player.sendMessage(`${CONFIG.COLORS.WHITE}║ Purchase buffs & extra hearts   ║`);
  player.sendMessage(`${CONFIG.COLORS.WHITE}║ Beware of corruption (7+ orbs)  ║`);
  player.sendMessage(`${CONFIG.COLORS.GOLD}╚═══════════════════════════════════╝`);
}
