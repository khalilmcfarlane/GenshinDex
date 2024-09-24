class GenshinApi {
    #url = "https://gsi.fly.dev/";
    constructor() {
    }

    getBaseUrl() {
        return this.#url;
    }

    async testAllChar() {
        // This is how function should be, need to also add image though.
        try {
            const response = await fetch(`https://genshin.jmp.blue/characters/all?lang=en`);
            const data = await response.json();
            // add a sort for obj.name
            data.sort((a, b) => a.name.localeCompare(b.name));
            return data;
        } catch(error) {
            document.getElementById('allCharacters').textContent = 'Error fetching character data';
            console.error(error);
        }
    }

    async getAllCharacters() {
        try {
            const response = await fetch(`https://genshin.jmp.blue/characters/all?lang=en`);
            const data = await response.json();
            // add a sort for obj.name
            data.sort((a, b) => a.name.localeCompare(b.name));
            return this.showAllCharacters(data);
        } catch(error) {
            document.getElementById('allCharacters').textContent = 'Error fetching character data';
            console.error(error);
        }
    }

    async loadCharacterIcon(id) {
        try {
            let response = await fetch(`https://genshin.jmp.blue/characters/${id}/icon-big`);

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
        // TODO: add event lister onmouseover shake div

        const charMap = await Promise.all(results.map(async (char) => {
            let image = await this.loadCharacterIcon(char.id);
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

    async getCharacterbyName(name) {
        try {
            const response = await fetch(`https://genshin.jmp.blue/characters/${name}?lang=en`);
            const data = response.json();
            return this.showCharacter(data); 

        } catch (error) {
            console.error(`Error when retrieving ${name}'s data.`, error);
        }
    }

    async loadCharacterCard(id) {
        try {
            let response = await fetch(`https://genshin.jmp.blue/characters/${id}/card`);
            if (!response.ok) {
                return null;
            }

            let imageBlob = await response.blob();
            let objectUrl = URL.createObjectURL(imageBlob);
            return objectUrl;
            
        } catch (error) {
            console.error("Failed to load card.", error);
            return null;
        }
    }

    async showCharacter(characterJson) {
        const character = document.getElementById("character");
        const image = await this.loadCharacterCard(characterJson.id);
        let result = '';
        if (image != null) {
            result = 
             `
                <div>
                    <h1> ${characterJson.name}  </h1>
                    <img src="${image}" alt="${characterJson.name} icon"/>
                    <h3> ${characterJson.nation} </h3>
                    <h3> ${characterJson.rarity} </h3>
                    <h3> ${characterJson.vision} </h3>
                    <h3> ${characterJson.weapon} </h3>
                </div>
                <br>
            `;
        }
        character.innerHTML = result;
        return character;

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
//document.addEventListener("DOMContentLoaded", genshinApi.getAllCharacters());
if (typeof module === 'object') {
    module.exports = {
        testAllChar: genshinApi.testAllChar.bind(genshinApi),
        getCharacterbyName: genshinApi.getCharacterbyName.bind(genshinApi)
    }
}
/*
module.exports = {
    testAllChar: genshinApi.testAllChar.bind(genshinApi),
    getCharacterbyName: genshinApi.getCharacterbyName.bind(genshinApi)
};
*/