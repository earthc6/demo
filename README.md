# Demo Dapp

## Available Scripts

In the project directory, you can run:

### `yarn start`



#### Connecting Address

```js
// This will inject the Earth Wallet listener if it is installed.
const injectEarth = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener('load', () => {
      if (window.earth) {
        // Handle Earth Wallet Events here.
        resolve(window.earth);
      } else {
        // Earth Wallet is not installed.
        reject(new Error('Earth Wallet not installed.'));
      }
    });
  });
};
// Connect to Earth Wallet (i.e. show accounts available, etc)
const handleEarthEnable = () => {
  await injectEarth();
    window?.earth
    .enable().then((account) => {
        console.log("Successfully connected to Earth Wallet 🌍", account);
      })
      .catch((err) => {
        console.error(err);
      });
  };
```

#### Triggering Canister Sign Messages


```js

// After connected to Earth Wallet 🌍

 const callSignMessage = async () => {
    try {
      let response = await window.earth.signMessage({
        canisterId: 'ury7f-eqaaa-aaaab-qadlq-cai',
        method: 'say',
        args: 'hello'
      });
      console.log(response)
    } catch (error) {

    }
  }
  const callSignMessageBatch = async () => {
    try {
      let response = await window.earth.signMessage([
      {
        canisterId: 'ury7f-eqaaa-aaaab-qadlq-cai',
        method: 'say',
        args: 'hello'
      }, 
      { canisterId: 'tde7l-3qaaa-aaaah-qansa-cai', method: 'availableCycles' }]);
      console.log(response)
     } catch (error) {

    }
  }
```
