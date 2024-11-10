import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import StuffItem from '@/components/StuffItem';
import ContactCard from '@/components/ContactCard'; // or ContactCardAdmin if applicable
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(session);

  const owner = session?.user?.email || '';

  // Fetch all contacts and notes associated with the logged-in user
  const contacts = await prisma.contact.findMany({
    where: { owner },
  });

  const notes = await prisma.note.findMany({
    where: { Contact: { owner } },
  });

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1>Contacts</h1>
            <Row>
              {contacts.map((contact) => (
                <Col key={contact.id} md={4}>
                  <ContactCard
                    contact={contact}
                    notes={notes.filter((note) => note.contactId === contact.id)}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Stuff</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Condition</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stuff.map((item) => (
                  <StuffItem key={item.id} {...item} />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
