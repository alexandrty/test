export default function getIssues() {
    return {
        type: 'GET_ISSUES',
        payload: new Promise((resolve) => {
            const issues = fetch('/src/data.json').then(response => response.json()).then(data => data)
            resolve(issues)
        })
    };
}
