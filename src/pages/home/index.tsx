import { FormEvent, useEffect, useState } from "react";
import styles from "./home.module.css";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

interface CoinProps {
  delta_24h: string;
  market_cap: string;
  name: string;
  price: string;
  rank: number;
  symbol: string;
  volume_24h: string;
  formatedPrice: string;
  formatedMarket: string;
  numberDelta: number;
}

interface DataProps {
  coins: CoinProps[];
}

export function Home() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    function getData() {
      fetch(
        `https://sujeitoprogramador.com/api-cripto/?key=${API_KEY}&pref=BRL`
      )
        .then((response) => response.json())
        .then((data: DataProps) => {
          const coinsData = data.coins.slice(0, 10);

          const price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

          const formatResult = coinsData.map((item) => {
            const formated = {
              ...item,
              formatedPrice: price.format(Number(item.price)),
              formatedMarket: price.format(Number(item.market_cap)),
              numberDelta: parseFloat(item.delta_24h.replace(",", ".")),
            };

            return formated;
          });

          setCoins(formatResult);
        })
       .catch(() => {
          navigate("/notfound");
        });
    }

    getData();
  }, []);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (inputValue === "") return;

    return navigate(`/detail/${inputValue}`);
  }

  return (
    <div className={styles.container}>
      <form action="" className={styles.form} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Digite o simbolo da moeda:"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">
          <BiSearch size={30} color="#fff" />
        </button>
      </form>

      <table>
        <thead>
          <th scope="col">Moeda</th>
          <th>Valor Mercado</th>
          <th>Preço</th>
          <th>Volume</th>
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
                  coin.numberDelta >= 0 ? styles.tdProfit : styles.tdLoss
                }
                data-label="Volume"
              >
                <span>{coin.delta_24h}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
