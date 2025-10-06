# 🚀 GitHub Release Guide

## Step 1: Create a Git Tag

```bash
# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0
```

## Step 2: Create GitHub Release

### Option A: GitHub Web UI (Recommended)

1. **Go to your repository**: https://github.com/sujan0629/Soul-SMP-Bedrock
2. **Click "Releases"** in the right sidebar
3. **Click "Create a new release"**
4. **Fill out the form:**

**Tag version:** `v1.0.0`
**Release title:** `Soul SMP v1.0.0 - Initial Release`
**Release notes:**
```markdown
# 🎉 Soul SMP v1.0.0 - Initial Release

The complete Soul SMP addon for Minecraft Bedrock Edition is now available!

## 📥 Download Files

### 🎯 Quick Install (Recommended)
- **`SoulSMP_Complete_v1.0.0.mcaddon`** - Complete package with both packs

### 📱 Individual Packs
- **`SoulSMP_BP_v1.0.0.mcpack`** - Behavior Pack (game logic)
- **`SoulSMP_RP_v1.0.0.mcpack`** - Resource Pack (textures)

## ✨ Features

- 🎮 **Lives System** - Start with 10 lives, max 15
- ⚫ **Soul Orbs** - Currency from deaths + crafting
- 💪 **9 Buff Items** - Strength, Resistance, Regeneration (3 tiers each)
- ❤️ **Extra Hearts** - Purchase up to +10 HP
- ✦ **Soul Sigil** - Permanently increase lives
- ⚠️ **Corruption** - Punishment for hoarding orbs
- 💀 **Permadeath** - Spectator mode at 0 lives
- 🛒 **Soul Shop** - Interactive UI with `!shop` command
- 📊 **Real-time HUD** - Lives, orbs, hearts display

## 🎯 Quick Start

1. Download `SoulSMP_Complete_v1.0.0.mcaddon`
2. Double-click to install
3. Create new world with experimental features enabled
4. Run `/function setup` on first load
5. Type `!shop` to start playing!

## 📋 Requirements

- Minecraft Bedrock Edition 1.20.50+
- **Experimental Features Required:**
  - ✅ Beta APIs
  - ✅ Holiday Creator Features

## 📖 Documentation

- [📘 Installation Guide](https://github.com/sujan0629/Soul-SMP-Bedrock/blob/main/docs/INSTALLATION.md)
- [🎮 Gameplay Guide](https://github.com/sujan0629/Soul-SMP-Bedrock/blob/main/docs/GAMEPLAY.md)
- [⚡ Quick Reference](https://github.com/sujan0629/Soul-SMP-Bedrock/blob/main/QUICKREF.md)

## 🐛 Bug Reports

Found an issue? [Open an issue](https://github.com/sujan0629/Soul-SMP-Bedrock/issues) with details!

---

**Minecraft® is a trademark of Mojang Studios. This is an independent addon.**
```

5. **Upload files**: Drag and drop your 3 files:
   - `SoulSMP_Complete_v1.0.0.mcaddon`
   - `SoulSMP_BP_v1.0.0.mcpack`
   - `SoulSMP_RP_v1.0.0.mcpack`

6. **Check "Set as the latest release"**
7. **Click "Publish release"**

### Option B: GitHub CLI (Advanced)

```bash
# Install GitHub CLI first: https://cli.github.com/
gh release create v1.0.0 \
  SoulSMP_Complete_v1.0.0.mcaddon \
  SoulSMP_BP_v1.0.0.mcpack \
  SoulSMP_RP_v1.0.0.mcpack \
  --title "Soul SMP v1.0.0 - Initial Release" \
  --notes-file release-notes.md
```

## Step 3: Verify Release

1. Check https://github.com/sujan0629/Soul-SMP-Bedrock/releases
2. Test download links work
3. Verify files install correctly

## 🎉 Done!

Your addon is now publicly downloadable via GitHub Releases!

Share the link: https://github.com/sujan0629/Soul-SMP-Bedrock/releases