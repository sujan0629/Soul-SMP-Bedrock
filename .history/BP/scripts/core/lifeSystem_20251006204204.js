/**
 * Soul SMP - Life System
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

import { world } from "@minecraft/server";
import { CONFIG } from "../config.js";

export function initializeLifeSystem() {
  // Create scoreboard objectives
  try {
    world.scoreboard.addObjective(CONFIG.OBJECTIVES.LIVES, "Lives");
  } catch (e) {
    // Objective already exists
  }
  
  // Initialize new players
  world.afterEvents.playerSpawn.subscribe((event) => {
    if (event.initialSpawn) {
      initializePlayer(event.player);
    }
  });
}

function initializePlayer(player) {
  const livesObj = world.scoreboard.getObjective(CONFIG.OBJECTIVES.LIVES);
  
  if (!livesObj.getScore(player)) {
    livesObj.setScore(player, CONFIG.DEFAULT_LIVES);
    player.sendMessage(`§6You start with ${CONFIG.DEFAULT_LIVES} lives!`);
  }
}

export function getLives(player) {
  const livesObj = world.scoreboard.getObjective(CONFIG.OBJECTIVES.LIVES);
  return livesObj.getScore(player) || 0;
}

export function setLives(player, amount) {
  const livesObj = world.scoreboard.getObjective(CONFIG.OBJECTIVES.LIVES);
  livesObj.setScore(player, Math.min(amount, CONFIG.MAX_LIVES));
}

export function decrementLives(player) {
  const currentLives = getLives(player);
  setLives(player, currentLives - 1);
  return getLives(player);
}