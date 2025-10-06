/**
 * Soul SMP - Main Entry Point
 * Created by: Sujan Bhatta
 * Copyright © 2025 Sujan Bhatta
 */

import { world } from "@minecraft/server";

world.afterEvents.worldInitialize.subscribe(() => {
  world.sendMessage("§6[Soul SMP] §aAddon loaded successfully!");
  world.sendMessage("§7Created by Sujan Bhatta");
});