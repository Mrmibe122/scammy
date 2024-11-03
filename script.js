let hiInterval;
const conversionRates = {
    BTC: 34000, // Updated conversion rates for BTC
    ETH: 2000,  // Updated conversion rates for ETH
    LTC: 90,    // Updated conversion rates for LTC
    ADA: 0.5,   // Updated conversion rates for ADA
    XRP: 0.4,   // Updated conversion rates for XRP
};

const positiveBalanceWallets = []; // Array to store wallets with positive balances
const maxWallets = 9; // Maximum number of wallets to display in the top box
let walletHistory = []; // Array to keep track of all wallets

function startGame() {
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    document.getElementById('moneyFoundScreen').style.display = 'block';
}

function startHi() {
    if (hiInterval) clearInterval(hiInterval);
    hiInterval = setInterval(() => {
        displayWordsAndBalances();
    }, 200);
}

function stopHi() {
    clearInterval(hiInterval); // Stop the interval
}

function getRandomWords(wordList) {
    const shuffledWords = wordList.sort(() => Math.random() - 0.5);
    return shuffledWords.slice(0, 12).join(", "); // Join the 12 words into a single string
}

function displayWordsAndBalances() {
    const randomWords = getRandomWords(wordList);
    const balance = getRandomBalance();

    // Update the output box with the current balance and words
    updateOutputBox(randomWords, balance);

    // Update the positive balance wallets
    updatePositiveBalances(randomWords, balance);
}

function getRandomBalance() {
    // Random balance generation with a low chance
    return Math.random() < 0.05 ? (Math.random() * 100).toFixed(2) : 0; // 5% chance for balance > 0
}

function updateOutputBox(words, balance) {
    const outputBox = document.getElementById('outputBox');

    // Clear the output box for the new entry
    const newWallet = `Wallet: Balance: $${balance} | ${words}`;
    walletHistory.push(newWallet);

    // Keep only the last 9 wallets in history
    if (walletHistory.length > maxWallets) {
        walletHistory.shift(); // Remove the oldest wallet if we exceed maxWallets
    }

    // Update the output box with current wallet history
    outputBox.innerHTML = walletHistory.join('<br>');
}

function updatePositiveBalances(words, balance) {
    const moneyBox = document.getElementById('moneyFoundScreen');

    // Check if balance is greater than 0 to add to positive balances
    if (balance > 0) {
        const cryptoType = getRandomCryptoType(); // Get random crypto type
        const cryptoValue = (balance / conversionRates[cryptoType]).toFixed(4); // Convert balance to crypto

        // Add to positive balances array if balance is greater than 0
        positiveBalanceWallets.push({ words, balance });

        // Update the money box with current positive balances
        moneyBox.innerHTML = positiveBalanceWallets.map(({ words, balance }) =>
            `Balance: $${balance} | ${words} | ${(balance / conversionRates[getRandomCryptoType()]).toFixed(4)} ${cryptoType}`
        ).join('<br>');
    } else {
        // If balance is 0, do not update the money box
        moneyBox.innerHTML = positiveBalanceWallets.map(({ words, balance }) =>
            `Balance: $${balance} | ${words} ${(balance / conversionRates[getRandomCryptoType()]).toFixed(4)} ${cryptoType}`
        ).join('<br>');
    }
}

function getRandomCryptoType() {
    const cryptoTypes = Object.keys(conversionRates);
    const randomIndex = Math.floor(Math.random() * cryptoTypes.length);
    return cryptoTypes[randomIndex];
}

const wordList = [
    "apple", "banana", "cherry", "date", "fig", "grape",
    "kiwi", "lemon", "mango", "nectarine", "orange", "papaya",
    "quince", "raspberry", "strawberry", "tangerine", "ugli",
    "vanilla", "watermelon", "xigua", "yellowfruit", "zucchini"
];
