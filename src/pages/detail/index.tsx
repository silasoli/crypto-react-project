import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./detail.module.css";
interface CoinProps {
  delta_24h: string;
  market_cap: string;
  name: string;
  price: string;
  symbol: string;
  tota_volume_24h: string;
  low_24h: string;
  high_24h: string;
  formatedPrice: string;
  formatedMarket: string;
  formatedLowPrice: string;
  formatedHighPrice: string;
  numberDelta: number;
  error?: string;
}

export function Detail() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const { crypto } = useParams();
  const [detail, setDetail] = useState<CoinProps>();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    function getData() {
      fetch(
        `https://sujeitoprogramador.com/api-cripto/coin/?key=${API_KEY}&pref=BRL&symbol=${crypto}`
      )
        .then((response) => response.json())
        .then((data: CoinProps) => {
          const price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

          const resultData = {
            ...data,
            formatedPrice: price.format(Number(data.price)),
            formatedMarket: price.format(Number(data.market_cap)),
            formatedLowPrice: price.format(Number(data.low_24h)),
            formatedHighPrice: price.format(Number(data.high_24h)),
            numberDelta: parseFloat(data.delta_24h.replace(",", ".")) || 0,
          };

          setDetail(resultData);
          setLoading(false);
        })
        .catch(() => {
          navigate("/notfound");
        });
    }

    getData();
  }, [crypto]);

  if (loading) {
    return (
      <div className={styles.container}>
        <h4 className={styles.center}>Carregando informações</h4>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.center}>{detail?.name}</h1>
      <p className={styles.center}>{detail?.symbol}</p>

      <section className={styles.content}>
        <p>
          <strong>Preço:</strong> {detail?.formatedPrice}
        </p>
        <p>
          <strong>Maior preço 24h:</strong> {detail?.formatedHighPrice}
        </p>
        <p>
          <strong>Menor preço 24h:</strong> {detail?.formatedLowPrice}
        </p>
        <p>
          <strong>Delta 24h:</strong>
          <span
            className={
              detail?.numberDelta && detail.numberDelta >= 0
                ? styles.profit
                : styles.loss
            }
          >
            {detail?.delta_24h}
          </span>
        </p>
        <p>
          <strong>Valor total de mercado:</strong> {detail?.formatedMarket}
        </p>
      </section>
    </div>
  );
}
