const express = require('express')
const app = express();
const fs = require('fs');
const path = require('path');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const {Pool, Client} = require('pg');
let database_data = require(path.join(__dirname + "/database.json"));
const pool = new Pool(database_data);

const puppeteer = require('puppeteer');


let data_json = require(path.join(__dirname + "/data.json"));

const data = {
    0: {
        name: "Рекрут",
        chat_json: data_json["rekrut"]
    },
    1: {
        name: "Страж",
        chat_json: data_json["strazh"]
    },
    2: {
        name: "Рыцарь",
        chat_json: data_json["rizar"]
    },
    3: {
        name: "Герой",
        chat_json: data_json["geroi"]
    },
    4: {
        name: "Легенда",
        chat_json: data_json["legenda"]
    },
    5: {
        name: "Властелин",
        chat_json: data_json["vlastelin"]
    },
    6: {
        name: "Божество",
        chat_json: data_json["bozhestvo"]
    },
    7: {
        name: "Титан",
        chat_json: data_json["titan"]
    },
}

//let temp_path;

//app.use(express.static(path.join(__dirname + '/css')));
app.use(express.json());
app.use(express.urlencoded());
//Для чтения файловпри get запросах ниже


app.get('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var myReadStream = fs.createReadStream(path.join(__dirname, '/home.html'), 'utf8');
    myReadStream.pipe(res);
});

app.get('/index', function(req, res){
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.get('/meta', function(req, res){
    res.sendFile(path.join(__dirname, '/htmls/meta.html'));
})

app.post('/meta', async function(req, res){
    let data = await get_meta();
    res.send({arr: data});
})

app.post('/rank', async function(req, res){
    var url = req.body.url;
    while(url[0]!="="){
        url = url.slice(1);
    }
    url = url.slice(1);

    param = url;

    let a = Number(param);

    let temp = await update_data(a);

    console.log("roma!!!", temp);

    res.send({rank: data[a].name, chat: temp});
});

app.get('/chat', function(req, res){
    res.sendFile(path.join(__dirname, "/htmls/chat.html"));
})

app.post('/add-message', async function(req, res){
    console.log(req.body);
    let json_path;

    for (let key1 in data){
        if (data[key1].name == req.body.rank){
            json_path = key1;
        }
    }

    await send_to_db(req.body.message, Number(json_path));
    res.send({});

    

    console.log(typeof(json_path));
})



app.use(express.static(path.join(__dirname)));



const PORT = process.env.PORT;
app.listen(PORT || 3000);
//Пролушиваемый порт


async function update_data(rank){
    let query = `select * from chat where rank = ${rank} ORDER BY id`;

    let arr = [];

    await pool.query(query)
        .then(res => {
            const rows = res.rows;

            rows.map(row => {
                console.log(`Read: ${JSON.stringify(row)}`);
            });

            for (let i = 0; i<res.rows.length; i++){
                arr.push([res.rows[i]['text_data']]);
            }
            console.log(arr);

        })
        .catch(err => {
            console.log(err);
        });

    return arr;
}


async function send_to_db(text, rank){
    let query = `select id from chat where rank = ${rank}`;

    let arr = [];

    await pool.query(query)
        .then(res => {
            const rows = res.rows;

            rows.map(row => {
                console.log(`Read: ${JSON.stringify(row)}`);
            });

            for (let i = 0; i<res.rows.length; i++){
                arr.push([res.rows[i]['id']]);
            }
            console.log(arr);
        })
        .catch(err => {
            console.log(err);
        });



    if (arr.length == 0){
        pool.query(`
            INSERT INTO chat(text_data, rank, id)values('${text}', ${rank}, 0);
            `, (err, res) => {
                console.log(err, res);
            })
    }else{
        pool.query(`
        INSERT INTO chat(text_data, rank, id)values('${text}', ${rank}, ${arr[arr.length-1]+1});
        `, (err, res) => {
            console.log(err, res);
        })
    }

        
}


async function get_meta(){
    return arr2 = new Promise((resolve, reject)=>{
        fetch('https://api.opendota.com/api/heroStats').then((res)=>{
                res.json().then((data)=>{
                    let temp = [];
                    let roma;
                    let arr = [];

                    for (let i = 0; i < 10; i++){
                        temp = [];
                        for (let i = 0; i < data.length; i++){
                            temp.push(data[i].pub_win/data[i].pub_pick);
                        }
                        
                        roma = Math.max.apply(Math, temp);

                        for (let i = 0; i < data.length; i++){
                            if (data[i].pub_win/data[i].pub_pick == roma){
                                arr.push([data[i].localized_name, data[i].pub_win/data[i].pub_pick]);
                                data.splice(i, 1);
                            }
                        }
                    }
                    console.log(arr);
                    arr2 = arr;

                    resolve();
                })
            });
    }).then(()=>{
        return arr2;
    })
    
    
}