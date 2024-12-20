let xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    let response = xhr.response;
    console.log(response);
});

xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();
