import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { auth, signOut } from '@/auth';
import { Card, CardDescription, CardHeader, CardTitle } from '../card';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Ellipsis } from 'lucide-react';
import fav from '@/app/favicon.ico';

export default async function SideNav() {
  const session = await auth();
  if (!session?.user) return null;
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <Popover>
          <PopoverTrigger>
            <Card className="flex h-[48px] border-none md:h-auto md:border-solid">
              <CardHeader className="flex w-full flex-row items-center justify-between p-2">
                <div className="h-10 w-10">
                  <Image
                    width={40}
                    height={40}
                    src={session.user.image || fav}
                    className="rounded-full"
                    alt="Avatar"
                  />
                </div>
                <div className="mt-0 hidden md:block">
                  <CardTitle className="text-left text-base">
                    {session.user.name}
                  </CardTitle>
                  <CardDescription>{session.user.email}</CardDescription>
                </div>
                <Ellipsis className="hidden w-5 md:block" />
              </CardHeader>
            </Card>
          </PopoverTrigger>
          <PopoverContent className="w-60 p-0">
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                <PowerIcon className="w-6" />
                <div>Sign Out</div>
              </button>
            </form>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
