<script type="ts">
  import { onMount } from 'svelte';

  const API_KEY: string = '';  // Use your private token. https://finnhub.io/
  const socket: WebSocket = new WebSocket('wss://ws.finnhub.io?token=' + API_KEY);

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
    <div class="col-lg-12">
      <p class="lead mb-4">Hello! My name is Alexander, and I am a Software Engineer :)</p>
    </div>
  </div>
  
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
    <div class="col-lg-12">
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

  div.symbol-label {
    width: 50px;
  }
</style>
