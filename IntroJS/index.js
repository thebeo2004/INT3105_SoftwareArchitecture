function httpGetAsync(theUrl, resolve) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            resolve(xmlHttp);
        }
    };

    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

const currentPromise = new Promise((resolve, reject) => {
    httpGetAsync('https://picsum.photos/200/300', resolve)
});

const promise2 = new Promise((resolve, reject) => {
    httpGetAsync('https://picsum.photos/200/300', resolve)    
})

const promise3 = new Promise((resolve, reject) => {
    httpGetAsync('https://picsum.photos/200/300', resolve)    
})

const executeAsync = async() => {
    try {
        const response = await currentPromise;
        console.log(response);
        await promise2;
        await promise3;
    } catch (err) {
        console.log(errror);
    }
} 

executeAsync();

// function test() {
//     setTimeout(() => console.log('1'), 0);
//     console.log('2');
//     console.log('3');
// }



// httpGetAsync('https://picsum.photos/200/300', (data) => {
//     console.log(data);
//     document.getElementById('img_1').setAttribute('src', data.responseURL)

//     httpGetAsync('https://picsum.photos/200/300', (data) => {
//         document.getElementById('img_2').setAttribute('src', data.responseURL)

//         httpGetAsync('https://picsum.photos/200/300', (data) => {
//             document.getElementById('img_3').setAttribute('src', data.responseURL)
//         })
//     })
// })