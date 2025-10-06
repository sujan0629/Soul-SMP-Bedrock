# Soul SMP Addon - Installation Guide

**Version:** 1.0.0  
**Created by:** Sujan Bhatta  
**Copyright © 2025 Sujan Bhatta**

## Requirements

- **Minecraft Bedrock Edition** 1.20.50 or higher
- **Experimental Features** must be enabled:
  - Beta APIs
  - Holiday Creator Features

## Installation Methods

### Method 1: Direct Import (Recommended)

1. Download the `.mcaddon` file
2. Double-click the file to import
3. Minecraft will automatically install both packs
4. Create a new world or edit an existing one
5. Enable the behavior and resource packs
6. **Enable Experimental Features** in world settings
7. Start the world!

### Method 2: Manual Installation

#### Behavior Pack

1. Extract the `BP` folder
2. Navigate to:
   - **Windows 10:** `%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\development_behavior_packs\`
   - **Android:** `Internal Storage/games/com.mojang/development_behavior_packs/`
   - **iOS:** `On My iPhone/Minecraft/games/com.mojang/development_behavior_packs/`
3. Copy the `BP` folder into this directory
4. Rename it to `soul_smp_bp`

#### Resource Pack

1. Extract the `RP` folder
2. Navigate to:
   - **Windows 10:** `%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\development_resource_packs\`
   - **Android:** `Internal Storage/games/com.mojang/development_resource_packs/`
   - **iOS:** `On My iPhone/Minecraft/games/com.mojang/development_resource_packs/`
3. Copy the `RP` folder into this directory
4. Rename it to `soul_smp_rp`

## World Configuration

### Required Settings

1. **Cheats:** Enabled (for commands)
2. **Experimental Features:**
   - ✅ Beta APIs
   - ✅ Holiday Creator Features
3. **Game Mode:** Survival (recommended)
4. **Difficulty:** Normal or Hard (recommended)

### First-Time Setup

After loading into the world:

1. Run the setup command:
   ```
   /function setup
   ```
2. This will initialize all scoreboard objectives
3. All players will start with 10 lives
4. Type `!shop` to open the Soul Shop
5. Type `!info` to view your stats

## Verifying Installation

Check if the addon is working:

1. Look at the actionbar - you should see your lives and orbs
2. Type `!shop` - a UI menu should appear
3. Run `/function debug_info` to see your scoreboard values
4. Try giving yourself items:
   ```
   /give @s soul:soul_orb 5
   ```

## Troubleshooting

### "Unknown Item" Error

- Make sure both behavior and resource packs are enabled
- Ensure experimental features are turned on
- Try restarting Minecraft

### Script Not Running

- Check that "Beta APIs" is enabled in experimental features
- Look for error messages in the console
- Try running `/reload` to restart scripts

### HUD Not Showing

- The HUD uses actionbar display
- Some UI elements may conflict with other addons
- Try in a clean world without other addons

### Shop Not Opening

- Type `!shop` in chat (not `/shop`)
- Ensure the player has joined the world fully
- Check that scripts are enabled

## Recommended Settings

### For Best Experience

- **Players:** 2-20 (designed for SMP)
- **World Type:** Infinite
- **Simulation Distance:** 4+ chunks
- **Show Coordinates:** On (helpful for tracking)
- **Fire Spreads:** Off (optional, for safety)
- **TNT Explodes:** On
- **Keep Inventory:** Off (part of the challenge)

### Performance Tips

- If experiencing lag, reduce simulation distance
- Limit the number of active players
- Avoid having too many entities loaded
- On mobile, close background apps

## Updating the Addon

To update to a newer version:

1. Export your world (backup!)
2. Remove the old addon from the world
3. Install the new version following the installation steps
4. Re-enable the packs in your world
5. Your progress (lives, orbs) is saved in scoreboards and will persist

## Uninstallation

To remove the addon:

1. Backup your world first
2. Go to world settings
3. Disable both behavior and resource packs
4. Deactivate the packs
5. Optionally, remove scoreboards with:
   ```
   /scoreboard objectives remove soul_lives
   /scoreboard objectives remove soul_orb_count
   /scoreboard objectives remove soul_extra_hearts
   /scoreboard objectives remove soul_total_deaths
   /scoreboard objectives remove soul_permadeath
   /scoreboard objectives remove soul_corruption
   /scoreboard objectives remove soul_active_buff
   ```

## Getting Help

If you encounter issues:

1. Check this installation guide thoroughly
2. Verify all requirements are met
3. Try in a fresh creative world first
4. Check the console for error messages
5. Review the [Gameplay Guide](GAMEPLAY.md)

## Next Steps

- Read the [Gameplay Guide](GAMEPLAY.md) to learn how to play
- Check the [Changelog](CHANGELOG.md) for version history
- Join with friends and start your Soul SMP adventure!

---

**Created by Sujan Bhatta © 2025**  
**For Minecraft Bedrock Edition**
