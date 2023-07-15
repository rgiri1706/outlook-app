import { useEffect, useState } from "react";
import EmailBody from "./EmailBody";
import EmailList from "./EmailList";

const EmailSection = ()=>{
    const filterTags = [{
        name: 'Favourites',
        isSelected: false
    },{
        name: 'Read',
        isSelected: false
    },{
        name: 'Unread',
        isSelected: false
    }]


    const [isItemClicked, setItemClick] = useState(false);

    const [emailList, setList] = useState([]);

    const [bodyData, setBody] = useState({});

    const [favList, setFav] = useState([]);

    const [tags, setTags] = useState(filterTags);


    const fetchData = async  ()=>{
        let list;
        await fetch('https://flipkart-email-mock.now.sh/').then(res=>res.json()).then(res=> list=res.list);
        list = list.map(lt=> ({...lt, favourite: false, isClicked: false, unread: true}));
        if(window.localStorage.getItem('readList')){
            const data = JSON.parse(window.localStorage.getItem('readList'));
            list = list.map(lt=>{
                lt.unread = !data.includes(lt.id.toString());
                return lt;
            })
        }
        if(window.localStorage.getItem('favData')){
            const data = JSON.parse(window.localStorage.getItem('favData'));
            list = list.map(lt=>{
                lt.favourite = data.includes(lt.id.toString());
                return lt;
            })
        }

        setList(list);
    }


    const handleClick = async (list) => {
        let bodyData;
        await fetch(`https://flipkart-email-mock.now.sh/?id=${list.id}`).then(res=>res.json()).then(res=>bodyData=res);
        let selectedList = emailList.map(lt=> {
            if(lt.id === list.id){
                lt.isClicked = !lt.isClicked;
                lt.unread = false;
                const localStorageSession = window.localStorage.getItem('readList');
                if(localStorageSession){
                   const data = JSON.parse(window.localStorage.getItem('readList'));
                   if(!data.includes(list.id)){
                    data.push(list.id);
                    window.localStorage.setItem('readList', JSON.stringify(data));
                   }
                } else {
                    const data = [];
                    data.push(list.id);
                    window.localStorage.setItem('readList', JSON.stringify(data));
                }
                return lt;
            } else {
                lt.isClicked = false;
                return lt;
            }
        });
        setList([...selectedList]);
        setBody({...bodyData, ...list});
        setItemClick(true);
    }


    const handleFavClick = (list) => {
        let selectedList = emailList.map(lt=> {
            if(lt.id === list.id){
                lt.favourite = !lt.favourite;
                const localStorageSession = window.localStorage.getItem('favData');
                if(localStorageSession){
                   let data = JSON.parse(window.localStorage.getItem('favData'));
                   if(!data.includes(list.id)){
                    data.push(list.id);
                    window.localStorage.setItem('favData', JSON.stringify(data));
                   } else {
                        data = data.filter(el=> el !== list.id.toString())
                        window.localStorage.setItem('favData', JSON.stringify(data));
                   }
                } else {
                    const data = [];
                    data.push(list.id);
                    window.localStorage.setItem('favData', JSON.stringify(data));
                }
                return lt;
            } else {
                return lt;
            }
        });
        let updatedBody = list;
        updatedBody.favourite = !updatedBody.favourite;
        setList([...selectedList]);
        setBody(updatedBody);
    }


    const handleFilterClick = (ind) => {
        if(tags[ind].name === 'Favourites'){
            let tempList = emailList.filter(lt=> lt.favourite === true);
            if(tempList.length === 0){
                alert('No favourites added');
            } else {
                if(tags[ind].isSelected){
                    setList(emailList);
                    setFav([]);
                } else{
                    setFav([...tempList]);
                }
                let tempArr = tags;
                tempArr = tempArr.map((arr,index)=>{
                    if(index === ind){
                        arr.isSelected = !arr.isSelected;
                        return arr;
                    } else {
                        arr.isSelected = false;
                        return arr;
                    }
                });
                setTags(tempArr);
            }              
        } else if(tags[ind].name === 'Read'){
            let tempList = emailList.filter(lt=> lt.unread === false);
            if(tempList.length === 0){
                alert('No email read');
            } else {
                if(tags[ind].isSelected){
                    setList(emailList);
                    setFav([]);
                } else{
                    setFav([...tempList]);
                }
                let tempArr = tags;
                tempArr = tempArr.map((arr,index)=>{
                    if(index === ind){
                        arr.isSelected = !arr.isSelected;
                        return arr;
                    } else {
                        arr.isSelected = false;
                        return arr;
                    }
                });
                setTags(tempArr);
            }       
        } else {
            let tempList = emailList.filter(lt=> lt.unread === true);
            if(tempList.length === 0){
                alert('No unread email');
            } else {
                if(tags[ind].isSelected){
                    setList(emailList);
                    setFav([]);
                } else{
                    setFav([...tempList]);
                }
                let tempArr = tags;
                tempArr = tempArr.map((arr,index)=>{
                    if(index === ind){
                        arr.isSelected = !arr.isSelected;
                        return arr;
                    } else {
                        arr.isSelected = false;
                        return arr;
                    }
                });
                setTags(tempArr);
            }       
        }
    }

    useEffect(()=>{
        fetchData();
    },[]);

    return (
        <div>
            <div className="filter-tag">
            Filter By: 
            {tags.map((tg,index)=><span className={"tag-style "+(tg.isSelected ? 'tg-bg' : '')} key={index} onClick={()=>handleFilterClick(index)}>{tg.name}</span>)}
            </div>
            <div className="email-parent-section">
                <div className={isItemClicked ? "flex-divide-small" : "flex-divide"}>
                    {favList.length === 0 && emailList.map(list=> <div onClick={()=> handleClick(list) }  key={list.id} ><EmailList isItemClicked={isItemClicked} item={list}  /></div>)}
                    {favList.length > 0 && favList.map(list=> <div onClick={()=> handleClick(list) }  key={list.id} ><EmailList isItemClicked={isItemClicked} item={list}  /></div>)}
                </div>
                {isItemClicked && <div className="flex-divide-large">
                    <EmailBody bodyData={bodyData} handleFavClick={handleFavClick} />
                </div>}
            </div>
        </div>
    );
};

export default EmailSection;
