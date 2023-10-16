import { Button } from "react-bootstrap"
import useStore from "./store"
const Home = () => {

    const store = useStore()
    //const store = useStore.getState()
    return (
        <>
        <h1>Sistem i Mohon</h1>
        {store.title}    
    
        <hr />
        <Button onClick={ () => useStore.setState({title: 'change'})}>Change</Button>
        <Button onClick={ () => useStore.setState({title: 'new value'})}>New </Button>
        </>
    )
} 

export default Home