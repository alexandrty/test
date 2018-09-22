export default function setName(name) {
    return {
        type: 'SET_NAME',
        payload: new Promise((resolve) => {
            setTimeout(() => {
                resolve(name);
            }, 3000);
        })
    };
}
