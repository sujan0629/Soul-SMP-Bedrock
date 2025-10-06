/**
 * Soul SMP - Soul Shop System
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { CONFIG } from "../config.js";
import { countSoulOrbs } from "../soulOrb/orbTracking.js";
import { purchaseBuffItem, getAllBuffTypes, getBuffCost, getBuffDisplayName } from "../buffs/buffItems.js";
import { purchaseExtraHeart, getExtraHearts } from "../hearts/extraHearts.js";
import { useSoulSigil, canUseSoulSigil, getSoulSigilInfo } from "../relics/soulSigil.js";
import { getLives } from "../core/lifeSystem.js";

/**
 * Show main shop menu
 * @param {Player} player - The player entity
 */
export async function showShopMenu(player) {
  const orbCount = countSoulOrbs(player);
  const lives = getLives(player);
  const extraHearts = getExtraHearts(player);
  
  const form = new ActionFormData()
    .title("§5§l✦ SOUL SHOP ✦")
    .body(
      `§6Lives: §e${lives}/${CONFIG.MAX_LIVES}\n` +
      `§5Soul Orbs: §d${orbCount}\n` +
      `§cExtra Hearts: §e${extraHearts}/${CONFIG.MAX_EXTRA_HEARTS}\n\n` +
      `§7Select a category:`
    )
    .button("§6⚔ Buff Items", "textures/items/diamond_sword")
    .button("§c❤ Extra Hearts", "textures/items/apple_golden")
    .button("§5✦ Soul Sigil", "textures/items/nether_star")
    .button("§7✖ Close");
  
  try {
    const response = await form.show(player);
    
    if (response.canceled) return;
    
    switch (response.selection) {
      case 0:
        showBuffShop(player);
        break;
      case 1:
        showHeartShop(player);
        break;
      case 2:
        showSoulSigilShop(player);
        break;
      case 3:
        // Close
        break;
    }
  } catch (e) {
    player.sendMessage(`${CONFIG.COLORS.ERROR}Failed to open shop menu.`);
  }
}

/**
 * Show buff item shop
 * @param {Player} player - The player entity
 */
async function showBuffShop(player) {
  const orbCount = countSoulOrbs(player);
  
  const form = new ActionFormData()
    .title("§6⚔ Buff Shop")
    .body(`§5Soul Orbs: §d${orbCount}\n\n§7Select a buff to purchase:`);
  
  // Add buttons for each buff type
  const buffTypes = [
    "strength_1", "strength_2", "strength_3",
    "resistance_1", "resistance_2", "resistance_3",
    "regeneration_1", "regeneration_2", "regeneration_3"
  ];
  
  buffTypes.forEach(buffType => {
    const cost = getBuffCost(buffType);
    const name = getBuffDisplayName(buffType);
    const canAfford = orbCount >= cost;
    const color = canAfford ? "§a" : "§7";
    
    form.button(`${color}${name}\n§7Cost: ${cost} orbs`);
  });
  
  form.button("§e← Back");
  
  try {
    const response = await form.show(player);
    
    if (response.canceled) return;
    
    if (response.selection === buffTypes.length) {
      // Back button
      showShopMenu(player);
      return;
    }
    
    const selectedBuff = buffTypes[response.selection];
    purchaseBuffItem(player, selectedBuff);
    
    // Reopen shop
    system.runTimeout(() => {
      showBuffShop(player);
    }, 20);
    
  } catch (e) {
    player.sendMessage(`${CONFIG.COLORS.ERROR}Failed to open buff shop.`);
  }
}

/**
 * Show heart shop
 * @param {Player} player - The player entity
 */
async function showHeartShop(player) {
  const orbCount = countSoulOrbs(player);
  const extraHearts = getExtraHearts(player);
  const cost = CONFIG.ORBS_PER_HEART;
  const canPurchase = orbCount >= cost && extraHearts < CONFIG.MAX_EXTRA_HEARTS;
  
  const form = new ActionFormData()
    .title("§c❤ Extra Hearts Shop")
    .body(
      `§5Soul Orbs: §d${orbCount}\n` +
      `§cExtra Hearts: §e${extraHearts}/${CONFIG.MAX_EXTRA_HEARTS}\n\n` +
      `§7Cost: §6${cost} orbs §7per heart\n` +
      `§7Each heart adds §c+2 health\n\n` +
      `${canPurchase ? "§aClick to purchase!" : "§7" + (extraHearts >= CONFIG.MAX_EXTRA_HEARTS ? "Maximum reached!" : "Not enough orbs!")}`
    );
  
  if (canPurchase) {
    form.button("§a✓ Purchase Heart\n§7" + cost + " orbs");
  }
  
  form.button("§e← Back");
  
  try {
    const response = await form.show(player);
    
    if (response.canceled) return;
    
    if (canPurchase && response.selection === 0) {
      purchaseExtraHeart(player);
      
      // Reopen shop
      system.runTimeout(() => {
        showHeartShop(player);
      }, 20);
    } else {
      showShopMenu(player);
    }
    
  } catch (e) {
    player.sendMessage(`${CONFIG.COLORS.ERROR}Failed to open heart shop.`);
  }
}

