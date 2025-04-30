import express from "express";

const app = express();
const PORT = 3000;

app.get('/flip-coints', (req, res) => {
    const times = req.query.times;

    if (times && times > 0) {
        let heads = 0;
        let tails = 0;

        for (let i = 0; i < times; i++) {
            let randomNumber = Math.random();
            if (randomNumber < 0.5) {
                heads++;
            } else {
                tails++;
            }
        }

        res.json({heads, tails});
    } else {
        res.send('Hello! I work!!')
    }
});

app.listen(PORT, () => {
    console.log(`Started Server. Server is running at PORT ${PORT}`);
})