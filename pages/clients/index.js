// import styles from "../styles/Home.module.css";

import { useRouter } from 'next/router';
import Link from 'next/link';

const clients = [
  {
    id: 'shamim',
    name: 'Shamim'
  },
  {
    id: 'yasmin',
    name: 'Yasmin'
  },
  {
    id: 'anas',
    name: 'Anas'
  }
];

function ClientProjectsPage() {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <div>
      <h1>Clients Page</h1>

      <ul>
        {clients.map((c) => (
          <li key={c.id}>
            <Link href={`/clients/${c.id}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientProjectsPage;
