# Soul SMP - Setup Function
# Created by: Sujan Bhatta
# Copyright © 2025 Sujan Bhatta
# Run this command once to initialize the addon: /function setup

# Create all scoreboard objectives
scoreboard objectives add soul_lives dummy "Lives"
scoreboard objectives add soul_orb_count dummy "Soul Orbs"
scoreboard objectives add soul_extra_hearts dummy "Extra Hearts"
scoreboard objectives add soul_total_deaths dummy "Total Deaths"
scoreboard objectives add soul_permadeath dummy "Permadeath"
scoreboard objectives add soul_corruption dummy "Corruption Tier"
scoreboard objectives add soul_active_buff dummy "Active Buff"

# Display lives on sidebar (optional)
# scoreboard objectives setdisplay sidebar soul_lives

# Initialize all online players with 10 lives
scoreboard players set @a[scores={soul_lives=0}] soul_lives 10

# Welcome message
tellraw @a {"rawtext":[{"text":"§6═══════════════════════════════════════"}]}
tellraw @a {"rawtext":[{"text":"§6    Soul SMP Setup Complete!"}]}
tellraw @a {"rawtext":[{"text":"§7    All scoreboard objectives created"}]}
tellraw @a {"rawtext":[{"text":"§7    Players initialized with 10 lives"}]}
tellraw @a {"rawtext":[{"text":"§6═══════════════════════════════════════"}]}
tellraw @a {"rawtext":[{"text":"§bType §6!shop§b to open the Soul Shop"}]}
tellraw @a {"rawtext":[{"text":"§bType §6!info§b to view your stats"}]}
