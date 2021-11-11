import styles from "./App.module.scss";
import React, { useEffect, useState } from 'react';

export interface keyable {
  [key: string]: any;
}
declare global {
  interface Window {
    earth: keyable;
    ic: any;
  }
}

const getEarth = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener('load', () => {
      if (window.earth) {
        console.log('resolve(window.earth)')
        resolve(window.earth);
      } else {
        reject(new Error('Earth not found!'));
      }
    });
  });
};

function App() {

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [selectedAddressMeta, setSelectedAddressMeta] = useState<keyable>({});

  const [response, setSelectedResponse] = useState<keyable>({});


  const callEarthConnect = async () => {
    try {
      const account = await window.earth.enable();
      setSelectedAddress(account);
      const meta = await window.earth.getAddressMeta()
      setSelectedAddressMeta(meta);
      //      console.log(await window.earth.getAddressMeta())

    } catch (error) {
      console.log(error);
    }

  };





  const callSignMessage = async () => {
    try {
      let response = await window.earth.signMessage({
        canisterId: 'ury7f-eqaaa-aaaab-qadlq-cai',
        method: 'say',
        args: 'hello'
      });
      setSelectedResponse(response)
    } catch (error) {
      console.log(error);
    }
  }
  const callSignMessageBatch = async () => {
    try {
      let response = await window.earth.signMessage([{
        canisterId: 'ury7f-eqaaa-aaaab-qadlq-cai',
        method: 'say',
        args: 'hello'
      }, { canisterId: 'tde7l-3qaaa-aaaah-qansa-cai', method: 'availableCycles' }]);
      setSelectedResponse(response)
    } catch (error) {
      console.log(error);
    }
  }

  const stringifyWithBigInt = (obj: keyable) =>
    JSON.stringify(obj, (_, value) =>
      typeof value === 'bigint' ? value.toString() : value
    );

  return (
    <div className={styles.app}>
      <div className={styles.cardcont}>
        {selectedAddress
          ? <div>
            <div className={styles.datacol}>
              <div className={styles.datakey}>Connected Address</div>
              <div>🌎 {selectedAddress}</div>
            </div>
            {selectedAddressMeta && <div>
              <div>{Object.keys(selectedAddressMeta).map((key, index) => <div key={index} className={styles.datacol}>
                <div className={styles.datakey}>{key}</div>
                <div>{selectedAddressMeta[key]}</div>
              </div>)}</div>
            </div>}
          </div>
          : <button onClick={callEarthConnect}>🌎 Earth Connect</button>
        }
      </div>
      {selectedAddress && <div>
        <div
          className={styles.cardcont}
        >
          <code className={styles.code}>{callSignMessage.toString()}</code>
          <button onClick={callSignMessage}>Call Single Sign Message</button>
        </div>
        <div
          className={styles.cardcont}
        >
          <code className={styles.code}>{callSignMessageBatch.toString()}</code>
          <button onClick={callSignMessageBatch}>Call Batch Sign Message</button>
        </div>
        <div
          style={{ background: '#e7ffe7' }}
          className={styles.cardcont}>
          Response - {stringifyWithBigInt(response)}
        </div>
      </div>}

    </div>

  );
}

export default App;
