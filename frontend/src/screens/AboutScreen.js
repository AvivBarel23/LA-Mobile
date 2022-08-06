import Container from "react-bootstrap/Container";
import { Helmet } from "react-helmet-async";

export default function AboutScreen() {
    return ( <
        Container className = "small-container" >
        <
        Helmet >
        <
        title > About us < /title> <
        /Helmet> <
        h1 className = "my-3" > LA - Mobile < /h1> <
        div >
        The story behind LA - Mobile starts around 2019, when two entrepreneurs Aviv Barel(Backend engineer) and Lior Levi Landman(Software Engineer and Security researcher) met at Reichman university camups and beacme close friends.LA comes from their initials and that is how the name was chosen.Both of them are technology geeks and apple admires.They opend LA - Mobile because they wanted to bring the best products, in the best prices around israel.

        You can find in our store technology products - from cameras to laptops and especially smartphones and mobiles(Apple Iphones, google pixels, Samsung, etc).

        <
        /div> <
        /Container>
    );
}