/**
 * Soul SMP - Buff Combining System
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

import { world, system } from "@minecraft/server";
import { CONFIG } from "../config.js";
import { canCombineBuffs, getCombinedBuff, isBuffItem, getBuffTier, getBuffBaseType } from "../utils/itemHelper.js";

/**
 * Handle item drop for buff combining
 * @param {Player} player - The player who dropped the item
 * @param {ItemStack} droppedItem - The item that was dropped
 */
export function handleBuffCombining(player, droppedItem) {
  if (!isBuffItem(droppedItem.typeId)) {
    return;
  }
  
  // Check if there's another same buff item nearby
  const location = player.location;
  const dimension = player.dimension;
  
  system.runTimeout(() => {
    try {
      // Get nearby items
      const entities = dimension.getEntities({
        location: location,
        maxDistance: 2,
        type: "minecraft:item"
      });
      
      // Find matching buff items
      const matchingItems = entities.filter(entity => {
        try {
          const itemComponent = entity.getComponent("item");
          if (itemComponent && itemComponent.itemStack) {
            return itemComponent.itemStack.typeId === droppedItem.typeId;
          }
        } catch (e) {
          // Ignore
        }
        return false;
      });
      
      // Need at least 2 items to combine
      if (matchingItems.length >= 2) {
        const item1 = matchingItems[0];
        const item2 = matchingItems[1];
        
        const itemComponent1 = item1.getComponent("item");
        const itemComponent2 = item2.getComponent("item");
        
        if (itemComponent1 && itemComponent2) {
          const stack1 = itemComponent1.itemStack;
          const stack2 = itemComponent2.itemStack;
          
          if (canCombineBuffs(stack1.typeId, stack2.typeId)) {
            const combinedItemId = getCombinedBuff(stack1.typeId, stack2.typeId);
            
            if (combinedItemId) {
              // Remove the two items
              item1.kill();
              item2.kill();
              
              // Spawn combined item
              const combinedStack = new ItemStack(combinedItemId, 1);
              dimension.spawnItem(combinedStack, location);
              
              // Play effects
              dimension.spawnParticle("minecraft:crop_growth_emitter", location);
              player.runCommand('playsound random.levelup @a[r=10] ~ ~ ~ 1.0 1.2');
              
              const buffName = getBuffDisplayName(combinedItemId);
              player.sendMessage(`${CONFIG.COLORS.SUCCESS}✓ Combined into ${buffName}!`);
            }
          }
        }
      }
    } catch (e) {
      console.warn(`Error in buff combining: ${e}`);
    }
  }, 5); // Small delay to ensure item entity spawned
}

/**
 * Get display name from item ID
 * @param {string} itemId - Item ID
 * @returns {string} Display name
 */
function getBuffDisplayName(itemId) {
  const buffType = itemId.replace('soul:', '');
  const parts = buffType.split('_');
  const name = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  const tier = parts[1];
  const tierRoman = ['I', 'II', 'III'][parseInt(tier) - 1];
  
  return `${name} ${tierRoman}`;
}

/**
 * Setup buff combining detection
 */
export function setupBuffCombining() {
  // Note: Bedrock doesn't have a direct "item dropped" event
  // We'll need to detect this through inventory changes or other means
  // For now, this is a placeholder for future implementation
  
  // Alternative: Use entity spawn events
  world.afterEvents.entitySpawn.subscribe((event) => {
    const entity = event.entity;
    
    if (entity.typeId === "minecraft:item") {
      system.runTimeout(() => {
        tryAutoCombine(entity);
      }, 10);
    }
  });
}

/**
 * Try to automatically combine nearby buff items
 * @param {Entity} itemEntity - The item entity
 */
function tryAutoCombine(itemEntity) {
  try {
    const itemComponent = itemEntity.getComponent("item");
    if (!itemComponent || !itemComponent.itemStack) return;
    
    const itemStack = itemComponent.itemStack;
    if (!isBuffItem(itemStack.typeId)) return;
    
    const location = itemEntity.location;
    const dimension = itemEntity.dimension;
    
    // Get nearby same-type items
    const nearbyEntities = dimension.getEntities({
      location: location,
      maxDistance: 1,
      type: "minecraft:item"
    });
    
    for (const nearbyEntity of nearbyEntities) {
      if (nearbyEntity.id === itemEntity.id) continue;
      
      const nearbyComponent = nearbyEntity.getComponent("item");
      if (!nearbyComponent || !nearbyComponent.itemStack) continue;
      
      const nearbyStack = nearbyComponent.itemStack;
      
      if (canCombineBuffs(itemStack.typeId, nearbyStack.typeId)) {
        const combinedItemId = getCombinedBuff(itemStack.typeId, nearbyStack.typeId);
        
        if (combinedItemId) {
          // Remove both items
          itemEntity.kill();
          nearbyEntity.kill();
          
          // Spawn combined item
          const combinedStack = new ItemStack(combinedItemId, 1);
          dimension.spawnItem(combinedStack, location);
          
          // Visual effects
          dimension.spawnParticle("minecraft:crop_growth_emitter", location);
          
          // Notify nearby players
          const nearbyPlayers = dimension.getPlayers({
            location: location,
            maxDistance: 10
          });
          
          nearbyPlayers.forEach(player => {
            player.runCommand('playsound random.levelup @s ~ ~ ~ 0.5 1.2');
          });
          
          break;
        }
      }
    }
  } catch (e) {
    // Ignore errors
  }
}
