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
        <hr />
        <p>
          The story behind LA-Mobile begins around 2019, when two students Aviv
          and Lior met at Reichman University and became friends.
          <br />
          <i>LA</i> comes from their initials and this is how the name was
          chosen. Both of them are tech-geeks and Apple fans.
        </p>
        <p>
          They founded LA-Mobile to bring you the best products for the best
          price.
          <br />
          You can find many products in our store - from Cameras to Laptops and
          Mobile phones(Apple iPhones, Google Pixel, Samsung Galaxy, and many
          more).
        </p>
      </div>
    </Container>
  );
}
