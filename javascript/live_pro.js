let h2 = document.querySelector('h2');

fetch('/live', {
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
        for (let i = 0; i < data.heroes.length; i++){
            p = document.createElement('p');
            p.textContent = `${i+1}. ${data.heroes[i].localized_name}`;

            str = "";

            if (i<=100){
                for (let k = 0; k < data.arr.length; k++){
                    for (let l = 0; l < data.arr[k].players.length; l++){
                        if (data.arr[k].players[l].hero_id == data.heroes[i].id){
                            console.log(typeof(data.arr[k].match_id));
                            str += data.arr[k].match_id;
                            str +='\n';
                        }
                    }
                }
            }
            

            console.log(str);

            let roma = "123";
            roma = str;

            p.addEventListener('click', ()=>{
                alert("Последние матчи про игроков на этом герое(id матча): \n" + roma);
            })
            document.body.appendChild(p);
        }

        p = document.createElement('p');
        p.textContent = "*вся информация взята из открытого источника docs.opendota.com от самого габена, а не с дотабафов всяких";
        document.body.appendChild(p);
    })
  })