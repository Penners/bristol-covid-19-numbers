import Chart from "react-google-charts";

const graph = ({dataSet}) => {

    const options = {
        chart: {},
        animation: {
            startup: true,
            duration: 3,
        },
        legend: { position: "none" },
    };
    return (
        <>
            <div className="aspect-ratio-box">
                <div className="aspect-ratio-box-inside">
                    <Chart
                        width={"100%"}
                        height={"100%"}
                        chartType="Line"
                        loader={<div>Loading Chart</div>}
                        data={dataSet}
                        options={options}
                    />
                </div>
            </div>
            <style jsx>
            {`
                .aspect-ratio-box {
                    height: 0;
                    overflow: hidden;
                    padding-top: calc(1440 / 1920 * 100%);
                    background: white;
                    position: relative;
                }
                .aspect-ratio-box-inside {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }

                @media(min-width: 480px){
                    .aspect-ratio-box {
                        padding-top: calc(1080 / 1920 * 100%);
                    }
                }
            `}
            </style>
        </>
    );
};

export default graph;
