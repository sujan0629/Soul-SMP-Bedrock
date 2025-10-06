# 📦 Soul SMP - Installation Guide

## 🎯 Quick Installation (Recommended)

### Option 1: Complete Package (.mcaddon)
1. **Download:** `SoulSMP_Complete_v1.0.0.mcaddon` (33.4 KB)
2. **Double-click** the .mcaddon file
3. Minecraft will **automatically open** and import both packs
4. ✅ **Done!** Both Behavior Pack and Resource Pack installed

### Option 2: Individual Packs (.mcpack)
1. **Download both files:**
   - `SoulSMP_BP_v1.0.0.mcpack` (35.7 KB) - Behavior Pack
   - `SoulSMP_RP_v1.0.0.mcpack` (3.1 KB) - Resource Pack
2. **Double-click each .mcpack file** (install both)
3. Minecraft will import them separately

---

## 🎮 How to Use After Installation

### 1. Create New World
- Open Minecraft Bedrock Edition
- Create **New World**
- Go to **Behavior Packs** → Enable "Soul SMP v1.0.0"
- Go to **Resource Packs** → Enable "Soul SMP v1.0.0"

### 2. Enable Experimental Features
⚠️ **IMPORTANT:** Enable these experiments:
- ✅ **Beta APIs**
- ✅ **Holiday Creator Features**

### 3. Start Playing!
- Create world and spawn in
- Type `!shop` to open the Soul Shop
- Type `!info` to see your stats
- Admin can use `/function setup` to initialize

---

## 🔧 Manual Installation (Alternative)

If double-clicking doesn't work:

### Windows:
1. Extract .mcpack files to:
   - `%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\behavior_packs\`
   - `%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\resource_packs\`

### Mobile (Android):
1. Download files to device
2. Open with Minecraft app
3. Or copy to: `/Android/data/com.mojang.minecraftpe/files/games/com.mojang/`

### Mobile (iOS):
1. Download files
2. Share → Open in Minecraft
3. Or use Files app → On My iPhone → Minecraft

---

## 🎯 Quick Start Commands

Once installed and world created:

```
/function setup           # Initialize the addon (admin)
!shop                    # Open Soul Shop
!info                    # View your stats
/function debug_info     # Debug information (admin)
/function reset_lives    # Reset all players (admin)
```

---

## ✅ Verification

After installation, you should see:
- 📱 **HUD Display:** Lives and Soul Orbs in actionbar
- 🛒 **Shop Works:** `!shop` command opens menu
- 🏃‍♂️ **Features Active:** Death drops orbs, life system works

---

## 🆘 Troubleshooting

**"Experimental features required"**
- Enable Beta APIs + Holiday Creator Features

**"Packs not showing up"**
- Restart Minecraft completely
- Check you downloaded both BP and RP

**"Commands not working"**
- Make sure you're in a world with the packs enabled
- Check that cheats/operator permissions are enabled

**"Can't open .mcpack files"**
- Make sure Minecraft Bedrock is installed
- Try renaming .mcpack to .zip, extract, then copy folders manually

---

## 📋 File Descriptions

| File | Description | Size |
|------|-------------|------|
| `SoulSMP_Complete_v1.0.0.mcaddon` | **Complete package** - Both packs in one file | 33.4 KB |
| `SoulSMP_BP_v1.0.0.mcpack` | **Behavior Pack** - Game logic and scripts | 35.7 KB |
| `SoulSMP_RP_v1.0.0.mcpack` | **Resource Pack** - Textures and UI | 3.1 KB |

**Recommended:** Use the .mcaddon file for easiest installation!