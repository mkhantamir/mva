import { Positions } from "~/views/admin";
import css from "~/styles/admin.module.scss";
import { useEffect, useState } from "react";
import { PlayerType } from ".";
import { getVoteCount, getVoteList } from "@mva/fetch";
type Props = {};

const AdminPage = ({}: Props) => {
  const [male, setMale] = useState<
    { player: PlayerType; position: number; totalVotes: number }[]
  >([]);
  const [female, setFemale] = useState<
    { player: PlayerType; position: number; totalVotes: number }[]
  >([]);
  const [count, setCount] = useState<{
    all: string;
    male: string;
    female: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getVoteList();
      const count = await getVoteCount();

      setCount(count);
      setMale(data.male);
      setFemale(data.female);
      setLoading(false);
    })();
  }, []);
  return (
    <div className={css.container}>
      {loading ? (
        <h1 style={{ textAlign: "center" }}>loading...</h1>
      ) : (
        <>
          <h1>
            Нийт саналын тоо: <span>{count?.all}</span>
            <br />
            Эрэгтэй саналын тоо: <span>{count?.male}</span>
            <br />
            Эмэгтэй саналын тоо: <span>{count?.female}</span>
          </h1>
          <Positions male={male} female={female} />
        </>
      )}
    </div>
  );
};

export default AdminPage;
