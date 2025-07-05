const sqlPromise = initSqlJs({
    locateFile: file => `./src/data/${file}`
});

const dataPromise = fetch("./src/data/portfolio_db.sql").then(res => res.arrayBuffer());

const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])

const db = new SQL.Database(new Uint8Array(buf));

export default db
