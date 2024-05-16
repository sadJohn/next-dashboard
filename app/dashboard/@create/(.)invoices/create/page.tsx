import { fetchCustomers } from '@/app/lib/data';
import Form from '@/app/ui/invoices/create-form';
import Modal from './modal';

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <Modal title="Create Invoices">
      <Form customers={customers} />
    </Modal>
  );
}
