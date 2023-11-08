


// This function is an example of a FETCH request sent to an API.
// This will only work if you've got a local mongodb database running on port 3004.

// In order for this to work--you will need to allow CORS in your browser
// See below for a plugin that lets you turn CORS on and off in chrome
// https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf
const testAPI = () => {
    const response = fetch("http://localhost:3004/api/stats/total-men")
    .then(response => response.json())
    .then(data => {
        document.getElementById("api_test_result").innerHTML = "total men in database: " + data
    })
}


// Ordinarily, you'd change the URL in the example above to point to a server hosting the api
// So, a real API call would look like this:
const realAPI = () => {
    const response = fetch("http://dog-api.kinduff.com/api/facts")
    .then(response => response.json())
    .then(data => {
        document.getElementById("api_real_result").innerHTML = data.facts[0]
    })
}