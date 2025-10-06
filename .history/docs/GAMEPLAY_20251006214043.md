# Soul SMP Addon - Gameplay Guide

**Version:** 1.0.0  
**Created by:** Sujan Bhatta  
**Copyright © 2025 Sujan Bhatta**

## Table of Contents

1. [Core Concept](#core-concept)
2. [Life System](#life-system)
3. [Soul Orbs](#soul-orbs)
4. [Buff System](#buff-system)
5. [Extra Hearts](#extra-hearts)
6. [Soul Sigil](#soul-sigil)
7. [Corruption](#corruption)
8. [Commands](#commands)
9. [Strategies](#strategies)

---

## Core Concept

Soul SMP is a hardcore survival experience where death matters. You have a limited number of lives, and losing them all results in permanent spectator mode (permadeath). Collect Soul Orbs from player deaths to purchase upgrades and extend your survival.

### Key Features

- **Limited Lives:** Start with 10, maximum of 15
- **Soul Orbs:** Currency dropped on death
- **Buff Items:** Permanent effects while held in offhand
- **Extra Hearts:** Increase max health
- **Corruption:** Penalty for hoarding orbs
- **Permadeath:** 0 lives = spectator mode

---

## Life System

### Starting Lives

- All players start with **10 lives**
- Maximum possible: **15 lives** (with Soul Sigils)
- Minimum: **0** (permadeath)

### Losing Lives

- **-1 life** per death
- Death causes:
  - Player kills
  - Mob kills
  - Environmental hazards (lava, fall damage, etc.)
  - Void deaths

### Death Consequences

When you die:

1. ❤️ **Lose 1 life**
2. ⚫ **Drop 1 Soul Orb** at death location
3. 💪 **Lose all active buffs** (items dropped on ground)
4. 💔 **Lose all extra hearts** (back to 20 HP)
5. 📢 **Server announcement** of life count

### Permadeath

- Occurs when lives reach **0**
- **Immediate** switch to spectator mode
- **Cannot respawn** or play normally
- Can still chat and spectate
- Requires admin reset to restore

### Viewing Lives

- **Actionbar:** Top of screen shows `❤ Lives: X/15`
- **Command:** Type `!info` for detailed stats
- **Scoreboard:** Optional sidebar display

---

## Soul Orbs

### What are Soul Orbs?

Soul Orbs (⚫) are the primary currency in Soul SMP. They drop from player deaths and are used to purchase upgrades.

### Obtaining Soul Orbs

- **Player Death:** 1 orb dropped per death
- **Crafting Recipe:**
  - 4 Netherite Blocks
  - 4 Enchanted Golden Apples
  - 1 End Crystal
  - Arranged: N-A-N / A-C-A / N-A-N
- **Location:** Spawns where player died
- **Visibility:** Has glowing effect for 5 minutes
- **Despawn:** Standard 5-minute item despawn timer

### Using Soul Orbs

Open the shop with `!shop` to spend orbs on:

- **Buff Items:** 2-6 orbs depending on tier
- **Extra Hearts:** 2 orbs per heart
- **Soul Sigil:** 5 orbs for +1 life

### Orb Management

- **Stack Size:** 64 per slot
- **Storage:** Can be stored in chests safely
- **Trading:** Can drop for other players
- **Warning:** Carrying 7+ orbs causes corruption!

---

## Buff System

### How Buffs Work

Buff items provide permanent potion effects **while held in your offhand**.

- ✅ **Equip in offhand** = Effect active
- ❌ **Remove from offhand** = Effect removed
- 💀 **Death** = All buff items lost
- 📦 **Storage** = Can be stored without effect

### Buff Types & Costs

#### Strength (⚔️)

| Tier | Effect      | Cost     |
| ---- | ----------- | -------- |
| I    | Strength I  | 2 orbs   |
| II   | Strength II | 4 orbs   |
| III  | Strength III| 6 orbs   |

**Use Case:** Increased melee damage

#### Resistance (🛡️)

| Tier | Effect        | Cost     |
| ---- | ------------- | -------- |
| I    | Resistance I  | 2 orbs   |
| II   | Resistance II | 4 orbs   |
| III  | Resistance III| 6 orbs   |

**Use Case:** Reduced damage taken

#### Regeneration (💚)

| Tier | Effect          | Cost     |
| ---- | --------------- | -------- |
| I    | Regeneration I  | 2 orbs   |
| II   | Regeneration II | 4 orbs   |
| III  | Regeneration III| 6 orbs   |

**Use Case:** Faster health recovery

### Buff Combining

Combine two identical buffs to upgrade them:

- **2x Tier I** → 1x Tier II
- **Tier II CANNOT combine** (max tier for combining)
- **Tier III can be purchased** but NOT crafted via combining

**How to Combine:**

1. Drop both buff items on the ground
2. Items must be same type and tier
3. Only **Tier I** items can combine (prevents OP stacking)
4. They will automatically combine when close
5. Particle effects indicate success

**Example:**

- Drop 2x Strength I → Get 1x Strength II
- Drop 2x Strength II → Nothing (cannot combine)

### Tips

- Only **one buff active** at a time (offhand limitation)
- Switch buffs by changing offhand item
- Store unused buffs in chest
- Higher tiers = better effects but higher cost
- Lost on death - use wisely!

---

## Extra Hearts

### What are Extra Hearts?

Extra Hearts permanently increase your maximum health (until death).

- **Cost:** 2 Soul Orbs per heart
- **Maximum:** 5 extra hearts
- **Health Bonus:** +2 HP per heart (1 heart = 2 HP)
- **Max Health:** 30 HP (20 base + 10 extra)
- **Display:** Red hearts (❤) in HUD

### Purchasing Hearts

1. Type `!shop` to open the shop
2. Select "❤ Extra Hearts"
3. Purchase with 2 Soul Orbs
4. Instantly gain +2 HP
5. Repeat up to 5 times

### Heart Mechanics

- ✅ **Persist** through normal gameplay
- ✅ **Stack** with armor/effects
- ⚠️ **Lose 1 heart per death** (not all of them)
- ✅ **Can be repurchased** after respawn
- ❌ **Eventually reset** after 5 deaths with max hearts

### Strategy

- **Early Game:** Prioritize survival (buy hearts)
- **Mid Game:** Balance hearts with buffs
- **Late Game:** Max hearts before risky activities

---

## Soul Sigil

### What is the Soul Sigil?

The Soul Sigil (✦) is a rare relic that **permanently increases your maximum lives** by 1.

### Mechanics

- **Cost:** 5 Soul Orbs
- **Effect:** +1 permanent life (survives death)
- **Maximum:** Can use until 15/15 lives
- **Usage:** Use the item (right-click)

### Obtaining

1. Collect 5 Soul Orbs
2. Type `!shop` → select "✦ Soul Sigil"
3. Confirm purchase (5 orbs consumed)
4. Use the Soul Sigil item
5. Gain +1 life permanently

### Strategic Use

- **Best Time:** When you have orbs to spare
- **Priority:** Lower priority than immediate survival
- **Late Game:** Essential for reaching 15 lives
- **Risk:** Expensive if you die before using it

### Example

- Start: 10/15 lives
- Use Soul Sigil: 11/15 lives
- Die 3 times: 8/15 lives (still have +1 from sigil)

---

## Corruption

### What is Corruption?

Corruption is a negative effect that punishes players for hoarding Soul Orbs.

### Corruption Tiers

| Orbs   | Tier | Effects                                  |
| ------ | ---- | ---------------------------------------- |
| 0-6    | 0    | None - Safe                              |
| 7-8    | 1    | Weakness II                              |
| 9-11   | 2    | Weakness II + Hostile Mobs               |
| 12+    | 3    | Weakness II + Slowness I + Hostile Mobs  |

### Hostile Mobs Effect

- **Increased aggression** from all mobs
- **Larger detection range** (mobs notice you from farther)
- **Neutral mobs turn hostile** (Endermen, Piglins)
- **Cannot be removed** until orb count decreases

### Corruption Indicators

- **Actionbar Warning:** "⚠ CORRUPTION" in red
- **Particle Effects:** Soul particles around player
- **HUD Color:** Orb count turns red
- **Screen Title:** "CORRUPTION TIER X"

### Avoiding Corruption

1. **Spend orbs quickly** - don't hoard
2. **Maximum safe:** 6 orbs
3. **Buy items regularly** from shop
4. **Store orbs in chests** (doesn't count toward corruption)
5. **Trade excess orbs** to teammates

### Removing Corruption

- Reduce orb count below tier threshold
- Effects removed automatically
- Spend orbs at the shop
- Drop orbs (risky!)

---

## Commands

### Player Commands

| Command | Description                    |
| ------- | ------------------------------ |
| `!shop` | Open the Soul Shop UI          |
| `!info` | View your Soul SMP stats       |

### Admin Commands

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `/function setup`      | Initialize addon (first-time)    |
| `/function reset_lives`| Reset all players to 10 lives    |
| `/function debug_info` | View detailed scoreboard data    |

### Give Commands (Admin/Creative)

```mcfunction
/give @s soul:soul_orb <amount>
/give @s soul:strength_1
/give @s soul:strength_2
/give @s soul:strength_3
/give @s soul:resistance_1
/give @s soul:resistance_2
/give @s soul:resistance_3
/give @s soul:regeneration_1
/give @s soul:regeneration_2
/give @s soul:regeneration_3
/give @s soul:soul_sigil
```

---

## Strategies

### Early Game (First Deaths)

1. **Collect orbs** from deaths
2. **Buy extra hearts** first (2 orbs = +1 heart)
3. **Avoid combat** until you have hearts
4. **Play safe** - don't waste lives

### Mid Game (5-8 Lives)

1. **Balance** hearts and buffs
2. **Buy Tier I buffs** for general use
3. **Combine buffs** to Tier II
4. **Start farming** for Soul Sigils
5. **Watch corruption** levels

### Late Game (High Lives/Gear)

1. **Max out hearts** (5/5)
2. **Upgrade to Tier III buffs**
3. **Use Soul Sigils** to reach 15 lives
4. **PvP cautiously** - losing orbs hurts
5. **Help teammates** rebuild after deaths

### PvP Strategy

- **Offense:** Strength III + Sharpness sword
- **Defense:** Resistance III + Protection armor
- **Healing:** Regeneration III for sustain
- **Risk:** Consider life count before engaging

### Team Play

- **Share orbs** with low-life teammates
- **Protect** players near permadeath
- **Farm PvP orbs** as a team
- **Build orb storage** for sharing
- **Coordinate buffs** for group activities

### Avoiding Permadeath

1. **Never fight** at 1-2 lives
2. **Farm peacefully** to get orbs
3. **Ask team for orbs** before risky activities
4. **Buy hearts immediately** when possible
5. **Save Soul Sigils** for emergencies

---

## Frequently Asked Questions

**Q: Can I get more than 15 lives?**  
A: No, 15 is the absolute maximum.

**Q: Do orbs in chests cause corruption?**  
A: No, only orbs in your inventory count.

**Q: Can I revive from permadeath?**  
A: No, only admins can reset with `/function reset_lives`.

**Q: Do buffs work if I switch to other items?**  
A: No, the buff item must stay in your offhand.

**Q: What happens if I log out with corruption?**  
A: Effects reapply when you log back in if you still have the orbs.

**Q: Can I trade orbs with other players?**  
A: Yes, drop them on the ground for others to pick up.

**Q: Do extra hearts protect buffs from death?**  
A: No, all buffs are always lost on death regardless of hearts.

**Q: Can I combine different buff types?**  
A: No, you can only combine identical buffs (e.g., 2x Strength I).

---

## Tips & Tricks

- 🎯 **Mark death locations** with coordinates
- 📦 **Build an orb bank** to store safely
- ⚔️ **Keep spare buffs** in ender chest
- 💰 **Farm hostile mobs** for gear before buying buffs
- 🏃 **Run from fights** when low on lives
- 🛡️ **Prioritize defense** (Resistance > Strength)
- 💚 **Use Regeneration** during boss fights
- 📊 **Check !info regularly** to track progress

---

**Good luck, and may your lives be plentiful!**

**Created by Sujan Bhatta © 2025**  
**For Minecraft Bedrock Edition**
