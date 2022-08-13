import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';

export default function AboutScreen() {
  return (
    <Container className="small-container">
      <Helmet>
        <title>About us</title>
      </Helmet>
      <h1 className="my-3"> LA - Mobile </h1>
      <div>
        The story behind LA-Mobile begins around 2019, when two entrepreneurs
        Aviv(Backend engineer) and Lior(Software Engineer) met at Reichman
        University and beacme friends. LA comes from their initials and that is
        how the name was chosen. Both of them are tech-geeks and Apple fans.
        They founded LA-Mobile to bring you the best products for the best
        price. You can find many products in our store - from Cameras to Laptops
        and Mobile phones(Apple Iphones,Google Pixel, Samsung Galaxy, and many
        more).
      </div>
    </Container>
  );
}
