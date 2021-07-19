import type { IncomingMessage, ServerResponse } from 'node:http';

import fetch from 'node-fetch';

type CoinDeskCurrencyKeys = 'BTC' | 'USD';

type Currency = {
  code: string;
  rate: string;
  description: string;
  rate_float: number;
};

type CoinDeskAPIResponse = {
  time: {
    updated: string;
    updatedISO: string;
    updateduk: string;
  };
  disclaimer: string;
  bpi: {
    [key in CoinDeskCurrencyKeys]: Currency;
  };
};

async function cryptoBTCRoute(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  if (request.method === 'GET') {
    fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json')
      .then((res) => res.json())
      .then(({ bpi, disclaimer, time }: CoinDeskAPIResponse) => {
        console.log({ bpi, disclaimer, time });
      });
  }

  if (request.method === 'POST') {
    return;
  }
}

export default cryptoBTCRoute;
