import React, { FormEvent, useMemo, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { IOrderSettingComponent } from "../../models/IOrderSettingComponent";
import { OrderPhase } from "../../models/Phases";
import { useOrderDetails } from "../../contexts/OrderDetails";

const SummaryForm = ({ setOrderPhase }: IOrderSettingComponent) => {
  const [tcChecked, setTcChecked] = useState(false);

  const { optionCounts } = useOrderDetails();

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually by delivered</Popover.Body>
    </Popover>
  );
  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setOrderPhase(OrderPhase.COMPLETED);
  };
  const hasScoops = useMemo(() => {
    return optionCounts?.scoops && optionCounts.scoops.length > 0;
  }, [optionCounts]);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          data-testid="confirm-terms"
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      {!hasScoops ? <p role="alert">There are no scoops selected!</p> : null}
      <Button
        variant="primary"
        type="submit"
        disabled={!tcChecked || !hasScoops}
      >
        Confirm order
      </Button>
    </Form>
  );
};
export default SummaryForm;
