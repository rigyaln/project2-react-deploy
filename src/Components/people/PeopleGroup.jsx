import PeopleModal from "./PeopleModal";


const PeopleGroup = ({title, pepGroup})=>{
    return (
        <>
            <h2>{title}</h2>
            <div className="peopleList"> 
                {pepGroup.map((p)=>
                    <div className="peopleListItem">
                        {/*<img src={p.imagePath} alt="Person"></img>
                        <h5>{p.name}</h5>*/}
                        <PeopleModal {...p}/>
                    </div>
                )}
            </div>
        </>
    )
}

export default PeopleGroup;