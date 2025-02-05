function createCharacter() {
    const ballistics = parseInt(document.getElementById('ballistics').value);
    const closeCombat = parseInt(document.getElementById('closeCombat').value);
    const fortitude = parseInt(document.getElementById('fortitude').value);
    const swiftness = parseInt(document.getElementById('swiftness').value);
    const insight = parseInt(document.getElementById('insight').value);
    const presence = parseInt(document.getElementById('presence').value);
    const resolve = parseInt(document.getElementById('resolve').value);
    const faith = parseInt(document.getElementById('faith').value);
    const techLore = parseInt(document.getElementById('techLore').value);
    const witchSight = parseInt(document.getElementById('witchSight').value);
    const classType = document.getElementById('class').value;

    // Add class bonuses here
    // Example for Veteran class
    if (classType === 'veteran') {
        ballistics += 1;
        closeCombat += 1;
        presence += 2;
        resolve += 1;
        witchSight -= 1;
    }

    // Add other class bonuses...

    const characterDetails = `Class: ${classType}<br>
    Ballistics Proficiency: ${ballistics}<br>
    Close Combat Proficiency: ${closeCombat}<br>
    Fortitude: ${fortitude}<br>
    Swiftness: ${swiftness}<br>
    Insight: ${insight}<br>
    Presence: ${presence}<br>
    Resolve: ${resolve}<br>
    Faith: ${faith}<br>
    Tech Lore: ${techLore}<br>
    Witch Sight: ${witchSight}`;

    document.getElementById('characterDetails').innerHTML = characterDetails;
}
