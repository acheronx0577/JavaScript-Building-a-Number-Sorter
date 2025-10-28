// DOM Elements
const numberInputs = [
    document.getElementById('num1'),
    document.getElementById('num2'),
    document.getElementById('num3'),
    document.getElementById('num4'),
    document.getElementById('num5')
];

const outputNumbers = [
    document.getElementById('output1'),
    document.getElementById('output2'),
    document.getElementById('output3'),
    document.getElementById('output4'),
    document.getElementById('output5')
];

const sortBtn = document.getElementById('sort-btn');
const randomBtn = document.getElementById('random-btn');
const clearBtn = document.getElementById('clear-btn');
const algorithmBtns = document.querySelectorAll('.algorithm-btn');
const algorithmName = document.getElementById('algorithm-name');
const timeTaken = document.getElementById('time-taken');
const comparisons = document.getElementById('comparisons');

// Global variables
let currentAlgorithm = 'bubble';
let comparisonCount = 0;

// Event Listeners
sortBtn.addEventListener('click', sortNumbers);
randomBtn.addEventListener('click', generateRandomNumbers);
clearBtn.addEventListener('click', clearInputs);

algorithmBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        algorithmBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentAlgorithm = btn.dataset.algorithm;
        algorithmName.textContent = formatAlgorithmName(currentAlgorithm);
    });
});

// Initialize
algorithmName.textContent = formatAlgorithmName(currentAlgorithm);

// Sorting Functions
function bubbleSort(arr) {
    comparisonCount = 0;
    const sortedArr = [...arr];
    const n = sortedArr.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            comparisonCount++;
            if (sortedArr[j] > sortedArr[j + 1]) {
                [sortedArr[j], sortedArr[j + 1]] = [sortedArr[j + 1], sortedArr[j]];
            }
        }
    }
    
    return sortedArr;
}

function selectionSort(arr) {
    comparisonCount = 0;
    const sortedArr = [...arr];
    const n = sortedArr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            comparisonCount++;
            if (sortedArr[j] < sortedArr[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            [sortedArr[i], sortedArr[minIndex]] = [sortedArr[minIndex], sortedArr[i]];
        }
    }
    
    return sortedArr;
}

function insertionSort(arr) {
    comparisonCount = 0;
    const sortedArr = [...arr];
    const n = sortedArr.length;
    
    for (let i = 1; i < n; i++) {
        const key = sortedArr[i];
        let j = i - 1;
        
        while (j >= 0) {
            comparisonCount++;
            if (sortedArr[j] > key) {
                sortedArr[j + 1] = sortedArr[j];
                j--;
            } else {
                break;
            }
        }
        
        sortedArr[j + 1] = key;
    }
    
    return sortedArr;
}

function quickSort(arr) {
    comparisonCount = 0;
    const sortedArr = [...arr];
    
    function quickSortHelper(arr, low, high) {
        if (low < high) {
            const pi = partition(arr, low, high);
            quickSortHelper(arr, low, pi - 1);
            quickSortHelper(arr, pi + 1, high);
        }
    }
    
    function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;
        
        for (let j = low; j < high; j++) {
            comparisonCount++;
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
        
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        return i + 1;
    }
    
    quickSortHelper(sortedArr, 0, sortedArr.length - 1);
    return sortedArr;
}

// Main sorting function
function sortNumbers() {
    const numbers = getInputNumbers();
    
    if (!validateInputs(numbers)) {
        alert('Please enter valid numbers between 0 and 100');
        return;
    }
    
    const sortOrder = document.querySelector('input[name="sort-order"]:checked').value;
    const startTime = performance.now();
    
    let sortedNumbers;
    switch (currentAlgorithm) {
        case 'bubble':
            sortedNumbers = bubbleSort(numbers);
            break;
        case 'selection':
            sortedNumbers = selectionSort(numbers);
            break;
        case 'insertion':
            sortedNumbers = insertionSort(numbers);
            break;
        case 'quick':
            sortedNumbers = quickSort(numbers);
            break;
        default:
            sortedNumbers = bubbleSort(numbers);
    }
    
    if (sortOrder === 'descending') {
        sortedNumbers.reverse();
    }
    
    const endTime = performance.now();
    const executionTime = (endTime - startTime).toFixed(2);
    
    displayResults(sortedNumbers);
    updateStats(executionTime, comparisonCount);
    
    // Add animation to output numbers
    animateResults();
}

// Helper Functions
function getInputNumbers() {
    return numberInputs.map(input => parseInt(input.value) || 0);
}

function validateInputs(numbers) {
    return numbers.every(num => !isNaN(num) && num >= 0 && num <= 100);
}

function displayResults(numbers) {
    outputNumbers.forEach((output, index) => {
        output.textContent = numbers[index];
    });
}

function updateStats(time, comparisonsMade) {
    timeTaken.textContent = time;
    comparisons.textContent = comparisonsMade;
}

function generateRandomNumbers() {
    numberInputs.forEach(input => {
        input.value = Math.floor(Math.random() * 101); // 0-100
    });
}

function clearInputs() {
    numberInputs.forEach(input => {
        input.value = '';
    });
    
    outputNumbers.forEach(output => {
        output.textContent = '-';
    });
    
    updateStats(0, 0);
}

function formatAlgorithmName(algorithm) {
    const names = {
        'bubble': 'Bubble Sort',
        'selection': 'Selection Sort',
        'insertion': 'Insertion Sort',
        'quick': 'Quick Sort'
    };
    return names[algorithm] || 'Bubble Sort';
}

function animateResults() {
    outputNumbers.forEach((output, index) => {
        output.style.transform = 'scale(1.2)';
        output.style.background = 'var(--secondary)';
        
        setTimeout(() => {
            output.style.transform = 'scale(1)';
            output.style.background = 'var(--primary)';
        }, 300 + (index * 100));
    });
}

// Initialize with random numbers
generateRandomNumbers();