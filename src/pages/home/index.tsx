import styles from "./home.module.css";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className={styles.container}>
      <form action="" className={styles.form}>
        <input type="text" placeholder="Digite o simbolo da moeda:" />
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
          <tr className={styles.tr}>
            <td className={styles.tdLabel} data-label="Moeda">
              <Link className={styles.link} to="/detail/btc">
                <span>Bitcoin</span> | BTC
              </Link>
            </td>
            <td className={styles.tdLabel} data-label="Mercado">
              R$ 19293
            </td>
            <td className={styles.tdLabel} data-label="Preço">
              R$ 40.0
            </td>
            <td className={styles.tdProfit} data-label="Volume">
              <span>-5.3</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
