const warning = () => {
    return(
        <>
        <div className="Warning">
            Warning, the figures on this site are currently inaccurate. The current data source for this website has been deprecated. As a result no new cases will be added. A fix for this is in the works.
        </div>
        <style jsx>{`
            .Warning {
                padding: 5px;
                background-color: yellow;
                color: black;
                margin-bottom: 20px;
            }
        `}</style>
        </>
    );
}

export default warning; 