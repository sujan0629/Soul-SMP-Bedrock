/**
 * Soul SMP - Scoreboard Helper
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

import { world } from "@minecraft/server";

/**
 * Get or create a scoreboard objective
 * @param {string} objectiveId - The ID of the objective
 * @param {string} displayName - Display name for the objective
 * @returns {ScoreboardObjective} The scoreboard objective
 */
export function getOrCreateObjective(objectiveId, displayName = objectiveId) {
  let objective = world.scoreboard.getObjective(objectiveId);
  
  if (!objective) {
    try {
      objective = world.scoreboard.addObjective(objectiveId, displayName);
    } catch (e) {
      console.warn(`Failed to create objective ${objectiveId}: ${e}`);
    }
  }
  
  return objective;
}

/**
 * Get a player's score from an objective
 * @param {Player} player - The player entity
 * @param {string} objectiveId - The objective ID
 * @returns {number} The score value, or 0 if not found
 */
export function getScore(player, objectiveId) {
  const objective = world.scoreboard.getObjective(objectiveId);
  if (!objective) return 0;
  
  try {
    const participant = objective.getParticipants().find(p => {
      return p.type === "player" && p.getEntity()?.id === player.id;
    });
    
    if (participant) {
      return objective.getScore(participant) ?? 0;
    }
  } catch (e) {
    console.warn(`Failed to get score for ${player.name} in ${objectiveId}: ${e}`);
  }
  
  return 0;
}

/**
 * Set a player's score in an objective
 * @param {Player} player - The player entity
 * @param {string} objectiveId - The objective ID
 * @param {number} value - The value to set
 * @returns {boolean} Success status
 */
export function setScore(player, objectiveId, value) {
  const objective = getOrCreateObjective(objectiveId);
  if (!objective) return false;
  
  try {
    objective.setScore(player, value);
    return true;
  } catch (e) {
    console.warn(`Failed to set score for ${player.name} in ${objectiveId}: ${e}`);
    return false;
  }
}

/**
 * Add to a player's score
 * @param {Player} player - The player entity
 * @param {string} objectiveId - The objective ID
 * @param {number} amount - Amount to add (can be negative)
 * @returns {number} New score value
 */
export function addScore(player, objectiveId, amount) {
  const currentScore = getScore(player, objectiveId);
  const newScore = currentScore + amount;
  setScore(player, objectiveId, newScore);
  return newScore;
}

/**
 * Reset all Soul SMP objectives for a player
 * @param {Player} player - The player entity
 */
export function resetPlayerScores(player) {
  const objectives = [
    "soul_lives",
    "soul_orb_count",
    "soul_extra_hearts",
    "soul_total_deaths",
    "soul_permadeath",
    "soul_corruption",
    "soul_active_buff"
  ];
  
  objectives.forEach(objId => {
    const objective = world.scoreboard.getObjective(objId);
    if (objective) {
      try {
        objective.setScore(player, 0);
      } catch (e) {
        // Ignore errors
      }
    }
  });
}

/**
 * Initialize all required scoreboard objectives
 */
export function initializeObjectives() {
  getOrCreateObjective("soul_lives", "Lives");
  getOrCreateObjective("soul_orb_count", "Soul Orbs");
  getOrCreateObjective("soul_extra_hearts", "Extra Hearts");
  getOrCreateObjective("soul_total_deaths", "Total Deaths");
  getOrCreateObjective("soul_permadeath", "Permadeath");
  getOrCreateObjective("soul_corruption", "Corruption Tier");
  getOrCreateObjective("soul_active_buff", "Active Buff");
}

/**
 * Check if a player has a specific score value
 * @param {Player} player - The player entity
 * @param {string} objectiveId - The objective ID
 * @param {number} value - Value to check
 * @returns {boolean} True if player has this score
 */
export function hasScore(player, objectiveId, value) {
  return getScore(player, objectiveId) === value;
}
