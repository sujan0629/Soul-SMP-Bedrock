# Soul SMP - Reset Lives Function
# Created by: Sujan Bhatta
# Copyright © 2025 Sujan Bhatta
# Run this to reset all players' lives: /function reset_lives

# Reset all life-related scores
scoreboard players set @a soul_lives 10
scoreboard players set @a soul_extra_hearts 0
scoreboard players set @a soul_permadeath 0
scoreboard players set @a soul_corruption 0
scoreboard players set @a soul_active_buff 0

# Set all players to survival mode
gamemode survival @a

# Clear effects
effect @a clear

# Confirmation message
tellraw @a {"rawtext":[{"text":"§6═══════════════════════════════════════"}]}
tellraw @a {"rawtext":[{"text":"§a    All player lives have been reset!"}]}
tellraw @a {"rawtext":[{"text":"§7    Lives: 10/15"}]}
tellraw @a {"rawtext":[{"text":"§7    Permadeath removed"}]}
tellraw @a {"rawtext":[{"text":"§7    All players set to survival"}]}
tellraw @a {"rawtext":[{"text":"§6═══════════════════════════════════════"}]}
