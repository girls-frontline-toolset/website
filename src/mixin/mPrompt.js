var MPrompt = {
    props: ['promptData'],
    data() {
        return {
            prompt: ""
        }
    },
    mounted: function () {
        let randomNumber = Math.floor((Math.random() * this.promptData.length) + 1);
        this.prompt = this.promptData[randomNumber - 1];
    }
}

export default MPrompt;