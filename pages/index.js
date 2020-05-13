import Head from "next/head";
import { useState, useEffect } from "react";
import { format } from "date-fns-tz";

const Home = (props) => {
  console.log(props);

  const [totalCases, setTotalCases] = useState(0);
  const [newCases, setNewCases] = useState(0);
  const [changeSinceYesterday, setChangeSinceYesterday] = useState(0);
  const [daysSinceLastCase, setDaysSinceLastCase] = useState(0);
  const [totalDataSet, setTotalDataSet] = useState([]);
  const [metaData, setMetaData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("api/dataset");
      const json = await res.json();

      const change =
        (json.newCasesToday - json.newCasesYesterday <= 0 ? "" : "+") +
        (json.newCasesToday - json.newCasesYesterday);
      setChangeSinceYesterday(change);
      setTotalCases(json.totalCases);
      setNewCases(json.newCasesToday);
      setTotalDataSet(json.totalDataSet);
      setDaysSinceLastCase(json.daysSinceLastCase);
      setMetaData(json.metaData);

      console.log(totalDataSet);
    }

    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <article>
        <h1>Bristol Covid-19 Tracker</h1>
        <p>
          Daily updates on the number of comfirmed covid-19 cases in the Bristol
          local authority
        </p>
        <table>
          <tbody>
            <tr>
              <td>
                <h3>Todays Confirmed Cases: {newCases}</h3>
              </td>
              <td>
                <h3>Total Confirmed Cases: {totalCases}</h3>
              </td>
            </tr>
            <tr>
              <td>
                <h3>Change Since Yesterday: {changeSinceYesterday}</h3>
              </td>
              <td>
                <h3>Days since last confirmed case: {daysSinceLastCase}</h3>
              </td>
            </tr>
          </tbody>
        </table>
        <h7>
          Updated:{" "}
          {metaData.lastUpdatedAt
            ? format(new Date(metaData.lastUpdatedAt), "HH:mm dd/MM/yyyy")
            : ""}
        </h7>
        <blockquote cite="https://coronavirus.data.gov.uk/">
          <p>{metaData.disclaimer}</p>
          <footer>
            <cite>
              Data Source:{" "}
              <a href="https://coronavirus.data.gov.uk/">
                https://coronavirus.data.gov.uk/
              </a>
            </cite>
          </footer>
        </blockquote>
      </article>
      <h2>Table of Data</h2>
      <table>
        <thead>
          <tr>
            <th>New Cases</th>
            <th>Total Cases</th>
            <th>Date</th>
          </tr>
        </thead>
        {totalDataSet.length > 0 && (
          <tbody>
            {totalDataSet.map((element, key) => {
              return (
                <tr key={key}>
                  <td>{element.dailyCases}</td>
                  <td>{element.totalCases}</td>
                  <td>{element.dateFormat}</td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
};

export async function getServerSideProps(context) {
  //   console.log(context);
  return { props: {} };
}

export default Home;
