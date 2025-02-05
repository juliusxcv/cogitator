function createCharacter() {
    let ballistics = parseInt(document.getElementById('ballistics').value);
    let closeCombat = parseInt(document.getElementById('closeCombat').value);
    let fortitude = parseInt(document.getElementById('fortitude').value);
    let swiftness = parseInt(document.getElementById('swiftness').value);
    let insight = parseInt(document.getElementById('insight').value);
    let presence = parseInt(document.getElementById('presence').value);
    let resolve = parseInt(document.getElementById('resolve').value);
    let faith = parseInt(document.getElementById('faith').value);
    let techLore = parseInt(document.getElementById('techLore').value);
    let witchSight = parseInt(document.getElementById('witchSight').value);
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