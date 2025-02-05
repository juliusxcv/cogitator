const MAX_POINTS_CATEGORY_1 = 4; // Define the maximum allowed points for category 1
const MAX_POINTS_CATEGORY_2 = 5; // Define the maximum allowed points for category 2

function updatePoints() {
    const ballistics = Array.from(document.querySelectorAll('input[name="ballistics"]:checked')).reduce((sum, el) => sum + parseInt(el.value), 0);
    const closeCombat = Array.from(document.querySelectorAll('input[name="closeCombat"]:checked')).reduce((sum, el) => sum + parseInt(el.value), 0);
    const fortitude = Array.from(document.querySelectorAll('input[name="fortitude"]:checked')).reduce((sum, el) => sum + parseInt(el.value), 0);
    const swiftness = Array.from(document.querySelectorAll('input[name="swiftness"]:checked')).reduce((sum, el) => sum + parseInt(el.value), 0);
    const insight = Array.from(document.querySelectorAll('input[name="insight"]:checked')).reduce((sum, el) => sum + parseInt(el.value), 0);
    const presence = Array.from(document.querySelectorAll('input[name="presence"]:checked')).reduce((sum, el) => sum + parseInt(el.value), 0);
    const resolve = Array.from(document.querySelectorAll('input[name="resolve"]:checked')).reduce((sum, el) => sum + parseInt(el.value), 0);
    const faith = Array.from(document.querySelectorAll('input[name="faith"]:checked')).reduce((sum, el) => sum + parseInt(el.value), 0);
    const techLore = Array.from(document.querySelectorAll('input[name="techLore"]:checked')).reduce((sum, el) => sum + parseInt(el.value), 0);
    const witchSight = Array.from(document.querySelectorAll('input[name="witchSight"]:checked')).reduce((sum, el) => sum + parseInt(el.value), 0);

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

    let ballistics = Array.from(document.querySelectorAll('input[name="ballistics"]:checked')).reduce((sum, el) => sum + parseInt(el.value), 0);
    let closeCombat = Array.from(document.querySelectorAll('input[name="closeCombat"]:checked')).reduce((sum, el) => sum + parseInt(el.value), 0);
    let fortitude = Array.from(document.querySelectorAll('input[name="fortitude"]:checked')).reduce((sum, el) => sum + parseInt(el.value), 0);
    let swiftness = Array.from(document.querySelectorAll('input[name="swiftness"]:checked')).reduce((sum, el) => sum + parseInt(el.value), 0);
    let insight = Array.from(document.querySelectorAll('input[name="insight"]:checked')).reduce((sum, el) => sum + parseInt(el.value), 0);
    let presence = Array.from(document.querySelectorAll('input[name="presence"]:checked')).reduce((sum, el) => sum + parseInt(el.value), 0);
    let resolve = Array.from(document.querySelectorAll('input[name="resolve"]:checked')).reduce((sum, el) => sum + parseInt(el.value), 0);
    let faith = Array.from(document.querySelectorAll('input[name="faith"]:checked')).reduce((sum, el) => sum + parseInt(el.value), 0);
    let techLore = Array.from(document.querySelectorAll('input[name="techLore"]:checked')).reduce((sum, el) => sum + parseInt(el.value), 0);
    let witchSight = Array.from(document.querySelectorAll('input[name="witchSight"]:checked')).reduce((sum, el) => sum + parseInt(el.value), 0);
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
document.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', updatePoints);
});