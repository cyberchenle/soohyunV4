const { CommandInteraction, GuildMember, Role, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const emojis = require('../1-tools/emojis');
const colors = require('../1-tools/colors.json');

/**
 * 
 * @param {CommandInteraction} interaction 
 * @param {GuildMember} member 
 * @param {Boolean} global 
 * @returns {EmbedBuilder}
 */
exports.avatar = function (interaction, member, global = false) {
    if(!interaction || !member) {
        throw new TypeError(`An interaction and member objects were not provided, received: interaction - ${typeof(interaction)}, member: ${typeof(member)}`);
    }
    const star = emojis.get('star', interaction.client);
    const avatar = global ? member.user.displayAvatarURL({ forceStatic: false, size: 512, extension: 'png'}) : member.displayAvatarURL({ forceStatic: false, size: 512, extension: 'png'});
    let title = global ? `${star} ${member.displayName}'s global avatar` : `${star} ${member.displayName}'s avatar`;
    return new EmbedBuilder()
        .setTitle(title)
        .setColor(colors.embed)
        .setImage(avatar)
        .setFooter({ text: member.guild.name, iconURL: member.guild.iconURL({ dynamic: true })});
}