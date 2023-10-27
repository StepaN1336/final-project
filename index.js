const swordsContainer = document.querySelector('.main_swords');
const sharpnessField = document.querySelector('.main_sharpness-field');
const buffButtonsContainer = document.querySelector('.main_buttons');
const buffButtons = document.querySelectorAll('.main_button');
const allTheButtons = document.querySelectorAll('button');
const swordImages = document.querySelectorAll('.swords_weapon');
let swordToClick = document.querySelector('.show');
const bossesSwords = document.querySelectorAll('.bosses_weapon');
const sharpeningSound = document.querySelectorAll('.main_sharpening-sound');
const swordLvlUpSound = document.querySelector('.main_sword-lvl-up-sound');
const swordLvlDownSound = document.querySelector('.main_sword-lvl-down-sound');
const buffImages = document.querySelectorAll('.buff');
const upgradeIncreaseValue = 10;
const effectivnessIncreaseValue = 1.2;
let sharpnessCount = 0;
let sharpnessEffectiveClick = 1;
let perSecondEffectivness = 0;
let sharpnessUpgradeValue = 100;
let prevSharpnessUpgradeValue = 10;
let imageCount = 0;

const buffPrices = {
    sharpeningStone: 10,
    blacksmith: 50,
    anvil: 100,
    house: 500
};
const buffEffectiveness = {
    sharpeningStone: 1,
    blacksmith: 3,
    anvil: 5,
    house: 10
};
const buffNames = ['sharpeningStone', 'blacksmith', 'anvil', 'house'];

if (sharpnessCount === 0) sharpnessUpdate();

allTheButtons.forEach((element, indexOfButton) => {
    if (element.textContent.trim() === '') {
        const buffType = element.getAttribute('data-buff-type');
        const buffName = buffNames[indexOfButton];
        if (buffType === 'per-click') {
            updatePriceForClickBuff(buffName, indexOfButton);
        } else if (buffType === 'per-second') {
            updatePriceForPerSecondBuff(buffName, indexOfButton);
        }
    }
});


swordsContainer.addEventListener('mousedown', (event) => {
    if (event.target === swordToClick) {
        swordToClick.style.transform = 'scale(0.9)';
        setTimeout(() => {
            swordToClick.style.transform = 'scale(1)';
        }, 100);
        sharpnessCount += sharpnessEffectiveClick;
        sharpnessUpdate();
    }
    if (sharpnessCount >= sharpnessUpgradeValue) {
        updateSwordImage('increase');
    }
    const randomValue = Math.floor(Math.random() * 2);
    sharpeningSound[randomValue].play();
});

buffButtonsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains("main_button")) {
        const clickedButton = event.target;
        if (clickedButton.classList.contains("buttons_sharpening-stone")) {
            const index = 0;
            sharpnessEffectiveClickUpdate('sharpeningStone', index);
            updatePriceForClickBuff('sharpeningStone', index);
        } else if (clickedButton.classList.contains("buttons_blacksmith")) {
            const index = 1;
            perSecondEffectivnessUpdate('blacksmith', index);
            updatePriceForPerSecondBuff('blacksmith', index);
            
        } else if (clickedButton.classList.contains("buttons_anvil")) {
            const index = 2;
            sharpnessEffectiveClickUpdate('anvil', index);
            updatePriceForClickBuff('anvil', index);
        } else if (clickedButton.classList.contains("buttons_house")) {
            const index = 3;
            perSecondEffectivnessUpdate('house', index);
            updatePriceForPerSecondBuff('house', index);
        }
    }
});

function sharpnessUpdate() {
    sharpnessField.innerHTML = `Your sharpness is ${sharpnessCount}`
}

function updatePriceForClickBuff(buff, indexOfButton) {
    allTheButtons[indexOfButton].innerHTML = `+${buffEffectiveness[buff]} per click for ${buffPrices[buff]} sharpness`;
}

function updatePriceForPerSecondBuff(buff, indexOfButton) {
    allTheButtons[indexOfButton].innerHTML = `+${buffEffectiveness[buff]} in a second for ${buffPrices[buff]} sharpness`;
}

function buffImageAnimation(index) {
    buffImages[index].style.transform = 'scale(0.9)';
    setTimeout(() => {
        buffImages[index].style.transform = 'scale(1)';
    }, 200);
}

function sharpnessEffectiveClickUpdate(buff, indexOfButton) {
    for (const key in buffPrices) {
        if (key === buff) {
            if (sharpnessCount - buffPrices[key] >= 0) {
                buffImageAnimation(indexOfButton);
                sharpnessCount -= buffPrices[key];
                sharpnessEffectiveClick += buffEffectiveness[key];
                buffPrices[key] *= effectivnessIncreaseValue;
                buffPrices[key] = Math.floor(buffPrices[key]);
                sharpnessUpdate();
                if (sharpnessCount < prevSharpnessUpgradeValue - 1) {
                    updateSwordImage('decrease');
                }
            }
        }
    }
}

function perSecondEffectivnessUpdate(buff, indexOfButton) {
    for (const key in buffPrices) {
        if (key === buff) {
            if (sharpnessCount - buffPrices[key] >= 0) {
                buffImageAnimation(indexOfButton);
                sharpnessCount -= buffPrices[key];
                perSecondEffectivness += buffEffectiveness[key];
                buffPrices[key] *= effectivnessIncreaseValue;
                buffPrices[key] = Math.floor(buffPrices[key]);
                sharpnessUpdate();
                if (sharpnessCount < prevSharpnessUpgradeValue - 1) {
                    updateSwordImage('decrease');
                }
            }
        }
    }
}

