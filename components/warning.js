const warning = () => {
    return(
        <>
        <div className="Warning">
            The site is working again, previous data has been updated to reflect new data source
        </div>
        <style jsx>{`
            .Warning {
                padding: 5px;
                background-color: teal;
                color: white;
                margin-bottom: 20px;
            }
        `}</style>
        </>
    );
}

export default warning; 