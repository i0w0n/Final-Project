window.addEventListener('load', ()=> {
    document.getElementById('button-submit').addEventListener('click', ()=> {
        let nameInput = document.getElementById('name').value;
        console.log(nameInput);

        let Q0selector = document.querySelector('input[name="choice0"]:checked').value;
        console.log(Q0selector);

        let Q1selector = document.querySelector('input[name="choice1"]:checked').value;
        console.log(Q1selector);

        let Q2selector = document.querySelector('input[name="choice2"]:checked').value;
        console.log(Q2selector);

        let Q3selector = document.querySelector('input[name="choice3"]:checked').value;
        console.log(Q3selector);



        let obj = {
            "qZero" : Q0selector,
            "name" : nameInput,
            "qOne" : Q1selector,
            "qTwo" : Q2selector,
            "qThree" : Q3selector
        }
        let jsonData = JSON.stringify(obj);

        fetch('/inputData', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body:jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)})
    })
})