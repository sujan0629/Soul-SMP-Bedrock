/**
 * Soul SMP - Player Initialization
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

import { world, system } from "@minecraft/server";
import { CONFIG } from "../config.js";
import { getScore, setScore, getOrCreateObjective } from "../utils/scoreboardHelper.js";

// Track initialized players
const initializedPlayers = new Set();

/**
 * Initialize a new player with default values
 * @param {Player} player - The player entity
 */
export function initializePlayer(player) {
  // Skip if already initialized
  if (initializedPlayers.has(player.id)) {
    return;
  }
  
  // Check if player has lives score
  const currentLives = getScore(player, CONFIG.OBJECTIVES.LIVES);
  
  if (currentLives === 0) {
    // New player - set default lives
    setScore(player, CONFIG.OBJECTIVES.LIVES, CONFIG.DEFAULT_LIVES);
    player.sendMessage(`${CONFIG.COLORS.GOLD}Welcome to Soul SMP!`);
    player.sendMessage(`${CONFIG.COLORS.INFO}You have ${CONFIG.DEFAULT_LIVES} lives. Use them wisely!`);
  }
  
  // Initialize other scores if needed
  const deaths = getScore(player, CONFIG.OBJECTIVES.TOTAL_DEATHS);
  if (deaths === 0) {
    setScore(player, CONFIG.OBJECTIVES.TOTAL_DEATHS, 0);
  }
  
  const extraHearts = getScore(player, CONFIG.OBJECTIVES.EXTRA_HEARTS);
  if (extraHearts === 0) {
    setScore(player, CONFIG.OBJECTIVES.EXTRA_HEARTS, 0);
  }
  
  const permadeath = getScore(player, CONFIG.OBJECTIVES.PERMADEATH);
  if (permadeath === 1) {
    // Player is in permadeath state
    system.run(() => {
      try {
        player.runCommand("gamemode spectator @s");
        player.sendMessage(`${CONFIG.COLORS.ERROR}You have no lives remaining. You are in spectator mode.`);
      } catch (e) {
        console.warn(`Failed to set spectator mode for ${player.name}: ${e}`);
      }
    });
  }
  
  initializedPlayers.add(player.id);
}

/**
 * Initialize all online players
 */
export function initializeAllPlayers() {
  const players = world.getAllPlayers();
  players.forEach(player => {
    initializePlayer(player);
  });
}

/**
 * Setup player join handler
 */
export function setupPlayerInitialization() {
  // Initialize existing players
  initializeAllPlayers();
  
  // Handle new players joining
  world.afterEvents.playerSpawn.subscribe((event) => {
    const { player, initialSpawn } = event;
    
    if (initialSpawn) {
      // Small delay to ensure player is fully loaded
      system.runTimeout(() => {
        initializePlayer(player);
      }, 20);
    }
  });
  
  // Cleanup when players leave
  world.afterEvents.playerLeave.subscribe((event) => {
    const { playerId } = event;
    initializedPlayers.delete(playerId);
  });
}

/**
 * Reset a player's data to defaults
 * @param {Player} player - The player entity
 */
export function resetPlayer(player) {
  setScore(player, CONFIG.OBJECTIVES.LIVES, CONFIG.DEFAULT_LIVES);
  setScore(player, CONFIG.OBJECTIVES.TOTAL_DEATHS, 0);
  setScore(player, CONFIG.OBJECTIVES.EXTRA_HEARTS, 0);
  setScore(player, CONFIG.OBJECTIVES.PERMADEATH, 0);
  setScore(player, CONFIG.OBJECTIVES.CORRUPTION_TIER, 0);
  setScore(player, CONFIG.OBJECTIVES.ACTIVE_BUFF, 0);
  
  // Set back to survival mode
  system.run(() => {
    try {
      player.runCommand("gamemode survival @s");
      player.sendMessage(`${CONFIG.COLORS.SUCCESS}Your Soul SMP data has been reset!`);
    } catch (e) {
      console.warn(`Failed to reset player ${player.name}: ${e}`);
    }
  });
  
  // Re-initialize
  initializedPlayers.delete(player.id);
  initializePlayer(player);
}
