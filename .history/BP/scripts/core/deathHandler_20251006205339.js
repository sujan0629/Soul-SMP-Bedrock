/**
 * Soul SMP - Death Handler
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

import { world, system } from "@minecraft/server";
import { CONFIG } from "../config.js";
import { removeLife, isPermadeath, incrementDeaths } from "./lifeSystem.js";
import { setPermadeath, broadcastPermadeath } from "./permadeath.js";
import { dropSoulOrb } from "../soulOrb/soulOrb.js";
import { clearAllBuffEffects } from "../utils/effectHelper.js";
import { clearAllBuffItems } from "../utils/itemHelper.js";
import { removeAllExtraHearts } from "../hearts/extraHearts.js";

/**
 * Handle player death
 * @param {EntityDieAfterEvent} event - Death event
 */
export function handlePlayerDeath(event) {
  const player = event.deadEntity;
  
  // Verify it's a player
  if (player.typeId !== "minecraft:player") {
    return;
  }
  
  try {
    // Increment death counter
    incrementDeaths(player);
    
    // Remove one life
    const remainingLives = removeLife(player);
    
    // Drop soul orb at death location
    const deathLocation = player.location;
    const dimension = player.dimension;
    
    system.runTimeout(() => {
      dropSoulOrb(deathLocation, dimension, CONFIG.ORBS_PER_DEATH);
    }, 1);
    
    // Clear all buffs and effects
    clearAllBuffEffects(player);
    
    // Remove extra hearts
    removeAllExtraHearts(player);
    
    // Check for permadeath
    if (remainingLives === 0) {
      setPermadeath(player);
      broadcastPermadeath(player.name);
    } else {
      // Send death message with remaining lives
      system.runTimeout(() => {
        player.sendMessage(`${CONFIG.COLORS.WARNING}═══════════════════════════════`);
        player.sendMessage(`${CONFIG.COLORS.ERROR}        YOU DIED!`);
        player.sendMessage(`${CONFIG.COLORS.WARNING}Lives Remaining: §c${remainingLives}§e/§6${CONFIG.MAX_LIVES}`);
        player.sendMessage(`${CONFIG.COLORS.GRAY}A Soul Orb was dropped at your death location.`);
        player.sendMessage(`${CONFIG.COLORS.GRAY}All buffs and extra hearts have been lost.`);
        player.sendMessage(`${CONFIG.COLORS.WARNING}═══════════════════════════════`);
      }, 20);
    }
    
  } catch (e) {
    console.warn(`Error handling death for ${player.name}: ${e}`);
  }
}

/**
 * Setup death handler system
 */
export function setupDeathHandler() {
  world.afterEvents.entityDie.subscribe(handlePlayerDeath);
  
  // Also handle respawn to clear any remaining effects
  world.afterEvents.playerSpawn.subscribe((event) => {
    if (!event.initialSpawn) {
      const player = event.player;
      
      system.runTimeout(() => {
        // Ensure buffs are cleared
        clearAllBuffEffects(player);
        
        // Check if player should be in permadeath
        if (isPermadeath(player)) {
          try {
            player.runCommand("gamemode spectator @s");
          } catch (e) {
            // Ignore
          }
        }
      }, 5);
    }
  });
}
