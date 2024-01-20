function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('name').value

    if(!Client.checkForUrl(formText)){
        alert("Invalid URL, please try again with a valid URL.");
        return;
    }

    console.log("::: Form Submitted :::")
    return fetch('http://localhost:8080/getSentiment', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({url: formText})
    })
    .then(res => res.json())
    .then(function(res) {
        const resultSummary = formatSentimentResults(res);
        document.getElementById('confidence').textContent = "Confidence: " + resultSummary.confidence;
        document.getElementById('score_tag').textContent = "Score Tag: " + resultSummary.score_tag;
        document.getElementById('agreement').textContent = "Agreement: " + resultSummary.agreement;
        document.getElementById('subjectivity').textContent = "Subjectivity: " + resultSummary.subjectivity;
        document.getElementById('irony').textContent = "Irony: " + resultSummary.irony;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

export { handleSubmit }


function formatSentimentResults(data) {
    return {
        score_tag: describeScore(data.score_tag),
        agreement: data.agreement,
        subjectivity: data.subjectivity,
        confidence: data.confidence,
        irony: data.irony
    };
}

function describeScore(scoreTag) {
    switch (scoreTag) {
        case "P+":
            return "Very Positive";
        case "P":
            return "Positive";
        case "NEU":
            return "Neutral";
        case "N":
            return "Negative";
        case "N+":
            return "Very Negative";
        case "NONE":
            return "No sentiment detected";
        default:
            return "Invalid Sentiment Score";
    }
}
