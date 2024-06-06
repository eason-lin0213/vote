document.addEventListener('DOMContentLoaded', () => {
    const voteContainer = document.getElementById('voteContainer');
    const resultsContainer = document.getElementById('resultsContainer');

    // Function to update results
    function updateResults() {
        const persons = Array.from(document.querySelectorAll('.person'));
        
        // Sort persons by vote count in descending order
        persons.sort((a, b) => {
            const voteCountA = parseInt(a.querySelector('span').textContent);
            const voteCountB = parseInt(b.querySelector('span').textContent);
            return voteCountB - voteCountA;
        });

        // Clear results container
        resultsContainer.innerHTML = '';

        // Append sorted persons to resultsContainer
        persons.forEach(person => {
            const optionName = person.querySelector('h4').textContent;
            const voteCount = person.querySelector('span').textContent;
            const result = document.createElement('p');
            result.textContent = `${optionName}: ${voteCount} 票`;
            resultsContainer.appendChild(result);
        });
    }

    // Function to add vote
    function addVote(event) {
        const voteCountSpan = event.target.previousElementSibling.querySelector('span');
        let voteCount = parseInt(voteCountSpan.textContent);
        voteCount++;
        voteCountSpan.textContent = voteCount;
        updateResults();
    }

    // Attach click event to existing buttons
    document.querySelectorAll('.person button').forEach(button => {
        button.addEventListener('click', addVote);
    });

    // Function to add new option
    document.getElementById('addOption').addEventListener('click', () => {
        const newOptionText = document.getElementById('newOption').value.trim();
        if (newOptionText === '') {
            alert('請輸入新選項名稱');
            return;
        }

        const newPersonDiv = document.createElement('div');
        newPersonDiv.className = 'person';
        newPersonDiv.innerHTML = `
            <h4>${newOptionText}</h4>
            <p>總票數： <span>0</span> 票</p>
            <button>給它投票</button>
        `;

        // Attach click event to the new button
        newPersonDiv.querySelector('button').addEventListener('click', addVote);

        voteContainer.appendChild(newPersonDiv);
        document.getElementById('newOption').value = '';
        updateResults();
    });

    // Initial call to update results
    updateResults();
});
