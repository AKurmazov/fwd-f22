<script type="ts">
  import { onMount } from 'svelte';

  const SYMBOLS: Array<string> = ['AAPL', 'BAC', 'KO', 'CNK', 'NEE', 'TAL', 'TTWO', 'VZ', 'SPCE', 'V', ];
  const API_KEY: string = 'c8rdafiad3i8tv0k57n0';  // Use your private token. https://finnhub.io/

  const socket: WebSocket = new WebSocket('wss://ws.finnhub.io?token=' + API_KEY);

  interface TradesData {
      type: string;
      data: Array<TradeItem>;
  }

  interface TradeItem {
      s: string;
      p: number;
  }

  onMount(() => {
    // Init stocks
    const stocksContainer: HTMLElement | null = document.getElementById('stocks-container');
    console.log(stocksContainer);
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
  });

</script>

<main>

  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item"><a href="#about" class="nav-link active" aria-current="page">About</a></li>
        <li class="nav-item"><a href="#stocks" class="nav-link">Stocks</a></li>
        <li class="nav-item"><a href="#education" class="nav-link">Education</a></li>
        <li class="nav-item"><a href="#experience" class="nav-link">Experience</a></li>
        <li class="nav-item"><a href="#contacts" class="nav-link">Contacts</a></li>
      </ul>
    </header>
  </div>
  
  <div class="container px-4 py-5" id="about">
    <h1 class="display-5 fw-bold">About</h1>
    <div class="col-lg-6">
      <p class="lead mb-4">Hello! My name is Alexander, and I am a Software Engineer :)</p>
    </div>
  </div>
  
  <div class="container px-4 py-5" id="stocks">
    <h1 class="display-5 fw-bold">Stocks</h1>
    <div class="col-lg-6">
      <p class="lead mb-4">I have these stocks in my portfolio, perhaps it is handy to show 'em here</p>
    </div>
    <div class="d-flex align-content-start flex-wrap" id="stocks-container"></div>
  </div>
  
  <div class="container px-4 py-5" id="education">
    <h1 class="display-5 fw-bold">Education</h1>
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div class="feature col">
        <h3 class="fs-2">Togliatti State School</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
      <div class="feature col">
        <h3 class="fs-2">Innopolis University</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
      <div class="feature col">
        <h3 class="fs-2">Windsor Languages School</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    </div>
  </div>
  
  <div class="container px-4 py-5" id="experience">
    <h1 class="display-5 fw-bold">Experience</h1>
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div class="feature col">
        <h3 class="fs-2">WeGoTrip</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
      <div class="feature col">
        <h3 class="fs-2">EdgeVision</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
      <div class="feature col">
        <h3 class="fs-2">Tinkoff</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    </div>
  </div>
  
  <div class="container px-4 py-5" id="contacts">
    <h1 class="display-5 fw-bold">Contacts</h1>
    <div class="col-lg-6">
      <p class="lead mb-4">You can contact me on GitHub and Instagram</p>
      <a class="btn btn-primary" style="background-color: #3b5998;" href="https://github.com/AKurmazov" role="button"><i class="fab fa-github"></i></a>
      <a class="btn btn-primary" style="background-color: #3b5998;" href="https://www.instagram.com/_kurmazov/" role="button"><i class="fab fa-instagram"></i></a>
    </div>
  </div>
</main>

<style>
  main {
    text-align: left;
  }
</style>
