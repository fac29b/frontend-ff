
const textOutput = document.getElementById('display');
const apiKeyInput = document.getElementById('apiKey');
const answer = document.getElementById('response');


if (localStorage.getItem('apiKey')) {
    apiKeyInput.style.display = "none";
    document.getElementById('keyState').textContent = 'Key stored';
    document.getElementById('keyButton').style.display = 'none';
}

function submit() {
    let textInput = document.getElementById('input').value;
    document.getElementById('display').textContent = textInput;
    sendToOpenAI(textInput);
}

function storeApiKey() {    
    let apiKey = apiKeyInput.value;
    localStorage.setItem('apiKey', apiKey);
    apiKeyInput.style.display = "none";
}

function sendToOpenAI(text) {
    // Your OpenAI API key
    const apiKey = localStorage.getItem('apiKey');

    // API Endpoint
    const endpoint = 'https://api.openai.com/v1/chat/completions';

    // Data to send in the request body
    const data = {
        model: "gpt-4",
        messages: [
            {
                role: 'system',
                content: 'You are a helpful assistant.',
            },
            {
                role: 'user',
                content: text,
            },
        ],
    };

    // Fetch API request
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        // Handle the OpenAI API response
        answer.textContent = (result.choices[0].message.content);
        // Do something with the result, like updating your UI
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
        // Handle the error, show a message to the user, etc.
    });
}






