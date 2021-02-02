import Graph from "components/graph"
import getCovidData from "lib/getCovidData"
import getDateTime from "lib/getDateTime"
import prepGraphData from "lib/prepGraphData"
import previousDays from "lib/previousDays"
import { useEffect, useState } from "react"

const Home = ({ dataSet, lastUpdatedAt }) => {

    const [isClientSide, setIsClientSide] = useState(false)
    useEffect(() => setIsClientSide(true))

    const cumDataSet = prepGraphData({
        dataSet, 
        config: ["", "Total Cases"],
        key: "cumCasesBySpecimenDate"
    })

    const newDataSet = prepGraphData({
        dataSet, 
        config: ["", "New Cases"],
        key: "newCasesBySpecimenDate"
    })

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
                                <h3>Past 24 hours: {dataSet[0].newCasesBySpecimenDate}</h3>
                            </td>
                            <td>
                                <h3>Past 7 days: {previousDays(dataSet, 7)}</h3>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3>Past 28 days: {previousDays(dataSet, 28)}</h3>
                            </td>
                            <td>
                                <h3>Total cases: {dataSet[0].cumCasesBySpecimenDate}</h3>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h5>
                    Last Updated: {isClientSide ? getDateTime(lastUpdatedAt) : lastUpdatedAt.toString()}
                </h5>
                <blockquote cite="https://coronavirus.data.gov.uk/">
                    <footer>
                        <cite>
                            Data Source:
                            <a href="https://coronavirus.data.gov.uk/">
                                https://coronavirus.data.gov.uk/
                            </a>
                        </cite>
                    </footer>
                </blockquote>

                <h2>Daily Cases</h2>
                <Graph dataSet={newDataSet} />
                <h2>Total Cases</h2>
                <Graph dataSet={cumDataSet} />
                <h2>New &amp; Total Cases</h2>
                <table>
                    <thead>
                        <tr>
                            <th>New Cases</th>
                            <th>Total Cases</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    {dataSet.length > 0 && (
                        <tbody>
                            {dataSet.map(({ date, newCasesBySpecimenDate, cumCasesBySpecimenDate }, key) => {
                                return (
                                    <tr key={`tablerow-${key}`}>
                                        <td>
                                            {newCasesBySpecimenDate}
                                        </td>
                                        <td>
                                            {cumCasesBySpecimenDate}
                                        </td>
                                        <td>
                                            {isClientSide ? new Date(date).toLocaleDateString("en-GB") : date}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>
            </article>
        </div>
    );
}

export async function getStaticProps() {

    const dataSet = await getCovidData();

    

    return {
        props: {
            dataSet,
            lastUpdatedAt: new Date().toISOString()
        },
        revalidate: 1 * 60 * 60
    }
}

export default Home;
