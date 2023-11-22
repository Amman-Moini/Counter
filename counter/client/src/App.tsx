
// import React, { useState } from 'react';
// import { Button, Layout, Row, Col } from 'antd';
// import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
// import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
// import { Provider, Network } from "aptos";
// import { useWallet } from "@aptos-labs/wallet-adapter-react";

// function App() {
//   const [count, setCount] = useState(0);

//   const provider = new Provider(Network.TESTNET);

//   const { account } = useWallet();

//   const handlePress = () => {
//     // You can add your smart contract logic here to update the count
//     setCount(count + 1);
//   };

//   return (
//     <Layout>
//       <Row align="middle" justify="center" style={{ height: '100vh' }}>
//         <Col span={6} style={{ textAlign: 'center' }}>
//           {/* Display the text "COUNTER" */}
//           <h1 style={{ fontSize: '5em', marginBottom: '20px' }}>COUNTER</h1>

//           {/* Display the count in a big font */}
//           <h1 style={{ fontSize: '9em', marginBottom: '20px' }}>{count}</h1>

//           {/* Wallet Selector */}
//           <WalletSelector />
//         </Col>
//         <Col span={4} style={{ textAlign: 'center', marginTop: '5em' }}>
//           {/* Make the circular "Press" button larger using the style prop */}
//           <Button
//             type="primary"
//             shape="circle"
//             onClick={handlePress}
//             style={{ width: '200px', height: '200px', fontSize: '5em' }}
//           >
//             Press
//           </Button>
//         </Col>
//       </Row>
//     </Layout>
//   );
// }

// export default App;




import React, { useState, useEffect } from 'react';
import { Button, Layout, Row, Col } from 'antd';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { Provider, Network } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

function App() {
  const [count, setCount] = useState<number | null>(null);
  const [accountHasList, setAccountHasList] = useState<boolean>(false);

  const provider = new Provider(Network.TESTNET);
  const { account, signAndSubmitTransaction } = useWallet();

  const moduleAddress = "0xcbc0ac12c077e960cd789ac576b11683ba6f0ca2cab13f0b3057f846e916f04d";

  const handlePress = async () => {
    debugger;
    
    if (account) {
      try {
        // Build a transaction payload
        const payload = {
          type: "bcs",
          sender: account.address,
          data: {
            function: `${moduleAddress}::counter::bump`,
            typeArguments: [],
            functionArguments: [],

          },
          multisig_address: "", // Provide the appropriate multisig address here
    
    
        };
        




        // Sign and submit the transaction
        // eslint-disable-next-line
        const response = await signAndSubmitTransaction(payload);

        // Wait for the transaction to be mined
        await provider.waitForTransaction(response.hash);

        // Fetch the updated count
        const CountHolderResource = await provider.getAccountResource(
          account.address,
          `${moduleAddress}::counter::CountHolder`
        );

       
       
       // Log the CountHolderResource to the console
        console.log(CountHolderResource);

              // Set the count in the state
              // eslint-disable-next-line
            setCount(CountHolderResource.data.count);

    

       


        setAccountHasList(true);
      } catch (e: any) {
        console.error("Transaction failed:", e.message);
        setCount(null);
        setAccountHasList(false);
      }
    }
  };

 // Fetch the count when the component mounts and whenever the account address changes
useEffect(() => {
  handlePress();
}, [account?.address,handlePress]);


  return (
    <Layout>
      <Row align="middle" justify="center" style={{ height: '100vh' }}>
        <Col span={6} style={{ textAlign: 'center' }}>
          {/* Display the text "COUNTER" */}
          <h1 style={{ fontSize: '5em', marginBottom: '20px' }}>COUNTER</h1>

          {/* Display the count in a big font */}
          <h1 style={{ fontSize: '9em', marginBottom: '20px' }}>
            {count !== null ? count : 'Loading...'}
          </h1>

          {/* Wallet Selector */}
          <WalletSelector />
        </Col>
        <Col span={4} style={{ textAlign: 'center', marginTop: '5em' }}>
          {/* Make the circular "Press" button larger using the style prop */}
          <Button
            type="primary"
            shape="circle"
             onClick={handlePress}
           style={{ width: '200px', height: '200px', fontSize: '5em' }}
           >
             Press
          </Button>
        </Col>
      </Row>
    </Layout>
  );
}

export default App;
