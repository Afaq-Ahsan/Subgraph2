import { useEffect, useState } from "react";
import "./App.css";
import { createClient } from "urql";

function App() {
  const [tokens, setTokens] = useState([]);

  const QueryURL =
    "https://gateway.thegraph.com/api/01456d29a1ce5203460f24a946c69eaf/subgraphs/id/ELUcwgpm14LKPLrBRuVvPvNKHQ9HvwmtKgKSH6123cr7";
  const query = `{
    tokens(first: 5) {
      id
      name
      symbol
      decimals
    }
  }`;

  const client = createClient({
    url: QueryURL,
  });

  useEffect(() => {
    const getTokens = async () => {
      const { data } = await client.query(query).toPromise();
      console.log(data);
      console.log(data.tokens);
      setTokens(data.tokens);
    };
    getTokens();
  }, []);

  return (
    <div className="App">
      <h1>Token Information is : </h1>
      {tokens !== null &&
        tokens.length > 0 &&
        tokens.map((Tokens) => {
          return (
            <div>
              <div>
                <h3>Tokens ID : {Tokens.id}</h3>
              </div>
              <div>
                <h3>Tokens Name : {Tokens.name}</h3>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default App;
