# Soul SMP - Testing & Development Guide

**Version:** 1.0.0  
**Created by:** Sujan Bhatta  
**Copyright © 2025 Sujan Bhatta**

---

## 🧪 Testing Checklist

### Initial Setup Testing

- [ ] Addon loads without errors
- [ ] Both BP and RP are enabled
- [ ] Experimental features are on
- [ ] Run `/function setup` successfully
- [ ] Scoreboard objectives created
- [ ] Welcome message displays

### Core Life System

- [ ] Players start with 10 lives
- [ ] Lives display in actionbar
- [ ] Death reduces lives by 1
- [ ] Death announcement broadcasts
- [ ] 0 lives triggers permadeath
- [ ] Spectator mode enforced
- [ ] Lives persist through logout

### Soul Orb System

- [ ] Soul orb drops on player death
- [ ] Orb has glowing effect
- [ ] Orb can be picked up
- [ ] Orb count tracked in scoreboard
- [ ] Orbs stack to 64
- [ ] `!shop` command works
- [ ] Orbs can be spent in shop

### Buff System

#### Tier I Buffs
- [ ] Can purchase Strength I (2 orbs)
- [ ] Can purchase Resistance I (2 orbs)
- [ ] Can purchase Regeneration I (2 orbs)
- [ ] Buff activates in offhand
- [ ] Effect applies correctly
- [ ] Effect removes when unequipped
- [ ] Buff lost on death

#### Tier II Buffs
- [ ] Can purchase Tier II buffs (4 orbs)
- [ ] 2x Tier I combines to Tier II
- [ ] Combining animation plays
- [ ] Tier II effects stronger

#### Tier III Buffs
- [ ] Can purchase Tier III buffs (6 orbs)
- [ ] 2x Tier II combines to Tier III
- [ ] Maximum tier effects apply

### Buff Combining

- [ ] Drop 2x same buff items
- [ ] Items automatically combine
- [ ] Particle effects display
- [ ] Sound plays on combine
- [ ] Upgraded item spawns
- [ ] Original items disappear

### Extra Hearts System

- [ ] Can purchase heart (2 orbs)
- [ ] Max health increases by 2
- [ ] Health bar updates
- [ ] Maximum 5 hearts enforced
- [ ] Hearts lost on death
- [ ] Can repurchase after death
- [ ] Health boost effect applies

### Soul Sigil

- [ ] Can purchase for 5 orbs
- [ ] Using sigil increases lives
- [ ] Life increase persists through death
- [ ] Maximum 15 lives enforced
- [ ] Announcement broadcasts
- [ ] Particle effects play

### Corruption System

#### Tier 1 (7-8 orbs)
- [ ] Weakness II applies
- [ ] HUD shows warning
- [ ] Orb count turns orange
- [ ] Effects remove at 6 orbs

#### Tier 2 (9-11 orbs)
- [ ] Weakness II persists
- [ ] Mob aggression increases
- [ ] Warning color changes
- [ ] Particle effects display

#### Tier 3 (12+ orbs)
- [ ] Slowness I applies
- [ ] All previous effects
- [ ] Red warning displayed
- [ ] Maximum corruption alert

### UI System

- [ ] Actionbar HUD displays
- [ ] Lives count shows
- [ ] Orb count shows
- [ ] Extra hearts indicator
- [ ] Corruption warning
- [ ] Active buff display
- [ ] `!shop` opens menu
- [ ] Shop categories work
- [ ] Purchase buttons function
- [ ] `!info` shows stats

### Death Handler

- [ ] All buffs cleared on death
- [ ] All buff items dropped
- [ ] Extra hearts removed
- [ ] Soul orb spawns
- [ ] Life decrements
- [ ] Death message displays
- [ ] Permadeath check runs

### Permadeath System

- [ ] 0 lives = spectator
- [ ] Cannot respawn
- [ ] Mode enforced on login
- [ ] Death announcement dramatic
- [ ] Admin can reset with command

---

## 🎮 Test Scenarios

### Scenario 1: New Player Journey

1. Join fresh world
2. Run `/function setup`
3. Verify 10 lives
4. Kill player to get orb
5. Pick up orb
6. Type `!shop`
7. Purchase Strength I
8. Equip in offhand
9. Verify effect

### Scenario 2: Death & Respawn

1. Have buffs equipped
2. Have extra hearts
3. Die
4. Verify life -1
5. Verify buffs lost
6. Verify hearts lost
7. Verify orb dropped
8. Respawn successfully

### Scenario 3: Corruption

1. Give self 7 orbs
2. Verify Weakness II
3. Give 3 more (10 total)
4. Verify mob aggression
5. Give 3 more (13 total)
6. Verify Slowness I
7. Spend orbs
8. Verify effects removed

