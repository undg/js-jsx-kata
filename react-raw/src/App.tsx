import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface Results {
  title: string;
  url: string;
  description: string;
  userRoles: any[];
}

interface ResultsSuccess {
  results: Results[];
}

interface ResultsFail {
  message: string;
  status: number;
}

type Res = ResultsSuccess & ResultsFail;

function App() {
  const [search, setSearch] = useState("");
  const [res, setRes] = useState<Res>();
  const [tenResults, setTenResults] = useState<Results[]>([]); // not most fourtune name
  const [pagination, setPagination] = useState({ from: 0, to: 10 });

  const nextHandler = () => {
    setPagination((prev) => ({ from: prev.from + 10, to: prev.to + 10 }));
  };

  const prevHandler = () => {
    setPagination((prev) => ({ from: prev.from - 10, to: prev.to - 10 }));
  };

  useEffect(() => {
    if (!res || !res.results) return;

    const { from, to } = pagination;
    setTenResults(res.results.slice(from, to));
  }, [res, pagination]);

  return (
    <div className="App">
      <form onSubmit={(e) => setData(e, search, setRes)} data-testid="form">
        <input
          value={search}
          placeholder="search"
          onChange={(e) => setSearch(e.target.value)}
          data-testid="form-input"
        />
      </form>

      {!res?.results || res?.status ? (
        <p>{res?.message}</p> // error response from api (200)
      ) : (
        <>
          <button onClick={prevHandler} disabled={pagination.from === 0}>
            Prev
          </button>
          <button
            onClick={nextHandler}
            disabled={pagination.to >= res?.results.length}
          >
            Next
          </button>
          <ul>
            {tenResults.map((r, idx) => (
              <li key={btoa(r.url)}>
                {" "}
                {/* assuming that all url's are uniq, idealy uuid */}
                <a href={r.url}>
                  <h3>{r.title}</h3>
                  <p>{r.description}</p>
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;

async function setData(
  e: FormEvent<HTMLFormElement>,
  search: string,
  setRes: Dispatch<SetStateAction<Res | undefined>>
) {
  e.preventDefault();

  const base = `https://help-search-api-prod.herokuapp.com/search`;

  // to escape unusual characters
  const url = new URL(base);
  const query = new URLSearchParams(url.search);
  query.append("query", search);

  const apiUrl = `${base}?${query.toString()}`;

  const res = await fetch(apiUrl);

  // missing errors for res other that 200
  // ...

  const json: Res = await res.json();
  setRes(json);
}
