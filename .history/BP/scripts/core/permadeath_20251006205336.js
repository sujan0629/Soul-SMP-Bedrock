/**
 * Soul SMP - Permadeath Handler
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

import { world, system, GameMode } from "@minecraft/server";
import { CONFIG } from "../config.js";
import { getScore, setScore } from "../utils/scoreboardHelper.js";
import { isPermadeath } from "./lifeSystem.js";

/**
 * Mark a player as in permadeath state
 * @param {Player} player - The player entity
 */
export function setPermadeath(player) {
  setScore(player, CONFIG.OBJECTIVES.PERMADEATH, 1);
  
  // Set to spectator mode after a short delay
  system.runTimeout(() => {
    try {
      player.runCommand("gamemode spectator @s");
      player.sendMessage(`${CONFIG.COLORS.ERROR}═══════════════════════════════`);
      player.sendMessage(`${CONFIG.COLORS.ERROR}       PERMADEATH ACTIVATED`);
      player.sendMessage(`${CONFIG.COLORS.ERROR}═══════════════════════════════`);
      player.sendMessage(`${CONFIG.COLORS.GRAY}You have lost all your lives.`);
      player.sendMessage(`${CONFIG.COLORS.GRAY}You are now in spectator mode.`);
      player.sendMessage(`${CONFIG.COLORS.GRAY}Contact an admin for a reset.`);
      player.sendMessage(`${CONFIG.COLORS.ERROR}═══════════════════════════════`);
      
      // Play death sound
      player.runCommand('playsound mob.wither.death @s');
      
    } catch (e) {
      console.warn(`Failed to set permadeath for ${player.name}: ${e}`);
    }
  }, 40); // 2 second delay
}

/**
 * Check if a player is in permadeath state
 * @param {Player} player - The player entity
 * @returns {boolean} True if in permadeath
 */
export function isInPermadeath(player) {
  return getScore(player, CONFIG.OBJECTIVES.PERMADEATH) === 1;
}

/**
 * Remove permadeath status from a player
 * @param {Player} player - The player entity
 */
export function removePermadeath(player) {
  setScore(player, CONFIG.OBJECTIVES.PERMADEATH, 0);
  
  system.run(() => {
    try {
      player.runCommand("gamemode survival @s");
      player.sendMessage(`${CONFIG.COLORS.SUCCESS}You have been restored! Welcome back.`);
    } catch (e) {
      console.warn(`Failed to remove permadeath for ${player.name}: ${e}`);
    }
  });
}

/**
 * Broadcast permadeath message to all players
 * @param {string} playerName - Name of the player who died
 */
export function broadcastPermadeath(playerName) {
  world.sendMessage(`${CONFIG.COLORS.ERROR}╔═══════════════════════════════════╗`);
  world.sendMessage(`${CONFIG.COLORS.ERROR}║  ${playerName} HAS BEEN ELIMINATED  `);
  world.sendMessage(`${CONFIG.COLORS.ERROR}║   ALL LIVES LOST - PERMADEATH    `);
  world.sendMessage(`${CONFIG.COLORS.ERROR}╚═══════════════════════════════════╝`);
  
  // Play dramatic sound for all players
  try {
    world.getAllPlayers().forEach(p => {
      p.runCommand('playsound mob.wither.spawn @s');
    });
  } catch (e) {
    // Ignore sound errors
  }
}

/**
 * Handle respawn for permadeath players (keep them in spectator)
 * @param {Player} player - The player entity
 */
export function handlePermaDeathRespawn(player) {
  if (isInPermadeath(player)) {
    system.runTimeout(() => {
      try {
        player.runCommand("gamemode spectator @s");
        player.sendMessage(`${CONFIG.COLORS.ERROR}You are in permadeath. You cannot respawn.`);
      } catch (e) {
        console.warn(`Failed to enforce permadeath on respawn for ${player.name}: ${e}`);
      }
    }, 5);
  }
}

/**
 * Setup permadeath enforcement system
 */
export function setupPermaDeathEnforcement() {
  // Check for permadeath players every few seconds
  system.runInterval(() => {
    world.getAllPlayers().forEach(player => {
      if (isInPermadeath(player)) {
        // Ensure they stay in spectator mode
        try {
          const gamemode = player.getGameMode();
          if (gamemode !== GameMode.spectator) {
            player.runCommand("gamemode spectator @s");
          }
        } catch (e) {
          // Ignore
        }
      }
    });
  }, 100); // Check every 5 seconds
  
  // Handle respawns
  world.afterEvents.playerSpawn.subscribe((event) => {
    handlePermaDeathRespawn(event.player);
  });
}
