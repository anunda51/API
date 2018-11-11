const express = require('express')
const line = require('@line/bot-sdk')
const bodyParser = require('body-parser');
const port = 8080
const app = express()
const config = {
    channelAccessToken: "u/KbN38u2ks/vNhjrJGohdpZLePwPAinP8+AgrsT1sY1nBk6mRlJNrL2WaRE7vUCgJrHl0XXflvbezb47MRTVnUDF6i7Wh5sIWuPsXk0k9BOhn4Cf6a9PyI5wUWoReN4iLyDe9sdU0AJNiD6kMRAkAdB04t89/1O/w1cDnyilFU=",
    channelSecret: "023d73ba30b9dfd45c1711a2803801f7"
}
const client = new line.Client(config)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.post('/login', (req,res) => {
        var message = {
        type: "flex",
        altText: "Facebook Login User",
        contents: {
            type: "bubble",
            body: {
                type: "box",
                layout: "vertical",
                contents: [
                    {
                        type: "image",
                        url: req.body.picture
                    },
                    {
                        type: "text",
                        text: req.body.name
                    },
                    {
                        type: "text",
                        text: req.body.email
                    }
                ]
            }
        }
    }

    client.pushMessage('U498c35951d9ead55e4221e3d43c23072', message)
        .then( (result) => {
            console.log(result)
        })
        .catch( (err) => {
            console.log(err)
        })
})

app.listen(port, () => console.log(`App running:${port}`))