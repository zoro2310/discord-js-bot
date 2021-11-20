module.exports = {
    name: "messageCreate",
    once: false,
    async execute(message) {
        console.log(`${message.content}`);
    }
}