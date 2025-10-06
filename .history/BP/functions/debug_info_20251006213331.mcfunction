# Soul SMP - Debug Info Function
# Created by: Sujan Bhatta
# Copyright © 2025 Sujan Bhatta
# Run this to see debug information: /function debug_info

# Display all scoreboard values for the executing player
tellraw @s {"rawtext":[{"text":"§6═══════════════════════════════════════"}]}
tellraw @s {"rawtext":[{"text":"§6    Soul SMP Debug Info"}]}
tellraw @s {"rawtext":[{"text":"§6═══════════════════════════════════════"}]}
tellraw @s {"rawtext":[{"text":"§7Lives: "},{"score":{"name":"@s","objective":"soul_lives"}}]}
tellraw @s {"rawtext":[{"text":"§7Orb Count: "},{"score":{"name":"@s","objective":"soul_orb_count"}}]}
tellraw @s {"rawtext":[{"text":"§7Extra Hearts: "},{"score":{"name":"@s","objective":"soul_extra_hearts"}}]}
tellraw @s {"rawtext":[{"text":"§7Total Deaths: "},{"score":{"name":"@s","objective":"soul_total_deaths"}}]}
tellraw @s {"rawtext":[{"text":"§7Permadeath: "},{"score":{"name":"@s","objective":"soul_permadeath"}}]}
tellraw @s {"rawtext":[{"text":"§7Corruption: "},{"score":{"name":"@s","objective":"soul_corruption"}}]}
tellraw @s {"rawtext":[{"text":"§6═══════════════════════════════════════"}]}

# Test give commands
tellraw @s {"rawtext":[{"text":"§bTest Commands:"}]}
tellraw @s {"rawtext":[{"text":"§7/give @s soul:soul_orb 10"}]}
tellraw @s {"rawtext":[{"text":"§7/give @s soul:strength_1"}]}
tellraw @s {"rawtext":[{"text":"§7/give @s soul:soul_sigil"}]}
