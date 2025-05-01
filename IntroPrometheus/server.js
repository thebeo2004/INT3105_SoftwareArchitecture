import express, { response } from "express";
import { Registry, Counter, collectDefaultMetrics, Histogram } from "prom-client";

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

collectDefaultMetrics({
    app: 'coin-api',
    timeout: 10000,
    gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5], // How big the buckets should be for the Garbage Collection Histogram
    register})

// Create a custom histogram metric
const httpRequestTimer = new Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 0.3, 0.7, 1, 3, 5, 7, 10] // 0.1 to 10 seconds
})

register.registerMetric(httpRequestTimer)

app.get('/flip-coints', (req, res) => {
    // Start the HTTP request timer
    const end = httpRequestTimer.startTimer();
    const route = req.route.path;
    const times = req.query.times;

    if (times && times > 0) {
        flipsCount.inc(Number(times));
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

        headsCount.inc(heads);
        tailsCount.inc(tails);
        res.json({heads, tails});
    } else {
        res.send('Hello! I work!!')
    }

    end({route, code: res.statusCode, method: req.method})
});

app.get('/metrics', async (req, res) => {
    res.setHeader('Content-type', register.contentType);
    res.end(await register.metrics());
})

app.listen(PORT, () => {
    console.log(`Started Server. Server is running at PORT ${PORT}`);
})