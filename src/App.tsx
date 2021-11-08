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

  const [selectedAccountText, setSelectedAccountText] = useState<string>();
  const [response, setSelectedResponse] = useState<keyable>({});

  useEffect(() => {

    const handleEarthEnable = async () => {
      getEarth().then(async (earth: any) => {
        console.log('gotEarth', earth)
        // @ts-ignore: Object is of type 'unknown'.
        let hello = await earth?.isConnected();
        console.log('gotEarth', hello)
        // @ts-ignore: Object is of type 'unknown'.

        try {
          let enable = await earth?.enable();
          setSelectedAccountText(enable);
          console.log(enable)

        } catch (error) {
          console.log(error)
        }

      });


    };


    handleEarthEnable();
  }, []);

  const callSignMessage = async () => {
    try {
      let response = await window.earth.signMessage({
        canisterId: 'ury7f-eqaaa-aaaab-qadlq-cai',
        method: 'say',
        args: 'hello'
      });
      setSelectedResponse(response)
    } catch (error) {

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

    }
  }

  const stringifyWithBigInt = (obj: keyable) =>
    JSON.stringify(obj, (_, value) =>
      typeof value === 'bigint' ? value.toString() : value
    );

  return (
    <div className={styles.app}>
      <div className={styles.cardcont}>
        Dapp connected Address - {selectedAccountText}
      </div>
      {selectedAccountText && <div>
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
      </div>}
      <div
        style={{ background: '#e7ffe7' }}
        className={styles.cardcont}>
        Response - {stringifyWithBigInt(response)}
      </div>
    </div>

  );
}

export default App;
