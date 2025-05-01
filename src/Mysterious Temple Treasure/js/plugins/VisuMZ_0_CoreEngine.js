//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.79;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.79] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
 * 
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
 * 
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
 * 
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"true","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * "Don't" will consolidate both into "Escape".
 * @default false
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

function _0x4703(_0x3a959f,_0x263c54){const _0x2839d7=_0x2839();return _0x4703=function(_0x4703e8,_0x465a89){_0x4703e8=_0x4703e8-0xf8;let _0x4a3701=_0x2839d7[_0x4703e8];return _0x4a3701;},_0x4703(_0x3a959f,_0x263c54);}const _0x33ad8c=_0x4703;(function(_0x16af1f,_0x284cf5){const _0x32d8f6=_0x4703,_0x196322=_0x16af1f();while(!![]){try{const _0x15f1c2=-parseInt(_0x32d8f6(0x9ce))/0x1*(-parseInt(_0x32d8f6(0x603))/0x2)+parseInt(_0x32d8f6(0x574))/0x3+parseInt(_0x32d8f6(0x46e))/0x4*(parseInt(_0x32d8f6(0x591))/0x5)+parseInt(_0x32d8f6(0x155))/0x6+-parseInt(_0x32d8f6(0x40d))/0x7*(parseInt(_0x32d8f6(0x3b2))/0x8)+-parseInt(_0x32d8f6(0x309))/0x9+-parseInt(_0x32d8f6(0x14d))/0xa*(parseInt(_0x32d8f6(0x621))/0xb);if(_0x15f1c2===_0x284cf5)break;else _0x196322['push'](_0x196322['shift']());}catch(_0x5b4342){_0x196322['push'](_0x196322['shift']());}}}(_0x2839,0x803d2));var label='CoreEngine',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x33ad8c(0x238)](function(_0x4d4676){const _0x3cc598=_0x33ad8c;return _0x4d4676[_0x3cc598(0x26e)]&&_0x4d4676[_0x3cc598(0x374)][_0x3cc598(0x949)]('['+label+']');})[0x0];VisuMZ[label][_0x33ad8c(0x828)]=VisuMZ[label][_0x33ad8c(0x828)]||{},VisuMZ[_0x33ad8c(0x320)]=function(_0x3bb4d7,_0x2ab87e){const _0x10c5d9=_0x33ad8c;for(const _0x528283 in _0x2ab87e){if(_0x10c5d9(0x5ab)!=='ENsGw'){if(_0x528283[_0x10c5d9(0x13d)](/(.*):(.*)/i)){if(_0x10c5d9(0x9aa)===_0x10c5d9(0x9aa)){const _0x268a51=String(RegExp['$1']),_0x2363e2=String(RegExp['$2'])[_0x10c5d9(0x455)]()['trim']();let _0xe4e5a6,_0x540cbe,_0x4c80e1;switch(_0x2363e2){case _0x10c5d9(0x159):_0xe4e5a6=_0x2ab87e[_0x528283]!==''?Number(_0x2ab87e[_0x528283]):0x0;break;case _0x10c5d9(0x248):_0x540cbe=_0x2ab87e[_0x528283]!==''?JSON['parse'](_0x2ab87e[_0x528283]):[],_0xe4e5a6=_0x540cbe[_0x10c5d9(0x6ab)](_0x4d0c0b=>Number(_0x4d0c0b));break;case _0x10c5d9(0x33b):_0xe4e5a6=_0x2ab87e[_0x528283]!==''?eval(_0x2ab87e[_0x528283]):null;break;case _0x10c5d9(0x355):_0x540cbe=_0x2ab87e[_0x528283]!==''?JSON[_0x10c5d9(0x297)](_0x2ab87e[_0x528283]):[],_0xe4e5a6=_0x540cbe[_0x10c5d9(0x6ab)](_0x1ac9c6=>eval(_0x1ac9c6));break;case _0x10c5d9(0x214):_0xe4e5a6=_0x2ab87e[_0x528283]!==''?JSON[_0x10c5d9(0x297)](_0x2ab87e[_0x528283]):'';break;case _0x10c5d9(0x1c7):_0x540cbe=_0x2ab87e[_0x528283]!==''?JSON[_0x10c5d9(0x297)](_0x2ab87e[_0x528283]):[],_0xe4e5a6=_0x540cbe[_0x10c5d9(0x6ab)](_0x333b62=>JSON['parse'](_0x333b62));break;case'FUNC':_0xe4e5a6=_0x2ab87e[_0x528283]!==''?new Function(JSON[_0x10c5d9(0x297)](_0x2ab87e[_0x528283])):new Function(_0x10c5d9(0x79a));break;case _0x10c5d9(0x49c):_0x540cbe=_0x2ab87e[_0x528283]!==''?JSON[_0x10c5d9(0x297)](_0x2ab87e[_0x528283]):[],_0xe4e5a6=_0x540cbe['map'](_0x2516d5=>new Function(JSON[_0x10c5d9(0x297)](_0x2516d5)));break;case _0x10c5d9(0x8ce):_0xe4e5a6=_0x2ab87e[_0x528283]!==''?String(_0x2ab87e[_0x528283]):'';break;case _0x10c5d9(0x76f):_0x540cbe=_0x2ab87e[_0x528283]!==''?JSON[_0x10c5d9(0x297)](_0x2ab87e[_0x528283]):[],_0xe4e5a6=_0x540cbe[_0x10c5d9(0x6ab)](_0x29eada=>String(_0x29eada));break;case'STRUCT':_0x4c80e1=_0x2ab87e[_0x528283]!==''?JSON[_0x10c5d9(0x297)](_0x2ab87e[_0x528283]):{},_0x3bb4d7[_0x268a51]={},VisuMZ[_0x10c5d9(0x320)](_0x3bb4d7[_0x268a51],_0x4c80e1);continue;case'ARRAYSTRUCT':_0x540cbe=_0x2ab87e[_0x528283]!==''?JSON[_0x10c5d9(0x297)](_0x2ab87e[_0x528283]):[],_0xe4e5a6=_0x540cbe[_0x10c5d9(0x6ab)](_0x27418d=>VisuMZ[_0x10c5d9(0x320)]({},JSON[_0x10c5d9(0x297)](_0x27418d)));break;default:continue;}_0x3bb4d7[_0x268a51]=_0xe4e5a6;}else _0x1f4b0a[_0x10c5d9(0x9dd)][_0x10c5d9(0x75c)][_0x10c5d9(0x439)](this,_0x2637a4);}}else{_0x13da0[_0x10c5d9(0x320)](_0x1c2740,_0x2bcf70);const _0x492821=_0x3d6971[_0x10c5d9(0x9a3)]||0x1;_0x46ca65[_0x10c5d9(0x123)](_0x492821);}}return _0x3bb4d7;},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x650)]=SceneManager[_0x33ad8c(0x82e)],SceneManager[_0x33ad8c(0x82e)]=function(){const _0x8554df=_0x33ad8c;VisuMZ[_0x8554df(0x9dd)][_0x8554df(0x650)]['call'](this);if(Utils[_0x8554df(0x463)]>='1.4.4'){if(_0x8554df(0x7fa)==='ZGBJq'){var _0x56722b=_0x21d7b6[_0x8554df(0x9dd)][_0x8554df(0x741)][_0x8554df(0x439)](this,_0x4be31c,_0x47e38f,_0x40726b,_0x5e195b);if(this[_0x8554df(0x8ec)]())_0x56722b[_0x8554df(0x8dc)]=_0x199be8[_0x8554df(0x124)](_0x56722b[_0x8554df(0x8dc)]);return _0x56722b;}else{if(typeof nw==='object')nw[_0x8554df(0x524)][_0x8554df(0x114)]();}}},(_0x4e8ccc=>{const _0x1bbeb4=_0x33ad8c,_0x12f8f1=_0x4e8ccc[_0x1bbeb4(0x62a)];for(const _0x3f25d9 of dependencies){if('YmWwT'===_0x1bbeb4(0x59e)){if(!Imported[_0x3f25d9]){alert(_0x1bbeb4(0x99a)['format'](_0x12f8f1,_0x3f25d9)),SceneManager[_0x1bbeb4(0x82e)]();break;}}else return _0xa6417a[_0x1bbeb4(0x6c7)][_0x1bbeb4(0x8bc)][_0x1bbeb4(0x439)](this);}const _0x1d6a9e=_0x4e8ccc[_0x1bbeb4(0x374)];if(_0x1d6a9e[_0x1bbeb4(0x13d)](/\[Version[ ](.*?)\]/i)){const _0x278b63=Number(RegExp['$1']);_0x278b63!==VisuMZ[label]['version']&&('rrNiG'!==_0x1bbeb4(0x85b)?(alert(_0x1bbeb4(0x9cd)[_0x1bbeb4(0x3e7)](_0x12f8f1,_0x278b63)),SceneManager['exit']()):(_0x306541['log'](_0x34de72),!_0xad53e7[_0x1bbeb4(0x6bd)]&&(_0xfcb400[_0x1bbeb4(0x6bd)]=!![],_0x38719e['showDevTools']())));}if(_0x1d6a9e[_0x1bbeb4(0x13d)](/\[Tier[ ](\d+)\]/i)){const _0x294feb=Number(RegExp['$1']);_0x294feb<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x1bbeb4(0x3e7)](_0x12f8f1,_0x294feb,tier)),SceneManager[_0x1bbeb4(0x82e)]()):tier=Math[_0x1bbeb4(0x3f1)](_0x294feb,tier);}VisuMZ[_0x1bbeb4(0x320)](VisuMZ[label][_0x1bbeb4(0x828)],_0x4e8ccc[_0x1bbeb4(0x258)]);})(pluginData),((()=>{const _0x3f8151=_0x33ad8c;if(VisuMZ[_0x3f8151(0x9dd)]['Settings']['QoL'][_0x3f8151(0x39a)]??!![]){if(_0x3f8151(0x921)==='aHtvH')for(const _0x34653e in $plugins){const _0x5d1982=$plugins[_0x34653e];_0x5d1982[_0x3f8151(0x62a)][_0x3f8151(0x13d)](/(.*)\/(.*)/i)&&(_0x5d1982[_0x3f8151(0x62a)]=String(RegExp['$2'][_0x3f8151(0x99d)]()));}else return _0x15a93b['CoreEngine'][_0x3f8151(0x53c)][_0x3f8151(0x439)](this,_0x387ead);}})()),PluginManager['registerCommand'](pluginData[_0x33ad8c(0x62a)],_0x33ad8c(0x8f4),_0x36c550=>{const _0x578d86=_0x33ad8c;if(!SceneManager['_scene'])return;if(!SceneManager[_0x578d86(0x90d)][_0x578d86(0x55c)])return;VisuMZ[_0x578d86(0x320)](_0x36c550,_0x36c550);const _0x4875a9=Math[_0x578d86(0x758)](_0x36c550[_0x578d86(0x1ab)]),_0x60e2d4=Math[_0x578d86(0x758)](_0x36c550['pointY']);$gameTemp[_0x578d86(0x5ac)](_0x4875a9,_0x60e2d4,_0x36c550[_0x578d86(0x536)],_0x36c550[_0x578d86(0x423)],_0x36c550[_0x578d86(0x2b7)]);}),PluginManager[_0x33ad8c(0x693)](pluginData[_0x33ad8c(0x62a)],_0x33ad8c(0x6fe),_0x42727c=>{const _0x4126bd=_0x33ad8c;VisuMZ[_0x4126bd(0x320)](_0x42727c,_0x42727c);const _0x52781c=Math[_0x4126bd(0x758)](_0x42727c[_0x4126bd(0x692)])['clamp'](0x0,0x64),_0x20883a=AudioManager[_0x4126bd(0x897)];_0x20883a&&(_0x20883a['volume']=_0x52781c,_0x20883a[_0x4126bd(0x340)]=AudioManager[_0x4126bd(0x6d9)][_0x4126bd(0x89d)](),AudioManager[_0x4126bd(0x90c)](_0x20883a),AudioManager[_0x4126bd(0x1b1)](_0x20883a,_0x20883a['pos']),AudioManager[_0x4126bd(0x6d9)][_0x4126bd(0x972)](_0x20883a[_0x4126bd(0x340)]));}),PluginManager[_0x33ad8c(0x693)](pluginData['name'],_0x33ad8c(0x5d7),_0x4008e7=>{const _0x57fb34=_0x33ad8c;VisuMZ['ConvertParams'](_0x4008e7,_0x4008e7);const _0x1dd488=Math[_0x57fb34(0x758)](_0x4008e7[_0x57fb34(0x593)])[_0x57fb34(0x482)](0x32,0x96),_0x44398a=AudioManager['_currentBgm'];if(_0x44398a){if('gfhWe'!==_0x57fb34(0x8ea)){this['_fauxAnimationSprites'][_0x57fb34(0x929)](_0x399a62),this[_0x57fb34(0x602)](_0x16930e);for(const _0x3392ca of _0x1dcfc0[_0x57fb34(0x95f)]){_0x3392ca[_0x57fb34(0x5d9)]&&_0x3392ca[_0x57fb34(0x5d9)]();}_0x4951a3[_0x57fb34(0x776)]();}else _0x44398a['pitch']=_0x1dd488,_0x44398a[_0x57fb34(0x340)]=AudioManager[_0x57fb34(0x6d9)][_0x57fb34(0x89d)](),AudioManager[_0x57fb34(0x90c)](_0x44398a),AudioManager[_0x57fb34(0x1b1)](_0x44398a,_0x44398a[_0x57fb34(0x340)]),AudioManager[_0x57fb34(0x6d9)]['_startPlaying'](_0x44398a[_0x57fb34(0x340)]);}}),PluginManager[_0x33ad8c(0x693)](pluginData[_0x33ad8c(0x62a)],_0x33ad8c(0x25a),_0x404ea2=>{const _0x486a21=_0x33ad8c;VisuMZ[_0x486a21(0x320)](_0x404ea2,_0x404ea2);const _0x818b32=Math[_0x486a21(0x758)](_0x404ea2[_0x486a21(0x614)])['clamp'](-0x64,0x64),_0x4c349a=AudioManager['_currentBgm'];_0x4c349a&&(_0x4c349a[_0x486a21(0x614)]=_0x818b32,_0x4c349a[_0x486a21(0x340)]=AudioManager[_0x486a21(0x6d9)][_0x486a21(0x89d)](),AudioManager['updateBgmParameters'](_0x4c349a),AudioManager[_0x486a21(0x1b1)](_0x4c349a,_0x4c349a[_0x486a21(0x340)]),AudioManager[_0x486a21(0x6d9)][_0x486a21(0x972)](_0x4c349a['pos']));}),PluginManager[_0x33ad8c(0x693)](pluginData['name'],'AudioChangeBgsVolume',_0x47f082=>{const _0x21082c=_0x33ad8c;VisuMZ[_0x21082c(0x320)](_0x47f082,_0x47f082);const _0x4e9881=Math[_0x21082c(0x758)](_0x47f082[_0x21082c(0x692)])[_0x21082c(0x482)](0x0,0x64),_0x1c224e=AudioManager[_0x21082c(0x172)];_0x1c224e&&(_0x1c224e['volume']=_0x4e9881,_0x1c224e[_0x21082c(0x340)]=AudioManager['_bgsBuffer'][_0x21082c(0x89d)](),AudioManager[_0x21082c(0x3b0)](_0x1c224e),AudioManager[_0x21082c(0x590)](_0x1c224e,_0x1c224e[_0x21082c(0x340)]),AudioManager[_0x21082c(0x3ee)][_0x21082c(0x972)](_0x1c224e['pos']));}),PluginManager[_0x33ad8c(0x693)](pluginData[_0x33ad8c(0x62a)],_0x33ad8c(0x4dc),_0x35b328=>{const _0x146a85=_0x33ad8c;VisuMZ[_0x146a85(0x320)](_0x35b328,_0x35b328);const _0x537a3a=Math[_0x146a85(0x758)](_0x35b328[_0x146a85(0x593)])[_0x146a85(0x482)](0x32,0x96),_0x22b5ab=AudioManager[_0x146a85(0x172)];_0x22b5ab&&(_0x22b5ab[_0x146a85(0x593)]=_0x537a3a,_0x22b5ab[_0x146a85(0x340)]=AudioManager[_0x146a85(0x3ee)][_0x146a85(0x89d)](),AudioManager['updateBgsParameters'](_0x22b5ab),AudioManager[_0x146a85(0x590)](_0x22b5ab,_0x22b5ab[_0x146a85(0x340)]),AudioManager[_0x146a85(0x3ee)][_0x146a85(0x972)](_0x22b5ab[_0x146a85(0x340)]));}),PluginManager[_0x33ad8c(0x693)](pluginData[_0x33ad8c(0x62a)],'AudioChangeBgsPan',_0x3fd945=>{const _0x3412c3=_0x33ad8c;VisuMZ[_0x3412c3(0x320)](_0x3fd945,_0x3fd945);const _0x3c39b9=Math[_0x3412c3(0x758)](_0x3fd945[_0x3412c3(0x614)])[_0x3412c3(0x482)](-0x64,0x64),_0x437390=AudioManager[_0x3412c3(0x172)];_0x437390&&(_0x437390[_0x3412c3(0x614)]=_0x3c39b9,_0x437390[_0x3412c3(0x340)]=AudioManager[_0x3412c3(0x3ee)][_0x3412c3(0x89d)](),AudioManager[_0x3412c3(0x3b0)](_0x437390),AudioManager['playBgs'](_0x437390,_0x437390[_0x3412c3(0x340)]),AudioManager['_bgsBuffer'][_0x3412c3(0x972)](_0x437390[_0x3412c3(0x340)]));}),PluginManager[_0x33ad8c(0x693)](pluginData['name'],_0x33ad8c(0xa0d),_0x47ae70=>{const _0x36a599=_0x33ad8c;if(!$gameTemp[_0x36a599(0x4d4)]())return;const _0x1ae32b=Input[_0x36a599(0x1ef)]();if(navigator[_0x36a599(0x38a)]){if(_0x36a599(0x902)!=='TZmGV')navigator[_0x36a599(0x38a)][_0x36a599(0x3af)](_0x1ae32b);else{const _0x34f355=_0x5cba8e[_0x36a599(0x21f)]()*_0x481668[_0x36a599(0x5f0)]();return(this['_y']-_0x34f355)*_0x1bd9a1[_0x36a599(0x5bb)]();}}}),PluginManager[_0x33ad8c(0x693)](pluginData[_0x33ad8c(0x62a)],_0x33ad8c(0x400),_0x76c3d6=>{const _0xdf6a82=_0x33ad8c;if(!$gameTemp[_0xdf6a82(0x4d4)]())return;if(!Utils[_0xdf6a82(0x9de)]())return;SceneManager[_0xdf6a82(0x90d)][_0xdf6a82(0x940)]=![],VisuMZ[_0xdf6a82(0x9dd)][_0xdf6a82(0x99c)]();}),PluginManager[_0x33ad8c(0x693)](pluginData[_0x33ad8c(0x62a)],_0x33ad8c(0x598),_0x2b5f2e=>{const _0x5075eb=_0x33ad8c;if(!$gameTemp[_0x5075eb(0x4d4)]())return;if(!Utils[_0x5075eb(0x9de)]())return;SceneManager['_scene'][_0x5075eb(0x940)]=![],VisuMZ[_0x5075eb(0x9dd)][_0x5075eb(0x5f6)]();}),PluginManager[_0x33ad8c(0x693)](pluginData['name'],_0x33ad8c(0x948),_0x59961f=>{const _0x311000=_0x33ad8c;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x311000(0x9de)]())return;if(!$gameMap)return;if($gameMap[_0x311000(0x80e)]()<=0x0)return;VisuMZ['ConvertParams'](_0x59961f,_0x59961f);const _0x49d234=_0x311000(0x26c)['format']($gameMap[_0x311000(0x80e)]()[_0x311000(0x571)](0x3)),_0x25d7bd=VisuMZ[_0x311000(0x9dd)]['ExtractStrFromMap']($gameMap[_0x311000(0x80e)]());VisuMZ[_0x311000(0x9dd)][_0x311000(0x5a3)](_0x25d7bd,_0x49d234,!![]);}),PluginManager[_0x33ad8c(0x693)](pluginData[_0x33ad8c(0x62a)],'ExportCurTroopText',_0x2cf428=>{const _0x40ded6=_0x33ad8c;if(!$gameTemp[_0x40ded6(0x4d4)]())return;if(!Utils[_0x40ded6(0x9de)]())return;if(!$gameParty[_0x40ded6(0x41b)]())return;VisuMZ['ConvertParams'](_0x2cf428,_0x2cf428);const _0x341a83='Troop%1'[_0x40ded6(0x3e7)]($gameTroop[_0x40ded6(0x7c6)][_0x40ded6(0x571)](0x4)),_0x1d5073=VisuMZ[_0x40ded6(0x9dd)]['ExtractStrFromTroop']($gameTroop['_troopId']);VisuMZ[_0x40ded6(0x9dd)]['ExportString'](_0x1d5073,_0x341a83,!![]);}),VisuMZ['CoreEngine']['ExportString']=function(_0x1f55db,_0x341770,_0x38753c){const _0x3996af=_0x33ad8c,_0x2f9493=require('fs');let _0x4489c8=_0x3996af(0x9fb)['format'](_0x341770||'0');_0x2f9493['writeFile'](_0x4489c8,_0x1f55db,_0x5ecb5d=>{const _0xb4fe7f=_0x3996af;if(_0x5ecb5d)throw err;else _0x38753c&&(_0xb4fe7f(0x7be)!==_0xb4fe7f(0x167)?alert(_0xb4fe7f(0x257)[_0xb4fe7f(0x3e7)](_0x4489c8)):_0x41a2c5['VisuMZ_2_BattleSystemOTB']&&(this[_0xb4fe7f(0x39e)]='OTB'));});},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x99c)]=function(){const _0x611e87=_0x33ad8c,_0x17e466=[];for(const _0x37c559 of $dataMapInfos){if(!_0x37c559)continue;_0x17e466['push'](_0x37c559['id']);}const _0x194825=_0x17e466[_0x611e87(0x1cc)]*0x64+Math[_0x611e87(0x659)](0x64);alert(_0x611e87(0x434)[_0x611e87(0x3e7)](_0x194825)),this[_0x611e87(0x318)]=[],this['_currentMap']=$dataMap;for(const _0x2fc78e of _0x17e466){if(_0x611e87(0x819)===_0x611e87(0x25c))return _0x4051e8['CoreEngine'][_0x611e87(0x828)][_0x611e87(0x4e3)]['ActorHPColor'][_0x611e87(0x439)](this,_0x4e47c2);else VisuMZ[_0x611e87(0x9dd)][_0x611e87(0x893)](_0x2fc78e);}setTimeout(VisuMZ['CoreEngine'][_0x611e87(0x7c3)]['bind'](this),_0x194825);},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x893)]=function(_0x266260){const _0x35d516=_0x33ad8c,_0x52b4d8='Map%1.json'[_0x35d516(0x3e7)](_0x266260[_0x35d516(0x571)](0x3)),_0x41833f=new XMLHttpRequest(),_0x3c8567=_0x35d516(0x8af)+_0x52b4d8;_0x41833f[_0x35d516(0x457)](_0x35d516(0x21b),_0x3c8567),_0x41833f[_0x35d516(0x3c9)]('application/json'),_0x41833f[_0x35d516(0x394)]=()=>this[_0x35d516(0x4d3)](_0x41833f,_0x266260,_0x52b4d8,_0x3c8567),_0x41833f['onerror']=()=>DataManager[_0x35d516(0x95e)]('$dataMap',_0x52b4d8,_0x3c8567),_0x41833f['send']();},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x4d3)]=function(_0x299c2c,_0x5caaf4,_0x5d4a86,_0x4692f7){const _0x886fe1=_0x33ad8c;$dataMap=JSON['parse'](_0x299c2c[_0x886fe1(0x4fc)]),DataManager['onLoad']($dataMap),this[_0x886fe1(0x318)][_0x5caaf4]=VisuMZ[_0x886fe1(0x9dd)][_0x886fe1(0x1be)](_0x5caaf4),$dataMap=this['_currentMap'];},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x7c3)]=function(){const _0x1efd0c=_0x33ad8c,_0x374a79=_0x1efd0c(0x2d9);this[_0x1efd0c(0x318)][_0x1efd0c(0x929)](undefined)[_0x1efd0c(0x929)]('')['remove'](null);const _0x38a2d6=this[_0x1efd0c(0x318)]['join'](_0x1efd0c(0x6c1))[_0x1efd0c(0x99d)]();VisuMZ[_0x1efd0c(0x9dd)][_0x1efd0c(0x5a3)](_0x38a2d6,_0x374a79,!![]),SceneManager['_scene'][_0x1efd0c(0x940)]=!![];},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x1be)]=function(_0x789303){const _0x9f6dad=_0x33ad8c;if(!$dataMap)return'';let _0x290f0c='█'['repeat'](0x46)+'\x0a\x0a',_0x74b1a4='═'['repeat'](0x46)+'\x0a\x0a',_0x252aa7='';this[_0x9f6dad(0x252)]=0x0;for(const _0x34e4cb of $dataMap[_0x9f6dad(0x6f5)]){if(!_0x34e4cb)continue;let _0x516699=_0x34e4cb['id'],_0x36b473=_0x34e4cb['name'],_0x17a0fb=_0x34e4cb[_0x9f6dad(0x96c)];for(const _0x1b90db of _0x17a0fb){const _0x573b19=_0x17a0fb[_0x9f6dad(0x896)](_0x1b90db)+0x1;let _0x3f5c06=_0x74b1a4+'《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a',_0x37c4d3=VisuMZ[_0x9f6dad(0x9dd)][_0x9f6dad(0x2c6)](_0x1b90db[_0x9f6dad(0x6d5)]);if(_0x37c4d3[_0x9f6dad(0x1cc)]>0x0){if(_0x9f6dad(0x133)===_0x9f6dad(0x133)){if(_0x252aa7[_0x9f6dad(0x1cc)]>0x0)_0x252aa7+=_0x74b1a4+'\x0a\x0a\x0a\x0a\x0a';else{const _0x21d5bb=$dataMapInfos[_0x789303][_0x9f6dad(0x62a)];_0x252aa7+=_0x290f0c+_0x9f6dad(0x1dc)['format'](_0x789303,_0x21d5bb||_0x9f6dad(0x91b))+_0x290f0c;}_0x252aa7+=_0x3f5c06[_0x9f6dad(0x3e7)](_0x516699,_0x36b473,_0x573b19,_0x37c4d3);}else{const _0x45b635=_0x9f6dad(0x8b4);this['_colorCache']=this['_colorCache']||{};if(this[_0x9f6dad(0x7bd)][_0x45b635])return this[_0x9f6dad(0x7bd)][_0x45b635];const _0x348c6c=_0x3ff563[_0x9f6dad(0x9dd)][_0x9f6dad(0x828)][_0x9f6dad(0x4e3)][_0x9f6dad(0x799)];return this[_0x9f6dad(0x28b)](_0x45b635,_0x348c6c);}}}}if(_0x252aa7[_0x9f6dad(0x1cc)]>0x0){if(_0x9f6dad(0x1bf)!==_0x9f6dad(0x768))_0x252aa7+=_0x74b1a4;else return this[_0x9f6dad(0x5c3)][_0x9f6dad(0x21d)](_0x1a729a);}return _0x252aa7;},VisuMZ[_0x33ad8c(0x9dd)]['ExportStrFromAllTroops']=function(){const _0x2fc29c=_0x33ad8c,_0x208551=$dataTroops['length']*0xa+Math[_0x2fc29c(0x659)](0xa);alert(_0x2fc29c(0x5cc)[_0x2fc29c(0x3e7)](_0x208551));const _0x1426b0=[];for(const _0x16ad35 of $dataTroops){if(_0x2fc29c(0x244)!==_0x2fc29c(0x244))this['isUseModernControls']()?(this[_0x2fc29c(0x7ba)](),this['processCursorHomeEndTrigger']()):_0x4f9f69['CoreEngine'][_0x2fc29c(0x49b)][_0x2fc29c(0x439)](this);else{if(!_0x16ad35)continue;const _0x55310f=_0x16ad35['id'];_0x1426b0[_0x55310f]=VisuMZ[_0x2fc29c(0x9dd)][_0x2fc29c(0x751)](_0x55310f);}}setTimeout(VisuMZ[_0x2fc29c(0x9dd)][_0x2fc29c(0x13a)][_0x2fc29c(0x404)](this,_0x1426b0),_0x208551);},VisuMZ['CoreEngine'][_0x33ad8c(0x751)]=function(_0x405fd9){const _0x5a8753=_0x33ad8c;if(!$dataTroops[_0x405fd9])return'';let _0x362153='█'[_0x5a8753(0x7c2)](0x46)+'\x0a\x0a',_0x2eeee9='═'[_0x5a8753(0x7c2)](0x46)+'\x0a\x0a',_0x4304c6='';this[_0x5a8753(0x252)]=0x0;const _0x111d63=$dataTroops[_0x405fd9];let _0x20b2f0=_0x111d63[_0x5a8753(0x96c)];for(const _0x122551 of _0x20b2f0){const _0x2c1a88=_0x20b2f0[_0x5a8753(0x896)](_0x122551)+0x1;let _0x38a5f1=_0x2eeee9+_0x5a8753(0x298),_0x451262=VisuMZ[_0x5a8753(0x9dd)]['ExtractStrFromList'](_0x122551[_0x5a8753(0x6d5)]);_0x451262[_0x5a8753(0x1cc)]>0x0&&(_0x4304c6[_0x5a8753(0x1cc)]>0x0?_0x4304c6+=_0x2eeee9+_0x5a8753(0x6c1):_0x4304c6+=_0x362153+_0x5a8753(0x6e4)['format'](_0x405fd9,_0x111d63[_0x5a8753(0x62a)]||_0x5a8753(0x91b))+_0x362153,_0x4304c6+=_0x38a5f1['format'](_0x2c1a88,_0x451262));}if(_0x4304c6['length']>0x0){if(_0x5a8753(0x9e5)===_0x5a8753(0x9e5))_0x4304c6+=_0x2eeee9;else return _0x28374e[_0x5a8753(0x6c7)][_0x5a8753(0x2af)][_0x5a8753(0x439)](this);}return _0x4304c6;},VisuMZ['CoreEngine']['exportAllTroopStrings']=function(_0x457692){const _0x50d56c=_0x33ad8c,_0x2475bd='AllTroops';_0x457692[_0x50d56c(0x929)](undefined)['remove']('')[_0x50d56c(0x929)](null);const _0x12f7fd=_0x457692[_0x50d56c(0x4c5)](_0x50d56c(0x6c1))[_0x50d56c(0x99d)]();VisuMZ[_0x50d56c(0x9dd)][_0x50d56c(0x5a3)](_0x12f7fd,_0x2475bd,!![]),SceneManager['_scene'][_0x50d56c(0x940)]=!![];},VisuMZ[_0x33ad8c(0x9dd)]['ExtractStrFromList']=function(_0x338899){const _0x536785=_0x33ad8c;let _0x1ea7aa='\x0a'+'─'[_0x536785(0x7c2)](0x46)+'\x0a',_0x2933a3='\x0a'+'┄'['repeat'](0x46)+'\x0a',_0x48a76e='';for(const _0x5a6215 of _0x338899){if(_0x536785(0x255)!=='LiJTy')this[_0x536785(0x39e)]=0x1;else{if(!_0x5a6215)continue;if(_0x5a6215['code']===0x65){_0x48a76e+=_0x1ea7aa+'\x0a',_0x48a76e+=_0x536785(0x2fb);if(_0x5a6215[_0x536785(0x258)][0x4]!==''&&_0x5a6215[_0x536785(0x258)][0x4]!==undefined){if(_0x536785(0x432)===_0x536785(0x36a))return this[_0x536785(0x479)];else _0x48a76e+=_0x536785(0x666)['format'](_0x5a6215[_0x536785(0x258)][0x4]);}}else{if(_0x5a6215[_0x536785(0x481)]===0x191)_0x48a76e+=_0x536785(0x6fb)[_0x536785(0x3e7)](_0x5a6215[_0x536785(0x258)][0x0]);else{if(_0x5a6215[_0x536785(0x481)]===0x192)_0x48a76e+=_0x1ea7aa,_0x48a76e+=_0x536785(0x93f)['format'](_0x2933a3,_0x5a6215[_0x536785(0x258)][0x0]+0x1,_0x5a6215['parameters'][0x1]);else{if(_0x5a6215['code']===0x193)_0x48a76e+=_0x1ea7aa,_0x48a76e+=_0x536785(0x2a4)['format'](_0x2933a3);else{if(_0x5a6215[_0x536785(0x481)]===0x194)'JAiJw'==='xxYuQ'?this[_0x536785(0x55f)]=[]:(_0x48a76e+=_0x1ea7aa,_0x48a76e+=_0x536785(0x773)[_0x536785(0x3e7)](_0x2933a3));else{if(_0x5a6215[_0x536785(0x481)]===0x69)'OorlR'!=='OorlR'?this['drawTextEx'](_0x356e64[_0x536785(0x40c)]()[_0x536785(0x62a)],_0x102b28,_0x119ec4,_0x22cde):(_0x48a76e+=_0x1ea7aa+'\x0a',_0x48a76e+=_0x536785(0x843));else{if(_0x5a6215[_0x536785(0x481)]===0x6c)_0x536785(0x43e)!==_0x536785(0x585)?(_0x48a76e+=_0x1ea7aa+'\x0a',_0x48a76e+=_0x536785(0x892)[_0x536785(0x3e7)](_0x5a6215[_0x536785(0x258)][0x0])):_0x32c4b0=_0x59d7e6[_0x536785(0x124)](_0x268747);else{if(_0x5a6215[_0x536785(0x481)]===0x198)'TSyWg'===_0x536785(0x398)?_0x48a76e+=_0x536785(0x6fb)[_0x536785(0x3e7)](_0x5a6215[_0x536785(0x258)][0x0]):this[_0x536785(0x382)](_0x3e8e13);else{if(_0x5a6215[_0x536785(0x481)]===0x75){const _0x257a84=$dataCommonEvents[_0x5a6215[_0x536785(0x258)][0x0]];if(_0x257a84&&this['_commonEventLayers']<=0xa){if('UqiDv'!==_0x536785(0x1cb)){this[_0x536785(0x252)]++;let _0x475ad8=VisuMZ[_0x536785(0x9dd)][_0x536785(0x2c6)](_0x257a84[_0x536785(0x6d5)]);if(_0x475ad8[_0x536785(0x1cc)]>0x0){if(_0x536785(0x509)===_0x536785(0x3d5)){var _0x2331a3=_0x163c0c(_0x4a1001['$1'])/0x64;_0x596772*=_0x2331a3;}else _0x48a76e+=_0x1ea7aa,_0x48a76e+=_0x2933a3,_0x48a76e+=_0x536785(0x8fa)[_0x536785(0x3e7)](_0x257a84['id'],_0x257a84['name']),_0x48a76e+=_0x2933a3,_0x48a76e+=_0x475ad8,_0x48a76e+=_0x2933a3,_0x48a76e+=_0x536785(0x3e8)[_0x536785(0x3e7)](_0x257a84['id'],_0x257a84[_0x536785(0x62a)]),_0x48a76e+=_0x2933a3;}this['_commonEventLayers']--;}else return _0x3155f8[_0x536785(0x3ab)]([_0x536785(0x959)]);}}}}}}}}}}}}return _0x48a76e[_0x536785(0x1cc)]>0x0&&(_0x48a76e+=_0x1ea7aa),_0x48a76e;},PluginManager[_0x33ad8c(0x693)](pluginData[_0x33ad8c(0x62a)],_0x33ad8c(0x66c),_0x462cae=>{const _0x4a468d=_0x33ad8c;VisuMZ[_0x4a468d(0x320)](_0x462cae,_0x462cae);const _0xa95e3e=_0x462cae[_0x4a468d(0x2dd)];VisuMZ[_0x4a468d(0x95d)](_0xa95e3e);}),PluginManager['registerCommand'](pluginData[_0x33ad8c(0x62a)],_0x33ad8c(0x72b),_0x104f8d=>{const _0x94ee03=_0x33ad8c;VisuMZ[_0x94ee03(0x320)](_0x104f8d,_0x104f8d);const _0x3a35ea=_0x104f8d[_0x94ee03(0x5e4)]||0x0;$gameParty[_0x94ee03(0x110)](_0x3a35ea);}),PluginManager[_0x33ad8c(0x693)](pluginData[_0x33ad8c(0x62a)],_0x33ad8c(0x295),_0x5e4950=>{const _0x412780=_0x33ad8c;if(!SceneManager['isSceneMap']())return;VisuMZ[_0x412780(0x320)](_0x5e4950,_0x5e4950);const _0x598838=_0x5e4950['CommonEventID'];SceneManager[_0x412780(0x90d)][_0x412780(0xf9)](_0x598838);}),PluginManager['registerCommand'](pluginData[_0x33ad8c(0x62a)],_0x33ad8c(0x45e),_0x2796b5=>{const _0xb78b5e=_0x33ad8c;if(!$gameTemp[_0xb78b5e(0x4d4)]())return;if(!Utils[_0xb78b5e(0x9de)]())return;VisuMZ[_0xb78b5e(0x320)](_0x2796b5,_0x2796b5);const _0x35ff90=_0x2796b5[_0xb78b5e(0x7ce)]||0x1;$gameTemp[_0xb78b5e(0x3d8)]=_0x35ff90;}),PluginManager[_0x33ad8c(0x693)](pluginData['name'],_0x33ad8c(0x2f6),_0x1db3f4=>{const _0x4373b4=_0x33ad8c;VisuMZ[_0x4373b4(0x320)](_0x1db3f4,_0x1db3f4);const _0x114c73=_0x1db3f4[_0x4373b4(0x7af)]||0x1,_0x84b3e6=_0x1db3f4[_0x4373b4(0x173)]||_0x4373b4(0x8b5),_0x27977e=$gameScreen[_0x4373b4(0x7f3)](_0x114c73);_0x27977e&&('BkQRI'!==_0x4373b4(0x69f)?_0x3001ee=_0x4f260c(_0x22b016['$1'])*_0x5c1fe7[_0x4373b4(0x483)]:_0x27977e[_0x4373b4(0x639)](_0x84b3e6));}),PluginManager[_0x33ad8c(0x693)](pluginData[_0x33ad8c(0x62a)],_0x33ad8c(0x1e8),_0xa31d65=>{const _0x44e06b=_0x33ad8c;for(let _0x581c5d=0x1;_0x581c5d<=0x64;_0x581c5d++){if(_0x44e06b(0x1ea)!==_0x44e06b(0x1ea))return _0x351ac7[_0x44e06b(0x6c7)][_0x44e06b(0x8a4)][_0x44e06b(0x439)](this);else $gameScreen[_0x44e06b(0x380)](_0x581c5d);}}),PluginManager[_0x33ad8c(0x693)](pluginData[_0x33ad8c(0x62a)],'PictureEraseRange',_0x4b27c9=>{const _0x48662a=_0x33ad8c;VisuMZ['ConvertParams'](_0x4b27c9,_0x4b27c9);const _0x3f544b=Math[_0x48662a(0x732)](_0x4b27c9[_0x48662a(0x16c)],_0x4b27c9['EndingID']),_0x3b077a=Math[_0x48662a(0x3f1)](_0x4b27c9[_0x48662a(0x16c)],_0x4b27c9[_0x48662a(0x838)]);for(let _0x557bac=_0x3f544b;_0x557bac<=_0x3b077a;_0x557bac++){$gameScreen[_0x48662a(0x380)](_0x557bac);}}),PluginManager[_0x33ad8c(0x693)](pluginData[_0x33ad8c(0x62a)],'PictureRotateBy',_0x509334=>{const _0x9e58=_0x33ad8c;VisuMZ[_0x9e58(0x320)](_0x509334,_0x509334);const _0x50c56b=Math['round'](_0x509334['PictureID'])[_0x9e58(0x482)](0x1,0x64),_0x1379b9=-Number(_0x509334[_0x9e58(0x1c3)]||0x0),_0x2a3873=Math[_0x9e58(0x3f1)](_0x509334[_0x9e58(0x89b)]||0x0,0x0),_0x37af71=_0x509334['easingType']||'Linear',_0x336484=_0x509334[_0x9e58(0x760)],_0xd4ac90=$gameScreen[_0x9e58(0x7f3)](_0x50c56b);if(!_0xd4ac90)return;_0xd4ac90[_0x9e58(0x970)](_0x1379b9,_0x2a3873,_0x37af71);if(_0x336484){if('bNwgE'!==_0x9e58(0x800)){const _0x1d2d7c=_0x9e58(0x618);this[_0x9e58(0x7bd)]=this[_0x9e58(0x7bd)]||{};if(this[_0x9e58(0x7bd)][_0x1d2d7c])return this[_0x9e58(0x7bd)][_0x1d2d7c];const _0x4f8f24=_0x504563[_0x9e58(0x9dd)]['Settings']['Color']['ColorMPCost'];return this[_0x9e58(0x28b)](_0x1d2d7c,_0x4f8f24);}else{const _0x38327f=$gameTemp[_0x9e58(0x6c6)]();if(_0x38327f)_0x38327f[_0x9e58(0x645)](_0x2a3873);}}}),PluginManager[_0x33ad8c(0x693)](pluginData[_0x33ad8c(0x62a)],_0x33ad8c(0x8f5),_0x493efe=>{const _0x388aa6=_0x33ad8c;VisuMZ[_0x388aa6(0x320)](_0x493efe,_0x493efe);const _0x57ff68=Math[_0x388aa6(0x758)](_0x493efe[_0x388aa6(0x7ce)])[_0x388aa6(0x482)](0x1,0x64),_0x158652=-Number(_0x493efe[_0x388aa6(0x4b8)]||0x0),_0x5997b5=Math[_0x388aa6(0x3f1)](_0x493efe[_0x388aa6(0x89b)]||0x0,0x0),_0x553410=_0x493efe[_0x388aa6(0x173)]||_0x388aa6(0x8b5),_0x30b6e9=_0x493efe[_0x388aa6(0x760)],_0x221172=$gameScreen[_0x388aa6(0x7f3)](_0x57ff68);if(!_0x221172)return;_0x221172[_0x388aa6(0x3cd)](_0x158652,_0x5997b5,_0x553410);if(_0x30b6e9){const _0x783fc6=$gameTemp[_0x388aa6(0x6c6)]();if(_0x783fc6)_0x783fc6[_0x388aa6(0x645)](_0x5997b5);}}),PluginManager['registerCommand'](pluginData[_0x33ad8c(0x62a)],'PictureShowIcon',_0x468f2c=>{const _0x2836d6=_0x33ad8c;VisuMZ[_0x2836d6(0x320)](_0x468f2c,_0x468f2c);const _0x53f6f8=Math['round'](_0x468f2c[_0x2836d6(0x7ce)])[_0x2836d6(0x482)](0x1,0x64),_0x2c0dc4=_0x468f2c[_0x2836d6(0x828)],_0x1421ff=_0x2c0dc4[_0x2836d6(0x9d8)][_0x2836d6(0x482)](0x0,0x1),_0x477004=Math[_0x2836d6(0x758)](_0x2c0dc4[_0x2836d6(0x80d)]||0x0),_0x44c02a=Math[_0x2836d6(0x758)](_0x2c0dc4[_0x2836d6(0x8de)]||0x0),_0x4a6ffc=Math['round'](_0x2c0dc4['ScaleX']||0x0),_0x3a139e=Math[_0x2836d6(0x758)](_0x2c0dc4[_0x2836d6(0x2f4)]||0x0),_0x295fbc=Math['round'](_0x2c0dc4[_0x2836d6(0x1cd)])[_0x2836d6(0x482)](0x0,0xff),_0x46f355=_0x2c0dc4['BlendMode'],_0x45d919='VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2',_0x4d6b43=_0x468f2c[_0x2836d6(0x305)]?'Smooth':'Pixelated',_0x472b4c=_0x45d919[_0x2836d6(0x3e7)](_0x468f2c[_0x2836d6(0x39d)],_0x4d6b43);$gameScreen['showPicture'](_0x53f6f8,_0x472b4c,_0x1421ff,_0x477004,_0x44c02a,_0x4a6ffc,_0x3a139e,_0x295fbc,_0x46f355);}),PluginManager[_0x33ad8c(0x693)](pluginData['name'],'ScreenShake',_0x224bd5=>{const _0x5edd2d=_0x33ad8c;VisuMZ[_0x5edd2d(0x320)](_0x224bd5,_0x224bd5);const _0x5080a4=_0x224bd5[_0x5edd2d(0x2d1)]||_0x5edd2d(0x9b8),_0xdd0933=_0x224bd5['Power']['clamp'](0x1,0x9),_0x1cd040=_0x224bd5[_0x5edd2d(0x8ac)][_0x5edd2d(0x482)](0x1,0x9),_0x9a28f=_0x224bd5['Duration']||0x1,_0x33c2dd=_0x224bd5[_0x5edd2d(0x760)];$gameScreen[_0x5edd2d(0x3bf)](_0x5080a4),$gameScreen['startShake'](_0xdd0933,_0x1cd040,_0x9a28f);if(_0x33c2dd){if(_0x5edd2d(0x5c1)!==_0x5edd2d(0x47e)){const _0x5b6499=$gameTemp[_0x5edd2d(0x6c6)]();if(_0x5b6499)_0x5b6499[_0x5edd2d(0x645)](_0x9a28f);}else _0x5b191a=_0x1462e4[_0x5edd2d(0x758)](_0x125a71),_0x2e3db0=_0x4bd8e6['round'](_0x4680c7),_0x26bb6b[_0x5edd2d(0x9dd)][_0x5edd2d(0x78b)][_0x5edd2d(0x439)](this,_0x506f5b,_0x3b86c7,_0x43e1f4);}}),PluginManager['registerCommand'](pluginData[_0x33ad8c(0x62a)],_0x33ad8c(0x2d7),_0x1ea52c=>{const _0xa379d3=_0x33ad8c;if($gameParty[_0xa379d3(0x41b)]())return;VisuMZ['ConvertParams'](_0x1ea52c,_0x1ea52c);const _0x3e41d3=_0x1ea52c[_0xa379d3(0x3e0)],_0x2d2855=(_0x1ea52c[_0xa379d3(0x3b1)]||0x0)/0x64;for(const _0xd4427 of _0x3e41d3){const _0x274389=Math[_0xa379d3(0x9b8)]()<=_0x2d2855;$gameSwitches[_0xa379d3(0x822)](_0xd4427,_0x274389);}}),PluginManager['registerCommand'](pluginData[_0x33ad8c(0x62a)],_0x33ad8c(0x981),_0x1b3b95=>{const _0x7c3cd8=_0x33ad8c;if($gameParty[_0x7c3cd8(0x41b)]())return;VisuMZ['ConvertParams'](_0x1b3b95,_0x1b3b95);const _0xe95052=Math[_0x7c3cd8(0x732)](_0x1b3b95[_0x7c3cd8(0x16c)],_0x1b3b95[_0x7c3cd8(0x838)]),_0x1877ac=Math[_0x7c3cd8(0x3f1)](_0x1b3b95[_0x7c3cd8(0x16c)],_0x1b3b95[_0x7c3cd8(0x838)]),_0x5767b0=(_0x1b3b95[_0x7c3cd8(0x3b1)]||0x0)/0x64;for(let _0x1f2e64=_0xe95052;_0x1f2e64<=_0x1877ac;_0x1f2e64++){const _0x5a91cb=Math['random']()<=_0x5767b0;$gameSwitches[_0x7c3cd8(0x822)](_0x1f2e64,_0x5a91cb);}}),PluginManager[_0x33ad8c(0x693)](pluginData['name'],_0x33ad8c(0x4f0),_0x3f6fab=>{const _0x5be1f4=_0x33ad8c;if($gameParty[_0x5be1f4(0x41b)]())return;VisuMZ['ConvertParams'](_0x3f6fab,_0x3f6fab);const _0x45794a=_0x3f6fab[_0x5be1f4(0x3e0)];for(const _0x3ce26d of _0x45794a){const _0x5df465=$gameSwitches[_0x5be1f4(0x5e4)](_0x3ce26d);$gameSwitches[_0x5be1f4(0x822)](_0x3ce26d,!_0x5df465);}}),PluginManager[_0x33ad8c(0x693)](pluginData['name'],_0x33ad8c(0x54d),_0x422f89=>{const _0x5cb35f=_0x33ad8c;if($gameParty[_0x5cb35f(0x41b)]())return;VisuMZ[_0x5cb35f(0x320)](_0x422f89,_0x422f89);const _0x4d82ca=Math['min'](_0x422f89[_0x5cb35f(0x16c)],_0x422f89[_0x5cb35f(0x838)]),_0x33b072=Math['max'](_0x422f89['StartID'],_0x422f89['EndingID']);for(let _0x50e961=_0x4d82ca;_0x50e961<=_0x33b072;_0x50e961++){const _0x26e8d1=$gameSwitches[_0x5cb35f(0x5e4)](_0x50e961);$gameSwitches[_0x5cb35f(0x822)](_0x50e961,!_0x26e8d1);}}),PluginManager[_0x33ad8c(0x693)](pluginData['name'],_0x33ad8c(0x50e),_0x5b77f3=>{const _0x2415e3=_0x33ad8c;VisuMZ[_0x2415e3(0x320)](_0x5b77f3,_0x5b77f3);const _0xe653f7=_0x5b77f3[_0x2415e3(0x9a3)]||0x1;$gameSystem[_0x2415e3(0x9c2)](_0xe653f7);}),PluginManager['registerCommand'](pluginData[_0x33ad8c(0x62a)],_0x33ad8c(0x176),_0x5b33b3=>{const _0x2045a8=_0x33ad8c;if($gameParty[_0x2045a8(0x41b)]())return;VisuMZ[_0x2045a8(0x320)](_0x5b33b3,_0x5b33b3);const _0x4ac989=_0x5b33b3['option'];if(_0x4ac989['match'](/Front/i)){if(_0x2045a8(0x391)!==_0x2045a8(0x739))$gameSystem[_0x2045a8(0x25f)](![]);else return _0x578fc2[_0x2045a8(0x9dd)][_0x2045a8(0x828)][_0x2045a8(0x4e3)][_0x2045a8(0x2bc)];}else{if(_0x4ac989['match'](/Side/i))$gameSystem['setSideView'](!![]);else{if('tsDrM'!==_0x2045a8(0x720)){_0x1dca56['ConvertParams'](_0x41da6b,_0x36cafb);const _0x5f2966=_0x5acc8c['round'](_0x44b197['pan'])[_0x2045a8(0x482)](-0x64,0x64),_0x48e78a=_0x9dba20[_0x2045a8(0x172)];_0x48e78a&&(_0x48e78a['pan']=_0x5f2966,_0x48e78a[_0x2045a8(0x340)]=_0x1cc17c[_0x2045a8(0x3ee)][_0x2045a8(0x89d)](),_0x1de6c6[_0x2045a8(0x3b0)](_0x48e78a),_0x2b376f[_0x2045a8(0x590)](_0x48e78a,_0x48e78a[_0x2045a8(0x340)]),_0x1b95d0[_0x2045a8(0x3ee)][_0x2045a8(0x972)](_0x48e78a['pos']));}else $gameSystem[_0x2045a8(0x25f)](!$gameSystem[_0x2045a8(0x7b5)]());}}}),PluginManager[_0x33ad8c(0x693)](pluginData[_0x33ad8c(0x62a)],_0x33ad8c(0x24a),_0x800e89=>{const _0x2ae437=_0x33ad8c;if($gameParty[_0x2ae437(0x41b)]())return;VisuMZ[_0x2ae437(0x320)](_0x800e89,_0x800e89);const _0x37a46d=[_0x2ae437(0x2b1),_0x2ae437(0x789),'me','se'];for(const _0x445236 of _0x37a46d){const _0x4356fe=_0x800e89[_0x445236],_0x2d208c='%1/'[_0x2ae437(0x3e7)](_0x445236);for(const _0x841481 of _0x4356fe){AudioManager[_0x2ae437(0x270)](_0x2d208c,_0x841481);}}}),PluginManager[_0x33ad8c(0x693)](pluginData[_0x33ad8c(0x62a)],_0x33ad8c(0x6fd),_0x5a1713=>{const _0x1b9bfc=_0x33ad8c;if($gameParty[_0x1b9bfc(0x41b)]())return;VisuMZ['ConvertParams'](_0x5a1713,_0x5a1713);const _0x1369d4=[_0x1b9bfc(0x76e),_0x1b9bfc(0x301),_0x1b9bfc(0x43a),'characters',_0x1b9bfc(0x53e),'faces',_0x1b9bfc(0x858),'pictures',_0x1b9bfc(0x7f7),_0x1b9bfc(0x765),'system',_0x1b9bfc(0x651),_0x1b9bfc(0x3d2),_0x1b9bfc(0x664)];for(const _0x4f5957 of _0x1369d4){const _0x3dd43d=_0x5a1713[_0x4f5957],_0x15fb28='img/%1/'['format'](_0x4f5957);for(const _0x508065 of _0x3dd43d){_0x1b9bfc(0x1a8)===_0x1b9bfc(0x4a0)?this[_0x1b9bfc(0x894)][_0x1b9bfc(0x672)](_0x6fb019[_0x1b9bfc(0x6c7)]['StatusBgType']):ImageManager[_0x1b9bfc(0x694)](_0x15fb28,_0x508065);}}}),PluginManager[_0x33ad8c(0x693)](pluginData['name'],_0x33ad8c(0x357),_0x1b1400=>{const _0x2ef53c=_0x33ad8c;if($gameParty[_0x2ef53c(0x41b)]())return;VisuMZ[_0x2ef53c(0x320)](_0x1b1400,_0x1b1400);const _0x100026=_0x1b1400[_0x2ef53c(0x9a3)][_0x2ef53c(0x455)]()[_0x2ef53c(0x99d)](),_0x38bbe2=VisuMZ[_0x2ef53c(0x9dd)][_0x2ef53c(0x313)](_0x100026);$gameSystem['setBattleSystem'](_0x38bbe2);}),VisuMZ[_0x33ad8c(0x9dd)]['CreateBattleSystemID']=function(_0x59c9dc){const _0x24762c=_0x33ad8c;_0x59c9dc=_0x59c9dc||_0x24762c(0x4a8),_0x59c9dc=String(_0x59c9dc)[_0x24762c(0x455)]()[_0x24762c(0x99d)]();switch(_0x59c9dc){case _0x24762c(0x69a):return 0x0;case _0x24762c(0x58e):Imported[_0x24762c(0x6d2)]&&(_0x24762c(0x808)===_0x24762c(0x808)?ConfigManager[_0x24762c(0x7ff)]=!![]:(this[_0x24762c(0x63f)]()[_0x24762c(0x7ec)]=!![],this[_0x24762c(0x63f)]()['displayY']=_0x1ae980[_0x24762c(0x1e2)]));return 0x1;case _0x24762c(0x1c5):if(Imported[_0x24762c(0x6d2)]){if(_0x24762c(0x274)!==_0x24762c(0x274))return _0x5cf5ad[_0x24762c(0x9dd)][_0x24762c(0x772)][_0x38a03b]==='integer'?_0x3d6047:_0xe9e8ba((_0x558e36*0x64)['toFixed'](_0x4eb169))+'%';else ConfigManager[_0x24762c(0x7ff)]=![];}return 0x2;case _0x24762c(0xa0c):if(Imported[_0x24762c(0x65e)])return _0x24762c(0xa0c);break;case'STB':if(Imported[_0x24762c(0x91f)])return _0x24762c(0x254);break;case _0x24762c(0x59c):if(Imported[_0x24762c(0x344)]){if('mDNTz'===_0x24762c(0x52f))return'BTB';else{const _0x2f278f=this[_0x24762c(0x3c8)],_0x169cd2=this['_viewportSize'],_0x5b6738=this[_0x24762c(0x4c6)]['offsetX']*(this[_0x24762c(0x2e6)]?-0x1:0x1)-_0x2f278f/0x2,_0x1b1de2=this[_0x24762c(0x4c6)][_0x24762c(0x6d0)]-_0x169cd2/0x2,_0xf39bac=this[_0x24762c(0xa08)](_0x2afc5a);_0x3a7a80['gl']['viewport'](_0x5b6738+_0xf39bac['x'],_0x1b1de2+_0xf39bac['y'],_0x2f278f,_0x169cd2);}}break;case _0x24762c(0x9b0):if(Imported[_0x24762c(0x399)])return _0x24762c(0x9b0);break;case _0x24762c(0x521):if(Imported[_0x24762c(0x740)]){if('KMlmO'!==_0x24762c(0x70a))return _0x24762c(0x521);else this[_0x24762c(0x39e)]='PTB';}break;case _0x24762c(0x449):if(Imported[_0x24762c(0x911)])return _0x24762c(0x449);break;case _0x24762c(0x15e):if(Imported[_0x24762c(0x7b0)])return _0x24762c(0x15e);break;}return $dataSystem[_0x24762c(0x8e6)];},PluginManager[_0x33ad8c(0x693)](pluginData['name'],'SystemSetWindowPadding',_0x4d2cbe=>{const _0x2785fa=_0x33ad8c;VisuMZ['ConvertParams'](_0x4d2cbe,_0x4d2cbe);const _0x51c981=_0x4d2cbe[_0x2785fa(0x9a3)]||0x1;$gameSystem['setWindowPadding'](_0x51c981);}),PluginManager[_0x33ad8c(0x693)](pluginData['name'],_0x33ad8c(0x2b2),_0x3a1408=>{const _0x3a5307=_0x33ad8c;VisuMZ[_0x3a5307(0x320)](_0x3a1408,_0x3a1408);const _0x1cb58f=_0x3a1408['text']||'';$textPopup(_0x1cb58f);}),PluginManager[_0x33ad8c(0x693)](pluginData[_0x33ad8c(0x62a)],_0x33ad8c(0x8d5),_0x3e7158=>{const _0x11ee59=_0x33ad8c;VisuMZ['ConvertParams'](_0x3e7158,_0x3e7158);const _0x4def7e=_0x3e7158['id']||0x1,_0x56c30b=_0x3e7158[_0x11ee59(0x23b)],_0x5eac9c=_0x3e7158[_0x11ee59(0x757)]||0x0;let _0x4435f9=$gameVariables[_0x11ee59(0x5e4)](_0x4def7e)||0x0;switch(_0x56c30b){case'=':_0x4435f9=_0x5eac9c;break;case'+':_0x4435f9+=_0x5eac9c;break;case'-':_0x4435f9-=_0x5eac9c;break;case'*':_0x4435f9*=_0x5eac9c;break;case'/':_0x4435f9/=_0x5eac9c;break;case'%':_0x4435f9%=_0x5eac9c;break;}_0x4435f9=_0x4435f9||0x0,$gameVariables[_0x11ee59(0x822)](_0x4def7e,_0x4435f9);}),PluginManager[_0x33ad8c(0x693)](pluginData[_0x33ad8c(0x62a)],_0x33ad8c(0x285),_0x468bc5=>{const _0x444a60=_0x33ad8c;VisuMZ[_0x444a60(0x320)](_0x468bc5,_0x468bc5);const _0x4289f5=_0x468bc5['id']()||0x1,_0x2c6699=_0x468bc5['operation'],_0x715efe=_0x468bc5[_0x444a60(0x757)]()||0x0;let _0x60d515=$gameVariables[_0x444a60(0x5e4)](_0x4289f5)||0x0;switch(_0x2c6699){case'=':_0x60d515=_0x715efe;break;case'+':_0x60d515+=_0x715efe;break;case'-':_0x60d515-=_0x715efe;break;case'*':_0x60d515*=_0x715efe;break;case'/':_0x60d515/=_0x715efe;break;case'%':_0x60d515%=_0x715efe;break;}_0x60d515=_0x60d515||0x0,$gameVariables[_0x444a60(0x822)](_0x4289f5,_0x60d515);}),VisuMZ['CoreEngine'][_0x33ad8c(0x4cd)]=Scene_Boot[_0x33ad8c(0x116)]['onDatabaseLoaded'],Scene_Boot['prototype'][_0x33ad8c(0x3bc)]=function(){const _0x4dc52e=_0x33ad8c;VisuMZ[_0x4dc52e(0x9dd)]['Scene_Boot_onDatabaseLoaded'][_0x4dc52e(0x439)](this),this[_0x4dc52e(0x5d8)](),this[_0x4dc52e(0x3fa)](),this[_0x4dc52e(0x388)](),this[_0x4dc52e(0x3b7)](),this[_0x4dc52e(0x742)](),this[_0x4dc52e(0x6ba)](),VisuMZ[_0x4dc52e(0x228)]();},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x5fb)]={},Scene_Boot[_0x33ad8c(0x116)][_0x33ad8c(0x5d8)]=function(){const _0x67e26=_0x33ad8c,_0x5d2d28=['MAXHP',_0x67e26(0x5f3),_0x67e26(0x5a4),_0x67e26(0x168),_0x67e26(0x487),_0x67e26(0x302),'AGI',_0x67e26(0x311)],_0x4aa15d=[_0x67e26(0x7ea),'EVA','CRI',_0x67e26(0x4f7),_0x67e26(0x3ad),_0x67e26(0x915),_0x67e26(0x4af),_0x67e26(0x814),_0x67e26(0x3a7),'TRG'],_0x1d9c58=[_0x67e26(0x912),_0x67e26(0x4ff),_0x67e26(0x840),'PHA','MCR','TCR','PDR','MDR',_0x67e26(0x4a1),_0x67e26(0x7a4)],_0x245355=[_0x5d2d28,_0x4aa15d,_0x1d9c58],_0x43447a=[_0x67e26(0x4bf),_0x67e26(0x996),_0x67e26(0x1f0),_0x67e26(0x1db),_0x67e26(0x261),_0x67e26(0x1ac),_0x67e26(0x6bc),_0x67e26(0x8e9),'Flat1','Flat2'];for(const _0x1e6356 of _0x245355){let _0x5980a1='';if(_0x1e6356===_0x5d2d28)_0x5980a1=_0x67e26(0x83d);if(_0x1e6356===_0x4aa15d)_0x5980a1=_0x67e26(0xa15);if(_0x1e6356===_0x1d9c58)_0x5980a1=_0x67e26(0x272);for(const _0x104d0a of _0x43447a){if('qmclA'===_0x67e26(0x6f7)){const _0xcecb75=_0x220cb3[_0x67e26(0x9dd)][_0x67e26(0x828)][_0x67e26(0x926)];if(this[_0x67e26(0x59f)][_0x67e26(0x64f)]==='keyboard')return _0xcecb75[_0x67e26(0x20f)]||_0x67e26(0x20f);}else{let _0x381fc7=_0x67e26(0x2d3)['format'](_0x5980a1,_0x104d0a);VisuMZ[_0x67e26(0x9dd)][_0x67e26(0x5fb)][_0x381fc7]=[],VisuMZ[_0x67e26(0x9dd)]['RegExp'][_0x381fc7+'JS']=[];let _0x3612d3=_0x67e26(0x5df);if([_0x67e26(0x4bf),'Flat'][_0x67e26(0x949)](_0x104d0a))_0x3612d3+=_0x67e26(0x7f0);else{if([_0x67e26(0x996),_0x67e26(0x9d4)][_0x67e26(0x949)](_0x104d0a))_0x3612d3+=_0x67e26(0x4a3);else{if([_0x67e26(0x1f0),_0x67e26(0x7df)][_0x67e26(0x949)](_0x104d0a))_0x67e26(0x280)!==_0x67e26(0x280)?(_0x452ea1[_0x67e26(0x9dd)]['Window_Base_update'][_0x67e26(0x439)](this),this[_0x67e26(0x45f)]()):_0x3612d3+=_0x67e26(0x458);else{if(_0x104d0a===_0x67e26(0x1db)){if(_0x67e26(0x681)===_0x67e26(0x681))_0x3612d3+=_0x67e26(0x147);else{const _0x290610=this[_0x67e26(0x53f)](_0x2ac6c3),_0x1d59e8=this['subjectHitRate'](_0x4516bc),_0x3044fb=this[_0x67e26(0x607)](_0x17338d);return _0x290610*(_0x1d59e8-_0x3044fb);}}else{if(_0x104d0a===_0x67e26(0x1ac))_0x3612d3+=_0x67e26(0x4a7);else _0x104d0a==='Rate2'&&(_0x3612d3+=_0x67e26(0x5d6));}}}}for(const _0x5d57ce of _0x1e6356){if(_0x67e26(0x60b)===_0x67e26(0x60b)){let _0xfa37a5=_0x104d0a[_0x67e26(0x104)](/[\d+]/g,'')[_0x67e26(0x455)]();const _0x1bc2f7=_0x3612d3[_0x67e26(0x3e7)](_0x5d57ce,_0xfa37a5);VisuMZ[_0x67e26(0x9dd)][_0x67e26(0x5fb)][_0x381fc7]['push'](new RegExp(_0x1bc2f7,'i'));const _0x19ce8c=_0x67e26(0x960)[_0x67e26(0x3e7)](_0x5d57ce,_0xfa37a5);VisuMZ[_0x67e26(0x9dd)][_0x67e26(0x5fb)][_0x381fc7+'JS']['push'](new RegExp(_0x19ce8c,'i'));}else _0x12ba4b['prototype'][_0x67e26(0x8fc)][_0x67e26(0x439)](this),this[_0x67e26(0x906)]();}}}}},Scene_Boot[_0x33ad8c(0x116)]['process_VisuMZ_CoreEngine_Notetags']=function(){const _0x4685f4=_0x33ad8c;if(VisuMZ[_0x4685f4(0x228)])return;},Scene_Boot[_0x33ad8c(0x116)]['process_VisuMZ_CoreEngine_Settings']=function(){const _0x28711b=_0x33ad8c,_0x33fb34=VisuMZ['CoreEngine'][_0x28711b(0x828)];_0x33fb34[_0x28711b(0x113)][_0x28711b(0x941)]&&VisuMZ[_0x28711b(0x8b1)](!![]);_0x33fb34[_0x28711b(0x113)][_0x28711b(0x500)]&&('wrsvU'===_0x28711b(0x364)?(Input[_0x28711b(0x579)][0x23]=_0x28711b(0x67f),Input[_0x28711b(0x579)][0x24]=_0x28711b(0x566)):this[_0x28711b(0x1e4)][_0x28711b(0x672)](_0x140539[_0x28711b(0x6c7)][_0x28711b(0x102)]));if(_0x33fb34[_0x28711b(0x2cc)]){const _0x38dc1f=_0x33fb34[_0x28711b(0x2cc)];_0x38dc1f[_0x28711b(0x8b0)]=_0x38dc1f[_0x28711b(0x8b0)]||'\x5c}❪SHIFT❫\x5c{',_0x38dc1f['KeyTAB']=_0x38dc1f[_0x28711b(0x647)]||'\x5c}❪TAB❫\x5c{';}_0x33fb34[_0x28711b(0x926)][_0x28711b(0x779)]&&(Input[_0x28711b(0x579)][0x57]='up',Input[_0x28711b(0x579)][0x41]='left',Input[_0x28711b(0x579)][0x53]=_0x28711b(0x366),Input['keyMapper'][0x44]=_0x28711b(0x513),Input[_0x28711b(0x579)][0x45]=_0x28711b(0x23d)),_0x33fb34['KeyboardInput']['DashToggleR']&&('CwXUI'===_0x28711b(0x51f)?Input[_0x28711b(0x579)][0x52]='dashToggle':(this[_0x28711b(0x6a7)](_0x4ea6d5,_0x1ce487,_0x54be97,this['gaugeLineHeight']()),_0x58fd6e-=this[_0x28711b(0x87f)]()+0x2,_0x29ad8e+=this[_0x28711b(0x87f)]()+0x2)),_0x33fb34[_0x28711b(0x87b)][_0x28711b(0x888)]=_0x33fb34[_0x28711b(0x87b)]['DisplayedParams'][_0x28711b(0x6ab)](_0x3488f1=>_0x3488f1[_0x28711b(0x455)]()[_0x28711b(0x99d)]()),_0x33fb34[_0x28711b(0x87b)][_0x28711b(0x750)]=_0x33fb34[_0x28711b(0x87b)][_0x28711b(0x750)]['map'](_0x420793=>_0x420793[_0x28711b(0x455)]()['trim']()),_0x33fb34[_0x28711b(0x113)][_0x28711b(0x967)]=_0x33fb34[_0x28711b(0x113)]['ShiftR_Toggle']??!![],_0x33fb34[_0x28711b(0x113)][_0x28711b(0x9da)]=_0x33fb34[_0x28711b(0x113)][_0x28711b(0x9da)]??!![];},Scene_Boot['prototype'][_0x33ad8c(0x3b7)]=function(){const _0x38415d=_0x33ad8c;this[_0x38415d(0x336)]();},Scene_Boot[_0x33ad8c(0x116)][_0x33ad8c(0x336)]=function(){const _0x3f8c88=_0x33ad8c,_0x1112db=VisuMZ[_0x3f8c88(0x9dd)][_0x3f8c88(0x828)][_0x3f8c88(0xa24)];for(const _0x451e7e of _0x1112db){const _0x4e5fdd=_0x451e7e['FunctionName'][_0x3f8c88(0x104)](/[ ]/g,''),_0x3f24ad=_0x451e7e['CodeJS'];VisuMZ[_0x3f8c88(0x9dd)][_0x3f8c88(0x1b6)](_0x4e5fdd,_0x3f24ad);}},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x1b6)]=function(_0x9889ad,_0x53b727){const _0x2ee83b=_0x33ad8c;if(!!window[_0x9889ad]){if('LhHci'===_0x2ee83b(0x4c4)){if($gameTemp['isPlaytest']())console['log']('WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function'[_0x2ee83b(0x3e7)](_0x9889ad));}else this[_0x2ee83b(0x7fe)]();}const _0x4d4fa9=_0x2ee83b(0x5e0)['format'](_0x9889ad,_0x53b727);window[_0x9889ad]=new Function(_0x4d4fa9);},Scene_Boot[_0x33ad8c(0x116)][_0x33ad8c(0x742)]=function(){const _0x472fa7=_0x33ad8c,_0x47ca54=VisuMZ['CoreEngine'][_0x472fa7(0x828)][_0x472fa7(0x668)];if(!_0x47ca54)return;for(const _0x19383e of _0x47ca54){if(_0x472fa7(0x528)===_0x472fa7(0x528)){if(!_0x19383e)continue;VisuMZ['CoreEngine'][_0x472fa7(0x555)](_0x19383e);}else{if(!this[_0x472fa7(0x27e)]())return![];else{const _0x20ad54=_0x173b3a['eventsXyNt'](_0x5e304d,_0x45c19b)[_0x472fa7(0x238)](_0xbdcb00=>_0xbdcb00[_0x472fa7(0x27e)]());return _0x20ad54['length']>0x0;}}}},VisuMZ['CoreEngine'][_0x33ad8c(0x378)]={},VisuMZ[_0x33ad8c(0x9dd)]['CustomParamIcons']={},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x772)]={},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x160)]={},VisuMZ[_0x33ad8c(0x9dd)]['createCustomParameter']=function(_0x4ac9b2){const _0x1e0878=_0x33ad8c,_0x15c581=_0x4ac9b2[_0x1e0878(0x537)],_0xa98739=_0x4ac9b2[_0x1e0878(0x2b5)],_0x293eb6=_0x4ac9b2[_0x1e0878(0x98a)],_0x1177f1=_0x4ac9b2['Type'],_0x5d0edb=new Function(_0x4ac9b2[_0x1e0878(0x5b9)]);VisuMZ['CoreEngine'][_0x1e0878(0x378)][_0x15c581[_0x1e0878(0x455)]()['trim']()]=_0xa98739,VisuMZ[_0x1e0878(0x9dd)][_0x1e0878(0x6a5)][_0x15c581[_0x1e0878(0x455)]()['trim']()]=_0x293eb6,VisuMZ[_0x1e0878(0x9dd)]['CustomParamType'][_0x15c581[_0x1e0878(0x455)]()['trim']()]=_0x1177f1,VisuMZ[_0x1e0878(0x9dd)][_0x1e0878(0x160)][_0x15c581[_0x1e0878(0x455)]()['trim']()]=_0x15c581,Object[_0x1e0878(0x6cc)](Game_BattlerBase[_0x1e0878(0x116)],_0x15c581,{'get'(){const _0x10d3ce=_0x1e0878;if(_0x10d3ce(0x6dc)!=='VOuwI'){const _0x1aee53=_0x5d0edb[_0x10d3ce(0x439)](this);return _0x1177f1===_0x10d3ce(0x329)?Math[_0x10d3ce(0x758)](_0x1aee53):_0x1aee53;}else _0x3a1dbf+=_0x46b90(_0x2c522e);}});},VisuMZ['CoreEngine'][_0x33ad8c(0x560)]={},VisuMZ[_0x33ad8c(0x9dd)]['ControllerMatches']={},Scene_Boot[_0x33ad8c(0x116)]['process_VisuMZ_CoreEngine_ControllerButtons']=function(){const _0x384a30=_0x33ad8c,_0x3f9795=VisuMZ[_0x384a30(0x9dd)][_0x384a30(0x828)][_0x384a30(0x560)];for(const _0x1cd464 of _0x3f9795){if('UXiPN'==='pFZIX')_0x38ef08[_0x384a30(0x740)]&&(this['_forcedBattleSys']=_0x384a30(0x521));else{const _0x2aa208=(_0x1cd464[_0x384a30(0x4e8)]||'')[_0x384a30(0x1fe)]()[_0x384a30(0x99d)](),_0x1e659c=(_0x1cd464[_0x384a30(0x75b)]||'')[_0x384a30(0x1fe)]()[_0x384a30(0x99d)]();VisuMZ['CoreEngine'][_0x384a30(0x560)][_0x2aa208]=_0x1cd464,VisuMZ['CoreEngine'][_0x384a30(0x61e)][_0x1e659c]=_0x2aa208;}}},VisuMZ['ParseAllNotetags']=function(){const _0x31ebfc=_0x33ad8c;for(const _0x2cf737 of $dataActors){if(_0x31ebfc(0x1c8)!==_0x31ebfc(0x7a1)){if(_0x2cf737)VisuMZ[_0x31ebfc(0x58b)](_0x2cf737);}else return _0xddb59d[_0x31ebfc(0x116)][_0x31ebfc(0x22f)]();}for(const _0x2ce100 of $dataClasses){if(_0x31ebfc(0x422)!==_0x31ebfc(0x886)){if(_0x2ce100)VisuMZ['ParseClassNotetags'](_0x2ce100);}else _0x47aea2=_0x31ebfc(0x6f3)[_0x31ebfc(0x3e7)](_0xa2373,_0x5e8fc9);}for(const _0x2493ea of $dataSkills){if(_0x31ebfc(0x260)!==_0x31ebfc(0x260))return!![];else{if(_0x2493ea)VisuMZ[_0x31ebfc(0x44f)](_0x2493ea);}}for(const _0x16eb8a of $dataItems){if(_0x31ebfc(0x1d6)==='FraoR')!this[_0x31ebfc(0x68b)]&&(this[_0x31ebfc(0x68b)]=_0x5d776b['gl'][_0x31ebfc(0x138)](_0x250a38['gl'][_0x31ebfc(0x6b3)]));else{if(_0x16eb8a)VisuMZ['ParseItemNotetags'](_0x16eb8a);}}for(const _0x315561 of $dataWeapons){if(_0x315561)VisuMZ['ParseWeaponNotetags'](_0x315561);}for(const _0x39e068 of $dataArmors){if(_0x31ebfc(0x267)!==_0x31ebfc(0x6a2)){if(_0x39e068)VisuMZ['ParseArmorNotetags'](_0x39e068);}else this[_0x31ebfc(0x41c)]['x']=this['_targetAnchor']['x'],this['_anchor']['y']=this[_0x31ebfc(0x16b)]['y'];}for(const _0x141822 of $dataEnemies){if(_0x141822)VisuMZ[_0x31ebfc(0x8f0)](_0x141822);}for(const _0x71dfce of $dataStates){if(_0x71dfce)VisuMZ[_0x31ebfc(0x213)](_0x71dfce);}for(const _0x298181 of $dataTilesets){if(_0x298181)VisuMZ[_0x31ebfc(0x682)](_0x298181);}},VisuMZ[_0x33ad8c(0x58b)]=function(_0xacc68b){},VisuMZ[_0x33ad8c(0x191)]=function(_0x27c396){},VisuMZ[_0x33ad8c(0x44f)]=function(_0x14d7c2){},VisuMZ[_0x33ad8c(0x66e)]=function(_0x56ce7e){},VisuMZ[_0x33ad8c(0x2a9)]=function(_0x3e6704){},VisuMZ['ParseArmorNotetags']=function(_0x3901eb){},VisuMZ[_0x33ad8c(0x8f0)]=function(_0x31c969){},VisuMZ[_0x33ad8c(0x213)]=function(_0x4fe731){},VisuMZ['ParseTilesetNotetags']=function(_0x384ce8){},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x58b)]=VisuMZ[_0x33ad8c(0x58b)],VisuMZ['ParseActorNotetags']=function(_0x11754b){const _0x1b5280=_0x33ad8c;VisuMZ['CoreEngine'][_0x1b5280(0x58b)]['call'](this,_0x11754b);const _0x29ca27=_0x11754b[_0x1b5280(0x163)];if(_0x29ca27[_0x1b5280(0x13d)](/<MAX LEVEL:[ ](\d+)>/i)){_0x11754b[_0x1b5280(0x868)]=Number(RegExp['$1']);if(_0x11754b[_0x1b5280(0x868)]===0x0)_0x11754b[_0x1b5280(0x868)]=Number[_0x1b5280(0x253)];}_0x29ca27['match'](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x11754b[_0x1b5280(0x316)]=Math[_0x1b5280(0x732)](Number(RegExp['$1']),_0x11754b[_0x1b5280(0x868)]));},VisuMZ[_0x33ad8c(0x9dd)]['ParseClassNotetags']=VisuMZ['ParseClassNotetags'],VisuMZ[_0x33ad8c(0x191)]=function(_0x2fcaae){const _0x1b50db=_0x33ad8c;VisuMZ[_0x1b50db(0x9dd)]['ParseClassNotetags'][_0x1b50db(0x439)](this,_0x2fcaae);if(_0x2fcaae[_0x1b50db(0x627)]){if('MtCwi'===_0x1b50db(0x62b))_0x5022cc['missed']=![],_0x5557f1[_0x1b50db(0x5d1)]=!![];else for(const _0x239f47 of _0x2fcaae[_0x1b50db(0x627)]){if(_0x1b50db(0x33a)==='xSrFw'){if(_0x239f47[_0x1b50db(0x163)][_0x1b50db(0x13d)](/<LEARN AT LEVEL:[ ](\d+)>/i)){if(_0x1b50db(0x9b2)===_0x1b50db(0x662))return _0x3ce243[_0x1b50db(0x6c7)][_0x1b50db(0x983)]['call'](this);else _0x239f47[_0x1b50db(0x421)]=Math[_0x1b50db(0x3f1)](Number(RegExp['$1']),0x1);}}else this[_0x1b50db(0x788)]=0xff;}}},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x8f0)]=VisuMZ[_0x33ad8c(0x8f0)],VisuMZ['ParseEnemyNotetags']=function(_0x3db26c){const _0x3e9919=_0x33ad8c;VisuMZ['CoreEngine'][_0x3e9919(0x8f0)][_0x3e9919(0x439)](this,_0x3db26c),_0x3db26c[_0x3e9919(0x421)]=0x1;const _0x2dda5c=_0x3db26c[_0x3e9919(0x163)];if(_0x2dda5c[_0x3e9919(0x13d)](/<LEVEL:[ ](\d+)>/i))_0x3db26c['level']=Number(RegExp['$1']);if(_0x2dda5c['match'](/<MAXHP:[ ](\d+)>/i))_0x3db26c[_0x3e9919(0x2a6)][0x0]=Number(RegExp['$1']);if(_0x2dda5c[_0x3e9919(0x13d)](/<MAXMP:[ ](\d+)>/i))_0x3db26c[_0x3e9919(0x2a6)][0x1]=Number(RegExp['$1']);if(_0x2dda5c['match'](/<ATK:[ ](\d+)>/i))_0x3db26c[_0x3e9919(0x2a6)][0x2]=Number(RegExp['$1']);if(_0x2dda5c[_0x3e9919(0x13d)](/<DEF:[ ](\d+)>/i))_0x3db26c[_0x3e9919(0x2a6)][0x3]=Number(RegExp['$1']);if(_0x2dda5c[_0x3e9919(0x13d)](/<MAT:[ ](\d+)>/i))_0x3db26c[_0x3e9919(0x2a6)][0x4]=Number(RegExp['$1']);if(_0x2dda5c['match'](/<MDF:[ ](\d+)>/i))_0x3db26c[_0x3e9919(0x2a6)][0x5]=Number(RegExp['$1']);if(_0x2dda5c[_0x3e9919(0x13d)](/<AGI:[ ](\d+)>/i))_0x3db26c[_0x3e9919(0x2a6)][0x6]=Number(RegExp['$1']);if(_0x2dda5c[_0x3e9919(0x13d)](/<LUK:[ ](\d+)>/i))_0x3db26c[_0x3e9919(0x2a6)][0x7]=Number(RegExp['$1']);if(_0x2dda5c['match'](/<EXP:[ ](\d+)>/i))_0x3db26c[_0x3e9919(0x818)]=Number(RegExp['$1']);if(_0x2dda5c[_0x3e9919(0x13d)](/<GOLD:[ ](\d+)>/i))_0x3db26c[_0x3e9919(0x166)]=Number(RegExp['$1']);},VisuMZ[_0x33ad8c(0x9dd)]['Graphics_defaultStretchMode']=Graphics['_defaultStretchMode'],Graphics[_0x33ad8c(0x695)]=function(){const _0x51847f=_0x33ad8c;switch(VisuMZ[_0x51847f(0x9dd)][_0x51847f(0x828)][_0x51847f(0x113)][_0x51847f(0x27a)]){case'stretch':return!![];case _0x51847f(0x974):return![];default:return VisuMZ[_0x51847f(0x9dd)][_0x51847f(0x73a)]['call'](this);}},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x42a)]=Graphics[_0x33ad8c(0x3a9)],Graphics['printError']=function(_0x562d43,_0x206250,_0xac1974=null){const _0x206029=_0x33ad8c;VisuMZ[_0x206029(0x9dd)][_0x206029(0x42a)][_0x206029(0x439)](this,_0x562d43,_0x206250,_0xac1974),VisuMZ[_0x206029(0x8b1)](![]);},VisuMZ['CoreEngine'][_0x33ad8c(0x401)]=Graphics[_0x33ad8c(0x3ed)],Graphics[_0x33ad8c(0x3ed)]=function(_0x48f182){const _0x451c5e=_0x33ad8c;VisuMZ[_0x451c5e(0x9dd)]['Graphics_centerElement'][_0x451c5e(0x439)](this,_0x48f182),this[_0x451c5e(0x3ff)](_0x48f182);},Graphics['_centerElementCoreEngine']=function(_0xead3d0){const _0x3f1e38=_0x33ad8c;VisuMZ[_0x3f1e38(0x9dd)][_0x3f1e38(0x828)][_0x3f1e38(0x113)][_0x3f1e38(0xa0b)]&&(_0xead3d0['style'][_0x3f1e38(0x3f3)]=_0x3f1e38(0x179));VisuMZ[_0x3f1e38(0x9dd)][_0x3f1e38(0x828)][_0x3f1e38(0x113)][_0x3f1e38(0x5a1)]&&(_0xead3d0[_0x3f1e38(0x27f)][_0x3f1e38(0x93c)]=_0x3f1e38(0x87a));const _0x3cd2b1=Math[_0x3f1e38(0x3f1)](0x0,Math[_0x3f1e38(0x701)](_0xead3d0[_0x3f1e38(0x483)]*this[_0x3f1e38(0x4b1)])),_0x28b3fa=Math[_0x3f1e38(0x3f1)](0x0,Math['floor'](_0xead3d0[_0x3f1e38(0x64c)]*this[_0x3f1e38(0x4b1)]));_0xead3d0['style'][_0x3f1e38(0x483)]=_0x3cd2b1+'px',_0xead3d0[_0x3f1e38(0x27f)][_0x3f1e38(0x64c)]=_0x28b3fa+'px';},VisuMZ[_0x33ad8c(0x9dd)]['Bitmap_initialize']=Bitmap[_0x33ad8c(0x116)]['initialize'],Bitmap['prototype'][_0x33ad8c(0x4b0)]=function(_0x44016c,_0x17bec7){const _0x1da378=_0x33ad8c;VisuMZ[_0x1da378(0x9dd)][_0x1da378(0x281)][_0x1da378(0x439)](this,_0x44016c,_0x17bec7),this[_0x1da378(0x386)]=!(VisuMZ['CoreEngine']['Settings']['QoL'][_0x1da378(0x5a1)]??!![]);},Bitmap[_0x33ad8c(0x116)][_0x33ad8c(0x9ba)]=function(){const _0x5e0ff8=_0x33ad8c;this[_0x5e0ff8(0x795)]=!![];},VisuMZ['CoreEngine'][_0x33ad8c(0x8fd)]=Sprite['prototype'][_0x33ad8c(0x776)],Sprite['prototype'][_0x33ad8c(0x776)]=function(){const _0x30ba05=_0x33ad8c;if(this[_0x30ba05(0x5b0)])VisuMZ[_0x30ba05(0x9dd)][_0x30ba05(0x8fd)][_0x30ba05(0x439)](this);this['destroyCoreEngineMarkedBitmaps']();},Sprite['prototype'][_0x33ad8c(0x734)]=function(){const _0x596b4b=_0x33ad8c;if(!this['bitmap'])return;if(!this[_0x596b4b(0x7d3)][_0x596b4b(0x795)])return;this[_0x596b4b(0x7d3)][_0x596b4b(0x186)]&&!this['_bitmap'][_0x596b4b(0x186)][_0x596b4b(0x910)]&&('AuOaZ'!=='AuOaZ'?_0x278b03[_0x596b4b(0x9dd)]['Sprite_Picture_updateOrigin'][_0x596b4b(0x439)](this):this[_0x596b4b(0x7d3)][_0x596b4b(0x776)]());},VisuMZ['CoreEngine'][_0x33ad8c(0x79f)]=Bitmap[_0x33ad8c(0x116)][_0x33ad8c(0x24c)],Bitmap[_0x33ad8c(0x116)][_0x33ad8c(0x24c)]=function(_0x2a96e6,_0x1dea31){const _0x53ff3b=_0x33ad8c;VisuMZ[_0x53ff3b(0x9dd)][_0x53ff3b(0x79f)][_0x53ff3b(0x439)](this,_0x2a96e6,_0x1dea31),this['markCoreEngineModified']();},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x170)]=Bitmap[_0x33ad8c(0x116)][_0x33ad8c(0x7b4)],Bitmap[_0x33ad8c(0x116)][_0x33ad8c(0x7b4)]=function(_0x4255d1,_0x2cbaee,_0xa0a6ec,_0x58af2e,_0x1402cc,_0x3cae57,_0x100f79,_0x45b685,_0x4eef65){const _0x1d1602=_0x33ad8c;_0x2cbaee=Math[_0x1d1602(0x758)](_0x2cbaee),_0xa0a6ec=Math['round'](_0xa0a6ec),_0x58af2e=Math[_0x1d1602(0x758)](_0x58af2e),_0x1402cc=Math['round'](_0x1402cc),_0x3cae57=Math[_0x1d1602(0x758)](_0x3cae57),_0x100f79=Math['round'](_0x100f79),VisuMZ[_0x1d1602(0x9dd)][_0x1d1602(0x170)][_0x1d1602(0x439)](this,_0x4255d1,_0x2cbaee,_0xa0a6ec,_0x58af2e,_0x1402cc,_0x3cae57,_0x100f79,_0x45b685,_0x4eef65),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x33ad8c(0x5a8)]=Bitmap['prototype']['clearRect'],Bitmap['prototype'][_0x33ad8c(0x3bd)]=function(_0xe225d7,_0x328a86,_0x5a36b0,_0xc85092){const _0x4d02cf=_0x33ad8c;VisuMZ[_0x4d02cf(0x9dd)][_0x4d02cf(0x5a8)]['call'](this,_0xe225d7,_0x328a86,_0x5a36b0,_0xc85092),this['markCoreEngineModified']();},VisuMZ[_0x33ad8c(0x9dd)]['Bitmap_fillRect']=Bitmap['prototype'][_0x33ad8c(0x379)],Bitmap[_0x33ad8c(0x116)]['fillRect']=function(_0x50bee6,_0x59a1d3,_0x549903,_0x576fc1,_0x3b23aa){const _0x96c913=_0x33ad8c;VisuMZ[_0x96c913(0x9dd)][_0x96c913(0x88d)][_0x96c913(0x439)](this,_0x50bee6,_0x59a1d3,_0x549903,_0x576fc1,_0x3b23aa),this[_0x96c913(0x9ba)]();},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x589)]=Bitmap['prototype']['strokeRect'],Bitmap[_0x33ad8c(0x116)][_0x33ad8c(0x134)]=function(_0x3c48a4,_0x42bfa9,_0x44d324,_0x209562,_0x47074b){const _0x58378d=_0x33ad8c;VisuMZ[_0x58378d(0x9dd)]['Bitmap_strokeRect'][_0x58378d(0x439)](this,_0x3c48a4,_0x42bfa9,_0x44d324,_0x209562,_0x47074b),this[_0x58378d(0x9ba)]();},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x785)]=Bitmap[_0x33ad8c(0x116)][_0x33ad8c(0x183)],Bitmap['prototype'][_0x33ad8c(0x183)]=function(_0x2028d3,_0x435d42,_0x1fc0cf,_0x19a86a,_0x534e72,_0x3e68b9,_0x3db520){const _0x20d193=_0x33ad8c;VisuMZ[_0x20d193(0x9dd)][_0x20d193(0x785)][_0x20d193(0x439)](this,_0x2028d3,_0x435d42,_0x1fc0cf,_0x19a86a,_0x534e72,_0x3e68b9,_0x3db520),this[_0x20d193(0x9ba)]();},VisuMZ[_0x33ad8c(0x9dd)]['Bitmap_drawCircle']=Bitmap[_0x33ad8c(0x116)][_0x33ad8c(0x7bb)],Bitmap[_0x33ad8c(0x116)]['drawCircle']=function(_0x2e0b97,_0x29590f,_0xc849dc,_0x5f12a2){const _0x3a4f9a=_0x33ad8c;_0x2e0b97=Math[_0x3a4f9a(0x758)](_0x2e0b97),_0x29590f=Math[_0x3a4f9a(0x758)](_0x29590f),_0xc849dc=Math[_0x3a4f9a(0x758)](_0xc849dc),VisuMZ[_0x3a4f9a(0x9dd)][_0x3a4f9a(0x4c0)]['call'](this,_0x2e0b97,_0x29590f,_0xc849dc,_0x5f12a2),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x33ad8c(0x71e)]=Bitmap['prototype'][_0x33ad8c(0x497)],Bitmap[_0x33ad8c(0x116)][_0x33ad8c(0x497)]=function(_0x3808bb){const _0x3ef943=_0x33ad8c;return Math[_0x3ef943(0x5c7)](VisuMZ[_0x3ef943(0x9dd)][_0x3ef943(0x71e)]['call'](this,_0x3808bb));},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x5ed)]=Bitmap['prototype'][_0x33ad8c(0x2ef)],Bitmap[_0x33ad8c(0x116)]['drawText']=function(_0x48095b,_0x110987,_0x350cb0,_0x11c786,_0x2f7c6f,_0x3ec8e9){const _0x8db0b5=_0x33ad8c;_0x110987=Math[_0x8db0b5(0x758)](_0x110987),_0x350cb0=Math[_0x8db0b5(0x758)](_0x350cb0),_0x11c786=Math[_0x8db0b5(0x758)](_0x11c786),_0x2f7c6f=Math[_0x8db0b5(0x758)](_0x2f7c6f),VisuMZ[_0x8db0b5(0x9dd)][_0x8db0b5(0x5ed)]['call'](this,_0x48095b,_0x110987,_0x350cb0,_0x11c786,_0x2f7c6f,_0x3ec8e9),this[_0x8db0b5(0x9ba)]();},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x1f1)]=Bitmap[_0x33ad8c(0x116)][_0x33ad8c(0x9e4)],Bitmap[_0x33ad8c(0x116)][_0x33ad8c(0x9e4)]=function(_0x3366cf,_0x3ae7e0,_0x325d27,_0x3a0900){const _0x596dd6=_0x33ad8c;VisuMZ[_0x596dd6(0x9dd)][_0x596dd6(0x828)][_0x596dd6(0x113)][_0x596dd6(0x227)]?this[_0x596dd6(0x3b6)](_0x3366cf,_0x3ae7e0,_0x325d27,_0x3a0900):VisuMZ['CoreEngine'][_0x596dd6(0x1f1)]['call'](this,_0x3366cf,_0x3ae7e0,_0x325d27,_0x3a0900);},Bitmap[_0x33ad8c(0x116)][_0x33ad8c(0x3b6)]=function(_0x30681f,_0x151a45,_0x55320d,_0x88bc9a){const _0x1037ba=_0x33ad8c,_0x4e0716=this[_0x1037ba(0x3c5)];_0x4e0716[_0x1037ba(0x577)]=this[_0x1037ba(0x206)],_0x4e0716['fillText'](_0x30681f,_0x151a45+0x2,_0x55320d+0x2,_0x88bc9a);},VisuMZ['CoreEngine']['Input_clear']=Input[_0x33ad8c(0x42c)],Input[_0x33ad8c(0x42c)]=function(){const _0x11a8cf=_0x33ad8c;VisuMZ[_0x11a8cf(0x9dd)][_0x11a8cf(0x3ba)][_0x11a8cf(0x439)](this),this[_0x11a8cf(0x630)]=undefined,this['_inputSpecialKeyCode']=undefined,this[_0x11a8cf(0x262)]=Input[_0x11a8cf(0x7e8)];},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x7c4)]=Input[_0x33ad8c(0x88b)],Input[_0x33ad8c(0x88b)]=function(){const _0xe3471e=_0x33ad8c;VisuMZ['CoreEngine']['Input_update'][_0xe3471e(0x439)](this);if(this[_0xe3471e(0x262)])this['_gamepadWait']--;},VisuMZ['CoreEngine'][_0x33ad8c(0x6e5)]=Input[_0x33ad8c(0x75e)],Input['_pollGamepads']=function(){const _0x2e02ee=_0x33ad8c;if(this[_0x2e02ee(0x262)])return;VisuMZ[_0x2e02ee(0x9dd)][_0x2e02ee(0x6e5)][_0x2e02ee(0x439)](this);},VisuMZ['CoreEngine'][_0x33ad8c(0x7f6)]=Input['_setupEventHandlers'],Input[_0x33ad8c(0x5dc)]=function(){const _0x592560=_0x33ad8c;VisuMZ[_0x592560(0x9dd)][_0x592560(0x7f6)][_0x592560(0x439)](this),document[_0x592560(0x29b)](_0x592560(0x804),this[_0x592560(0x9bd)][_0x592560(0x404)](this));},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x99f)]=Input[_0x33ad8c(0x3a0)],Input[_0x33ad8c(0x3a0)]=function(_0x581c54){const _0x13c2c0=_0x33ad8c;this['_inputSpecialKeyCode']=_0x581c54[_0x13c2c0(0x721)],VisuMZ[_0x13c2c0(0x9dd)][_0x13c2c0(0x99f)][_0x13c2c0(0x439)](this,_0x581c54),this['setLastGamepadUsed'](null);},Input[_0x33ad8c(0x9bd)]=function(_0x1ced75){const _0x1f4c46=_0x33ad8c;this[_0x1f4c46(0x347)](_0x1ced75);},Input['_registerKeyInput']=function(_0x16655d){const _0x145f1a=_0x33ad8c;this['_inputSpecialKeyCode']=_0x16655d['keyCode'];let _0x588846=String['fromCharCode'](_0x16655d[_0x145f1a(0x946)]);this[_0x145f1a(0x630)]===undefined?this[_0x145f1a(0x630)]=_0x588846:this[_0x145f1a(0x630)]+=_0x588846;},VisuMZ['CoreEngine'][_0x33ad8c(0x4e2)]=Input[_0x33ad8c(0x94d)],Input[_0x33ad8c(0x94d)]=function(_0x6efb78){const _0x4f5d8c=_0x33ad8c;if(_0x6efb78===0x8)return![];return VisuMZ[_0x4f5d8c(0x9dd)]['Input_shouldPreventDefault'][_0x4f5d8c(0x439)](this,_0x6efb78);},Input['isSpecialCode']=function(_0x819ce7){const _0x27b07b=_0x33ad8c;if(_0x819ce7['match'](/backspace/i))return this[_0x27b07b(0x268)]===0x8;if(_0x819ce7[_0x27b07b(0x13d)](/enter/i))return this[_0x27b07b(0x268)]===0xd;if(_0x819ce7[_0x27b07b(0x13d)](/escape/i))return this['_inputSpecialKeyCode']===0x1b;},Input[_0x33ad8c(0x492)]=function(){const _0x13fda4=_0x33ad8c;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x13fda4(0x3ec)](this['_inputSpecialKeyCode']);},Input[_0x33ad8c(0x496)]=function(){const _0x22e979=_0x33ad8c;return[0x25,0x26,0x27,0x28][_0x22e979(0x3ec)](this['_inputSpecialKeyCode']);},Input[_0x33ad8c(0x797)]=function(){const _0x1b0e4f=_0x33ad8c;if(navigator['getGamepads']){const _0x4170f7=navigator[_0x1b0e4f(0x6f4)]();if(_0x4170f7){if(_0x1b0e4f(0x418)!==_0x1b0e4f(0x418)){if(_0x4c4047&&_0x2860c6[_0x1b0e4f(0x604)]){if(this[_0x1b0e4f(0x417)](_0x136cbe))return!![];if(this[_0x1b0e4f(0x8d1)](_0x4b070e))return!![];}}else for(const _0x41da7c of _0x4170f7){if(_0x41da7c&&_0x41da7c[_0x1b0e4f(0x604)])return!![];}}}return![];},Input[_0x33ad8c(0x92f)]=function(){const _0x17b6d2=_0x33ad8c;if(navigator[_0x17b6d2(0x6f4)]){const _0x24a62e=navigator[_0x17b6d2(0x6f4)]();if(_0x24a62e){if(_0x17b6d2(0xa0e)!=='nvEta')_0x33cd70[_0x17b6d2(0x579)][0x57]='up',_0x21b7e6[_0x17b6d2(0x579)][0x41]=_0x17b6d2(0x278),_0x4c70b0['keyMapper'][0x53]='down',_0x7eef58[_0x17b6d2(0x579)][0x44]='right',_0x472667['keyMapper'][0x45]=_0x17b6d2(0x23d);else for(const _0x2deb05 of _0x24a62e){if(_0x2deb05&&_0x2deb05[_0x17b6d2(0x604)]){if(this[_0x17b6d2(0x417)](_0x2deb05))return!![];if(this[_0x17b6d2(0x8d1)](_0x2deb05))return!![];}}}}return![];},Input['isGamepadButtonPressed']=function(_0x12d3a9){const _0x3b1cec=_0x33ad8c,_0x333df6=_0x12d3a9[_0x3b1cec(0x700)];for(let _0x226f00=0x0;_0x226f00<_0x333df6[_0x3b1cec(0x1cc)];_0x226f00++){if(_0x333df6[_0x226f00]['pressed'])return!![];}return![];},Input[_0x33ad8c(0x8d1)]=function(_0x4f55bf){const _0x282303=_0x33ad8c,_0x389b56=_0x4f55bf[_0x282303(0x9f0)],_0x116e6f=0.5;if(_0x389b56[0x0]<-_0x116e6f)return!![];if(_0x389b56[0x0]>_0x116e6f)return!![];if(_0x389b56[0x1]<-_0x116e6f)return!![];if(_0x389b56[0x1]>_0x116e6f)return!![];return![];},Input[_0x33ad8c(0x22e)]=function(){const _0x22459a=_0x33ad8c;return this[_0x22459a(0x1d1)]||null;},Input[_0x33ad8c(0x382)]=function(_0x15aaf7){const _0x1d8557=_0x33ad8c;this[_0x1d8557(0x1d1)]=_0x15aaf7;},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x151)]=Input[_0x33ad8c(0x8c9)],Input['_updateGamepadState']=function(_0x5730fc){const _0x3dfc63=_0x33ad8c;VisuMZ[_0x3dfc63(0x9dd)][_0x3dfc63(0x151)][_0x3dfc63(0x439)](this,_0x5730fc);if(this[_0x3dfc63(0x417)](_0x5730fc)||this[_0x3dfc63(0x8d1)](_0x5730fc)){if('FHcWU'==='CMWSx')return _0x78f0ed[_0x3dfc63(0x6c7)][_0x3dfc63(0x2af)][_0x3dfc63(0x439)](this);else this[_0x3dfc63(0x382)](_0x5730fc);}},Input[_0x33ad8c(0x1ef)]=function(){const _0x43da0a=_0x33ad8c;return this[_0x43da0a(0x1d1)]?this['_lastGamepad']['id']:_0x43da0a(0x100);},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x362)]=Tilemap[_0x33ad8c(0x116)][_0x33ad8c(0x6cd)],Tilemap[_0x33ad8c(0x116)][_0x33ad8c(0x6cd)]=function(_0x8e88c1,_0x3aa4a2,_0x1796c7,_0x543d4e){const _0x3904d5=_0x33ad8c;if($gameMap&&$gameMap[_0x3904d5(0x98b)]())return;VisuMZ[_0x3904d5(0x9dd)]['Tilemap_addShadow'][_0x3904d5(0x439)](this,_0x8e88c1,_0x3aa4a2,_0x1796c7,_0x543d4e);},Tilemap['Renderer'][_0x33ad8c(0x116)][_0x33ad8c(0x276)]=function(){const _0x4abac6=_0x33ad8c;this[_0x4abac6(0x21a)]();for(let _0x4ef941=0x0;_0x4ef941<Tilemap['Layer']['MAX_GL_TEXTURES'];_0x4ef941++){const _0x29abbd=new PIXI[(_0x4abac6(0x57c))]();_0x29abbd[_0x4abac6(0x962)](0x800,0x800),VisuMZ[_0x4abac6(0x9dd)]['Settings']['QoL']['PixelateImageRendering']&&(_0x29abbd[_0x4abac6(0x984)]=PIXI[_0x4abac6(0x65d)][_0x4abac6(0x522)]),this[_0x4abac6(0x8fb)][_0x4abac6(0x8f7)](_0x29abbd);}},WindowLayer[_0x33ad8c(0x116)]['isMaskingEnabled']=function(){const _0x23c2da=_0x33ad8c;if(SceneManager&&SceneManager[_0x23c2da(0x90d)]){if('YhemM'===_0x23c2da(0x86c))_0x57ed67(_0x1aaf11),_0xdc104e[_0x23c2da(0x82e)]();else return SceneManager[_0x23c2da(0x90d)]['isWindowMaskingEnabled']();}else return!![];},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x75c)]=WindowLayer[_0x33ad8c(0x116)][_0x33ad8c(0x904)],WindowLayer[_0x33ad8c(0x116)][_0x33ad8c(0x904)]=function render(_0x2fc2f9){const _0x387356=_0x33ad8c;if(this['isMaskingEnabled']()){if(_0x387356(0x165)==='Gtgzr')VisuMZ[_0x387356(0x9dd)][_0x387356(0x75c)][_0x387356(0x439)](this,_0x2fc2f9);else{const _0x564028=_0x1099a8[_0x387356(0x9dd)]['Settings']['ImgLoad'][_0x17c9df],_0x4a1f36=_0x387356(0x529)[_0x387356(0x3e7)](_0x19a5f8);for(const _0x2815a5 of _0x564028){_0xec3866['loadBitmap'](_0x4a1f36,_0x2815a5);}}}else this[_0x387356(0x5ec)](_0x2fc2f9);},WindowLayer[_0x33ad8c(0x116)][_0x33ad8c(0x5ec)]=function render(_0x4e2d51){const _0x307158=_0x33ad8c;if(!this['visible'])return;const _0x5d8c3c=new PIXI[(_0x307158(0x8b6))](),_0x1b70b7=_0x4e2d51['gl'],_0x237d05=this['children'][_0x307158(0x59b)]();_0x4e2d51['framebuffer'][_0x307158(0x551)](),_0x5d8c3c[_0x307158(0x169)]=this['transform'],_0x4e2d51[_0x307158(0x6ae)][_0x307158(0x4b5)](),_0x1b70b7['enable'](_0x1b70b7[_0x307158(0x87c)]);while(_0x237d05['length']>0x0){const _0x1a50cd=_0x237d05[_0x307158(0x203)]();_0x1a50cd[_0x307158(0x1fb)]&&_0x1a50cd[_0x307158(0x736)]&&_0x1a50cd[_0x307158(0x7bc)]>0x0&&(_0x1b70b7[_0x307158(0x9f6)](_0x1b70b7[_0x307158(0x7c0)],0x0,~0x0),_0x1b70b7[_0x307158(0x7a5)](_0x1b70b7['KEEP'],_0x1b70b7['KEEP'],_0x1b70b7[_0x307158(0x47f)]),_0x1a50cd[_0x307158(0x904)](_0x4e2d51),_0x4e2d51[_0x307158(0x6ae)][_0x307158(0x4b5)](),_0x5d8c3c['clear'](),_0x1b70b7['stencilFunc'](_0x1b70b7['ALWAYS'],0x1,~0x0),_0x1b70b7['stencilOp'](_0x1b70b7[_0x307158(0x429)],_0x1b70b7[_0x307158(0x429)],_0x1b70b7[_0x307158(0x429)]),_0x1b70b7[_0x307158(0x6cb)](_0x1b70b7[_0x307158(0x719)],_0x1b70b7[_0x307158(0x655)]),_0x5d8c3c[_0x307158(0x904)](_0x4e2d51),_0x4e2d51[_0x307158(0x6ae)][_0x307158(0x4b5)](),_0x1b70b7[_0x307158(0x6cb)](_0x1b70b7[_0x307158(0x655)],_0x1b70b7[_0x307158(0x9fd)]));}_0x1b70b7[_0x307158(0x903)](_0x1b70b7[_0x307158(0x87c)]),_0x1b70b7[_0x307158(0x42c)](_0x1b70b7[_0x307158(0x33c)]),_0x1b70b7[_0x307158(0x11d)](0x0),_0x4e2d51[_0x307158(0x6ae)]['flush']();for(const _0x3066e9 of this[_0x307158(0x63a)]){if(!_0x3066e9['_isWindow']&&_0x3066e9[_0x307158(0x736)]){if('UzxRv'===_0x307158(0x792)){if(_0x2f7c0a)_0xdd1393[_0x307158(0x682)](_0x3da384);}else _0x3066e9[_0x307158(0x904)](_0x4e2d51);}}_0x4e2d51['batch'][_0x307158(0x4b5)]();},DataManager['isKeyItem']=function(_0x2f311b){const _0x42b1f2=_0x33ad8c;return this[_0x42b1f2(0x3e2)](_0x2f311b)&&_0x2f311b[_0x42b1f2(0x443)]===0x2;},VisuMZ[_0x33ad8c(0x9dd)]['DataManager_setupNewGame']=DataManager[_0x33ad8c(0x141)],DataManager[_0x33ad8c(0x141)]=function(){const _0x1f328d=_0x33ad8c;VisuMZ[_0x1f328d(0x9dd)]['DataManager_setupNewGame'][_0x1f328d(0x439)](this),this[_0x1f328d(0x9c7)](),this[_0x1f328d(0x339)]();},DataManager[_0x33ad8c(0x9c7)]=function(){const _0x153abd=_0x33ad8c;if($gameTemp[_0x153abd(0x4d4)]()){if('lxqfH'==='lxqfH'){const _0x1f5e2e=VisuMZ[_0x153abd(0x9dd)][_0x153abd(0x828)][_0x153abd(0x113)][_0x153abd(0x705)];if(_0x1f5e2e>0x0)$gameTemp[_0x153abd(0x3db)](_0x1f5e2e);}else{if(this['EnableNameInput']()){const _0x3a051f=_0x874464[_0x153abd(0x9dd)][_0x153abd(0x828)]['KeyboardInput'];if(this['_inputWindow']['_mode']===_0x153abd(0x73e))return _0x3a051f[_0x153abd(0x20f)]||_0x153abd(0x20f);}return _0x2562e9[_0x153abd(0x116)][_0x153abd(0x489)][_0x153abd(0x439)](this);}}},DataManager[_0x33ad8c(0x339)]=function(){const _0xad3a37=_0x33ad8c,_0x10210f=VisuMZ[_0xad3a37(0x9dd)][_0xad3a37(0x828)][_0xad3a37(0x113)][_0xad3a37(0x706)]||0x0;if(_0x10210f>0x0)$gameTemp[_0xad3a37(0x3db)](_0x10210f);},DataManager[_0x33ad8c(0x7b2)]=function(_0x40271c){const _0x3b0551=_0x33ad8c,_0x443110=$dataTroops[_0x40271c];if(!_0x443110)return'';let _0x1aa3e5='';_0x1aa3e5+=_0x443110[_0x3b0551(0x62a)];for(const _0x4fc5d1 of _0x443110[_0x3b0551(0x96c)]){for(const _0x5cee42 of _0x4fc5d1[_0x3b0551(0x6d5)]){if(_0x3b0551(0x654)!==_0x3b0551(0x654))return _0xb430ba[_0x3b0551(0x9dd)]['Game_Action_numRepeats']['call'](this);else{if([0x6c,0x198][_0x3b0551(0x949)](_0x5cee42['code'])){if(_0x3b0551(0x835)!=='yvtJW'){const _0x4de880=_0x3bc0f5[_0x3b0551(0x234)];if(_0x4de880===0x1&&this[_0x3b0551(0x146)]()[_0x3b0551(0x83c)]()!==0x1)this[_0x3b0551(0x51a)]();else _0x4de880===0x2&&this[_0x3b0551(0x146)]()[_0x3b0551(0x19c)]()!==0x2?this[_0x3b0551(0x6f0)]():this['setSkill'](_0x4de880);}else _0x1aa3e5+='\x0a',_0x1aa3e5+=_0x5cee42['parameters'][0x0];}}}}return _0x1aa3e5;};(VisuMZ[_0x33ad8c(0x9dd)]['Settings'][_0x33ad8c(0x113)][_0x33ad8c(0x595)]??!![])&&($scene=null,VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x4dd)]=Scene_Base[_0x33ad8c(0x116)][_0x33ad8c(0x8fc)],Scene_Base[_0x33ad8c(0x116)][_0x33ad8c(0x8fc)]=function(){const _0x566135=_0x33ad8c;VisuMZ[_0x566135(0x9dd)][_0x566135(0x4dd)][_0x566135(0x439)](this),$scene=this;},$spriteset=null,VisuMZ['CoreEngine'][_0x33ad8c(0x6f2)]=Scene_Map[_0x33ad8c(0x116)][_0x33ad8c(0x4ce)],Scene_Map[_0x33ad8c(0x116)][_0x33ad8c(0x4ce)]=function(){const _0x2cb9b9=_0x33ad8c;VisuMZ[_0x2cb9b9(0x9dd)][_0x2cb9b9(0x6f2)][_0x2cb9b9(0x439)](this),$spriteset=this['_spriteset'];},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x2c1)]=Scene_Battle[_0x33ad8c(0x116)][_0x33ad8c(0x4ce)],Scene_Battle[_0x33ad8c(0x116)][_0x33ad8c(0x4ce)]=function(){const _0x373342=_0x33ad8c;VisuMZ[_0x373342(0x9dd)][_0x373342(0x2c1)][_0x373342(0x439)](this),$spriteset=this['_spriteset'];},VisuMZ['CoreEngine'][_0x33ad8c(0x14f)]=Scene_Base['prototype'][_0x33ad8c(0x3ca)],Scene_Base[_0x33ad8c(0x116)]['terminate']=function(){const _0x4c6a12=_0x33ad8c;VisuMZ[_0x4c6a12(0x9dd)][_0x4c6a12(0x14f)]['call'](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ['CoreEngine'][_0x33ad8c(0x992)]=BattleManager['update'],BattleManager['update']=function(_0x21caad){const _0x304607=_0x33ad8c;VisuMZ['CoreEngine'][_0x304607(0x992)]['call'](this,_0x21caad),$subject=this[_0x304607(0x4cc)],$targets=this[_0x304607(0x810)],$target=this[_0x304607(0x78f)]||this['_targets'][0x0];},$event=null,VisuMZ['CoreEngine']['Game_Event_start']=Game_Event[_0x33ad8c(0x116)][_0x33ad8c(0x24e)],Game_Event['prototype']['start']=function(){const _0x6291ba=_0x33ad8c;VisuMZ[_0x6291ba(0x9dd)][_0x6291ba(0x923)][_0x6291ba(0x439)](this),$event=this;},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x411)]=Scene_Map['prototype'][_0x33ad8c(0x88b)],Scene_Map['prototype'][_0x33ad8c(0x88b)]=function(){const _0x53345d=_0x33ad8c;VisuMZ['CoreEngine'][_0x53345d(0x411)][_0x53345d(0x439)](this),$gameMap['updateCurrentEvent']();},Game_Map['prototype']['updateCurrentEvent']=function(){const _0x287952=_0x33ad8c;!this[_0x287952(0x41f)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x13c643){const _0x398078=_0x33ad8c;if($gameTemp)$gameTemp[_0x398078(0x3db)](_0x13c643);},$onceParallel=function(_0x2e0fdc){const _0x1a6035=_0x33ad8c;if(SceneManager[_0x1a6035(0x2ab)]())_0x1a6035(0x64a)!==_0x1a6035(0x64a)?this['_startDecrypting']():$scene[_0x1a6035(0xf9)](_0x2e0fdc);else{if(SceneManager['isSceneBattle']()){if(Imported['VisuMZ_1_BattleCore'])$scene[_0x1a6035(0xf9)](_0x2e0fdc);else{if($gameTemp&&$gameTemp[_0x1a6035(0x4d4)]()){if('tTdSY'!=='vpHEy')alert(_0x1a6035(0x2cf));else{const _0x57cdaa=this[_0x1a6035(0x7f3)]();!_0x57cdaa['anchor']()?_0x54e5b1['CoreEngine'][_0x1a6035(0x653)]['call'](this):(this[_0x1a6035(0x968)]['x']=_0x57cdaa[_0x1a6035(0x968)]()['x'],this[_0x1a6035(0x968)]['y']=_0x57cdaa[_0x1a6035(0x968)]()['y']);}}}}else $gameTemp&&$gameTemp[_0x1a6035(0x4d4)]()&&alert('This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!');}});;function _0x2839(){const _0x1b1402=['parallaxes','mhVCx','subjectHitRate','VAPzs','Key%1','ImprovedAccuracySystem','drawCurrentParam','outbounce','horzJS','INOUTQUART','enter','RfupG','bgKhl','_stored_deathColor','_refreshPauseSign','rXPvj','maxLevel','hasEncryptedImages','hscUo','FiCwW','mJbSF','qwOid','UzXCa','startAnimation','NUMPAD4','_pointAnimationQueue','onKeyDown','WIN_OEM_RESET','CommandBgType','LJnKd','updatePositionCoreEngineShakeVert','initMembersCoreEngine','eEtOi','stop','pixelated','Param','STENCIL_TEST','canAttack','mainFontSize','gaugeLineHeight','Scene_Options_create','kmJqD','Game_Picture_move','_targetOffsetY','EscapeAlways','cos','phWIO','itemBackColor1','DisplayedParams','scrollY','WIN_OEM_PA3','update','createPointAnimation','Bitmap_fillRect','_movementWholeDuration','INELASTIC','BuyBgType','valueOutlineColor','》Comment《\x0a%1\x0a','loadMapData','_statusWindow','sparamRate1','indexOf','_currentBgm','KeyItemProtect','updatePositionCoreEngineShakeHorz','XParamVocab6','Duration','F15','seek','command357','TBuUl','setCommonEvent','loadSystemImages','isMenuButtonAssistEnabled','_width','GoldRect','Window_TitleCommand_selectLast','_repositioned','pagedownShowButton','OfdEl','framesPerChar','showPointAnimations','addAnimationSpriteToContainer','Speed','GmkBq','IconParam0','data/','KeySHIFT','ShowDevTools','initCoreEngineScreenShake','ZooAf','_stored_gaugeBackColor','Linear','Graphics','_timerSprite','neqsB','paramMaxJS','mXcva','gYWpn','NumberRect','KePCf','DCthH','Window_StatusBase_drawActorLevel','Sprite_AnimationMV_processTimingData','skills','_stored_powerUpColor','processCursorMove','ActorTPColor','mpGaugeColor1','_shakeSpeed','fOafV','MODECHANGE','_updateGamepadState','_destroyCanvas','hHQaw','_opacity','StatusParamsBgType','STR','_targetX','paglM','isGamepadAxisMoved','darwin','UEvLN','alphabetic','VariableEvalReference','WIN_OEM_PA1','playTestF6','ItemBackColor2','PGDN','buttonAssistText2','TextJS','text','changeClass','PositionY','kzypt','buttonAssistWindowButtonRect','sparamPlus2','WIN_ICO_HELP','mainAreaTop','moveMenuButtonSideButtonLayout','currentValue','battleSystem','ColorTPGauge1','Game_Picture_angle','Flat','gfhWe','OUTSINE','useDigitGroupingEx','_data','JllVG','sqrt','ParseEnemyNotetags','SIHnV','cursorRight','originalJS','AnimationPoint','PictureRotate','isMVAnimation','push','menuShowButton','isOpenAndActive','〘Common\x20Event\x20%1:\x20%2〙\x20Start','_internalTextures','create','Sprite_destroy','Zmmvq','GezjY','xWPbU','processTimingData','MSGtV','disable','render','bIjUK','setCoreEngineUpdateWindowBg','_margin','index','VOLUME_MUTE','_backSprite1','SceneManager_onKeyDown','updateBgmParameters','_scene','PAUSE','isFullDocumentTitle','destroyed','VisuMZ_2_BattleSystemETB','TGR','ENTER','CLOSE_CURLY_BRACKET','MRF','itemLineRect','oVjbv','createCustomBackgroundImages','Window_Selectable_itemRect','Bejso','Unnamed','levelUpRecovery','applyEasingAnglePlus','paramchangeTextColor','VisuMZ_2_BattleSystemSTB','_stored_systemColor','aHtvH','cFXfr','Game_Event_start','offset','IconSParam3','KeyboardInput','Scene_Name_onInputOk','nDfqS','remove','WIN_OEM_ENLW','getLevel','paramFlat','cdGOH','itemRect','isGamepadTriggered','checkSubstitute','_scrollBarHorz','gainItem','MDR','_goldWindow','xparamPlus2','INCUBIC','StatusParamsRect','drawIcon','Game_Picture_scaleY','removeChild','getColor','image-rendering','InputRect','_loadingState','%1〘Choice\x20%2〙\x20%3%1','_active','OpenConsole','processTouch','currentLevelExp','SkillMenu','paintOpacity','charCode','fadeSpeed','ExportCurMapText','includes','emayh','MaxDuration','isEventTest','_shouldPreventDefault','createWindowLayer','loadTitle2','rpJaz','restore','_scrollBarVert','PDR','YXNOb','setHandler','isGameActive','filters','processTouchModernControls','BKSP','mRhpr','scaleSprite','rgba(0,\x200,\x200,\x201.0)','openURL','onXhrError','targetObjects','<JS\x20%1\x20%2:[\x20](.*)>','Game_BattlerBase_refresh','setSize','bitmapWidth','abs','LEFT','expRate','ShiftR_Toggle','anchor','faces','command105','JWmSr','pages','TjPmT','encounterStep','FDyLV','changeAnglePlusData','OKXCz','_startPlaying','isAlive','normal','anchorCoreEasing','buttonAssistKey5','F18','XqYJy','displayName','rgba(0,\x200,\x200,\x200.7)','MultiKeyFmt','isCollidedWithEvents','Game_Action_setAttack','xdg-open','fillAll','determineSideButtonLayoutValid','SwitchRandomizeRange','colSpacing','StatusRect','scaleMode','uDoyd','outlineColorDmg','characters','paCPM','innerHeight','Icon','areTileShadowsHidden','PXeff','maxBattleMembers','maxScrollY','Sprite_Animation_setViewport','_scaleX','Game_System_initialize','BattleManager_update','Sprite_Gauge_currentValue','en-US','playLoad','Plus1','ydliT','SlotBgType','Scene_MenuBase_createCancelButton','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','makeActionList','ExportStrFromAllMaps','trim','_onError','Input_onKeyDown','version','ActorHPColor','rFiTJ','option','globalAlpha','Scene_MenuBase_mainAreaTop','ndzdN','WIN_OEM_COPY','wVOUX','vwRZU','URKCa','updateAnchor','drawGauge','ProfileBgType','isEnemy','_bitmap','FTB','loadIconBitmap','wrXAS','_menuButton','fYEjV','ShowJS','XParamVocab8','refreshScrollBarBitmap','random','Center','markCoreEngineModified','processDigitChange','Game_Picture_updateRotation','_onKeyPress','HHkPf','DrawItemBackgroundJS','useDigitGrouping','BACK_SLASH','setMainFontSize','TftnC','show','ColorDeath','nWyrx','reservePlayTestNewGameCommonEvent','INQUINT','destroyContents','isInputting','applyCoreEasing','mute','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','5867bODijR','RevertPreserveNumbers','BarOffset','setAction','_stored_tpCostColor','onlyfilename','Flat1','WFLvN','Game_Action_numRepeats','checkScrollBarBitmap','Origin','KFHgG','ShiftT_Toggle','onInputBannedWords','Window_NameInput_cursorPageup','CoreEngine','isNwjs','outlineColorGauge','IconParam6','getBackgroundOpacity','setSideButtonLayout','asin','_drawTextOutline','boIqN','rqixS','BTestWeapons','Scene_GameEnd_createBackground','SwitchActorText','scaleY','slotWindowRect','original','_listWindow','F12','TextStr','axes','HANJA','_shakePower','numberWindowRect','Scene_MenuBase_mainAreaHeight','retrievePointAnimation','stencilFunc','maxItems','hfowk','Sprite_AnimationMV_updatePosition','center','Exported_Script_%1.txt','DJcuY','ONE_MINUS_SRC_ALPHA','processPointAnimationRequests','getInputMultiButtonStrings','addOnceParallelInterpreter','EViJp','menu','rXgxn','updateScrollBars','initCoreEngine','Game_Action_itemEva','_sellWindow','targetPosition','mpGaugeColor2','INOUTBOUNCE','FontSmoothing','CTB','DebugConsoleLastControllerID','nvEta','hpColor','_drawTextBody','rsZCu','AnimationMirrorOffset','getControllerInputButtonString','nLbUB','xparam','windowPadding','Sprite_Button_updateOpacity','paramRate2','Padding','Window_Selectable_cursorDown','_battleField','iconHeight','initRotation','Scene_Status_create','pow','scrollUp','ItemBackColor1','MapNameTextCode','Location','jsQuickFunc','_digitGrouping','getInputButtonString','textSizeEx','yAgXf','buttonAssistText3','ColorMaxLvGauge2','textWidth','QUOTE','playOnceParallelInterpreter','_changingClass','_phase','setActorHomeRepositioned','MAXHP','updateTransform','scaleX','Keyboard','_stored_hpGaugeColor2','HelpBgType','removeAnimation','replace','Window_NameInput_processTouch','mainCommandWidth','changeTextColor','F23','OUTQUART','randomJS','processFauxAnimationRequests','EquipMenu','stypeId','cAerG','close','gainGold','ENTER_SPECIAL','makeCommandList','QoL','quit','Scene_Shop_create','prototype','isTpb','OcqZf','ctrlKey','EnableJS','FnwwG','item','clearStencil','MCR','playBuzzer','coreEngineRepositionEnemies','_shakeDuration','animationId','setWindowPadding','GroupDigits','OptionsRect','textColor','profileWindowRect','WIN_OEM_FJ_JISHO','Scene_MenuBase_createBackground','DOLLAR','BattleSystem','updateMove','updatePositionCoreEngine','XtvBz','ALTGR','1.3.0','command122','setDisplayPos','Qcyub','strokeRect','CIRCUMFLEX','paramWidth','drawFace','getParameter','Window_Base_drawText','exportAllTroopStrings','animationNextDelay','paramY','match','Total','_blank','setFrame','setupNewGame','endBattlerActions','VPHwE','usableSkills','updatePositionCoreEngineShakeRand','subject','(\x5cd+)>','deflate','Scene_Boot_updateDocumentTitle','Control\x20Variables\x20Script\x20Error','sparamFlat1','gameTitle','10PBKzfv','pTNhE','Scene_Base_terminate','getPointAnimationLayer','Input_updateGamepadState','focus','HfdBG','Basic','3617424DfYXZU','removeOnceParallelInterpreter','getButtonAssistLocation','hIrNO','NUM','itemHitImprovedAccuracy','lastAnimationSprite','TitlePicButtons','makeDocumentTitle','PTB','IVbnz','CustomParamAbb','createCancelButton','resetFontSettings','note','updateData','Gtgzr','gold','Psizm','DEF','transform','RIGHT','_targetAnchor','StartID','drawActorSimpleStatus','performEscape','setViewport','Bitmap_blt','maxVisibleItems','_currentBgs','easingType','Game_Actor_levelUp','Scene_Skill_create','SystemSetSideView','updateMotion','sceneTerminationClearEffects','none','GoldOverlap','URYxk','paramMax','scale','Window_Selectable_processTouch','deselect','ActorBgType','csNtc','BattleManager_checkSubstitute','gradientFillRect','RCTmn','endAction','_baseTexture','bfhEk','buttonAssistOffset5','RISNC','_offsetY','Window_NameInput_cursorDown','createTextPopupWindow','checkCoreEngineDisplayCenter','Title','_targetOffsetX','cursorLeft','ParseClassNotetags','OutlineColorGauge','drawRightArrow','updateFauxAnimations','eUyMZ','_tilemap','PRINTSCREEN','maxLvGaugeColor1','sin','scrollX','EnableNumberInput','guardSkillId','ctGaugeColor1','IconParam5','INBOUNCE','showDevTools','currentExp','EnableMasking','drawParamName','eVUFM','setEnemyAction','SceneManager_initialize','vRFkc','gVEbI','_makeFontNameText','GoldBgType','pointX','Rate1','ewdMF','_clickHandler','IconParam4','ecdLQ','playBgm','updateDocumentTitle','INQUART','Scene_Map_createSpritesetFix','isActor','createJsQuickFunction','drawTextTopAligned','dimColor2','UNDERSCORE','EncounterRateMinimum','processAlwaysEscape','BattleManager_processEscape','meUMN','ExtractStrFromMap','pSOmP','findSymbol','trEeM','test','AdjustAngle','ColorManager_loadWindowskin','TPB\x20WAIT','scrollRight','ARRAYJSON','Remdi','Enemy-%1-%2','imKNY','HVUjY','length','Opacity','_windowLayer','EISU','NHslw','_lastGamepad','Symbol','BottomButtons','OUTQUINT','createCommandWindow','qkUQs','INOUTBACK','IPjrL','pgEMK','ColorNormal','Max','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','OffBarColor','_updateFilterArea','IconSParam4','rqEGd','WIN_ICO_00','DisplayLockY','qbAFZ','_helpWindow','_fauxAnimationSprites','Sprite_Picture_loadBitmap','_baseSprite','PictureEraseAll','fontSize','WcJAE','get','pageup','YnDtg','iGPUp','getLastUsedGamepadType','Plus2','Bitmap_drawTextOutline','buttonAssistOffset4','TextCodeNicknames','BoxMargin','isLoopHorizontal','dimColor1','_actorWindow','Class-%1-%2','ColorHPGauge2','eEAWl','_isWindow','createPointAnimationTargets','gaugeRate','toLowerCase','_origin','IconSParam2','EditBgType','backOpacity','shift','platform','buttonAssistText1','outlineColor','AntiZoomPictures','sFsJk','updateBackOpacity','bgmVolume','BuyRect','F7key','doesNameContainBannedWords','qbnRI','Finish','Game_Picture_initRotation','PA1','F10','ParseStateNotetags','JSON','dropItems','_optionsWindow','encounterStepsMinimum','buttonAssistKey1','isEnabled','_destroyInternalTextures','GET','helpAreaTop','measureTextWidthNoRounding','offColor','displayY','Scene_Unlisted','IXloj','WVBuy','initBasic','maxLvGaugeColor2','RowSpacing','ybWxn','FontShadows','ParseAllNotetags','_closing','Game_Map_scrollDown','Window_EquipItem_isEnabled','SParamVocab7','gWduJ','getLastGamepadUsed','lineHeight','imageSmoothingEnabled','createButtonAssistWindow','BTestItems','tileWidth','skillId','GimOo','isMapScrollLinked','Window_Base_update','filter','SParamVocab1','initialBattleSystem','operation','current','pagedown','WIN_OEM_FJ_LOYA','showFauxAnimations','BgFilename2','Game_BattlerBase_initMembers','isBottomButtonMode','loading','NyHUL','cVHMA','okPiB','LoadError','ARRAYNUM','YLqjh','SystemLoadAudio','_lastOrigin','resize','Window_Base_drawFace','start','RepositionEnemies','eva','clearOnceParallelInterpreters','_commonEventLayers','MAX_SAFE_INTEGER','STB','LiJTy','_opening','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','parameters','buttonAssistWindowSideRect','AudioChangeBgmPan','FeQYm','QDDjK','CONVERT','setMute','setSideView','gbnAO','Rate','_gamepadWait','animationBaseDelay','0.00','_targetScaleX','GREATER_THAN','wYfGO','_inputSpecialKeyCode','advanced','IconXParam1','TextFmt','Map%1','createFauxAnimation','status','getCombinedScrollingText','createBuffer','NUeaz','sparam','SEMICOLON','gFDdF','pdIoB','_createInternalTextures','diWfo','left','wgbkh','AutoStretch','cursorUp','sFnRL','Scene_Battle_createCancelButton','isNormalPriority','style','XwTbj','Bitmap_initialize','IconParam3','_displayY','_duration','VariableJsBlock','win32','hpGaugeColor1','select','ExtJS','SceneManager_isGameActive','getColorDataFromPluginParameters','ZsFYT','Window_NameInput_processHandling','F16','ipWDS','ScreenShake','INQUAD','EQUALS','onKeyDownKeysF6F7','Game_Picture_show','MapOnceParallel','TRG','parse','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','ctrl','_storedStack','addEventListener','tpCostColor','MinDuration','altKey','_context','pbrhp','Game_Picture_initBasic','checkCacheKey','blockWidth','%1〘Choice\x20Cancel〙%1','makeCoreEngineCommandList','params','F19','mhp','ParseWeaponNotetags','targetScaleY','isSceneMap','NUMPAD3','processHandling','meVolume','HelpRect','drawActorExpGauge','bgm','TextPopupShow','deactivate','font','ParamName','ShowScrollBar','Mute','substring','nickname','FontWidthFix','processSoundTimings','DimColor1','nah','Scene_Boot_startNormalGame','activate','startNormalGame','Scene_Battle_createSpriteset','bgsVolume','evaluate','xScrollLinkedOffset','wFXmq','ExtractStrFromList','createTextState','SETTINGS','VOLUME_DOWN','removeAllFauxAnimations','listWindowRect','ButtonAssist','_cacheScaleY','wrwgJ','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','IconSet','Type','bjkjC','%1%2','shake','requiredWtypeId1','setAnchor','SwitchRandomizeOne','moveCancelButtonSideButtonLayout','AllMaps','inbounce','playCancel','crisisColor','URL','makeTargetSprites','LATIN1','tpGaugeColor2','contentsBack','updatePositionCoreEngineShakeOriginal','FWCiw','_cache','SplitEscape','_mirror','Scene_Title_drawGameTitle','INOUTCUBIC','_list','processMoveCommand','ApplyEasing','canEquip','IconSParam9','WIN_OEM_CLEAR','drawText','TEssO','concat','updateScrollBarVisibility','WsOZR','ScaleY','allowShiftScrolling','PictureEasingType','INOUTQUINT','calcCoreEasing','oeJgR','clearZoom','〘Show\x20Text〙\x0a','isSceneBattle','dKxBC','updateEffekseer','actor','_mapNameWindow','battlebacks1','MDF','_clientArea','FxJKQ','Smooth','PanUz','ctGaugeColor2','LINEAR','9149526TDBWdb','key%1','Sprite_Actor_setActorHome','drawAllParams','djTzv','createFauxAnimationSprite','Y:\x20%1','updateMainMultiply','LUK','XParamVocab7','CreateBattleSystemID','drawGameTitle','_timeDuration','initialLevel','_animationQueue','_storedMapText','XParamVocab3','onClick','GoldIcon','_offsetX','BTestArmors','_cancelButton','TRAIT_PARAM','ConvertParams','ZYYkY','lOMjq','buttonAssistText%1','WIN_OEM_BACKTAB','SnapshotOpacity','DocumentTitleFmt','DisplayLockX','_backSprite2','integer','toFixed','Enable','Window_Base_destroyContents','pop','WkMSJ','playEscape','ttyVU','aZJHL','oxFqR','JUNJA','Game_Interpreter_command122','eZnlA','process_VisuMZ_CoreEngine_jsQuickFunctions','consumable','oVdSn','reserveNewGameCommonEvent','xSrFw','EVAL','STENCIL_BUFFER_BIT','catchNormalError','targetOpacity','_height','pos','bzCsn','updateAnglePlus','isPressed','VisuMZ_2_BattleSystemBTB','CTRL','HEOet','_registerKeyInput','wMmxQ','_lastCommandSymbol','XhLeq','OkText','BlurFilter','aVEVv','itemHit','Scene_Map_initialize','hideButtonFromView','Scene_Menu_create','getControllerInputButtonMatch','playOk','RGJaW','ARRAYEVAL','expParams','SystemSetBattleSystem','QdmVS','OUTEXPO','INSINE','recoverAll','kgwko','VisuMZ_4_UniqueTileEffects','isForFriend','QrLMA','DETACH_PICTURE_CONTAINER','rsvCs','Tilemap_addShadow','uUYnj','wrsvU','numberShowButton','down','NUMPAD9','ColorPowerDown','innerWidth','sRWHl','LGshM','itemHeight','buyWindowRect','_stored_powerDownColor','DummyRect','EHjtW','uYNcG','FheUG','stringKeyMap','description','iKflo','command355','NUMPAD6','CustomParamNames','fillRect','forceOutOfPlaytest','wWVaf','helpAreaHeight','number','mainAreaBottom','nnnBL','erasePicture','yppUy','setLastGamepadUsed','MtNsS','vwrmZ','SMGfL','_smooth','INEXPO','process_VisuMZ_CoreEngine_Settings','createDigits','clipboard','maxHorz','LiAhv','retreat','overallWidth','Current\x20tileset\x20has\x20incomplete\x20flag\x20data.','OPEN_BRACKET','EEouW','gRcVs','_playtestF7Looping','onload','isRightInputMode','mLlsB','Weapon-%1-%2','TSyWg','VisuMZ_2_BattleSystemFTB','SubfolderParse','paramPlusJS','OptionsMenu','IconIndex','_forcedBattleSys','_backgroundSprite','_onKeyDown','isMaxLevel','EVA','windowRect','onMoveEnd','isWindowMaskingEnabled','resetTextColor','MRG','expGaugeColor2','printError','BlurStrength','makeInputButtonString','ksWbp','MEV','gaskA','writeText','updateBgsParameters','Chance','40rxjfIE','dummyWindowRect','UmYTU','updateRotation','_drawTextShadow','process_VisuMZ_CoreEngine_Functions','ColorMPGauge2','F11','Input_clear','rynRN','onDatabaseLoaded','clearRect','SideButtons','setCoreEngineScreenShakeStyle','processEscape','xparamRate1','ZmFUH','ButtonFadeSpeed','END','context','GameEnd','_isPlaytest','_viewportSize','overrideMimeType','terminate','addQueue','INSERT','setAnglePlusData','paramFlatBonus','AccuracyBoost','BgType','addLoadListener','titles1','CANCEL','thickness','MLhLJ','ShowActorLevel','XParamVocab9','_pictureCoordinatesMode','applyForcedGameTroopSettingsCoreEngine','SCROLL_LOCK','reserveCommonEvent','UShIe','PreserveNumbers','hLWpl','Window_NameInput_refresh','IDs','enemy','isItem','vVadE','gndCa','_skillTypeWindow','SzWQx','format','〘Common\x20Event\x20%1:\x20%2〙\x20End','_mainSprite','RequireFocus','_playTestFastMode','contains','_centerElement','_bgsBuffer','hide','_textQueue','max','createMenuButton','font-smooth','refreshDimmerBitmap','targetBackOpacity','_screenY','buttonAssistWindowRect','AjMkn','TXYFy','process_VisuMZ_CoreEngine_Notetags','cursorDown','maxScrollX','Scene_Item_create','goldWindowRect','_centerElementCoreEngine','ExportAllMapText','Graphics_centerElement','dPvBy','SCROLLBAR','bind','RvDAc','iconWidth','SkGCI','processKeyboardBackspace','IconXParam7','_targetScaleY','helpAreaTopSideButtonLayout','currentClass','16009GTiHUS','_pictureContainer','tHDLl','paAMs','Scene_Map_update','isClosed','drawGameVersion','MainMenu','toXCc','TextManager_param','isGamepadButtonPressed','nZgBj','buttonAssistKey%1','AMPERSAND','inBattle','_anchor','actorWindowRect','Game_Interpreter_command355','isEventRunning','_buttonType','level','xHXgZ','Mirror','type','_pictureName','string','xparamRate2','drawItem','REPLACE','Graphics_printError','INOUTELASTIC','clear','setMoveEasingType','YMGuU','snapForBackground','isSideButtonLayout','_encounterCount','UVgzv','Game_Map_setup','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','Game_Action_itemHit','isOpen','RZpPn','refresh','call','battlebacks2','JenPH','paramPlus','isAnimationPlaying','lQBNR','getKeyboardInputButtonString','Game_Interpreter_updateWaitMode','LineHeight','OutlineColorDmg','itypeId','OutlineColor','smallParamFontSize','targetX','top','viewport','ETB','AQoSf','DamageColor','updateText','playTestF7','IconXParam5','ParseSkillNotetags','WIN_OEM_FJ_MASSHOU','StatusBgType','drawValue','_muteSound','_displayX','toUpperCase','addChildToBack','open','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','updateLastTarget','Window_Base_drawCharacter','_coreEasing','updateScrollBarPosition','PmZNc','PictureCoordinatesMode','updateCoreEasing','SellRect','_movementDuration','arePageButtonsEnabled','RPGMAKER_VERSION','addCommand','EditRect','ZOOM','text%1','_stored_mpGaugeColor2','maxScrollbar','Window_NameInput_initialize','SsMpf','_stored_mpGaugeColor1','Scene_Map_updateScene','3860792JUVsWo','_cacheScaleX','Scene_MenuBase_createPageButtons','ItemBgType','GoldFontSize','isPhysical','CRSEL','processKeyboardHandling','_pagedownButton','updateWaitMode','log','_digitGroupingEx','ParseArmorNotetags','processKeyboardDelete','Spriteset_Base_initialize','createEnemies','snMbl','KEEP','ItemRect','code','clamp','width','PageChange','ListBgType','_pauseSignSprite','MAT','Game_Picture_scaleX','buttonAssistText4','playMiss','Spriteset_Base_isAnimationPlaying','setupCoreEngine','Window_NumberInput_start','ActorMPColor','isSpecialCode','BgFilename1','canUse','isNumpadPressed','SParamVocab0','VOLUME_UP','_downArrowSprite','isArrowPressed','measureTextWidth','F24','Gold','DrawIcons','Window_Selectable_processCursorMove','ARRAYFUNC','IconParam1','MPsqv','_lastY','JxwxA','FDR','result','([\x5c+\x5c-]\x5cd+)([%％])>','_tempActor','offsetX','baseId','(\x5cd+)([%％])>','DATABASE','gainSilentTp','nw.gui','drawActorClass','Game_Actor_changeClass','drawNewParam','_categoryWindow','CNT','initialize','_realScale','switchModes','isCancelled','framesMin','flush','startAutoNewGame','statusParamsWindowRect','TargetAngle','_anglePlus','_hp','_commandWindow','_stored_expGaugeColor1','_slotWindow','setupRate','Plus','Bitmap_drawCircle','XvMwm','NnIVu','isScrollBarVisible','LhHci','join','_animation','Game_Picture_x','levelUp','resetBattleSystem','isExpGaugeDrawn','ewmfH','_subject','Scene_Boot_onDatabaseLoaded','createSpriteset','EXSEL','cILaT','scrollDown','_allTextHeight','storeMapData','isPlaytest','BeBgi','OUTBACK','Scene_MenuBase_helpAreaTop','SXcdx','popScene','Game_Interpreter_command105','constructor','AudioChangeBgsPitch','Scene_Base_create','vRizN','IconSParam7','HASH','systemColor','Input_shouldPreventDefault','Color','_editWindow','kAUgJ','origin','updateScene','Name','rpDKf','Window_Gold_refresh','RYSZv','_mp','ItemStyle','ItemPadding','setColorTone','SwitchToggleOne','createBackground','CommandWidth','_statusEquipWindow','setLastPluginCommandInterpreter','updateMain','F17','CEV','repositionCancelButtonSideButtonLayout','paramValueByName','displayX','hFthG','responseText','fGdyl','uBjrZ','GRD','ModernControls','cQOzR','huKfI','isKeyItem','drawBackgroundRect','updateOpacity','ePePA','calcEasing','_isButtonHidden','wscIB','clearForcedGameTroopSettingsCoreEngine','updateOnceParallelInterpreters','_lastPluginCommandInterpreter','ParamArrow','SystemSetFontSize','ColSpacing','PictureFilename','IconXParam3','SideView','right','setupValueFont','Window_Base_initialize','SmartEventCollisionPriority','_stored_maxLvGaugeColor1','setupBattleTestItems','src','setAttack','RZQKw','SSkIQ','eygwf','zHAIu','CwXUI','DigitGroupingExText','OTB','NEAREST','Scene_Map_updateMainMultiply','App','OdNFp','scrollbarHeight','Window_Base_createContents','FlEZb','img/%1/','sparamFlatJS','Scene_Battle_update','atypeId','setup','drawSegment','mDNTz','_lastScrollBarValues','tpColor','isCursorMovable','FadeSpeed','loadTitle1','NUMPAD5','AnimationID','Abbreviation','TILDE','XulBo','sparamFlatBonus','initDigitGrouping','Game_Picture_calcEasing','NUMPAD0','enemies','itemSuccessRate','DOWN','DigitGroupingLocale','rowSpacing','OffBarOpacity','ForceNoPlayTest','QwertyLayout','LvExpGauge','mTTnZ','X:\x20%1','sjgOB','DigitGroupingStandardText','NewGameBoot','buttonAssistSwitch','SwitchToggleRange','getCoreEngineScreenShakeStyle','buttonAreaHeight','catchException','forceStencil','Window_Base_drawIcon','IconXParam2','ButtonHeight','createCustomParameter','_pageupButton','wICzV','isUseModernControls','Game_Action_updateLastTarget','xparamPlus','ldqWD','_spriteset','iQTPd','UXtmQ','_onceParallelInterpreters','ControllerButtons','missed','boxHeight','Game_Screen_initialize','ScreenResolution','GetParamIcon','home','pVIVZ','isAnimationForEach','CONTEXT_MENU','cjazH','IconXParam6','smooth','cTrLD','WKOhd','startMove','updateClose','padZero','Swsli','MenuBg','262293PHfbQZ','_battlerName','RWIgL','fillStyle','ZaySW','keyMapper','powerUpColor','tab','BaseTexture','isLoopVertical','areButtonsOutsideMainUI','setupButtonImage','_buyWindow','buttonAssistKey3','%1/','cancel','AutoScrollLockY','RHXiI','_action','dashToggle','AiSYN','Bitmap_strokeRect','itemEva','ParseActorNotetags','ColorPowerUp','Manual','TPB\x20ACTIVE','enabled','playBgs','5mXxkmo','_hideTileShadows','pitch','ecYrm','ShortcutScripts','hpGaugeColor2','TCR','ExportAllTroopText','initRotationCoreEngine','mainAreaHeight','clone','BTB','adjustSprite','YmWwT','_inputWindow','Game_Interpreter_command111','PixelateImageRendering','_scaleY','ExportString','ATK','pictures','onActorChange','XParamVocab5','Bitmap_clearRect','getCustomBackgroundSettings','bfAiw','zMugi','requestPointAnimation','Version','GOqLm','onButtonImageLoad','_texture','_startDecrypting','gaugeBackColor','IconParam2','Game_Event_isCollidedWithEvents','Spriteset_Battle_createEnemies','CallHandlerJS','OENZx','_upArrowSprite','ValueJS','SHIFT','zoomScale','AutoScrollLockX','filterArea','turn','wEVTW','MINUS','Vrmvi','SParamVocab4','contents','processCursorHomeEndTrigger','IconSParam6','addChild','ceil','allTiles','seVolume','_pointAnimationSprites','CLEAR','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','pNMjx','MenuLayout','setupScrollBarBitmap','createPointAnimationSprite','evaded','SellBgType','tiaXn','Window_ShopSell_isEnabled','ActorRect','(\x5cd+\x5c.?\x5cd+)>','AudioChangeBgmPitch','process_VisuMZ_CoreEngine_RegExp','endAnimation','ShowItemBackground','ALT','_setupEventHandlers','SAMkb','_scrollDuration','<%1\x20%2:[\x20]','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','alpha','gQqRk','createKeyJS','value','TAB','StatusEquipRect','SParamVocab3','F6key','addWindow','traitObjects','OnLoadJS','renderNoMask','Bitmap_drawText','createDimmerSprite','NUMPAD7','tileHeight','checkPlayerLocation','HYPHEN_MINUS','MAXMP','createFauxAnimationQueue','ColorMPGauge1','ExportStrFromAllTroops','default','isBottomHelpMode','_backSprite','members','RegExp','split','_CoreEngineSettings','Enemy','ProfileRect','_refreshBack','OUJcK','removeAnimationFromContainer','166ZZTQjo','connected','Spriteset_Base_updatePosition','_stored_crisisColor','targetEvaRate','dUgLT','GjKRy','dDOZI','bKWmj','_itemWindow','wholeDuration','OpenSpeed','XParamVocab4','expGaugeColor1','Game_Character_processMoveCommand','Window_NameInput_cursorPagedown','faceHeight','pan','maxCols','isTriggered','commandWindowRows','_stored_mpCostColor','updatePadding','F20','RUhjz','_maxDigits','removeAllPointAnimations','ControllerMatches','bitmapHeight','cursorPageup','6480969LnUGgl','helpWindowRect','TXqro','WIN_OEM_FJ_TOUROKU','isPlaying','mainAreaTopSideButtonLayout','learnings','_stored_expGaugeColor2','etypeId','name','NwGfl','isPointAnimationPlaying','PLAY','repWa','_effectsContainer','_inputString','playCursorSound','requestMotion','yScrollLinkedOffset','WIN_OEM_ATTN','_text','needsUpdate','TitleCommandList','Sprite_Button_initialize','setEasingType','children','performMiss','Scene_Boot_loadSystemImages','koktn','CbBNW','centerCameraCheckData','_backgroundFilter','_windowskin','EXECUTE','rightArrowWidth','_coreEasingType','wait','mmp','KeyTAB','padding','wnaqI','IeZoH','Game_Map_scrollLeft','height','cancelShowButton','AmAfg','_mode','SceneManager_exit','tilesets','successRate','Sprite_Picture_updateOrigin','fYBbH','ONE','loadWindowskin','updatePlayTestF7','initButtonHidden','randomInt','Game_Map_scrollRight','backspace','Window_Selectable_cursorUp','SCALE_MODES','VisuMZ_2_BattleSystemCTB','itemBackColor2','Game_Picture_updateMove','Rqmtc','HbwPh','vert','titles2','isAnimationOffsetXMirrored','【%1】\x0a','zwyXU','CustomParam','smoothSelect','YTlKL','CAPSLOCK','OpenURL','xiGhU','ParseItemNotetags','_fauxAnimationQueue','WIN_OEM_FINISH','_pressed','setBackgroundType','HBZAb','drawParamText','checkSmartEventCollision','drawActorLevel','createPointAnimationQueue','system','loadGameImagesCoreEngine','CLOSE_PAREN','ParamMax','checkPassage','currencyUnit','F21','end','target','PvXwn','ParseTilesetNotetags','sparamPlusJS','itemPadding','consumeItem','OUTCIRC','isSmartEventCollisionOn','createContents','_targetOpacity','TZlmn','_originalViewport','Game_Picture_y','_statusParamsWindow','SaveMenu','SDcnv','OPEN_PAREN','active','volume','registerCommand','loadBitmap','_defaultStretchMode','slice','CategoryBgType','isBusy','VTGAQ','DTB','SELECT','setViewportCoreEngineFix','background','skillTypeWindowRect','BkQRI','nTjhq','valueOutlineWidth','pLDkJ','_centerCameraCheck','_stored_ctGaugeColor2','CustomParamIcons','NoTileShadows','drawIconBySize','EOQYF','itemWindowRect','_buttonAssistWindow','map','EYQfI','buttonY','batch','xparamFlatBonus','updateDashToggle','LKDCj','aZFUW','VIEWPORT','_rate','SParamVocab8','StatusEquipBgType','CRI','isDying','vsWIg','process_VisuMZ_CoreEngine_ControllerButtons','targetY','Rate2','_showDevTools','vertJS','_actor','CrisisRate','\x0a\x0a\x0a\x0a\x0a','RightMenus','CancelText','textHeight','backgroundBitmap','getLastPluginCommandInterpreter','layoutSettings','Spriteset_Base_update','IconSParam0','OptionsBgType','blendFunc','defineProperty','_addShadow','areButtonsHidden','Window_Selectable_drawBackgroundRect','offsetY','INOUTCIRC','VisuMZ_1_OptionsCore','qPLKI','drawBackground','list','Iejwh','command111','sparamRate','_bgmBuffer','IconXParam8','JQzyZ','wigIC','_targetY','save','Game_Troop_setup','CxWYm','_commandList','buttonAssistCancel','updatePictureSettings','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','Input_pollGamepads','terms','_hideButtons','yKVYq','moveRelativeToResolutionChange','refreshActor','optSideView','INOUTSINE','BottomHelp','CommandRect','openingSpeed','setGuard','_sideButtonLayout','Scene_Map_createSpriteset','Item-%1-%2','getGamepads','events','Window_NameInput_cursorUp','ujZmZ','UpdatePictureCoordinates','defaultInputMode','xparamRate','%1\x0a','ColorTPCost','SystemLoadImages','AudioChangeBgmVolume','targetSpritePosition','buttons','floor','PHA','enableDigitGrouping','updatePictureAntiZoom','NewGameCommonEvent','NewGameCommonEventAll','WIN_OEM_FJ_ROYA','Window_Scrollable_update','MvAnimationRate','xLcGq','ListRect','setTargetAnchor','escape','ZaAcp','ATTN','GgXGb','paramRate','SOxxG','paramBaseAboveLevel99','equips','initVisuMZCoreEngine','_dimmerSprite','_pictureCoordinatesWindow','_image','ZERO','initCoreEasing','BTestAddedQuantity','drawGameSubtitle','LnHRO','Bitmap_measureTextWidth','waiting','tsDrM','keyCode','isFauxAnimationPlaying','ADD','button','OwteI','buttonAssistKey4','Window_MapName_refresh','GwzCi','showIncompleteTilesetError','HVHag','GoldChange','FttpL','adjustBoxSize','vsnvt','and\x20add\x20it\x20onto\x20this\x20one.','removeFauxAnimation','repositionEnemiesByResolution','min','playTestShiftT','destroyCoreEngineMarkedBitmaps','measureText','visible','updateKeyText','Scene_Name_create','MDgFJ','Graphics_defaultStretchMode','ImgLoad','isItemStyle','adjustPictureAntiZoom','keyboard','selectLast','VisuMZ_2_BattleSystemOTB','Window_Base_createTextState','process_VisuMZ_CoreEngine_CustomParameters','catchLoadError','OUTBOUNCE','windowOpacity','SParameterFormula','saveViewport','drawCharacter','scrollLeft','OEYIr','pictureButtons','isRepeated','WIN_OEM_WSCTRL','mpColor','HDTBe','ExtDisplayedParams','ExtractStrFromTroop','hWaBk','duration','pavyQ','INCIRC','SPACE','operand','round','mainAreaHeightSideButtonLayout','buttonAssistText5','Match','WindowLayer_render','_dummyWindow','_pollGamepads','_moveEasingType','Wait','Game_Map_setDisplayPos','_balloonQueue','VcbtM','animationShouldMirror','sv_enemies','battlerHue','mSpHn','bbXgJ','Scene_Map_createSpriteset_detach','OUTQUAD','targets','_onLoad','_forcedTroopView','animations','ARRAYSTR','child_process','LoadMenu','CustomParamType','%1〘End\x20Choice\x20Selection〙%1','ZRkGK','JvsqZ','destroy','AGI','kIIfX','WASD','Game_Interpreter_PluginCommand','contentsOpacity','pDjqD','xparamFlat1','JCtGE','_textPopupWindow','IconSParam8','LfyLm','urykl','NnIOv','catchUnknownError','Bitmap_gradientFillRect','angle','ItemHeight','opacity','bgs','eventsXyNt','Window_StatusBase_drawActorSimpleStatus','BACK_QUOTE','BasicParameterFormula','_screenX','_target','CommonEventID','oHDvM','yLFop','_lastX','numRepeats','_customModified','textBaseline','isGamepadConnected','_animationSprites','ColorGaugeBack','return\x200','FontSize','HELP','reduce','DDkyV','Bitmap_resize','DOUBLE_QUOTE','yYruR','LevelUpFullHp','sparamRateJS','EXR','stencilOp','#%1','%2%1%3','WIN_ICO_CLEAR','grXxp','TextCodeClassNames','PHozO','commandWindowRect','DimColor2','mobsO','pictureId','VisuMZ_2_BattleSystemPTB','_coreEngineShakeStyle','createTroopNote','_stored_pendingColor','blt','isSideView','applyEasing','oUGTg','NUMPAD1','move','processCursorMoveModernControls','drawCircle','openness','_colorCache','wYnlt','DELETE','EQUAL','Game_Temp_initialize','repeat','exportAllMapStrings','Input_update','rVHwg','_troopId','initMembers','LEyHr','xBXCh','TimeProgress','gaugeHeight','ACCEPT','titleCommandWindow','PictureID','WIN_OEM_JUMP','aiFkC','jsonToZip','yVCyH','bitmap','dZWCs','isAutoColorAffected','ItemMenu','KWcBx','Sprite_Animation_processSoundTimings','cursorPagedown','_profileWindow','IconXParam9','SkillTypeRect','CommandList','skillTypes','Flat2','boxWidth','sRWCZ','Spriteset_Base_destroy','SlotRect','makeAutoBattleActions','NxOqV','paramName','DummyBgType','keyRepeatWait','setupCustomRateCoreEngine','HIT','sparamPlus','centerY','baseTextRect','paramBase','onerror','([\x5c+\x5c-]\x5cd+)>','EnableNameInput','NumberBgType','picture','clearCachedKeys','updateDuration','Input_setupEventHandlers','sv_actors','mirror','parseForcedGameTroopSettingsCoreEngine','AfppJ','SkillTypeBgType','ColorMaxLvGauge1','playCursor','movePageButtonSideButtonLayout','atbActive','bNwgE','Scene_Map_createMenuButton','InputBgType','loadPicture','keypress','makeFontSmaller','playTestShiftR','PLUS','auzEU','processBack','isOptionValid','vYbLB','numActions','PositionX','mapId','OCDyk','_targets','Axtcx','subtitle','OS_KEY','HRG','OPEN_CURLY_BRACKET','worldTransform','toLocaleString','exp','lUiad','Sprite_Battler_startMove','drawTextEx','F13','sellWindowRect','_colorTone','ABrBs','Ofepa','KANA','setValue','createPageButtons','paramFlatJS','Scene_Battle_createSpriteset_detach','DigitGroupingDamageSprites','Sprite_Gauge_gaugeRate','Settings','Scene_Base_terminateAnimationClearBugFix','ASTERISK','Game_Party_consumeItem','updatePictureCoordinates','updateOrigin','exit','centerX','setClickHandler','ShowButtons','scrollbar','_stored_ctGaugeColor1','apply','yvtJW','Uvesg','DefaultMode','EndingID','Window','XParameterFormula','kSOFh','attackSkillId','param','ESC','khEUz','REC','alwaysDash','updatePosition','〘Scrolling\x20Text〙\x0a','_number','qfYDy','bskuQ','processKeyboardDigitChange','statusWindowRect','touchUI','BannedWords','Window_NumberInput_processDigitChange','INBACK','ShopMenu','targetContentsOpacity','hit','removePointAnimation','Window_NameInput_cursorRight','omfOM','processKeyboardEnd','drawGoldItemStyle','getBattleSystem','setBackgroundOpacity','Subtitle'];_0x2839=function(){return _0x1b1402;};return _0x2839();}StorageManager[_0x33ad8c(0x7d1)]=function(_0x4ef480){return new Promise((_0x10484c,_0x1e6071)=>{const _0x4bf156=_0x4703;if('zDxvH'!=='zDxvH')_0x267644+=_0x5cadac+'\x0a',_0x41e544+=_0x4bf156(0x2fb),_0x288f3d[_0x4bf156(0x258)][0x4]!==''&&_0x18fc4b[_0x4bf156(0x258)][0x4]!==_0x3e06f9&&(_0x3bf1dc+=_0x4bf156(0x666)[_0x4bf156(0x3e7)](_0x12e2c9['parameters'][0x4]));else try{const _0x5e48a6=pako[_0x4bf156(0x148)](_0x4ef480,{'to':_0x4bf156(0x426),'level':0x1});if(_0x5e48a6[_0x4bf156(0x1cc)]>=0xc350){}_0x10484c(_0x5e48a6);}catch(_0x601a1){_0x1e6071(_0x601a1);}});},TextManager[_0x33ad8c(0x373)]=['','','',_0x33ad8c(0x3d3),'','',_0x33ad8c(0x79c),'','BACKSPACE',_0x33ad8c(0x5e5),'','',_0x33ad8c(0x5cb),_0x33ad8c(0x913),_0x33ad8c(0x111),'',_0x33ad8c(0x5ba),_0x33ad8c(0x345),_0x33ad8c(0x5db),_0x33ad8c(0x90e),_0x33ad8c(0x66b),_0x33ad8c(0x821),_0x33ad8c(0x1cf),_0x33ad8c(0x333),'FINAL',_0x33ad8c(0x9f1),'',_0x33ad8c(0x83e),_0x33ad8c(0x25d),'NONCONVERT',_0x33ad8c(0x7cc),_0x33ad8c(0x8c8),_0x33ad8c(0x756),'PGUP',_0x33ad8c(0x8d9),_0x33ad8c(0x3c4),'HOME',_0x33ad8c(0x965),'UP',_0x33ad8c(0x16a),_0x33ad8c(0x540),_0x33ad8c(0x69b),'PRINT',_0x33ad8c(0x642),_0x33ad8c(0x197),_0x33ad8c(0x3cc),_0x33ad8c(0x7bf),'','0','1','2','3','4','5','6','7','8','9','COLON',_0x33ad8c(0x273),'LESS_THAN',_0x33ad8c(0x292),_0x33ad8c(0x266),'QUESTION_MARK','AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x33ad8c(0x813),'',_0x33ad8c(0x569),'','SLEEP',_0x33ad8c(0x53d),_0x33ad8c(0x7b8),'NUMPAD2',_0x33ad8c(0x2ac),_0x33ad8c(0x870),_0x33ad8c(0x535),_0x33ad8c(0x377),_0x33ad8c(0x5ef),'NUMPAD8',_0x33ad8c(0x367),'MULTIPLY',_0x33ad8c(0x723),'SEPARATOR','SUBTRACT','DECIMAL','DIVIDE','F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x33ad8c(0x212),_0x33ad8c(0x3b9),_0x33ad8c(0x9ee),_0x33ad8c(0x81c),'F14',_0x33ad8c(0x89c),_0x33ad8c(0x28e),_0x33ad8c(0x4f6),_0x33ad8c(0x977),_0x33ad8c(0x2a7),_0x33ad8c(0x61a),_0x33ad8c(0x67e),'F22',_0x33ad8c(0x108),_0x33ad8c(0x498),'','','','','','','','','NUM_LOCK',_0x33ad8c(0x3da),_0x33ad8c(0x128),_0x33ad8c(0x450),_0x33ad8c(0x624),_0x33ad8c(0x23e),_0x33ad8c(0x707),'','','','','','','','','',_0x33ad8c(0x135),'EXCLAMATION',_0x33ad8c(0x7a0),_0x33ad8c(0x4e0),_0x33ad8c(0x12a),'PERCENT',_0x33ad8c(0x41a),_0x33ad8c(0x1b9),_0x33ad8c(0x690),_0x33ad8c(0x67a),_0x33ad8c(0x82a),_0x33ad8c(0x807),'PIPE',_0x33ad8c(0x5f2),_0x33ad8c(0x815),_0x33ad8c(0x914),_0x33ad8c(0x538),'','','','',_0x33ad8c(0x909),_0x33ad8c(0x2c9),_0x33ad8c(0x494),'','',_0x33ad8c(0x273),_0x33ad8c(0x292),'COMMA',_0x33ad8c(0x5c0),'PERIOD','SLASH',_0x33ad8c(0x78c),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x33ad8c(0x390),_0x33ad8c(0x9c1),'CLOSE_BRACKET',_0x33ad8c(0xf8),'','META',_0x33ad8c(0x12f),'',_0x33ad8c(0x8e2),_0x33ad8c(0x1e1),'',_0x33ad8c(0x7a8),'','',_0x33ad8c(0x873),_0x33ad8c(0x7cf),_0x33ad8c(0x8d6),'WIN_OEM_PA2',_0x33ad8c(0x88a),_0x33ad8c(0x74d),'WIN_OEM_CUSEL',_0x33ad8c(0x634),_0x33ad8c(0x670),_0x33ad8c(0x9a7),'WIN_OEM_AUTO',_0x33ad8c(0x92a),_0x33ad8c(0x324),_0x33ad8c(0x70f),_0x33ad8c(0x474),_0x33ad8c(0x4cf),'EREOF',_0x33ad8c(0x62d),_0x33ad8c(0x466),'',_0x33ad8c(0x211),_0x33ad8c(0x2ee),''],TextManager['buttonAssistOk']=VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x828)][_0x33ad8c(0x2cc)][_0x33ad8c(0x34b)],TextManager['buttonAssistCancel']=VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x828)][_0x33ad8c(0x2cc)][_0x33ad8c(0x6c3)],TextManager['buttonAssistSwitch']=VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x828)][_0x33ad8c(0x2cc)][_0x33ad8c(0x9e9)],VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x416)]=TextManager['param'],TextManager['param']=function(_0x50f874){const _0xe13046=_0x33ad8c;return typeof _0x50f874===_0xe13046(0x37d)?VisuMZ[_0xe13046(0x9dd)][_0xe13046(0x416)][_0xe13046(0x439)](this,_0x50f874):this[_0xe13046(0x7e6)](_0x50f874);},TextManager[_0x33ad8c(0x7e6)]=function(_0x25b8eb){const _0x548c7e=_0x33ad8c;_0x25b8eb=String(_0x25b8eb||'')[_0x548c7e(0x455)]();const _0x74a23e=VisuMZ['CoreEngine'][_0x548c7e(0x828)][_0x548c7e(0x87b)];if(_0x25b8eb===_0x548c7e(0xfd))return $dataSystem[_0x548c7e(0x6e6)][_0x548c7e(0x2a6)][0x0];if(_0x25b8eb===_0x548c7e(0x5f3))return $dataSystem['terms'][_0x548c7e(0x2a6)][0x1];if(_0x25b8eb===_0x548c7e(0x5a4))return $dataSystem[_0x548c7e(0x6e6)][_0x548c7e(0x2a6)][0x2];if(_0x25b8eb===_0x548c7e(0x168))return $dataSystem[_0x548c7e(0x6e6)][_0x548c7e(0x2a6)][0x3];if(_0x25b8eb===_0x548c7e(0x487))return $dataSystem[_0x548c7e(0x6e6)]['params'][0x4];if(_0x25b8eb===_0x548c7e(0x302))return $dataSystem[_0x548c7e(0x6e6)][_0x548c7e(0x2a6)][0x5];if(_0x25b8eb===_0x548c7e(0x777))return $dataSystem[_0x548c7e(0x6e6)][_0x548c7e(0x2a6)][0x6];if(_0x25b8eb===_0x548c7e(0x311))return $dataSystem[_0x548c7e(0x6e6)][_0x548c7e(0x2a6)][0x7];if(_0x25b8eb===_0x548c7e(0x7ea))return _0x74a23e['XParamVocab0'];if(_0x25b8eb==='EVA')return _0x74a23e['XParamVocab1'];if(_0x25b8eb===_0x548c7e(0x6b7))return _0x74a23e['XParamVocab2'];if(_0x25b8eb===_0x548c7e(0x4f7))return _0x74a23e[_0x548c7e(0x319)];if(_0x25b8eb===_0x548c7e(0x3ad))return _0x74a23e[_0x548c7e(0x60f)];if(_0x25b8eb==='MRF')return _0x74a23e[_0x548c7e(0x5a7)];if(_0x25b8eb===_0x548c7e(0x4af))return _0x74a23e[_0x548c7e(0x89a)];if(_0x25b8eb===_0x548c7e(0x814))return _0x74a23e[_0x548c7e(0x312)];if(_0x25b8eb===_0x548c7e(0x3a7))return _0x74a23e[_0x548c7e(0x9b6)];if(_0x25b8eb===_0x548c7e(0x296))return _0x74a23e[_0x548c7e(0x3d7)];if(_0x25b8eb===_0x548c7e(0x912))return _0x74a23e[_0x548c7e(0x493)];if(_0x25b8eb===_0x548c7e(0x4ff))return _0x74a23e[_0x548c7e(0x239)];if(_0x25b8eb===_0x548c7e(0x840))return _0x74a23e['SParamVocab2'];if(_0x25b8eb===_0x548c7e(0x702))return _0x74a23e[_0x548c7e(0x5e7)];if(_0x25b8eb===_0x548c7e(0x11e))return _0x74a23e[_0x548c7e(0x5c2)];if(_0x25b8eb===_0x548c7e(0x597))return _0x74a23e['SParamVocab5'];if(_0x25b8eb===_0x548c7e(0x953))return _0x74a23e['SParamVocab6'];if(_0x25b8eb==='MDR')return _0x74a23e[_0x548c7e(0x22c)];if(_0x25b8eb==='FDR')return _0x74a23e[_0x548c7e(0x6b5)];if(_0x25b8eb===_0x548c7e(0x7a4))return _0x74a23e['SParamVocab9'];if(VisuMZ[_0x548c7e(0x9dd)]['CustomParamNames'][_0x25b8eb])return VisuMZ['CoreEngine']['CustomParamNames'][_0x25b8eb];return'';},TextManager['getInputButtonString']=function(_0xa1e668){const _0x569185=_0x33ad8c,_0xe7bf77=Input['getLastUsedGamepadType']();return _0xe7bf77===_0x569185(0x100)?this[_0x569185(0x43f)](_0xa1e668):this[_0x569185(0xa13)](_0xe7bf77,_0xa1e668);},TextManager[_0x33ad8c(0x43f)]=function(_0x1ba7fe){const _0x1fa65b=_0x33ad8c,_0x352d02=VisuMZ['CoreEngine']['Settings'][_0x1fa65b(0x2cc)][_0x1fa65b(0x2e5)];if(!_0x352d02){if(_0x1fa65b(0x782)!==_0x1fa65b(0x782))_0x39d379[_0x1fa65b(0x7ff)]=![];else{if(_0x1ba7fe===_0x1fa65b(0x583))_0x1ba7fe=_0x1fa65b(0x70d);if(_0x1ba7fe===_0x1fa65b(0xa02))_0x1ba7fe=_0x1fa65b(0x70d);}}let _0x3dd4aa=[];for(let _0x4a3b85 in Input['keyMapper']){_0x4a3b85=Number(_0x4a3b85);if(_0x4a3b85>=0x60&&_0x4a3b85<=0x69)continue;if([0x12,0x20][_0x1fa65b(0x949)](_0x4a3b85))continue;_0x1ba7fe===Input[_0x1fa65b(0x579)][_0x4a3b85]&&_0x3dd4aa[_0x1fa65b(0x8f7)](_0x4a3b85);}for(let _0x3f3479=0x0;_0x3f3479<_0x3dd4aa['length'];_0x3f3479++){_0x3dd4aa[_0x3f3479]=TextManager[_0x1fa65b(0x373)][_0x3dd4aa[_0x3f3479]];}return this[_0x1fa65b(0x3ab)](_0x3dd4aa);},TextManager['makeInputButtonString']=function(_0x3026a0){const _0x9e917b=_0x33ad8c,_0x43a4d4=VisuMZ[_0x9e917b(0x9dd)][_0x9e917b(0x828)][_0x9e917b(0x2cc)],_0x37d42e=_0x43a4d4['KeyUnlisted'],_0x22d7ec=_0x3026a0[_0x9e917b(0x32d)](),_0x2ffb01=_0x9e917b(0x85c)[_0x9e917b(0x3e7)](_0x22d7ec);return _0x43a4d4[_0x2ffb01]?_0x43a4d4[_0x2ffb01]:_0x37d42e[_0x9e917b(0x3e7)](_0x22d7ec);},TextManager[_0x33ad8c(0x9ff)]=function(_0x17d09e,_0x537ccd){const _0x3950cb=_0x33ad8c,_0x4cb137=VisuMZ[_0x3950cb(0x9dd)][_0x3950cb(0x828)][_0x3950cb(0x2cc)],_0x5441a0=_0x4cb137[_0x3950cb(0x97b)],_0x30766c=this[_0x3950cb(0xa26)](_0x17d09e),_0x2b4e2e=this[_0x3950cb(0xa26)](_0x537ccd);return _0x5441a0[_0x3950cb(0x3e7)](_0x30766c,_0x2b4e2e);},TextManager[_0x33ad8c(0xa13)]=function(_0x166692,_0x50c644){const _0x52113c=_0x33ad8c,_0x4af7a3=_0x166692[_0x52113c(0x1fe)]()[_0x52113c(0x99d)](),_0x5cf67c=VisuMZ[_0x52113c(0x9dd)][_0x52113c(0x560)][_0x4af7a3];if(!_0x5cf67c)return this[_0x52113c(0x352)](_0x166692,_0x50c644);return _0x5cf67c[_0x50c644]||this[_0x52113c(0x43f)](_0x166692,_0x50c644);},TextManager['getControllerInputButtonMatch']=function(_0x49e78c,_0x3f1ad2){const _0x39bb9c=_0x33ad8c,_0x9c2e07=_0x49e78c[_0x39bb9c(0x1fe)]()[_0x39bb9c(0x99d)]();for(const _0x17abb4 in VisuMZ[_0x39bb9c(0x9dd)][_0x39bb9c(0x61e)]){if(_0x9c2e07[_0x39bb9c(0x949)](_0x17abb4)){const _0x448e69=VisuMZ[_0x39bb9c(0x9dd)]['ControllerMatches'][_0x17abb4],_0x1e4d67=VisuMZ[_0x39bb9c(0x9dd)]['ControllerButtons'][_0x448e69];return _0x1e4d67[_0x3f1ad2]||this[_0x39bb9c(0x43f)](_0x3f1ad2);}}return this[_0x39bb9c(0x43f)](_0x3f1ad2);},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x1c4)]=ColorManager[_0x33ad8c(0x656)],ColorManager[_0x33ad8c(0x656)]=function(){const _0x54334e=_0x33ad8c;VisuMZ[_0x54334e(0x9dd)]['ColorManager_loadWindowskin'][_0x54334e(0x439)](this),this[_0x54334e(0x7bd)]=this[_0x54334e(0x7bd)]||{};},ColorManager[_0x33ad8c(0x28b)]=function(_0x41163a,_0x1cb25c){const _0x4cba5e=_0x33ad8c;return _0x1cb25c=String(_0x1cb25c),this[_0x4cba5e(0x7bd)]=this['_colorCache']||{},_0x1cb25c[_0x4cba5e(0x13d)](/#(.*)/i)?'iuIwf'==='iuIwf'?this[_0x4cba5e(0x7bd)][_0x41163a]=_0x4cba5e(0x7a6)[_0x4cba5e(0x3e7)](String(RegExp['$1'])):_0x406cf3[_0x4cba5e(0x316)]=_0x46248f['min'](_0x23b3c5(_0x3486d1['$1']),_0x572e21[_0x4cba5e(0x868)]):this[_0x4cba5e(0x7bd)][_0x41163a]=this[_0x4cba5e(0x126)](Number(_0x1cb25c)),this[_0x4cba5e(0x7bd)][_0x41163a];},ColorManager[_0x33ad8c(0x93b)]=function(_0x74ce07){const _0x4fa8fb=_0x33ad8c;_0x74ce07=String(_0x74ce07);if(_0x74ce07[_0x4fa8fb(0x13d)](/#(.*)/i)){if(_0x4fa8fb(0x8d0)!==_0x4fa8fb(0x7d4))return'#%1'['format'](String(RegExp['$1']));else{if(_0x36ce37)_0x2abc03[_0x4fa8fb(0x47a)](_0x1178f6);}}else{if('PfIhY'!==_0x4fa8fb(0x699))return this[_0x4fa8fb(0x126)](Number(_0x74ce07));else this['processTouchModernControls']();}},ColorManager[_0x33ad8c(0x7f4)]=function(){const _0x30d2ae=_0x33ad8c;this[_0x30d2ae(0x7bd)]={};},ColorManager['normalColor']=function(){const _0x193a9d=_0x33ad8c,_0x329252='_stored_normalColor';this['_colorCache']=this[_0x193a9d(0x7bd)]||{};if(this[_0x193a9d(0x7bd)][_0x329252])return this[_0x193a9d(0x7bd)][_0x329252];const _0x3d7889=VisuMZ['CoreEngine'][_0x193a9d(0x828)][_0x193a9d(0x4e3)][_0x193a9d(0x1da)];return this[_0x193a9d(0x28b)](_0x329252,_0x3d7889);},ColorManager[_0x33ad8c(0x4e1)]=function(){const _0x13cdac=_0x33ad8c,_0x2c0a3a=_0x13cdac(0x920);this[_0x13cdac(0x7bd)]=this[_0x13cdac(0x7bd)]||{};if(this['_colorCache'][_0x2c0a3a])return this[_0x13cdac(0x7bd)][_0x2c0a3a];const _0x3750fe=VisuMZ[_0x13cdac(0x9dd)][_0x13cdac(0x828)]['Color']['ColorSystem'];return this[_0x13cdac(0x28b)](_0x2c0a3a,_0x3750fe);},ColorManager[_0x33ad8c(0x2dc)]=function(){const _0x3723cc=_0x33ad8c,_0x4ba33a=_0x3723cc(0x606);this[_0x3723cc(0x7bd)]=this[_0x3723cc(0x7bd)]||{};if(this['_colorCache'][_0x4ba33a])return this['_colorCache'][_0x4ba33a];const _0x273dce=VisuMZ[_0x3723cc(0x9dd)][_0x3723cc(0x828)][_0x3723cc(0x4e3)]['ColorCrisis'];return this[_0x3723cc(0x28b)](_0x4ba33a,_0x273dce);},ColorManager['deathColor']=function(){const _0x3c0f80=_0x33ad8c,_0x1db30f=_0x3c0f80(0x865);this[_0x3c0f80(0x7bd)]=this[_0x3c0f80(0x7bd)]||{};if(this[_0x3c0f80(0x7bd)][_0x1db30f])return this[_0x3c0f80(0x7bd)][_0x1db30f];const _0x2a2e61=VisuMZ[_0x3c0f80(0x9dd)][_0x3c0f80(0x828)][_0x3c0f80(0x4e3)][_0x3c0f80(0x9c5)];return this['getColorDataFromPluginParameters'](_0x1db30f,_0x2a2e61);},ColorManager[_0x33ad8c(0x5b2)]=function(){const _0x476891=_0x33ad8c,_0x58c4fc=_0x476891(0x8b4);this['_colorCache']=this[_0x476891(0x7bd)]||{};if(this[_0x476891(0x7bd)][_0x58c4fc])return this[_0x476891(0x7bd)][_0x58c4fc];const _0x2150a1=VisuMZ[_0x476891(0x9dd)][_0x476891(0x828)][_0x476891(0x4e3)][_0x476891(0x799)];return this[_0x476891(0x28b)](_0x58c4fc,_0x2150a1);},ColorManager[_0x33ad8c(0x287)]=function(){const _0x134051=_0x33ad8c,_0x55167d='_stored_hpGaugeColor1';this[_0x134051(0x7bd)]=this[_0x134051(0x7bd)]||{};if(this[_0x134051(0x7bd)][_0x55167d])return this[_0x134051(0x7bd)][_0x55167d];const _0x5c1dde=VisuMZ[_0x134051(0x9dd)][_0x134051(0x828)]['Color']['ColorHPGauge1'];return this['getColorDataFromPluginParameters'](_0x55167d,_0x5c1dde);},ColorManager[_0x33ad8c(0x596)]=function(){const _0x38d797=_0x33ad8c,_0x18a1df=_0x38d797(0x101);this['_colorCache']=this[_0x38d797(0x7bd)]||{};if(this['_colorCache'][_0x18a1df])return this[_0x38d797(0x7bd)][_0x18a1df];const _0x3a6035=VisuMZ[_0x38d797(0x9dd)][_0x38d797(0x828)]['Color'][_0x38d797(0x1f9)];return this['getColorDataFromPluginParameters'](_0x18a1df,_0x3a6035);},ColorManager[_0x33ad8c(0x8c5)]=function(){const _0x4ce982=_0x33ad8c,_0x1af13c=_0x4ce982(0x46c);this['_colorCache']=this[_0x4ce982(0x7bd)]||{};if(this['_colorCache'][_0x1af13c])return this[_0x4ce982(0x7bd)][_0x1af13c];const _0xcb9915=VisuMZ[_0x4ce982(0x9dd)]['Settings'][_0x4ce982(0x4e3)][_0x4ce982(0x5f5)];return this[_0x4ce982(0x28b)](_0x1af13c,_0xcb9915);},ColorManager[_0x33ad8c(0xa09)]=function(){const _0x3ea319=_0x33ad8c,_0x47cd24=_0x3ea319(0x468);this['_colorCache']=this[_0x3ea319(0x7bd)]||{};if(this['_colorCache'][_0x47cd24])return this['_colorCache'][_0x47cd24];const _0x11bd17=VisuMZ[_0x3ea319(0x9dd)][_0x3ea319(0x828)][_0x3ea319(0x4e3)][_0x3ea319(0x3b8)];return this[_0x3ea319(0x28b)](_0x47cd24,_0x11bd17);},ColorManager['mpCostColor']=function(){const _0x138093=_0x33ad8c,_0x571a15='_stored_mpCostColor';this[_0x138093(0x7bd)]=this[_0x138093(0x7bd)]||{};if(this['_colorCache'][_0x571a15])return this[_0x138093(0x7bd)][_0x571a15];const _0x3baf04=VisuMZ['CoreEngine'][_0x138093(0x828)]['Color']['ColorMPCost'];return this[_0x138093(0x28b)](_0x571a15,_0x3baf04);},ColorManager[_0x33ad8c(0x57a)]=function(){const _0x42b8f8=_0x33ad8c,_0x58fb92='_stored_powerUpColor';this['_colorCache']=this[_0x42b8f8(0x7bd)]||{};if(this['_colorCache'][_0x58fb92])return this['_colorCache'][_0x58fb92];const _0x39ee94=VisuMZ['CoreEngine'][_0x42b8f8(0x828)][_0x42b8f8(0x4e3)][_0x42b8f8(0x58c)];return this[_0x42b8f8(0x28b)](_0x58fb92,_0x39ee94);},ColorManager['powerDownColor']=function(){const _0x5cc928=_0x33ad8c,_0x5e3ea9=_0x5cc928(0x36e);this['_colorCache']=this[_0x5cc928(0x7bd)]||{};if(this[_0x5cc928(0x7bd)][_0x5e3ea9])return this['_colorCache'][_0x5e3ea9];const _0x3f10ed=VisuMZ[_0x5cc928(0x9dd)][_0x5cc928(0x828)][_0x5cc928(0x4e3)][_0x5cc928(0x368)];return this[_0x5cc928(0x28b)](_0x5e3ea9,_0x3f10ed);},ColorManager[_0x33ad8c(0x19d)]=function(){const _0x44a253=_0x33ad8c,_0x629aff=_0x44a253(0x833);this['_colorCache']=this[_0x44a253(0x7bd)]||{};if(this[_0x44a253(0x7bd)][_0x629aff])return this[_0x44a253(0x7bd)][_0x629aff];const _0x33d757=VisuMZ[_0x44a253(0x9dd)][_0x44a253(0x828)][_0x44a253(0x4e3)]['ColorCTGauge1'];return this[_0x44a253(0x28b)](_0x629aff,_0x33d757);},ColorManager[_0x33ad8c(0x307)]=function(){const _0x1e2777=_0x33ad8c,_0x5ae65a=_0x1e2777(0x6a4);this[_0x1e2777(0x7bd)]=this[_0x1e2777(0x7bd)]||{};if(this[_0x1e2777(0x7bd)][_0x5ae65a])return this[_0x1e2777(0x7bd)][_0x5ae65a];const _0x3f6dd6=VisuMZ[_0x1e2777(0x9dd)]['Settings'][_0x1e2777(0x4e3)]['ColorCTGauge2'];return this['getColorDataFromPluginParameters'](_0x5ae65a,_0x3f6dd6);},ColorManager['tpGaugeColor1']=function(){const _0x3ba659=_0x33ad8c,_0x199017='_stored_tpGaugeColor1';this[_0x3ba659(0x7bd)]=this[_0x3ba659(0x7bd)]||{};if(this[_0x3ba659(0x7bd)][_0x199017])return this[_0x3ba659(0x7bd)][_0x199017];const _0x5eba2c=VisuMZ[_0x3ba659(0x9dd)][_0x3ba659(0x828)][_0x3ba659(0x4e3)][_0x3ba659(0x8e7)];return this[_0x3ba659(0x28b)](_0x199017,_0x5eba2c);},ColorManager[_0x33ad8c(0x2e0)]=function(){const _0x4b884d=_0x33ad8c,_0x12d832='_stored_tpGaugeColor2';this[_0x4b884d(0x7bd)]=this[_0x4b884d(0x7bd)]||{};if(this[_0x4b884d(0x7bd)][_0x12d832])return this['_colorCache'][_0x12d832];const _0x50f484=VisuMZ[_0x4b884d(0x9dd)][_0x4b884d(0x828)][_0x4b884d(0x4e3)]['ColorTPGauge2'];return this['getColorDataFromPluginParameters'](_0x12d832,_0x50f484);},ColorManager[_0x33ad8c(0x29c)]=function(){const _0xa75e65=_0x33ad8c,_0x2e6992=_0xa75e65(0x9d2);this[_0xa75e65(0x7bd)]=this[_0xa75e65(0x7bd)]||{};if(this['_colorCache'][_0x2e6992])return this[_0xa75e65(0x7bd)][_0x2e6992];const _0xf4403b=VisuMZ[_0xa75e65(0x9dd)][_0xa75e65(0x828)][_0xa75e65(0x4e3)][_0xa75e65(0x6fc)];return this[_0xa75e65(0x28b)](_0x2e6992,_0xf4403b);},ColorManager['pendingColor']=function(){const _0x47f2ea=_0x33ad8c,_0x4eca10=_0x47f2ea(0x7b3);this[_0x47f2ea(0x7bd)]=this[_0x47f2ea(0x7bd)]||{};if(this[_0x47f2ea(0x7bd)][_0x4eca10])return this[_0x47f2ea(0x7bd)][_0x4eca10];const _0x44309d=VisuMZ[_0x47f2ea(0x9dd)]['Settings'][_0x47f2ea(0x4e3)][_0x47f2ea(0x6fc)];return this['getColorDataFromPluginParameters'](_0x4eca10,_0x44309d);},ColorManager[_0x33ad8c(0x610)]=function(){const _0x43eca4=_0x33ad8c,_0x58bb78=_0x43eca4(0x4bc);this[_0x43eca4(0x7bd)]=this[_0x43eca4(0x7bd)]||{};if(this[_0x43eca4(0x7bd)][_0x58bb78])return this['_colorCache'][_0x58bb78];const _0x4e8e7f=VisuMZ[_0x43eca4(0x9dd)]['Settings']['Color']['ColorExpGauge1'];return this[_0x43eca4(0x28b)](_0x58bb78,_0x4e8e7f);},ColorManager['expGaugeColor2']=function(){const _0x393ca8=_0x33ad8c,_0x5b3880=_0x393ca8(0x628);this[_0x393ca8(0x7bd)]=this['_colorCache']||{};if(this[_0x393ca8(0x7bd)][_0x5b3880])return this[_0x393ca8(0x7bd)][_0x5b3880];const _0x1804e7=VisuMZ[_0x393ca8(0x9dd)][_0x393ca8(0x828)][_0x393ca8(0x4e3)]['ColorExpGauge2'];return this[_0x393ca8(0x28b)](_0x5b3880,_0x1804e7);},ColorManager[_0x33ad8c(0x198)]=function(){const _0x2adc38=_0x33ad8c,_0x72f0e=_0x2adc38(0x517);this['_colorCache']=this[_0x2adc38(0x7bd)]||{};if(this[_0x2adc38(0x7bd)][_0x72f0e])return this[_0x2adc38(0x7bd)][_0x72f0e];const _0x2a1b73=VisuMZ[_0x2adc38(0x9dd)]['Settings'][_0x2adc38(0x4e3)][_0x2adc38(0x7fc)];return this['getColorDataFromPluginParameters'](_0x72f0e,_0x2a1b73);},ColorManager[_0x33ad8c(0x224)]=function(){const _0x28cac3=_0x33ad8c,_0x30a736='_stored_maxLvGaugeColor2';this[_0x28cac3(0x7bd)]=this['_colorCache']||{};if(this['_colorCache'][_0x30a736])return this[_0x28cac3(0x7bd)][_0x30a736];const _0x233662=VisuMZ['CoreEngine']['Settings'][_0x28cac3(0x4e3)][_0x28cac3(0xa2a)];return this['getColorDataFromPluginParameters'](_0x30a736,_0x233662);},ColorManager[_0x33ad8c(0xa0f)]=function(_0x42560e){const _0x2ee1a6=_0x33ad8c;return VisuMZ['CoreEngine'][_0x2ee1a6(0x828)][_0x2ee1a6(0x4e3)][_0x2ee1a6(0x9a1)][_0x2ee1a6(0x439)](this,_0x42560e);},ColorManager[_0x33ad8c(0x74e)]=function(_0x4fd78c){const _0x4f8cde=_0x33ad8c;return VisuMZ[_0x4f8cde(0x9dd)]['Settings'][_0x4f8cde(0x4e3)]['ActorMPColor'][_0x4f8cde(0x439)](this,_0x4fd78c);},ColorManager[_0x33ad8c(0x531)]=function(_0x437613){const _0x4f97bf=_0x33ad8c;return VisuMZ[_0x4f97bf(0x9dd)][_0x4f97bf(0x828)][_0x4f97bf(0x4e3)][_0x4f97bf(0x8c4)]['call'](this,_0x437613);},ColorManager[_0x33ad8c(0x91e)]=function(_0x1c6685){const _0x52f9c4=_0x33ad8c;return VisuMZ[_0x52f9c4(0x9dd)]['Settings']['Color']['ParamChange'][_0x52f9c4(0x439)](this,_0x1c6685);},ColorManager['damageColor']=function(_0x2c0ccb){const _0x32bae0=_0x33ad8c;return VisuMZ['CoreEngine']['Settings'][_0x32bae0(0x4e3)][_0x32bae0(0x44b)][_0x32bae0(0x439)](this,_0x2c0ccb);},ColorManager[_0x33ad8c(0x206)]=function(){const _0x350daf=_0x33ad8c;return VisuMZ[_0x350daf(0x9dd)][_0x350daf(0x828)][_0x350daf(0x4e3)][_0x350daf(0x444)];},ColorManager[_0x33ad8c(0x986)]=function(){const _0x107585=_0x33ad8c;return VisuMZ[_0x107585(0x9dd)][_0x107585(0x828)][_0x107585(0x4e3)][_0x107585(0x442)]||_0x107585(0x97a);},ColorManager[_0x33ad8c(0x9df)]=function(){const _0x5963da=_0x33ad8c;return VisuMZ['CoreEngine'][_0x5963da(0x828)]['Color'][_0x5963da(0x192)]||_0x5963da(0x95c);},ColorManager[_0x33ad8c(0x1f6)]=function(){const _0x1f525f=_0x33ad8c;return VisuMZ[_0x1f525f(0x9dd)][_0x1f525f(0x828)][_0x1f525f(0x4e3)][_0x1f525f(0x2bc)];},ColorManager[_0x33ad8c(0x1b8)]=function(){const _0x51f93d=_0x33ad8c;return VisuMZ[_0x51f93d(0x9dd)]['Settings'][_0x51f93d(0x4e3)][_0x51f93d(0x7ad)];},ColorManager['itemBackColor1']=function(){const _0x4f142b=_0x33ad8c;return VisuMZ[_0x4f142b(0x9dd)][_0x4f142b(0x828)][_0x4f142b(0x4e3)][_0x4f142b(0xa21)];},ColorManager[_0x33ad8c(0x65f)]=function(){const _0xf56295=_0x33ad8c;return VisuMZ['CoreEngine'][_0xf56295(0x828)][_0xf56295(0x4e3)][_0xf56295(0x8d8)];},SceneManager[_0x33ad8c(0x29a)]=[],SceneManager['isSceneBattle']=function(){const _0x39a872=_0x33ad8c;return this['_scene']&&this[_0x39a872(0x90d)]['constructor']===Scene_Battle;},SceneManager[_0x33ad8c(0x2ab)]=function(){const _0x97a370=_0x33ad8c;return this['_scene']&&this[_0x97a370(0x90d)]['constructor']===Scene_Map;},SceneManager['isInstanceOfSceneMap']=function(){return this['_scene']&&this['_scene']instanceof Scene_Map;},VisuMZ['CoreEngine'][_0x33ad8c(0x1a6)]=SceneManager[_0x33ad8c(0x4b0)],SceneManager['initialize']=function(){const _0x5c624e=_0x33ad8c;VisuMZ[_0x5c624e(0x9dd)]['SceneManager_initialize'][_0x5c624e(0x439)](this),this['initVisuMZCoreEngine']();},VisuMZ['CoreEngine'][_0x33ad8c(0x90b)]=SceneManager[_0x33ad8c(0x872)],SceneManager[_0x33ad8c(0x872)]=function(_0x51a2b5){const _0x3443f4=_0x33ad8c;if($gameTemp)this[_0x3443f4(0x293)](_0x51a2b5);VisuMZ[_0x3443f4(0x9dd)]['SceneManager_onKeyDown']['call'](this,_0x51a2b5);},SceneManager[_0x33ad8c(0x293)]=function(_0x1f963c){const _0x4251ba=_0x33ad8c;if(!_0x1f963c[_0x4251ba(0x119)]&&!_0x1f963c[_0x4251ba(0x29e)])switch(_0x1f963c[_0x4251ba(0x721)]){case 0x52:this[_0x4251ba(0x806)]();break;case 0x54:this[_0x4251ba(0x733)]();break;case 0x75:this[_0x4251ba(0x8d7)]();break;case 0x76:if(Input['isPressed'](_0x4251ba(0x203))||Input['isPressed'](_0x4251ba(0x299)))return;this['playTestF7']();break;}},SceneManager[_0x33ad8c(0x8d7)]=function(){const _0x28efbb=_0x33ad8c;if($gameTemp['isPlaytest']()&&VisuMZ[_0x28efbb(0x9dd)][_0x28efbb(0x828)][_0x28efbb(0x113)][_0x28efbb(0x5e8)]){if(ConfigManager[_0x28efbb(0x5c9)]!==0x0)_0x28efbb(0xa11)!==_0x28efbb(0x94a)?(ConfigManager[_0x28efbb(0x20a)]=0x0,ConfigManager[_0x28efbb(0x2c2)]=0x0,ConfigManager[_0x28efbb(0x2ae)]=0x0,ConfigManager['seVolume']=0x0):_0x33bbe7*=_0x53321e[_0x28efbb(0x5bb)]();else{if(_0x28efbb(0x9d5)!==_0x28efbb(0x7c9))ConfigManager[_0x28efbb(0x20a)]=0x64,ConfigManager[_0x28efbb(0x2c2)]=0x64,ConfigManager[_0x28efbb(0x2ae)]=0x64,ConfigManager[_0x28efbb(0x5c9)]=0x64;else return _0x5306e5['layoutSettings'][_0x28efbb(0x6ee)]['call'](this);}ConfigManager[_0x28efbb(0x6de)]();if(this[_0x28efbb(0x90d)]['constructor']===Scene_Options){if(_0x28efbb(0x95a)!==_0x28efbb(0x279)){if(this[_0x28efbb(0x90d)]['_optionsWindow'])this[_0x28efbb(0x90d)][_0x28efbb(0x216)][_0x28efbb(0x438)]();if(this[_0x28efbb(0x90d)][_0x28efbb(0x9ed)])this[_0x28efbb(0x90d)][_0x28efbb(0x9ed)][_0x28efbb(0x438)]();}else _0x2952de[_0x28efbb(0x86f)]();}}},SceneManager[_0x33ad8c(0x44d)]=function(){const _0x230d7d=_0x33ad8c;$gameTemp[_0x230d7d(0x4d4)]()&&VisuMZ[_0x230d7d(0x9dd)]['Settings'][_0x230d7d(0x113)][_0x230d7d(0x20c)]&&($gameTemp['_playTestFastMode']=!$gameTemp['_playTestFastMode']);},SceneManager[_0x33ad8c(0x806)]=function(){const _0x471810=_0x33ad8c;if(!VisuMZ[_0x471810(0x9dd)][_0x471810(0x828)][_0x471810(0x113)][_0x471810(0x967)])return;if(!$gameTemp[_0x471810(0x4d4)]())return;if(!SceneManager[_0x471810(0x2fc)]())return;if(!Input[_0x471810(0x343)](_0x471810(0x203)))return;for(const _0x1238cf of $gameParty[_0x471810(0x5fa)]()){if(_0x471810(0x1a4)===_0x471810(0x1a4)){if(!_0x1238cf)continue;_0x1238cf[_0x471810(0x35b)]();}else return _0xc9b2d5[_0x471810(0x9dd)][_0x471810(0x416)][_0x471810(0x439)](this,_0x1ae5d7);}},SceneManager[_0x33ad8c(0x733)]=function(){const _0x1bf30b=_0x33ad8c;if(!VisuMZ[_0x1bf30b(0x9dd)][_0x1bf30b(0x828)][_0x1bf30b(0x113)][_0x1bf30b(0x9da)])return;if(!$gameTemp[_0x1bf30b(0x4d4)]())return;if(!SceneManager[_0x1bf30b(0x2fc)]())return;if(!Input['isPressed'](_0x1bf30b(0x203)))return;for(const _0x24a729 of $gameParty[_0x1bf30b(0x5fa)]()){if('xyruK'!==_0x1bf30b(0x6d3)){if(!_0x24a729)continue;_0x24a729[_0x1bf30b(0x4a9)](_0x24a729['maxTp']());}else this[_0x1bf30b(0x350)]();}},SceneManager[_0x33ad8c(0x715)]=function(){const _0x2c8147=_0x33ad8c;this[_0x2c8147(0x6f1)]=![],this[_0x2c8147(0x6e7)]=!VisuMZ[_0x2c8147(0x9dd)]['Settings']['UI'][_0x2c8147(0x831)];},SceneManager['setSideButtonLayout']=function(_0x1a7cd9){const _0x1d5cb5=_0x33ad8c;if(VisuMZ[_0x1d5cb5(0x9dd)][_0x1d5cb5(0x828)]['UI'][_0x1d5cb5(0x3be)]){if(_0x1d5cb5(0x3c2)!==_0x1d5cb5(0x3c2))return _0x16961a=_0x2aba9d['replace'](/(\d)/gi,(_0x309039,_0x193347)=>'PRESERVCONVERSION(%1)'[_0x1d5cb5(0x3e7)](_0xa16b5(_0x193347))),_0x1d5cb5(0x7a7)[_0x1d5cb5(0x3e7)](_0x2ab05a,_0x42128a,_0x1fc0ab);else this['_sideButtonLayout']=_0x1a7cd9;}},SceneManager['isSideButtonLayout']=function(){const _0xca6b35=_0x33ad8c;return this[_0xca6b35(0x6f1)];},SceneManager[_0x33ad8c(0x6ce)]=function(){return this['_hideButtons'];},SceneManager[_0x33ad8c(0x57e)]=function(){const _0x4986d0=_0x33ad8c;return this['areButtonsHidden']()||this[_0x4986d0(0x430)]();},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x28a)]=SceneManager[_0x33ad8c(0x956)],SceneManager[_0x33ad8c(0x956)]=function(){const _0x3d1852=_0x33ad8c;return VisuMZ['CoreEngine']['Settings']['QoL'][_0x3d1852(0x3ea)]?VisuMZ[_0x3d1852(0x9dd)]['SceneManager_isGameActive'][_0x3d1852(0x439)](this):!![];},SceneManager[_0x33ad8c(0x550)]=function(_0x142774){const _0x4282db=_0x33ad8c;if(_0x142774 instanceof Error)'mIRxF'===_0x4282db(0x547)?this['contents']['fontSize']>=0x18&&(this[_0x4282db(0x5c3)][_0x4282db(0x1e9)]-=0x6):this[_0x4282db(0x33d)](_0x142774);else _0x142774 instanceof Array&&_0x142774[0x0]===_0x4282db(0x247)?_0x4282db(0x8bd)===_0x4282db(0x8bd)?this[_0x4282db(0x743)](_0x142774):(_0x43b8e3['CoreEngine']['Scene_Base_create'][_0x4282db(0x439)](this),_0x379234=this):_0x4282db(0x63d)!==_0x4282db(0x34a)?this[_0x4282db(0x784)](_0x142774):this[_0x4282db(0x4ae)][_0x4282db(0x672)](_0x35d471['layoutSettings']['CategoryBgType']);this[_0x4282db(0x879)]();},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x1bc)]=BattleManager[_0x33ad8c(0x3c0)],BattleManager[_0x33ad8c(0x3c0)]=function(){const _0x161ca5=_0x33ad8c;return VisuMZ[_0x161ca5(0x9dd)][_0x161ca5(0x828)][_0x161ca5(0x113)][_0x161ca5(0x884)]?this[_0x161ca5(0x1bb)]():VisuMZ['CoreEngine'][_0x161ca5(0x1bc)][_0x161ca5(0x439)](this);},BattleManager[_0x33ad8c(0x1bb)]=function(){const _0x3e65b5=_0x33ad8c;return $gameParty[_0x3e65b5(0x16e)](),SoundManager[_0x3e65b5(0x32f)](),this['onEscapeSuccess'](),!![];},BattleManager[_0x33ad8c(0x117)]=function(){return $gameSystem['getBattleSystem']()>=0x1;},BattleManager['isActiveTpb']=function(){const _0x1bb450=_0x33ad8c;return $gameSystem[_0x1bb450(0x855)]()===0x1;},VisuMZ[_0x33ad8c(0x9dd)]['Game_Temp_initialize']=Game_Temp[_0x33ad8c(0x116)]['initialize'],Game_Temp[_0x33ad8c(0x116)][_0x33ad8c(0x4b0)]=function(){const _0x4ebb2b=_0x33ad8c;VisuMZ[_0x4ebb2b(0x9dd)][_0x4ebb2b(0x7c1)][_0x4ebb2b(0x439)](this),this[_0x4ebb2b(0x37a)](),this[_0x4ebb2b(0x5f4)](),this[_0x4ebb2b(0x677)]();},Game_Temp[_0x33ad8c(0x116)]['forceOutOfPlaytest']=function(){const _0x30ad33=_0x33ad8c;VisuMZ[_0x30ad33(0x9dd)][_0x30ad33(0x828)][_0x30ad33(0x113)][_0x30ad33(0x544)]&&(this[_0x30ad33(0x3c7)]=![]);},Game_Temp[_0x33ad8c(0x116)][_0x33ad8c(0x4f4)]=function(_0x441820){this['_lastPluginCommandInterpreter']=_0x441820;},Game_Temp['prototype'][_0x33ad8c(0x6c6)]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0x33ad8c(0x116)]['clearForcedGameTroopSettingsCoreEngine']=function(){const _0x540606=_0x33ad8c;this['_forcedTroopView']=undefined,this[_0x540606(0x39e)]=undefined;},Game_Temp[_0x33ad8c(0x116)][_0x33ad8c(0x3d9)]=function(_0x469f91){const _0x2798c5=_0x33ad8c;if($gameMap&&$dataMap&&$dataMap[_0x2798c5(0x163)]){if(_0x2798c5(0x7c5)!=='rVHwg'){const _0x431de4=_0x42328b(_0x48b1c9['$1']);if(_0x431de4['match'](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else _0x431de4[_0x2798c5(0x13d)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x2798c5(0x76d)]='SV');}else this[_0x2798c5(0x7f9)]($dataMap['note']);}const _0x4a63fe=$dataTroops[_0x469f91];if(_0x4a63fe){if(_0x2798c5(0x950)!==_0x2798c5(0x950))!this[_0x2798c5(0x41f)]()&&_0x52dcd6!==null&&(_0x3ed2b4=null);else{let _0x2ac820=DataManager['createTroopNote'](_0x4a63fe['id']);this[_0x2798c5(0x7f9)](_0x2ac820);}}},Game_Temp[_0x33ad8c(0x116)][_0x33ad8c(0x7f9)]=function(_0x516bf9){const _0xe2ca1f=_0x33ad8c;if(!_0x516bf9)return;if(_0x516bf9[_0xe2ca1f(0x13d)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i)){if('Yboqs'===_0xe2ca1f(0x867)){if(this[_0xe2ca1f(0x5fd)]===_0x1db1a2)this['initCoreEngine']();if(this[_0xe2ca1f(0x5fd)]['TimeProgress']===_0x4c3528)this[_0xe2ca1f(0xa05)]();this[_0xe2ca1f(0x5fd)][_0xe2ca1f(0x79b)]=_0x26f86c;}else this['_forcedTroopView']='FV';}else{if(_0x516bf9[_0xe2ca1f(0x13d)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0xe2ca1f(0x76d)]='SV';else{if(_0x516bf9[_0xe2ca1f(0x13d)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if(_0xe2ca1f(0x846)==='bskuQ'){const _0x5034d4=String(RegExp['$1']);if(_0x5034d4['match'](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else _0x5034d4[_0xe2ca1f(0x13d)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0xe2ca1f(0x76d)]='SV');}else return this[_0xe2ca1f(0x50c)];}}}if(_0x516bf9[_0xe2ca1f(0x13d)](/<(?:DTB)>/i))this[_0xe2ca1f(0x39e)]=0x0;else{if(_0x516bf9[_0xe2ca1f(0x13d)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0xe2ca1f(0x39e)]=0x1;else{if(_0x516bf9['match'](/<(?:TPB|ATB)[ ]WAIT>/i))'yJNEr'===_0xe2ca1f(0x392)?_0x4d22ea[_0xe2ca1f(0x163)][_0xe2ca1f(0x13d)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x64bed5[_0xe2ca1f(0x421)]=_0x6251a9['max'](_0x3097bc(_0x3f0a86['$1']),0x1)):this[_0xe2ca1f(0x39e)]=0x2;else{if(_0x516bf9[_0xe2ca1f(0x13d)](/<(?:CTB)>/i))_0xe2ca1f(0x859)===_0xe2ca1f(0x859)?Imported[_0xe2ca1f(0x65e)]&&(this[_0xe2ca1f(0x39e)]=_0xe2ca1f(0xa0c)):_0x8f9c3c&&(_0x54f9a1[_0xe2ca1f(0x736)]=this[_0xe2ca1f(0x4c3)]()&&this[_0xe2ca1f(0x436)]());else{if(_0x516bf9[_0xe2ca1f(0x13d)](/<(?:STB)>/i)){if(_0xe2ca1f(0x4e9)===_0xe2ca1f(0x4e9))Imported[_0xe2ca1f(0x91f)]&&(this[_0xe2ca1f(0x39e)]='STB');else{if(!this[_0xe2ca1f(0x59f)])return![];return _0x402b6b[_0xe2ca1f(0x9dd)][_0xe2ca1f(0x828)][_0xe2ca1f(0x926)][_0xe2ca1f(0x7f1)];}}else{if(_0x516bf9[_0xe2ca1f(0x13d)](/<(?:BTB)>/i))Imported['VisuMZ_2_BattleSystemBTB']&&(_0xe2ca1f(0x8f1)===_0xe2ca1f(0x6e8)?this[_0xe2ca1f(0x475)]():this[_0xe2ca1f(0x39e)]=_0xe2ca1f(0x59c));else{if(_0x516bf9['match'](/<(?:FTB)>/i))Imported[_0xe2ca1f(0x399)]&&(this[_0xe2ca1f(0x39e)]='FTB');else{if(_0x516bf9[_0xe2ca1f(0x13d)](/<(?:OTB)>/i)){if(_0xe2ca1f(0x767)===_0xe2ca1f(0x767)){if(Imported[_0xe2ca1f(0x740)]){if('GmkBq'===_0xe2ca1f(0x8ad))this['_forcedBattleSys']='OTB';else{if(_0x273d29[_0xe2ca1f(0x4d4)]())_0x500573[_0xe2ca1f(0x478)](_0x239c50);}}}else return _0x3ccbfb[_0xe2ca1f(0x6c7)][_0xe2ca1f(0x480)][_0xe2ca1f(0x439)](this);}else{if(_0x516bf9['match'](/<(?:ETB)>/i))_0xe2ca1f(0x118)!=='OcqZf'?this['_profileWindow'][_0xe2ca1f(0x672)](_0x57141c[_0xe2ca1f(0x6c7)][_0xe2ca1f(0x9ad)]):Imported[_0xe2ca1f(0x911)]&&(this[_0xe2ca1f(0x39e)]=_0xe2ca1f(0x449));else{if(_0x516bf9[_0xe2ca1f(0x13d)](/<(?:PTB)>/i)){if(_0xe2ca1f(0x6db)!==_0xe2ca1f(0x8ba))Imported['VisuMZ_2_BattleSystemPTB']&&(this[_0xe2ca1f(0x39e)]='PTB');else{if(this['index']()===this[_0xe2ca1f(0x61c)]-0x1)return;_0xb9e724['clear'](),this['refresh'](),_0x5c4e7c['playCursor'](),this[_0xe2ca1f(0x288)](this['_maxDigits']-0x1);}}else{if(_0x516bf9['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if(_0xe2ca1f(0x4de)===_0xe2ca1f(0x3dc)){if(this['_anglePlus']===_0x59ab63)this[_0xe2ca1f(0x599)]();this['_anglePlus']['target']+=_0x17e65c||0x0,this[_0xe2ca1f(0x4b9)][_0xe2ca1f(0x753)]=_0x2f69e7||0x0,this[_0xe2ca1f(0x4b9)][_0xe2ca1f(0x60d)]=_0x459b4f||0x0,this[_0xe2ca1f(0x4b9)][_0xe2ca1f(0x173)]=_0x3c2964||_0xe2ca1f(0x8b5),_0x154d3d<=0x0&&(this[_0xe2ca1f(0x4b9)][_0xe2ca1f(0x23c)]=this['_anglePlus']['target']);}else{const _0x316ee4=String(RegExp['$1']);if(_0x316ee4[_0xe2ca1f(0x13d)](/DTB/i)){if(_0xe2ca1f(0x363)!==_0xe2ca1f(0x501))this[_0xe2ca1f(0x39e)]=0x0;else return this[_0xe2ca1f(0x973)]()&&this[_0xe2ca1f(0x4ba)]<this[_0xe2ca1f(0x2a8)]*_0x7ac1f5[_0xe2ca1f(0x9dd)][_0xe2ca1f(0x828)][_0xe2ca1f(0x87b)][_0xe2ca1f(0x6c0)];}else{if(_0x316ee4[_0xe2ca1f(0x13d)](/(?:TPB|ATB)[ ]ACTIVE/i))this['_forcedBattleSys']=0x1;else{if(_0x316ee4['match'](/(?:TPB|ATB)[ ]WAIT/i)){if('ttxsA'===_0xe2ca1f(0x567))return this[_0xe2ca1f(0x196)]||this;else this['_forcedBattleSys']=0x2;}else{if(_0x316ee4[_0xe2ca1f(0x13d)](/CTB/i)){if(_0xe2ca1f(0x437)===_0xe2ca1f(0x6d6))_0x5373b7['CoreEngine'][_0xe2ca1f(0x105)][_0xe2ca1f(0x439)](this);else{if(Imported[_0xe2ca1f(0x65e)]){if(_0xe2ca1f(0x11b)===_0xe2ca1f(0x11b))this['_forcedBattleSys']=_0xe2ca1f(0xa0c);else{var _0x45bd29=_0x5d379f(_0x84ba69['$1']);try{_0x52fbea*=_0x5b13eb(_0x45bd29);}catch(_0x3bb622){if(_0x274557[_0xe2ca1f(0x4d4)]())_0x791667[_0xe2ca1f(0x478)](_0x3bb622);}}}}}else{if(_0x316ee4[_0xe2ca1f(0x13d)](/STB/i))Imported['VisuMZ_2_BattleSystemSTB']&&(this[_0xe2ca1f(0x39e)]='STB');else{if(_0x316ee4['match'](/BTB/i)){if(_0xe2ca1f(0x4d0)!=='BQWwK')Imported[_0xe2ca1f(0x344)]&&(this[_0xe2ca1f(0x39e)]=_0xe2ca1f(0x59c));else{const _0x5d5e1a=this['_margin'],_0x215333=_0x218b83[_0xe2ca1f(0x3f1)](0x0,this[_0xe2ca1f(0x8a3)]-_0x5d5e1a*0x2),_0x4bae73=_0x407100[_0xe2ca1f(0x3f1)](0x0,this[_0xe2ca1f(0x33f)]-_0x5d5e1a*0x2),_0x5ddbe4=this['_backSprite'],_0x2260c0=_0x5ddbe4[_0xe2ca1f(0x63a)][0x0];_0x5ddbe4['bitmap']=this[_0xe2ca1f(0x641)],_0x5ddbe4[_0xe2ca1f(0x140)](0x0,0x0,0x60,0x60),_0x5ddbe4[_0xe2ca1f(0x7b9)](_0x5d5e1a,_0x5d5e1a),_0x5ddbe4[_0xe2ca1f(0x17d)]['x']=_0x215333/0x60,_0x5ddbe4[_0xe2ca1f(0x17d)]['y']=_0x4bae73/0x60,_0x2260c0[_0xe2ca1f(0x7d3)]=this['_windowskin'],_0x2260c0['setFrame'](0x0,0x60,0x60,0x60),_0x2260c0[_0xe2ca1f(0x7b9)](0x0,0x0,_0x215333,_0x4bae73),_0x2260c0[_0xe2ca1f(0x17d)]['x']=0x1/_0x5ddbe4[_0xe2ca1f(0x17d)]['x'],_0x2260c0[_0xe2ca1f(0x17d)]['y']=0x1/_0x5ddbe4[_0xe2ca1f(0x17d)]['y'],_0x5ddbe4['setColorTone'](this[_0xe2ca1f(0x81e)]);}}else{if(_0x316ee4['match'](/FTB/i)){if(_0xe2ca1f(0x820)===_0xe2ca1f(0x28f)){const _0x1d4c06=_0x5d7857[_0xe2ca1f(0x9dd)][_0xe2ca1f(0x828)][_0xe2ca1f(0x113)][_0xe2ca1f(0x706)]||0x0;if(_0x1d4c06>0x0)_0x38d33e['reserveCommonEvent'](_0x1d4c06);}else Imported[_0xe2ca1f(0x399)]&&(this['_forcedBattleSys']=_0xe2ca1f(0x9b0));}else{if(_0x316ee4[_0xe2ca1f(0x13d)](/OTB/i))Imported[_0xe2ca1f(0x740)]&&(this[_0xe2ca1f(0x39e)]='OTB');else{if(_0x316ee4[_0xe2ca1f(0x13d)](/ETB/i))Imported['VisuMZ_2_BattleSystemETB']&&(this[_0xe2ca1f(0x39e)]=_0xe2ca1f(0x449));else _0x316ee4['match'](/PTB/i)&&(Imported[_0xe2ca1f(0x7b0)]&&(this[_0xe2ca1f(0x39e)]=_0xe2ca1f(0x15e)));}}}}}}}}}}}}}}}}}}}}},Game_Temp[_0x33ad8c(0x116)]['createFauxAnimationQueue']=function(){const _0x3c858b=_0x33ad8c;this[_0x3c858b(0x66f)]=[];},Game_Temp[_0x33ad8c(0x116)]['requestFauxAnimation']=function(_0x121309,_0x1e4779,_0x754ffd,_0x57f0b7){const _0x424f82=_0x33ad8c;if(!this[_0x424f82(0x23f)]())return;_0x754ffd=_0x754ffd||![],_0x57f0b7=_0x57f0b7||![];if($dataAnimations[_0x1e4779]){const _0x506e3e={'targets':_0x121309,'animationId':_0x1e4779,'mirror':_0x754ffd,'mute':_0x57f0b7};this['_fauxAnimationQueue'][_0x424f82(0x8f7)](_0x506e3e);for(const _0x173662 of _0x121309){_0x173662['startAnimation']&&_0x173662[_0x424f82(0x86f)]();}}},Game_Temp['prototype']['showFauxAnimations']=function(){return!![];},Game_Temp[_0x33ad8c(0x116)]['retrieveFauxAnimation']=function(){const _0x2c71f7=_0x33ad8c;return this[_0x2c71f7(0x66f)][_0x2c71f7(0x203)]();},Game_Temp[_0x33ad8c(0x116)]['createPointAnimationQueue']=function(){this['_pointAnimationQueue']=[];},Game_Temp['prototype'][_0x33ad8c(0x5ac)]=function(_0x59ff24,_0x576f62,_0x153392,_0xb2cf83,_0xaa7045){const _0x3a4b8e=_0x33ad8c;if(!this[_0x3a4b8e(0x8aa)]())return;_0xb2cf83=_0xb2cf83||![],_0xaa7045=_0xaa7045||![];if($dataAnimations[_0x153392]){if(_0x3a4b8e(0x226)!==_0x3a4b8e(0x208)){const _0x138497={'x':_0x59ff24,'y':_0x576f62,'animationId':_0x153392,'mirror':_0xb2cf83,'mute':_0xaa7045};this[_0x3a4b8e(0x871)][_0x3a4b8e(0x8f7)](_0x138497);}else this['removeAllFauxAnimations'](),this[_0x3a4b8e(0x61d)](),_0x5bb4d4[_0x3a4b8e(0x9dd)][_0x3a4b8e(0x7e2)]['call'](this,_0x2d64d2);}},Game_Temp['prototype']['showPointAnimations']=function(){return!![];},Game_Temp['prototype'][_0x33ad8c(0x9f5)]=function(){return this['_pointAnimationQueue']['shift']();},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x991)]=Game_System[_0x33ad8c(0x116)][_0x33ad8c(0x4b0)],Game_System[_0x33ad8c(0x116)][_0x33ad8c(0x4b0)]=function(){const _0x190b66=_0x33ad8c;VisuMZ[_0x190b66(0x9dd)][_0x190b66(0x991)][_0x190b66(0x439)](this),this[_0x190b66(0xa05)]();},Game_System[_0x33ad8c(0x116)][_0x33ad8c(0xa05)]=function(){const _0x5050f5=_0x33ad8c;this[_0x5050f5(0x5fd)]={'SideView':$dataSystem[_0x5050f5(0x6eb)],'BattleSystem':this[_0x5050f5(0x23a)](),'FontSize':$dataSystem[_0x5050f5(0x269)][_0x5050f5(0x1e9)],'Padding':0xc};},Game_System[_0x33ad8c(0x116)][_0x33ad8c(0x7b5)]=function(){const _0x5ba911=_0x33ad8c;if($gameTemp[_0x5ba911(0x76d)]==='SV')return!![];else{if($gameTemp[_0x5ba911(0x76d)]==='FV')return![];}if(this['_CoreEngineSettings']===undefined)this[_0x5ba911(0xa05)]();if(this[_0x5ba911(0x5fd)]['SideView']===undefined)this[_0x5ba911(0xa05)]();return this[_0x5ba911(0x5fd)]['SideView'];},Game_System['prototype'][_0x33ad8c(0x25f)]=function(_0x4ab3d7){const _0x25eb43=_0x33ad8c;if(this[_0x25eb43(0x5fd)]===undefined)this['initCoreEngine']();if(this[_0x25eb43(0x5fd)][_0x25eb43(0x512)]===undefined)this[_0x25eb43(0xa05)]();this[_0x25eb43(0x5fd)][_0x25eb43(0x512)]=_0x4ab3d7;},Game_System['prototype'][_0x33ad8c(0x4c9)]=function(){const _0x230c3f=_0x33ad8c;if(this[_0x230c3f(0x5fd)]===undefined)this[_0x230c3f(0xa05)]();this[_0x230c3f(0x5fd)][_0x230c3f(0x12b)]=this[_0x230c3f(0x23a)]();},Game_System['prototype'][_0x33ad8c(0x23a)]=function(){const _0x2bb94a=_0x33ad8c,_0x17c972=(VisuMZ['CoreEngine'][_0x2bb94a(0x828)]['BattleSystem']||_0x2bb94a(0x4a8))[_0x2bb94a(0x455)]()['trim']();return VisuMZ[_0x2bb94a(0x9dd)][_0x2bb94a(0x313)](_0x17c972);},Game_System[_0x33ad8c(0x116)][_0x33ad8c(0x855)]=function(){const _0x5bbf54=_0x33ad8c;if($gameTemp[_0x5bbf54(0x39e)]!==undefined)return _0x5bbf54(0x7e5)!==_0x5bbf54(0x7e5)?this['isMapScrollLinked']()?this[_0x5bbf54(0x633)]():_0x47a649[_0x5bbf54(0x9dd)][_0x5bbf54(0x68c)]['call'](this):$gameTemp['_forcedBattleSys'];if(this[_0x5bbf54(0x5fd)]===undefined)this['initCoreEngine']();if(this[_0x5bbf54(0x5fd)]['BattleSystem']===undefined)this[_0x5bbf54(0x4c9)]();return this[_0x5bbf54(0x5fd)][_0x5bbf54(0x12b)];},Game_System[_0x33ad8c(0x116)]['setBattleSystem']=function(_0x1777c1){const _0x3af43f=_0x33ad8c;if(this[_0x3af43f(0x5fd)]===undefined)this[_0x3af43f(0xa05)]();if(this['_CoreEngineSettings'][_0x3af43f(0x12b)]===undefined)this['resetBattleSystem']();this['_CoreEngineSettings'][_0x3af43f(0x12b)]=_0x1777c1;},Game_System[_0x33ad8c(0x116)]['mainFontSize']=function(){const _0x164288=_0x33ad8c;if(this[_0x164288(0x5fd)]===undefined)this[_0x164288(0xa05)]();if(this[_0x164288(0x5fd)][_0x164288(0x79b)]===undefined)this[_0x164288(0xa05)]();return this[_0x164288(0x5fd)][_0x164288(0x79b)];},Game_System[_0x33ad8c(0x116)][_0x33ad8c(0x9c2)]=function(_0x4b2464){const _0x31596d=_0x33ad8c;if(this['_CoreEngineSettings']===undefined)this[_0x31596d(0xa05)]();if(this['_CoreEngineSettings'][_0x31596d(0x7ca)]===undefined)this[_0x31596d(0xa05)]();this['_CoreEngineSettings'][_0x31596d(0x79b)]=_0x4b2464;},Game_System[_0x33ad8c(0x116)]['windowPadding']=function(){const _0x50efd7=_0x33ad8c;if(this[_0x50efd7(0x5fd)]===undefined)this[_0x50efd7(0xa05)]();if(this[_0x50efd7(0x5fd)][_0x50efd7(0xa19)]===undefined)this[_0x50efd7(0xa05)]();return this[_0x50efd7(0x5fd)][_0x50efd7(0xa19)];},Game_System['prototype'][_0x33ad8c(0x123)]=function(_0x37a520){const _0x278b4a=_0x33ad8c;if(this[_0x278b4a(0x5fd)]===undefined)this[_0x278b4a(0xa05)]();if(this['_CoreEngineSettings'][_0x278b4a(0x7ca)]===undefined)this[_0x278b4a(0xa05)]();this[_0x278b4a(0x5fd)][_0x278b4a(0xa19)]=_0x37a520;},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x563)]=Game_Screen['prototype'][_0x33ad8c(0x4b0)],Game_Screen[_0x33ad8c(0x116)][_0x33ad8c(0x4b0)]=function(){const _0x21bc6d=_0x33ad8c;VisuMZ['CoreEngine']['Game_Screen_initialize'][_0x21bc6d(0x439)](this),this[_0x21bc6d(0x8b2)]();},Game_Screen[_0x33ad8c(0x116)]['initCoreEngineScreenShake']=function(){const _0x1cdc55=_0x33ad8c,_0x225c92=VisuMZ['CoreEngine'][_0x1cdc55(0x828)]['ScreenShake'];this[_0x1cdc55(0x7b1)]=_0x225c92?.['DefaultStyle']||_0x1cdc55(0x9b8);},Game_Screen['prototype'][_0x33ad8c(0x54e)]=function(){const _0xe1968e=_0x33ad8c;if(this[_0xe1968e(0x7b1)]===undefined)this[_0xe1968e(0x8b2)]();return this[_0xe1968e(0x7b1)];},Game_Screen[_0x33ad8c(0x116)][_0x33ad8c(0x3bf)]=function(_0x3a0394){const _0x593098=_0x33ad8c;if(this['_coreEngineShakeStyle']===undefined)this['initCoreEngineScreenShake']();this['_coreEngineShakeStyle']=_0x3a0394[_0x593098(0x1fe)]()['trim']();},Game_Picture[_0x33ad8c(0x116)]['isMapScrollLinked']=function(){const _0xe89c1f=_0x33ad8c;if($gameParty[_0xe89c1f(0x41b)]())return![];return this[_0xe89c1f(0x9d3)]()&&this['onlyfilename']()['charAt'](0x0)==='!';},Game_Picture[_0x33ad8c(0x116)][_0x33ad8c(0x9d3)]=function(){const _0xce32ff=_0x33ad8c;return this['_name'][_0xce32ff(0x5fc)]('/')[_0xce32ff(0x32d)]();},VisuMZ[_0x33ad8c(0x9dd)]['Game_Picture_x']=Game_Picture[_0x33ad8c(0x116)]['x'],Game_Picture[_0x33ad8c(0x116)]['x']=function(){const _0x2419e9=_0x33ad8c;if(this[_0x2419e9(0x236)]()){if(_0x2419e9(0x6ac)!=='wtJUo')return this[_0x2419e9(0x2c4)]();else{const _0x4331df=_0x586748[_0x2419e9(0x849)]?(_0x47ea24[_0x2419e9(0x116)][_0x2419e9(0x2a3)]()+0x6)*0x2:0x0,_0x438a57=this[_0x2419e9(0x6ad)](),_0x317beb=_0x4a41c7[_0x2419e9(0x7e0)]-_0x4331df*0x2,_0x1a7785=this['buttonAreaHeight']();return new _0x3ef71f(_0x4331df,_0x438a57,_0x317beb,_0x1a7785);}}else return VisuMZ['CoreEngine'][_0x2419e9(0x4c7)]['call'](this);},Game_Picture[_0x33ad8c(0x116)][_0x33ad8c(0x2c4)]=function(){const _0x577f46=_0x33ad8c,_0x20e758=$gameMap[_0x577f46(0x4fa)]()*$gameMap[_0x577f46(0x233)]();return(this['_x']-_0x20e758)*$gameScreen[_0x577f46(0x5bb)]();},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x68c)]=Game_Picture[_0x33ad8c(0x116)]['y'],Game_Picture[_0x33ad8c(0x116)]['y']=function(){const _0x1ba5fe=_0x33ad8c;return this[_0x1ba5fe(0x236)]()?this[_0x1ba5fe(0x633)]():VisuMZ['CoreEngine'][_0x1ba5fe(0x68c)][_0x1ba5fe(0x439)](this);},Game_Picture[_0x33ad8c(0x116)]['yScrollLinkedOffset']=function(){const _0x3ab0ef=_0x33ad8c,_0x57ef36=$gameMap['displayY']()*$gameMap[_0x3ab0ef(0x5f0)]();return(this['_y']-_0x57ef36)*$gameScreen[_0x3ab0ef(0x5bb)]();},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x488)]=Game_Picture[_0x33ad8c(0x116)][_0x33ad8c(0xff)],Game_Picture[_0x33ad8c(0x116)]['scaleX']=function(){const _0x393fe3=_0x33ad8c;let _0x39b3e0=VisuMZ[_0x393fe3(0x9dd)]['Game_Picture_scaleX'][_0x393fe3(0x439)](this);if(this[_0x393fe3(0x236)]()){if('nnnBL'!==_0x393fe3(0x37f))return'CTB';else _0x39b3e0*=$gameScreen[_0x393fe3(0x5bb)]();}return _0x39b3e0;},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x939)]=Game_Picture[_0x33ad8c(0x116)][_0x33ad8c(0x9ea)],Game_Picture['prototype'][_0x33ad8c(0x9ea)]=function(){const _0x2caf82=_0x33ad8c;let _0x332aac=VisuMZ[_0x2caf82(0x9dd)][_0x2caf82(0x939)][_0x2caf82(0x439)](this);return this[_0x2caf82(0x236)]()&&(_0x2caf82(0x275)===_0x2caf82(0x275)?_0x332aac*=$gameScreen['zoomScale']():this['makeCoreEngineCommandList']()),_0x332aac;},Game_Picture['prototype'][_0x33ad8c(0x639)]=function(_0x43c73e){const _0x294cb6=_0x33ad8c;this[_0x294cb6(0x644)]=_0x43c73e;},VisuMZ['CoreEngine'][_0x33ad8c(0x53c)]=Game_Picture['prototype'][_0x33ad8c(0x507)],Game_Picture['prototype']['calcEasing']=function(_0x182aef){const _0x57b50c=_0x33ad8c;this[_0x57b50c(0x644)]=this[_0x57b50c(0x644)]||0x0;if([0x0,0x1,0x2,0x3][_0x57b50c(0x949)](this['_coreEasingType']))return VisuMZ[_0x57b50c(0x9dd)][_0x57b50c(0x53c)][_0x57b50c(0x439)](this,_0x182aef);else{if('kUwxk'!==_0x57b50c(0x7ae))return VisuMZ['ApplyEasing'](_0x182aef,this['_coreEasingType']);else this[_0x57b50c(0x50c)]=_0x3a5721;}},VisuMZ['CoreEngine'][_0x33ad8c(0x210)]=Game_Picture[_0x33ad8c(0x116)][_0x33ad8c(0xa1d)],Game_Picture['prototype']['initRotation']=function(){const _0x285656=_0x33ad8c;VisuMZ[_0x285656(0x9dd)][_0x285656(0x210)][_0x285656(0x439)](this),this[_0x285656(0x599)]();},Game_Picture['prototype'][_0x33ad8c(0x599)]=function(){this['_anglePlus']={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':'Linear'};},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x8e8)]=Game_Picture[_0x33ad8c(0x116)][_0x33ad8c(0x786)],Game_Picture[_0x33ad8c(0x116)]['angle']=function(){const _0x5a64db=_0x33ad8c;let _0x18a512=VisuMZ['CoreEngine'][_0x5a64db(0x8e8)][_0x5a64db(0x439)](this);return _0x18a512+=this['anglePlus'](),_0x18a512;},Game_Picture[_0x33ad8c(0x116)]['anglePlus']=function(){const _0x316a53=_0x33ad8c;if(this[_0x316a53(0x4b9)]===undefined)this[_0x316a53(0x599)]();return this[_0x316a53(0x4b9)][_0x316a53(0x23c)]||0x0;},Game_Picture[_0x33ad8c(0x116)][_0x33ad8c(0x3cd)]=function(_0x12091e,_0x30e260,_0x3b39ea){const _0x30b2a8=_0x33ad8c;if(this[_0x30b2a8(0x4b9)]===undefined)this[_0x30b2a8(0x599)]();this[_0x30b2a8(0x4b9)]['target']=_0x12091e||0x0,this[_0x30b2a8(0x4b9)]['duration']=_0x30e260||0x0,this[_0x30b2a8(0x4b9)][_0x30b2a8(0x60d)]=_0x30e260||0x0,this[_0x30b2a8(0x4b9)]['easingType']=_0x3b39ea||_0x30b2a8(0x8b5);if(_0x30e260<=0x0){if(_0x30b2a8(0x1d0)===_0x30b2a8(0x1d0))this[_0x30b2a8(0x4b9)][_0x30b2a8(0x23c)]=this['_anglePlus'][_0x30b2a8(0x680)];else{const _0x138be5='_stored_mpGaugeColor2';this[_0x30b2a8(0x7bd)]=this[_0x30b2a8(0x7bd)]||{};if(this[_0x30b2a8(0x7bd)][_0x138be5])return this['_colorCache'][_0x138be5];const _0x2d4114=_0x1b9db8[_0x30b2a8(0x9dd)][_0x30b2a8(0x828)][_0x30b2a8(0x4e3)][_0x30b2a8(0x3b8)];return this[_0x30b2a8(0x28b)](_0x138be5,_0x2d4114);}}},Game_Picture[_0x33ad8c(0x116)][_0x33ad8c(0x970)]=function(_0x163468,_0x5ad085,_0x1201f7){const _0x16d4e3=_0x33ad8c;if(this['_anglePlus']===undefined)this['initRotationCoreEngine']();this['_anglePlus'][_0x16d4e3(0x680)]+=_0x163468||0x0,this[_0x16d4e3(0x4b9)][_0x16d4e3(0x753)]=_0x5ad085||0x0,this[_0x16d4e3(0x4b9)][_0x16d4e3(0x60d)]=_0x5ad085||0x0,this[_0x16d4e3(0x4b9)][_0x16d4e3(0x173)]=_0x1201f7||_0x16d4e3(0x8b5),_0x5ad085<=0x0&&(this['_anglePlus'][_0x16d4e3(0x23c)]=this[_0x16d4e3(0x4b9)][_0x16d4e3(0x680)]);},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x9bc)]=Game_Picture[_0x33ad8c(0x116)][_0x33ad8c(0x3b5)],Game_Picture[_0x33ad8c(0x116)][_0x33ad8c(0x3b5)]=function(){const _0x348c26=_0x33ad8c;VisuMZ['CoreEngine']['Game_Picture_updateRotation']['call'](this),this[_0x348c26(0x342)]();},Game_Picture['prototype']['updateAnglePlus']=function(){const _0x138feb=_0x33ad8c;if(this[_0x138feb(0x4b9)]===undefined)this[_0x138feb(0x599)]();const _0x43b7c1=this[_0x138feb(0x4b9)];if(_0x43b7c1[_0x138feb(0x753)]<=0x0)return;_0x43b7c1[_0x138feb(0x23c)]=this[_0x138feb(0x91d)](_0x43b7c1['current'],_0x43b7c1[_0x138feb(0x680)]),_0x43b7c1['duration']--;if(_0x43b7c1[_0x138feb(0x753)]<=0x0){if(_0x138feb(0x6b9)!==_0x138feb(0x7a9))_0x43b7c1['current']=_0x43b7c1['target'];else{_0x397cc9['ConvertParams'](_0x118ac3,_0x4bc467);const _0x384aa2=_0x381e9e['min'](_0x6d34f9['StartID'],_0x57b5e7[_0x138feb(0x838)]),_0x430d2b=_0x379238[_0x138feb(0x3f1)](_0xce61fb[_0x138feb(0x16c)],_0x374e81['EndingID']);for(let _0xfec7d5=_0x384aa2;_0xfec7d5<=_0x430d2b;_0xfec7d5++){_0x43cd9a[_0x138feb(0x380)](_0xfec7d5);}}}},Game_Picture[_0x33ad8c(0x116)]['applyEasingAnglePlus']=function(_0x437172,_0x3f6989){const _0x2df6f0=_0x33ad8c,_0x509e33=this[_0x2df6f0(0x4b9)],_0x354028=_0x509e33['easingType'],_0x30b373=_0x509e33['duration'],_0x424a4e=_0x509e33[_0x2df6f0(0x60d)],_0x42b8ca=VisuMZ[_0x2df6f0(0x2eb)]((_0x424a4e-_0x30b373)/_0x424a4e,_0x354028),_0x4949be=VisuMZ[_0x2df6f0(0x2eb)]((_0x424a4e-_0x30b373+0x1)/_0x424a4e,_0x354028),_0x366953=(_0x437172-_0x3f6989*_0x42b8ca)/(0x1-_0x42b8ca);return _0x366953+(_0x3f6989-_0x366953)*_0x4949be;},VisuMZ['CoreEngine'][_0x33ad8c(0x435)]=Game_Action['prototype']['itemHit'],Game_Action[_0x33ad8c(0x116)][_0x33ad8c(0x34e)]=function(_0x5732e7){const _0x597255=_0x33ad8c;return VisuMZ[_0x597255(0x9dd)][_0x597255(0x828)][_0x597255(0x113)]['ImprovedAccuracySystem']?this[_0x597255(0x15a)](_0x5732e7):VisuMZ[_0x597255(0x9dd)][_0x597255(0x435)][_0x597255(0x439)](this,_0x5732e7);},Game_Action[_0x33ad8c(0x116)]['itemHitImprovedAccuracy']=function(_0x522df4){const _0x5a06ad=_0x33ad8c,_0x1afa4c=this[_0x5a06ad(0x53f)](_0x522df4),_0x363673=this[_0x5a06ad(0x85a)](_0x522df4),_0x336e7f=this['targetEvaRate'](_0x522df4);return _0x1afa4c*(_0x363673-_0x336e7f);},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0xa06)]=Game_Action[_0x33ad8c(0x116)][_0x33ad8c(0x58a)],Game_Action['prototype'][_0x33ad8c(0x58a)]=function(_0x4a5687){const _0x38ead2=_0x33ad8c;if(VisuMZ[_0x38ead2(0x9dd)][_0x38ead2(0x828)][_0x38ead2(0x113)][_0x38ead2(0x85d)]){if(_0x38ead2(0x86a)!==_0x38ead2(0x7d2))return 0x0;else _0x3a432['pitch']=_0x1617dc,_0x5b9422['pos']=_0x534ace[_0x38ead2(0x6d9)][_0x38ead2(0x89d)](),_0x4e2600[_0x38ead2(0x90c)](_0x3208a1),_0x292b82[_0x38ead2(0x1b1)](_0x447683,_0x4676bd[_0x38ead2(0x340)]),_0x900fc7[_0x38ead2(0x6d9)][_0x38ead2(0x972)](_0x273e6e[_0x38ead2(0x340)]);}else return VisuMZ[_0x38ead2(0x9dd)][_0x38ead2(0xa06)][_0x38ead2(0x439)](this,_0x4a5687);},Game_Action['prototype'][_0x33ad8c(0x53f)]=function(_0x42558b){const _0x3a7ac3=_0x33ad8c;return this[_0x3a7ac3(0x11c)]()[_0x3a7ac3(0x652)]*0.01;},Game_Action['prototype'][_0x33ad8c(0x85a)]=function(_0x147c29){const _0x45b0f7=_0x33ad8c;if(VisuMZ[_0x45b0f7(0x9dd)][_0x45b0f7(0x828)][_0x45b0f7(0x113)][_0x45b0f7(0x3cf)]&&this[_0x45b0f7(0x3e2)]())return 0x1;if(this[_0x45b0f7(0x473)]()){if(VisuMZ[_0x45b0f7(0x9dd)][_0x45b0f7(0x828)][_0x45b0f7(0x113)][_0x45b0f7(0x3cf)]&&this[_0x45b0f7(0x146)]()[_0x45b0f7(0x1b5)]())return this['subject']()[_0x45b0f7(0x84f)]+0.05;else{if(_0x45b0f7(0x28c)!=='ZsFYT')this[_0x45b0f7(0x52d)](_0xc40c41[_0x45b0f7(0x6d5)],0x0);else return this[_0x45b0f7(0x146)]()['hit'];}}else{if(_0x45b0f7(0x8bb)!=='gYWpn')_0x3e8019['endAnimation']();else return 0x1;}},Game_Action[_0x33ad8c(0x116)]['targetEvaRate']=function(_0x1bd9cf){const _0x2a904e=_0x33ad8c;if(this[_0x2a904e(0x146)]()[_0x2a904e(0x1b5)]()===_0x1bd9cf[_0x2a904e(0x1b5)]())return 0x0;if(this[_0x2a904e(0x473)]()){if(VisuMZ['CoreEngine'][_0x2a904e(0x828)]['QoL']['AccuracyBoost']&&_0x1bd9cf[_0x2a904e(0x9ae)]())return _0x1bd9cf['eva']-0.05;else{if(_0x2a904e(0x549)==='msgZB'){const _0xb34224=_0x5b3976[_0x2a904e(0x2b9)]()[_0x2a904e(0x104)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x4db17c['nickname'](),_0x497990,_0x7fdbbc,_0x33aa00);}else return _0x1bd9cf[_0x2a904e(0x250)];}}else return this['isMagical']()?_0x1bd9cf['mev']:0x0;},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x559)]=Game_Action[_0x33ad8c(0x116)]['updateLastTarget'],Game_Action['prototype'][_0x33ad8c(0x459)]=function(_0x2c83de){const _0x4173e3=_0x33ad8c;VisuMZ[_0x4173e3(0x9dd)][_0x4173e3(0x559)][_0x4173e3(0x439)](this,_0x2c83de);if(VisuMZ[_0x4173e3(0x9dd)][_0x4173e3(0x828)][_0x4173e3(0x113)][_0x4173e3(0x85d)])return;const _0x6cdd21=_0x2c83de[_0x4173e3(0x4a2)]();_0x6cdd21[_0x4173e3(0x561)]&&(0x1-this[_0x4173e3(0x58a)](_0x2c83de)>this[_0x4173e3(0x34e)](_0x2c83de)&&(_0x6cdd21['missed']=![],_0x6cdd21[_0x4173e3(0x5d1)]=!![]));},VisuMZ['CoreEngine'][_0x33ad8c(0x241)]=Game_BattlerBase[_0x33ad8c(0x116)][_0x33ad8c(0x7c7)],Game_BattlerBase[_0x33ad8c(0x116)][_0x33ad8c(0x7c7)]=function(){const _0x116284=_0x33ad8c;this[_0x116284(0x2e4)]={},VisuMZ[_0x116284(0x9dd)][_0x116284(0x241)][_0x116284(0x439)](this);},VisuMZ['CoreEngine'][_0x33ad8c(0x961)]=Game_BattlerBase['prototype'][_0x33ad8c(0x438)],Game_BattlerBase[_0x33ad8c(0x116)][_0x33ad8c(0x438)]=function(){const _0x45722e=_0x33ad8c;this[_0x45722e(0x2e4)]={},VisuMZ[_0x45722e(0x9dd)][_0x45722e(0x961)][_0x45722e(0x439)](this);},Game_BattlerBase['prototype'][_0x33ad8c(0x2a2)]=function(_0x39466d){const _0x2e8a60=_0x33ad8c;return this[_0x2e8a60(0x2e4)]=this[_0x2e8a60(0x2e4)]||{},this[_0x2e8a60(0x2e4)][_0x39466d]!==undefined;},Game_BattlerBase['prototype'][_0x33ad8c(0x43c)]=function(_0x335417){const _0x4ab048=_0x33ad8c,_0x2b7e99=(_0x546ec9,_0x2541ca)=>{const _0x460508=_0x4703;if(!_0x2541ca)return _0x546ec9;if(_0x2541ca['note'][_0x460508(0x13d)](VisuMZ[_0x460508(0x9dd)][_0x460508(0x5fb)]['paramPlus'][_0x335417])){var _0x1fffd6=Number(RegExp['$1']);_0x546ec9+=_0x1fffd6;}if(_0x2541ca[_0x460508(0x163)]['match'](VisuMZ['CoreEngine'][_0x460508(0x5fb)][_0x460508(0x39b)][_0x335417])){if(_0x460508(0x71d)===_0x460508(0x384))return _0x9d8de5['CoreEngine'][_0x460508(0x378)][_0xb02125];else{var _0x1ed7c8=String(RegExp['$1']);try{_0x546ec9+=eval(_0x1ed7c8);}catch(_0x3f6363){if(_0x460508(0x92d)!==_0x460508(0x601)){if($gameTemp[_0x460508(0x4d4)]())console[_0x460508(0x478)](_0x3f6363);}else{_0x11808e[_0x460508(0x9dd)][_0x460508(0x828)]['MenuLayout'][_0x460508(0x18e)]['drawGameTitle'][_0x460508(0x439)](this);if(_0x218208[_0x460508(0x812)]!==''&&_0x196319['subtitle']!==_0x460508(0x857))this[_0x460508(0x71c)]();if(_0x566021[_0x460508(0x9a0)]!==''&&_0x169f2d[_0x460508(0x9a0)]!=='0.00')this['drawGameVersion']();}}}}return _0x546ec9;};return this[_0x4ab048(0x5ea)]()[_0x4ab048(0x79d)](_0x2b7e99,this['_paramPlus'][_0x335417]);},Game_BattlerBase['prototype'][_0x33ad8c(0x17c)]=function(_0xdd216b){const _0x275dba=_0x33ad8c;var _0x2b4d58=_0x275dba(0x154)+(this[_0x275dba(0x1b5)]()?'Actor':_0x275dba(0x5fe))+_0x275dba(0x67b)+_0xdd216b;if(this[_0x275dba(0x2a2)](_0x2b4d58))return this['_cache'][_0x2b4d58];this[_0x275dba(0x2e4)][_0x2b4d58]=eval(VisuMZ['CoreEngine'][_0x275dba(0x828)][_0x275dba(0x87b)][_0x2b4d58]);const _0x4ea8f8=(_0xc3b074,_0x25760f)=>{const _0x579817=_0x275dba;if(!_0x25760f)return _0xc3b074;if(_0x25760f[_0x579817(0x163)][_0x579817(0x13d)](VisuMZ['CoreEngine'][_0x579817(0x5fb)]['paramMax'][_0xdd216b])){if(_0x579817(0x6a0)===_0x579817(0x6a0)){var _0x36901f=Number(RegExp['$1']);if(_0x36901f===0x0)_0x36901f=Number['MAX_SAFE_INTEGER'];_0xc3b074=Math[_0x579817(0x3f1)](_0xc3b074,_0x36901f);}else{const _0x5d409b=_0x69d67b[_0x579817(0x9dd)][_0x579817(0x160)][_0x513789],_0x5745b3=this[_0x5d409b];return _0x35ea3e['CoreEngine'][_0x579817(0x772)][_0x3d742b]===_0x579817(0x329)?_0x5745b3:_0x124ea7?_0x3b793b(_0x5c8519[_0x579817(0x758)](_0x5745b3*0x64))+'%':_0x5745b3;}}if(_0x25760f[_0x579817(0x163)][_0x579817(0x13d)](VisuMZ[_0x579817(0x9dd)]['RegExp'][_0x579817(0x8b9)][_0xdd216b])){var _0x44e342=String(RegExp['$1']);try{_0xc3b074=Math[_0x579817(0x3f1)](_0xc3b074,Number(eval(_0x44e342)));}catch(_0x679b5d){if($gameTemp[_0x579817(0x4d4)]())console[_0x579817(0x478)](_0x679b5d);}}return _0xc3b074;};if(this[_0x275dba(0x2e4)][_0x2b4d58]===0x0)this[_0x275dba(0x2e4)][_0x2b4d58]=Number['MAX_SAFE_INTEGER'];return this['_cache'][_0x2b4d58]=this['traitObjects']()['reduce'](_0x4ea8f8,this['_cache'][_0x2b4d58]),this[_0x275dba(0x2e4)][_0x2b4d58];},Game_BattlerBase['prototype'][_0x33ad8c(0x711)]=function(_0x503478){const _0x293582=_0x33ad8c,_0x23dad1=this['traitsPi'](Game_BattlerBase[_0x293582(0x31f)],_0x503478),_0x3e1947=(_0x507c15,_0x56daac)=>{const _0x52ddb8=_0x293582;if(_0x52ddb8(0x8c7)===_0x52ddb8(0x8c7)){if(!_0x56daac)return _0x507c15;if(_0x56daac['note']['match'](VisuMZ[_0x52ddb8(0x9dd)][_0x52ddb8(0x5fb)]['paramRate1'][_0x503478])){var _0x45d458=Number(RegExp['$1'])/0x64;_0x507c15*=_0x45d458;}if(_0x56daac['note'][_0x52ddb8(0x13d)](VisuMZ[_0x52ddb8(0x9dd)]['RegExp'][_0x52ddb8(0xa18)][_0x503478])){var _0x45d458=Number(RegExp['$1']);_0x507c15*=_0x45d458;}if(_0x56daac[_0x52ddb8(0x163)][_0x52ddb8(0x13d)](VisuMZ[_0x52ddb8(0x9dd)][_0x52ddb8(0x5fb)]['paramRateJS'][_0x503478])){if('aVEVv'===_0x52ddb8(0x34d)){var _0x4474d9=String(RegExp['$1']);try{_0x507c15*=eval(_0x4474d9);}catch(_0x469e60){if($gameTemp[_0x52ddb8(0x4d4)]())console[_0x52ddb8(0x478)](_0x469e60);}}else _0x170fbf[_0x52ddb8(0x116)][_0x52ddb8(0x4b0)]['call'](this),this[_0x52ddb8(0x8ed)]=_0x241551,this['_clickHandler']=null,this[_0x52ddb8(0x52d)]();}return _0x507c15;}else{var _0x5f413f=_0xf56de3(_0x611245['$1']);_0x4276c8+=_0x5f413f;}};return this[_0x293582(0x5ea)]()['reduce'](_0x3e1947,_0x23dad1);},Game_BattlerBase['prototype'][_0x33ad8c(0x3ce)]=function(_0x42ffc4){const _0x59d13c=_0x33ad8c,_0x57b37d=(_0x4e76e7,_0x475d1f)=>{const _0xe29a35=_0x4703;if(_0xe29a35(0x576)===_0xe29a35(0x576)){if(!_0x475d1f)return _0x4e76e7;if(_0x475d1f[_0xe29a35(0x163)]['match'](VisuMZ[_0xe29a35(0x9dd)]['RegExp'][_0xe29a35(0x92c)][_0x42ffc4])){if(_0xe29a35(0x881)==='kmJqD'){var _0x47fe15=Number(RegExp['$1']);_0x4e76e7+=_0x47fe15;}else _0x113122=this[_0xe29a35(0x40b)]();}if(_0x475d1f[_0xe29a35(0x163)][_0xe29a35(0x13d)](VisuMZ[_0xe29a35(0x9dd)][_0xe29a35(0x5fb)][_0xe29a35(0x824)][_0x42ffc4])){if('rbtun'==='XPXzP'){if(this[_0xe29a35(0x5fd)]===_0x582243)this[_0xe29a35(0xa05)]();if(this[_0xe29a35(0x5fd)][_0xe29a35(0x79b)]===_0x31faf4)this[_0xe29a35(0xa05)]();return this[_0xe29a35(0x5fd)][_0xe29a35(0x79b)];}else{var _0x53cd54=String(RegExp['$1']);try{_0x4e76e7+=eval(_0x53cd54);}catch(_0x522056){if($gameTemp[_0xe29a35(0x4d4)]())console[_0xe29a35(0x478)](_0x522056);}}}return _0x4e76e7;}else return this['_commandWindow'][_0xe29a35(0x9f7)]();};return this[_0x59d13c(0x5ea)]()[_0x59d13c(0x79d)](_0x57b37d,0x0);},Game_BattlerBase[_0x33ad8c(0x116)][_0x33ad8c(0x83d)]=function(_0x5bcc1b){const _0x3015f9=_0x33ad8c;let _0x2f6188='param'+_0x5bcc1b+_0x3015f9(0x13e);if(this['checkCacheKey'](_0x2f6188))return this[_0x3015f9(0x2e4)][_0x2f6188];return this['_cache'][_0x2f6188]=Math[_0x3015f9(0x758)](VisuMZ[_0x3015f9(0x9dd)][_0x3015f9(0x828)][_0x3015f9(0x87b)][_0x3015f9(0x78d)][_0x3015f9(0x439)](this,_0x5bcc1b)),this[_0x3015f9(0x2e4)][_0x2f6188];},Game_BattlerBase[_0x33ad8c(0x116)][_0x33ad8c(0x55a)]=function(_0x3923ba){const _0x560db7=_0x33ad8c,_0x4aab58=(_0x452ac0,_0x5a2f14)=>{const _0x38ce65=_0x4703;if('kAUgJ'===_0x38ce65(0x4e5)){if(!_0x5a2f14)return _0x452ac0;if(_0x5a2f14[_0x38ce65(0x163)][_0x38ce65(0x13d)](VisuMZ['CoreEngine']['RegExp']['xparamPlus1'][_0x3923ba])){if(_0x38ce65(0x322)!==_0x38ce65(0x928)){var _0x26246d=Number(RegExp['$1'])/0x64;_0x452ac0+=_0x26246d;}else _0x2cf8d7[_0x38ce65(0x1cc)]>0x0?_0x54cb65+=_0x29c6c0+'\x0a\x0a\x0a\x0a\x0a':_0x4ea4c4+=_0x406248+_0x38ce65(0x6e4)['format'](_0x490dc6,_0x51ba57[_0x38ce65(0x62a)]||'Unnamed')+_0x35ca6a,_0x5c2fc6+=_0x75c894[_0x38ce65(0x3e7)](_0x5b2f3e,_0x10387b);}if(_0x5a2f14['note'][_0x38ce65(0x13d)](VisuMZ[_0x38ce65(0x9dd)][_0x38ce65(0x5fb)][_0x38ce65(0x935)][_0x3923ba])){var _0x26246d=Number(RegExp['$1']);_0x452ac0+=_0x26246d;}if(_0x5a2f14[_0x38ce65(0x163)][_0x38ce65(0x13d)](VisuMZ[_0x38ce65(0x9dd)]['RegExp']['xparamPlusJS'][_0x3923ba])){var _0xfb764b=String(RegExp['$1']);try{_0x452ac0+=eval(_0xfb764b);}catch(_0x3da1eb){if($gameTemp['isPlaytest']())console[_0x38ce65(0x478)](_0x3da1eb);}}return _0x452ac0;}else return _0x140ebd[_0x38ce65(0x9dd)][_0x38ce65(0x1bc)]['call'](this);};return this[_0x560db7(0x5ea)]()[_0x560db7(0x79d)](_0x4aab58,0x0);},Game_BattlerBase[_0x33ad8c(0x116)][_0x33ad8c(0x6fa)]=function(_0xde00d2){const _0x2b0ba9=_0x33ad8c,_0x3d47bd=(_0x2a67f2,_0x3fa8c7)=>{const _0x1b8157=_0x4703;if(!_0x3fa8c7)return _0x2a67f2;if(_0x3fa8c7[_0x1b8157(0x163)][_0x1b8157(0x13d)](VisuMZ[_0x1b8157(0x9dd)]['RegExp'][_0x1b8157(0x3c1)][_0xde00d2])){var _0x4d9dc8=Number(RegExp['$1'])/0x64;_0x2a67f2*=_0x4d9dc8;}if(_0x3fa8c7[_0x1b8157(0x163)][_0x1b8157(0x13d)](VisuMZ[_0x1b8157(0x9dd)][_0x1b8157(0x5fb)][_0x1b8157(0x427)][_0xde00d2])){var _0x4d9dc8=Number(RegExp['$1']);_0x2a67f2*=_0x4d9dc8;}if(_0x3fa8c7[_0x1b8157(0x163)][_0x1b8157(0x13d)](VisuMZ[_0x1b8157(0x9dd)][_0x1b8157(0x5fb)]['xparamRateJS'][_0xde00d2])){if(_0x1b8157(0x811)===_0x1b8157(0x811)){var _0x36a0c2=String(RegExp['$1']);try{_0x2a67f2*=eval(_0x36a0c2);}catch(_0x13f8d2){if(_0x1b8157(0x1ca)!=='OSmzU'){if($gameTemp[_0x1b8157(0x4d4)]())console[_0x1b8157(0x478)](_0x13f8d2);}else _0x219b1f[_0x1b8157(0x9dd)][_0x1b8157(0x49b)]['call'](this);}}else{return _0x222bfa['prototype'][_0x1b8157(0x36c)][_0x1b8157(0x439)](this)+_0x22bc83[_0x1b8157(0x9dd)][_0x1b8157(0x828)]['Window']['ItemHeight'];;}}return _0x2a67f2;};return this[_0x2b0ba9(0x5ea)]()[_0x2b0ba9(0x79d)](_0x3d47bd,0x1);},Game_BattlerBase['prototype'][_0x33ad8c(0x6af)]=function(_0x45d951){const _0xb858d9=(_0x5442ed,_0xe7dfaa)=>{const _0x45fcbe=_0x4703;if('lYxEj'==='Eqosq')_0x5cd9c2['startAnimation']&&_0x595a44['startAnimation']();else{if(!_0xe7dfaa)return _0x5442ed;if(_0xe7dfaa['note']['match'](VisuMZ[_0x45fcbe(0x9dd)][_0x45fcbe(0x5fb)][_0x45fcbe(0x77d)][_0x45d951])){var _0x36a427=Number(RegExp['$1'])/0x64;_0x5442ed+=_0x36a427;}if(_0xe7dfaa['note']['match'](VisuMZ[_0x45fcbe(0x9dd)][_0x45fcbe(0x5fb)]['xparamFlat2'][_0x45d951])){var _0x36a427=Number(RegExp['$1']);_0x5442ed+=_0x36a427;}if(_0xe7dfaa[_0x45fcbe(0x163)][_0x45fcbe(0x13d)](VisuMZ[_0x45fcbe(0x9dd)][_0x45fcbe(0x5fb)]['xparamFlatJS'][_0x45d951])){var _0x548d26=String(RegExp['$1']);try{_0x45fcbe(0x60a)===_0x45fcbe(0x17b)?this[_0x45fcbe(0x8e4)]():_0x5442ed+=eval(_0x548d26);}catch(_0x538382){if($gameTemp[_0x45fcbe(0x4d4)]())console[_0x45fcbe(0x478)](_0x538382);}}return _0x5442ed;}};return this['traitObjects']()['reduce'](_0xb858d9,0x0);},Game_BattlerBase[_0x33ad8c(0x116)]['xparam']=function(_0x3e12a5){const _0x5d1437=_0x33ad8c;let _0x114d38='xparam'+_0x3e12a5+_0x5d1437(0x13e);if(this['checkCacheKey'](_0x114d38))return this[_0x5d1437(0x2e4)][_0x114d38];return this[_0x5d1437(0x2e4)][_0x114d38]=VisuMZ[_0x5d1437(0x9dd)]['Settings']['Param'][_0x5d1437(0x83a)]['call'](this,_0x3e12a5),this[_0x5d1437(0x2e4)][_0x114d38];},Game_BattlerBase[_0x33ad8c(0x116)][_0x33ad8c(0x7eb)]=function(_0x15f44d){const _0x5c2343=_0x33ad8c,_0x28cc9c=(_0x119157,_0x589832)=>{const _0x241ecc=_0x4703;if(!_0x589832)return _0x119157;if(_0x589832[_0x241ecc(0x163)][_0x241ecc(0x13d)](VisuMZ[_0x241ecc(0x9dd)][_0x241ecc(0x5fb)]['sparamPlus1'][_0x15f44d])){var _0x490c27=Number(RegExp['$1'])/0x64;_0x119157+=_0x490c27;}if(_0x589832[_0x241ecc(0x163)][_0x241ecc(0x13d)](VisuMZ[_0x241ecc(0x9dd)][_0x241ecc(0x5fb)][_0x241ecc(0x8e1)][_0x15f44d])){var _0x490c27=Number(RegExp['$1']);_0x119157+=_0x490c27;}if(_0x589832['note']['match'](VisuMZ[_0x241ecc(0x9dd)]['RegExp'][_0x241ecc(0x683)][_0x15f44d])){var _0x189ef2=String(RegExp['$1']);try{_0x241ecc(0x335)===_0x241ecc(0x588)?this['removeFauxAnimation'](_0x4936bf):_0x119157+=eval(_0x189ef2);}catch(_0x39c430){if($gameTemp['isPlaytest']())console[_0x241ecc(0x478)](_0x39c430);}}return _0x119157;};return this[_0x5c2343(0x5ea)]()['reduce'](_0x28cc9c,0x0);},Game_BattlerBase[_0x33ad8c(0x116)][_0x33ad8c(0x6d8)]=function(_0x1efdd6){const _0x1cd0d7=_0x33ad8c,_0x3f46e0=(_0x384305,_0x3ca67a)=>{const _0x1f5dc4=_0x4703;if(_0x1f5dc4(0x74a)===_0x1f5dc4(0x988))this[_0x1f5dc4(0x7d3)]['destroy']();else{if(!_0x3ca67a)return _0x384305;if(_0x3ca67a[_0x1f5dc4(0x163)][_0x1f5dc4(0x13d)](VisuMZ[_0x1f5dc4(0x9dd)][_0x1f5dc4(0x5fb)][_0x1f5dc4(0x895)][_0x1efdd6])){var _0x2f06bf=Number(RegExp['$1'])/0x64;_0x384305*=_0x2f06bf;}if(_0x3ca67a[_0x1f5dc4(0x163)][_0x1f5dc4(0x13d)](VisuMZ['CoreEngine'][_0x1f5dc4(0x5fb)]['sparamRate2'][_0x1efdd6])){var _0x2f06bf=Number(RegExp['$1']);_0x384305*=_0x2f06bf;}if(_0x3ca67a['note'][_0x1f5dc4(0x13d)](VisuMZ['CoreEngine'][_0x1f5dc4(0x5fb)][_0x1f5dc4(0x7a3)][_0x1efdd6])){if(_0x1f5dc4(0x4c2)===_0x1f5dc4(0x4c2)){var _0x436e2b=String(RegExp['$1']);try{_0x384305*=eval(_0x436e2b);}catch(_0x215377){if($gameTemp['isPlaytest']())console[_0x1f5dc4(0x478)](_0x215377);}}else _0x1ec01e['CoreEngine'][_0x1f5dc4(0x828)][_0x1f5dc4(0x113)][_0x1f5dc4(0x227)]?this[_0x1f5dc4(0x3b6)](_0x2dd3c7,_0xfb6523,_0x5b9362,_0x84e2a4):_0x1e7054[_0x1f5dc4(0x9dd)][_0x1f5dc4(0x1f1)][_0x1f5dc4(0x439)](this,_0x118f4b,_0x801c81,_0x5141b8,_0x2b17fe);}return _0x384305;}};return this[_0x1cd0d7(0x5ea)]()[_0x1cd0d7(0x79d)](_0x3f46e0,0x1);},Game_BattlerBase['prototype'][_0x33ad8c(0x53a)]=function(_0x33c0ee){const _0x5d42d3=_0x33ad8c,_0x2d3c4c=(_0x2be1b5,_0x5b27d8)=>{const _0x5a2132=_0x4703;if(_0x5a2132(0x56a)===_0x5a2132(0x56a)){if(!_0x5b27d8)return _0x2be1b5;if(_0x5b27d8[_0x5a2132(0x163)][_0x5a2132(0x13d)](VisuMZ[_0x5a2132(0x9dd)][_0x5a2132(0x5fb)][_0x5a2132(0x14b)][_0x33c0ee])){if(_0x5a2132(0x55b)===_0x5a2132(0x997))this[_0x5a2132(0x42c)]();else{var _0x2a6656=Number(RegExp['$1'])/0x64;_0x2be1b5+=_0x2a6656;}}if(_0x5b27d8['note'][_0x5a2132(0x13d)](VisuMZ[_0x5a2132(0x9dd)][_0x5a2132(0x5fb)]['sparamFlat2'][_0x33c0ee])){if(_0x5a2132(0x1d8)==='VolFd')this[_0x5a2132(0x60c)]['setBackgroundType'](_0xd5299d[_0x5a2132(0x6c7)][_0x5a2132(0x471)]);else{var _0x2a6656=Number(RegExp['$1']);_0x2be1b5+=_0x2a6656;}}if(_0x5b27d8[_0x5a2132(0x163)][_0x5a2132(0x13d)](VisuMZ[_0x5a2132(0x9dd)][_0x5a2132(0x5fb)][_0x5a2132(0x52a)][_0x33c0ee])){var _0x501eae=String(RegExp['$1']);try{_0x5a2132(0x4c1)!==_0x5a2132(0x40f)?_0x2be1b5+=eval(_0x501eae):_0x2eb64f[_0x5a2132(0xf9)](_0x2333ef);}catch(_0x525226){if($gameTemp[_0x5a2132(0x4d4)]())console[_0x5a2132(0x478)](_0x525226);}}return _0x2be1b5;}else{if(_0x19511d[_0x5a2132(0x41b)]())return;_0x494876[_0x5a2132(0x320)](_0x3935c2,_0x359118);const _0x18f825=_0x2dc768[_0x5a2132(0x3e0)];for(const _0x11f2e2 of _0x18f825){const _0xefdd5a=_0x5cca51['value'](_0x11f2e2);_0x2a33bd['setValue'](_0x11f2e2,!_0xefdd5a);}}};return this[_0x5d42d3(0x5ea)]()[_0x5d42d3(0x79d)](_0x2d3c4c,0x0);},Game_BattlerBase[_0x33ad8c(0x116)][_0x33ad8c(0x272)]=function(_0x2d1d41){const _0x29ed26=_0x33ad8c;let _0x1c1c89=_0x29ed26(0x272)+_0x2d1d41+_0x29ed26(0x13e);if(this['checkCacheKey'](_0x1c1c89))return this[_0x29ed26(0x2e4)][_0x1c1c89];return this[_0x29ed26(0x2e4)][_0x1c1c89]=VisuMZ[_0x29ed26(0x9dd)]['Settings']['Param'][_0x29ed26(0x746)][_0x29ed26(0x439)](this,_0x2d1d41),this[_0x29ed26(0x2e4)][_0x1c1c89];},Game_BattlerBase['prototype'][_0x33ad8c(0x4f9)]=function(_0x18cd32,_0x4b5f13){const _0x341244=_0x33ad8c;if(typeof paramId===_0x341244(0x37d))return this[_0x341244(0x83d)](_0x18cd32);_0x18cd32=String(_0x18cd32||'')[_0x341244(0x455)]();if(_0x18cd32===_0x341244(0xfd))return this[_0x341244(0x83d)](0x0);if(_0x18cd32===_0x341244(0x5f3))return this['param'](0x1);if(_0x18cd32===_0x341244(0x5a4))return this[_0x341244(0x83d)](0x2);if(_0x18cd32===_0x341244(0x168))return this[_0x341244(0x83d)](0x3);if(_0x18cd32==='MAT')return this[_0x341244(0x83d)](0x4);if(_0x18cd32===_0x341244(0x302))return this['param'](0x5);if(_0x18cd32===_0x341244(0x777))return this[_0x341244(0x83d)](0x6);if(_0x18cd32==='LUK')return this['param'](0x7);if(_0x18cd32===_0x341244(0x7ea))return _0x4b5f13?String(Math['round'](this['xparam'](0x0)*0x64))+'%':this[_0x341244(0xa15)](0x0);if(_0x18cd32===_0x341244(0x3a2))return _0x4b5f13?String(Math[_0x341244(0x758)](this['xparam'](0x1)*0x64))+'%':this[_0x341244(0xa15)](0x1);if(_0x18cd32===_0x341244(0x6b7))return _0x4b5f13?String(Math[_0x341244(0x758)](this[_0x341244(0xa15)](0x2)*0x64))+'%':this[_0x341244(0xa15)](0x2);if(_0x18cd32===_0x341244(0x4f7))return _0x4b5f13?String(Math[_0x341244(0x758)](this['xparam'](0x3)*0x64))+'%':this[_0x341244(0xa15)](0x3);if(_0x18cd32===_0x341244(0x3ad))return _0x4b5f13?String(Math['round'](this['xparam'](0x4)*0x64))+'%':this[_0x341244(0xa15)](0x4);if(_0x18cd32===_0x341244(0x915))return _0x4b5f13?String(Math[_0x341244(0x758)](this[_0x341244(0xa15)](0x5)*0x64))+'%':this[_0x341244(0xa15)](0x5);if(_0x18cd32===_0x341244(0x4af))return _0x4b5f13?String(Math['round'](this[_0x341244(0xa15)](0x6)*0x64))+'%':this[_0x341244(0xa15)](0x6);if(_0x18cd32==='HRG')return _0x4b5f13?String(Math[_0x341244(0x758)](this[_0x341244(0xa15)](0x7)*0x64))+'%':this[_0x341244(0xa15)](0x7);if(_0x18cd32===_0x341244(0x3a7))return _0x4b5f13?String(Math['round'](this[_0x341244(0xa15)](0x8)*0x64))+'%':this[_0x341244(0xa15)](0x8);if(_0x18cd32===_0x341244(0x296))return _0x4b5f13?String(Math[_0x341244(0x758)](this[_0x341244(0xa15)](0x9)*0x64))+'%':this[_0x341244(0xa15)](0x9);if(_0x18cd32===_0x341244(0x912))return _0x4b5f13?String(Math['round'](this[_0x341244(0x272)](0x0)*0x64))+'%':this[_0x341244(0x272)](0x0);if(_0x18cd32==='GRD')return _0x4b5f13?String(Math[_0x341244(0x758)](this['sparam'](0x1)*0x64))+'%':this[_0x341244(0x272)](0x1);if(_0x18cd32===_0x341244(0x840))return _0x4b5f13?String(Math[_0x341244(0x758)](this[_0x341244(0x272)](0x2)*0x64))+'%':this[_0x341244(0x272)](0x2);if(_0x18cd32==='PHA')return _0x4b5f13?String(Math[_0x341244(0x758)](this[_0x341244(0x272)](0x3)*0x64))+'%':this[_0x341244(0x272)](0x3);if(_0x18cd32==='MCR')return _0x4b5f13?String(Math['round'](this['sparam'](0x4)*0x64))+'%':this[_0x341244(0x272)](0x4);if(_0x18cd32===_0x341244(0x597))return _0x4b5f13?String(Math[_0x341244(0x758)](this['sparam'](0x5)*0x64))+'%':this[_0x341244(0x272)](0x5);if(_0x18cd32===_0x341244(0x953))return _0x4b5f13?String(Math[_0x341244(0x758)](this['sparam'](0x6)*0x64))+'%':this[_0x341244(0x272)](0x6);if(_0x18cd32===_0x341244(0x933))return _0x4b5f13?String(Math[_0x341244(0x758)](this[_0x341244(0x272)](0x7)*0x64))+'%':this[_0x341244(0x272)](0x7);if(_0x18cd32===_0x341244(0x4a1))return _0x4b5f13?String(Math[_0x341244(0x758)](this[_0x341244(0x272)](0x8)*0x64))+'%':this[_0x341244(0x272)](0x8);if(_0x18cd32===_0x341244(0x7a4))return _0x4b5f13?String(Math['round'](this[_0x341244(0x272)](0x9)*0x64))+'%':this[_0x341244(0x272)](0x9);if(VisuMZ[_0x341244(0x9dd)][_0x341244(0x160)][_0x18cd32]){if(_0x341244(0x1fa)===_0x341244(0x1fa)){const _0x54469a=VisuMZ[_0x341244(0x9dd)]['CustomParamAbb'][_0x18cd32],_0x3d774f=this[_0x54469a];if(VisuMZ[_0x341244(0x9dd)][_0x341244(0x772)][_0x18cd32]===_0x341244(0x329))return _0x3d774f;else{if('eqzyo'==='eqzyo')return _0x4b5f13?String(Math[_0x341244(0x758)](_0x3d774f*0x64))+'%':_0x3d774f;else _0x3d74b9[_0x341244(0x9dd)]['Game_Temp_initialize'][_0x341244(0x439)](this),this['forceOutOfPlaytest'](),this[_0x341244(0x5f4)](),this['createPointAnimationQueue']();}}else this[_0x341244(0x934)][_0x341244(0x672)](_0x3f2658['layoutSettings']['GoldBgType']);}return'';},Game_BattlerBase[_0x33ad8c(0x116)][_0x33ad8c(0x6b8)]=function(){const _0x175f18=_0x33ad8c;return this[_0x175f18(0x973)]()&&this[_0x175f18(0x4ba)]<this[_0x175f18(0x2a8)]*VisuMZ[_0x175f18(0x9dd)][_0x175f18(0x828)][_0x175f18(0x87b)]['CrisisRate'];},Game_Battler['prototype'][_0x33ad8c(0x63b)]=function(){const _0x2af48c=_0x33ad8c;SoundManager[_0x2af48c(0x48a)](),this[_0x2af48c(0x632)]('evade');},VisuMZ[_0x33ad8c(0x9dd)]['Game_Actor_paramBase']=Game_Actor[_0x33ad8c(0x116)][_0x33ad8c(0x7ee)],Game_Actor[_0x33ad8c(0x116)]['paramBase']=function(_0x4a3bae){const _0x4e730d=_0x33ad8c;if(this[_0x4e730d(0x421)]>0x63)return this[_0x4e730d(0x713)](_0x4a3bae);return VisuMZ[_0x4e730d(0x9dd)]['Game_Actor_paramBase']['call'](this,_0x4a3bae);},Game_Actor[_0x33ad8c(0x116)]['paramBaseAboveLevel99']=function(_0x2bccca){const _0x525a4a=_0x33ad8c,_0x5d3202=this[_0x525a4a(0x40c)]()['params'][_0x2bccca][0x63],_0x1fdb87=this[_0x525a4a(0x40c)]()['params'][_0x2bccca][0x62];return _0x5d3202+(_0x5d3202-_0x1fdb87)*(this[_0x525a4a(0x421)]-0x63);},VisuMZ[_0x33ad8c(0x9dd)]['Game_Actor_changeClass']=Game_Actor[_0x33ad8c(0x116)][_0x33ad8c(0x8dd)],Game_Actor[_0x33ad8c(0x116)][_0x33ad8c(0x8dd)]=function(_0x418919,_0x36801f){const _0x50dc07=_0x33ad8c;$gameTemp['_changingClass']=!![],VisuMZ[_0x50dc07(0x9dd)][_0x50dc07(0x4ac)][_0x50dc07(0x439)](this,_0x418919,_0x36801f),$gameTemp[_0x50dc07(0xfa)]=undefined;},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x174)]=Game_Actor[_0x33ad8c(0x116)][_0x33ad8c(0x4c8)],Game_Actor[_0x33ad8c(0x116)][_0x33ad8c(0x4c8)]=function(){const _0x34c996=_0x33ad8c;VisuMZ[_0x34c996(0x9dd)][_0x34c996(0x174)]['call'](this);if(!$gameTemp[_0x34c996(0xfa)])this[_0x34c996(0x91c)]();},Game_Actor['prototype'][_0x33ad8c(0x91c)]=function(){const _0x5a51b5=_0x33ad8c;this[_0x5a51b5(0x2e4)]={};if(VisuMZ[_0x5a51b5(0x9dd)][_0x5a51b5(0x828)][_0x5a51b5(0x113)][_0x5a51b5(0x7a2)])this['_hp']=this[_0x5a51b5(0x2a8)];if(VisuMZ[_0x5a51b5(0x9dd)]['Settings'][_0x5a51b5(0x113)]['LevelUpFullMp'])this[_0x5a51b5(0x4ec)]=this[_0x5a51b5(0x646)];},Game_Actor[_0x33ad8c(0x116)][_0x33ad8c(0x966)]=function(){const _0x18d6b0=_0x33ad8c;if(this[_0x18d6b0(0x3a1)]())return 0x1;const _0x1cfc77=this['nextLevelExp']()-this[_0x18d6b0(0x943)](),_0x45122e=this[_0x18d6b0(0x1a1)]()-this[_0x18d6b0(0x943)]();return(_0x45122e/_0x1cfc77)[_0x18d6b0(0x482)](0x0,0x1);},Game_Actor[_0x33ad8c(0x116)][_0x33ad8c(0x5ea)]=function(){const _0x128148=_0x33ad8c,_0x2e96ff=Game_Battler[_0x128148(0x116)][_0x128148(0x5ea)]['call'](this);for(const _0x110220 of this[_0x128148(0x714)]()){_0x110220&&_0x2e96ff[_0x128148(0x8f7)](_0x110220);}return _0x2e96ff['push'](this[_0x128148(0x40c)](),this[_0x128148(0x2ff)]()),_0x2e96ff;},Object[_0x33ad8c(0x6cc)](Game_Enemy['prototype'],_0x33ad8c(0x421),{'get':function(){const _0x890226=_0x33ad8c;return this[_0x890226(0x92b)]();},'configurable':!![]}),Game_Enemy[_0x33ad8c(0x116)]['getLevel']=function(){const _0x1da0c3=_0x33ad8c;return this[_0x1da0c3(0x3e1)]()[_0x1da0c3(0x421)];},Game_Enemy[_0x33ad8c(0x116)][_0x33ad8c(0x6e9)]=function(){const _0x1cada0=_0x33ad8c;!this[_0x1cada0(0x8a6)]&&(this[_0x1cada0(0x3f6)]+=Math['round']((Graphics[_0x1cada0(0x64c)]-0x270)/0x2),this[_0x1cada0(0x3f6)]-=Math[_0x1cada0(0x701)]((Graphics[_0x1cada0(0x64c)]-Graphics[_0x1cada0(0x562)])/0x2),$gameSystem[_0x1cada0(0x7b5)]()?this[_0x1cada0(0x78e)]-=Math[_0x1cada0(0x701)]((Graphics[_0x1cada0(0x483)]-Graphics[_0x1cada0(0x7e0)])/0x2):this[_0x1cada0(0x78e)]+=Math[_0x1cada0(0x758)]((Graphics[_0x1cada0(0x7e0)]-0x330)/0x2)),this['_repositioned']=!![];},Game_Party[_0x33ad8c(0x116)]['maxGold']=function(){const _0x57d45d=_0x33ad8c;return VisuMZ['CoreEngine']['Settings'][_0x57d45d(0x499)]['GoldMax'];},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x82b)]=Game_Party[_0x33ad8c(0x116)][_0x33ad8c(0x685)],Game_Party['prototype']['consumeItem']=function(_0x3bee66){const _0xf3d00d=_0x33ad8c;if(VisuMZ[_0xf3d00d(0x9dd)]['Settings'][_0xf3d00d(0x113)][_0xf3d00d(0x898)]&&DataManager[_0xf3d00d(0x503)](_0x3bee66))return;VisuMZ[_0xf3d00d(0x9dd)][_0xf3d00d(0x82b)][_0xf3d00d(0x439)](this,_0x3bee66);},Game_Party[_0x33ad8c(0x116)][_0x33ad8c(0x518)]=function(){const _0x102609=_0x33ad8c,_0x115741=VisuMZ['CoreEngine'][_0x102609(0x828)]['QoL'],_0x153d26=_0x115741[_0x102609(0x71b)]??0x63;let _0x3dd6e2=[];(_0x115741[_0x102609(0x232)]??!![])&&(_0x3dd6e2=_0x3dd6e2['concat']($dataItems));(_0x115741[_0x102609(0x9e7)]??!![])&&(_0x3dd6e2=_0x3dd6e2[_0x102609(0x2f1)]($dataWeapons));(_0x115741[_0x102609(0x31d)]??!![])&&('huKfI'===_0x102609(0x502)?_0x3dd6e2=_0x3dd6e2[_0x102609(0x2f1)]($dataArmors):(_0x21f296+=_0x4fdaf6,_0x4a4144+=_0x102609(0x2a4)[_0x102609(0x3e7)](_0x367a40)));for(const _0x2b6739 of _0x3dd6e2){if('ekrrX'!==_0x102609(0x725)){if(!_0x2b6739)continue;if(_0x2b6739['name'][_0x102609(0x99d)]()<=0x0)continue;if(_0x2b6739[_0x102609(0x62a)][_0x102609(0x13d)](/-----/i))continue;this[_0x102609(0x932)](_0x2b6739,_0x153d26);}else{const _0xe98821=_0x223ec0['CoreEngine'][_0x102609(0x828)][_0x102609(0x560)];for(const _0x431131 of _0xe98821){const _0x38e6ad=(_0x431131[_0x102609(0x4e8)]||'')[_0x102609(0x1fe)]()[_0x102609(0x99d)](),_0x18e2eb=(_0x431131[_0x102609(0x75b)]||'')['toLowerCase']()['trim']();_0x3a02ef[_0x102609(0x9dd)][_0x102609(0x560)][_0x38e6ad]=_0x431131,_0x1886a0[_0x102609(0x9dd)][_0x102609(0x61e)][_0x18e2eb]=_0x38e6ad;}}}},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x6df)]=Game_Troop[_0x33ad8c(0x116)][_0x33ad8c(0x52d)],Game_Troop['prototype'][_0x33ad8c(0x52d)]=function(_0x59a3da){const _0x582238=_0x33ad8c;$gameTemp[_0x582238(0x50a)](),$gameTemp[_0x582238(0x3d9)](_0x59a3da),VisuMZ[_0x582238(0x9dd)]['Game_Troop_setup']['call'](this,_0x59a3da);},VisuMZ[_0x33ad8c(0x9dd)]['Game_Map_setup']=Game_Map['prototype'][_0x33ad8c(0x52d)],Game_Map[_0x33ad8c(0x116)][_0x33ad8c(0x52d)]=function(_0xdb2431){const _0x49f804=_0x33ad8c;VisuMZ[_0x49f804(0x9dd)][_0x49f804(0x433)][_0x49f804(0x439)](this,_0xdb2431),this[_0x49f804(0x18d)](),this[_0x49f804(0x48c)](_0xdb2431);},Game_Map[_0x33ad8c(0x116)]['setupCoreEngine']=function(){const _0x51a643=_0x33ad8c;this[_0x51a643(0x592)]=VisuMZ[_0x51a643(0x9dd)][_0x51a643(0x828)][_0x51a643(0x113)][_0x51a643(0x6a6)]||![];const _0x38ba2f=VisuMZ['CoreEngine'][_0x51a643(0x828)][_0x51a643(0x564)],_0x4862e7=$dataMap?$dataMap[_0x51a643(0x163)]||'':'';if(_0x4862e7['match'](/<SHOW TILE SHADOWS>/i))this[_0x51a643(0x592)]=![];else _0x4862e7['match'](/<HIDE TILE SHADOWS>/i)&&(this[_0x51a643(0x592)]=!![]);if(_0x4862e7[_0x51a643(0x13d)](/<SCROLL LOCK X>/i))this[_0x51a643(0x63f)]()[_0x51a643(0x82f)]=!![],this['centerCameraCheckData']()[_0x51a643(0x4fa)]=_0x38ba2f[_0x51a643(0x327)];else _0x4862e7[_0x51a643(0x13d)](/<SCROLL LOCK X: (.*?)>/i)&&(this[_0x51a643(0x63f)]()[_0x51a643(0x82f)]=!![],this[_0x51a643(0x63f)]()[_0x51a643(0x4fa)]=Number(RegExp['$1']));if(_0x4862e7[_0x51a643(0x13d)](/<SCROLL LOCK Y>/i))this[_0x51a643(0x63f)]()[_0x51a643(0x7ec)]=!![],this[_0x51a643(0x63f)]()[_0x51a643(0x21f)]=_0x38ba2f[_0x51a643(0x1e2)];else _0x4862e7[_0x51a643(0x13d)](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x51a643(0x63f)]()[_0x51a643(0x7ec)]=!![],this[_0x51a643(0x63f)]()[_0x51a643(0x21f)]=Number(RegExp['$1']));},Game_Map[_0x33ad8c(0x116)][_0x33ad8c(0x98b)]=function(){const _0x1b0792=_0x33ad8c;if(this[_0x1b0792(0x592)]===undefined)this['setupCoreEngine']();return this[_0x1b0792(0x592)];},Game_Map[_0x33ad8c(0x116)]['checkCoreEngineDisplayCenter']=function(){const _0x2477c5=_0x33ad8c,_0x46c3bc=VisuMZ[_0x2477c5(0x9dd)]['Settings'][_0x2477c5(0x564)];this[_0x2477c5(0x6a3)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x46c3bc[_0x2477c5(0x5bc)]){const _0x5e5ab2=Graphics[_0x2477c5(0x483)]/this['tileWidth']();_0x5e5ab2%0x1!==0x0&&Math[_0x2477c5(0x5c7)](_0x5e5ab2)===this[_0x2477c5(0x483)]()&&!this[_0x2477c5(0x1f5)]()&&(this[_0x2477c5(0x6a3)][_0x2477c5(0x82f)]=!![],this[_0x2477c5(0x6a3)]['displayX']=_0x46c3bc[_0x2477c5(0x327)]||0x0);}if(_0x46c3bc[_0x2477c5(0x584)]){if(_0x2477c5(0x1a7)===_0x2477c5(0x2f0))this[_0x2477c5(0x4bb)]&&this[_0x2477c5(0x4bb)][_0x2477c5(0x672)](_0x2a1621[_0x2477c5(0x6c7)][_0x2477c5(0x874)]),this[_0x2477c5(0x934)]&&this[_0x2477c5(0x934)]['setBackgroundType'](_0x5a4c2b[_0x2477c5(0x6c7)][_0x2477c5(0x1aa)]),this['_statusWindow']&&this[_0x2477c5(0x894)]['setBackgroundType'](_0x4c5b90[_0x2477c5(0x6c7)][_0x2477c5(0x451)]);else{const _0xdfb8f3=Graphics[_0x2477c5(0x64c)]/this[_0x2477c5(0x5f0)]();_0xdfb8f3%0x1!==0x0&&Math[_0x2477c5(0x5c7)](_0xdfb8f3)===this[_0x2477c5(0x64c)]()&&!this[_0x2477c5(0x57d)]()&&(this[_0x2477c5(0x6a3)][_0x2477c5(0x7ec)]=!![],this[_0x2477c5(0x6a3)][_0x2477c5(0x21f)]=_0x46c3bc['DisplayLockY']||0x0);}}$gameScreen[_0x2477c5(0x5bb)]()===0x1&&(this[_0x2477c5(0x63f)]()[_0x2477c5(0x82f)]&&(this[_0x2477c5(0x454)]=this['centerCameraCheckData']()['displayX']),this['centerCameraCheckData']()[_0x2477c5(0x7ec)]&&(this[_0x2477c5(0x283)]=this[_0x2477c5(0x63f)]()['displayY']));},VisuMZ[_0x33ad8c(0x9dd)]['Game_Map_setDisplayPos']=Game_Map['prototype']['setDisplayPos'],Game_Map[_0x33ad8c(0x116)][_0x33ad8c(0x132)]=function(_0x2e9260,_0x31f968){const _0x7093fb=_0x33ad8c;VisuMZ[_0x7093fb(0x9dd)][_0x7093fb(0x761)][_0x7093fb(0x439)](this,_0x2e9260,_0x31f968),$gameScreen[_0x7093fb(0x5bb)]()===0x1&&(!this[_0x7093fb(0x1f5)]()&&this[_0x7093fb(0x63f)]()[_0x7093fb(0x82f)]&&(this[_0x7093fb(0x454)]=this[_0x7093fb(0x63f)]()[_0x7093fb(0x4fa)]),!this[_0x7093fb(0x57d)]()&&this[_0x7093fb(0x63f)]()[_0x7093fb(0x7ec)]&&(this['_displayY']=this[_0x7093fb(0x63f)]()[_0x7093fb(0x21f)]));},Game_Map[_0x33ad8c(0x116)][_0x33ad8c(0x63f)]=function(){const _0x458c59=_0x33ad8c;if(this[_0x458c59(0x6a3)]===undefined)this[_0x458c59(0x18d)]();return this[_0x458c59(0x6a3)];},VisuMZ[_0x33ad8c(0x9dd)]['Game_Map_scrollDown']=Game_Map[_0x33ad8c(0x116)][_0x33ad8c(0x4d1)],Game_Map['prototype'][_0x33ad8c(0x4d1)]=function(_0x423080){const _0x3b0c02=_0x33ad8c;if(this[_0x3b0c02(0x63f)]()[_0x3b0c02(0x7ec)]&&$gameScreen['zoomScale']()===0x1){if(_0x3b0c02(0x46b)==='aTUcK')return this[_0x3b0c02(0x1d1)]||null;else{this[_0x3b0c02(0x283)]=this[_0x3b0c02(0x63f)]()[_0x3b0c02(0x21f)];return;}}VisuMZ[_0x3b0c02(0x9dd)][_0x3b0c02(0x22a)]['call'](this,_0x423080);},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x64b)]=Game_Map[_0x33ad8c(0x116)][_0x33ad8c(0x749)],Game_Map[_0x33ad8c(0x116)][_0x33ad8c(0x749)]=function(_0x33e7db){const _0x492016=_0x33ad8c;if(this[_0x492016(0x63f)]()[_0x492016(0x82f)]&&$gameScreen[_0x492016(0x5bb)]()===0x1){if('eUyMZ'===_0x492016(0x195)){this['_displayX']=this[_0x492016(0x63f)]()[_0x492016(0x4fa)];return;}else this[_0x492016(0x1f7)][_0x492016(0x672)](_0x43fdbf[_0x492016(0x6c7)][_0x492016(0x180)]);}VisuMZ['CoreEngine'][_0x492016(0x64b)]['call'](this,_0x33e7db);},VisuMZ['CoreEngine']['Game_Map_scrollRight']=Game_Map[_0x33ad8c(0x116)][_0x33ad8c(0x1c6)],Game_Map[_0x33ad8c(0x116)][_0x33ad8c(0x1c6)]=function(_0x5a3408){const _0xe16275=_0x33ad8c;if(this[_0xe16275(0x63f)]()['centerX']&&$gameScreen[_0xe16275(0x5bb)]()===0x1){if('MWqIT'===_0xe16275(0x383))this[_0xe16275(0x7bc)]+=this[_0xe16275(0x6ef)](),this[_0xe16275(0x436)]()&&(this[_0xe16275(0x256)]=![]);else{this['_displayX']=this[_0xe16275(0x63f)]()[_0xe16275(0x4fa)];return;}}VisuMZ[_0xe16275(0x9dd)][_0xe16275(0x65a)][_0xe16275(0x439)](this,_0x5a3408);},VisuMZ[_0x33ad8c(0x9dd)]['Game_Map_scrollUp']=Game_Map[_0x33ad8c(0x116)][_0x33ad8c(0xa20)],Game_Map['prototype']['scrollUp']=function(_0x536c94){const _0x2c9a4a=_0x33ad8c;if(this[_0x2c9a4a(0x63f)]()[_0x2c9a4a(0x7ec)]&&$gameScreen[_0x2c9a4a(0x5bb)]()===0x1){if(_0x2c9a4a(0x10e)===_0x2c9a4a(0x667)){var _0x120b7b=_0x13f0cd(_0x484161['$1']);try{_0x5ef731*=_0x338955(_0x120b7b);}catch(_0x45342a){if(_0x535e8d[_0x2c9a4a(0x4d4)]())_0x6082d9['log'](_0x45342a);}}else{this['_displayY']=this[_0x2c9a4a(0x63f)]()[_0x2c9a4a(0x21f)];return;}}VisuMZ['CoreEngine']['Game_Map_scrollUp']['call'](this,_0x536c94);},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x611)]=Game_Character[_0x33ad8c(0x116)][_0x33ad8c(0x2ea)],Game_Character['prototype']['processMoveCommand']=function(_0x1bb588){const _0x28a79b=_0x33ad8c;try{VisuMZ[_0x28a79b(0x9dd)][_0x28a79b(0x611)][_0x28a79b(0x439)](this,_0x1bb588);}catch(_0x102924){if($gameTemp[_0x28a79b(0x4d4)]())console[_0x28a79b(0x478)](_0x102924);}},Game_Player[_0x33ad8c(0x116)]['makeEncounterCount']=function(){const _0x1e980a=_0x33ad8c,_0x2bd690=$gameMap[_0x1e980a(0x96e)]();this[_0x1e980a(0x431)]=Math['randomInt'](_0x2bd690)+Math['randomInt'](_0x2bd690)+this[_0x1e980a(0x217)]();},Game_Player[_0x33ad8c(0x116)][_0x33ad8c(0x217)]=function(){const _0x23779c=_0x33ad8c;if($dataMap&&$dataMap['note']&&$dataMap[_0x23779c(0x163)][_0x23779c(0x13d)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)){if('uDoyd'!==_0x23779c(0x985))this['isMaskingEnabled']()?_0x9d1525[_0x23779c(0x9dd)][_0x23779c(0x75c)][_0x23779c(0x439)](this,_0x275ba3):this[_0x23779c(0x5ec)](_0x4c7ba3);else return Number(RegExp['$1']);}else return VisuMZ['CoreEngine'][_0x23779c(0x828)][_0x23779c(0x113)][_0x23779c(0x1ba)];},VisuMZ[_0x33ad8c(0x9dd)]['Game_Event_isCollidedWithEvents']=Game_Event[_0x33ad8c(0x116)][_0x33ad8c(0x97c)],Game_Event[_0x33ad8c(0x116)][_0x33ad8c(0x97c)]=function(_0x3579ce,_0x1cf030){const _0x37b411=_0x33ad8c;return this[_0x37b411(0x687)]()?this[_0x37b411(0x675)](_0x3579ce,_0x1cf030):'hNqjq'!==_0x37b411(0x7d7)?VisuMZ[_0x37b411(0x9dd)][_0x37b411(0x5b4)][_0x37b411(0x439)](this,_0x3579ce,_0x1cf030):_0x460b6f[_0x37b411(0x6c7)][_0x37b411(0x2af)][_0x37b411(0x439)](this);},Game_Event[_0x33ad8c(0x116)]['isSmartEventCollisionOn']=function(){const _0x157095=_0x33ad8c;return VisuMZ[_0x157095(0x9dd)]['Settings'][_0x157095(0x113)][_0x157095(0x516)];},Game_Event[_0x33ad8c(0x116)][_0x33ad8c(0x675)]=function(_0x44c0d6,_0x4b41cf){const _0x6e744b=_0x33ad8c;if(!this[_0x6e744b(0x27e)]())return![];else{const _0x3f7811=$gameMap[_0x6e744b(0x78a)](_0x44c0d6,_0x4b41cf)[_0x6e744b(0x238)](_0x4bf3d3=>_0x4bf3d3[_0x6e744b(0x27e)]());return _0x3f7811[_0x6e744b(0x1cc)]>0x0;}},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x4da)]=Game_Interpreter[_0x33ad8c(0x116)][_0x33ad8c(0x96a)],Game_Interpreter[_0x33ad8c(0x116)]['command105']=function(_0x28d659){const _0x33abbf=_0x33ad8c,_0x1d0d19=this['getCombinedScrollingText']();if(_0x1d0d19[_0x33abbf(0x13d)](/\/\/[ ]SCRIPT[ ]CALL/i)){if('YFqmQ'===_0x33abbf(0x51c))this['initialize'](...arguments);else return this['runCombinedScrollingTextAsCode'](_0x1d0d19);}else return VisuMZ[_0x33abbf(0x9dd)][_0x33abbf(0x4da)]['call'](this,_0x28d659);},Game_Interpreter[_0x33ad8c(0x116)][_0x33ad8c(0x26f)]=function(){const _0x2a3dea=_0x33ad8c;let _0x1f840b='',_0x3a0e2a=this['_index']+0x1;while(this[_0x2a3dea(0x2e9)][_0x3a0e2a]&&this[_0x2a3dea(0x2e9)][_0x3a0e2a]['code']===0x195){if('WghbW'===_0x2a3dea(0x222))return this['_name'][_0x2a3dea(0x5fc)]('/')[_0x2a3dea(0x32d)]();else _0x1f840b+=this[_0x2a3dea(0x2e9)][_0x3a0e2a]['parameters'][0x0]+'\x0a',_0x3a0e2a++;}return _0x1f840b;},Game_Interpreter[_0x33ad8c(0x116)]['runCombinedScrollingTextAsCode']=function(_0x5e700b){const _0x54af4e=_0x33ad8c;try{eval(_0x5e700b);}catch(_0x355dfe){if($gameTemp[_0x54af4e(0x4d4)]()){if(_0x54af4e(0x4fb)===_0x54af4e(0x1e3)){if(!_0x302bab)return;if(!_0x3b1207[_0x54af4e(0x1b5)]())return;const _0x3c005e=0x80,_0x119c15=_0x390e2d['expRate']();let _0x18bf40=_0x4df2b5[_0x54af4e(0x610)](),_0x4b3d08=_0x2ba4d2['expGaugeColor2']();_0x119c15>=0x1&&(_0x18bf40=_0x43e86c[_0x54af4e(0x198)](),_0x4b3d08=_0x13d0f5['maxLvGaugeColor2']()),this[_0x54af4e(0x9ac)](_0x88d0e5,_0x276fbb,_0x3c005e,_0x119c15,_0x18bf40,_0x4b3d08);}else console[_0x54af4e(0x478)]('Show\x20Scrolling\x20Text\x20Script\x20Error'),console[_0x54af4e(0x478)](_0x355dfe);}}return!![];},VisuMZ['CoreEngine'][_0x33ad8c(0x5a0)]=Game_Interpreter[_0x33ad8c(0x116)][_0x33ad8c(0x6d7)],Game_Interpreter[_0x33ad8c(0x116)][_0x33ad8c(0x6d7)]=function(_0x3424e2){const _0x457e90=_0x33ad8c;try{_0x457e90(0x9d9)!==_0x457e90(0x9d9)?(_0x293999+=_0x3e23e4,_0x574605+='%1〘Choice\x20%2〙\x20%3%1'[_0x457e90(0x3e7)](_0x4cd940,_0x5898ab[_0x457e90(0x258)][0x0]+0x1,_0x44a45d[_0x457e90(0x258)][0x1])):VisuMZ['CoreEngine'][_0x457e90(0x5a0)][_0x457e90(0x439)](this,_0x3424e2);}catch(_0x5e4aa3){$gameTemp[_0x457e90(0x4d4)]()&&(console[_0x457e90(0x478)]('Conditional\x20Branch\x20Script\x20Error'),console[_0x457e90(0x478)](_0x5e4aa3)),this['skipBranch']();}return!![];},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x334)]=Game_Interpreter[_0x33ad8c(0x116)][_0x33ad8c(0x131)],Game_Interpreter['prototype'][_0x33ad8c(0x131)]=function(_0x3ee534){const _0xaccc54=_0x33ad8c;try{VisuMZ['CoreEngine']['Game_Interpreter_command122'][_0xaccc54(0x439)](this,_0x3ee534);}catch(_0x1dbfbd){if('FGgow'!==_0xaccc54(0x235))$gameTemp[_0xaccc54(0x4d4)]()&&(console[_0xaccc54(0x478)](_0xaccc54(0x14a)),console[_0xaccc54(0x478)](_0x1dbfbd));else{var _0x4566a2=_0x16b921(_0x137217['$1']);_0x75df1e*=_0x4566a2;}}return!![];},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x41e)]=Game_Interpreter['prototype'][_0x33ad8c(0x376)],Game_Interpreter[_0x33ad8c(0x116)][_0x33ad8c(0x376)]=function(){const _0x48d124=_0x33ad8c;try{VisuMZ['CoreEngine'][_0x48d124(0x41e)][_0x48d124(0x439)](this);}catch(_0x1661cd){if($gameTemp[_0x48d124(0x4d4)]()){if(_0x48d124(0x2f9)==='WLAly')return _0x23b7a5[_0x48d124(0x54c)];else console[_0x48d124(0x478)]('Script\x20Call\x20Error'),console[_0x48d124(0x478)](_0x1661cd);}}return!![];},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x77a)]=Game_Interpreter[_0x33ad8c(0x116)][_0x33ad8c(0x89e)],Game_Interpreter[_0x33ad8c(0x116)][_0x33ad8c(0x89e)]=function(_0x3f50a7){const _0x696959=_0x33ad8c;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ[_0x696959(0x9dd)][_0x696959(0x77a)][_0x696959(0x439)](this,_0x3f50a7);},Scene_Base[_0x33ad8c(0x116)][_0x33ad8c(0x947)]=function(){const _0x43db74=_0x33ad8c;return VisuMZ[_0x43db74(0x9dd)][_0x43db74(0x828)]['UI'][_0x43db74(0x533)];},Scene_Base[_0x33ad8c(0x116)][_0x33ad8c(0x5f8)]=function(){const _0x22842c=_0x33ad8c;return VisuMZ[_0x22842c(0x9dd)]['Settings']['UI'][_0x22842c(0x6ed)];},Scene_Base[_0x33ad8c(0x116)][_0x33ad8c(0x242)]=function(){const _0x387eeb=_0x33ad8c;return VisuMZ['CoreEngine'][_0x387eeb(0x828)]['UI'][_0x387eeb(0x1d3)];},Scene_Base[_0x33ad8c(0x116)][_0x33ad8c(0x395)]=function(){const _0x1e0ba8=_0x33ad8c;return VisuMZ[_0x1e0ba8(0x9dd)][_0x1e0ba8(0x828)]['UI'][_0x1e0ba8(0x6c2)];},Scene_Base[_0x33ad8c(0x116)][_0x33ad8c(0x106)]=function(){const _0x1b48d3=_0x33ad8c;return VisuMZ[_0x1b48d3(0x9dd)][_0x1b48d3(0x828)]['UI'][_0x1b48d3(0x4f2)];},Scene_Base[_0x33ad8c(0x116)][_0x33ad8c(0x54f)]=function(){const _0x3ce2f8=_0x33ad8c;return VisuMZ[_0x3ce2f8(0x9dd)]['Settings']['UI'][_0x3ce2f8(0x554)];},Scene_Base[_0x33ad8c(0x116)][_0x33ad8c(0x3a5)]=function(){const _0x39bec5=_0x33ad8c;return VisuMZ[_0x39bec5(0x9dd)]['Settings'][_0x39bec5(0x839)][_0x39bec5(0x1a2)];},VisuMZ[_0x33ad8c(0x9dd)]['Scene_Base_createWindowLayer']=Scene_Base[_0x33ad8c(0x116)][_0x33ad8c(0x94e)],Scene_Base[_0x33ad8c(0x116)][_0x33ad8c(0x94e)]=function(){const _0x500e3a=_0x33ad8c;VisuMZ['CoreEngine']['Scene_Base_createWindowLayer']['call'](this),this[_0x500e3a(0x231)](),this[_0x500e3a(0x18c)](),this[_0x500e3a(0x1ce)]['x']=Math[_0x500e3a(0x758)](this[_0x500e3a(0x1ce)]['x']),this[_0x500e3a(0x1ce)]['y']=Math[_0x500e3a(0x758)](this['_windowLayer']['y']);},Scene_Base[_0x33ad8c(0x116)][_0x33ad8c(0x231)]=function(){},Scene_Base[_0x33ad8c(0x116)][_0x33ad8c(0x18c)]=function(){const _0x2ea581=_0x33ad8c;this[_0x2ea581(0x77f)]=new Window_TextPopup(),this[_0x2ea581(0x5c6)](this[_0x2ea581(0x77f)]);},$textPopup=function(_0x1547ca){const _0x38278a=_0x33ad8c,_0x36ef94=SceneManager[_0x38278a(0x90d)][_0x38278a(0x77f)];_0x36ef94[_0x38278a(0x3cb)](_0x1547ca);},Scene_Base[_0x33ad8c(0x116)][_0x33ad8c(0x218)]=function(){const _0x1d3cb4=_0x33ad8c;return TextManager[_0x1d3cb4(0x9ff)](_0x1d3cb4(0x1ec),_0x1d3cb4(0x23d));},Scene_Base['prototype']['buttonAssistKey2']=function(){const _0x2b6abe=_0x33ad8c;return TextManager[_0x2b6abe(0xa26)](_0x2b6abe(0x57b));},Scene_Base[_0x33ad8c(0x116)][_0x33ad8c(0x581)]=function(){const _0x8eb279=_0x33ad8c;return TextManager['getInputButtonString'](_0x8eb279(0x203));},Scene_Base[_0x33ad8c(0x116)][_0x33ad8c(0x726)]=function(){return TextManager['getInputButtonString']('ok');},Scene_Base['prototype']['buttonAssistKey5']=function(){const _0x58da8c=_0x33ad8c;return TextManager[_0x58da8c(0xa26)]('cancel');},Scene_Base[_0x33ad8c(0x116)][_0x33ad8c(0x205)]=function(){const _0x5b800d=_0x33ad8c;if(this[_0x5b800d(0x556)]&&this['_pageupButton']['visible'])return _0x5b800d(0x845)==='qfYDy'?TextManager[_0x5b800d(0x54c)]:_0x3d0207['CoreEngine']['Settings']['Color'][_0x5b800d(0x48e)]['call'](this,_0x4014f1);else{if(_0x5b800d(0x86d)===_0x5b800d(0x64e))_0x4eaba1['createBuffer'](_0xfac6b4,_0x37b69c);else return'';}},Scene_Base[_0x33ad8c(0x116)][_0x33ad8c(0x8da)]=function(){return'';},Scene_Base[_0x33ad8c(0x116)][_0x33ad8c(0xa29)]=function(){return'';},Scene_Base[_0x33ad8c(0x116)]['buttonAssistText4']=function(){return TextManager['buttonAssistOk'];},Scene_Base[_0x33ad8c(0x116)][_0x33ad8c(0x75a)]=function(){const _0x71407f=_0x33ad8c;return TextManager[_0x71407f(0x6e2)];},Scene_Base['prototype']['buttonAssistOffset1']=function(){return 0x0;},Scene_Base[_0x33ad8c(0x116)]['buttonAssistOffset2']=function(){return 0x0;},Scene_Base[_0x33ad8c(0x116)]['buttonAssistOffset3']=function(){return 0x0;},Scene_Base['prototype'][_0x33ad8c(0x1f2)]=function(){return 0x0;},Scene_Base[_0x33ad8c(0x116)][_0x33ad8c(0x188)]=function(){return 0x0;},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x63c)]=Scene_Boot[_0x33ad8c(0x116)][_0x33ad8c(0x8a1)],Scene_Boot['prototype'][_0x33ad8c(0x8a1)]=function(){const _0x17af6c=_0x33ad8c;VisuMZ[_0x17af6c(0x9dd)][_0x17af6c(0x63c)][_0x17af6c(0x439)](this),this[_0x17af6c(0x679)]();},Scene_Boot[_0x33ad8c(0x116)][_0x33ad8c(0x679)]=function(){const _0x3b686a=_0x33ad8c,_0x1bc4f2=[_0x3b686a(0x76e),_0x3b686a(0x301),_0x3b686a(0x43a),_0x3b686a(0x987),_0x3b686a(0x53e),_0x3b686a(0x969),_0x3b686a(0x858),_0x3b686a(0x5a5),_0x3b686a(0x7f7),_0x3b686a(0x765),_0x3b686a(0x678),'tilesets',_0x3b686a(0x3d2),_0x3b686a(0x664)];for(const _0x285bfe of _0x1bc4f2){if(_0x3b686a(0x4eb)!==_0x3b686a(0x361)){const _0x2f3d11=VisuMZ[_0x3b686a(0x9dd)][_0x3b686a(0x828)][_0x3b686a(0x73b)][_0x285bfe],_0x9e2423=_0x3b686a(0x529)[_0x3b686a(0x3e7)](_0x285bfe);for(const _0x22f526 of _0x2f3d11){ImageManager['loadBitmap'](_0x9e2423,_0x22f526);}}else{if(this[_0x3b686a(0x4b9)]===_0x222df8)this['initRotationCoreEngine']();const _0x4fe1ee=this['_anglePlus'];if(_0x4fe1ee[_0x3b686a(0x753)]<=0x0)return;_0x4fe1ee[_0x3b686a(0x23c)]=this['applyEasingAnglePlus'](_0x4fe1ee[_0x3b686a(0x23c)],_0x4fe1ee[_0x3b686a(0x680)]),_0x4fe1ee[_0x3b686a(0x753)]--,_0x4fe1ee[_0x3b686a(0x753)]<=0x0&&(_0x4fe1ee[_0x3b686a(0x23c)]=_0x4fe1ee[_0x3b686a(0x680)]);}}},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x2be)]=Scene_Boot[_0x33ad8c(0x116)][_0x33ad8c(0x2c0)],Scene_Boot[_0x33ad8c(0x116)][_0x33ad8c(0x2c0)]=function(){const _0x44cd60=_0x33ad8c;if(Utils[_0x44cd60(0x80a)]('test')&&VisuMZ[_0x44cd60(0x9dd)][_0x44cd60(0x828)][_0x44cd60(0x113)][_0x44cd60(0x54b)]){if(_0x44cd60(0x83f)!==_0x44cd60(0x68f))this[_0x44cd60(0x4b6)]();else{var _0x3b52b6=_0x1fabf3(_0x2acd89['$1']);try{_0x3aa90d+=_0x48ebb9(_0x3b52b6);}catch(_0x12a1ab){if(_0x2fb503['isPlaytest']())_0x548b96[_0x44cd60(0x478)](_0x12a1ab);}}}else VisuMZ[_0x44cd60(0x9dd)]['Scene_Boot_startNormalGame'][_0x44cd60(0x439)](this);},Scene_Boot[_0x33ad8c(0x116)][_0x33ad8c(0x4b6)]=function(){const _0x59e336=_0x33ad8c;this[_0x59e336(0x5f1)](),DataManager[_0x59e336(0x141)](),SceneManager['goto'](Scene_Map);},Scene_Boot[_0x33ad8c(0x116)][_0x33ad8c(0x72d)]=function(){const _0x2db74f=_0x33ad8c,_0x41431d=$dataSystem[_0x2db74f(0x269)]['uiAreaWidth'],_0x356597=$dataSystem[_0x2db74f(0x269)]['uiAreaHeight'],_0x55a2f1=VisuMZ[_0x2db74f(0x9dd)][_0x2db74f(0x828)]['UI']['BoxMargin'];Graphics[_0x2db74f(0x7e0)]=_0x41431d-_0x55a2f1*0x2,Graphics[_0x2db74f(0x562)]=_0x356597-_0x55a2f1*0x2,this[_0x2db74f(0x980)]();},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x149)]=Scene_Boot[_0x33ad8c(0x116)][_0x33ad8c(0x1b2)],Scene_Boot[_0x33ad8c(0x116)]['updateDocumentTitle']=function(){const _0x3a3e2b=_0x33ad8c;if(this['isFullDocumentTitle']()){if(_0x3a3e2b(0x348)!=='FxTUz')this['makeDocumentTitle']();else{if(this[_0x3a3e2b(0x5b0)])_0x2262db[_0x3a3e2b(0x9dd)][_0x3a3e2b(0x8fd)][_0x3a3e2b(0x439)](this);this['destroyCoreEngineMarkedBitmaps']();}}else VisuMZ[_0x3a3e2b(0x9dd)][_0x3a3e2b(0x149)][_0x3a3e2b(0x439)](this);},Scene_Boot['prototype'][_0x33ad8c(0x90f)]=function(){const _0x2bfbd5=_0x33ad8c;if(Scene_Title['subtitle']==='')return![];if(Scene_Title[_0x2bfbd5(0x812)]===_0x2bfbd5(0x857))return![];if(Scene_Title[_0x2bfbd5(0x9a0)]==='')return![];if(Scene_Title['version']===_0x2bfbd5(0x264))return![];return!![];},Scene_Boot[_0x33ad8c(0x116)][_0x33ad8c(0x15d)]=function(){const _0x3cc32e=_0x33ad8c,_0x1ee0ac=$dataSystem[_0x3cc32e(0x14c)],_0x459149=Scene_Title['subtitle']||'',_0xdebe12=Scene_Title[_0x3cc32e(0x9a0)]||'',_0x3c557d=VisuMZ['CoreEngine'][_0x3cc32e(0x828)][_0x3cc32e(0x5ce)][_0x3cc32e(0x18e)][_0x3cc32e(0x326)],_0x409387=_0x3c557d[_0x3cc32e(0x3e7)](_0x1ee0ac,_0x459149,_0xdebe12);document['title']=_0x409387;},Scene_Boot[_0x33ad8c(0x116)][_0x33ad8c(0x980)]=function(){const _0x53688b=_0x33ad8c;if(VisuMZ['CoreEngine'][_0x53688b(0x828)]['UI'][_0x53688b(0x3be)]){const _0x194b34=Graphics[_0x53688b(0x483)]-Graphics[_0x53688b(0x7e0)]-VisuMZ[_0x53688b(0x9dd)][_0x53688b(0x828)]['UI'][_0x53688b(0x1f4)]*0x2,_0x488791=Sprite_Button[_0x53688b(0x116)]['blockWidth'][_0x53688b(0x439)](this)*0x4;if(_0x194b34>=_0x488791)SceneManager[_0x53688b(0x9e2)](!![]);}},Scene_Title['subtitle']=VisuMZ['CoreEngine'][_0x33ad8c(0x828)]['MenuLayout'][_0x33ad8c(0x18e)][_0x33ad8c(0x857)],Scene_Title[_0x33ad8c(0x9a0)]=VisuMZ['CoreEngine'][_0x33ad8c(0x828)][_0x33ad8c(0x5ce)][_0x33ad8c(0x18e)][_0x33ad8c(0x5ad)],Scene_Title[_0x33ad8c(0x74b)]=VisuMZ['CoreEngine']['Settings'][_0x33ad8c(0x15c)],VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x2e7)]=Scene_Title[_0x33ad8c(0x116)][_0x33ad8c(0x314)],Scene_Title[_0x33ad8c(0x116)][_0x33ad8c(0x314)]=function(){const _0x30fc84=_0x33ad8c;VisuMZ[_0x30fc84(0x9dd)][_0x30fc84(0x828)][_0x30fc84(0x5ce)][_0x30fc84(0x18e)]['drawGameTitle'][_0x30fc84(0x439)](this);if(Scene_Title[_0x30fc84(0x812)]!==''&&Scene_Title[_0x30fc84(0x812)]!==_0x30fc84(0x857))this[_0x30fc84(0x71c)]();if(Scene_Title[_0x30fc84(0x9a0)]!==''&&Scene_Title[_0x30fc84(0x9a0)]!=='0.00')this[_0x30fc84(0x413)]();},Scene_Title['prototype'][_0x33ad8c(0x71c)]=function(){const _0x311654=_0x33ad8c;VisuMZ['CoreEngine']['Settings'][_0x311654(0x5ce)][_0x311654(0x18e)][_0x311654(0x71c)][_0x311654(0x439)](this);},Scene_Title[_0x33ad8c(0x116)][_0x33ad8c(0x413)]=function(){const _0x15909e=_0x33ad8c;VisuMZ['CoreEngine'][_0x15909e(0x828)][_0x15909e(0x5ce)][_0x15909e(0x18e)][_0x15909e(0x413)][_0x15909e(0x439)](this);},Scene_Title[_0x33ad8c(0x116)]['createCommandWindow']=function(){const _0x28ce5e=_0x33ad8c;this['createTitleButtons']();const _0x23827e=$dataSystem[_0x28ce5e(0x7cd)][_0x28ce5e(0x69d)],_0x388840=this[_0x28ce5e(0x7ac)]();this[_0x28ce5e(0x4bb)]=new Window_TitleCommand(_0x388840),this[_0x28ce5e(0x4bb)][_0x28ce5e(0x672)](_0x23827e);const _0x481f38=this[_0x28ce5e(0x7ac)]();this[_0x28ce5e(0x4bb)][_0x28ce5e(0x7b9)](_0x481f38['x'],_0x481f38['y'],_0x481f38[_0x28ce5e(0x483)],_0x481f38[_0x28ce5e(0x64c)]),this['_commandWindow'][_0x28ce5e(0x688)](),this[_0x28ce5e(0x4bb)][_0x28ce5e(0x438)](),this['_commandWindow'][_0x28ce5e(0x73f)](),this[_0x28ce5e(0x5e9)](this[_0x28ce5e(0x4bb)]);},Scene_Title[_0x33ad8c(0x116)][_0x33ad8c(0x617)]=function(){const _0x26b320=_0x33ad8c;return this['_commandWindow']?this[_0x26b320(0x4bb)]['maxItems']():VisuMZ[_0x26b320(0x9dd)][_0x26b320(0x828)][_0x26b320(0x637)][_0x26b320(0x1cc)];},Scene_Title[_0x33ad8c(0x116)][_0x33ad8c(0x7ac)]=function(){const _0x25cc8d=_0x33ad8c;return VisuMZ[_0x25cc8d(0x9dd)]['Settings'][_0x25cc8d(0x5ce)]['Title'][_0x25cc8d(0x6ee)]['call'](this);},Scene_Title[_0x33ad8c(0x116)]['createTitleButtons']=function(){const _0x581d56=_0x33ad8c;for(const _0x1f111c of Scene_Title[_0x581d56(0x74b)]){if('HBZAb'===_0x581d56(0x673)){const _0x546749=new Sprite_TitlePictureButton(_0x1f111c);this['addChild'](_0x546749);}else{if(this[_0x581d56(0x421)]>0x63)return this[_0x581d56(0x713)](_0x110ee0);return _0x338d32[_0x581d56(0x9dd)]['Game_Actor_paramBase']['call'](this,_0x3e7c68);}}},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x34f)]=Scene_Map[_0x33ad8c(0x116)][_0x33ad8c(0x4b0)],Scene_Map[_0x33ad8c(0x116)][_0x33ad8c(0x4b0)]=function(){const _0x2e758b=_0x33ad8c;VisuMZ[_0x2e758b(0x9dd)]['Scene_Map_initialize'][_0x2e758b(0x439)](this),$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),this[_0x2e758b(0x251)]();},VisuMZ['CoreEngine'][_0x33ad8c(0x523)]=Scene_Map['prototype'][_0x33ad8c(0x310)],Scene_Map[_0x33ad8c(0x116)]['updateMainMultiply']=function(){const _0xb93aee=_0x33ad8c;VisuMZ[_0xb93aee(0x9dd)][_0xb93aee(0x523)]['call'](this),$gameTemp[_0xb93aee(0x3eb)]&&!$gameMessage[_0xb93aee(0x698)]()&&(this[_0xb93aee(0x4f5)](),SceneManager[_0xb93aee(0x2fe)]());},Scene_Map['prototype'][_0x33ad8c(0x3ca)]=function(){const _0x1abf07=_0x33ad8c;Scene_Message[_0x1abf07(0x116)][_0x1abf07(0x3ca)]['call'](this);if(!SceneManager['isNextScene'](Scene_Battle)){if('MhaKg'===_0x1abf07(0x56e))return this[_0x1abf07(0x90d)]&&this['_scene']instanceof _0x4f0d90;else this[_0x1abf07(0x55c)][_0x1abf07(0x88b)](),this[_0x1abf07(0x300)][_0x1abf07(0x3ef)](),this['_windowLayer'][_0x1abf07(0x736)]=![],SceneManager[_0x1abf07(0x42f)]();}$gameScreen[_0x1abf07(0x2fa)](),this[_0x1abf07(0x251)]();},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x801)]=Scene_Map[_0x33ad8c(0x116)]['createMenuButton'],Scene_Map[_0x33ad8c(0x116)][_0x33ad8c(0x3f2)]=function(){const _0x247de6=_0x33ad8c;VisuMZ[_0x247de6(0x9dd)][_0x247de6(0x801)]['call'](this),SceneManager[_0x247de6(0x430)]()&&this['moveMenuButtonSideButtonLayout']();},Scene_Map['prototype']['moveMenuButtonSideButtonLayout']=function(){const _0x4d8b5d=_0x33ad8c;this[_0x4d8b5d(0x9b3)]['x']=Graphics[_0x4d8b5d(0x7e0)]+0x4;},VisuMZ['CoreEngine'][_0x33ad8c(0x46d)]=Scene_Map['prototype']['updateScene'],Scene_Map[_0x33ad8c(0x116)][_0x33ad8c(0x4e7)]=function(){const _0x4123fa=_0x33ad8c;VisuMZ[_0x4123fa(0x9dd)]['Scene_Map_updateScene']['call'](this),this[_0x4123fa(0x6b0)]();},Scene_Map[_0x33ad8c(0x116)][_0x33ad8c(0x6b0)]=function(){const _0x147675=_0x33ad8c;Input[_0x147675(0x616)](_0x147675(0x587))&&(ConfigManager[_0x147675(0x841)]=!ConfigManager[_0x147675(0x841)],ConfigManager[_0x147675(0x6de)]());},VisuMZ['CoreEngine']['Scene_Map_updateMain']=Scene_Map['prototype'][_0x33ad8c(0x4f5)],Scene_Map[_0x33ad8c(0x116)][_0x33ad8c(0x4f5)]=function(){const _0x1d32fd=_0x33ad8c;VisuMZ['CoreEngine']['Scene_Map_updateMain']['call'](this),this[_0x1d32fd(0x50b)]();},Scene_Map[_0x33ad8c(0x116)][_0x33ad8c(0x251)]=function(){const _0x2c71e2=_0x33ad8c;this[_0x2c71e2(0x55f)]=[];},Scene_Map[_0x33ad8c(0x116)][_0x33ad8c(0x50b)]=function(){const _0x432464=_0x33ad8c;if(!this[_0x432464(0x55f)])return;for(const _0x4c2adc of this[_0x432464(0x55f)]){_0x4c2adc&&_0x4c2adc[_0x432464(0x88b)]();}},Scene_Map[_0x33ad8c(0x116)][_0x33ad8c(0xf9)]=function(_0x3ff9ff){const _0x43df8f=_0x33ad8c,_0x3ee455=$dataCommonEvents[_0x3ff9ff];if(!_0x3ee455)return;const _0x42728f=new Game_OnceParallelInterpreter();this[_0x43df8f(0xa00)](_0x42728f),_0x42728f['setCommonEvent'](_0x3ff9ff);},Scene_Map['prototype']['addOnceParallelInterpreter']=function(_0x55ff2d){const _0x362bbe=_0x33ad8c;this[_0x362bbe(0x55f)]=this[_0x362bbe(0x55f)]||[],this[_0x362bbe(0x55f)][_0x362bbe(0x8f7)](_0x55ff2d);},Scene_Map['prototype'][_0x33ad8c(0x156)]=function(_0x2fa6b0){const _0x16abdc=_0x33ad8c;this['_onceParallelInterpreters']=this[_0x16abdc(0x55f)]||[],this[_0x16abdc(0x55f)]['remove'](_0x2fa6b0);};function Game_OnceParallelInterpreter(){const _0x47067a=_0x33ad8c;this[_0x47067a(0x4b0)](...arguments);}Game_OnceParallelInterpreter[_0x33ad8c(0x116)]=Object['create'](Game_Interpreter[_0x33ad8c(0x116)]),Game_OnceParallelInterpreter[_0x33ad8c(0x116)][_0x33ad8c(0x4db)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x33ad8c(0x116)][_0x33ad8c(0x8a0)]=function(_0x426009){const _0xc57e61=_0x33ad8c,_0x47de9e=$dataCommonEvents[_0x426009];if(_0x47de9e)this[_0xc57e61(0x52d)](_0x47de9e[_0xc57e61(0x6d5)],0x0);else{if('qbnRI'!==_0xc57e61(0x20e))return _0x43235f['actor']()[_0xc57e61(0x491)](_0x50e610);else this[_0xc57e61(0x3ca)]();}},Game_OnceParallelInterpreter[_0x33ad8c(0x116)][_0x33ad8c(0x3ca)]=function(){const _0x8943e5=_0x33ad8c;if(!SceneManager[_0x8943e5(0x2ab)]())return;SceneManager[_0x8943e5(0x90d)][_0x8943e5(0x156)](this),Game_Interpreter[_0x8943e5(0x116)][_0x8943e5(0x3ca)][_0x8943e5(0x439)](this);},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x4d7)]=Scene_MenuBase[_0x33ad8c(0x116)][_0x33ad8c(0x21c)],Scene_MenuBase['prototype'][_0x33ad8c(0x21c)]=function(){const _0x5f06a3=_0x33ad8c;let _0x2ebe09=0x0;return SceneManager[_0x5f06a3(0x57e)]()?'UGirM'===_0x5f06a3(0x35f)?this[_0x5f06a3(0x7d9)]():_0x2ebe09=this['helpAreaTopSideButtonLayout']():_0x2ebe09=VisuMZ[_0x5f06a3(0x9dd)][_0x5f06a3(0x4d7)][_0x5f06a3(0x439)](this),_0x2ebe09;},Scene_MenuBase[_0x33ad8c(0x116)][_0x33ad8c(0x40b)]=function(){const _0x5ba8e9=_0x33ad8c;if(this[_0x5ba8e9(0x5f8)]()){if(_0x5ba8e9(0x181)!==_0x5ba8e9(0x304))return this[_0x5ba8e9(0x37e)]();else{let _0x148768=_0xcc9034['round'](_0x2af505[_0x5ba8e9(0x483)]/0x2+0xc0);_0x148768-=_0x395500['floor']((_0xc908c4['width']-_0x4bb519['boxWidth'])/0x2),_0x148768+=_0x39e2ca*0x20;let _0x4dbe98=_0x5c1ab2['height']-0xc8-_0x311d9a[_0x5ba8e9(0x98d)]()*0x30;_0x4dbe98-=_0x5d3910[_0x5ba8e9(0x701)]((_0x2c63f2['height']-_0xea40c1[_0x5ba8e9(0x562)])/0x2),_0x4dbe98+=_0x1e55b1*0x30,this['setHome'](_0x148768,_0x4dbe98);}}else return 0x0;},VisuMZ['CoreEngine'][_0x33ad8c(0x9a5)]=Scene_MenuBase[_0x33ad8c(0x116)][_0x33ad8c(0x8e3)],Scene_MenuBase[_0x33ad8c(0x116)][_0x33ad8c(0x8e3)]=function(){const _0x109d17=_0x33ad8c;if(SceneManager['areButtonsOutsideMainUI']()){if(_0x109d17(0x1ad)!==_0x109d17(0x49e))return this[_0x109d17(0x626)]();else{this[_0x109d17(0x5c3)]['clear']();for(let _0x169b44=0x1;_0x169b44<=0x5;_0x169b44++){this['drawSegment'](_0x169b44);}}}else{if(_0x109d17(0x51b)===_0x109d17(0x51b))return VisuMZ[_0x109d17(0x9dd)]['Scene_MenuBase_mainAreaTop'][_0x109d17(0x439)](this);else _0x269990[_0x109d17(0x9dd)][_0x109d17(0x880)][_0x109d17(0x439)](this),this[_0x109d17(0x906)]();}},Scene_MenuBase[_0x33ad8c(0x116)][_0x33ad8c(0x626)]=function(){const _0x26c456=_0x33ad8c;if(!this['isBottomHelpMode']())return this['helpAreaBottom']();else{if(this[_0x26c456(0x8a2)]()&&this[_0x26c456(0x157)]()===_0x26c456(0x447))return Window_ButtonAssist['prototype'][_0x26c456(0x22f)]();else{if('ZooAf'!==_0x26c456(0x8b3))this['_registerKeyInput'](_0x5ab34d);else return 0x0;}}},VisuMZ[_0x33ad8c(0x9dd)]['Scene_MenuBase_mainAreaHeight']=Scene_MenuBase[_0x33ad8c(0x116)][_0x33ad8c(0x59a)],Scene_MenuBase['prototype'][_0x33ad8c(0x59a)]=function(){const _0x5de644=_0x33ad8c;let _0x5404d6=0x0;return SceneManager['areButtonsOutsideMainUI']()?_0x5404d6=this[_0x5de644(0x759)]():_0x5404d6=VisuMZ['CoreEngine'][_0x5de644(0x9f4)][_0x5de644(0x439)](this),this[_0x5de644(0x8a2)]()&&this[_0x5de644(0x157)]()!==_0x5de644(0x724)&&(_0x5404d6-=Window_ButtonAssist[_0x5de644(0x116)]['lineHeight']()),_0x5404d6;},Scene_MenuBase[_0x33ad8c(0x116)][_0x33ad8c(0x759)]=function(){const _0x12d3fc=_0x33ad8c;return Graphics[_0x12d3fc(0x562)]-this[_0x12d3fc(0x37c)]();},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x129)]=Scene_MenuBase[_0x33ad8c(0x116)][_0x33ad8c(0x4f1)],Scene_MenuBase['prototype'][_0x33ad8c(0x4f1)]=function(){const _0x28e078=_0x33ad8c,_0x5236d2=VisuMZ['CoreEngine'][_0x28e078(0x828)][_0x28e078(0x573)][_0x28e078(0x3aa)]??0x8;this[_0x28e078(0x640)]=new PIXI[(_0x28e078(0x957))][(_0x28e078(0x34c))](_0x5236d2),this[_0x28e078(0x39f)]=new Sprite(),this['_backgroundSprite'][_0x28e078(0x7d3)]=SceneManager[_0x28e078(0x6c5)](),this[_0x28e078(0x39f)][_0x28e078(0x957)]=[this[_0x28e078(0x640)]],this[_0x28e078(0x5c6)](this['_backgroundSprite']),this[_0x28e078(0x856)](0xc0),this[_0x28e078(0x856)](this[_0x28e078(0x9e1)]()),this[_0x28e078(0x918)]();},Scene_MenuBase[_0x33ad8c(0x116)]['getBackgroundOpacity']=function(){const _0x5d470d=_0x33ad8c,_0x2393ad=String(this['constructor'][_0x5d470d(0x62a)]),_0x995650=this[_0x5d470d(0x5a9)](_0x2393ad);if(_0x995650)return _0x995650[_0x5d470d(0x325)];else{if(_0x5d470d(0x158)!==_0x5d470d(0x2c5))return 0xc0;else for(const _0x2a1b06 of _0x35788a[_0x5d470d(0x6d5)]){[0x6c,0x198]['includes'](_0x2a1b06[_0x5d470d(0x481)])&&(_0x14892a+='\x0a',_0xa7a058+=_0x2a1b06[_0x5d470d(0x258)][0x0]);}}},Scene_MenuBase[_0x33ad8c(0x116)][_0x33ad8c(0x918)]=function(){const _0x424208=_0x33ad8c,_0x4388a5=String(this[_0x424208(0x4db)][_0x424208(0x62a)]),_0x5111aa=this[_0x424208(0x5a9)](_0x4388a5);_0x5111aa&&(_0x5111aa['BgFilename1']!==''||_0x5111aa[_0x424208(0x240)]!=='')&&(_0x424208(0x1e0)!=='UHrHo'?(this[_0x424208(0x90a)]=new Sprite(ImageManager[_0x424208(0x534)](_0x5111aa['BgFilename1'])),this[_0x424208(0x328)]=new Sprite(ImageManager['loadTitle2'](_0x5111aa[_0x424208(0x240)])),this[_0x424208(0x5c6)](this[_0x424208(0x90a)]),this[_0x424208(0x5c6)](this[_0x424208(0x328)]),this[_0x424208(0x90a)][_0x424208(0x7d3)][_0x424208(0x3d1)](this['adjustSprite'][_0x424208(0x404)](this,this[_0x424208(0x90a)])),this[_0x424208(0x328)][_0x424208(0x7d3)][_0x424208(0x3d1)](this[_0x424208(0x59d)][_0x424208(0x404)](this,this[_0x424208(0x328)]))):_0x49045b[_0x424208(0x8f7)](_0x1917c0));},Scene_MenuBase[_0x33ad8c(0x116)][_0x33ad8c(0x5a9)]=function(_0x4d577f){const _0x9aa279=_0x33ad8c;return VisuMZ[_0x9aa279(0x9dd)]['Settings'][_0x9aa279(0x573)][_0x4d577f]||VisuMZ[_0x9aa279(0x9dd)][_0x9aa279(0x828)][_0x9aa279(0x573)][_0x9aa279(0x220)];},Scene_MenuBase[_0x33ad8c(0x116)][_0x33ad8c(0x59d)]=function(_0x2ea3fd){const _0x1ea332=_0x33ad8c;this[_0x1ea332(0x95b)](_0x2ea3fd),this['centerSprite'](_0x2ea3fd);},VisuMZ[_0x33ad8c(0x9dd)]['Scene_MenuBase_createCancelButton']=Scene_MenuBase['prototype'][_0x33ad8c(0x161)],Scene_MenuBase[_0x33ad8c(0x116)]['createCancelButton']=function(){const _0x4d9068=_0x33ad8c;VisuMZ[_0x4d9068(0x9dd)][_0x4d9068(0x999)][_0x4d9068(0x439)](this),SceneManager[_0x4d9068(0x430)]()&&this[_0x4d9068(0x2d8)]();},Scene_MenuBase[_0x33ad8c(0x116)][_0x33ad8c(0x2d8)]=function(){const _0x10e51e=_0x33ad8c;this[_0x10e51e(0x31e)]['x']=Graphics[_0x10e51e(0x7e0)]+0x4;},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x470)]=Scene_MenuBase[_0x33ad8c(0x116)][_0x33ad8c(0x823)],Scene_MenuBase[_0x33ad8c(0x116)][_0x33ad8c(0x823)]=function(){const _0x293d58=_0x33ad8c;VisuMZ[_0x293d58(0x9dd)][_0x293d58(0x470)][_0x293d58(0x439)](this),SceneManager[_0x293d58(0x430)]()&&this[_0x293d58(0x7fe)]();},Scene_MenuBase['prototype']['movePageButtonSideButtonLayout']=function(){const _0x54bfe7=_0x33ad8c;this[_0x54bfe7(0x556)]['x']=-0x1*(this[_0x54bfe7(0x556)][_0x54bfe7(0x483)]+this[_0x54bfe7(0x476)][_0x54bfe7(0x483)]+0x8),this[_0x54bfe7(0x476)]['x']=-0x1*(this[_0x54bfe7(0x476)]['width']+0x4);},Scene_MenuBase['prototype']['isMenuButtonAssistEnabled']=function(){const _0x521852=_0x33ad8c;return VisuMZ['CoreEngine']['Settings'][_0x521852(0x2cc)][_0x521852(0x32b)];},Scene_MenuBase[_0x33ad8c(0x116)][_0x33ad8c(0x157)]=function(){const _0x1127df=_0x33ad8c;if(SceneManager[_0x1127df(0x430)]()||SceneManager['areButtonsHidden']()){if(_0x1127df(0x791)!=='oHDvM'){try{_0x2f9d3a['CoreEngine']['Game_Interpreter_command122']['call'](this,_0x1c060a);}catch(_0x4a7e6b){_0x319cf1['isPlaytest']()&&(_0x2401d5[_0x1127df(0x478)]('Control\x20Variables\x20Script\x20Error'),_0x28051b[_0x1127df(0x478)](_0x4a7e6b));}return!![];}else return VisuMZ[_0x1127df(0x9dd)][_0x1127df(0x828)][_0x1127df(0x2cc)][_0x1127df(0xa23)];}else return _0x1127df(0x724);},Scene_MenuBase[_0x33ad8c(0x116)][_0x33ad8c(0x231)]=function(){const _0x41c839=_0x33ad8c;if(!this[_0x41c839(0x8a2)]())return;const _0x20b6bb=this[_0x41c839(0x3f7)]();this[_0x41c839(0x6aa)]=new Window_ButtonAssist(_0x20b6bb),this[_0x41c839(0x5e9)](this['_buttonAssistWindow']);},Scene_MenuBase['prototype']['buttonAssistWindowRect']=function(){const _0x222403=_0x33ad8c;if(this[_0x222403(0x157)]()==='button'){if(_0x222403(0x3ac)!=='qoZWf')return this[_0x222403(0x8e0)]();else _0x155b0c+=_0x222403(0x5d6);}else return _0x222403(0x338)!==_0x222403(0x8fe)?this[_0x222403(0x259)]():this[_0x222403(0xa25)];},Scene_MenuBase[_0x33ad8c(0x116)]['buttonAssistWindowButtonRect']=function(){const _0x3dffa7=_0x33ad8c,_0x3a4060=ConfigManager[_0x3dffa7(0x849)]?(Sprite_Button['prototype'][_0x3dffa7(0x2a3)]()+0x6)*0x2:0x0,_0x740d3f=this['buttonY'](),_0x1927fa=Graphics[_0x3dffa7(0x7e0)]-_0x3a4060*0x2,_0x3317b6=this[_0x3dffa7(0x54f)]();return new Rectangle(_0x3a4060,_0x740d3f,_0x1927fa,_0x3317b6);},Scene_MenuBase[_0x33ad8c(0x116)][_0x33ad8c(0x259)]=function(){const _0x2df9d5=_0x33ad8c,_0x1b611c=Graphics[_0x2df9d5(0x7e0)],_0x26be08=Window_ButtonAssist['prototype'][_0x2df9d5(0x22f)](),_0xf78c75=0x0;let _0x11fff7=0x0;return this[_0x2df9d5(0x157)]()===_0x2df9d5(0x447)?_0x11fff7=0x0:_0x11fff7=Graphics[_0x2df9d5(0x562)]-_0x26be08,new Rectangle(_0xf78c75,_0x11fff7,_0x1b611c,_0x26be08);},Scene_Menu[_0x33ad8c(0x6c7)]=VisuMZ[_0x33ad8c(0x9dd)]['Settings'][_0x33ad8c(0x5ce)][_0x33ad8c(0x414)],VisuMZ['CoreEngine'][_0x33ad8c(0x351)]=Scene_Menu[_0x33ad8c(0x116)]['create'],Scene_Menu[_0x33ad8c(0x116)][_0x33ad8c(0x8fc)]=function(){const _0x2e22b8=_0x33ad8c;VisuMZ[_0x2e22b8(0x9dd)][_0x2e22b8(0x351)][_0x2e22b8(0x439)](this),this[_0x2e22b8(0x906)]();},Scene_Menu[_0x33ad8c(0x116)][_0x33ad8c(0x906)]=function(){const _0x5e6c9e=_0x33ad8c;this['_commandWindow']&&(_0x5e6c9e(0x578)!==_0x5e6c9e(0x578)?this[_0x5e6c9e(0x631)]():this[_0x5e6c9e(0x4bb)][_0x5e6c9e(0x672)](Scene_Menu[_0x5e6c9e(0x6c7)][_0x5e6c9e(0x874)])),this[_0x5e6c9e(0x934)]&&this['_goldWindow'][_0x5e6c9e(0x672)](Scene_Menu[_0x5e6c9e(0x6c7)][_0x5e6c9e(0x1aa)]),this[_0x5e6c9e(0x894)]&&(_0x5e6c9e(0x2d2)!==_0x5e6c9e(0x9e6)?this[_0x5e6c9e(0x894)][_0x5e6c9e(0x672)](Scene_Menu[_0x5e6c9e(0x6c7)][_0x5e6c9e(0x451)]):_0x362acf['CoreEngine'][_0x5e6c9e(0x17e)][_0x5e6c9e(0x439)](this));},Scene_Menu['prototype'][_0x33ad8c(0x7ac)]=function(){const _0x5c3601=_0x33ad8c;return Scene_Menu[_0x5c3601(0x6c7)][_0x5c3601(0x6ee)][_0x5c3601(0x439)](this);},Scene_Menu['prototype'][_0x33ad8c(0x3fe)]=function(){const _0x5f58cf=_0x33ad8c;return Scene_Menu[_0x5f58cf(0x6c7)][_0x5f58cf(0x8a4)][_0x5f58cf(0x439)](this);},Scene_Menu[_0x33ad8c(0x116)][_0x33ad8c(0x848)]=function(){const _0x24e10b=_0x33ad8c;return Scene_Menu['layoutSettings'][_0x24e10b(0x983)][_0x24e10b(0x439)](this);},Scene_Item[_0x33ad8c(0x6c7)]=VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x828)]['MenuLayout'][_0x33ad8c(0x7d6)],VisuMZ['CoreEngine'][_0x33ad8c(0x3fd)]=Scene_Item[_0x33ad8c(0x116)][_0x33ad8c(0x8fc)],Scene_Item[_0x33ad8c(0x116)][_0x33ad8c(0x8fc)]=function(){const _0x2f3078=_0x33ad8c;VisuMZ[_0x2f3078(0x9dd)]['Scene_Item_create']['call'](this),this[_0x2f3078(0x906)]();},Scene_Item[_0x33ad8c(0x116)][_0x33ad8c(0x906)]=function(){const _0x29ea63=_0x33ad8c;this[_0x29ea63(0x1e4)]&&(_0x29ea63(0x8ee)!=='JllVG'?(_0x15fc62['x']=_0x223efa['round'](_0x3439b5['x']),_0xe4c971['y']=_0x28d3eb[_0x29ea63(0x758)](_0x16cc09['y']),_0x5a977c['width']=_0x56cb5c['round'](_0x30c94d['width']),_0x2fe635['height']=_0x58419e[_0x29ea63(0x758)](_0x281038[_0x29ea63(0x64c)]),this[_0x29ea63(0x53b)](),_0xd886fc[_0x29ea63(0x9dd)][_0x29ea63(0x515)]['call'](this,_0x20262f),this[_0x29ea63(0x71a)]()):this['_helpWindow'][_0x29ea63(0x672)](Scene_Item['layoutSettings'][_0x29ea63(0x102)])),this[_0x29ea63(0x4ae)]&&this['_categoryWindow']['setBackgroundType'](Scene_Item['layoutSettings'][_0x29ea63(0x697)]),this[_0x29ea63(0x60c)]&&this[_0x29ea63(0x60c)][_0x29ea63(0x672)](Scene_Item[_0x29ea63(0x6c7)]['ItemBgType']),this[_0x29ea63(0x1f7)]&&(_0x29ea63(0x246)!=='rWBxI'?this[_0x29ea63(0x1f7)]['setBackgroundType'](Scene_Item[_0x29ea63(0x6c7)][_0x29ea63(0x180)]):(_0x253452['log'](_0x29ea63(0x14a)),_0x2ab18a['log'](_0x4d60e8)));},Scene_Item[_0x33ad8c(0x116)]['helpWindowRect']=function(){const _0x4a57cc=_0x33ad8c;return Scene_Item[_0x4a57cc(0x6c7)][_0x4a57cc(0x2af)][_0x4a57cc(0x439)](this);},Scene_Item[_0x33ad8c(0x116)]['categoryWindowRect']=function(){return Scene_Item['layoutSettings']['CategoryRect']['call'](this);},Scene_Item[_0x33ad8c(0x116)][_0x33ad8c(0x6a9)]=function(){const _0x522b4e=_0x33ad8c;return Scene_Item['layoutSettings'][_0x522b4e(0x480)]['call'](this);},Scene_Item[_0x33ad8c(0x116)][_0x33ad8c(0x41d)]=function(){const _0x5c4c30=_0x33ad8c;return Scene_Item[_0x5c4c30(0x6c7)][_0x5c4c30(0x5d5)][_0x5c4c30(0x439)](this);},Scene_Skill[_0x33ad8c(0x6c7)]=VisuMZ[_0x33ad8c(0x9dd)]['Settings'][_0x33ad8c(0x5ce)][_0x33ad8c(0x944)],VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x175)]=Scene_Skill[_0x33ad8c(0x116)][_0x33ad8c(0x8fc)],Scene_Skill[_0x33ad8c(0x116)][_0x33ad8c(0x8fc)]=function(){const _0x1d8e73=_0x33ad8c;VisuMZ['CoreEngine']['Scene_Skill_create'][_0x1d8e73(0x439)](this),this[_0x1d8e73(0x906)]();},Scene_Skill['prototype'][_0x33ad8c(0x906)]=function(){const _0x481cc1=_0x33ad8c;if(this['_helpWindow']){if(_0x481cc1(0x277)!=='diWfo')return this[_0x481cc1(0x438)]();else this[_0x481cc1(0x1e4)][_0x481cc1(0x672)](Scene_Skill['layoutSettings'][_0x481cc1(0x102)]);}if(this['_skillTypeWindow']){if(_0x481cc1(0x77c)===_0x481cc1(0x77c))this[_0x481cc1(0x3e5)][_0x481cc1(0x672)](Scene_Skill[_0x481cc1(0x6c7)][_0x481cc1(0x7fb)]);else{const _0x45a689=_0xc273a1[_0x481cc1(0x116)][_0x481cc1(0x5ea)][_0x481cc1(0x439)](this);for(const _0x296592 of this[_0x481cc1(0x714)]()){_0x296592&&_0x45a689[_0x481cc1(0x8f7)](_0x296592);}return _0x45a689['push'](this[_0x481cc1(0x40c)](),this[_0x481cc1(0x2ff)]()),_0x45a689;}}this['_statusWindow']&&this['_statusWindow'][_0x481cc1(0x672)](Scene_Skill[_0x481cc1(0x6c7)][_0x481cc1(0x451)]);if(this[_0x481cc1(0x60c)]){if(_0x481cc1(0x778)===_0x481cc1(0x778))this['_itemWindow'][_0x481cc1(0x672)](Scene_Skill[_0x481cc1(0x6c7)][_0x481cc1(0x471)]);else{var _0x24bfc9=_0x4f4b69(_0x572e4b['$1']);if(_0x24bfc9===0x0)_0x24bfc9=_0x2dfada[_0x481cc1(0x253)];_0x509b64=_0x28284b['max'](_0x228a5c,_0x24bfc9);}}this[_0x481cc1(0x1f7)]&&(_0x481cc1(0x1bd)==='meUMN'?this['_actorWindow'][_0x481cc1(0x672)](Scene_Skill[_0x481cc1(0x6c7)][_0x481cc1(0x180)]):_0x56bbdd[_0x481cc1(0x25f)](!_0x4890f1[_0x481cc1(0x7b5)]()));},Scene_Skill[_0x33ad8c(0x116)]['helpWindowRect']=function(){const _0x22298e=_0x33ad8c;return Scene_Skill[_0x22298e(0x6c7)][_0x22298e(0x2af)][_0x22298e(0x439)](this);},Scene_Skill['prototype'][_0x33ad8c(0x69e)]=function(){const _0x242ecd=_0x33ad8c;return Scene_Skill[_0x242ecd(0x6c7)][_0x242ecd(0x7dc)]['call'](this);},Scene_Skill[_0x33ad8c(0x116)][_0x33ad8c(0x848)]=function(){const _0x58717a=_0x33ad8c;return Scene_Skill[_0x58717a(0x6c7)][_0x58717a(0x983)][_0x58717a(0x439)](this);},Scene_Skill[_0x33ad8c(0x116)]['itemWindowRect']=function(){const _0x4a5d79=_0x33ad8c;return Scene_Skill['layoutSettings'][_0x4a5d79(0x480)]['call'](this);},Scene_Skill[_0x33ad8c(0x116)][_0x33ad8c(0x41d)]=function(){const _0x44515f=_0x33ad8c;return Scene_Skill[_0x44515f(0x6c7)][_0x44515f(0x5d5)][_0x44515f(0x439)](this);},Scene_Equip[_0x33ad8c(0x6c7)]=VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x828)]['MenuLayout'][_0x33ad8c(0x10c)],VisuMZ[_0x33ad8c(0x9dd)]['Scene_Equip_create']=Scene_Equip['prototype'][_0x33ad8c(0x8fc)],Scene_Equip[_0x33ad8c(0x116)]['create']=function(){const _0x477faf=_0x33ad8c;VisuMZ[_0x477faf(0x9dd)]['Scene_Equip_create'][_0x477faf(0x439)](this),this[_0x477faf(0x906)]();},Scene_Equip[_0x33ad8c(0x116)][_0x33ad8c(0x906)]=function(){const _0x5a6bf2=_0x33ad8c;this[_0x5a6bf2(0x1e4)]&&this[_0x5a6bf2(0x1e4)]['setBackgroundType'](Scene_Equip['layoutSettings'][_0x5a6bf2(0x102)]);this[_0x5a6bf2(0x894)]&&this[_0x5a6bf2(0x894)][_0x5a6bf2(0x672)](Scene_Equip[_0x5a6bf2(0x6c7)][_0x5a6bf2(0x451)]);this[_0x5a6bf2(0x4bb)]&&this[_0x5a6bf2(0x4bb)][_0x5a6bf2(0x672)](Scene_Equip[_0x5a6bf2(0x6c7)][_0x5a6bf2(0x874)]);if(this['_slotWindow']){if(_0x5a6bf2(0x594)!==_0x5a6bf2(0x608))this[_0x5a6bf2(0x4bd)][_0x5a6bf2(0x672)](Scene_Equip[_0x5a6bf2(0x6c7)][_0x5a6bf2(0x998)]);else{if(_0x323e30['isPlaytest']())_0x16fbcf[_0x5a6bf2(0x478)](_0x1cee0c);}}this['_itemWindow']&&this[_0x5a6bf2(0x60c)][_0x5a6bf2(0x672)](Scene_Equip[_0x5a6bf2(0x6c7)][_0x5a6bf2(0x471)]);},Scene_Equip[_0x33ad8c(0x116)]['helpWindowRect']=function(){const _0x564ec0=_0x33ad8c;return Scene_Equip[_0x564ec0(0x6c7)][_0x564ec0(0x2af)][_0x564ec0(0x439)](this);},Scene_Equip[_0x33ad8c(0x116)][_0x33ad8c(0x848)]=function(){const _0x42f103=_0x33ad8c;return Scene_Equip['layoutSettings'][_0x42f103(0x983)][_0x42f103(0x439)](this);},Scene_Equip[_0x33ad8c(0x116)][_0x33ad8c(0x7ac)]=function(){const _0x13009c=_0x33ad8c;return Scene_Equip[_0x13009c(0x6c7)][_0x13009c(0x6ee)][_0x13009c(0x439)](this);},Scene_Equip[_0x33ad8c(0x116)][_0x33ad8c(0x9eb)]=function(){const _0x3fcee3=_0x33ad8c;return Scene_Equip[_0x3fcee3(0x6c7)][_0x3fcee3(0x7e3)][_0x3fcee3(0x439)](this);},Scene_Equip[_0x33ad8c(0x116)][_0x33ad8c(0x6a9)]=function(){const _0x549fed=_0x33ad8c;return Scene_Equip[_0x549fed(0x6c7)][_0x549fed(0x480)]['call'](this);},Scene_Status[_0x33ad8c(0x6c7)]=VisuMZ[_0x33ad8c(0x9dd)]['Settings'][_0x33ad8c(0x5ce)]['StatusMenu'],VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0xa1e)]=Scene_Status[_0x33ad8c(0x116)][_0x33ad8c(0x8fc)],Scene_Status['prototype']['create']=function(){const _0x34ddd8=_0x33ad8c;VisuMZ[_0x34ddd8(0x9dd)][_0x34ddd8(0xa1e)][_0x34ddd8(0x439)](this),this[_0x34ddd8(0x906)]();},Scene_Status['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x271d98=_0x33ad8c;if(this[_0x271d98(0x7da)]){if(_0x271d98(0x74f)!==_0x271d98(0x922))this[_0x271d98(0x7da)][_0x271d98(0x672)](Scene_Status['layoutSettings'][_0x271d98(0x9ad)]);else{const _0x42c2f0=_0x271d98(0x8c2);this['_colorCache']=this[_0x271d98(0x7bd)]||{};if(this[_0x271d98(0x7bd)][_0x42c2f0])return this[_0x271d98(0x7bd)][_0x42c2f0];const _0x18c01d=_0x251e7d['CoreEngine'][_0x271d98(0x828)][_0x271d98(0x4e3)][_0x271d98(0x58c)];return this[_0x271d98(0x28b)](_0x42c2f0,_0x18c01d);}}this[_0x271d98(0x894)]&&('PmZNc'===_0x271d98(0x45d)?this['_statusWindow'][_0x271d98(0x672)](Scene_Status[_0x271d98(0x6c7)][_0x271d98(0x451)]):this[_0x271d98(0x894)][_0x271d98(0x672)](_0x72e89c['layoutSettings'][_0x271d98(0x451)]));if(this[_0x271d98(0x68d)]){if('KNkQI'!==_0x271d98(0x1d9))this[_0x271d98(0x68d)][_0x271d98(0x672)](Scene_Status['layoutSettings'][_0x271d98(0x8cd)]);else return _0x7c327b&&_0x27edde['_scene']?_0x432776['_scene'][_0x271d98(0x3a5)]():!![];}if(this[_0x271d98(0x4f3)]){if(_0x271d98(0x27c)===_0x271d98(0xa28)){const _0x9cc08b=_0x530128[_0x271d98(0x7e0)],_0x107c60=_0x254920[_0x271d98(0x116)]['lineHeight'](),_0x18ba0e=0x0;let _0x3501ca=0x0;return this[_0x271d98(0x157)]()===_0x271d98(0x447)?_0x3501ca=0x0:_0x3501ca=_0x1d10a7['boxHeight']-_0x107c60,new _0x451702(_0x18ba0e,_0x3501ca,_0x9cc08b,_0x107c60);}else this[_0x271d98(0x4f3)]['setBackgroundType'](Scene_Status[_0x271d98(0x6c7)][_0x271d98(0x6b6)]);}},Scene_Status[_0x33ad8c(0x116)][_0x33ad8c(0x127)]=function(){const _0x24ce75=_0x33ad8c;return Scene_Status[_0x24ce75(0x6c7)][_0x24ce75(0x5ff)][_0x24ce75(0x439)](this);},Scene_Status['prototype'][_0x33ad8c(0x848)]=function(){const _0x2678c0=_0x33ad8c;return Scene_Status[_0x2678c0(0x6c7)][_0x2678c0(0x983)][_0x2678c0(0x439)](this);},Scene_Status[_0x33ad8c(0x116)][_0x33ad8c(0x4b7)]=function(){const _0x2384d1=_0x33ad8c;return Scene_Status['layoutSettings'][_0x2384d1(0x937)][_0x2384d1(0x439)](this);},Scene_Status[_0x33ad8c(0x116)]['statusEquipWindowRect']=function(){const _0x41440b=_0x33ad8c;return Scene_Status[_0x41440b(0x6c7)][_0x41440b(0x5e6)][_0x41440b(0x439)](this);},Scene_Options[_0x33ad8c(0x6c7)]=VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x828)][_0x33ad8c(0x5ce)][_0x33ad8c(0x39c)],VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x880)]=Scene_Options[_0x33ad8c(0x116)][_0x33ad8c(0x8fc)],Scene_Options[_0x33ad8c(0x116)][_0x33ad8c(0x8fc)]=function(){const _0x5dea4d=_0x33ad8c;VisuMZ['CoreEngine'][_0x5dea4d(0x880)]['call'](this),this[_0x5dea4d(0x906)]();},Scene_Options['prototype'][_0x33ad8c(0x906)]=function(){const _0x171b44=_0x33ad8c;this[_0x171b44(0x216)]&&this[_0x171b44(0x216)]['setBackgroundType'](Scene_Options[_0x171b44(0x6c7)]['OptionsBgType']);},Scene_Options[_0x33ad8c(0x116)]['optionsWindowRect']=function(){const _0x109816=_0x33ad8c;return Scene_Options[_0x109816(0x6c7)][_0x109816(0x125)][_0x109816(0x439)](this);},Scene_Save[_0x33ad8c(0x6c7)]=VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x828)]['MenuLayout'][_0x33ad8c(0x68e)],Scene_Save[_0x33ad8c(0x116)][_0x33ad8c(0x8fc)]=function(){const _0x3ff143=_0x33ad8c;Scene_File['prototype'][_0x3ff143(0x8fc)][_0x3ff143(0x439)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Save[_0x33ad8c(0x116)][_0x33ad8c(0x906)]=function(){const _0x44653f=_0x33ad8c;this[_0x44653f(0x1e4)]&&this[_0x44653f(0x1e4)][_0x44653f(0x672)](Scene_Save[_0x44653f(0x6c7)][_0x44653f(0x102)]),this[_0x44653f(0x9ed)]&&this['_listWindow'][_0x44653f(0x672)](Scene_Save[_0x44653f(0x6c7)][_0x44653f(0x485)]);},Scene_Save[_0x33ad8c(0x116)]['helpWindowRect']=function(){const _0x4bda28=_0x33ad8c;return Scene_Save[_0x4bda28(0x6c7)][_0x4bda28(0x2af)][_0x4bda28(0x439)](this);},Scene_Save[_0x33ad8c(0x116)][_0x33ad8c(0x2cb)]=function(){const _0x3aedb8=_0x33ad8c;return Scene_Save[_0x3aedb8(0x6c7)][_0x3aedb8(0x70b)][_0x3aedb8(0x439)](this);},Scene_Load[_0x33ad8c(0x6c7)]=VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x828)][_0x33ad8c(0x5ce)][_0x33ad8c(0x771)],Scene_Load[_0x33ad8c(0x116)][_0x33ad8c(0x8fc)]=function(){const _0xd4219f=_0x33ad8c;Scene_File[_0xd4219f(0x116)][_0xd4219f(0x8fc)][_0xd4219f(0x439)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Load[_0x33ad8c(0x116)][_0x33ad8c(0x906)]=function(){const _0x3cf4af=_0x33ad8c;if(this[_0x3cf4af(0x1e4)]){if(_0x3cf4af(0x4d5)===_0x3cf4af(0x4d5))this[_0x3cf4af(0x1e4)][_0x3cf4af(0x672)](Scene_Load[_0x3cf4af(0x6c7)][_0x3cf4af(0x102)]);else{if(this[_0x3cf4af(0x9c0)]())_0x3684f0=_0x1a8669[_0x3cf4af(0x124)](_0x1e4ad5);_0x17cdf2[_0x3cf4af(0x9dd)][_0x3cf4af(0x139)]['call'](this,_0x3ffc4f,_0x1e968f,_0xc35aa0,_0x3f1a34,_0x40cdc4);}}if(this[_0x3cf4af(0x9ed)]){if('FWCiw'!==_0x3cf4af(0x2e3)){var _0x46de68=_0x5ada5b(_0x27cc26['$1']);_0x571cbf+=_0x46de68;}else this[_0x3cf4af(0x9ed)][_0x3cf4af(0x672)](Scene_Load['layoutSettings'][_0x3cf4af(0x485)]);}},Scene_Load[_0x33ad8c(0x116)][_0x33ad8c(0x622)]=function(){const _0x10f5e6=_0x33ad8c;return Scene_Load[_0x10f5e6(0x6c7)][_0x10f5e6(0x2af)][_0x10f5e6(0x439)](this);},Scene_Load[_0x33ad8c(0x116)][_0x33ad8c(0x2cb)]=function(){const _0x108dd3=_0x33ad8c;return Scene_Load[_0x108dd3(0x6c7)][_0x108dd3(0x70b)]['call'](this);},Scene_GameEnd[_0x33ad8c(0x6c7)]=VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x828)][_0x33ad8c(0x5ce)][_0x33ad8c(0x3c6)],VisuMZ['CoreEngine'][_0x33ad8c(0x9e8)]=Scene_GameEnd[_0x33ad8c(0x116)][_0x33ad8c(0x4f1)],Scene_GameEnd['prototype']['createBackground']=function(){const _0x2fa457=_0x33ad8c;Scene_MenuBase[_0x2fa457(0x116)][_0x2fa457(0x4f1)]['call'](this);},Scene_GameEnd[_0x33ad8c(0x116)][_0x33ad8c(0x1d5)]=function(){const _0x1e4d09=_0x33ad8c,_0x2e38c6=this[_0x1e4d09(0x7ac)]();this[_0x1e4d09(0x4bb)]=new Window_GameEnd(_0x2e38c6),this[_0x1e4d09(0x4bb)][_0x1e4d09(0x955)]('cancel',this[_0x1e4d09(0x4d9)][_0x1e4d09(0x404)](this)),this[_0x1e4d09(0x5e9)](this[_0x1e4d09(0x4bb)]),this[_0x1e4d09(0x4bb)][_0x1e4d09(0x672)](Scene_GameEnd[_0x1e4d09(0x6c7)][_0x1e4d09(0x874)]);},Scene_GameEnd[_0x33ad8c(0x116)][_0x33ad8c(0x7ac)]=function(){const _0x2ef4e8=_0x33ad8c;return Scene_GameEnd[_0x2ef4e8(0x6c7)][_0x2ef4e8(0x6ee)][_0x2ef4e8(0x439)](this);},Scene_Shop[_0x33ad8c(0x6c7)]=VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x828)][_0x33ad8c(0x5ce)][_0x33ad8c(0x84d)],VisuMZ[_0x33ad8c(0x9dd)]['Scene_Shop_create']=Scene_Shop[_0x33ad8c(0x116)][_0x33ad8c(0x8fc)],Scene_Shop[_0x33ad8c(0x116)]['create']=function(){const _0x2c1b7e=_0x33ad8c;VisuMZ[_0x2c1b7e(0x9dd)][_0x2c1b7e(0x115)][_0x2c1b7e(0x439)](this),this[_0x2c1b7e(0x906)]();},Scene_Shop[_0x33ad8c(0x116)]['setCoreEngineUpdateWindowBg']=function(){const _0x4e7e09=_0x33ad8c;this[_0x4e7e09(0x1e4)]&&this[_0x4e7e09(0x1e4)][_0x4e7e09(0x672)](Scene_Shop[_0x4e7e09(0x6c7)][_0x4e7e09(0x102)]);this[_0x4e7e09(0x934)]&&this['_goldWindow'][_0x4e7e09(0x672)](Scene_Shop[_0x4e7e09(0x6c7)][_0x4e7e09(0x1aa)]);if(this['_commandWindow']){if(_0x4e7e09(0x6b2)!==_0x4e7e09(0x7b7))this[_0x4e7e09(0x4bb)][_0x4e7e09(0x672)](Scene_Shop[_0x4e7e09(0x6c7)]['CommandBgType']);else{const _0x440bfd=_0x368bea[_0x50b162],_0x4988e8=_0x4e7e09(0x582)[_0x4e7e09(0x3e7)](_0x4f6ef9);for(const _0x1efd91 of _0x440bfd){_0x22203d[_0x4e7e09(0x270)](_0x4988e8,_0x1efd91);}}}this[_0x4e7e09(0x75d)]&&this['_dummyWindow']['setBackgroundType'](Scene_Shop[_0x4e7e09(0x6c7)][_0x4e7e09(0x7e7)]);this['_numberWindow']&&this['_numberWindow']['setBackgroundType'](Scene_Shop[_0x4e7e09(0x6c7)][_0x4e7e09(0x7f2)]);if(this[_0x4e7e09(0x894)]){if(_0x4e7e09(0x9fc)!==_0x4e7e09(0x5b7))this['_statusWindow'][_0x4e7e09(0x672)](Scene_Shop[_0x4e7e09(0x6c7)][_0x4e7e09(0x451)]);else{_0xca3f5c-=_0x37370f;if(_0x14057e<=0x0)_0x19cf04=0x0;this[_0x4e7e09(0x669)](_0x370f33);}}this['_buyWindow']&&this[_0x4e7e09(0x580)][_0x4e7e09(0x672)](Scene_Shop[_0x4e7e09(0x6c7)][_0x4e7e09(0x890)]),this[_0x4e7e09(0x4ae)]&&this[_0x4e7e09(0x4ae)][_0x4e7e09(0x672)](Scene_Shop[_0x4e7e09(0x6c7)][_0x4e7e09(0x697)]),this[_0x4e7e09(0xa07)]&&this[_0x4e7e09(0xa07)][_0x4e7e09(0x672)](Scene_Shop[_0x4e7e09(0x6c7)][_0x4e7e09(0x5d2)]);},Scene_Shop[_0x33ad8c(0x116)][_0x33ad8c(0x622)]=function(){const _0xa0ba2b=_0x33ad8c;return Scene_Shop['layoutSettings'][_0xa0ba2b(0x2af)][_0xa0ba2b(0x439)](this);},Scene_Shop[_0x33ad8c(0x116)][_0x33ad8c(0x3fe)]=function(){const _0x3247ae=_0x33ad8c;return Scene_Shop['layoutSettings'][_0x3247ae(0x8a4)]['call'](this);},Scene_Shop[_0x33ad8c(0x116)][_0x33ad8c(0x7ac)]=function(){const _0x29279a=_0x33ad8c;return Scene_Shop[_0x29279a(0x6c7)][_0x29279a(0x6ee)]['call'](this);},Scene_Shop[_0x33ad8c(0x116)][_0x33ad8c(0x3b3)]=function(){const _0x106ee4=_0x33ad8c;return Scene_Shop[_0x106ee4(0x6c7)][_0x106ee4(0x36f)][_0x106ee4(0x439)](this);},Scene_Shop[_0x33ad8c(0x116)][_0x33ad8c(0x9f3)]=function(){const _0x406b96=_0x33ad8c;return Scene_Shop[_0x406b96(0x6c7)][_0x406b96(0x8bc)][_0x406b96(0x439)](this);},Scene_Shop[_0x33ad8c(0x116)][_0x33ad8c(0x848)]=function(){const _0x1e743e=_0x33ad8c;return Scene_Shop['layoutSettings'][_0x1e743e(0x983)][_0x1e743e(0x439)](this);},Scene_Shop['prototype'][_0x33ad8c(0x36d)]=function(){const _0x49c0bb=_0x33ad8c;return Scene_Shop[_0x49c0bb(0x6c7)][_0x49c0bb(0x20b)][_0x49c0bb(0x439)](this);},Scene_Shop[_0x33ad8c(0x116)]['categoryWindowRect']=function(){const _0x268cbf=_0x33ad8c;return Scene_Shop[_0x268cbf(0x6c7)]['CategoryRect'][_0x268cbf(0x439)](this);},Scene_Shop[_0x33ad8c(0x116)][_0x33ad8c(0x81d)]=function(){const _0xdf305c=_0x33ad8c;return Scene_Shop[_0xdf305c(0x6c7)][_0xdf305c(0x460)]['call'](this);},Scene_Name[_0x33ad8c(0x6c7)]=VisuMZ[_0x33ad8c(0x9dd)]['Settings']['MenuLayout']['NameMenu'],VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x738)]=Scene_Name[_0x33ad8c(0x116)][_0x33ad8c(0x8fc)],Scene_Name[_0x33ad8c(0x116)][_0x33ad8c(0x8fc)]=function(){const _0x205667=_0x33ad8c;VisuMZ['CoreEngine'][_0x205667(0x738)][_0x205667(0x439)](this),this[_0x205667(0x906)]();},Scene_Name[_0x33ad8c(0x116)][_0x33ad8c(0x906)]=function(){const _0x2e71b8=_0x33ad8c;this[_0x2e71b8(0x4e4)]&&this[_0x2e71b8(0x4e4)]['setBackgroundType'](Scene_Name[_0x2e71b8(0x6c7)][_0x2e71b8(0x201)]);if(this['_inputWindow']){if('Bejso'===_0x2e71b8(0x91a))this[_0x2e71b8(0x59f)][_0x2e71b8(0x672)](Scene_Name['layoutSettings'][_0x2e71b8(0x802)]);else return _0x42e8ad[_0x2e71b8(0x9dd)][_0x2e71b8(0x828)][_0x2e71b8(0x113)][_0x2e71b8(0x85d)]?this[_0x2e71b8(0x15a)](_0x30792c):_0x497d0b[_0x2e71b8(0x9dd)][_0x2e71b8(0x435)]['call'](this,_0x5ce620);}},Scene_Name[_0x33ad8c(0x116)][_0x33ad8c(0x37c)]=function(){return 0x0;},Scene_Name[_0x33ad8c(0x116)]['editWindowRect']=function(){const _0x16698f=_0x33ad8c;return Scene_Name['layoutSettings'][_0x16698f(0x465)][_0x16698f(0x439)](this);},Scene_Name[_0x33ad8c(0x116)]['inputWindowRect']=function(){const _0x4d86f2=_0x33ad8c;return Scene_Name['layoutSettings'][_0x4d86f2(0x93d)]['call'](this);},Scene_Name['prototype']['EnableNameInput']=function(){const _0x242b95=_0x33ad8c;if(!this[_0x242b95(0x59f)])return![];return VisuMZ[_0x242b95(0x9dd)]['Settings'][_0x242b95(0x926)][_0x242b95(0x7f1)];},Scene_Name[_0x33ad8c(0x116)][_0x33ad8c(0x218)]=function(){const _0x1362aa=_0x33ad8c;if(this['EnableNameInput']()&&this[_0x1362aa(0x59f)]['_mode']!==_0x1362aa(0x73e))return TextManager[_0x1362aa(0x9ff)]('pageup',_0x1362aa(0x23d));return Scene_MenuBase['prototype'][_0x1362aa(0x218)][_0x1362aa(0x439)](this);},Scene_Name[_0x33ad8c(0x116)][_0x33ad8c(0x581)]=function(){const _0x44948e=_0x33ad8c;if(this[_0x44948e(0x7f1)]())return TextManager['getInputButtonString'](_0x44948e(0x57b));else{if(_0x44948e(0x2ce)!==_0x44948e(0x2ce))this[_0x44948e(0x4b9)]['current']=this[_0x44948e(0x4b9)][_0x44948e(0x680)];else return Scene_MenuBase[_0x44948e(0x116)][_0x44948e(0x581)]['call'](this);}},Scene_Name[_0x33ad8c(0x116)][_0x33ad8c(0x726)]=function(){const _0x395b77=_0x33ad8c;if(this[_0x395b77(0x7f1)]()&&this[_0x395b77(0x59f)][_0x395b77(0x64f)]===_0x395b77(0x73e))return TextManager[_0x395b77(0x3ab)]([_0x395b77(0x913)]);return Scene_MenuBase[_0x395b77(0x116)][_0x395b77(0x726)][_0x395b77(0x439)](this);},Scene_Name[_0x33ad8c(0x116)][_0x33ad8c(0x976)]=function(){const _0x5b40e1=_0x33ad8c;if(this[_0x5b40e1(0x7f1)]()&&this[_0x5b40e1(0x59f)]['_mode']===_0x5b40e1(0x73e)){if(_0x5b40e1(0x623)!==_0x5b40e1(0x783))return TextManager[_0x5b40e1(0x3ab)](['BKSP']);else{this[_0x5b40e1(0x283)]=this[_0x5b40e1(0x63f)]()[_0x5b40e1(0x21f)];return;}}return Scene_MenuBase[_0x5b40e1(0x116)][_0x5b40e1(0x976)][_0x5b40e1(0x439)](this);},Scene_Name[_0x33ad8c(0x116)][_0x33ad8c(0x205)]=function(){const _0x18071c=_0x33ad8c;if(this['EnableNameInput']()&&this[_0x18071c(0x59f)][_0x18071c(0x64f)]!==_0x18071c(0x73e)){if('MIxTe'!==_0x18071c(0x875)){const _0x162993=VisuMZ[_0x18071c(0x9dd)][_0x18071c(0x828)]['KeyboardInput'];return _0x162993[_0x18071c(0x484)]||'Page';}else{if(this[_0x18071c(0x63f)]()[_0x18071c(0x82f)]&&_0x472f49[_0x18071c(0x5bb)]()===0x1){this[_0x18071c(0x454)]=this['centerCameraCheckData']()[_0x18071c(0x4fa)];return;}_0x4307de['CoreEngine'][_0x18071c(0x65a)][_0x18071c(0x439)](this,_0x57e017);}}return Scene_MenuBase[_0x18071c(0x116)]['buttonAssistText1'][_0x18071c(0x439)](this);},Scene_Name[_0x33ad8c(0x116)]['buttonAssistText3']=function(){const _0x1236cf=_0x33ad8c;if(this[_0x1236cf(0x7f1)]()){const _0x1a5a92=VisuMZ['CoreEngine']['Settings'][_0x1236cf(0x926)];return this[_0x1236cf(0x59f)][_0x1236cf(0x64f)]===_0x1236cf(0x73e)?_0x1a5a92[_0x1236cf(0x100)]||_0x1236cf(0x100):_0x1a5a92[_0x1236cf(0x58d)]||_0x1236cf(0x58d);}else return Scene_MenuBase[_0x1236cf(0x116)]['buttonAssistText3'][_0x1236cf(0x439)](this);},Scene_Name['prototype'][_0x33ad8c(0x489)]=function(){const _0xa50a72=_0x33ad8c;if(this[_0xa50a72(0x7f1)]()){if(_0xa50a72(0x306)!==_0xa50a72(0x5d3)){const _0x173443=VisuMZ[_0xa50a72(0x9dd)][_0xa50a72(0x828)][_0xa50a72(0x926)];if(this['_inputWindow']['_mode']==='keyboard'){if('SXcdx'!==_0xa50a72(0x4d8)){const _0x310312=this[_0xa50a72(0x7ac)]();this[_0xa50a72(0x4bb)]=new _0x1b1198(_0x310312),this[_0xa50a72(0x4bb)]['setHandler'](_0xa50a72(0x583),this[_0xa50a72(0x4d9)]['bind'](this)),this[_0xa50a72(0x5e9)](this['_commandWindow']),this[_0xa50a72(0x4bb)][_0xa50a72(0x672)](_0x247dde[_0xa50a72(0x6c7)][_0xa50a72(0x874)]);}else return _0x173443[_0xa50a72(0x20f)]||_0xa50a72(0x20f);}}else this['_muteSound']=_0x5d4652;}return Scene_MenuBase[_0xa50a72(0x116)][_0xa50a72(0x489)][_0xa50a72(0x439)](this);},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x927)]=Scene_Name[_0x33ad8c(0x116)]['onInputOk'],Scene_Name['prototype']['onInputOk']=function(){const _0x27dbf9=_0x33ad8c;this[_0x27dbf9(0x20d)]()?this[_0x27dbf9(0x9db)]():VisuMZ[_0x27dbf9(0x9dd)][_0x27dbf9(0x927)]['call'](this);},Scene_Name[_0x33ad8c(0x116)]['doesNameContainBannedWords']=function(){const _0x2f9bea=_0x33ad8c,_0x547b5d=VisuMZ['CoreEngine']['Settings'][_0x2f9bea(0x926)];if(!_0x547b5d)return![];const _0x3660a2=_0x547b5d[_0x2f9bea(0x84a)];if(!_0x3660a2)return![];const _0xd37099=this[_0x2f9bea(0x4e4)]['name']()[_0x2f9bea(0x1fe)]();for(const _0x3b9759 of _0x3660a2){if(_0x2f9bea(0x8cb)===_0x2f9bea(0x55e))_0x32b3f7['CoreEngine'][_0x2f9bea(0x210)][_0x2f9bea(0x439)](this),this[_0x2f9bea(0x599)]();else{if(_0xd37099[_0x2f9bea(0x949)](_0x3b9759['toLowerCase']()))return!![];}}return![];},Scene_Name[_0x33ad8c(0x116)][_0x33ad8c(0x9db)]=function(){const _0x3941b8=_0x33ad8c;SoundManager[_0x3941b8(0x11f)]();},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x52b)]=Scene_Battle['prototype'][_0x33ad8c(0x88b)],Scene_Battle[_0x33ad8c(0x116)][_0x33ad8c(0x88b)]=function(){const _0x54aca0=_0x33ad8c;VisuMZ['CoreEngine'][_0x54aca0(0x52b)][_0x54aca0(0x439)](this);if($gameTemp['_playTestFastMode'])this[_0x54aca0(0x657)]();},Scene_Battle[_0x33ad8c(0x116)][_0x33ad8c(0x657)]=function(){const _0x15faad=_0x33ad8c;!BattleManager[_0x15faad(0x9ca)]()&&!this[_0x15faad(0x393)]&&!$gameMessage[_0x15faad(0x698)]()&&(_0x15faad(0x14e)===_0x15faad(0x68a)?(_0x2e466c[_0x15faad(0x9dd)][_0x15faad(0x79f)][_0x15faad(0x439)](this,_0x21a573,_0x364894),this[_0x15faad(0x9ba)]()):(this[_0x15faad(0x393)]=!![],this[_0x15faad(0x88b)](),SceneManager['updateEffekseer'](),this[_0x15faad(0x393)]=![]));},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x27d)]=Scene_Battle['prototype'][_0x33ad8c(0x161)],Scene_Battle[_0x33ad8c(0x116)][_0x33ad8c(0x161)]=function(){const _0x199645=_0x33ad8c;VisuMZ[_0x199645(0x9dd)]['Scene_Battle_createCancelButton']['call'](this),SceneManager[_0x199645(0x430)]()&&this[_0x199645(0x4f8)]();},Scene_Battle['prototype'][_0x33ad8c(0x4f8)]=function(){const _0x240e7f=_0x33ad8c;this['_cancelButton']['x']=Graphics['boxWidth']+0x4,this[_0x240e7f(0x242)]()?this['_cancelButton']['y']=Graphics[_0x240e7f(0x562)]-this[_0x240e7f(0x54f)]():this[_0x240e7f(0x31e)]['y']=0x0;},VisuMZ['CoreEngine']['Sprite_Button_initialize']=Sprite_Button[_0x33ad8c(0x116)]['initialize'],Sprite_Button[_0x33ad8c(0x116)][_0x33ad8c(0x4b0)]=function(_0x1095c8){const _0x1a8abb=_0x33ad8c;VisuMZ[_0x1a8abb(0x9dd)][_0x1a8abb(0x638)][_0x1a8abb(0x439)](this,_0x1095c8),this[_0x1a8abb(0x658)]();},Sprite_Button['prototype'][_0x33ad8c(0x658)]=function(){const _0x314948=_0x33ad8c,_0x1cc39b=VisuMZ[_0x314948(0x9dd)][_0x314948(0x828)]['UI'];this[_0x314948(0x508)]=![];switch(this[_0x314948(0x420)]){case _0x314948(0x583):this[_0x314948(0x508)]=!_0x1cc39b[_0x314948(0x64d)];break;case _0x314948(0x1ec):case _0x314948(0x23d):this[_0x314948(0x508)]=!_0x1cc39b[_0x314948(0x8a7)];break;case _0x314948(0x366):case'up':case'down2':case'up2':case'ok':this[_0x314948(0x508)]=!_0x1cc39b[_0x314948(0x365)];break;case'menu':this['_isButtonHidden']=!_0x1cc39b[_0x314948(0x8f8)];break;}},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0xa17)]=Sprite_Button[_0x33ad8c(0x116)][_0x33ad8c(0x505)],Sprite_Button['prototype'][_0x33ad8c(0x505)]=function(){const _0x15232d=_0x33ad8c;SceneManager[_0x15232d(0x6ce)]()||this[_0x15232d(0x508)]?this[_0x15232d(0x350)]():VisuMZ[_0x15232d(0x9dd)][_0x15232d(0xa17)][_0x15232d(0x439)](this);},Sprite_Button[_0x33ad8c(0x116)][_0x33ad8c(0x350)]=function(){const _0xe316ee=_0x33ad8c;this['visible']=![],this[_0xe316ee(0x788)]=0x0,this['x']=Graphics[_0xe316ee(0x483)]*0xa,this['y']=Graphics[_0xe316ee(0x64c)]*0xa;},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x81a)]=Sprite_Battler[_0x33ad8c(0x116)]['startMove'],Sprite_Battler[_0x33ad8c(0x116)][_0x33ad8c(0x56f)]=function(_0x25a8d9,_0x18ea3b,_0x1fc5f5){const _0x4ab6ed=_0x33ad8c;(this[_0x4ab6ed(0x18f)]!==_0x25a8d9||this[_0x4ab6ed(0x883)]!==_0x18ea3b)&&(this[_0x4ab6ed(0x42d)](_0x4ab6ed(0x8b5)),this[_0x4ab6ed(0x88e)]=_0x1fc5f5),VisuMZ['CoreEngine'][_0x4ab6ed(0x81a)][_0x4ab6ed(0x439)](this,_0x25a8d9,_0x18ea3b,_0x1fc5f5);},Sprite_Battler[_0x33ad8c(0x116)][_0x33ad8c(0x42d)]=function(_0x1ceebe){const _0x486016=_0x33ad8c;this[_0x486016(0x75f)]=_0x1ceebe;},Sprite_Battler[_0x33ad8c(0x116)][_0x33ad8c(0x12c)]=function(){const _0x380f62=_0x33ad8c;if(this[_0x380f62(0x461)]<=0x0)return;const _0x342e97=this[_0x380f62(0x461)],_0x49ac07=this[_0x380f62(0x88e)],_0x4eed58=this[_0x380f62(0x75f)];this['_offsetX']=this[_0x380f62(0x7b6)](this[_0x380f62(0x31c)],this[_0x380f62(0x18f)],_0x342e97,_0x49ac07,_0x4eed58),this['_offsetY']=this[_0x380f62(0x7b6)](this[_0x380f62(0x18a)],this[_0x380f62(0x883)],_0x342e97,_0x49ac07,_0x4eed58),this[_0x380f62(0x461)]--;if(this['_movementDuration']<=0x0)this[_0x380f62(0x3a4)]();},Sprite_Battler['prototype'][_0x33ad8c(0x7b6)]=function(_0x4bdfbb,_0xce0fad,_0x81a4bb,_0x4471de,_0x263ed6){const _0x27083f=_0x33ad8c,_0x5f3419=VisuMZ['ApplyEasing']((_0x4471de-_0x81a4bb)/_0x4471de,_0x263ed6||_0x27083f(0x8b5)),_0x5aeeb7=VisuMZ['ApplyEasing']((_0x4471de-_0x81a4bb+0x1)/_0x4471de,_0x263ed6||_0x27083f(0x8b5)),_0x446eaf=(_0x4bdfbb-_0xce0fad*_0x5f3419)/(0x1-_0x5f3419);return _0x446eaf+(_0xce0fad-_0x446eaf)*_0x5aeeb7;},VisuMZ['CoreEngine'][_0x33ad8c(0x30b)]=Sprite_Actor[_0x33ad8c(0x116)]['setActorHome'],Sprite_Actor[_0x33ad8c(0x116)]['setActorHome']=function(_0x398bc2){const _0x51d508=_0x33ad8c;VisuMZ['CoreEngine'][_0x51d508(0x828)]['UI']['RepositionActors']?_0x51d508(0x341)===_0x51d508(0x321)?(_0x209125[_0x51d508(0x9dd)]['Graphics_centerElement']['call'](this,_0x3f582c),this[_0x51d508(0x3ff)](_0x395e75)):this[_0x51d508(0xfc)](_0x398bc2):VisuMZ[_0x51d508(0x9dd)]['Sprite_Actor_setActorHome']['call'](this,_0x398bc2);},Sprite_Actor[_0x33ad8c(0x116)][_0x33ad8c(0xfc)]=function(_0x1a992c){const _0x324e69=_0x33ad8c;let _0x221667=Math['round'](Graphics[_0x324e69(0x483)]/0x2+0xc0);_0x221667-=Math['floor']((Graphics['width']-Graphics[_0x324e69(0x7e0)])/0x2),_0x221667+=_0x1a992c*0x20;let _0x2245bf=Graphics['height']-0xc8-$gameParty[_0x324e69(0x98d)]()*0x30;_0x2245bf-=Math[_0x324e69(0x701)]((Graphics[_0x324e69(0x64c)]-Graphics[_0x324e69(0x562)])/0x2),_0x2245bf+=_0x1a992c*0x30,this['setHome'](_0x221667,_0x2245bf);},Sprite_Actor[_0x33ad8c(0x116)][_0x33ad8c(0x38d)]=function(){const _0x2f3ac3=_0x33ad8c;this[_0x2f3ac3(0x56f)](0x4b0,0x0,0x78);},Sprite_Animation[_0x33ad8c(0x116)]['setMute']=function(_0x344d8a){const _0x244047=_0x33ad8c;this[_0x244047(0x453)]=_0x344d8a;},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x7d8)]=Sprite_Animation[_0x33ad8c(0x116)][_0x33ad8c(0x2bb)],Sprite_Animation[_0x33ad8c(0x116)][_0x33ad8c(0x2bb)]=function(){const _0x1f739f=_0x33ad8c;if(this[_0x1f739f(0x453)])return;VisuMZ[_0x1f739f(0x9dd)]['Sprite_Animation_processSoundTimings']['call'](this);},VisuMZ['CoreEngine'][_0x33ad8c(0x98f)]=Sprite_Animation[_0x33ad8c(0x116)][_0x33ad8c(0x16f)],Sprite_Animation['prototype'][_0x33ad8c(0x16f)]=function(_0x1a64fc){const _0x34bc90=_0x33ad8c;this[_0x34bc90(0x665)]()?this[_0x34bc90(0x69c)](_0x1a64fc):VisuMZ[_0x34bc90(0x9dd)]['Sprite_Animation_setViewport'][_0x34bc90(0x439)](this,_0x1a64fc);},Sprite_Animation[_0x33ad8c(0x116)][_0x33ad8c(0x665)]=function(){const _0x1cea63=_0x33ad8c;if(!this['_animation'])return![];const _0x3d70bb=this[_0x1cea63(0x4c6)]['name']||'';if(_0x3d70bb[_0x1cea63(0x13d)](/<MIRROR OFFSET X>/i))return!![];if(_0x3d70bb[_0x1cea63(0x13d)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x1cea63(0x9dd)][_0x1cea63(0x828)][_0x1cea63(0x113)][_0x1cea63(0xa12)];},Sprite_Animation[_0x33ad8c(0x116)][_0x33ad8c(0x69c)]=function(_0x13d08b){const _0x2f3973=_0x33ad8c,_0x32cc70=this['_viewportSize'],_0x5c67fc=this[_0x2f3973(0x3c8)],_0x382239=this['_animation'][_0x2f3973(0x4a5)]*(this[_0x2f3973(0x2e6)]?-0x1:0x1)-_0x32cc70/0x2,_0x1c27ae=this[_0x2f3973(0x4c6)][_0x2f3973(0x6d0)]-_0x5c67fc/0x2,_0x1fca9b=this[_0x2f3973(0xa08)](_0x13d08b);_0x13d08b['gl'][_0x2f3973(0x448)](_0x382239+_0x1fca9b['x'],_0x1c27ae+_0x1fca9b['y'],_0x32cc70,_0x5c67fc);},Sprite_Animation['prototype'][_0x33ad8c(0x6ff)]=function(_0x17fab8){const _0x281c61=_0x33ad8c;if(_0x17fab8[_0x281c61(0x3e9)]){}const _0x2b6b14=this[_0x281c61(0x4c6)][_0x281c61(0x62a)];let _0x500186=_0x17fab8[_0x281c61(0x64c)]*_0x17fab8[_0x281c61(0x17d)]['y'],_0x15e446=0x0,_0x442614=-_0x500186/0x2;if(_0x2b6b14[_0x281c61(0x13d)](/<(?:HEAD|HEADER|TOP)>/i))_0x442614=-_0x500186;if(_0x2b6b14[_0x281c61(0x13d)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x442614=0x0;if(this[_0x281c61(0x4c6)]['alignBottom'])_0x442614=0x0;if(_0x2b6b14[_0x281c61(0x13d)](/<(?:LEFT)>/i))_0x15e446=-_0x17fab8[_0x281c61(0x483)]/0x2;if(_0x2b6b14['match'](/<(?:RIGHT)>/i))_0x15e446=_0x17fab8[_0x281c61(0x483)]/0x2;if(_0x2b6b14['match'](/<ANCHOR X:[ ](\d+\.?\d*)>/i)){if(_0x281c61(0x763)!==_0x281c61(0x572))_0x15e446=Number(RegExp['$1'])*_0x17fab8['width'];else return _0x50dca0[_0x281c61(0x6c7)][_0x281c61(0x2af)][_0x281c61(0x439)](this);}_0x2b6b14[_0x281c61(0x13d)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x281c61(0x153)===_0x281c61(0x189)?(_0x2442dd=_0x1e911f[_0x281c61(0x758)](_0x212111),_0x59b8c2=_0x1e55c5['round'](_0x177d3a),_0x41a786[_0x281c61(0x9dd)]['Window_Base_drawIcon'][_0x281c61(0x439)](this,_0x22e6e7,_0x16c845,_0x817696)):_0x442614=(0x1-Number(RegExp['$1']))*-_0x500186);_0x2b6b14[_0x281c61(0x13d)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x281c61(0x781)===_0x281c61(0x56d)?(_0x23fabd+=this[_0x281c61(0x2e9)][_0x24c37a][_0x281c61(0x258)][0x0]+'\x0a',_0x3ebeb8++):(_0x15e446=Number(RegExp['$1'])*_0x17fab8[_0x281c61(0x483)],_0x442614=(0x1-Number(RegExp['$2']))*-_0x500186));if(_0x2b6b14['match'](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x15e446+=Number(RegExp['$1']);if(_0x2b6b14[_0x281c61(0x13d)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x442614+=Number(RegExp['$1']);_0x2b6b14[_0x281c61(0x13d)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x15e446+=Number(RegExp['$1']),_0x442614+=Number(RegExp['$2']));const _0x40bcf7=new Point(_0x15e446,_0x442614);return _0x17fab8[_0x281c61(0xfe)](),_0x17fab8[_0x281c61(0x816)][_0x281c61(0x834)](_0x40bcf7);},Sprite_AnimationMV[_0x33ad8c(0x116)][_0x33ad8c(0x4be)]=function(){const _0x437e0c=_0x33ad8c;this[_0x437e0c(0x6b4)]=VisuMZ[_0x437e0c(0x9dd)][_0x437e0c(0x828)]['QoL'][_0x437e0c(0x709)]??0x4,this[_0x437e0c(0x7e9)](),this['_rate']=this[_0x437e0c(0x6b4)]['clamp'](0x1,0xa);},Sprite_AnimationMV[_0x33ad8c(0x116)][_0x33ad8c(0x7e9)]=function(){const _0x1bd43b=_0x33ad8c;if(!this[_0x1bd43b(0x4c6)]);const _0x28f527=this[_0x1bd43b(0x4c6)][_0x1bd43b(0x62a)]||'';if(_0x28f527[_0x1bd43b(0x13d)](/<RATE:[ ](\d+)>/i)){if(_0x1bd43b(0x5e2)!==_0x1bd43b(0x3e3))this[_0x1bd43b(0x6b4)]=(Number(RegExp['$1'])||0x1)[_0x1bd43b(0x482)](0x1,0xa);else{const _0x7dfc0f=new _0x5dedd0(0x0,0x0,0x1,0x1);_0x19ddea[_0x1bd43b(0x116)]['initialize'][_0x1bd43b(0x439)](this,_0x7dfc0f),this[_0x1bd43b(0x7bc)]=0x0,this[_0x1bd43b(0x635)]='',this[_0x1bd43b(0x3f0)]=[],this[_0x1bd43b(0x315)]=0x0;}}},Sprite_AnimationMV[_0x33ad8c(0x116)][_0x33ad8c(0x25e)]=function(_0x1540b5){const _0x2f7aed=_0x33ad8c;this[_0x2f7aed(0x453)]=_0x1540b5;},VisuMZ['CoreEngine'][_0x33ad8c(0x8c0)]=Sprite_AnimationMV[_0x33ad8c(0x116)][_0x33ad8c(0x901)],Sprite_AnimationMV['prototype'][_0x33ad8c(0x901)]=function(_0x5e295f){const _0x270678=_0x33ad8c;this[_0x270678(0x453)]&&(_0x5e295f=JsonEx['makeDeepCopy'](_0x5e295f),_0x5e295f['se']&&('VKSSw'!==_0x270678(0x1ed)?_0x5e295f['se'][_0x270678(0x692)]=0x0:this[_0x270678(0x558)]()&&_0x5611e6&&this['maxCols']()===0x1&&this['index']()===0x0?this[_0x270678(0x669)](this['maxItems']()-0x1):_0x2e730a[_0x270678(0x9dd)][_0x270678(0x65c)][_0x270678(0x439)](this,_0x29364c))),VisuMZ[_0x270678(0x9dd)][_0x270678(0x8c0)][_0x270678(0x439)](this,_0x5e295f);},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x9f9)]=Sprite_AnimationMV[_0x33ad8c(0x116)][_0x33ad8c(0x842)],Sprite_AnimationMV['prototype'][_0x33ad8c(0x842)]=function(){const _0x6799dc=_0x33ad8c;VisuMZ[_0x6799dc(0x9dd)][_0x6799dc(0x9f9)][_0x6799dc(0x439)](this);if(this['_animation']['position']===0x3){if('SAMkb'!==_0x6799dc(0x5dd)){var _0x1df982=_0x4a3a3e(_0x2af11e['$1']);try{_0xf28e19+=_0x469032(_0x1df982);}catch(_0xd27008){if(_0x637a1[_0x6799dc(0x4d4)]())_0x3f9ca1['log'](_0xd27008);}}else{if(this['x']===0x0)this['x']=Math[_0x6799dc(0x758)](Graphics[_0x6799dc(0x483)]/0x2);if(this['y']===0x0)this['y']=Math[_0x6799dc(0x758)](Graphics['height']/0x2);}}},Sprite_Damage['prototype'][_0x33ad8c(0x389)]=function(_0x43b037){const _0x15f76e=_0x33ad8c;let _0x385627=Math[_0x15f76e(0x964)](_0x43b037)['toString']();this[_0x15f76e(0x9c0)]()&&(_0x385627=VisuMZ['GroupDigits'](_0x385627));const _0x4dc236=this[_0x15f76e(0x1e9)](),_0x68b937=Math['floor'](_0x4dc236*0.75);for(let _0x8dfe32=0x0;_0x8dfe32<_0x385627['length'];_0x8dfe32++){const _0x2153d2=this['createChildSprite'](_0x68b937,_0x4dc236);_0x2153d2[_0x15f76e(0x7d3)][_0x15f76e(0x2ef)](_0x385627[_0x8dfe32],0x0,0x0,_0x68b937,_0x4dc236,'center'),_0x2153d2['x']=(_0x8dfe32-(_0x385627[_0x15f76e(0x1cc)]-0x1)/0x2)*_0x68b937,_0x2153d2['dy']=-_0x8dfe32;}},Sprite_Damage[_0x33ad8c(0x116)][_0x33ad8c(0x9c0)]=function(){const _0x163c87=_0x33ad8c;return VisuMZ['CoreEngine'][_0x163c87(0x828)][_0x163c87(0x113)][_0x163c87(0x826)];},Sprite_Damage[_0x33ad8c(0x116)]['valueOutlineColor']=function(){const _0x2e118c=_0x33ad8c;return ColorManager[_0x2e118c(0x986)]();},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x827)]=Sprite_Gauge[_0x33ad8c(0x116)]['gaugeRate'],Sprite_Gauge[_0x33ad8c(0x116)][_0x33ad8c(0x1fd)]=function(){const _0x553e2b=_0x33ad8c;return VisuMZ[_0x553e2b(0x9dd)][_0x553e2b(0x827)][_0x553e2b(0x439)](this)['clamp'](0x0,0x1);},VisuMZ[_0x33ad8c(0x9dd)]['Sprite_Gauge_currentValue']=Sprite_Gauge[_0x33ad8c(0x116)]['currentValue'],Sprite_Gauge[_0x33ad8c(0x116)][_0x33ad8c(0x8e5)]=function(){const _0x4883ed=_0x33ad8c;let _0x21d1c5=VisuMZ[_0x4883ed(0x9dd)][_0x4883ed(0x993)]['call'](this);return _0x21d1c5;},Sprite_Gauge[_0x33ad8c(0x116)][_0x33ad8c(0x452)]=function(){const _0x3cb766=_0x33ad8c;let _0x54ff2d=this[_0x3cb766(0x8e5)]();this[_0x3cb766(0x9c0)]()&&(_0x54ff2d=VisuMZ[_0x3cb766(0x124)](_0x54ff2d));const _0xd77362=this[_0x3cb766(0x963)]()-0x1,_0x2601de=this[_0x3cb766(0x6c4)]?this['textHeight']():this['bitmapHeight']();this[_0x3cb766(0x514)](),this['bitmap'][_0x3cb766(0x2ef)](_0x54ff2d,0x0,0x0,_0xd77362,_0x2601de,_0x3cb766(0x513));},Sprite_Gauge[_0x33ad8c(0x116)][_0x33ad8c(0x6a1)]=function(){return 0x3;},Sprite_Gauge[_0x33ad8c(0x116)][_0x33ad8c(0x9c0)]=function(){const _0x4c04bf=_0x33ad8c;return VisuMZ[_0x4c04bf(0x9dd)][_0x4c04bf(0x828)]['QoL']['DigitGroupingGaugeSprites'];},Sprite_Gauge['prototype'][_0x33ad8c(0x891)]=function(){const _0x3a443f=_0x33ad8c;return ColorManager[_0x3a443f(0x9df)]();},VisuMZ['CoreEngine']['Sprite_Picture_loadBitmap']=Sprite_Picture[_0x33ad8c(0x116)][_0x33ad8c(0x694)],Sprite_Picture[_0x33ad8c(0x116)][_0x33ad8c(0x694)]=function(){const _0x5932b7=_0x33ad8c;if(this['_pictureName']&&this[_0x5932b7(0x425)][_0x5932b7(0x13d)](/VisuMZ CoreEngine PictureIcon (\d+)/i)){if('PSHFZ'==='VjYin'){const _0x3a1605=this[_0x5932b7(0x8a3)],_0x24ea20=this[_0x5932b7(0x33f)],_0x53d581=0x18,_0x2e8a75=_0x53d581/0x2,_0x4a4899=0x60+_0x53d581,_0x3620ee=0x0+_0x53d581;this[_0x5932b7(0x495)][_0x5932b7(0x7d3)]=this[_0x5932b7(0x641)],this[_0x5932b7(0x495)][_0x5932b7(0x968)]['x']=0.5,this['_downArrowSprite'][_0x5932b7(0x968)]['y']=0.5,this['_downArrowSprite'][_0x5932b7(0x140)](_0x4a4899+_0x2e8a75,_0x3620ee+_0x2e8a75+_0x53d581,_0x53d581,_0x2e8a75),this[_0x5932b7(0x495)][_0x5932b7(0x7b9)](_0x41cccf[_0x5932b7(0x758)](_0x3a1605/0x2),_0x11f077['round'](_0x24ea20-_0x2e8a75)),this['_upArrowSprite'][_0x5932b7(0x7d3)]=this[_0x5932b7(0x641)],this[_0x5932b7(0x5b8)][_0x5932b7(0x968)]['x']=0.5,this[_0x5932b7(0x5b8)][_0x5932b7(0x968)]['y']=0.5,this[_0x5932b7(0x5b8)][_0x5932b7(0x140)](_0x4a4899+_0x2e8a75,_0x3620ee,_0x53d581,_0x2e8a75),this[_0x5932b7(0x5b8)][_0x5932b7(0x7b9)](_0x121cee[_0x5932b7(0x758)](_0x3a1605/0x2),_0x4454a0[_0x5932b7(0x758)](_0x2e8a75));}else this['loadIconBitmap'](Number(RegExp['$1']));}else VisuMZ['CoreEngine'][_0x5932b7(0x1e6)][_0x5932b7(0x439)](this);},Sprite_Picture[_0x33ad8c(0x116)][_0x33ad8c(0x9b1)]=function(_0x3329d1){const _0x39121e=_0x33ad8c,_0x483394=ImageManager[_0x39121e(0x406)],_0x3c293f=ImageManager[_0x39121e(0xa1c)],_0x5ce317=this[_0x39121e(0x425)][_0x39121e(0x13d)](/SMOOTH/i);this[_0x39121e(0x7d3)]=new Bitmap(_0x483394,_0x3c293f);const _0x57a2e1=ImageManager['loadSystem']('IconSet'),_0x563a71=_0x3329d1%0x10*_0x483394,_0x11352a=Math[_0x39121e(0x701)](_0x3329d1/0x10)*_0x3c293f;this[_0x39121e(0x7d3)][_0x39121e(0x56c)]=_0x5ce317,this[_0x39121e(0x7d3)][_0x39121e(0x7b4)](_0x57a2e1,_0x563a71,_0x11352a,_0x483394,_0x3c293f,0x0,0x0,_0x483394,_0x3c293f);};function Sprite_TitlePictureButton(){this['initialize'](...arguments);}Sprite_TitlePictureButton[_0x33ad8c(0x116)]=Object[_0x33ad8c(0x8fc)](Sprite_Clickable[_0x33ad8c(0x116)]),Sprite_TitlePictureButton[_0x33ad8c(0x116)][_0x33ad8c(0x4db)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x33ad8c(0x116)]['initialize']=function(_0x2ecee0){const _0x32fb6a=_0x33ad8c;Sprite_Clickable[_0x32fb6a(0x116)]['initialize'][_0x32fb6a(0x439)](this),this[_0x32fb6a(0x8ed)]=_0x2ecee0,this[_0x32fb6a(0x1ae)]=null,this[_0x32fb6a(0x52d)]();},Sprite_TitlePictureButton['prototype'][_0x33ad8c(0x52d)]=function(){const _0x12d1fb=_0x33ad8c;this['x']=Graphics[_0x12d1fb(0x483)],this['y']=Graphics[_0x12d1fb(0x64c)],this[_0x12d1fb(0x736)]=![],this[_0x12d1fb(0x57f)]();},Sprite_TitlePictureButton[_0x33ad8c(0x116)]['setupButtonImage']=function(){const _0x1aa1a9=_0x33ad8c;this[_0x1aa1a9(0x7d3)]=ImageManager[_0x1aa1a9(0x803)](this['_data'][_0x1aa1a9(0x510)]),this[_0x1aa1a9(0x7d3)]['addLoadListener'](this['onButtonImageLoad'][_0x1aa1a9(0x404)](this));},Sprite_TitlePictureButton[_0x33ad8c(0x116)][_0x33ad8c(0x5af)]=function(){const _0x4bd166=_0x33ad8c;this['_data'][_0x4bd166(0x5eb)][_0x4bd166(0x439)](this),this[_0x4bd166(0x8ed)]['PositionJS'][_0x4bd166(0x439)](this),this[_0x4bd166(0x830)](this[_0x4bd166(0x8ed)][_0x4bd166(0x5b6)][_0x4bd166(0x404)](this));},Sprite_TitlePictureButton[_0x33ad8c(0x116)][_0x33ad8c(0x88b)]=function(){const _0x14a5be=_0x33ad8c;Sprite_Clickable[_0x14a5be(0x116)][_0x14a5be(0x88b)][_0x14a5be(0x439)](this),this['updateOpacity'](),this[_0x14a5be(0x942)]();},Sprite_TitlePictureButton[_0x33ad8c(0x116)][_0x33ad8c(0x947)]=function(){const _0x181dc4=_0x33ad8c;return VisuMZ['CoreEngine']['Settings'][_0x181dc4(0x5ce)][_0x181dc4(0x18e)][_0x181dc4(0x3c3)];},Sprite_TitlePictureButton[_0x33ad8c(0x116)][_0x33ad8c(0x505)]=function(){const _0x26a3bf=_0x33ad8c;if(this[_0x26a3bf(0x671)]||this['_hovered'])this[_0x26a3bf(0x788)]=0xff;else{if(_0x26a3bf(0x370)===_0x26a3bf(0x4fd))return this['xScrollLinkedOffset']();else this['opacity']+=this[_0x26a3bf(0x736)]?this[_0x26a3bf(0x947)]():-0x1*this[_0x26a3bf(0x947)](),this[_0x26a3bf(0x788)]=Math[_0x26a3bf(0x732)](0xc0,this[_0x26a3bf(0x788)]);}},Sprite_TitlePictureButton[_0x33ad8c(0x116)][_0x33ad8c(0x830)]=function(_0x201f33){const _0xda6c16=_0x33ad8c;this[_0xda6c16(0x1ae)]=_0x201f33;},Sprite_TitlePictureButton[_0x33ad8c(0x116)][_0x33ad8c(0x31a)]=function(){const _0x291f1d=_0x33ad8c;this['_clickHandler']&&this[_0x291f1d(0x1ae)]();},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x47c)]=Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x4b0)],Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x4b0)]=function(){const _0x3bd499=_0x33ad8c;VisuMZ[_0x3bd499(0x9dd)][_0x3bd499(0x47c)]['call'](this),this[_0x3bd499(0x877)]();},Spriteset_Base['prototype'][_0x33ad8c(0x877)]=function(){const _0x4a78e6=_0x33ad8c;this[_0x4a78e6(0x1e5)]=[],this['_pointAnimationSprites']=[],this['_cacheScaleX']=this[_0x4a78e6(0x17d)]['x'],this[_0x4a78e6(0x2cd)]=this[_0x4a78e6(0x17d)]['y'];},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x7e2)]=Spriteset_Base['prototype'][_0x33ad8c(0x776)],Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x776)]=function(_0x5eb70f){const _0x4afb26=_0x33ad8c;this[_0x4afb26(0x2ca)](),this[_0x4afb26(0x61d)](),VisuMZ[_0x4afb26(0x9dd)][_0x4afb26(0x7e2)][_0x4afb26(0x439)](this,_0x5eb70f);},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x6c8)]=Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x88b)],Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x88b)]=function(){const _0x4f99e4=_0x33ad8c;VisuMZ[_0x4f99e4(0x9dd)][_0x4f99e4(0x6c8)][_0x4f99e4(0x439)](this),this['updatePictureSettings'](),this['updatePictureAntiZoom'](),this[_0x4f99e4(0x194)](),this['updatePointAnimations']();},Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x6e3)]=function(){},Spriteset_Base['prototype'][_0x33ad8c(0x704)]=function(){const _0x34774b=_0x33ad8c;if(!VisuMZ['CoreEngine'][_0x34774b(0x828)][_0x34774b(0x113)][_0x34774b(0x207)])return;if(this[_0x34774b(0x46f)]===this[_0x34774b(0x17d)]['x']&&this['_cacheScaleY']===this[_0x34774b(0x17d)]['y'])return;this[_0x34774b(0x73d)](),this[_0x34774b(0x46f)]=this[_0x34774b(0x17d)]['x'],this[_0x34774b(0x2cd)]=this[_0x34774b(0x17d)]['y'];},Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x73d)]=function(){const _0x4851e7=_0x33ad8c;if(SceneManager['isSceneMap']()&&Spriteset_Map[_0x4851e7(0x360)])return;else{if(SceneManager[_0x4851e7(0x2fc)]()&&Spriteset_Battle[_0x4851e7(0x360)]){if(_0x4851e7(0x2a0)===_0x4851e7(0x978))_0x41ad08[_0x4851e7(0x9dd)][_0x4851e7(0x991)][_0x4851e7(0x439)](this),this[_0x4851e7(0xa05)]();else return;}}if(this['scale']['x']!==0x0){if(_0x4851e7(0x331)!==_0x4851e7(0x331)){if(_0x42dba1&&_0x2cc436[_0x4851e7(0x7d3)])_0x325da9[_0x4851e7(0x7d3)]['destroy']();}else this[_0x4851e7(0x40e)][_0x4851e7(0x17d)]['x']=0x1/this[_0x4851e7(0x17d)]['x'],this[_0x4851e7(0x40e)]['x']=-(this['x']/this[_0x4851e7(0x17d)]['x']);}if(this[_0x4851e7(0x17d)]['y']!==0x0){if(_0x4851e7(0x954)===_0x4851e7(0x77e))return _0x736955[_0x4851e7(0x6c7)][_0x4851e7(0x8a4)]['call'](this);else this[_0x4851e7(0x40e)][_0x4851e7(0x17d)]['y']=0x1/this[_0x4851e7(0x17d)]['y'],this[_0x4851e7(0x40e)]['y']=-(this['y']/this[_0x4851e7(0x17d)]['y']);}},VisuMZ['CoreEngine'][_0x33ad8c(0x605)]=Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x842)],Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x842)]=function(){const _0x1316a9=_0x33ad8c;VisuMZ[_0x1316a9(0x9dd)][_0x1316a9(0x605)]['call'](this),this[_0x1316a9(0x12d)]();},Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x12d)]=function(){const _0x3e24b8=_0x33ad8c;if(!$gameScreen)return;if($gameScreen[_0x3e24b8(0x121)]<=0x0)return;this['x']-=Math[_0x3e24b8(0x758)]($gameScreen[_0x3e24b8(0x2d4)]());const _0x3cba24=$gameScreen[_0x3e24b8(0x54e)]();switch($gameScreen[_0x3e24b8(0x54e)]()){case _0x3e24b8(0x9ec):this[_0x3e24b8(0x2e2)]();break;case'horizontal':this[_0x3e24b8(0x899)]();break;case'vertical':this[_0x3e24b8(0x876)]();break;default:this[_0x3e24b8(0x145)]();break;}},Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x2e2)]=function(){const _0x1c5259=_0x33ad8c,_0x4ac88e=VisuMZ[_0x1c5259(0x9dd)][_0x1c5259(0x828)][_0x1c5259(0x290)];if(_0x4ac88e&&_0x4ac88e[_0x1c5259(0x8f3)])return _0x4ac88e[_0x1c5259(0x8f3)][_0x1c5259(0x439)](this);this['x']+=Math['round']($gameScreen[_0x1c5259(0x2d4)]());},Spriteset_Base[_0x33ad8c(0x116)]['updatePositionCoreEngineShakeRand']=function(){const _0x5b7681=_0x33ad8c,_0x397b79=VisuMZ[_0x5b7681(0x9dd)]['Settings'][_0x5b7681(0x290)];if(_0x397b79&&_0x397b79['randomJS'])return _0x397b79[_0x5b7681(0x10a)][_0x5b7681(0x439)](this);const _0x5b99ea=$gameScreen[_0x5b7681(0x9f2)]*0.75,_0x26e8a8=$gameScreen[_0x5b7681(0x8c6)]*0.6,_0x18e5f3=$gameScreen[_0x5b7681(0x121)];this['x']+=Math['round'](Math[_0x5b7681(0x659)](_0x5b99ea)-Math[_0x5b7681(0x659)](_0x26e8a8))*(Math[_0x5b7681(0x732)](_0x18e5f3,0x1e)*0.5),this['y']+=Math[_0x5b7681(0x758)](Math['randomInt'](_0x5b99ea)-Math['randomInt'](_0x26e8a8))*(Math['min'](_0x18e5f3,0x1e)*0.5);},Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x899)]=function(){const _0x33d7a5=_0x33ad8c,_0x54c792=VisuMZ['CoreEngine'][_0x33d7a5(0x828)][_0x33d7a5(0x290)];if(_0x54c792&&_0x54c792['horzJS']){if('kMyuq'!==_0x33d7a5(0x70e))return _0x54c792[_0x33d7a5(0x860)][_0x33d7a5(0x439)](this);else{const _0xff2f8e=_0x4240ce[_0x33d7a5(0x9dd)][_0x33d7a5(0x828)][_0x33d7a5(0x290)];if(_0xff2f8e&&_0xff2f8e[_0x33d7a5(0x6be)])return _0xff2f8e[_0x33d7a5(0x6be)]['call'](this);const _0x19bc77=_0x34a5c7[_0x33d7a5(0x9f2)]*0.75,_0x2a5581=_0xfac010[_0x33d7a5(0x8c6)]*0.6,_0x11f2f6=_0x2f4941[_0x33d7a5(0x121)];this['y']+=_0x12ecaa[_0x33d7a5(0x758)](_0x1c4aea[_0x33d7a5(0x659)](_0x19bc77)-_0x4a20df[_0x33d7a5(0x659)](_0x2a5581))*(_0x11c154[_0x33d7a5(0x732)](_0x11f2f6,0x1e)*0.5);}}const _0x4f990f=$gameScreen['_shakePower']*0.75,_0x418da3=$gameScreen[_0x33d7a5(0x8c6)]*0.6,_0x38c3af=$gameScreen['_shakeDuration'];this['x']+=Math[_0x33d7a5(0x758)](Math[_0x33d7a5(0x659)](_0x4f990f)-Math[_0x33d7a5(0x659)](_0x418da3))*(Math[_0x33d7a5(0x732)](_0x38c3af,0x1e)*0.5);},Spriteset_Base[_0x33ad8c(0x116)]['updatePositionCoreEngineShakeVert']=function(){const _0x5454a3=_0x33ad8c,_0x2882e4=VisuMZ[_0x5454a3(0x9dd)][_0x5454a3(0x828)][_0x5454a3(0x290)];if(_0x2882e4&&_0x2882e4[_0x5454a3(0x6be)]){if(_0x5454a3(0x86b)!==_0x5454a3(0x3f8))return _0x2882e4['vertJS'][_0x5454a3(0x439)](this);else{if(this[_0x5454a3(0x7b1)]===_0x59ec78)this['initCoreEngineScreenShake']();return this['_coreEngineShakeStyle'];}}const _0x177e48=$gameScreen[_0x5454a3(0x9f2)]*0.75,_0x21668f=$gameScreen['_shakeSpeed']*0.6,_0x230c2b=$gameScreen[_0x5454a3(0x121)];this['y']+=Math['round'](Math[_0x5454a3(0x659)](_0x177e48)-Math['randomInt'](_0x21668f))*(Math[_0x5454a3(0x732)](_0x230c2b,0x1e)*0.5);},Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x194)]=function(){const _0x365643=_0x33ad8c;for(const _0x9c9714 of this['_fauxAnimationSprites']){if(_0x365643(0x8b8)!==_0x365643(0x89f)){if(!_0x9c9714['isPlaying']()){if('NTaVJ'!==_0x365643(0x6b1))this[_0x365643(0x730)](_0x9c9714);else return _0x1b1900['randomJS'][_0x365643(0x439)](this);}}else _0x19f310[_0x365643(0x9dd)][_0x365643(0x4ea)]['call'](this);}this[_0x365643(0x10b)]();},Spriteset_Base['prototype'][_0x33ad8c(0x10b)]=function(){const _0x196ea1=_0x33ad8c;for(;;){const _0x1a2027=$gameTemp['retrieveFauxAnimation']();if(_0x1a2027)this[_0x196ea1(0x26d)](_0x1a2027);else break;}},Spriteset_Base[_0x33ad8c(0x116)]['createFauxAnimation']=function(_0x572714){const _0x2eaef5=_0x33ad8c,_0x36c3d7=$dataAnimations[_0x572714['animationId']],_0x5f9a37=_0x572714[_0x2eaef5(0x76b)],_0x230bc0=_0x572714[_0x2eaef5(0x7f8)],_0x630d9a=_0x572714[_0x2eaef5(0x9cc)];let _0x2cca1e=this[_0x2eaef5(0x263)]();const _0x61aeeb=this[_0x2eaef5(0x13b)]();if(this[_0x2eaef5(0x568)](_0x36c3d7))for(const _0x58daaf of _0x5f9a37){_0x2eaef5(0x3f9)!==_0x2eaef5(0x3e4)?(this[_0x2eaef5(0x30e)]([_0x58daaf],_0x36c3d7,_0x230bc0,_0x2cca1e,_0x630d9a),_0x2cca1e+=_0x61aeeb):this['drawText'](_0x29f5d8[_0x2eaef5(0x9dd)][_0x2eaef5(0x828)]['Gold'][_0x2eaef5(0x17a)],_0x1b35b4,_0x2da478,_0x2572c2,'right');}else this['createFauxAnimationSprite'](_0x5f9a37,_0x36c3d7,_0x230bc0,_0x2cca1e,_0x630d9a);},Spriteset_Base[_0x33ad8c(0x116)]['createAnimationSprite']=function(_0x5abce5,_0x95cb2d,_0x294899,_0x56c1f5){const _0x388ee7=_0x33ad8c,_0x1023c1=this[_0x388ee7(0x8f6)](_0x95cb2d),_0x696242=new(_0x1023c1?Sprite_AnimationMV:Sprite_Animation)(),_0xb70945=this[_0x388ee7(0x2de)](_0x5abce5),_0x3f7061=this[_0x388ee7(0x263)](),_0xaa0459=_0x56c1f5>_0x3f7061?this[_0x388ee7(0x15b)]():null;this[_0x388ee7(0x764)](_0x5abce5[0x0])&&(_0x388ee7(0x728)===_0x388ee7(0x728)?_0x294899=!_0x294899:this['_helpWindow']['setBackgroundType'](_0x1bfa67[_0x388ee7(0x6c7)][_0x388ee7(0x102)])),_0x696242[_0x388ee7(0x95f)]=_0x5abce5,_0x696242[_0x388ee7(0x52d)](_0xb70945,_0x95cb2d,_0x294899,_0x56c1f5,_0xaa0459),this['addAnimationSpriteToContainer'](_0x696242),this['_animationSprites']['push'](_0x696242);},Spriteset_Base['prototype'][_0x33ad8c(0x30e)]=function(_0x36c865,_0x335c7a,_0x46c544,_0x2c65ed,_0x3ae736){const _0x5b3e0f=_0x33ad8c,_0x26b979=this[_0x5b3e0f(0x8f6)](_0x335c7a),_0x43b915=new(_0x26b979?Sprite_AnimationMV:Sprite_Animation)(),_0x59278d=this[_0x5b3e0f(0x2de)](_0x36c865);this[_0x5b3e0f(0x764)](_0x36c865[0x0])&&(_0x46c544=!_0x46c544);_0x43b915[_0x5b3e0f(0x95f)]=_0x36c865,_0x43b915['setup'](_0x59278d,_0x335c7a,_0x46c544,_0x2c65ed),_0x43b915[_0x5b3e0f(0x25e)](_0x3ae736),this[_0x5b3e0f(0x8ab)](_0x43b915);if(this[_0x5b3e0f(0x798)])this[_0x5b3e0f(0x798)][_0x5b3e0f(0x929)](_0x43b915);this[_0x5b3e0f(0x1e5)][_0x5b3e0f(0x8f7)](_0x43b915);},Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x8ab)]=function(_0x5cd21b){this['_effectsContainer']['addChild'](_0x5cd21b);},Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x103)]=function(_0x1002b3){const _0xde5556=_0x33ad8c;this[_0xde5556(0x798)][_0xde5556(0x929)](_0x1002b3),this[_0xde5556(0x602)](_0x1002b3);for(const _0x28d3f4 of _0x1002b3['targetObjects']){if(_0x28d3f4[_0xde5556(0x5d9)]){if(_0xde5556(0x396)!==_0xde5556(0x43b))_0x28d3f4[_0xde5556(0x5d9)]();else return _0x23b5ff[_0xde5556(0x9dd)]['Settings'][_0xde5556(0x113)][_0xde5556(0x1ba)];}}_0x1002b3[_0xde5556(0x776)]();},Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x730)]=function(_0x31e74e){const _0x5d07d0=_0x33ad8c;this[_0x5d07d0(0x1e5)][_0x5d07d0(0x929)](_0x31e74e),this[_0x5d07d0(0x602)](_0x31e74e);for(const _0x2ece3d of _0x31e74e[_0x5d07d0(0x95f)]){_0x2ece3d[_0x5d07d0(0x5d9)]&&_0x2ece3d[_0x5d07d0(0x5d9)]();}_0x31e74e['destroy']();},Spriteset_Base['prototype'][_0x33ad8c(0x602)]=function(_0x3610ef){const _0x2ab50a=_0x33ad8c;this[_0x2ab50a(0x62f)][_0x2ab50a(0x93a)](_0x3610ef);},Spriteset_Base[_0x33ad8c(0x116)]['removeAllFauxAnimations']=function(){const _0x5ee4e5=_0x33ad8c;for(const _0x1ea396 of this['_fauxAnimationSprites']){this[_0x5ee4e5(0x730)](_0x1ea396);}},Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x722)]=function(){const _0x1b24a9=_0x33ad8c;return this[_0x1b24a9(0x1e5)][_0x1b24a9(0x1cc)]>0x0;},Spriteset_Base[_0x33ad8c(0x116)]['updatePointAnimations']=function(){const _0x3566d3=_0x33ad8c;for(const _0x77755e of this[_0x3566d3(0x5ca)]){_0x3566d3(0x9be)!==_0x3566d3(0x9be)?_0x37ad53[_0x3566d3(0x984)]=_0x298de1[_0x3566d3(0x65d)][_0x3566d3(0x522)]:!_0x77755e[_0x3566d3(0x625)]()&&this[_0x3566d3(0x850)](_0x77755e);}this[_0x3566d3(0x9fe)]();},Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x9fe)]=function(){const _0x3d5e8e=_0x33ad8c;for(;;){const _0x49b501=$gameTemp[_0x3d5e8e(0x9f5)]();if(_0x49b501)this[_0x3d5e8e(0x88c)](_0x49b501);else break;}},Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x88c)]=function(_0x2a28b2){const _0x54877e=_0x33ad8c,_0x2174e2=$dataAnimations[_0x2a28b2[_0x54877e(0x122)]],_0x118f3d=this[_0x54877e(0x1fc)](_0x2a28b2),_0x526861=_0x2a28b2[_0x54877e(0x7f8)],_0x49af7b=_0x2a28b2[_0x54877e(0x9cc)];let _0x1f03ce=this[_0x54877e(0x263)]();const _0x18334e=this[_0x54877e(0x13b)]();if(this[_0x54877e(0x568)](_0x2174e2))for(const _0x5e02a6 of _0x118f3d){this[_0x54877e(0x5d0)]([_0x5e02a6],_0x2174e2,_0x526861,_0x1f03ce,_0x49af7b),_0x1f03ce+=_0x18334e;}else{if(_0x54877e(0x8be)!==_0x54877e(0x8be)){_0x5da657['CoreEngine'][_0x54877e(0x7c4)]['call'](this);if(this[_0x54877e(0x262)])this['_gamepadWait']--;}else this[_0x54877e(0x5d0)](_0x118f3d,_0x2174e2,_0x526861,_0x1f03ce,_0x49af7b);}},Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x1fc)]=function(_0x56e3ae){const _0x29a186=_0x33ad8c,_0x314bbd=new Sprite_Clickable(),_0x42fe10=this[_0x29a186(0x150)]();_0x314bbd['x']=_0x56e3ae['x']-_0x42fe10['x'],_0x314bbd['y']=_0x56e3ae['y']-_0x42fe10['y'],_0x314bbd['z']=0x64;const _0x3c0061=this[_0x29a186(0x150)]();return _0x3c0061[_0x29a186(0x5c6)](_0x314bbd),[_0x314bbd];},Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x150)]=function(){return this;},Spriteset_Map['prototype'][_0x33ad8c(0x150)]=function(){const _0x3a802a=_0x33ad8c;return this[_0x3a802a(0x196)]||this;},Spriteset_Battle[_0x33ad8c(0x116)]['getPointAnimationLayer']=function(){const _0x480e23=_0x33ad8c;return this[_0x480e23(0xa1b)]||this;},Spriteset_Base['prototype']['createPointAnimationSprite']=function(_0x220c7b,_0x305041,_0x423b51,_0x240393,_0x48ff28){const _0x3140ae=_0x33ad8c,_0x2924f6=this[_0x3140ae(0x8f6)](_0x305041),_0x19fbfc=new(_0x2924f6?Sprite_AnimationMV:Sprite_Animation)();_0x19fbfc[_0x3140ae(0x95f)]=_0x220c7b,_0x19fbfc['setup'](_0x220c7b,_0x305041,_0x423b51,_0x240393),_0x19fbfc[_0x3140ae(0x25e)](_0x48ff28),this[_0x3140ae(0x8ab)](_0x19fbfc),this[_0x3140ae(0x5ca)][_0x3140ae(0x8f7)](_0x19fbfc);},Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x850)]=function(_0x464cc0){const _0x57c436=_0x33ad8c;this['_pointAnimationSprites'][_0x57c436(0x929)](_0x464cc0),this[_0x57c436(0x62f)][_0x57c436(0x93a)](_0x464cc0);for(const _0x720766 of _0x464cc0['targetObjects']){if(_0x57c436(0x62e)===_0x57c436(0x62e)){_0x720766[_0x57c436(0x5d9)]&&(_0x57c436(0x51e)!=='fRDHK'?_0x720766[_0x57c436(0x5d9)]():this[_0x57c436(0x4bd)][_0x57c436(0x672)](_0x25f3a6[_0x57c436(0x6c7)]['SlotBgType']));const _0x598cd5=this[_0x57c436(0x150)]();if(_0x598cd5)_0x598cd5[_0x57c436(0x93a)](_0x720766);}else return _0x4a68bb[_0x57c436(0x9dd)][_0x57c436(0x48b)][_0x57c436(0x439)](this)||this[_0x57c436(0x62c)]();}_0x464cc0['destroy']();},Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x61d)]=function(){const _0x1370b9=_0x33ad8c;for(const _0x2fef40 of this[_0x1370b9(0x5ca)]){this[_0x1370b9(0x850)](_0x2fef40);}},Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x62c)]=function(){const _0x1cacc1=_0x33ad8c;return this[_0x1cacc1(0x5ca)][_0x1cacc1(0x1cc)]>0x0;},VisuMZ['CoreEngine'][_0x33ad8c(0x48b)]=Spriteset_Base[_0x33ad8c(0x116)][_0x33ad8c(0x43d)],Spriteset_Base[_0x33ad8c(0x116)]['isAnimationPlaying']=function(){const _0x45ddbd=_0x33ad8c;return VisuMZ[_0x45ddbd(0x9dd)][_0x45ddbd(0x48b)]['call'](this)||this[_0x45ddbd(0x62c)]();},Spriteset_Map[_0x33ad8c(0x360)]=VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x828)][_0x33ad8c(0x113)]['DetachMapPictureContainer']||![],VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x769)]=Scene_Map['prototype'][_0x33ad8c(0x4ce)],Scene_Map['prototype'][_0x33ad8c(0x4ce)]=function(){const _0x276a21=_0x33ad8c;VisuMZ[_0x276a21(0x9dd)]['Scene_Map_createSpriteset_detach'][_0x276a21(0x439)](this);if(!Spriteset_Map[_0x276a21(0x360)])return;const _0x433371=this['_spriteset'];if(!_0x433371)return;this[_0x276a21(0x40e)]=_0x433371[_0x276a21(0x40e)];if(!this['_pictureContainer'])return;this[_0x276a21(0x5c6)](this[_0x276a21(0x40e)]);},Spriteset_Battle[_0x33ad8c(0x360)]=VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x828)]['QoL']['DetachBattlePictureContainer']||![],VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x825)]=Scene_Battle[_0x33ad8c(0x116)]['createSpriteset'],Scene_Battle[_0x33ad8c(0x116)][_0x33ad8c(0x4ce)]=function(){const _0x4366da=_0x33ad8c;VisuMZ['CoreEngine'][_0x4366da(0x825)][_0x4366da(0x439)](this);if(!Spriteset_Battle[_0x4366da(0x360)])return;const _0x44eb06=this[_0x4366da(0x55c)];if(!_0x44eb06)return;this[_0x4366da(0x40e)]=_0x44eb06[_0x4366da(0x40e)];if(!this[_0x4366da(0x40e)])return;this[_0x4366da(0x5c6)](this[_0x4366da(0x40e)]);},Spriteset_Battle[_0x33ad8c(0x116)][_0x33ad8c(0x4f1)]=function(){const _0x5179f1=_0x33ad8c;this[_0x5179f1(0x640)]=new PIXI[(_0x5179f1(0x957))][(_0x5179f1(0x34c))](clamp=!![]),this['_backgroundSprite']=new Sprite(),this[_0x5179f1(0x39f)][_0x5179f1(0x7d3)]=SceneManager[_0x5179f1(0x6c5)](),this['_backgroundSprite'][_0x5179f1(0x957)]=[this[_0x5179f1(0x640)]],this[_0x5179f1(0x1e7)][_0x5179f1(0x5c6)](this[_0x5179f1(0x39f)]);},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x5b5)]=Spriteset_Battle['prototype'][_0x33ad8c(0x47d)],Spriteset_Battle['prototype'][_0x33ad8c(0x47d)]=function(){const _0xc4e2d=_0x33ad8c;this[_0xc4e2d(0x120)]()&&this[_0xc4e2d(0x731)](),VisuMZ[_0xc4e2d(0x9dd)][_0xc4e2d(0x5b5)]['call'](this);},Spriteset_Battle[_0x33ad8c(0x116)][_0x33ad8c(0x120)]=function(){const _0x24d91a=_0x33ad8c,_0x35867b=VisuMZ['CoreEngine'][_0x24d91a(0x828)]['ScreenResolution'];if(!_0x35867b)return![];if(Utils[_0x24d91a(0x463)]>=_0x24d91a(0x130)&&!_0x35867b['RepositionEnemies130'])return _0x24d91a(0x6e0)!==_0x24d91a(0x61b)?![]:_0x5ef100['layoutSettings'][_0x24d91a(0x36f)]['call'](this);return _0x35867b[_0x24d91a(0x24f)];},Spriteset_Battle[_0x33ad8c(0x116)]['repositionEnemiesByResolution']=function(){const _0x38a66a=_0x33ad8c;for(member of $gameTroop[_0x38a66a(0x5fa)]()){member[_0x38a66a(0x6e9)]();}},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x515)]=Window_Base[_0x33ad8c(0x116)]['initialize'],Window_Base[_0x33ad8c(0x116)][_0x33ad8c(0x4b0)]=function(_0x539d5f){const _0x486281=_0x33ad8c;_0x539d5f['x']=Math[_0x486281(0x758)](_0x539d5f['x']),_0x539d5f['y']=Math[_0x486281(0x758)](_0x539d5f['y']),_0x539d5f[_0x486281(0x483)]=Math[_0x486281(0x758)](_0x539d5f[_0x486281(0x483)]),_0x539d5f['height']=Math[_0x486281(0x758)](_0x539d5f[_0x486281(0x64c)]),this[_0x486281(0x53b)](),VisuMZ[_0x486281(0x9dd)][_0x486281(0x515)][_0x486281(0x439)](this,_0x539d5f),this[_0x486281(0x71a)]();},Window_Base[_0x33ad8c(0x116)]['initDigitGrouping']=function(){const _0x2564cd=_0x33ad8c;this[_0x2564cd(0xa25)]=VisuMZ['CoreEngine']['Settings'][_0x2564cd(0x113)][_0x2564cd(0x54a)],this[_0x2564cd(0x479)]=VisuMZ['CoreEngine']['Settings']['QoL'][_0x2564cd(0x520)];},Window_Base['prototype']['lineHeight']=function(){const _0x4c18be=_0x33ad8c;return VisuMZ[_0x4c18be(0x9dd)]['Settings'][_0x4c18be(0x839)][_0x4c18be(0x441)];},Window_Base[_0x33ad8c(0x116)][_0x33ad8c(0x684)]=function(){const _0x155001=_0x33ad8c;return VisuMZ['CoreEngine']['Settings'][_0x155001(0x839)][_0x155001(0x4ee)];},Window_Base[_0x33ad8c(0x116)][_0x33ad8c(0x209)]=function(){const _0x1dcfce=_0x33ad8c;$gameSystem[_0x1dcfce(0x745)]?this[_0x1dcfce(0x202)]=$gameSystem[_0x1dcfce(0x745)]():this[_0x1dcfce(0x202)]=VisuMZ[_0x1dcfce(0x9dd)][_0x1dcfce(0x828)][_0x1dcfce(0x839)]['BackOpacity'];},Window_Base['prototype']['translucentOpacity']=function(){const _0x584c40=_0x33ad8c;return VisuMZ['CoreEngine'][_0x584c40(0x828)]['Window']['TranslucentOpacity'];},Window_Base[_0x33ad8c(0x116)][_0x33ad8c(0x6ef)]=function(){const _0x59aa60=_0x33ad8c;return VisuMZ[_0x59aa60(0x9dd)][_0x59aa60(0x828)]['Window'][_0x59aa60(0x60e)];},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x237)]=Window_Base[_0x33ad8c(0x116)][_0x33ad8c(0x88b)],Window_Base[_0x33ad8c(0x116)][_0x33ad8c(0x88b)]=function(){const _0x409590=_0x33ad8c;VisuMZ['CoreEngine'][_0x409590(0x237)][_0x409590(0x439)](this),this[_0x409590(0x45f)]();},Window_Base[_0x33ad8c(0x116)]['updateOpen']=function(){const _0x91646=_0x33ad8c;this[_0x91646(0x256)]&&(this[_0x91646(0x7bc)]+=this[_0x91646(0x6ef)](),this[_0x91646(0x436)]()&&(this[_0x91646(0x256)]=![]));},Window_Base['prototype'][_0x33ad8c(0x570)]=function(){const _0x408359=_0x33ad8c;this[_0x408359(0x229)]&&(_0x408359(0x86e)===_0x408359(0x86e)?(this['openness']-=this['openingSpeed'](),this[_0x408359(0x412)]()&&(this[_0x408359(0x229)]=![])):_0x24f54c=_0x3f1114[_0x408359(0x9dd)][_0x408359(0x9f4)]['call'](this));},VisuMZ['CoreEngine'][_0x33ad8c(0x139)]=Window_Base[_0x33ad8c(0x116)][_0x33ad8c(0x2ef)],Window_Base[_0x33ad8c(0x116)][_0x33ad8c(0x2ef)]=function(_0x101a57,_0x1ea6ef,_0x3a8247,_0x3731d0,_0x4d5bb8){const _0x46bb9a=_0x33ad8c;if(this['useDigitGrouping']())_0x101a57=VisuMZ['GroupDigits'](_0x101a57);VisuMZ['CoreEngine']['Window_Base_drawText'][_0x46bb9a(0x439)](this,_0x101a57,_0x1ea6ef,_0x3a8247,_0x3731d0,_0x4d5bb8);},Window_Base[_0x33ad8c(0x116)][_0x33ad8c(0x9c0)]=function(){const _0x5c8a21=_0x33ad8c;return this[_0x5c8a21(0xa25)];},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x741)]=Window_Base['prototype'][_0x33ad8c(0x2c7)],Window_Base[_0x33ad8c(0x116)]['createTextState']=function(_0x3af4c4,_0x40e1a0,_0x254fc6,_0x296cc6){const _0xa6e008=_0x33ad8c;var _0x134fb6=VisuMZ['CoreEngine']['Window_Base_createTextState']['call'](this,_0x3af4c4,_0x40e1a0,_0x254fc6,_0x296cc6);if(this['useDigitGroupingEx']())_0x134fb6[_0xa6e008(0x8dc)]=VisuMZ[_0xa6e008(0x124)](_0x134fb6['text']);return _0x134fb6;},Window_Base['prototype'][_0x33ad8c(0x8ec)]=function(){const _0x3cd27b=_0x33ad8c;return this[_0x3cd27b(0x479)];},Window_Base[_0x33ad8c(0x116)][_0x33ad8c(0x703)]=function(_0x366ba3){const _0x5ee21b=_0x33ad8c;this[_0x5ee21b(0xa25)]=_0x366ba3;},Window_Base[_0x33ad8c(0x116)]['enableDigitGroupingEx']=function(_0x57ecc){const _0x243c02=_0x33ad8c;this[_0x243c02(0x479)]=_0x57ecc;},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x552)]=Window_Base[_0x33ad8c(0x116)][_0x33ad8c(0x938)],Window_Base[_0x33ad8c(0x116)][_0x33ad8c(0x938)]=function(_0x1abe01,_0x5f4190,_0x72acf2){const _0x20b3b1=_0x33ad8c;_0x5f4190=Math[_0x20b3b1(0x758)](_0x5f4190),_0x72acf2=Math[_0x20b3b1(0x758)](_0x72acf2),VisuMZ[_0x20b3b1(0x9dd)]['Window_Base_drawIcon'][_0x20b3b1(0x439)](this,_0x1abe01,_0x5f4190,_0x72acf2);},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x24d)]=Window_Base['prototype'][_0x33ad8c(0x137)],Window_Base[_0x33ad8c(0x116)][_0x33ad8c(0x137)]=function(_0x549208,_0x12a171,_0x3648af,_0x2b0054,_0x23c5bf,_0x40ad19){const _0xe73d68=_0x33ad8c;_0x23c5bf=_0x23c5bf||ImageManager['faceWidth'],_0x40ad19=_0x40ad19||ImageManager[_0xe73d68(0x613)],_0x3648af=Math[_0xe73d68(0x758)](_0x3648af),_0x2b0054=Math['round'](_0x2b0054),_0x23c5bf=Math[_0xe73d68(0x758)](_0x23c5bf),_0x40ad19=Math[_0xe73d68(0x758)](_0x40ad19),VisuMZ['CoreEngine'][_0xe73d68(0x24d)][_0xe73d68(0x439)](this,_0x549208,_0x12a171,_0x3648af,_0x2b0054,_0x23c5bf,_0x40ad19);},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x45a)]=Window_Base['prototype'][_0x33ad8c(0x748)],Window_Base[_0x33ad8c(0x116)][_0x33ad8c(0x748)]=function(_0x4ef43a,_0x10872a,_0x15562c,_0x49fc92){const _0x309afe=_0x33ad8c;_0x15562c=Math[_0x309afe(0x758)](_0x15562c),_0x49fc92=Math['round'](_0x49fc92),VisuMZ[_0x309afe(0x9dd)][_0x309afe(0x45a)][_0x309afe(0x439)](this,_0x4ef43a,_0x10872a,_0x15562c,_0x49fc92);},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x919)]=Window_Selectable[_0x33ad8c(0x116)][_0x33ad8c(0x92e)],Window_Selectable[_0x33ad8c(0x116)]['itemRect']=function(_0x23a055){const _0x51fa86=_0x33ad8c;let _0xdc4e5a=VisuMZ[_0x51fa86(0x9dd)]['Window_Selectable_itemRect'][_0x51fa86(0x439)](this,_0x23a055);return _0xdc4e5a['x']=Math['round'](_0xdc4e5a['x']),_0xdc4e5a['y']=Math[_0x51fa86(0x758)](_0xdc4e5a['y']),_0xdc4e5a['width']=Math[_0x51fa86(0x758)](_0xdc4e5a[_0x51fa86(0x483)]),_0xdc4e5a[_0x51fa86(0x64c)]=Math[_0x51fa86(0x758)](_0xdc4e5a[_0x51fa86(0x64c)]),_0xdc4e5a;},VisuMZ[_0x33ad8c(0x9dd)]['Window_StatusBase_drawActorSimpleStatus']=Window_StatusBase[_0x33ad8c(0x116)][_0x33ad8c(0x16d)],Window_StatusBase[_0x33ad8c(0x116)]['drawActorSimpleStatus']=function(_0x14666e,_0x5ea8c0,_0x4d89c8){const _0x3edc10=_0x33ad8c;_0x5ea8c0=Math[_0x3edc10(0x758)](_0x5ea8c0),_0x4d89c8=Math[_0x3edc10(0x758)](_0x4d89c8),VisuMZ['CoreEngine']['Window_StatusBase_drawActorSimpleStatus'][_0x3edc10(0x439)](this,_0x14666e,_0x5ea8c0,_0x4d89c8);},Window_Base['prototype'][_0x33ad8c(0x71a)]=function(){const _0x47fed4=_0x33ad8c;this['_coreEasing']={'duration':0x0,'wholeDuration':0x0,'type':_0x47fed4(0x308),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this['scale']['x'],'targetScaleY':this['scale']['y'],'targetOpacity':this[_0x47fed4(0x788)],'targetBackOpacity':this[_0x47fed4(0x202)],'targetContentsOpacity':this[_0x47fed4(0x77b)]};},Window_Base['prototype'][_0x33ad8c(0x45f)]=function(){const _0x517ffc=_0x33ad8c;if(!this[_0x517ffc(0x45b)])return;if(this[_0x517ffc(0x45b)]['duration']<=0x0)return;this['x']=this[_0x517ffc(0x9cb)](this['x'],this[_0x517ffc(0x45b)]['targetX']),this['y']=this['applyCoreEasing'](this['y'],this['_coreEasing']['targetY']),this['scale']['x']=this['applyCoreEasing'](this[_0x517ffc(0x17d)]['x'],this['_coreEasing']['targetScaleX']),this[_0x517ffc(0x17d)]['y']=this['applyCoreEasing'](this[_0x517ffc(0x17d)]['y'],this[_0x517ffc(0x45b)]['targetScaleY']),this['opacity']=this[_0x517ffc(0x9cb)](this[_0x517ffc(0x788)],this[_0x517ffc(0x45b)][_0x517ffc(0x33e)]),this['backOpacity']=this[_0x517ffc(0x9cb)](this[_0x517ffc(0x202)],this[_0x517ffc(0x45b)]['targetBackOpacity']),this[_0x517ffc(0x77b)]=this[_0x517ffc(0x9cb)](this[_0x517ffc(0x77b)],this[_0x517ffc(0x45b)][_0x517ffc(0x84e)]),this[_0x517ffc(0x45b)][_0x517ffc(0x753)]--;},Window_Base[_0x33ad8c(0x116)][_0x33ad8c(0x9cb)]=function(_0x18e9f4,_0x5d7325){const _0x3a1beb=_0x33ad8c;if(!this[_0x3a1beb(0x45b)])return _0x5d7325;const _0x52518b=this[_0x3a1beb(0x45b)][_0x3a1beb(0x753)],_0xeabcd8=this[_0x3a1beb(0x45b)][_0x3a1beb(0x60d)],_0x58208a=this[_0x3a1beb(0x2f8)]((_0xeabcd8-_0x52518b)/_0xeabcd8),_0x560a50=this[_0x3a1beb(0x2f8)]((_0xeabcd8-_0x52518b+0x1)/_0xeabcd8),_0x1693b7=(_0x18e9f4-_0x5d7325*_0x58208a)/(0x1-_0x58208a);return _0x1693b7+(_0x5d7325-_0x1693b7)*_0x560a50;},Window_Base[_0x33ad8c(0x116)][_0x33ad8c(0x2f8)]=function(_0x4b2a93){const _0x34c7fa=_0x33ad8c;if(!this['_coreEasing'])return _0x4b2a93;return VisuMZ[_0x34c7fa(0x2eb)](_0x4b2a93,this[_0x34c7fa(0x45b)][_0x34c7fa(0x424)]||'LINEAR');},Window_Base[_0x33ad8c(0x116)][_0x33ad8c(0x975)]=function(_0xe2f2e4,_0x2b3db0){const _0x4ee901=_0x33ad8c;if(!this['_coreEasing'])return;this['x']=this[_0x4ee901(0x45b)][_0x4ee901(0x446)],this['y']=this[_0x4ee901(0x45b)][_0x4ee901(0x6bb)],this[_0x4ee901(0x17d)]['x']=this['_coreEasing']['targetScaleX'],this[_0x4ee901(0x17d)]['y']=this[_0x4ee901(0x45b)][_0x4ee901(0x2aa)],this[_0x4ee901(0x788)]=this[_0x4ee901(0x45b)][_0x4ee901(0x33e)],this[_0x4ee901(0x202)]=this['_coreEasing'][_0x4ee901(0x3f5)],this[_0x4ee901(0x77b)]=this[_0x4ee901(0x45b)][_0x4ee901(0x84e)],this['setupCoreEasing'](_0xe2f2e4,_0x2b3db0,this['x'],this['y'],this[_0x4ee901(0x17d)]['x'],this[_0x4ee901(0x17d)]['y'],this[_0x4ee901(0x788)],this['backOpacity'],this['contentsOpacity']);},Window_Base['prototype']['setupCoreEasing']=function(_0x1575da,_0x1cb6e1,_0x3040b9,_0x30d748,_0xf231e4,_0x319570,_0x4f306c,_0x139fac,_0x23b41e){const _0x490253=_0x33ad8c;this[_0x490253(0x45b)]={'duration':_0x1575da,'wholeDuration':_0x1575da,'type':_0x1cb6e1,'targetX':_0x3040b9,'targetY':_0x30d748,'targetScaleX':_0xf231e4,'targetScaleY':_0x319570,'targetOpacity':_0x4f306c,'targetBackOpacity':_0x139fac,'targetContentsOpacity':_0x23b41e};},Window_Base[_0x33ad8c(0x116)]['drawCurrencyValue']=function(_0xce301,_0x44fc2b,_0x3fe222,_0x44d4c7,_0x2fd91a){const _0x40feb2=_0x33ad8c;this[_0x40feb2(0x162)](),this[_0x40feb2(0x5c3)][_0x40feb2(0x1e9)]=VisuMZ[_0x40feb2(0x9dd)][_0x40feb2(0x828)][_0x40feb2(0x499)][_0x40feb2(0x472)];const _0xbe6a2b=VisuMZ[_0x40feb2(0x9dd)][_0x40feb2(0x828)][_0x40feb2(0x499)][_0x40feb2(0x31b)];if(_0xbe6a2b>0x0&&_0x44fc2b===TextManager['currencyUnit']){const _0x412405=_0x44d4c7+(this[_0x40feb2(0x22f)]()-ImageManager['iconHeight'])/0x2;this[_0x40feb2(0x938)](_0xbe6a2b,_0x3fe222+(_0x2fd91a-ImageManager[_0x40feb2(0x406)]),_0x412405),_0x2fd91a-=ImageManager[_0x40feb2(0x406)]+0x4;}else{if('okfhe'!==_0x40feb2(0x96f))this[_0x40feb2(0x107)](ColorManager[_0x40feb2(0x4e1)]()),this[_0x40feb2(0x2ef)](_0x44fc2b,_0x3fe222,_0x44d4c7,_0x2fd91a,'right'),_0x2fd91a-=this[_0x40feb2(0xa2b)](_0x44fc2b)+0x6;else return this[_0x40feb2(0x11c)]()?_0x355649[_0x40feb2(0x9dd)][_0x40feb2(0x9d6)][_0x40feb2(0x439)](this):0x0;}this['resetTextColor']();const _0x251c6a=this['textWidth'](this['_digitGrouping']?VisuMZ['GroupDigits'](_0xce301):_0xce301);if(_0x251c6a>_0x2fd91a){if(_0x40feb2(0x3b4)===_0x40feb2(0x3b4))this[_0x40feb2(0x2ef)](VisuMZ['CoreEngine']['Settings'][_0x40feb2(0x499)][_0x40feb2(0x17a)],_0x3fe222,_0x44d4c7,_0x2fd91a,_0x40feb2(0x513));else return _0x1b9393['CoreEngine']['Settings'][_0x40feb2(0x5ce)][_0x40feb2(0x18e)][_0x40feb2(0x6ee)][_0x40feb2(0x439)](this);}else this[_0x40feb2(0x2ef)](_0xce301,_0x3fe222,_0x44d4c7,_0x2fd91a,'right');this[_0x40feb2(0x162)]();},Window_Base['prototype'][_0x33ad8c(0x6a7)]=function(_0x215eb9,_0x5a0c21,_0x55c3cf,_0x52d9ef,_0x48881e){const _0x26885a=_0x33ad8c,_0xc8685b=ImageManager['loadSystem'](_0x26885a(0x2d0)),_0x7da56f=ImageManager['iconWidth'],_0x5e438f=ImageManager[_0x26885a(0xa1c)],_0x2c5b24=_0x215eb9%0x10*_0x7da56f,_0x25c013=Math['floor'](_0x215eb9/0x10)*_0x5e438f,_0x5e8016=_0x52d9ef,_0x2eb743=_0x52d9ef;this[_0x26885a(0x5c3)]['_context'][_0x26885a(0x230)]=_0x48881e,this[_0x26885a(0x5c3)][_0x26885a(0x7b4)](_0xc8685b,_0x2c5b24,_0x25c013,_0x7da56f,_0x5e438f,_0x5a0c21,_0x55c3cf,_0x5e8016,_0x2eb743),this[_0x26885a(0x5c3)][_0x26885a(0x29f)][_0x26885a(0x230)]=!![];},Window_Base[_0x33ad8c(0x116)]['drawGauge']=function(_0x170946,_0x431281,_0xe81c19,_0x2d4b72,_0x4487a9,_0x3123fa){const _0x4dec94=_0x33ad8c,_0x5b4f5f=Math['floor']((_0xe81c19-0x2)*_0x2d4b72),_0x3a4dd7=Sprite_Gauge[_0x4dec94(0x116)][_0x4dec94(0x7cb)]['call'](this),_0x9189d9=_0x431281+this[_0x4dec94(0x22f)]()-_0x3a4dd7-0x2;this[_0x4dec94(0x5c3)][_0x4dec94(0x379)](_0x170946,_0x9189d9,_0xe81c19,_0x3a4dd7,ColorManager[_0x4dec94(0x5b2)]()),this[_0x4dec94(0x5c3)][_0x4dec94(0x183)](_0x170946+0x1,_0x9189d9+0x1,_0x5b4f5f,_0x3a4dd7-0x2,_0x4487a9,_0x3123fa);},Window_Scrollable[_0x33ad8c(0x403)]={'enabled':VisuMZ['CoreEngine'][_0x33ad8c(0x828)][_0x33ad8c(0x839)][_0x33ad8c(0x2b6)]??!![],'thickness':VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x828)][_0x33ad8c(0x839)]['BarThickness']??0x2,'offset':VisuMZ['CoreEngine']['Settings'][_0x33ad8c(0x839)][_0x33ad8c(0x9d0)]??0x2,'bodyColor':VisuMZ['CoreEngine']['Settings'][_0x33ad8c(0x839)]['BarBodyColor']??0x0,'offColor':VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x828)]['Window'][_0x33ad8c(0x1dd)]??0x7,'offOpacity':VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x828)][_0x33ad8c(0x839)][_0x33ad8c(0x543)]??0x80},Window_Base[_0x33ad8c(0x116)][_0x33ad8c(0x4c3)]=function(){const _0xe1d1f4=_0x33ad8c;return Window_Scrollable[_0xe1d1f4(0x403)][_0xe1d1f4(0x58f)]&&Window_Scrollable['SCROLLBAR'][_0xe1d1f4(0x3d4)]>0x0;},VisuMZ['CoreEngine'][_0x33ad8c(0x527)]=Window_Base['prototype'][_0x33ad8c(0x688)],Window_Base['prototype']['createContents']=function(){const _0x4f029a=_0x33ad8c;VisuMZ[_0x4f029a(0x9dd)][_0x4f029a(0x527)][_0x4f029a(0x439)](this),this['createScrollBarSprites'](),this[_0x4f029a(0x5cf)](!![]),this[_0x4f029a(0x5cf)](![]);},Window_Base[_0x33ad8c(0x116)]['createScrollBarSprites']=function(){const _0x3d55e0=_0x33ad8c;if(!this['isScrollBarVisible']())return;if(this[_0x3d55e0(0x931)]||this[_0x3d55e0(0x952)])return;this[_0x3d55e0(0x530)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this[_0x3d55e0(0x931)]=new Sprite(),this[_0x3d55e0(0x952)]=new Sprite(),this[_0x3d55e0(0x5c6)](this[_0x3d55e0(0x931)]),this[_0x3d55e0(0x5c6)](this['_scrollBarVert']);},Window_Base[_0x33ad8c(0x116)][_0x33ad8c(0x5cf)]=function(_0x3779aa){const _0xbdab18=_0x33ad8c,_0x3228fb=_0x3779aa?this[_0xbdab18(0x931)]:this[_0xbdab18(0x952)];if(!_0x3228fb)return;const _0x5af129=Window_Scrollable[_0xbdab18(0x403)],_0x175f26=_0x5af129[_0xbdab18(0x3d4)],_0x3bd900=_0x3779aa?this[_0xbdab18(0x369)]-_0x175f26*0x2:_0x175f26,_0xb6f1c1=_0x3779aa?_0x175f26:this[_0xbdab18(0x989)]-_0x175f26*0x2;_0x3228fb[_0xbdab18(0x7d3)]=new Bitmap(_0x3bd900,_0xb6f1c1),_0x3228fb[_0xbdab18(0x140)](0x0,0x0,_0x3bd900,_0xb6f1c1),this['updateScrollBarPosition'](_0x3779aa);},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x32c)]=Window_Base[_0x33ad8c(0x116)][_0x33ad8c(0x9c9)],Window_Base[_0x33ad8c(0x116)]['destroyContents']=function(){const _0x58f508=_0x33ad8c;VisuMZ[_0x58f508(0x9dd)]['Window_Base_destroyContents'][_0x58f508(0x439)](this),this['destroyScrollBarBitmaps']();},Window_Base[_0x33ad8c(0x116)]['destroyScrollBarBitmaps']=function(){const _0x4bff9f=_0x33ad8c,_0x4fb1ff=[this[_0x4bff9f(0x931)],this[_0x4bff9f(0x952)]];for(const _0x59a0b0 of _0x4fb1ff){if(_0x59a0b0&&_0x59a0b0['bitmap'])_0x59a0b0[_0x4bff9f(0x7d3)][_0x4bff9f(0x776)]();}},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x708)]=Window_Scrollable[_0x33ad8c(0x116)]['update'],Window_Scrollable[_0x33ad8c(0x116)][_0x33ad8c(0x88b)]=function(){const _0x450b9e=_0x33ad8c;VisuMZ['CoreEngine'][_0x450b9e(0x708)][_0x450b9e(0x439)](this),this[_0x450b9e(0xa04)]();},Window_Scrollable[_0x33ad8c(0x116)][_0x33ad8c(0xa04)]=function(){const _0x2dfc08=_0x33ad8c;this[_0x2dfc08(0x2f2)](),this[_0x2dfc08(0x9d7)](!![]),this[_0x2dfc08(0x9d7)](![]),this['updateScrollBarPosition'](!![]),this[_0x2dfc08(0x45c)](![]);},Window_Scrollable[_0x33ad8c(0x116)][_0x33ad8c(0x2f2)]=function(){const _0x50167e=_0x33ad8c,_0x5e4882=[this['_scrollBarHorz'],this[_0x50167e(0x952)]];for(const _0x43ff33 of _0x5e4882){_0x43ff33&&(_0x50167e(0x9a8)===_0x50167e(0x405)?this[_0x50167e(0x7bd)][_0x4458e0]='#%1'[_0x50167e(0x3e7)](_0x19ece7(_0x35aad7['$1'])):_0x43ff33['visible']=this[_0x50167e(0x4c3)]()&&this['isOpen']());}},Window_Scrollable[_0x33ad8c(0x116)][_0x33ad8c(0x9d7)]=function(_0x36e407){const _0x300559=_0x33ad8c;if(!this[_0x300559(0x530)])return;const _0x527750=this[_0x300559(0x832)](_0x36e407),_0x46c164=this[_0x300559(0x469)](_0x36e407),_0x24c50c=_0x36e407?'horz':_0x300559(0x663),_0x256d77=_0x36e407?_0x300559(0x38b):'maxVert';(this[_0x300559(0x530)][_0x24c50c]!==_0x527750||this[_0x300559(0x530)][_0x256d77]!==_0x46c164)&&(this[_0x300559(0x530)][_0x24c50c]=_0x527750,this[_0x300559(0x530)][_0x256d77]=_0x46c164,this['refreshScrollBarBitmap'](_0x36e407,_0x527750,_0x46c164));},Window_Scrollable[_0x33ad8c(0x116)][_0x33ad8c(0x832)]=function(_0x12b95d){const _0x695528=_0x33ad8c;if(this[_0x695528(0x4d2)]!==undefined)return _0x12b95d?this[_0x695528(0x19a)]():this[_0x695528(0x4e6)]['y'];return _0x12b95d?this[_0x695528(0x19a)]():this[_0x695528(0x889)]();},Window_Scrollable[_0x33ad8c(0x116)]['maxScrollbar']=function(_0x3f530b){const _0x3a086a=_0x33ad8c;if(this[_0x3a086a(0x4d2)]!==undefined)return _0x3f530b?this[_0x3a086a(0x3fc)]():Math[_0x3a086a(0x3f1)](0x0,this[_0x3a086a(0x4d2)]-this[_0x3a086a(0x989)]);return _0x3f530b?this[_0x3a086a(0x3fc)]():this[_0x3a086a(0x98e)]();},Window_Scrollable[_0x33ad8c(0x116)]['scrollbarHeight']=function(){const _0x3690ee=_0x33ad8c;if(this[_0x3690ee(0x4d2)]!==undefined){if(_0x3690ee(0x917)!==_0x3690ee(0x381))return Math['max'](0x0,this[_0x3690ee(0x4d2)]);else _0x3019f1['CoreEngine']['Game_Picture_move']['call'](this,_0x37ace7,_0x2e16c9,_0x1d9cfd,_0x386b9a,_0x12fbb1,_0x24f2df,_0x15d041,_0xbeb905,_0x3ac455),this[_0x3690ee(0x70c)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x35841a]||{'x':0x0,'y':0x0});}return this['overallHeight']();},Window_Scrollable['prototype'][_0x33ad8c(0x9b7)]=function(_0xa3fe65,_0x41cc04,_0x25424b){const _0x41ee5e=_0x33ad8c,_0x3d210d=_0xa3fe65?this[_0x41ee5e(0x931)]:this[_0x41ee5e(0x952)];if(!_0x3d210d)return;if(!_0x3d210d[_0x41ee5e(0x7d3)])return;const _0x3f9ba7=_0x3d210d[_0x41ee5e(0x7d3)];_0x3f9ba7[_0x41ee5e(0x42c)]();if(_0x25424b<=0x0)return;const _0x32f36e=_0xa3fe65?this[_0x41ee5e(0x369)]/this[_0x41ee5e(0x38e)]():this['innerHeight']/this[_0x41ee5e(0x526)](),_0x94d593=_0xa3fe65?Math[_0x41ee5e(0x758)](_0x41cc04*_0x32f36e):0x0,_0x19937d=_0xa3fe65?0x0:Math['round'](_0x41cc04*_0x32f36e),_0x435b19=_0xa3fe65?Math[_0x41ee5e(0x758)](_0x3f9ba7[_0x41ee5e(0x483)]*_0x32f36e):_0x3f9ba7[_0x41ee5e(0x483)],_0xade7f8=_0xa3fe65?_0x3f9ba7[_0x41ee5e(0x64c)]:Math['round'](_0x3f9ba7['height']*_0x32f36e),_0x5b7602=Window_Scrollable[_0x41ee5e(0x403)],_0x1e760d=ColorManager['getColor'](_0x5b7602[_0x41ee5e(0x21e)]),_0x27223a=ColorManager[_0x41ee5e(0x93b)](_0x5b7602['bodyColor']),_0x2b91bb=_0x5b7602['offOpacity'];_0x3f9ba7[_0x41ee5e(0x945)]=_0x2b91bb,_0x3f9ba7[_0x41ee5e(0x97f)](_0x1e760d),_0x3f9ba7[_0x41ee5e(0x945)]=0xff,_0x3f9ba7[_0x41ee5e(0x379)](_0x94d593,_0x19937d,_0x435b19,_0xade7f8,_0x27223a);},Window_Base[_0x33ad8c(0x116)][_0x33ad8c(0x45c)]=function(_0x266f1c){const _0xaaeeaf=_0x33ad8c,_0x554f7=_0x266f1c?this[_0xaaeeaf(0x931)]:this[_0xaaeeaf(0x952)];if(!_0x554f7)return;const _0x52f21c=Window_Scrollable[_0xaaeeaf(0x403)],_0x3e1de7=_0x52f21c[_0xaaeeaf(0x3d4)],_0x1e2e82=_0x52f21c[_0xaaeeaf(0x924)];if(!_0x554f7[_0xaaeeaf(0x169)])return;_0x554f7['x']=this[_0xaaeeaf(0x648)]+(_0x266f1c?_0x3e1de7:this[_0xaaeeaf(0x369)]+_0x1e2e82),_0x554f7['y']=this[_0xaaeeaf(0x648)]+(_0x266f1c?this['innerHeight']+_0x1e2e82:_0x3e1de7);},Window_Selectable[_0x33ad8c(0x116)]['cursorDown']=function(_0x11d24f){const _0x326980=_0x33ad8c;let _0x3d52f9=this[_0x326980(0x908)]();const _0x277114=this['maxItems'](),_0x2729a0=this[_0x326980(0x615)]();if(this[_0x326980(0x558)]()&&(_0x3d52f9<_0x277114||_0x11d24f&&_0x2729a0===0x1)){_0x3d52f9+=_0x2729a0;if(_0x3d52f9>=_0x277114)_0x3d52f9=_0x277114-0x1;this[_0x326980(0x669)](_0x3d52f9);}else!this['isUseModernControls']()&&((_0x3d52f9<_0x277114-_0x2729a0||_0x11d24f&&_0x2729a0===0x1)&&this[_0x326980(0x669)]((_0x3d52f9+_0x2729a0)%_0x277114));},VisuMZ['CoreEngine'][_0x33ad8c(0xa1a)]=Window_Selectable[_0x33ad8c(0x116)][_0x33ad8c(0x3fb)],Window_Selectable[_0x33ad8c(0x116)][_0x33ad8c(0x3fb)]=function(_0x3bfb94){const _0x5d5321=_0x33ad8c;this[_0x5d5321(0x558)]()&&_0x3bfb94&&this[_0x5d5321(0x615)]()===0x1&&this[_0x5d5321(0x908)]()===this[_0x5d5321(0x9f7)]()-0x1?'WkMSJ'!==_0x5d5321(0x32e)?_0x2d75e4[_0x5d5321(0x353)]():this[_0x5d5321(0x669)](0x0):VisuMZ[_0x5d5321(0x9dd)][_0x5d5321(0xa1a)][_0x5d5321(0x439)](this,_0x3bfb94);},Window_Selectable[_0x33ad8c(0x116)][_0x33ad8c(0x27b)]=function(_0x33880c){const _0x650d45=_0x33ad8c;let _0x29d98b=Math[_0x650d45(0x3f1)](0x0,this[_0x650d45(0x908)]());const _0xeae7aa=this['maxItems'](),_0x447117=this['maxCols']();if(this[_0x650d45(0x558)]()&&_0x29d98b>0x0||_0x33880c&&_0x447117===0x1){_0x29d98b-=_0x447117;if(_0x29d98b<=0x0)_0x29d98b=0x0;this['smoothSelect'](_0x29d98b);}else!this[_0x650d45(0x558)]()&&((_0x29d98b>=_0x447117||_0x33880c&&_0x447117===0x1)&&this[_0x650d45(0x669)]((_0x29d98b-_0x447117+_0xeae7aa)%_0xeae7aa));},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x65c)]=Window_Selectable[_0x33ad8c(0x116)][_0x33ad8c(0x27b)],Window_Selectable[_0x33ad8c(0x116)][_0x33ad8c(0x27b)]=function(_0x27153b){const _0x25eb58=_0x33ad8c;this[_0x25eb58(0x558)]()&&_0x27153b&&this[_0x25eb58(0x615)]()===0x1&&this['index']()===0x0?this[_0x25eb58(0x669)](this['maxItems']()-0x1):_0x25eb58(0x22d)!==_0x25eb58(0x22d)?this[_0x25eb58(0x39e)]=0x1:VisuMZ[_0x25eb58(0x9dd)][_0x25eb58(0x65c)][_0x25eb58(0x439)](this,_0x27153b);},Window_Selectable['prototype'][_0x33ad8c(0x558)]=function(){const _0x61f774=_0x33ad8c;return VisuMZ[_0x61f774(0x9dd)][_0x61f774(0x828)][_0x61f774(0x113)]['ModernControls'];},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x49b)]=Window_Selectable[_0x33ad8c(0x116)][_0x33ad8c(0x8c3)],Window_Selectable['prototype'][_0x33ad8c(0x8c3)]=function(){const _0x240b17=_0x33ad8c;this[_0x240b17(0x558)]()?(this[_0x240b17(0x7ba)](),this[_0x240b17(0x5c4)]()):_0x240b17(0x221)===_0x240b17(0x372)?this['_optionsWindow']&&this[_0x240b17(0x216)][_0x240b17(0x672)](_0x2d706a['layoutSettings'][_0x240b17(0x6ca)]):VisuMZ[_0x240b17(0x9dd)]['Window_Selectable_processCursorMove'][_0x240b17(0x439)](this);},Window_Selectable['prototype'][_0x33ad8c(0x2f5)]=function(){return!![];},Window_Selectable[_0x33ad8c(0x116)]['processCursorMoveModernControls']=function(){const _0x4f50b8=_0x33ad8c;if(this[_0x4f50b8(0x532)]()){if(_0x4f50b8(0x415)!==_0x4f50b8(0x6a8)){const _0x55cd37=this['index']();if(Input[_0x4f50b8(0x74c)](_0x4f50b8(0x366))){if('PImns'!==_0x4f50b8(0x72a)){if(Input[_0x4f50b8(0x343)](_0x4f50b8(0x203))&&this[_0x4f50b8(0x2f5)]()){if(_0x4f50b8(0x609)===_0x4f50b8(0x12e))var _0x114dc8=_0x3daf67[_0x4f50b8(0x2eb)](_0x236dc7*0x2-0x1,_0x4f50b8(0x85f))*0.5+0.5;else this['cursorPagedown']();}else'YQvUN'!==_0x4f50b8(0x9a9)?this[_0x4f50b8(0x3fb)](Input[_0x4f50b8(0x616)]('down')):_0x15889a[_0x4f50b8(0x11f)]();}else{if(!_0xd00300[_0x4f50b8(0x2ab)]())return;_0x22df9f[_0x4f50b8(0x320)](_0xa75b9a,_0x381e46);const _0xb3bd61=_0x1b68ea[_0x4f50b8(0x790)];_0x4b28ca[_0x4f50b8(0x90d)]['playOnceParallelInterpreter'](_0xb3bd61);}}Input[_0x4f50b8(0x74c)]('up')&&(Input[_0x4f50b8(0x343)](_0x4f50b8(0x203))&&this['allowShiftScrolling']()?this[_0x4f50b8(0x620)]():this[_0x4f50b8(0x27b)](Input[_0x4f50b8(0x616)]('up')));Input[_0x4f50b8(0x74c)](_0x4f50b8(0x513))&&this[_0x4f50b8(0x8f2)](Input[_0x4f50b8(0x616)](_0x4f50b8(0x513)));Input[_0x4f50b8(0x74c)]('left')&&this['cursorLeft'](Input['isTriggered']('left'));!this['isHandled'](_0x4f50b8(0x23d))&&Input[_0x4f50b8(0x74c)](_0x4f50b8(0x23d))&&(_0x4f50b8(0x42e)===_0x4f50b8(0x371)?(_0x62afb1[_0x4f50b8(0x692)]=_0x2ea4c9,_0x5456b2[_0x4f50b8(0x340)]=_0x5c357f[_0x4f50b8(0x6d9)][_0x4f50b8(0x89d)](),_0x53bd3b[_0x4f50b8(0x90c)](_0x39e854),_0x3e7b3f['playBgm'](_0xade83a,_0x1c38ef['pos']),_0x15c8ba[_0x4f50b8(0x6d9)][_0x4f50b8(0x972)](_0x3c224c[_0x4f50b8(0x340)])):this[_0x4f50b8(0x7d9)]());if(!this['isHandled']('pageup')&&Input[_0x4f50b8(0x74c)](_0x4f50b8(0x1ec))){if(_0x4f50b8(0xa14)!==_0x4f50b8(0x900))this['cursorPageup']();else return _0x192195['CoreEngine'][_0x4f50b8(0x4da)][_0x4f50b8(0x439)](this,_0x2eecb9);}this[_0x4f50b8(0x908)]()!==_0x55cd37&&('FJFvX'!==_0x4f50b8(0x38c)?this[_0x4f50b8(0x631)]():(this[_0x4f50b8(0x968)]['x']=_0x2648d1[_0x4f50b8(0x968)]()['x'],this['anchor']['y']=_0x2d3496[_0x4f50b8(0x968)]()['y']));}else _0xb7e3fd+=_0x49f31a;}},Window_Selectable['prototype'][_0x33ad8c(0x5c4)]=function(){const _0x2af6fd=_0x33ad8c;if(this[_0x2af6fd(0x532)]()){if(_0x2af6fd(0x5ae)!==_0x2af6fd(0x410)){const _0xe24387=this[_0x2af6fd(0x908)]();Input[_0x2af6fd(0x616)](_0x2af6fd(0x566))&&(_0x2af6fd(0xa01)===_0x2af6fd(0x661)?this[_0x2af6fd(0x39e)]=0x2:this[_0x2af6fd(0x669)](Math[_0x2af6fd(0x732)](this['index'](),0x0)));Input['isTriggered'](_0x2af6fd(0x67f))&&this[_0x2af6fd(0x669)](Math[_0x2af6fd(0x3f1)](this[_0x2af6fd(0x908)](),this[_0x2af6fd(0x9f7)]()-0x1));if(this[_0x2af6fd(0x908)]()!==_0xe24387){if(_0x2af6fd(0x3de)===_0x2af6fd(0x3de))this['playCursorSound']();else{const _0x3495b3=(_0x2c034f[_0x2af6fd(0x9dd)]['Settings']['BattleSystem']||_0x2af6fd(0x4a8))[_0x2af6fd(0x455)]()[_0x2af6fd(0x99d)]();return _0x2cff86[_0x2af6fd(0x9dd)][_0x2af6fd(0x313)](_0x3495b3);}}}else{_0x5e4abe['seVolume']!==0x0?(_0x5760ec[_0x2af6fd(0x20a)]=0x0,_0x54a74a[_0x2af6fd(0x2c2)]=0x0,_0x183426['meVolume']=0x0,_0x211bc6[_0x2af6fd(0x5c9)]=0x0):(_0x4869eb[_0x2af6fd(0x20a)]=0x64,_0x437e55[_0x2af6fd(0x2c2)]=0x64,_0xabb57d[_0x2af6fd(0x2ae)]=0x64,_0x2c85ef['seVolume']=0x64);_0x5ee268[_0x2af6fd(0x6de)]();if(this['_scene']['constructor']===_0x28c378){if(this[_0x2af6fd(0x90d)]['_optionsWindow'])this[_0x2af6fd(0x90d)][_0x2af6fd(0x216)][_0x2af6fd(0x438)]();if(this[_0x2af6fd(0x90d)][_0x2af6fd(0x9ed)])this[_0x2af6fd(0x90d)][_0x2af6fd(0x9ed)][_0x2af6fd(0x438)]();}}}},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x17e)]=Window_Selectable[_0x33ad8c(0x116)][_0x33ad8c(0x942)],Window_Selectable['prototype']['processTouch']=function(){const _0x46d73b=_0x33ad8c;if(this[_0x46d73b(0x558)]())this[_0x46d73b(0x958)]();else{if('HAKnN'!==_0x46d73b(0x55d))VisuMZ[_0x46d73b(0x9dd)][_0x46d73b(0x17e)][_0x46d73b(0x439)](this);else{const _0x121058=[_0x46d73b(0x76e),_0x46d73b(0x301),'battlebacks2','characters',_0x46d73b(0x53e),'faces','parallaxes','pictures','sv_actors',_0x46d73b(0x765),_0x46d73b(0x678),_0x46d73b(0x651),'titles1',_0x46d73b(0x664)];for(const _0x3b38d1 of _0x121058){const _0x130f99=_0x389a51['CoreEngine']['Settings']['ImgLoad'][_0x3b38d1],_0x5bc1a9=_0x46d73b(0x529)[_0x46d73b(0x3e7)](_0x3b38d1);for(const _0x2f36b1 of _0x130f99){_0x4a04a6[_0x46d73b(0x694)](_0x5bc1a9,_0x2f36b1);}}}}},Window_Selectable[_0x33ad8c(0x116)]['processTouchModernControls']=function(){const _0x52f40a=_0x33ad8c;VisuMZ[_0x52f40a(0x9dd)][_0x52f40a(0x17e)]['call'](this);},Window_Selectable[_0x33ad8c(0x116)][_0x33ad8c(0x982)]=function(){const _0x50898c=_0x33ad8c;return VisuMZ[_0x50898c(0x9dd)][_0x50898c(0x828)]['Window'][_0x50898c(0x50f)];},Window_Selectable[_0x33ad8c(0x116)][_0x33ad8c(0x542)]=function(){const _0x2551bf=_0x33ad8c;return VisuMZ['CoreEngine'][_0x2551bf(0x828)][_0x2551bf(0x839)][_0x2551bf(0x225)];},Window_Selectable[_0x33ad8c(0x116)][_0x33ad8c(0x36c)]=function(){const _0x421d96=_0x33ad8c;return Window_Scrollable[_0x421d96(0x116)][_0x421d96(0x36c)][_0x421d96(0x439)](this)+VisuMZ[_0x421d96(0x9dd)][_0x421d96(0x828)]['Window'][_0x421d96(0x787)];;},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x6cf)]=Window_Selectable[_0x33ad8c(0x116)][_0x33ad8c(0x504)],Window_Selectable[_0x33ad8c(0x116)][_0x33ad8c(0x504)]=function(_0x3d90fe){const _0x403415=_0x33ad8c,_0x1dab79=VisuMZ[_0x403415(0x9dd)][_0x403415(0x828)]['Window'];if(_0x1dab79[_0x403415(0x5da)]===![])return;_0x1dab79[_0x403415(0x9bf)]?_0x1dab79[_0x403415(0x9bf)][_0x403415(0x439)](this,_0x3d90fe):'VimhC'==='zJeRg'?(_0x3267e7[_0x403415(0x9dd)][_0x403415(0x433)]['call'](this,_0xe7f064),this[_0x403415(0x18d)](),this['setupCoreEngine'](_0x11124e)):VisuMZ[_0x403415(0x9dd)][_0x403415(0x6cf)][_0x403415(0x439)](this,_0x3d90fe);},VisuMZ['CoreEngine'][_0x33ad8c(0x4ea)]=Window_Gold['prototype'][_0x33ad8c(0x438)],Window_Gold[_0x33ad8c(0x116)][_0x33ad8c(0x438)]=function(){const _0x5f11a4=_0x33ad8c;this[_0x5f11a4(0x73c)]()?this[_0x5f11a4(0x854)]():VisuMZ[_0x5f11a4(0x9dd)][_0x5f11a4(0x4ea)][_0x5f11a4(0x439)](this);},Window_Gold[_0x33ad8c(0x116)][_0x33ad8c(0x73c)]=function(){const _0x223c8e=_0x33ad8c;if(TextManager[_0x223c8e(0x67d)]!==this['currencyUnit']())return![];return VisuMZ[_0x223c8e(0x9dd)][_0x223c8e(0x828)][_0x223c8e(0x499)][_0x223c8e(0x4ed)];},Window_Gold['prototype']['drawGoldItemStyle']=function(){const _0x110e7d=_0x33ad8c;this[_0x110e7d(0x162)](),this[_0x110e7d(0x5c3)][_0x110e7d(0x42c)](),this['contents'][_0x110e7d(0x1e9)]=VisuMZ[_0x110e7d(0x9dd)][_0x110e7d(0x828)][_0x110e7d(0x499)][_0x110e7d(0x472)];const _0x15da9f=VisuMZ[_0x110e7d(0x9dd)][_0x110e7d(0x828)]['Gold']['GoldIcon'],_0x21a00c=this[_0x110e7d(0x916)](0x0);if(_0x15da9f>0x0){if('SOxxG'===_0x110e7d(0x712)){const _0x53460e=_0x21a00c['y']+(this[_0x110e7d(0x22f)]()-ImageManager[_0x110e7d(0xa1c)])/0x2;this[_0x110e7d(0x938)](_0x15da9f,_0x21a00c['x'],_0x53460e);const _0x161d03=ImageManager[_0x110e7d(0x406)]+0x4;_0x21a00c['x']+=_0x161d03,_0x21a00c['width']-=_0x161d03;}else _0x4240b6=_0x5f3c82[_0x110e7d(0x758)](_0x395ef5),_0x51214a=_0x465b45[_0x110e7d(0x758)](_0x547c4f),_0x46c1c4=_0x7354f8[_0x110e7d(0x758)](_0x4b9d89),_0x340d59=_0x522dfd['round'](_0x498dbd),_0x54fd24=_0x2cc6c8[_0x110e7d(0x758)](_0x2a9e0a),_0x742579=_0x1a1d42[_0x110e7d(0x758)](_0x4b33b7),_0x3a34da[_0x110e7d(0x9dd)][_0x110e7d(0x170)][_0x110e7d(0x439)](this,_0x3a79e1,_0x3f065a,_0x4dc757,_0x55d326,_0x13de13,_0x20dc85,_0x54a3e9,_0x3977d4,_0x3dcc60),this[_0x110e7d(0x9ba)]();}this[_0x110e7d(0x107)](ColorManager[_0x110e7d(0x4e1)]()),this[_0x110e7d(0x2ef)](this['currencyUnit'](),_0x21a00c['x'],_0x21a00c['y'],_0x21a00c[_0x110e7d(0x483)],'left');const _0x3e2cea=this[_0x110e7d(0xa2b)](this[_0x110e7d(0x67d)]())+0x6;;_0x21a00c['x']+=_0x3e2cea,_0x21a00c['width']-=_0x3e2cea,this['resetTextColor']();const _0x2711bb=this['value'](),_0x11aacf=this[_0x110e7d(0xa2b)](this['_digitGrouping']?VisuMZ['GroupDigits'](this[_0x110e7d(0x5e4)]()):this['value']());if(_0x11aacf>_0x21a00c[_0x110e7d(0x483)]){if(_0x110e7d(0x358)!=='mPIeX')this[_0x110e7d(0x2ef)](VisuMZ[_0x110e7d(0x9dd)][_0x110e7d(0x828)][_0x110e7d(0x499)]['GoldOverlap'],_0x21a00c['x'],_0x21a00c['y'],_0x21a00c[_0x110e7d(0x483)],_0x110e7d(0x513));else{if(this[_0x110e7d(0x64f)]===_0x110e7d(0x73e))return;if(_0x46fe8c[_0x110e7d(0x492)]())return;_0x45bbf8[_0x110e7d(0x9dd)][_0x110e7d(0x612)][_0x110e7d(0x439)](this),this['switchModes'](_0x110e7d(0x5f7));}}else _0x110e7d(0x346)===_0x110e7d(0x66a)?_0x308d1b['style'][_0x110e7d(0x3f3)]=_0x110e7d(0x179):this['drawText'](this[_0x110e7d(0x5e4)](),_0x21a00c['x'],_0x21a00c['y'],_0x21a00c[_0x110e7d(0x483)],_0x110e7d(0x513));this[_0x110e7d(0x162)]();},Window_StatusBase['prototype'][_0x33ad8c(0x674)]=function(_0x2fb9cb,_0xd1178a,_0x144f4f,_0x36af1c,_0x50c520){const _0x440e15=_0x33ad8c;_0x36af1c=String(_0x36af1c||'')[_0x440e15(0x455)]();if(VisuMZ[_0x440e15(0x9dd)][_0x440e15(0x828)][_0x440e15(0x87b)][_0x440e15(0x49a)]){const _0x123998=VisuMZ[_0x440e15(0x565)](_0x36af1c);if(_0x50c520)this[_0x440e15(0x6a7)](_0x123998,_0x2fb9cb,_0xd1178a,this[_0x440e15(0x87f)]()),_0x144f4f-=this[_0x440e15(0x87f)]()+0x2,_0x2fb9cb+=this[_0x440e15(0x87f)]()+0x2;else{if('IVbnz'!==_0x440e15(0x15f)){const _0x34bd3a=_0x561cb6(this[_0x440e15(0x4db)][_0x440e15(0x62a)]),_0x50802d=this['getCustomBackgroundSettings'](_0x34bd3a);_0x50802d&&(_0x50802d[_0x440e15(0x490)]!==''||_0x50802d[_0x440e15(0x240)]!=='')&&(this[_0x440e15(0x90a)]=new _0x326aec(_0x4f3ea6[_0x440e15(0x534)](_0x50802d['BgFilename1'])),this[_0x440e15(0x328)]=new _0x405129(_0x3bd3dc[_0x440e15(0x94f)](_0x50802d['BgFilename2'])),this[_0x440e15(0x5c6)](this['_backSprite1']),this[_0x440e15(0x5c6)](this[_0x440e15(0x328)]),this[_0x440e15(0x90a)][_0x440e15(0x7d3)][_0x440e15(0x3d1)](this['adjustSprite']['bind'](this,this['_backSprite1'])),this[_0x440e15(0x328)][_0x440e15(0x7d3)][_0x440e15(0x3d1)](this[_0x440e15(0x59d)][_0x440e15(0x404)](this,this['_backSprite2'])));}else this[_0x440e15(0x938)](_0x123998,_0x2fb9cb+0x2,_0xd1178a+0x2),_0x144f4f-=ImageManager[_0x440e15(0x406)]+0x4,_0x2fb9cb+=ImageManager[_0x440e15(0x406)]+0x4;}}const _0x2bca0e=TextManager[_0x440e15(0x83d)](_0x36af1c);this[_0x440e15(0x162)](),this[_0x440e15(0x107)](ColorManager[_0x440e15(0x4e1)]());if(_0x50c520){if(_0x440e15(0x7d0)!=='aiFkC'){var _0x465696=_0x51ecfa(_0x559f19['$1']);try{_0x3550cb*=_0x26fb8f(_0x465696);}catch(_0x554857){if(_0x39a2de[_0x440e15(0x4d4)]())_0x1ab069[_0x440e15(0x478)](_0x554857);}}else this[_0x440e15(0x5c3)]['fontSize']=this[_0x440e15(0x445)](),this[_0x440e15(0x5c3)][_0x440e15(0x2ef)](_0x2bca0e,_0x2fb9cb,_0xd1178a,_0x144f4f,this[_0x440e15(0x87f)](),_0x440e15(0x278));}else{if(_0x440e15(0x2f3)!==_0x440e15(0x2f3)){if(_0x13cda1)_0x215b04[_0x440e15(0x58b)](_0x389ec1);}else this[_0x440e15(0x2ef)](_0x2bca0e,_0x2fb9cb,_0xd1178a,_0x144f4f);}this[_0x440e15(0x162)]();},Window_StatusBase[_0x33ad8c(0x116)]['smallParamFontSize']=function(){const _0x22caac=_0x33ad8c;return $gameSystem[_0x22caac(0x87e)]()-0x8;},Window_StatusBase['prototype'][_0x33ad8c(0x4ab)]=function(_0x403a94,_0x2d5398,_0x22fb9d,_0x349dc8){const _0x2ecd05=_0x33ad8c;_0x349dc8=_0x349dc8||0xa8,this[_0x2ecd05(0x3a6)]();if(VisuMZ[_0x2ecd05(0x9dd)]['Settings']['UI'][_0x2ecd05(0x7aa)])this[_0x2ecd05(0x81b)](_0x403a94[_0x2ecd05(0x40c)]()[_0x2ecd05(0x62a)],_0x2d5398,_0x22fb9d,_0x349dc8);else{if(_0x2ecd05(0x710)==='yjrjT'){var _0x40ffcb=_0x358f6f(_0x80b854['$1']);_0x44c076*=_0x40ffcb;}else{const _0x42eec8=_0x403a94[_0x2ecd05(0x40c)]()['name'][_0x2ecd05(0x104)](/\\I\[(\d+)\]/gi,'');this[_0x2ecd05(0x2ef)](_0x42eec8,_0x2d5398,_0x22fb9d,_0x349dc8);}}},Window_StatusBase[_0x33ad8c(0x116)]['drawActorNickname']=function(_0x42597b,_0x30b5fd,_0x2f0aa9,_0x3fa179){const _0x139d9d=_0x33ad8c;_0x3fa179=_0x3fa179||0x10e,this['resetTextColor']();if(VisuMZ['CoreEngine'][_0x139d9d(0x828)]['UI'][_0x139d9d(0x1f3)]){if(_0x139d9d(0x1b0)!==_0x139d9d(0x30d))this[_0x139d9d(0x81b)](_0x42597b['nickname'](),_0x30b5fd,_0x2f0aa9,_0x3fa179);else return _0x44400d?this[_0x139d9d(0x19a)]():this[_0x139d9d(0x4e6)]['y'];}else{if(_0x139d9d(0x5bf)===_0x139d9d(0x5bf)){const _0x365550=_0x42597b[_0x139d9d(0x2b9)]()[_0x139d9d(0x104)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x42597b['nickname'](),_0x30b5fd,_0x2f0aa9,_0x3fa179);}else return _0x5d25db['layoutSettings'][_0x139d9d(0x7dc)][_0x139d9d(0x439)](this);}},VisuMZ[_0x33ad8c(0x9dd)]['Window_StatusBase_drawActorLevel']=Window_StatusBase[_0x33ad8c(0x116)][_0x33ad8c(0x676)],Window_StatusBase['prototype'][_0x33ad8c(0x676)]=function(_0x5b631f,_0x4c4442,_0x2a182e){const _0x4eec8f=_0x33ad8c;if(VisuMZ[_0x4eec8f(0x9dd)][_0x4eec8f(0x828)]['Param'][_0x4eec8f(0x3d6)]===![])return;if(this[_0x4eec8f(0x4ca)]())this[_0x4eec8f(0x2b0)](_0x5b631f,_0x4c4442,_0x2a182e);VisuMZ['CoreEngine'][_0x4eec8f(0x8bf)]['call'](this,_0x5b631f,_0x4c4442,_0x2a182e);},Window_StatusBase[_0x33ad8c(0x116)][_0x33ad8c(0x4ca)]=function(){const _0x21681f=_0x33ad8c;return VisuMZ[_0x21681f(0x9dd)][_0x21681f(0x828)]['UI'][_0x21681f(0x546)];},Window_StatusBase['prototype']['drawActorExpGauge']=function(_0x4a0d41,_0x2cb3f7,_0xa9c61d){const _0x5e784c=_0x33ad8c;if(!_0x4a0d41)return;if(!_0x4a0d41['isActor']())return;const _0x5540b9=0x80,_0x2c822e=_0x4a0d41[_0x5e784c(0x966)]();let _0x41af62=ColorManager[_0x5e784c(0x610)](),_0x2e5a53=ColorManager[_0x5e784c(0x3a8)]();if(_0x2c822e>=0x1){if(_0x5e784c(0x332)!=='oxFqR'){const _0x3ce7f2=this[_0x5e784c(0x303)][_0x5e784c(0x816)]['apply'](new _0x58305c(0x0,0x0)),_0x2f5cf6=this[_0x5e784c(0x303)][_0x5e784c(0x5bd)];_0x2f5cf6['x']=_0x3ce7f2['x']+this[_0x5e784c(0x4e6)]['x'],_0x2f5cf6['y']=_0x3ce7f2['y']+this[_0x5e784c(0x4e6)]['y'],_0x2f5cf6[_0x5e784c(0x483)]=_0x2b3fe1['ceil'](this[_0x5e784c(0x369)]*this[_0x5e784c(0x17d)]['x']),_0x2f5cf6['height']=_0xd2fb80[_0x5e784c(0x5c7)](this['innerHeight']*this[_0x5e784c(0x17d)]['y']);}else _0x41af62=ColorManager['maxLvGaugeColor1'](),_0x2e5a53=ColorManager[_0x5e784c(0x224)]();}this['drawGauge'](_0x2cb3f7,_0xa9c61d,_0x5540b9,_0x2c822e,_0x41af62,_0x2e5a53);},Window_EquipStatus[_0x33ad8c(0x116)][_0x33ad8c(0x30c)]=function(){const _0x4138ad=_0x33ad8c;let _0x47b186=0x0;for(const _0x20c38d of VisuMZ[_0x4138ad(0x9dd)][_0x4138ad(0x828)][_0x4138ad(0x87b)][_0x4138ad(0x888)]){if(_0x4138ad(0x878)===_0x4138ad(0x8a8)){this['resetFontSettings'](),this[_0x4138ad(0x5c3)]['clear'](),this[_0x4138ad(0x5c3)]['fontSize']=_0x5b17d0[_0x4138ad(0x9dd)][_0x4138ad(0x828)][_0x4138ad(0x499)][_0x4138ad(0x472)];const _0x1ccc86=_0x36aa6a[_0x4138ad(0x9dd)][_0x4138ad(0x828)][_0x4138ad(0x499)][_0x4138ad(0x31b)],_0x5b8106=this[_0x4138ad(0x916)](0x0);if(_0x1ccc86>0x0){const _0xbd75f5=_0x5b8106['y']+(this[_0x4138ad(0x22f)]()-_0x429096[_0x4138ad(0xa1c)])/0x2;this['drawIcon'](_0x1ccc86,_0x5b8106['x'],_0xbd75f5);const _0x29d7a9=_0x128eae[_0x4138ad(0x406)]+0x4;_0x5b8106['x']+=_0x29d7a9,_0x5b8106[_0x4138ad(0x483)]-=_0x29d7a9;}this[_0x4138ad(0x107)](_0x2dcf6e[_0x4138ad(0x4e1)]()),this[_0x4138ad(0x2ef)](this[_0x4138ad(0x67d)](),_0x5b8106['x'],_0x5b8106['y'],_0x5b8106[_0x4138ad(0x483)],_0x4138ad(0x278));const _0xd9c651=this[_0x4138ad(0xa2b)](this[_0x4138ad(0x67d)]())+0x6;;_0x5b8106['x']+=_0xd9c651,_0x5b8106['width']-=_0xd9c651,this[_0x4138ad(0x3a6)]();const _0x1dc00a=this[_0x4138ad(0x5e4)](),_0x3dcf2b=this[_0x4138ad(0xa2b)](this[_0x4138ad(0xa25)]?_0x12e6f1[_0x4138ad(0x124)](this['value']()):this['value']());_0x3dcf2b>_0x5b8106[_0x4138ad(0x483)]?this[_0x4138ad(0x2ef)](_0x17b4a9['CoreEngine'][_0x4138ad(0x828)][_0x4138ad(0x499)]['GoldOverlap'],_0x5b8106['x'],_0x5b8106['y'],_0x5b8106['width'],_0x4138ad(0x513)):this[_0x4138ad(0x2ef)](this[_0x4138ad(0x5e4)](),_0x5b8106['x'],_0x5b8106['y'],_0x5b8106[_0x4138ad(0x483)],_0x4138ad(0x513)),this[_0x4138ad(0x162)]();}else{const _0x59990d=this['itemPadding'](),_0x1c0f1b=this[_0x4138ad(0x13c)](_0x47b186);this[_0x4138ad(0x428)](_0x59990d,_0x1c0f1b,_0x20c38d),_0x47b186++;}}},Window_EquipStatus['prototype'][_0x33ad8c(0x1a3)]=function(_0x16f477,_0xee4b38,_0x40aa09){const _0x2abb6c=this['paramX']()-this['itemPadding']()*0x2;this['drawParamText'](_0x16f477,_0xee4b38,_0x2abb6c,_0x40aa09,![]);},Window_EquipStatus[_0x33ad8c(0x116)][_0x33ad8c(0x85e)]=function(_0x1ec7b7,_0x4ad25c,_0x1a94ce){const _0xbd2db4=_0x33ad8c,_0x57d60e=this[_0xbd2db4(0x136)]();this[_0xbd2db4(0x3a6)](),this['drawText'](this[_0xbd2db4(0x6bf)][_0xbd2db4(0x4f9)](_0x1a94ce,!![]),_0x1ec7b7,_0x4ad25c,_0x57d60e,'right');},Window_EquipStatus[_0x33ad8c(0x116)][_0x33ad8c(0x193)]=function(_0x5db725,_0x354dd1){const _0x37621c=_0x33ad8c,_0x1c77de=this[_0x37621c(0x643)]();this[_0x37621c(0x107)](ColorManager[_0x37621c(0x4e1)]());const _0x1337f1=VisuMZ[_0x37621c(0x9dd)][_0x37621c(0x828)]['UI'][_0x37621c(0x50d)];this[_0x37621c(0x2ef)](_0x1337f1,_0x5db725,_0x354dd1,_0x1c77de,_0x37621c(0x9fa));},Window_EquipStatus[_0x33ad8c(0x116)][_0x33ad8c(0x4ad)]=function(_0x12c75f,_0x1e65bd,_0x54f023){const _0x2f3729=_0x33ad8c,_0x528eb0=this[_0x2f3729(0x136)](),_0x59d650=this[_0x2f3729(0x4a4)][_0x2f3729(0x4f9)](_0x54f023),_0x4ae469=_0x59d650-this[_0x2f3729(0x6bf)][_0x2f3729(0x4f9)](_0x54f023);this[_0x2f3729(0x107)](ColorManager[_0x2f3729(0x91e)](_0x4ae469)),this[_0x2f3729(0x2ef)](this['_tempActor'][_0x2f3729(0x4f9)](_0x54f023,!![]),_0x12c75f,_0x1e65bd,_0x528eb0,_0x2f3729(0x513));},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x22b)]=Window_EquipItem[_0x33ad8c(0x116)][_0x33ad8c(0x219)],Window_EquipItem[_0x33ad8c(0x116)][_0x33ad8c(0x219)]=function(_0x12a2c7){const _0x35d55a=_0x33ad8c;if(_0x12a2c7&&this[_0x35d55a(0x6bf)]){if('cidUG'!==_0x35d55a(0x9c3))return this['_actor'][_0x35d55a(0x2ec)](_0x12a2c7);else _0x138921['CoreEngine'][_0x35d55a(0x1a6)][_0x35d55a(0x439)](this),this[_0x35d55a(0x715)]();}else return _0x35d55a(0x852)!==_0x35d55a(0x271)?VisuMZ[_0x35d55a(0x9dd)][_0x35d55a(0x22b)][_0x35d55a(0x439)](this,_0x12a2c7):this[_0x35d55a(0x11c)]()[_0x35d55a(0x652)]*0.01;},Window_StatusParams[_0x33ad8c(0x116)][_0x33ad8c(0x9f7)]=function(){const _0x4717fd=_0x33ad8c;return VisuMZ[_0x4717fd(0x9dd)][_0x4717fd(0x828)][_0x4717fd(0x87b)][_0x4717fd(0x888)]['length'];},Window_StatusParams[_0x33ad8c(0x116)][_0x33ad8c(0x428)]=function(_0x324fb2){const _0x5d4b31=_0x33ad8c,_0xe41276=this[_0x5d4b31(0x916)](_0x324fb2),_0x4cc2e2=VisuMZ['CoreEngine'][_0x5d4b31(0x828)][_0x5d4b31(0x87b)][_0x5d4b31(0x888)][_0x324fb2],_0x3f9898=TextManager[_0x5d4b31(0x83d)](_0x4cc2e2),_0x3d0a84=this['_actor'][_0x5d4b31(0x4f9)](_0x4cc2e2,!![]);this[_0x5d4b31(0x674)](_0xe41276['x'],_0xe41276['y'],0xa0,_0x4cc2e2,![]),this[_0x5d4b31(0x3a6)](),this[_0x5d4b31(0x2ef)](_0x3d0a84,_0xe41276['x']+0xa0,_0xe41276['y'],0x3c,_0x5d4b31(0x513));};if(VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x828)]['KeyboardInput'][_0x33ad8c(0x7f1)]){VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x828)][_0x33ad8c(0x926)][_0x33ad8c(0x545)]&&(Window_NameInput[_0x33ad8c(0x2df)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20','Page','OK']);;VisuMZ[_0x33ad8c(0x9dd)]['Window_NameInput_initialize']=Window_NameInput['prototype'][_0x33ad8c(0x4b0)],Window_NameInput['prototype'][_0x33ad8c(0x4b0)]=function(_0x4b7ab4){const _0x32e3b4=_0x33ad8c;this['_mode']=this[_0x32e3b4(0x6f9)](),VisuMZ[_0x32e3b4(0x9dd)][_0x32e3b4(0x46a)]['call'](this,_0x4b7ab4);if(this[_0x32e3b4(0x64f)]===_0x32e3b4(0x5f7))_0x32e3b4(0x9f8)===_0x32e3b4(0x864)?this[_0x32e3b4(0x56f)](0x4b0,0x0,0x78):this[_0x32e3b4(0x288)](0x0);else{if('mSTbO'!=='MFxJt')Input[_0x32e3b4(0x42c)](),this[_0x32e3b4(0x17f)]();else return _0x256340(_0x38a854)['toLocaleString'](_0x407bf8,_0x1b0ac9)+',';}},Window_NameInput[_0x33ad8c(0x116)][_0x33ad8c(0x6f9)]=function(){const _0x2335d4=_0x33ad8c;if(Input[_0x2335d4(0x797)]())return _0x2335d4(0x5f7);return VisuMZ[_0x2335d4(0x9dd)]['Settings']['KeyboardInput'][_0x2335d4(0x837)]||_0x2335d4(0x73e);},VisuMZ['CoreEngine']['Window_NameInput_processHandling']=Window_NameInput[_0x33ad8c(0x116)][_0x33ad8c(0x2ad)],Window_NameInput[_0x33ad8c(0x116)]['processHandling']=function(){const _0x1eceb1=_0x33ad8c;if(!this[_0x1eceb1(0x436)]())return;if(!this[_0x1eceb1(0x691)])return;if(this[_0x1eceb1(0x64f)]===_0x1eceb1(0x73e)&&Input[_0x1eceb1(0x92f)]())this[_0x1eceb1(0x4b2)](_0x1eceb1(0x5f7));else{if(Input[_0x1eceb1(0x48f)]('backspace'))Input[_0x1eceb1(0x42c)](),this[_0x1eceb1(0x809)]();else{if(Input[_0x1eceb1(0x616)]('tab')){if(_0x1eceb1(0x35c)!==_0x1eceb1(0x66d)){Input[_0x1eceb1(0x42c)]();if(this['_mode']===_0x1eceb1(0x73e)){if(_0x1eceb1(0x96d)===_0x1eceb1(0x80b))return 0x0;else this['switchModes'](_0x1eceb1(0x5f7));}else this['switchModes'](_0x1eceb1(0x73e));}else this[_0x1eceb1(0x2ef)](_0x469181[_0x1eceb1(0x9dd)][_0x1eceb1(0x828)][_0x1eceb1(0x499)][_0x1eceb1(0x17a)],_0x1879ea['x'],_0x4b4421['y'],_0x51a11b[_0x1eceb1(0x483)],_0x1eceb1(0x513));}else{if(this['_mode']===_0x1eceb1(0x73e))_0x1eceb1(0x9b4)===_0x1eceb1(0x36b)?(this[_0x1eceb1(0x317)]=[],this[_0x1eceb1(0x66f)]=[],this['_pointAnimationQueue']=[],this[_0x1eceb1(0x762)]=[]):this[_0x1eceb1(0x475)]();else Input[_0x1eceb1(0x48f)](_0x1eceb1(0x70d))?(Input[_0x1eceb1(0x42c)](),this[_0x1eceb1(0x4b2)](_0x1eceb1(0x73e))):VisuMZ[_0x1eceb1(0x9dd)][_0x1eceb1(0x28d)][_0x1eceb1(0x439)](this);}}}},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x105)]=Window_NameInput[_0x33ad8c(0x116)][_0x33ad8c(0x942)],Window_NameInput[_0x33ad8c(0x116)][_0x33ad8c(0x942)]=function(){const _0x9f090c=_0x33ad8c;if(!this[_0x9f090c(0x8f9)]())return;if(this['_mode']===_0x9f090c(0x73e)){if(TouchInput[_0x9f090c(0x616)]()&&this['isTouchedInsideFrame']())this[_0x9f090c(0x4b2)]('default');else{if(TouchInput['isCancelled']()){if(_0x9f090c(0x249)==='EJZzd'){const _0x3a521e=this['itemPadding'](),_0xeccdf1=this['paramY'](_0x595eee);this[_0x9f090c(0x428)](_0x3a521e,_0xeccdf1,_0x548df2),_0x3059ec++;}else this[_0x9f090c(0x4b2)](_0x9f090c(0x5f7));}}}else _0x9f090c(0x8d3)!=='wUNpt'?VisuMZ[_0x9f090c(0x9dd)][_0x9f090c(0x105)]['call'](this):this[_0x9f090c(0x60c)][_0x9f090c(0x672)](_0x4097b8[_0x9f090c(0x6c7)][_0x9f090c(0x471)]);},Window_NameInput[_0x33ad8c(0x116)]['processKeyboardHandling']=function(){const _0x5b58c0=_0x33ad8c;if(Input[_0x5b58c0(0x48f)](_0x5b58c0(0x862))){if(_0x5b58c0(0x402)==='BXLtT')return _0x447b6b(_0x434204['$1']);else Input['clear'](),this['onNameOk']();}else{if(Input[_0x5b58c0(0x630)]!==undefined){let _0x378ced=Input[_0x5b58c0(0x630)],_0x5617d5=_0x378ced[_0x5b58c0(0x1cc)];for(let _0x51e218=0x0;_0x51e218<_0x5617d5;++_0x51e218){this[_0x5b58c0(0x4e4)]['add'](_0x378ced[_0x51e218])?SoundManager[_0x5b58c0(0x353)]():SoundManager[_0x5b58c0(0x11f)]();}Input[_0x5b58c0(0x42c)]();}}},Window_NameInput['prototype'][_0x33ad8c(0x4b2)]=function(_0x21cdb7){const _0x3aecf3=_0x33ad8c;let _0x17f4f6=this[_0x3aecf3(0x64f)];this['_mode']=_0x21cdb7,_0x17f4f6!==this[_0x3aecf3(0x64f)]&&(this[_0x3aecf3(0x438)](),SoundManager[_0x3aecf3(0x353)](),this['_mode']===_0x3aecf3(0x5f7)?this[_0x3aecf3(0x288)](0x0):this[_0x3aecf3(0x288)](-0x1));},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x18b)]=Window_NameInput[_0x33ad8c(0x116)][_0x33ad8c(0x3fb)],Window_NameInput['prototype'][_0x33ad8c(0x3fb)]=function(_0x23813a){const _0x4ff1f5=_0x33ad8c;if(this['_mode']===_0x4ff1f5(0x73e)&&!Input[_0x4ff1f5(0x496)]())return;if(Input[_0x4ff1f5(0x492)]())return;VisuMZ['CoreEngine']['Window_NameInput_cursorDown'][_0x4ff1f5(0x439)](this,_0x23813a),this[_0x4ff1f5(0x4b2)](_0x4ff1f5(0x5f7));},VisuMZ['CoreEngine'][_0x33ad8c(0x6f6)]=Window_NameInput['prototype']['cursorUp'],Window_NameInput[_0x33ad8c(0x116)]['cursorUp']=function(_0x14f140){const _0x25c857=_0x33ad8c;if(this[_0x25c857(0x64f)]===_0x25c857(0x73e)&&!Input[_0x25c857(0x496)]())return;if(Input['isNumpadPressed']())return;VisuMZ['CoreEngine'][_0x25c857(0x6f6)][_0x25c857(0x439)](this,_0x14f140),this[_0x25c857(0x4b2)](_0x25c857(0x5f7));},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x851)]=Window_NameInput[_0x33ad8c(0x116)][_0x33ad8c(0x8f2)],Window_NameInput[_0x33ad8c(0x116)][_0x33ad8c(0x8f2)]=function(_0x3f3264){const _0x392ac1=_0x33ad8c;if(this[_0x392ac1(0x64f)]==='keyboard'&&!Input[_0x392ac1(0x496)]())return;if(Input[_0x392ac1(0x492)]())return;VisuMZ[_0x392ac1(0x9dd)][_0x392ac1(0x851)][_0x392ac1(0x439)](this,_0x3f3264),this[_0x392ac1(0x4b2)](_0x392ac1(0x5f7));},VisuMZ['CoreEngine']['Window_NameInput_cursorLeft']=Window_NameInput[_0x33ad8c(0x116)][_0x33ad8c(0x190)],Window_NameInput[_0x33ad8c(0x116)][_0x33ad8c(0x190)]=function(_0x5ec699){const _0x56128d=_0x33ad8c;if(this['_mode']===_0x56128d(0x73e)&&!Input[_0x56128d(0x496)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x56128d(0x9dd)]['Window_NameInput_cursorLeft'][_0x56128d(0x439)](this,_0x5ec699),this[_0x56128d(0x4b2)](_0x56128d(0x5f7));},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x612)]=Window_NameInput[_0x33ad8c(0x116)][_0x33ad8c(0x7d9)],Window_NameInput[_0x33ad8c(0x116)][_0x33ad8c(0x7d9)]=function(){const _0x4f7053=_0x33ad8c;if(this[_0x4f7053(0x64f)]===_0x4f7053(0x73e))return;if(Input[_0x4f7053(0x492)]())return;VisuMZ['CoreEngine'][_0x4f7053(0x612)]['call'](this),this[_0x4f7053(0x4b2)](_0x4f7053(0x5f7));},VisuMZ['CoreEngine'][_0x33ad8c(0x9dc)]=Window_NameInput[_0x33ad8c(0x116)][_0x33ad8c(0x620)],Window_NameInput[_0x33ad8c(0x116)][_0x33ad8c(0x620)]=function(){const _0x5c0055=_0x33ad8c;if(this[_0x5c0055(0x64f)]===_0x5c0055(0x73e))return;if(Input[_0x5c0055(0x492)]())return;VisuMZ[_0x5c0055(0x9dd)][_0x5c0055(0x9dc)][_0x5c0055(0x439)](this),this[_0x5c0055(0x4b2)](_0x5c0055(0x5f7));},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x3df)]=Window_NameInput[_0x33ad8c(0x116)][_0x33ad8c(0x438)],Window_NameInput['prototype']['refresh']=function(){const _0x162b3d=_0x33ad8c;if(this['_mode']===_0x162b3d(0x73e)){if(_0x162b3d(0x971)!==_0x162b3d(0x971))return _0x3ffaa3[_0x162b3d(0x116)]['buttonAssistText3'][_0x162b3d(0x439)](this);else{this['contents'][_0x162b3d(0x42c)](),this[_0x162b3d(0x2e1)][_0x162b3d(0x42c)](),this[_0x162b3d(0x3a6)]();let _0x4dd2a1=VisuMZ[_0x162b3d(0x9dd)]['Settings']['KeyboardInput']['NameInputMessage']['split']('\x0a'),_0x5ed107=_0x4dd2a1[_0x162b3d(0x1cc)],_0x3c88b5=(this['innerHeight']-_0x5ed107*this[_0x162b3d(0x22f)]())/0x2;for(let _0xea712c=0x0;_0xea712c<_0x5ed107;++_0xea712c){let _0x4617a6=_0x4dd2a1[_0xea712c],_0x40620b=this[_0x162b3d(0xa27)](_0x4617a6)[_0x162b3d(0x483)],_0x37322a=Math[_0x162b3d(0x701)]((this[_0x162b3d(0x5c3)][_0x162b3d(0x483)]-_0x40620b)/0x2);this[_0x162b3d(0x81b)](_0x4617a6,_0x37322a,_0x3c88b5),_0x3c88b5+=this['lineHeight']();}}}else VisuMZ[_0x162b3d(0x9dd)][_0x162b3d(0x3df)][_0x162b3d(0x439)](this);};};VisuMZ['CoreEngine'][_0x33ad8c(0x5d4)]=Window_ShopSell[_0x33ad8c(0x116)][_0x33ad8c(0x219)],Window_ShopSell['prototype'][_0x33ad8c(0x219)]=function(_0x4a4d44){const _0x39eeab=_0x33ad8c;if(VisuMZ['CoreEngine']['Settings']['QoL'][_0x39eeab(0x898)]&&DataManager[_0x39eeab(0x503)](_0x4a4d44)){if(_0x39eeab(0x2fd)==='dKxBC')return![];else _0x3d6ce6[_0x39eeab(0x7ff)]=!![];}else return VisuMZ['CoreEngine']['Window_ShopSell_isEnabled'][_0x39eeab(0x439)](this,_0x4a4d44);},Window_NumberInput[_0x33ad8c(0x116)]['isUseModernControls']=function(){return![];};VisuMZ['CoreEngine'][_0x33ad8c(0x828)]['KeyboardInput'][_0x33ad8c(0x19b)]&&(VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x48d)]=Window_NumberInput[_0x33ad8c(0x116)]['start'],Window_NumberInput[_0x33ad8c(0x116)]['start']=function(){const _0x27b90d=_0x33ad8c;VisuMZ[_0x27b90d(0x9dd)]['Window_NumberInput_start']['call'](this),this[_0x27b90d(0x288)](this[_0x27b90d(0x61c)]-0x1),Input[_0x27b90d(0x42c)]();},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x84b)]=Window_NumberInput[_0x33ad8c(0x116)][_0x33ad8c(0x9bb)],Window_NumberInput[_0x33ad8c(0x116)][_0x33ad8c(0x9bb)]=function(){const _0x247042=_0x33ad8c;if(!this[_0x247042(0x8f9)]())return;if(Input[_0x247042(0x492)]())this['processKeyboardDigitChange']();else{if(Input[_0x247042(0x48f)](_0x247042(0x65b))){if('IdLQn'!==_0x247042(0x3ae))this[_0x247042(0x408)]();else{const _0x2209ae=_0x4177bc[_0x13afac];_0x2209ae?this[_0x247042(0x52d)](_0x2209ae[_0x247042(0x6d5)],0x0):this[_0x247042(0x3ca)]();}}else{if(Input[_0x247042(0x268)]===0x2e)this[_0x247042(0x47b)]();else{if(Input[_0x247042(0x268)]===0x24){if(_0x247042(0x407)!==_0x247042(0x3bb))this['processKeyboardHome']();else return 7.5625*_0x5ba11a*_0x4e1dc4;}else{if(Input['_inputSpecialKeyCode']===0x23)this['processKeyboardEnd']();else{if('SKixL'===_0x247042(0x245)){const _0xd39a80=_0x4bca52[_0x5f4bda['animationId']],_0x2c7b0f=_0x14bfd6[_0x247042(0x76b)],_0x459bda=_0x292339[_0x247042(0x7f8)],_0x240358=_0x4ac6cf['mute'];let _0xfed65=this[_0x247042(0x263)]();const _0x57dfd4=this[_0x247042(0x13b)]();if(this['isAnimationForEach'](_0xd39a80))for(const _0x451ad7 of _0x2c7b0f){this[_0x247042(0x30e)]([_0x451ad7],_0xd39a80,_0x459bda,_0xfed65,_0x240358),_0xfed65+=_0x57dfd4;}else this[_0x247042(0x30e)](_0x2c7b0f,_0xd39a80,_0x459bda,_0xfed65,_0x240358);}else VisuMZ[_0x247042(0x9dd)][_0x247042(0x84b)][_0x247042(0x439)](this);}}}}}},Window_NumberInput[_0x33ad8c(0x116)]['processCursorMove']=function(){const _0x18e260=_0x33ad8c;if(!this[_0x18e260(0x532)]())return;Input[_0x18e260(0x492)]()?this[_0x18e260(0x847)]():Window_Selectable['prototype'][_0x18e260(0x8c3)]['call'](this);},Window_NumberInput['prototype'][_0x33ad8c(0x5c4)]=function(){},Window_NumberInput[_0x33ad8c(0x116)][_0x33ad8c(0x847)]=function(){const _0x4e8858=_0x33ad8c;if(String(this[_0x4e8858(0x844)])[_0x4e8858(0x1cc)]>=this[_0x4e8858(0x61c)])return;const _0x25f8a3=Number(String(this['_number'])+Input[_0x4e8858(0x630)]);if(isNaN(_0x25f8a3))return;this[_0x4e8858(0x844)]=_0x25f8a3;const _0x352b22='9'[_0x4e8858(0x7c2)](this['_maxDigits']);this[_0x4e8858(0x844)]=this[_0x4e8858(0x844)][_0x4e8858(0x482)](0x0,_0x352b22),Input[_0x4e8858(0x42c)](),this[_0x4e8858(0x438)](),SoundManager['playCursor'](),this[_0x4e8858(0x288)](this[_0x4e8858(0x61c)]-0x1);},Window_NumberInput['prototype'][_0x33ad8c(0x408)]=function(){const _0x210eb8=_0x33ad8c;this[_0x210eb8(0x844)]=Number(String(this[_0x210eb8(0x844)])[_0x210eb8(0x696)](0x0,-0x1)),this['_number']=Math[_0x210eb8(0x3f1)](0x0,this['_number']),Input[_0x210eb8(0x42c)](),this[_0x210eb8(0x438)](),SoundManager[_0x210eb8(0x7fd)](),this['select'](this[_0x210eb8(0x61c)]-0x1);},Window_NumberInput[_0x33ad8c(0x116)][_0x33ad8c(0x47b)]=function(){const _0x2114b4=_0x33ad8c;this[_0x2114b4(0x844)]=Number(String(this['_number'])[_0x2114b4(0x2b8)](0x1)),this[_0x2114b4(0x844)]=Math[_0x2114b4(0x3f1)](0x0,this['_number']),Input[_0x2114b4(0x42c)](),this[_0x2114b4(0x438)](),SoundManager[_0x2114b4(0x7fd)](),this[_0x2114b4(0x288)](this[_0x2114b4(0x61c)]-0x1);},Window_NumberInput[_0x33ad8c(0x116)]['processKeyboardHome']=function(){const _0x1d521e=_0x33ad8c;if(this[_0x1d521e(0x908)]()===0x0)return;Input[_0x1d521e(0x42c)](),this['refresh'](),SoundManager[_0x1d521e(0x7fd)](),this[_0x1d521e(0x288)](0x0);},Window_NumberInput[_0x33ad8c(0x116)][_0x33ad8c(0x853)]=function(){const _0x150bc8=_0x33ad8c;if(this['index']()===this['_maxDigits']-0x1)return;Input[_0x150bc8(0x42c)](),this[_0x150bc8(0x438)](),SoundManager['playCursor'](),this[_0x150bc8(0x288)](this[_0x150bc8(0x61c)]-0x1);});;VisuMZ['CoreEngine']['Window_MapName_refresh']=Window_MapName[_0x33ad8c(0x116)]['refresh'],Window_MapName[_0x33ad8c(0x116)]['refresh']=function(){const _0x4fbf46=_0x33ad8c;if(VisuMZ[_0x4fbf46(0x9dd)][_0x4fbf46(0x828)]['QoL'][_0x4fbf46(0xa22)]){if(_0x4fbf46(0x7ab)===_0x4fbf46(0x7ab))this['refreshWithTextCodeSupport']();else return _0x2a3b05[_0x4fbf46(0x6c7)][_0x4fbf46(0x70b)][_0x4fbf46(0x439)](this);}else VisuMZ[_0x4fbf46(0x9dd)][_0x4fbf46(0x727)][_0x4fbf46(0x439)](this);},Window_MapName[_0x33ad8c(0x116)]['refreshWithTextCodeSupport']=function(){const _0x34b4d8=_0x33ad8c;this[_0x34b4d8(0x5c3)][_0x34b4d8(0x42c)]();if($gameMap['displayName']()){const _0x5a1f62=this['innerWidth'];this[_0x34b4d8(0x6d4)](0x0,0x0,_0x5a1f62,this[_0x34b4d8(0x22f)]());const _0x81ea84=this[_0x34b4d8(0xa27)]($gameMap[_0x34b4d8(0x979)]())[_0x34b4d8(0x483)];this['drawTextEx']($gameMap[_0x34b4d8(0x979)](),Math['floor']((_0x5a1f62-_0x81ea84)/0x2),0x0);}},Window_TitleCommand[_0x33ad8c(0x6e1)]=VisuMZ[_0x33ad8c(0x9dd)]['Settings'][_0x33ad8c(0x637)],Window_TitleCommand[_0x33ad8c(0x116)]['makeCommandList']=function(){this['makeCoreEngineCommandList']();},Window_TitleCommand['prototype'][_0x33ad8c(0x2a5)]=function(){const _0x3210eb=_0x33ad8c;for(const _0x5edb46 of Window_TitleCommand[_0x3210eb(0x6e1)]){if(_0x5edb46[_0x3210eb(0x9b5)][_0x3210eb(0x439)](this)){const _0x5a83a3=_0x5edb46[_0x3210eb(0x1d2)];let _0xdde235=_0x5edb46[_0x3210eb(0x9ef)];if(['','Untitled'][_0x3210eb(0x949)](_0xdde235))_0xdde235=_0x5edb46[_0x3210eb(0x8db)][_0x3210eb(0x439)](this);const _0x3658f3=_0x5edb46['EnableJS'][_0x3210eb(0x439)](this),_0x10ad27=_0x5edb46[_0x3210eb(0x289)][_0x3210eb(0x439)](this);this['addCommand'](_0xdde235,_0x5a83a3,_0x3658f3,_0x10ad27),this[_0x3210eb(0x955)](_0x5a83a3,_0x5edb46['CallHandlerJS'][_0x3210eb(0x404)](this,_0x10ad27));}}},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x8a5)]=Window_TitleCommand[_0x33ad8c(0x116)][_0x33ad8c(0x73f)],Window_TitleCommand['prototype'][_0x33ad8c(0x73f)]=function(){const _0x1b8310=_0x33ad8c;VisuMZ[_0x1b8310(0x9dd)][_0x1b8310(0x8a5)][_0x1b8310(0x439)](this);if(!Window_TitleCommand['_lastCommandSymbol'])return;const _0x11cbcc=this[_0x1b8310(0x1c0)](Window_TitleCommand[_0x1b8310(0x349)]),_0x10061b=Math['floor'](this[_0x1b8310(0x171)]()/0x2)-0x1;this['smoothSelect'](_0x11cbcc);if(this[_0x1b8310(0x5de)]>0x1){if('gxxyJ'==='LrtkF'){if(_0xdad801[_0x1b8310(0x39e)]!==_0x23a4f7)return _0x2b6711['_forcedBattleSys'];if(this[_0x1b8310(0x5fd)]===_0x4ef410)this[_0x1b8310(0xa05)]();if(this['_CoreEngineSettings'][_0x1b8310(0x12b)]===_0x4f0880)this[_0x1b8310(0x4c9)]();return this[_0x1b8310(0x5fd)]['BattleSystem'];}else this['_scrollDuration']=0x1,this['updateSmoothScroll']();}this['setTopRow'](_0x11cbcc-_0x10061b);},Window_GameEnd['_commandList']=VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x828)]['MenuLayout'][_0x33ad8c(0x3c6)][_0x33ad8c(0x7dd)],Window_GameEnd[_0x33ad8c(0x116)][_0x33ad8c(0x112)]=function(){this['makeCoreEngineCommandList']();},Window_GameEnd['prototype'][_0x33ad8c(0x2a5)]=function(){const _0x79d28b=_0x33ad8c;for(const _0x24c3e1 of Window_GameEnd[_0x79d28b(0x6e1)]){if('nSyNV'!=='nSyNV'){_0x463c33[_0x79d28b(0x9dd)][_0x79d28b(0x559)][_0x79d28b(0x439)](this,_0x277401);if(_0x1bba7d[_0x79d28b(0x9dd)][_0x79d28b(0x828)][_0x79d28b(0x113)][_0x79d28b(0x85d)])return;const _0x2d02a9=_0x43de6f[_0x79d28b(0x4a2)]();_0x2d02a9['missed']&&(0x1-this['itemEva'](_0x2b26ee)>this[_0x79d28b(0x34e)](_0x3e7e17)&&(_0x2d02a9[_0x79d28b(0x561)]=![],_0x2d02a9[_0x79d28b(0x5d1)]=!![]));}else{if(_0x24c3e1[_0x79d28b(0x9b5)][_0x79d28b(0x439)](this)){if(_0x79d28b(0x81f)==='YxmMy')this[_0x79d28b(0x718)]['onload']=null,this[_0x79d28b(0x76c)]();else{const _0x2ca583=_0x24c3e1['Symbol'];let _0x542856=_0x24c3e1[_0x79d28b(0x9ef)];if(['','Untitled']['includes'](_0x542856))_0x542856=_0x24c3e1['TextJS'][_0x79d28b(0x439)](this);const _0x107784=_0x24c3e1[_0x79d28b(0x11a)]['call'](this),_0x577221=_0x24c3e1[_0x79d28b(0x289)][_0x79d28b(0x439)](this);this[_0x79d28b(0x464)](_0x542856,_0x2ca583,_0x107784,_0x577221),this[_0x79d28b(0x955)](_0x2ca583,_0x24c3e1['CallHandlerJS'][_0x79d28b(0x404)](this,_0x577221));}}}}};function Window_ButtonAssist(){this['initialize'](...arguments);}Window_ButtonAssist[_0x33ad8c(0x116)]=Object[_0x33ad8c(0x8fc)](Window_Base[_0x33ad8c(0x116)]),Window_ButtonAssist['prototype'][_0x33ad8c(0x4db)]=Window_ButtonAssist,Window_ButtonAssist['prototype'][_0x33ad8c(0x4b0)]=function(_0x363abe){const _0x17f72e=_0x33ad8c;this[_0x17f72e(0x8ed)]={},Window_Base['prototype'][_0x17f72e(0x4b0)]['call'](this,_0x363abe),this[_0x17f72e(0x672)](VisuMZ['CoreEngine']['Settings'][_0x17f72e(0x2cc)][_0x17f72e(0x3d0)]||0x0),this['refresh']();},Window_ButtonAssist[_0x33ad8c(0x116)]['makeFontBigger']=function(){const _0x479212=_0x33ad8c;this[_0x479212(0x5c3)][_0x479212(0x1e9)]<=0x60&&(this[_0x479212(0x5c3)][_0x479212(0x1e9)]+=0x6);},Window_ButtonAssist[_0x33ad8c(0x116)][_0x33ad8c(0x805)]=function(){const _0x21ce88=_0x33ad8c;if(this[_0x21ce88(0x5c3)]['fontSize']>=0x18){if(_0x21ce88(0x863)!==_0x21ce88(0x774))this['contents'][_0x21ce88(0x1e9)]-=0x6;else return _0x19025c[_0x21ce88(0x9df)]();}},Window_ButtonAssist[_0x33ad8c(0x116)]['update']=function(){const _0x5a08fe=_0x33ad8c;Window_Base[_0x5a08fe(0x116)][_0x5a08fe(0x88b)]['call'](this),this['updateKeyText']();},Window_ButtonAssist[_0x33ad8c(0x116)][_0x33ad8c(0x619)]=function(){const _0x38f493=_0x33ad8c;this[_0x38f493(0x648)]=SceneManager[_0x38f493(0x90d)][_0x38f493(0x157)]()!==_0x38f493(0x724)?0x0:0x8;},Window_ButtonAssist[_0x33ad8c(0x116)][_0x33ad8c(0x737)]=function(){const _0x4ccf3d=_0x33ad8c,_0x4f5dfa=SceneManager[_0x4ccf3d(0x90d)];for(let _0x309ce5=0x1;_0x309ce5<=0x5;_0x309ce5++){if(_0x4ccf3d(0x72c)!==_0x4ccf3d(0x44a)){if(this[_0x4ccf3d(0x8ed)][_0x4ccf3d(0x30a)[_0x4ccf3d(0x3e7)](_0x309ce5)]!==_0x4f5dfa[_0x4ccf3d(0x419)[_0x4ccf3d(0x3e7)](_0x309ce5)]()){if(_0x4ccf3d(0x4fe)===_0x4ccf3d(0x9c6)){if(!this[_0x4ccf3d(0x5f8)]())return this['helpAreaBottom']();else return this[_0x4ccf3d(0x8a2)]()&&this[_0x4ccf3d(0x157)]()==='top'?_0x216d3c['prototype'][_0x4ccf3d(0x22f)]():0x0;}else return this[_0x4ccf3d(0x438)]();}if(this[_0x4ccf3d(0x8ed)][_0x4ccf3d(0x467)[_0x4ccf3d(0x3e7)](_0x309ce5)]!==_0x4f5dfa[_0x4ccf3d(0x323)[_0x4ccf3d(0x3e7)](_0x309ce5)]())return this[_0x4ccf3d(0x438)]();}else{const _0x4c003c=_0x2623df[_0x4ccf3d(0x6f4)]();if(_0x4c003c)for(const _0x4aa34e of _0x4c003c){if(_0x4aa34e&&_0x4aa34e['connected']){if(this[_0x4ccf3d(0x417)](_0x4aa34e))return!![];if(this['isGamepadAxisMoved'](_0x4aa34e))return!![];}}}}},Window_ButtonAssist[_0x33ad8c(0x116)][_0x33ad8c(0x438)]=function(){const _0x2906a1=_0x33ad8c;this[_0x2906a1(0x5c3)][_0x2906a1(0x42c)]();for(let _0x446f46=0x1;_0x446f46<=0x5;_0x446f46++){this['drawSegment'](_0x446f46);}},Window_ButtonAssist['prototype'][_0x33ad8c(0x52e)]=function(_0x5d37bf){const _0x33e6b5=_0x33ad8c,_0x3227c1=this[_0x33e6b5(0x369)]/0x5,_0xe45a78=SceneManager[_0x33e6b5(0x90d)],_0x9ee033=_0xe45a78[_0x33e6b5(0x419)[_0x33e6b5(0x3e7)](_0x5d37bf)](),_0x2db37e=_0xe45a78[_0x33e6b5(0x323)[_0x33e6b5(0x3e7)](_0x5d37bf)]();this[_0x33e6b5(0x8ed)]['key%1'['format'](_0x5d37bf)]=_0x9ee033,this[_0x33e6b5(0x8ed)][_0x33e6b5(0x467)[_0x33e6b5(0x3e7)](_0x5d37bf)]=_0x2db37e;if(_0x9ee033==='')return;if(_0x2db37e==='')return;const _0x469277=_0xe45a78['buttonAssistOffset%1'['format'](_0x5d37bf)](),_0x1b4506=this[_0x33e6b5(0x684)](),_0x195091=_0x3227c1*(_0x5d37bf-0x1)+_0x1b4506+_0x469277,_0xd9b229=VisuMZ['CoreEngine'][_0x33e6b5(0x828)]['ButtonAssist'][_0x33e6b5(0x26b)];this['drawTextEx'](_0xd9b229[_0x33e6b5(0x3e7)](_0x9ee033,_0x2db37e),_0x195091,0x0,_0x3227c1-_0x1b4506*0x2);},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x440)]=Game_Interpreter['prototype']['updateWaitMode'],Game_Interpreter['prototype'][_0x33ad8c(0x477)]=function(){const _0x3de966=_0x33ad8c;if($gameTemp[_0x3de966(0x3d8)]!==undefined)return VisuMZ['CoreEngine'][_0x3de966(0x6f8)]();return VisuMZ[_0x3de966(0x9dd)][_0x3de966(0x440)]['call'](this);},VisuMZ[_0x33ad8c(0x9dd)]['UpdatePictureCoordinates']=function(){const _0x42de0b=_0x33ad8c,_0x476479=$gameTemp[_0x42de0b(0x3d8)]||0x0;(_0x476479<0x0||_0x476479>0x64||TouchInput[_0x42de0b(0x4b3)]()||Input[_0x42de0b(0x616)]('cancel'))&&($gameTemp['_pictureCoordinatesMode']=undefined,Input[_0x42de0b(0x42c)](),TouchInput['clear']());const _0x183d1c=$gameScreen[_0x42de0b(0x7f3)](_0x476479);if(_0x183d1c){if(_0x42de0b(0x9a2)==='SFAfp')return _0x48b4eb['horzJS']['call'](this);else _0x183d1c['_x']=TouchInput['_x'],_0x183d1c['_y']=TouchInput['_y'];}return VisuMZ[_0x42de0b(0x9dd)][_0x42de0b(0x82c)](),$gameTemp['_pictureCoordinatesMode']!==undefined;},VisuMZ['CoreEngine']['updatePictureCoordinates']=function(){const _0x2a0380=_0x33ad8c,_0x23760a=SceneManager[_0x2a0380(0x90d)];if(!_0x23760a)return;!_0x23760a[_0x2a0380(0x717)]&&(SoundManager[_0x2a0380(0x995)](),_0x23760a[_0x2a0380(0x717)]=new Window_PictureCoordinates(),_0x23760a[_0x2a0380(0x5c6)](_0x23760a[_0x2a0380(0x717)])),$gameTemp['_pictureCoordinatesMode']===undefined&&(SoundManager[_0x2a0380(0x2db)](),_0x23760a['removeChild'](_0x23760a['_pictureCoordinatesWindow']),_0x23760a[_0x2a0380(0x717)]=undefined);};function Window_PictureCoordinates(){this['initialize'](...arguments);}Window_PictureCoordinates[_0x33ad8c(0x116)]=Object[_0x33ad8c(0x8fc)](Window_Base[_0x33ad8c(0x116)]),Window_PictureCoordinates[_0x33ad8c(0x116)][_0x33ad8c(0x4db)]=Window_PictureCoordinates,Window_PictureCoordinates['prototype'][_0x33ad8c(0x4b0)]=function(){const _0x294834=_0x33ad8c;this['_lastOrigin']=_0x294834(0x2bd),this[_0x294834(0x793)]=_0x294834(0x2bd),this[_0x294834(0x49f)]='nah';const _0x27ea25=this[_0x294834(0x3a3)]();Window_Base[_0x294834(0x116)][_0x294834(0x4b0)][_0x294834(0x439)](this,_0x27ea25),this['setBackgroundType'](0x2);},Window_PictureCoordinates['prototype'][_0x33ad8c(0x3a3)]=function(){const _0x33f877=_0x33ad8c;let _0x2f8442=0x0,_0x3b5a87=Graphics['height']-this['lineHeight'](),_0x4e918f=Graphics[_0x33f877(0x483)],_0x4608fc=this['lineHeight']();return new Rectangle(_0x2f8442,_0x3b5a87,_0x4e918f,_0x4608fc);},Window_PictureCoordinates[_0x33ad8c(0x116)]['updatePadding']=function(){const _0x22cd97=_0x33ad8c;this[_0x22cd97(0x648)]=0x0;},Window_PictureCoordinates[_0x33ad8c(0x116)]['update']=function(){const _0x2991b9=_0x33ad8c;Window_Base[_0x2991b9(0x116)]['update'][_0x2991b9(0x439)](this),this[_0x2991b9(0x164)]();},Window_PictureCoordinates['prototype'][_0x33ad8c(0x164)]=function(){const _0x4653fd=_0x33ad8c;if(!this[_0x4653fd(0x636)]())return;this['refresh']();},Window_PictureCoordinates[_0x33ad8c(0x116)][_0x33ad8c(0x636)]=function(){const _0x3dbb2f=_0x33ad8c,_0x16d8e8=$gameTemp[_0x3dbb2f(0x3d8)],_0x23c598=$gameScreen[_0x3dbb2f(0x7f3)](_0x16d8e8);if(_0x23c598)return this[_0x3dbb2f(0x24b)]!==_0x23c598[_0x3dbb2f(0x1ff)]||this['_lastX']!==_0x23c598['_x']||this[_0x3dbb2f(0x49f)]!==_0x23c598['_y'];else{if(_0x3dbb2f(0x7e1)!=='sRWCZ')this['_displayY']=this[_0x3dbb2f(0x63f)]()[_0x3dbb2f(0x21f)];else return![];}},Window_PictureCoordinates[_0x33ad8c(0x116)][_0x33ad8c(0x438)]=function(){const _0x112faf=_0x33ad8c;this[_0x112faf(0x5c3)][_0x112faf(0x42c)]();const _0x4c3800=$gameTemp[_0x112faf(0x3d8)],_0x46623c=$gameScreen['picture'](_0x4c3800);if(!_0x46623c)return;this[_0x112faf(0x24b)]=_0x46623c['_origin'],this['_lastX']=_0x46623c['_x'],this[_0x112faf(0x49f)]=_0x46623c['_y'];const _0x296893=ColorManager[_0x112faf(0x887)]();this['contents'][_0x112faf(0x379)](0x0,0x0,this['innerWidth'],this[_0x112faf(0x989)],_0x296893);const _0x589a76='\x20Origin:\x20%1'['format'](_0x46623c[_0x112faf(0x1ff)]===0x0?'Upper\x20Left':_0x112faf(0x9b9)),_0x235c14=_0x112faf(0x548)['format'](_0x46623c['_x']),_0x39adc3=_0x112faf(0x30f)[_0x112faf(0x3e7)](_0x46623c['_y']),_0x3e22f8='%1:\x20Exit\x20'[_0x112faf(0x3e7)](TextManager[_0x112faf(0xa26)]('cancel'));let _0x29a9e3=Math[_0x112faf(0x701)](this[_0x112faf(0x369)]/0x4);this[_0x112faf(0x2ef)](_0x589a76,_0x29a9e3*0x0,0x0,_0x29a9e3),this[_0x112faf(0x2ef)](_0x235c14,_0x29a9e3*0x1,0x0,_0x29a9e3,_0x112faf(0x9fa)),this[_0x112faf(0x2ef)](_0x39adc3,_0x29a9e3*0x2,0x0,_0x29a9e3,_0x112faf(0x9fa));const _0x3b4c74=this[_0x112faf(0xa27)](_0x3e22f8)[_0x112faf(0x483)],_0x308057=this[_0x112faf(0x369)]-_0x3b4c74;this[_0x112faf(0x81b)](_0x3e22f8,_0x308057,0x0,_0x3b4c74);};function Window_TextPopup(){this['initialize'](...arguments);}Window_TextPopup[_0x33ad8c(0x116)]=Object[_0x33ad8c(0x8fc)](Window_Base[_0x33ad8c(0x116)]),Window_TextPopup[_0x33ad8c(0x116)][_0x33ad8c(0x4db)]=Window_TextPopup,Window_TextPopup[_0x33ad8c(0x2c8)]={'framesPerChar':VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x828)]['Window']['DurationPerChat']??1.5,'framesMin':VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x828)][_0x33ad8c(0x839)][_0x33ad8c(0x29d)]??0x5a,'framesMax':VisuMZ[_0x33ad8c(0x9dd)]['Settings'][_0x33ad8c(0x839)][_0x33ad8c(0x94b)]??0x12c},Window_TextPopup[_0x33ad8c(0x116)][_0x33ad8c(0x4b0)]=function(){const _0x47d9b8=_0x33ad8c,_0x3e9eaa=new Rectangle(0x0,0x0,0x1,0x1);Window_Base['prototype']['initialize']['call'](this,_0x3e9eaa),this[_0x47d9b8(0x7bc)]=0x0,this['_text']='',this[_0x47d9b8(0x3f0)]=[],this[_0x47d9b8(0x315)]=0x0;},Window_TextPopup[_0x33ad8c(0x116)][_0x33ad8c(0x7d5)]=function(){return!![];},Window_TextPopup['prototype']['addQueue']=function(_0x32b353){const _0x1e3d9c=_0x33ad8c;if(this[_0x1e3d9c(0x3f0)][this[_0x1e3d9c(0x3f0)][_0x1e3d9c(0x1cc)]-0x1]===_0x32b353)return;this[_0x1e3d9c(0x3f0)][_0x1e3d9c(0x8f7)](_0x32b353),SceneManager[_0x1e3d9c(0x90d)][_0x1e3d9c(0x5c6)](this);},Window_TextPopup['prototype'][_0x33ad8c(0x88b)]=function(){const _0x42bfca=_0x33ad8c;Window_Base[_0x42bfca(0x116)][_0x42bfca(0x88b)][_0x42bfca(0x439)](this),this[_0x42bfca(0x44c)](),this[_0x42bfca(0x7f5)]();},Window_TextPopup[_0x33ad8c(0x116)]['updateText']=function(){const _0x58cc6e=_0x33ad8c;if(this['_text']!=='')return;if(this['_textQueue'][_0x58cc6e(0x1cc)]<=0x0)return;if(!this[_0x58cc6e(0x412)]())return;this['_text']=this[_0x58cc6e(0x3f0)][_0x58cc6e(0x203)]();const _0x4acba7=Window_TextPopup['SETTINGS'],_0x3d3470=Math[_0x58cc6e(0x5c7)](this[_0x58cc6e(0x635)][_0x58cc6e(0x1cc)]*_0x4acba7[_0x58cc6e(0x8a9)]);this[_0x58cc6e(0x315)]=_0x3d3470[_0x58cc6e(0x482)](_0x4acba7[_0x58cc6e(0x4b4)],_0x4acba7['framesMax']);const _0x523476=this[_0x58cc6e(0xa27)](this[_0x58cc6e(0x635)]);let _0x1f9982=_0x523476['width']+this[_0x58cc6e(0x684)]()*0x2;_0x1f9982+=$gameSystem[_0x58cc6e(0xa16)]()*0x2;let _0x4865ba=Math[_0x58cc6e(0x3f1)](_0x523476[_0x58cc6e(0x64c)],this[_0x58cc6e(0x22f)]());_0x4865ba+=$gameSystem['windowPadding']()*0x2;const _0x57e44a=Math[_0x58cc6e(0x758)]((Graphics['width']-_0x1f9982)/0x2),_0x2bc38a=Math[_0x58cc6e(0x758)]((Graphics['height']-_0x4865ba)/0x2),_0x480c03=new Rectangle(_0x57e44a,_0x2bc38a,_0x1f9982,_0x4865ba);this[_0x58cc6e(0x7b9)](_0x480c03['x'],_0x480c03['y'],_0x480c03[_0x58cc6e(0x483)],_0x480c03[_0x58cc6e(0x64c)]),this['createContents'](),this[_0x58cc6e(0x438)](),this['open'](),SceneManager[_0x58cc6e(0x90d)][_0x58cc6e(0x5c6)](this);},Window_TextPopup['prototype'][_0x33ad8c(0x438)]=function(){const _0x44f5eb=_0x33ad8c,_0x2b00a0=this[_0x44f5eb(0x7ed)]();this['contents'][_0x44f5eb(0x42c)](),this[_0x44f5eb(0x81b)](this['_text'],_0x2b00a0['x'],_0x2b00a0['y'],_0x2b00a0['width']);},Window_TextPopup[_0x33ad8c(0x116)][_0x33ad8c(0x7f5)]=function(){const _0x54ce25=_0x33ad8c;if(this['isOpening']()||this['isClosing']())return;if(this[_0x54ce25(0x315)]<=0x0)return;this[_0x54ce25(0x315)]--,this['_timeDuration']<=0x0&&(_0x54ce25(0x37b)!=='wWVaf'?this[_0x54ce25(0x1ae)]=_0x28b5cf:(this[_0x54ce25(0x10f)](),this[_0x54ce25(0x635)]=''));},VisuMZ[_0x33ad8c(0x8b1)]=function(_0x206b11){const _0x55a38c=_0x33ad8c;if(Utils[_0x55a38c(0x80a)](_0x55a38c(0x1c2))){if('ttyVU'===_0x55a38c(0x330)){var _0x1da534=require(_0x55a38c(0x4aa))[_0x55a38c(0x839)][_0x55a38c(0x1eb)]();SceneManager[_0x55a38c(0x1a0)]();if(_0x206b11)setTimeout(_0x1da534[_0x55a38c(0x152)]['bind'](_0x1da534),0x190);}else{var _0xf12beb=_0xafba7(_0xce4cb8['$1']);_0x542672+=_0xf12beb;}}},VisuMZ[_0x33ad8c(0x2eb)]=function(_0x5e913a,_0x490c5c){const _0x17ea13=_0x33ad8c;_0x490c5c=_0x490c5c['toUpperCase']();var _0x277682=1.70158,_0x808c03=0.7;switch(_0x490c5c){case _0x17ea13(0x308):return _0x5e913a;case _0x17ea13(0x35a):return-0x1*Math[_0x17ea13(0x885)](_0x5e913a*(Math['PI']/0x2))+0x1;case _0x17ea13(0x8eb):return Math['sin'](_0x5e913a*(Math['PI']/0x2));case _0x17ea13(0x6ec):return-0.5*(Math[_0x17ea13(0x885)](Math['PI']*_0x5e913a)-0x1);case _0x17ea13(0x291):return _0x5e913a*_0x5e913a;case _0x17ea13(0x76a):return _0x5e913a*(0x2-_0x5e913a);case'INOUTQUAD':return _0x5e913a<0.5?0x2*_0x5e913a*_0x5e913a:-0x1+(0x4-0x2*_0x5e913a)*_0x5e913a;case _0x17ea13(0x936):return _0x5e913a*_0x5e913a*_0x5e913a;case'OUTCUBIC':var _0x33c4ac=_0x5e913a-0x1;return _0x33c4ac*_0x33c4ac*_0x33c4ac+0x1;case _0x17ea13(0x2e8):return _0x5e913a<0.5?0x4*_0x5e913a*_0x5e913a*_0x5e913a:(_0x5e913a-0x1)*(0x2*_0x5e913a-0x2)*(0x2*_0x5e913a-0x2)+0x1;case _0x17ea13(0x1b3):return _0x5e913a*_0x5e913a*_0x5e913a*_0x5e913a;case _0x17ea13(0x109):var _0x33c4ac=_0x5e913a-0x1;return 0x1-_0x33c4ac*_0x33c4ac*_0x33c4ac*_0x33c4ac;case _0x17ea13(0x861):var _0x33c4ac=_0x5e913a-0x1;return _0x5e913a<0.5?0x8*_0x5e913a*_0x5e913a*_0x5e913a*_0x5e913a:0x1-0x8*_0x33c4ac*_0x33c4ac*_0x33c4ac*_0x33c4ac;case _0x17ea13(0x9c8):return _0x5e913a*_0x5e913a*_0x5e913a*_0x5e913a*_0x5e913a;case _0x17ea13(0x1d4):var _0x33c4ac=_0x5e913a-0x1;return 0x1+_0x33c4ac*_0x33c4ac*_0x33c4ac*_0x33c4ac*_0x33c4ac;case _0x17ea13(0x2f7):var _0x33c4ac=_0x5e913a-0x1;return _0x5e913a<0.5?0x10*_0x5e913a*_0x5e913a*_0x5e913a*_0x5e913a*_0x5e913a:0x1+0x10*_0x33c4ac*_0x33c4ac*_0x33c4ac*_0x33c4ac*_0x33c4ac;case _0x17ea13(0x387):if(_0x5e913a===0x0)return 0x0;return Math[_0x17ea13(0xa1f)](0x2,0xa*(_0x5e913a-0x1));case _0x17ea13(0x359):if(_0x5e913a===0x1)return 0x1;return-Math['pow'](0x2,-0xa*_0x5e913a)+0x1;case'INOUTEXPO':if(_0x5e913a===0x0||_0x5e913a===0x1)return _0x5e913a;var _0x46dd9b=_0x5e913a*0x2,_0x48f616=_0x46dd9b-0x1;if(_0x46dd9b<0x1){if('OdITW'!=='OdITW')_0x5ac6b3[_0x17ea13(0x9dd)]['Settings']['UI']['SideButtons']&&(this[_0x17ea13(0x6f1)]=_0x17b582);else return 0.5*Math[_0x17ea13(0xa1f)](0x2,0xa*_0x48f616);}return 0.5*(-Math['pow'](0x2,-0xa*_0x48f616)+0x2);case _0x17ea13(0x755):var _0x46dd9b=_0x5e913a/0x1;return-0x1*(Math[_0x17ea13(0x8ef)](0x1-_0x46dd9b*_0x5e913a)-0x1);case _0x17ea13(0x686):var _0x33c4ac=_0x5e913a-0x1;return Math[_0x17ea13(0x8ef)](0x1-_0x33c4ac*_0x33c4ac);case _0x17ea13(0x6d1):var _0x46dd9b=_0x5e913a*0x2,_0x48f616=_0x46dd9b-0x2;if(_0x46dd9b<0x1)return-0.5*(Math['sqrt'](0x1-_0x46dd9b*_0x46dd9b)-0x1);return 0.5*(Math['sqrt'](0x1-_0x48f616*_0x48f616)+0x1);case _0x17ea13(0x84c):return _0x5e913a*_0x5e913a*((_0x277682+0x1)*_0x5e913a-_0x277682);case _0x17ea13(0x4d6):var _0x46dd9b=_0x5e913a/0x1-0x1;return _0x46dd9b*_0x46dd9b*((_0x277682+0x1)*_0x46dd9b+_0x277682)+0x1;break;case _0x17ea13(0x1d7):var _0x46dd9b=_0x5e913a*0x2,_0x33adb6=_0x46dd9b-0x2,_0x4e4fab=_0x277682*1.525;if(_0x46dd9b<0x1)return 0.5*_0x46dd9b*_0x46dd9b*((_0x4e4fab+0x1)*_0x46dd9b-_0x4e4fab);return 0.5*(_0x33adb6*_0x33adb6*((_0x4e4fab+0x1)*_0x33adb6+_0x4e4fab)+0x2);case _0x17ea13(0x88f):if(_0x5e913a===0x0||_0x5e913a===0x1)return _0x17ea13(0x98c)==='PXeff'?_0x5e913a:_0xcd0222[_0x17ea13(0x9dd)][_0x17ea13(0x828)][_0x17ea13(0x839)]['ItemPadding'];var _0x46dd9b=_0x5e913a/0x1,_0x48f616=_0x46dd9b-0x1,_0x369dec=0x1-_0x808c03,_0x4e4fab=_0x369dec/(0x2*Math['PI'])*Math[_0x17ea13(0x9e3)](0x1);return-(Math[_0x17ea13(0xa1f)](0x2,0xa*_0x48f616)*Math[_0x17ea13(0x199)]((_0x48f616-_0x4e4fab)*(0x2*Math['PI'])/_0x369dec));case'OUTELASTIC':var _0x369dec=0x1-_0x808c03,_0x46dd9b=_0x5e913a*0x2;if(_0x5e913a===0x0||_0x5e913a===0x1){if('GezjY'!==_0x17ea13(0x8ff)){const _0x52c974=_0x52abe4[_0x17ea13(0x9dd)][_0x17ea13(0x828)][_0x17ea13(0x290)];if(_0x52c974&&_0x52c974[_0x17ea13(0x8f3)])return _0x52c974['originalJS'][_0x17ea13(0x439)](this);this['x']+=_0x2485f1[_0x17ea13(0x758)](_0x31880e[_0x17ea13(0x2d4)]());}else return _0x5e913a;}var _0x4e4fab=_0x369dec/(0x2*Math['PI'])*Math[_0x17ea13(0x9e3)](0x1);return Math[_0x17ea13(0xa1f)](0x2,-0xa*_0x46dd9b)*Math[_0x17ea13(0x199)]((_0x46dd9b-_0x4e4fab)*(0x2*Math['PI'])/_0x369dec)+0x1;case _0x17ea13(0x42b):var _0x369dec=0x1-_0x808c03;if(_0x5e913a===0x0||_0x5e913a===0x1){if('PWkEU'!=='iTbaU')return _0x5e913a;else _0x2af6ca=_0x3a92c9['CoreEngine']['Scene_MenuBase_helpAreaTop'][_0x17ea13(0x439)](this);}var _0x46dd9b=_0x5e913a*0x2,_0x48f616=_0x46dd9b-0x1,_0x4e4fab=_0x369dec/(0x2*Math['PI'])*Math[_0x17ea13(0x9e3)](0x1);if(_0x46dd9b<0x1)return-0.5*(Math[_0x17ea13(0xa1f)](0x2,0xa*_0x48f616)*Math[_0x17ea13(0x199)]((_0x48f616-_0x4e4fab)*(0x2*Math['PI'])/_0x369dec));return Math[_0x17ea13(0xa1f)](0x2,-0xa*_0x48f616)*Math[_0x17ea13(0x199)]((_0x48f616-_0x4e4fab)*(0x2*Math['PI'])/_0x369dec)*0.5+0x1;case _0x17ea13(0x744):var _0x46dd9b=_0x5e913a/0x1;if(_0x46dd9b<0x1/2.75)return'ihhoi'!=='ihhoi'?0xc0:7.5625*_0x46dd9b*_0x46dd9b;else{if(_0x46dd9b<0x2/2.75){if(_0x17ea13(0x83b)===_0x17ea13(0x83b)){var _0x33adb6=_0x46dd9b-1.5/2.75;return 7.5625*_0x33adb6*_0x33adb6+0.75;}else this['smoothSelect'](this[_0x17ea13(0x9f7)]()-0x1);}else{if(_0x46dd9b<2.5/2.75){if(_0x17ea13(0x143)===_0x17ea13(0x354))this['opacity']+=this[_0x17ea13(0x736)]?this[_0x17ea13(0x947)]():-0x1*this['fadeSpeed'](),this[_0x17ea13(0x788)]=_0x46f201[_0x17ea13(0x732)](0xc0,this['opacity']);else{var _0x33adb6=_0x46dd9b-2.25/2.75;return 7.5625*_0x33adb6*_0x33adb6+0.9375;}}else{if('HRTjl'==='HRTjl'){var _0x33adb6=_0x46dd9b-2.625/2.75;return 7.5625*_0x33adb6*_0x33adb6+0.984375;}else return _0x1d7864['CoreEngine'][_0x17ea13(0x22b)][_0x17ea13(0x439)](this,_0x5ea293);}}}case _0x17ea13(0x19f):var _0x38eb22=0x1-VisuMZ[_0x17ea13(0x2eb)](0x1-_0x5e913a,_0x17ea13(0x85f));return _0x38eb22;case _0x17ea13(0xa0a):if(_0x5e913a<0.5)var _0x38eb22=VisuMZ[_0x17ea13(0x2eb)](_0x5e913a*0x2,_0x17ea13(0x2da))*0.5;else{if(_0x17ea13(0x1c1)!==_0x17ea13(0x9a6))var _0x38eb22=VisuMZ[_0x17ea13(0x2eb)](_0x5e913a*0x2-0x1,_0x17ea13(0x85f))*0.5+0.5;else{const _0x552622=_0x405b0e[_0x407db2['parameters'][0x0]];if(_0x552622&&this[_0x17ea13(0x252)]<=0xa){this['_commonEventLayers']++;let _0x4e0beb=_0x2768aa['CoreEngine'][_0x17ea13(0x2c6)](_0x552622['list']);_0x4e0beb['length']>0x0&&(_0x3a83c+=_0x7cc237,_0x4d2f3e+=_0x3cfc0f,_0x5687a0+=_0x17ea13(0x8fa)[_0x17ea13(0x3e7)](_0x552622['id'],_0x552622[_0x17ea13(0x62a)]),_0x44f294+=_0x346938,_0x2d2e46+=_0x4e0beb,_0x5a550a+=_0x292f4e,_0x216e9f+=_0x17ea13(0x3e8)[_0x17ea13(0x3e7)](_0x552622['id'],_0x552622['name']),_0x5f24f4+=_0x35eda9),this['_commonEventLayers']--;}}}return _0x38eb22;default:return _0x5e913a;}},VisuMZ[_0x33ad8c(0x565)]=function(_0x44559a){const _0x594b22=_0x33ad8c;_0x44559a=String(_0x44559a)[_0x594b22(0x455)]();const _0x3b59e5=VisuMZ['CoreEngine'][_0x594b22(0x828)][_0x594b22(0x87b)];if(_0x44559a===_0x594b22(0xfd))return _0x3b59e5[_0x594b22(0x8ae)];if(_0x44559a===_0x594b22(0x5f3))return _0x3b59e5[_0x594b22(0x49d)];if(_0x44559a===_0x594b22(0x5a4))return _0x3b59e5[_0x594b22(0x5b3)];if(_0x44559a===_0x594b22(0x168))return _0x3b59e5[_0x594b22(0x282)];if(_0x44559a===_0x594b22(0x487))return _0x3b59e5[_0x594b22(0x1af)];if(_0x44559a===_0x594b22(0x302))return _0x3b59e5[_0x594b22(0x19e)];if(_0x44559a==='AGI')return _0x3b59e5[_0x594b22(0x9e0)];if(_0x44559a==='LUK')return _0x3b59e5['IconParam7'];if(_0x44559a===_0x594b22(0x7ea))return _0x3b59e5['IconXParam0'];if(_0x44559a===_0x594b22(0x3a2))return _0x3b59e5[_0x594b22(0x26a)];if(_0x44559a===_0x594b22(0x6b7))return _0x3b59e5[_0x594b22(0x553)];if(_0x44559a===_0x594b22(0x4f7))return _0x3b59e5[_0x594b22(0x511)];if(_0x44559a==='MEV')return _0x3b59e5['IconXParam4'];if(_0x44559a===_0x594b22(0x915))return _0x3b59e5[_0x594b22(0x44e)];if(_0x44559a===_0x594b22(0x4af))return _0x3b59e5[_0x594b22(0x56b)];if(_0x44559a===_0x594b22(0x814))return _0x3b59e5[_0x594b22(0x409)];if(_0x44559a===_0x594b22(0x3a7))return _0x3b59e5[_0x594b22(0x6da)];if(_0x44559a===_0x594b22(0x296))return _0x3b59e5[_0x594b22(0x7db)];if(_0x44559a==='TGR')return _0x3b59e5[_0x594b22(0x6c9)];if(_0x44559a===_0x594b22(0x4ff))return _0x3b59e5['IconSParam1'];if(_0x44559a==='REC')return _0x3b59e5[_0x594b22(0x200)];if(_0x44559a===_0x594b22(0x702))return _0x3b59e5[_0x594b22(0x925)];if(_0x44559a===_0x594b22(0x11e))return _0x3b59e5[_0x594b22(0x1df)];if(_0x44559a===_0x594b22(0x597))return _0x3b59e5['IconSParam5'];if(_0x44559a===_0x594b22(0x953))return _0x3b59e5[_0x594b22(0x5c5)];if(_0x44559a==='MDR')return _0x3b59e5[_0x594b22(0x4df)];if(_0x44559a===_0x594b22(0x4a1))return _0x3b59e5[_0x594b22(0x780)];if(_0x44559a===_0x594b22(0x7a4))return _0x3b59e5[_0x594b22(0x2ed)];if(VisuMZ[_0x594b22(0x9dd)][_0x594b22(0x6a5)][_0x44559a])return VisuMZ[_0x594b22(0x9dd)][_0x594b22(0x6a5)][_0x44559a]||0x0;return 0x0;},VisuMZ['ConvertNumberToString']=function(_0x4670e8,_0x43e152,_0xdac6cc){const _0x5d61a1=_0x33ad8c;if(_0xdac6cc===undefined&&_0x4670e8%0x1===0x0)return _0x4670e8;if(_0xdac6cc!==undefined&&['MAXHP',_0x5d61a1(0x5f3),_0x5d61a1(0x5a4),_0x5d61a1(0x168),_0x5d61a1(0x487),_0x5d61a1(0x302),_0x5d61a1(0x777),_0x5d61a1(0x311)][_0x5d61a1(0x949)](String(_0xdac6cc)[_0x5d61a1(0x455)]()[_0x5d61a1(0x99d)]()))return _0x4670e8;_0x43e152=_0x43e152||0x0;if(VisuMZ[_0x5d61a1(0x9dd)][_0x5d61a1(0x160)][_0xdac6cc]){if('nKfWm'===_0x5d61a1(0x775)){_0x207470[_0x5d61a1(0x9dd)][_0x5d61a1(0x8f0)][_0x5d61a1(0x439)](this,_0x415d03),_0x3d4976[_0x5d61a1(0x421)]=0x1;const _0x1bf3ea=_0x1b861f[_0x5d61a1(0x163)];if(_0x1bf3ea[_0x5d61a1(0x13d)](/<LEVEL:[ ](\d+)>/i))_0x40bd49[_0x5d61a1(0x421)]=_0x302dfb(_0x56b0d5['$1']);if(_0x1bf3ea[_0x5d61a1(0x13d)](/<MAXHP:[ ](\d+)>/i))_0x454d77[_0x5d61a1(0x2a6)][0x0]=_0xc85204(_0x5c24f1['$1']);if(_0x1bf3ea[_0x5d61a1(0x13d)](/<MAXMP:[ ](\d+)>/i))_0x354b58['params'][0x1]=_0x29fde3(_0x284c6f['$1']);if(_0x1bf3ea[_0x5d61a1(0x13d)](/<ATK:[ ](\d+)>/i))_0x49b3f7[_0x5d61a1(0x2a6)][0x2]=_0x1b14d1(_0x540fb8['$1']);if(_0x1bf3ea[_0x5d61a1(0x13d)](/<DEF:[ ](\d+)>/i))_0x401ca4[_0x5d61a1(0x2a6)][0x3]=_0x39917e(_0x2b9616['$1']);if(_0x1bf3ea['match'](/<MAT:[ ](\d+)>/i))_0xb5e4f1['params'][0x4]=_0x1fde9c(_0x2d94ea['$1']);if(_0x1bf3ea[_0x5d61a1(0x13d)](/<MDF:[ ](\d+)>/i))_0x5309ac[_0x5d61a1(0x2a6)][0x5]=_0x4857c(_0x151580['$1']);if(_0x1bf3ea[_0x5d61a1(0x13d)](/<AGI:[ ](\d+)>/i))_0x40fea4[_0x5d61a1(0x2a6)][0x6]=_0x40e3d7(_0x5df4fd['$1']);if(_0x1bf3ea[_0x5d61a1(0x13d)](/<LUK:[ ](\d+)>/i))_0x520137[_0x5d61a1(0x2a6)][0x7]=_0xec579d(_0x4d2e4c['$1']);if(_0x1bf3ea[_0x5d61a1(0x13d)](/<EXP:[ ](\d+)>/i))_0x52b7ca[_0x5d61a1(0x818)]=_0x4499dc(_0x3885c5['$1']);if(_0x1bf3ea[_0x5d61a1(0x13d)](/<GOLD:[ ](\d+)>/i))_0x320802[_0x5d61a1(0x166)]=_0x5c3468(_0x2796ca['$1']);}else return VisuMZ['CoreEngine'][_0x5d61a1(0x772)][_0xdac6cc]==='integer'?_0x4670e8:String((_0x4670e8*0x64)[_0x5d61a1(0x32a)](_0x43e152))+'%';}return String((_0x4670e8*0x64)['toFixed'](_0x43e152))+'%';},VisuMZ[_0x33ad8c(0x124)]=function(_0x10faac){const _0xec5df5=_0x33ad8c;_0x10faac=String(_0x10faac);if(!_0x10faac)return _0x10faac;if(typeof _0x10faac!==_0xec5df5(0x426))return _0x10faac;const _0x305ae8=VisuMZ[_0xec5df5(0x9dd)]['Settings'][_0xec5df5(0x113)][_0xec5df5(0x541)]||_0xec5df5(0x994),_0x2b5a9b={'maximumFractionDigits':0x6};_0x10faac=_0x10faac[_0xec5df5(0x104)](/\[(.*?)\]/g,(_0x365a22,_0x4c0585)=>{return VisuMZ['PreserveNumbers'](_0x4c0585,'[',']');}),_0x10faac=_0x10faac[_0xec5df5(0x104)](/<(.*?)>/g,(_0x158d75,_0x30a935)=>{return VisuMZ['PreserveNumbers'](_0x30a935,'<','>');}),_0x10faac=_0x10faac[_0xec5df5(0x104)](/\{\{(.*?)\}\}/g,(_0x208ffe,_0x104456)=>{return VisuMZ['PreserveNumbers'](_0x104456,'','');}),_0x10faac=_0x10faac[_0xec5df5(0x104)](/(\d+\.?\d*)/g,(_0x2a2577,_0x1aa01a)=>{const _0x7341fc=_0xec5df5;if(_0x7341fc(0x80f)!==_0x7341fc(0x649)){let _0x352b8f=_0x1aa01a;if(_0x352b8f[0x0]==='0')return _0x352b8f;if(_0x352b8f[_0x352b8f['length']-0x1]==='.')return Number(_0x352b8f)[_0x7341fc(0x817)](_0x305ae8,_0x2b5a9b)+'.';else{if(_0x352b8f[_0x352b8f['length']-0x1]===',')return Number(_0x352b8f)[_0x7341fc(0x817)](_0x305ae8,_0x2b5a9b)+',';else{if('PhpZh'===_0x7341fc(0x836)){if(_0x46861f[_0x7341fc(0x4d4)]()){const _0x185145=_0x4b0b64[_0x7341fc(0x9dd)][_0x7341fc(0x828)][_0x7341fc(0x113)][_0x7341fc(0x705)];if(_0x185145>0x0)_0x1d4c26[_0x7341fc(0x3db)](_0x185145);}}else return Number(_0x352b8f)[_0x7341fc(0x817)](_0x305ae8,_0x2b5a9b);}}}else this[_0x7341fc(0x4b9)][_0x7341fc(0x23c)]=this['_anglePlus'][_0x7341fc(0x680)];});let _0x1ecd0a=0x3;while(_0x1ecd0a--){_0x10faac=VisuMZ[_0xec5df5(0x9cf)](_0x10faac);}return _0x10faac;},VisuMZ[_0x33ad8c(0x3dd)]=function(_0x3ef847,_0x36bee6,_0x4f4901){const _0x1d2462=_0x33ad8c;return _0x3ef847=_0x3ef847[_0x1d2462(0x104)](/(\d)/gi,(_0x47ff41,_0x5c8d5d)=>'PRESERVCONVERSION(%1)'[_0x1d2462(0x3e7)](Number(_0x5c8d5d))),_0x1d2462(0x7a7)[_0x1d2462(0x3e7)](_0x3ef847,_0x36bee6,_0x4f4901);},VisuMZ[_0x33ad8c(0x9cf)]=function(_0x230bc8){const _0x20b0c2=_0x33ad8c;return _0x230bc8=_0x230bc8[_0x20b0c2(0x104)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x3ec1c4,_0x90a7f9)=>Number(parseInt(_0x90a7f9))),_0x230bc8;},VisuMZ[_0x33ad8c(0x95d)]=function(_0xf2ce5c){const _0xa6481=_0x33ad8c;SoundManager[_0xa6481(0x353)]();if(!Utils[_0xa6481(0x9de)]()){const _0x1328da=window['open'](_0xf2ce5c,_0xa6481(0x13f));}else{const _0x204aea=process[_0xa6481(0x204)]==_0xa6481(0x8d2)?_0xa6481(0x457):process['platform']==_0xa6481(0x286)?_0xa6481(0x24e):_0xa6481(0x97e);require(_0xa6481(0x770))['exec'](_0x204aea+'\x20'+_0xf2ce5c);}},VisuMZ[_0x33ad8c(0x5e3)]=function(_0x5a63c3,_0x18129f){const _0x41de09=_0x33ad8c;if(!_0x5a63c3)return'';const _0x1b89e1=_0x5a63c3[_0x41de09(0x4a6)]||_0x5a63c3['id'];let _0x31ff5b='';_0x5a63c3[_0x41de09(0x316)]!==undefined&&_0x5a63c3[_0x41de09(0x2b9)]!==undefined&&(_0x31ff5b='Actor-%1-%2'[_0x41de09(0x3e7)](_0x1b89e1,_0x18129f));_0x5a63c3[_0x41de09(0x356)]!==undefined&&_0x5a63c3[_0x41de09(0x627)]!==undefined&&(_0x41de09(0x187)==='UTEVn'?(_0x1469d2=_0x3f4d12(_0x51edd0['$1'])*_0x2460dd[_0x41de09(0x483)],_0x3206a4=(0x1-_0x16291a(_0x64aeeb['$2']))*-_0x5c2c85):_0x31ff5b=_0x41de09(0x1f8)['format'](_0x1b89e1,_0x18129f));if(_0x5a63c3[_0x41de09(0x10d)]!==undefined&&_0x5a63c3[_0x41de09(0x2d5)]!==undefined){if(_0x41de09(0x4cb)!==_0x41de09(0x4cb))return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x41de09(0x3ec)](this['_inputSpecialKeyCode']);else _0x31ff5b='Skill-%1-%2'[_0x41de09(0x3e7)](_0x1b89e1,_0x18129f);}_0x5a63c3[_0x41de09(0x443)]!==undefined&&_0x5a63c3[_0x41de09(0x337)]!==undefined&&(_0x31ff5b=_0x41de09(0x6f3)[_0x41de09(0x3e7)](_0x1b89e1,_0x18129f));_0x5a63c3['wtypeId']!==undefined&&_0x5a63c3[_0x41de09(0x629)]===0x1&&(_0x31ff5b=_0x41de09(0x397)['format'](_0x1b89e1,_0x18129f));if(_0x5a63c3[_0x41de09(0x52c)]!==undefined&&_0x5a63c3['etypeId']>0x1){if(_0x41de09(0x5cd)===_0x41de09(0x5cd))_0x31ff5b='Armor-%1-%2'[_0x41de09(0x3e7)](_0x1b89e1,_0x18129f);else{if(!this[_0x41de09(0x4c3)]())return;if(this[_0x41de09(0x931)]||this[_0x41de09(0x952)])return;this[_0x41de09(0x530)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this[_0x41de09(0x931)]=new _0x30a965(),this[_0x41de09(0x952)]=new _0x16662e(),this[_0x41de09(0x5c6)](this[_0x41de09(0x931)]),this[_0x41de09(0x5c6)](this[_0x41de09(0x952)]);}}return _0x5a63c3[_0x41de09(0x215)]!==undefined&&_0x5a63c3[_0x41de09(0x766)]!==undefined&&(_0x41de09(0x375)!==_0x41de09(0x539)?_0x31ff5b=_0x41de09(0x1c9)[_0x41de09(0x3e7)](_0x1b89e1,_0x18129f):this[_0x41de09(0x3e5)]['setBackgroundType'](_0x2a10b0[_0x41de09(0x6c7)][_0x41de09(0x7fb)])),_0x5a63c3['autoRemovalTiming']!==undefined&&_0x5a63c3['maxTurns']!==undefined&&(_0x41de09(0x5aa)!=='DlOQB'?_0x31ff5b='State-%1-%2'[_0x41de09(0x3e7)](_0x1b89e1,_0x18129f):this[_0x41de09(0x894)][_0x41de09(0x672)](_0x452c31[_0x41de09(0x6c7)][_0x41de09(0x451)])),_0x31ff5b;},Game_Picture[_0x33ad8c(0x116)][_0x33ad8c(0x968)]=function(){const _0x2bc6a9=_0x33ad8c;return this[_0x2bc6a9(0x41c)];},VisuMZ[_0x33ad8c(0x9dd)]['Game_Picture_initBasic']=Game_Picture[_0x33ad8c(0x116)]['initBasic'],Game_Picture[_0x33ad8c(0x116)][_0x33ad8c(0x223)]=function(){const _0x247d75=_0x33ad8c;VisuMZ['CoreEngine'][_0x247d75(0x2a1)][_0x247d75(0x439)](this),this[_0x247d75(0x41c)]={'x':0x0,'y':0x0},this[_0x247d75(0x16b)]={'x':0x0,'y':0x0};},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x660)]=Game_Picture[_0x33ad8c(0x116)]['updateMove'],Game_Picture[_0x33ad8c(0x116)][_0x33ad8c(0x12c)]=function(){const _0x2c6969=_0x33ad8c;this[_0x2c6969(0x9ab)]();const _0x3598d3=this['_duration'];VisuMZ[_0x2c6969(0x9dd)]['Game_Picture_updateMove'][_0x2c6969(0x439)](this),_0x3598d3>0x0&&this['_duration']<=0x0&&(this['_x']=this[_0x2c6969(0x8cf)],this['_y']=this[_0x2c6969(0x6dd)],this[_0x2c6969(0x990)]=this[_0x2c6969(0x265)],this[_0x2c6969(0x5a2)]=this[_0x2c6969(0x40a)],this[_0x2c6969(0x8cc)]=this[_0x2c6969(0x689)],this['_anchor']&&(this[_0x2c6969(0x41c)]['x']=this[_0x2c6969(0x16b)]['x'],this[_0x2c6969(0x41c)]['y']=this['_targetAnchor']['y']));},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x294)]=Game_Picture[_0x33ad8c(0x116)][_0x33ad8c(0x9c4)],Game_Picture[_0x33ad8c(0x116)][_0x33ad8c(0x9c4)]=function(_0xfc31af,_0x4d714f,_0x551d91,_0x327abe,_0xc083d4,_0x38fff4,_0x428a92,_0x2a507a){const _0x1c4261=_0x33ad8c;VisuMZ[_0x1c4261(0x9dd)][_0x1c4261(0x294)][_0x1c4261(0x439)](this,_0xfc31af,_0x4d714f,_0x551d91,_0x327abe,_0xc083d4,_0x38fff4,_0x428a92,_0x2a507a),this[_0x1c4261(0x2d6)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x4d714f]||{'x':0x0,'y':0x0});},VisuMZ[_0x33ad8c(0x9dd)]['Game_Picture_move']=Game_Picture['prototype'][_0x33ad8c(0x7b9)],Game_Picture['prototype'][_0x33ad8c(0x7b9)]=function(_0x127385,_0x32456a,_0x120721,_0x44b724,_0x4fef22,_0x204447,_0xcbf42c,_0x29af78,_0x580d8f){const _0x34cf63=_0x33ad8c;VisuMZ[_0x34cf63(0x9dd)][_0x34cf63(0x882)][_0x34cf63(0x439)](this,_0x127385,_0x32456a,_0x120721,_0x44b724,_0x4fef22,_0x204447,_0xcbf42c,_0x29af78,_0x580d8f),this['setTargetAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x127385]||{'x':0x0,'y':0x0});},Game_Picture[_0x33ad8c(0x116)][_0x33ad8c(0x9ab)]=function(){const _0x14e175=_0x33ad8c;this[_0x14e175(0x284)]>0x0&&(this[_0x14e175(0x41c)]['x']=this[_0x14e175(0x7b6)](this[_0x14e175(0x41c)]['x'],this[_0x14e175(0x16b)]['x']),this[_0x14e175(0x41c)]['y']=this[_0x14e175(0x7b6)](this[_0x14e175(0x41c)]['y'],this[_0x14e175(0x16b)]['y']));},Game_Picture['prototype'][_0x33ad8c(0x2d6)]=function(_0x5bc14a){const _0x59be4d=_0x33ad8c;this[_0x59be4d(0x41c)]=_0x5bc14a,this['_targetAnchor']=JsonEx['makeDeepCopy'](this[_0x59be4d(0x41c)]);},Game_Picture[_0x33ad8c(0x116)][_0x33ad8c(0x70c)]=function(_0x17d0b5){this['_targetAnchor']=_0x17d0b5;},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x653)]=Sprite_Picture[_0x33ad8c(0x116)][_0x33ad8c(0x82d)],Sprite_Picture[_0x33ad8c(0x116)]['updateOrigin']=function(){const _0x3df665=_0x33ad8c,_0x36ef06=this[_0x3df665(0x7f3)]();!_0x36ef06[_0x3df665(0x968)]()?VisuMZ[_0x3df665(0x9dd)][_0x3df665(0x653)]['call'](this):(this[_0x3df665(0x968)]['x']=_0x36ef06[_0x3df665(0x968)]()['x'],this[_0x3df665(0x968)]['y']=_0x36ef06[_0x3df665(0x968)]()['y']);},Game_Action[_0x33ad8c(0x116)][_0x33ad8c(0x1a5)]=function(_0x7a9db0){const _0x1b2894=_0x33ad8c;if(_0x7a9db0){const _0x3eee73=_0x7a9db0[_0x1b2894(0x234)];if(_0x3eee73===0x1&&this['subject']()['attackSkillId']()!==0x1){if('UQYBl'===_0x1b2894(0x3e6))return this[_0x1b2894(0x43f)](_0x16027c);else this[_0x1b2894(0x51a)]();}else{if(_0x3eee73===0x2&&this[_0x1b2894(0x146)]()[_0x1b2894(0x19c)]()!==0x2){if('JSxds'!==_0x1b2894(0x754))this[_0x1b2894(0x6f0)]();else return _0xcc65fd[_0x1b2894(0x20f)]||'Finish';}else{if(_0x1b2894(0x63e)!==_0x1b2894(0x63e)){var _0x430a32=_0x1b57ed(_0x4eb8bd['$1']);try{_0xe1289e=_0x181e27[_0x1b2894(0x3f1)](_0x5a4105,_0xdf84e5(_0x16c4c5(_0x430a32)));}catch(_0x154a2a){if(_0x4ff704[_0x1b2894(0x4d4)]())_0x81af04['log'](_0x154a2a);}}else this['setSkill'](_0x3eee73);}}}else'vsnvt'===_0x1b2894(0x72e)?this[_0x1b2894(0x42c)]():(_0x1de079['CoreEngine'][_0x1b2894(0xa1e)][_0x1b2894(0x439)](this),this[_0x1b2894(0x906)]());},Game_Actor[_0x33ad8c(0x116)][_0x33ad8c(0x144)]=function(){const _0x54e848=_0x33ad8c;return this[_0x54e848(0x8c1)]()[_0x54e848(0x238)](_0x2f255c=>this['canUse'](_0x2f255c)&&this[_0x54e848(0x7de)]()[_0x54e848(0x949)](_0x2f255c[_0x54e848(0x10d)]));},Window_Base[_0x33ad8c(0x116)][_0x33ad8c(0x5ee)]=function(){const _0x4c126a=_0x33ad8c;this[_0x4c126a(0x716)]=new Sprite(),this[_0x4c126a(0x716)][_0x4c126a(0x7d3)]=new Bitmap(0x0,0x0),this[_0x4c126a(0x716)]['x']=0x0,this[_0x4c126a(0x456)](this[_0x4c126a(0x716)]);},Window_Base['prototype'][_0x33ad8c(0x3f4)]=function(){const _0x4db2f0=_0x33ad8c;if(this[_0x4db2f0(0x716)]){const _0x925fbb=this[_0x4db2f0(0x716)][_0x4db2f0(0x7d3)],_0x440d43=this[_0x4db2f0(0x483)],_0x47c7d6=this[_0x4db2f0(0x64c)],_0x21b847=this['padding'],_0x25bb1e=ColorManager['dimColor1'](),_0x3fb1fc=ColorManager[_0x4db2f0(0x1b8)]();_0x925fbb[_0x4db2f0(0x24c)](_0x440d43,_0x47c7d6),_0x925fbb[_0x4db2f0(0x183)](0x0,0x0,_0x440d43,_0x21b847,_0x3fb1fc,_0x25bb1e,!![]),_0x925fbb['fillRect'](0x0,_0x21b847,_0x440d43,_0x47c7d6-_0x21b847*0x2,_0x25bb1e),_0x925fbb[_0x4db2f0(0x183)](0x0,_0x47c7d6-_0x21b847,_0x440d43,_0x21b847,_0x25bb1e,_0x3fb1fc,!![]),this[_0x4db2f0(0x716)][_0x4db2f0(0x140)](0x0,0x0,_0x440d43,_0x47c7d6);}},Game_Actor[_0x33ad8c(0x116)][_0x33ad8c(0x7e4)]=function(){const _0x4e4158=_0x33ad8c;for(let _0x155003=0x0;_0x155003<this[_0x4e4158(0x80c)]();_0x155003++){const _0x16acc4=this[_0x4e4158(0x99b)]();let _0x463b5d=Number['MIN_SAFE_INTEGER'];this[_0x4e4158(0x9d1)](_0x155003,_0x16acc4[0x0]);for(const _0x1d04a7 of _0x16acc4){const _0x6f1772=_0x1d04a7[_0x4e4158(0x2c3)]();_0x6f1772>_0x463b5d&&(_0x463b5d=_0x6f1772,this['setAction'](_0x155003,_0x1d04a7));}}this['setActionState'](_0x4e4158(0x71f));},Window_BattleItem[_0x33ad8c(0x116)][_0x33ad8c(0x219)]=function(_0x2d6e39){const _0xcb8045=_0x33ad8c;if(BattleManager[_0xcb8045(0x2ff)]()){if(_0xcb8045(0x506)!==_0xcb8045(0x96b))return BattleManager['actor']()['canUse'](_0x2d6e39);else{if(_0x135b65[_0xcb8045(0x4d4)]())_0x46d4d3[_0xcb8045(0x478)](_0x4c2852);}}else{if(_0xcb8045(0x385)==='SMGfL')return Window_ItemList[_0xcb8045(0x116)][_0xcb8045(0x219)][_0xcb8045(0x439)](this,_0x2d6e39);else{if(!this[_0xcb8045(0x7d3)])return;if(!this[_0xcb8045(0x7d3)]['_customModified'])return;this[_0xcb8045(0x7d3)][_0xcb8045(0x186)]&&!this[_0xcb8045(0x9af)][_0xcb8045(0x186)][_0xcb8045(0x910)]&&this['bitmap'][_0xcb8045(0x776)]();}}},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x1b4)]=Scene_Map[_0x33ad8c(0x116)][_0x33ad8c(0x4ce)],Scene_Map[_0x33ad8c(0x116)]['createSpriteset']=function(){const _0x40a38b=_0x33ad8c;VisuMZ['CoreEngine'][_0x40a38b(0x1b4)]['call'](this);const _0x12a453=this[_0x40a38b(0x55c)][_0x40a38b(0x8b7)];if(_0x12a453)this[_0x40a38b(0x5c6)](_0x12a453);},VisuMZ[_0x33ad8c(0x9dd)]['Scene_Battle_createSpritesetFix']=Scene_Battle[_0x33ad8c(0x116)][_0x33ad8c(0x4ce)],Scene_Battle[_0x33ad8c(0x116)][_0x33ad8c(0x4ce)]=function(){const _0x1ab753=_0x33ad8c;VisuMZ[_0x1ab753(0x9dd)]['Scene_Battle_createSpritesetFix'][_0x1ab753(0x439)](this);const _0x4e296f=this['_spriteset'][_0x1ab753(0x8b7)];if(_0x4e296f)this[_0x1ab753(0x5c6)](_0x4e296f);},Sprite_Actor[_0x33ad8c(0x116)]['update']=function(){const _0x1078bf=_0x33ad8c;Sprite_Battler[_0x1078bf(0x116)][_0x1078bf(0x88b)][_0x1078bf(0x439)](this),this['updateShadow']();if(this[_0x1078bf(0x6bf)])this[_0x1078bf(0x177)]();else{if(this[_0x1078bf(0x575)]!==''){if('DDkyV'!==_0x1078bf(0x79e)){if(_0x5286de[_0x1078bf(0x949)](_0x5ef9c8[_0x1078bf(0x1fe)]()))return!![];}else this[_0x1078bf(0x575)]='';}}},Window[_0x33ad8c(0x116)]['_refreshArrows']=function(){const _0x37c851=_0x33ad8c,_0x443dd0=this[_0x37c851(0x8a3)],_0x54d8ad=this[_0x37c851(0x33f)],_0x28812f=0x18,_0x3a59f0=_0x28812f/0x2,_0xb3313b=0x60+_0x28812f,_0x543476=0x0+_0x28812f;this[_0x37c851(0x495)][_0x37c851(0x7d3)]=this[_0x37c851(0x641)],this[_0x37c851(0x495)][_0x37c851(0x968)]['x']=0.5,this['_downArrowSprite']['anchor']['y']=0.5,this[_0x37c851(0x495)][_0x37c851(0x140)](_0xb3313b+_0x3a59f0,_0x543476+_0x3a59f0+_0x28812f,_0x28812f,_0x3a59f0),this[_0x37c851(0x495)]['move'](Math[_0x37c851(0x758)](_0x443dd0/0x2),Math[_0x37c851(0x758)](_0x54d8ad-_0x3a59f0)),this[_0x37c851(0x5b8)]['bitmap']=this['_windowskin'],this[_0x37c851(0x5b8)][_0x37c851(0x968)]['x']=0.5,this['_upArrowSprite'][_0x37c851(0x968)]['y']=0.5,this[_0x37c851(0x5b8)]['setFrame'](_0xb3313b+_0x3a59f0,_0x543476,_0x28812f,_0x3a59f0),this[_0x37c851(0x5b8)][_0x37c851(0x7b9)](Math[_0x37c851(0x758)](_0x443dd0/0x2),Math['round'](_0x3a59f0));},Window['prototype'][_0x33ad8c(0x866)]=function(){const _0x1a89b7=_0x33ad8c,_0x43df1a=0x90,_0x2a7839=0x60,_0x9df045=0x18;this[_0x1a89b7(0x486)]['bitmap']=this['_windowskin'],this[_0x1a89b7(0x486)]['anchor']['x']=0.5,this[_0x1a89b7(0x486)]['anchor']['y']=0x1,this[_0x1a89b7(0x486)][_0x1a89b7(0x7b9)](Math['round'](this['_width']/0x2),this[_0x1a89b7(0x33f)]),this['_pauseSignSprite'][_0x1a89b7(0x140)](_0x43df1a,_0x2a7839,_0x9df045,_0x9df045),this[_0x1a89b7(0x486)][_0x1a89b7(0x5e1)]=0xff;},Window['prototype'][_0x33ad8c(0x1de)]=function(){const _0x907c5c=_0x33ad8c,_0x1cdfef=this[_0x907c5c(0x303)][_0x907c5c(0x816)]['apply'](new Point(0x0,0x0)),_0x2c9eba=this[_0x907c5c(0x303)][_0x907c5c(0x5bd)];_0x2c9eba['x']=_0x1cdfef['x']+this[_0x907c5c(0x4e6)]['x'],_0x2c9eba['y']=_0x1cdfef['y']+this[_0x907c5c(0x4e6)]['y'],_0x2c9eba[_0x907c5c(0x483)]=Math['ceil'](this[_0x907c5c(0x369)]*this[_0x907c5c(0x17d)]['x']),_0x2c9eba['height']=Math[_0x907c5c(0x5c7)](this['innerHeight']*this[_0x907c5c(0x17d)]['y']);},Window[_0x33ad8c(0x116)][_0x33ad8c(0x600)]=function(){const _0x2e5e5d=_0x33ad8c,_0x206cb3=this[_0x2e5e5d(0x907)],_0x2cf9b8=Math[_0x2e5e5d(0x3f1)](0x0,this[_0x2e5e5d(0x8a3)]-_0x206cb3*0x2),_0x2bfbf4=Math[_0x2e5e5d(0x3f1)](0x0,this[_0x2e5e5d(0x33f)]-_0x206cb3*0x2),_0x159315=this[_0x2e5e5d(0x5f9)],_0x2e9629=_0x159315[_0x2e5e5d(0x63a)][0x0];_0x159315[_0x2e5e5d(0x7d3)]=this[_0x2e5e5d(0x641)],_0x159315[_0x2e5e5d(0x140)](0x0,0x0,0x60,0x60),_0x159315[_0x2e5e5d(0x7b9)](_0x206cb3,_0x206cb3),_0x159315[_0x2e5e5d(0x17d)]['x']=_0x2cf9b8/0x60,_0x159315[_0x2e5e5d(0x17d)]['y']=_0x2bfbf4/0x60,_0x2e9629[_0x2e5e5d(0x7d3)]=this[_0x2e5e5d(0x641)],_0x2e9629[_0x2e5e5d(0x140)](0x0,0x60,0x60,0x60),_0x2e9629['move'](0x0,0x0,_0x2cf9b8,_0x2bfbf4),_0x2e9629[_0x2e5e5d(0x17d)]['x']=0x1/_0x159315[_0x2e5e5d(0x17d)]['x'],_0x2e9629[_0x2e5e5d(0x17d)]['y']=0x1/_0x159315[_0x2e5e5d(0x17d)]['y'],_0x159315[_0x2e5e5d(0x4ef)](this[_0x2e5e5d(0x81e)]);},Game_Temp['prototype'][_0x33ad8c(0x178)]=function(){const _0x334d4b=_0x33ad8c;this[_0x334d4b(0x317)]=[],this[_0x334d4b(0x66f)]=[],this[_0x334d4b(0x871)]=[],this[_0x334d4b(0x762)]=[];},VisuMZ['CoreEngine'][_0x33ad8c(0x829)]=Scene_Base[_0x33ad8c(0x116)]['terminate'],Scene_Base['prototype'][_0x33ad8c(0x3ca)]=function(){const _0x498a57=_0x33ad8c;if($gameTemp)$gameTemp['sceneTerminationClearEffects']();VisuMZ[_0x498a57(0x9dd)][_0x498a57(0x829)]['call'](this);},Bitmap[_0x33ad8c(0x116)]['measureTextWidthNoRounding']=function(_0x4c837c){const _0x5289b9=_0x33ad8c,_0x1c48e1=this[_0x5289b9(0x3c5)];_0x1c48e1[_0x5289b9(0x6de)](),_0x1c48e1[_0x5289b9(0x2b4)]=this[_0x5289b9(0x1a9)]();const _0x440eff=_0x1c48e1[_0x5289b9(0x735)](_0x4c837c)[_0x5289b9(0x483)];return _0x1c48e1['restore'](),_0x440eff;},Window_Message['prototype'][_0x33ad8c(0xa2b)]=function(_0x522923){const _0xcee710=_0x33ad8c;if(this['useFontWidthFix']()){if(_0xcee710(0xa03)===_0xcee710(0xa03))return this[_0xcee710(0x5c3)][_0xcee710(0x21d)](_0x522923);else{this['contents'][_0xcee710(0x42c)]();const _0x57f888=_0x158953['_pictureCoordinatesMode'],_0x2981f7=_0x573e39[_0xcee710(0x7f3)](_0x57f888);if(!_0x2981f7)return;this['_lastOrigin']=_0x2981f7[_0xcee710(0x1ff)],this[_0xcee710(0x793)]=_0x2981f7['_x'],this['_lastY']=_0x2981f7['_y'];const _0x473e1c=_0x198148[_0xcee710(0x887)]();this[_0xcee710(0x5c3)][_0xcee710(0x379)](0x0,0x0,this[_0xcee710(0x369)],this['innerHeight'],_0x473e1c);const _0x1c5d62='\x20Origin:\x20%1'[_0xcee710(0x3e7)](_0x2981f7[_0xcee710(0x1ff)]===0x0?'Upper\x20Left':_0xcee710(0x9b9)),_0x1b1ba0=_0xcee710(0x548)[_0xcee710(0x3e7)](_0x2981f7['_x']),_0x5e33bf=_0xcee710(0x30f)[_0xcee710(0x3e7)](_0x2981f7['_y']),_0x58b228='%1:\x20Exit\x20'['format'](_0xf90dac[_0xcee710(0xa26)](_0xcee710(0x583)));let _0x2ed4ec=_0xc8ee6c[_0xcee710(0x701)](this[_0xcee710(0x369)]/0x4);this[_0xcee710(0x2ef)](_0x1c5d62,_0x2ed4ec*0x0,0x0,_0x2ed4ec),this[_0xcee710(0x2ef)](_0x1b1ba0,_0x2ed4ec*0x1,0x0,_0x2ed4ec,_0xcee710(0x9fa)),this[_0xcee710(0x2ef)](_0x5e33bf,_0x2ed4ec*0x2,0x0,_0x2ed4ec,_0xcee710(0x9fa));const _0x30be00=this['textSizeEx'](_0x58b228)['width'],_0x113667=this[_0xcee710(0x369)]-_0x30be00;this[_0xcee710(0x81b)](_0x58b228,_0x113667,0x0,_0x30be00);}}else return Window_Base[_0xcee710(0x116)][_0xcee710(0xa2b)][_0xcee710(0x439)](this,_0x522923);},Window_Message[_0x33ad8c(0x116)]['useFontWidthFix']=function(){const _0x218c33=_0x33ad8c;return VisuMZ[_0x218c33(0x9dd)][_0x218c33(0x828)]['QoL'][_0x218c33(0x2ba)]??!![];},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x9d6)]=Game_Action[_0x33ad8c(0x116)][_0x33ad8c(0x794)],Game_Action[_0x33ad8c(0x116)][_0x33ad8c(0x794)]=function(){const _0x14112b=_0x33ad8c;if(this[_0x14112b(0x11c)]()){if(_0x14112b(0x25b)!==_0x14112b(0x905))return VisuMZ[_0x14112b(0x9dd)][_0x14112b(0x9d6)][_0x14112b(0x439)](this);else this[_0x14112b(0x39e)]=_0x14112b(0x9b0);}else return 0x0;},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x97d)]=Game_Action['prototype']['setAttack'],Game_Action[_0x33ad8c(0x116)]['setAttack']=function(){const _0x226cdb=_0x33ad8c;if(this[_0x226cdb(0x146)]()&&this[_0x226cdb(0x146)]()[_0x226cdb(0x87d)]()){if(_0x226cdb(0x7c8)===_0x226cdb(0x7c8))VisuMZ[_0x226cdb(0x9dd)][_0x226cdb(0x97d)]['call'](this);else return _0x1eb6c4[_0x226cdb(0x6c7)][_0x226cdb(0x937)][_0x226cdb(0x439)](this);}else this['clear']();},Sprite_Name[_0x33ad8c(0x116)][_0x33ad8c(0x61f)]=function(){return 0x24;},Sprite_Name['prototype']['redraw']=function(){const _0x4e4b6e=_0x33ad8c,_0x39fb8f=this[_0x4e4b6e(0x62a)](),_0x29f03b=this['bitmapWidth'](),_0x360fb9=this[_0x4e4b6e(0x61f)]();this['setupFont'](),this[_0x4e4b6e(0x7d3)]['clear'](),this[_0x4e4b6e(0x7d3)]['drawTextTopAligned'](_0x39fb8f,0x4,0x0,_0x29f03b-0xa,_0x360fb9,_0x4e4b6e(0x278));},Bitmap['prototype'][_0x33ad8c(0x1b7)]=function(_0x5bab8a,_0x5b22b4,_0x3b6e45,_0xd4d34a,_0x46cc73,_0x3c8590){const _0x1489d5=_0x33ad8c,_0x3ebf5c=this['context'],_0x38bfdf=_0x3ebf5c[_0x1489d5(0x9a4)];_0xd4d34a=_0xd4d34a||0xffffffff;let _0x2cc20c=_0x5b22b4,_0x52dfbc=Math[_0x1489d5(0x758)](_0x3b6e45+0x18/0x2+this[_0x1489d5(0x1e9)]*0.35);_0x3c8590===_0x1489d5(0x9fa)&&(_0x1489d5(0x8df)!==_0x1489d5(0x8df)?this['_sideButtonLayout']=_0x17470d:_0x2cc20c+=_0xd4d34a/0x2),_0x3c8590===_0x1489d5(0x513)&&(_0x2cc20c+=_0xd4d34a),_0x3ebf5c[_0x1489d5(0x6de)](),_0x3ebf5c['font']=this[_0x1489d5(0x1a9)](),_0x3ebf5c['textAlign']=_0x3c8590,_0x3ebf5c[_0x1489d5(0x796)]=_0x1489d5(0x8d4),_0x3ebf5c['globalAlpha']=0x1,this['_drawTextOutline'](_0x5bab8a,_0x2cc20c,_0x52dfbc,_0xd4d34a),_0x3ebf5c[_0x1489d5(0x9a4)]=_0x38bfdf,this[_0x1489d5(0xa10)](_0x5bab8a,_0x2cc20c,_0x52dfbc,_0xd4d34a),_0x3ebf5c[_0x1489d5(0x951)](),this[_0x1489d5(0x186)]['update']();},VisuMZ[_0x33ad8c(0x9dd)][_0x33ad8c(0x182)]=BattleManager[_0x33ad8c(0x930)],BattleManager[_0x33ad8c(0x930)]=function(_0x5bd360){const _0x44fc40=_0x33ad8c;if(this[_0x44fc40(0x586)][_0x44fc40(0x35e)]())return![];return VisuMZ[_0x44fc40(0x9dd)][_0x44fc40(0x182)]['call'](this,_0x5bd360);},BattleManager['endAction']=function(){const _0x338dc4=_0x33ad8c;if(this[_0x338dc4(0x4cc)])this['_logWindow'][_0x338dc4(0x185)](this[_0x338dc4(0x4cc)]);this[_0x338dc4(0xfb)]=_0x338dc4(0x5be),this[_0x338dc4(0x4cc)]&&this[_0x338dc4(0x4cc)]['numActions']()===0x0&&(this[_0x338dc4(0x142)](this[_0x338dc4(0x4cc)]),this[_0x338dc4(0x4cc)]=null);},Bitmap[_0x33ad8c(0x116)]['_startLoading']=function(){const _0x5c9a0a=_0x33ad8c;this['_image']=new Image(),this['_image']['onload']=this[_0x5c9a0a(0x76c)]['bind'](this),this[_0x5c9a0a(0x718)][_0x5c9a0a(0x7ef)]=this[_0x5c9a0a(0x99e)][_0x5c9a0a(0x404)](this),this[_0x5c9a0a(0x8ca)](),this[_0x5c9a0a(0x93e)]=_0x5c9a0a(0x243);if(Utils[_0x5c9a0a(0x869)]()){if(_0x5c9a0a(0x525)!=='OdNFp'){if(_0x129359[_0x5c9a0a(0x616)]()&&this['isTouchedInsideFrame']())this[_0x5c9a0a(0x4b2)](_0x5c9a0a(0x5f7));else _0x4abd9c[_0x5c9a0a(0x4b3)]()&&this[_0x5c9a0a(0x4b2)](_0x5c9a0a(0x5f7));}else this[_0x5c9a0a(0x5b1)]();}else{if(_0x5c9a0a(0x557)===_0x5c9a0a(0x1ee)){let _0x58df93=_0x1b24e3[_0x5c9a0a(0x3f1)](0x0,this[_0x5c9a0a(0x908)]());const _0x13911c=this[_0x5c9a0a(0x9f7)](),_0x14d3e9=this['maxCols']();if(this[_0x5c9a0a(0x558)]()&&_0x58df93>0x0||_0xa44e94&&_0x14d3e9===0x1){_0x58df93-=_0x14d3e9;if(_0x58df93<=0x0)_0x58df93=0x0;this[_0x5c9a0a(0x669)](_0x58df93);}else!this[_0x5c9a0a(0x558)]()&&((_0x58df93>=_0x14d3e9||_0xda1dd3&&_0x14d3e9===0x1)&&this[_0x5c9a0a(0x669)]((_0x58df93-_0x14d3e9+_0x13911c)%_0x13911c));}else this[_0x5c9a0a(0x718)][_0x5c9a0a(0x519)]=this['_url'],![]&&this['_image'][_0x5c9a0a(0x483)]>0x0&&(this['_image']['onload']=null,this['_onLoad']());}},Scene_Skill[_0x33ad8c(0x116)][_0x33ad8c(0x5a6)]=function(){const _0x19602e=_0x33ad8c;Scene_MenuBase[_0x19602e(0x116)]['onActorChange']['call'](this),this[_0x19602e(0x6ea)](),this[_0x19602e(0x60c)][_0x19602e(0x2b3)](),this['_itemWindow']['deselect'](),this[_0x19602e(0x3e5)][_0x19602e(0x2bf)]();},Scene_Skill[_0x33ad8c(0x116)][_0x33ad8c(0x462)]=function(){const _0x10c26e=_0x33ad8c;return this[_0x10c26e(0x3e5)]&&this['_skillTypeWindow']['active'];},Game_Map[_0x33ad8c(0x116)][_0x33ad8c(0x67c)]=function(_0x59199f,_0x2e3813,_0x35a8ed){const _0x304972=_0x33ad8c,_0x3e63fa=this['tilesetFlags'](),_0x4000e4=this[_0x304972(0x5c8)](_0x59199f,_0x2e3813);for(const _0xdcd726 of _0x4000e4){if('VNatb'==='uViPl')return'';else{const _0x5a6846=_0x3e63fa[_0xdcd726];if(_0x5a6846===undefined||_0x5a6846===null){if($gameTemp['isPlaytest']()&&!DataManager[_0x304972(0x94c)]()){if('rdNoS'==='rdNoS'){let _0x2af9ef=_0x304972(0x38f)+'\x0a';_0x2af9ef+='Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages'+'\x0a',_0x2af9ef+=_0x304972(0x72f),this[_0x304972(0x729)]()?_0x304972(0x51d)===_0x304972(0x51d)?(alert(_0x2af9ef),SceneManager['exit']()):this['_coreEasingType']=_0x33445f:(console[_0x304972(0x478)](_0x2af9ef),!$gameTemp[_0x304972(0x6bd)]&&($gameTemp[_0x304972(0x6bd)]=!![],SceneManager[_0x304972(0x1a0)]()));}else this[_0x304972(0x39e)]=_0x304972(0x59c);}}if((_0x5a6846&0x10)!==0x0)continue;if((_0x5a6846&_0x35a8ed)===0x0)return _0x304972(0x752)===_0x304972(0x184)?_0x5af1fc[_0x304972(0x6c7)][_0x304972(0x5d5)][_0x304972(0x439)](this):!![];if((_0x5a6846&_0x35a8ed)===_0x35a8ed)return![];}}return![];},Game_Map[_0x33ad8c(0x116)][_0x33ad8c(0x729)]=function(){const _0x25baad=_0x33ad8c;if(Imported['VisuMZ_3_EventChainReact'])return!![];if(Imported[_0x25baad(0x35d)])return!![];return![];},Sprite_Animation[_0x33ad8c(0x116)][_0x33ad8c(0x747)]=function(_0xa1c30d){const _0x4ec8ee=_0x33ad8c;!this[_0x4ec8ee(0x68b)]&&(this[_0x4ec8ee(0x68b)]=_0xa1c30d['gl'][_0x4ec8ee(0x138)](_0xa1c30d['gl'][_0x4ec8ee(0x6b3)]));};