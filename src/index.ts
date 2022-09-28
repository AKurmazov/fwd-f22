const SYMBOLS: Array<string> = ['AAPL', 'BAC', 'KO', 'CNK', 'NEE', 'TAL', 'TTWO', 'VZ', 'SPCE', 'V', ];
const API_KEY: string = '';  // Use your private token. https://finnhub.io/

const socket: WebSocket = new WebSocket('wss://ws.finnhub.io?token=' + API_KEY);

interface TradesData {
    type: string;
    data: Array<TradeItem>;
}

interface TradeItem {
    s: string;
    p: number;
}

// Init stocks
const stocksContainer: HTMLElement | null = document.getElementById('stocks-container');
if (stocksContainer) {
    SYMBOLS.forEach(symbol => {
        const stockItem: HTMLElement = document.createElement('div');
        stockItem.id = symbol;
        stockItem.className = 'w-25 p-2';
    
        const stockItemLabel: HTMLElement = document.createElement('div');
        stockItemLabel.className = 'd-inline-block';
        stockItemLabel.style.width = '50px';
        stockItemLabel.innerText = symbol;
    
        const stockItemValue: HTMLElement = document.createElement('div');
        stockItemValue.innerText = '';
        stockItemValue.className = 'd-inline-block';
    
        stockItem.appendChild(stockItemLabel);
        stockItem.appendChild(stockItemValue);
        stocksContainer.appendChild(stockItem);
    });
    
    // Subscribe to stocks
    socket.addEventListener('open', function (_) {
        SYMBOLS.forEach(function (element: string) {
            socket.send(JSON.stringify({'type': 'subscribe', 'symbol': element}));
        });
    });
    
    socket.addEventListener('message', function (event) {
        const jsonData: TradesData = JSON.parse(event.data);
    
        if (jsonData.type == 'trade') {
            jsonData.data.forEach(function (tradeItem: TradeItem) {
                const stockItemNode: HTMLElement | null = (
                    document.getElementById(tradeItem.s)
                );
                if (!stockItemNode) {
                    console.debug('Could not find the stock item node: ', tradeItem.s);
                    return;
                }
    
                const stockItemValueNode: HTMLElement | null = (
                    stockItemNode.querySelector('div > div:last-of-type')
                );
                if (!stockItemValueNode) {
                    console.debug('Could not find the stock item value node');
                    return;
                }
    
                stockItemValueNode.innerText = String(tradeItem.p);
            });
        }
    });
}
