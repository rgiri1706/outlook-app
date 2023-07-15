import '../Styles/EmailList.css';

const EmailList = ({isItemClicked, item}) => {
    const getTimeStamp = (time) => {
        const date = new Date(time).toLocaleDateString('US');
        const time1 = new Date(time).toLocaleTimeString('en-us').slice(0,4)+""+new Date(time).toLocaleTimeString('en-us').slice(8,10)
        return date+" "+time1;
    }
    return (
        <div className={"list-style "+ (item.unread ? 'bg-selected': '')+(item.isClicked ? 'border-selected' : '')}>
            <div className={isItemClicked ? "item-clicked" : "avatar-section"}>
                <div className='avatar-style'>
                    {item.from.name.charAt(0).toUpperCase()}
                </div>
            </div> 
            <div className="info-style">
                <div>
                    From: <span className='bold-text'><span>{item.from.name}</span><span style={{marginLeft: 5}}>{'<'+item.from.email+'>'}</span></span>
                </div>
                <div>
                    Subject: <span className='bold-text'>{item.subject}</span>
                </div>
                <div style={{marginTop: 7}}>
                    {item.short_description}
                </div>
                <div>
                    {getTimeStamp(item.date)}
                    {item.favourite && <span className='favourite-tag'>Favourite</span>}
                </div>
            </div>
        </div>
    );
}

export default EmailList;