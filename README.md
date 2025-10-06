# Soul SMP - Bedrock Edition# Soul SMP Addon



**A hardcore SMP experience with lives, soul orbs, buffs, and corruption****Created by:** Sujan Bhatta  

**Copyright:** © 2025 Sujan Bhatta

**Created by:** Sujan Bhatta  

**Copyright © 2025 Sujan Bhatta - All Rights Reserved**## About

A competitive survival addon featuring:

---- Life system (10 lives per player)

- Soul Orbs dropped on death

## 📖 Overview- Buff system with combining mechanics

- Extra hearts purchasable with orbs

Soul SMP transforms Minecraft into a high-stakes survival challenge where every death matters. With a limited number of lives, players must carefully balance risk and reward. Collect Soul Orbs from deaths to purchase powerful buffs, extra hearts, and permanent life increases - but beware the corruption that comes from hoarding them!- Corruption system to prevent hoarding

- Soul Sigils for permanent life increases

### ✨ Key Features

## Installation

- 🎮 **Limited Lives System** - Start with 10 lives, maximum 151. Download the .mcaddon file

- ⚫ **Soul Orbs** - Currency dropped on death2. Double-click to import into Minecraft

- 💪 **9 Buff Items** - Permanent effects in offhand (Strength, Resistance, Regeneration)3. Create a new world with Experimental Features enabled

- ❤️ **Extra Hearts** - Purchase up to +10 HP4. Activate both Behavior and Resource packs

- ✦ **Soul Sigil** - Permanently increase your lives

- ⚠️ **Corruption System** - Penalties for hoarding orbs## Credits

- 💀 **Permadeath** - 0 lives = spectator mode- **Developer:** Sujan Bhatta

- 🛒 **Soul Shop** - In-game UI for purchasing upgrades- **All original code, textures, and mechanics:** Sujan Bhatta



---## Legal

Minecraft® is a trademark of Mojang Studios. This is an independent addon.
## 🚀 Quick Start

### Installation

1. **Go to [Releases](https://github.com/sujan0629/Soul-SMP-Bedrock/releases)**
2. **Download** `SoulSMP_Complete_v1.0.0.mcaddon` from latest release
3. **Double-click** the .mcaddon file to auto-install
4. **Create new world** and enable both packs in settings
5. **Enable** experimental features:
   - ✅ Beta APIs
   - ✅ Holiday Creator Features
6. **Run** `/function setup` on first load
7. **Type** `!shop` to open the Soul Shop

### Requirements

- Minecraft Bedrock Edition 1.20.50+
- Experimental Features enabled
- Multiplayer recommended (2-20 players)

[📘 Full Installation Guide](docs/INSTALLATION.md)

---

## 🎮 How to Play

### Commands

| Command | Description |
|---------|-------------|
| `!shop` | Open the Soul Shop |
| `!info` | View your stats |
| `/function setup` | Initialize addon (first-time only) |
| `/function reset_lives` | Reset all players to 10 lives (admin) |
| `/function debug_info` | View debug information |

### Gameplay Loop

1. **Start** with 10 lives
2. **Survive** and collect Soul Orbs from deaths
3. **Spend** orbs in the shop (!shop) for upgrades
4. **Avoid** corruption by not hoarding orbs (7+ causes penalties)
5. **Manage** risk vs reward - dying loses a life and all buffs!

[🎯 Complete Gameplay Guide](docs/GAMEPLAY.md)

---

## 📦 Items & Costs

| Item | Type | Cost | Effect |
|------|------|------|--------|
| Soul Orb | Currency | - | Purchase upgrades |
| Strength I/II/III | Buff | 2/4/6 orbs | Increased damage |
| Resistance I/II/III | Buff | 2/4/6 orbs | Reduced damage taken |
| Regeneration I/II/III | Buff | 2/4/6 orbs | Faster healing |
| Extra Heart | Upgrade | 2 orbs | +2 HP (max 5 hearts) |
| Soul Sigil | Relic | 5 orbs | +1 permanent life |

---

## ⚙️ Features

### Life System
- Start with 10 lives, maximum 15
- Lose 1 life per death
- Server-wide announcements
- 0 lives = permadeath (spectator mode)

### Soul Orb Economy
- 1 orb drops per player death
- Use as currency in shop
- Stack up to 64
- Corruption penalty at 7+ orbs

### Buff System
- 9 unique buffs (3 types × 3 tiers)
- Active when in offhand
- Combine 2 same buffs to upgrade
- Lost on death

### Corruption
- Tier 1 (7-8 orbs): Weakness II
- Tier 2 (9-11 orbs): + Mob Aggression
- Tier 3 (12+ orbs): + Slowness I

### Extra Hearts
- Purchase up to 5 extra hearts
- +2 HP per heart (20 → 30 max HP)
- Display as red hearts (❤) in HUD
- Lose 1 heart per death (not all)
- Can be repurchased after death

### Soul Sigil
- Permanently increase lives by 1
- Costs 5 Soul Orbs
- Survives death
- Can use multiple times until 15 lives

---

## 🏗️ Project Structure

```
soul_smp_addon/
├── BP/                          # Behavior Pack
│   ├── manifest.json
│   ├── scripts/                 # 15+ JavaScript modules
│   ├── items/                   # 11 custom item definitions
│   ├── functions/               # Setup commands
│   └── texts/                   # Localization
├── RP/                          # Resource Pack
│   ├── manifest.json
│   ├── textures/                # Custom item textures
│   └── texts/                   # Localization
└── docs/                        # Documentation
    ├── INSTALLATION.md
    ├── GAMEPLAY.md
    └── CHANGELOG.md
```

---

## 📚 Documentation

- [📘 Installation Guide](docs/INSTALLATION.md) - Setup instructions
- [🎮 Gameplay Guide](docs/GAMEPLAY.md) - How to play
- [📝 Changelog](docs/CHANGELOG.md) - Version history

---

## 🔧 Technical Details

### Script Modules
- **Core**: Life system, death handling, permadeath, player initialization
- **Soul Orbs**: Orb dropping, tracking, corruption detection
- **Buffs**: Buff system, combining, offhand monitoring
- **Hearts**: Extra hearts purchasing and management
- **Relics**: Soul Sigil implementation
- **UI**: HUD display, shop menus
- **Utils**: Scoreboards, effects, items helpers

### Performance
- Optimized for mobile devices
- Efficient tick-based systems
- Minimal particle effects
- Cached data queries

### Compatibility
- ✅ Windows, Android, iOS, Console
- ✅ Realms support
- ✅ Multiplayer tested (20+ players)

---

## 📜 License

**All Rights Reserved**

Copyright © 2025 Sujan Bhatta

This addon and all associated files are the intellectual property of Sujan Bhatta. Redistribution, modification, or commercial use without explicit permission is prohibited.

---

## 🙏 Credits

**Created by:** Sujan Bhatta  
**Version:** 1.0.0  
**Release Date:** October 6, 2025

---

## 📞 Support

For installation help, gameplay questions, or bug reports:

1. Read the [Installation Guide](docs/INSTALLATION.md)
2. Check the [Gameplay Guide](docs/GAMEPLAY.md)
3. Review the [Changelog](docs/CHANGELOG.md)
4. Test in creative mode with `/give` commands
