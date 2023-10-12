const ListItem = ({item,value}) => {
    
    return (
    <>
    <div className="row mb-2">
            <div className="col-4 mx-3">
                <b className="mb-0">{item}</b>
            </div>
   
      
            <div className="col-8 mt-1">
                <p className="text-dark mb-3 mx-3">{value}</p>
            </div>
    </div>
    </>
    )
    
}

export default ListItem