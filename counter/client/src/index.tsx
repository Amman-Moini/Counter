
import React from 'react';
import ReactDOM from 'react-dom';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import App from './App';

const wallets = [new PetraWallet()];
const rootElement = document.getElementById('root');

ReactDOM.render(
  <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AptosWalletAdapterProvider>,
  rootElement
);
