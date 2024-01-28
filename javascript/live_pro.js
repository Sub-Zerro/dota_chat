let h2 = document.querySelector('h2');
let div_start = document.querySelector(".info");
div_start.display = "none";

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

            let str_arr = [];
            let temp = [];
            if (i<=100){
                for (let k = 0; k < data.arr.length; k++){
                    for (let l = 0; l < data.arr[k].players.length; l++){
                        if (data.arr[k].players[l].hero_id == data.heroes[i].id){
                            //console.log(typeof(data.arr[k].match_id));
                            temp = [];
                            let temp_var;
                            //temp.push(data.arr[k].match_id);
                            for (let q = 0; q < data.arr[k].players.length; q++){
                                
                                for (let w = 0; w < data.heroes.length; w++){
                                    if (data.arr[k].players[q].hero_id == data.heroes[w].id){
                                        temp_var = data.heroes[w].localized_name;
                                    }
                                }
                                temp.push([data.arr[k].players[q].name, temp_var, data.arr[k].players[q].team_slot]);
                                //console.log("123:", (data.arr[k].players[q].hero_id)-1);
                            }
                            str_arr.push([data.arr[k].match_id, temp, data.arr[k].average_mmr]);
                        }
                    }
                }
            }
            

            console.log(str_arr);

            // let roma = "123";
            // roma = str;

            let final_str = "";
            for (let e = 0; e < str_arr.length; e++){
                final_str += `id матча: ${str_arr[e][0]} \n`;
                for (let r = 0; r < str_arr[e][1].length; r++){
                    if (str_arr[e][1][r][0] == undefined){
                        final_str += `${r+1}. Не про игрок, играл на ${str_arr[e][1][r][1]}(${str_arr[e][1][r][2]} поз)\n`;
                    }else{
                        final_str += `${r+1}. ${str_arr[e][1][r][0]}, играл на ${str_arr[e][1][r][1]}(${str_arr[e][1][r][2]} поз)\n`;
                    }
                }
                final_str += "Средний ммр: " + str_arr[e][2];
                final_str += "\n\n";
            }

            let roma = final_str;

            p.addEventListener('click', ()=>{
                

                console.log(roma);

                let div = document.querySelector('.info');
                if (roma == ''){
                    div.innerText = "На данном персонаже недавних игр нет";
                }else{
                    div.innerText = roma;
                }
                

                div.display = "flex";

                
                
                let esc = document.createElement("button");
                esc.textContent = "Закрыть";
                esc.className = "esc";

                div.appendChild(esc);

                esc.onclick = function(){
                    //div.style.display = "none";
                    div.innerText = '';
                }

                window.scrollTo(0, 0);
                //alert("Последние матчи про игроков на этом герое: \n" + roma);
                // let div = document.querySelector('.info');
                // let p;
                // for (let z = 0; z < str_arr.length; z++){
                //     p = document.createElement('p');
                //     p.textContent = str_arr[z];
                //     p.addEventListener('click', ()=>{
                //         let players = "";
                //         for (let x = 0; x < )
                //         div.replaceChildren();
                //         div.appendChild();
                //     })
                // }
            })
            document.body.appendChild(p);
        }

        p = document.createElement('p');
        p.textContent = "*вся информация взята из открытого источника docs.opendota.com от самого габена, а не с дотабафов всяких";
        document.body.appendChild(p);
    })
  })