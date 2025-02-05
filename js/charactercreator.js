const MAX_POINTS_CATEGORY_1 = 4; // Define the maximum allowed points for category 1
const MAX_POINTS_CATEGORY_2 = 5; // Define the maximum allowed points for category 2

function updatePoints() {
    const ballistics = parseInt(document.querySelector('input[name="ballistics"]:checked').value) || 0;
    const closeCombat = parseInt(document.querySelector('input[name="closeCombat"]:checked').value) || 0;
    const fortitude = parseInt(document.querySelector('input[name="fortitude"]:checked').value) || 0;
    const swiftness = parseInt(document.querySelector('input[name="swiftness"]:checked').value) || 0;
    const insight = parseInt(document.querySelector('input[name="insight"]:checked').value) || 0;
    const presence = parseInt(document.querySelector('input[name="presence"]:checked').value) || 0;
    const resolve = parseInt(document.querySelector('input[name="resolve"]:checked').value) || 0;
    const faith = parseInt(document.querySelector('input[name="faith"]:checked').value) || 0;
    const techLore = parseInt(document.querySelector('input[name="techLore"]:checked').value) || 0;
    const witchSight = parseInt(document.querySelector('input[name="witchSight"]:checked').value) || 0;

    const totalPointsCategory1 = ballistics + closeCombat + fortitude + swiftness;
    const totalPointsCategory2 = insight + presence + resolve + faith + techLore + witchSight;

    document.getElementById('remainingPointsCategory1').textContent = MAX_POINTS_CATEGORY_1 - totalPointsCategory1;
    document.getElementById('remainingPointsCategory2').textContent = MAX_POINTS_CATEGORY_2 - totalPointsCategory2;

    if (totalPointsCategory1 > MAX_POINTS_CATEGORY_1) {
        alert(`You have exceeded the maximum allowed points of ${MAX_POINTS_CATEGORY_1} for the first category. Please adjust your selections.`);
        return false;
    }

    if (totalPointsCategory2 > MAX_POINTS_CATEGORY_2) {
        alert(`You have exceeded the maximum allowed points of ${MAX_POINTS_CATEGORY_2} for the second category. Please adjust your selections.`);
        return false;
    }

    return true;
}

function createCharacter() {
    if (!updatePoints()) {
        return; // Exit the function if validation fails
    }

    let ballistics = parseInt(document.querySelector('input[name="ballistics"]:checked').value);
    let closeCombat = parseInt(document.querySelector('input[name="closeCombat"]:checked').value);
    let fortitude = parseInt(document.querySelector('input[name="fortitude"]:checked').value);
    let swiftness = parseInt(document.querySelector('input[name="swiftness"]:checked').value);
    let insight = parseInt(document.querySelector('input[name="insight"]:checked').value);
    let presence = parseInt(document.querySelector('input[name="presence"]:checked').value);
    let resolve = parseInt(document.querySelector('input[name="resolve"]:checked').value);
    let faith = parseInt(document.querySelector('input[name="faith"]:checked').value);
    let techLore = parseInt(document.querySelector('input[name="techLore"]:checked').value);
    let witchSight = parseInt(document.querySelector('input[name="witchSight"]:checked').value);
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

// Add event listeners to update points in real-time
document.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener('change', updatePoints);
});