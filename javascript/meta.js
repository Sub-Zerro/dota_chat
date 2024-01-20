let h2 = document.querySelector('h2');
console.log(h2);

fetch('/meta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({})
  }).then((res)=>{
    res.json().then((data)=>{
        console.log(data);

        h2.style.display = 'none';
        console.log(data.arr);


        let p;
        for (let i = 0; i < data.arr.length; i++){
            p = document.createElement('p');
            p.textContent = `${i+1}. ${data.arr[i][0]} (${(data.arr[i][1]*100).toFixed(2)}%)`;
            document.body.appendChild(p);
        }

        p = document.createElement('p');
        p.textContent = "*вся информация взята из открытого источника docs.opendota.com от самого габена, а не с дотабафов всяких";
        document.body.appendChild(p);
    })
  })

// while(egor == 0){
//     let roma = setInterval(()=>{
//         if (h2.textContent == 'Загрузка.'){
//             h2.textContent = 'Загрузка..';
//         }else if (h2.textContent == 'Загрузка..'){
//             h2.textContent = 'Загрузка...';
//         }else if (h2.textContent == 'Загрузка...'){
//             h2.textContent = 'Загрузка.';
//         }
//     }, 200)
// } 

