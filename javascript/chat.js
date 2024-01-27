let chat_data;


setInterval(()=>{
    new Promise((resolve, reject)=>{
        fetch('/rank', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({url: document.URL})
        }).then((res)=>{
            res.json().then((data)=>{
                //console.log(data);
    
                chat_data = data;
    
                resolve();
            })
        })    
    }).then(()=>{
        console.log(chat_data);
    
        let h1 = document.querySelector('.rank');
        h1.textContent = chat_data.rank;
    
    
    
        let div;
        let area = document.querySelector(".chat-area");
        area.innerHTML = '';
        for (let i = 0; i < chat_data.chat.length; i++){
            div = document.createElement("div");
            div.textContent = chat_data.chat[i];
    
            div.className = "message";
    
            area.appendChild(div);
        }
    
    
        let btn = document.querySelector(".subm");
        let input = document.querySelector("input");
    
        // btn.addEventListener('click', async()=>{
        //     fetch('/add-message', {
        //         method: 'POST',
        //         headers: {
        //           'Content-Type': 'application/json;charset=utf-8'
        //         },
        //         body: JSON.stringify({rank: chat_data.rank, message: input.value})
        //       }).then(()=>{
        //         //location.reload();
        //       })
    
            
        // })

        btn.onclick = async()=>{
            fetch('/add-message', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({rank: chat_data.rank, message: input.value})
              }).then(()=>{
                //location.reload();
              })
    
            
        }
    })
}, 2000)





