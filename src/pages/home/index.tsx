import { useState, useEffect, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import { BiSearch } from "react-icons/bi";
import Footer from "../../components/footer";

//https://coinlib.io/api/v1/coinlist?key=e9c7d171dfa4a2d9&pref=BTC&page=1&order=volume_desc
//Sua chave de API: e9c7d171dfa4a2d9

interface CoinProps {
  name: string;
  delta_24h: string;
  symbol: string;
  price: string;
  volume: string;
  market_cap: string;
  formatedPrice: string;
  formatedMarket: string;
  numberDelta?: number;
}

interface DataProps {
  coins: CoinProps[];
}
export default function Home() {
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function getData() {
      fetch(
        "https://sujeitoprogramador.com/api-cripto/?key=e9c7d171dfa4a2d9&pref=BRL"
      )
        .then((response) => response.json())
        .then((data: DataProps) => {
          const coninsData = data.coins.slice(0, 20);

          const price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

          const formatResult = coninsData.map((item) => {
            const formated = {
              ...item,
              formatedPrice: price.format(Number(item.price)),
              formatedMarket: price.format(Number(item.market_cap)),
              numberDelta:parseFloat(item.delta_24h.replace(",", ".")),
            };
            return formated;
          });
          setCoins(formatResult);
         
        })
        .catch((err) => {
          console.log("erro ao carregar dados", err);
        });
    }
    getData();
  }, []);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (inputValue === "") return;

    navigate(`/detail/${inputValue}`);
  }

  return (
    <>
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Digite o simbolo da moeda: BTC..."
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />

        <button type="submit">
          <BiSearch size={30} color="#FFF" />
        </button>
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
          </tr>
        </thead>

        <tbody id="tbody">
          {coins.map((coin) => (
            <tr key={coin.name} className={styles.tr}>
              <td className={styles.tdLabel} data-label="Moeda">
                <Link className={styles.link} to={`/detail/${coin.symbol}`}>
                  <span>{coin.name}</span> | {coin.symbol}
                </Link>
              </td>
              <td className={styles.tdLabel} data-label="Mercado">
                {coin.formatedMarket}
              </td>
              <td className={styles.tdLabel} data-label="Preço">
                {coin.formatedPrice}
              </td>
              <td
                className={
                  coin.numberDelta && coin.numberDelta >= 0 ? styles.tdProfit : styles.tdLoss
                }
                data-label="Volume"
              >
                <span>{coin.delta_24h}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
    <footer><Footer/></footer>
    </>
  );
}
