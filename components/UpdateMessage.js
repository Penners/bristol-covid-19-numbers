import { useEffect, useState } from 'react';

function UpdateMessage({date}) {

    const now = new Date()
    const then = new Date(date)

    const [visible, setVisible] = useState(false)
    useEffect(() => {
        if (+now - +then > 60 * 60 * 12 * 1000){
            setVisible(true)
        } 
    }, []) 

    const refresh = () => {
        location.reload()
    }

    
    return (

        <>
        <div className="update-message" onClick={refresh}>
            <div className="large">Updates Are Avaliable</div>
            <div className="small">Tap to refresh</div>
        </div>
        <style jsx>{`
            .update-message {
                background-color: #0076d1; 
                color: white;
                cursor: pointer;
                display: inline-block;
                text-align: center;
                padding: 10px 25px;
                border-radius: 25px;
                position: fixed;
                bottom: ${visible ? '20px' : '-100px'};
                z-index: 100;
                left: 50%;
                transform: translateX(-50%);
                transition: 0.5s ease-in;
                box-shadow: 0px 3px 5px 3px #0000003d
            }
            .large {
                white-space: nowrap;
            }
            .small {
                font-size: 14px;
            }    
        `}</style>
        </>
    );
}

export default UpdateMessage;