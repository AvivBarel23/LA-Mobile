import Carousel from 'react-bootstrap/Carousel';
import {Link} from "react-router-dom";

function CarouselHomePage(props) {
    const {products} = props;
    return (
        <Carousel>
            {products.map(p => (
                <Carousel.Item interval={1000}>
                    <Link to={`/products/${p.slug}`}>
                        <img
                            className="rounded mx-auto d-block"
                            src={p.image}
                            alt="slide"
                        />
                        <Carousel.Caption>
                            <h3>{p.name}</h3>
                            <p>{p.description}</p>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>))}

        </Carousel>
    );
}

export default CarouselHomePage;