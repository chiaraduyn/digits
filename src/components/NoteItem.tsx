import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Note } from '@prisma/client';

type NoteItemProps = {
  note: Note;
};

const NoteItem: React.FC<NoteItemProps> = ({ note }) => (
  <ListGroup.Item>
    <p className="fw-lighter">{new Date(note.createdAt).toLocaleDateString('en-US')}</p>
    <p>{note.note}</p>
  </ListGroup.Item>
);

export default NoteItem;
