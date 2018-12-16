export function PostData(userData) {
    let BaseURL = "http://localhost/demo_react/api/demo.php";

    return new Promise((resolve, reject) => {
        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify(userData)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                resolve("Here's the responseJson " + responseJson);
            })
            .catch((error) => {
                reject(error);
            });

    });
}