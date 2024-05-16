import SideNav from '@/app/ui/dashboard/sidenav';

export default function Layout({
  children,
  create,
}: {
  children: React.ReactNode;
  create: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      {create}
    </div>
  );
}
