'use client';

import { Contact } from '@/lib/validationSchemas';
import { Card, Image } from 'react-bootstrap';

interface ContactCardProps {
  contact: Contact;
}

const ContactCardAdmin = ({ contact }: ContactCardProps) => (
  <Card className="h-100">
    <Card.Header className="d-flex align-items-center">
      <Image
        src={contact.image}
        alt={`${contact.firstName} ${contact.lastName}`}
        width={75}
        height={75}
        roundedCircle
        className="me-3"
      />
      <div>
        <Card.Title>
          {contact.firstName}
          {' '}
          {contact.lastName}
        </Card.Title>
        <Card.Subtitle className="text-muted">{contact.address}</Card.Subtitle>
      </div>
    </Card.Header>
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>
      {/* Owner information removed as it does not exist on the Contact type */}
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;