### Scenario 4: Buff Combining

1. Purchase 2x Strength I
2. Drop both on ground
3. Wait for combine
4. Pick up Strength II
5. Repeat with Strength II
6. Get Strength III

### Scenario 5: Permadeath

1. Set lives to 1
2. Die
3. Verify spectator mode
4. Try to respawn
5. Verify still spectator
6. Admin runs `/function reset_lives`
7. Verify back to survival

---

## 🔧 Development Testing

### Performance Testing

```javascript
// In main.js, add:
let tickCount = 0;
system.runInterval(() => {
  tickCount++;
  if (tickCount % 100 === 0) {
    console.warn(`[Performance] ${tickCount} ticks elapsed`);
  }
}, 1);
```

### Debug Commands

```mcfunction
# Set lives
scoreboard players set @s soul_lives 5

# Give orbs
give @s soul:soul_orb 10

# Set extra hearts
scoreboard players set @s soul_extra_hearts 5

# Force corruption
give @s soul:soul_orb 15

# Clear all
effect @s clear
clear @s
```

### Console Debugging

Enable console output in code:

```javascript
// Add to functions for debugging
console.warn(`[DEBUG] Function called: ${functionName}`);
console.warn(`[DEBUG] Player: ${player.name}, Lives: ${lives}`);
```

---

## 🐛 Known Issues & Workarounds

### Issue: Buff not applying
**Cause:** Offhand detection delay  
**Workaround:** Wait 1 tick or re-equip

### Issue: Orb despawn too fast
**Cause:** Standard Minecraft despawn  
**Workaround:** Pick up quickly or increase timer

### Issue: Shop UI glitchy
**Cause:** Server lag  
**Workaround:** Close and reopen, reduce tick operations

### Issue: Corruption not clearing
**Cause:** Orbs in ender chest still counted  
**Fix:** Only count main inventory (already implemented)

---

## 📊 Test Results Template

```
Date: _______
Tester: _______
Version: 1.0.0

[ ] Core Systems Working
[ ] No Script Errors
[ ] UI Functional
[ ] Performance Acceptable
[ ] Mobile Compatible

Issues Found:
1. _______
2. _______
3. _______

Recommendations:
_______
_______
```

---

## 🚀 Release Checklist

- [ ] All tests pass
- [ ] No console errors
- [ ] Documentation complete
- [ ] README updated
- [ ] Changelog updated
- [ ] Version numbers consistent
- [ ] Textures included
- [ ] Language files complete
- [ ] Manifests validated
- [ ] Functions tested
- [ ] Mobile tested
- [ ] Multiplayer tested
- [ ] Realms compatible
- [ ] .mcaddon builds successfully

---

## 🎯 Test Commands Quick Reference

```mcfunction
# Setup
/function setup

# Reset
/function reset_lives

# Debug
/function debug_info

# Give items
/give @s soul:soul_orb 64
/give @s soul:strength_3 1
/give @s soul:soul_sigil 1

# Scoreboard manipulation
/scoreboard players set @s soul_lives 1
/scoreboard players add @s soul_orb_count 10

# Effects
/effect @s weakness 1000000 1
/effect @s clear

# Gamemode
/gamemode survival
/gamemode spectator
```

---

## 📝 Test Log Example

```
=== Soul SMP Test Session ===
Date: 2025-10-06
Tester: Sujan Bhatta
Device: Windows 10

[14:00] Setup: SUCCESS
[14:01] Life System: SUCCESS
[14:03] Soul Orbs: SUCCESS
[14:05] Buff T1: SUCCESS
[14:07] Buff Combining: SUCCESS - Minor delay noted
[14:10] Extra Hearts: SUCCESS
[14:12] Soul Sigil: SUCCESS
[14:15] Corruption T1: SUCCESS
[14:17] Corruption T2: SUCCESS
[14:19] Corruption T3: SUCCESS
[14:22] Permadeath: SUCCESS
[14:25] UI Shop: SUCCESS
[14:27] HUD Display: SUCCESS

OVERALL: PASS ✅
Issues: Minor combining delay acceptable
Ready for release: YES
```

---

## 🔍 Quality Assurance

### Code Quality
- ✅ Modular architecture
- ✅ Error handling
- ✅ Performance optimized
- ✅ Comments and documentation
- ✅ Consistent naming

### User Experience
- ✅ Clear UI messages
- ✅ Visual feedback
- ✅ Audio cues
- ✅ Helpful error messages
- ✅ Intuitive commands

### Balance Testing
- ✅ Economy balanced
- ✅ Progression curve smooth
- ✅ Risk/reward appropriate
- ✅ Corruption not too harsh
- ✅ Buffs feel impactful

---

**Testing is crucial for a polished experience!**

**© 2025 Sujan Bhatta**
