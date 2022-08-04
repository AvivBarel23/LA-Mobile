import Card from 'react-bootstrap/Card'
import {ListGroup} from "react-bootstrap";

const Branch = (props) => {
    const {branch} = props;
    return (
        <Card>
            <Card.Body>
                <Card.Title>{branch.name}</Card.Title>
                <div className="d-flex justify-content-around">
                    <i className="fa fa-map-marker" />
                    <Card.Text>Address:{branch.address}</Card.Text>
                </div>
                <div className="d-flex justify-content-around">
                    <i className="fas fa-clock"/>
                    <ListGroup.Item>
                        <Card.Text>Sunday-Thursday:{branch.hours[0]}</Card.Text>
                        <Card.Text>Friday:{branch.hours[1]}</Card.Text>
                        <Card.Text>Saturday:{branch.hours[2]}</Card.Text>
                    </ListGroup.Item>
                </div>
            </Card.Body>
        </Card>
    );
}
export default Branch;