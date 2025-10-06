/**
 * Soul SMP - Effect Helper
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

import { EffectTypes } from "@minecraft/server";

/**
 * Apply an effect to a player
 * @param {Player} player - The player entity
 * @param {string} effectType - Effect type ID (e.g., "strength")
 * @param {number} duration - Duration in ticks (default: 1000000 for "permanent")
 * @param {number} amplifier - Effect amplifier (0 = level 1, 1 = level 2, etc.)
 * @param {boolean} showParticles - Whether to show effect particles
 * @returns {boolean} Success status
 */
export function applyEffect(player, effectType, duration = 1000000, amplifier = 0, showParticles = false) {
  try {
    const effect = EffectTypes.get(effectType);
    if (!effect) {
      console.warn(`Effect type ${effectType} not found`);
      return false;
    }
    
    player.addEffect(effect, duration, {
      amplifier: amplifier,
      showParticles: showParticles
    });
    return true;
  } catch (e) {
    console.warn(`Failed to apply effect ${effectType} to ${player.name}: ${e}`);
    return false;
  }
}

/**
 * Remove an effect from a player
 * @param {Player} player - The player entity
 * @param {string} effectType - Effect type ID
 * @returns {boolean} Success status
 */
export function removeEffect(player, effectType) {
  try {
    const effect = EffectTypes.get(effectType);
    if (!effect) return false;
    
    player.removeEffect(effect);
    return true;
  } catch (e) {
    console.warn(`Failed to remove effect ${effectType} from ${player.name}: ${e}`);
    return false;
  }
}

/**
 * Check if player has a specific effect
 * @param {Player} player - The player entity
 * @param {string} effectType - Effect type ID
 * @returns {boolean} True if player has the effect
 */
export function hasEffect(player, effectType) {
  try {
    const effect = EffectTypes.get(effectType);
    if (!effect) return false;
    
    return player.getEffect(effect) !== undefined;
  } catch (e) {
    return false;
  }
}

/**
 * Get effect amplifier if player has the effect
 * @param {Player} player - The player entity
 * @param {string} effectType - Effect type ID
 * @returns {number} Amplifier level, or -1 if not present
 */
export function getEffectAmplifier(player, effectType) {
  try {
    const effect = EffectTypes.get(effectType);
    if (!effect) return -1;
    
    const playerEffect = player.getEffect(effect);
    return playerEffect ? playerEffect.amplifier : -1;
  } catch (e) {
    return -1;
  }
}

/**
 * Remove all Soul SMP buff effects from a player
 * @param {Player} player - The player entity
 */
export function clearAllBuffEffects(player) {
  removeEffect(player, "strength");
  removeEffect(player, "resistance");
  removeEffect(player, "regeneration");
}

/**
 * Remove corruption effects from a player
 * @param {Player} player - The player entity
 */
export function clearCorruptionEffects(player) {
  removeEffect(player, "weakness");
  removeEffect(player, "slowness");
}

/**
 * Apply corruption effects based on tier
 * @param {Player} player - The player entity
 * @param {number} tier - Corruption tier (1, 2, or 3)
 */
export function applyCorruptionEffects(player, tier) {
  // Clear existing corruption effects first
  clearCorruptionEffects(player);
  
  if (tier >= 1) {
    // Tier 1: Weakness II
    applyEffect(player, "weakness", 1000000, 1, true);
  }
  
  if (tier >= 3) {
    // Tier 3: Add Slowness I
    applyEffect(player, "slowness", 1000000, 0, true);
  }
}

/**
 * Apply health boost effect for extra hearts
 * @param {Player} player - The player entity
 * @param {number} extraHearts - Number of extra hearts (each heart = 2 health)
 */
export function applyHealthBoost(player, extraHearts) {
  if (extraHearts > 0) {
    // Health boost amplifier: Each level adds 2 hearts (4 health)
    const amplifier = extraHearts - 1;
    applyEffect(player, "health_boost", 1000000, amplifier, false);
  } else {
    removeEffect(player, "health_boost");
  }
}

/**
 * Refresh all effects with a new duration
 * Useful when effects are about to expire
 * @param {Player} player - The player entity
 */
export function refreshEffects(player) {
  const effectsToRefresh = ["strength", "resistance", "regeneration", "weakness", "slowness", "health_boost"];
  
  effectsToRefresh.forEach(effectType => {
    if (hasEffect(player, effectType)) {
      const amplifier = getEffectAmplifier(player, effectType);
      applyEffect(player, effectType, 1000000, amplifier, false);
    }
  });
}
