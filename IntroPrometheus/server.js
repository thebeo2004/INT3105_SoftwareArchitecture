import express, { response } from "express";
import { Registry, Counter, collectDefaultMetrics } from "prom-client";

const app = express();
const PORT = 3000;

const register = new Registry();

const headsCount = new Counter({
    name: "heads_count",
    help: "Number of heads"
});

const tailsCount = new Counter({
    name: "tails_count",
    help: "Number of tails"
});

const flipsCount = new Counter({
    name: "flips_count",
    help: "Number of flips"
});

register.registerMetric(headsCount);
register.registerMetric(tailsCount);
register.registerMetric(flipsCount);

register.setDefaultLabels({
    app: 'coin-api'
});

collectDefaultMetrics({register})

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

app.get('/metrics', async (req, res) => {
    res.setHeader('Content-type', register.contentType);
    res.end(await register.metrics());
})

app.listen(PORT, () => {
    console.log(`Started Server. Server is running at PORT ${PORT}`);
})