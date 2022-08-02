import Carousel from 'react-bootstrap/Carousel';

function CarouselHomePage(props) {
    const {products}=props;
    return (
        <Carousel >
            {products.map(p=>(
                <Carousel.Item interval={1000}>
                <img
                    className="rounded mx-auto d-block"
                    src={p.image}
                    alt="slide"
                />
                <Carousel.Caption>
                    <h3>{p.name}</h3>
                    <p>{p.description}</p>
                </Carousel.Caption>
            </Carousel.Item>))}

        </Carousel>
    );
}

export default CarouselHomePage;