/**
 * Show soul sigil shop
 * @param {Player} player - The player entity
 */
async function showSoulSigilShop(player) {
  const orbCount = countSoulOrbs(player);
  const cost = CONFIG.SOUL_SIGIL_COST;
  const canUse = canUseSoulSigil(player);
  const lives = getLives(player);
  
  const form = new ActionFormData()
    .title("§5✦ Soul Sigil")
    .body(
      `§5Soul Orbs: §d${orbCount}\n` +
      `§6Lives: §e${lives}/${CONFIG.MAX_LIVES}\n\n` +
      `§7Cost: §6${cost} Soul Orbs\n` +
      `§7Effect: §a+1 Permanent Life\n\n` +
      `${canUse ? "§aReady to use!" : "§7" + (lives >= CONFIG.MAX_LIVES ? "Maximum lives reached!" : "Not enough orbs!")}`
    );
  
  if (canUse) {
    form.button("§a✓ Use Soul Sigil\n§7" + cost + " orbs");
  }
  
  form.button("§e← Back");
  
  try {
    const response = await form.show(player);
    
    if (response.canceled) return;
    
    if (canUse && response.selection === 0) {
      useSoulSigil(player);
      
      // Reopen shop
      system.runTimeout(() => {
        showSoulSigilShop(player);
      }, 20);
    } else {
      showShopMenu(player);
    }
    
  } catch (e) {
    player.sendMessage(`${CONFIG.COLORS.ERROR}Failed to open soul sigil menu.`);
  }
}

/**
 * Setup shop command
 */
export function setupSoulShop() {
  // Register custom command handler
  world.beforeEvents.chatSend.subscribe((event) => {
    const message = event.message;
    const player = event.sender;
    
    if (message.toLowerCase() === "!shop" || message.toLowerCase() === "!soulshop") {
      event.cancel = true;
      
      system.run(() => {
        showShopMenu(player);
      });
    }
    
    if (message.toLowerCase() === "!info" || message.toLowerCase() === "!soulinfo") {
      event.cancel = true;
      
      system.run(() => {
        showPlayerInfo(player);
      });
    }
  });
}

/**
 * Show player info
 * @param {Player} player - The player entity
 */
function showPlayerInfo(player) {
  const lives = getLives(player);
  const orbCount = countSoulOrbs(player);
  const extraHearts = getExtraHearts(player);
  const activeBuff = require("../buffs/buffSystem.js").getActiveBuff(player);
  
  player.sendMessage(`${CONFIG.COLORS.GOLD}╔═══════════════════════════════════╗`);
  player.sendMessage(`${CONFIG.COLORS.GOLD}║      YOUR SOUL SMP STATS        ║`);
  player.sendMessage(`${CONFIG.COLORS.GOLD}╠═══════════════════════════════════╣`);
  player.sendMessage(`${CONFIG.COLORS.WHITE}║ Lives: ${CONFIG.COLORS.GREEN}${lives}/${CONFIG.MAX_LIVES}${CONFIG.COLORS.WHITE}                      ║`);
  player.sendMessage(`${CONFIG.COLORS.WHITE}║ Soul Orbs: ${CONFIG.COLORS.PURPLE}${orbCount}${CONFIG.COLORS.WHITE}                    ║`);
  player.sendMessage(`${CONFIG.COLORS.WHITE}║ Extra Hearts: ${CONFIG.COLORS.ERROR}${extraHearts}/${CONFIG.MAX_EXTRA_HEARTS}${CONFIG.COLORS.WHITE}                ║`);
  player.sendMessage(`${CONFIG.COLORS.WHITE}║ Active Buff: ${activeBuff ? CONFIG.COLORS.GREEN + "Yes" : CONFIG.COLORS.GRAY + "None"}${CONFIG.COLORS.WHITE}              ║`);
  player.sendMessage(`${CONFIG.COLORS.GOLD}╠═══════════════════════════════════╣`);
  player.sendMessage(`${CONFIG.COLORS.GRAY}║ Use !shop to open the Soul Shop ║`);
  player.sendMessage(`${CONFIG.COLORS.GOLD}╚═══════════════════════════════════╝`);
}
