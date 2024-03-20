// Select the code placeholder and scrolling text container
const codePlaceholder = document.getElementById('code-placeholder');
const scrollingText = document.querySelector('.scrolling-text');

// Code lines with syntax highlighting
const codeLines = [
    '<span class="variable">const</span> greetings = "<span class="string">Hello, I am Geoff Metzger</span>";',
    '<span class="variable">const</span> profession = "<span class="string">I am a full stack web developer</span>";',
    '',
    '<span class="keyword">function</span> introduceMyself() {',
    '    <span class="keyword">console</span>.log(greetings);',
    '    <span class="keyword">console</span>.log(profession);',
    '}',
    '',
    'introduceMyself();'
];

let currentLine = 0;
let currentCharacter = 0;

// Function to write code lines letter by letter
function writeCode() {
    if (currentLine < codeLines.length) {
        const codeLine = codeLines[currentLine];
        if (currentCharacter < codeLine.length) {
            const char = codeLine.charAt(currentCharacter);
            if (char === '<') {
                const closingTagIndex = codeLine.indexOf('>', currentCharacter);
                codePlaceholder.innerHTML += codeLine.substring(currentCharacter, closingTagIndex + 1);
                currentCharacter = closingTagIndex + 1;
            } else {
                codePlaceholder.innerHTML += char;
                currentCharacter++;
            }
            setTimeout(writeCode, 50); // Adjust the delay as needed
        } else {
            currentLine++;
            currentCharacter = 0;
            codePlaceholder.innerHTML += '<br>';
            setTimeout(writeCode, 100); // Adjust the delay as needed
        }
    } else {
        // Code writing is finished, start scrolling text
        scrollText();
    }
}

function scrollText() {
    try {
        const greetings = document.querySelector('.scrolling-text h1');
        const profession = document.querySelector('.scrolling-text h3');

        // Show greetings and profession
        greetings.classList.remove('hidden');
        profession.classList.remove('hidden');

        // Scroll in greetings from the right
        greetings.style.animation = 'scrollInRight 3s ease-in-out';
        greetings.style.opacity = '1';

        // After greetings are scrolled in, scroll in profession from the left
        setTimeout(() => {
            profession.style.animation = 'scrollInLeft 2s ease-in-out';
            profession.style.opacity = '1';

            // Instructions for the button to come in after both headings
            setTimeout(() => {
                // Create a button
                const contactButton = document.createElement('button');
                contactButton.innerText = 'Contact Me';
                contactButton.classList.add('styled-button', 'fade-in'); // Add classes for styling

                // Adjusted margin for the button
                contactButton.style.marginTop = '10px'; // Adjust as needed

                // Append the button under the headings
                scrollingText.appendChild(contactButton);

                // Add a listener to scroll to the contact section when the button is clicked
                contactButton.addEventListener('click', () => {
                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                });
            }, 2000); // Adjust the delay to appear after both headings are scrolled in
        }, 3000); // Adjust the delay to match the animation duration
    } catch (error) {
        console.error('Error in scrollText:', error);
    }
}
// Call writeCode initially to start the animation
writeCode();