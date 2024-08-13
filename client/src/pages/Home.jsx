import { Container } from "@mui/material";
import AppLayout from "../Components/layout/AppLayout";

const Home = ()=>{
    return(
        <>
        <Container component={"main"} maxWidth="md">
        <h1>chats from this to their</h1>
        </Container>
        </>
    )
}
 const HomeWithLayout = AppLayout()(Home);
export default HomeWithLayout;