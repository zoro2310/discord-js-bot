var XMLHttpRequest = require('xhr2');
const { MessageEmbed } = require('discord.js');
var request = new XMLHttpRequest();
//const generategenre = require('./generategenre.js');

function nonnullcheck(value) {
    if (value == null) {
        return "N/A";
    }
    value = "" + value;
    return value;
}


module.exports = {
    name: "getanime",
    async execute(interaction, name) {
        url = `https://kitsu.io/api/edge/anime?filter[text]=${name}`;

        request.open('GET', url);

        request.onreadystatechange = async function () {
            if (this.readyState === 4) {
                var response = this.responseText;
                var body = JSON.parse(response);
                var data = body.data;
                var anime = data[0];
                var attributes = anime.attributes;
                var id = anime.id;

                var title = attributes.canonicalTitle;
                var synopsis = attributes.synopsis;
                var image = attributes.posterImage.original;
                var status = attributes.status;
                var episodes = nonnullcheck(attributes.episodeCount);
                var startDate = nonnullcheck(attributes.startDate);
                var endDate = nonnullcheck(attributes.endDate);
                var episodeLength = nonnullcheck(attributes.episodeLength);
                var avgRating = nonnullcheck(attributes.averageRating);
                var popularity = nonnullcheck(attributes.popularityRank);

                var anime_data = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(title)
                    .setDescription(synopsis)
                    .setThumbnail(image)
                    .addField("Status", status, true)
                    .addField("Episodes", episodes, true)
                    .addField("Episode Length", episodeLength, true)
                    .addField("Start Date", startDate, true)
                    .addField("End Date", endDate, true)
                    .addField("Average Rating", avgRating, true)
                    .addField("Popularity", popularity, true);
                
                await interaction.reply({ embeds: [anime_data] });
            }
        };
    }
}