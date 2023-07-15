import '../Styles/EmailBody.css';

const EmailBody = ({bodyData, handleFavClick}) => {
    const getTimeStamp = (time) => {
        const date = new Date(time).toLocaleDateString('US');
        const time1 = new Date(time).toLocaleTimeString('en-us').slice(0,4)+""+new Date(time).toLocaleTimeString('en-us').slice(8,10)
        return date+" "+time1;
    }
    return (
        <div className="email-body">
            <div className='header-section'>
                <div className="avatar-section">
                    <div className='avatar-style'>
                      {bodyData.from.name.charAt(0).toUpperCase()}
                    </div>
                </div>
                <div className='info-section'>
                      <div className='subject-style'>
                        {bodyData.subject}
                      </div>
                      <div className='time-style'>
                        {getTimeStamp(bodyData.date)}
                      </div>
                </div>
                <div className='mark-section'>
                    <button className='button-style' onClick={()=>handleFavClick(bodyData)}>{bodyData.favourite ? 'Favourite' : 'Mark as favourite'}</button>
                </div>
            </div>
            <div className='body-style'>
                <div dangerouslySetInnerHTML={{__html: bodyData.body}}></div>
            </div>
        </div>
    );
}

export default EmailBody;