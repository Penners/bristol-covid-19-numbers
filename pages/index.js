import { format } from "date-fns-tz";
import absoluteUrl from "next-absolute-url";
import Graph from "../components/graph";

const Home = (props) => {
  return (
    <div>
      <article>
        <h1>Bristol Covid-19 Tracker</h1>
        <p>
          Daily updates on the number of cofirmed covid-19 cases in the Bristol
          local authority.
        </p>

        <table>
          <tbody>
            <tr>
              <td>
                <h3>Todays confirmed cases: {props.newCasesToday}</h3>
              </td>
              <td>
                <h3>Total confirmed cases: {props.totalCases}</h3>
              </td>
            </tr>
            <tr>
              <td>
                <h3>
                  Change since yesterday:{" "}
                  {(props.newCasesToday - props.newCasesYesterday <= 0
                    ? ""
                    : "+") +
                    (props.newCasesToday - props.newCasesYesterday)}
                </h3>
              </td>
              <td>
                <h3>
                  Days since last confirmed case:{" "}
                  {props.daysSinceLastCase !== null
                    ? props.daysSinceLastCase
                    : 0}
                </h3>
              </td>
            </tr>
          </tbody>
        </table>
        <h5>
          Updated:{" "}
          {props.metaData.lastUpdatedAt
            ? format(new Date(props.metaData.lastUpdatedAt), "HH:mm dd/MM/yyyy")
            : ""}
        </h5>
        <blockquote cite="https://coronavirus.data.gov.uk/">
          <footer>
            <cite>
              Data Source:{" "}
              <a href="https://coronavirus.data.gov.uk/">
                https://coronavirus.data.gov.uk/
              </a>
            </cite>
          </footer>
        </blockquote>

        <h2>Daily Cases</h2>
        <Graph dataSet={props.totalDataSet} />
        <h2>Total Cases</h2>
        <Graph dataSet={props.totalDataSet} totalCases={true} />
        <h2>Table of Data</h2>
        <h5>* denotes that no data was reported on this day</h5>
        <table>
          <thead>
            <tr>
              <th>New Cases</th>
              <th>Total Cases</th>
              <th>Date</th>
            </tr>
          </thead>
          {props.totalDataSet.length > 0 && (
            <tbody>
              {props.totalDataSet.map((element, key) => {
                return (
                  <tr key={key}>
                    <td>
                      {element.dailyCases}
                      {element.assumedData ? "*" : ""}
                    </td>
                    <td>{element.totalCases}</td>
                    <td>{element.dateFormat}</td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </article>
    </div>
  );
};

Home.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}/api/dataset`;

  const res = await fetch(apiURL);
  const json = await res.json();

  return json;
};

export default Home;
