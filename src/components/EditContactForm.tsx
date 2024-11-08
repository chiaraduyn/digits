'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Contact } from '@prisma/client';
import { EditContactSchema } from '@/lib/validationSchemas';
import { editContact } from '@/lib/dbActions';

const EditContactForm = ({ contact }: { contact: Contact }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(EditContactSchema),
  });

  const onSubmit = async (data: Contact) => {
    await editContact(data);
    swal('Success', 'Contact has been updated', 'success', {
      timer: 2000,
    });
  };

  return (
    <Card className="mt-4">
      <Card.Header as="h5">Edit Contact</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col xs={10}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register('firstName')}
                  defaultValue={contact.firstName}
                />
                {errors.firstName && (
                  <Form.Text className="text-danger">
                    {errors.firstName.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col xs={10}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register('lastName')}
                  defaultValue={contact.lastName}
                />
                {errors.lastName && (
                  <Form.Text className="text-danger">
                    {errors.lastName.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col xs={10}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  {...register('email')}
                  defaultValue={contact.email}
                />
                {errors.email && (
                  <Form.Text className="text-danger">
                    {errors.email.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col xs={10}>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  {...register('phone')}
                  defaultValue={contact.phone}
                />
                {errors.phone && (
                  <Form.Text className="text-danger">
                    {errors.phone.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2">
            <Button type="submit" variant="primary">
              Update Contact
            </Button>
            <Button
              onClick={() => reset()}
              variant="warning"
            >
              Reset
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EditContactForm;
