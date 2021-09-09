import styles from "./App.module.scss";
import React, { useEffect } from 'react';


declare global {
  interface Window {
    earth: unknown;
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


        Demo application



      </div>
    </div>

  );
}

export default App;
