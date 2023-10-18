import { Button } from "react-bootstrap"
import useStore from "./store"
const Home = () => {
    const token = localStorage.getItem('token')
    const store = useStore() // kena guna as Hook
    //const store = useStore.getState() // tak jalan
    return (
        <>
        <h1>Sistem i Mohon</h1>
        {store.title}    
    token is {token}
        <hr />
        <Button onClick={ () => useStore.setState({title: 'change'})}>Change</Button>
        <Button onClick={ () => useStore.setState({title: 'new value'})}>New </Button>
        </>
    )
} 

export default Home