function updateSwordImage(upgradeDircetion) {
    if (upgradeDircetion === 'increase') {
        if (imageCount < swordImages.length - 1) {
            swordImages[imageCount].classList.remove('show');
            bossesSwords[imageCount].classList.remove('show-sword');
            imageCount++;
            swordImages[imageCount].classList.add('show');
            bossesSwords[imageCount].classList.add('show-sword');
            swordToClick = document.querySelector('.show');
            fighitingSword = document.querySelector('.show-sword');
            swordDamage = fighitingSword.getAttribute('data-dmg');
            prevSharpnessUpgradeValue *= upgradeIncreaseValue;
            sharpnessUpgradeValue *= upgradeIncreaseValue;
            swordLvlUpSound.play();
        }
    } else if (upgradeDircetion === 'decrease') {
        if (imageCount > 0) {
            swordImages[imageCount].classList.remove('show');
            bossesSwords[imageCount].classList.remove('show-sword');
            imageCount--;
            swordImages[imageCount].classList.add('show');
            bossesSwords[imageCount].classList.add('show-sword');
            swordToClick = document.querySelector('.show');
            fighitingSword = document.querySelector('.show-sword');
            swordDamage = fighitingSword.getAttribute('data-dmg');
            prevSharpnessUpgradeValue /= upgradeIncreaseValue;
            sharpnessUpgradeValue /= upgradeIncreaseValue;
            swordLvlDownSound.play();
        }
    }
}

let updateSharpnessPerSecond = setInterval(() => {
    sharpnessCount += perSecondEffectivness;
    sharpnessUpdate();
}, 1000);

//Код для переходу битв з босами
let countOfWonBosses = 0;
const bosses = document.querySelectorAll('.bosses_boss');
let fighitingSword = document.querySelector('.show-sword');
const buttonGoBossesGame = document.querySelector('.main_goto-bosses-page');
const swordHpField = document.querySelector('.bosses_sword-hp');
const bossHpField = document.querySelector('.bosses_boss-hp')
let currentBoss = bosses[countOfWonBosses];
let bossHealthPoint = currentBoss.getAttribute('data-hp');
let swordDamage = fighitingSword.getAttribute('data-dmg');
const goBackButton = document.querySelector('.bosses_button-back');
let bossPunch;
const bossesContainer = document.querySelector('.bosses-container');
const bossHitSounds = document.querySelectorAll('.bosses_boss-hit-sound');
const bossDefeatedSound = document.querySelector('.bosses_boss-beated-sound');

buttonGoBossesGame.addEventListener('click', () => {
    clearInterval(updateSharpnessPerSecond);
    const bossDamage = currentBoss.getAttribute('dmg');
    const clickerGameContainer = document.querySelector('.main_clicker');
    const bossesGameContainer = document.querySelector('.main_bosses');

    clickerGameContainer.classList.add('hidden-div');
    bossesGameContainer.classList.remove('hidden-div');

    updateSharpnessHp();
    updateBossHp();

    bossPunch = setInterval(() => {
        if (!(sharpnessCount - bossDamage < 0)) {
            sharpnessCount -= bossDamage;
            updateSharpnessHp();
            if (sharpnessCount < prevSharpnessUpgradeValue - 1) {
                updateSwordImage('decrease');
            }
        } else {
            sharpnessCount = 0;
            if (sharpnessCount < prevSharpnessUpgradeValue - 1) {
                updateSwordImage('decrease');
            }
            updateSharpnessHp();
            alert('You\'ve lost :(');
            clearInterval(bossPunch);
            goBackToClickGame();
        }
    }, 1000);
});


bossesContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('bosses_boss')) {
        bossHealthPoint -= swordDamage;
        updateBossHp();
        const randomValue = Math.floor(Math.random() * 3);
        bossHitSounds[randomValue].play();

        event.target.classList.add('boss-damaged');

        setTimeout(() => {
            event.target.classList.remove('boss-damaged');
        }, 100);

        if (bossHealthPoint <= 0) {
            clearInterval(bossPunch);
            if (countOfWonBosses === bosses.length - 1) {
                alert('You\'ve deafeated all the bosses')
                goBackToClickGame();
            } else if (countOfWonBosses <= bosses.length - 1) {
                currentBoss.classList.remove('show-boss');
                countOfWonBosses++;
                currentBoss = bosses[countOfWonBosses];
                currentBoss.classList.add('show-boss');
                bossDefeatedSound.play();
                goBackToClickGame();
            }
        }
    }
});


function goBackToClickGame() {
    clearInterval(bossPunch);
    const clickerGameContainer = document.querySelector('.main_clicker');
    const bossesGameContainer = document.querySelector('.main_bosses');

    clickerGameContainer.classList.remove('hidden-div');
    bossesGameContainer.classList.add('hidden-div');

    updateSharpnessPerSecond = setInterval(() => {
        sharpnessCount += perSecondEffectivness;
        sharpnessUpdate();
    }, 1000);
    bossHealthPoint = currentBoss.getAttribute('data-hp');
    sharpnessUpdate();
}

goBackButton.addEventListener('click', () => {
    goBackToClickGame();
});

function updateSharpnessHp() {
    swordHpField.innerHTML = `Your sharpness is ${sharpnessCount}`;
}

function updateBossHp() {
    bossHpField.innerHTML = `Remaining boss hp: ${bossHealthPoint}`;
}
