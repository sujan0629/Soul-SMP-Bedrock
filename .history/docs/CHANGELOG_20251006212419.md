# Changelog

All notable changes to Soul SMP Addon will be documented in this file.

## [1.0.0] - 2025-10-06

### 🎉 Initial Release

**Created by:** Sujan Bhatta  
**Copyright © 2025 Sujan Bhatta**

### Core Features

#### Life System
- ✅ Players start with 10 lives (configurable)
- ✅ Maximum 15 lives achievable through Soul Sigils
- ✅ Lose 1 life per death
- ✅ Permadeath at 0 lives (spectator mode)
- ✅ Server-wide death announcements
- ✅ Lives displayed in HUD/actionbar

#### Soul Orb System
- ✅ Soul Orbs drop on player death (1 per death)
- ✅ Glowing effect on dropped orbs
- ✅ Used as currency for shop purchases
- ✅ Automatic inventory tracking
- ✅ Stack size: 64

#### Buff System
- ✅ 9 unique buff items (3 types × 3 tiers)
- ✅ Strength I/II/III (2/4/6 orbs)
- ✅ Resistance I/II/III (2/4/6 orbs)
- ✅ Regeneration I/II/III (2/4/6 orbs)
- ✅ Buffs active while in offhand
- ✅ Automatic buff combining system
- ✅ All buffs lost on death

#### Extra Hearts System
- ✅ Purchase up to 5 extra hearts (2 orbs each)
- ✅ +2 HP per heart (max 30 HP total)
- ✅ Lost on death
- ✅ Visual indicators in HUD

#### Soul Sigil (Relic)
- ✅ Permanently increase lives by 1
- ✅ Cost: 5 Soul Orbs
- ✅ Usable up to 15 lives
- ✅ Survives death

#### Corruption System
- ✅ Tier 1 (7-8 orbs): Weakness II
- ✅ Tier 2 (9-11 orbs): Weakness II + Mob Aggression
- ✅ Tier 3 (12+ orbs): Weakness II + Slowness I + Mob Aggression
- ✅ Visual warnings and particles
- ✅ Automatic tier detection

#### User Interface
- ✅ Real-time HUD with lives, orbs, corruption status
- ✅ Soul Shop UI (!shop command)
- ✅ Player stats display (!info command)
- ✅ Actionbar notifications
- ✅ Title screen messages

### Technical Implementation

#### Behavior Pack
- ✅ Complete JavaScript scripting system
- ✅ Modular architecture (15+ script files)
- ✅ Scoreboard-based data persistence
- ✅ Event-driven system design
- ✅ Optimized for mobile performance

#### Script Modules
- Core: `playerInit.js`, `lifeSystem.js`, `deathHandler.js`, `permadeath.js`
- Soul Orbs: `soulOrb.js`, `orbTracking.js`, `corruption.js`
- Buffs: `buffSystem.js`, `buffItems.js`, `buffCombining.js`, `offhandMonitor.js`
- Hearts: `extraHearts.js`, `healthManager.js`
- Relics: `soulSigil.js`
- UI: `hud.js`, `soulShop.js`
- Utils: `scoreboardHelper.js`, `effectHelper.js`, `itemHelper.js`

#### Resource Pack
- ✅ Custom item textures (11 items)
- ✅ Localization support (en_US)
- ✅ Texture definitions
- ✅ UI elements prepared

#### Commands & Functions
- ✅ `/function setup` - Initialize addon
- ✅ `/function reset_lives` - Reset all players
- ✅ `/function debug_info` - Debug information
- ✅ `!shop` - Open Soul Shop
- ✅ `!info` - View player stats

### Performance Optimizations
- ⚡ Efficient scoreboard queries
- ⚡ Minimal tick-based operations
- ⚡ Cached player references
- ⚡ Mobile-optimized tick rates
- ⚡ Particle effect limits

### Configuration
- 📝 Centralized config system (`config.js`)
- 📝 Adjustable constants
- 📝 Easy balancing tweaks
- 📝 Color scheme definitions

### Documentation
- 📚 Complete Installation Guide
- 📚 Detailed Gameplay Guide
- 📚 This Changelog
- 📚 Inline code documentation
- 📚 README with quick start

### Known Issues
- ⚠️ Glowing effect on dropped orbs may not work on all platforms
- ⚠️ Buff combining requires items to be dropped close together
- ⚠️ Offhand detection may have slight delay (1 tick)
- ⚠️ Some particle effects may cause minor lag on low-end devices

### Compatibility
- ✅ Minecraft Bedrock 1.20.50+
- ✅ Windows 10/11
- ✅ Android
- ✅ iOS
- ✅ Console (Xbox, PlayStation, Switch)
- ✅ Realms compatible
- ⚠️ Requires experimental features enabled

### Future Plans
- 🔮 Trading system between players
- 🔮 Curse system (negative effects)
- 🔮 Team mechanics (shared lives)
- 🔮 Leaderboards
- 🔮 Custom boss fights
- 🔮 Buff decay system
- 🔮 Multiple orb types

---

## Version Format

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible changes
- **MINOR** version for new features (backwards compatible)
- **PATCH** version for bug fixes

## Legend

- ✅ Implemented
- ⚡ Performance improvement
- 🔧 Fixed
- 📝 Changed
- 📚 Documentation
- 🔮 Planned
- ⚠️ Known issue
- 🎉 Major milestone

---

**Created by Sujan Bhatta © 2025**  
**For Minecraft Bedrock Edition**
