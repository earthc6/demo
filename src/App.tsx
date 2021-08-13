import styles from "./App.module.scss";
import React, { useEffect } from 'react';


declare global {
  interface Window {
    earth: unknown;
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

  useEffect(() => {

    const handleEarthEnable = async () => {
      getEarth().then(async (earth) => {
        console.log('gotEarth', earth)
          // @ts-ignore: Object is of type 'unknown'.
        let hello = await earth?.isConnected();
        console.log('gotEarth', hello)
          // @ts-ignore: Object is of type 'unknown'.
        console.log(await earth?.enable())
      });

      console.log(window.earth);
      // console.log(window.initWeb3);

      /*     window.earth.enable().then((account) => {
              console.log("Successfully connected to Earth wallet.🌍", account);
              // onConnect();
            })
            .catch((err) => {
              console.error(err);
            });
       */
    };
    handleEarthEnable();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.cardcont}>
        <div className={styles.cardcontinner}>
          <div className={styles.cardinfo}>
            <div className={styles.pillet}>Earth Profile #</div>
            <div className={styles.value}>$209,092.22</div>
            <div className={styles.stats}>+12.34%</div>
          </div>
        </div>
        <div className={styles.cardnetworks}>
          <div className={styles.networktitle}>Networks</div>

          {[1, 2, 3].map((net, index) => <div
            className={styles.netcard}
            key={index}>
            <div className={styles.networklogo}></div>
            <div className={styles.netmid}>
              <div className={styles.netname}>
                Internet Computer
              </div>
              <div className={styles.netassets}>
                5 Assets
              </div>
            </div>

            <div className={styles.netlast}>
              <div className={styles.netvalue}>
                $39,092.22 USD
              </div>
              <div className={styles.netstats}>
                +0.34%
              </div>
            </div>
          </div>)}



        </div>
      </div>

    </div>
  );
}

export default App;
