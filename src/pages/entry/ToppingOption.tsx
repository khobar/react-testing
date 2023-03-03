import { Option } from "../../models/Option";
import { Col, Form, Row } from "react-bootstrap";
import { OptionType } from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";

const ToppingOption = ({ name, imagePath }: Option) => {
  const { updateItemCount } = useOrderDetails();
  const handeChange = (event: any) => {
    updateItemCount(name, event.target.checked ? 1 : 0, OptionType.TOPPINGS);
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: `75%` }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group
        controlId={`${name}-topping-checkbox`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Check
            label={name}
            defaultValue={0}
            onChange={handeChange}
            min={0}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};
export default ToppingOption;
