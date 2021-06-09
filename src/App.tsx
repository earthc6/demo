/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import './App.css';
import { web3Accounts, web3Enable } from '@earthwallet/sdk';
import { InjectedAccountWithMeta } from '@earthwallet/sdk/build/main/inject/types';
import {
  getTransactions,
  getBalance,
} from '@earthwallet/sdk/build/main/util/icp';
import logo from './icon.png';
import icp_logo from './icp-logo.png';
import dot_logo from './kusama-ksm-logo.svg';
import ksm_logo from './polkadot-new-dot-logo.svg';

import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [selectedTab, setSelectedTab] = useState('Assets');
  const [accounts, setAccounts] =
    useState<null | InjectedAccountWithMeta[]>(null);
  const [selectedAccount, setSelectedAccount] =
    useState<null | InjectedAccountWithMeta>(null);
  const [showDropDown, setShowDropDown] = useState(false);
  const [walletBalance, setWalletBalance] = useState<any>();
  const [walletTransactions, setWalletTransactions] = useState<any>();

  useEffect(() => {
    loadWeb3Accounts();
  }, []);

  const loadWeb3Accounts = async () => {
    if (accounts != null) return;
    await web3Enable('social.network').catch((err) =>
      console.log('web3Enable', err)
    );
    const allAccounts = await web3Accounts().catch((err) =>
      console.log('web3Accounts', err)
    );
    console.log(allAccounts, 'InjectedAccountWithMeta', web3Enable);
    if (allAccounts && allAccounts.length) setAccounts(allAccounts);
  };

  const loadBalance = async (address: string) => {
    const balance = await getBalance(address);
    console.log('balance: ', balance);
    setWalletBalance(balance);
  };

  const loadTransactions = async (address: string) => {
    const transactions = await getTransactions(address);
    console.log('transactions: ', transactions);
    setWalletTransactions(transactions);
  };

  useEffect(() => {
    console.log('accounts', accounts);
    console.log('selectedAccount', selectedAccount);
    if (selectedAccount == null && accounts && accounts.length)
      setSelectedAccount(accounts[0]);
    if (selectedAccount) {
      loadBalance(selectedAccount?.address);
      loadTransactions(selectedAccount?.address);
    }
  }, [accounts, selectedAccount]);

  const _onChangePrefix = (account: InjectedAccountWithMeta) => {
    setSelectedAccount(account);
    setShowDropDown(false);
  };

  const getShortAddress = (address: string) =>
    address.substring(0, 6) + '...' + address.substring(address.length - 5);

  const getWalletLogo = (symbol: string) => {
    if (symbol === 'ICP') return icp_logo;
    if (symbol === 'DOT') return dot_logo;
    if (symbol === 'KSM') return ksm_logo;
    return icp_logo;
  };

  const getValueInUSD = (balance: number, symbol: string) => {
    if (symbol === 'ICP') return balance * 80;
    if (symbol === 'DOT') return balance * 20;
    if (symbol === 'KSM') return balance * 120;
    return icp_logo;
  };

  return (
    <div className="App">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <img
        src={logo}
        className={'App-logo' + (accounts?.length ? ' App-logo-connected' : '')}
        alt="logo"
      />

      <div className="App-Body">
        <div className="App-header">
          <div className="App-header-title">Sample DApp</div>
          <div className="selectedAccountHeader">
            <div
              className="selectedAccount"
              onClick={() =>
                accounts && accounts?.length > 1
                  ? setShowDropDown((status) => !status)
                  : {}
              }
            >
              {selectedAccount && getShortAddress(selectedAccount?.address)}
            </div>

            {showDropDown && (
              <div className="addressSelector">
                {accounts?.map((account) => {
                  return (
                    <div
                      className="addressItem"
                      key={account.address}
                      onClick={() => _onChangePrefix(account)}
                    >
                      {getShortAddress(account.address)}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {walletBalance && (
          <div className="wallet-dv">
            <img
              className="wallet-token-icon"
              src={getWalletLogo(walletBalance?.balances[0]?.currency?.symbol)}
            />
            <div className="wallet-walletBalance">
              {walletBalance?.balances[0]?.value +
                ' ' +
                walletBalance?.balances[0]?.currency?.symbol}
            </div>
            <div className="wallet-walletBalance-usd">
              {'$' +
                getValueInUSD(
                  walletBalance?.balances[0]?.value,
                  walletBalance?.balances[0]?.currency?.symbol
                )}
            </div>
            <div className="wallet-actions-div">
              <div className="tokenActionView receiveTokenAction">
                <FontAwesomeIcon
                  className="tokenActionButton"
                  color="#fff"
                  icon={faArrowDown}
                  size="2x"
                />

                <div className="tokenActionLabel">Receive</div>
              </div>

              <div className="tokenActionView sendTokenAction">
                <FontAwesomeIcon
                  className="tokenActionButton"
                  color="#fff"
                  icon={faArrowUp}
                  size="2x"
                />

                <div className="tokenActionLabel">Send</div>
              </div>
            </div>

            <div className="assetsAndActivityDiv">
              <div className="tabsView">
                <div
                  className={
                    'tabView ' +
                    (selectedTab === 'Assets' ? 'selectedTabView' : '')
                  }
                  onClick={() => setSelectedTab('Assets')}
                >
                  Assets
                </div>
                <div
                  className={
                    'tabView ' +
                    (selectedTab === 'Transactions' ? 'selectedTabView' : '')
                  }
                  onClick={() => setSelectedTab('Transactions')}
                >
                  Transactions
                </div>
              </div>
              <div className="transactions-div"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
