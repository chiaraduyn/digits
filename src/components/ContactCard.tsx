'use client';

import { Contact } from '@/lib/validationSchemas';
import { Card, Image, ListGroup } from 'react-bootstrap';
import NoteItem from './NoteItem'; // Import NoteItem
import { Note } from '@prisma/client';

interface ContactCardProps {
  contact: Contact;
  notes: Note[];
}

const ContactCard = ({ contact, notes }: ContactCardProps) => (
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
          {contact.firstName} {contact.lastName}
        </Card.Title>
        <Card.Subtitle className="text-muted">{contact.address}</Card.Subtitle>
      </div>
    </Card.Header>
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>
      <ListGroup variant="flush">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ListGroup>
    </Card.Body>
  </Card>
);

export default ContactCard;
