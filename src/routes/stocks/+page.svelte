<script type="ts">
import { onMount } from 'svelte';

const API_KEY: string = '';  // Use your private token. https://finnhub.io/

let symbols: { [name: string]: number } =  {
    'AAPL': 0,
    'BAC': 0,
    'KO': 0,
    'CNK': 0,
    'NEE': 0,
    'TAL': 0,
    'TTWO': 0,
    'VZ': 0,
    'SPCE': 0,
    'V': 0,
};

interface TradesData {
    type: string;
    data: Array<TradeItem>;
}

interface TradeItem {
    s: string;
    p: number;
}

onMount(() => {
    const socket: WebSocket = new WebSocket('wss://ws.finnhub.io?token=' + API_KEY);

    socket.addEventListener('open', () => {
    Object.keys(symbols).forEach(function (element: string) {
        socket.send(JSON.stringify({'type': 'subscribe', 'symbol': element}));
    });
    });

    socket.addEventListener('message', function (event) {
    const jsonData: TradesData = JSON.parse(event.data);

    if (jsonData.type == 'trade') {
        jsonData.data.forEach(function (tradeItem: TradeItem) {
        symbols[tradeItem.s] = tradeItem.p;
        });
    }
    });
});
</script>

<main>
    <div class="container px-4 py-5" id="stocks">
        <h1 class="display-5 fw-bold">Stocks</h1>
        <div class="col-lg-12">
        <p class="lead mb-4">I have these stocks in my portfolio, perhaps it is handy to show 'em here</p>
        </div>
        <div class="d-flex align-content-start flex-wrap" id="stocks-container">
        {#each Object.keys(symbols) as symbol}
            <div id="{ symbol }" class="w-25 p-2">
            <div class="d-inline-block symbol-label">{ symbol }</div>
            <div class="d-inline-block">{ symbols[symbol] } $</div>
            </div>
        {/each}
        </div>
    </div>
</main>

<style>
    main {
        text-align: left;
    }
    
    div.symbol-label {
        width: 50px;
    }
</style>
