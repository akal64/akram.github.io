//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.45;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.45] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 * Word Wrap also cannot be used together with <left>, <center>, or <right> and
 * will disable itself if text alignment text codes are detected.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Next Page>          Ends the current message page at this line. This is
 *                      used for messages when rows are at 5 or above and the
 *                      message lines don't match the amount. This is used to
 *                      prevent grabbing message windows from following message
 *                      events. Any lines following <Next Page> in the same
 *                      message event will be ignored.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 * 
 * <Choice Width: x>              Sets the minimum text area width to x.
 *                                Applies to whole choice window.
 * <Choice Indent: x>             Sets the indent to x value. Applies to
 *                                current choice selection only.
 * 
 * <BgColor: x>                   Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' text color. This
 *                                will be combined with a fading
 * <BgColor: x,y>                 Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' to 'y' gradient
 *                                text color.
 * <BgColor: #rrggbb>             Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' color using
 *                                hex color values.
 * <BgColor: #rrggbb, #rrggbb>    Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' gradient
 *                                using hex color values.
 * 
 * <Help> text </Help>            Makes a help window appear and have it show
 *                                'text' in its contents. The help window will
 *                                disappear if no text is displayed.
 * 
 * <Shuffle>                      Shuffles the order of all choices. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 * <Shuffle: x>                   Shuffles the order of all choices and only
 *                                x number of them will appear. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 *                                Hidden choices do not count towards x number.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * <Offset: +x, +y>                  Quickly adjust the message window offset
 * <Offset: -x, -y>                  values to the x and y amounts. The values
 * <Offset: +x, -y>                  will replace the previous offset settings
 * <Offset: -x, +y>                  if there were any.
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Requires VisuMZ_0_CoreEngine)
 * ------------------   -------------------------------------------------------
 * <Up Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Left Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Right Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Down Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * <Ok Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Cancel Button>      Display's VisuMZ_0_CoreEngine's button assist text.
 * <Shift Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Menu Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Up Button>     Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Down Button>   Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * ---
 * 
 * === Random Text Pool ===
 * 
 * <RNG> text1 | text2 | text3 </RNG>
 * 
 * Using the above text code format in a Show Message entry, you can get a
 * random result out of the various inserted texts. Use "|" (without quotes) as
 * a separator between text entries. You can have unlimited entries. The result
 * will have any excess white space trimmed.
 * 
 * This text code cannot be inserted into a macro and parsed properly.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * Message: X/Y Offsets
 * - Change the X and Y Offsets of the Message Window.
 * - The offset value(s) will be saved and stored.
 * 
 *   Offset X:
 *   - Offset Message Window horizontally.
 *   - Negative: Left; Positive: Right
 *   - Message Window coordinates are still restricted via clamping.
 * 
 *   Offset Y:
 *   - Offset Message Window vertically.
 *   - Negative: Up; Positive: Down
 *   - Message Window coordinates are still restricted via clamping.
 * 
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 * 
 * === Select Plugin Commands ===
 * 
 * ---
 * 
 * Select: Weapon
 * - Opens the Event Select Item Window to let the player pick a weapon to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected weapon.
 *   - It will result in 0 otherwise.
 * 
 *   Weapon Type ID:
 *   - Reduce all the weapons to a specific weapon type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Armor
 * - Opens the Event Select Item Window to let the player pick an armor to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected armor.
 *   - It will result in 0 otherwise.
 * 
 *   Armor Type ID:
 *   - Reduce all the armors to a specific armor type.
 *   - Leave at 0 to not use filters.
 * 
 *   Equip Type ID:
 *   - Reduce all the armors to a specific equip type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Skill
 * - Opens the Event Select Item Window to let the player pick a skill to
 *   choose from.
 * - Requires VisuMZ_1_SkillsStatesCore!
 * - Can be opened while the Message Window is open.
 * - Skills will not be listed if they are hidden by the actor.
 * - Skills will not be listed if the actor lacks access to their Skill Type.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected skill.
 *   - It will result in 0 otherwise.
 * 
 *   Actor ID:
 *   - Select an actor to get the skill list from.
 *   - Use 0 to select from the party leader.
 * 
 *   Skill Type ID:
 *   - Reduce all the skills to a specific skill type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Change Text
 * - Change text for target picture(s) to show.
 * - You may use text codes.
 * - Text will adapt to picture's properties.
 * - Settings will be erased if picture is erased.
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to set text to.
 * 
 *   Padding:
 *   - How much padding from the sides should there be?
 * 
 *   Text:
 * 
 *     Upper Left:
 *     Upper Center:
 *     Upper Right:
 *     Middle Left:
 *     Middle Center:
 *     Middle Right:
 *     Lower Left:
 *     Lower Center:
 *     Lower Right:
 *     - The text that's aligned to this picture's side.
 *     - You may use text codes.
 * 
 * ---
 * 
 * Picture: Erase Text
 * - Erase all text for target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to erase text for.
 * 
 * ---
 * 
 * Picture: Refresh Text
 * - Refreshes the text used for all on-screen pictures.
 * - To be used if any dynamic text codes are updated like \n[x].
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset Message Window horizontally or vertically.
 *   - Horizontal: Left; Positive: Right
 *   - Veritcal: Negative: Up; Positive: Down
 * 
 *   Stretch Dimmed BG:
 *   - Stretch dimmed window background to fit the whole screen.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 * 
 *   Each Message Start:
 *   Each Message End:
 *   - This is text that is added at the start/end of each message.
 *   - You may use text codes.
 *   - Keep in mind that if a message extends to a different page (due to word
 *     wrap, excess lines, etc), that does not mean the starting text will
 *     be added to where the next page begins or the ending text will be added
 *     where the previous page ends.
 *   - Can be used for things like adding "<center>" to the start of each 
 *     message without having to type it every time.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 * 
 * Word wrap only supports left-to-right alphabetical languages that utilize
 * spaces.
 * 
 * Word Wrap also cannot be used together with <left>, <center>, or <right> and
 * will disable itself if text alignment text codes are detected.
 * 
 * As of the v1.44 update, some Asian languages such as Chinese and Japanese
 * are now supported for word wrap. Korean language is only supported if spaces
 * are used.
 * 
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
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
 * Version 1.45: December 14, 2023
 * * Bug Fixes!
 * ** Punctuation was, for some reason, excluded when using Wordwrap with
 *    Japanese and Chinese languages. This should be fixed now. Fixed by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added clarity to the <left>, <center>, and <right> being unable to be
 *    used together with word wrap.
 * *** Word Wrap also cannot be used together with <left>, <center>, or <right>
 *     and will disable itself if text alignment text codes are detected.
 * * Feature Update!
 * ** Wordwrap <br> now works properly with Japanese and Chinese languages.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > General Settings > Each Message Start
 * *** Plugin Parameters > General Settings > Each Message End
 * **** This is text that is added at the start/end of each message.
 * **** Keep in mind that if a message extends to a different page (due to word
 *      wrap, excess lines, etc), that does not mean the starting text will
 *      be added to where the next page begins or the ending text will be added
 *      where the previous page ends.
 * **** Can be used for things like adding "<center>" to the start of each 
 *      message without having to type it every time.
 * 
 * Version 1.44: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated "Plugin Parameters: Word Wrap Settings" section:
 * *** As of the v1.44 update, some Asian languages such as Chinese and
 *     Japanese are now supported for word wrap. Korean language is only
 *     supported if spaces are used.
 * * Feature Update!
 * ** Word Wrap is now supported for Japanese and Chinese languages.
 * ** Feature updated by Irina and sponsored by AndyL.
 * * New Features!
 * ** New text codes added by Irina for "Show Choices" event command.
 * *** <Shuffle>
 * **** Shuffles the order of all choices. Any cancel shortcuts other than
 *      "Branch" will be undone.
 * *** <Shuffle: x>
 * **** Shuffles the order of all choices and only x number of them appear. Any
 *      cancel shortcuts other than "Branch" will be undone. Hidden choices do
 *      not count towards x number.
 * 
 * Version 1.43: April 13, 2023
 * * Compatibility Update!
 * ** Fixed incompatibilities with auto message positioning with the Map Zoom
 *    plugin. Update made by Irina.
 * 
 * Version 1.42: March 16, 2023
 * * Bug Fixes!
 * ** Fixed some text codes that would capture way too much data than intended.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text code added by Irina for Show Choice Window only:
 * *** <Help> text </Help>
 * **** Makes a help window appear and have it show 'text' in its contents.
 * **** The help window will disappear if no text is displayed.
 * ** New Plugin Commands added by Arisu:
 * *** Select: Weapon
 * *** Select: Armor
 * *** Select: Skill
 * **** Opens the Event Select Item Window to let the player pick a weapon,
 *      armor, or skill to choose from. The selected object will have its ID
 *      recorded in a variable. These can be opened while the Message Window is
 *      opened just like the event "Select Item".
 * 
 * Version 1.41: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text codes added by Irina!
 * *** For the Choice Window Only text codes:
 * **** <BgColor: x>
 * **** <BgColor: x, y>
 * **** <BgColor: #rrggbb>
 * **** <BgColor: #rrggbb, #rrggbb>
 * ***** Requires VisuMZ_0_CoreEngine! Sets the background color of this choice
 *       to 'x' text color, 'x' to 'y' gradient text color, or using '#rrggbb'
 *       hex color values.
 * 
 * Version 1.40: November 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New text code added by Irina:
 * *** <RNG> text1 | text2 | text3 </RNG>
 * **** Using the above text code format in a Show Message entry, you can get a
 *      random result out of the various inserted texts. Use "|" (without
 *      quotes) as a separator between text entries. You can have unlimited
 *      entries. The result will have any excess white space trimmed.
 * **** This text code cannot be inserted into a macro and parsed properly.
 * 
 * Version 1.39: September 22, 2022
 * * Bug Fixes!
 * ** Macros now support quotes (' and ") in the STR: Text. Fix made by Irina.
 * 
 * Version 1.38: July 21, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.37: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Picture texts with \v[x] text codes are now updated automatically.
 * ** This is the only dynamic text code that updates this way for optimization
 *    purposes and to prevent overabundant CPU usage.
 * ** Everything else will require the new Plugin Command.
 * * New Features!
 * ** New Plugin Command added by Irina:
 * *** Picture: Refresh Text
 * **** Refreshes the text used for all on-screen pictures.
 * **** To be used if any dynamic text codes are updated like \n[x].
 * * New Features!
 * ** New text codes added by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** <Up Button>, <Left Button>, <Right Button>, <Down Button>
 * *** <Ok Button>, <Cancel Button>, <Shift Button>, <Menu Button>
 * *** <Page Up Button>, <Page Down Button>
 * **** Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * Version 1.36: April 7, 2022
 * * Feature Update!
 * ** Auto size related text codes should now automatically disable word wrap
 *    effects as they should have before. Update made by Irina.
 * 
 * Version 1.35: March 31, 2022
 * * Bug Fixes!
 * ** Bug fixed where if autosizing is used and it goes from a message that is
 *    shorter to longer, an extra key press is needed. This should no longer be
 *    the case. Fix made by Irina.
 * 
 * Version 1.34: February 24, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Choice Window Text Codes made by Irina and sponsored by AndyL:
 * *** <Choice Width: x>
 * **** Sets the minimum text area width to x. Applies to whole choice window.
 * *** <Choice Indent: x>
 * **** Sets the indent to x value. Applies to current choice selection only.
 * 
 * Version 1.33: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Picture: Change Text
 * **** This new plugin command allows you to place text on top of pictures
 *      (usually in the form of empty pages or cards) to function as stationary
 *      or other uses. Text codes are allowed.
 * **** Text codes are supported.
 * *** Picture: Erase Text
 * **** Removes text from target picture(s).
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Extra Show Choice notetags will now be properly hidden. Fix by Irina.
 * * Compatibility Update!
 * ** Self Switches are now made compatible with work with Show Choices. Update
 *    made by Irina.
 * 
 * Version 1.31: December 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New hard-coded message-only text code added by Irina:
 * *** <Next Page>
 * **** Ends the current message page at this line. This is used for messages
 *      when rows are at 5 or above and the message lines don't match the
 *      amount. This is used to prevent grabbing message windows from following
 *      message events. Any lines following <Next Page> in the same message
 *      event will be ignored.
 * 
 * Version 1.30: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for removed "Center Window X" bit.
 * * Feature Update!
 * ** Message: Properties now has "Center Window X?" removed
 * *** Changes will now be automatically centered.
 * *** This change is made for the new Plugin Command added for offsets which
 *     more or less replaces them.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Puddor:
 * *** Message: X/Y Offsets
 * **** Change the X and Y Offsets of the Message Window.
 * **** The offset value(s) will be saved and stored.
 * ** New Plugin Parameters added by Irina and sponsored by Puddor:
 * *** Plugin Parameters > General Settings > Message Window > Offset X
 * *** Plugin Parameters > General Settings > Message Window > Offset Y
 * **** Allows you to offset the horizontal and/or vertical positions of the
 *      message window accordingly.
 * ** New Text Codes added by Irina and sponsored by Puddor:
 * *** <Offset: +x, +y>
 * *** <Offset: -x, -y>
 * *** <Offset: +x, -y>
 * *** <Offset: -x, +y>
 * **** Quickly adjust the message window offset values to the x and y amounts.
 *      The values will replace the previous offset settings if there were any.
 * 
 * Version 1.29: October 21, 2021
 * * Feature Update
 * ** Word Wrap flags are now properly adjusted when converting macros and
 *    adding bypasses towards regular messages. Update by Irina.
 * 
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowXyOffsets
 * @text Message: X/Y Offsets
 * @desc Change the X and Y Offsets of the Message Window.
 * The offset value(s) will be saved and stored.
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Choice
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Select
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectWeapon
 * @text Select: Weapon
 * @desc Opens the Event Select Item Window to let the player
 * pick a weapon to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected weapon. It will result in 0 otherwise.
 * @default 1
 *
 * @arg WeaponTypeID:num
 * @text Weapon Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the weapons to a specific weapon type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectArmor
 * @text Select: Armor
 * @desc Opens the Event Select Item Window to let the player
 * pick an armor to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected armor. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ArmorTypeID:num
 * @text Armor Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific armor type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @arg EquipTypeID:num
 * @text Equip Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific equip type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectSkill
 * @text Select: Skill
 * @desc Opens the Event Select Item Window to let the player
 * pick a skill to choose from. Requires VisuMZ_1_SkillsStatesCore!
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected skill. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select an actor to get the skill list from.
 * Use 0 to select from the party leader.
 * @default 0
 *
 * @arg SkillTypeID:num
 * @text Skill Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the skills to a specific skill type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextChange
 * @text Picture: Change Text
 * @desc Change text for target picture(s) to show.
 * You may use text codes.
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to set text to.
 * @default ["1"]
 *
 * @arg Padding:eval
 * @text Padding
 * @parent PictureIDs:arraynum
 * @desc How much padding from the sides should there be?
 * @default $gameSystem.windowPadding()
 * 
 * @arg Text
 *
 * @arg upperleft:json
 * @text Upper Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg up:json
 * @text Upper Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg upperright:json
 * @text Upper Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg left:json
 * @text Middle Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg center:json
 * @text Middle Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg right:json
 * @text Middle Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerleft:json
 * @text Lower Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg down:json
 * @text Lower Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerright:json
 * @text Lower Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextErase
 * @text Picture: Erase Text
 * @desc Erase all text for target picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to erase text for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextRefresh
 * @text Picture: Refresh Text
 * @desc Refreshes the text used for all on-screen pictures.
 * To be used if any dynamic text codes are updated like \n[x].
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
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjIcon\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectIcon();\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Code Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * Format style: [MacroName]
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @parent MessageWindow
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @parent MessageWindow
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param EachMessageStart:json
 * @text Each Message Start
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the start of each message.
 * You may use text codes.
 * @default ""
 *
 * @param EachMessageEnd:json
 * @text Each Message End
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the end of each message.
 * You may use text codes.
 * @default ""
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

const _0x2c555d=_0x1de7;(function(_0x19ece2,_0x36daa3){const _0x28c131=_0x1de7,_0x1a1567=_0x19ece2();while(!![]){try{const _0x2381c2=-parseInt(_0x28c131(0x15b))/0x1*(parseInt(_0x28c131(0x11c))/0x2)+parseInt(_0x28c131(0x27b))/0x3+-parseInt(_0x28c131(0x34f))/0x4+parseInt(_0x28c131(0x2c3))/0x5+-parseInt(_0x28c131(0x2d3))/0x6*(-parseInt(_0x28c131(0x1eb))/0x7)+parseInt(_0x28c131(0x16c))/0x8+-parseInt(_0x28c131(0x13b))/0x9*(parseInt(_0x28c131(0x285))/0xa);if(_0x2381c2===_0x36daa3)break;else _0x1a1567['push'](_0x1a1567['shift']());}catch(_0x553bf4){_0x1a1567['push'](_0x1a1567['shift']());}}}(_0x48ac,0x59340));var label=_0x2c555d(0x245),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x3e3036){const _0x3acf39=_0x2c555d;return _0x3e3036[_0x3acf39(0x2c8)]&&_0x3e3036[_0x3acf39(0x3c8)][_0x3acf39(0x1f1)]('['+label+']');})[0x0];VisuMZ[label][_0x2c555d(0x26a)]=VisuMZ[label][_0x2c555d(0x26a)]||{},VisuMZ[_0x2c555d(0x218)]=function(_0x260a57,_0x1bc088){const _0x15ea60=_0x2c555d;for(const _0x5437e2 in _0x1bc088){if(_0x5437e2[_0x15ea60(0x23e)](/(.*):(.*)/i)){if(_0x15ea60(0x29d)==='jHTFW'){const _0x1e9e6f=String(RegExp['$1']),_0x3a464f=String(RegExp['$2'])[_0x15ea60(0x28a)]()[_0x15ea60(0x116)]();let _0x3effdd,_0x153919,_0x47f415;switch(_0x3a464f){case _0x15ea60(0x325):_0x3effdd=_0x1bc088[_0x5437e2]!==''?Number(_0x1bc088[_0x5437e2]):0x0;break;case _0x15ea60(0xbc):_0x153919=_0x1bc088[_0x5437e2]!==''?JSON[_0x15ea60(0x1a6)](_0x1bc088[_0x5437e2]):[],_0x3effdd=_0x153919[_0x15ea60(0x2c0)](_0x5dc303=>Number(_0x5dc303));break;case _0x15ea60(0xef):_0x3effdd=_0x1bc088[_0x5437e2]!==''?eval(_0x1bc088[_0x5437e2]):null;break;case _0x15ea60(0x12b):_0x153919=_0x1bc088[_0x5437e2]!==''?JSON['parse'](_0x1bc088[_0x5437e2]):[],_0x3effdd=_0x153919[_0x15ea60(0x2c0)](_0x2fc2ad=>eval(_0x2fc2ad));break;case _0x15ea60(0x3d1):_0x3effdd=_0x1bc088[_0x5437e2]!==''?JSON[_0x15ea60(0x1a6)](_0x1bc088[_0x5437e2]):'';break;case'ARRAYJSON':_0x153919=_0x1bc088[_0x5437e2]!==''?JSON[_0x15ea60(0x1a6)](_0x1bc088[_0x5437e2]):[],_0x3effdd=_0x153919[_0x15ea60(0x2c0)](_0x10df8e=>JSON[_0x15ea60(0x1a6)](_0x10df8e));break;case _0x15ea60(0x1ef):_0x3effdd=_0x1bc088[_0x5437e2]!==''?new Function(JSON[_0x15ea60(0x1a6)](_0x1bc088[_0x5437e2])):new Function(_0x15ea60(0x145));break;case'ARRAYFUNC':_0x153919=_0x1bc088[_0x5437e2]!==''?JSON[_0x15ea60(0x1a6)](_0x1bc088[_0x5437e2]):[],_0x3effdd=_0x153919[_0x15ea60(0x2c0)](_0x32a73b=>new Function(JSON[_0x15ea60(0x1a6)](_0x32a73b)));break;case _0x15ea60(0xf3):_0x3effdd=_0x1bc088[_0x5437e2]!==''?String(_0x1bc088[_0x5437e2]):'';break;case _0x15ea60(0x21e):_0x153919=_0x1bc088[_0x5437e2]!==''?JSON[_0x15ea60(0x1a6)](_0x1bc088[_0x5437e2]):[],_0x3effdd=_0x153919[_0x15ea60(0x2c0)](_0x33d171=>String(_0x33d171));break;case _0x15ea60(0x2fe):_0x47f415=_0x1bc088[_0x5437e2]!==''?JSON[_0x15ea60(0x1a6)](_0x1bc088[_0x5437e2]):{},_0x260a57[_0x1e9e6f]={},VisuMZ['ConvertParams'](_0x260a57[_0x1e9e6f],_0x47f415);continue;case'ARRAYSTRUCT':_0x153919=_0x1bc088[_0x5437e2]!==''?JSON[_0x15ea60(0x1a6)](_0x1bc088[_0x5437e2]):[],_0x3effdd=_0x153919[_0x15ea60(0x2c0)](_0xa96d5e=>VisuMZ[_0x15ea60(0x218)]({},JSON[_0x15ea60(0x1a6)](_0xa96d5e)));break;default:continue;}_0x260a57[_0x1e9e6f]=_0x3effdd;}else{const _0x1c7898=_0x3b3c7f[_0x15ea60(0x88)](',')['map'](_0x22f733=>_0x11e42f(_0x22f733)||0x0);let _0x3964df=_0x1c7898[0x0]||0x0,_0x327d44=_0x1c7898[0x1]||0x0;return _0x64eb53[_0x15ea60(0x206)](_0x3964df,_0x327d44),'';}}}return _0x260a57;},(_0x1b3aa2=>{const _0x778173=_0x2c555d,_0x29e943=_0x1b3aa2[_0x778173(0x322)];for(const _0x20d8a6 of dependencies){if('aSOMp'!==_0x778173(0x190)){const _0x381589=this[_0x778173(0x28e)],_0xc2ceda=_0x381589['y'],_0x41828c=_0x1babb8[_0x778173(0x245)]['Settings'][_0x778173(0x146)][_0x778173(0x291)];_0xc2ceda>this['y']&&_0xc2ceda<this['y']+this[_0x778173(0xab)]-_0x41828c&&(this['y']=_0x381589['y']+_0x381589['height']);}else{if(!Imported[_0x20d8a6]){alert(_0x778173(0xfb)[_0x778173(0x35e)](_0x29e943,_0x20d8a6)),SceneManager[_0x778173(0x1f4)]();break;}}}const _0x46e7e5=_0x1b3aa2[_0x778173(0x3c8)];if(_0x46e7e5['match'](/\[Version[ ](.*?)\]/i)){if(_0x778173(0x197)!=='jzShc'){const _0x3487b1=Number(RegExp['$1']);_0x3487b1!==VisuMZ[label][_0x778173(0x7d)]&&(alert(_0x778173(0x142)['format'](_0x29e943,_0x3487b1)),SceneManager['exit']());}else return![];}if(_0x46e7e5['match'](/\[Tier[ ](\d+)\]/i)){const _0x512b64=Number(RegExp['$1']);if(_0x512b64<tier){if('JtruA'===_0x778173(0x340))return!![];else alert(_0x778173(0xc5)[_0x778173(0x35e)](_0x29e943,_0x512b64,tier)),SceneManager[_0x778173(0x1f4)]();}else tier=Math[_0x778173(0x168)](_0x512b64,tier);}VisuMZ[_0x778173(0x218)](VisuMZ[label][_0x778173(0x26a)],_0x1b3aa2[_0x778173(0x31b)]);})(pluginData),PluginManager[_0x2c555d(0x108)](pluginData['name'],_0x2c555d(0xd2),_0x4769eb=>{const _0x11a876=_0x2c555d;VisuMZ[_0x11a876(0x218)](_0x4769eb,_0x4769eb);const _0x503637=_0x4769eb['LineHeight']||$gameSystem[_0x11a876(0x152)]()||0x1,_0x447d97=_0x4769eb[_0x11a876(0x399)]||$gameSystem['getChoiceListMaxRows']()||0x1,_0x403a9a=_0x4769eb[_0x11a876(0x150)]||$gameSystem['getChoiceListMaxColumns']()||0x1,_0x172f06=_0x4769eb[_0x11a876(0x97)]['toLowerCase']()||_0x11a876(0x287);$gameSystem[_0x11a876(0x241)](_0x503637),$gameSystem[_0x11a876(0x27f)](_0x447d97),$gameSystem['setChoiceListMaxColumns'](_0x403a9a),$gameSystem[_0x11a876(0x1b1)](_0x172f06);}),PluginManager[_0x2c555d(0x108)](pluginData[_0x2c555d(0x322)],_0x2c555d(0x16a),_0x4fcabf=>{const _0x42d3df=_0x2c555d;VisuMZ[_0x42d3df(0x218)](_0x4fcabf,_0x4fcabf);const _0x148eb1=_0x4fcabf[_0x42d3df(0x13e)]||$gameSystem[_0x42d3df(0xe3)]()||0x1,_0x47eaea=_0x4fcabf[_0x42d3df(0x3d7)]||$gameSystem['getMessageWindowWidth']()||0x1;$gameTemp[_0x42d3df(0x34a)]=!![];const _0x4693d9=_0x4fcabf['WordWrap'][_0x42d3df(0x1ad)]();$gameSystem[_0x42d3df(0x305)](_0x148eb1),$gameSystem['setMessageWindowWidth'](_0x47eaea);[_0x42d3df(0x375),_0x42d3df(0xc3)]['includes'](_0x4693d9)&&$gameSystem['setMessageWindowWordWrap'](eval(_0x4693d9));const _0xf4cf61=SceneManager[_0x42d3df(0xa3)]['_messageWindow'];_0xf4cf61&&(_0xf4cf61[_0x42d3df(0x243)](),_0xf4cf61[_0x42d3df(0x3c6)](),_0xf4cf61[_0x42d3df(0x1b8)]());}),PluginManager[_0x2c555d(0x108)](pluginData[_0x2c555d(0x322)],_0x2c555d(0x11d),_0x1e8cd4=>{const _0x45013f=_0x2c555d;VisuMZ[_0x45013f(0x218)](_0x1e8cd4,_0x1e8cd4),$gameSystem['setMessageWindowXyOffsets'](_0x1e8cd4['OffsetX'],_0x1e8cd4['OffsetY']);const _0x25a94c=SceneManager[_0x45013f(0xa3)]['_messageWindow'];_0x25a94c&&(_0x45013f(0x367)===_0x45013f(0x237)?this[_0x45013f(0x1fb)](_0x29f8a5[_0x45013f(0x2c5)]()):(_0x25a94c[_0x45013f(0x243)](),_0x25a94c[_0x45013f(0x3c6)](),_0x25a94c[_0x45013f(0x1b8)]()));}),PluginManager[_0x2c555d(0x108)](pluginData[_0x2c555d(0x322)],_0x2c555d(0x280),_0x1a41c4=>{const _0x5cbb44=_0x2c555d;VisuMZ[_0x5cbb44(0x218)](_0x1a41c4,_0x1a41c4),$gameMessage['setWeaponChoice'](_0x1a41c4['VariableID']||0x0,_0x1a41c4[_0x5cbb44(0x68)]||0x0);const _0x3cfca5=$gameTemp[_0x5cbb44(0x37e)]();if(_0x3cfca5)_0x3cfca5[_0x5cbb44(0x7b)](_0x5cbb44(0x8f));}),PluginManager[_0x2c555d(0x108)](pluginData[_0x2c555d(0x322)],_0x2c555d(0x3d5),_0x5c514f=>{const _0x31ca9a=_0x2c555d;VisuMZ[_0x31ca9a(0x218)](_0x5c514f,_0x5c514f),$gameMessage[_0x31ca9a(0x3b4)](_0x5c514f[_0x31ca9a(0x3a2)]||0x0,_0x5c514f[_0x31ca9a(0x33d)]||0x0,_0x5c514f[_0x31ca9a(0x12d)]||0x0);const _0x4b296b=$gameTemp[_0x31ca9a(0x37e)]();if(_0x4b296b)_0x4b296b[_0x31ca9a(0x7b)]('message');}),PluginManager['registerCommand'](pluginData[_0x2c555d(0x322)],_0x2c555d(0x347),_0x161db1=>{const _0x5c3c0a=_0x2c555d;VisuMZ[_0x5c3c0a(0x218)](_0x161db1,_0x161db1),$gameMessage[_0x5c3c0a(0x256)](_0x161db1['VariableID']||0x0,_0x161db1[_0x5c3c0a(0x278)]||0x0,_0x161db1[_0x5c3c0a(0x303)]||0x0);const _0x221ab3=$gameTemp[_0x5c3c0a(0x37e)]();if(_0x221ab3)_0x221ab3[_0x5c3c0a(0x7b)]('message');}),PluginManager[_0x2c555d(0x108)](pluginData[_0x2c555d(0x322)],_0x2c555d(0x330),_0xca4867=>{const _0x347ab1=_0x2c555d;VisuMZ[_0x347ab1(0x218)](_0xca4867,_0xca4867);const _0x5eddd4=_0xca4867[_0x347ab1(0x337)]||[],_0x150bc8=_0xca4867['Padding']||0x0,_0x34c199=[_0x347ab1(0x129),'up',_0x347ab1(0x23f),_0x347ab1(0x2cb),_0x347ab1(0x23c),_0x347ab1(0x1f9),_0x347ab1(0x34d),_0x347ab1(0x252),_0x347ab1(0x82)];for(const _0x4ab9bd of _0x5eddd4){$gameScreen['setPictureTextBuffer'](_0x4ab9bd,_0x150bc8);for(const _0x1b49ef of _0x34c199){if('XkGOj'===_0x347ab1(0x73)){if(_0xca4867[_0x1b49ef]===undefined)continue;$gameScreen[_0x347ab1(0x21b)](_0x4ab9bd,_0xca4867[_0x1b49ef],_0x1b49ef);}else{const _0x38f4ee=(this[_0x347ab1(0x3ba)]()+this[_0x347ab1(0x3b9)]())*this[_0x347ab1(0x332)]()+this[_0x347ab1(0xe4)]*0x2;return _0x2556d8[_0x347ab1(0x104)](_0x38f4ee,_0x31c3dd[_0x347ab1(0x1a4)]);}}}}),PluginManager[_0x2c555d(0x108)](pluginData[_0x2c555d(0x322)],'PictureTextErase',_0x48fe21=>{const _0x531d0e=_0x2c555d;VisuMZ[_0x531d0e(0x218)](_0x48fe21,_0x48fe21);const _0xd3b8b7=_0x48fe21[_0x531d0e(0x337)]||[];for(const _0x18b74b of _0xd3b8b7){'hhOWr'===_0x531d0e(0x26e)?($gameScreen[_0x531d0e(0x33c)](_0x18b74b),$gameScreen['erasePictureTextBuffer'](_0x18b74b)):this[_0x531d0e(0xf6)]=[];}}),PluginManager[_0x2c555d(0x108)](pluginData[_0x2c555d(0x322)],_0x2c555d(0xe8),_0x2205ac=>{const _0x673872=_0x2c555d;$gameScreen[_0x673872(0x199)]();}),VisuMZ['MessageCore'][_0x2c555d(0x38a)]=Scene_Boot[_0x2c555d(0x32a)][_0x2c555d(0x15c)],Scene_Boot[_0x2c555d(0x32a)][_0x2c555d(0x15c)]=function(){const _0x441282=_0x2c555d;VisuMZ[_0x441282(0x245)][_0x441282(0x38a)][_0x441282(0x127)](this),this[_0x441282(0x76)](),this[_0x441282(0x1c2)](),this[_0x441282(0x1e1)](),this['process_VisuMZ_MessageCore_AutoColor']();},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x261)]=function(_0x24d46d){const _0x2fca0c=_0x2c555d,_0x5acd39=VisuMZ[_0x2fca0c(0x245)][_0x2fca0c(0x26a)][_0x24d46d];_0x5acd39[_0x2fca0c(0x22d)]((_0x315aa9,_0x25ce91)=>{const _0x45ea1d=_0x2fca0c;if(!_0x315aa9||!_0x25ce91)return-0x1;return _0x25ce91['Match'][_0x45ea1d(0x240)]-_0x315aa9[_0x45ea1d(0x39d)][_0x45ea1d(0x240)];});},Scene_Boot[_0x2c555d(0x32a)][_0x2c555d(0x76)]=function(){const _0x4d02c3=_0x2c555d;VisuMZ[_0x4d02c3(0x245)][_0x4d02c3(0x261)](_0x4d02c3(0x1ff));for(const _0x34a3ed of VisuMZ[_0x4d02c3(0x245)][_0x4d02c3(0x26a)][_0x4d02c3(0x1ff)]){if(_0x4d02c3(0xa9)==='ctNEr'){_0x34a3ed[_0x4d02c3(0x39d)]=_0x34a3ed['Match'][_0x4d02c3(0x28a)](),_0x34a3ed['textCodeCheck']=new RegExp('\x1b'+_0x34a3ed['Match'],'gi'),_0x34a3ed[_0x4d02c3(0x22e)]='\x1b'+_0x34a3ed[_0x4d02c3(0x39d)];if(_0x34a3ed[_0x4d02c3(0x3b6)]==='')_0x34a3ed[_0x4d02c3(0x22e)]+='[0]';}else this[_0x4d02c3(0x227)]['push'](_0xddaca);}},Scene_Boot[_0x2c555d(0x32a)][_0x2c555d(0x1c2)]=function(){const _0x10a339=_0x2c555d;VisuMZ[_0x10a339(0x245)][_0x10a339(0x261)](_0x10a339(0x314));for(const _0x4ebfd5 of VisuMZ[_0x10a339(0x245)][_0x10a339(0x26a)][_0x10a339(0x314)]){_0x10a339(0xe1)!=='kgkkF'?(this['x']=this[_0x10a339(0x140)](this['x'],this[_0x10a339(0xcf)]),this['y']=this[_0x10a339(0x140)](this['y'],this[_0x10a339(0x239)]),this[_0x10a339(0x1a4)]=this['applyMoveEasing'](this[_0x10a339(0x1a4)],this[_0x10a339(0x249)]),this[_0x10a339(0xab)]=this[_0x10a339(0x140)](this[_0x10a339(0xab)],this['_moveTargetHeight']),this[_0x10a339(0x30b)]()):(_0x4ebfd5['textCodeCheck']=new RegExp('\x1b'+_0x4ebfd5[_0x10a339(0x39d)]+_0x4ebfd5['Type'],'gi'),_0x4ebfd5[_0x10a339(0x359)]!==''&&_0x4ebfd5[_0x10a339(0x359)]!==_0x10a339(0x86)?_0x10a339(0x215)==='deqau'?this['startWait'](_0x2e1556):_0x4ebfd5['textCodeResult']=new Function(_0x10a339(0x1f7)+_0x4ebfd5[_0x10a339(0x359)]['replace'](/\\/g,'\x1b')+'\x27'):'hrkXd'!==_0x10a339(0x389)?(this['_textMacroFound']=!![],_0x159e8b=_0x6c8b5e[_0x10a339(0x276)](_0x3d1c0f['textCodeCheck'],_0x721b7e[_0x10a339(0x22e)][_0x10a339(0x28f)](this))):_0x4ebfd5['textCodeResult']=_0x4ebfd5[_0x10a339(0x115)]);}},Scene_Boot['prototype'][_0x2c555d(0x1e1)]=function(){const _0x3fd673=_0x2c555d;for(const _0x406220 of VisuMZ['MessageCore'][_0x3fd673(0x26a)][_0x3fd673(0x288)]){_0x406220[_0x3fd673(0x1ac)]=new RegExp('\x5c['+_0x406220[_0x3fd673(0x39d)]+'\x5c]','gi');if(_0x406220[_0x3fd673(0x359)]!==''&&_0x406220[_0x3fd673(0x359)]!==_0x3fd673(0x86)){if(_0x3fd673(0x2f4)==='KoVUP'){let _0x5aead1=_0x406220[_0x3fd673(0x359)];_0x5aead1=_0x5aead1[_0x3fd673(0x276)](/\\/g,'\x1b'),_0x5aead1=_0x5aead1[_0x3fd673(0x276)]('\x27','\x5c\x27'),_0x5aead1=_0x5aead1[_0x3fd673(0x276)]('\x22','\x5c\x22'),_0x406220[_0x3fd673(0x22e)]=new Function('return\x20\x27'+_0x5aead1+'\x27');}else this[_0x3fd673(0x2d1)]=_0x47e01b['MessageCore'][_0x3fd673(0x26a)][_0x3fd673(0x31f)][_0x3fd673(0x36c)];}else{if('tvcNt'!=='tvcNt'){const _0x3ee813=this[_0x3fd673(0x19b)](_0x52ff15,0x0,0x0,0x0),_0x2cbe74=this['getPreservedFontSettings']();return _0x3ee813[_0x3fd673(0x299)]=![],this[_0x3fd673(0x1fb)](![]),this[_0x3fd673(0x1aa)](_0x3ee813),this[_0x3fd673(0x1fb)](!![]),this['returnPreservedFontSettings'](_0x2cbe74),{'width':_0x3ee813[_0x3fd673(0x235)],'height':_0x3ee813['outputHeight']};}else _0x406220[_0x3fd673(0x22e)]=_0x406220[_0x3fd673(0x115)];}}},Scene_Boot[_0x2c555d(0x32a)][_0x2c555d(0x105)]=function(){const _0x403464=_0x2c555d,_0x143791=VisuMZ['MessageCore'][_0x403464(0x26a)]['AutoColor'];!VisuMZ['ParseAllNotetags']&&(_0x403464(0x151)===_0x403464(0x151)?(VisuMZ[_0x403464(0x245)]['AddAutoColor']($dataClasses,_0x143791['Classes']),VisuMZ['MessageCore'][_0x403464(0x3a1)]($dataSkills,_0x143791['Skills']),VisuMZ['MessageCore'][_0x403464(0x3a1)]($dataItems,_0x143791[_0x403464(0x77)]),VisuMZ[_0x403464(0x245)]['AddAutoColor']($dataWeapons,_0x143791['Weapons']),VisuMZ['MessageCore'][_0x403464(0x3a1)]($dataArmors,_0x143791[_0x403464(0xa4)]),VisuMZ[_0x403464(0x245)][_0x403464(0x3a1)]($dataEnemies,_0x143791[_0x403464(0x7a)]),VisuMZ['MessageCore'][_0x403464(0x3a1)]($dataStates,_0x143791['States'])):(this['_messageOffsetX']=_0x8d1ab5['MsgWindowOffsetX'],this[_0x403464(0x139)]=_0x38efff[_0x403464(0x1ee)])),VisuMZ['MessageCore'][_0x403464(0x3dd)]();},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x3c1)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x2c555d(0x398),_0x2c555d(0x1d4),_0x2c555d(0x98),'</I>',_0x2c555d(0x19d),'</LEFT>',_0x2c555d(0x122),_0x2c555d(0x20d),_0x2c555d(0x21a),_0x2c555d(0x18b),'<COLORLOCK>',_0x2c555d(0x372),'(((',_0x2c555d(0x3bb),_0x2c555d(0x38b),_0x2c555d(0xdd),_0x2c555d(0x31a),_0x2c555d(0x25e),'PICTURE',_0x2c555d(0x3d2),'COMMONEVENT','WAIT',_0x2c555d(0x15f),'HIDE',_0x2c555d(0x18a),'DISABLE',_0x2c555d(0x1c0),_0x2c555d(0x33a),_0x2c555d(0x253),'ANY'],VisuMZ['MessageCore']['AddAutoColor']=function(_0x28a95f,_0x3f71a2){const _0x218bca=_0x2c555d;if(_0x3f71a2<=0x0)return;const _0x546091=_0x28a95f;for(const _0x44ccb7 of _0x546091){if(!_0x44ccb7)continue;VisuMZ['MessageCore'][_0x218bca(0x1e2)](_0x44ccb7,_0x3f71a2);}},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x3dd)]=function(){const _0x2b25c6=_0x2c555d;VisuMZ[_0x2b25c6(0x245)][_0x2b25c6(0x78)]=[];for(let _0x358e0a=0x1;_0x358e0a<=0x1f;_0x358e0a++){if(_0x2b25c6(0x1c6)!==_0x2b25c6(0x336)){const _0x4743b=_0x2b25c6(0x1f3)[_0x2b25c6(0x35e)](_0x358e0a),_0x2ae74b=VisuMZ['MessageCore'][_0x2b25c6(0x26a)][_0x2b25c6(0x279)][_0x4743b];_0x2ae74b[_0x2b25c6(0x22d)]((_0x463c97,_0x4c6824)=>{const _0x24877d=_0x2b25c6;if(!_0x463c97||!_0x4c6824)return-0x1;return _0x4c6824[_0x24877d(0x240)]-_0x463c97[_0x24877d(0x240)];}),this['CreateAutoColorRegExpListEntries'](_0x2ae74b,_0x358e0a);}else _0x51fc03-=_0x3c8231;}},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x1ba)]=function(_0x321dd9,_0x59a3da){const _0x53bf0f=_0x2c555d;for(const _0x6821b4 of _0x321dd9){if(_0x6821b4['length']<=0x0)continue;if(/^\d+$/['test'](_0x6821b4))continue;let _0x58d2ba=VisuMZ[_0x53bf0f(0x245)]['ConvertTextAutoColorRegExpFriendly'](_0x6821b4);if(_0x6821b4[_0x53bf0f(0x23e)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g)){if(_0x53bf0f(0x156)===_0x53bf0f(0x156))var _0x223882=new RegExp(_0x58d2ba,'i');else{_0x397753['ConvertParams'](_0x40b770,_0x2d6310);const _0x21505b=_0x4028dc[_0x53bf0f(0x13e)]||_0x12a938[_0x53bf0f(0xe3)]()||0x1,_0x41c0d8=_0x5e38ec['Width']||_0x4ec9b0[_0x53bf0f(0x22c)]()||0x1;_0x409fa6['_centerMessageWindow']=!![];const _0x17c28c=_0x3531ef['WordWrap'][_0x53bf0f(0x1ad)]();_0x21b314[_0x53bf0f(0x305)](_0x21505b),_0x4bb765[_0x53bf0f(0x1cc)](_0x41c0d8);['true',_0x53bf0f(0xc3)][_0x53bf0f(0x1f1)](_0x17c28c)&&_0x5cfa0e['setMessageWindowWordWrap'](_0x5b046c(_0x17c28c));const _0x3970af=_0x2e5a6f[_0x53bf0f(0xa3)][_0x53bf0f(0x28e)];_0x3970af&&(_0x3970af[_0x53bf0f(0x243)](),_0x3970af[_0x53bf0f(0x3c6)](),_0x3970af[_0x53bf0f(0x1b8)]());}}else var _0x223882=new RegExp('\x5cb'+_0x58d2ba+'\x5cb','g');VisuMZ[_0x53bf0f(0x245)][_0x53bf0f(0x78)]['push']([_0x223882,_0x53bf0f(0x3b5)['format'](_0x59a3da,_0x6821b4)]);}},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x1bd)]=function(_0x41f78e){const _0x37d993=_0x2c555d;return _0x41f78e=_0x41f78e[_0x37d993(0x276)](/(\W)/gi,(_0x2e858d,_0x497249)=>_0x37d993(0x210)[_0x37d993(0x35e)](_0x497249)),_0x41f78e;},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0xc6)]=VisuMZ[_0x2c555d(0xc6)],VisuMZ[_0x2c555d(0xc6)]=function(_0x25bd79){const _0x206017=_0x2c555d;VisuMZ[_0x206017(0x245)][_0x206017(0xc6)][_0x206017(0x127)](this,_0x25bd79);const _0x2ff062=VisuMZ['MessageCore'][_0x206017(0x26a)][_0x206017(0x279)];VisuMZ[_0x206017(0x245)][_0x206017(0x1e2)](_0x25bd79,_0x2ff062['Classes']);},VisuMZ[_0x2c555d(0x245)]['ParseSkillNotetags']=VisuMZ[_0x2c555d(0x164)],VisuMZ['ParseSkillNotetags']=function(_0x2edef5){const _0x402a58=_0x2c555d;VisuMZ[_0x402a58(0x245)][_0x402a58(0x164)]['call'](this,_0x2edef5);const _0x575e4c=VisuMZ[_0x402a58(0x245)][_0x402a58(0x26a)][_0x402a58(0x279)];VisuMZ[_0x402a58(0x245)][_0x402a58(0x1e2)](_0x2edef5,_0x575e4c[_0x402a58(0x1d1)]);},0x7,VisuMZ['MessageCore'][_0x2c555d(0x2ac)]=VisuMZ[_0x2c555d(0x2ac)],VisuMZ[_0x2c555d(0x2ac)]=function(_0x3c11b2){const _0x57bd2c=_0x2c555d;VisuMZ[_0x57bd2c(0x245)]['ParseItemNotetags'][_0x57bd2c(0x127)](this,_0x3c11b2);const _0x4ae2d4=VisuMZ[_0x57bd2c(0x245)][_0x57bd2c(0x26a)][_0x57bd2c(0x279)];VisuMZ[_0x57bd2c(0x245)][_0x57bd2c(0x1e2)](_0x3c11b2,_0x4ae2d4[_0x57bd2c(0x77)]);},VisuMZ[_0x2c555d(0x245)]['ParseWeaponNotetags']=VisuMZ[_0x2c555d(0x2d2)],VisuMZ[_0x2c555d(0x2d2)]=function(_0x35f257){const _0xe1ba44=_0x2c555d;VisuMZ[_0xe1ba44(0x245)][_0xe1ba44(0x2d2)][_0xe1ba44(0x127)](this,_0x35f257);const _0x5286b1=VisuMZ[_0xe1ba44(0x245)][_0xe1ba44(0x26a)]['AutoColor'];VisuMZ[_0xe1ba44(0x245)][_0xe1ba44(0x1e2)](_0x35f257,_0x5286b1[_0xe1ba44(0x366)]);},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x1e0)]=VisuMZ['ParseArmorNotetags'],VisuMZ[_0x2c555d(0x1e0)]=function(_0x4feb11){const _0x24e4bc=_0x2c555d;VisuMZ[_0x24e4bc(0x245)][_0x24e4bc(0x1e0)][_0x24e4bc(0x127)](this,_0x4feb11);const _0x117822=VisuMZ[_0x24e4bc(0x245)][_0x24e4bc(0x26a)][_0x24e4bc(0x279)];VisuMZ[_0x24e4bc(0x245)][_0x24e4bc(0x1e2)](_0x4feb11,_0x117822[_0x24e4bc(0xa4)]);},VisuMZ[_0x2c555d(0x245)]['ParseEnemyNotetags']=VisuMZ[_0x2c555d(0xe0)],VisuMZ[_0x2c555d(0xe0)]=function(_0x330bc7){const _0x4e60b1=_0x2c555d;VisuMZ['MessageCore'][_0x4e60b1(0xe0)][_0x4e60b1(0x127)](this,_0x330bc7);const _0x2285d8=VisuMZ[_0x4e60b1(0x245)][_0x4e60b1(0x26a)]['AutoColor'];VisuMZ[_0x4e60b1(0x245)]['CreateAutoColorFor'](_0x330bc7,_0x2285d8['Enemies']);},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x327)]=VisuMZ['ParseStateNotetags'],VisuMZ[_0x2c555d(0x327)]=function(_0x451d33){const _0x2380a2=_0x2c555d;VisuMZ['MessageCore'][_0x2380a2(0x327)][_0x2380a2(0x127)](this,_0x451d33);const _0x34de7e=VisuMZ[_0x2380a2(0x245)][_0x2380a2(0x26a)][_0x2380a2(0x279)];VisuMZ['MessageCore'][_0x2380a2(0x1e2)](_0x451d33,_0x34de7e[_0x2380a2(0x228)]);},VisuMZ['MessageCore'][_0x2c555d(0x1e2)]=function(_0x29cb19,_0x145ecc){const _0x12eec5=_0x2c555d;if(_0x145ecc<=0x0)return;const _0x576409=VisuMZ[_0x12eec5(0x245)][_0x12eec5(0x26a)][_0x12eec5(0x279)][_0x12eec5(0xdc)+_0x145ecc];let _0x5f1077=_0x29cb19[_0x12eec5(0x322)][_0x12eec5(0x116)]();if(/^\d+$/['test'](_0x5f1077))return;if(VisuMZ[_0x12eec5(0x245)][_0x12eec5(0x3c1)][_0x12eec5(0x1f1)](_0x5f1077[_0x12eec5(0x28a)]()))return;_0x5f1077=_0x5f1077[_0x12eec5(0x276)](/\\I\[(\d+)\]/gi,''),_0x5f1077=_0x5f1077[_0x12eec5(0x276)](/\x1bI\[(\d+)\]/gi,'');if(_0x5f1077[_0x12eec5(0x240)]<=0x0)return;if(_0x5f1077[_0x12eec5(0x23e)](/-----/i))return;_0x576409[_0x12eec5(0x352)](_0x5f1077);},SceneManager[_0x2c555d(0x6a)]=function(){const _0x1868fc=_0x2c555d;return this[_0x1868fc(0xa3)]&&this['_scene'][_0x1868fc(0x392)]===Scene_Battle;},SceneManager[_0x2c555d(0x3bf)]=function(){const _0x206a1a=_0x2c555d;return this[_0x206a1a(0xa3)]&&this[_0x206a1a(0xa3)]['constructor']===Scene_Map;},VisuMZ[_0x2c555d(0x245)]['TextManager_message']=TextManager[_0x2c555d(0x8f)],TextManager[_0x2c555d(0x8f)]=function(_0x29ee1d){const _0x11de43=_0x2c555d,_0x1a45b0=[_0x11de43(0x155),'emerge','preemptive',_0x11de43(0x27a),'victory','defeat','escapeStart',_0x11de43(0x9b),'obtainGold','obtainItem'];let _0x499786=VisuMZ['MessageCore']['TextManager_message'][_0x11de43(0x127)](this,_0x29ee1d);return _0x1a45b0[_0x11de43(0x1f1)](_0x29ee1d)&&(_0x499786=_0x11de43(0xdd)+_0x499786),_0x499786;},ConfigManager['textSpeed']=VisuMZ[_0x2c555d(0x245)]['Settings'][_0x2c555d(0x31f)][_0x2c555d(0x36c)],VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x2bc)]=ConfigManager[_0x2c555d(0x15a)],ConfigManager[_0x2c555d(0x15a)]=function(){const _0x134136=_0x2c555d,_0x197ad8=VisuMZ[_0x134136(0x245)][_0x134136(0x2bc)]['call'](this);return _0x197ad8[_0x134136(0x2d1)]=this[_0x134136(0x2d1)],_0x197ad8;},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x24b)]=ConfigManager[_0x2c555d(0x74)],ConfigManager[_0x2c555d(0x74)]=function(_0x4be6f2){const _0x4655f5=_0x2c555d;VisuMZ[_0x4655f5(0x245)][_0x4655f5(0x24b)][_0x4655f5(0x127)](this,_0x4be6f2);if('textSpeed'in _0x4be6f2)this['textSpeed']=Number(_0x4be6f2[_0x4655f5(0x2d1)])['clamp'](0x1,0xb);else{if(_0x4655f5(0x192)===_0x4655f5(0x3cc)){const _0x53aa1e=_0xf17585[_0x4655f5(0x1a6)](_0x5bd1be['stringify'](_0x59173e[0x3]));_0x52acb5['ConvertParams'](_0x53aa1e,_0x53aa1e),_0x257312[_0x4655f5(0x3b4)](_0x53aa1e[_0x4655f5(0x3a2)]||0x0,_0x53aa1e[_0x4655f5(0x33d)]||0x0,_0x53aa1e[_0x4655f5(0x12d)]||0x0);}else this[_0x4655f5(0x2d1)]=VisuMZ['MessageCore'][_0x4655f5(0x26a)][_0x4655f5(0x31f)][_0x4655f5(0x36c)];}},TextManager[_0x2c555d(0xc0)]=VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x26a)][_0x2c555d(0x31f)][_0x2c555d(0x134)],TextManager[_0x2c555d(0x255)]=VisuMZ[_0x2c555d(0x245)]['Settings'][_0x2c555d(0x31f)]['Instant'],Game_Temp[_0x2c555d(0x32a)]['setLastPluginCommandInterpreter']=function(_0x333d3a){const _0xe493b=_0x2c555d;this[_0xe493b(0x1a2)]=_0x333d3a;},Game_Temp[_0x2c555d(0x32a)][_0x2c555d(0x37e)]=function(){const _0x352242=_0x2c555d;return this[_0x352242(0x1a2)];},VisuMZ[_0x2c555d(0x245)]['Game_Interpreter_PluginCommand']=Game_Interpreter['prototype'][_0x2c555d(0x67)],Game_Interpreter[_0x2c555d(0x32a)][_0x2c555d(0x67)]=function(_0xcdfbc6){const _0x5a80ea=_0x2c555d;return $gameTemp[_0x5a80ea(0x36d)](this),VisuMZ[_0x5a80ea(0x245)][_0x5a80ea(0x2d9)][_0x5a80ea(0x127)](this,_0xcdfbc6);},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0xd9)]=Game_System['prototype']['initialize'],Game_System[_0x2c555d(0x32a)][_0x2c555d(0x298)]=function(){const _0x317663=_0x2c555d;VisuMZ[_0x317663(0x245)][_0x317663(0xd9)][_0x317663(0x127)](this),this['initMessageCore']();},Game_System[_0x2c555d(0x32a)]['initMessageCore']=function(){const _0x3cc8ef=_0x2c555d,_0x4d3745=VisuMZ['MessageCore'][_0x3cc8ef(0x26a)][_0x3cc8ef(0x146)],_0x178e59=VisuMZ[_0x3cc8ef(0x245)][_0x3cc8ef(0x26a)][_0x3cc8ef(0x2af)];this[_0x3cc8ef(0x247)]={'messageRows':_0x4d3745[_0x3cc8ef(0x143)],'messageWidth':_0x4d3745[_0x3cc8ef(0x2b6)],'messageWordWrap':_0x178e59[_0x3cc8ef(0x321)],'helpWordWrap':_0x178e59[_0x3cc8ef(0x19f)],'choiceLineHeight':_0x4d3745['ChoiceWindowLineHeight'],'choiceRows':_0x4d3745[_0x3cc8ef(0x37f)],'choiceCols':_0x4d3745[_0x3cc8ef(0x81)],'choiceTextAlign':_0x4d3745['ChoiceWindowTextAlign']},this[_0x3cc8ef(0x35f)]===undefined&&(_0x3cc8ef(0x310)===_0x3cc8ef(0x310)?(this[_0x3cc8ef(0x35f)]=_0x4d3745[_0x3cc8ef(0x242)],this[_0x3cc8ef(0x139)]=_0x4d3745['MsgWindowOffsetY']):this[_0x3cc8ef(0x37a)](this[_0x3cc8ef(0x35d)]['x'],this[_0x3cc8ef(0x35d)]['y'],this[_0x3cc8ef(0x35d)]['width'],this[_0x3cc8ef(0x35d)][_0x3cc8ef(0xab)],_0x559afc,_0x4f7d89));},Game_System[_0x2c555d(0x32a)][_0x2c555d(0xe3)]=function(){const _0x241997=_0x2c555d;if(this[_0x241997(0x247)]===undefined)this[_0x241997(0x270)]();if(this[_0x241997(0x247)]['messageRows']===undefined)this[_0x241997(0x270)]();return this[_0x241997(0x247)][_0x241997(0x20b)];},Game_System[_0x2c555d(0x32a)][_0x2c555d(0x305)]=function(_0x49e551){const _0x3e6483=_0x2c555d;if(this[_0x3e6483(0x247)]===undefined)this[_0x3e6483(0x270)]();if(this[_0x3e6483(0x247)][_0x3e6483(0x20b)]===undefined)this[_0x3e6483(0x270)]();this['_MessageCoreSettings'][_0x3e6483(0x20b)]=_0x49e551||0x1;},Game_System[_0x2c555d(0x32a)][_0x2c555d(0x22c)]=function(){const _0x5d95a9=_0x2c555d;if(this[_0x5d95a9(0x247)]===undefined)this[_0x5d95a9(0x270)]();if(this[_0x5d95a9(0x247)][_0x5d95a9(0x348)]===undefined)this[_0x5d95a9(0x270)]();return this[_0x5d95a9(0x247)][_0x5d95a9(0x348)];},Game_System['prototype'][_0x2c555d(0x1cc)]=function(_0x1712c7){const _0xe75515=_0x2c555d;if(this[_0xe75515(0x247)]===undefined)this[_0xe75515(0x270)]();if(this[_0xe75515(0x247)][_0xe75515(0x348)]===undefined)this['initMessageCore']();_0x1712c7=Math[_0xe75515(0xf4)](_0x1712c7);if(_0x1712c7%0x2!==0x0)_0x1712c7+=0x1;this[_0xe75515(0x247)][_0xe75515(0x348)]=_0x1712c7||0x2;},Game_System[_0x2c555d(0x32a)]['isMessageWindowWordWrap']=function(){const _0x31daa9=_0x2c555d;if(this[_0x31daa9(0x247)]===undefined)this[_0x31daa9(0x270)]();if(this[_0x31daa9(0x247)][_0x31daa9(0x396)]===undefined)this[_0x31daa9(0x270)]();return this['_MessageCoreSettings']['messageWordWrap'];},Game_System['prototype'][_0x2c555d(0x282)]=function(_0x1eb7ff){const _0x273ad0=_0x2c555d;if(this[_0x273ad0(0x247)]===undefined)this[_0x273ad0(0x270)]();if(this[_0x273ad0(0x247)][_0x273ad0(0x396)]===undefined)this[_0x273ad0(0x270)]();this['_MessageCoreSettings']['messageWordWrap']=_0x1eb7ff;},Game_System[_0x2c555d(0x32a)]['getMessageWindowXyOffsets']=function(){const _0x4cf594=_0x2c555d;if(this[_0x4cf594(0x35f)]===undefined){const _0x50d708=VisuMZ['MessageCore'][_0x4cf594(0x26a)][_0x4cf594(0x146)];this[_0x4cf594(0x35f)]=_0x50d708[_0x4cf594(0x242)],this[_0x4cf594(0x139)]=_0x50d708['MsgWindowOffsetY'];}return{'x':this[_0x4cf594(0x35f)]||0x0,'y':this['_messageOffsetY']||0x0};},Game_System['prototype'][_0x2c555d(0x206)]=function(_0x59a75a,_0x377c6c){const _0xe9c507=_0x2c555d;if(this[_0xe9c507(0x247)]===undefined)this[_0xe9c507(0x270)]();this[_0xe9c507(0x35f)]=_0x59a75a,this[_0xe9c507(0x139)]=_0x377c6c;},Game_System['prototype'][_0x2c555d(0x2c5)]=function(){const _0x5a02dc=_0x2c555d;if(this[_0x5a02dc(0x247)]===undefined)this[_0x5a02dc(0x270)]();if(this[_0x5a02dc(0x247)]['helpWordWrap']===undefined)this['initMessageCore']();return this[_0x5a02dc(0x247)]['helpWordWrap'];},Game_System['prototype'][_0x2c555d(0x224)]=function(_0x1602de){const _0x5ece23=_0x2c555d;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x5ece23(0x247)][_0x5ece23(0x27e)]===undefined)this[_0x5ece23(0x270)]();this[_0x5ece23(0x247)]['helpWordWrap']=_0x1602de;},Game_System[_0x2c555d(0x32a)][_0x2c555d(0x152)]=function(){const _0x55d512=_0x2c555d;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x55d512(0x2b3)]===undefined)this[_0x55d512(0x270)]();return this[_0x55d512(0x247)][_0x55d512(0x2b3)];},Game_System[_0x2c555d(0x32a)][_0x2c555d(0x241)]=function(_0x4b7340){const _0x29ce09=_0x2c555d;if(this[_0x29ce09(0x247)]===undefined)this[_0x29ce09(0x270)]();if(this[_0x29ce09(0x247)][_0x29ce09(0x2b3)]===undefined)this['initMessageCore']();this[_0x29ce09(0x247)][_0x29ce09(0x2b3)]=_0x4b7340||0x1;},Game_System[_0x2c555d(0x32a)][_0x2c555d(0x109)]=function(){const _0xfb2115=_0x2c555d;if(this['_MessageCoreSettings']===undefined)this[_0xfb2115(0x270)]();if(this['_MessageCoreSettings'][_0xfb2115(0x14e)]===undefined)this[_0xfb2115(0x270)]();return this[_0xfb2115(0x247)]['choiceRows'];},Game_System[_0x2c555d(0x32a)]['setChoiceListMaxRows']=function(_0x588228){const _0x3c2b18=_0x2c555d;if(this[_0x3c2b18(0x247)]===undefined)this[_0x3c2b18(0x270)]();if(this['_MessageCoreSettings']['choiceRows']===undefined)this[_0x3c2b18(0x270)]();this[_0x3c2b18(0x247)][_0x3c2b18(0x14e)]=_0x588228||0x1;},Game_System[_0x2c555d(0x32a)]['getChoiceListMaxColumns']=function(){const _0x2d43c6=_0x2c555d;if(this[_0x2d43c6(0x247)]===undefined)this[_0x2d43c6(0x270)]();if(this[_0x2d43c6(0x247)]['choiceCols']===undefined)this[_0x2d43c6(0x270)]();return this['_MessageCoreSettings'][_0x2d43c6(0x289)];},Game_System[_0x2c555d(0x32a)][_0x2c555d(0x268)]=function(_0x1d6352){const _0x386f10=_0x2c555d;if(this[_0x386f10(0x247)]===undefined)this['initMessageCore']();if(this[_0x386f10(0x247)][_0x386f10(0x289)]===undefined)this[_0x386f10(0x270)]();this['_MessageCoreSettings']['choiceCols']=_0x1d6352||0x1;},Game_System['prototype'][_0x2c555d(0x2b0)]=function(){const _0x1388e8=_0x2c555d;if(this[_0x1388e8(0x247)]===undefined)this[_0x1388e8(0x270)]();if(this['_MessageCoreSettings'][_0x1388e8(0x1d2)]===undefined)this[_0x1388e8(0x270)]();return this['_MessageCoreSettings'][_0x1388e8(0x1d2)];},Game_System['prototype'][_0x2c555d(0x1b1)]=function(_0x5b0a8d){const _0x5ec069=_0x2c555d;if(this[_0x5ec069(0x247)]===undefined)this[_0x5ec069(0x270)]();if(this[_0x5ec069(0x247)][_0x5ec069(0x1d2)]===undefined)this[_0x5ec069(0x270)]();this[_0x5ec069(0x247)]['choiceTextAlign']=_0x5b0a8d[_0x5ec069(0x1ad)]();},Game_Message[_0x2c555d(0x32a)][_0x2c555d(0x3ab)]=function(_0x3c21a3,_0x51ab4d){const _0x33dded=_0x2c555d;this['_itemChoiceVariableId']=_0x3c21a3,this[_0x33dded(0x1f0)]='weapon',this[_0x33dded(0x34e)]=_0x51ab4d,this[_0x33dded(0x354)]=0x0;},Game_Message['prototype'][_0x2c555d(0x21f)]=function(){const _0x19ac28=_0x2c555d;return this[_0x19ac28(0x34e)]||0x0;},Game_Message[_0x2c555d(0x32a)][_0x2c555d(0x3b4)]=function(_0x2ab675,_0xa4f8cf,_0x19afbf){const _0x2259aa=_0x2c555d;this[_0x2259aa(0x163)]=_0x2ab675,this[_0x2259aa(0x1f0)]=_0x2259aa(0x102),this[_0x2259aa(0xd3)]=_0xa4f8cf,this[_0x2259aa(0x354)]=_0x19afbf;},Game_Message['prototype'][_0x2c555d(0x260)]=function(){const _0x52d70b=_0x2c555d;return this[_0x52d70b(0xd3)]||0x0;},Game_Message[_0x2c555d(0x32a)][_0x2c555d(0x3db)]=function(){const _0x1b749b=_0x2c555d;return this[_0x1b749b(0x354)]||0x0;},Game_Message['prototype'][_0x2c555d(0x256)]=function(_0x34830f,_0x425c41,_0x887aa1){const _0x3cc3db=_0x2c555d;this[_0x3cc3db(0x163)]=_0x34830f,this[_0x3cc3db(0x1f0)]=_0x3cc3db(0x196),this[_0x3cc3db(0x3c0)]=_0x425c41,this[_0x3cc3db(0x2d7)]=_0x887aa1;},Game_Message[_0x2c555d(0x32a)][_0x2c555d(0x309)]=function(){return this['_itemChoiceActorId']||0x0;},Game_Message[_0x2c555d(0x32a)][_0x2c555d(0x158)]=function(){const _0x4aa75a=_0x2c555d;return $gameActors[_0x4aa75a(0x10b)](this[_0x4aa75a(0x309)]())||$gameParty[_0x4aa75a(0xe6)]()||null;},Game_Message['prototype']['itemChoiceStypeId']=function(){const _0x28c97e=_0x2c555d;return this[_0x28c97e(0x2d7)]||0x0;},Game_Message[_0x2c555d(0x32a)][_0x2c555d(0x225)]=function(){const _0x3957eb=_0x2c555d;this[_0x3957eb(0x1a0)]=[];const _0x71c997=this[_0x3957eb(0x96)][_0x3957eb(0x240)];this[_0x3957eb(0xae)]=_0x71c997;let _0x113209=![];for(let _0x3dd7da=0x0;_0x3dd7da<_0x71c997;_0x3dd7da++){if('UJhvr'===_0x3957eb(0x126)){let _0x5b552e=this[_0x3957eb(0x96)][_0x3dd7da];_0x5b552e[_0x3957eb(0x23e)](/<SHUFFLE>/gi)&&(_0x113209=!![],_0x5b552e=_0x5b552e[_0x3957eb(0x276)](/<SHUFFLE>/gi,'')),_0x5b552e[_0x3957eb(0x23e)](/<SHUFFLE:[ ](\d+)>/gi)&&(_0x113209=!![],this[_0x3957eb(0xae)]=Math[_0x3957eb(0x104)](Number(RegExp['$1']),this[_0x3957eb(0xae)]),_0x5b552e=_0x5b552e['replace'](/<SHUFFLE:[ ](\d+)>/gi,'')),this[_0x3957eb(0x1a0)][_0x3957eb(0x352)](_0x3dd7da),this[_0x3957eb(0x96)][_0x3dd7da]=_0x5b552e;}else!_0x2aeaad['drawing']?_0x43585a[_0x3957eb(0x32a)][_0x3957eb(0x1b7)][_0x3957eb(0x127)](this,_0xb8f9d,_0x4a6ee1):_0x3ecf3f['MessageCore'][_0x3957eb(0x138)][_0x3957eb(0x127)](this,_0x3a14d6,_0x3ccb23);}if(_0x113209){this[_0x3957eb(0x1a0)]=VisuMZ['MessageCore'][_0x3957eb(0x1f2)](this['_choiceIndexArray']);if(this['choiceCancelType']()!==-0x2)this[_0x3957eb(0x365)]=-0x1;}},VisuMZ['MessageCore'][_0x2c555d(0x1f2)]=function(_0x17b4a1){const _0x37d0be=_0x2c555d;var _0x770cf9,_0x4deed8,_0x138739;for(_0x138739=_0x17b4a1[_0x37d0be(0x240)]-0x1;_0x138739>0x0;_0x138739--){_0x770cf9=Math['floor'](Math[_0x37d0be(0x3c5)]()*(_0x138739+0x1)),_0x4deed8=_0x17b4a1[_0x138739],_0x17b4a1[_0x138739]=_0x17b4a1[_0x770cf9],_0x17b4a1[_0x770cf9]=_0x4deed8;}return _0x17b4a1;},Game_Message[_0x2c555d(0x32a)][_0x2c555d(0x79)]=function(){const _0x3f06a9=_0x2c555d;if(!this[_0x3f06a9(0x1a0)])this[_0x3f06a9(0x225)]();return this[_0x3f06a9(0x1a0)];},Game_Message[_0x2c555d(0x32a)][_0x2c555d(0x188)]=function(){const _0x4d3f3=_0x2c555d;if(this[_0x4d3f3(0xae)]===undefined)this[_0x4d3f3(0x225)]();return this[_0x4d3f3(0xae)];},VisuMZ['MessageCore'][_0x2c555d(0x20e)]=Game_Screen[_0x2c555d(0x32a)][_0x2c555d(0xe9)],Game_Screen[_0x2c555d(0x32a)][_0x2c555d(0xe9)]=function(){const _0xcba7cb=_0x2c555d;VisuMZ['MessageCore'][_0xcba7cb(0x20e)]['call'](this),this[_0xcba7cb(0x24f)]();},Game_Screen['prototype'][_0x2c555d(0x24f)]=function(){const _0x316703=_0x2c555d;this['_pictureText']=[],this[_0x316703(0x214)]=[],this[_0x316703(0x227)]=[];},Game_Screen[_0x2c555d(0x32a)][_0x2c555d(0xbf)]=function(_0x1d9aa7){const _0x394f54=_0x2c555d;if(this['_pictureText']===undefined)this[_0x394f54(0x24f)]();const _0x454983=this[_0x394f54(0xfe)](_0x1d9aa7);return this[_0x394f54(0xb8)][_0x454983]=this[_0x394f54(0xb8)][_0x454983]||{},this[_0x394f54(0xb8)][_0x454983];},Game_Screen[_0x2c555d(0x32a)][_0x2c555d(0xdb)]=function(_0x34d263,_0x5d841d){const _0x4ff107=_0x2c555d;return _0x5d841d=_0x5d841d[_0x4ff107(0x1ad)]()[_0x4ff107(0x116)](),this[_0x4ff107(0xbf)](_0x34d263)[_0x5d841d]||'';},Game_Screen['prototype']['setPictureText']=function(_0x1f0648,_0x49526b,_0x3733d0){const _0x2b10d2=_0x2c555d;_0x3733d0=_0x3733d0[_0x2b10d2(0x1ad)]()['trim'](),this[_0x2b10d2(0xbf)](_0x1f0648)[_0x3733d0]=_0x49526b||'',this[_0x2b10d2(0x71)](_0x1f0648,!![]);},Game_Screen[_0x2c555d(0x32a)][_0x2c555d(0x33c)]=function(_0x4ee816){const _0x2a00a8=_0x2c555d;if(this['_pictureText']===undefined)this[_0x2a00a8(0x24f)]();const _0x402b4e=this[_0x2a00a8(0xfe)](_0x4ee816);this['_pictureText'][_0x402b4e]=null,this[_0x2a00a8(0x71)](_0x4ee816,!![]);},Game_Screen[_0x2c555d(0x32a)]['getPictureTextBuffer']=function(_0x2e3fbc){const _0x8a027a=_0x2c555d;if(this[_0x8a027a(0xb8)]===undefined)this['clearAllPictureTexts']();const _0x408185=this['realPictureId'](_0x2e3fbc);return this[_0x8a027a(0x214)][_0x408185]||0x0;},Game_Screen[_0x2c555d(0x32a)][_0x2c555d(0x2a9)]=function(_0x3a8bcc,_0x44bc2c){const _0x70714e=_0x2c555d;if(this[_0x70714e(0xb8)]===undefined)this[_0x70714e(0x24f)]();const _0x7c59c0=this[_0x70714e(0xfe)](_0x3a8bcc);this[_0x70714e(0x214)][_0x7c59c0]=Math['max'](0x0,_0x44bc2c);},Game_Screen[_0x2c555d(0x32a)][_0x2c555d(0x263)]=function(_0x163c90){const _0x331e49=_0x2c555d;if(this[_0x331e49(0xb8)]===undefined)this['clearAllPictureTexts']();const _0x14a5dd=this[_0x331e49(0xfe)](_0x163c90);this[_0x331e49(0x214)][_0x14a5dd]=undefined;},VisuMZ[_0x2c555d(0x245)]['Game_Screen_erasePicture']=Game_Screen[_0x2c555d(0x32a)][_0x2c555d(0xff)],Game_Screen['prototype'][_0x2c555d(0xff)]=function(_0x2d7e23){const _0x1cc54f=_0x2c555d;VisuMZ[_0x1cc54f(0x245)][_0x1cc54f(0x381)][_0x1cc54f(0x127)](this,_0x2d7e23),this['eraseAllPictureTexts'](_0x2d7e23),this['erasePictureTextBuffer'](_0x2d7e23),this['requestPictureTextRefresh'](_0x2d7e23,!![]);},Game_Screen[_0x2c555d(0x32a)]['requestPictureTextRefreshAll']=function(){const _0x1288f8=_0x2c555d;for(const _0x9a08d6 of this[_0x1288f8(0x361)]){if(_0x9a08d6){let _0x191935=this[_0x1288f8(0x361)][_0x1288f8(0x11b)](_0x9a08d6);this['requestPictureTextRefresh'](_0x191935);}}},Game_Screen[_0x2c555d(0x32a)]['requestPictureTextRefresh']=function(_0x4fac91,_0x2a184c){const _0x94ed73=_0x2c555d;this[_0x94ed73(0x227)]=this[_0x94ed73(0x227)]||[],(this[_0x94ed73(0x313)](_0x4fac91)||_0x2a184c)&&this[_0x94ed73(0x227)][_0x94ed73(0x352)](_0x4fac91);},Game_Screen[_0x2c555d(0x32a)][_0x2c555d(0x2e7)]=function(_0x28abda){const _0x2cec65=_0x2c555d;return this[_0x2cec65(0x227)]=this[_0x2cec65(0x227)]||[],this[_0x2cec65(0x227)]['includes'](_0x28abda);},Game_Screen[_0x2c555d(0x32a)][_0x2c555d(0x1a3)]=function(_0x2c5bcd){const _0x386d9e=_0x2c555d;this[_0x386d9e(0x227)]=this['_pictureTextRefresh']||[],this[_0x386d9e(0x227)][_0x386d9e(0x1ab)](_0x2c5bcd);},Game_Screen['prototype'][_0x2c555d(0x313)]=function(_0x48985d){const _0x18cee3=_0x2c555d,_0x38bc9f=[_0x18cee3(0x129),'up','upperright',_0x18cee3(0x2cb),_0x18cee3(0x23c),_0x18cee3(0x1f9),'lowerleft',_0x18cee3(0x252),_0x18cee3(0x82)];return _0x38bc9f['some'](_0x519d84=>this[_0x18cee3(0xdb)](_0x48985d,_0x519d84)!=='');},VisuMZ['MessageCore']['Game_Party_initialize']=Game_Party[_0x2c555d(0x32a)][_0x2c555d(0x298)],Game_Party[_0x2c555d(0x32a)]['initialize']=function(){const _0x2f002b=_0x2c555d;VisuMZ[_0x2f002b(0x245)][_0x2f002b(0x376)]['call'](this),this[_0x2f002b(0x270)]();},Game_Party[_0x2c555d(0x32a)][_0x2c555d(0x270)]=function(){const _0x4ac03f=_0x2c555d;this[_0x4ac03f(0xed)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x2c555d(0x32a)][_0x2c555d(0x283)]=function(){const _0x3a402a=_0x2c555d;if(this[_0x3a402a(0xed)]===undefined)this[_0x3a402a(0x270)]();return this[_0x3a402a(0xed)];},Game_Party[_0x2c555d(0x32a)][_0x2c555d(0x18c)]=function(_0xa1fae8,_0x39f7fc){const _0x5cf971=_0x2c555d;if(this[_0x5cf971(0xed)]===undefined)this['initMessageCore']();if(!_0xa1fae8)return;if(DataManager[_0x5cf971(0x83)](_0xa1fae8))_0x5cf971(0x32e)===_0x5cf971(0x32e)?this['_lastGainedItemData']['type']=0x0:_0x4e0ae3['x']=this[_0x5cf971(0x1a4)]+_0x3ec055;else{if(DataManager[_0x5cf971(0x10f)](_0xa1fae8))this[_0x5cf971(0xed)][_0x5cf971(0x230)]=0x1;else DataManager[_0x5cf971(0x1b3)](_0xa1fae8)&&('ltHrn'!=='ltHrn'?(_0x359b0e=_0x22759a[_0x5cf971(0x276)](/[\n\r]+/g,'\x20'),_0x334020=_0x51ca2e[_0x5cf971(0x276)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):this['_lastGainedItemData'][_0x5cf971(0x230)]=0x2);}this[_0x5cf971(0xed)]['id']=_0xa1fae8['id'],this[_0x5cf971(0xed)][_0x5cf971(0x364)]=_0x39f7fc;},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0xbd)]=Game_Party[_0x2c555d(0x32a)][_0x2c555d(0x132)],Game_Party[_0x2c555d(0x32a)][_0x2c555d(0x132)]=function(_0x12e2a9,_0x2a40d0,_0xc24224){const _0x3fb7b7=_0x2c555d;VisuMZ[_0x3fb7b7(0x245)][_0x3fb7b7(0xbd)]['call'](this,_0x12e2a9,_0x2a40d0,_0xc24224),_0x2a40d0>0x0&&this[_0x3fb7b7(0x18c)](_0x12e2a9,_0x2a40d0);},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x124)]=Game_Map[_0x2c555d(0x32a)][_0x2c555d(0x298)],Game_Map[_0x2c555d(0x32a)][_0x2c555d(0x298)]=function(){const _0xc3662d=_0x2c555d;VisuMZ[_0xc3662d(0x245)][_0xc3662d(0x124)][_0xc3662d(0x127)](this),this[_0xc3662d(0x319)]=[];},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x1c4)]=Game_Map[_0x2c555d(0x32a)]['setupEvents'],Game_Map['prototype'][_0x2c555d(0x8e)]=function(){const _0x4d8021=_0x2c555d;VisuMZ[_0x4d8021(0x245)][_0x4d8021(0x1c4)][_0x4d8021(0x127)](this),this[_0x4d8021(0x319)]=[];},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x3d9)]=Game_Map[_0x2c555d(0x32a)][_0x2c555d(0x175)],Game_Map[_0x2c555d(0x32a)][_0x2c555d(0x175)]=function(){const _0x59a61=_0x2c555d;VisuMZ[_0x59a61(0x245)][_0x59a61(0x3d9)][_0x59a61(0x127)](this),this[_0x59a61(0x135)]();},Game_Map[_0x2c555d(0x32a)][_0x2c555d(0x69)]=function(_0x47a7d1){const _0x21c09f=_0x2c555d;if(!$dataCommonEvents[_0x47a7d1])return;this[_0x21c09f(0x319)]=this['_messageCommonEvents']||[];const _0x450d14=this['_interpreter'][_0x21c09f(0xee)],_0x259727=new Game_MessageCommonEvent(_0x47a7d1,_0x450d14);this[_0x21c09f(0x319)]['push'](_0x259727);},Game_Map[_0x2c555d(0x32a)][_0x2c555d(0x135)]=function(){const _0x2ff5d3=_0x2c555d;this[_0x2ff5d3(0x319)]=this[_0x2ff5d3(0x319)]||[];for(const _0x57eaf7 of this['_messageCommonEvents']){!_0x57eaf7['_interpreter']?this['_messageCommonEvents']['remove'](_0x57eaf7):_0x2ff5d3(0x344)===_0x2ff5d3(0x3ce)?(_0x3464ea=_0xbe720e['toLowerCase']()[_0x2ff5d3(0x116)](),this['getPictureTextData'](_0x391297)[_0x5cb851]=_0x3b7799||'',this['requestPictureTextRefresh'](_0x395cf4,!![])):_0x57eaf7[_0x2ff5d3(0x1c9)]();}},VisuMZ['MessageCore']['Game_Map_refresh']=Game_Map['prototype'][_0x2c555d(0x1f8)],Game_Map['prototype'][_0x2c555d(0x1f8)]=function(){const _0x4ce7a0=_0x2c555d;VisuMZ[_0x4ce7a0(0x245)]['Game_Map_refresh'][_0x4ce7a0(0x127)](this),$gameScreen['requestPictureTextRefreshAll']();},Game_Interpreter[_0x2c555d(0x87)]=pluginData[_0x2c555d(0x322)],Game_Interpreter[_0x2c555d(0x32a)][_0x2c555d(0x2bd)]=function(_0x124cdd){const _0x3d8bf3=_0x2c555d;if($gameMessage[_0x3d8bf3(0x2b8)]())return![];return this[_0x3d8bf3(0xf5)](_0x124cdd),this['addContinuousShowTextCommands'](_0x124cdd),this[_0x3d8bf3(0x2ca)](_0x124cdd),this[_0x3d8bf3(0x7b)](_0x3d8bf3(0x8f)),!![];},Game_Interpreter['prototype'][_0x2c555d(0xf5)]=function(_0x343973){const _0x382e06=_0x2c555d;$gameMessage[_0x382e06(0xde)](_0x343973[0x0],_0x343973[0x1]),$gameMessage[_0x382e06(0xba)](_0x343973[0x2]),$gameMessage[_0x382e06(0x2ee)](_0x343973[0x3]),$gameMessage['setSpeakerName'](_0x343973[0x4]);},Game_Interpreter[_0x2c555d(0x32a)][_0x2c555d(0x119)]=function(_0x4afbb4){const _0x498919=_0x2c555d;while(this[_0x498919(0xf8)]()){this[_0x498919(0x234)]++;if(this[_0x498919(0x85)]()[_0x498919(0x25f)]===0x191){let _0x36e17e=this['currentCommand']()[_0x498919(0x31b)][0x0];_0x36e17e=VisuMZ['MessageCore'][_0x498919(0x117)](_0x36e17e),$gameMessage['add'](_0x36e17e);}if(this['isBreakShowTextCommands']()){if('cAiLj'===_0x498919(0x31d)){const _0x54fe42=_0x4feb82[0x1];if(_0x54fe42==='SelectWeapon')this[_0x498919(0x234)]++,this[_0x498919(0x3ab)](_0x1b9b55);else{if(_0x54fe42===_0x498919(0x3d5))this[_0x498919(0x234)]++,this[_0x498919(0x3b4)](_0x461661);else _0x54fe42==='SelectSkill'&&_0xc4d7e3[_0x498919(0x191)]&&(this[_0x498919(0x234)]++,this[_0x498919(0x256)](_0x2d06c3));}}else break;}}},Game_Interpreter[_0x2c555d(0x32a)][_0x2c555d(0xf8)]=function(){const _0xf68bc6=_0x2c555d;if(this['nextEventCode']()===0x65&&$gameSystem['getMessageWindowRows']()>0x4){if(_0xf68bc6(0x362)!==_0xf68bc6(0x384))return!![];else this[_0xf68bc6(0x3c3)]--,this[_0xf68bc6(0x3c3)]<=0x0&&(this[_0xf68bc6(0x356)](_0x38b741),_0x15fdc7['prototype'][_0xf68bc6(0x1df)]['call'](this,_0x5b6cb5));}else return this['nextEventCode']()===0x191;},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x117)]=function(_0x354e17){const _0x5dcb29=_0x2c555d,_0x3943cf=VisuMZ['MessageCore'][_0x5dcb29(0x26a)][_0x5dcb29(0x146)];return _0x354e17=(_0x3943cf[_0x5dcb29(0x1e5)]||'')+_0x354e17+(_0x3943cf['EachMessageEnd']||''),_0x354e17=_0x354e17['replace'](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x354e17=_0x354e17[_0x5dcb29(0x276)](/<(?:RNG|RAND|RANDOM)>(.*?)<\/(?:RNG|RAND|RANDOM)>/gi,(_0x156213,_0x5889c7)=>this[_0x5dcb29(0x32f)](_0x5889c7)),_0x354e17;},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x32f)]=function(_0x385f30){const _0x4161e1=_0x2c555d,_0x21ba5a=_0x385f30['split']('|')[_0x4161e1(0x2c0)](_0x119cba=>_0x119cba['trim']())[_0x4161e1(0x1ab)]('')[_0x4161e1(0x1ab)](null);return _0x21ba5a[Math['randomInt'](_0x21ba5a[_0x4161e1(0x240)])];},Game_Interpreter[_0x2c555d(0x32a)][_0x2c555d(0x201)]=function(){const _0x4c77c9=_0x2c555d;if(this[_0x4c77c9(0x85)]()&&this[_0x4c77c9(0x85)]()[_0x4c77c9(0x31b)][0x0][_0x4c77c9(0x23e)](/<(?:NEXT PAGE|NEXTPAGE)>/gi)){if(_0x4c77c9(0x13a)===_0x4c77c9(0x1b2))_0xb5c617=_0x2becbf['floor']((this[_0x4c77c9(0xab)]-_0x841412['height'])/0x2);else return!![];}return $gameMessage[_0x4c77c9(0x2fc)][_0x4c77c9(0x240)]>=$gameSystem['getMessageWindowRows']()&&this[_0x4c77c9(0x363)]()!==0x191;},Game_Interpreter[_0x2c555d(0x32a)][_0x2c555d(0x2ca)]=function(_0x487cb7){const _0x4a01a8=_0x2c555d;switch(this[_0x4a01a8(0x363)]()){case 0x66:this[_0x4a01a8(0x234)]++,this[_0x4a01a8(0x3da)](this['currentCommand']()[_0x4a01a8(0x31b)]);break;case 0x67:this[_0x4a01a8(0x234)]++,this[_0x4a01a8(0x147)](this['currentCommand']()[_0x4a01a8(0x31b)]);break;case 0x68:this[_0x4a01a8(0x234)]++,this['setupItemChoice'](this[_0x4a01a8(0x85)]()[_0x4a01a8(0x31b)]);break;case 0x165:const _0x319cd6=this[_0x4a01a8(0x221)][this['_index']+0x1],_0x4062fa=_0x319cd6['parameters'];if(_0x4062fa[0x0]===Game_Interpreter[_0x4a01a8(0x87)]){if(_0x4a01a8(0x17f)===_0x4a01a8(0x2e1)){const _0x189371=_0x1968d6['messageCoreTextSpeed'],_0xe96a11=_0x4a01a8(0x2d1);this[_0x4a01a8(0x212)](_0x189371,_0xe96a11);}else this['prepareShowTextPluginCommandFollowups'](_0x4062fa);}break;}},VisuMZ['MessageCore'][_0x2c555d(0x99)]=Game_Interpreter[_0x2c555d(0x32a)][_0x2c555d(0x3da)],Game_Interpreter[_0x2c555d(0x32a)][_0x2c555d(0x3da)]=function(_0x54ed80){const _0x2932c7=_0x2c555d;_0x54ed80=this[_0x2932c7(0x3cd)](),VisuMZ[_0x2932c7(0x245)][_0x2932c7(0x99)][_0x2932c7(0x127)](this,_0x54ed80),$gameMessage[_0x2932c7(0x225)]();},Game_Interpreter['prototype']['addContinuousShowChoices']=function(){const _0x1d4b9c=_0x2c555d,_0x22c8bd=this[_0x1d4b9c(0x234)],_0x40f14d=[];let _0x505031=0x0;this[_0x1d4b9c(0x234)]++;while(this[_0x1d4b9c(0x234)]<this['_list'][_0x1d4b9c(0x240)]){if(this[_0x1d4b9c(0x85)]()[_0x1d4b9c(0x39b)]===this[_0x1d4b9c(0x2fd)]){if(this[_0x1d4b9c(0x85)]()[_0x1d4b9c(0x25f)]===0x194&&this['nextEventCode']()!==0x66){if('aTmRt'===_0x1d4b9c(0x308))break;else{for(const _0x6d6f58 of _0x11f2c3[_0x1d4b9c(0x245)]['Settings'][_0x1d4b9c(0x314)]){_0x299df9[_0x1d4b9c(0x23e)](_0x6d6f58[_0x1d4b9c(0x1ac)])&&(_0x17a0a9=_0x5a759b['replace'](_0x6d6f58[_0x1d4b9c(0x1ac)],_0x6d6f58[_0x1d4b9c(0x22e)][_0x1d4b9c(0x28f)](this)),_0x2f7e62=this[_0x1d4b9c(0x339)](_0x59a9fd));}return _0x43042a;}}else{if(this[_0x1d4b9c(0x85)]()[_0x1d4b9c(0x25f)]===0x66){if(_0x1d4b9c(0x157)!==_0x1d4b9c(0x30d))this[_0x1d4b9c(0x223)](_0x505031,this['currentCommand'](),_0x22c8bd),this['_index']-=0x2;else{if(this[_0x1d4b9c(0xed)]===_0x2d0fae)this[_0x1d4b9c(0x270)]();if(!_0x3642bd)return;if(_0x1e30a7['isItem'](_0x3e07a7))this['_lastGainedItemData'][_0x1d4b9c(0x230)]=0x0;else{if(_0x370d5c[_0x1d4b9c(0x10f)](_0x57952f))this[_0x1d4b9c(0xed)]['type']=0x1;else _0x507d6e[_0x1d4b9c(0x1b3)](_0x5ad518)&&(this[_0x1d4b9c(0xed)]['type']=0x2);}this[_0x1d4b9c(0xed)]['id']=_0x3901e1['id'],this['_lastGainedItemData'][_0x1d4b9c(0x364)]=_0x328eda;}}else this[_0x1d4b9c(0x85)]()[_0x1d4b9c(0x25f)]===0x192&&(this[_0x1d4b9c(0x85)]()[_0x1d4b9c(0x31b)][0x0]=_0x505031,_0x505031++);}}this[_0x1d4b9c(0x234)]++;}return this[_0x1d4b9c(0x234)]=_0x22c8bd,this[_0x1d4b9c(0x85)]()[_0x1d4b9c(0x31b)];},Game_Interpreter[_0x2c555d(0x32a)][_0x2c555d(0x223)]=function(_0x5540a5,_0x229fb0,_0x5013ad){const _0x420050=_0x2c555d;this[_0x420050(0x383)](_0x5540a5,_0x229fb0,_0x5013ad),this['adjustShowChoiceCancel'](_0x5540a5,_0x229fb0,_0x5013ad),this[_0x420050(0x2f9)](_0x229fb0,_0x5013ad);},Game_Interpreter['prototype'][_0x2c555d(0x383)]=function(_0x6989ac,_0x9c1a2e,_0x3f8dfb){const _0x516528=_0x2c555d;if(_0x9c1a2e[_0x516528(0x31b)][0x2]<0x0)return;const _0x5ed2e3=_0x9c1a2e[_0x516528(0x31b)][0x2]+_0x6989ac;this[_0x516528(0x221)][_0x3f8dfb]['parameters'][0x2]=_0x5ed2e3;},Game_Interpreter['prototype'][_0x2c555d(0x296)]=function(_0xd40be0,_0x2197e4,_0x168cf7){const _0x5d0d2f=_0x2c555d;if(_0x2197e4[_0x5d0d2f(0x31b)][0x1]>=0x0){var _0x1fef51=_0x2197e4[_0x5d0d2f(0x31b)][0x1]+_0xd40be0;this['_list'][_0x168cf7][_0x5d0d2f(0x31b)][0x1]=_0x1fef51;}else _0x2197e4['parameters'][0x1]===-0x2&&(this[_0x5d0d2f(0x221)][_0x168cf7][_0x5d0d2f(0x31b)][0x1]=_0x2197e4[_0x5d0d2f(0x31b)][0x1]);},Game_Interpreter[_0x2c555d(0x32a)][_0x2c555d(0x2f9)]=function(_0x27c1d9,_0x310152){const _0x2a10d0=_0x2c555d;for(const _0x41e733 of _0x27c1d9[_0x2a10d0(0x31b)][0x0]){if(_0x2a10d0(0x1f5)!==_0x2a10d0(0x1f5)){this[_0x2a10d0(0x1a4)]=_0x1ca99c[_0x2a10d0(0x22c)]()+this[_0x2a10d0(0x1b0)]();;this[_0x2a10d0(0x1a4)]=_0x267d3c[_0x2a10d0(0x104)](_0x3d62d4[_0x2a10d0(0x1a4)],this[_0x2a10d0(0x1a4)]);const _0x3c471b=_0x2cfacf['getMessageWindowRows']();this['height']=_0x337009[_0x2a10d0(0xa3)]['calcWindowHeight'](_0x3c471b,![])+this[_0x2a10d0(0x36e)](),this['height']=_0x4da1b7[_0x2a10d0(0x104)](_0x7bbe04[_0x2a10d0(0xab)],this['height']);if(_0x49b759['_centerMessageWindow'])this[_0x2a10d0(0x391)]();}else this[_0x2a10d0(0x221)][_0x310152][_0x2a10d0(0x31b)][0x0][_0x2a10d0(0x352)](_0x41e733);}this[_0x2a10d0(0x221)][_0x2a10d0(0xdf)](this[_0x2a10d0(0x234)]-0x1,0x2);},Game_Interpreter[_0x2c555d(0x32a)][_0x2c555d(0x39f)]=function(_0x48f4aa){const _0x458bb8=_0x2c555d,_0x4dbeb2=_0x48f4aa[0x1];if(_0x4dbeb2==='SelectWeapon'){if(_0x458bb8(0x2b2)!==_0x458bb8(0x2b2))return![];else this[_0x458bb8(0x234)]++,this[_0x458bb8(0x3ab)](_0x48f4aa);}else{if(_0x4dbeb2===_0x458bb8(0x3d5))this[_0x458bb8(0x234)]++,this[_0x458bb8(0x3b4)](_0x48f4aa);else _0x4dbeb2===_0x458bb8(0x347)&&Imported[_0x458bb8(0x191)]&&('OgnYb'!=='zwcwn'?(this['_index']++,this['setSkillChoice'](_0x48f4aa)):this[_0x458bb8(0x1b5)][_0x458bb8(0x1c9)]());}},Game_Interpreter['prototype']['setWeaponChoice']=function(_0x418f31){const _0x11cd16=_0x2c555d,_0x2a8f9e=JSON[_0x11cd16(0x1a6)](JSON[_0x11cd16(0x3d3)](_0x418f31[0x3]));VisuMZ[_0x11cd16(0x218)](_0x2a8f9e,_0x2a8f9e),$gameMessage[_0x11cd16(0x3ab)](_0x2a8f9e['VariableID']||0x0,_0x2a8f9e[_0x11cd16(0x68)]||0x0);},Game_Interpreter[_0x2c555d(0x32a)]['setArmorChoice']=function(_0x245321){const _0x1b2270=_0x2c555d,_0x389546=JSON['parse'](JSON[_0x1b2270(0x3d3)](_0x245321[0x3]));VisuMZ[_0x1b2270(0x218)](_0x389546,_0x389546),$gameMessage['setArmorChoice'](_0x389546[_0x1b2270(0x3a2)]||0x0,_0x389546['ArmorTypeID']||0x0,_0x389546['EquipTypeID']||0x0);},Game_Interpreter[_0x2c555d(0x32a)]['setSkillChoice']=function(_0x3438a1){const _0x221a7a=_0x2c555d,_0x396a12=JSON['parse'](JSON[_0x221a7a(0x3d3)](_0x3438a1[0x3]));VisuMZ[_0x221a7a(0x218)](_0x396a12,_0x396a12),$gameMessage[_0x221a7a(0x256)](_0x396a12[_0x221a7a(0x3a2)]||0x0,_0x396a12[_0x221a7a(0x278)]||0x0,_0x396a12[_0x221a7a(0x303)]||0x0);};function Game_MessageCommonEvent(){const _0xb2ac8e=_0x2c555d;this[_0xb2ac8e(0x298)](...arguments);}Game_MessageCommonEvent[_0x2c555d(0x32a)]['initialize']=function(_0x17449a,_0x590fff){const _0xad7ac0=_0x2c555d;this[_0xad7ac0(0x1fc)]=_0x17449a,this[_0xad7ac0(0xee)]=_0x590fff||0x0,this[_0xad7ac0(0x1f8)]();},Game_MessageCommonEvent[_0x2c555d(0x32a)][_0x2c555d(0x290)]=function(){const _0x2a900e=_0x2c555d;return $dataCommonEvents[this[_0x2a900e(0x1fc)]];},Game_MessageCommonEvent[_0x2c555d(0x32a)][_0x2c555d(0x1dc)]=function(){const _0x4c98b3=_0x2c555d;return this['event']()[_0x4c98b3(0x1dc)];},Game_MessageCommonEvent['prototype'][_0x2c555d(0x1f8)]=function(){const _0x30dec4=_0x2c555d;this[_0x30dec4(0x1b5)]=new Game_Interpreter(),this['_interpreter']['setup'](this[_0x30dec4(0x1dc)](),this[_0x30dec4(0xee)]);},Game_MessageCommonEvent[_0x2c555d(0x32a)][_0x2c555d(0x1c9)]=function(){const _0x2f93da=_0x2c555d;this[_0x2f93da(0x1b5)]&&(_0x2f93da(0x2ff)!=='ekOnG'?this[_0x2f93da(0x1b5)][_0x2f93da(0xb2)]()?this[_0x2f93da(0x1b5)][_0x2f93da(0x1c9)]():this['clear']():(this[_0x2f93da(0x227)]=this[_0x2f93da(0x227)]||[],this['_pictureTextRefresh']['remove'](_0x5e9898)));},Game_MessageCommonEvent[_0x2c555d(0x32a)][_0x2c555d(0x258)]=function(){this['_interpreter']=null;},Scene_Message['prototype'][_0x2c555d(0x33b)]=function(){const _0x5540d3=_0x2c555d,_0x2e81cf=Math[_0x5540d3(0x104)](Graphics[_0x5540d3(0x1a4)],$gameSystem[_0x5540d3(0x22c)]()),_0x343de1=$gameSystem[_0x5540d3(0xe3)](),_0x57c899=this['calcWindowHeight'](_0x343de1,![]),_0x3de24e=(Graphics[_0x5540d3(0x1a7)]-_0x2e81cf)/0x2,_0x36bba6=0x0;return new Rectangle(_0x3de24e,_0x36bba6,_0x2e81cf,_0x57c899);},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x28b)]=Scene_Message[_0x2c555d(0x32a)][_0x2c555d(0x6e)],Scene_Message[_0x2c555d(0x32a)][_0x2c555d(0x6e)]=function(){const _0x4fe9a2=_0x2c555d;VisuMZ[_0x4fe9a2(0x245)][_0x4fe9a2(0x28b)][_0x4fe9a2(0x127)](this),this[_0x4fe9a2(0x2a4)]();},Scene_Message[_0x2c555d(0x32a)][_0x2c555d(0x2a4)]=function(){const _0x4da6b5=_0x2c555d,_0x1a70b9=this[_0x4da6b5(0x31e)](),_0x1a248a=new Window_Help(_0x1a70b9);_0x1a248a[_0x4da6b5(0x193)](),this[_0x4da6b5(0x385)][_0x4da6b5(0x17d)](_0x1a248a),this[_0x4da6b5(0x28e)][_0x4da6b5(0x38e)](_0x1a248a),this[_0x4da6b5(0x17a)](_0x1a248a),this[_0x4da6b5(0xa2)]=_0x1a248a;},Scene_Message[_0x2c555d(0x32a)]['choiceListHelpWindowRect']=function(){const _0x42b86a=_0x2c555d,_0x3400b1=0x0,_0x28a71c=0x0,_0x6c3b0c=Graphics[_0x42b86a(0x1a7)],_0x2ec6f1=this[_0x42b86a(0x2e6)](0x2,![]);return new Rectangle(_0x3400b1,_0x28a71c,_0x6c3b0c,_0x2ec6f1);},Window_Message['prototype']['setChoiceListHelpWindow']=function(_0x32d55b){this['_choiceListHelpWindow']=_0x32d55b;},Window_Message[_0x2c555d(0x32a)][_0x2c555d(0x1cf)]=function(){const _0x2d76cc=_0x2c555d;if(!this[_0x2d76cc(0xa2)])return;const _0x31635c=this[_0x2d76cc(0xa2)];_0x31635c&&(_0x31635c['y']=this['y']>0x0?0x0:Graphics[_0x2d76cc(0x27c)]-_0x31635c[_0x2d76cc(0xab)]);},VisuMZ['MessageCore'][_0x2c555d(0x93)]=Scene_Options[_0x2c555d(0x32a)]['maxCommands'],Scene_Options[_0x2c555d(0x32a)][_0x2c555d(0x26d)]=function(){const _0x502411=_0x2c555d;let _0x4f763c=VisuMZ['MessageCore'][_0x502411(0x93)]['call'](this);const _0x347fe0=VisuMZ['MessageCore']['Settings'];if(_0x347fe0['TextSpeed'][_0x502411(0x251)]&&_0x347fe0['TextSpeed'][_0x502411(0x374)])_0x4f763c++;return _0x4f763c;},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x8c)]=Sprite_Picture['prototype'][_0x2c555d(0x178)],Sprite_Picture[_0x2c555d(0x32a)][_0x2c555d(0x178)]=function(){const _0x30af1a=_0x2c555d;VisuMZ[_0x30af1a(0x245)][_0x30af1a(0x8c)][_0x30af1a(0x127)](this),this[_0x30af1a(0x3cf)]();},VisuMZ['MessageCore'][_0x2c555d(0x2ab)]=Sprite_Picture['prototype']['update'],Sprite_Picture['prototype']['update']=function(){const _0x3e087e=_0x2c555d;VisuMZ[_0x3e087e(0x245)]['Sprite_Picture_update'][_0x3e087e(0x127)](this),this[_0x3e087e(0x137)]();},Sprite_Picture[_0x2c555d(0x32a)][_0x2c555d(0x137)]=function(){const _0x8d88fe=_0x2c555d;if(!this[_0x8d88fe(0x316)])return;this['resizePictureText'](),this[_0x8d88fe(0x26c)](),this['drawPictureText'](),this[_0x8d88fe(0xa7)]();},Sprite_Picture[_0x2c555d(0x32a)][_0x2c555d(0x3cf)]=function(){const _0x299cc9=_0x2c555d;if(this[_0x299cc9(0x15d)])return;if(this[_0x299cc9(0x160)])return;const _0x194730=new Rectangle(0x0,0x0,0x0,0x0);this[_0x299cc9(0x15d)]=new Window_Base(_0x194730),this[_0x299cc9(0x15d)]['padding']=0x0,this[_0x299cc9(0x160)]=new Sprite(),this[_0x299cc9(0x349)](this[_0x299cc9(0x160)],0x0),this[_0x299cc9(0x342)]=0x0,this[_0x299cc9(0x2c9)]=0x0,this[_0x299cc9(0x33f)]={};},Sprite_Picture[_0x2c555d(0x32a)][_0x2c555d(0x24e)]=function(){const _0x461051=_0x2c555d;if(!this[_0x461051(0x15d)])return;if(this[_0x461051(0x342)]===this['width']&&this['_pictureTextHeight']===this[_0x461051(0xab)])return;this[_0x461051(0x342)]=this[_0x461051(0x1a4)],this[_0x461051(0x2c9)]=this['height'],this[_0x461051(0x33f)]={},this[_0x461051(0x15d)][_0x461051(0x112)](0x0,0x0,this[_0x461051(0x1a4)],this['height']);},Sprite_Picture[_0x2c555d(0x32a)]['anchorPictureText']=function(){const _0x2675de=_0x2c555d;if(!this[_0x2675de(0x160)])return;this[_0x2675de(0x160)][_0x2675de(0x3d6)]['x']=this['anchor']['x'],this[_0x2675de(0x160)][_0x2675de(0x3d6)]['y']=this['anchor']['y'];},Sprite_Picture[_0x2c555d(0x32a)][_0x2c555d(0x370)]=function(){const _0x1411c8=_0x2c555d;if(!this[_0x1411c8(0x15d)])return;if(!this[_0x1411c8(0x33e)]())return;const _0x4a5ccc=[_0x1411c8(0x129),'up','upperright',_0x1411c8(0x2cb),_0x1411c8(0x23c),_0x1411c8(0x1f9),_0x1411c8(0x34d),_0x1411c8(0x252),_0x1411c8(0x82)];this[_0x1411c8(0x15d)][_0x1411c8(0x1b8)]();for(const _0x39fc66 of _0x4a5ccc){this[_0x1411c8(0x25b)](_0x39fc66);}},Sprite_Picture[_0x2c555d(0x32a)][_0x2c555d(0x33e)]=function(){const _0x43e19e=_0x2c555d;if($gameScreen[_0x43e19e(0x2e7)](this['_pictureId']))return!![];const _0x535bef=[_0x43e19e(0x129),'up',_0x43e19e(0x23f),_0x43e19e(0x2cb),_0x43e19e(0x23c),_0x43e19e(0x1f9),_0x43e19e(0x34d),_0x43e19e(0x252),_0x43e19e(0x82)];for(const _0x8634a7 of _0x535bef){if(_0x43e19e(0x331)!==_0x43e19e(0x35c)){const _0x259967=$gameScreen[_0x43e19e(0xdb)](this['_pictureId'],_0x8634a7);if(this[_0x43e19e(0x33f)][_0x8634a7]===_0x259967)continue;return!![];}else this[_0x43e19e(0x2d1)]=_0x236c7e(_0x156482[_0x43e19e(0x2d1)])[_0x43e19e(0x36a)](0x1,0xb);}return![];},Sprite_Picture[_0x2c555d(0x32a)][_0x2c555d(0x25b)]=function(_0x515581){const _0x1fc872=_0x2c555d;$gameScreen[_0x1fc872(0x1a3)](this[_0x1fc872(0x294)]);const _0x4e9461=$gameScreen[_0x1fc872(0xdb)](this[_0x1fc872(0x294)],_0x515581);this[_0x1fc872(0x33f)][_0x515581]=_0x4e9461;const _0x32218e=this['_pictureTextWindow'][_0x1fc872(0x12e)](_0x4e9461);let _0x59dbc2=$gameScreen['getPictureTextBuffer'](this['_pictureId']),_0x19c9b0=_0x59dbc2,_0x3f8422=_0x59dbc2;if(['up',_0x1fc872(0x23c),_0x1fc872(0x252)][_0x1fc872(0x1f1)](_0x515581))_0x1fc872(0x2b9)!==_0x1fc872(0x2b9)?(_0x4514af['MessageCore'][_0x1fc872(0x1c4)][_0x1fc872(0x127)](this),this[_0x1fc872(0x319)]=[]):_0x19c9b0=Math[_0x1fc872(0x2b1)]((this[_0x1fc872(0x1a4)]-_0x32218e[_0x1fc872(0x1a4)])/0x2);else['upperright',_0x1fc872(0x1f9),'lowerright'][_0x1fc872(0x1f1)](_0x515581)&&(_0x1fc872(0x24a)!==_0x1fc872(0x24a)?(this[_0x1fc872(0x204)](_0x5c714a),this['prepareAutoSizeEscapeCharacters'](_0x2fb0c4),this[_0x1fc872(0x3c6)]()):_0x19c9b0=Math[_0x1fc872(0x2b1)](this[_0x1fc872(0x1a4)]-_0x32218e[_0x1fc872(0x1a4)]-_0x59dbc2));if(['left',_0x1fc872(0x23c),_0x1fc872(0x1f9)][_0x1fc872(0x1f1)](_0x515581))_0x1fc872(0x149)!==_0x1fc872(0x149)?(_0x5018b4-=_0x26fc56[_0x1fc872(0xab)]+0x8,_0x2fe164*=_0x531eb1[_0x1fc872(0x2f3)](),_0x220632-=this[_0x1fc872(0xab)]*_0x4daaac[_0x1fc872(0x2f3)]()):_0x3f8422=Math[_0x1fc872(0x2b1)]((this[_0x1fc872(0xab)]-_0x32218e[_0x1fc872(0xab)])/0x2);else{if(['lowerleft',_0x1fc872(0x252),_0x1fc872(0x82)]['includes'](_0x515581)){if('rvIqR'===_0x1fc872(0x1a9))return!![];else _0x3f8422=Math[_0x1fc872(0x2b1)](this['height']-_0x32218e[_0x1fc872(0xab)]-_0x59dbc2);}}this[_0x1fc872(0x15d)][_0x1fc872(0x123)](_0x4e9461,_0x19c9b0,_0x3f8422);},Sprite_Picture[_0x2c555d(0x32a)][_0x2c555d(0xa7)]=function(){const _0x57f66b=_0x2c555d;if(!this['_pictureTextWindow'])return;if(!this[_0x57f66b(0x160)])return;this[_0x57f66b(0x160)]['bitmap']=this[_0x57f66b(0x15d)][_0x57f66b(0x273)];},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x10c)]=Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x298)],Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x298)]=function(_0x4daaaa){const _0x92aeb=_0x2c555d;this[_0x92aeb(0x270)](_0x4daaaa),VisuMZ['MessageCore']['Window_Base_initialize'][_0x92aeb(0x127)](this,_0x4daaaa);},Window_Base[_0x2c555d(0x32a)]['initMessageCore']=function(_0x255a49){const _0x263c8d=_0x2c555d;this[_0x263c8d(0x295)](),this[_0x263c8d(0x243)](),this[_0x263c8d(0x21d)](_0x255a49);},Window_Base[_0x2c555d(0x32a)]['initTextAlignement']=function(){const _0x5ef76a=_0x2c555d;this[_0x5ef76a(0x203)](_0x5ef76a(0x287));},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x203)]=function(_0x24eadd){const _0x3a6045=_0x2c555d;this[_0x3a6045(0x22a)]=_0x24eadd;},Window_Base['prototype'][_0x2c555d(0x170)]=function(){return this['_textAlignment'];},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x1e8)]=Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x12e)],Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x12e)]=function(_0x352d38){const _0x329798=_0x2c555d;return this[_0x329798(0x243)](),VisuMZ[_0x329798(0x245)][_0x329798(0x1e8)][_0x329798(0x127)](this,_0x352d38);},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x1c5)]=function(_0x16b420){const _0x35c2b2=_0x2c555d;return VisuMZ['MessageCore'][_0x35c2b2(0x1e8)][_0x35c2b2(0x127)](this,_0x16b420);},VisuMZ['MessageCore'][_0x2c555d(0x38d)]=Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x1aa)],Window_Base[_0x2c555d(0x32a)]['processAllText']=function(_0x53e347){const _0x2e486c=_0x2c555d;VisuMZ['MessageCore']['Window_Base_processAllText']['call'](this,_0x53e347);if(_0x53e347[_0x2e486c(0x299)])this['setTextAlignment']('default');},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x243)]=function(){const _0xd1fa28=_0x2c555d;this[_0xd1fa28(0x1fb)](![]);},Window_Base['prototype'][_0x2c555d(0x17b)]=function(){return this['_wordWrap'];},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x1fb)]=function(_0x4c7ec7){const _0x224452=_0x2c555d;return this[_0x224452(0x351)]=_0x4c7ec7,'';},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x21d)]=function(_0x24999f){const _0x331dab=_0x2c555d;this['_resetRect']=JsonEx[_0x331dab(0x382)](_0x24999f);},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x2e0)]=function(){const _0x564f76=_0x2c555d;this[_0x564f76(0x273)][_0x564f76(0x318)]=$gameSystem[_0x564f76(0x226)](),this[_0x564f76(0x273)][_0x564f76(0x133)]=$gameSystem[_0x564f76(0x179)](),this['contents'][_0x564f76(0x2a2)]=![],this[_0x564f76(0x273)][_0x564f76(0x394)]=![],this[_0x564f76(0x3af)]();},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x3af)]=function(){const _0x17275b=_0x2c555d;this[_0x17275b(0x1ce)](ColorManager[_0x17275b(0xb0)]()),this[_0x17275b(0x18d)](ColorManager[_0x17275b(0x171)]());const _0x33e567=VisuMZ['MessageCore'][_0x17275b(0x26a)][_0x17275b(0x146)];_0x33e567[_0x17275b(0x94)]===undefined&&('hQiPQ'!==_0x17275b(0x250)?this[_0x17275b(0x221)][_0x12da27][_0x17275b(0x31b)][0x1]=_0x2a3d60[_0x17275b(0x31b)][0x1]:_0x33e567[_0x17275b(0x94)]=0x3),this['contents']['outlineWidth']=_0x33e567[_0x17275b(0x94)],this[_0x17275b(0x9e)](![]);},Window_Base['prototype'][_0x2c555d(0x9e)]=function(_0x5275ac){this['_colorLock']=_0x5275ac;},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0xbe)]=function(){return this['_colorLock'];},Window_Base[_0x2c555d(0x32a)]['isAutoColorAffected']=function(){return![];},Window_Base[_0x2c555d(0x32a)]['getPreservedFontSettings']=function(){const _0x194911=_0x2c555d,_0x52003e=['fontFace',_0x194911(0x133),_0x194911(0x2a2),_0x194911(0x394),'textColor','outLineColor',_0x194911(0x208),_0x194911(0x37c)];let _0x2e1fc6={};for(const _0x2f9a3d of _0x52003e){_0x2e1fc6[_0x2f9a3d]=this[_0x194911(0x273)][_0x2f9a3d];}return _0x2e1fc6;},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x14c)]=function(_0x14cd5b){for(const _0x1359eb in _0x14cd5b){this['contents'][_0x1359eb]=_0x14cd5b[_0x1359eb];}},VisuMZ['MessageCore'][_0x2c555d(0x1d7)]=Window_Base[_0x2c555d(0x32a)]['update'],Window_Base['prototype'][_0x2c555d(0x1c9)]=function(){const _0x173356=_0x2c555d;VisuMZ['MessageCore']['Window_Base_update'][_0x173356(0x127)](this),this[_0x173356(0x17e)]();},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x222)]=function(){return![];},Window_Base['prototype'][_0x2c555d(0x17e)]=function(){const _0x1b2685=_0x2c555d;this['_moveDuration']>0x0&&(this[_0x1b2685(0x222)]()&&(this['x']=this[_0x1b2685(0x140)](this['x'],this['_moveTargetX']),this['y']=this[_0x1b2685(0x140)](this['y'],this[_0x1b2685(0x239)]),this[_0x1b2685(0x1a4)]=this[_0x1b2685(0x140)](this[_0x1b2685(0x1a4)],this[_0x1b2685(0x249)]),this[_0x1b2685(0xab)]=this[_0x1b2685(0x140)](this[_0x1b2685(0xab)],this[_0x1b2685(0x167)]),this[_0x1b2685(0x30b)]()),this[_0x1b2685(0x231)]--);},Window_Base[_0x2c555d(0x32a)]['clampPlacementPosition']=function(_0x18845d,_0x1dbb76){const _0x222e4c=_0x2c555d;!_0x18845d&&(this[_0x222e4c(0x1a4)]=Math['min'](this[_0x222e4c(0x1a4)],Graphics[_0x222e4c(0x1a4)]),this[_0x222e4c(0xab)]=Math[_0x222e4c(0x104)](this[_0x222e4c(0xab)],Graphics[_0x222e4c(0xab)]));if(!_0x1dbb76){const _0x2fb8ef=-(Math[_0x222e4c(0x2b1)](Graphics['width']-Graphics['boxWidth'])/0x2),_0x40332a=_0x2fb8ef+Graphics[_0x222e4c(0x1a4)]-this[_0x222e4c(0x1a4)],_0x2a8b7f=-(Math[_0x222e4c(0x2b1)](Graphics['height']-Graphics[_0x222e4c(0x27c)])/0x2),_0x3ee312=_0x2a8b7f+Graphics[_0x222e4c(0xab)]-this[_0x222e4c(0xab)];this['x']=this['x'][_0x222e4c(0x36a)](_0x2fb8ef,_0x40332a),this['y']=this['y']['clamp'](_0x2a8b7f,_0x3ee312);}},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x140)]=function(_0x1e278,_0x2c3b7f){const _0x1d7a7e=_0x2c555d,_0x25c7ec=this['_moveDuration'],_0x178c7f=this[_0x1d7a7e(0x357)],_0x506a9b=this[_0x1d7a7e(0x100)]((_0x178c7f-_0x25c7ec)/_0x178c7f),_0x8ff698=this[_0x1d7a7e(0x100)]((_0x178c7f-_0x25c7ec+0x1)/_0x178c7f),_0x40ac85=(_0x1e278-_0x2c3b7f*_0x506a9b)/(0x1-_0x506a9b);return _0x40ac85+(_0x2c3b7f-_0x40ac85)*_0x8ff698;},Window_Base['prototype'][_0x2c555d(0x100)]=function(_0x4f6ac8){const _0x35fe72=_0x2c555d,_0x294191=0x2;switch(this[_0x35fe72(0xf9)]){case 0x0:return _0x4f6ac8;case 0x1:return this[_0x35fe72(0x32d)](_0x4f6ac8,_0x294191);case 0x2:return this[_0x35fe72(0x2fb)](_0x4f6ac8,_0x294191);case 0x3:return this[_0x35fe72(0x30c)](_0x4f6ac8,_0x294191);default:if(Imported[_0x35fe72(0x3c4)])return VisuMZ[_0x35fe72(0x140)](_0x4f6ac8,this[_0x35fe72(0xf9)]);else{if('zyKGw'===_0x35fe72(0xac))return _0x4f6ac8;else this[_0x35fe72(0x377)][_0x30b896]!==_0x5d062b&&(this[_0x1713e9]=_0x1ca3d8(this[_0x35fe72(0x377)][_0x3117ff]));}}},Window_Base['prototype'][_0x2c555d(0x37a)]=function(_0x3e2945,_0x4c6a3b,_0x3ede71,_0x14e6a0,_0x16922d,_0x6d6857){const _0x5d292e=_0x2c555d;this[_0x5d292e(0xcf)]=_0x3e2945,this[_0x5d292e(0x239)]=_0x4c6a3b,this[_0x5d292e(0x249)]=_0x3ede71||this[_0x5d292e(0x1a4)],this['_moveTargetHeight']=_0x14e6a0||this[_0x5d292e(0xab)],this[_0x5d292e(0x231)]=_0x16922d||0x1;if(this['_moveDuration']<=0x0)this[_0x5d292e(0x231)]=0x1;this[_0x5d292e(0x357)]=this[_0x5d292e(0x231)],this['_moveEasingType']=_0x6d6857||0x0;if(_0x16922d<=0x0)this['updateMove']();},Window_Base['prototype'][_0x2c555d(0xce)]=function(_0x289592,_0x4b9954,_0x13586b,_0x4bf68c,_0x28af8f,_0x148a1b){const _0x3b6106=_0x2c555d;this['_moveTargetX']=this['x']+_0x289592,this[_0x3b6106(0x239)]=this['y']+_0x4b9954,this[_0x3b6106(0x249)]=this['width']+(_0x13586b||0x0),this[_0x3b6106(0x167)]=this['height']+(_0x4bf68c||0x0),this[_0x3b6106(0x231)]=_0x28af8f||0x1;if(this[_0x3b6106(0x231)]<=0x0)this[_0x3b6106(0x231)]=0x1;this[_0x3b6106(0x357)]=this['_moveDuration'],this[_0x3b6106(0xf9)]=_0x148a1b||0x0;if(_0x28af8f<=0x0)this[_0x3b6106(0x17e)]();},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x195)]=function(_0x263e24,_0x5bd61a){const _0x374124=_0x2c555d;this[_0x374124(0x37a)](this[_0x374124(0x35d)]['x'],this['_resetRect']['y'],this[_0x374124(0x35d)][_0x374124(0x1a4)],this[_0x374124(0x35d)][_0x374124(0xab)],_0x263e24,_0x5bd61a);},VisuMZ['MessageCore'][_0x2c555d(0xcd)]=Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x1ce)],Window_Base['prototype'][_0x2c555d(0x1ce)]=function(_0x1a54d4){const _0x341486=_0x2c555d;if(this[_0x341486(0xbe)]())return;_0x1a54d4=_0x1a54d4[_0x341486(0x276)](/\,/g,''),this[_0x341486(0x172)]=this[_0x341486(0x172)]||[],this[_0x341486(0x172)][_0x341486(0x110)](this['contents']['textColor']),VisuMZ['MessageCore'][_0x341486(0xcd)]['call'](this,_0x1a54d4);},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x22f)]=function(_0x1c3d0f){const _0x52aaf4=_0x2c555d;this['obtainEscapeParam'](_0x1c3d0f);if(this[_0x52aaf4(0xbe)]())return;_0x1c3d0f[_0x52aaf4(0x299)]&&(this[_0x52aaf4(0x172)]=this[_0x52aaf4(0x172)]||[],this[_0x52aaf4(0x273)]['textColor']=this[_0x52aaf4(0x172)][_0x52aaf4(0x10a)]()||ColorManager[_0x52aaf4(0xb0)]());},Window_Base[_0x2c555d(0x32a)]['convertEscapeCharacters']=function(_0x2fa9f8){const _0x50a756=_0x2c555d;return _0x2fa9f8=this[_0x50a756(0xd8)](_0x2fa9f8),_0x2fa9f8=this[_0x50a756(0x10e)](_0x2fa9f8),_0x2fa9f8=this[_0x50a756(0x339)](_0x2fa9f8),_0x2fa9f8=this[_0x50a756(0x297)](_0x2fa9f8),_0x2fa9f8=this[_0x50a756(0x3ad)](_0x2fa9f8),_0x2fa9f8=this[_0x50a756(0x2ce)](_0x2fa9f8),_0x2fa9f8=this[_0x50a756(0x324)](_0x2fa9f8),_0x2fa9f8=this[_0x50a756(0x113)](_0x2fa9f8),_0x2fa9f8=this[_0x50a756(0x315)](_0x2fa9f8),_0x2fa9f8=this[_0x50a756(0x14d)](_0x2fa9f8),_0x2fa9f8=this['convertHardcodedEscapeReplacements'](_0x2fa9f8),_0x2fa9f8=this[_0x50a756(0x338)](_0x2fa9f8),_0x2fa9f8=this[_0x50a756(0x2a0)](_0x2fa9f8),_0x2fa9f8=this[_0x50a756(0x27d)](_0x2fa9f8),_0x2fa9f8=this[_0x50a756(0x339)](_0x2fa9f8),_0x2fa9f8=this[_0x50a756(0x238)](_0x2fa9f8),_0x2fa9f8=this['prepareWordWrapEscapeCharacters'](_0x2fa9f8),_0x2fa9f8;},Window_Base['prototype'][_0x2c555d(0xd8)]=function(_0x3aefeb){const _0x26b331=_0x2c555d;this[_0x26b331(0x1a8)]=![];for(const _0x27f869 of VisuMZ[_0x26b331(0x245)]['Settings'][_0x26b331(0x288)]){'ITcne'!==_0x26b331(0x2aa)?_0x3aefeb[_0x26b331(0x23e)](_0x27f869[_0x26b331(0x1ac)])&&('VpgVH'!==_0x26b331(0x1f6)?(this[_0x26b331(0x1a8)]=!![],_0x3aefeb=_0x3aefeb['replace'](_0x27f869['textCodeCheck'],_0x27f869['textCodeResult'][_0x26b331(0x28f)](this))):_0x461489=this[_0x26b331(0x273)][_0x26b331(0x133)]):(this['_pictureText']=[],this[_0x26b331(0x214)]=[],this[_0x26b331(0x227)]=[]);}return _0x3aefeb;},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x10e)]=function(_0x57d599){const _0x19f6e6=_0x2c555d;return _0x57d599=_0x57d599[_0x19f6e6(0x276)](/\\/g,'\x1b'),_0x57d599=_0x57d599['replace'](/\x1b\x1b/g,'\x5c'),_0x57d599;},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x339)]=function(_0x52c0ac){const _0x30e2bd=_0x2c555d;for(;;){if(_0x30e2bd(0x3b1)!=='mbHUU')_0x185427['MessageCore'][_0x30e2bd(0x38a)][_0x30e2bd(0x127)](this),this[_0x30e2bd(0x76)](),this['process_VisuMZ_MessageCore_TextCodes_Replace'](),this[_0x30e2bd(0x1e1)](),this[_0x30e2bd(0x105)]();else{if(_0x52c0ac[_0x30e2bd(0x23e)](/\\V\[(\d+)\]/gi)){if('wNbRO'===_0x30e2bd(0x343))return _0xae7991['applyMoveEasing'](_0x4fae06,this[_0x30e2bd(0xf9)]);else _0x52c0ac=_0x52c0ac[_0x30e2bd(0x276)](/\\V\[(\d+)\]/gi,(_0x40e494,_0xd27d74)=>this['convertBackslashCharacters'](String($gameVariables['value'](parseInt(_0xd27d74)))));}else{if(_0x52c0ac[_0x30e2bd(0x23e)](/\x1bV\[(\d+)\]/gi))_0x52c0ac=_0x52c0ac[_0x30e2bd(0x276)](/\x1bV\[(\d+)\]/gi,(_0xc66943,_0xaa65bb)=>this[_0x30e2bd(0x10e)](String($gameVariables[_0x30e2bd(0x23a)](parseInt(_0xaa65bb)))));else break;}}}return _0x52c0ac;},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x297)]=function(_0x5f28c0){const _0x164b9e=_0x2c555d;if(Imported['VisuMZ_0_CoreEngine']){if(_0x164b9e(0x154)!==_0x164b9e(0x154))return this['processAutoSize'](_0x4cb96f,!![],!![]),this[_0x164b9e(0x11f)](_0x164b9e(0x236),_0x4478cd(_0x28e6a7)||0x0),'';else _0x5f28c0=_0x5f28c0['replace'](/<Up (?:KEY|BUTTON)>/gi,this[_0x164b9e(0x1d9)]('up')),_0x5f28c0=_0x5f28c0[_0x164b9e(0x276)](/<Left (?:KEY|BUTTON)>/gi,this[_0x164b9e(0x1d9)](_0x164b9e(0x2cb))),_0x5f28c0=_0x5f28c0[_0x164b9e(0x276)](/<Right (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('right')),_0x5f28c0=_0x5f28c0['replace'](/<Down (?:KEY|BUTTON)>/gi,this[_0x164b9e(0x1d9)]('down')),_0x5f28c0=_0x5f28c0['replace'](/<Ok (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('ok')),_0x5f28c0=_0x5f28c0[_0x164b9e(0x276)](/<Cancel (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x164b9e(0xec))),_0x5f28c0=_0x5f28c0[_0x164b9e(0x276)](/<Menu (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x164b9e(0x3a7))),_0x5f28c0=_0x5f28c0[_0x164b9e(0x276)](/<Shift (?:KEY|BUTTON)>/gi,this[_0x164b9e(0x1d9)](_0x164b9e(0x10a))),_0x5f28c0=_0x5f28c0['replace'](/<(?:PAGEUP|PAGE UP) (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x164b9e(0x311))),_0x5f28c0=_0x5f28c0[_0x164b9e(0x276)](/<(?:PAGEDOWN|PAGEDN|PAGE DOWN) (?:KEY|BUTTON)>/gi,this[_0x164b9e(0x1d9)]('pagedown'));}return _0x5f28c0;},Window_Base[_0x2c555d(0x32a)]['convertButtonAssistText']=function(_0x18988f){const _0x40e586=_0x2c555d;let _0x5de959=TextManager[_0x40e586(0x194)](_0x18988f)||'';return _0x5de959=this[_0x40e586(0x10e)](_0x5de959),_0x5de959=this['convertVariableEscapeCharacters'](_0x5de959),_0x5de959[_0x40e586(0x116)]();},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x3ad)]=function(_0x17240d){const _0x495e89=_0x2c555d;return this[_0x495e89(0x36f)](),_0x17240d;},Window_Base['prototype'][_0x2c555d(0x27d)]=function(_0x31d8f1){return _0x31d8f1;},Window_Base[_0x2c555d(0x32a)]['convertShowChoiceEscapeCodes']=function(_0x1f216f){const _0x383319=_0x2c555d;return this[_0x383319(0x1fe)]()&&(_0x1f216f=_0x1f216f[_0x383319(0x276)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x1f216f=_0x1f216f[_0x383319(0x276)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x1f216f=_0x1f216f[_0x383319(0x276)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x1f216f=_0x1f216f[_0x383319(0x276)](/<CHOICE WIDTH:[ ](\d+)>/gi,''),_0x1f216f=_0x1f216f[_0x383319(0x276)](/<CHOICE INDENT:[ ](\d+)>/gi,''),_0x1f216f=_0x1f216f[_0x383319(0x276)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi,'')),_0x1f216f;},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x1fe)]=function(){const _0x346711=_0x2c555d,_0xc118ed=[_0x346711(0x24c),_0x346711(0x3ae)];return _0xc118ed[_0x346711(0x1f1)](this['constructor'][_0x346711(0x322)]);},Window_Base[_0x2c555d(0x32a)]['convertFontSettingsEscapeCharacters']=function(_0x35039a){const _0x10ea8b=_0x2c555d;return _0x35039a=_0x35039a['replace'](/<B>/gi,'\x1bBOLD[1]'),_0x35039a=_0x35039a[_0x10ea8b(0x276)](/<\/B>/gi,_0x10ea8b(0x29e)),_0x35039a=_0x35039a[_0x10ea8b(0x276)](/<I>/gi,_0x10ea8b(0x11a)),_0x35039a=_0x35039a[_0x10ea8b(0x276)](/<\/I>/gi,'\x1bITALIC[0]'),_0x35039a;},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x113)]=function(_0x2a0e31){const _0x23e79a=_0x2c555d;return _0x2a0e31=_0x2a0e31[_0x23e79a(0x276)](/<LEFT>/gi,_0x23e79a(0x16d)),_0x2a0e31=_0x2a0e31[_0x23e79a(0x276)](/<\/LEFT>/gi,_0x23e79a(0x1dd)),_0x2a0e31=_0x2a0e31[_0x23e79a(0x276)](/<CENTER>/gi,'\x1bTEXTALIGNMENT[2]'),_0x2a0e31=_0x2a0e31['replace'](/<\/CENTER>/gi,_0x23e79a(0x1dd)),_0x2a0e31=_0x2a0e31[_0x23e79a(0x276)](/<RIGHT>/gi,_0x23e79a(0x6c)),_0x2a0e31=_0x2a0e31['replace'](/<\/RIGHT>/gi,_0x23e79a(0x1dd)),_0x2a0e31;},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x315)]=function(_0x327ac4){const _0x4a7756=_0x2c555d;return _0x327ac4=_0x327ac4[_0x4a7756(0x276)](/<COLORLOCK>/gi,'\x1bCOLORLOCK[1]'),_0x327ac4=_0x327ac4[_0x4a7756(0x276)](/<\/COLORLOCK>/gi,_0x4a7756(0x2a6)),_0x327ac4=_0x327ac4[_0x4a7756(0x276)](/\(\(\(/gi,'\x1bCOLORLOCK[1]'),_0x327ac4=_0x327ac4['replace'](/\)\)\)/gi,_0x4a7756(0x2a6)),_0x327ac4;},Window_Base[_0x2c555d(0x32a)]['convertBaseEscapeCharacters']=function(_0x9068b9){const _0xa7a563=_0x2c555d;return _0x9068b9=_0x9068b9[_0xa7a563(0x276)](/\x1bN\[(\d+)\]/gi,(_0x5d3c3a,_0x3bf2f2)=>this[_0xa7a563(0x37b)](parseInt(_0x3bf2f2))),_0x9068b9=_0x9068b9[_0xa7a563(0x276)](/\x1bP\[(\d+)\]/gi,(_0x4adea2,_0x1b148)=>this['partyMemberName'](parseInt(_0x1b148))),_0x9068b9=_0x9068b9[_0xa7a563(0x276)](/\x1bG/gi,TextManager[_0xa7a563(0x9c)]),_0x9068b9;},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x34c)]=function(_0x191fd7){const _0x158711=_0x2c555d;return _0x191fd7=_0x191fd7[_0x158711(0x276)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0x158711(0x2e2)]()),_0x191fd7=_0x191fd7[_0x158711(0x276)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this[_0x158711(0x2d0)]()),_0x191fd7=_0x191fd7[_0x158711(0x276)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this['battleActionName'](!![])),_0x191fd7=_0x191fd7[_0x158711(0x276)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this['battleActionName'](![])),_0x191fd7;},Window_Base['prototype'][_0x2c555d(0x2e2)]=function(){const _0x25c408=_0x2c555d;if(!SceneManager[_0x25c408(0x6a)]())return'';if(BattleManager[_0x25c408(0xc9)])return BattleManager[_0x25c408(0xc9)][_0x25c408(0x322)]();if(BattleManager['_targets'][0x0])return BattleManager[_0x25c408(0x141)][0x0][_0x25c408(0x322)]();return'';},Window_Base[_0x2c555d(0x32a)]['battleUserName']=function(){const _0x269cd4=_0x2c555d;if(!SceneManager['isSceneBattle']())return'';let _0x22af1a=null;_0x22af1a=BattleManager['_subject'];if(!_0x22af1a&&BattleManager[_0x269cd4(0x92)]()){if(_0x269cd4(0x3bd)!==_0x269cd4(0x3bd)){if(!this[_0x269cd4(0x15d)])return;if(!this[_0x269cd4(0x33e)]())return;const _0x3a8f66=[_0x269cd4(0x129),'up',_0x269cd4(0x23f),_0x269cd4(0x2cb),_0x269cd4(0x23c),'right',_0x269cd4(0x34d),_0x269cd4(0x252),_0x269cd4(0x82)];this[_0x269cd4(0x15d)][_0x269cd4(0x1b8)]();for(const _0x1ee0a1 of _0x3a8f66){this[_0x269cd4(0x25b)](_0x1ee0a1);}}else _0x22af1a=BattleManager[_0x269cd4(0x10b)]();}return _0x22af1a?_0x22af1a[_0x269cd4(0x322)]():'';},Window_Base[_0x2c555d(0x32a)]['battleActionName']=function(_0x338c82){const _0x599856=_0x2c555d;if(!SceneManager[_0x599856(0x6a)]())return'';let _0x1f5134=BattleManager['_action']||null;!_0x1f5134&&BattleManager[_0x599856(0x92)]()&&(_0x599856(0x368)!==_0x599856(0x368)?(this[_0x599856(0x1fc)]=_0xa6aa75,this['_eventId']=_0x51ea4a||0x0,this['refresh']()):_0x1f5134=BattleManager[_0x599856(0x200)]());if(_0x1f5134&&_0x1f5134['item']()){let _0x1534d0='';if(_0x338c82)_0x1534d0+=_0x599856(0x23b)[_0x599856(0x35e)](_0x1f5134[_0x599856(0x397)]()['iconIndex']);return _0x1534d0+=_0x1f5134[_0x599856(0x397)]()['name'],_0x1534d0;}return'';},Window_Base[_0x2c555d(0x32a)]['convertMessageCoreEscapeActions']=function(_0xc3bc0c){const _0xc57bae=_0x2c555d;for(const _0x19b3d6 of VisuMZ[_0xc57bae(0x245)][_0xc57bae(0x26a)][_0xc57bae(0x1ff)]){_0xc3bc0c[_0xc57bae(0x23e)](_0x19b3d6[_0xc57bae(0x1ac)])&&(_0xc57bae(0x2c4)===_0xc57bae(0x286)?(_0x31c17b[_0xc57bae(0x245)][_0xc57bae(0x3d9)]['call'](this),this[_0xc57bae(0x135)]()):(_0xc3bc0c=_0xc3bc0c['replace'](_0x19b3d6[_0xc57bae(0x1ac)],_0x19b3d6[_0xc57bae(0x22e)]),_0xc3bc0c=this[_0xc57bae(0x339)](_0xc3bc0c)));}return _0xc3bc0c;},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x2a0)]=function(_0x18581c){const _0x1d06a2=_0x2c555d;for(const _0x11e386 of VisuMZ[_0x1d06a2(0x245)][_0x1d06a2(0x26a)][_0x1d06a2(0x314)]){_0x1d06a2(0x2dc)!==_0x1d06a2(0x2dc)?(_0x49d487=_0x7d157f[_0x1d06a2(0x276)](/[\n\r]+/g,''),_0xbd0d0=_0x1addb0[_0x1d06a2(0x276)](/<(?:BR|LINEBREAK)>/gi,'\x0a')):_0x18581c['match'](_0x11e386['textCodeCheck'])&&(_0x18581c=_0x18581c[_0x1d06a2(0x276)](_0x11e386[_0x1d06a2(0x1ac)],_0x11e386['textCodeResult'][_0x1d06a2(0x28f)](this)),_0x18581c=this[_0x1d06a2(0x339)](_0x18581c));}return _0x18581c;},Window_Base[_0x2c555d(0x32a)]['actorName']=function(_0x1c59af){const _0x78a574=_0x2c555d,_0xcfdf30=_0x1c59af>=0x1?$gameActors[_0x78a574(0x10b)](_0x1c59af):null,_0x505dd0=_0xcfdf30?_0xcfdf30[_0x78a574(0x322)]():'',_0x54f8e9=Number(VisuMZ[_0x78a574(0x245)][_0x78a574(0x26a)][_0x78a574(0x279)][_0x78a574(0x284)]);return this[_0x78a574(0x3a5)]()&&_0x54f8e9!==0x0?_0x78a574(0x3b5)[_0x78a574(0x35e)](_0x54f8e9,_0x505dd0):_0x505dd0;},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x29a)]=function(_0x5ae739){const _0x1c47bd=_0x2c555d,_0x257734=_0x5ae739>=0x1?$gameParty[_0x1c47bd(0x3a0)]()[_0x5ae739-0x1]:null,_0x400b79=_0x257734?_0x257734[_0x1c47bd(0x322)]():'',_0x39dffb=Number(VisuMZ[_0x1c47bd(0x245)][_0x1c47bd(0x26a)][_0x1c47bd(0x279)][_0x1c47bd(0x284)]);if(this[_0x1c47bd(0x3a5)]()&&_0x39dffb!==0x0){if(_0x1c47bd(0x3a4)!==_0x1c47bd(0x107))return _0x1c47bd(0x3b5)[_0x1c47bd(0x35e)](_0x39dffb,_0x400b79);else{if(this[_0x1c47bd(0x247)]===_0xd67bdf)this['initMessageCore']();if(this[_0x1c47bd(0x247)][_0x1c47bd(0x396)]===_0x4e3069)this[_0x1c47bd(0x270)]();return this[_0x1c47bd(0x247)][_0x1c47bd(0x396)];}}else return _0x400b79;},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x238)]=function(_0x4e4875){const _0x868811=_0x2c555d;return this['isAutoColorAffected']()&&(_0x4e4875=this[_0x868811(0x91)](_0x4e4875),_0x4e4875=this[_0x868811(0x233)](_0x4e4875)),_0x4e4875;},Window_Base[_0x2c555d(0x32a)]['processStoredAutoColorChanges']=function(_0x3c88e6){const _0x1baaec=_0x2c555d;for(autoColor of VisuMZ['MessageCore'][_0x1baaec(0x78)]){_0x3c88e6=_0x3c88e6[_0x1baaec(0x276)](autoColor[0x0],autoColor[0x1]);}return _0x3c88e6;},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x12c)]=function(){const _0x4ec60f=_0x2c555d;this[_0x4ec60f(0xf6)]=[];},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x36f)]=function(){const _0x4ed72d=_0x2c555d;this[_0x4ed72d(0x12c)]();const _0x3a696d=VisuMZ[_0x4ed72d(0x245)]['Settings'][_0x4ed72d(0x279)],_0x4d4f77=_0x3a696d[_0x4ed72d(0x284)];if(_0x4d4f77<=0x0)return;for(const _0x209df5 of $gameActors[_0x4ed72d(0x89)]){if('INIOC'!==_0x4ed72d(0x2ec)){if(!_0x209df5)continue;const _0x46780c=_0x209df5[_0x4ed72d(0x322)]();if(_0x46780c[_0x4ed72d(0x116)]()[_0x4ed72d(0x240)]<=0x0)continue;if(/^\d+$/[_0x4ed72d(0x148)](_0x46780c))continue;if(_0x46780c[_0x4ed72d(0x23e)](/-----/i))continue;let _0x507a45=VisuMZ['MessageCore'][_0x4ed72d(0x1bd)](_0x46780c);const _0x87eb3a=new RegExp('\x5cb'+_0x507a45+'\x5cb','g'),_0x4a6361=_0x4ed72d(0x3b5)[_0x4ed72d(0x35e)](_0x4d4f77,_0x46780c);this[_0x4ed72d(0xf6)][_0x4ed72d(0x352)]([_0x87eb3a,_0x4a6361]);}else{if(this[_0x4ed72d(0x247)]===_0x4d7182)this[_0x4ed72d(0x270)]();if(this[_0x4ed72d(0x247)]['choiceLineHeight']===_0x156c4f)this[_0x4ed72d(0x270)]();return this[_0x4ed72d(0x247)]['choiceLineHeight'];}}},Window_Base['prototype'][_0x2c555d(0x233)]=function(_0x150c1b){const _0x2ab06c=_0x2c555d;this[_0x2ab06c(0xf6)]===undefined&&this[_0x2ab06c(0x36f)]();for(autoColor of this[_0x2ab06c(0xf6)]){if('aQuBu'!=='aQuBu')return _0x323b44=_0x5d05ba['replace'](/\\/g,'\x1b'),_0x4b4618=_0x2ea053['replace'](/\x1b\x1b/g,'\x5c'),_0x1e8665;else _0x150c1b=_0x150c1b[_0x2ab06c(0x276)](autoColor[0x0],autoColor[0x1]);}return _0x150c1b;},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x269)]=function(_0x2df948,_0x395215,_0x24a705){const _0x3c3233=_0x2c555d;if(!_0x2df948)return'';const _0x22502a=_0x2df948[_0x395215];let _0x4b4d03='';if(_0x22502a&&_0x24a705&&_0x22502a[_0x3c3233(0x165)]){if(_0x3c3233(0x9d)!==_0x3c3233(0x205)){const _0x72f07c=_0x3c3233(0x18e);_0x4b4d03=_0x72f07c[_0x3c3233(0x35e)](_0x22502a['iconIndex'],_0x22502a[_0x3c3233(0x322)]);}else _0x368fd4[_0x3c3233(0x199)]();}else{if(_0x22502a){if(_0x3c3233(0xe5)!==_0x3c3233(0x272))_0x4b4d03=_0x22502a[_0x3c3233(0x322)];else{const _0x5ebc49=_0x16edaf['$1'][_0x3c3233(0x88)](',')[_0x3c3233(0x2c0)](_0x51019f=>_0x11ad1e(_0x51019f)||0x0);for(const _0x1bf180 of _0x5ebc49){if(!_0x43cacf[_0x3c3233(0x23a)](_0x1bf180))return![];}return!![];}}else _0x4b4d03='';}return this[_0x3c3233(0x3a5)]()&&(_0x4b4d03=this['applyDatabaseAutoColor'](_0x4b4d03,_0x2df948)),_0x4b4d03;},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x2d5)]=function(){const _0x367bb8=_0x2c555d,_0x7857ab=$gameParty['getLastGainedItemData']();if(_0x7857ab['id']<0x0)return'';let _0xad782c=null;if(_0x7857ab['type']===0x0)_0xad782c=$dataItems[_0x7857ab['id']];if(_0x7857ab[_0x367bb8(0x230)]===0x1)_0xad782c=$dataWeapons[_0x7857ab['id']];if(_0x7857ab['type']===0x2)_0xad782c=$dataArmors[_0x7857ab['id']];if(!_0xad782c)return'';return _0x367bb8(0x75)[_0x367bb8(0x35e)](_0xad782c[_0x367bb8(0x165)]);},Window_Base[_0x2c555d(0x32a)]['lastGainedObjectName']=function(_0x3d813e){const _0x4bd18c=_0x2c555d,_0x4be743=$gameParty[_0x4bd18c(0x283)]();if(_0x4be743['id']<0x0)return'';let _0x9e5e54=null;if(_0x4be743[_0x4bd18c(0x230)]===0x0)_0x9e5e54=$dataItems[_0x4be743['id']];if(_0x4be743['type']===0x1)_0x9e5e54=$dataWeapons[_0x4be743['id']];if(_0x4be743[_0x4bd18c(0x230)]===0x2)_0x9e5e54=$dataArmors[_0x4be743['id']];if(!_0x9e5e54)return'';return _0x3d813e?_0x4bd18c(0x18e)[_0x4bd18c(0x35e)](_0x9e5e54[_0x4bd18c(0x165)],_0x9e5e54[_0x4bd18c(0x322)]):_0x9e5e54['name'];},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x19c)]=function(){const _0x145aa6=_0x2c555d,_0x13d024=$gameParty[_0x145aa6(0x283)]();if(_0x13d024['id']<=0x0)return'';return _0x13d024[_0x145aa6(0x364)];},Window_Base['prototype'][_0x2c555d(0xc4)]=function(_0x11fc81,_0x743d47){const _0x6104ec=_0x2c555d,_0x2ffc9d=VisuMZ['MessageCore'][_0x6104ec(0x26a)][_0x6104ec(0x279)];let _0x452720=0x0;if(_0x743d47===$dataActors)_0x452720=_0x2ffc9d[_0x6104ec(0x284)];if(_0x743d47===$dataClasses)_0x452720=_0x2ffc9d[_0x6104ec(0x6f)];if(_0x743d47===$dataSkills)_0x452720=_0x2ffc9d['Skills'];if(_0x743d47===$dataItems)_0x452720=_0x2ffc9d['Items'];if(_0x743d47===$dataWeapons)_0x452720=_0x2ffc9d[_0x6104ec(0x366)];if(_0x743d47===$dataArmors)_0x452720=_0x2ffc9d[_0x6104ec(0xa4)];if(_0x743d47===$dataEnemies)_0x452720=_0x2ffc9d[_0x6104ec(0x7a)];if(_0x743d47===$dataStates)_0x452720=_0x2ffc9d[_0x6104ec(0x228)];return _0x452720>0x0&&(_0x11fc81='\x1bC[%1]%2\x1bPREVCOLOR[0]'['format'](_0x452720,_0x11fc81)),_0x11fc81;},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x246)]=function(_0x17be07){const _0x7be948=_0x2c555d;if(_0x17be07['includes']('\x1bTEXTALIGNMENT'))return this['setWordWrap'](![]),_0x17be07=_0x17be07[_0x7be948(0x276)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'),_0x17be07;_0x17be07=_0x17be07['replace'](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x246570,_0x2a9fdc)=>this[_0x7be948(0x1fb)](!![])),_0x17be07=_0x17be07[_0x7be948(0x276)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x4f44f3,_0xb9ef91)=>this[_0x7be948(0x1fb)](![])),_0x17be07=_0x17be07[_0x7be948(0x276)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x435eec,_0x4167d1)=>this[_0x7be948(0x1fb)](![]));if(_0x17be07[_0x7be948(0x23e)](Window_Message['_autoSizeRegexp']))this[_0x7be948(0x1fb)](![]);else _0x17be07[_0x7be948(0x23e)](Window_Message[_0x7be948(0x2e5)])&&this['setWordWrap'](![]);if(!this['isWordWrapEnabled']())return _0x17be07=_0x17be07[_0x7be948(0x276)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'),_0x17be07;if(_0x17be07[_0x7be948(0x240)]<=0x0)return _0x17be07;return _0x17be07[_0x7be948(0x23e)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)&&(_0x17be07=VisuMZ[_0x7be948(0x245)][_0x7be948(0x3c7)](_0x17be07)['join']('')),VisuMZ[_0x7be948(0x245)][_0x7be948(0x26a)][_0x7be948(0x2af)][_0x7be948(0x207)]?(_0x17be07=_0x17be07[_0x7be948(0x276)](/[\n\r]+/g,'\x20'),_0x17be07=_0x17be07[_0x7be948(0x276)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):_0x7be948(0x25c)!==_0x7be948(0x3b3)?(_0x17be07=_0x17be07[_0x7be948(0x276)](/[\n\r]+/g,''),_0x17be07=_0x17be07['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a')):(this[_0x7be948(0x383)](_0x45b311,_0x65d679,_0x3552d1),this[_0x7be948(0x296)](_0x579cd2,_0x557f0e,_0x378468),this['addExtraShowChoices'](_0x43f0d5,_0x4fb717)),_0x17be07=this[_0x7be948(0x393)](_0x17be07),_0x17be07=_0x17be07[_0x7be948(0x88)]('\x20')[_0x7be948(0x3aa)](_0x7be948(0x1af)),_0x17be07=_0x17be07['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x17be07=_0x17be07['replace'](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x17be07;},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x3c7)]=function(_0x3fc2a9){const _0x1bb844=_0x2c555d;let _0x13b421=[],_0x17cf6f='';while(_0x3fc2a9[_0x1bb844(0x240)]>0x0){const _0x3da882=_0x3fc2a9[_0x1bb844(0x220)](0x0);_0x3fc2a9=_0x3fc2a9[_0x1bb844(0x275)](0x1),_0x3da882[_0x1bb844(0x23e)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)?_0x1bb844(0x31c)===_0x1bb844(0x31c)?(_0x17cf6f['length']>0x0&&(_0x13b421[_0x1bb844(0x352)](_0x17cf6f),_0x17cf6f=''),_0x13b421[_0x1bb844(0x352)](_0x3da882+_0x1bb844(0xf1))):(this[_0x1bb844(0x198)](),_0x59bcdd[_0x1bb844(0x245)][_0x1bb844(0x2ef)][_0x1bb844(0x127)](this)):_0x17cf6f+=_0x3da882;}return _0x17cf6f[_0x1bb844(0x240)]>0x0&&(_0x1bb844(0x3b8)!==_0x1bb844(0x3b8)?_0x31e456[_0x1bb844(0x245)][_0x1bb844(0x80)][_0x1bb844(0x127)](this,_0x332185,_0x370031,_0x14cc6e,_0x15b27f):(_0x13b421[_0x1bb844(0x352)](_0x17cf6f),_0x17cf6f='')),_0x13b421;},Window_Base['prototype'][_0x2c555d(0x393)]=function(_0x58a6d5){return _0x58a6d5;},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x1fa)]=Window_Base[_0x2c555d(0x32a)][_0x2c555d(0xd6)],Window_Base[_0x2c555d(0x32a)][_0x2c555d(0xd6)]=function(_0x1c762d){const _0x2a491a=_0x2c555d;VisuMZ[_0x2a491a(0x245)][_0x2a491a(0x1fa)][_0x2a491a(0x127)](this,_0x1c762d),this[_0x2a491a(0x2e3)](_0x1c762d);},VisuMZ['MessageCore'][_0x2c555d(0x3b0)]=Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x386)],Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x386)]=function(_0x3e273c,_0x58bcf0){const _0x5c2295=_0x2c555d;VisuMZ['MessageCore'][_0x5c2295(0x3b0)][_0x5c2295(0x127)](this,_0x3e273c,_0x58bcf0);if(_0x58bcf0===_0x5c2295(0x1af))this['processWrapBreak'](_0x3e273c);else{if(_0x58bcf0==='\x1bWrapJpBreak[0]'){if('cCnfl'===_0x5c2295(0xf7))return this[_0x5c2295(0xeb)](_0x5dfc9a,!![],!![]),this['processAutoPosition']('battle\x20enemy',_0x5baa16(_0x102c1a)||0x0),'';else this[_0x5c2295(0x2de)](_0x3e273c,!![]);}}},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x306)]=function(_0x3bf39f){const _0x1ca331=_0x2c555d;var _0x487d40=/^\<(.*?)\>/[_0x1ca331(0x2ae)](_0x3bf39f['text'][_0x1ca331(0x275)](_0x3bf39f[_0x1ca331(0x169)]));if(_0x487d40){if(_0x1ca331(0x1c7)===_0x1ca331(0x346)){if(_0x1f180c[_0x1ca331(0x267)]!==_0x3f0015)return![];}else return _0x3bf39f[_0x1ca331(0x169)]+=_0x487d40[0x0]['length'],String(_0x487d40[0x0]['slice'](0x1,_0x487d40[0x0][_0x1ca331(0x240)]-0x1));}else return'';},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x3a8)]=Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x1b7)],Window_Base[_0x2c555d(0x32a)]['processEscapeCharacter']=function(_0x5daefe,_0xfb7e42){const _0x4ade5a=_0x2c555d;switch(_0x5daefe){case'C':_0xfb7e42[_0x4ade5a(0x299)]?VisuMZ[_0x4ade5a(0x245)][_0x4ade5a(0x3a8)][_0x4ade5a(0x127)](this,_0x5daefe,_0xfb7e42):this['obtainEscapeParam'](_0xfb7e42);break;case'I':case'{':case'}':VisuMZ[_0x4ade5a(0x245)][_0x4ade5a(0x3a8)]['call'](this,_0x5daefe,_0xfb7e42);break;case'FS':this[_0x4ade5a(0x369)](_0xfb7e42);break;case'PX':this[_0x4ade5a(0x28d)](_0xfb7e42);break;case'PY':this['processPyTextCode'](_0xfb7e42);break;case _0x4ade5a(0xb4):this['processFontChangeBold'](this['obtainEscapeParam'](_0xfb7e42));break;case'CENTERPICTURE':this[_0x4ade5a(0xe2)](_0xfb7e42);break;case _0x4ade5a(0x128):this['processColorLock'](_0xfb7e42);break;case'COMMONEVENT':this[_0x4ade5a(0xcb)](_0xfb7e42);break;case'ITALIC':this[_0x4ade5a(0x125)](this[_0x4ade5a(0xca)](_0xfb7e42));break;case'PICTURE':this['processDrawPicture'](_0xfb7e42);break;case'PREVCOLOR':this[_0x4ade5a(0x22f)](_0xfb7e42);break;case'TEXTALIGNMENT':this['processTextAlignmentChange'](_0xfb7e42);break;case'WAIT':this[_0x4ade5a(0x186)](_0xfb7e42);break;case'WRAPBREAK':this['processWrapBreak'](_0xfb7e42);break;case _0x4ade5a(0x130):this[_0x4ade5a(0x2de)](_0xfb7e42,!![]);break;default:this['processMessageCoreEscapeActions'](_0x5daefe,_0xfb7e42);}},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x9f)]=function(_0x588d85,_0x8b708){const _0xc09798=_0x2c555d;for(const _0x1c3f89 of VisuMZ[_0xc09798(0x245)][_0xc09798(0x26a)][_0xc09798(0x1ff)]){if(_0xc09798(0x2f1)===_0xc09798(0x2f1)){if(_0x1c3f89['Match']===_0x588d85){if(_0x1c3f89[_0xc09798(0x3b6)]==='')this[_0xc09798(0xca)](_0x8b708);_0x1c3f89['ActionJS'][_0xc09798(0x127)](this,_0x8b708);if(this[_0xc09798(0x392)]===Window_Message){const _0xac9234=_0x1c3f89[_0xc09798(0x317)]||0x0;if(_0xac9234>0x0)this[_0xc09798(0x8d)](_0xac9234);}}}else this['_colorLock']=_0x13af1b;}},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x1e6)]=function(){const _0x156b4d=_0x2c555d;this[_0x156b4d(0x273)][_0x156b4d(0x133)]+=VisuMZ[_0x156b4d(0x245)][_0x156b4d(0x26a)][_0x156b4d(0x146)][_0x156b4d(0x30a)],this['contents'][_0x156b4d(0x133)]=Math[_0x156b4d(0x104)](this['contents'][_0x156b4d(0x133)],VisuMZ[_0x156b4d(0x245)][_0x156b4d(0x26a)][_0x156b4d(0x146)][_0x156b4d(0x1de)]);},Window_Base['prototype'][_0x2c555d(0x16f)]=function(){const _0x2460a8=_0x2c555d;this['contents']['fontSize']-=VisuMZ[_0x2460a8(0x245)]['Settings'][_0x2460a8(0x146)]['FontChangeValue'],this[_0x2460a8(0x273)][_0x2460a8(0x133)]=Math[_0x2460a8(0x168)](this[_0x2460a8(0x273)][_0x2460a8(0x133)],VisuMZ[_0x2460a8(0x245)][_0x2460a8(0x26a)]['General'][_0x2460a8(0x1ec)]);},Window_Base['prototype'][_0x2c555d(0x369)]=function(_0x35355f){const _0x480975=_0x2c555d,_0x260fa7=this[_0x480975(0xca)](_0x35355f);this[_0x480975(0x273)]['fontSize']=_0x260fa7[_0x480975(0x36a)](VisuMZ[_0x480975(0x245)][_0x480975(0x26a)]['General'][_0x480975(0x1ec)],VisuMZ[_0x480975(0x245)][_0x480975(0x26a)][_0x480975(0x146)][_0x480975(0x1de)]);},Window_Base[_0x2c555d(0x32a)]['maxFontSizeInLine']=function(_0x48583e){const _0x22d4eb=_0x2c555d;let _0x408a67=this[_0x22d4eb(0x273)][_0x22d4eb(0x133)];const _0x4587f9=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){if(_0x22d4eb(0xc8)==='aZulf')_0x119c22=!![],_0x24087f=_0x39f2ce[_0x22d4eb(0x276)](/<SHUFFLE>/gi,'');else{const _0x111cf8=_0x4587f9[_0x22d4eb(0x2ae)](_0x48583e);if(!_0x111cf8)break;const _0x4de456=String(_0x111cf8[0x1])[_0x22d4eb(0x28a)]();if(_0x4de456==='{')this[_0x22d4eb(0x1e6)]();else{if(_0x4de456==='}')this[_0x22d4eb(0x16f)]();else _0x4de456==='FS'&&(this[_0x22d4eb(0x273)][_0x22d4eb(0x133)]=parseInt(_0x111cf8[0x3])[_0x22d4eb(0x36a)](VisuMZ['MessageCore'][_0x22d4eb(0x26a)][_0x22d4eb(0x146)][_0x22d4eb(0x1ec)],VisuMZ[_0x22d4eb(0x245)][_0x22d4eb(0x26a)]['General'][_0x22d4eb(0x1de)]));}this['contents'][_0x22d4eb(0x133)]>_0x408a67&&(_0x408a67=this[_0x22d4eb(0x273)][_0x22d4eb(0x133)]);}}return _0x408a67;},Window_Base[_0x2c555d(0x32a)]['processPxTextCode']=function(_0x3dc2e5){const _0x1794e7=_0x2c555d;_0x3dc2e5['x']=this[_0x1794e7(0xca)](_0x3dc2e5),VisuMZ['MessageCore'][_0x1794e7(0x26a)][_0x1794e7(0x146)][_0x1794e7(0x3be)]&&(_0x3dc2e5['x']+=_0x3dc2e5[_0x1794e7(0x2be)]);},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x22b)]=function(_0x2ce1b4){const _0x152f78=_0x2c555d;_0x2ce1b4['y']=this[_0x152f78(0xca)](_0x2ce1b4);if(VisuMZ[_0x152f78(0x245)]['Settings'][_0x152f78(0x146)][_0x152f78(0x3be)]){if(_0x152f78(0x2df)===_0x152f78(0x2df))_0x2ce1b4['y']+=_0x2ce1b4[_0x152f78(0x2e4)];else return this[_0x152f78(0x351)];}},Window_Base['prototype'][_0x2c555d(0x12f)]=function(_0x28c071){const _0x45af3e=_0x2c555d;this[_0x45af3e(0x273)][_0x45af3e(0x2a2)]=!!_0x28c071;},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x125)]=function(_0x259ecc){const _0x4e79cb=_0x2c555d;this[_0x4e79cb(0x273)][_0x4e79cb(0x394)]=!!_0x259ecc;},Window_Base[_0x2c555d(0x32a)]['processTextAlignmentChange']=function(_0x408170){const _0x22d512=_0x2c555d,_0x3bd41b=this[_0x22d512(0xca)](_0x408170);if(!_0x408170['drawing'])return;switch(_0x3bd41b){case 0x0:this[_0x22d512(0x203)]('default');return;case 0x1:this[_0x22d512(0x203)](_0x22d512(0x2cb));break;case 0x2:this[_0x22d512(0x203)](_0x22d512(0x23c));break;case 0x3:this[_0x22d512(0x203)](_0x22d512(0x1f9));break;}this[_0x22d512(0x2e3)](_0x408170);},Window_Base[_0x2c555d(0x32a)]['processTextAlignmentX']=function(_0x4b83d9){const _0x4cd9d9=_0x2c555d;if(!_0x4b83d9['drawing'])return;if(_0x4b83d9[_0x4cd9d9(0x360)])return;if(this['getTextAlignment']()===_0x4cd9d9(0x287))return;let _0x52fc79=_0x4b83d9[_0x4cd9d9(0xda)][_0x4cd9d9(0x11b)]('\x1bTEXTALIGNMENT',_0x4b83d9[_0x4cd9d9(0x169)]+0x1),_0x5b181b=_0x4b83d9[_0x4cd9d9(0xda)][_0x4cd9d9(0x11b)]('\x0a',_0x4b83d9['index']+0x1);if(_0x52fc79<0x0)_0x52fc79=_0x4b83d9['text'][_0x4cd9d9(0x240)]+0x1;if(_0x5b181b>0x0)_0x52fc79=Math[_0x4cd9d9(0x104)](_0x52fc79,_0x5b181b);const _0x24527d=_0x4b83d9[_0x4cd9d9(0xda)][_0x4cd9d9(0x2f5)](_0x4b83d9[_0x4cd9d9(0x169)],_0x52fc79),_0x2a3c87=this[_0x4cd9d9(0x185)](_0x24527d)[_0x4cd9d9(0x1a4)],_0x20ce11=_0x4b83d9[_0x4cd9d9(0x1a4)]||this[_0x4cd9d9(0x3a3)]-0x8,_0x2b2280=this['constructor']===Window_Message&&$gameMessage[_0x4cd9d9(0x38c)]()!=='';switch(this[_0x4cd9d9(0x170)]()){case _0x4cd9d9(0x2cb):_0x4b83d9['x']=_0x4b83d9[_0x4cd9d9(0x2be)];break;case _0x4cd9d9(0x23c):_0x4b83d9['x']=_0x4b83d9[_0x4cd9d9(0x2be)],_0x4b83d9['x']+=Math[_0x4cd9d9(0x2b1)]((_0x20ce11-_0x2a3c87)/0x2);if(_0x2b2280){if(_0x4cd9d9(0x162)===_0x4cd9d9(0x162))_0x4b83d9['x']-=_0x4b83d9[_0x4cd9d9(0x2be)]/0x2;else{const _0x2d9748=_0x2c19ce(_0x4d522b['$1']);_0x2d9748<_0xb00448?(_0x5d8d6e(_0x4cd9d9(0xc5)[_0x4cd9d9(0x35e)](_0x158a94,_0x2d9748,_0x3a44dc)),_0x546ad8['exit']()):_0x434492=_0xc8dea7['max'](_0x2d9748,_0xe9227f);}}break;case _0x4cd9d9(0x1f9):_0x4b83d9['x']=_0x20ce11-_0x2a3c87+_0x4b83d9[_0x4cd9d9(0x2be)];if(_0x2b2280){if('jfmTI'===_0x4cd9d9(0x265))_0x4b83d9['x']-=_0x4b83d9[_0x4cd9d9(0x2be)];else return _0x11cf79[_0x4cd9d9(0x32a)]['convertTextMacros'][_0x4cd9d9(0x127)](this,_0x594fce);}break;}},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x185)]=function(_0x55c05c){const _0x29543b=_0x2c555d;_0x55c05c=_0x55c05c[_0x29543b(0x276)](/\x1b!/g,''),_0x55c05c=_0x55c05c['replace'](/\x1b\|/g,''),_0x55c05c=_0x55c05c[_0x29543b(0x276)](/\x1b\./g,'');const _0x4aad84=this[_0x29543b(0x19b)](_0x55c05c,0x0,0x0,0x0),_0x1d75ee=this['getPreservedFontSettings']();return _0x4aad84[_0x29543b(0x299)]=![],this[_0x29543b(0x1aa)](_0x4aad84),this[_0x29543b(0x14c)](_0x1d75ee),{'width':_0x4aad84[_0x29543b(0x235)],'height':_0x4aad84[_0x29543b(0x173)]};},Window_Base[_0x2c555d(0x26f)]=VisuMZ[_0x2c555d(0x245)]['Settings'][_0x2c555d(0x2af)][_0x2c555d(0x32c)]||0x0,Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x2de)]=function(_0x4a25c1,_0x2c2ba6){const _0x11aeec=_0x2c555d,_0x4aaa65=(_0x4a25c1[_0x11aeec(0x360)]?-0x1:0x1)*this[_0x11aeec(0x106)]('\x20');if(!_0x2c2ba6)_0x4a25c1['x']+=_0x4aaa65;if(this[_0x11aeec(0xca)](_0x4a25c1)>0x0&&!_0x2c2ba6)_0x4a25c1['x']+=_0x4aaa65;if(_0x4a25c1['rtl'])return;let _0x14e26d;_0x2c2ba6?_0x14e26d=_0x4a25c1['text'][_0x11aeec(0x11b)](_0x11aeec(0xf1),_0x4a25c1[_0x11aeec(0x169)]+0x1):_0x14e26d=_0x4a25c1[_0x11aeec(0xda)][_0x11aeec(0x11b)]('\x1bWrapBreak[0]',_0x4a25c1[_0x11aeec(0x169)]+0x1);let _0x4076a9=_0x4a25c1[_0x11aeec(0xda)][_0x11aeec(0x11b)]('\x0a',_0x4a25c1['index']+0x1);if(_0x14e26d<0x0)_0x14e26d=_0x4a25c1[_0x11aeec(0xda)][_0x11aeec(0x240)]+0x1;if(_0x4076a9>0x0)_0x14e26d=Math['min'](_0x14e26d,_0x4076a9);const _0x2f18a3=_0x4a25c1[_0x11aeec(0xda)][_0x11aeec(0x2f5)](_0x4a25c1['index'],_0x14e26d),_0x2533d7=this[_0x11aeec(0x2ba)](_0x2f18a3)[_0x11aeec(0x1a4)];let _0x378459=_0x4a25c1[_0x11aeec(0x1a4)]||this['innerWidth'];_0x378459-=Window_Base[_0x11aeec(0x26f)];if(this['constructor']===Window_Message){const _0x1034bf=$gameMessage[_0x11aeec(0x38c)]()===''?0x0:ImageManager['faceWidth']+0x14;_0x378459-=_0x1034bf,VisuMZ[_0x11aeec(0x245)]['Settings']['WordWrap'][_0x11aeec(0x301)]&&(_0x378459-=_0x1034bf);}let _0x2b832d=![];_0x4a25c1['x']+_0x2533d7>_0x4a25c1['startX']+_0x378459&&(_0x2b832d=!![]),_0x2533d7===0x0&&(_0x2b832d=![]),_0x2b832d&&(_0x4a25c1[_0x11aeec(0xda)]=_0x4a25c1['text'][_0x11aeec(0x275)](0x0,_0x4a25c1[_0x11aeec(0x169)])+'\x0a'+_0x4a25c1['text'][_0x11aeec(0x371)](_0x4a25c1[_0x11aeec(0x169)]));},Window_Base['prototype']['textSizeExWordWrap']=function(_0x5f177b){const _0x54eaca=_0x2c555d,_0x54a48d=this[_0x54eaca(0x19b)](_0x5f177b,0x0,0x0,0x0),_0x24a1fa=this[_0x54eaca(0x72)]();return _0x54a48d[_0x54eaca(0x299)]=![],this[_0x54eaca(0x1fb)](![]),this['processAllText'](_0x54a48d),this['setWordWrap'](!![]),this[_0x54eaca(0x14c)](_0x24a1fa),{'width':_0x54a48d[_0x54eaca(0x235)],'height':_0x54a48d[_0x54eaca(0x173)]};},Window_Base['prototype'][_0x2c555d(0xcb)]=function(_0x4e108f){const _0x3f4651=_0x2c555d;return this[_0x3f4651(0xca)](_0x4e108f);},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x1e9)]=function(_0x417d82){const _0x536ed9=_0x2c555d,_0x6129b7=this[_0x536ed9(0x306)](_0x417d82)[_0x536ed9(0x88)](',');if(!_0x417d82[_0x536ed9(0x299)])return;const _0x4ff0d2=_0x6129b7[0x0][_0x536ed9(0x116)](),_0xf1027b=_0x6129b7[0x1]||0x0,_0x1ed4ff=_0x6129b7[0x2]||0x0,_0x578a10=ImageManager[_0x536ed9(0x2bf)](_0x4ff0d2),_0x1dd64c=this[_0x536ed9(0x273)][_0x536ed9(0x37c)];_0x578a10['addLoadListener'](this[_0x536ed9(0x103)][_0x536ed9(0x28f)](this,_0x578a10,_0x417d82['x'],_0x417d82['y'],_0xf1027b,_0x1ed4ff,_0x1dd64c));},Window_Base['prototype']['drawBackPicture']=function(_0x2b03d3,_0x458033,_0x33f3f3,_0x2d2d32,_0x20fe6e,_0x447aff){const _0x58dc2b=_0x2c555d;_0x2d2d32=_0x2d2d32||_0x2b03d3[_0x58dc2b(0x1a4)],_0x20fe6e=_0x20fe6e||_0x2b03d3[_0x58dc2b(0xab)],this[_0x58dc2b(0x153)][_0x58dc2b(0x37c)]=_0x447aff,this['contentsBack'][_0x58dc2b(0x184)](_0x2b03d3,0x0,0x0,_0x2b03d3['width'],_0x2b03d3[_0x58dc2b(0xab)],_0x458033,_0x33f3f3,_0x2d2d32,_0x20fe6e),this['contentsBack'][_0x58dc2b(0x37c)]=0xff;},Window_Base[_0x2c555d(0x32a)]['processDrawCenteredPicture']=function(_0x4fa80b){const _0x275d97=_0x2c555d,_0x2cb818=this['obtainEscapeString'](_0x4fa80b)[_0x275d97(0x88)](',');if(!_0x4fa80b[_0x275d97(0x299)])return;const _0x5c2714=_0x2cb818[0x0][_0x275d97(0x116)](),_0x1b6276=ImageManager[_0x275d97(0x2bf)](_0x5c2714),_0x27bf0f=JsonEx['makeDeepCopy'](_0x4fa80b),_0x194165=this[_0x275d97(0x273)]['paintOpacity'];_0x1b6276[_0x275d97(0x1ea)](this[_0x275d97(0x320)][_0x275d97(0x28f)](this,_0x1b6276,_0x27bf0f,_0x194165));},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x320)]=function(_0x437de0,_0x11f7bc,_0x2e8281){const _0x402529=_0x2c555d,_0x3915df=_0x11f7bc[_0x402529(0x1a4)]||this['innerWidth'],_0x1167b4=this[_0x402529(0x234)]!==undefined?this[_0x402529(0x3a9)]():this[_0x402529(0x395)],_0x3f056d=_0x3915df/_0x437de0['width'],_0x55c42b=_0x1167b4/_0x437de0['height'],_0x748e9b=Math[_0x402529(0x104)](_0x3f056d,_0x55c42b,0x1),_0x5aaf61=this[_0x402529(0x234)]!==undefined?(this['itemRectWithPadding'](0x0)[_0x402529(0xab)]-this[_0x402529(0x1ae)]())/0x2:0x0,_0x5723b6=_0x437de0[_0x402529(0x1a4)]*_0x748e9b,_0x51840e=_0x437de0[_0x402529(0xab)]*_0x748e9b,_0x199940=Math[_0x402529(0x2b1)]((_0x3915df-_0x5723b6)/0x2)+_0x11f7bc[_0x402529(0x2be)],_0x3c8648=Math[_0x402529(0x2b1)]((_0x1167b4-_0x51840e)/0x2)+_0x11f7bc[_0x402529(0x2e4)]-_0x5aaf61*0x2;this[_0x402529(0x153)][_0x402529(0x37c)]=_0x2e8281,this[_0x402529(0x153)][_0x402529(0x184)](_0x437de0,0x0,0x0,_0x437de0[_0x402529(0x1a4)],_0x437de0[_0x402529(0xab)],_0x199940,_0x3c8648,_0x5723b6,_0x51840e),this[_0x402529(0x153)][_0x402529(0x37c)]=0xff;},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x23d)]=function(_0x2a1e68){const _0x441379=_0x2c555d,_0x59c476=this[_0x441379(0xca)](_0x2a1e68);if(_0x2a1e68[_0x441379(0x299)])this['setColorLock'](_0x59c476>0x0);},Window_Base[_0x2c555d(0x32a)][_0x2c555d(0x186)]=function(_0x484400){const _0x2f50dd=_0x2c555d,_0xbaf6b4=this[_0x2f50dd(0xca)](_0x484400);this['constructor']===Window_Message&&_0x484400['drawing']&&(_0x2f50dd(0x217)!==_0x2f50dd(0x217)?(_0x3329bb[_0x2f50dd(0x245)]['Window_Options_addGeneralOptions'][_0x2f50dd(0x127)](this),this[_0x2f50dd(0x34b)]()):this[_0x2f50dd(0xf0)](_0xbaf6b4));},Window_Help[_0x2c555d(0x32a)][_0x2c555d(0x243)]=function(){const _0x3c984d=_0x2c555d;this[_0x3c984d(0x1fb)]($gameSystem[_0x3c984d(0x2c5)]());},Window_Help[_0x2c555d(0x32a)][_0x2c555d(0x3a5)]=function(){return!![];},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x16e)]=Window_Help[_0x2c555d(0x32a)][_0x2c555d(0x1f8)],Window_Help[_0x2c555d(0x32a)]['refresh']=function(){const _0x25ea06=_0x2c555d;this[_0x25ea06(0x12c)](),VisuMZ[_0x25ea06(0x245)]['Window_Help_refresh'][_0x25ea06(0x127)](this),this['resetWordWrap']();},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0xa8)]=Window_Options[_0x2c555d(0x32a)][_0x2c555d(0x28c)],Window_Options[_0x2c555d(0x32a)][_0x2c555d(0x28c)]=function(){const _0x1df902=_0x2c555d;VisuMZ[_0x1df902(0x245)]['Window_Options_addGeneralOptions'][_0x1df902(0x127)](this),this[_0x1df902(0x34b)]();},Window_Options['prototype'][_0x2c555d(0x34b)]=function(){const _0x323d76=_0x2c555d;VisuMZ[_0x323d76(0x245)][_0x323d76(0x26a)][_0x323d76(0x31f)][_0x323d76(0x251)]&&(_0x323d76(0x32b)!==_0x323d76(0x32b)?(this['_messagePositionReset']=![],this[_0x323d76(0x20c)]=_0x49b6a5,_0x2244cf[_0x323d76(0x270)](),this[_0x323d76(0x21c)](),this[_0x323d76(0xb5)]=0x0):this[_0x323d76(0x1b6)]());},Window_Options[_0x2c555d(0x32a)]['addMessageCoreTextSpeedCommand']=function(){const _0x4e2592=_0x2c555d,_0x5e4ee6=TextManager[_0x4e2592(0xc0)],_0x5a97ef=_0x4e2592(0x2d1);this[_0x4e2592(0x212)](_0x5e4ee6,_0x5a97ef);},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x2da)]=Window_Options['prototype'][_0x2c555d(0xf2)],Window_Options[_0x2c555d(0x32a)]['statusText']=function(_0x1df752){const _0x44cb1f=_0x2c555d,_0x1a25db=this[_0x44cb1f(0x388)](_0x1df752);if(_0x1a25db===_0x44cb1f(0x2d1))return this[_0x44cb1f(0x2cc)]();return VisuMZ[_0x44cb1f(0x245)][_0x44cb1f(0x2da)]['call'](this,_0x1df752);},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x182)]=Window_Options[_0x2c555d(0x32a)][_0x2c555d(0x350)],Window_Options[_0x2c555d(0x32a)]['isVolumeSymbol']=function(_0x3e7178){const _0x5127a6=_0x2c555d;if(_0x3e7178===_0x5127a6(0x2d1))return!![];return VisuMZ[_0x5127a6(0x245)][_0x5127a6(0x182)][_0x5127a6(0x127)](this,_0x3e7178);},Window_Options[_0x2c555d(0x32a)][_0x2c555d(0x2cc)]=function(){const _0x2d45de=_0x2c555d,_0x3d88bc=this[_0x2d45de(0x180)]('textSpeed');return _0x3d88bc>0xa?TextManager[_0x2d45de(0x255)]:_0x3d88bc;},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x16b)]=Window_Options[_0x2c555d(0x32a)][_0x2c555d(0x262)],Window_Options[_0x2c555d(0x32a)]['changeVolume']=function(_0x665e4,_0x7dd3c0,_0xc801c4){const _0x399416=_0x2c555d;if(_0x665e4===_0x399416(0x2d1))return this[_0x399416(0x2a3)](_0x665e4,_0x7dd3c0,_0xc801c4);VisuMZ[_0x399416(0x245)]['Window_Options_changeVolume'][_0x399416(0x127)](this,_0x665e4,_0x7dd3c0,_0xc801c4);},Window_Options[_0x2c555d(0x32a)][_0x2c555d(0x2a3)]=function(_0x21a370,_0x159bda,_0x55d005){const _0x431a77=_0x2c555d,_0x27f8da=this[_0x431a77(0x180)](_0x21a370),_0x39c6da=0x1,_0x53bdb3=_0x27f8da+(_0x159bda?_0x39c6da:-_0x39c6da);if(_0x53bdb3>0xb&&_0x55d005){if(_0x431a77(0x3bc)===_0x431a77(0x3bc))this[_0x431a77(0x232)](_0x21a370,0x1);else{if(this['_pictureText']===_0x3dee6d)this[_0x431a77(0x24f)]();const _0x39bea9=this[_0x431a77(0xfe)](_0x39320f);return this[_0x431a77(0x214)][_0x39bea9]||0x0;}}else this[_0x431a77(0x232)](_0x21a370,_0x53bdb3[_0x431a77(0x36a)](0x1,0xb));},Window_Message[_0x2c555d(0x32a)]['contentsHeight']=function(){const _0x1b0742=_0x2c555d;let _0x432cf7=Window_Base[_0x1b0742(0x32a)][_0x1b0742(0x8b)][_0x1b0742(0x127)](this);return _0x432cf7-=this['addedHeight'](),_0x432cf7;},Window_Message[_0x2c555d(0x32a)]['refreshDimmerBitmap']=function(){const _0x4ee8aa=_0x2c555d;Window_Base[_0x4ee8aa(0x32a)][_0x4ee8aa(0xfc)][_0x4ee8aa(0x127)](this),VisuMZ['MessageCore']['Settings']['General'][_0x4ee8aa(0x39a)]&&this['stretchDimmerSprite']();},Window_Message[_0x2c555d(0x32a)]['stretchDimmerSprite']=function(){const _0x205f5c=_0x2c555d;this[_0x205f5c(0x181)]['x']=Math['round'](this[_0x205f5c(0x1a4)]/0x2),this['_dimmerSprite'][_0x205f5c(0x3d6)]['x']=0.5,this[_0x205f5c(0x181)][_0x205f5c(0x293)]['x']=Graphics[_0x205f5c(0x1a4)];},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x1a5)]=Window_Message[_0x2c555d(0x32a)][_0x2c555d(0x2c7)],Window_Message[_0x2c555d(0x32a)][_0x2c555d(0x2c7)]=function(){const _0x10a6e4=_0x2c555d;VisuMZ['MessageCore']['Window_Message_clearFlags'][_0x10a6e4(0x127)](this),this[_0x10a6e4(0x12c)](),this[_0x10a6e4(0x243)](),this['setColorLock'](![]),this[_0x10a6e4(0x203)](_0x10a6e4(0x287)),this[_0x10a6e4(0x3ac)](VisuMZ[_0x10a6e4(0x245)][_0x10a6e4(0x26a)][_0x10a6e4(0x146)][_0x10a6e4(0x3b7)]);},Window_Message[_0x2c555d(0x32a)]['resetWordWrap']=function(){const _0x3a64fd=_0x2c555d;this['setWordWrap']($gameSystem[_0x3a64fd(0x2e9)]());},Window_Message['prototype'][_0x2c555d(0x3a5)]=function(){return!![];},Window_Message[_0x2c555d(0x32a)][_0x2c555d(0x3ac)]=function(_0x231ba4){const _0x5842aa=_0x2c555d,_0x3ab31e=0xb-ConfigManager['textSpeed'];_0x231ba4=Math[_0x5842aa(0x7e)](_0x231ba4*_0x3ab31e),this[_0x5842aa(0x3c3)]=_0x231ba4,this['_textDelay']=_0x231ba4;},VisuMZ['MessageCore'][_0x2c555d(0x121)]=Window_Message[_0x2c555d(0x32a)]['isTriggered'],Window_Message[_0x2c555d(0x32a)][_0x2c555d(0x2b7)]=function(){const _0x26261f=_0x2c555d;return VisuMZ['MessageCore'][_0x26261f(0x121)][_0x26261f(0x127)](this)||Input[_0x26261f(0x14b)](VisuMZ[_0x26261f(0x245)][_0x26261f(0x26a)][_0x26261f(0x146)][_0x26261f(0x1fd)]);},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x248)]=Window_Message[_0x2c555d(0x32a)][_0x2c555d(0x1ca)],Window_Message['prototype'][_0x2c555d(0x1ca)]=function(){const _0x5da12b=_0x2c555d;let _0x4bce6e=this['y'];this['x']=Math[_0x5da12b(0x7e)]((Graphics[_0x5da12b(0x1a7)]-this[_0x5da12b(0x1a4)])/0x2),VisuMZ[_0x5da12b(0x245)]['Window_Message_updatePlacement'][_0x5da12b(0x127)](this);if(this[_0x5da12b(0x20c)])this['y']=_0x4bce6e;this[_0x5da12b(0x2d6)](),this['updateForcedPlacement'](),this[_0x5da12b(0x30b)](),this[_0x5da12b(0x1cf)]();},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x323)]=Window_Message[_0x2c555d(0x32a)]['newPage'],Window_Message['prototype']['newPage']=function(_0x422f86){const _0x4e270c=_0x2c555d;this[_0x4e270c(0x11e)](_0x422f86),this[_0x4e270c(0x35b)](_0x422f86),VisuMZ[_0x4e270c(0x245)][_0x4e270c(0x323)][_0x4e270c(0x127)](this,_0x422f86),this[_0x4e270c(0x1b8)]();},Window_Message[_0x2c555d(0x32a)]['convertNewPageTextStateMacros']=function(_0x125f15){const _0x5b7645=_0x2c555d;if(!_0x125f15)return;this[_0x5b7645(0x131)]=![],_0x125f15[_0x5b7645(0xda)]=this[_0x5b7645(0xd8)](_0x125f15[_0x5b7645(0xda)]),this[_0x5b7645(0x1a8)]&&(_0x125f15['text']=this[_0x5b7645(0x246)](_0x125f15[_0x5b7645(0xda)]),this['_macroBypassWordWrap']=!![]);},Window_Message['prototype'][_0x2c555d(0x246)]=function(_0x32cb1e){const _0x2f5dbb=_0x2c555d;if(this[_0x2f5dbb(0x131)])return _0x32cb1e;return Window_Base[_0x2f5dbb(0x32a)][_0x2f5dbb(0x246)][_0x2f5dbb(0x127)](this,_0x32cb1e);},Window_Message['prototype'][_0x2c555d(0x35b)]=function(_0x278e47){const _0x192ca3=_0x2c555d;this['prepareForcedPositionEscapeCharacters'](_0x278e47),this[_0x192ca3(0x30e)](_0x278e47),this[_0x192ca3(0x3c6)]();},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0xb9)]=Window_Message[_0x2c555d(0x32a)][_0x2c555d(0x254)],Window_Message[_0x2c555d(0x32a)][_0x2c555d(0x254)]=function(){const _0xa3813f=_0x2c555d;VisuMZ['MessageCore']['Window_Message_terminateMessage']['call'](this),this[_0xa3813f(0x2c7)]();if(this['_messagePositionReset'])this[_0xa3813f(0x3dc)]();},Window_Message[_0x2c555d(0x32a)]['updateDimensions']=function(){const _0x437b8c=_0x2c555d;this[_0x437b8c(0x1a4)]=$gameSystem[_0x437b8c(0x22c)]()+this[_0x437b8c(0x1b0)]();;this['width']=Math[_0x437b8c(0x104)](Graphics[_0x437b8c(0x1a4)],this[_0x437b8c(0x1a4)]);const _0x1e799a=$gameSystem['getMessageWindowRows']();this[_0x437b8c(0xab)]=SceneManager[_0x437b8c(0xa3)]['calcWindowHeight'](_0x1e799a,![])+this[_0x437b8c(0x36e)](),this['height']=Math['min'](Graphics[_0x437b8c(0xab)],this[_0x437b8c(0xab)]);if($gameTemp[_0x437b8c(0x34a)])this[_0x437b8c(0x391)]();},Window_Message[_0x2c555d(0x32a)][_0x2c555d(0x1b0)]=function(){return 0x0;},Window_Message[_0x2c555d(0x32a)]['addedHeight']=function(){return 0x0;},Window_Message['prototype'][_0x2c555d(0x391)]=function(){const _0xfd17b0=_0x2c555d;this['x']=(Graphics[_0xfd17b0(0x1a7)]-this[_0xfd17b0(0x1a4)])/0x2,$gameTemp[_0xfd17b0(0x34a)]=undefined,this['clampPlacementPosition']();},Window_Message[_0x2c555d(0x32a)][_0x2c555d(0x17e)]=function(){const _0x5b57e3=_0x2c555d,_0x3a8ab2={'x':this['x'],'y':this['y']};Window_Base[_0x5b57e3(0x32a)][_0x5b57e3(0x17e)][_0x5b57e3(0x127)](this),this[_0x5b57e3(0x257)](_0x3a8ab2);},Window_Message['prototype']['canMove']=function(){return!![];},Window_Message[_0x2c555d(0x32a)]['updateNameBoxMove']=function(_0x10181e){const _0x594c8f=_0x2c555d;if(this['_nameBoxWindow']){if('DELrx'!=='DbdgC')this[_0x594c8f(0x101)]['x']+=this['x']-_0x10181e['x'],this['_nameBoxWindow']['y']+=this['y']-_0x10181e['y'];else var _0x370c3c=new _0x54a138(_0x48a5ba,'i');}},Window_Message[_0x2c555d(0x32a)][_0x2c555d(0x195)]=function(_0x31f7bc,_0x4f6bc5){const _0x5e5d4c=_0x2c555d;this[_0x5e5d4c(0x37a)](this[_0x5e5d4c(0x35d)]['x'],this[_0x5e5d4c(0x333)]*(Graphics[_0x5e5d4c(0x27c)]-this[_0x5e5d4c(0xab)])/0x2,this['_resetRect']['width'],this['_resetRect'][_0x5e5d4c(0xab)],_0x31f7bc,_0x4f6bc5);},Window_Message['prototype'][_0x2c555d(0xcb)]=function(_0x439cb4){const _0x27aed3=_0x2c555d,_0xc5ace7=Window_Base[_0x27aed3(0x32a)][_0x27aed3(0xcb)][_0x27aed3(0x127)](this,_0x439cb4);_0x439cb4['drawing']&&('kTNvA'!=='KIKDm'?this[_0x27aed3(0x8d)](_0xc5ace7):this[_0x27aed3(0x1b5)]=null);},Window_Message[_0x2c555d(0x32a)]['launchMessageCommonEvent']=function(_0x1159ca){const _0x32d063=_0x2c555d;if($gameParty[_0x32d063(0x1e3)]()){}else $gameMap['addMessageCommonEvent'](_0x1159ca);},Window_Message['prototype']['processCharacter']=function(_0x1d1268){const _0x37d02c=_0x2c555d;this[_0x37d02c(0x3c3)]--,this[_0x37d02c(0x3c3)]<=0x0&&(this['onProcessCharacter'](_0x1d1268),Window_Base[_0x37d02c(0x32a)]['processCharacter'][_0x37d02c(0x127)](this,_0x1d1268));},Window_Message[_0x2c555d(0x32a)][_0x2c555d(0x356)]=function(_0x2116d2){const _0x2456a6=_0x2c555d;this[_0x2456a6(0x3c3)]=this[_0x2456a6(0xa6)];if(this[_0x2456a6(0xa6)]<=0x0)this[_0x2456a6(0x95)]=!![];},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x138)]=Window_Message[_0x2c555d(0x32a)][_0x2c555d(0x1b7)],Window_Message['prototype']['processEscapeCharacter']=function(_0x9c7003,_0x36dfe5){const _0x3b8f31=_0x2c555d;!_0x36dfe5[_0x3b8f31(0x299)]?Window_Base['prototype'][_0x3b8f31(0x1b7)][_0x3b8f31(0x127)](this,_0x9c7003,_0x36dfe5):VisuMZ[_0x3b8f31(0x245)]['Window_Message_processEscapeCharacter'][_0x3b8f31(0x127)](this,_0x9c7003,_0x36dfe5);},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x302)]=Window_Message[_0x2c555d(0x32a)][_0x2c555d(0x3b2)],Window_Message['prototype']['needsNewPage']=function(_0x1e8c0f){const _0x50985e=_0x2c555d;if(this['_currentAutoSize']){if(_0x50985e(0x2eb)!=='erkjU')this[_0x50985e(0x18c)](_0xe49244,_0x2252a1);else return![];}return VisuMZ[_0x50985e(0x245)]['Window_Message_needsNewPage'][_0x50985e(0x127)](this,_0x1e8c0f);},Window_Message[_0x2c555d(0x32a)][_0x2c555d(0x204)]=function(_0x3abb44){const _0x415878=_0x2c555d;let _0x1f7a1f=_0x3abb44[_0x415878(0xda)];this[_0x415878(0x377)]={};if(this[_0x415878(0x17b)]())return _0x1f7a1f;_0x1f7a1f=_0x1f7a1f[_0x415878(0x276)](/<POSITION:[ ]*(.*?)>/gi,(_0x17ecdf,_0x4b14c5)=>{const _0x308cd5=_0x415878,_0x2916fd=_0x4b14c5['split'](',')[_0x308cd5(0x2c0)](_0x5f4766=>Number(_0x5f4766)||0x0);if(_0x2916fd[0x0]!==undefined)this['_forcedPosition']['x']=Number(_0x2916fd[0x0]);if(_0x2916fd[0x1]!==undefined)this['_forcedPosition']['y']=Number(_0x2916fd[0x1]);if(_0x2916fd[0x2]!==undefined)this['_forcedPosition']['width']=Number(_0x2916fd[0x2]);if(_0x2916fd[0x3]!==undefined)this[_0x308cd5(0x377)][_0x308cd5(0xab)]=Number(_0x2916fd[0x3]);return'';}),_0x1f7a1f=_0x1f7a1f[_0x415878(0x276)](/<COORDINATES:[ ]*(.*?)>/gi,(_0x51af1b,_0x48f2fc)=>{const _0x4454d6=_0x415878;if(_0x4454d6(0x213)==='psQJz'){const _0x830091=_0x48f2fc['split'](',')[_0x4454d6(0x2c0)](_0x398cb2=>Number(_0x398cb2)||0x0);if(_0x830091[0x0]!==undefined)this[_0x4454d6(0x377)]['x']=Number(_0x830091[0x0]);if(_0x830091[0x1]!==undefined)this[_0x4454d6(0x377)]['y']=Number(_0x830091[0x1]);return'';}else{if(!_0x20e633['isSceneBattle']())return'';if(_0x1a81f6[_0x4454d6(0xc9)])return _0x230561[_0x4454d6(0xc9)][_0x4454d6(0x322)]();if(_0x1b68b8['_targets'][0x0])return _0x1fb5ab['_targets'][0x0][_0x4454d6(0x322)]();return'';}}),_0x1f7a1f=_0x1f7a1f['replace'](/<DIMENSIONS:[ ]*(.*?)>/gi,(_0x3b4949,_0x10204f)=>{const _0x35ba57=_0x415878,_0x36bcbd=_0x10204f[_0x35ba57(0x88)](',')[_0x35ba57(0x2c0)](_0x2fa019=>Number(_0x2fa019)||0x0);if(_0x36bcbd[0x0]!==undefined)this[_0x35ba57(0x377)]['width']=Number(_0x36bcbd[0x2]);if(_0x36bcbd[0x1]!==undefined)this[_0x35ba57(0x377)][_0x35ba57(0xab)]=Number(_0x36bcbd[0x3]);return'';}),_0x1f7a1f=_0x1f7a1f['replace'](/<OFFSET:[ ]*(.*?)>/gi,(_0x55b859,_0x2fb598)=>{const _0x112f3e=_0x415878,_0xd59a5a=_0x2fb598[_0x112f3e(0x88)](',')['map'](_0x5951cd=>Number(_0x5951cd)||0x0);let _0x52815f=_0xd59a5a[0x0]||0x0,_0x46302a=_0xd59a5a[0x1]||0x0;return $gameSystem[_0x112f3e(0x206)](_0x52815f,_0x46302a),'';}),_0x3abb44[_0x415878(0xda)]=_0x1f7a1f;},Window_Message[_0x2c555d(0x32a)][_0x2c555d(0x2d6)]=function(){const _0x240be6=$gameSystem['getMessageWindowXyOffsets']();this['x']+=_0x240be6['x'],this['y']+=_0x240be6['y'];},Window_Message[_0x2c555d(0x32a)]['updateForcedPlacement']=function(){const _0x3d88d3=_0x2c555d;this[_0x3d88d3(0x377)]=this[_0x3d88d3(0x377)]||{};const _0x366a92=['x','y',_0x3d88d3(0x1a4),_0x3d88d3(0xab)];for(const _0x1fd913 of _0x366a92){if(_0x3d88d3(0x3df)!=='hyhev')this[_0x3d88d3(0x377)][_0x1fd913]!==undefined&&(this[_0x1fd913]=Number(this[_0x3d88d3(0x377)][_0x1fd913]));else return _0x1a4b6c[_0x3d88d3(0x245)][_0x3d88d3(0x121)]['call'](this)||_0x514a8f[_0x3d88d3(0x14b)](_0x51b68d['MessageCore'][_0x3d88d3(0x26a)][_0x3d88d3(0x146)]['FastForwardKey']);}},Window_Message[_0x2c555d(0x32a)][_0x2c555d(0x30e)]=function(_0x963481){const _0x5f394b=_0x2c555d;this[_0x5f394b(0xa0)]=![];let _0x453a46=_0x963481[_0x5f394b(0xda)];_0x453a46=_0x453a46['replace'](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x492200=_0x5f394b;return _0x492200(0x1c1)===_0x492200(0x1c1)?(this[_0x492200(0xeb)](_0x453a46,!![],!![]),this[_0x492200(0x11f)](_0x492200(0x38f)),''):_0x3c126a[_0x492200(0x245)][_0x492200(0x2a1)][_0x492200(0x127)](this,_0x13fd8e);}),_0x453a46=_0x453a46['replace'](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x389792=_0x5f394b;if(_0x389792(0x19a)===_0x389792(0x2f2)){const _0x3247c0=_0x54611e[_0x389792(0x283)]();if(_0x3247c0['id']<0x0)return'';let _0x3c18a9=null;if(_0x3247c0[_0x389792(0x230)]===0x0)_0x3c18a9=_0x3479dd[_0x3247c0['id']];if(_0x3247c0[_0x389792(0x230)]===0x1)_0x3c18a9=_0xa73870[_0x3247c0['id']];if(_0x3247c0['type']===0x2)_0x3c18a9=_0x4618f0[_0x3247c0['id']];if(!_0x3c18a9)return'';return'\x1bi[%1]'[_0x389792(0x35e)](_0x3c18a9['iconIndex']);}else return this['processAutoSize'](_0x453a46,!![],![]),this[_0x389792(0x11f)](_0x389792(0x38f)),'';}),_0x453a46=_0x453a46[_0x5f394b(0x276)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x22919e=_0x5f394b;return this[_0x22919e(0xeb)](_0x453a46,![],!![]),this[_0x22919e(0x11f)](_0x22919e(0x38f)),'';});if(SceneManager[_0x5f394b(0x6a)]())_0x453a46=_0x453a46['replace'](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x5d0d53,_0x3fb5a9)=>{const _0x319368=_0x5f394b;if(_0x319368(0x189)==='QqhpK')this[_0x319368(0x295)](),this[_0x319368(0x243)](),this[_0x319368(0x21d)](_0x10a1ed);else return this['processAutoSize'](_0x453a46,!![],!![]),this[_0x319368(0x11f)]('battle\x20actor',Number(_0x3fb5a9)||0x1),'';}),_0x453a46=_0x453a46[_0x5f394b(0x276)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x309d54,_0xe7eae6)=>{const _0x8a2e18=_0x5f394b;if(_0x8a2e18(0x209)!==_0x8a2e18(0x209)){if(!_0x210a5f[_0x7b20f1])return;this[_0x8a2e18(0x319)]=this['_messageCommonEvents']||[];const _0x2d0794=this[_0x8a2e18(0x1b5)]['_eventId'],_0x46c741=new _0xe1cbd5(_0x597f4d,_0x2d0794);this[_0x8a2e18(0x319)][_0x8a2e18(0x352)](_0x46c741);}else return this[_0x8a2e18(0xeb)](_0x453a46,!![],!![]),this['processAutoPosition'](_0x8a2e18(0x1c8),Number(_0xe7eae6)||0x0),'';}),_0x453a46=_0x453a46['replace'](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x3143d2,_0x3fca06)=>{const _0x32206b=_0x5f394b;if(_0x32206b(0x304)==='Ukbpt')return this[_0x32206b(0xeb)](_0x453a46,!![],!![]),this[_0x32206b(0x11f)]('battle\x20enemy',Number(_0x3fca06)||0x0),'';else _0x30eb29=_0x212235[_0x32206b(0x276)](_0x3d561f[0x0],_0x2713d8[0x1]);});else SceneManager[_0x5f394b(0x3bf)]()&&(_0x453a46=_0x453a46['replace'](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x57af3a,_0x3f1f85)=>{const _0x169d31=_0x5f394b;if(_0x169d31(0x2a7)===_0x169d31(0x341))_0x4ba073[_0x169d31(0x245)][_0x169d31(0x24b)][_0x169d31(0x127)](this,_0x35b23e),_0x169d31(0x2d1)in _0x583254?this[_0x169d31(0x2d1)]=_0x2d9404(_0x4fd326[_0x169d31(0x2d1)])['clamp'](0x1,0xb):this[_0x169d31(0x2d1)]=_0x43157d[_0x169d31(0x245)][_0x169d31(0x26a)][_0x169d31(0x31f)][_0x169d31(0x36c)];else return this[_0x169d31(0xeb)](_0x453a46,!![],!![]),this['processAutoPosition']('map\x20player',0x0),'';}),_0x453a46=_0x453a46[_0x5f394b(0x276)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x2d4e72,_0x58b913)=>{const _0x27a1bb=_0x5f394b;if(_0x27a1bb(0x329)===_0x27a1bb(0x329))return this['processAutoSize'](_0x453a46,!![],!![]),this[_0x27a1bb(0x11f)](_0x27a1bb(0x2c2),Number(_0x58b913)||0x1),'';else{this[_0x27a1bb(0xca)](_0x4883fc);if(this[_0x27a1bb(0xbe)]())return;_0x3a68ea['drawing']&&(this['_textColorStack']=this[_0x27a1bb(0x172)]||[],this[_0x27a1bb(0x273)][_0x27a1bb(0x7f)]=this['_textColorStack']['shift']()||_0x18b375[_0x27a1bb(0xb0)]());}}),_0x453a46=_0x453a46['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x10b9ef,_0x32e612)=>{const _0x37b1df=_0x5f394b;return this[_0x37b1df(0xeb)](_0x453a46,!![],!![]),this[_0x37b1df(0x11f)](_0x37b1df(0x236),Number(_0x32e612)||0x0),'';}),_0x453a46=_0x453a46['replace'](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x4ec00d,_0x3c6924)=>{const _0x3a7a1c=_0x5f394b;return this[_0x3a7a1c(0xeb)](_0x453a46,!![],!![]),this['processAutoPosition'](_0x3a7a1c(0x136),Number(_0x3c6924)||0x0),'';}));_0x963481[_0x5f394b(0xda)]=_0x453a46;},Window_Message[_0x2c555d(0x12a)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x2c555d(0x2e5)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x2c555d(0x32a)][_0x2c555d(0xeb)]=function(_0x19bce7,_0xfdf1d,_0x587db5){const _0x222e0b=_0x2c555d;_0x19bce7=_0x19bce7[_0x222e0b(0x276)](Window_Message[_0x222e0b(0x12a)],''),_0x19bce7=_0x19bce7[_0x222e0b(0x276)](Window_Message['_autoPosRegExp'],''),this['_autoSizeCheck']=!![],this[_0x222e0b(0xa0)]=!![],this[_0x222e0b(0x1fb)](![]);const _0x56cdde=this[_0x222e0b(0x1c5)](_0x19bce7);if(_0xfdf1d){if('cjfoD'!==_0x222e0b(0x312)){let _0x245c18=_0x56cdde[_0x222e0b(0x1a4)]+$gameSystem[_0x222e0b(0x111)]()*0x2+0x6;const _0x4fbac5=$gameMessage[_0x222e0b(0x38c)]()!=='',_0x406311=ImageManager[_0x222e0b(0x378)],_0x25d633=0x14;_0x245c18+=_0x4fbac5?_0x406311+_0x25d633:0x4;if(_0x245c18%0x2!==0x0)_0x245c18+=0x1;$gameSystem[_0x222e0b(0x1cc)](_0x245c18);}else{if(this['_pictureTextWindow'])return;if(this[_0x222e0b(0x160)])return;const _0x4a56f7=new _0x2ad89a(0x0,0x0,0x0,0x0);this[_0x222e0b(0x15d)]=new _0x5e1b51(_0x4a56f7),this[_0x222e0b(0x15d)][_0x222e0b(0xe4)]=0x0,this[_0x222e0b(0x160)]=new _0x2cc2fe(),this[_0x222e0b(0x349)](this[_0x222e0b(0x160)],0x0),this['_pictureTextWidth']=0x0,this[_0x222e0b(0x2c9)]=0x0,this[_0x222e0b(0x33f)]={};}}if(_0x587db5){if(_0x222e0b(0x14a)!=='VtQng'){let _0x35ccd4=Math[_0x222e0b(0xf4)](_0x56cdde[_0x222e0b(0xab)]/this[_0x222e0b(0x1ae)]());$gameSystem[_0x222e0b(0x305)](_0x35ccd4);}else{const _0x3441d7=_0x21326f['$1'][_0x222e0b(0x88)](',')[_0x222e0b(0x2c0)](_0x2a585b=>_0x2649e7(_0x2a585b)||0x0);for(const _0x1c5813 of _0x3441d7){if(_0x401eed[_0x222e0b(0x23a)](_0x1c5813))return!![];}return![];}}this['updateAutoSizePosition'](),this[_0x222e0b(0x1cb)](),this[_0x222e0b(0x26b)]=![],this['_messagePositionReset']=!![];},Window_Message[_0x2c555d(0x32a)]['updateAutoSizePosition']=function(){const _0xf4bfda=_0x2c555d;this[_0xf4bfda(0x3c6)](),this[_0xf4bfda(0x1ca)](),this[_0xf4bfda(0x391)](),this[_0xf4bfda(0xaf)](),this[_0xf4bfda(0x273)][_0xf4bfda(0x258)](),this['createContents']();},Window_Message['prototype'][_0x2c555d(0x11f)]=function(_0xfa2976,_0x374b12){const _0x2ea203=_0x2c555d;switch(_0xfa2976['toLowerCase']()[_0x2ea203(0x116)]()){case _0x2ea203(0x8a):this['_autoPositionTarget']=$gameActors[_0x2ea203(0x10b)](_0x374b12);break;case _0x2ea203(0x1c8):this[_0x2ea203(0x20c)]=$gameParty[_0x2ea203(0x3a0)]()[_0x374b12-0x1];break;case _0x2ea203(0x3cb):this[_0x2ea203(0x20c)]=$gameTroop[_0x2ea203(0x3a0)]()[_0x374b12-0x1];break;case _0x2ea203(0x2c6):this[_0x2ea203(0x20c)]=$gamePlayer;break;case _0x2ea203(0x2c2):const _0x55adc4=$gameActors['actor'](_0x374b12)[_0x2ea203(0x169)]();_0x55adc4===0x0?this[_0x2ea203(0x20c)]=$gamePlayer:_0x2ea203(0x3c9)===_0x2ea203(0xea)?this['_interpreter']&&(this[_0x2ea203(0x1b5)][_0x2ea203(0xb2)]()?this[_0x2ea203(0x1b5)][_0x2ea203(0x1c9)]():this['clear']()):this[_0x2ea203(0x20c)]=$gamePlayer[_0x2ea203(0x353)]()[_0x2ea203(0x358)](_0x55adc4-0x1);break;case'map\x20party':if(_0x374b12===0x1){if(_0x2ea203(0x1db)!==_0x2ea203(0x166))this[_0x2ea203(0x20c)]=$gamePlayer;else{const _0xadaea6=-(_0x1cde4f[_0x2ea203(0x2b1)](_0x438bee['width']-_0x1fa653['boxWidth'])/0x2),_0x308dee=_0xadaea6+_0x4036b8[_0x2ea203(0x1a4)]-this[_0x2ea203(0x1a4)],_0x27149d=-(_0x29655e[_0x2ea203(0x2b1)](_0x3cb201['height']-_0x50893f['boxHeight'])/0x2),_0x1da795=_0x27149d+_0x17ac17[_0x2ea203(0xab)]-this['height'];this['x']=this['x'][_0x2ea203(0x36a)](_0xadaea6,_0x308dee),this['y']=this['y'][_0x2ea203(0x36a)](_0x27149d,_0x1da795);}}else this[_0x2ea203(0x20c)]=$gamePlayer[_0x2ea203(0x353)]()[_0x2ea203(0x358)](_0x374b12-0x2);break;case _0x2ea203(0x136):this[_0x2ea203(0x20c)]=$gameMap[_0x2ea203(0x290)](_0x374b12);break;}this[_0x2ea203(0x20c)]&&this[_0x2ea203(0x198)]();},VisuMZ['MessageCore'][_0x2c555d(0x2ef)]=Window_Message[_0x2c555d(0x32a)]['synchronizeNameBox'],Window_Message[_0x2c555d(0x32a)][_0x2c555d(0x3d4)]=function(){const _0x2569f2=_0x2c555d;this['updateAutoPosition'](),VisuMZ[_0x2569f2(0x245)][_0x2569f2(0x2ef)][_0x2569f2(0x127)](this);},Window_Message[_0x2c555d(0x32a)][_0x2c555d(0x198)]=function(){const _0x5b0c3a=_0x2c555d;if(!this[_0x5b0c3a(0x20c)])return;const _0x40d0ab=SceneManager[_0x5b0c3a(0xa3)];if(!_0x40d0ab)return;const _0x1f365b=_0x40d0ab['_spriteset'];if(!_0x1f365b)return;const _0x571fe8=_0x1f365b[_0x5b0c3a(0xd7)](this[_0x5b0c3a(0x20c)]);if(!_0x571fe8)return;let _0x5c5d21=_0x571fe8['x'];if(SceneManager[_0x5b0c3a(0x3bf)]())_0x5c5d21*=$gameScreen[_0x5b0c3a(0x2f3)]();else{if(SceneManager['isSceneBattle']()&&Imported[_0x5b0c3a(0x2fa)]){if('SxsQz'===_0x5b0c3a(0xfd)){let _0x12cc0f=_0x571fe8['x']-Graphics[_0x5b0c3a(0x1a7)]*_0x1f365b[_0x5b0c3a(0x3d6)]['x'];_0x5c5d21+=_0x12cc0f*(_0x1f365b[_0x5b0c3a(0x293)]['x']-0x1);}else this[_0x5b0c3a(0x273)]['fontFace']=_0x598f73[_0x5b0c3a(0x226)](),this[_0x5b0c3a(0x273)]['fontSize']=_0x4cf4df[_0x5b0c3a(0x179)](),this['contents'][_0x5b0c3a(0x2a2)]=![],this[_0x5b0c3a(0x273)]['fontItalic']=![],this[_0x5b0c3a(0x3af)]();}}_0x5c5d21-=this[_0x5b0c3a(0x1a4)]/0x2,_0x5c5d21-=(Graphics['width']-Graphics[_0x5b0c3a(0x1a7)])/0x2,_0x5c5d21+=this[_0x5b0c3a(0x19e)]();let _0x414248=_0x571fe8['y'];if(SceneManager['isSceneMap']())_0x414248-=_0x571fe8['height']+0x8,_0x414248*=$gameScreen[_0x5b0c3a(0x2f3)](),_0x414248-=this['height']*$gameScreen[_0x5b0c3a(0x2f3)]();else{if(SceneManager[_0x5b0c3a(0x6a)]()&&Imported[_0x5b0c3a(0x2fa)]){let _0x46b2da=_0x571fe8[_0x5b0c3a(0xab)]*_0x1f365b[_0x5b0c3a(0x293)]['y'];_0x414248-=this[_0x5b0c3a(0xab)]*_0x1f365b[_0x5b0c3a(0x293)]['y']+_0x46b2da+0x8;let _0x410625=_0x571fe8['y']-Graphics[_0x5b0c3a(0x27c)]*_0x1f365b[_0x5b0c3a(0x3d6)]['y'];_0x414248+=_0x410625*(_0x1f365b[_0x5b0c3a(0x293)]['y']-0x1);}else{if(_0x5b0c3a(0x35a)!==_0x5b0c3a(0xbb))_0x414248-=_0x571fe8[_0x5b0c3a(0xab)]+0x8,_0x414248-=this[_0x5b0c3a(0xab)];else{if(!_0x3aab33[_0x5b0c3a(0x23a)](_0x41bac7))return![];}}}_0x414248-=(Graphics[_0x5b0c3a(0xab)]-Graphics[_0x5b0c3a(0x27c)])/0x2,_0x414248+=this['autoPositionOffsetY']();const _0x50e625=$gameSystem[_0x5b0c3a(0x3d0)]();_0x5c5d21+=_0x50e625['x'],_0x414248+=_0x50e625['y'],this['x']=Math[_0x5b0c3a(0x7e)](_0x5c5d21),this['y']=Math[_0x5b0c3a(0x7e)](_0x414248),this[_0x5b0c3a(0x30b)](!![],![]),this['_forcedPosition']=this['_forcedPosition']||{},this['_forcedPosition']['x']=this['x'],this['_forcedPosition']['y']=this['y'],this[_0x5b0c3a(0x377)][_0x5b0c3a(0x1a4)]=this['width'],this[_0x5b0c3a(0x377)][_0x5b0c3a(0xab)]=this['height'],this[_0x5b0c3a(0x101)]['updatePlacement']();},Window_Message[_0x2c555d(0x32a)][_0x2c555d(0x19e)]=function(){return 0x0;},Window_Message[_0x2c555d(0x32a)][_0x2c555d(0xb3)]=function(){return 0x0;},Window_Message['prototype'][_0x2c555d(0x3dc)]=function(){const _0x28f854=_0x2c555d;this[_0x28f854(0xc2)]=![],this[_0x28f854(0x20c)]=undefined,$gameSystem['initMessageCore'](),this[_0x28f854(0x21c)](),this['openness']=0x0;},Window_Message[_0x2c555d(0x32a)][_0x2c555d(0x3ad)]=function(_0x4b3096){const _0x1684ca=_0x2c555d;return Window_Base[_0x1684ca(0x32a)][_0x1684ca(0x3ad)][_0x1684ca(0x127)](this,_0x4b3096);},Window_Message['prototype'][_0x2c555d(0x27d)]=function(_0x74a9b7){const _0x5be3dd=_0x2c555d;return Window_Base[_0x5be3dd(0x32a)][_0x5be3dd(0x27d)][_0x5be3dd(0x127)](this,_0x74a9b7);},Window_Message['prototype']['flushTextState']=function(_0x58683b){const _0x42dad7=_0x2c555d;this['preFlushTextState'](_0x58683b),Window_Base[_0x42dad7(0x32a)][_0x42dad7(0x6d)][_0x42dad7(0x127)](this,_0x58683b),this[_0x42dad7(0xcc)](_0x58683b);},Window_Message[_0x2c555d(0x32a)][_0x2c555d(0x25a)]=function(_0x528e51){},Window_Message[_0x2c555d(0x32a)][_0x2c555d(0xcc)]=function(_0x1e9c06){},Window_NameBox[_0x2c555d(0x32a)][_0x2c555d(0x3a5)]=function(){return![];},Window_NameBox[_0x2c555d(0x32a)][_0x2c555d(0x3af)]=function(){const _0x5afd0d=_0x2c555d;Window_Base[_0x5afd0d(0x32a)][_0x5afd0d(0x3af)]['call'](this),this['changeTextColor'](this['defaultColor']());},Window_NameBox[_0x2c555d(0x32a)]['defaultColor']=function(){const _0x3d7fa6=_0x2c555d,_0x14124f=VisuMZ[_0x3d7fa6(0x245)][_0x3d7fa6(0x26a)][_0x3d7fa6(0x146)][_0x3d7fa6(0x326)];return ColorManager[_0x3d7fa6(0x7f)](_0x14124f);},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x2bb)]=Window_NameBox[_0x2c555d(0x32a)]['updatePlacement'],Window_NameBox[_0x2c555d(0x32a)][_0x2c555d(0x1ca)]=function(){const _0x424afa=_0x2c555d;VisuMZ['MessageCore']['Window_NameBox_updatePlacement'][_0x424afa(0x127)](this),this[_0x424afa(0xb7)](),this[_0x424afa(0x373)](),this[_0x424afa(0x30b)](),this[_0x424afa(0x2db)]();},Window_NameBox['prototype'][_0x2c555d(0x3ad)]=function(_0x2d3ed1){const _0x2ccf23=_0x2c555d;return _0x2d3ed1=_0x2d3ed1[_0x2ccf23(0x276)](/<LEFT>/gi,this[_0x2ccf23(0x20f)][_0x2ccf23(0x28f)](this,0x0)),_0x2d3ed1=_0x2d3ed1['replace'](/<CENTER>/gi,this['setRelativePosition'][_0x2ccf23(0x28f)](this,0x5)),_0x2d3ed1=_0x2d3ed1[_0x2ccf23(0x276)](/<RIGHT>/gi,this['setRelativePosition']['bind'](this,0xa)),_0x2d3ed1=_0x2d3ed1[_0x2ccf23(0x276)](/<POSITION:[ ](\d+)>/gi,(_0x1e26f2,_0x1870ea)=>this[_0x2ccf23(0x20f)](parseInt(_0x1870ea))),_0x2d3ed1=_0x2d3ed1[_0x2ccf23(0x276)](/<\/LEFT>/gi,''),_0x2d3ed1=_0x2d3ed1['replace'](/<\/CENTER>/gi,''),_0x2d3ed1=_0x2d3ed1[_0x2ccf23(0x276)](/<\/RIGHT>/gi,''),Window_Base['prototype'][_0x2ccf23(0x3ad)][_0x2ccf23(0x127)](this,_0x2d3ed1);},Window_NameBox[_0x2c555d(0x32a)][_0x2c555d(0x20f)]=function(_0x581d97){const _0x16d1d7=_0x2c555d;return this[_0x16d1d7(0x9a)]=_0x581d97,'';},Window_NameBox[_0x2c555d(0x32a)]['updateRelativePosition']=function(){const _0x326331=_0x2c555d;if($gameMessage['isRTL']())return;this['_relativePosition']=this['_relativePosition']||0x0;const _0xd42a6b=this[_0x326331(0x28e)],_0x3157ed=Math[_0x326331(0x2b1)](_0xd42a6b[_0x326331(0x1a4)]*this['_relativePosition']/0xa);this['x']=_0xd42a6b['x']+_0x3157ed-Math[_0x326331(0x2b1)](this['width']/0x2),this['x']=this['x']['clamp'](_0xd42a6b['x'],_0xd42a6b['x']+_0xd42a6b[_0x326331(0x1a4)]-this[_0x326331(0x1a4)]);},Window_NameBox[_0x2c555d(0x32a)][_0x2c555d(0x373)]=function(){const _0x20dce3=_0x2c555d;if($gameMessage['isRTL']())return;this[_0x20dce3(0x9a)]=this[_0x20dce3(0x9a)]||0x0;const _0x581282=VisuMZ['MessageCore'][_0x20dce3(0x26a)][_0x20dce3(0x146)][_0x20dce3(0x292)],_0x145c0c=VisuMZ[_0x20dce3(0x245)][_0x20dce3(0x26a)][_0x20dce3(0x146)][_0x20dce3(0x291)],_0x51db27=(0x5-this[_0x20dce3(0x9a)])/0x5;this['x']+=Math[_0x20dce3(0x2b1)](_0x581282*_0x51db27),this['y']+=_0x145c0c;},Window_NameBox[_0x2c555d(0x32a)][_0x2c555d(0x2db)]=function(){const _0x791ab=_0x2c555d,_0x44bc4f=this[_0x791ab(0x28e)],_0x1142a3=_0x44bc4f['y'],_0x31eab3=VisuMZ[_0x791ab(0x245)][_0x791ab(0x26a)]['General']['NameBoxWindowOffsetY'];_0x1142a3>this['y']&&_0x1142a3<this['y']+this[_0x791ab(0xab)]-_0x31eab3&&(this['y']=_0x44bc4f['y']+_0x44bc4f['height']);},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x20a)]=Window_NameBox[_0x2c555d(0x32a)][_0x2c555d(0x1f8)],Window_NameBox[_0x2c555d(0x32a)]['refresh']=function(){const _0x589c66=_0x2c555d;this[_0x589c66(0x9a)]=0x0,VisuMZ[_0x589c66(0x245)][_0x589c66(0x20a)]['call'](this);},Window_ChoiceList['prototype'][_0x2c555d(0x17b)]=function(){return![];},Window_ChoiceList['prototype'][_0x2c555d(0x3a5)]=function(){return!![];},Window_ChoiceList[_0x2c555d(0x32a)][_0x2c555d(0x3a9)]=function(){const _0x231eba=_0x2c555d;return $gameSystem[_0x231eba(0x152)]()+0x8;},Window_ChoiceList[_0x2c555d(0x32a)][_0x2c555d(0x332)]=function(){const _0x2618c0=_0x2c555d;return $gameSystem[_0x2618c0(0x202)]();},Window_ChoiceList[_0x2c555d(0x32a)]['start']=function(){const _0x482d36=_0x2c555d;this['refresh'](),this[_0x482d36(0x118)](),this[_0x482d36(0x355)](),this['activate']();},Window_ChoiceList[_0x2c555d(0x32a)][_0x2c555d(0x36b)]=function(){const _0x2266d1=_0x2c555d;$gameMessage['onChoice'](this[_0x2266d1(0x1d8)]()),this[_0x2266d1(0x28e)][_0x2266d1(0x254)](),this[_0x2266d1(0x345)](),this['_helpWindow']&&(this[_0x2266d1(0x1da)]['clear'](),this[_0x2266d1(0x1da)][_0x2266d1(0x193)]());},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x387)]=Window_ChoiceList[_0x2c555d(0x32a)][_0x2c555d(0x1b4)],Window_ChoiceList[_0x2c555d(0x32a)][_0x2c555d(0x1b4)]=function(){const _0x3968f5=_0x2c555d;VisuMZ[_0x3968f5(0x245)][_0x3968f5(0x387)][_0x3968f5(0x127)](this);if(this[_0x3968f5(0x1da)]){if(_0x3968f5(0x277)!==_0x3968f5(0x277)){if(this['_MessageCoreSettings']===_0x51fb1e)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x3968f5(0x14e)]===_0x4bf78c)this[_0x3968f5(0x270)]();this['_MessageCoreSettings'][_0x3968f5(0x14e)]=_0xab3ff7||0x1;}else this[_0x3968f5(0x1da)]['clear'](),this[_0x3968f5(0x1da)][_0x3968f5(0x193)]();}},Window_ChoiceList['prototype'][_0x2c555d(0x1f8)]=function(){const _0x2c3391=_0x2c555d;this[_0x2c3391(0x2e8)](),this[_0x2c3391(0x187)]();if(this[_0x2c3391(0x28e)]){if(_0x2c3391(0x3c2)!==_0x2c3391(0x1bc))this[_0x2c3391(0x1ca)](),this[_0x2c3391(0x2a8)]();else{_0x494148[_0x2c3391(0x39d)]=_0x27c9f9[_0x2c3391(0x39d)]['toUpperCase'](),_0x5677a9['textCodeCheck']=new _0x2e38ee('\x1b'+_0x1e5b55[_0x2c3391(0x39d)],'gi'),_0x1677e2['textCodeResult']='\x1b'+_0x35c49f[_0x2c3391(0x39d)];if(_0x32f8bc['Type']==='')_0x2ed1b4[_0x2c3391(0x22e)]+='[0]';}}this['createContents'](),this[_0x2c3391(0x29b)](),this[_0x2c3391(0xfc)](),Window_Selectable[_0x2c3391(0x32a)][_0x2c3391(0x1f8)][_0x2c3391(0x127)](this);},Window_ChoiceList[_0x2c555d(0x32a)][_0x2c555d(0x187)]=function(){const _0x372168=_0x2c555d,_0x2cd465=$gameMessage[_0x372168(0x2ed)](),_0x42c2e5=$gameMessage['choiceIndexArray'](),_0xd0c6f=$gameMessage[_0x372168(0x188)](),_0x3571be=_0x2cd465[_0x372168(0x240)];let _0x1d0c3a=0x0;for(let _0x19c1c2=0x0;_0x19c1c2<_0x3571be;_0x19c1c2++){if(this[_0x372168(0x221)][_0x372168(0x240)]>=_0xd0c6f)break;const _0x295242=_0x42c2e5[_0x19c1c2];let _0x2db9b7=_0x2cd465[_0x295242];if(_0x2db9b7===undefined)continue;_0x2db9b7=this[_0x372168(0x334)](_0x2db9b7);if(this[_0x372168(0x335)](_0x2db9b7)){const _0x58d2fc=this[_0x372168(0x274)](_0x2db9b7),_0x22ef36=this['isChoiceEnabled'](_0x2db9b7);this[_0x372168(0x212)](_0x58d2fc,_0x372168(0xaa),_0x22ef36,_0x295242);}_0x1d0c3a++;}this[_0x372168(0x120)](),this[_0x372168(0x2d8)]();},Window_ChoiceList[_0x2c555d(0x32a)]['convertChoiceMacros']=function(_0x4989be){const _0x4231d4=_0x2c555d;return Window_Base[_0x4231d4(0x32a)][_0x4231d4(0xd8)][_0x4231d4(0x127)](this,_0x4989be);},Window_ChoiceList[_0x2c555d(0x32a)]['isChoiceVisible']=function(_0x40cbf1){const _0x3c2783=_0x2c555d;if(Imported[_0x3c2783(0x13c)])$gameMessage[_0x3c2783(0xb1)]();if(_0x40cbf1[_0x3c2783(0x23e)](/<HIDE>/i))return![];if(_0x40cbf1[_0x3c2783(0x23e)](/<SHOW>/i))return!![];if(_0x40cbf1[_0x3c2783(0x23e)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x2b64b6=RegExp['$1'][_0x3c2783(0x88)](',')[_0x3c2783(0x2c0)](_0x185468=>Number(_0x185468)||0x0);for(const _0x55d20d of _0x2b64b6){if('STXwd'!==_0x3c2783(0x176)){if(this[_0x3c2783(0x247)]===_0x32c13d)this['initMessageCore']();if(this[_0x3c2783(0x247)][_0x3c2783(0x289)]===_0x18a7e8)this[_0x3c2783(0x270)]();return this[_0x3c2783(0x247)][_0x3c2783(0x289)];}else{if(!$gameSwitches[_0x3c2783(0x23a)](_0x55d20d))return![];}}return!![];}if(_0x40cbf1['match'](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x3c2783(0x1cd)===_0x3c2783(0x3d8)){const _0x4493de={'x':this['x'],'y':this['y']};_0x434cb7[_0x3c2783(0x32a)][_0x3c2783(0x17e)][_0x3c2783(0x127)](this),this['updateNameBoxMove'](_0x4493de);}else{const _0x55f49e=RegExp['$1'][_0x3c2783(0x88)](',')[_0x3c2783(0x2c0)](_0xad3431=>Number(_0xad3431)||0x0);for(const _0x3d416c of _0x55f49e){if(!$gameSwitches[_0x3c2783(0x23a)](_0x3d416c))return![];}return!![];}}if(_0x40cbf1[_0x3c2783(0x23e)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x3c2783(0x1ed)!==_0x3c2783(0x2f8)){const _0xf117f9=RegExp['$1'][_0x3c2783(0x88)](',')['map'](_0x2134ee=>Number(_0x2134ee)||0x0);for(const _0x4db7cc of _0xf117f9){if($gameSwitches[_0x3c2783(0x23a)](_0x4db7cc))return!![];}return![];}else _0x17bbff=_0x27b10f['replace'](_0x2648da['textCodeCheck'],_0x2c6329[_0x3c2783(0x22e)][_0x3c2783(0x28f)](this)),_0x47e53b=this[_0x3c2783(0x339)](_0x10bbdb);}if(_0x40cbf1['match'](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x5e3e18=RegExp['$1'][_0x3c2783(0x88)](',')[_0x3c2783(0x2c0)](_0x448fc5=>Number(_0x448fc5)||0x0);for(const _0x27a2aa of _0x5e3e18){if(!$gameSwitches[_0x3c2783(0x23a)](_0x27a2aa))return!![];}return![];}if(_0x40cbf1[_0x3c2783(0x23e)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x383f17=RegExp['$1']['split'](',')[_0x3c2783(0x2c0)](_0x4fc6cc=>Number(_0x4fc6cc)||0x0);for(const _0x2a150e of _0x383f17){if(_0x3c2783(0x244)===_0x3c2783(0x15e))return _0x40dff6=_0x144412[_0x3c2783(0x276)](/<COLORLOCK>/gi,_0x3c2783(0x37d)),_0x37013b=_0x195ebd[_0x3c2783(0x276)](/<\/COLORLOCK>/gi,_0x3c2783(0x2a6)),_0x7a4741=_0x1acf36[_0x3c2783(0x276)](/\(\(\(/gi,_0x3c2783(0x37d)),_0x3b07b8=_0x5d98ea[_0x3c2783(0x276)](/\)\)\)/gi,_0x3c2783(0x2a6)),_0x1bf5d8;else{if(!$gameSwitches[_0x3c2783(0x23a)](_0x2a150e))return!![];}}return![];}if(_0x40cbf1[_0x3c2783(0x23e)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x654dcf=RegExp['$1']['split'](',')[_0x3c2783(0x2c0)](_0x5da52a=>Number(_0x5da52a)||0x0);for(const _0x532985 of _0x654dcf){if($gameSwitches[_0x3c2783(0x23a)](_0x532985))return![];}return!![];}return!![];},Window_ChoiceList[_0x2c555d(0x32a)][_0x2c555d(0x274)]=function(_0x1bd49e){let _0x5a5c5c=_0x1bd49e;return _0x5a5c5c=_0x5a5c5c['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x5a5c5c=_0x5a5c5c['replace'](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x5a5c5c;},Window_ChoiceList[_0x2c555d(0x32a)]['isChoiceEnabled']=function(_0x4996d8){const _0x24de96=_0x2c555d;if(Imported[_0x24de96(0x13c)])$gameMessage[_0x24de96(0xb1)]();if(_0x4996d8[_0x24de96(0x23e)](/<DISABLE>/i))return![];if(_0x4996d8[_0x24de96(0x23e)](/<ENABLE>/i))return!![];if(_0x4996d8[_0x24de96(0x23e)](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x5e1f78=RegExp['$1'][_0x24de96(0x88)](',')[_0x24de96(0x2c0)](_0x112deb=>Number(_0x112deb)||0x0);for(const _0x4299ab of _0x5e1f78){if(_0x24de96(0x90)===_0x24de96(0x10d))_0x19b3a1[_0x24de96(0x23e)](_0x1c32ac[_0x24de96(0x1ac)])&&(_0x11a032=_0x33576d['replace'](_0x34443a['textCodeCheck'],_0x442142[_0x24de96(0x22e)]),_0x212f8b=this[_0x24de96(0x339)](_0x3f0a3b));else{if(!$gameSwitches[_0x24de96(0x23a)](_0x4299ab))return![];}}return!![];}if(_0x4996d8['match'](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x3d12e5=RegExp['$1']['split'](',')[_0x24de96(0x2c0)](_0xfd82a1=>Number(_0xfd82a1)||0x0);for(const _0x5e7f0c of _0x3d12e5){if(!$gameSwitches[_0x24de96(0x23a)](_0x5e7f0c))return![];}return!![];}if(_0x4996d8['match'](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x17e1af=RegExp['$1'][_0x24de96(0x88)](',')[_0x24de96(0x2c0)](_0x273d48=>Number(_0x273d48)||0x0);for(const _0x327dfd of _0x17e1af){if($gameSwitches[_0x24de96(0x23a)](_0x327dfd))return!![];}return![];}if(_0x4996d8[_0x24de96(0x23e)](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x197f72=RegExp['$1'][_0x24de96(0x88)](',')[_0x24de96(0x2c0)](_0x49dbeb=>Number(_0x49dbeb)||0x0);for(const _0x57b859 of _0x197f72){if('TCgaW'==='gqQVt')this[_0x24de96(0x1b6)]();else{if(!$gameSwitches['value'](_0x57b859))return!![];}}return![];}if(_0x4996d8[_0x24de96(0x23e)](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x1dc226=RegExp['$1'][_0x24de96(0x88)](',')[_0x24de96(0x2c0)](_0x5dbd00=>Number(_0x5dbd00)||0x0);for(const _0x8bc3e4 of _0x1dc226){if(_0x24de96(0x2dd)===_0x24de96(0x2dd)){if(!$gameSwitches['value'](_0x8bc3e4))return!![];}else{const _0x47143f=_0x52840f(_0x3223e7['$1']);_0x47143f!==_0x1f5841[_0x3c7165][_0x24de96(0x7d)]&&(_0x3e6303(_0x24de96(0x142)[_0x24de96(0x35e)](_0xf8cf4f,_0x47143f)),_0x2d8582[_0x24de96(0x1f4)]());}}return![];}if(_0x4996d8[_0x24de96(0x23e)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x24de96(0xd5)!==_0x24de96(0xd5))this[_0x24de96(0x273)]['fontSize']+=_0x5c40df[_0x24de96(0x245)][_0x24de96(0x26a)]['General']['FontChangeValue'],this[_0x24de96(0x273)][_0x24de96(0x133)]=_0x429d83[_0x24de96(0x104)](this['contents'][_0x24de96(0x133)],_0x27a218['MessageCore'][_0x24de96(0x26a)][_0x24de96(0x146)][_0x24de96(0x1de)]);else{const _0x5a9beb=RegExp['$1'][_0x24de96(0x88)](',')[_0x24de96(0x2c0)](_0x13ebc9=>Number(_0x13ebc9)||0x0);for(const _0x15bcd5 of _0x5a9beb){if($gameSwitches['value'](_0x15bcd5))return![];}return!![];}}return!![];},Window_ChoiceList[_0x2c555d(0x32a)]['clearChoiceHelpDescriptions']=function(){const _0x5775c7=_0x2c555d;this[_0x5775c7(0x300)]={},this['_helpWindow']&&(this[_0x5775c7(0x1da)][_0x5775c7(0x258)](),this[_0x5775c7(0x1da)]['hide']());},Window_ChoiceList[_0x2c555d(0x32a)][_0x2c555d(0x2d8)]=function(){const _0x6d0bc1=_0x2c555d,_0x19664c=/<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i;for(const _0x5b553f of this[_0x6d0bc1(0x221)]){if(!_0x5b553f)continue;const _0x473ef4=this[_0x6d0bc1(0x221)][_0x6d0bc1(0x11b)](_0x5b553f);if(_0x5b553f[_0x6d0bc1(0x322)][_0x6d0bc1(0x23e)](_0x19664c)){if('CrEkh'!=='SrrZX'){const _0x175785=String(RegExp['$1']);this[_0x6d0bc1(0x300)][_0x473ef4]=_0x175785[_0x6d0bc1(0x116)](),_0x5b553f['name']=_0x5b553f[_0x6d0bc1(0x322)][_0x6d0bc1(0x276)](_0x19664c,'')[_0x6d0bc1(0x116)]();}else _0x500850+=_0x38505d;}else'Jdsfz'==='Jdsfz'?this[_0x6d0bc1(0x300)][_0x473ef4]='':(this[_0x6d0bc1(0x227)]=this['_pictureTextRefresh']||[],(this[_0x6d0bc1(0x313)](_0x1cf712)||_0x1b24c3)&&this[_0x6d0bc1(0x227)][_0x6d0bc1(0x352)](_0x332e0d));}},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x1b9)]=Window_ChoiceList[_0x2c555d(0x32a)][_0x2c555d(0x1ca)],Window_ChoiceList['prototype'][_0x2c555d(0x1ca)]=function(){const _0xfd5582=_0x2c555d;VisuMZ['MessageCore']['Window_ChoiceList_updatePlacement'][_0xfd5582(0x127)](this),this['clampPlacementPosition']();},Window_ChoiceList[_0x2c555d(0x32a)]['placeCancelButton']=function(){const _0x550db0=_0x2c555d;if(!this[_0x550db0(0x3ca)])return;const _0x1de131=0x8,_0x5939b8=this[_0x550db0(0x3ca)],_0x54b90d=this['x']+this[_0x550db0(0x1a4)],_0x5b9ac9=Math['floor']((Graphics[_0x550db0(0x1a4)]-Graphics['boxWidth'])/0x2);_0x54b90d>=Graphics[_0x550db0(0x1a7)]+_0x5b9ac9-_0x5939b8[_0x550db0(0x1a4)]+_0x1de131?_0x5939b8['x']=-_0x5939b8['width']-_0x1de131:_0x5939b8['x']=this['width']+_0x1de131,_0x5939b8['y']=this[_0x550db0(0xab)]/0x2-_0x5939b8['height']/0x2;},VisuMZ['MessageCore'][_0x2c555d(0x216)]=Window_ChoiceList[_0x2c555d(0x32a)][_0x2c555d(0x183)],Window_ChoiceList[_0x2c555d(0x32a)][_0x2c555d(0x183)]=function(){const _0x4485c9=_0x2c555d;return this[_0x4485c9(0x28e)]?this[_0x4485c9(0x211)]():VisuMZ[_0x4485c9(0x245)]['Window_ChoiceList_windowX']['call'](this);},Window_ChoiceList[_0x2c555d(0x32a)]['messageCoreWindowX']=function(){const _0x368fa3=_0x2c555d,_0x2ee607=$gameMessage[_0x368fa3(0x177)]();if(_0x2ee607===0x1)return(Graphics[_0x368fa3(0x1a7)]-this[_0x368fa3(0x2b5)]())/0x2;else return _0x2ee607===0x2?this['_messageWindow']['x']+this[_0x368fa3(0x28e)]['width']-this['windowWidth']():_0x368fa3(0xa5)!==_0x368fa3(0xa5)?(_0x3bcbac['setLastPluginCommandInterpreter'](this),_0x31ecda[_0x368fa3(0x245)]['Game_Interpreter_PluginCommand'][_0x368fa3(0x127)](this,_0x3a25a6)):this[_0x368fa3(0x28e)]['x'];},Window_ChoiceList[_0x2c555d(0x32a)]['windowWidth']=function(){const _0x278efc=_0x2c555d,_0x5d6e44=(this['maxChoiceWidth']()+this['colSpacing']())*this[_0x278efc(0x332)]()+this[_0x278efc(0xe4)]*0x2;return Math[_0x278efc(0x104)](_0x5d6e44,Graphics[_0x278efc(0x1a4)]);},Window_ChoiceList[_0x2c555d(0x32a)][_0x2c555d(0x159)]=function(){const _0x5197b1=_0x2c555d,_0x364be7=$gameMessage[_0x5197b1(0x2ed)]()[_0x5197b1(0x2c0)](_0x33bb1a=>this[_0x5197b1(0x334)](_0x33bb1a))[_0x5197b1(0xfa)](_0x39b8f1=>this[_0x5197b1(0x335)](_0x39b8f1)),_0x4598dc=$gameMessage['maxShuffleChoices'](),_0x2e564a=Math[_0x5197b1(0xf4)](Math[_0x5197b1(0x104)](_0x4598dc,_0x364be7[_0x5197b1(0x240)])/this[_0x5197b1(0x332)]());return Math[_0x5197b1(0x168)](0x1,Math['min'](_0x2e564a,this[_0x5197b1(0x114)]()));},Window_ChoiceList[_0x2c555d(0x32a)][_0x2c555d(0x114)]=function(){const _0x34cc9a=_0x2c555d,_0x31b776=this[_0x34cc9a(0x28e)],_0x35a336=_0x31b776?_0x31b776['y']:0x0,_0x51ff0a=_0x31b776?_0x31b776[_0x34cc9a(0xab)]:0x0,_0x1dbba3=Graphics['boxHeight']/0x2;return _0x35a336<_0x1dbba3&&_0x35a336+_0x51ff0a>_0x1dbba3?0x4:$gameSystem[_0x34cc9a(0x109)]();},Window_ChoiceList[_0x2c555d(0x32a)][_0x2c555d(0x3ba)]=function(){const _0x203f03=_0x2c555d;let _0x1038bd=this[_0x203f03(0x13f)]();for(const _0x476a37 of this[_0x203f03(0x221)]){const _0x77890a=_0x476a37['name'],_0x31fbb8=this[_0x203f03(0x390)](_0x77890a),_0x49ef85=this[_0x203f03(0x12e)](_0x77890a)[_0x203f03(0x1a4)]+_0x31fbb8,_0x4bfa4a=Math[_0x203f03(0xf4)](_0x49ef85)+this[_0x203f03(0x229)]()*0x2;_0x1038bd=Math[_0x203f03(0x168)](_0x1038bd,_0x4bfa4a);}return _0x1038bd;},Window_ChoiceList['prototype']['getStartingChoiceWidth']=function(){const _0x50734f=_0x2c555d;let _0x3f6af4=0x60;const _0xef42b6=$gameMessage[_0x50734f(0x2ed)]();for(const _0x87c41a of _0xef42b6){if('mRCCy'===_0x50734f(0x259))this[_0x50734f(0x1a2)]=_0xfbeed;else{if(_0x87c41a['match'](/<CHOICE WIDTH:[ ](\d+)>/gi)){if(_0x50734f(0x1d0)!==_0x50734f(0x70))_0x3f6af4=Math[_0x50734f(0x168)](_0x3f6af4,Number(RegExp['$1']));else return this['processAutoSize'](_0x1c6f2a,!![],!![]),this[_0x50734f(0x11f)](_0x50734f(0x8a),_0xd9413b(_0x460aef)||0x1),'';}}}return _0x3f6af4;},Window_ChoiceList[_0x2c555d(0x32a)][_0x2c555d(0x2cf)]=function(_0x2042d0){const _0x165b6b=_0x2c555d,_0x234590=this['itemRectWithPadding'](_0x2042d0),_0xd39f1d=$gameSystem['getChoiceListTextAlign']()!==_0x165b6b(0x287)?_0x165b6b(0x14f)[_0x165b6b(0x35e)]($gameSystem[_0x165b6b(0x2b0)]()):'',_0x3e5142=_0xd39f1d+this[_0x165b6b(0x1bf)](_0x2042d0);this[_0x165b6b(0xb6)](this[_0x165b6b(0x30f)](_0x2042d0));const _0x239991=this['textSizeEx'](_0x3e5142)['height'],_0x2f7b81=_0x234590['x']+this[_0x165b6b(0x390)](_0x3e5142),_0xbe1ea3=Math['max'](_0x234590['y'],_0x234590['y']+Math[_0x165b6b(0x7e)]((_0x234590[_0x165b6b(0xab)]-_0x239991)/0x2));this[_0x165b6b(0x123)](_0x3e5142,_0x2f7b81,_0xbe1ea3,_0x234590[_0x165b6b(0x1a4)]),this[_0x165b6b(0x18f)](_0x2042d0);},Window_ChoiceList[_0x2c555d(0x32a)]['getChoiceIndent']=function(_0x394d89){const _0x119d23=_0x2c555d;let _0xdbd543=0x0;return _0x394d89[_0x119d23(0x23e)](/<CHOICE INDENT:[ ](\d+)>/gi)&&(_0xdbd543=Number(RegExp['$1'])),_0xdbd543;},Window_ChoiceList['prototype'][_0x2c555d(0x18f)]=function(_0x103606){const _0x6ed43d=_0x2c555d;if(!Imported['VisuMZ_0_CoreEngine'])return;const _0x10e7b6=this[_0x6ed43d(0x1bf)](_0x103606);let _0x49a15e=![],_0x1d5506=![],_0x142374=ColorManager[_0x6ed43d(0x25d)](),_0x580a39=ColorManager[_0x6ed43d(0xa1)]();if(_0x10e7b6['match'](/<(?:BGCOLOR|BG COLOR):[ ](.*?),(.*?)>/gi))_0x142374=ColorManager[_0x6ed43d(0x6b)](RegExp['$1'])[_0x6ed43d(0x116)](),_0x580a39=ColorManager[_0x6ed43d(0x6b)](RegExp['$2'])[_0x6ed43d(0x116)](),_0x49a15e=!![];else{if(_0x10e7b6[_0x6ed43d(0x23e)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi)){let _0x5e6229=String(RegExp['$1'])[_0x6ed43d(0x1ad)]()['trim']();switch(_0x5e6229){case _0x6ed43d(0x1a1):_0x142374=_0x580a39=_0x6ed43d(0x24d),_0x1d5506=!![];break;case'orange':_0x142374=_0x580a39=_0x6ed43d(0x84),_0x1d5506=!![];break;case _0x6ed43d(0x2a5):_0x142374=_0x580a39='#fff799',_0x1d5506=!![];break;case'green':_0x142374=_0x580a39=_0x6ed43d(0x2ea),_0x1d5506=!![];break;case _0x6ed43d(0xd4):_0x142374=_0x580a39='#6dcff6',_0x1d5506=!![];break;case _0x6ed43d(0x161):case _0x6ed43d(0x380):_0x142374=_0x580a39=_0x6ed43d(0x271),_0x1d5506=!![];break;case _0x6ed43d(0x2cd):_0x142374=_0x580a39=_0x6ed43d(0x174),_0x1d5506=!![];break;case'pink':_0x142374=_0x580a39=_0x6ed43d(0x39e),_0x1d5506=!![];break;case _0x6ed43d(0x1e4):_0x142374=_0x580a39=_0x6ed43d(0x1c3),_0x1d5506=!![];break;case'gray':case _0x6ed43d(0x17c):_0x142374=_0x580a39=_0x6ed43d(0x1d5),_0x1d5506=!![];break;case'black':_0x142374=_0x580a39=_0x6ed43d(0x264),_0x1d5506=!![];break;case _0x6ed43d(0xd1):_0x142374=_0x580a39=ColorManager[_0x6ed43d(0x328)](),_0x1d5506=!![];break;case'no':_0x142374=_0x580a39=ColorManager[_0x6ed43d(0xd0)](),_0x1d5506=!![];break;case'system':_0x142374=_0x580a39=ColorManager[_0x6ed43d(0x1be)](),_0x1d5506=!![];break;case'crisis':_0x142374=_0x580a39=ColorManager[_0x6ed43d(0x307)](),_0x1d5506=!![];break;default:_0x142374=_0x580a39=ColorManager['getColor'](_0x5e6229),_0x1d5506=!![];break;}_0x49a15e=!![];}}if(!_0x49a15e)return;const _0x516ebc=this[_0x6ed43d(0xe7)](_0x103606);this[_0x6ed43d(0x153)][_0x6ed43d(0x7c)](_0x516ebc['x'],_0x516ebc['y'],_0x516ebc[_0x6ed43d(0x1a4)],_0x516ebc[_0x6ed43d(0xab)]),this['drawCustomBackgroundColor'](_0x516ebc,_0x142374,_0x580a39,_0x1d5506);},Window_ChoiceList[_0x2c555d(0x32a)][_0x2c555d(0x144)]=function(_0x28b485,_0x4cc931,_0x56ce25,_0x2b68c1){const _0x4a7965=_0x2c555d,_0x5c5426=ColorManager[_0x4a7965(0x25d)](),_0x4926e0=ColorManager[_0x4a7965(0x2b4)](),_0x431f00=_0x4cc931??ColorManager['itemBackColor1'](),_0x24187a=_0x56ce25??_0x4cc931,_0x2df08e=_0x28b485['x'],_0x469d8c=_0x28b485['y'],_0x576235=_0x28b485['width'],_0x4e7079=_0x28b485[_0x4a7965(0xab)];this['contentsBack'][_0x4a7965(0x1e7)](_0x2df08e,_0x469d8c,_0x576235,_0x4e7079,_0x431f00,_0x24187a,!![]),_0x2b68c1&&this['contentsBack'][_0x4a7965(0x1e7)](_0x2df08e,_0x469d8c,_0x576235,_0x4e7079,_0x5c5426,_0x24187a,!![]),this[_0x4a7965(0x153)][_0x4a7965(0x1d3)](_0x2df08e,_0x469d8c,_0x576235,_0x4e7079,_0x5c5426);},Window_ChoiceList[_0x2c555d(0x32a)][_0x2c555d(0xc7)]=function(){const _0x1349ae=_0x2c555d;this[_0x1349ae(0x1da)][_0x1349ae(0x258)]();if(!this[_0x1349ae(0x300)])return;const _0x3f033b=this['index']();this['_choiceHelpDescriptions'][_0x3f033b]?(this[_0x1349ae(0x1da)][_0x1349ae(0x379)](this['_choiceHelpDescriptions'][_0x3f033b]),this[_0x1349ae(0x1da)][_0x1349ae(0x1bb)]()):'IicOt'!==_0x1349ae(0x219)?_0x3b5fa5=_0x1df95f[_0x1349ae(0x200)]():(this[_0x1349ae(0x1da)][_0x1349ae(0x258)](),this[_0x1349ae(0x1da)][_0x1349ae(0x193)]());},Window_EventItem[_0x2c555d(0x32a)][_0x2c555d(0x2ad)]=function(){const _0x39adc4=_0x2c555d,_0x21c5ef=$gameMessage[_0x39adc4(0x13d)]();if(_0x21c5ef===_0x39adc4(0x196)&&Imported[_0x39adc4(0x191)]){if(_0x39adc4(0x3de)===_0x39adc4(0x3de))this[_0x39adc4(0x2f6)]();else{_0x96b8c0[_0x39adc4(0x245)][_0x39adc4(0x78)]=[];for(let _0x2acdce=0x1;_0x2acdce<=0x1f;_0x2acdce++){const _0x235a4b='TextColor%1'[_0x39adc4(0x35e)](_0x2acdce),_0x2aad91=_0x228a7b[_0x39adc4(0x245)][_0x39adc4(0x26a)]['AutoColor'][_0x235a4b];_0x2aad91[_0x39adc4(0x22d)]((_0x5b1b79,_0x1f26d0)=>{const _0x4c766b=_0x39adc4;if(!_0x5b1b79||!_0x1f26d0)return-0x1;return _0x1f26d0[_0x4c766b(0x240)]-_0x5b1b79[_0x4c766b(0x240)];}),this['CreateAutoColorRegExpListEntries'](_0x2aad91,_0x2acdce);}}}else'owDCW'!==_0x39adc4(0x3a6)?Window_ItemList[_0x39adc4(0x32a)][_0x39adc4(0x2ad)][_0x39adc4(0x127)](this):(this[_0x39adc4(0x101)]['x']+=this['x']-_0x54dbf1['x'],this['_nameBoxWindow']['y']+=this['y']-_0x3914bb['y']);},Window_EventItem[_0x2c555d(0x32a)][_0x2c555d(0x2f6)]=function(){const _0x136f94=_0x2c555d,_0x588417=$gameMessage[_0x136f94(0x158)]();this['_data']=_0x588417?_0x588417['skills']()[_0x136f94(0xfa)](_0x520fed=>this[_0x136f94(0x1f1)](_0x520fed)):[];if(this[_0x136f94(0x1f1)](null)){if(_0x136f94(0x1d6)===_0x136f94(0x2f7)){const _0x3583a1=_0x553871[_0x136f94(0x283)]();if(_0x3583a1['id']<=0x0)return'';return _0x3583a1[_0x136f94(0x364)];}else this[_0x136f94(0x89)]['push'](null);}},VisuMZ['MessageCore']['Window_EventItem_includes']=Window_EventItem[_0x2c555d(0x32a)][_0x2c555d(0x1f1)],Window_EventItem[_0x2c555d(0x32a)][_0x2c555d(0x1f1)]=function(_0x482677){const _0x678047=_0x2c555d,_0x46eedf=$gameMessage[_0x678047(0x13d)]();if(_0x46eedf==='weapon'){if(!DataManager[_0x678047(0x10f)](_0x482677))return![];const _0xb25026=$gameMessage[_0x678047(0x21f)]();if(_0xb25026>0x0){if('WZoGW'!==_0x678047(0x2f0)){if(_0x482677['wtypeId']!==_0xb25026)return![];}else return this[_0x678047(0xeb)](_0x22aaf5,![],!![]),this[_0x678047(0x11f)](_0x678047(0x38f)),'';}return!![];}else{if(_0x46eedf===_0x678047(0x102)){if(!DataManager[_0x678047(0x1b3)](_0x482677))return![];const _0x2bab15=$gameMessage[_0x678047(0x260)]();if(_0x2bab15>0x0){if(_0x678047(0x29c)==='OxkTP'){if(_0x482677[_0x678047(0xad)]!==_0x2bab15)return![];}else{const _0x33fa77=_0x5e0819(_0x5cd17d['$1']);this[_0x678047(0x300)][_0x3eea84]=_0x33fa77[_0x678047(0x116)](),_0x27b23c[_0x678047(0x322)]=_0x26ec74[_0x678047(0x322)][_0x678047(0x276)](_0x28bf3e,'')[_0x678047(0x116)]();}}const _0x3b4bca=$gameMessage[_0x678047(0x3db)]();if(_0x3b4bca>0x0){if(_0x678047(0x39c)!=='vNKYP'){if(_0x482677[_0x678047(0x3e0)]!==_0x3b4bca)return![];}else this[_0x41c02e]=_0x2b469f(this['_forcedPosition'][_0x4ffaee]);}return!![];}else{if(_0x46eedf===_0x678047(0x196)){if(!DataManager['isSkill'](_0x482677))return![];const _0x3bb3a7=$gameMessage[_0x678047(0x158)]();if(_0x3bb3a7[_0x678047(0xc1)](_0x482677))return![];if(!_0x3bb3a7[_0x678047(0x2d4)](_0x482677))return![];const _0x27ab95=$gameMessage[_0x678047(0x2c1)]();if(_0x27ab95>0x0){const _0x5db359=DataManager[_0x678047(0x266)](_0x482677);if(!_0x5db359['includes'](_0x27ab95))return![];}return!![];}else return VisuMZ[_0x678047(0x245)][_0x678047(0x2a1)]['call'](this,_0x482677);}}},VisuMZ[_0x2c555d(0x245)][_0x2c555d(0x80)]=Window_ItemList[_0x2c555d(0x32a)][_0x2c555d(0x281)],Window_ItemList[_0x2c555d(0x32a)][_0x2c555d(0x281)]=function(_0x20f38e,_0x527086,_0x463f33,_0x3dcff9){const _0x2f9e27=_0x2c555d,_0x3efd25=$gameMessage['itemChoiceItypeId']();if(_0x3efd25===_0x2f9e27(0x196)){const _0x53e1f5=$gameMessage[_0x2f9e27(0x158)]();this[_0x2f9e27(0x29f)](_0x53e1f5,_0x20f38e,_0x527086,_0x463f33,_0x3dcff9);}else VisuMZ[_0x2f9e27(0x245)][_0x2f9e27(0x80)][_0x2f9e27(0x127)](this,_0x20f38e,_0x527086,_0x463f33,_0x3dcff9);};function _0x1de7(_0x299dc6,_0x20319e){const _0x48aca7=_0x48ac();return _0x1de7=function(_0x1de767,_0x4a0546){_0x1de767=_0x1de767-0x67;let _0x1103af=_0x48aca7[_0x1de767];return _0x1103af;},_0x1de7(_0x299dc6,_0x20319e);}function _0x48ac(){const _0x3c9ad2=['getMessageWindowWidth','sort','textCodeResult','processPreviousColor','type','_moveDuration','changeValue','processActorNameAutoColorChanges','_index','outputWidth','map\x20party','jbHGS','processAutoColorWords','_moveTargetY','value','\x1bI[%1]','center','processColorLock','match','upperright','length','setChoiceListLineHeight','MsgWindowOffsetX','resetWordWrap','jxbaw','MessageCore','prepareWordWrapEscapeCharacters','_MessageCoreSettings','Window_Message_updatePlacement','_moveTargetWidth','QgZKx','ConfigManager_applyData','Window_ChoiceList','#f26c4f','resizePictureText','clearAllPictureTexts','hQiPQ','AddOption','down','ALL','terminateMessage','instantTextSpeed','setSkillChoice','updateNameBoxMove','clear','SLWnA','preFlushTextState','drawPictureTextZone','sdPFg','itemBackColor1','<LINE\x20BREAK>','code','itemChoiceAtypeId','SortObjectByKeyLength','changeVolume','erasePictureTextBuffer','#707070','jfmTI','getSkillTypes','wtypeId','setChoiceListMaxColumns','databaseObjectName','Settings','_autoSizeCheck','anchorPictureText','maxCommands','hhOWr','WORD_WRAP_PADDING','initMessageCore','#a186be','BamLL','contents','parseChoiceText','slice','replace','zwlth','ActorID','AutoColor','surprise','42432xSFJOB','boxHeight','postConvertEscapeCharacters','helpWordWrap','setChoiceListMaxRows','SelectWeapon','drawItemNumber','setMessageWindowWordWrap','getLastGainedItemData','Actors','70PbnrSQ','gNZVN','default','TextMacros','choiceCols','toUpperCase','Scene_Message_createChoiceListWindow','addGeneralOptions','processPxTextCode','_messageWindow','bind','event','NameBoxWindowOffsetY','NameBoxWindowOffsetX','scale','_pictureId','initTextAlignement','adjustShowChoiceCancel','convertButtonAssistEscapeCharacters','initialize','drawing','partyMemberName','updateBackground','OxkTP','jHTFW','\x1bBOLD[0]','drawSkillCost','convertMessageCoreEscapeReplacements','Window_EventItem_includes','fontBold','changeTextSpeed','createChoiceListHelpWindow','yellow','\x1bCOLORLOCK[0]','hYeMc','placeCancelButton','setPictureTextBuffer','njYMV','Sprite_Picture_update','ParseItemNotetags','makeItemList','exec','WordWrap','getChoiceListTextAlign','floor','NeNPX','choiceLineHeight','dimColor2','windowWidth','MessageWidth','isTriggered','isBusy','FfObk','textSizeExWordWrap','Window_NameBox_updatePlacement','ConfigManager_makeData','command101','startX','loadPicture','map','itemChoiceStypeId','map\x20actor','1669725pmGroL','fQpTb','isHelpWindowWordWrap','map\x20player','clearFlags','status','_pictureTextHeight','prepareShowTextFollowups','left','textSpeedStatusText','brown','convertShowChoiceEscapeCodes','drawItem','battleUserName','textSpeed','ParseWeaponNotetags','572178bPWFfk','isSkillTypeMatchForUse','lastGainedObjectIcon','updateXyOffsets','_itemChoiceStypeId','applyChoiceHelpDescriptions','Game_Interpreter_PluginCommand','Window_Options_statusText','updateOverlappingY','mlOGG','hFzOk','processWrapBreak','MlYpu','resetFontSettings','xMyVm','battleTargetName','processTextAlignmentX','startY','_autoPosRegExp','calcWindowHeight','needsPictureTextRefresh','clearCommandList','isMessageWindowWordWrap','#7cc576','erkjU','PIUZK','choices','setPositionType','Window_Message_synchronizeNameBox','OgiIN','ylqgw','sUFug','zoomScale','KoVUP','substring','makeSkillList','cHjoe','WhxZd','addExtraShowChoices','VisuMZ_3_ActSeqCamera','easeOut','_texts','_indent','STRUCT','MmMbH','_choiceHelpDescriptions','TightWrap','Window_Message_needsNewPage','SkillTypeID','Ukbpt','setMessageWindowRows','obtainEscapeString','crisisColor','aTmRt','itemChoiceActorId','FontChangeValue','clampPlacementPosition','easeInOut','BdDSk','prepareAutoSizeEscapeCharacters','isCommandEnabled','MKtqG','pageup','tZSly','hasPictureText','TextCodeReplace','convertLockColorsEscapeCharacters','visible','CommonEvent','fontFace','_messageCommonEvents','<BR>','parameters','EXQyV','HQDNl','choiceListHelpWindowRect','TextSpeed','drawBackCenteredPicture','MessageWindow','name','Window_Message_newPage','convertFontSettingsEscapeCharacters','NUM','NameBoxWindowDefaultColor','ParseStateNotetags','powerUpColor','RItED','prototype','wzesK','EndPadding','easeIn','bvlHD','getRandomTextFromPool','PictureTextChange','UhQIz','maxCols','_positionType','convertChoiceMacros','isChoiceVisible','fCLCX','PictureIDs','convertMessageCoreEscapeActions','convertVariableEscapeCharacters','SWITCHES','messageWindowRect','eraseAllPictureTexts','ArmorTypeID','anyPictureTextChanges','_pictureTextCache','llogu','eILYq','_pictureTextWidth','orPOe','TjPMM','close','SGZZP','SelectSkill','messageWidth','addChildAt','_centerMessageWindow','addMessageCoreCommands','convertHardcodedEscapeReplacements','lowerleft','_itemChoiceWtypeId','1579880vmfikL','isVolumeSymbol','_wordWrap','push','followers','_itemChoiceEtypeId','open','onProcessCharacter','_wholeMoveDuration','follower','TextStr','nJveu','onNewPageMessageCore','IXCsG','_resetRect','format','_messageOffsetX','rtl','_pictures','qMlgA','nextEventCode','quantity','_choiceCancelType','Weapons','rfRyE','ElmKw','processFsTextCode','clamp','callOkHandler','Default','setLastPluginCommandInterpreter','addedHeight','registerActorNameAutoColorChanges','drawPictureText','substr','</COLORLOCK>','updateOffsetPosition','AdjustRect','true','Game_Party_initialize','_forcedPosition','faceWidth','setText','moveTo','actorName','paintOpacity','\x1bCOLORLOCK[1]','getLastPluginCommandInterpreter','ChoiceWindowMaxRows','violet','Game_Screen_erasePicture','makeDeepCopy','adjustShowChoiceDefault','SLdds','_choiceListWindow','processControlCharacter','Window_ChoiceList_callCancelHandler','commandSymbol','hrkXd','Scene_Boot_onDatabaseLoaded','<WORDWRAP>','faceName','Window_Base_processAllText','setChoiceListHelpWindow','none','getChoiceIndent','resetPositionX','constructor','addWrapBreakAfterPunctuation','fontItalic','innerHeight','messageWordWrap','item','<B>','MaxRows','StretchDimmedBg','indent','NrYjH','Match','#ffc8e0','prepareShowTextPluginCommandFollowups','members','AddAutoColor','VariableID','innerWidth','kYsor','isAutoColorAffected','GrJIN','menu','Window_Base_processEscapeCharacter','itemHeight','join','setWeaponChoice','setTextDelay','preConvertEscapeCharacters','Window_MessageLog','resetTextColor','Window_Base_processControlCharacter','mbHUU','needsNewPage','yYZeD','setArmorChoice','\x1bC[%1]%2\x1bPREVCOLOR[0]','Type','MessageTextDelay','kcUrw','colSpacing','maxChoiceWidth',')))','NrdOK','PXoXx','RelativePXPY','isSceneMap','_itemChoiceActorId','AutoColorBypassList','syTDD','_textDelayCount','VisuMZ_0_CoreEngine','random','updateDimensions','SplitJpCnCharacters','description','uRpjU','_cancelButton','battle\x20enemy','Iayjv','addContinuousShowChoices','VyQuC','createPictureText','getMessageWindowXyOffsets','JSON','CENTERPICTURE','stringify','synchronizeNameBox','SelectArmor','anchor','Width','Uuxdt','Game_Map_updateEvents','setupChoices','itemChoiceEtypeId','messagePositionReset','CreateAutoColorRegExpLists','zSKNi','dIWfS','etypeId','command357','WeaponTypeID','addMessageCommonEvent','isSceneBattle','getColor','\x1bTEXTALIGNMENT[3]','flushTextState','createChoiceListWindow','Classes','MZYfE','requestPictureTextRefresh','getPreservedFontSettings','XkGOj','applyData','\x1bi[%1]','process_VisuMZ_MessageCore_TextCodes_Action','Items','AutoColorRegExp','choiceIndexArray','Enemies','setWaitMode','clearRect','version','round','textColor','Window_ItemList_drawItemNumber','ChoiceWindowMaxCols','lowerright','isItem','#fbaf5d','currentCommand','Undefined','MESSAGE_CORE_PLUGIN_NAME','split','_data','battle\x20actor','contentsHeight','Sprite_Picture_updateBitmap','launchMessageCommonEvent','setupEvents','message','IOQil','processStoredAutoColorChanges','isInputting','Scene_Options_maxCommands','DefaultOutlineWidth','_showFast','_choices','TextAlign','<I>','Game_Interpreter_setupChoices','_relativePosition','obtainExp','currencyUnit','YhKic','setColorLock','processMessageCoreEscapeActions','_currentAutoSize','itemBackColor2','_choiceListHelpWindow','_scene','Armors','aDHOm','_textDelay','attachPictureText','Window_Options_addGeneralOptions','ctNEr','choice','height','zyKGw','atypeId','_maxShuffleChoices','updateTransform','normalColor','registerSelfEvent','isRunning','autoPositionOffsetY','BOLD','openness','changePaintOpacity','updateRelativePosition','_pictureText','Window_Message_terminateMessage','setBackground','IWwMK','ARRAYNUM','Game_Party_gainItem','isColorLocked','getPictureTextData','messageCoreTextSpeed','isSkillHidden','_messagePositionReset','false','applyDatabaseAutoColor','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ParseClassNotetags','updateHelp','MWSNx','_target','obtainEscapeParam','processCommonEvent','postFlushTextState','Window_Base_changeTextColor','moveBy','_moveTargetX','powerDownColor','yes','ChoiceWindowProperties','_itemChoiceAtypeId','blue','vYZpp','processNewLine','findTargetSprite','convertTextMacros','Game_System_initialize','text','getPictureText','TextColor','</WORDWRAP>','setFaceImage','splice','ParseEnemyNotetags','kgkkF','processDrawCenteredPicture','getMessageWindowRows','padding','VEPZy','leader','itemRect','PictureTextRefresh','clearPictures','KHBiF','processAutoSize','cancel','_lastGainedItemData','_eventId','EVAL','startWait','\x1bWrapJpBreak[0]','statusText','STR','ceil','prepareShowTextCommand','_autoColorActorNames','RdrBD','isContinuePrepareShowTextCommands','_moveEasingType','filter','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','refreshDimmerBitmap','SxsQz','realPictureId','erasePicture','calcMoveEasing','_nameBoxWindow','armor','drawBackPicture','min','process_VisuMZ_MessageCore_AutoColor','textWidth','NOjOo','registerCommand','getChoiceListMaxRows','shift','actor','Window_Base_initialize','MphYu','convertBackslashCharacters','isWeapon','unshift','windowPadding','move','convertTextAlignmentEscapeCharacters','maxLines','TextJS','trim','ParseAddedText','selectDefault','addContinuousShowTextCommands','\x1bITALIC[1]','indexOf','26rbyDYr','MessageWindowXyOffsets','convertNewPageTextStateMacros','processAutoPosition','clearChoiceHelpDescriptions','Window_Message_isTriggered','<CENTER>','drawTextEx','Game_Map_initialize','processFontChangeItalic','UJhvr','call','COLORLOCK','upperleft','_autoSizeRegexp','ARRAYEVAL','clearActorNameAutoColor','EquipTypeID','textSizeEx','processFontChangeBold','WRAPJPBREAK','_macroBypassWordWrap','gainItem','fontSize','Name','updateMessageCommonEvents','map\x20event','updatePictureText','Window_Message_processEscapeCharacter','_messageOffsetY','tIMDp','132237ZuAqTs','VisuMZ_1_EventsMoveCore','itemChoiceItypeId','Rows','getStartingChoiceWidth','applyMoveEasing','_targets','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','MessageRows','drawCustomBackgroundColor','return\x200','General','setupNumInput','test','CPVyu','EUpRI','isPressed','returnPreservedFontSettings','convertBaseEscapeCharacters','choiceRows','<%1>','MaxCols','lglkO','getChoiceListLineHeight','contentsBack','kSOkt','levelUp','gQsZW','vinCn','itemChoiceActor','numVisibleRows','makeData','48785zHJzUm','onDatabaseLoaded','_pictureTextWindow','rwfsg','SHOW','_pictureTextSprite','purple','iYKiM','_itemChoiceVariableId','ParseSkillNotetags','iconIndex','GUJyf','_moveTargetHeight','max','index','MessageWindowProperties','Window_Options_changeVolume','5379984ZgKidl','\x1bTEXTALIGNMENT[1]','Window_Help_refresh','makeFontSmaller','getTextAlignment','outlineColor','_textColorStack','outputHeight','#c69c6d','updateEvents','STXwd','choicePositionType','updateBitmap','mainFontSize','addWindow','isWordWrapEnabled','grey','setHelpWindow','updateMove','PIIAW','getConfigValue','_dimmerSprite','Window_Options_isVolumeSymbol','windowX','blt','textSizeExTextAlignment','processCustomWait','makeCommandList','maxShuffleChoices','mXcik','ENABLE','</RIGHT>','setLastGainedItemData','changeOutlineColor','\x1bi[%1]%2','changeChoiceBackgroundColor','aSOMp','VisuMZ_1_SkillsStatesCore','VxJom','hide','getInputButtonString','resetRect','skill','OaekL','updateAutoPosition','requestPictureTextRefreshAll','oZLyN','createTextState','lastGainedObjectQuantity','<LEFT>','autoPositionOffsetX','HelpWindow','_choiceIndexArray','red','_lastPluginCommandInterpreter','clearPictureTextRefresh','width','Window_Message_clearFlags','parse','boxWidth','_textMacroFound','HpJWH','processAllText','remove','textCodeCheck','toLowerCase','lineHeight','\x1bWrapBreak[0]','addedWidth','setChoiceListTextAlign','GiwHe','isArmor','callCancelHandler','_interpreter','addMessageCoreTextSpeedCommand','processEscapeCharacter','createContents','Window_ChoiceList_updatePlacement','CreateAutoColorRegExpListEntries','show','GpzkL','ConvertTextAutoColorRegExpFriendly','systemColor','commandName','SWITCH','dfZyG','process_VisuMZ_MessageCore_TextCodes_Replace','#ffffff','Game_Map_setupEvents','textSizeExRaw','PiImj','FGWeu','battle\x20party','update','updatePlacement','_refreshPauseSign','setMessageWindowWidth','HcAnQ','changeTextColor','updateChoiceListHelpWindowPlacement','axaou','Skills','choiceTextAlign','strokeRect','</B>','#acacac','nPUsV','Window_Base_update','currentExt','convertButtonAssistText','_helpWindow','OOass','list','\x1bTEXTALIGNMENT[0]','FontBiggerCap','processCharacter','ParseArmorNotetags','process_VisuMZ_MessageCore_TextMacros','CreateAutoColorFor','inBattle','white','EachMessageStart','makeFontBigger','gradientFillRect','Window_Base_textSizeEx','processDrawPicture','addLoadListener','35nSFYHq','FontSmallerCap','zwuyK','MsgWindowOffsetY','FUNC','_itemChoiceItypeId','includes','ShuffleArray','TextColor%1','exit','cCwvh','ozXKF','return\x20\x27','refresh','right','Window_Base_processNewLine','setWordWrap','_commonEventId','FastForwardKey','isChoiceWindow','TextCodeActions','inputtingAction','isBreakShowTextCommands','getChoiceListMaxColumns','setTextAlignment','prepareForcedPositionEscapeCharacters','GtAfH','setMessageWindowXyOffsets','LineBreakSpace','outlineWidth','RiYBA','Window_NameBox_refresh','messageRows','_autoPositionTarget','</CENTER>','Game_Screen_clearPictures','setRelativePosition','\x5c%1','messageCoreWindowX','addCommand','psQJz','_pictureTextBuffer','ZQIun','Window_ChoiceList_windowX','vpvgZ','ConvertParams','IicOt','<RIGHT>','setPictureText','updateAutoSizePosition','registerResetRect','ARRAYSTR','itemChoiceWtypeId','charAt','_list','canMove','adjustShowChoiceExtension','setHelpWindowWordWrap','setupShuffleChoices','mainFontFace','_pictureTextRefresh','States','itemPadding','_textAlignment','processPyTextCode'];_0x48ac=function(){return _0x3c9ad2;};return _0x48ac();}