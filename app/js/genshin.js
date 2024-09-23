class GenshinApi {
    #url = "https://gsi.fly.dev/";
    body = document.body;
    constructor() {
    }

    getBaseUrl() {
        return this.#url;
    }

    async getAllCharacters() {
        try {
            let response = await fetch(`https://genshin.jmp.blue/characters/all?lang=en`);
            let data = await response.json();
            console.log(data);
            // add a sort for obj.name
            data.sort((a, b) => a.name.localeCompare(b.name));
            return this.showAllCharacters(data);
        } catch(error) {
            document.getElementById('allCharacters').textContent = 'Error fetching character data';
            console.error(error);
        }
    }

    async loadCharacterImage(name) {
        try {
            //let lower = await name.toLowerCase();
            // Maybe take /icon instead of card and use card for their individual page?
            let response = await fetch(`https://genshin.jmp.blue/characters/${name}/icon-big`);

            if (!response.ok) {
                return null;
            }

            let imageBlob = await response.blob();
            let objectUrl = URL.createObjectURL(imageBlob);
            return objectUrl;
        } catch(error) {
            console.error(error);
            return null;
        }
    }

    async showAllCharacters(results) {
        const allCharacters = document.getElementById("allCharacters");
        // TODO: add this to name header once I add html <h1><a href=“../public/character.hmtl”></a></h1>

        const charMap = await Promise.all(results.map(async (char) => {
            let image = await this.loadCharacterImage(char.id);
            if (image != null) {
            return `
                <div>
                    <h1> ${char.name}  </h1>
                    <img src="${image}" alt="${char.name} icon"/>
                    <h3> ${char.nation} </h3>
                    <h3> ${char.rarity} </h3>
                    <h3> ${char.vision} </h3>
                    <h3> ${char.weapon} </h3>
                </div>
                <br>
                `;
            }
            return '';
        }));
        allCharacters.innerHTML = charMap.filter(Boolean).join('');
        return allCharacters;

    }

    async getCharacter(character) {

    }

    async getCharacterByWeapon(weapon) {

    }

    async getCharacterByVision(vision) {

    }

    async getCharacterByRegion(region) {

    }

    /*
        Future: sort characters in front page by nation, weapon, vision, etc (dropdown)
    */
}

const genshinApi = new GenshinApi();
genshinApi.getAllCharacters();
