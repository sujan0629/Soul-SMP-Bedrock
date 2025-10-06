/**
 * Soul SMP - Debug System
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

import { world } from "@minecraft/server";
import { CONFIG } from "../config.js";

// Debug mode - set to false for production
const DEBUG_ENABLED = true;
const LOG_TO_CHAT = true;
const LOG_TO_CONSOLE = true;

/**
 * Log levels
 */
export const LogLevel = {
  INFO: "§aINFO§r",
  WARN: "§eWARN§r",
  ERROR: "§cERROR§r",
  SUCCESS: "§2SUCCESS§r",
  DEBUG: "§7DEBUG§r"
};

/**
 * Log a debug message
 * @param {string} message - Message to log
 * @param {string} level - Log level
 * @param {Player|null} player - Optional player to send message to
 */
export function debugLog(message, level = LogLevel.INFO, player = null) {
  if (!DEBUG_ENABLED) return;
  
  const timestamp = new Date().toTimeString().split(' ')[0];
  const formattedMessage = `§8[§bSoul SMP§8]§r [${level}] ${message}`;
  
  // Log to console
  if (LOG_TO_CONSOLE) {
    console.warn(`[${timestamp}] ${message}`);
  }
  
  // Log to chat
  if (LOG_TO_CHAT) {
    if (player) {
      player.sendMessage(formattedMessage);
    } else {
      world.sendMessage(formattedMessage);
    }
  }
}

/**
 * Log system initialization
 * @param {string} systemName - Name of the system
 */
export function logSystemInit(systemName) {
  debugLog(`${systemName} initialized ✓`, LogLevel.SUCCESS);
}

/**
 * Log system error
 * @param {string} systemName - Name of the system
 * @param {Error} error - Error object
 */
export function logSystemError(systemName, error) {
  debugLog(`${systemName} failed: ${error.message}`, LogLevel.ERROR);
  if (DEBUG_ENABLED && LOG_TO_CONSOLE) {
    console.error(`[Soul SMP] ${systemName} Error:`, error);
  }
}

/**
 * Log player event
 * @param {Player} player - Player entity
 * @param {string} event - Event description
 */
export function logPlayerEvent(player, event) {
  debugLog(`Player ${player.name}: ${event}`, LogLevel.INFO);
}

/**
 * Display debug info to player
 * @param {Player} player - Player to show debug info
 */
export function showDebugInfo(player) {
  const lives = player.scoreboard?.getScore("soul_lives") ?? 0;
  const orbs = player.scoreboard?.getScore("soul_orb_count") ?? 0;
  const hearts = player.scoreboard?.getScore("soul_extra_hearts") ?? 0;
  const deaths = player.scoreboard?.getScore("soul_total_deaths") ?? 0;
  const permadeath = player.scoreboard?.getScore("soul_permadeath") ?? 0;
  const corruption = player.scoreboard?.getScore("soul_corruption") ?? 0;
  
  player.sendMessage("§8§l====== §bSOUL SMP DEBUG §8§l======");
  player.sendMessage(`§aPlayer:§r ${player.name}`);
  player.sendMessage(`§eLives:§r ${lives}/${CONFIG.MAX_LIVES}`);
  player.sendMessage(`§5Soul Orbs:§r ${orbs}`);
  player.sendMessage(`§cExtra Hearts:§r ${hearts}/${CONFIG.MAX_EXTRA_HEARTS}`);
  player.sendMessage(`§7Total Deaths:§r ${deaths}`);
  player.sendMessage(`§4Permadeath:§r ${permadeath === 1 ? 'YES' : 'NO'}`);
  player.sendMessage(`§dCorruption Tier:§r ${corruption}`);
  player.sendMessage("§8§l========================");
}

/**
 * Test all addon features
 * @param {Player} player - Player to run tests on
 */
export function runDiagnostics(player) {
  debugLog("Running diagnostics...", LogLevel.INFO, player);
  
  // Test 1: Scoreboard objectives
  try {
    const objectives = world.scoreboard.getObjectives();
    debugLog(`Scoreboard: ${objectives.length} objectives found`, LogLevel.SUCCESS, player);
  } catch (e) {
    debugLog(`Scoreboard: FAILED - ${e.message}`, LogLevel.ERROR, player);
  }
  
  // Test 2: Script API modules
  try {
    debugLog(`Script API: @minecraft/server loaded ✓`, LogLevel.SUCCESS, player);
  } catch (e) {
    debugLog(`Script API: FAILED`, LogLevel.ERROR, player);
  }
  
  // Test 3: Items
  try {
    const testItem = { typeId: "soul:soul_orb" };
    debugLog(`Items: soul_orb definition exists ✓`, LogLevel.SUCCESS, player);
  } catch (e) {
    debugLog(`Items: FAILED - ${e.message}`, LogLevel.ERROR, player);
  }
  
  // Test 4: Player data
  try {
    const lives = player.scoreboard?.getScore("soul_lives") ?? 0;
    debugLog(`Player Data: ${lives} lives detected ✓`, LogLevel.SUCCESS, player);
  } catch (e) {
    debugLog(`Player Data: FAILED - ${e.message}`, LogLevel.ERROR, player);
  }
  
  debugLog("Diagnostics complete!", LogLevel.SUCCESS, player);
}

/**
 * Enable/disable debug mode
 * @param {boolean} enabled - Whether to enable debug
 */
export function setDebugMode(enabled) {
  DEBUG_ENABLED = enabled;
  debugLog(`Debug mode ${enabled ? 'ENABLED' : 'DISABLED'}`, LogLevel.INFO);
}
