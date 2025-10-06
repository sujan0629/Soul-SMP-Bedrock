/**
 * Soul SMP - Main Entry Point
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

import { world, system } from "@minecraft/server";
import { CONFIG } from "./config.js";

// Debug System
import { debugLog, logSystemInit, logSystemError, showDebugInfo, runDiagnostics, LogLevel } from "./utils/debugger.js";

// Core Systems
import { initializeObjectives } from "./utils/scoreboardHelper.js";
import { setupPlayerInitialization } from "./core/playerInit.js";
import { setupDeathHandler } from "./core/deathHandler.js";
import { setupPermaDeathEnforcement } from "./core/permadeath.js";

// Soul Orb Systems
import { setupOrbTracking } from "./soulOrb/orbTracking.js";
import { setupCorruption } from "./soulOrb/corruption.js";

// Buff Systems
import { setupOffhandMonitor } from "./buffs/offhandMonitor.js";
import { setupBuffCombining } from "./buffs/buffCombining.js";
import { setupBuffCleanup } from "./buffs/buffSystem.js";

// Heart Systems
import { setupExtraHearts } from "./hearts/extraHearts.js";

// Relic Systems
import { setupSoulSigil } from "./relics/soulSigil.js";

// UI Systems
import { setupHUD } from "./ui/hud.js";
import { setupSoulShop } from "./ui/soulShop.js";

/**
 * Initialize all Soul SMP systems
 */
function initializeSoulSMP() {
  console.warn("[Soul SMP] Initializing addon...");
  
  try {
    // Initialize scoreboard objectives
    initializeObjectives();
    console.warn("[Soul SMP] ✓ Scoreboard objectives initialized");
    
    // Setup core systems
    setupPlayerInitialization();
    console.warn("[Soul SMP] ✓ Player initialization setup");
    
    setupDeathHandler();
    console.warn("[Soul SMP] ✓ Death handler setup");
    
    setupPermaDeathEnforcement();
    console.warn("[Soul SMP] ✓ Permadeath enforcement setup");
    
    // Setup Soul Orb systems
    setupOrbTracking();
    console.warn("[Soul SMP] ✓ Orb tracking setup");
    
    setupCorruption();
    console.warn("[Soul SMP] ✓ Corruption system setup");
    
    // Setup Buff systems
    setupOffhandMonitor();
    console.warn("[Soul SMP] ✓ Offhand monitor setup");
    
    setupBuffCombining();
    console.warn("[Soul SMP] ✓ Buff combining setup");
    
    setupBuffCleanup();
    console.warn("[Soul SMP] ✓ Buff cleanup setup");
    
    // Setup Heart systems
    setupExtraHearts();
    console.warn("[Soul SMP] ✓ Extra hearts setup");
    
    // Setup Relic systems
    setupSoulSigil();
    console.warn("[Soul SMP] ✓ Soul Sigil setup");
    
    // Setup UI systems
    setupHUD();
    console.warn("[Soul SMP] ✓ HUD setup");
    
    setupSoulShop();
    console.warn("[Soul SMP] ✓ Soul Shop setup");
    
    // Success message
    world.sendMessage(`${CONFIG.COLORS.GOLD}═══════════════════════════════════════`);
    world.sendMessage(`${CONFIG.COLORS.GOLD}    Soul SMP Addon Loaded!`);
    world.sendMessage(`${CONFIG.COLORS.WHITE}    Created by: ${CONFIG.COLORS.GRAY}Sujan Bhatta`);
    world.sendMessage(`${CONFIG.COLORS.WHITE}    Version: ${CONFIG.COLORS.GRAY}1.0.0`);
    world.sendMessage(`${CONFIG.COLORS.GOLD}═══════════════════════════════════════`);
    world.sendMessage(`${CONFIG.COLORS.INFO}Type ${CONFIG.COLORS.GOLD}!shop${CONFIG.COLORS.INFO} to open the Soul Shop`);
    world.sendMessage(`${CONFIG.COLORS.INFO}Type ${CONFIG.COLORS.GOLD}!info${CONFIG.COLORS.INFO} to view your stats`);
    
    console.warn("[Soul SMP] ✓ All systems initialized successfully!");
    
  } catch (e) {
    console.error(`[Soul SMP] ERROR during initialization: ${e}`);
    console.error(e.stack);
  }
}

// Initialize when world starts
world.afterEvents.worldInitialize.subscribe(() => {
  system.run(() => {
    initializeSoulSMP();
  });
});

// Handle script reload
system.afterEvents.scriptEventReceive.subscribe((event) => {
  if (event.id === "soul:reload") {
    world.sendMessage(`${CONFIG.COLORS.WARNING}[Soul SMP] Reloading addon...`);
    initializeSoulSMP();
  }
});