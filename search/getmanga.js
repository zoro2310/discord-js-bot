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
    name: "getmanga",
    async execute(interaction, name) {
        url = `https://kitsu.io/api/edge/manga?filter[text]=${name}`;

        request.open('GET', url);

        request.onreadystatechange = async function () {
            if (this.readyState === 4) {
                var response = this.responseText;
                var body = JSON.parse(response);
                var data = body.data;
                var manga = data[0];
                var attributes = manga.attributes;
                var id = manga.id;

                var title = attributes.canonicalTitle;
                var synopsis = attributes.synopsis;
                var image = attributes.posterImage.original;
                var status = attributes.status;
                var chapters = nonnullcheck(attributes.chapterCount);
                var startDate = nonnullcheck(attributes.startDate);
                var endDate = nonnullcheck(attributes.endDate);
                var volume = nonnullcheck(attributes.volumeCount);
                var avgRating = nonnullcheck(attributes.averageRating);
                var popularity = nonnullcheck(attributes.popularityRank);

                const anime_data = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(title)
                    .setDescription(synopsis)
                    .setThumbnail(image)
                    .addField("Status", status, true)
                    .addField("Chapters", chapters, true)
                    .addField("Volume", volume, true)
                    .addField("Start Date", startDate, true)
                    .addField("End Date", endDate, true)
                    .addField("Average Rating", avgRating, true)
                    .addField("Popularity", popularity, true);
                await interaction.reply({ embeds: [anime_data] });
            }
        };

        request.send();
    }
}