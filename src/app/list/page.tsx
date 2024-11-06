import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table } from 'react-bootstrap';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import StuffItem from '@/components/StuffItem';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

/** Render lists of stuff and contacts for the logged in user. */
const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );

  const owner = (session && session.user && session.user.email) || '';

  // Get both stuff and contacts for the current user
  const stuff = await prisma.stuff.findMany({
    where: {
      owner,
    },
  });

  const contacts = await prisma.contact.findMany({
    where: {
      owner,
    },
  });

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row className="mb-3">
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

        <Row>
          <Col>
            <h1>Contacts</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(
                  (contact: {
                    id: string;
                    image: string;
                    firstName: string;
                    lastName: string;
                    address: string;
                    description: string;
                  }) => (
                    <tr key={contact.id}>
                      <Image
                        src={contact.image}
                        alt={`${contact.firstName} ${contact.lastName}`}
                        width={50}
                        height={50}
                        className="img-fluid rounded-circle me-2"
                      />
                      <td>
                        <Image
                          src={contact.image}
                          alt={`${contact.firstName} ${contact.lastName}`}
                          width={50}
                          height={50}
                          className="img-fluid rounded-circle me-2"
                        />
                        {contact.firstName}
                        {' '}
                        {contact.lastName}
                      </td>
                      <td>{contact.address}</td>
                      <td>{contact.description}</td>
                      <td>
                        {/* Add actions buttons here similar to StuffItem */}
                        {/* For now, leaving it empty */}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
