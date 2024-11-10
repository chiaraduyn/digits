import { Card, ListGroup } from 'react-bootstrap';
import NoteItem from '@/components/NoteItem';
import AddNoteForm from '@/components/AddNoteForm';
import { Note } from '@/lib/types';

interface ContactCardProps {
  contact: {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    description: string;
    image: string;
  };
  notes: Note[];
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, notes }) => (
  <Card>
    <Card.Img variant="top" src={contact.image} alt={`${contact.firstName} ${contact.lastName}`} />
    <Card.Body>
      <Card.Title>{`${contact.firstName} ${contact.lastName}`}</Card.Title>
      <Card.Text>{contact.description}</Card.Text>
      <Card.Text>
        <strong>Address:</strong>
        {' '}
        {contact.address}
      </Card.Text>

      <ListGroup variant="flush">
        {notes.map((note: Note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ListGroup>

      <AddNoteForm contactId={contact.id} />
    </Card.Body>
  </Card>
);

export default ContactCard;
